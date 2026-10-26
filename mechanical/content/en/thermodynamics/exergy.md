Exergy is the only quantity in this course that has a **unit price**, and the reason it is worth a whole chapter is that energy does not.

A megajoule of natural gas, a megajoule of steam at $500\ {}^{\circ}\mathrm{C}$, a megajoule of warm water at $50\ {}^{\circ}\mathrm{C}$ and a megajoule of cooling water at $25\ {}^{\circ}\mathrm{C}$ are, by the first law, four identical things. By the second law the first is worth about **$0.03$ currency units**, the second about **$0.019$**, the third about **$0.002$** and the fourth **nothing at all** — and the ratios are not market opinions but the arithmetic of $1 - T_0 / T$. **Exergy is the part of an energy that can be sold as work**, and an exergy audit is the only way to find out where a plant is actually losing money.

::: warning Seven exergy errors that survive a design review
**Forgetting the dead state.** Every exergy figure is a difference against a **named** environment at $\left( T_0, P_0 \right)$, and a calculation that omits the dead state has computed nothing. The sensitivity is not small: a plant's stack-exergy figure moves **$6\ \%$** for a $10\ \mathrm{K}$ change in $T_0$, and a district-heating project's economics move with the **annual mean** versus the **design** temperature. **Using enthalpy where exergy belongs.** $\psi = \left( h - h_0 \right) - T_0 \left( s - s_0 \right)$, and the second term is **not** a correction — for steam at $6\ \mathrm{MPa}$ and $600\ {}^{\circ}\mathrm{C}$ it is **$57\ \%$** of the enthalpy rise above the dead state. **Applying $1 - T_0 / T$ to a heat source at a range of temperatures.** The factor is exact only for heat delivered at a **constant** $T$. For a stream cooling from $T_1$ to $T_2$ the exergy is
$$
Q - m c T_0 \ln \frac{T_1}{T_2}
$$
and using $1 - T_0 / T_1$ at the **hot end** over-states the exergy of a cooling oil stream by **$40\ \%$** when the ratio $T_1 / T_2$ is large. **Charging a heat pump's input electricity at the COP.** A heat pump with $\mathrm{COP} = 3$ delivering $30\ \mathrm{MJ}$ of heat at $80\ {}^{\circ}\mathrm{C}$ has delivered $30 \times 0.156 = 4.7\ \mathrm{MJ}$ of exergy for $10\ \mathrm{MJ}$ of electricity, whose exergy is $10\ \mathrm{MJ}$. Its second-law efficiency is **$47\ \%$** and its first-law efficiency against the electricity is $300\ \%$. **Both numbers are correct and only one of them is useful.** **Treating exergy as conserved.** Energy is conserved and **destroyed** nowhere; exergy is **not conserved** — it is destroyed at every rate $T_0 \dot{S}_{\mathrm{gen}}$ and is created nowhere. A balance that closes on exergy has made an error, and a balance that does not close by $T_0 \dot{S}_{\mathrm{gen}}$ has made a different one. **Confusing exergy with availability of a fuel.** A fuel's exergy is its **chemical** exergy, which for methane is **$1.037\times$** its LHV and for hydrogen **$0.976\times$** it, and the difference is the entropy of the mixing and reaction with the environment. A calculation that charges a fuel at its LHV understates the input exergy for natural gas by **$4\ \%$** and overstates it for hydrogen by **$2\ \%$** — which is larger than most of the improvements being proposed. **Reporting a second-law efficiency without naming the reference.** $\eta_{\mathrm{II}}$ for the same heat pump is $47\ \%$ against the electricity and about $19\ \%$ against the exergy of the fuel burned for that electricity in a $40\ \%$-efficient power station. Both are legitimate and the report must say which.
:::

## The quantity and its balances

::: definition The dead state and closed-system exergy {#def-dead}
**The dead state.** The environment at $\left( T_0, P_0 \right)$, conventionally $25\ {}^{\circ}\mathrm{C}$ and $101.325\ \mathrm{kPa}$, in equilibrium and in composition with a reference atmosphere and a reference water body. **A system is at the dead state when it can do no work on the environment**, which requires equality of temperature, pressure **and chemical potential** — the last being why a tank of pure oxygen at $T_0$ and $P_0$ still has exergy.
**The closed-system exergy (availability).**
$$
\boxed{ \Phi = \left( U - U_0 \right) + P_0 \left( V - V_0 \right) - T_0 \left( S - S_0 \right) + m \frac{V^{2}}{2} + m g z }
$$
**The $P_0 \left( V - V_0 \right)$ term** is the work the system does **on the atmosphere** as it expands to $P_0$, and it is unavailable; the $- T_0 \left( S - S_0 \right)$ term is the exergy that must be **paid away** to dispose of the entropy $S - S_0$ at the environment temperature.
**The steady-flow exergy (flow availability).**
$$
\boxed{ \psi = \left( h - h_0 \right) - T_0 \left( s - s_0 \right) + \frac{V^{2}}{2} + g z }
$$
**The two terms, in words.** $\left( h - h_0 \right)$ is the enthalpy that could in principle be extracted; $T_0 \left( s - s_0 \right)$ is the **entropy tax** that must be paid on it at the environment temperature.
**The number that shows the size of the tax.** Steam at $6\ \mathrm{MPa}$ and $600\ {}^{\circ}\mathrm{C}$ against a dead state of $25\ {}^{\circ}\mathrm{C}$, $100\ \mathrm{kPa}$ (saturated liquid: $h_0 = 104.83$, $s_0 = 0.3672$):
$$
\psi = \left( 3{,}658.8 - 104.83 \right) - 298.15 \left( 7.1693 - 0.3672 \right)
= 3{,}553.97 - 2{,}028.0 = 1{,}525.9\ \mathrm{kJ / kg}
$$
**The enthalpy available is $3{,}554\ \mathrm{kJ / kg}$ and the exergy is $1{,}526\ \mathrm{kJ / kg}$ — the tax is $57\ \%$.**
**The kinetic and potential terms.** $\psi_{ke} = V^{2} / 2$, which is **fully** exergy: $100\ \mathrm{m / s}$ is $5\ \mathrm{kJ / kg}$ of **pure work**, tax-free, and this is why a nozzle's kinetic energy is worth more per kilojoule than the enthalpy that made it.
:::

::: definition Exergy of heat, work and a temperature-limited stream {#def-heat}
**Work is pure exergy.** $X_W = W$, always, whatever the device that produced or consumed it.
**Heat at a constant temperature $T$.**
$$
X_Q = Q \left( 1 - \frac{T_0}{T} \right) = Q \ \zeta_T, \qquad \zeta_T = 1 - \frac{T_0}{T}
$$
**The quality factor $\zeta_T$.**
$$
\begin{array}{c c c c}
T\ ({}^{\circ}\mathrm{C}) & T\ (\mathrm{K}) & \zeta_T & \text{Where it appears} \\
- 33 & 240.15 & - 0.2416 & \text{refrigeration: exergy must be } \textit{supplied} \\
0 & 273.15 & - 0.0915 & \text{chilled water} \\
25 & 298.15 & 0 & \text{the dead state} \\
50 & 323.15 & 0.0774 & \text{district heat, low} \\
85 & 358.15 & 0.1677 & \text{district heat, conventional} \\
150 & 423.15 & 0.2955 & \text{process hot water, absorption chiller} \\
300 & 573.15 & 0.4799 & \text{thermal oil, low-grade steam} \\
500 & 773.15 & 0.6144 & \text{medium-pressure steam} \\
1000 & 1273.15 & 0.7658 & \text{gas-turbine combustion gas} \\
1800 & 2073.15 & 0.8562 & \text{turbine entry}
\end{array}
$$
**The reading.** **Heat at $85\ {}^{\circ}\mathrm{C}$ is $17\ \%$ work and heat at $500\ {}^{\circ}\mathrm{C}$ is $61\ \%$ work**, and the ratio $0.6144 / 0.1677 = 3.7$ is the number that makes a **cogeneration** plant's heat-and-power split an accounting problem and not a physics one.
**Heat from a stream cooling from $T_1$ to $T_2$.**
$$
X_Q = Q - m c\, T_0 \ln \frac{T_1}{T_2}, \qquad Q = m c \left( T_1 - T_2 \right)
$$
**The number that shows the error of using the hot-end factor.** $1\ \mathrm{kg / s}$ of oil with $c = 2.1$ from $150$ to $60\ {}^{\circ}\mathrm{C}$ at $T_0 = 25\ {}^{\circ}\mathrm{C}$:
$$
Q = 2.1 \times 90 = 189\ \mathrm{kW}, \qquad
X_Q = 189 - 2.1 \times 298.15 \ln \frac{423.15}{333.15} = 189 - 149.7 = 39.3\ \mathrm{kW}
$$
against $189 \times \left( 1 - 298.15 / 423.15 \right) = 55.8\ \mathrm{kW}$ at the hot-end factor and $189 \times 0.105 = 19.9\ \mathrm{kW}$ at the cold end. **The correct figure is $39.3\ \mathrm{kW}$; the hot-end factor over-states it by $42\ \%$ and the cold-end factor under-states it by half** — and the reason is that the exergy of a cooling stream is **not** $Q \zeta$ at either end but the integral $\int \left( 1 - T_0 / T \right) \delta Q$, which weights the early, hotter part of the cooling far more heavily.
**The exergy of a cold body.** A body at $T < T_0$ has **positive** exergy, because it can run a heat engine against the environment. Cooling $1\ \mathrm{kg}$ of water from $25$ to $0\ {}^{\circ}\mathrm{C}$ **raises** its exergy by
$$
\Delta X = m c \left[ \left( T - T_0 \right) - T_0 \ln \frac{T}{T_0} \right]
= 4.18 \left[ - 25 - 298.15 \ln \frac{273.15}{298.15} \right] = 4.18 \times 1.111 = 4.64\ \mathrm{kJ}
$$
**At least $4.64\ \mathrm{kJ}$ of work to make $104.5\ \mathrm{kJ}$ of cold** — a reversible coefficient of performance of $22.5$. A kilogram of water $25\ \mathrm{K}$ **below** the environment carries $4.6\ \mathrm{kJ}$ of exergy, slightly **more** than the $4.2\ \mathrm{kJ}$ of a kilogram $25\ \mathrm{K}$ above it: cold, like heat, is worth work in proportion to its distance from $T_0$.
:::

::: definition Chemical exergy and the exergy of fuels {#def-chem}
**The chemical exergy** is the maximum work obtainable as a substance comes to equilibrium with the environment by a **reactive** process, and it is tabulated per mole:
$$
\begin{array}{l c c c}
\text{Substance} & \text{Chemical exergy} & \text{LHV} & \text{Ratio} \\
\text{Methane} & 831.65\ \mathrm{kJ / mol} & 802.3\ \mathrm{kJ / mol} & 1.037 \\
\text{Hydrogen} & 236.07\ \mathrm{kJ / mol} & 241.8\ \mathrm{kJ / mol} & 0.976 \\
\text{Carbon monoxide} & 275.1\ \mathrm{kJ / mol} & 283.0\ \mathrm{kJ / mol} & 0.972 \\
\text{Octane, liquid} & 5{,}413\ \mathrm{kJ / mol} & 5{,}074\ \mathrm{kJ / mol} & 1.067 \\
\text{Methanol, liquid} & 718.0\ \mathrm{kJ / mol} & 638.1\ \mathrm{kJ / mol} & 1.125 \\
\text{Carbon, graphite} & 410.3\ \mathrm{kJ / mol} & 393.5\ \mathrm{kJ / mol} & 1.043 \\
\text{Aluminium} & 888.4\ \mathrm{kJ / mol} & 837.9\ \mathrm{kJ / mol} & 1.060
\end{array}
$$
**The rule of thumb.** For hydrocarbons and alcohols the chemical exergy is **$1.04$ to $1.13\times$** the LHV; for hydrogen and carbon monoxide it is **slightly less**; for carbon and aluminium it is a few per cent more. (Chemical exergies from Szargut's standard tables; the "LHV" of aluminium is its heat of combustion to $\mathrm{Al_2O_3}$.)
**The number that makes aluminium an energy currency.** One kilogram of aluminium carries $888.4 / 0.02698 = 32.9\ \mathrm{MJ}$ of chemical exergy, and producing it from ore takes something like **$150$ to $220\ \mathrm{MJ / kg}$** of primary energy, of which only $32.9\ \mathrm{MJ}$ is stored chemically and the rest has been destroyed. **Recycling needs only about $5\ \%$ of that primary energy**, because remelting keeps the metal's chemical exergy intact instead of rebuilding it from the oxide.
**The exergy of compressed gas.** For an ideal gas at $T_0$ and pressure $P$:
$$
\psi = R T_0 \ln \frac{P}{P_0}
$$
**The evaluation.** Air at $800\ \mathrm{kPa}$ and $25\ {}^{\circ}\mathrm{C}$, taking $P_0 = 100\ \mathrm{kPa}$:
$$
\psi = 0.287 \times 298.15 \times \ln 8 = 85.57 \times 2.0794 = 177.9\ \mathrm{kJ / kg}
$$
**The comparison that indicts every compressed-air system.** Compressing that air **reversibly and isothermally** would need exactly $177.9\ \mathrm{kJ / kg}$; a real two-stage aftercooled compressor needs about **$245\ \mathrm{kJ / kg}$**, so the **second-law efficiency of a compressed-air system is about $73\ \%$** — and the reason the figure is not worse is the aftercooler. **The reason compressed air is the most expensive utility in a factory** is that it is generated at $73\ \%$ second-law efficiency and then **throttled, leaked and used at a pressure drop**, and the reason it survives is that it is safe, clean and needs no wiring in a washdown bay.
**The exergy of a vacuum.** A vessel evacuated to $1\ \mathrm{kPa}$ at $T_0$ has
$$
\psi = R T_0 \ln \frac{P_0}{P} = 0.287 \times 298.15 \times \ln 100 = 394.1\ \mathrm{kJ / kg\ of\ inrushing\ air}
$$
**$394\ \mathrm{kJ}$ per kilogram of air that leaks in** — which is why a steam condenser's air in-leakage costs more than the heat the air carries, and why the correct measure of a condenser's air-ingress rate is **exergy destroyed** and not **thermal load**.
:::

::: definition Exergy balances and the Gouy–Stodola theorem {#def-gouy}
**The closed-system balance.**
$$
\Phi_2 - \Phi_1 = \underbrace{\sum \left( 1 - \frac{T_0}{T_j} \right) Q_j}_{\text{with heat}} - \underbrace{\left[ W - P_0 \left( V_2 - V_1 \right) \right]}_{\text{with work}} - X_{\mathrm{dest}}
$$
**The rate form for a control volume.**
$$
\frac{d \dot{X}}{d t} = \sum \left( 1 - \frac{T_0}{T_j} \right) \dot{Q}_j - \left[ \dot{W} - \dot{W}_{\mathrm{surr}} \right]
+ \sum_{\mathrm{in}} \dot{m} \psi - \sum_{\mathrm{out}} \dot{m} \psi - \dot{X}_{\mathrm{dest}}
$$
**The Gouy–Stodola theorem, which is the whole chapter in one line.**
$$
\boxed{ \dot{X}_{\mathrm{dest}} = T_0\, \dot{S}_{\mathrm{gen}} \ \ge \ 0 }
$$
**The second-law efficiency.**
$$
\eta_{\mathrm{II}} = \frac{\text{exergy of the desired output}}{\text{exergy of the input}}
= 1 - \frac{\text{destroyed} + \text{lost}}{\text{input}}
$$
**The three efficiencies, and the number each one hides.**
$$
\begin{array}{l c c l}
\text{Device} & \eta_{\mathrm{I}} & \eta_{\mathrm{II}} & \text{What the gap is} \\
\text{Resistive heater} & 100\ \% & 16\ \% & \text{electricity burned to make } 80\ {}^{\circ}\mathrm{C}\ \text{heat} \\
\text{Gas boiler, } 92\ \% & 92\ \% & 14\ \% & \text{combustion, then a downgrade to } 80\ {}^{\circ}\mathrm{C} \\
\text{Condensing boiler} & 106\ \%\ \text{(LHV)} & 16\ \% & \text{the flue's latent heat recovered} \\
\text{Incandescent lamp} & 5\ \% & 15\ \% & \text{its } 60\ {}^{\circ}\mathrm{C}\ \text{heat credited as a by-product} \\
\text{LED lamp} & 32\ \% & 31\ \% & \text{light is nearly pure exergy} \\
\text{Electric motor} & 91\ \% & 91\ \% & \text{work to work: no tax} \\
\text{Air-source heat pump} & 300\ \% & 47\ \% & \text{the delivered heat is low grade} \\
\text{Steam turbine} & 88\ \%\ \text{(isen.)} & 93\ \% & \text{work to work} \\
\text{Internal-combustion engine} & 33\ \% & 32\ \% & \text{fuel exergy is } 1.04 \times \text{LHV} \\
\text{Photovoltaic} & 22\ \% & 23\ \% & \text{against the sun's } 5{,}800\ \mathrm{K}\ \text{source}
\end{array}
$$
**The reading that changes decisions.** **The motor's first- and second-law efficiencies are equal because work-to-work conversion pays no entropy tax**, and every device whose two efficiencies differ is a device that converts **between** work and heat. The gap is the tax, and the tax is largest where a high-grade input is spent on a low-grade output.
**The number that sizes a retrofit.** Replacing $100\ \mathrm{kW}$ of resistive heating at $80\ {}^{\circ}\mathrm{C}$ with a heat pump of $\mathrm{COP}\ 3.2$:
$$
\dot{X}_{\mathrm{delivered}} = 100 \times 0.1555 = 15.6\ \mathrm{kW}, \qquad
\dot{W}_{\mathrm{resistive}} = 100\ \mathrm{kW}, \qquad
\dot{W}_{\mathrm{HP}} = 31.3\ \mathrm{kW}
$$
**A saving of $68.7\ \mathrm{kW}$ of electricity for a $15.6\ \mathrm{kW}$ exergy service** — and the reason the saving is not $100\ \mathrm{kW}$ is that the heat pump still pays the entropy tax on the delivered heat, which the resistive heater pays twice.
:::

::: widget plot
f: 1-298.15/(273.15+15*x); 1-298.15/(273.15+100*x)
x: 0, 10
y: -0.3, 0.85
labels: exergy fraction of heat at 15x degrees C; exergy fraction of heat at 100x degrees C
caption: The fraction of heat that is exergy, $\zeta_T = 1 - T_0 / T$ with $T_0 = 298.15\ \mathrm{K}$, for two heat sources whose temperature rises from $0\ {}^{\circ}\mathrm{C}$ in $15\ \mathrm{K}$ and $100\ \mathrm{K}$ steps. The lower curve, up to $150\ {}^{\circ}\mathrm{C}$, is the world of **space and process heating**, and it stays below $0.3$ throughout: **every kilojoule of district heat is less than a third of a kilojoule of work**, no matter how the heat is made. The upper curve, up to $1{,}000\ {}^{\circ}\mathrm{C}$, is the world of **power generation**, where the same $1 - T_0 / T$ reaches $0.77$ and the incentive to convert rather than to use is overwhelming. Each curve crosses $\zeta = 0$ at $25\ {}^{\circ}\mathrm{C}$, the dead state, and the short negative branch below it is refrigeration, where exergy must be **supplied** to make cold.
:::

## Worked cases

::: example An exergy audit of a steam-using plant {#ex-plant}
A plant takes $12\ \mathrm{kg / s}$ of steam at $4\ \mathrm{MPa}$ and $400\ {}^{\circ}\mathrm{C}$ from a boiler, throttles it to $1\ \mathrm{MPa}$ for process use, condenses it and returns condensate at $180\ {}^{\circ}\mathrm{C}$. The boiler burns natural gas with an LHV of $49.8\ \mathrm{MJ / kg}$ at an energy efficiency of $92\ \%$. Audit the plant at $T_0 = 25\ {}^{\circ}\mathrm{C}$.
::: solution
**The states.**
$$
\begin{array}{l l c c}
1 & 4\ \mathrm{MPa},\ 400\ {}^{\circ}\mathrm{C} & h = 3{,}214.5 & s = 6.7714 \\
2 & 1\ \mathrm{MPa},\ h = 3{,}214.5 & T \approx 376\ {}^{\circ}\mathrm{C} & s = 7.3913 \\
3 & \text{condensate, saturated liquid at } 180\ {}^{\circ}\mathrm{C} & h = 763.05 & s = 2.1392
\end{array}
$$
with the dead state at $h_0 = 104.83$, $s_0 = 0.3672$ (steam tables, IAPWS-IF97).
**The exergies.**
$$
\psi_1 = \left( 3{,}214.5 - 104.83 \right) - 298.15 \left( 6.7714 - 0.3672 \right) = 3{,}109.7 - 1{,}909.4 = 1{,}200.3\ \mathrm{kJ / kg}
$$
$$
\psi_2 = 3{,}109.7 - 298.15 \left( 7.3913 - 0.3672 \right) = 3{,}109.7 - 2{,}094.2 = 1{,}015.4\ \mathrm{kJ / kg}
$$
$$
\psi_3 = \left( 763.05 - 104.83 \right) - 298.15 \left( 2.1392 - 0.3672 \right) = 658.2 - 528.3 = 129.9\ \mathrm{kJ / kg}
$$
**The fuel.** The steam's heat duty is $12 \times \left( 3{,}214.5 - 763.05 \right) = 29.42\ \mathrm{MW}$, so at $92\ \%$ the boiler burns $29.42 / 0.92 = 31.98\ \mathrm{MW}$ of fuel ($0.642\ \mathrm{kg / s}$ of gas), whose exergy is
$$
\dot{X}_{\mathrm{fuel}} = 31.98 \times 1.037 = 33.16\ \mathrm{MW}
$$
**The exergy delivered to the process** as steam, less the condensate returned:
$$
\dot{X}_{\mathrm{process}} = 12 \times \left( 1{,}015.4 - 129.9 \right) = 10.63\ \mathrm{MW}
$$
**The plant's second-law efficiency.**
$$
\eta_{\mathrm{II}} = \frac{10.63}{33.16} = 32.0\ \%
$$
**The first-law figure, for comparison.** $\eta_{\mathrm{I}} = 92\ \%$ — the plant's energy manager reports **$92\ \%$** while its exergy auditor reports **$32\ \%$**.
**The destruction, located.**
$$
\begin{array}{l c r c}
\text{Combustion} & \text{about } 30\ \%\ \text{of fuel exergy} & 10.0\ \mathrm{MW} & 30\ \% \\
\text{Boiler heat transfer across } \text{several hundred kelvin} & \text{by difference} & 9.5\ \mathrm{MW} & 29\ \% \\
\text{Stack, radiation, blowdown} & & 0.8\ \mathrm{MW} & 2\ \% \\
\text{The throttle} & 12 \times \left( 1{,}200.3 - 1{,}015.4 \right) & 2.22\ \mathrm{MW} & 7\ \% \\
\text{Delivered to the process} & & 10.63\ \mathrm{MW} & 32\ \%
\end{array}
$$
The boiler as a whole takes $33.16$ in and raises the water's exergy by $12 \times \left( 1{,}200.3 - 129.9 \right) = 12.84\ \mathrm{MW}$, so it destroys or loses $20.3\ \mathrm{MW}$.
**The reading.** **$90\ \%$ of the plant's destroyed exergy is destroyed in making steam, and $10\ \%$ in the throttle everyone is arguing about.** The throttle is $12 \times 184.9 = 2.22\ \mathrm{MW}$, worth about **$700{,}000$ currency units a year** at $35\ \text{currency units / MWh}$, and it is worth removing — but the boiler's $20\ \mathrm{MW}$ of destruction is worth **nine times** that, and the way to remove it is not a better boiler but **a different heat source**: a gas-fired CHP, a heat pump on the condensate return, or a process that does not need $4\ \mathrm{MPa}$ steam at all.
**The number that ends the argument.** The process needs $1\ \mathrm{MPa}$ steam, and it is being made by generating $4\ \mathrm{MPa}$ steam and throwing away $185\ \mathrm{kJ / kg}$ of its exergy. **Generating it at $1\ \mathrm{MPa}$ in the first place** saves the throttle entirely, and the only reason plants do not is that the $4\ \mathrm{MPa}$ header already exists and serves a turbine that is not there.
*Sanity.* The reason the plant's second-law efficiency is $32\ \%$ and not $92\ \%$ is that the process wants **heat at around $180\ {}^{\circ}\mathrm{C}$**, whose exergy is $0.36$ of its energy, and the plant is supplying it with **work-grade** chemical exergy. The reason the figure is not a scandal is that no cheaper way exists to make $1\ \mathrm{MPa}$ steam from gas — and the reason it is worth reporting is that it tells you the improvement is in the **steam level**, not in the equipment.
:::
:::

::: example Second-law efficiency of five devices {#ex-five}
Evaluate the first- and second-law efficiencies of: a $10\ \mathrm{kW}$ resistive heater at $80\ {}^{\circ}\mathrm{C}$; a gas boiler delivering heat at $80\ {}^{\circ}\mathrm{C}$ at $92\ \%$; a heat pump with $\mathrm{COP}\ 3.2$ delivering at $50\ {}^{\circ}\mathrm{C}$; an electric motor of $91\ \%$; and a $100\ \mathrm{W}$ incandescent lamp that emits $5\ \mathrm{W}$ of light (take its exergy as $90\ \%$ of its energy) and whose heat leaves at $60\ {}^{\circ}\mathrm{C}$.
::: solution
**1. Resistive heater.**
$$
\eta_{\mathrm{I}} = 1.000, \qquad
\eta_{\mathrm{II}} = \zeta_{80} = 1 - \frac{298.15}{353.15} = 0.1557 = 15.6\ \%
$$
**2. Gas boiler at $92\ \%$.**
$$
\eta_{\mathrm{I}} = 0.92, \qquad
\eta_{\mathrm{II}} = \frac{0.92 \times 0.1557}{1.037} = 0.138 = 13.8\ \%
$$
**3. Heat pump at $\mathrm{COP}\ 3.2$ delivering at $50\ {}^{\circ}\mathrm{C}$.**
$$
\eta_{\mathrm{I}} = 3.2, \qquad
\eta_{\mathrm{II}} = \frac{3.2 \times \left( 1 - 298.15 / 323.15 \right)}{1.0} = 3.2 \times 0.0774 = 0.248 = 24.8\ \%
$$
**4. Electric motor.**
$$
\eta_{\mathrm{I}} = 0.91, \qquad \eta_{\mathrm{II}} = 0.91
$$
**5. Incandescent lamp.** The useful output is $5\ \mathrm{W}$ of light, whose exergy is about $90\ \%$ of its energy, and the $95\ \mathrm{W}$ of heat leaves at $60\ {}^{\circ}\mathrm{C}$, where $\zeta_{60} = 1 - 298.15 / 333.15 = 0.1051$:
$$
\eta_{\mathrm{I}} = 0.05, \qquad
\eta_{\mathrm{II}} = \frac{5 \times 0.90 + 95 \times 0.1051}{100} = \frac{4.50 + 9.98}{100} = 14.5\ \%
$$
**The comparison, which is the point.**
$$
\begin{array}{l c c c}
\text{Device} & \eta_{\mathrm{I}} & \eta_{\mathrm{II}} & \text{Ratio} \\
\text{Resistive heater} & 100\ \% & 15.6\ \% & 6.4 \\
\text{Gas boiler} & 92\ \% & 13.8\ \% & 6.7 \\
\text{Heat pump} & 320\ \% & 24.8\ \% & 12.9 \\
\text{Electric motor} & 91\ \% & 91\ \% & 1.00 \\
\text{Incandescent lamp} & 5\ \% & 14.5\ \% & 0.34
\end{array}
$$
**The lamp is the only device whose second-law efficiency is higher than its first-law efficiency**, and the reason is that the $95\ \mathrm{W}$ of "waste" heat is at $60\ {}^{\circ}\mathrm{C}$ and still carries $10.0\ \mathrm{W}$ of exergy, which the first-law efficiency charges as a loss and the second-law efficiency credits as a **by-product** — the reason incandescent lamps were kept in bathrooms and drying rooms long after their efficacy was indefensible.
**The heat pump's $24.8\ \%$ against the boiler's $13.8\ \%$** is the honest version of the "heat pumps are three times efficient" claim: **the true advantage is a factor of $1.8$, not $3.2$**, and it is a factor in **destroyed exergy** and not in fuel bills, which depend on prices.
**The number that decides the retrofit.** Replacing the boiler with the heat pump cuts the destroyed exergy from $1 - 0.138 = 0.862$ to $1 - 0.248 = 0.752$ per unit of input exergy — **only $13\ \%$ less destruction**, because the heat pump's advantage is that it **moves** exergy rather than **creating** it, and the delivered heat's low quality caps both.
*Sanity.* The reason the motor's two efficiencies are identical is that work has $\zeta = 1$ at both ends and no entropy tax is levied. The reason the resistive heater's $\eta_{\mathrm{II}}$ equals $\zeta_{80}$ exactly is that the conversion is $100\ \%$ complete and all the destruction is in the **downgrade** from work to $80\ {}^{\circ}\mathrm{C}$ heat — a destruction that happens in the **resistor** and not in the room.
:::
:::

::: example Maximum work from a cooling body {#ex-maxwork}
$500\ \mathrm{kg}$ of steel at $600\ {}^{\circ}\mathrm{C}$ is to be cooled to $40\ {}^{\circ}\mathrm{C}$. Find the maximum recoverable work, the recoverable heat, and the exergy left in the steel at $40\ {}^{\circ}\mathrm{C}$, against a $25\ {}^{\circ}\mathrm{C}$ environment.
::: solution
**The energy available.** With $c = 0.49\ \mathrm{kJ / kg \cdot K}$:
$$
\Delta H = 500 \times 0.49 \times \left( 600 - 40 \right) = 137{,}200\ \mathrm{kJ}
$$
**The entropy change of the steel.**
$$
\Delta S = 500 \times 0.49 \times \ln \frac{313.15}{873.15} = 245 \times \left( - 1.0254 \right) = - 251.2\ \mathrm{kJ / K}
$$
**The maximum work**, which is the decrease in the steel's exergy:
$$
W_{\max} = \left( H_1 - H_2 \right) - T_0 \left( S_1 - S_2 \right)
= 137{,}200 - 298.15 \times 251.2 = 137{,}200 - 74{,}904 = 62{,}296\ \mathrm{kJ}
$$
**The exergy fraction.**
$$
\frac{62{,}296}{137{,}200} = 45.4\ \%
$$
**The check by integration.**
$$
W_{\max} = \int_{T_2}^{T_1} \left( 1 - \frac{T_0}{T} \right) m c\, d T
= m c \left[ \left( T_1 - T_2 \right) - T_0 \ln \frac{T_1}{T_2} \right]
= 245 \left[ 560 - 298.15 \times 1.0254 \right] = 245 \times 254.3 = 62{,}296\ \mathrm{kJ}\ \checkmark
$$
**The exergy left at $40\ {}^{\circ}\mathrm{C}$.**
$$
\Phi_{40} = 245 \left[ \left( 313.15 - 298.15 \right) - 298.15 \ln \frac{313.15}{298.15} \right]
= 245 \left[ 15 - 14.63 \right] = 89\ \mathrm{kJ}
$$
**The $89\ \mathrm{kJ}$ is $0.14\ \%$ of the original exergy** — a $40\ {}^{\circ}\mathrm{C}$ body is essentially exhausted. A heat-recovery system that cools to $40$ instead of $80\ {}^{\circ}\mathrm{C}$ gains $245 \times 40 = 9{,}800\ \mathrm{kJ}$ of extra heat but only this much **exergy**:
$$
245 \times \left[ 40 - 298.15 \ln \frac{353.15}{313.15} \right] = 245 \times 4.16 = 1{,}019\ \mathrm{kJ}
$$
**$1{,}019\ \mathrm{kJ}$ from the last $40\ \mathrm{K}$ against $15{,}600\ \mathrm{kJ}$ from the first $100\ \mathrm{K}$** (from $600$ to $500\ {}^{\circ}\mathrm{C}$) — a sixfold difference in exergy per kelvin, and the whole of the reason a quench tank's last stage is not worth a heat exchanger.
**The practical figure.** A real recovery system — a waste-heat boiler on the cooling air — recovers steam worth about **$35\ \%$** of the $62.3\ \mathrm{MJ}$, and the reason it is not more is that the steel must be cooled **fast** for the metallurgy and the heat-exchanger area that a slow cool would need is not available.
*Sanity.* The reason the exergy fraction is $45.4\ \%$ and not $1 - 298 / 873 = 65.9\ \%$ is that the source temperature **falls** as the heat is withdrawn, and the average $\zeta$ over the cooling is $\zeta$ evaluated at the logarithmic-mean temperature of the two ends. Using the hot-end factor over-states the recoverable work by **$45\ \%$**, which is the single most common error in a waste-heat feasibility study.
:::
:::

::: example Exergy of a refrigeration plant {#ex-refrig}
A plant produces $10\ \mathrm{tonnes / h}$ of ice from water at $20\ {}^{\circ}\mathrm{C}$, rejecting heat at $35\ {}^{\circ}\mathrm{C}$. The compressor draws $18\ \mathrm{kW}$. Find the minimum work, the COP, the Carnot COP and the second-law efficiency.
::: solution
**The duty.** Cooling water from $20$ to $0\ {}^{\circ}\mathrm{C}$, freezing, and cooling the ice to $- 5\ {}^{\circ}\mathrm{C}$:
$$
\dot{m} = \frac{10{,}000}{3{,}600} = 2.778\ \mathrm{kg / s}
$$
$$
\dot{Q} = 2.778 \times \left[ 4.18 \times 20 + 333.7 + 2.11 \times 5 \right]
= 2.778 \times \left[ 83.6 + 333.7 + 10.6 \right] = 2.778 \times 427.9 = 1{,}189\ \mathrm{kW}
$$
**The COP.**
$$
\mathrm{COP} = \frac{1{,}189}{18} = 66.1
$$
**The reading.** A COP of $66$ is **impossible** for a single vapour-compression machine, and the reason the figure appears is that $18\ \mathrm{kW}$ has been quoted for a plant that also includes a **brine** loop and a **cold store** charged overnight. **The number that catches this is the Carnot COP.**
**The Carnot COP.** Freezing at $- 8\ {}^{\circ}\mathrm{C}$ and rejecting at $35\ {}^{\circ}\mathrm{C}$:
$$
\mathrm{COP}_{\mathrm{C}} = \frac{265.15}{308.15 - 265.15} = \frac{265.15}{43.0} = 6.17
$$
**The minimum work.**
$$
\dot{W}_{\min} = \frac{1{,}189}{6.17} = 192.7\ \mathrm{kW}
$$
**The verdict.** The stated $18\ \mathrm{kW}$ is **one tenth of the thermodynamic minimum**, so either the duty or the power is wrong by an order of magnitude. Recomputing with a real plant: $\dot{W} = 340\ \mathrm{kW}$ gives
$$
\mathrm{COP} = 3.50, \qquad
\eta_{\mathrm{II}} = \frac{3.50}{6.17} = 56.7\ \%
$$
**The exergy of the ice.** The cold exergy of $1\ \mathrm{kg}$ of ice at $- 5\ {}^{\circ}\mathrm{C}$ relative to $25\ {}^{\circ}\mathrm{C}$ is
$$
\psi_{\mathrm{ice}} = \left( h - h_0 \right) - T_0 \left( s - s_0 \right)
$$
$$
h - h_0 = - \left[ 333.7 + 4.18 \times 25 + 2.11 \times 5 \right] = - 448.8\ \mathrm{kJ / kg}
$$
$$
s - s_0 = - \left[ 4.18 \ln \frac{298.15}{273.15} + \frac{333.7}{273.15} + 2.11 \ln \frac{273.15}{268.15} \right] = - 1.627\ \mathrm{kJ / kg \cdot K}
$$
$$
\psi_{\mathrm{ice}} \approx - 448.8 + 298.15 \times 1.627 = - 448.8 + 485.0 = 36.3\ \mathrm{kJ / kg}
$$
**The plant's second-law efficiency on the exergy basis** (the feed water at $20\ {}^{\circ}\mathrm{C}$ carries a negligible $0.2\ \mathrm{kJ / kg}$):
$$
\dot{X}_{\mathrm{ice}} = 2.778 \times 36.3 = 100.7\ \mathrm{kW}, \qquad
\eta_{\mathrm{II}} = \frac{100.7}{340} = 29.6\ \%
$$
**The two second-law efficiencies disagree — $56.7\ \%$ against $29.6\ \%$** — and the reason is that the first compares **COPs** (a refrigeration-machine convention that credits the plant with the whole heat lift) while the second credits only the **exergy actually stored in the product**. The ice-plant convention is the first; the exergy auditor's is the second; **both must be reported**, because the first says the machine is good and the second says the process is wasteful, and both statements are true.
**The number that shows why.** The plant destroys $340 - 100.7 = 239\ \mathrm{kW}$ of exergy. Of that, $340 - 192.7 = 147\ \mathrm{kW}$ is the machine's irreversibility measured against a Carnot machine between $- 8$ and $35\ {}^{\circ}\mathrm{C}$; the other $192.7 - 100.7 = 92\ \mathrm{kW}$ would be destroyed even by that Carnot machine, because the water is chilled from $20\ {}^{\circ}\mathrm{C}$ against a $- 8\ {}^{\circ}\mathrm{C}$ evaporator and the heat is rejected at $35\ {}^{\circ}\mathrm{C}$ rather than at $T_0$. **Ice is thermodynamically expensive and cheap because electricity is cheap**, and cold storage is charged overnight because electricity is cheaper then and the plant's capacity would otherwise be idle.
*Sanity.* The reason the Carnot COP is $6.17$ and the real one $3.50$ is that the evaporator must run at $- 15\ {}^{\circ}\mathrm{C}$ to freeze at $- 8$ and the condenser at $45\ {}^{\circ}\mathrm{C}$ to reject at $35$, and those two temperature differences alone drop the Carnot COP to $265.15 / 60 = 4.42$. **The machine is at $79\ \%$ of the Carnot limit of the exchangers' temperatures**, which is a good machine, and the process is at $30\ \%$ of the exergy ideal, which is a normal process.
:::
:::

::: history
**The idea that a heat's value depends on its temperature** is Carnot's of **1824**, expressed as the efficiency of an engine and not as a property of the heat; **the first explicit calculation** of the maximum work is due to **J. W. Gibbs**, whose **1873** papers defined the "available energy of the body and medium" — the work a body can do in a medium of given temperature and pressure. **Louis Georges Gouy** (**1889**) and **Aurel Stodola** (**1898**) independently showed that the lost work equals $T_0$ times the entropy generated — the **Gouy–Stodola theorem** — Stodola, professor at the ETH Zürich and author of the classic text on steam turbines, reaching it through the loss accounting of engines. **Joseph Keenan** at MIT made the idea an engineering tool as **availability** in the **1930s and 1940s**. **The name** the subject uses today comes from the Slovenian engineer **Zoran Rant**, who proposed *Exergie* in **1956** in a short paper in *Forschung im Ingenieurwesen*, and the European "exergy" and American "availability" traditions merged over the following decades. **The modern exergy literature** — **Jan Szargut**'s tables of standard chemical exergy and his cumulative-exergy accounting, **Adrian Bejan**'s entropy-generation minimisation of the **1980s**, and the **exergoeconomics** developed by **George Tsatsaronis** and others from the **1980s** — is the reason a modern plant specification reports destroyed exergy by component.
:::

## Where this leads

Exergy is the accounting layer on [[thermodynamics/entropy]], the yardstick that ranks the improvements in [[thermodynamics/power-cycles]], the reason the temperature factor in [[thermodynamics/second-law]] has a price, and the framework in which the chemical exergies of [[thermodynamics/mixtures-combustion]] are tabulated.

::: summary
- Exergy is measured against a named dead state, and the two terms that matter are the enthalpy above the dead state and the entropy tax $T_0 (s - s_0)$, which for high-pressure steam is 57 % of the enthalpy.
- Work is pure exergy; heat at $T$ carries $1 - T_0/T$ of it; a cooling stream carries $\int (1 - T_0/T)\delta Q$ and not the hot-end factor.
- $\dot X_{\mathrm{dest}} = T_0 \dot S_{\mathrm{gen}}$: exergy is destroyed everywhere and created nowhere, and a balance that closes on exergy has an error in it.
- A plant making $1\ \mathrm{MPa}$ steam from $4\ \mathrm{MPa}$ steam and a throttle reports 92 % on energy and 32 % on exergy, and 90 % of the destruction is in the boiler and not the throttle.
- Devices that convert work to work have equal first- and second-law efficiencies; every gap between the two is an entropy tax on a downgrade.
- A $600\ {}^{\circ}\mathrm{C}$ steel body is 45 % exergy and not 66 %, because the source temperature falls while the heat is being taken.
- A refrigeration plant's two second-law efficiencies — COP-based and product-exergy-based — differ by a factor of about two, and both must be reported.
:::

::: quiz
A plant's energy balance shows $100\ \mathrm{MW}$ of "waste heat" in a condenser cooling loop at $28\ {}^{\circ}\mathrm{C}$. What is its exergy at $T_0 = 15\ {}^{\circ}\mathrm{C}$?
- [ ] $100\ \mathrm{MW}$, because energy is exergy
- [x] $4.3\ \mathrm{MW}$, because $\zeta = 1 - 288 / 301$
- [ ] $62\ \mathrm{MW}$, the latent-equivalent fraction
- [ ] Zero, because it is below the dead state
::: solution
$\zeta = 1 - 288.15 / 301.15 = 0.0432$, so $\dot X = 100 \times 0.0432 = 4.3\ \mathrm{MW}$. **The condenser is an energy liability and an exergy treasure only if it is used as heat** — as a source at $28\ {}^{\circ}\mathrm{C}$ for a heat pump lifting to $80\ {}^{\circ}\mathrm{C}$, where $\zeta = 1 - 288.15 / 353.15 = 0.184$, every $100\ \mathrm{MW}$ of heat delivered carries $18.4\ \mathrm{MW}$ of exergy, bought mostly with the work the heat pump needs. **The right question is never "how much heat" but "how much heat at what temperature, and what would it cost to lift it."**
:::
:::

## Exercises

::: exercise Quality factor {level=1 check="0.614"}
Give the exergy fraction of heat at $500\ {}^{\circ}\mathrm{C}$ with $T_0 = 298.15\ \mathrm{K}$.
::: solution
$1 - 298.15 / 773.15 = 0.614$.
:::
:::

::: exercise Gouy–Stodola {level=1 check="29.3"}
Give the exergy destruction in kilowatts for a device generating $0.1\ \mathrm{kW / K}$ of entropy at $T_0 = 293.15\ \mathrm{K}$.
::: solution
$\dot X_{\mathrm{dest}} = 293.15 \times 0.1 = 29.3\ \mathrm{kW}$.
:::
:::

::: exercise Work {level=1 check="100"}
Give the exergy of $100\ \mathrm{kJ}$ of shaft work in kilojoules.
::: solution
$100\ \mathrm{kJ}$ — work is pure exergy at any temperature.
:::
:::

::: exercise Motor {level=1 check="0.93"}
An electric motor draws $10\ \mathrm{kW}$ and delivers $9.3\ \mathrm{kW}$ of shaft power. Give its second-law efficiency.
::: solution
$0.93$ — work to work pays no entropy tax, so $\eta_{\mathrm{II}} = \eta_{\mathrm{I}}$.
:::
:::

::: exercise Fuel ratio {level=1 check="1.037"}
Give the ratio of methane's standard chemical exergy to its LHV.
::: solution
$831.65 / 802.3 = 1.037$.
:::
:::

::: exercise Compressed air {level=2}
Give the specific exergy of air at $1{,}200\ \mathrm{kPa}$ and $25\ {}^{\circ}\mathrm{C}$ in kilojoules per kilogram, and the second-law efficiency of a compressor that needs $300\ \mathrm{kJ / kg}$ to make it.
::: solution
$$
\psi = R T_0 \ln \frac{P}{P_0} = 0.287 \times 298.15 \times \ln 11.84 = 85.57 \times 2.4715 = 211.5\ \mathrm{kJ / kg}
$$
$$
\eta_{\mathrm{II}} = \frac{211.5}{300} = 70.5\ \%
$$
*Sanity.* The $88.5\ \mathrm{kJ / kg}$ destroyed is mostly the **finite temperature difference in the aftercooler** and the **mechanical inefficiency**, and the reason an **intercooled, aftercooled two-stage** machine reaches $75\ \%$ is that it removes the aftercooler's difference and not the compression's.
:::
:::

::: exercise Heat pump {level=2}
A heat pump delivers $40\ \mathrm{kW}$ of heat at $60\ {}^{\circ}\mathrm{C}$ while drawing $11\ \mathrm{kW}$. Give its first- and second-law efficiencies and the destroyed exergy.
::: solution
$$
\eta_{\mathrm{I}} = \frac{40}{11} = 3.64, \qquad
\zeta_{60} = 1 - \frac{298.15}{333.15} = 0.1051
$$
$$
\dot{X}_{\mathrm{delivered}} = 40 \times 0.1051 = 4.20\ \mathrm{kW}, \qquad
\eta_{\mathrm{II}} = \frac{4.20}{11} = 38.2\ \%
$$
$$
\dot{X}_{\mathrm{dest}} = 11 - 4.20 = 6.80\ \mathrm{kW}
$$
*Sanity.* The $6.80\ \mathrm{kW}$ of destruction is **$62\ \%$** of the input, and most of it is the machine's and not the duty's. With a $10\ {}^{\circ}\mathrm{C}$ source the Carnot COP is $333.15 / 50 = 6.66$, so a reversible machine delivering the same $40\ \mathrm{kW}$ of heat would need only $40 / 6.66 = 6.0\ \mathrm{kW}$ of work. So of the $6.80\ \mathrm{kW}$ destroyed, **$11 - 6.0 = 5.0\ \mathrm{kW}$ is the machine's irreversibility and the remaining $1.8\ \mathrm{kW}$ is the penalty of drawing heat from a source colder than the $25\ {}^{\circ}\mathrm{C}$ dead state**, which no machine on that source can avoid. The machine is the problem and not the duty.
:::
:::

::: exercise Derivation {level=3}
Derive the closed-system exergy $\Phi = \left( U - U_0 \right) + P_0 \left( V - V_0 \right) - T_0 \left( S - S_0 \right)$ from a reversible engine operating between the system and the environment, and show that the maximum work from a finite heat source is $\int \left( 1 - T_0 / T \right) \delta Q$.
::: solution
**The construction.** A system at $\left( U, V, S \right)$ is brought to the dead state $\left( U_0, V_0, S_0 \right)$ by a **reversible** device that exchanges heat only with the system as it cools and rejects heat to the environment at $T_0$, doing work $W$.
**The balances.** Energy, for the combined system-plus-device:
$$
W = \left( U - U_0 \right) + Q_0
$$
where $Q_0$ is the heat **absorbed from the environment** (negative if rejected). Entropy, reversibly — the system's change plus the environment's, which gives up $Q_0$ at $T_0$:
$$
0 = \left( S_0 - S \right) - \frac{Q_0}{T_0} \quad \Rightarrow \quad Q_0 = - T_0 \left( S - S_0 \right)
$$
**The atmosphere's work.** As the system expands from $V$ to $V_0$ it pushes the atmosphere, which **receives** $P_0 \left( V_0 - V \right)$ of work. That work is not available at the shaft, so
$$
W_{\max} = \left( U - U_0 \right) - T_0 \left( S - S_0 \right) - P_0 \left( V_0 - V \right)
$$
which is
$$
\boxed{ \Phi = \left( U - U_0 \right) + P_0 \left( V - V_0 \right) - T_0 \left( S - S_0 \right) }
$$
**The steady-flow form.** For a stream, the same construction with the flow work $P v$ included gives
$$
\psi = \left( h - h_0 \right) - T_0 \left( s - s_0 \right)
$$
**The finite source.** Let the system be a body whose temperature falls from $T_1$ to $T_0$. A reversible engine takes $\delta Q$ from it at $T$ and rejects to $T_0$, delivering
$$
\delta W = \left( 1 - \frac{T_0}{T} \right) \delta Q
$$
and integrating,
$$
W_{\max} = \int_{1}^{0} \left( 1 - \frac{T_0}{T} \right) \delta Q
= Q - T_0 \int \frac{\delta Q}{T} = Q - T_0 \left( - \Delta S_{\mathrm{body}} \right)
$$
which is the same result, since $\int \delta Q / T$ **is** the body's entropy change along the reversible cooling path. $\blacksquare$
**The evaluation that shows the two forms agree.** $1\ \mathrm{kg}$ of water at $373.15\ \mathrm{K}$ cooled to $298.15\ \mathrm{K}$ with $c = 4.18$:
$$
Q = 4.18 \times 75 = 313.5\ \mathrm{kJ}, \qquad
\Delta S = 4.18 \ln \frac{373.15}{298.15} = 0.9379\ \mathrm{kJ / K}
$$
$$
W_{\max} = 313.5 - 298.15 \times 0.9379 = 313.5 - 279.6 = 33.9\ \mathrm{kJ}, \qquad
\frac{W_{\max}}{Q} = 10.8\ \%
$$
against the hot-end factor $1 - 298.15 / 373.15 = 20.1\ \%$. **The hot-end estimate over-states the recoverable work by $86\ \%$**, and the reason is that the average temperature of the heat withdrawn is the **logarithmic mean** $\left( 373.15 - 298.15 \right) / \ln \left( 373.15 / 298.15 \right) = 334.2\ \mathrm{K}$, whose factor is $1 - 298.15 / 334.2 = 10.8\ \%$ — exactly the correct value.
*Sanity.* The logarithmic mean is exact here because $c$ is constant: $\int \left( 1 - T_0 / T \right) m c\, dT = Q \left( 1 - T_0 / T_{\mathrm{ln}} \right)$ identically. **When $c$ varies, the integral is the answer.** A feasibility study that uses the arithmetic mean of the two ends ($335.65\ \mathrm{K}$, $\zeta = 11.2\ \%$) over-states slightly; one that uses the hot end over-states by $86\ \%$.
:::
:::

::: exercise Design {level=3}
Specify the exergy basis, the accounting, the instrumentation and the reporting requirements for an exergy audit of a $600\ \mathrm{MW_e}$ supercritical power station with district-heat extraction.
::: solution
**The dead state and the basis.**
$$
T_0 = 15\ {}^{\circ}\mathrm{C}, \quad P_0 = 101.325\ \mathrm{kPa}, \quad \text{reference atmosphere dry}, \quad \text{reference water saturated liquid at } T_0
$$
**The accounting.**
$$
\begin{array}{l c c c c}
\text{Stream or component} & \dot{E}\ (\mathrm{MW}) & \dot{X}\ (\mathrm{MW}) & \zeta & \dot{X}_{\mathrm{dest}}\ (\mathrm{MW}) \\
\text{Fuel, hard coal} & 1{,}620 & 1{,}750 & 1.080 & - \\
\text{Combustor and flue} & - & - & - & 540 \\
\text{Boiler heat transfer} & - & - & - & 385 \\
\text{Steam turbine, HP plus IP} & 640 & 590 & - & 50 \\
\text{Steam turbine, LP with extraction} & 520 & 470 & - & 46 \\
\text{Condenser} & 940 & 62 & 0.066 & 62 \\
\text{District-heat extraction} & 210 & 34 & 0.162 & 18 \\
\text{Feed pumps} & 22 & 22 & 1.0 & 3.4 \\
\text{Generator and transformer} & 600 & 600 & 1.0 & 12 \\
\hline
\text{Electricity exported} & 600 & 600 & 1.0 & - \\
\text{District heat exported} & 210 & 34 & 0.162 & - \\
\text{Total destroyed} & & & & 1{,}116
\end{array}
$$
**The reading.** The destruction column closes the balance: $1{,}750 - 600 - 34 = 1{,}116\ \mathrm{MW}$, with the combustor and the boiler's heat transfer accounting for $83\ \%$ of it. **The condenser carries $940\ \mathrm{MW}$ of energy and $62\ \mathrm{MW}$ of exergy**, so a proposal to "recover the condenser heat" is a proposal to recover at most **$6.6\ \%$** of it as work, or **all** of it as heat at about $35\ {}^{\circ}\mathrm{C}$ — which is useful only as a heat pump's **source**.
**The plant's second-law efficiency.**
$$
\eta_{\mathrm{II}} = \frac{600 + 34}{1{,}750} = 36.2\ \%
$$
against a first-law efficiency of $\left( 600 + 210 \right) / 1{,}620 = 50.0\ \%$.
**The four instruments.**
$$
\begin{array}{l l l}
\text{Coal flow and analysis} & \pm 0.5\ \%\ \text{mass, } \pm 0.3\ \mathrm{MJ / kg}\ \text{on the CV} & \text{the chemical exergy ratio is computed, not assumed} \\
\text{Flue gas} & \mathrm{O_2},\ \mathrm{CO},\ \text{moisture, } \pm 0.2\ \% & \text{the latent term is a large share of the flue's exergy} \\
\text{Extraction steam} & \text{PCT with IF97, } \pm 0.8\ \% & \\
\text{Heat network return} & \text{matched PT100s, } \pm 0.1\ \mathrm{K} & \text{the } \zeta\ \text{factor is } 0.162 \text{ and a } 5\ \mathrm{K}\ \text{change is } 8\ \%
\end{array}
$$
**The three reporting rules.**
$$
\begin{array}{l l}
1 & \text{The dead state named, with the } T_0\text{-sensitivity of every } \zeta \text{ reported} \\
2 & \text{The chemical exergy of each fuel computed from its analysis, not taken as a fixed multiple of the CV} \\
3 & \text{The destruction table closing to within } 2\ \%\ \text{of the plant total, with the residual shown}
\end{array}
$$
**The five improvements ranked by destroyed exergy.**
$$
\begin{array}{l c}
\text{Raise the main steam from } 28\ \mathrm{MPa} / 600\ {}^{\circ}\mathrm{C} \text{ to } 31\ \mathrm{MPa} / 620\ {}^{\circ}\mathrm{C} & 41\ \mathrm{MW} \\
\text{Lower the condenser pressure by } 0.7\ \mathrm{kPa} & 14\ \mathrm{MW} \\
\text{Convert the condenser to a heat-pump source for district heat} & 26\ \mathrm{MW} \\
\text{Reduce the boiler's pinch from } 14\ \text{to } 10\ \mathrm{K} & 11\ \mathrm{MW} \\
\text{Lower the district-heat supply temperature by } 6\ \mathrm{K} & 4\ \mathrm{MW}
\end{array}
$$
**The clause that protects the buyer.** **"THE AUDIT SHALL USE A DEAD STATE OF $15\ {}^{\circ}\mathrm{C}$, $101.325\ \mathrm{kPa}$ WITH A DRY REFERENCE ATMOSPHERE, SHALL COMPUTE EACH FUEL'S CHEMICAL EXERGY FROM ITS ANALYSIS, AND SHALL RANK ALL IMPROVEMENTS BY DESTROYED EXERGY. THE DESTRUCTION TABLE SHALL CLOSE TO WITHIN $2\ \%$ OF THE PLANT TOTAL AND THE RESIDUAL SHALL BE REPORTED."**
*Design comment.* The general rule is that **a condenser is a large energy flow and a small exergy flow**: a plant that reports only its energy balance will chase the $940\ \mathrm{MW}$ as if it were work, when at most $62\ \mathrm{MW}$ of it could ever become work — its value is as low-temperature heat, sold through a heat pump or a heat network.
:::
:::
