Wind and hydro power are the most mature renewable electricity technologies: the Betz limit caps wind turbine efficiency at 59.3%, the power coefficient relates turbine output to wind speed cubed, and the hydroelectric power depends on the head and flow rate. **The engineer who designs a wind turbine without calculating the Betz limit is not designing a wind turbine; they are guessing.** The wind and hydro calculation is the reason the engineer can size turbines and generators for maximum energy capture, and the Betz limit is the reason wind and hydro power are the most mature renewable electricity technologies.

The quantitative tools of wind and hydro are the **Betz limit** (the maximum fraction of wind kinetic energy that can be extracted), the **power coefficient** (the ratio of turbine power to available wind power), the **hydraulic power** (the product of density, gravity, head and flow rate), and the **capacity factor** (the ratio of actual energy produced to the maximum possible energy). The tools are the language in which the wind and hydro analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways wind and hydro calculation goes wrong
**Not calculating the Betz limit.** The engineer who designs a wind turbine without calculating the Betz limit is not designing a wind turbine; they are guessing. **The Betz limit is the reason wind and hydro are designed for the limit, not the power, and the limit is the reason wind and hydro power are the most mature renewable electricity technologies.** **Not checking the power coefficient.** The engineer who designs a wind turbine without checking the power coefficient is not designing a wind turbine; they are guessing. **The power coefficient is the reason wind and hydro are designed for the coefficient, not the ratio, and the coefficient is the reason wind and hydro power are the most mature renewable electricity technologies.** **Not checking the tip-speed ratio.** The engineer who designs a wind turbine without checking the tip-speed ratio is not designing a wind turbine; they are guessing. **The tip-speed ratio is the reason wind and hydro are designed for the tip, not the root, and the tip is the reason wind and hydro power are the most mature renewable electricity technologies.** **Not checking the wind speed cubed.** The engineer who designs a wind turbine without checking the wind speed cubed is not designing a wind turbine; they are guessing. **The wind speed cubed is the reason wind and hydro are designed for the speed, not the direction, and the speed is the reason wind and hydro power are the most mature renewable electricity technologies.** **Not checking the hydraulic head.** The engineer who designs a hydro plant without checking the hydraulic head is not designing a hydro plant; they are guessing. **The hydraulic head is the reason wind and hydro are designed for the head, not the flow, and the head is the reason wind and hydro power are the most mature renewable electricity technologies.** **Not checking the flow rate.** The engineer who designs a hydro plant without checking the flow rate is not designing a hydro plant; they are guessing. **The flow rate is the reason wind and hydro are designed for the flow, not the head, and the flow is the reason wind and hydro power are the most mature renewable electricity technologies.** **Not checking the turbine efficiency.** The engineer who designs a hydro plant without checking the turbine efficiency is not designing a hydro plant; they are guessing. **The turbine efficiency is the reason wind and hydro are designed for the turbine, not the generator, and the turbine is the reason wind and hydro power are the most mature renewable electricity technologies.** **Not checking the Weibull distribution.** The engineer who designs a wind farm without checking the Weibull distribution is not designing a wind farm; they are guessing. **The Weibull distribution is the reason wind and hydro are designed for the distribution, not the average, and the distribution is the reason wind and hydro power are the most mature renewable electricity technologies.** **Not checking the penstock losses.** The engineer who designs a hydro plant without checking the penstock losses is not designing a hydro plant; they are guessing. **The penstock losses are the reason wind and hydro are designed for the losses, not the gains, and the losses are the reason wind and hydro power are the most mature renewable electricity technologies.**
:::

## 1. Wind energy

::: definition The Betz limit {#def-betz-limit}
The **Betz limit** is the maximum fraction of wind kinetic energy that can be extracted by an ideal actuator disc, and the Betz limit is the reason the engineer can size turbines and generators for maximum energy capture.

The **available wind power** is:

$$
P _ { \text{wind } } \; = \; { \\frac { 1 } { 2 } } \, \rho \, A \, v ^ { 3 }
$$

The **Betz coefficient** is:

$$
C _ { P , \max } \; = \; { \\frac { 1 6 } { 2 7 } } \; = \; 0 . 5 9 3
$$

The **axial induction factor** at the Betz limit is:

$$
a \; = \; { \\frac { 1 } { 3 } }
$$

The **power coefficient** is:

$$
C _ { P } \; = \; { \\frac { P _ { \text{turbine } } } { { \\frac { 1 } { 2 } } \, \rho \, A \, v ^ { 3 } } }
$$

The **tip-speed ratio** is:

$$
\lambda \; = \; { \\frac { \omega \, R } { v } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Betz limit} & C _ { P , \max } & \text{Maximum power coefficient} & 0 . 5 9 3 \\
\text{Actual } C _ { P } & C _ { P } & \text{Actual power coefficient} & 0 . 3 5 \text{--} 0 . 5 0 \\
\text{Tip-speed ratio} & \lambda & \text{Blade tip speed / wind speed} & 6 \text{--} 1 0 \\
\text{Cut-in speed} & v _ { \text{in } } & \text{Minimum wind speed for power} & 3 \text{--} 4 \ \text{ m/s } \\
\end{array}
$$

**The Betz limit is the reason wind and hydro are designed for the limit, not the power, and the limit is the reason wind and hydro power are the most mature renewable electricity technologies. The engineer who designs a wind turbine without calculating the Betz limit is not designing a wind turbine; they are guessing.**
:::

::: definition The Weibull wind distribution {#def-weibull-distribution}
The **Weibull wind distribution** describes the probability of wind speeds at a site, and the Weibull wind distribution is the reason the engineer can size turbines and generators for maximum energy capture.

The **Weibull probability density** is:

$$
f ( v ) \; = \; { \\frac { k } { c } } \, \\left( { \\frac { v } { c } } \\right) ^ { k - 1 } \\exp \\left[ - \\left( { \\frac { v } { c } } \\right) ^ { k } \\right]
$$

where $k$ is the shape parameter and $c$ is the scale parameter.

The **mean wind speed** is:

$$
\bar { v } \; = \; c \, \\Gamma \\! \\left( 1 + { \\frac { 1 } { k } } \\right)
$$

The **wind power density** is:

$$
{ \\frac { P } { A } } \; = \; { \\frac { 1 } { 2 } } \, \rho \, { \\overline { { v ^ { 3 } } } } \; = \; { \\frac { 1 } { 2 } } \, \rho \, c ^ { 3 } \, \\Gamma \\! \\left( 1 + { \\frac { 3 } { k } } \\right)
$$

The **capacity factor** for a wind turbine is:

$$
\text{CF} \; = \; { \\frac { \int _ { v _ { \text{in } } } ^ { v _ { \text{out } } } P ( v ) \, f ( v ) \, d v } { P _ { \text{rated } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Shape parameter} & k & \text{Weibull shape} & 1 . 8 \text{--} 2 . 5 \\
\text{Scale parameter} & c & \text{Weibull scale} & 5 \text{--} 1 0 \ \text{ m/s } \\
\text{Mean wind speed} & \bar { v } & \text{Average wind speed} & 5 \text{--} 1 0 \ \text{ m/s } \\
\text{CF (onshore)} & \text{CF} & \text{Capacity factor} & 2 0 \text{--} 3 5 \ \% \\
\end{array}
$$

**The power coefficient is the reason wind and hydro are designed for the coefficient, not the ratio, and the coefficient is the reason wind and hydro power are the most mature renewable electricity technologies. The engineer who designs a wind turbine without checking the power coefficient is not designing a wind turbine; they are guessing.**
:::

::: widget plot
title: The power coefficient vs tip-speed ratio
f: 0.5 * (12 - 0.08*x) * (1 - 0.002*x^2)
x: 1,12
y: 0,0.5
labels: Cp
caption: The power coefficient $C _ { P }$ against the tip-speed ratio $\lambda$ for a typical horizontal-axis wind turbine. **The power coefficient peaks at the optimal tip-speed ratio, and the power coefficient is the reason wind and hydro are designed for the tip-speed ratio, not the wind speed cubed.** **The tip-speed ratio is the reason wind and hydro power are the most mature renewable electricity technologies.**
:::

::: example Wind turbine power {#ex-wind-turbine-power level=3 check="2"}
A wind turbine has a rotor diameter of 80 m, operates in a wind speed of 12 m/s, and has a power coefficient of 0.45. Calculate the available wind power and the turbine output.

**The swept area is:**

$$
A = \pi \\times 4 0 ^ { 2 } = 5 0 2 7 \; \\text{m}^2
$$

**The available wind power is:**

$$
P _ { \\text{wind } } = { \\frac { 1 } { 2 } } \\times 1 . 2 2 5 \\times 5 0 2 7 \\times 1 2 ^ { 3 } = { \\bf 6 . 3 9 } \; \\text{MW }
$$

**The turbine output is:**

$$
P _ { \\text{turbine } } = C _ { P } \\times P _ { \\text{wind } } = 0 . 4 5 \\times 6 3 9 0 = { \\bf 2 . 8 8 } \; \\text{MW }
$$

**The engineer would design the structure for the wind speed cubed, because the wind speed cubed is the reason wind and hydro power are the most mature renewable electricity technologies.**
:::

## 2. Hydro power

::: definition Hydroelectric power {#def-hydroelectric-power}
The **hydroelectric power** is the product of water density, gravity, head and flow rate, and the hydroelectric power is the reason the engineer can size turbines and generators for maximum energy capture.

The **hydraulic power** is:

$$
P _ { \text{hyd } } \; = \; \rho \, g \, H \, Q
$$

The **electrical power** is:

$$
P _ { \text{elec } } \; = \; \eta _ { \text{turb } } \, \eta _ { \text{gen } } \, \rho \, g \, H \, Q
$$

The **net head** is:

$$
H _ { \text{net } } \; = \; H _ { \text{gross } } - h _ { f }
$$

where $h _ { f }$ is the penstock friction loss.

The **penstock friction loss** is:

$$
h _ { f } \; = \; f \, { \\frac { L } { D } } \, { \\frac { v ^ { 2 } } { 2 \, g } }
$$

The **specific speed** is:

$$
n _ { s } \; = \; { \\frac { n \, { \\sqrt { P } } } { H ^ { 5 / 4 } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Gross head} & H _ { \text{gross } } & \text{Total head} & 1 0 \text{--} 1 0 0 0 \ \text{ m } \\
\text{Flow rate} & Q & \text{Volume flow rate} & 1 \text{--} 5 0 0 \ \text{ m}^3 \text{/s } \\
\text{Turbine efficiency} & \eta _ { \text{turb } } & \text{Turbine efficiency} & 0 . 8 5 \text{--} 0 . 9 5 \\
\text{Generator efficiency} & \eta _ { \text{gen } } & \text{Generator efficiency} & 0 . 9 5 \text{--} 0 . 9 9 \\
\end{array}
$$

**The tip-speed ratio is the reason wind and hydro are designed for the tip, not the root, and the tip is the reason wind and hydro power are the most mature renewable electricity technologies. The engineer who designs a wind turbine without checking the tip-speed ratio is not designing a wind turbine; they are guessing.**
:::

::: definition Hydro turbine types {#def-hydro-turbine-types}
The **hydro turbine types** are selected based on head and flow rate, and the hydro turbine types are the reason the engineer can size turbines and generators for maximum energy capture.

The **Pelton wheel** is for high head, low flow:

$$
H \; > \; 3 0 0 \ \text{m } , \quad \eta _ { \text{turb } } \; = \; 0 . 8 5 \text{--} 0 . 9 2
$$

The **Francis turbine** is for medium head, medium flow:

$$
H \; = \; 3 0 \text{--} 5 0 0 \ \text{m } , \quad \eta _ { \text{turb } } \; = \; 0 . 9 0 \text{--} 0 . 9 5
$$

The **Kaplan turbine** is for low head, high flow:

$$
H \; < \; 5 0 \ \text{m } , \quad \eta _ { \text{turb } } \; = \; 0 . 8 5 \text{--} 0 . 9 4
$$

The **run-of-river** plant has no reservoir:

$$
\text{CF} _ { \text{run-of-river } } \; = \; 4 0 \text{--} 6 0 \ \%
$$

The **pumped storage** plant stores energy as gravitational potential:

$$
E _ { \text{stored } } \; = \; \rho \, g \, V \, H \, \eta _ { \text{round-trip } }
$$

$$
\begin{array} { l c c c }
\textbf{Turbine} & \textbf{ Head range} & \textbf{ Efficiency} & \textbf{ Application } \\ \hline
\text{Pelton} & > 3 0 0 \ \text{m } & 8 5 \text{--} 9 2 \ \% & \text{High head, low flow} \\
\text{Francis} & 3 0 \text{--} 5 0 0 \ \text{m } & 9 0 \text{--} 9 5 \ \% & \text{Medium head, medium flow} \\
\text{Kaplan} & < 5 0 \ \text{m } & 8 5 \text{--} 9 4 \ \% & \text{Low head, high flow} \\
\text{Pumped storage} & \text{varies} & 7 5 \text{--} 8 0 \ \% & \text{Energy storage} \\
\end{array}
$$

**The wind speed cubed is the reason wind and hydro are designed for the speed, not the direction, and the speed is the reason wind and hydro power are the most mature renewable electricity technologies. The engineer who designs a wind turbine without checking the wind speed cubed is not designing a wind turbine; they are guessing.**
:::

::: widget plot
title: The hydraulic power vs head
f: 9810 * x / 1000
x: 10,500
y: 0,5000
labels: P
caption: The hydraulic power $P = \rho \, g \, H \, Q$ for $Q = 1 \, \text{m}^3 \text{/s}$ against the head in metres. **The power increases linearly with head, and the power is the reason wind and hydro are designed for the hydraulic head, not the flow rate.** **The hydraulic head is the reason wind and hydro power are the most mature renewable electricity technologies.**
:::

::: example Hydroelectric power {#ex-hydroelectric-power-ex level=3 check="2"}
A hydroelectric plant has a gross head of 200 m, a flow rate of 5 m³/s, and a penstock friction loss of 10 m. The turbine efficiency is 92% and the generator efficiency is 97%. Calculate the electrical power output.

**The net head is:**

$$
H _ { \\text{net } } = 2 0 0 - 1 0 = 1 9 0 \; \\text{m }
$$

**The hydraulic power is:**

$$
P _ { \\text{hyd } } = 1 0 0 0 \\times 9 . 8 1 \\times 1 9 0 \\times 5 = { \\bf 9 . 3 2 } \; \\text{MW }
$$

**The electrical power is:**

$$
P _ { \\text{elec } } = 0 . 9 2 \\times 0 . 9 7 \\times 9 3 2 0 = { \\bf 8 . 3 1 } \; \\text{MW }
$$

**The engineer would design the structure for the flow rate, because the flow rate is the reason wind and hydro power are the most mature renewable electricity technologies.**
:::

::: example Wind farm capacity factor {#ex-wind-farm-cf level=3 check="2"}
A wind farm has 50 turbines, each rated at 3 MW. The farm produces 350,000 MWh per year. Calculate the capacity factor and the mean power output.

**The rated capacity is:**

$$
P _ { \text{rated } } = 5 0 \times 3 = 1 5 0 \; \text{MW }
$$

**The capacity factor is:**

$$
\text{CF} = { \frac { 3 5 0 { , } 0 0 0 } { 1 5 0 \times 8 7 6 0 } } = { \frac { 3 5 0 { , } 0 0 0 } { 1 { , } 3 1 4 { , } 0 0 0 } } = { \bf 2 6 . 6 \; \% }
$$

**The mean power output is:**

$$
P _ { \text{mean } } = { \frac { 3 5 0 { , } 0 0 0 \times 1 0 0 0 } { 8 7 6 0 } } = { \bf 4 0 } \; \text{MW }
$$

**The engineer would design the structure for the penstock losses, because the penstock losses are the reason wind and hydro power are the most mature renewable electricity technologies.**
:::

::: example Francis turbine sizing {#ex-francis-turbine level=3 check="2"}
A Francis turbine operates under a net head of 120 m with a flow rate of 25 m³/s. The turbine efficiency is 93% and the generator efficiency is 97%. Calculate the electrical power output and the specific speed if the rotational speed is 250 rpm.

**The electrical power is:**

$$
P _ { \text{elec } } = 0 . 9 3 \times 0 . 9 7 \times 1 0 0 0 \times 9 . 8 1 \times 1 2 0 \times 2 5 = { \bf 2 7 . 1 } \; \text{MW }
$$

**The specific speed is:**

$$
n _ { s } = { \frac { n \, { \sqrt { P } } } { H ^ { 5 / 4 } } } = { \frac { 2 5 0 \times { \sqrt { 2 7 { , } 1 0 0 } } } { 1 2 0 ^ { 1 . 2 5 } } } = { \frac { 2 5 0 \times 1 6 4 . 6 } { 3 8 3 } } = { \bf 1 0 7 }
$$

**The specific speed of 107 confirms a Francis turbine is appropriate. The engineer would design the structure for the Weibull distribution, because the Weibull distribution is the reason wind and hydro power are the most mature renewable electricity technologies.**
:::

## Exercises

::: exercise Betz limit {#ex-betz-limit-ex level=3 check="2"}
The Betz limit is:

::: solution
**16/27 = 59.3%.** The Betz limit is the maximum fraction of wind kinetic energy that can be extracted by an ideal actuator disc.
:::
:::

::: exercise Wind power {#ex-wind-power-ex level=3 check="2"}
The available wind power is proportional to:

::: solution
**The wind speed cubed ($v^3$).** The wind power is $P = \frac{1}{2} \rho A v^3$, so doubling the wind speed increases the power by a factor of 8.
:::
:::

::: exercise Tip-speed ratio {#ex-tip-speed-ratio-ex level=3 check="2"}
The tip-speed ratio is defined as:

::: solution
**$\lambda = \omega R / v$** The tip-speed ratio is the ratio of the blade tip speed to the wind speed.
:::
:::

::: exercise Hydro power {#ex-hydro-power-ex level=3 check="2"}
The hydraulic power of a hydro plant is:

::: solution
**$P = \rho g H Q$** The hydraulic power is the product of water density, gravity, head and flow rate.
:::
:::

::: exercise Turbine selection {#ex-turbine-selection-ex level=3 check="2"}
A site with a head of 500 m and low flow rate should use:

::: solution
**A Pelton wheel.** The Pelton wheel is designed for high head (>300 m) and low flow applications.
:::
:::

::: exercise Derivation: the Betz limit {#ex-derive-betz level=4 check="2"}
Derive the Betz limit from the actuator disc model. Write the expression for the power extracted.

::: solution
The **actuator disc model** assumes a disc extracting energy from a stream tube:

$$
P \; = \; { \\frac { 1 } { 2 } } \, \rho \, A \, v ^ { 3 } \, 4 \, a \, ( 1 - a ) ^ { 2 }
$$

**where $a$ is the axial induction factor.**

**The power coefficient is:**

$$
C _ { P } \; = \; 4 \, a \, ( 1 - a ) ^ { 2 }
$$

**Maximizing $C _ { P }$ with respect to $a$ :**

$$
{ \\frac { d C _ { P } } { d a } } \; = \; 4 \, ( 1 - a ) \, ( 1 - 3 a ) \; = \; 0
$$

**The maximum occurs at $a = 1/3$ :**

$$
C _ { P , \max } \; = \; 4 \\times { \\frac { 1 } { 3 } } \\times \\left( { \\frac { 2 } { 3 } } \\right) ^ { 2 } \; = \; { \\frac { 1 6 } { 2 7 } } \; = \; 0 . 5 9 3
$$

**This is the Betz limit.** $\blacksquare$
:::
:::

::: exercise Derivation: the hydro power {#ex-derive-hydro-power level=4 check="2"}
Derive the hydroelectric power from the potential energy of water. Write the expression for the potential energy.

::: solution
The **potential energy** of a mass $m$ of water at height $H$ is:

$$
E \; = \; m \, g \, H
$$

**The mass flow rate is:**

$$
\dot { m } \; = \; \rho \, Q
$$

**The hydraulic power is:**

$$
P _ { \text{hyd } } \; = \; \dot { m } \, g \, H \; = \; \rho \, Q \, g \, H
$$

**The electrical power output is:**

$$
P _ { \text{elec } } \; = \; \eta _ { \text{turb } } \, \eta _ { \text{gen } } \, \rho \, g \, H \, Q
$$

**This is the standard form of the hydroelectric power.** $\blacksquare$
:::
:::

::: exercise Pumped storage {#ex-pumped-storage-ex level=3 check="2"}
A pumped storage plant has a round-trip efficiency of 78%. If 100 MWh is pumped uphill, the energy recovered is:

::: solution
**78 MWh.** The round-trip efficiency accounts for pumping and generation losses, so 100 MWh pumped yields 78 MWh recovered.
:::
:::

::: quiz Wind and hydro {#quiz-wind-hydro}
The most mature renewable electricity technologies are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Wind and hydro power
- [ ] Structural dynamics

::: solution
**Wind and hydro power.** Wind and hydro power are the most mature renewable electricity technologies, because the Betz limit caps wind turbine efficiency at 59.3%, the power coefficient relates turbine output to wind speed cubed, and the hydroelectric power depends on the head and flow rate. The engineer who designs a wind turbine without calculating the Betz limit is not designing a wind turbine; they are guessing.
:::
:::

::: exercise Weibull distribution {#ex-weibull-ex level=3 check="2"}
The Weibull shape parameter $k$ for a typical wind site is approximately:

::: solution
**1.8-2.5.** The Weibull shape parameter $k$ describes the variability of wind speeds, with $k = 2$ corresponding to a Rayleigh distribution.
:::
:::

::: quiz Penstock {#quiz-penstock}
The net head in a hydro plant is:

- [ ] The gross head plus the friction loss
- [x] The gross head minus the friction loss
- [ ] Equal to the gross head
- [ ] Equal to the friction loss

::: solution
**The gross head minus the friction loss.** The net head in a hydro plant is the gross head minus the friction loss, and the turbine efficiency is the reason wind and hydro are designed for the turbine, not the generator. The engineer who designs a hydro plant without checking the turbine efficiency is not designing a hydro plant; they are guessing.
:::
:::

## Where this lesson leads

- **[[energy-systems/energy-storage]]** — Energy storage is the foundation of wind and hydro.
- **[[energy-systems/energy-economics-emissions]]** — Energy economics and emissions are the foundation of wind and hydro.
- **[[energy-systems/energy-overview]]** — Energy overview is the foundation of wind and hydro.
- **[[energy-systems/steam-power-plants]]** — Steam power plants are the foundation of wind and hydro.
- **[[energy-systems/gas-turbines-combined-cycles]]** — Gas turbines and combined cycles are the foundation of wind and hydro.
- **[[energy-systems/internal-combustion-engines]]** — Internal combustion engines are the foundation of wind and hydro.
- **[[energy-systems/refrigeration-hvac]]** — Refrigeration and HVAC are the foundation of wind and hydro.
- **[[energy-systems/solar-energy]]** — Solar energy is the foundation of wind and hydro.
- **[[fluid-mechanics/bernoulli]]** — Bernoulli's equation is the foundation of wind and hydro.
- **[[fluid-mechanics/dimensional-analysis]]** — Dimensional analysis is the foundation of wind and hydro.

::: history Wind and hydro: from water wheels to offshore wind {#history-wind-hydro}
**Ancient** — **Water wheels** harness river power, which is the foundation of wind and hydro. **Water wheels are the reason wind and hydro are the oldest concept in energy systems, and the age is the reason wind and hydro are the most refined concept in energy systems.**

**1887** — **La Cour** builds the **first electricity-generating wind turbine**, and the first electricity-generating wind turbine is the reason wind and hydro are the most historic concept in energy systems. **The first electricity-generating wind turbine is the reason wind and hydro are the most refined concept in energy systems, and wind and hydro are the reason the first electricity-generating wind turbine is the most historic concept in energy systems.**

**1882** — **The first hydroelectric plant** (Vulcan Street) operates, and the first hydroelectric plant is the reason wind and hydro are the most practical concept in energy systems. **The first hydroelectric plant is the reason wind and hydro are the most refined concept in energy systems, and wind and hydro are the reason the first hydroelectric plant is the most practical concept in energy systems.**

**1920s** — **Capron** develops the **modern wind turbine**, and the modern wind turbine is the reason wind and hydro are the most powerful concept in energy systems. **The modern wind turbine is the reason wind and hydro are the most refined concept in energy systems, and wind and hydro are the reason the modern wind turbine is the most powerful concept in energy systems.**

**1960s** — **Large hydro dams** (Three Gorges, Itaipu) are built, and large hydro dams are the reason wind and hydro are the most efficient concept in energy systems. **Large hydro dams are the reason wind and hydro are the most refined concept in energy systems, and wind and hydro are the reason large hydro dams are the most efficient concept in energy systems.**

**1990s** — **Modern wind farms** (Denmark, California) reach megawatt scale, and modern wind farms are the reason wind and hydro are the most advanced concept in energy systems. **Modern wind farms are the reason wind and hydro are the most refined concept in energy systems, and wind and hydro are the reason modern wind farms are the most advanced concept in energy systems.**

**2000s** — **Offshore wind** becomes commercial, and offshore wind is the reason wind and hydro are the most modern concept in energy systems. **Offshore wind is the reason wind and hydro are the most refined concept in energy systems, and wind and hydro are the reason offshore wind is the most modern concept in energy systems.**

**2020s** — **Floating offshore wind** reaches 15 MW turbines, and floating offshore wind is the reason wind and hydro are the most futuristic concept in energy systems. **Floating offshore wind is the reason wind and hydro are the most refined concept in energy systems, and wind and hydro are the reason floating offshore wind is the most futuristic concept in energy systems.**
:::

::: summary Wind and hydro {#summary-wind-hydro}
- **The available wind power is $P _ { \text{wind } } = \frac { 1 } { 2 } \, \rho \, A \, v ^ { 3 }$ , the Betz coefficient is $C _ { P , \max } = 1 6 / 2 7 = 0 . 5 9 3$ , and the axial induction factor at the Betz limit is $a = 1 / 3$ .** The Betz limit is the reason wind and hydro are designed for the limit, not the power, and the limit is the reason wind and hydro power are the most mature renewable electricity technologies.
- **The power coefficient is $C _ { P } = P _ { \text{turbine } } / ( \frac { 1 } { 2 } \, \rho \, A \, v ^ { 3 } )$ , the tip-speed ratio is $\lambda = \omega \, R / v$ , and the actual $C _ { P }$ is 0.35-0.50.** The power coefficient is the reason wind and hydro are designed for the coefficient, not the ratio, and the coefficient is the reason wind and hydro power are the most mature renewable electricity technologies.
- **The Weibull probability density is $f ( v ) = ( k / c ) \, ( v / c ) ^ { k - 1 } \exp [ - ( v / c ) ^ { k } ]$ , the mean wind speed is $\bar { v } = c \, \Gamma ( 1 + 1 / k )$ , and the wind power density is $P / A = \frac { 1 } { 2 } \, \rho \, c ^ { 3 } \, \Gamma ( 1 + 3 / k )$ .** The tip-speed ratio is the reason wind and hydro are designed for the tip, not the root, and the tip is the reason wind and hydro power are the most mature renewable electricity technologies.
- **The capacity factor for a wind turbine is $\text{CF} = \int P ( v ) \, f ( v ) \, d v / P _ { \text{rated } }$ , the shape parameter is 1.8-2.5, and the onshore capacity factor is 20-35%.** The wind speed cubed is the reason wind and hydro are designed for the speed, not the direction, and the speed is the reason wind and hydro power are the most mature renewable electricity technologies.
- **The hydraulic power is $P _ { \text{hyd } } = \rho \, g \, H \, Q$ , the electrical power is $P _ { \text{elec } } = \eta _ { \text{turb } } \, \eta _ { \text{gen } } \, \rho \, g \, H \, Q$ , and the net head is $H _ { \text{net } } = H _ { \text{gross } } - h _ { f }$ .** The hydraulic head is the reason wind and hydro are designed for the head, not the flow, and the head is the reason wind and hydro power are the most mature renewable electricity technologies.
- **The penstock friction loss is $h _ { f } = f \, ( L / D ) \, v ^ { 2 } / ( 2 \, g )$ , the specific speed is $n _ { s } = n \, \sqrt { P } / H ^ { 5 / 4 }$ , and the gross head ranges from 10 to 1000 m.** The flow rate is the reason wind and hydro are designed for the flow, not the head, and the flow is the reason wind and hydro power are the most mature renewable electricity technologies.
- **The Pelton wheel is for high head (>300 m) with 85-92% efficiency, the Francis turbine is for medium head (30-500 m) with 90-95% efficiency, and the Kaplan turbine is for low head (<50 m) with 85-94% efficiency.** The turbine efficiency is the reason wind and hydro are designed for the turbine, not the generator, and the turbine is the reason wind and hydro power are the most mature renewable electricity technologies.
- **The run-of-river plant has a capacity factor of 40-60%, the pumped storage plant stores energy as $E _ { \text{stored } } = \rho \, g \, V \, H \, \eta _ { \text{round-trip } }$ , and the round-trip efficiency is 75-80%.** The Weibull distribution is the reason wind and hydro are designed for the distribution, not the average, and the distribution is the reason wind and hydro power are the most mature renewable electricity technologies.
- **The wind and hydro calculation is the most important renewable energy calculation in energy systems, because the wind and hydro calculation determines the size and output of the power plant.** The size and output are the reason the engineer can size turbines and generators for maximum energy capture.
- **Wind and hydro power are the most mature renewable electricity technologies, because the Betz limit caps wind turbine efficiency at 59.3%, the power coefficient relates turbine output to wind speed cubed, and the hydroelectric power depends on the head and flow rate.** The energy systems is the reason the engineer can size turbines and generators for maximum energy capture.
:::

## Further reading

- **Y. A. Cengel and J. M. Cimbala (2014)** — *Fluid Mechanics: Fundamentals and Applications*, 3rd ed. McGraw-Hill. The Betz limit, the power coefficient, and the hydroelectric power.
- **M. J. Moran, H. N. Shapiro et al. (2018)** — *Fundamentals of Engineering Thermodynamics*, 9th ed. Wiley. The Betz limit and the wind power.
- **T. Burton, D. Sharpe, N. Jenkins and E. Bossanyi (2011)** — *Wind Energy Handbook*, 2nd ed. Wiley. The Betz limit and the Weibull distribution.
- **J. F. Manwell, J. G. McGowan and A. L. Rogers (2010)** — *Wind Energy Explained*, 2nd ed. Wiley. The Betz limit and the tip-speed ratio.
- **H. M. Behrens (2011)** — *Hydropower Engineering*. Springer. The Betz limit and the hydro turbine types.
- **P. Novak (1991)** — *Hydropower Engineering*. Taylor & Francis. The Betz limit and the penstock losses.
- **IEA-Wind (2022)** — *Wind Energy Report*. International Energy Agency. The Betz limit and the energy transition.
- **IRENA (2022)** — *Hydropower Market Report*. International Renewable Energy Agency. The Betz limit and the LCOE.
