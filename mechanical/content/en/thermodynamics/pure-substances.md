A thermodynamicist who is given a state and cannot look up its properties is reduced to guessing. The property table is the **instrument** of the subject — as much a part of the working method as the micrometer is of the metrology lab — and it is a table and not a formula because **the formulations that get water right run to dozens of fitted terms, and no formula simple enough to use by hand is accurate to better than a few per cent over the range a power plant uses**.

A **pure substance** is one whose chemical composition is uniform and fixed: water, nitrogen, carbon dioxide, R-134a. Air is **not** a pure substance in the strict sense and is treated as one anyway; steel is not one at all; wet steam is a pure substance in **two phases**, which is the distinction that matters, because a pure substance can be a **mixture of phases** and still have one composition.

::: warning Seven property errors that invalidate everything downstream
**Reading a saturated table in the superheated region.** The saturation tables give $v_f$, $v_g$, $h_f$, $h_{fg}$ at a **saturation** state; a state at $3\ \mathrm{MPa}$ and $400\ {}^{\circ}\mathrm{C}$ is **not** saturated and its enthalpy is on the superheated table. The tell is that $T > T_{\mathrm{sat}}$ at the given $P$. **Using $h = c_p \Delta T$ on a two-phase mixture.** In the dome, adding enthalpy does not raise the temperature at all, and $c_p$ is **infinite** there. **Assuming quality is defined outside the dome.** $x$ is the mass fraction of vapour **in a saturated mixture**; a compressed liquid has $x = 0$ by convention and a superheated vapour has no quality at all, and a calculation that reports $x = 1.15$ has not found a superheated state, it has made an error. **Treating a compressed liquid as an ideal gas.** Water at $200\ {}^{\circ}\mathrm{C}$ and $5\ \mathrm{MPa}$ has $v = 0.001153\ \mathrm{m^{3} / kg}$; the ideal-gas law gives $R T / P = 0.4615 \times 473 / 5000 = 0.0437$ — an error of **$3{,}700\ \%$**. **Interpolating across a phase boundary.** Tables are tabulated in $P$ and $T$; a state that lies between a saturated and a superheated entry must be **classified first** and interpolated second, and a linear interpolation between $v_f$ and a superheated $v$ gives a number with no meaning. **Forgetting that $c_p - c_v = R$ only for an ideal gas.** For a real fluid $c_p - c_v = T v \alpha^{2} / \beta$, which for liquid water at $25\ {}^{\circ}\mathrm{C}$ is $0.044\ \mathrm{kJ / kg \cdot K}$ against an $R$ of $0.4615$ — a factor of ten. **Using the ideal-gas law near the critical point.** At $T_r = 1.05$, $P_r = 1.1$ the compressibility factor is $Z \approx 0.55$ and the ideal-gas law is wrong by nearly a factor of two; the near-critical region is where every shortcut fails and where the refrigerant cycle actually operates.
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
against the measured slope of the steam table at that point, $3.62\ \mathrm{kPa / K}$. $\checkmark$
**The number that makes a pressure cooker work.** The slope at $100\ {}^{\circ}\mathrm{C}$ is $3.6\ \mathrm{kPa / K}$, so a cooker at $120\ {}^{\circ}\mathrm{C}$ runs at $199\ \mathrm{kPa}$ absolute, and a cooker whose valve is set to $70\ \mathrm{kPa}$ **gauge** reaches $115\ {}^{\circ}\mathrm{C}$ — and at $2{,}000\ \mathrm{m}$ altitude, where the atmospheric pressure is $79.5\ \mathrm{kPa}$, the same valve gives $111\ {}^{\circ}\mathrm{C}$, which is why packet instructions carry an altitude table.
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
\text{Carbon dioxide} & 304.13 & 7.377 & 0.00214 & 44.01 \\
\text{Nitrogen} & 126.19 & 3.396 & 0.00319 & 28.013 \\
\text{Air (pseudo)} & 132.53 & 3.773 & - & 28.97 \\
\text{Ammonia} & 405.56 & 11.363 & 0.00429 & 17.031 \\
\text{R-134a} & 374.21 & 4.059 & 0.00196 & 102.03
\end{array}
$$
**The triple point** is the unique $\left( T, P \right)$ at which three phases coexist; for water it is $0.01\ {}^{\circ}\mathrm{C}$ and $0.6117\ \mathrm{kPa}$, and it is **invariant** — one point, no freedom. Below the triple pressure, liquid water cannot exist and ice **sublimes**; this is the operating principle of a **freeze-drier**.
**The anomaly of water.** The solid is **less** dense than the liquid, so $d P_{\mathrm{sat}} / d T < 0$ on the fusion line and ice floats. The liquid's density peaks at $4\ {}^{\circ}\mathrm{C}$, which is why a lake freezes from the top down; and because water expands by about $9\ \%$ on freezing, an engine block filled with plain **water** cracks in a frost and one filled with a **glycol** mixture does not.
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
0.10142 & 100.00 & 1.6720 & 419.17 & 2{,}256.4 & 2{,}675.6 \\
1.000 & 179.88 & 0.19436 & 762.52 & 2{,}014.6 & 2{,}777.1 \\
5.000 & 263.94 & 0.03944 & 1{,}154.5 & 1{,}639.7 & 2{,}794.2 \\
0.008 & 41.51 & 18.099 & 173.84 & 2{,}402.4 & 2{,}576.2
\end{array}
$$
**The superheated table.** Tabulated in $P$ and $T$; the entries at a given pressure begin at $T_{\mathrm{sat}}$ and the **first** superheated entry is therefore only a few degrees above saturation at low pressure (about $4\ \mathrm{K}$ at $10\ \mathrm{kPa}$) and about $14\ \mathrm{K}$ above it at $10\ \mathrm{MPa}$.
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
\text{Hydrogen} & 2.016 & 4.1242 & 14.307 & 1.405 \\
\text{Methane} & 16.043 & 0.5183 & 2.226 & 1.303
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
\text{Air at } 20\ \mathrm{MPa},\ 300\ \mathrm{K} & 2.26 & 5.30 & 1.03 & 3\ \% \\
\text{CO}_2 \text{ at } 2\ \mathrm{MPa},\ 300\ \mathrm{K} & 0.986 & 0.271 & 0.895 & 12\ \% \\
\text{Steam at } 8\ \mathrm{MPa},\ 400\ {}^{\circ}\mathrm{C} & 1.04 & 0.36 & 0.884 & 13\ \% \\
\text{CO}_2 \text{ at } 5\ \mathrm{MPa},\ 313\ \mathrm{K} & 1.03 & 0.68 & 0.75 & 34\ \% \\
\text{Methane at } 5\ \mathrm{MPa},\ 190\ \mathrm{K} & 1.00 & 1.09 & 0.21 & 370\ \%
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
**The temperature dependence.** For air, $c_p$ rises from $1.005$ at $300\ \mathrm{K}$ to $1.142$ at $1{,}000\ \mathrm{K}$ and $1.21$ at $1{,}500\ \mathrm{K}$, because vibration modes unlock. A combustion calculation using $c_p = 1.005$ up to $2{,}200\ \mathrm{K}$ is wrong by **$15$ to $20\ \%$** in $\Delta T$, and the standard fixes are the **air tables** (which integrate $c_p ( T )$ once and for all) or a **cold-air-standard** assumption that is honest only about being wrong.
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
**The number that sizes a hot-water tank.** $4.18\ \mathrm{kJ / kg \cdot K}$ means a $200\ \mathrm{L}$ cylinder cooling from $60$ to $50\ {}^{\circ}\mathrm{C}$ gives up $200 \times 4.18 \times 10 = 8{,}360\ \mathrm{kJ} = 2.32\ \mathrm{kWh}$, which is a **day's** domestic hot-water demand and about **eleven hours** of a $200\ \mathrm{W}$ heat pump. Per kilogram, water cooled through $10\ \mathrm{K}$ gives up only $42\ \mathrm{kJ}$ against a lithium cell's $720\ \mathrm{kJ}$, but water costs almost nothing per kilogram and needs only an insulated tank — which is why **seasonal** heat storage is water or ground and not a battery.
:::

::: widget plot
f: 1-0.494*exp(-3.46*(x-1))-0.367/(1+exp((x-1.036)/0.0198)); 1
x: 1, 2.4
y: 0, 1.2
labels: Z of CO2 at P_r = 1.2; ideal gas
caption: The compressibility factor of carbon dioxide against reduced temperature at a reduced pressure of $1.2$ (about $8.9\ \mathrm{MPa}$), fitted to the reference equation of state. At $T_r = 2$ the gas is ideal to $2\ \%$; at $T_r = 1.03$ ($313\ \mathrm{K}$) $Z$ falls to $0.34$ and the ideal-gas law over-predicts the specific volume by a factor of three. At a lower reduced pressure the dip is much shallower: at $P_r = 0.7$ and the same $T_r$, $Z = 0.74$. The dip is real, not a modelling artefact: near the critical point the attractive forces pull the fluid to a liquid-like density.
:::

## Worked cases

::: example Classifying four states of water {#ex-class}
Classify and find $v$ and $h$ for: (a) $2.5\ \mathrm{MPa}$, $200\ {}^{\circ}\mathrm{C}$; (b) $2.5\ \mathrm{MPa}$, $x = 0.60$; (c) $1.2\ \mathrm{MPa}$, $220\ {}^{\circ}\mathrm{C}$; (d) $20\ \mathrm{MPa}$, $100\ {}^{\circ}\mathrm{C}$.
::: solution
**(a) $2.5\ \mathrm{MPa}$, $200\ {}^{\circ}\mathrm{C}$.** $T_{\mathrm{sat}} \left( 2.5\ \mathrm{MPa} \right) = 223.95\ {}^{\circ}\mathrm{C}$, and $200 < 223.95$, so this is a **compressed liquid**.
$$
v \approx v_f @ 200\ {}^{\circ}\mathrm{C} = 0.001157\ \mathrm{m^{3} / kg}, \qquad
h \approx h_f + v_f \left( P - P_{\mathrm{sat}} \right) = 852.26 + 0.001157 \left( 2500 - 1554 \right) = 853.4\ \mathrm{kJ / kg}
$$
The compressed-liquid values (IAPWS) are $v = 0.001156$ and $h = 852.7$; the shortcut is **$0.1\ \%$** out on $v$ and **$0.1\ \%$** on $h$.
**(b) $2.5\ \mathrm{MPa}$, $x = 0.60$.** Saturated mixture, $T = 223.95\ {}^{\circ}\mathrm{C}$:
$$
v = v_f + x v_{fg} = 0.001197 + 0.60 \times \left( 0.07995 - 0.001197 \right) = 0.0484\ \mathrm{m^{3} / kg}
$$
$$
h = h_f + x h_{fg} = 961.91 + 0.60 \times 1{,}840.0 = 2{,}066\ \mathrm{kJ / kg}
$$
**(c) $1.2\ \mathrm{MPa}$, $220\ {}^{\circ}\mathrm{C}$.** $T_{\mathrm{sat}} \left( 1.2\ \mathrm{MPa} \right) = 187.96\ {}^{\circ}\mathrm{C}$, and $220 > 187.96$, so **superheated**. From the superheated table at $1.2\ \mathrm{MPa}$:
$$
v = 0.17887\ \mathrm{m^{3} / kg}, \qquad h = 2{,}865.7\ \mathrm{kJ / kg}
$$
The **superheat** is $220 - 187.96 = 32.0\ \mathrm{K}$.
**(d) $20\ \mathrm{MPa}$, $100\ {}^{\circ}\mathrm{C}$.** $T_{\mathrm{sat}} \left( 20\ \mathrm{MPa} \right) = 365.75\ {}^{\circ}\mathrm{C}$, so a **compressed liquid** — and at a pressure **below critical** but $91\ \%$ of it.
$$
v = 0.0010337\ \mathrm{m^{3} / kg}, \qquad h = 434.2\ \mathrm{kJ / kg}
$$
against $h_f @ 100\ {}^{\circ}\mathrm{C} = 419.17$; the $v_f \Delta P$ correction gives $419.17 + 0.001043 \times 19{,}899 = 439.9$, which is **$1.3\ \%$** high: at $20\ \mathrm{MPa}$ water is no longer quite incompressible, and its internal energy at fixed temperature has fallen by $5.6\ \mathrm{kJ / kg}$, which the shortcut ignores.
**The summary.**
$$
\begin{array}{l l c c}
& \text{Region} & v & h \\
\text{(a)} & \text{compressed liquid} & 0.001157 & 853.4 \\
\text{(b)} & \text{saturated mixture} & 0.0484 & 2{,}066 \\
\text{(c)} & \text{superheated vapour} & 0.17887 & 2{,}865.7 \\
\text{(d)} & \text{compressed liquid} & 0.0010337 & 434.2
\end{array}
$$
**The trap in (a).** The state is a **liquid** at $2.5\ \mathrm{MPa}$ and $200\ {}^{\circ}\mathrm{C}$, and a reader who assumes that $200\ {}^{\circ}\mathrm{C}$ means "hot, therefore steam" will reach for the superheated table and find nothing — the superheated table at $2.5\ \mathrm{MPa}$ **starts** at $224\ {}^{\circ}\mathrm{C}$. The table's first entry is the classification.
*Sanity.* The $v$ of (a) is $0.001157$ and of (c) is $0.17887$, a factor of $155$; the $v$ of (b) is $0.0484$, which is $42$ times the saturated liquid's and $61\ \%$ of the saturated vapour's $0.0800$ — and the fact that $0.0484$ lies between $v_f$ and $v_g$ is the whole of the classification test when $v$ is the given property.
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
**Why the enthalpy is the least.** $h_{fg} / h_f = 2.64$, so a $1\ \%$ error in $h$ gives a $1.5\ \%$ error in $x$ — but $h$ is the property that is **inferred** from a calorimeter and not measured, and a throttling calorimeter's error is $2$ to $3\ \%$.
**Why the entropy is the most sensitive.** $s_{fg} / s_f = 2.08$, and $s$ is the property nobody measures directly.
**The number that resolves it.** A $1\ \%$ error in $v$ is $0.0015\ \mathrm{m^{3} / kg}$, which is a **$1.5\ \mathrm{L}$** error in a cubic metre — measurable with a calibrated vessel. A $1\ \%$ error in $h$ is $24\ \mathrm{kJ / kg}$, which is a **$24\ \mathrm{kW}$** error in a $1\ \mathrm{kg / s}$ flow meter — and a flow meter's calibration is $1\ \%$. **On sensitivity alone the volume method is the best of the three** — but in practice the laboratory measurement of steam quality is the **throttling calorimeter**, an enthalpy method, because a known volume of wet steam cannot easily be sampled without the phases separating.
*Sanity.* The tables are generated from a single fundamental equation (IAPWS-95) and are mutually consistent, so a real state has one quality whichever property is used to find it. Three different answers mean that at least two of the three measured values are wrong.
:::
:::

::: example Real-gas correction for a carbon dioxide pipeline {#ex-co2}
A pipeline carries $\mathrm{CO_2}$ at $10\ \mathrm{MPa}$ and $320\ \mathrm{K}$ at $50\ \mathrm{kg / s}$. Give the density from the ideal-gas law, from the compressibility chart and from a real-gas equation, and the compressor power difference.
::: solution
**The ideal gas.**
$$
\rho_{\mathrm{ig}} = \frac{P}{R T} = \frac{10{,}000}{0.1889 \times 320} = 165.4\ \mathrm{kg / m^{3}}
$$
**The reduced state.** $T_r = 320 / 304.13 = 1.052$, $P_r = 10 / 7.377 = 1.356$. From the corresponding-states chart, $Z \approx 0.37$ — this is a **near-critical** state and the chart is at the limit of its accuracy.
**The Peng–Robinson equation**, solved for the vapour root:
$$
Z = 0.391 \quad \Rightarrow \quad \rho = \frac{P}{Z R T} = \frac{10{,}000}{0.391 \times 0.1889 \times 320} = 423\ \mathrm{kg / m^{3}}
$$
**The reference value.** The Span–Wagner reference equation of state (as implemented in NIST REFPROP) gives $448\ \mathrm{kg / m^{3}}$ ($Z = 0.369$) at this state, so the ideal-gas law is wrong by a factor of **$2.7$** and the cubic equation of state by **$6\ \%$**.
**The volumetric flow.**
$$
\dot{V}_{\mathrm{ig}} = \frac{50}{165.4} = 0.302\ \mathrm{m^{3} / s}, \qquad
\dot{V}_{\mathrm{real}} = \frac{50}{448} = 0.112\ \mathrm{m^{3} / s}
$$
**The consequences, all of which follow from the density alone.**
$$
\begin{array}{l c c c}
& \text{Ideal gas} & \text{Real} & \text{Error} \\
\text{Pipe velocity at } D = 400\ \mathrm{mm} & 2.41\ \mathrm{m / s} & 0.89\ \mathrm{m / s} & 2.7 \times \\
\text{Friction loss} \left( f = 0.012 \right) & 14.4\ \mathrm{kPa / km} & 5.3\ \mathrm{kPa / km} & 2.7 \times \\
\text{Line pack per km} & 20.8\ \mathrm{t} & 56.3\ \mathrm{t} & 1 / 2.7 \\
\text{Volume flow (pumping power} \propto \dot{V} \text{)} & 0.302\ \mathrm{m^{3} / s} & 0.112\ \mathrm{m^{3} / s} & 2.7 \times
\end{array}
$$
**The decision this changes.** A line sized on the ideal-gas law for a velocity of $2.4\ \mathrm{m / s}$ would be $400\ \mathrm{mm}$; at the real density the same velocity is reached in a pipe of $400 / \sqrt{2.7} \approx 245\ \mathrm{mm}$, so the ideal-gas design buys a pipe with nearly three times the necessary cross-section and under-counts the line pack — the inventory that sets the depressurisation and safety case — by the same factor.
**The near-critical warning.** At $320\ \mathrm{K}$ and $10\ \mathrm{MPa}$ the fluid is **supercritical**, only $16\ \mathrm{K}$ above the critical temperature, which means it is a **dense, liquid-like fluid** whose density changes violently with a small temperature change: between $318$ and $322\ \mathrm{K}$ at $10\ \mathrm{MPa}$ the density falls from $503$ to $404\ \mathrm{kg / m^{3}}$, a **$20\ \%$** change over $4\ \mathrm{K}$, and a pipeline that warms in a heat wave sees its line pack and pressure drop shift accordingly.
*Sanity.* Every carbon-dioxide pipeline and every transcritical $\mathrm{CO_2}$ refrigeration specification quotes a **real-fluid** property package, because the economic case for transporting $\mathrm{CO_2}$ in the dense phase rests on a density of several hundred kilograms per cubic metre — $448$ here, and $860$ to $920\ \mathrm{kg / m^{3}}$ at a buried-pipeline temperature of $10$ to $20\ {}^{\circ}\mathrm{C}$ — against the ideal gas's $165$. An engineer who uses the ideal-gas law on a $\mathrm{CO_2}$ pipeline has not made a $10\ \%$ error; he has made a **$170\ \%$** one.
:::
:::

::: example A vessel of steam is cooled {#ex-vessel}
A rigid $0.5\ \mathrm{m^{3}}$ vessel contains steam at $2\ \mathrm{MPa}$ and $300\ {}^{\circ}\mathrm{C}$. It is cooled until the pressure falls to $800\ \mathrm{kPa}$. Find the final state, the heat transferred and the final quality.
::: solution
**The initial state.** Superheated, since $T_{\mathrm{sat}} \left( 2\ \mathrm{MPa} \right) = 212.4\ {}^{\circ}\mathrm{C} < 300\ {}^{\circ}\mathrm{C}$:
$$
v_1 = 0.12551\ \mathrm{m^{3} / kg}, \qquad u_1 = 2{,}773.2\ \mathrm{kJ / kg}, \qquad
m = \frac{0.5}{0.12551} = 3.984\ \mathrm{kg}
$$
**The constraint.** Rigid vessel, so $v_2 = v_1 = 0.12551\ \mathrm{m^{3} / kg}$.
**The final state.** At $800\ \mathrm{kPa}$: $v_f = 0.001115$, $v_g = 0.24035$. Since $v_f < v_2 < v_g$, the final state is **in the dome**:
$$
x_2 = \frac{0.12551 - 0.001115}{0.24035 - 0.001115} = \frac{0.12440}{0.23924} = 0.5200
$$
$$
T_2 = T_{\mathrm{sat}} \left( 800\ \mathrm{kPa} \right) = 170.41\ {}^{\circ}\mathrm{C}
$$
$$
u_2 = u_f + x u_{fg} = 719.97 + 0.5200 \times 1{,}856.1 = 1{,}685.1\ \mathrm{kJ / kg}
$$
**The energy balance.** A closed system, rigid, so $W = 0$:
$$
Q = m \left( u_2 - u_1 \right) = 3.984 \times \left( 1{,}685.1 - 2{,}773.2 \right) = 3.984 \times \left( - 1{,}088.1 \right) = - 4{,}335\ \mathrm{kJ}
$$
**The interpretation.** $4.33\ \mathrm{MJ}$ is removed, and **$48\ \%$ of the steam has condensed**. The pressure has fallen by $60\ \%$ while the temperature has fallen by only $23\ \%$ in kelvin, because the remaining vapour sits on the saturation line.
**The number that matters in a plant.** A steam main that **shuts down** cools along a path of constant specific volume and its pressure collapses from $2\ \mathrm{MPa}$ to $0.8\ \mathrm{MPa}$ **without any mass leaving** — which is why a main that has tripped is at a **sub-atmospheric** pressure once it cools to ambient, and why a vacuum breaker is a **mandatory** fitting: without one the main sucks in water and grit through every flange gasket.
**The check.** At ambient, $T = 25\ {}^{\circ}\mathrm{C}$, the specific volume is still $0.12551$, and $v_g @ 25\ {}^{\circ}\mathrm{C} = 43.34\ \mathrm{m^{3} / kg}$, so $x = 0.0029$ and the pressure is $P_{\mathrm{sat}} @ 25\ {}^{\circ}\mathrm{C} = 3.17\ \mathrm{kPa}$ absolute — a **$97\ \%$ vacuum**.
*Sanity.* The pressure falls so far because in the dome the pressure is a function of temperature alone, and the cooling has driven the state onto the saturation line. A vessel cooled from superheated steam to ambient will end at $3\ \mathrm{kPa}$, and the load on its shell is a full atmosphere — which is the **external** pressure case that a steam-pipe support and a vacuum breaker are designed for, and which no calculation of the **operating** pressure would ever reveal.
:::
:::

::: example Reading a table by interpolation {#ex-interp}
Find $v$, $h$ and $s$ for steam at $3.6\ \mathrm{MPa}$ and $425\ {}^{\circ}\mathrm{C}$, given only the $3.5$ and $4.0\ \mathrm{MPa}$ entries of the superheated table.
::: solution
**The tabulated data.**
$$
\begin{array}{l c c c c}
P\ (\mathrm{MPa}) & T\ ({}^{\circ}\mathrm{C}) & v & h & s \\
3.5 & 400 & 0.08456 & 3{,}223.2 & 6.8427 \\
3.5 & 450 & 0.09198 & 3{,}338.0 & 7.0074 \\
4.0 & 400 & 0.07343 & 3{,}214.5 & 6.7714 \\
4.0 & 450 & 0.08004 & 3{,}331.2 & 6.9386
\end{array}
$$
**The classification.** $T_{\mathrm{sat}} \left( 3.6\ \mathrm{MPa} \right) = 244.2\ {}^{\circ}\mathrm{C} < 425\ {}^{\circ}\mathrm{C}$, so superheated. $\checkmark$
**The bilinear interpolation.** With $f = \left( 3.6 - 3.5 \right) / \left( 4.0 - 3.5 \right) = 0.20$ in pressure and $g = \left( 425 - 400 \right) / \left( 450 - 400 \right) = 0.50$ in temperature:
$$
v \left( 3.5, 425 \right) = 0.08456 + 0.50 \times \left( 0.09198 - 0.08456 \right) = 0.08827
$$
$$
v \left( 4.0, 425 \right) = 0.07343 + 0.50 \times \left( 0.08004 - 0.07343 \right) = 0.07674
$$
$$
v = 0.08827 + 0.20 \times \left( 0.07674 - 0.08827 \right) = 0.08596\ \mathrm{m^{3} / kg}
$$
$$
h = 3{,}280.6 + 0.20 \times \left( 3{,}272.9 - 3{,}280.6 \right) = 3{,}279.1\ \mathrm{kJ / kg}
$$
$$
s = 6.9251 + 0.20 \times \left( 6.8550 - 6.9251 \right) = 6.9111\ \mathrm{kJ / kg \cdot K}
$$
**The error.** The IAPWS values at this state are $v = 0.08574$, $h = 3{,}279.3$, $s = 6.9123$ — so the bilinear interpolation is out by **$0.26\ \%$**, **$0.01\ \%$** and **$0.02\ \%$**.
**Where the same procedure fails.** Interpolating in $T$ **across** the saturation line: at $2.0\ \mathrm{MPa}$ the table's superheated entries begin at $T_{\mathrm{sat}} = 212.4\ {}^{\circ}\mathrm{C}$, and an interpolation between $250\ {}^{\circ}\mathrm{C}$ and $300\ {}^{\circ}\mathrm{C}$ is safe, but an interpolation between a **saturated** entry at $2.0\ \mathrm{MPa}$ and a superheated entry at $2.5\ \mathrm{MPa}$ crosses the dome boundary and gives a number that is neither.
**The rule.** **Interpolate within a region, in the variable in which the table is tabulated, and never across a phase boundary.** Where a property is steep — $c_p$, $\alpha$, $v$ near the critical — interpolate in $1 / T$ or $1 / P$, or take a finer table.
*Sanity.* The error in $v$ is the largest of the three because $v$ is close to $R T / P$, which is linear in $T$ but curved in $P$; interpolating $v$ in $1 / P$ instead would remove most of the $0.26\ \%$. Near the critical point the same interpolation gives errors of $10\ \%$ because $v \left( P, T \right)$ there is not smooth at all but has a genuine inflection, and no linear scheme on a coarse grid can follow it.
:::
:::

::: history
The **steam table** is one of the oldest working tools of this course. **James Watt**'s separate condenser, patented in **1769**, was an empirical device, and engines of his era were compared by their **duty** — pounds of water raised one foot per bushel of coal — one of the first engineering performance figures. **Henri-Victor Regnault**'s measurements of the vapour pressure, heat of vaporisation and specific heat of steam, made for the French government from the **1840s** to the **1860s**, were the first accurate steam properties. **Gibbs**'s papers of **1873** gave the thermodynamic surface its meaning — **Maxwell** modelled Gibbs's surface for water in plaster in **1874** — and Gibbs's *On the Equilibrium of Heterogeneous Substances* (**1875–78**) contains the **phase rule**; **the dome** as a drawn object owes much to **J. D. van der Waals**'s thesis of **1873**, whose equation of state reproduced a critical point and a two-phase region from a molecular model for the first time. **The critical temperature** was discovered by **Cagniard de la Tour** in **1822** and the **critical opalescence** described by **Thomas Andrews**, who measured carbon dioxide's critical point at $31\ {}^{\circ}\mathrm{C}$ and $73\ \mathrm{atm}$ in **1869** — the same substance and the same numbers this lesson uses. **The principle of corresponding states** is van der Waals's of **1880**; the **generalized compressibility chart** in its familiar engineering form is **Nelson and Obert**'s of **1954**, and **Pitzer**'s acentric factor of **1955** added the third parameter that most modern correlations use. The engineering steam tables of the twentieth century — **Callendar**'s, and **Keenan and Keyes**'s of **1936** — gave way to internationally agreed formulations: **IAPWS-95** (adopted **1995**) for scientific use and the **IAPWS-IF97** industrial formulation (**1997**) for design calculations. The **steam tables in your textbook are computed from these formulations and rounded**, and the rounding is why your answer and the plant's can differ in the fourth figure.
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
- Near the critical point every shortcut fails, and a carbon-dioxide pipeline designed on the ideal-gas law is wrong by a factor of $2.7$.
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
h \approx h_f @ 180\ {}^{\circ}\mathrm{C} + v_f \left( P - P_{\mathrm{sat}} \right) = 763.05 + 0.001127 \times \left( 8000 - 1002.8 \right) = 763.05 + 7.89 = 770.9\ \mathrm{kJ / kg}
$$
The compressed-liquid value is $766.6\ \mathrm{kJ / kg}$, so the shortcut is **$0.6\ \%$** high.
*Sanity.* The $v_f \Delta P$ term is $7.9\ \mathrm{kJ / kg}$, which is $1\ \%$ of $h$ and **$100\ \%$** of the pump work in a feedwater circuit — and in a $1{,}000\ \mathrm{MW}$ plant the feedwater pumps absorb of the order of $25\ \mathrm{MW}$, which is $\dot{m} \int v\, dP$ over the pressure rise divided by the pump efficiency. The correction term that looks negligible is the pump.
:::
:::

::: exercise Real gas {level=2}
Methane at $10\ \mathrm{MPa}$ and $200\ \mathrm{K}$: give the density from the ideal-gas law and from $Z = 0.36$, and the error.
::: solution
$$
\rho_{\mathrm{ig}} = \frac{10{,}000}{0.5183 \times 200} = 96.5\ \mathrm{kg / m^{3}}, \qquad
\rho = \frac{96.5}{0.36} = 268\ \mathrm{kg / m^{3}}
$$
The ideal-gas law under-predicts the density by **$64\ \%$** (the reference equation of state gives $266\ \mathrm{kg / m^{3}}$).
*Sanity.* $T_r = 200 / 190.6 = 1.05$ and $P_r = 10 / 4.60 = 2.17$ — deep in the near-critical region. The real density is already more than half that of liquid methane at its normal boiling point (about $420\ \mathrm{kg / m^{3}}$): this is a dense, liquid-like fluid, and the ideal-gas law has no business here.
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
**The error at $200\ {}^{\circ}\mathrm{C}$.** Assumption (i): at $P_{\mathrm{sat}} = 1.5549\ \mathrm{MPa}$ and $473.15\ \mathrm{K}$, the steam table gives $v_g = 0.12721\ \mathrm{m^{3} / kg}$ against the ideal-gas $R T / P = 0.4615 \times 473.15 / 1554.9 = 0.14049$ — a **$10.4\ \%$** error, so $d P_{\mathrm{sat}} / d T$ is under-predicted by about $10\ \%$.
**Assumption (ii).** $v_f / v_g = 0.001157 / 0.12721 = 0.91\ \%$ — negligible.
**Assumption (iii).** Over $150$ to $250\ {}^{\circ}\mathrm{C}$, $h_{fg}$ falls from $2{,}113.7$ to $1{,}715.3\ \mathrm{kJ / kg}$, a **$19\ \%$** change, so a constant-$h_{fg}$ integration across that range is poor.
**The evaluation.** Predict $P_{\mathrm{sat}}$ at $200\ {}^{\circ}\mathrm{C}$ from the value at $100\ {}^{\circ}\mathrm{C}$, $101.42\ \mathrm{kPa}$, using the mean $h_{fg} = \left( 2{,}256.4 + 1{,}939.7 \right) / 2 = 2{,}098\ \mathrm{kJ / kg}$:
$$
\ln \frac{P_2}{101.42} = - \frac{2{,}098}{0.4615} \left( \frac{1}{473.15} - \frac{1}{373.15} \right) = - 4{,}546 \times \left( - 5.664 \times 10^{- 4} \right) = 2.575
$$
$$
P_2 = 101.42 \times e^{2.575} = 1{,}332\ \mathrm{kPa}
$$
against the table's $1{,}554.9\ \mathrm{kPa}$ — **$14\ \%$ low**.
**Where the error comes from, and an accidental cancellation.** With the mean $h_{fg}$, assumption (iii) is handled about as well as a constant can handle it, and what remains is mostly assumption (i): the ideal-gas $v_g$ is too large, the slope too small, and the error accumulates over $100\ \mathrm{K}$. Taking instead the larger $h_{fg}$ at the cold end, $2{,}256.4\ \mathrm{kJ / kg}$, gives $\ln \left( P_2 / 101.42 \right) = 4{,}889 \times 5.664 \times 10^{- 4} = 2.769$ and $P_2 = 1{,}617\ \mathrm{kPa}$, only $4\ \%$ high — because the too-large $h_{fg}$ happens to offset the too-large $v_g$. That cancellation is luck, not a law, and it **fails at higher temperature**: by $350\ {}^{\circ}\mathrm{C}$ the real $v_g$ is half the ideal-gas value and $h_{fg}$ has fallen to $893\ \mathrm{kJ / kg}$, and integrating from $200\ {}^{\circ}\mathrm{C}$ with $h_{fg} = 1{,}939.7$ gives $13.2\ \mathrm{MPa}$ against the table's $16.529\ \mathrm{MPa}$ — **$20\ \%$** low.
*Sanity.* The formula survives in every textbook because it is **exact for a substance whose vapour is ideal and whose $h_{fg}$ is constant**, and for water it is accurate over **short** temperature intervals at **low** pressure, where both conditions nearly hold. Over a wide range, interpolate in a table or use a fitted vapour-pressure equation.
:::
:::

::: exercise Design {level=3}
Specify the property data, the instrumentation and the acceptance basis for the steam side of a $600\ \mathrm{MW}$ supercritical power plant operating at $25\ \mathrm{MPa}$ and $600\ {}^{\circ}\mathrm{C}$ with a $9\ \mathrm{kPa}$ condenser.
::: solution
**The states.**
$$
\begin{array}{l c c c c}
& P\ (\mathrm{MPa}) & T\ ({}^{\circ}\mathrm{C}) & h\ (\mathrm{kJ / kg}) & s\ (\mathrm{kJ / kg \cdot K}) \\
1\ \text{Turbine inlet} & 25.0 & 600 & 3{,}493.5 & 6.3637 \\
2\ \text{Extraction} & 5.0 & 344 & 3{,}053.7 & 6.4263 \\
3\ \text{Condenser} & 0.009 & 43.8 & 2{,}122.0\ \left( x = 0.809 \right) & 6.7400 \\
4\ \text{Condensate} & 0.009 & 43.8 & 183.3 & 0.6223 \\
5\ \text{Boiler outlet} & 25.0 & 600 & 3{,}493.5 & 6.3637
\end{array}
$$
**The isentropic expansion to $9\ \mathrm{kPa}$.** $s_{2s} = s_1 = 6.3637$, so
$$
x_{2s} = \frac{6.3637 - 0.6223}{7.5635} = 0.7591, \qquad h_{2s} = 183.25 + 0.7591 \times 2{,}397.0 = 2{,}002.8\ \mathrm{kJ / kg}
$$
$$
w_T = h_1 - h_{2s} = 1{,}490.7\ \mathrm{kJ / kg}, \qquad
\text{at } \eta_T = 0.92: \quad h_2 = 3{,}493.5 - 1{,}371.4 = 2{,}122.1, \quad x_2 = 0.809
$$
**The wetness at the last-stage blades.** $x = 0.809$ means **$19\ \%$** liquid by mass, which is **nearly twice** the accepted limit of $10$ to $12\ \%$ at the last stage. The design response is **reheat** (one or two stages), and the reheat is not an efficiency refinement but a **metallurgical necessity**.
**The property basis, stated in the specification.**
$$
\begin{array}{l l}
\text{Formulation} & \text{IAPWS-IF97, region 1/2/3/4/5 as applicable} \\
\text{At } 25\ \mathrm{MPa},\ 600\ {}^{\circ}\mathrm{C} & \text{region 2 (superheated), not region 3} \\
\text{Near the critical} & \text{region 3, where the uncertainty of every property is largest} \\
\text{Uncertainty} & \text{as stated in the IAPWS release for the region used} \\
\text{Software} & \text{a certified IF97 library, not a spreadsheet polynomial}
\end{array}
$$
**The four instruments and their calibration.**
$$
\begin{array}{l l l}
\text{Main steam } P & 0.1\ \%\ \text{FS, temperature-compensated} & 25\ \mathrm{MPa} \pm 25\ \mathrm{kPa} \Rightarrow \pm 0.5\ \mathrm{kJ / kg} \text{ in } h \\
\text{Main steam } T & \text{type-B RTD or sheathed thermocouple, } \pm 1.5\ \mathrm{K} & \pm 1.5\ \mathrm{K} \Rightarrow \pm 4.4\ \mathrm{kJ / kg} \text{ in } h \\
\text{Condenser } P & \text{absolute pressure transmitter, } 0 - 50\ \mathrm{kPa},\ \pm 0.05\ \mathrm{kPa} & \pm 0.05\ \mathrm{kPa} \Rightarrow \pm 0.11\ \mathrm{K} \text{ in } T_{\mathrm{sat}} \\
\text{Steam flow} & \text{orifice with density from IF97, } \pm 1\ \% & \text{the dominant uncertainty in the heat-rate test}
\end{array}
$$
**The one measurement that is always wrong.** The **condenser pressure**. A $0.5\ \mathrm{kPa}$ error — well inside a typical transmitter's drift — moves $T_{\mathrm{sat}}$ by about $1.1\ \mathrm{K}$ and the corrected heat rate by the order of **$0.4\ \%$**, which on a $600\ \mathrm{MW}$ plant at $45\ \%$ efficiency is roughly **$7{,}000\ \mathrm{t}$ of coal a year** (at $25\ \mathrm{MJ / kg}$). The specification must therefore require an **absolute** transmitter calibrated **in situ** against a dead-weight gauge, and a **temperature-based cross-check** from the condensate and cooling-water approach.
**The acceptance basis.** A performance test to **ASME PTC 6** (steam turbines), with the heat rate corrected to the **IF97** reference at the guaranteed conditions, an uncertainty of **$\pm 1.0\ \%$** at $95\ \%$ confidence, and a **guarantee curve** rather than a single point, because a $600\ \mathrm{MW}$ machine spends $80\ \%$ of its life between $40\ \%$ and $90\ \%$ load.
*Design comment.* The general rule is that **a power-plant guarantee is a property-data specification wearing a mechanical contract**, and that the party who controls the property library controls the test result — which is why every modern turbine order names the formulation, the version and the calibration of every instrument in the heat-rate calculation.
:::
:::
