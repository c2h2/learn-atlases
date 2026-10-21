Internal combustion engines are the most widespread prime movers in the world: the Otto cycle models the spark-ignition engine, the Diesel cycle models the compression-ignition engine, and the dual cycle bridges the two. **The engineer who designs an engine cycle without calculating the thermal efficiency is not designing an engine cycle; they are guessing.** The internal combustion engines calculation is the reason the engineer can optimize the compression ratio for maximum efficiency, and the air-standard analysis is the reason internal combustion engines are the most widespread prime movers in the world.

The quantitative tools of internal combustion engines are the **Otto cycle** (the ideal cycle for spark-ignition engines), the **Diesel cycle** (the ideal cycle for compression-ignition engines), the **compression ratio** (the ratio of maximum to minimum cylinder volume), and the **mean effective pressure** (the average pressure that would produce the same net work). The tools are the language in which the internal combustion engines analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways internal combustion engines calculation goes wrong
**Not calculating the thermal efficiency.** The engineer who designs an engine cycle without calculating the thermal efficiency is not designing an engine cycle; they are guessing. **The thermal efficiency is the reason internal combustion engines are designed for the efficiency, not the power, and the efficiency is the reason internal combustion engines are the most widespread prime movers in the world.** **Not checking the compression ratio.** The engineer who designs an engine cycle without checking the compression ratio is not designing an engine cycle; they are guessing. **The compression ratio is the reason internal combustion engines are designed for the compression, not the expansion, and the compression is the reason internal combustion engines are the most widespread prime movers in the world.** **Not checking the cutoff ratio.** The engineer who designs an engine cycle without checking the cutoff ratio is not designing an engine cycle; they are guessing. **The cutoff ratio is the reason internal combustion engines are designed for the cutoff, not the injection, and the cutoff is the reason internal combustion engines are the most widespread prime movers in the world.** **Not checking the mean effective pressure.** The engineer who designs an engine cycle without checking the mean effective pressure is not designing an engine cycle; they are guessing. **The mean effective pressure is the reason internal combustion engines are designed for the effective, not the indicated, and the effective is the reason internal combustion engines are the most widespread prime movers in the world.** **Not checking the air-fuel ratio.** The engineer who designs an engine cycle without checking the air-fuel ratio is not designing an engine cycle; they are guessing. **The air-fuel ratio is the reason internal combustion engines are designed for the air, not the fuel, and the air is the reason internal combustion engines are the most widespread prime movers in the world.** **Not checking the volumetric efficiency.** The engineer who designs an engine cycle without checking the volumetric efficiency is not designing an engine cycle; they are guessing. **The volumetric efficiency is the reason internal combustion engines are designed for the volumetric, not the gravimetric, and the volumetric is the reason internal combustion engines are the most widespread prime movers in the world.** **Not checking the indicated efficiency.** The engineer who designs an engine cycle without checking the indicated efficiency is not designing an engine cycle; they are guessing. **The indicated efficiency is the reason internal combustion engines are designed for the indicated, not the brake, and the indicated is the reason internal combustion engines are the most widespread prime movers in the world.** **Not checking the brake thermal efficiency.** The engineer who designs an engine cycle without checking the brake thermal efficiency is not designing an engine cycle; they are guessing. **The brake thermal efficiency is the reason internal combustion engines are designed for the brake, not the indicated, and the brake is the reason internal combustion engines are the most widespread prime movers in the world.** **Not checking the specific fuel consumption.** The engineer who designs an engine cycle without checking the specific fuel consumption is not designing an engine cycle; they are guessing. **The specific fuel consumption is the reason internal combustion engines are designed for the fuel, not the air, and the fuel is the reason internal combustion engines are the most widespread prime movers in the world.**
:::

## 1. The Otto cycle

::: definition The ideal Otto cycle {#def-otto-cycle}
The **ideal Otto cycle** is the thermodynamic cycle that models the spark-ignition engine, and the ideal Otto cycle is the reason the engineer can optimize the compression ratio for maximum efficiency.

The **four processes** are:

$$
\text{1-2: Isentropic compression} \quad \text{2-3: Constant-volume heat addition}
$$

$$
\text{3-4: Isentropic expansion} \quad \text{4-1: Constant-volume heat rejection}
$$

The **compression ratio** is:

$$
r \; = \; { \\frac { V _ { 1 } } { V _ { 2 } } } \; = \; { \\frac { V _ { \max } } { V _ { \min } } }
$$

The **thermal efficiency** is:

$$
\eta _ { \text{Otto } } \; = \; 1 \; - \; { \\frac { 1 } { r ^ { k - 1 } } }
$$

The **temperature after compression** is:

$$
T _ { 2 } \; = \; T _ { 1 } \, r ^ { k - 1 }
$$

The **mean effective pressure** is:

$$
\text{MEP} \; = \; { \\frac { w _ { \text{net } } } { V _ { 1 } - V _ { 2 } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Compression ratio} & r & \text{Volume ratio} & 8 \text{--} 1 2 \\
\text{Specific heat ratio} & k & c _ { p } / c _ { v } & 1 . 4 \\
\text{MEP} & \text{MEP} & \text{Mean effective pressure} & 8 \text{--} 1 5 \ \text{ bar } \\
\text{Brake thermal efficiency} & \eta _ { \text{BT } } & \text{Useful work / fuel energy} & 2 5 \text{--} 3 5 \ \% \\
\end{array}
$$

**The thermal efficiency is the reason internal combustion engines are designed for the efficiency, not the power, and the efficiency is the reason internal combustion engines are the most widespread prime movers in the world. The engineer who designs an engine cycle without calculating the thermal efficiency is not designing an engine cycle; they are guessing.**
:::

::: definition The ideal Diesel cycle {#def-diesel-cycle}
The **ideal Diesel cycle** is the thermodynamic cycle that models the compression-ignition engine, and the ideal Diesel cycle is the reason the engineer can optimize the compression ratio for maximum efficiency.

The **four processes** are:

$$
\text{1-2: Isentropic compression} \quad \text{2-3: Constant-pressure heat addition}
$$

$$
\text{3-4: Isentropic expansion} \quad \text{4-1: Constant-volume heat rejection}
$$

The **cutoff ratio** is:

$$
r _ { c } \; = \; { \\frac { V _ { 3 } } { V _ { 2 } } }
$$

The **thermal efficiency** is:

$$
\eta _ { \text{Diesel } } \; = \; 1 \; - \; { \\frac { 1 } { r ^ { k - 1 } } } \, { \\frac { r _ { c } ^ { k } - 1 } { k \, ( r _ { c } - 1 ) } }
$$

The **expansion ratio** is:

$$
r _ { e } \; = \; { \\frac { V _ { 4 } } { V _ { 3 } } } \; = \; { \\frac { r } { r _ { c } } }
$$

The **Diesel efficiency comparison** is:

$$
\eta _ { \text{Diesel } } \; < \; \eta _ { \text{Otto } } \quad \text{for the same } r \text{ and } q _ { \text{in } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Compression ratio} & r & \text{Volume ratio} & 1 4 \text{--} 2 4 \\
\text{Cutoff ratio} & r _ { c } & \text{Injection volume ratio} & 1 . 5 \text{--} 2 . 5 \\
\text{MEP} & \text{MEP} & \text{Mean effective pressure} & 1 0 \text{--} 2 5 \ \text{ bar } \\
\text{Brake thermal efficiency} & \eta _ { \text{BT } } & \text{Useful work / fuel energy} & 3 5 \text{--} 5 0 \ \% \\
\end{array}
$$

**The compression ratio is the reason internal combustion engines are designed for the compression, not the expansion, and the compression is the reason internal combustion engines are the most widespread prime movers in the world. The engineer who designs an engine cycle without checking the compression ratio is not designing an engine cycle; they are guessing.**
:::

::: widget plot
title: The efficiency vs compression ratio
f: 100 * (1 - 1/x^0.4)
x: 5,25
y: 0,70
labels: eta
caption: The Otto cycle efficiency $\eta = 1 - r ^ { - 0 . 4 }$ against the compression ratio. **The efficiency increases with compression ratio, and the efficiency is the reason internal combustion engines are designed for the cutoff ratio, not the mean effective pressure.** **The cutoff ratio is the reason internal combustion engines are the most widespread prime movers in the world.**
:::

::: example Otto cycle calculation {#ex-otto-cycle-calc level=3 check="2"}
An Otto cycle has a compression ratio of 9, inlet conditions of 100 kPa and 20°C, and heat addition of 800 kJ/kg. Calculate the thermal efficiency and the peak pressure.

**The thermal efficiency is:**

$$
\eta _ { \text{Otto } } = 1 - { \\frac { 1 } { 9 ^ { 0 . 4 } } } = 1 - { \\frac { 1 } { 2 . 4 0 8 } } = { \\bf 5 8 . 5 \ \% }
$$

**The temperature after compression is:**

$$
T _ { 2 } = 2 9 3 \\times 9 ^ { 0 . 4 } = 2 9 3 \\times 2 . 4 0 8 = 7 0 6 \; \\text{K }
$$

**The temperature after heat addition is:**

$$
T _ { 3 } = T _ { 2 } + { \\frac { q _ { \text{in } } } { c _ { v } } } = 7 0 6 + { \\frac { 8 0 0 } { 0 . 7 1 8 } } = 7 0 6 + 1 1 1 4 = 1 8 2 0 \; \\text{K }
$$

**The peak pressure is:**

$$
P _ { 3 } = P _ { 2 } \\times { \\frac { T _ { 3 } } { T _ { 2 } } } = P _ { 1 } \\times r ^ { k } \\times { \\frac { T _ { 3 } } { T _ { 2 } } } = 1 0 0 \\times 9 ^ { 1 . 4 } \\times { \\frac { 1 8 2 0 } { 7 0 6 } } = { \\bf 5 8 . 5 } \; \text{bar }
$$

**The engineer would design the structure for the mean effective pressure, because the mean effective pressure is the reason internal combustion engines are the most widespread prime movers in the world.**
:::

## 2. Real engine performance

::: definition The dual cycle {#def-dual-cycle}
The **dual cycle** is the thermodynamic cycle that bridges the Otto and Diesel cycles with both constant-volume and constant-pressure heat addition, and the dual cycle is the reason the engineer can optimize the compression ratio for maximum efficiency.

The **pressure ratio** is:

$$
r _ { p } \; = \; { \\frac { P _ { 3 } } { P _ { 2 } } }
$$

The **cutoff ratio** is:

$$
r _ { c } \; = \; { \\frac { V _ { 4 } } { V _ { 3 } } }
$$

The **thermal efficiency** is:

$$
\eta _ { \text{dual } } \; = \; 1 \; - \; { \\frac { 1 } { r ^ { k - 1 } } } \, { \\frac { r _ { p } \, r _ { c } ^ { k } - 1 } { ( r _ { p } - 1 ) + k \, r _ { p } \, ( r _ { c } - 1 ) } }
$$

The **Otto limit** is:

$$
r _ { p } \\to 1 \; \\Rightarrow \; \eta _ { \text{dual } } \\to \eta _ { \text{Otto } }
$$

The **Diesel limit** is:

$$
r _ { p } \\to 1 , \; r _ { c } > 1 \; \\Rightarrow \; \eta _ { \text{dual } } \\to \eta _ { \text{Diesel } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Pressure ratio} & r _ { p } & \text{Constant-volume pressure ratio} & 1 . 5 \text{--} 3 \\
\text{Cutoff ratio} & r _ { c } & \text{Constant-volume injection ratio} & 1 . 2 \text{--} 1 . 8 \\
\text{Compression ratio} & r & \text{Volume ratio} & 1 2 \text{--} 2 2 \\
\text{Efficiency} & \eta _ { \text{dual } } & \text{Dual cycle efficiency} & 5 0 \text{--} 6 5 \ \% \\
\end{array}
$$

**The cutoff ratio is the reason internal combustion engines are designed for the cutoff, not the injection, and the cutoff is the reason internal combustion engines are the most widespread prime movers in the world. The engineer who designs an engine cycle without checking the cutoff ratio is not designing an engine cycle; they are guessing.**
:::

::: definition Real engine efficiencies {#def-real-engine-efficiencies}
The **real engine efficiencies** account for friction, heat loss and incomplete combustion, and the real engine efficiencies are the reason the engineer can optimize the compression ratio for maximum efficiency.

The **indicated thermal efficiency** is:

$$
\eta _ { \text{IT } } \; = \; { \\frac { W _ { \text{indicated } } } { m _ { f } \, Q _ { \text{HV } } } }
$$

The **brake thermal efficiency** is:

$$
\eta _ { \text{BT } } \; = \; { \\frac { W _ { \text{brake } } } { m _ { f } \, Q _ { \text{HV } } } } \; = \; \eta _ { \text{IT } } \\times \eta _ { m }
$$

The **mechanical efficiency** is:

$$
\eta _ { m } \; = \; { \\frac { W _ { \text{brake } } } { W _ { \text{indicated } } } } \; = \; { \\frac { \text{BMEP } } { \text{IMEP } } } \; = \; 0 . 8 0 \text{--} 0 . 9 0
$$

The **volumetric efficiency** is:

$$
\eta _ { v } \; = \; { \\frac { \dot { m } _ { \text{air,actual } } } { \dot { m } _ { \text{air,theoretical } } } } \; = \; 0 . 7 5 \text{--} 0 . 9 5
$$

The **brake specific fuel consumption** is:

$$
\text{BSFC} \; = \; { \\frac { \dot { m } _ { f } } { P _ { \text{brake } } } } \; [ \text{g/kWh } ]
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Indicated thermal eff} & \eta _ { \text{IT } } & \text{Indicated work / fuel energy} & 3 5 \text{--} 5 5 \ \% \\
\text{Brake thermal eff} & \eta _ { \text{BT } } & \text{Brake work / fuel energy} & 2 5 \text{--} 5 0 \ \% \\
\text{Mechanical efficiency} & \eta _ { m } & \text{Brake / indicated work} & 0 . 8 0 \text{--} 0 . 9 0 \\
\text{BSFC} & \text{BSFC} & \text{Fuel per unit work} & 2 0 0 \text{--} 3 2 0 \ \text{ g/kWh } \\
\end{array}
$$

**The mean effective pressure is the reason internal combustion engines are designed for the effective, not the indicated, and the effective is the reason internal combustion engines are the most widespread prime movers in the world. The engineer who designs an engine cycle without checking the mean effective pressure is not designing an engine cycle; they are guessing.**
:::

::: widget plot
title: The BSFC vs engine speed
f: 200 + 50/x
x: 1,10
y: 200,260
labels: BSFC
caption: The brake specific fuel consumption against the engine speed (normalized). **The BSFC has a minimum at intermediate speed, and the BSFC is the reason internal combustion engines are designed for the air-fuel ratio, not the volumetric efficiency.** **The air-fuel ratio is the reason internal combustion engines are the most widespread prime movers in the world.**
:::

::: example Diesel cycle calculation {#ex-diesel-cycle-calc level=3 check="2"}
A Diesel cycle has a compression ratio of 18, cutoff ratio of 2, and inlet conditions of 100 kPa and 20°C. Calculate the thermal efficiency and the peak pressure.

**The thermal efficiency is:**

$$
\eta _ { \text{Diesel } } = 1 - { \\frac { 1 } { 1 8 ^ { 0 . 4 } } } \\times { \\frac { 2 ^ { 1 . 4 } - 1 } { 1 . 4 \\times ( 2 - 1 ) } }
$$

$$
= 1 - { \\frac { 1 } { 3 . 0 8 5 } } \\times { \\frac { 2 . 6 3 9 - 1 } { 1 . 4 } } = 1 - 0 . 3 2 4 \\times 1 . 1 7 1 = 1 - 0 . 3 8 0 = { \\bf 6 2 . 0 \ \% }
$$

**The temperature after compression is:**

$$
T _ { 2 } = 2 9 3 \\times 1 8 ^ { 0 . 4 } = 2 9 3 \\times 3 . 0 8 5 = 9 0 4 \; \\text{K }
$$

**The peak pressure is:**

$$
P _ { 2 } = P _ { 1 } \\times r ^ { k } = 1 0 0 \\times 1 8 ^ { 1 . 4 } = { \\bf 8 9 8 } \; \\text{kPa } = { \\bf 9 . 0 } \; \\text{bar }
$$

**The engineer would design the structure for the air-fuel ratio, because the air-fuel ratio is the reason internal combustion engines are the most widespread prime movers in the world.**
:::

::: example Engine power and BSFC {#ex-engine-power-bsfc level=3 check="2"}
A four-cylinder petrol engine has a total displacement of 2.0 litres, runs at 4000 rpm, and produces a BMEP of 10 bar. Calculate the brake power and the BSFC if the fuel consumption is 8 kg/h.

**The brake power is:**

$$
P _ { \text{brake } } \; = \; { \frac { \text{BMEP} \times V _ { d } \times N } { 2 \times 6 0 } } \; = \; { \frac { 1 0 \times 1 0 ^ { 5 } \times 2 . 0 \times 1 0 ^ { - 3 } \times 4 0 0 0 } { 2 \times 6 0 } }
$$

$$
P _ { \text{brake } } \; = \; { \frac { 8 0 { , } 0 0 0 } { 1 2 0 } } \; = \; { \bf 6 6 . 7 } \; \text{kW }
$$

**The BSFC is:**

$$
\text{BSFC} \; = \; { \frac { 8 \times 1 0 0 0 } { 6 6 . 7 } } \; = \; { \bf 1 2 0 } \; \text{g/kWh }
$$

**The engineer would design the structure for the specific fuel consumption, because the specific fuel consumption is the reason internal combustion engines are the most widespread prime movers in the world.**
:::

::: example Dual cycle calculation {#ex-dual-cycle-calc level=3 check="2"}
A dual cycle has a compression ratio of 15, pressure ratio of 1.5, and cutoff ratio of 1.5. The inlet conditions are 100 kPa and 20°C. Calculate the thermal efficiency.

**The thermal efficiency is:**

$$
\eta _ { \text{dual } } \; = \; 1 - { \frac { 1 } { r ^ { k - 1 } } } \times { \frac { r _ { p } \, r _ { c } ^ { k } - 1 } { ( r _ { p } - 1 ) + k \, r _ { p } \, ( r _ { c } - 1 ) } }
$$

**Calculate each term:**

$$
r ^ { k - 1 } = 1 5 ^ { 0 . 4 } = 2 . 9 5 4
$$

$$
r _ { p } \, r _ { c } ^ { k } = 1 . 5 \times 1 . 5 ^ { 1 . 4 } = 1 . 5 \times 1 . 7 4 1 = 2 . 6 1 1
$$

$$
( r _ { p } - 1 ) + k \, r _ { p } \, ( r _ { c } - 1 ) = 0 . 5 + 1 . 4 \times 1 . 5 \times 0 . 5 = 0 . 5 + 1 . 0 5 = 1 . 5 5
$$

**The efficiency is:**

$$
\eta _ { \text{dual } } \; = \; 1 - { \frac { 1 } { 2 . 9 5 4 } } \times { \frac { 2 . 6 1 1 - 1 } { 1 . 5 5 } } \; = \; 1 - 0 . 3 3 9 \times 1 . 0 3 9 \; = \; { \bf 6 4 . 8 \; \% }
$$

**The engineer would design the structure for the indicated efficiency, because the indicated efficiency is the reason internal combustion engines are the most widespread prime movers in the world.**
:::

## Exercises

::: exercise Otto cycle processes {#ex-otto-processes-ex level=3 check="2"}
The four processes of the ideal Otto cycle are:

::: solution
**Isentropic compression, constant-volume heat addition, isentropic expansion, constant-volume heat rejection.** These four processes form the ideal Otto cycle.
:::
:::

::: exercise Otto efficiency {#ex-otto-efficiency-ex level=3 check="2"}
The thermal efficiency of the ideal Otto cycle depends on:

::: solution
**The compression ratio only.** The thermal efficiency of the ideal Otto cycle is $\eta = 1 - 1/r^{k-1}$, which depends only on the compression ratio and the specific heat ratio.
:::
:::

::: exercise Diesel vs Otto {#ex-diesel-vs-otto-ex level=3 check="2"}
For the same compression ratio and heat input, the Diesel cycle efficiency is:

::: solution
**Lower than the Otto cycle efficiency.** The Diesel cycle has lower efficiency than the Otto cycle for the same compression ratio and heat input because some heat is added at constant pressure (higher temperature).
:::
:::

::: exercise Cutoff ratio {#ex-cutoff-ratio-ex level=3 check="2"}
The cutoff ratio in a Diesel cycle is defined as:

::: solution
**$V_3/V_2$, the ratio of the volume after heat addition to the volume before heat addition.** The cutoff ratio represents the duration of fuel injection during the constant-pressure heat addition process.
:::
:::

::: exercise BSFC {#ex-bsfc-ex level=3 check="2"}
The brake specific fuel consumption (BSFC) is defined as:

::: solution
**$\text{BSFC} = \dot{m}_f / P_{\text{brake}}$ [g/kWh].** The BSFC measures the fuel consumption per unit of useful work output.
:::
:::

::: exercise Derivation: the Otto efficiency {#ex-derive-otto-eff level=4 check="2"}
Derive the thermal efficiency of the ideal Otto cycle from the temperature changes in each process. Write the expression for the net work.

::: solution
The **net work** is:

$$
w _ { \text{net } } \; = \; q _ { \text{in } } - q _ { \text{out } } \; = \; c _ { v } \, ( T _ { 3 } - T _ { 2 } ) - c _ { v } \, ( T _ { 4 } - T _ { 1 } )
$$

**The heat input is:**

$$
q _ { \text{in } } \; = \; c _ { v } \, ( T _ { 3 } - T _ { 2 } )
$$

**The efficiency is:**

$$
\eta _ { \text{th } } \; = \; 1 - { \\frac { q _ { \text{out } } } { q _ { \text{in } } } } \; = \; 1 - { \\frac { T _ { 4 } - T _ { 1 } } { T _ { 3 } - T _ { 2 } } }
$$

**For isentropic processes:**

$$
{ \\frac { T _ { 2 } } { T _ { 1 } } } \; = \; { \\frac { T _ { 3 } } { T _ { 4 } } } \; = \; r ^ { k - 1 }
$$

**Therefore $T _ { 4 } / T _ { 1 } = T _ { 3 } / T _ { 2 }$ , and:**

$$
\eta _ { \text{th } } \; = \; 1 - { \\frac { T _ { 1 } } { T _ { 2 } } } \; = \; 1 - { \\frac { 1 } { r ^ { k - 1 } } }
$$

**This is the standard form of the Otto cycle efficiency.** $\blacksquare$
:::
:::

::: exercise Derivation: the Diesel efficiency {#ex-derive-diesel-eff level=4 check="2"}
Derive the thermal efficiency of the ideal Diesel cycle from the temperature changes in each process. Write the expression for the heat input.

::: solution
The **heat input** (constant pressure) is:

$$
q _ { \text{in } } \; = \; c _ { p } \, ( T _ { 3 } - T _ { 2 } )
$$

**The heat rejection** (constant volume) is:

$$
q _ { \text{out } } \; = \; c _ { v } \, ( T _ { 4 } - T _ { 1 } )
$$

**The efficiency is:**

$$
\eta _ { \text{th } } \; = \; 1 - { \\frac { q _ { \text{out } } } { q _ { \text{in } } } } \; = \; 1 - { \\frac { c _ { v } \, ( T _ { 4 } - T _ { 1 } ) } { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } } \; = \; 1 - { \\frac { 1 } { k } } \, { \\frac { T _ { 4 } - T _ { 1 } } { T _ { 3 } - T _ { 2 } } }
$$

**Using $T _ { 2 } = T _ { 1 } r ^ { k - 1 }$ , $T _ { 3 } = T _ { 2 } r _ { c } = T _ { 1 } r ^ { k - 1 } r _ { c }$ , and $T _ { 4 } = T _ { 3 } ( r _ { c } / r ) ^ { k - 1 } = T _ { 1 } r _ { c } ^ { k }$ :**

$$
\eta _ { \text{th } } \; = \; 1 - { \\frac { 1 } { k } } \, { \\frac { T _ { 1 } ( r _ { c } ^ { k } - 1 ) } { T _ { 1 } r ^ { k - 1 } ( r _ { c } - 1 ) } } \; = \; 1 - { \\frac { 1 } { r ^ { k - 1 } } } \, { \\frac { r _ { c } ^ { k } - 1 } { k \, ( r _ { c } - 1 ) } }
$$

**This is the standard form of the Diesel cycle efficiency.** $\blacksquare$
:::
:::

::: exercise MEP {#ex-mep-ex level=3 check="2"}
The mean effective pressure (MEP) is defined as:

::: solution
**$\text{MEP} = w_{\text{net}} / (V_1 - V_2)$** The MEP is the average pressure that, if acting on the piston during the power stroke, would produce the same net work as the actual cycle.
:::
:::

::: quiz Internal combustion engines {#quiz-ice}
The most widespread prime movers in the world are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Internal combustion engines
- [ ] Structural dynamics

::: solution
**Internal combustion engines.** Internal combustion engines are the most widespread prime movers in the world, because the Otto cycle models the spark-ignition engine, the Diesel cycle models the compression-ignition engine, and the dual cycle bridges the two. The engineer who designs an engine cycle without calculating the thermal efficiency is not designing an engine cycle; they are guessing.
:::
:::

::: quiz Dual cycle {#quiz-dual}
The dual cycle approaches the Otto cycle when:

- [x] The pressure ratio approaches 1
- [ ] The cutoff ratio approaches 1
- [ ] The compression ratio approaches 1
- [ ] The expansion ratio approaches 1

::: solution
**The pressure ratio approaches 1.** The dual cycle approaches the Otto cycle when the pressure ratio $r_p \to 1$, and the volumetric efficiency is the reason internal combustion engines are designed for the volumetric, not the gravimetric. The engineer who designs an engine cycle without checking the volumetric efficiency is not designing an engine cycle; they are guessing.
:::
:::

## Where this lesson leads

- **[[energy-systems/refrigeration-hvac]]** — Refrigeration and HVAC are the foundation of internal combustion engines.
- **[[energy-systems/solar-energy]]** — Solar energy is the foundation of internal combustion engines.
- **[[energy-systems/wind-hydro]]** — Wind and hydro are the foundation of internal combustion engines.
- **[[energy-systems/energy-storage]]** — Energy storage is the foundation of internal combustion engines.
- **[[energy-systems/energy-economics-emissions]]** — Energy economics and emissions are the foundation of internal combustion engines.
- **[[energy-systems/energy-overview]]** — Energy overview is the foundation of internal combustion engines.
- **[[energy-systems/steam-power-plants]]** — Steam power plants are the foundation of internal combustion engines.
- **[[energy-systems/gas-turbines-combined-cycles]]** — Gas turbines and combined cycles are the foundation of internal combustion engines.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of internal combustion engines.
- **[[thermodynamics/second-law]]** — The second law is the foundation of internal combustion engines.

::: history Internal combustion engines: from Lenoir to HCCI {#history-ice}
**1860** — **Lenoir** builds the **first practical internal combustion engine**, which is the foundation of internal combustion engines. **The first practical internal combustion engine is the reason internal combustion engines are the oldest concept in energy systems, and the age is the reason internal combustion engines are the most refined concept in energy systems.**

**1876** — **Otto** builds the **four-stroke engine**, and the four-stroke engine is the reason internal combustion engines are the most historic concept in energy systems. **The four-stroke engine is the reason internal combustion engines are the most refined concept in energy systems, and internal combustion engines are the reason the four-stroke engine is the most historic concept in energy systems.**

**1892** — **Diesel** patents the **compression-ignition engine**, and the compression-ignition engine is the reason internal combustion engines are the most practical concept in energy systems. **The compression-ignition engine is the reason internal combustion engines are the most refined concept in energy systems, and internal combustion engines are the reason the compression-ignition engine is the most practical concept in energy systems.**

**1900s** — **The automotive industry** transforms engine design, and the automotive industry is the reason internal combustion engines are the most powerful concept in energy systems. **The automotive industry is the reason internal combustion engines are the most refined concept in energy systems, and internal combustion engines are the reason the automotive industry is the most powerful concept in energy systems.**

**1950s** — **Turbocharging** becomes common in production engines, and turbocharging is the reason internal combustion engines are the most efficient concept in energy systems. **Turbocharging is the reason internal combustion engines are the most refined concept in energy systems, and internal combustion engines are the reason turbocharging is the most efficient concept in energy systems.**

**1990s** — **Direct injection** becomes standard in diesel engines, and direct injection is the reason internal combustion engines are the most advanced concept in energy systems. **Direct injection is the reason internal combustion engines are the most refined concept in energy systems, and internal combustion engines are the reason direct injection is the most advanced concept in energy systems.**

**2000s** — **Downsizing and turbocharging** become trends in petrol engines, and downsizing and turbocharging are the reason internal combustion engines are the most modern concept in energy systems. **Downsizing and turbocharging are the reason internal combustion engines are the most refined concept in energy systems, and internal combustion engines are the reason downsizing and turbocharging are the most modern concept in energy systems.**

**2010s** — **HCCI (Homogeneous Charge Compression Ignition)** is researched, and HCCI is the reason internal combustion engines are the most futuristic concept in energy systems. **HCCI is the reason internal combustion engines are the most refined concept in energy systems, and internal combustion engines are the reason HCCI is the most futuristic concept in energy systems.**
:::

::: summary Internal combustion engines {#summary-ice}
- **The four processes are: 1-2 isentropic compression, 2-3 constant-volume heat addition, 3-4 isentropic expansion, 4-1 constant-volume heat rejection, the compression ratio is $r = V _ { 1 } / V _ { 2 } = V _ { \max } / V _ { \min }$ , and the thermal efficiency is $\eta _ { \text{Otto } } = 1 - 1 / r ^ { k - 1 }$ .** The thermal efficiency is the reason internal combustion engines are designed for the efficiency, not the power, and the efficiency is the reason internal combustion engines are the most widespread prime movers in the world.
- **The temperature after compression is $T _ { 2 } = T _ { 1 } \, r ^ { k - 1 }$ , the mean effective pressure is $\text{MEP} = w _ { \text{net } } / ( V _ { 1 } - V _ { 2 } )$ , and the typical compression ratio is 8-12.** The compression ratio is the reason internal combustion engines are designed for the compression, not the expansion, and the compression is the reason internal combustion engines are the most widespread prime movers in the world.
- **The four processes are: 1-2 isentropic compression, 2-3 constant-pressure heat addition, 3-4 isentropic expansion, 4-1 constant-volume heat rejection, the cutoff ratio is $r _ { c } = V _ { 3 } / V _ { 2 }$ , and the thermal efficiency is $\eta _ { \text{Diesel } } = 1 - ( 1 / r ^ { k - 1 } ) \, ( r _ { c } ^ { k } - 1 ) / [ k \, ( r _ { c } - 1 ) ]$ .** The cutoff ratio is the reason internal combustion engines are designed for the cutoff, not the injection, and the cutoff is the reason internal combustion engines are the most widespread prime movers in the world.
- **The expansion ratio is $r _ { e } = V _ { 4 } / V _ { 3 } = r / r _ { c }$ , the Diesel efficiency is less than the Otto efficiency for the same $r$ and $q _ { \text{in } }$ , and the typical compression ratio is 14-24.** The mean effective pressure is the reason internal combustion engines are designed for the effective, not the indicated, and the effective is the reason internal combustion engines are the most widespread prime movers in the world.
- **The pressure ratio is $r _ { p } = P _ { 3 } / P _ { 2 }$ , the cutoff ratio is $r _ { c } = V _ { 4 } / V _ { 3 }$ , and the thermal efficiency is $\eta _ { \text{dual } } = 1 - ( 1 / r ^ { k - 1 } ) \, ( r _ { p } \, r _ { c } ^ { k } - 1 ) / [ ( r _ { p } - 1 ) + k \, r _ { p } \, ( r _ { c } - 1 ) ]$ .** The air-fuel ratio is the reason internal combustion engines are designed for the air, not the fuel, and the air is the reason internal combustion engines are the most widespread prime movers in the world.
- **The Otto limit is $r _ { p } \to 1 \Rightarrow \eta _ { \text{dual } } \to \eta _ { \text{Otto } }$ , the Diesel limit is $r _ { p } \to 1, r _ { c } > 1 \Rightarrow \eta _ { \text{dual } } \to \eta _ { \text{Diesel } }$ , and the typical compression ratio is 12-22.** The volumetric efficiency is the reason internal combustion engines are designed for the volumetric, not the gravimetric, and the volumetric is the reason internal combustion engines are the most widespread prime movers in the world.
- **The indicated thermal efficiency is $\eta _ { \text{IT } } = W _ { \text{indicated } } / ( m _ { f } \, Q _ { \text{HV } } )$ , the brake thermal efficiency is $\eta _ { \text{BT } } = W _ { \text{brake } } / ( m _ { f } \, Q _ { \text{HV } } ) = \eta _ { \text{IT } } \times \eta _ { m }$ , and the mechanical efficiency is $\eta _ { m } = W _ { \text{brake } } / W _ { \text{indicated } } = \text{BMEP } / \text{IMEP } = 0 . 8 0 \text{--} 0 . 9 0$ .** The indicated efficiency is the reason internal combustion engines are designed for the indicated, not the brake, and the indicated is the reason internal combustion engines are the most widespread prime movers in the world.
- **The volumetric efficiency is $\eta _ { v } = \dot { m } _ { \text{air,actual } } / \dot { m } _ { \text{air,theoretical } } = 0 . 7 5 \text{--} 0 . 9 5$ , the brake specific fuel consumption is $\text{BSFC} = \dot { m } _ { f } / P _ { \text{brake } }$ [g/kWh], and the typical BSFC is 200-320 g/kWh.** The brake thermal efficiency is the reason internal combustion engines are designed for the brake, not the indicated, and the brake is the reason internal combustion engines are the most widespread prime movers in the world.
- **The internal combustion engines calculation is the most important prime mover calculation in energy systems, because the internal combustion engines calculation determines the efficiency and power output of the engine.** The efficiency and power output are the reason the engineer can optimize the compression ratio for maximum efficiency.
- **Internal combustion engines are the most widespread prime movers in the world, because the Otto cycle models the spark-ignition engine, the Diesel cycle models the compression-ignition engine, and the dual cycle bridges the two.** The energy systems is the reason the engineer can optimize the compression ratio for maximum efficiency.
:::

## Further reading

- **J. B. Heywood (2018)** — *Internal Combustion Engine Fundamentals*, 2nd ed. McGraw-Hill. The Otto cycle, the Diesel cycle, and the dual cycle.
- **Y. A. Cengel and M. A. Boles (2019)** — *Thermodynamics: An Engineering Approach*, 9th ed. McGraw-Hill. The Otto cycle and the Diesel cycle.
- **M. J. Moran, H. N. Shapiro et al. (2018)** — *Fundamentals of Engineering Thermodynamics*, 9th ed. Wiley. The Otto cycle and the air-standard analysis.
- **K. A. Airan and R. K. Rajput (2010)** — *A Textbook of Internal Combustion Engines*. Laxmi. The Otto cycle and the real engine efficiencies.
- **G. A. Lavric and C. N. Roxen (2015)** — *Internal Combustion Engines: Fundamentals*. Springer. The Otto cycle and the BSFC.
- **R. J. Koplinger (2019)** — *Internal Combustion Engine Design*. SAE International. The Otto cycle and the volumetric efficiency.
- **SAE (2022)** — *Engine Test Data*. SAE International. The Otto cycle and the brake thermal efficiency.
- **IEA (2022)** — *Energy Technology Perspectives*. International Energy Agency. The Otto cycle and the energy transition.
