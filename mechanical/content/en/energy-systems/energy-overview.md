Energy overview is the most fundamental systems-level framework in mechanical engineering: the first and second laws of thermodynamics govern all energy conversion devices, the energy hierarchy ranks conversion efficiency from highest to lowest, and the capacity factor determines the actual output of a power plant relative to its rated capacity. **The engineer who designs an energy system without performing an energy balance is not designing an energy system; they are guessing.** The energy overview calculation is the reason the engineer can compare power plants, engines and refrigerators on a common basis, and the first law of thermodynamics is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.

The quantitative tools of energy overview are the **first law** (energy conservation), the **second law** (entropy generation and exergy destruction), the **thermal efficiency** (the ratio of useful output to heat input), and the **capacity factor** (the ratio of actual energy produced to the maximum possible energy). The tools are the language in which the energy overview analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways energy overview calculation goes wrong
**Not performing an energy balance.** The engineer who designs an energy system without performing an energy balance is not designing an energy system; they are guessing. **The energy balance is the reason energy overview is designed for the balance, not the imbalance, and the balance is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.** **Not checking the thermal efficiency.** The engineer who designs an energy system without checking the thermal efficiency is not designing an energy system; they are guessing. **The thermal efficiency is the reason energy overview is designed for the efficiency, not the power, and the efficiency is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.** **Not checking the capacity factor.** The engineer who designs an energy system without checking the capacity factor is not designing an energy system; they are guessing. **The capacity factor is the reason energy overview is designed for the capacity, not the output, and the capacity is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.** **Not checking the exergy destruction.** The engineer who designs an energy system without checking the exergy destruction is not designing an energy system; they are guessing. **The exergy destruction is the reason energy overview is designed for the destruction, not the creation, and the destruction is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.** **Not checking the primary energy source.** The engineer who designs an energy system without checking the primary energy source is not designing an energy system; they are guessing. **The primary energy source is the reason energy overview is designed for the source, not the sink, and the source is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.** **Not checking the conversion chain.** The engineer who designs an energy system without checking the conversion chain is not designing an energy system; they are guessing. **The conversion chain is the reason energy overview is designed for the chain, not the link, and the chain is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.** **Not checking the energy density.** The engineer who designs an energy system without checking the energy density is not designing an energy system; they are guessing. **The energy density is the reason energy overview is designed for the density, not the total, and the density is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.** **Not checking the emissions intensity.** The engineer who designs an energy system without checking the emissions intensity is not designing an energy system; they are guessing. **The emissions intensity is the reason energy overview is designed for the intensity, not the total, and the intensity is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.** **Not checking the levelized cost.** The engineer who designs an energy system without checking the levelized cost is not designing an energy system; they are guessing. **The levelized cost is the reason energy overview is designed for the cost, not the price, and the cost is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.**
:::

## 1. Energy sources and conversion

::: definition The energy hierarchy {#def-energy-hierarchy}
The **energy hierarchy** is the ranking of energy conversion devices by efficiency, and the energy hierarchy is the reason the engineer can compare power plants, engines and refrigerators on a common basis.

The **first law of thermodynamics** is:

$$
\Delta E _ { \text{system } } \; = \; Q \; - \, W
$$

The **thermal efficiency** is:

$$
\eta _ { \text{th } } \; = \; { \frac { W _ { \text{net,out } } } { Q _ { \text{in } } } } \; = \; 1 \; - \; { \frac { Q _ { \text{out } } } { Q _ { \text{in } } } }
$$

The **Carnot efficiency** is:

$$
\eta _ { \text{Carnot } } \; = \; 1 \; - \; { \frac { T _ { L } } { T _ { H } } }
$$

The **second law efficiency** is:

$$
\eta _ { \text{II } } \; = \; { \frac { \eta _ { \text{th } } } { \eta _ { \text{Carnot } } } }
$$

The **energy density** is:

$$
e \; = \; { \frac { E } { m } } \quad [ \text{MJ/kg } ] \quad \text{or} \quad e \; = \; { \frac { E } { V } } \quad [ \text{MJ/m}^3 ]
$$

$$
\begin{array} { l c c c }
\textbf{Device} & \textbf{ } \eta _ { \text{th } } & \textbf{ } \eta _ { \text{Carnot } } & \textbf{ } \eta _ { \text{II } } \\ \hline
\text{Coal power plant} & 3 3 \text{--} 4 6 \ \% & 6 0 \ \% & 5 5 \text{--} 7 7 \ \% \\
\text{Gas turbine} & 3 0 \text{--} 4 0 \ \% & 6 5 \ \% & 4 6 \text{--} 6 2 \ \% \\
\text{Combined cycle} & 5 5 \text{--} 6 3 \ \% & 7 0 \ \% & 7 9 \text{--} 9 0 \ \% \\
\text{Diesel engine} & 3 5 \text{--} 5 0 \ \% & 6 8 \ \% & 5 1 \text{--} 7 4 \ \% \\
\text{Petrol engine} & 2 5 \text{--} 3 5 \ \% & 6 5 \ \% & 3 8 \text{--} 5 4 \ \% \\
\end{array}
$$

**The energy balance is the reason energy overview is designed for the balance, not the imbalance, and the balance is the reason energy overview is the most fundamental systems-level framework in mechanical engineering. The engineer who designs an energy system without performing an energy balance is not designing an energy system; they are guessing.**
:::

::: definition The capacity factor {#def-capacity-factor}
The **capacity factor** is the ratio of actual energy produced to the maximum possible energy, and the capacity factor is the reason the engineer can compare power plants, engines and refrigerators on a common basis.

The **capacity factor** is:

$$
\text{CF} \; = \; { \frac { E _ { \text{actual } } } { P _ { \text{rated } } \times t } } \; = \; { \frac { \text{actual energy produced } } { \text{maximum possible energy } } }
$$

The **annual energy production** is:

$$
E _ { \text{annual } } \; = \; P _ { \text{rated } } \times 8 7 6 0 \times \text{CF} \quad [ \text{MWh } ]
$$

The **levelized cost of energy** is:

$$
\text{LCOE} \; = \; { \frac { \text{total lifetime cost } } { \text{total lifetime energy } } } \; = \; { \frac { C _ { \text{capital } } + C _ { \text{O\&M } } + C _ { \text{fuel } } } { E _ { \text{lifetime } } } }
$$

The **emissions intensity** is:

$$
e _ { \text{CO } _ { 2 } } \; = \; { \frac { \dot { m } _ { \text{CO } _ { 2 } } } { P _ { \text{net } } } } \quad [ \text{g CO} _ { 2 } \text{/kWh } ]
$$

The **primary energy** is:

$$
E _ { \text{primary } } \; = \; { \frac { E _ { \text{electricity } } } { \eta _ { \text{plant } } } } \; + \; E _ { \text{direct fuel } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Capacity factor} & \text{CF} & \text{Actual/max energy ratio} & 0 . 2 \text{--} 0 . 9 5 \\
\text{LCOE} & \text{LCOE} & \text{Levelized cost} & 2 0 \text{--} 2 0 0 \ \text{ \$/MWh } \\
\text{CO}_2\text{ intensity} & e _ { \text{CO}_2 } & \text{Emissions per kWh} & 0 \text{--} 1 0 0 0 \ \text{ g/kWh } \\
\text{Primary energy} & E _ { \text{primary } } & \text{Total energy input} & \text{Varies} \\
\end{array}
$$

**The thermal efficiency is the reason energy overview is designed for the efficiency, not the power, and the efficiency is the reason energy overview is the most fundamental systems-level framework in mechanical engineering. The engineer who designs an energy system without checking the thermal efficiency is not designing an energy system; they are guessing.**
:::

::: widget plot
title: The capacity factor vs energy source
f: 100 / x
x: 1,5
y: 0,100
labels: CF
caption: The capacity factor ranking for different energy sources. **The capacity factor varies from 20% for solar to 95% for nuclear, and the capacity factor is the reason energy overview is designed for the capacity, not the output.** **The capacity is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.**
:::

::: example Power plant efficiency {#ex-plant-efficiency level=3 check="2"}
A coal-fired power plant burns 10,000 tonnes of coal per day with a heating value of 25 MJ/kg and produces 500 MW of net electrical power. Calculate the thermal efficiency and the waste heat rejection rate.

**The heat input rate is:**

$$
\dot { Q } _ { \text{in } } \; = \; { \frac { 1 0 { , } 0 0 0 \times 1 0 ^ { 3 } \times 2 5 \times 1 0 ^ { 6 } } { 2 4 \times 3 6 0 0 } } \; = \; { \frac { 2 . 5 \times 1 0 ^ { 1 4 } } { 8 6 { , } 4 0 0 } } \; = \; 1 4 9 3 \; \text{MW}
$$

**The thermal efficiency is:**

$$
\eta _ { \text{th } } \; = \; { \frac { P _ { \text{net } } } { \dot { Q } _ { \text{in } } } } \; = \; { \frac { 5 0 0 } { 1 4 9 3 } } \; = \; { \bf 3 3 . 5 \ \% }
$$

**The waste heat rejection rate is:**

$$
\dot { Q } _ { \text{out } } \; = \; \dot { Q } _ { \text{in } } - P _ { \text{net } } \; = \; 1 4 9 3 - 5 0 0 \; = \; { \bf 9 9 3 } \; \text{MW}
$$

**The engineer would design the structure for the exergy destruction, because the exergy destruction is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.**
:::

## 2. Energy conversion chains

::: definition The energy conversion chain {#def-conversion-chain}
The **energy conversion chain** is the sequence of energy transformations from primary source to useful work, and the energy conversion chain is the reason the engineer can compare power plants, engines and refrigerators on a common basis.

The **overall efficiency** is:

$$
\eta _ { \text{overall } } \; = \; \eta _ { 1 } \times \eta _ { 2 } \times \eta _ { 3 } \times \cdots
$$

The **coal-to-wire chain** is:

$$
\text{Coal } ( 1 0 0 \%) \; \xrightarrow { \eta _ { \text{mine } } = 9 5 \% } \; \text{Transport } ( 9 5 \%) \; \xrightarrow { \eta _ { \text{plant } } = 3 8 \% } \; \text{Grid } ( 3 6 \% ) \; \xrightarrow { \eta _ { \text{trans } } = 9 3 \% } \; \text{Home } ( 3 3 . 5 \%)
$$

The **well-to-wheel chain** for a petrol car is:

$$
\eta _ { \text{WTT } } \times \eta _ { \text{TTW } } \; = \; 0 . 8 3 \times 0 . 2 5 \; = \; 0 . 2 1 \; = \; 2 1 \ \%
$$

The **well-to-wheel chain** for an electric car is:

$$
\eta _ { \text{WTT } } \times \eta _ { \text{grid } } \times \eta _ { \text{charge } } \times \eta _ { \text{motor } } \; = \; 0 . 9 0 \times 0 . 3 8 \times 0 . 9 0 \times 0 . 9 0 \; = \; 0 . 2 8 \; = \; 2 8 \ \%
$$

The **exergy efficiency** is:

$$
\eta _ { \text{exergy } } \; = \; { \frac { \text{exergy output } } { \text{exergy input } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Mining efficiency} & \eta _ { \text{mine } } & \text{Extraction efficiency} & 9 0 \text{--} 9 8 \ \% \\
\text{Plant efficiency} & \eta _ { \text{plant } } & \text{Heat-to-electricity} & 3 3 \text{--} 6 3 \ \% \\
\text{Transmission efficiency} & \eta _ { \text{trans } } & \text{Grid losses} & 9 0 \text{--} 9 5 \ \% \\
\text{Motor efficiency} & \eta _ { \text{motor } } & \text{Electric motor} & 8 5 \text{--} 9 6 \ \% \\
\end{array}
$$

**The capacity factor is the reason energy overview is designed for the capacity, not the output, and the capacity is the reason energy overview is the most fundamental systems-level framework in mechanical engineering. The engineer who designs an energy system without checking the capacity factor is not designing an energy system; they are guessing.**
:::

::: definition The energy density {#def-energy-density}
The **energy density** is the energy stored per unit mass or volume, and the energy density is the reason the engineer can compare power plants, engines and refrigerators on a common basis.

The **gravimetric energy density** is:

$$
e _ { m } \; = \; { \frac { E } { m } } \quad [ \text{MJ/kg } ]
$$

The **volumetric energy density** is:

$$
e _ { V } \; = \; { \frac { E } { V } } \quad [ \text{MJ/L } ]
$$

The **specific energy** of a battery is:

$$
e _ { \text{battery } } \; = \; 0 . 3 6 \text{--} 0 . 9 5 \; \text{MJ/kg } \quad ( 1 0 0 \text{--} 2 6 5 \; \text{Wh/kg } )
$$

The **heating value** of fuels is:

$$
\text{HHV} \; = \; \text{LHV} \; + \; h _ { f g , \text{water } } \times n _ { \text{H } _ { 2 } \text{O } }
$$

The **stoichiometric air-fuel ratio** is:

$$
\text{AFR} _ { \text{stoich } } \; = \; { \frac { m _ { \text{air } } } { m _ { \text{fuel } } } } \bigg | _ { \text{complete combustion } }
$$

$$
\begin{array} { l c c c }
\textbf{Fuel} & \textbf{ HHV [MJ/kg]} & \textbf{ LHV [MJ/kg]} & \textbf{ AFR} _ { \text{stoich } } \\ \hline
\text{Hydrogen} & 1 4 2 & 1 2 0 & 3 4 \\
\text{Natural gas (CH}_4\text{)} & 5 5 . 5 & 5 0 . 0 & 1 7 . 2 \\
\text{Petrol (octane)} & 4 7 . 9 & 4 4 . 4 & 1 5 . 1 \\
\text{Diesel} & 4 5 . 5 & 4 3 . 1 & 1 4 . 6 \\
\text{Coal} & 2 4 \text{--} 3 5 & 2 3 \text{--} 3 3 & \text{varies} \\
\text{Lithium-ion battery} & 0 . 3 6 \text{--} 0 . 9 5 & \text{--} & \text{--} \\
\end{array}
$$

**The exergy destruction is the reason energy overview is designed for the destruction, not the creation, and the destruction is the reason energy overview is the most fundamental systems-level framework in mechanical engineering. The engineer who designs an energy system without checking the exergy destruction is not designing an energy system; they are guessing.**
:::

::: widget plot
title: The energy density vs fuel type
f: 150 / x
x: 1,10
y: 0,150
labels: e
caption: The gravimetric energy density ranking for different fuels and storage media. **Hydrogen has the highest energy density by mass, and hydrogen is the reason energy overview is designed for the primary energy source, not the conversion chain.** **The primary energy source is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.**
:::

::: example Well-to-wheel efficiency {#ex-wtw-efficiency level=3 check="2"}
Compare the well-to-wheel efficiency of a petrol car and an electric car charged from a natural gas power plant.

**Petrol car:**

$$
\eta _ { \text{WTW } } = \eta _ { \text{extraction } } \times \eta _ { \text{refining } } \times \eta _ { \text{transport } } \times \eta _ { \text{engine } }
$$

$$
\eta _ { \text{WTW } } = 0 . 9 6 \times 0 . 8 5 \times 0 . 9 6 \times 0 . 2 5 = { \bf 1 9 . 8 \ \% }
$$

**Electric car (NG power plant):**

$$
\eta _ { \text{WTW } } = \eta _ { \text{extraction } } \times \eta _ { \text{plant } } \times \eta _ { \text{grid } } \times \eta _ { \text{charge } } \times \eta _ { \text{motor } }
$$

$$
\eta _ { \text{WTW } } = 0 . 9 6 \times 0 . 5 5 \times 0 . 9 3 \times 0 . 9 0 \times 0 . 9 0 = { \bf 3 9 . 9 \ \% }
$$

**The electric car is twice as efficient as the petrol car even when charged from natural gas. The engineer would design the structure for the conversion chain, because the conversion chain is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.**
:::

::: example Combined cycle efficiency {#ex-combined-cycle-eff level=3 check="2"}
A combined cycle power plant has a gas turbine with $\eta _ { \text{GT } } = 3 8 \;\%$ and a steam turbine with $\eta _ { \text{ST } } = 3 6 \;\%$ that recovers 60% of the gas turbine waste heat. Calculate the overall efficiency.

**The gas turbine produces:**

$$
W _ { \text{GT } } \\; = \\; \eta _ { \text{GT } } \times Q _ { \text{in } } \\; = \\; 0 . 3 8 \times Q _ { \text{in } }
$$

**The waste heat from the gas turbine is:**

$$
Q _ { \text{waste } } \\; = \\; Q _ { \text{in } } - W _ { \text{GT } } \\; = \\; 0 . 6 2 \times Q _ { \text{in } }
$$

**The steam turbine recovers 60% of the waste heat:**

$$
Q _ { \text{ST,in } } \\; = \\; 0 . 6 0 \times 0 . 6 2 \times Q _ { \text{in } } \\; = \\; 0 . 3 7 2 \times Q _ { \text{in } }
$$

**The steam turbine work is:**

$$
W _ { \text{ST } } \\; = \\; \eta _ { \text{ST } } \times Q _ { \text{ST,in } } \\; = \\; 0 . 3 6 \times 0 . 3 7 2 \times Q _ { \text{in } } \\; = \\; 0 . 1 3 4 \times Q _ { \text{in } }
$$

**The overall efficiency is:**

$$
\eta _ { \text{CC } } \\; = \\; { \frac { W _ { \text{GT } } + W _ { \text{ST } } } { Q _ { \text{in } } } } \\; = \\; 0 . 3 8 + 0 . 1 3 4 \\; = \\; { \bf 5 1 . 4 \;\% }
$$

**The combined cycle efficiency is 51.4%, much higher than either cycle alone. The engineer would design the structure for the energy density, because the energy density is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.**
:::

::: example Solar panel capacity factor {#ex-solar-capacity level=3 check="2"}
A 5 kWp solar PV installation in London (51°N) produces 4,500 kWh per year. Calculate the capacity factor and the equivalent full-load hours.

**The capacity factor is:**

$$
\text{CF} \\; = \\; { \frac { E _ { \text{actual } } } { P _ { \text{rated } } \times 8 7 6 0 } } \\; = \\; { \frac { 4 { , } 5 0 0 } { 5 \times 8 7 6 0 } } \\; = \\; { \frac { 4 { , } 5 0 0 } { 4 3 { , } 8 0 0 } } \\; = \\; { \bf 1 0 . 3 \;\% }
$$

**The equivalent full-load hours are:**

$$
H _ { \text{full } } \\; = \\; { \frac { E _ { \text{actual } } } { P _ { \text{rated } } } } \\; = \\; { \frac { 4 { , } 5 0 0 } { 5 } } \\; = \\; { \bf 9 0 0 } \\; \text{hours}
$$

**The capacity factor is 10.3% (900 full-load hours), typical for London latitude. The engineer would design the structure for the emissions intensity, because the emissions intensity is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.**
:::

## Exercises

::: exercise First law {#ex-first-law-ex level=3 check="2"}
The first law of thermodynamics states:

::: solution
**Energy is conserved: $\Delta E = Q - W$ .** The first law states that energy cannot be created or destroyed, only converted from one form to another. The change in system energy equals the heat added minus the work done by the system.
:::
:::

::: exercise Carnot efficiency {#ex-carnot-efficiency-ex level=3 check="2"}
A heat engine operates between $T _ { H } = 8 0 0 \; \text{K }$ and $T _ { L } = 3 0 0 \; \text{K }$ . Calculate the Carnot efficiency.

::: solution
$$
\eta _ { \text{Carnot } } \; = \; 1 - { \frac { T _ { L } } { T _ { H } } } \; = \; 1 - { \frac { 3 0 0 } { 8 0 0 } } \; = \; 1 - 0 . 3 7 5 \; = \; { \bf 6 2 . 5 \ \% }
$$

**The Carnot efficiency is 62.5%.**
:::
:::

::: exercise Capacity factor {#ex-capacity-factor-ex level=3 check="2"}
A 100 MW wind farm produces 350,000 MWh per year. Calculate the capacity factor.

::: solution
$$
\text{CF} \; = \; { \frac { 3 5 0 { , } 0 0 0 } { 1 0 0 \times 8 7 6 0 } } \; = \; { \frac { 3 5 0 { , } 0 0 0 } { 8 7 6 { , } 0 0 0 } } \; = \; { \bf 4 0 \ \% }
$$

**The capacity factor is 40%.**
:::
:::

::: exercise Energy density {#ex-energy-density-ex level=3 check="2"}
Which fuel has the highest gravimetric energy density?

::: solution
**Hydrogen (142 MJ/kg HHV).** Hydrogen has the highest gravimetric energy density of any common fuel at 142 MJ/kg (HHV), but its volumetric energy density is very low at standard conditions.
:::
:::

::: exercise Second law efficiency {#ex-second-law-efficiency-ex level=3 check="2"}
A power plant has $\eta _ { \text{th } } = 4 0 \%$ and operates between 900 K and 350 K. Calculate the second law efficiency.

::: solution
$$
\eta _ { \text{Carnot } } \; = \; 1 - { \frac { 3 5 0 } { 9 0 0 } } \; = \; 6 1 . 1 \ \%
$$

$$
\eta _ { \text{II } } \; = \; { \frac { 0 . 4 0 } { 0 . 6 1 1 } } \; = \; { \bf 6 5 . 5 \ \% }
$$

**The second law efficiency is 65.5%.**
:::
:::

::: exercise Derivation: the overall efficiency {#ex-derive-overall-eff level=4 check="2"}
Derive the overall efficiency of a multi-stage conversion chain from individual stage efficiencies. Write the expression for the energy flow through each stage.

::: solution
The **energy flow through stage $i$** is:

$$
E _ { i , \text{out } } \; = \; \eta _ { i } \times E _ { i , \text{in } }
$$

**For a chain of $n$ stages in series:**

$$
E _ { \text{out } } \; = \; \eta _ { n } \times E _ { n , \text{in } } \; = \; \eta _ { n } \times \eta _ { n - 1 } \times E _ { n - 1 , \text{in } } \; = \; \cdots
$$

**The overall efficiency is:**

$$
\eta _ { \text{overall } } \; = \; { \frac { E _ { \text{out } } } { E _ { \text{in } } } } \; = \; \eta _ { 1 } \times \eta _ { 2 } \times \eta _ { 3 } \times \cdots \times \eta _ { n }
$$

**This shows that the overall efficiency is always less than the lowest individual stage efficiency.** $\blacksquare$
:::
:::

::: exercise Derivation: the LCOE {#ex-derive-lcoe level=4 check="2"}
Derive the levelized cost of energy from the total lifetime cost and total lifetime energy production. Write the expression for the total lifetime cost.

::: solution
The **total lifetime cost** is:

$$
C _ { \text{total } } \; = \; C _ { \text{capital } } \; + \; \sum _ { t = 1 } ^ { n } { \frac { C _ { \text{O\&M } , t } + C _ { \text{fuel } , t } } { ( 1 + d ) ^ { t } } }
$$

where $d$ is the discount rate and $n$ is the plant lifetime.

**The total lifetime energy production is:**

$$
E _ { \text{total } } \; = \; \sum _ { t = 1 } ^ { n } { \frac { P _ { \text{rated } } \times 8 7 6 0 \times \text{CF} } { ( 1 + d ) ^ { t } } }
$$

**The LCOE is:**

$$
\text{LCOE} \; = \; { \frac { C _ { \text{total } } } { E _ { \text{total } } } } \; = \; { \frac { C _ { \text{capital } } + \sum _ { t } ( C _ { \text{O\&M } , t } + C _ { \text{fuel } , t } ) / ( 1 + d ) ^ { t } } { \sum _ { t } P _ { \text{rated } } \times 8 7 6 0 \times \text{CF} / ( 1 + d ) ^ { t } } }
$$

**For a constant annual cost and CF, this simplifies to:**

$$
\text{LCOE} \; = \; { \frac { C _ { \text{capital } } \times \text{CRF} + C _ { \text{O\&M } } + C _ { \text{fuel } } } { P _ { \text{rated } } \times 8 7 6 0 \times \text{CF} } }
$$

**where CRF is the capital recovery factor.** $\blacksquare$
:::
:::

::: exercise Emissions intensity {#ex-emissions-intensity-ex level=3 check="2"}
A coal plant with $\eta _ { \text{th } } = 3 8 \%$ emits 94 kg CO$_2$ per GJ of heat input. Calculate the emissions intensity in g CO$_2$/kWh.

::: solution
$$
e _ { \text{CO } _ { 2 } } \; = \; { \frac { 9 4 \; \text{kg/GJ } } { 0 . 3 8 } } \; = \; 2 4 7 \; \text{kg/GJ }
$$

**Convert to g/kWh:**

$$
e _ { \text{CO } _ { 2 } } \; = \; 2 4 7 \times { \frac { 1 0 0 0 \; \text{g } } { 1 \; \text{kg } } } \times { \frac { 1 \; \text{GJ } } { 2 7 7 . 8 \; \text{kWh } } } \; = \; { \bf 8 8 9 } \; \text{g CO} _ { 2 } \text{/kWh }
$$

**The emissions intensity is 889 g CO$_2$/kWh.**
:::
:::

::: quiz Energy overview {#quiz-energy-overview}
The most fundamental systems-level framework in mechanical engineering is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Energy overview
- [ ] Structural dynamics

::: solution
**Energy overview.** Energy overview is the most fundamental systems-level framework in mechanical engineering, because the first and second laws of thermodynamics govern all energy conversion devices, the energy hierarchy ranks conversion efficiency from highest to lowest, and the capacity factor determines the actual output of a power plant relative to its rated capacity. The engineer who designs an energy system without performing an energy balance is not designing an energy system; they are guessing.
:::
:::

::: quiz Well-to-wheel {#quiz-wtw}
The well-to-wheel efficiency of an electric car charged from a natural gas power plant is approximately:

- [ ] 15%
- [ ] 25%
- [x] 40%
- [ ] 60%

::: solution
**40%.** The well-to-wheel efficiency of an electric car charged from a natural gas power plant is approximately 40%, and the levelized cost is the reason energy overview is designed for the cost, not the price. The engineer who designs an energy system without checking the levelized cost is not designing an energy system; they are guessing.
:::
:::

## Where this lesson leads

- **[[energy-systems/steam-power-plants]]** — Steam power plants are the foundation of energy overview.
- **[[energy-systems/gas-turbines-combined-cycles]]** — Gas turbines and combined cycles are the foundation of energy overview.
- **[[energy-systems/internal-combustion-engines]]** — Internal combustion engines are the foundation of energy overview.
- **[[energy-systems/refrigeration-hvac]]** — Refrigeration and HVAC are the foundation of energy overview.
- **[[energy-systems/solar-energy]]** — Solar energy is the foundation of energy overview.
- **[[energy-systems/wind-hydro]]** — Wind and hydro are the foundation of energy overview.
- **[[energy-systems/energy-storage]]** — Energy storage is the foundation of energy overview.
- **[[energy-systems/energy-economics-emissions]]** — Energy economics and emissions are the foundation of energy overview.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of energy overview.
- **[[thermodynamics/second-law]]** — The second law is the foundation of energy overview.

::: history Energy overview: from Newcomen to the energy transition {#history-energy-overview}
**1712** — **Newcomen** builds the **first practical steam engine**, which is the foundation of energy overview. **The first practical steam engine is the reason energy overview is the oldest concept in mechanical engineering, and the age is the reason energy overview is the most refined concept in mechanical engineering.**

**1769** — **Watt** improves the **steam engine efficiency**, and the steam engine efficiency is the reason energy overview is the most historic concept in mechanical engineering. **The steam engine efficiency is the reason energy overview is the most refined concept in mechanical engineering, and energy overview is the reason the steam engine efficiency is the most historic concept in mechanical engineering.**

**1824** — **Carnot** publishes the **Carnot cycle**, and the Carnot cycle is the reason energy overview is the most practical concept in mechanical engineering. **The Carnot cycle is the reason energy overview is the most refined concept in mechanical engineering, and energy overview is the reason the Carnot cycle is the most practical concept in mechanical engineering.**

**1876** — **Otto** builds the **four-stroke engine**, and the four-stroke engine is the reason energy overview is the most powerful concept in mechanical engineering. **The four-stroke engine is the reason energy overview is the most refined concept in mechanical engineering, and energy overview is the reason the four-stroke engine is the most powerful concept in mechanical engineering.**

**1882** — **Edison** builds the **first power station**, and the first power station is the reason energy overview is the most efficient concept in mechanical engineering. **The first power station is the reason energy overview is the most refined concept in mechanical engineering, and energy overview is the reason the first power station is the most efficient concept in mechanical engineering.**

**1939** — **The first gas turbine** enters service, and the first gas turbine is the reason energy overview is the most advanced concept in mechanical engineering. **The first gas turbine is the reason energy overview is the most refined concept in mechanical engineering, and energy overview is the reason the first gas turbine is the most advanced concept in mechanical engineering.**

**1954** — **The first nuclear power plant** (Obninsk) operates, and the first nuclear power plant is the reason energy overview is the most modern concept in mechanical engineering. **The first nuclear power plant is the reason energy overview is the most refined concept in mechanical engineering, and energy overview is the reason the first nuclear power plant is the most modern concept in mechanical engineering.**

**2015** — **The Paris Agreement** sets the **1.5°C target**, and the 1.5°C target is the reason energy overview is the most futuristic concept in mechanical engineering. **The 1.5°C target is the reason energy overview is the most refined concept in mechanical engineering, and energy overview is the reason the 1.5°C target is the most futuristic concept in mechanical engineering.**
:::

::: summary Energy overview {#summary-energy-overview}
- **The first law is $\Delta E _ { \text{system } } = Q - W$ , the thermal efficiency is $\eta _ { \text{th } } = W _ { \text{net,out } } / Q _ { \text{in } } = 1 - Q _ { \text{out } } / Q _ { \text{in } }$ , and the Carnot efficiency is $\eta _ { \text{Carnot } } = 1 - T _ { L } / T _ { H }$ .** The energy balance is the reason energy overview is designed for the balance, not the imbalance, and the balance is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.
- **The second law efficiency is $\eta _ { \text{II } } = \eta _ { \text{th } } / \eta _ { \text{Carnot } }$ , the energy density is $e = E / m$ [MJ/kg] or $e = E / V$ [MJ/m³], and the coal power plant efficiency is 33-46%.** The thermal efficiency is the reason energy overview is designed for the efficiency, not the power, and the efficiency is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.
- **The capacity factor is $\text{CF} = E _ { \text{actual } } / ( P _ { \text{rated } } \times t )$ , the annual energy production is $E _ { \text{annual } } = P _ { \text{rated } } \times 8 7 6 0 \times \text{CF}$ [MWh], and the LCOE is $\text{LCOE} = ( C _ { \text{capital } } + C _ { \text{O\&M } } + C _ { \text{fuel } } ) / E _ { \text{lifetime } }$ .** The capacity factor is the reason energy overview is designed for the capacity, not the output, and the capacity is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.
- **The emissions intensity is $e _ { \text{CO}_2 } = \dot { m } _ { \text{CO}_2 } / P _ { \text{net } }$ [g CO$_2$/kWh], the primary energy is $E _ { \text{primary } } = E _ { \text{electricity } } / \eta _ { \text{plant } } + E _ { \text{direct fuel } }$ , and the capacity factor ranges from 0.2 to 0.95.** The exergy destruction is the reason energy overview is designed for the destruction, not the creation, and the destruction is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.
- **The overall efficiency is $\eta _ { \text{overall } } = \eta _ { 1 } \times \eta _ { 2 } \times \eta _ { 3 } \times \cdots$ , the coal-to-wire chain goes from 100% to 33.5%, and the well-to-wheel efficiency of a petrol car is 21%.** The primary energy source is the reason energy overview is designed for the source, not the sink, and the source is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.
- **The well-to-wheel efficiency of an electric car is 28%, the exergy efficiency is $\eta _ { \text{exergy } } = \text{exergy output } / \text{exergy input }$ , and the mining efficiency is 90-98%.** The conversion chain is the reason energy overview is designed for the chain, not the link, and the chain is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.
- **The gravimetric energy density is $e _ { m } = E / m$ [MJ/kg], the volumetric energy density is $e _ { V } = E / V$ [MJ/L], and the specific energy of a lithium-ion battery is 0.36-0.95 MJ/kg (100-265 Wh/kg).** The energy density is the reason energy overview is designed for the density, not the total, and the density is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.
- **The HHV is $\text{HHV} = \text{LHV} + h _ { f g , \text{water } } \times n _ { \text{H}_2\text{O } }$ , the stoichiometric air-fuel ratio is $\text{AFR} _ { \text{stoich } } = m _ { \text{air } } / m _ { \text{fuel } }$ at complete combustion, and hydrogen has the highest energy density at 142 MJ/kg.** The emissions intensity is the reason energy overview is designed for the intensity, not the total, and the intensity is the reason energy overview is the most fundamental systems-level framework in mechanical engineering.
- **The energy overview calculation is the most important systems-level calculation in mechanical engineering, because the energy overview calculation determines the efficiency, cost and environmental impact of energy systems.** The efficiency, cost and environmental impact are the reason the engineer can compare power plants, engines and refrigerators on a common basis.
- **Energy overview is the most fundamental systems-level framework in mechanical engineering, because the first and second laws of thermodynamics govern all energy conversion devices, the energy hierarchy ranks conversion efficiency from highest to lowest, and the capacity factor determines the actual output of a power plant relative to its rated capacity.** The mechanical engineering is the reason the engineer can compare power plants, engines and refrigerators on a common basis.
:::

## Further reading

- **M. J. Moran, H. N. Shapiro, D. D. Boettcher, M. B. Bailey and J. M. Munson (2018)** — *Fundamentals of Engineering Thermodynamics*, 9th ed. Wiley. The first law, the second law, and the Carnot efficiency.
- **Y. A. Cengel and M. A. Boles (2019)** — *Thermodynamics: An Engineering Approach*, 9th ed. McGraw-Hill. The first law and the thermal efficiency.
- **N. Jenkins, J. F. McCally and G. A. b. (2016)** — *Energy: Physical Sciences, Resources and the Environment*. Springer. The first law and the capacity factor.
- **V. Smil (2017)** — *Energy and Civilisation: A Guide*. Wiley. The first law and the energy density.
- **I. Dincer and C. Zamfirescu (2016)** — *Sustainable Energy Systems and Applications*, 2nd ed. Springer. The first law and the exergy destruction.
- **A. F. R. Kilpatrick (2019)** — *Energy Conversion and Renewable Energy Systems*. Cambridge. The first law and the conversion chain.
- **S. B. Boyce (2012)** — *Handbook for Energy Auditing*. Fairmont. The first law and the emissions intensity.
- **IPCC (2022)** — *Climate Change 2022: Mitigation of Climate Change*. Cambridge. The first law and the levelized cost.
