A thermodynamicist who is given a state and cannot look it up is not doing thermodynamics, she is guessing. The property table is the **instrument** of the subject — as much a part of the working method as the micrometer is of the metrology lab — and the reason it is a table and not a formula is that **no formula has ever been written that gets water right to better than a few per cent over the range a power plant uses**.

A **pure substance** is one whose chemical composition is uniform and fixed: water, nitrogen, carbon dioxide, R-134a. Air is **not** a pure substance in the strict sense and is treated as one anyway; steel is not one at all; wet steam is a pure substance in **two phases**, which is the distinction that matters, because a pure substance can be a **mixture of phases** and still have one composition.

::: warning Seven property errors that invalidate everything downstream
**Reading a saturated table in the superheated region.** The saturation tables give $v_f$, $v_g$, $h_f$, $h_{fg}$ at a **saturation** state; a state at $3\ \mathrm{MPa}$ and $400\ {}^{\circ}\mathrm{C}$ is **not** saturated and its enthalpy is on the superheated table. The tell is that $T > T_{\mathrm{sat}}$ at the given $P$. **Using $h = c_p \Delta T$ on a two-phase mixture.** In the dome, adding enthalpy does not raise the temperature at all, and $c_p$ is **infinite** there. **Assuming quality is defined outside the dome.** $x$ is the mass fraction of vapour **in a saturated mixture**; a compressed liquid has $x = 0$ by convention and a superheated vapour has no quality at all, and a calculation that reports $x = 1.15$ has not found a superheated state, it has made an error. **Treating a compressed liquid as an ideal gas.** Water at $200\ {}^{\circ}\mathrm{C}$ and $5\ \mathrm{MPa}$ has $v = 0.001157\ \mathrm{m^{3} / kg}$; the ideal-gas law gives $R T / P = 0.4615 \times 473 / 5000 = 0.0437$ — an error of **$3{,}700\ \%$**. **Interpolating across a phase boundary.** Tables are tabulated in $P$ and $T$; a state that lies between a saturated and a superheated entry must be **classified first** and interpolated second, and a linear interpolation between $v_f$ and a superheated $v$ gives a number with no meaning. **Forgetting that $c_p - c_v = R$ only for an ideal gas.** For a real fluid $c_p - c_v = T v \alpha^{2} / \beta$, which for liquid water at $25\ {}^{\circ}\mathrm{C}$ is $0.038\ \mathrm{kJ / kg \cdot K}$ against an $R$ of $0.4615$ — a factor of twelve. **Using the ideal-gas law near the critical point.** At $T_r = 1.05$, $P_r = 1.1$ the compressibility factor is $Z \approx 0.3$ and the ideal-gas law is wrong by a factor of three; the near-critical region is where every shortcut fails and where the refrigerant cycle actually operates.
:::

## Phases, the dome and the tables

::: definition Phases and phase equilibrium {#def-phase}
A **phase** is a quantity of matter that is **homogeneous throughout** and separated from other matter by a **mechanically distinguishable boundary**. Ice, liquid water and water vapour are three phases of one pure substance; a mixture of nitrogen and oxygen is **one** phase of a **mixture**.
$$
\begin{array}{l l l}
\text{Solid} & \text{crystalline, definite shape} & \text{the properties are anisotropic} \\
\text{Liquid} & \text{definite volume, no shape} & \text{incompressible to a good approximation} \\
\text{Vapour / gas} & \text{fills the volume} & \text{compressible; a vapour can be condensed by compression alone} \\
\text{Plasma} & \text{ionised} & \text{outside this course}
\end{array}
$$
**The distinction between a vapour and a gas.** A **vapour** is at a temperature **below its critical temperature** and can be liquefied by isothermal compression; a **gas** is above it and cannot be, whatever the pressure. Oxygen at $20\ {}^{\circ}\mathrm{C}$ is a gas, because $T_{cr} = - 119\ {}^{\circ}\mathrm{C}$; water vapour at $200\ {}^{\circ}\mathrm{C}$ is a vapour, because $T_{cr} = 374\ {}^{\circ}\mathrm{C}$.
**The phase-equilibrium condition.** Two phases of a pure substance coexist when their **specific Gibbs functions** are equal, $g_f \left( T, P \right) = g_g \left( T, P \right)$, which is one equation in two unknowns and therefore defines a **curve** — the saturation line. This is why $P_{\mathrm{sat}}$ is a function of $T$ alone and why pressure and temperature are **not** two independent properties in the dome.
**The Clapeyron equation**, obtained by differentiating $g_f = g_g$ along the saturation line:
$$
\frac{d P_{\mathrm{sat}}}{d T} = \frac{h_{fg}}{T \left( v_g - v_f \right)}
$$
**The evaluation for water at $100\ {}^{\circ}\mathrm{C}$:**
$$
\frac{d P_{\mathrm{sat}}}{d T} = \frac{2{,}256{,}400}{373.15 \times \left( 1.6720 - 0.001043 \right)} = \frac{2{,}256{,}400}{623.9} = 3{,}617\ \mathrm{Pa / K} = 3.62\ \mathrm{kPa / K}
$$
against the measured slope of the steam table at that point, $3.61\ \mathrm{kPa / K}$. $\checkmark$
**The number that makes a pressure cooker work.** The slope at $100\ {}^{\circ}\mathrm{C}$ is $3.6\ \mathrm{kPa / K}$, so a cooker at $120\ {}^{\circ}\mathrm{C}$ runs at $199\ \mathrm{kPa}$ absolute, and a cooker whose valve is set to $70\ \mathrm{kPa}$ **gauge** reaches $116\ {}^{\circ}\mathrm{C}$ — and at $2{,}000\ \mathrm{m}$ altitude, where the atmospheric pressure is $79.5\ \mathrm{kPa}$, the same valve gives $111\ {}^{\circ}\mathrm{C}$, which is why packet instructions carry an altitude table.
:::

::: definition The $P$–v and $T$–v surfaces and the dome {#def-dome}
$$
\begin{array}{l l l}
\text{Region} & \text{Test} & \text{Table} \\
\text{Compressed (subcooled) liquid} & T < T_{\mathrm{sat}} (P) \text{ or } P > P_{\mathrm{sat}} (T) & \text{compressed-liquid or } T \text{-table} \\
\text{Saturated mixture} & v_f < v < v_g,\ 0 < x < 1 & \text{saturated, with } x \\
\text{Saturated liquid} & v = v_f,\ x = 0 & \text{saturated} \\
\text{Saturated vapour} & v = v_g,\ x = 1 & \text{saturated} \\
\text{Superheated vapour} & T > T_{\mathrm{sat}} (P) \text{ or } v > v_g & \text{superheated}
\end{array}
$$
**The quality** is the mass fraction of vapour in a saturated mixture, and every **specific** property varies **linearly** with it:
$$
y = y_f + x \left( y_g - y_f \right) = y_f + x\, y_{fg}
$$
**The one property that does not.** The **temperature** and the **pressure** are constant across the dome, so neither is a function of quality and neither can be used to find it.
**The critical point** is where $v_f = v_g$, $h_{fg} = 0$, $\left( \partial P / \partial v \right)_T = 0$ and the meniscus disappears.
$$
\begin{array}{l c c c c}
\text{Substance} & T_{cr}\ (\mathrm{K}) & P_{cr}\ (\mathrm{MPa}) & v_{cr}\ (\mathrm{m^{3} / kg}) & M \\
\text{Water} & 647.10 & 22.064 & 0.003106 & 18.015 \\
\text{Carbon dioxide} & 304.13 & 7.377 & 0.00212 & 44.01 \\
\text{Nitrogen} & 126.19 & 3.394 & 0.00322 & 28.013 \\
\text{Air (pseudo)} & 132.53 & 3.773 & - & 28.97 \\
\text{Ammonia} & 405.40 & 11.333 & 0.00429 & 17.031 \\
\text{R-134a} & 374.21 & 4.059 & 0.00196 & 102.03
\end{array}
$$
**The triple point** is the unique $\left( T, P \right)$ at which three phases coexist; for water it is $0.01\ {}^{\circ}\mathrm{C}$ and $0.6117\ \mathrm{kPa}$, and it is **invariant** — one point, no freedom. Below the triple pressure, liquid water cannot exist and ice **sublimes**; this is the operating principle of a **freeze-drier** and of every frozen-food plant.
**The anomaly of water.** The solid is **less** dense than the liquid, so $d P_{\mathrm{sat}} / d T < 0$ on the fusion line and ice floats. The liquid's density peaks at $4\ {}^{\circ}\mathrm{C}$, which is why a lake freezes from the top down and why a **water** engine block cracks in a frost and a **glycol** one does not.
:::

::: definition How to read a steam table {#def-table}
**The classification algorithm, which is four lines and never fails.**
$$
\begin{array}{l}
1.\ \text{Given } P,\ T.\ \text{Look up } T_{\mathrm{sat}} (P) \text{ in the saturation table.} \\
2.\ T < T_{\mathrm{sat}} \Rightarrow \text{compressed liquid}.\ T > T_{\mathrm{sat}} \Rightarrow \text{superheated vapour}. \\
3.\ T = T_{\mathrm{sat}} \ (\text{or given } x) \Rightarrow \text{saturated mixture, use } y = y_f + x y_{fg}. \\
4.\ \text{Given } P,\ v \text{ instead: compare } v \text{ with } v_f \text{ and } v_g,\ \text{and get } x = \left( v - v_f \right) / v_{fg}.
\end{array}
$$
**The four saturation entries that must be memorised, because they appear in every second exam.**
$$
\begin{array}{l c c c c c}
P\ (\mathrm{MPa}) & T_{\mathrm{sat}}\ ({}^{\circ}\mathrm{C}) & v_g & h_f & h_{fg} & h_g \\
0.101325 & 100.00 & 1.6720 & 419.17 & 2{,}256.4 & 2{,}675.6 \\
1.000 & 179.88 & 0.19436 & 762.52 & 2{,}014.6 & 2{,}777.1 \\
5.000 & 263.94 & 0.03944 & 1{,}154.5 & 1{,}639.7 & 2{,}794.2 \\
0.008 & 41.51 & 17.947 & 173.88 & 2{,}403.1 & 2{,}577.0
\end{array}
$$
**The superheated table.** Tabulated in $P$ and $T$; the entries at a given pressure begin at $T_{\mathrm{sat}}$ and the **first** superheated entry is therefore only a few degrees above saturation at low pressure and $100\ \mathrm{K}$ above it at $10\ \mathrm{MPa}$.
**The compressed-liquid shortcut.** When no compressed-liquid table is available,
$$
v \approx v_f @ T, \qquad u \approx u_f @ T, \qquad s \approx s_f @ T, \qquad
h \approx h_f @ T + v_f \left( P - P_{\mathrm{sat}} \right)
$$
and the correction term $v_f \Delta P$ is the **pump work**: at $20\ {}^{\circ}\mathrm{C}$ and $5\ \mathrm{MPa}$ it is $0.001002 \times 4{,}998 = 5.0\ \mathrm{kJ / kg}$ against an $h_f$ of $83.9$ — a **$6\ \%$** correction to $h$ and a **$0\ \%$** correction to $v$, $u$ and $s$.
**The interpolation rule.** Linear in the tabulated variable, and **never** across a region boundary. Where a property varies steeply with $T$ — the superheated $c_p$ near saturation — interpolate in $1 / T$ or take the smaller interval.
:::

::: definition Ideal gases and the compressibility factor {#def-ideal}
$$
P v = R T, \qquad R = \frac{\bar{R}}{M}, \qquad \bar{R} = 8.31447\ \mathrm{kJ / kmol \cdot K}
$$
$$
\begin{array}{l c c c c}
\text{Gas} & M & R\ (\mathrm{kJ / kg \cdot K}) & c_p & \gamma \\
\text{Air} & 28.97 & 0.2870 & 1.005 & 1.400 \\
\text{Nitrogen} & 28.013 & 0.2968 & 1.040 & 1.400 \\
\text{Oxygen} & 31.999 & 0.2598 & 0.918 & 1.395 \\
\text{Carbon dioxide} & 44.01 & 0.1889 & 0.846 & 1.289 \\
\text{Water vapour} & 18.015 & 0.4615 & 1.872 & 1.327 \\
\text{Helium} & 4.003 & 2.0771 & 5.193 & 1.667 \\
\text{Hydrogen} & 2.016 & 4.1242 & 14.307 & 1.410 \\
\text{Methane} & 16.043 & 0.5183 & 2.226 & 1.316
\end{array}
$$
**The two conditions under which the ideal-gas law is good.** The molecules must be **far apart** and **not attracting**: $P \ll P_{cr}$ and $T \gg T_{cr}$, or equivalently $v \gg v_{cr}$. A single number measures both.
$$
Z \equiv \frac{P v}{R T}, \qquad Z = 1\ \text{exactly for an ideal gas}
$$
**The corresponding-states principle.** All gases have approximately the same $Z$ at the same **reduced** state,
$$
T_r = \frac{T}{T_{cr}}, \qquad P_r = \frac{P}{P_{cr}},
$$
which is the reason one chart serves the whole subject.
$$
\begin{array}{l c c c c}
\text{State} & T_r & P_r & Z & \text{Ideal-gas error} \\
\text{Air at } 0.1\ \mathrm{MPa},\ 300\ \mathrm{K} & 2.26 & 0.027 & 1.000 & 0.0\ \% \\
\text{Air at } 20\ \mathrm{MPa},\ 300\ \mathrm{K} & 2.26 & 5.30 & 1.07 & 7\ \% \\
\text{CO}_2 \text{ at } 2\ \mathrm{MPa},\ 300\ \mathrm{K} & 0.986 & 0.271 & 0.89 & 11\ \% \\
\text{Steam at } 8\ \mathrm{MPa},\ 400\ {}^{\circ}\mathrm{C} & 1.04 & 0.36 & 0.884 & 12\ \% \\
\text{CO}_2 \text{ at } 5\ \mathrm{MPa},\ 313\ \mathrm{K} & 1.03 & 0.68 & 0.30 & 230\ \% \\
\text{Methane at } 5\ \mathrm{MPa},\ 190\ \mathrm{K} & 1.00 & 1.09 & 0.29 & 245\ \%
\end{array}
$$
**The rule of thumb that keeps you out of trouble.** **Use the ideal-gas law when $T_r > 2$ at any pressure you will meet, or when $P_r < 0.1$ at any temperature above the critical.** Below that, use the chart, a real-gas table or an equation of state — and **never** the ideal-gas law within $T_r < 1.1$ and $P_r > 0.5$, which is where a carbon-dioxide pipeline, a transcritical refrigerant cycle and a liquid-methane tank all live.
:::

::: definition Specific heats {#def-cp}
$$
c_v \equiv \left( \frac{\partial u}{\partial T} \right)_v, \qquad c_p \equiv \left( \frac{\partial h}{\partial T} \right)_P
$$
**For an ideal gas** $h \equiv u + P v = u + R T$, so
$$
c_p = c_v + R \qquad \text{(Mayer's relation, ideal gas only)}
$$
**For a real substance** the general relation is
$$
c_p - c_v = T \left( \frac{\partial P}{\partial T} \right)_v \left( \frac{\partial v}{\partial T} \right)_P = \frac{T v \alpha^{2}}{\beta}
$$
where $\alpha$ is the volumetric expansivity and $\beta$ the isothermal compressibility.
**The evaluation for liquid water at $25\ {}^{\circ}\mathrm{C}$:** $\alpha = 2.57 \times 10^{- 4}\ \mathrm{K^{- 1}}$, $\beta = 4.52 \times 10^{- 10}\ \mathrm{Pa^{- 1}}$, $v = 0.001003$:
$$
c_p - c_v = \frac{298.15 \times 0.001003 \times \left( 2.57 \times 10^{- 4} \right)^{2}}{4.52 \times 10^{- 10}} = 0.0437\ \mathrm{kJ / kg \cdot K}
$$
against $c_p = 4.18$ — a **$1\ \%$** difference, which is why $c_p \approx c_v$ for every liquid and solid and **why the distinction is a gas phenomenon**.
**The temperature dependence.** For air, $c_p$ rises from $1.005$ at $300\ \mathrm{K}$ to $1.105$ at $1{,}000\ \mathrm{K}$ and $1.142$ at $1{,}500\ \mathrm{K}$, because vibration modes unlock. A combustion calculation using $c_p = 1.005$ at $2{,}200\ \mathrm{K}$ is wrong by **$20\ \%$** in $\Delta T$, and the standard fixes are the **air tables** (which integrate $c_p ( T )$ once and for all) or a **cold-air-standard** assumption that is honest only about being wrong.
**The incompressible-substance model.** For a solid or liquid, $d u = c\, dT$ and $d h = c\, dT + v\, dP$, and $c$ is tabulated:
$$
\begin{array}{l c c l c c}
\text{Substance} & c\ (\mathrm{kJ / kg \cdot K}) & \rho & \text{Substance} & c & \rho \\
\text{Water} & 4.18 & 1000 & \text{Aluminium} & 0.900 & 2700 \\
\text{Ice at } 0\ {}^{\circ}\mathrm{C} & 2.11 & 917 & \text{Steel} & 0.430 & 7850 \\
\text{Liquid water at } 0\ {}^{\circ}\mathrm{C} & 4.22 & 999 & \text{Concrete} & 0.880 & 2300 \\
\text{Copper} & 0.383 & 8950 & \text{Wood (dry)} & 1.68 & 510 \\
\text{Brick} & 0.840 & 1900 & \text{Human body} & 3.47 & 1010
\end{array}
$$
**The number that sizes a hot-water tank.** $4.18\ \mathrm{kJ / kg \cdot K}$ means a $200\ \mathrm{L}$ cylinder cooling from $60$ to $50\ {}^{\circ}\mathrm{C}$ gives up $200 \times 4.18 \times 10 = 8{,}360\ \mathrm{kJ} = 2.32\ \mathrm{kWh}$, which is a **day's** domestic hot-water demand and about **eleven hours** of a $200\ \mathrm{W}$ heat pump. Water is the cheapest thermal store per kilogram and, at $8{,}360\ \mathrm{kJ}$ against a lithium cell's $720\ \mathrm{kJ}$ for the same $50\ \mathrm{kg}$ mass, the cheapest per kilogram of **store** too — which is why **seasonal** heat storage is always water or ground and never a battery.
:::

::: widget plot
f: 1 + (0.30-1)*exp(-pow((x-1.03)/0.10,2))*2.2; 1
x: 0.9, 2.4
y: -0.4, 1.4
labels: Z near the critical point; ideal gas
caption: The compressibility factor against reduced temperature at a reduced pressure of about $0.7$, from the corresponding-states chart. At $T_r = 2$ the gas is ideal to $1\ \%$; at $T_r = 1.03$ — carbon dioxide at $313\ \mathrm{K}$, a transcritical refrigerant at a summer ambient, a methane tank at its fill pressure — $Z$ falls to $0.30$ and the ideal-gas law over-predicts the specific volume by a factor of $3.3$. The dip is not a modelling artefact: it is the region where the molecules are as far apart as the attractive forces allow and no further.
:::

## Worked cases

::: example Classifying four states of water {#ex-class}
Classify and find $v$ and $h$ for: (a) $2.5\ \mathrm{MPa}$, $200\ {}^{\circ}\mathrm{C}$; (b) $2.5\ \mathrm{MPa}$, $x = 0.60$; (c) $1.2\ \mathrm{MPa}$, $220\ {}^{\circ}\mathrm{C}$; (d) $20\ \mathrm{MPa}$, $100\ {}^{\circ}\mathrm{C}$.
::: solution
**(a) $2.5\ \mathrm{MPa}$, $200\ {}^{\circ}\mathrm{C}$.** $T_{\mathrm{sat}} \left( 2.5\ \mathrm{MPa} \right) = 223.99\ {}^{\circ}\mathrm{C}$, and $200 < 223.99$, so this is a **compressed liquid**.
$$
v \approx v_f @ 200\ {}^{\circ}\mathrm{C} = 0.001157\ \mathrm{m^{3} / kg}, \qquad
h \approx h_f + v_f \left( P - P_{\mathrm{sat}} \right) = 852.26 + 0.001157 \left( 2500 - 1554 \right) = 853.4\ \mathrm{kJ / kg}
$$
The compressed-liquid table gives $v = 0.001139$ and $h = 863.7$; the shortcut is **$1.2\ \%$** out on $v$ and **$1.2\ \%$** on $h$.
**(b) $2.5\ \mathrm{MPa}$, $x = 0.60$.** Saturated mixture, $T = 223.99\ {}^{\circ}\mathrm{C}$:
$$
v = v_f + x v_{fg} = 0.001197 + 0.60 \times \left( 0.07995 - 0.001197 \right) = 0.0484\ \mathrm{m^{3} / kg}
$$
$$
h = h_f + x h_{fg} = 961.98 + 0.60 \times 1{,}840.1 = 2{,}066\ \mathrm{kJ / kg}
$$
**(c) $1.2\ \mathrm{MPa}$, $220\ {}^{\circ}\mathrm{C}$.** $T_{\mathrm{sat}} \left( 1.2\ \mathrm{MPa} \right) = 187.96\ {}^{\circ}\mathrm{C}$, and $220 > 187.96$, so **superheated**. From the superheated table at $1.2\ \mathrm{MPa}$:
$$
v = 0.16931\ \mathrm{m^{3} / kg}, \qquad h = 2{,}839.3\ \mathrm{kJ / kg}
$$
The **superheat** is $220 - 187.96 = 32.0\ \mathrm{K}$.
**(d) $20\ \mathrm{MPa}$, $100\ {}^{\circ}\mathrm{C}$.** $T_{\mathrm{sat}} \left( 20\ \mathrm{MPa} \right) = 365.75\ {}^{\circ}\mathrm{C}$, so a **compressed liquid** — and at a pressure **below critical** but $91\ \%$ of it.
$$
v = 0.001022\ \mathrm{m^{3} / kg}, \qquad h = 422.9\ \mathrm{kJ / kg}
$$
against $h_f @ 100\ {}^{\circ}\mathrm{C} = 419.17$; the $v_f \Delta P$ correction gives $419.17 + 0.001043 \times 19{,}388 = 439.4$, which is **$3.9\ \%$** high because $v_f$ at $100\ {}^{\circ}\mathrm{C}$ is $4\ \%$ larger than the mean specific volume over the pressure range.
**The summary.**
$$
\begin{array}{l l c c}
& \text{Region} & v & h \\
\text{(a)} & \text{compressed liquid} & 0.001157 & 853.4 \\
\text{(b)} & \text{saturated mixture} & 0.0484 & 2{,}066 \\
\text{(c)} & \text{superheated vapour} & 0.16931 & 2{,}839.3 \\
\text{(d)} & \text{compressed liquid} & 0.001022 & 422.9
\end{array}
$$
**The trap in (a).** The state is a **liquid** at $2.5\ \mathrm{MPa}$ and $200\ {}^{\circ}\mathrm{C}$, and a reader who assumes that $200\ {}^{\circ}\mathrm{C}$ means "hot, therefore steam" will reach for the superheated table and find nothing — the superheated table at $2.5\ \mathrm{MPa}$ **starts** at $224\ {}^{\circ}\mathrm{C}$. The table's first entry is the classification.
*Sanity.* The $v$ of (a) is $0.001157$ and of (c) is $0.16931$, a factor of $146$; the $v$ of (b) is $0.0484$, which is $42$ times the liquid and $1 / 35$ of the vapour — and the fact that $0.0484$ lies between $v_f$ and $v_g$ is the whole of the classification test when $v$ is the given property.
:::
:::

::: example Finding quality three ways {#ex-quality}
Steam in a vessel at $1\ \mathrm{MPa}$ is found to have (a) $v = 0.1500\ \mathrm{m^{3} / kg}$, (b) $h = 2{,}400\ \mathrm{kJ / kg}$, (c) $s = 5.500\ \mathrm{kJ / kg \cdot K}$. Find the quality in each case, and comment on the agreement.
::: solution
At $1\ \mathrm{MPa}$: $v_f = 0.001127$, $v_g = 0.19436$, $h_f = 762.52$, $h_g = 2{,}777.1$, $s_f = 2.1382$, $s_g = 6.5850$.
**(a) From the volume.**
$$
x = \frac{v - v_f}{v_g - v_f} = \frac{0.1500 - 0.001127}{0.19436 - 0.001127} = \frac{0.14887}{0.19323} = 0.7704
$$
**(b) From the enthalpy.**
$$
x = \frac{h - h_f}{h_g - h_f} = \frac{2{,}400 - 762.52}{2{,}014.6} = 0.8128
$$
**(c) From the entropy.**
$$
x = \frac{s - s_f}{s_g - s_f} = \frac{5.500 - 2.1382}{4.4468} = 0.7560
$$
**The disagreement is the lesson.** The three qualities span $0.756$ to $0.813$ — a range of **$7.5\ \%$** — and the state cannot have three qualities.
**Why the volume is the most reliable.** In the dome, $v_{fg} / v_f = 171$, so a $1\ \%$ error in $v$ gives a $1.0\ \%$ error in $x$.
**Why the enthalpy is the least.** $h_{fg} / h_f = 2.64$, so a $1\ \%$ error in $h$ gives a $1.3\ \%$ error in $x$ — but $h$ is the property that is **inferred** from a calorimeter and not measured, and a throttling calorimeter's error is $2$ to $3\ \%$.
**Why the entropy is the most sensitive.** $s_{fg} / s_f = 2.08$, and $s$ is the property nobody measures directly.
**The number that resolves it.** A $1\ \%$ error in $v$ is $0.0015\ \mathrm{m^{3} / kg}$, which is a **$1.5\ \mathrm{L}$** error in a cubic metre — measurable with a calibrated vessel. A $1\ \%$ error in $h$ is $24\ \mathrm{kJ / kg}$, which is a **$24\ \mathrm{kW}$** error in a $1\ \mathrm{kg / s}$ flow meter — and a flow meter's calibration is $1\ \%$. **The volume method is the only one of the three that can be made accurate**, which is why a **steam quality** measurement in a laboratory is done by **throttling to a known superheat** and reading the temperature, and not by weighing.
*Sanity.* The reason the three methods disagree at all is that the tabulated $v$, $h$ and $s$ are **independent measurements** reconciled by a least-squares fit to an IAPWS formulation, and the fit's residuals are largest in the dome — the region where the equation of state is least constrained by data because two-phase flow cannot be sampled without separation.
:::
:::

::: example Real-gas correction for a carbon dioxide pipeline {#ex-co2}
A pipeline carries $\mathrm{CO_2}$ at $10\ \mathrm{MPa}$ and $320\ \mathrm{K}$ at $50\ \mathrm{kg / s}$. Give the density from the ideal-gas law, from the compressibility chart and from a real-gas equation, and the compressor power difference.
::: solution
**The ideal gas.**
$$
\rho_{\mathrm{ig}} = \frac{P}{R T} = \frac{10{,}000}{0.1889 \times 320} = 16.53\ \mathrm{kg / m^{3}}
$$
**The reduced state.** $T_r = 320 / 304.13 = 1.052$, $P_r = 10 / 7.377 = 1.356$. From the corresponding-states chart, $Z \approx 0.35$ — this is a **near-critical** state and the chart is at the limit of its accuracy.
**The Peng–Robinson equation**, solved for the vapour root:
$$
Z = 0.42 \quad \Rightarrow \quad \rho = \frac{P}{Z R T} = \frac{10{,}000}{0.42 \times 0.1889 \times 320} = 39.4\ \mathrm{kg / m^{3}}
$$
**The reference value.** NIST's REFPROP gives $41.0\ \mathrm{kg / m^{3}}$ at this state, so the ideal-gas law is wrong by a factor of **$2.5$** and the cubic equation of state by **$4\ \%$**.
**The volumetric flow.**
$$
\dot{V}_{\mathrm{ig}} = \frac{50}{16.53} = 3.025\ \mathrm{m^{3} / s}, \qquad
\dot{V}_{\mathrm{real}} = \frac{50}{41.0} = 1.220\ \mathrm{m^{3} / s}
$$
**The consequences, all of which follow from the density alone.**
$$
\begin{array}{l c c c}
& \text{Ideal gas} & \text{Real} & \text{Error} \\
\text{Pipe velocity at } D = 400\ \mathrm{mm} & 24.1\ \mathrm{m / s} & 9.7\ \mathrm{m / s} & 2.5 \times \\
\text{Pressure drop} \left( \propto \rho v^{2} \right) & 9{,}200\ \mathrm{Pa / km} & 1{,}490\ \mathrm{Pa / km} & 6.2 \times \\
\text{Surge volume per km} & 125.7\ \mathrm{t} & 52.8\ \mathrm{t} & 2.4 \times \\
\text{Compressor power} \left( \propto \dot{V} \right) & 3.03\ \mathrm{MW} & 1.22\ \mathrm{MW} & 2.5 \times
\end{array}
$$
**The decision this changes.** A $400\ \mathrm{mm}$ line designed on the ideal-gas law would be sized for a **$24\ \mathrm{m / s}$** velocity, which exceeds the **$7$ to $9\ \mathrm{m / s}$** erosion limit and would be **re-piped at twice the diameter** — and the real velocity is $9.7\ \mathrm{m / s}$, so the correct answer was to **keep** the $400\ \mathrm{mm}$ and accept the velocity.
**The near-critical warning.** At $320\ \mathrm{K}$ the fluid is **supercritical in pressure and subcritical in temperature**, which means it is a **dense liquid-like fluid** whose density changes violently with a small temperature change: between $318$ and $322\ \mathrm{K}$ at $10\ \mathrm{MPa}$ the density falls from $44$ to $37\ \mathrm{kg / m^{3}}$, a **$16\ \%$** change over $4\ \mathrm{K}$, and a pipeline in a heat wave will **surge**.
*Sanity.* The reason every carbon-dioxide pipeline and every transcritical $\mathrm{CO_2}$ refrigeration specification quotes a **real-gas** property package is that the whole economic case for transporting $\mathrm{CO_2}$ dense-phase rather than gaseous rests on a density of $40$ to $60\ \mathrm{kg / m^{3}}$ against the ideal gas's $17$ — and an engineer who uses the ideal-gas law on a $\mathrm{CO_2}$ pipeline has not made a $10\ \%$ error, he has made a **$150\ \%$** one.
:::
:::

::: example A vessel of steam is cooled {#ex-vessel}
A rigid, insulated $0.5\ \mathrm{m^{3}}$ vessel contains steam at $2\ \mathrm{MPa}$ and $300\ {}^{\circ}\mathrm{C}$. It is cooled until the pressure falls to $800\ \mathrm{kPa}$. Find the final state, the heat transferred and the final quality.
::: solution
**The initial state.** Superheated, since $T_{\mathrm{sat}} \left( 2\ \mathrm{MPa} \right) = 212.4\ {}^{\circ}\mathrm{C} < 300\ {}^{\circ}\mathrm{C}$:
$$
v_1 = 0.12547\ \mathrm{m^{3} / kg}, \qquad u_1 = 2{,}802.3\ \mathrm{kJ / kg}, \qquad
m = \frac{0.5}{0.12547} = 3.985\ \mathrm{kg}
$$
**The constraint.** Rigid vessel, so $v_2 = v_1 = 0.12547\ \mathrm{m^{3} / kg}$.
**The final state.** At $800\ \mathrm{kPa}$: $v_f = 0.001115$, $v_g = 0.24035$. Since $v_f < v_2 < v_g$, the final state is **in the dome**:
$$
x_2 = \frac{0.12547 - 0.001115}{0.24035 - 0.001115} = \frac{0.12436}{0.23924} = 0.5198
$$
$$
T_2 = T_{\mathrm{sat}} \left( 800\ \mathrm{kPa} \right) = 170.41\ {}^{\circ}\mathrm{C}
$$
$$
u_2 = u_f + x u_{fg} = 720.87 + 0.5198 \times 1{,}856.0 = 1{,}685.3\ \mathrm{kJ / kg}
$$
**The energy balance.** A closed system, rigid, so $W = 0$:
$$
Q = m \left( u_2 - u_1 \right) = 3.985 \times \left( 1{,}685.3 - 2{,}802.3 \right) = 3.985 \times \left( - 1{,}117.0 \right) = - 4{,}451\ \mathrm{kJ}
$$
**The interpretation.** $4.45\ \mathrm{MJ}$ is removed, and **$48\ \%$ of the steam has condensed**. The pressure has fallen by $60\ \%$ while the temperature has fallen by only $39\ \%$ in kelvin, because the remaining vapour sits on the saturation line.
**The number that matters in a plant.** A steam main that **shuts down** cools along a path of constant specific volume and its pressure collapses from $2\ \mathrm{MPa}$ to $0.8\ \mathrm{MPa}$ **without any mass leaving** — which is why a main that has tripped is at a **sub-atmospheric** pressure once it cools to ambient, and why a vacuum breaker is a **mandatory** fitting: without one the main sucks in water and grit through every flange gasket.
**The check.** At ambient, $T = 25\ {}^{\circ}\mathrm{C}$, the specific volume is still $0.12547$, and $v_g @ 25\ {}^{\circ}\mathrm{C} = 43.36\ \mathrm{m^{3} / kg}$, so $x = 0.0029$ and the pressure is $P_{\mathrm{sat}} @ 25\ {}^{\circ}\mathrm{C} = 3.17\ \mathrm{kPa}$ absolute — a **$98\ \%$ vacuum**.
*Sanity.* The reason the pressure falls so far is that in the dome the pressure is a function of temperature alone, and the cooling has driven the state onto the saturation line. A vessel cooled from superheated steam to ambient will end at $3\ \mathrm{kPa}$, and the load on its shell is a full atmosphere — which is the **external** pressure case that a steam-pipe support and a vacuum breaker are designed for, and which no calculation of the **operating** pressure would ever reveal.
:::
:::

::: example Reading a table by interpolation {#ex-interp}
Find $v$, $h$ and $s$ for steam at $3.6\ \mathrm{MPa}$ and $425\ {}^{\circ}\mathrm{C}$, given only the $3.5$ and $4.0\ \mathrm{MPa}$ entries of the superheated table.
::: solution
**The tabulated data.**
$$
\begin{array}{l c c c c}
P\ (\mathrm{MPa}) & T\ ({}^{\circ}\mathrm{C}) & v & h & s \\
3.5 & 400 & 0.08504 & 3{,}222.9 & 6.8403 \\
3.5 & 450 & 0.09196 & 3{,}328.7 & 7.0057 \\
4.0 & 400 & 0.07341 & 3{,}213.6 & 6.7690 \\
4.0 & 450 & 0.07961 & 3{,}325.0 & 6.9381
\end{array}
$$
**The classification.** $T_{\mathrm{sat}} \left( 3.6\ \mathrm{MPa} \right) = 244.7\ {}^{\circ}\mathrm{C} < 425\ {}^{\circ}\mathrm{C}$, so superheated. $\checkmark$
**The bilinear interpolation.** With $f = \left( 3.6 - 3.5 \right) / \left( 4.0 - 3.5 \right) = 0.20$ in pressure and $g = \left( 425 - 400 \right) / \left( 450 - 400 \right) = 0.50$ in temperature:
$$
v \left( 3.5, 425 \right) = 0.08504 + 0.50 \times \left( 0.09196 - 0.08504 \right) = 0.08850
$$
$$
v \left( 4.0, 425 \right) = 0.07341 + 0.50 \times \left( 0.07961 - 0.07341 \right) = 0.07651
$$
$$
v = 0.08850 + 0.20 \times \left( 0.07651 - 0.08850 \right) = 0.08610\ \mathrm{m^{3} / kg}
$$
$$
h = \left[ 3{,}275.8 \right] + 0.20 \times \left( \left[ 3{,}269.3 \right] - \left[ 3{,}275.8 \right] \right) = 3{,}274.5\ \mathrm{kJ / kg}
$$
$$
s = 6.9230 + 0.20 \times \left( 6.8536 - 6.9230 \right) = 6.9091\ \mathrm{kJ / kg \cdot K}
$$
**The error.** The IF97 values at this state are $v = 0.08618$, $h = 3{,}275.1$, $s = 6.9095$ — so the bilinear interpolation is out by **$0.09\ \%$**, **$0.02\ \%$** and **$0.006\ \%$**.
**Where the same procedure fails.** Interpolating in $T$ **across** the saturation line: at $2.0\ \mathrm{MPa}$ the table's superheated entries begin at $T_{\mathrm{sat}} = 212.4\ {}^{\circ}\mathrm{C}$, and an interpolation between $250\ {}^{\circ}\mathrm{C}$ and $300\ {}^{\circ}\mathrm{C}$ is safe, but an interpolation between a **saturated** entry at $2.0\ \mathrm{MPa}$ and a superheated entry at $2.5\ \mathrm{MPa}$ crosses the dome boundary and gives a number that is neither.
**The rule.** **Interpolate within a region, in the variable in which the table is tabulated, and never across a phase boundary.** Where a property is steep — $c_p$, $\alpha$, $v$ near the critical — interpolate in $1 / T$ or $1 / P$, or take a finer table.
*Sanity.* The reason the bilinear error is $0.09\ \%$ and not $1\ \%$ is that the superheated surface is nearly a **ruled** surface in this region — $v$ is close to $R T / P$ and $R T / P$ is exactly separable in $T$ and $1 / P$ — and the reason the same interpolation near the critical point gives $10\ \%$ errors is that $v \left( P, T \right)$ there is not smooth at all but has a genuine inflection, and no linear scheme on a coarse grid can follow it.
:::
:::

::: history
The **steam table** is the oldest artefact in this course and the reason thermodynamics exists at all. **James Watt**'s separate condenser of **1769** was an empirical device, and the **1776** engine's duty was improved by **counting coal per hogshead of water pumped** — the first engineering data series. **Henri-Victor Regnault**'s measurements of the heat of vaporisation and the specific heat of steam for the French artillery between **1840 and 1863** were the first accurate steam properties, and it was **reading Regnault's tables** that convinced **James Clerk Maxwell** in **1871** that a substance's properties could be represented by a **surface**. **Gibbs**'s 1873 paper gave the surface its thermodynamic meaning and the **phase rule** its $1876$ form; **the dome** as a drawn object is **J. H. van der Waals**'s of **1873**, whose equation of state reproduced a critical point and a two-phase region from a molecular model for the first time. **The critical temperature** was discovered by **Cagniard de la Tour** in **1822** and the **critical opalescence** described by **Thomas Andrews**, who measured carbon dioxide's critical point at $31\ {}^{\circ}\mathrm{C}$ and $73\ \mathrm{atm}$ in **1869** — the same substance and the same numbers this lesson uses. **The compressibility chart** is **H. L. Callendar**'s and **J. H. Keenan**'s contemporaneous work of the **1930s**, and the **corresponding-states** correlation of **Pitzer** of **1955** with its acentric factor is the version still printed. **The modern steam tables** are the **IAPWS-95** formulation of **1997** and the **IAPWS-IF97** industrial formulation of the same year, which are **correlations fitted to a thousand data points to within $0.025\ \%$ in specific volume** and which every power-plant design calculation in the world uses; the **steam tables in your textbook are an abridgement of IF97**, and the abridgement is why your answer and the plant's differ in the fourth figure.
:::

## Where this leads

The properties tabulated here enter the energy balance of [[thermodynamics/first-law-closed]] and [[thermodynamics/first-law-open]], set the limits derived in [[thermodynamics/second-law]], and are the working fluid of the cycles in [[thermodynamics/power-cycles]]; the ideal-gas model is used throughout [[thermodynamics/mixtures-combustion]].

::: summary
- A pure substance may be a mixture of phases; what is uniform is its chemical composition, and two phases coexist where the two Gibbs functions are equal.
- In the dome, pressure and temperature are not independent, every specific property is linear in quality, and temperature is not one of them.
- Classify before you interpolate: compare $T$ with $T_{\mathrm{sat}}(P)$, or $v$ with $v_f$ and $v_g$.
- A compressed liquid is a saturated liquid at its temperature plus a $v_f \Delta P$ correction to $h$ — and never an ideal gas.
- $c_p - c_v = R$ is an ideal-gas identity; for liquids and solids the two are within $1\ \%$.
- The compressibility factor $Z$ and the reduced state $T_r$, $P_r$ tell you when the ideal-gas law is safe: $T_r > 2$ or $P_r < 0.1$.
- Near the critical point every shortcut fails, and a carbon-dioxide pipeline designed on the ideal-gas law is wrong by a factor of $2.5$.
:::

::: quiz
A rigid vessel of saturated wet steam is heated slightly. What happens to the pressure and to the quality?
- [ ] Pressure rises, quality falls
- [x] Pressure rises, quality rises
- [ ] Pressure rises, quality is unchanged
- [ ] Pressure is unchanged, quality rises
::: solution
Adding enthalpy in the dome raises the temperature, and the pressure follows the saturation line, so it **rises**; and the added enthalpy evaporates liquid, so the **quality rises** too. The reverse is the operating fact of the previous example: cooling a rigid vessel of steam drops the pressure violently and condenses half of it, which is what makes a tripped steam main end up at a $3\ \mathrm{kPa}$ vacuum.
:::
:::

## Exercises

::: exercise Classification {level=1 check="0.001043"}
Give the specific volume of saturated liquid water at $100\ {}^{\circ}\mathrm{C}$ in cubic metres per kilogram.
::: solution
$0.001043\ \mathrm{m^{3} / kg}$.
:::
:::

::: exercise Critical {level=1 check="22.06"}
Give the critical pressure of water in megapascals.
::: solution
$22.064\ \mathrm{MPa}$, at $647.10\ \mathrm{K}$.
:::
:::

::: exercise Triple point {level=1 check="0.6117"}
Give the triple-point pressure of water in kilopascals.
::: solution
$0.6117\ \mathrm{kPa}$, at $0.01\ {}^{\circ}\mathrm{C}$.
:::
:::

::: exercise Ideal gas {level=1 check="0.287"}
Give the gas constant of air in kilojoules per kilogram kelvin.
::: solution
$R = 8.31447 / 28.97 = 0.287\ \mathrm{kJ / kg \cdot K}$.
:::
:::

::: exercise Quality {level=1 check="0.5"}
Steam at $1\ \mathrm{MPa}$ has $v = 0.0977\ \mathrm{m^{3} / kg}$. Give its quality.
::: solution
$x = (0.0977 - 0.001127) / (0.19436 - 0.001127) = 0.0966 / 0.19323 = 0.50$.
:::
:::

::: exercise Compressed liquid {level=2}
Give $h$ for compressed liquid water at $180\ {}^{\circ}\mathrm{C}$ and $8\ \mathrm{MPa}$, using the shortcut, and compare with the table value.
::: solution
$$
h \approx h_f @ 180\ {}^{\circ}\mathrm{C} + v_f \left( P - P_{\mathrm{sat}} \right) = 763.05 + 0.001127 \times \left( 8000 - 1002.6 \right) = 763.05 + 7.90 = 770.9\ \mathrm{kJ / kg}
$$
The compressed-liquid table gives $766.2\ \mathrm{kJ / kg}$, so the shortcut is **$0.6\ \%$** high.
*Sanity.* The $v_f \Delta P$ term is $7.9\ \mathrm{kJ / kg}$, which is $1\ \%$ of $h$ and **$100\ \%$** of the pump work in a feedwater circuit — and in a $1{,}000\ \mathrm{MW}$ plant the feedwater pump absorbs $25\ \mathrm{MW}$, which is exactly $\dot{m} v_f \Delta P$ summed over the pressure rise. The correction term that looks negligible is the pump.
:::
:::

::: exercise Real gas {level=2}
Methane at $10\ \mathrm{MPa}$ and $200\ \mathrm{K}$: give the density from the ideal-gas law and from $Z = 0.62$, and the error.
::: solution
$$
\rho_{\mathrm{ig}} = \frac{10{,}000}{0.5183 \times 200} = 96.5\ \mathrm{kg / m^{3}}, \qquad
\rho = \frac{96.5}{0.62} = 155.6\ \mathrm{kg / m^{3}}
$$
The ideal-gas law under-predicts the density by **$38\ \%$**.
*Sanity.* $T_r = 200 / 190.6 = 1.05$ and $P_r = 10 / 4.60 = 2.17$ — deep in the near-critical region, and $96.5\ \mathrm{kg / m^{3}}$ is below the **liquid** density of LNG at $111\ \mathrm{kg / m^{3}}$, which should have been the tell: an ideal gas should never be denser than its own liquid.
:::
:::

::: exercise Derivation {level=3}
From the Clapeyron equation and the ideal-gas approximation for the vapour, derive the Clausius–Clapeyron integrated form $\ln \left( P_2 / P_1 \right) = - \left( h_{fg} / R \right) \left( 1 / T_2 - 1 / T_1 \right)$, state its three assumptions, and estimate the error at $200\ {}^{\circ}\mathrm{C}$.
::: solution
**The three assumptions.** (i) The vapour is an **ideal gas**; (ii) the **liquid volume is negligible** against the vapour volume; (iii) $h_{fg}$ is **constant** over the range.
**The derivation.** Clapeyron gives
$$
\frac{d P_{\mathrm{sat}}}{d T} = \frac{h_{fg}}{T \left( v_g - v_f \right)} \approx \frac{h_{fg}}{T v_g} = \frac{h_{fg} P}{R T^{2}}
$$
where $v_g = R T / P$ has been used. Separating and integrating,
$$
\int_{P_1}^{P_2} \frac{d P}{P} = \frac{h_{fg}}{R} \int_{T_1}^{T_2} \frac{d T}{T^{2}}
\quad \Rightarrow \quad
\boxed{ \ln \frac{P_2}{P_1} = - \frac{h_{fg}}{R} \left( \frac{1}{T_2} - \frac{1}{T_1} \right) } .
$$
**The error at $200\ {}^{\circ}\mathrm{C}$.** Assumption (i): at $P_{\mathrm{sat}} = 1.5549\ \mathrm{MPa}$ and $473.15\ \mathrm{K}$, the steam table gives $v_g = 0.12721\ \mathrm{m^{3} / kg}$ against the ideal-gas $R T / P = 0.4615 \times 473.15 / 1554.9 = 0.14049$ — a **$10.4\ \%$** error, so $d P_{\mathrm{sat}} / d T$ is over-predicted by $10\ \%$.
**Assumption (ii).** $v_f / v_g = 0.001157 / 0.12721 = 0.91\ \%$ — negligible.
**Assumption (iii).** Over $150$ to $250\ {}^{\circ}\mathrm{C}$, $h_{fg}$ falls from $2{,}113.7$ to $1{,}715.3\ \mathrm{kJ / kg}$, a **$19\ \%$** change, so a constant-$h_{fg}$ integration across that range is poor.
**The evaluation.** Predict $P_{\mathrm{sat}}$ at $200\ {}^{\circ}\mathrm{C}$ from the value at $100\ {}^{\circ}\mathrm{C}$ using a mean $h_{fg} = 2{,}187\ \mathrm{kJ / kg}$:
$$
\ln \frac{P_2}{101.325} = - \frac{2{,}187}{0.4615} \left( \frac{1}{473.15} - \frac{1}{373.15} \right) = - 4{,}739 \times \left( - 5.688 \times 10^{- 4} \right) = 2.695
$$
$$
P_2 = 101.325 \times e^{2.695} = 1{,}556\ \mathrm{kPa}
$$
against the table's $1{,}554.9\ \mathrm{kPa}$ — an error of **$0.07\ \%$**.
**The paradox and its resolution.** The three assumptions are individually wrong by $10\ \%$, $1\ \%$ and $19\ \%$ and the answer is right to $0.07\ \%$, because **the errors have opposite signs**: the ideal-gas assumption over-predicts the slope and the falling $h_{fg}$ under-predicts it, and over this range they cancel almost exactly. The cancellation is not a law and it **fails at $350\ {}^{\circ}\mathrm{C}$**, where $v_g$ is $18\ \%$ below ideal and $h_{fg}$ has fallen $30\ \%$ and the same formula gives $18.7\ \mathrm{MPa}$ against the table's $16.529\ \mathrm{MPa}$ — a **$13\ \%$** error.
*Sanity.* The reason the formula survives in every textbook is that it is **exact for a substance whose vapour is ideal and whose $h_{fg}$ is constant**, and that the region where it is accurate for **water** — $50$ to $200\ {}^{\circ}\mathrm{C}$ — is the region where the two errors happen to cancel. A formula that is right for the wrong reason is the most dangerous object in engineering, and this one is used to size every safety valve in the world.
:::
:::

::: exercise Design {level=3}
Specify the property data, the instrumentation and the acceptance basis for the steam side of a $600\ \mathrm{MW}$ supercritical power plant operating at $25\ \mathrm{MPa}$ and $600\ {}^{\circ}\mathrm{C}$ with a $9\ \mathrm{kPa}$ condenser.
::: solution
**The states.**
$$
\begin{array}{l c c c c}
& P\ (\mathrm{MPa}) & T\ ({}^{\circ}\mathrm{C}) & h\ (\mathrm{kJ / kg}) & s\ (\mathrm{kJ / kg \cdot K}) \\
1\ \text{Turbine inlet} & 25.0 & 600 & 3{,}538.3 & 6.2614 \\
2\ \text{Extraction} & 5.0 & \text{sat.} & 2{,}794.2\ \left( x = 1 \right) & 5.9734 \\
3\ \text{Condenser} & 0.009 & 43.6 & 2{,}160.0\ \left( x = 0.828 \right) & 6.7428 \\
4\ \text{Condensate} & 0.009 & 43.6 & 182.5 & 0.6208 \\
5\ \text{Boiler outlet} & 25.0 & 600 & 3{,}538.3 & 6.2614
\end{array}
$$
**The isentropic expansion to $9\ \mathrm{kPa}$.** $s_{2s} = s_1 = 6.2614$, so
$$
x_{2s} = \frac{6.2614 - 0.5926}{7.6361} = 0.7422, \qquad h_{2s} = 173.88 + 0.7422 \times 2{,}403.1 = 1{,}960.4\ \mathrm{kJ / kg}
$$
$$
w_T = h_1 - h_{2s} = 1{,}577.9\ \mathrm{kJ / kg}, \qquad
\text{at } \eta_T = 0.92: \quad h_2 = 3{,}538.3 - 1{,}451.7 = 2{,}086.6, \quad x_2 = 0.7957
$$
**The wetness at the last-stage blades.** $x = 0.796$ means **$20\ \%$** liquid by mass, which is **twice** the accepted limit of $10$ to $12\ \%$ at the last-stage trailing edge. The design response is a **moisture separator and two reheat stages**, and the reheat is not an efficiency refinement but a **metallurgical necessity**.
**The property basis, stated in the specification.**
$$
\begin{array}{l l}
\text{Formulation} & \text{IAPWS-IF97, region 1/2/3/4/5 as applicable} \\
\text{At } 25\ \mathrm{MPa},\ 600\ {}^{\circ}\mathrm{C} & \text{region 2 (superheated), not region 3} \\
\text{Near the critical} & \text{region 3, where IF97's uncertainty rises to } 0.5\ \%\ \text{in } v \\
\text{Uncertainty} & 0.025\ \%\ \text{in } v,\ 0.1\ \%\ \text{in } h,\ 0.05\ \%\ \text{in } s \\
\text{Software} & \text{a certified IF97 library, not a spreadsheet polynomial}
\end{array}
$$
**The four instruments and their calibration.**
$$
\begin{array}{l l l}
\text{Main steam } P & 0.1\ \%\ \text{FS, temperature-compensated} & 25\ \mathrm{MPa} \pm 25\ \mathrm{kPa} \Rightarrow 0.05\ \%\ \text{of } h \\
\text{Main steam } T & \text{type-B RTD or sheathed thermocouple, } \pm 1.5\ \mathrm{K} & \pm 1.5\ \mathrm{K} \Rightarrow \pm 1.1\ \mathrm{kJ / kg} \text{ in } h \\
\text{Condenser } P & \text{absolute pressure transmitter, } 0 - 50\ \mathrm{kPa},\ \pm 0.05\ \mathrm{kPa} & \pm 0.05\ \mathrm{kPa} \Rightarrow \pm 0.25\ \mathrm{K} \text{ in } T_{\mathrm{sat}} \\
\text{Steam flow} & \text{orifice with density from IF97, } \pm 1\ \% & \text{the dominant uncertainty in the heat-rate test}
\end{array}
$$
**The one measurement that is always wrong.** The **condenser pressure**. A $0.5\ \mathrm{kPa}$ error — well inside a typical transmitter's drift — moves $T_{\mathrm{sat}}$ by $2.5\ \mathrm{K}$ and the cycle's heat rate by **$0.6\ \%$**, which on a $600\ \mathrm{MW}$ plant at $45\ \%$ efficiency is **$36{,}000\ \mathrm{t}$ of coal a year**. The specification must therefore require an **absolute** transmitter calibrated **in situ** against a dead-weight gauge, and a **temperature-based cross-check** from the condensate and cooling-water approach.
**The acceptance basis.** A performance test to **ASME PTC 6-2014**, with the heat rate corrected to the **IF97** reference at the guaranteed conditions, an uncertainty of **$\pm 1.0\ \%$** at $95\ \%$ confidence, and a **guarantee curve** rather than a single point, because a $600\ \mathrm{MW}$ machine spends $80\ \%$ of its life between $40\ \%$ and $90\ \%$ load.
*Design comment.* The general rule is that **a power-plant guarantee is a property-data specification wearing a mechanical contract**, and that the party who controls the property library controls the test result — which is why every modern turbine order names the formulation, the version and the calibration of every instrument in the heat-rate calculation.
:::
:::
