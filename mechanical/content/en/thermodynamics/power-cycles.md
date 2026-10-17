A cycle is a way of spending entropy deliberately: take in heat at a high temperature, convert part of it to work, and pay the rest away as entropy at a low temperature. Every power cycle ever built is the same four moves — **add heat, expand, reject heat, compress** — arranged so that the four happen at the temperatures that make the arithmetic best.

The reason there are so many of them is that the four moves have different mechanical requirements. A vapour that condenses gives an enormous pressure ratio for a small volume change and a tiny compressor, which is why **Rankine** dominates stationary power. A gas that never condenses gives a modest pressure ratio and a huge turbine, which is why **Brayton** dominates aviation. A combustion that happens inside the cylinder avoids the compressor entirely, which is why **Otto** and **Diesel** dominate transport. The thermodynamics is one page; the engineering is the reason the page has footnotes.

::: warning Seven cycle errors that produce papers and not power
**Beating the Carnot limit with a regenerator.** A regenerator does **not** raise a cycle's efficiency above Carnot; it raises the **Brayton** cycle's approach to the Ericsson limit by recovering internal heat, and the ideal regenerated Brayton at a pressure ratio of $12$ has an efficiency of $1 - T_1 / T_3 = 1 - 300 / 1400 = 78.6\ \%$ **only** if the regenerator is $100\ \%$ effective, which costs more exchanger than the cycle is worth. **Assuming a regenerator always helps.** It helps when the turbine exhaust is **hotter** than the compressor delivery, which for air with $k = 1.4$ means
$$
T_4 > T_2 \quad \Longleftrightarrow \quad \frac{T_3}{T_1} > r_p^{\left( k - 1 \right) / k} \quad \Longleftrightarrow \quad r_p < \left( \frac{T_3}{T_1} \right)^{k / \left( k - 1 \right)}
$$
At $T_3 / T_1 = 4.67$ the crossover is at $r_p = 21.8$, and above it a regenerator **cools the cycle usefully and heats it uselessly** — which is why a jet engine at cruise has no regenerator and a submarine's closed-cycle engine has three. **Confusing the Otto and Diesel efficiencies at the same compression ratio.** At $r = 16$ the Otto efficiency is $1 - 1 / 16^{0.4} = 61.9\ \%$ and the Diesel with a cutoff of $2.5$ is $1 - \dfrac{1}{16^{0.4}} \cdot \dfrac{2.5^{1.4} - 1}{1.4 \times 1.5} = 56.6\ \%$: **the Diesel is less efficient at the same compression ratio**, and it wins in practice only because it can **run** at $r = 20$ where the Otto would knock. **Forgetting the pump work is not negligible in a supercritical boiler.** At $30\ \mathrm{MPa}$ the feed-pump work is $30\ \mathrm{kJ / kg}$ against a turbine work of $1{,}400\ \mathrm{kJ / kg}$ — $2.1\ \%$, which is $0.9$ percentage points of cycle efficiency and the reason a $600\ \mathrm{MW}$ station's feed-pump set is a $15\ \mathrm{MW}$ machine. **Reading a reheat's benefit as an efficiency gain.** A single reheat raises an ideal Rankine cycle's efficiency by **less than one percentage point** and raises the turbine-exit quality by **$0.05$**, which is the whole of its value; the efficiency gain comes from **reheating to the initial temperature**, and a reheat at a lower temperature **lowers** the efficiency. **Applying air-standard assumptions where they do not hold.** The air-standard analysis assumes constant specific heats, no dissociation, and a fixed mass of air. At $2{,}400\ \mathrm{K}$ the last two are badly wrong: dissociation of $\mathrm{CO_2}$ and $\mathrm{H_2O}$ at turbine entry reduces the expansion work by **$4\ \%$** and raises the exhaust temperature by **$40\ \mathrm{K}$**, which is why a real gas turbine's exhaust is hotter than the air-standard prediction and its HRSG is bigger than the analysis suggests. **Optimising a cycle and forgetting the pinch.** A combined cycle's efficiency is set by the HRSG's **pinch temperature difference**, and a $10\ \mathrm{K}$ pinch against a $15\ \mathrm{K}$ pinch is worth **$1.5$ percentage points** of plant efficiency and **$40\ \%$** more HRSG. A cycle analysis that assumes zero pinch has found the Carnot efficiency of a hypothetical plant.
:::

## The vapour cycles

::: definition The ideal Rankine cycle {#def-rankine}
**The four processes, and the state points.**
$$
\begin{array}{l l l}
1 \to 2 & \text{isentropic pumping, liquid} & w_p = v_1 \left( P_2 - P_1 \right) \\
2 \to 3 & \text{constant-pressure heating to superheat} & q_{\mathrm{in}} = h_3 - h_2 \\
3 \to 4 & \text{isentropic expansion in the turbine} & w_t = h_3 - h_4 \\
4 \to 1 & \text{constant-pressure condensation} & q_{\mathrm{out}} = h_4 - h_1
\end{array}
$$
**The efficiency.**
$$
\eta = \frac{w_t - w_p}{q_{\mathrm{in}}} = 1 - \frac{q_{\mathrm{out}}}{q_{\mathrm{in}}}
$$
**The worked ideal cycle: $6\ \mathrm{MPa}$, $600\ {}^{\circ}\mathrm{C}$, condenser at $10\ \mathrm{kPa}$.**
$$
\begin{array}{l c c c}
1 & 10\ \mathrm{kPa},\ \text{sat. liquid} & h_1 = 191.81 & v_1 = 0.001010 \\
2 & 6\ \mathrm{MPa} & h_2 = 191.81 + 6.05 = 197.86 & \\
3 & 6\ \mathrm{MPa},\ 600\ {}^{\circ}\mathrm{C} & h_3 = 3{,}658.8 & s_3 = 7.1677 \\
4 & 10\ \mathrm{kPa},\ s_4 = s_3 & x_4 = 0.8689, & h_4 = 2{,}269.7
\end{array}
$$
$$
w_p = 0.001010 \times 5{,}990 = 6.05\ \mathrm{kJ / kg}, \qquad
w_t = 3{,}658.8 - 2{,}269.7 = 1{,}389.1\ \mathrm{kJ / kg}
$$
$$
q_{\mathrm{in}} = 3{,}658.8 - 197.86 = 3{,}460.9\ \mathrm{kJ / kg}, \qquad
\eta = \frac{1{,}389.1 - 6.05}{3{,}460.9} = 40.0\ \%
$$
**The pump work's share.** $6.05 / 1{,}389.1 = 0.44\ \%$, and this is the number that makes the Rankine cycle practical: **the working fluid is liquid at the compressor inlet**, so the compression work is a thousandth of the expansion work and the cycle's net output is essentially the turbine's.
**The comparison with Carnot.** $\eta_C = 1 - 303 / 873 = 65.3\ \%$ against the cycle's $40.0\ \%$, and the gap is not irreversibility — the cycle is fully reversible — but the fact that **heat is added over a range of temperatures from $293$ to $873\ \mathrm{K}$** and not all at $873\ \mathrm{K}$.
**The average temperature of heat addition, which is the whole of cycle design.**
$$
\bar{T}_{\mathrm{in}} = \frac{q_{\mathrm{in}}}{\Delta s} = \frac{3{,}460.9}{7.1677 - 0.6492} = 544.6\ \mathrm{K}, \qquad
\eta = 1 - \frac{\bar{T}_{\mathrm{out}}}{\bar{T}_{\mathrm{in}}} = 1 - \frac{318.9}{544.6} = 41.4\ \%
$$
**The $1.4$-point discrepancy** is because $\bar{T}_{\mathrm{out}}$ is not exactly $318.9$; using the correct logarithmic mean gives $305\ \mathrm{K}$ and $43.9\ \%$. **The formula is exact and the temperatures must both be averaged correctly** — and the reason it is worth the trouble is that it converts every cycle improvement into one of two sentences: **raise $\bar{T}_{\mathrm{in}}$ or lower $\bar{T}_{\mathrm{out}}$**.
:::

::: definition Reheat, regeneration and the real cycle {#def-reheat}
**Why reheat exists.** A $6\ \mathrm{MPa}$, $600\ {}^{\circ}\mathrm{C}$ cycle exhausting to $10\ \mathrm{kPa}$ leaves the last turbine stage at $x = 0.869$ — **$13\ \%$ water**, which erodes the blade tips. Reheating to $600\ {}^{\circ}\mathrm{C}$ at $1\ \mathrm{MPa}$:
$$
h_{a} = 3{,}273.3\ \left( 1\ \mathrm{MPa},\ 600\ {}^{\circ}\mathrm{C} \right), \qquad s_a = 7.4626
$$
$$
x_{b} = \frac{7.4626 - 0.6492}{7.4996} = 0.9085, \qquad h_b = 191.81 + 0.9085 \times 2{,}392.1 = 2{,}364.4
$$
$$
w_t = \left( 3{,}658.8 - 3{,}273.3 \right) + \left( 3{,}273.3 - 2{,}364.4 \right) = 385.5 + 908.9 = 1{,}294.4\ \mathrm{kJ / kg}
$$
**The quality has risen from $0.869$ to $0.909$** — the whole of the reason for the extra boiler pass — while the efficiency
$$
q_{\mathrm{in}} = \left( 3{,}658.8 - 197.86 \right) + \left( 3{,}273.3 - 3{,}051.2 \right) = 3{,}460.9 + 222.1 = 3{,}683.0
$$
$$
\eta = \frac{1{,}294.4 - 6.05}{3{,}683.0} = 35.0\ \%
$$
**has fallen**, because the reheat pressure of $1\ \mathrm{MPa}$ is too low. **The rule: reheat at about $20$ to $25\ \%$ of the boiler pressure and reheat to the initial temperature**, which gives $1.2$ to $1.8\ \mathrm{MPa}$ at $6\ \mathrm{MPa}$ and $6$ to $8\ \mathrm{MPa}$ at $30\ \mathrm{MPa}$, and then the efficiency rises by **$1.5$ to $2.5$ points** as well.
**Why regeneration exists.** Feedwater entering the boiler at $198\ \mathrm{K}$-equivalent is heated from $303$ to $544\ \mathrm{K}$ **inside the boiler by gas at $1{,}300\ \mathrm{K}$** — a heat transfer across $1{,}000\ \mathrm{K}$ that destroys exergy at every kilowatt. Bleeding steam to preheat the feedwater raises $\bar{T}_{\mathrm{in}}$ and removes that destruction.
**The open feedwater heater, at $0.6\ \mathrm{MPa}$.**
$$
y \left( h_{\mathrm{bleed}} - h_{f, 0.6} \right) = \left( h_{f, 0.6} - h_{2} \right)
\quad \Rightarrow \quad
y = \frac{h_{f, 0.6} - h_2}{h_{\mathrm{bleed}} - h_{f, 0.6}}
$$
With $h_{f, 0.6} = 670.4$, $h_2 = 197.86$ and a bleed at $h_{\mathrm{bleed}} = 2{,}650$:
$$
y = \frac{670.4 - 197.86}{2{,}650 - 670.4} = \frac{472.5}{1{,}979.6} = 0.2387
$$
**$24\ \%$ of the steam is bled**, and the cycle's efficiency rises from $40.0\ \%$ to **$43.5\ \%$** — a gain of $3.5$ points for one vessel, one pump and a set of pipes.
**The number of heaters, and where it stops.**
$$
\begin{array}{l c c}
\text{Heaters} & \eta\ \% & \text{Marginal gain} \\
0 & 40.0 & - \\
1 & 43.5 & 3.5 \\
2 & 45.4 & 1.9 \\
3 & 46.5 & 1.1 \\
4 & 47.2 & 0.7 \\
6 & 48.0 & 0.3 \\
8 & 48.4 & 0.2
\end{array}
$$
**The optimum is four to six heaters in a large plant and two in a small one**, and the criterion is that the last heater must cost less than the fuel it saves — which for a $600\ \mathrm{MW}$ station means a marginal heater is worth about **$1.8\ \mathrm{MW}$** of output and **$4\ \mathrm{million}$ currency units a year** of fuel.
**The real cycle, with efficiencies.**
$$
\eta_{\mathrm{turbine}} = 0.88, \quad \eta_{\mathrm{pump}} = 0.82, \quad \Delta P_{\mathrm{boiler}} = 8\ \%, \quad \text{mechanical and generator } 0.985 \times 0.985
$$
$$
\eta_{\mathrm{cycle}} = 0.400 \times 0.88 \times 0.985 \times 0.985 - \text{pump and pressure-drop penalties} = 33.4\ \%
$$
**The $40.0\ \%$ ideal becomes $33.4\ \%$ real**, and the $6.6$ points divide roughly: turbine $3.6$, pump $0.5$, pressure drops $0.9$, mechanical and generator $1.1$, and auxiliary loads $0.5$.
:::

::: definition Supercritical, advanced and the material ceiling {#def-supercritical}
$$
\begin{array}{l c c c c}
\text{Plant} & P\ (\mathrm{MPa}) & T\ ({}^{\circ}\mathrm{C}) & \eta_{\mathrm{net, LHV}} & \text{Main-steam alloy} \\
\text{Subcritical} & 17 & 540 / 540 & 36\ \% & 2.25\ \mathrm{Cr}\text{\textendash}1\ \mathrm{Mo} \\
\text{Supercritical} & 25 & 540 / 540 & 40\ \% & \mathrm{T91} \\
\text{Ultra-supercritical} & 28 & 600 / 600 & 45\ \% & \mathrm{T92}\ \text{and}\ 9\ \%\ \mathrm{Cr} \\
\text{Advanced USC} & 31 & 600 / 620 & 47\ \% & \text{austenitic}\ \mathrm{TP347HFG} \\
\text{USC, second generation} & 35 & 700 / 720 & 51\ \% & \text{nickel}\ 740\mathrm{H}\text{, at the limit of supply} \\
\text{Double reheat USC} & 32 & 600 / 620 / 620 & 50\ \% & \text{as above, plus a third boiler pass}
\end{array}
$$
**The number that sets the ceiling.** Every $10\ \mathrm{K}$ of steam temperature above about $600\ {}^{\circ}\mathrm{C}$ costs roughly **$1\ \%$** more in the boiler and **$3$ to $5\ \%$** more in the turbine, and the creep strength of the cheapest adequate alloy falls away at $620\ {}^{\circ}\mathrm{C}$; above that the material is a **nickel** alloy whose price per kilogram is **twenty times** the ferritic steel's and whose supply is a handful of mills.
**The consequence.** The world's most efficient coal plant, at $630\ {}^{\circ}\mathrm{C}$ double reheat, reaches **$50\ \%$ net LHV**, and the $51\ \%$ second-generation design has been built once. **The Rankine cycle is not limited by thermodynamics** — its Carnot ceiling at $700\ {}^{\circ}\mathrm{C}$ is $66\ \%$ — **but by the creep of a ferritic lattice at $0.4$ of its melting temperature in a steam environment that oxidises it.**
**The other ceiling.** A $600\ {}^{\circ}\mathrm{C}$, $30\ \mathrm{MPa}$ cycle's reheat attemperation must absorb **$45\ \%$** of the boiler's radiant heat, and the control of that at $30\ \%$ load is a **$12\ \mathrm{K}$** swing that the metal fatigue limits to **$1.5\ \%$\ per minute** of load change. **A supercritical coal plant is a poor peaking plant**, and a plant that must cycle daily loses the efficiency it was built for — which is why the advanced USC fleet is being retired before its design life in grids with much wind.
:::

## The gas cycles

::: definition The ideal Brayton cycle {#def-brayton}
**The four processes.**
$$
\begin{array}{l l l l}
1 \to 2 & \text{isentropic compression} & T_2 = T_1 r_p^{\left( k - 1 \right) / k} & w_c = c_p \left( T_2 - T_1 \right) \\
2 \to 3 & \text{constant-pressure combustion} & & q_{\mathrm{in}} = c_p \left( T_3 - T_2 \right) \\
3 \to 4 & \text{isentropic expansion} & T_4 = T_3 / r_p^{\left( k - 1 \right) / k} & w_t = c_p \left( T_3 - T_4 \right) \\
4 \to 1 & \text{constant-pressure rejection} & & q_{\mathrm{out}} = c_p \left( T_4 - T_1 \right)
\end{array}
$$
**The efficiency, in one line.**
$$
\eta = 1 - \frac{1}{r_p^{\left( k - 1 \right) / k}}
$$
**The number that surprises people: it depends on the pressure ratio and on nothing else — not on the turbine entry temperature.**
**The worked cycle: $r_p = 12$, $T_1 = 300\ \mathrm{K}$, $T_3 = 1{,}400\ \mathrm{K}$.**
$$
T_2 = 300 \times 12^{0.2857} = 610.1\ \mathrm{K}, \qquad
T_4 = \frac{1{,}400}{12^{0.2857}} = 688.6\ \mathrm{K}
$$
$$
w_c = 1.005 \times 310.1 = 311.7, \qquad
w_t = 1.005 \times 711.4 = 715.0, \qquad
w_{\mathrm{net}} = 403.3\ \mathrm{kJ / kg}
$$
$$
q_{\mathrm{in}} = 1.005 \times 789.9 = 793.8\ \mathrm{kJ / kg}, \qquad
\eta = 50.8\ \%
$$
**The back-work ratio, which is the number that decides a gas turbine's size.**
$$
\frac{w_c}{w_t} = \frac{311.7}{715.0} = 43.6\ \%
$$
**The compressor eats $44\ \%$ of the turbine's output.** At $r_p = 25$ it eats $60\ \%$, and at the pressure ratio for maximum net work it eats $50\ \%$. **This is why a gas turbine's specific output collapses off design**, and why a jet engine's compressor is the largest and most expensive module.
**The real cycle.** With $\eta_t = \eta_c = 0.85$:
$$
T_2' = 300 + \frac{310.1}{0.85} = 664.8\ \mathrm{K}, \qquad
T_4' = 1{,}400 - 0.85 \times 711.4 = 795.3\ \mathrm{K}
$$
$$
w_{\mathrm{net}} = 1.005 \times \left[ \left( 1{,}400 - 795.3 \right) - \left( 664.8 - 300 \right) \right] = 1.005 \times 239.9 = 241.1\ \mathrm{kJ / kg}
$$
$$
q_{\mathrm{in}} = 1.005 \times \left( 1{,}400 - 664.8 \right) = 738.4\ \mathrm{kJ / kg}, \qquad
\eta = 32.7\ \%
$$
**The $50.8\ \%$ ideal becomes $32.7\ \%$ real**, and the exhaust is now at $795\ \mathrm{K}$ instead of $689\ \mathrm{K}$ — **$106\ \mathrm{K}$ hotter**, which is a gift to the HRSG and the reason a real combined cycle does better than the ideal analysis suggests.
**The pressure ratio for maximum net work.**
$$
r_{p,\mathrm{opt}} = \left( \frac{T_3}{T_1} \right)^{k / \left[ 2 \left( k - 1 \right) \right]}
= \left( \frac{1{,}400}{300} \right)^{1.75} = 14.8
$$
**and for maximum efficiency the ratio is unbounded**, which is the ideal-cycle statement of the fact that real machines settle at $15$ to $22$ because the compressor's efficiency falls and the blade cooling air rises with it.
:::

::: definition Regeneration, intercooling and reheat {#def-brayton-mods}
**The three modifications and what each one does.**
$$
\begin{array}{l l l}
\text{Regeneration} & \text{uses the exhaust to preheat the delivery} & \text{raises efficiency, needs } T_4 > T_2 \\
\text{Intercooling} & \text{splits the compression with cooling} & \text{raises work, lowers } \bar{T}_{\mathrm{in}} \\
\text{Reheat} & \text{splits the expansion with reheating} & \text{raises work, raises } \bar{T}_{\mathrm{in}}
\end{array}
$$
**The regenerated Brayton.** With an ideal regenerator the delivery reaches $T_4$ and
$$
\eta_{\mathrm{regen}} = 1 - \frac{T_1}{T_3} \, r_p^{\left( k - 1 \right) / k}
$$
**The evaluation at $r_p = 12$:** $1 - \left( 300 / 1{,}400 \right) \times 2.033 = 56.4\ \%$ against the simple cycle's $50.8\ \%$.
**The crossover, which is the design decision.** A regenerator helps only while $T_4 > T_2$, i.e.
$$
r_p < \left( \frac{T_3}{T_1} \right)^{k / \left( k - 1 \right)} = 4.667^{3.5} = 219
$$
**and with real component efficiencies the crossover falls to about $r_p = 12$ to $15$**, which is exactly where modern simple-cycle machines sit — and the reason no heavy-duty gas turbine has a regenerator is that it has **already passed the crossover** by raising $r_p$ to $19$ and $T_3$ to $1{,}600\ {}^{\circ}\mathrm{C}$.
**The intercooled and reheat arrangement that does exist.** The **intercooled regenerative** cycle of a marine or submarine engine: two compression stages with a $30\ \mathrm{K}$ intercool, two expansion stages with a reheat, and a regenerator at $85\ \%$ effectiveness. At $r_p = 4$ per stage:
$$
T_2 = T_4 = 300 \times 4^{0.2857} = 443.1\ \mathrm{K} \quad \Rightarrow \quad T_{2,\mathrm{ic}} = 413.1\ \mathrm{K}
$$
$$
w_c = 2 \times 1.005 \times \left( 443.1 - 300 \right) - 1.005 \times 30 = 287.8 - 30.2 = 257.6\ \mathrm{kJ / kg}
$$
**The intercooling costs $30\ \mathrm{kJ / kg}$ of cooling water and saves $54\ \mathrm{kJ / kg}$ of compression work** — a net gain of $24\ \mathrm{kJ / kg}$ and the reason intercooling is used at low pressure ratios where the regenerator is doing the real work.
**The number that ends the argument.** A regenerated, intercooled, reheat gas turbine reaches **$45\ \%$** at a specific work of **$250\ \mathrm{kJ / kg}$**; a simple-cycle machine at $r_p = 21$ and $1{,}600\ {}^{\circ}\mathrm{C}$ reaches **$40\ \%$** at **$450\ \mathrm{kJ / kg}$**. **The regenerated machine is more efficient and half as powerful per kilogram of air**, and the reason aviation and heavy-duty machines are simple-cycle is that **specific work buys the machine and efficiency buys the fuel** — and a $100\ \mathrm{MW}$ plant's balance between the two is a $30$-year fuel contract.
:::

::: definition The combined cycle {#def-cc}
**The arithmetic, which is two cycles multiplied.**
$$
\eta_{\mathrm{CC}} = \eta_{\mathrm{GT}} + \eta_{\mathrm{ST}} \left( 1 - \eta_{\mathrm{GT}} \right)
$$
**The evaluation.** $\eta_{\mathrm{GT}} = 0.40$, and the steam cycle recovers $\eta_{\mathrm{ST}} = 0.33$ of the **remaining** $0.60$:
$$
\eta_{\mathrm{CC}} = 0.40 + 0.33 \times 0.60 = 0.599 = 59.9\ \%
$$
**The reading.** **The steam turbine adds $20$ points of efficiency out of nothing but the gas turbine's exhaust**, and the reason the combined cycle has taken over the world's new thermal capacity is that the $20$ points cost less than the gas turbine.
**The HRSG's pinch, which is the real design variable.**
$$
\begin{array}{l c c c}
\text{Pinch difference} & \text{HRSG area} & \eta_{\mathrm{CC}} & \text{Relative cost} \\
20\ \mathrm{K} & 1.00 & 58.4\ \% & 1.00 \\
15\ \mathrm{K} & 1.35 & 59.4\ \% & 1.28 \\
12\ \mathrm{K} & 1.68 & 60.0\ \% & 1.55 \\
10\ \mathrm{K} & 1.98 & 60.4\ \% & 1.80 \\
8\ \mathrm{K} & 2.45 & 60.8\ \% & 2.15
\end{array}
$$
**The optimum is $10$ to $12\ \mathrm{K}$**, and the reason it is not $5\ \mathrm{K}$ is that the exchanger's cost and its pressure drop both rise faster than the efficiency.
**The three-pressure reheat arrangement.** A modern HRSG has **three** steam pressures ($8.5$, $2.6$, $0.4\ \mathrm{MPa}$) plus a reheat, so that the gas is cooled in **four** steps and the water is heated in **four** steps, keeping the temperature difference small everywhere. **The stack leaves at $90$ to $100\ {}^{\circ}\mathrm{C}$** against a single-pressure HRSG's $150\ {}^{\circ}\mathrm{C}$, and the $50\ \mathrm{K}$ is worth **$1.5$ points** of plant efficiency.
**The condensing versus back-pressure choice.**
$$
\begin{array}{l c c c}
\text{Arrangement} & \eta_{\mathrm{el}} & \text{Heat output} & \eta_{\mathrm{total}} \\
\text{CCGT, condensing} & 59.9\ \% & 0 & 59.9\ \% \\
\text{CCGT, back-pressure, } 90\ {}^{\circ}\mathrm{C}\ \text{return} & 52\ \% & 38\ \% & 90\ \% \\
\text{CCGT + condensing heat pump on the return} & 47\ \% & 55\ \% & 102\ \%\ \text{(LHV basis)} \\
\text{Open cycle gas turbine} & 40\ \% & 0 & 40\ \%
\end{array}
$$
**The $102\ \%$ is not a violation.** It is a heat pump lifting the return from $30$ to $85\ {}^{\circ}\mathrm{C}$ using the condenser's **cold** as a source, and the LHV basis credits it with heat that was never in the fuel. **The figure is legitimate and must always be reported with its basis**, because a $102\ \%$ number on an LHV basis and a $59.9\ \%$ number on the same basis are the same plant at two different load factors.
:::

::: definition The gas power cycles: Otto, Diesel, Stirling {#def-otto}
$$
\begin{array}{l l c}
\text{Cycle} & \text{Efficiency} & \text{At the stated data} \\
\text{Otto} & \eta = 1 - r^{1 - k} & r = 9{:}\ 1,\ k = 1.4 \ \Rightarrow\ 58.5\ \% \\
\text{Diesel} & \eta = 1 - \dfrac{1}{r^{k - 1}} \cdot \dfrac{r_c^{k} - 1}{k \left( r_c - 1 \right)} & r = 18{:}\ 1,\ r_c = 2.5\ \Rightarrow\ 62.5\ \% \\
\text{Dual / mixed} & \eta = 1 - \dfrac{1}{r^{k - 1}} \cdot \dfrac{\alpha \beta^{k} - 1}{\left( \alpha - 1 \right) + \alpha k \left( \beta - 1 \right)} & r = 18,\ \alpha = 1.6,\ \beta = 1.8\ \Rightarrow\ 63.9\ \% \\
\text{Stirling / Ericsson} & \eta = 1 - T_L / T_H & 1{,}273 / 300\ \Rightarrow\ 76.4\ \%
\end{array}
$$
**The Otto evaluation.** $\eta = 1 - 9^{-0.4} = 1 - 0.4152 = 58.5\ \%$.
**The Diesel evaluation.**
$$
\eta = 1 - \frac{1}{18^{0.4}} \times \frac{2.5^{1.4} - 1}{1.4 \times 1.5}
= 1 - 0.3169 \times \frac{2.759 - 1}{2.1} = 1 - 0.3169 \times 0.8376 = 73.5\ \%
$$
**The comparison at equal compression ratio, which is the honest one.** At $r = 9$ with $r_c = 4.2$ (the same heat input as the Otto):
$$
\eta_{\mathrm{Diesel}} = 1 - \frac{1}{9^{0.4}} \times \frac{4.2^{1.4} - 1}{1.4 \times 3.2} = 1 - 0.4152 \times 1.2876 = 46.5\ \%
$$
**against the Otto's $58.5\ \%$.** The Diesel is **worse at the same compression ratio** and better in the engine because it runs at $r = 18$ where the Otto cannot.
**The number that sets the compression ratio.** A spark-ignition engine's $r$ is set by the fuel's octane and the chamber's tendency to auto-ignite end-gas; $r = 10.5$ on $95$-octane fuel is near the practical ceiling, and **$r = 13$ with Miller-cycle early intake-valve closure** is the Atkinson/Miller trick that hybrid cars use: the **geometric** ratio is $13$ and the **effective** compression ratio is $9.5$, which avoids knock while the expansion still uses the full volume.
**The number that sets the Diesel's.** A compression-ignition engine's $r$ is set by the need to reach an ignition temperature at idle — $r = 16$ gives $T_2 = 300 \times 16^{0.4} = 806\ \mathrm{K}$, comfortably above the diesel fuel's $610\ \mathrm{K}$ auto-ignition — and by the mechanical and friction penalty above $r = 22$. **The Diesel's efficiency advantage is a $600\ \mathrm{K}$ of compression heat that the Otto cannot have without detonating.**
**The Stirling and Ericsson note.** Both are **Carnot** in efficiency when ideal and regenerated, and both have failed commercially for the same reason: the regenerator must be **$98\ \%$** effective and must not leak, and the heat exchangers must survive a cyclic gas-side temperature. **The thermodynamic ideal is achievable and the mechanical one is expensive**, which is the sentence that explains every closed-cycle engine that has ever been built and then abandoned.
:::

::: widget plot
f: 1-1/pow(x,0.2857); 1-1/pow(x,0.2857)-0.30*(1-1/pow(x,0.2857))*(pow(4.667/pow(x,0.2857),1.4)-1)/(1.4*(4.667/pow(x,0.2857)-1))
x: 4, 30
y: 0, 0.75
labels: ideal Brayton efficiency; regenerated Brayton at T3 over T1 = 4.67
caption: The ideal Brayton efficiency against pressure ratio, $\eta = 1 - r_p^{-0.2857}$, together with the **regenerated** ideal cycle at $T_3 / T_1 = 4.67$. The Brayton curve rises steeply to about $r_p = 12$ and then flattens — the last $20$ points of pressure ratio buy only $5$ points of efficiency — while the regenerated curve **falls** with pressure ratio, because a higher compression makes the delivery hotter than the exhaust and the regenerator useless. **The point where the two curves cross, near $r_p = 21$, is the crossover this lesson's warning is about**, and it is the reason no modern heavy-duty machine has a regenerator.
:::

## Worked cases

::: example A $600\ \mathrm{MW}$ supercritical station {#ex-usc}
Evaluate the cycle of a $600\ \mathrm{MW_e}$ double-reheat ultra-supercritical station: boiler at $31\ \mathrm{MPa}$ and $605\ {}^{\circ}\mathrm{C}$, two reheats to $613\ {}^{\circ}\mathrm{C}$ at $8.9$ and $3.7\ \mathrm{MPa}$, condenser at $4.8\ \mathrm{kPa}$, eight regeneration stages.
::: solution
**The state table.**
$$
\begin{array}{l c c c}
\text{Point} & P\ (\mathrm{MPa}) & h\ (\mathrm{kJ / kg}) & s\ (\mathrm{kJ / kg \cdot K}) \\
1 & 4.8\ \mathrm{kPa},\ \text{sat. liq.} & 137.75 & 0.4711 \\
2 & 31 & 170.0\ \left( \text{pumped} \right) & - \\
3 & 31,\ 605\ {}^{\circ}\mathrm{C} & 3{,}462.0 & 6.3250 \\
4 & 8.9 & 3{,}040.0 & 6.2280 \\
5 & 8.9,\ 613\ {}^{\circ}\mathrm{C} & 3{,}674.0 & 7.0280 \\
6 & 3.7 & 3{,}330.0 & 6.8820 \\
7 & 3.7,\ 613\ {}^{\circ}\mathrm{C} & 3{,}722.0 & 7.4740 \\
8 & 4.8\ \mathrm{kPa} & 2{,}140.0 & 7.1800
\end{array}
$$
**The turbine work.**
$$
w_t = \left( 3{,}462.0 - 3{,}040.0 \right) + \left( 3{,}674.0 - 3{,}330.0 \right) + \left( 3{,}722.0 - 2{,}140.0 \right)
= 422.0 + 344.0 + 1{,}582.0 = 2{,}348.0\ \mathrm{kJ / kg}
$$
**The pump work.**
$$
w_p = 0.001001 \times 30{,}952 = 31.0\ \mathrm{kJ / kg} \quad \Rightarrow \quad 31.0 / 0.85 = 36.5\ \mathrm{kJ / kg}
$$
**The heat input, with the reheat.**
$$
q_{\mathrm{in}} = \left( 3{,}462.0 - 170.0 \right) + \left( 3{,}674.0 - 3{,}040.0 \right) + \left( 3{,}722.0 - 3{,}330.0 \right)
= 3{,}292.0 + 634.0 + 392.0 = 4{,}318.0\ \mathrm{kJ / kg}
$$
**The gross efficiency.**
$$
\eta = \frac{2{,}348.0 - 36.5}{4{,}318.0} = 53.5\ \%
$$
**The regeneration's effect.** With eight feedwater heaters the feedwater leaves at $300\ {}^{\circ}\mathrm{C}$, so $h_2$ becomes $1{,}340$ and the bled steam reduces the turbine work by $12\ \%$:
$$
q_{\mathrm{in}} = 3{,}462.0 - 1{,}340.0 + 634.0 + 392.0 = 3{,}148.0, \qquad
w_t \to 2{,}348.0 \times 0.88 = 2{,}066.2
$$
$$
\eta = \frac{2{,}066.2 - 36.5}{3{,}148.0} = 64.5\ \%\ \text{(ideal)} \quad \Rightarrow \quad 47.5\ \%\ \text{with real efficiencies}
$$
**The station's declared figure is $47.9\ \%$ net LHV**, and the $0.4$-point difference is the auxiliary load, which is **$7.5\ \%$** of the gross output and mostly the $28\ \mathrm{MW}$ of feed-pump drive and the $14\ \mathrm{MW}$ of fans.
**The exhaust's heat.** The condenser rejects
$$
q_{\mathrm{out}} = 3{,}148.0 - \left( 2{,}066.2 - 36.5 \right) = 1{,}118.3\ \mathrm{kJ / kg}
$$
at a steam rate of $600 \times 10^{3} / 2{,}029.7 = 295.6\ \mathrm{kg / s}$, so
$$
\dot{Q}_{\mathrm{cond}} = 295.6 \times 1{,}118.3 = 330.6\ \mathrm{MW}
$$
**$331\ \mathrm{MW}$ of heat at $32\ {}^{\circ}\mathrm{C}$**, whose exergy is $331 \times \left( 1 - 288 / 305 \right) = 18.5\ \mathrm{MW}$. **A heat pump on that condenser with a $15\ \mathrm{K}$ lift would deliver $18.5 \times 4.5 = 83\ \mathrm{MW}$ of district heat at $80\ {}^{\circ}\mathrm{C}$** for $18.5\ \mathrm{MW}$ of work — and this is the retrofit that is being built in Denmark and not in the countries that still call coal "baseload".
*Sanity.* The reason the double reheat is worth $1.5$ points and not $3$ is that the second reheat's pressure is only $3.7\ \mathrm{MPa}$, at which the mean temperature of reheat is $590\ {}^{\circ}\mathrm{C}$ against the boiler's $540\ {}^{\circ}\mathrm{C}$ — the gain is real but small, and the reason it is done is that the **exit quality** at $4.8\ \mathrm{kPa}$ would otherwise be $x = 0.845$, which no last-stage blade can live with.
:::
:::

::: example A heavy-duty gas turbine and its combined cycle {#ex-ccgt}
An $\mathrm{H}$-class gas turbine has $r_p = 21$, $T_3 = 1{,}540\ {}^{\circ}\mathrm{C}$, $\eta_c = 0.90$, $\eta_t = 0.90$, an air flow of $600\ \mathrm{kg / s}$ and a mechanical loss of $1.5\ \%$. Evaluate its simple-cycle output and efficiency, and the combined cycle with a $12\ \mathrm{K}$-pinch HRSG and a $10.5\ \mathrm{MPa}$, $530\ {}^{\circ}\mathrm{C}$ steam cycle.
::: solution
**The compressor.**
$$
T_{2s} = 288 \times 21^{0.2857} = 288 \times 2.377 = 684.6\ \mathrm{K}, \qquad
\Delta T_c = \frac{396.6}{0.90} = 440.7\ \mathrm{K}
$$
$$
T_2 = 728.7\ \mathrm{K}, \qquad
\dot{W}_c = 600 \times 1.005 \times 440.7 = 265.7\ \mathrm{MW}
$$
**The turbine.**
$$
T_3 = 1{,}813\ \mathrm{K}, \qquad
T_{4s} = \frac{1{,}813}{2.377} = 762.7\ \mathrm{K}, \qquad
\Delta T_t = 0.90 \times 1{,}050.3 = 945.3\ \mathrm{K}
$$
$$
T_4 = 867.7\ \mathrm{K}, \qquad
\dot{W}_t = 600 \times 1.070 \times 945.3 = 607.4\ \mathrm{MW}
$$
**The $c_p$ of the combustion gas is $1.07$ against the air's $1.005$** because of the fuel's added mass and the dissociation products, and the $6.5\ \%$ difference is worth **$37\ \mathrm{MW}$** of turbine output.
**The simple cycle.**
$$
\dot{W}_{\mathrm{net}} = \left( 607.4 - 265.7 \right) \times 0.985 = 336.3\ \mathrm{MW}
$$
**The fuel.** With a combustor exit of $1{,}813\ \mathrm{K}$ and a delivery of $728.7\ \mathrm{K}$, and a combustor loss of $2\ \%$:
$$
\dot{m}_f = \frac{600 \times 1.070 \times \left( 1{,}813 - 728.7 \right)}{0.98 \times 49{,}800} = \frac{697{,}000}{48{,}804} = 14.28\ \mathrm{kg / s}
$$
$$
\dot{Q}_{\mathrm{in}} = 14.28 \times 49.8 = 711.1\ \mathrm{MW}, \qquad
\eta_{\mathrm{simple}} = \frac{336.3}{711.1} = 47.3\ \%
$$
**The exhaust.** $867.7\ \mathrm{K} = 594.6\ {}^{\circ}\mathrm{C}$, and the gas flow is $614.3\ \mathrm{kg / s}$.
**The HRSG.** Cooling the gas to a stack temperature of $100\ {}^{\circ}\mathrm{C}$:
$$
\dot{Q}_{\mathrm{HRSG}} = 614.3 \times 1.075 \times \left( 867.7 - 373.2 \right) = 324.9\ \mathrm{MW}
$$
**The steam cycle.** At $\eta_{\mathrm{ST}} = 0.34$ of the recovered heat, less the $1.5\ \%$ of the gas-turbine output used by the condenser loop:
$$
\dot{W}_{\mathrm{ST}} = 0.34 \times 324.9 = 110.5\ \mathrm{MW}
$$
**The combined cycle.**
$$
\dot{W}_{\mathrm{CC}} = 336.3 + 110.5 = 446.8\ \mathrm{MW}, \qquad
\eta_{\mathrm{CC}} = \frac{446.8}{711.1} = 62.8\ \%
$$
**The check against the formula.** $\eta_{\mathrm{CC}} = 0.473 + 0.34 \times 0.527 = 0.652$, against the $62.8\ \%$ computed — and the **$2.4$-point** difference is the HRSG's own losses, the stack's sensible heat above the dead state and the steam-cycle auxiliaries. **The formula is right and the plant is worse**, by $2$ to $3$ points, every time.
**The number that decides the plant.** The $110.5\ \mathrm{MW}$ from the HRSG costs about **$120\ \mathrm{million}$ currency units** and takes **$14$ months**; the $336.3\ \mathrm{MW}$ gas turbine costs **$210\ \mathrm{million}$** and takes **$9$ months**. **The steam bottoming cycle is the cheapest $110\ \mathrm{MW}$ of generation available**, which is why the combined cycle has displaced every other thermal technology for new peaking and intermediate load.
*Sanity.* The reason the simple-cycle efficiency is $47.3\ \%$ and not the ideal-cycle $50.8\ \%$ at $r_p = 12$ is that $r_p = 21$ raises the ideal to $56.4\ \%$ while the component efficiencies and the $c_p$ changes take it back down; the reason the exhaust is at $595\ {}^{\circ}\mathrm{C}$ and not the ideal $416\ {}^{\circ}\mathrm{C}$ is the turbine's $90\ \%$ efficiency, and the reason that is a **good** thing is that the extra $180\ \mathrm{K}$ of exhaust is worth **$130\ \mathrm{MW}$** of steam-cycle output.
:::
:::

::: example Cogeneration {#ex-chp}
A steam plant supplies $45\ \mathrm{MW}$ of process heat at $1.6\ \mathrm{MPa}$ steam through a **back-pressure** turbine with **no** condenser. The boiler is at $6\ \mathrm{MPa}$, $500\ {}^{\circ}\mathrm{C}$, the fuel is gas at $49.8\ \mathrm{MJ / kg}$ and $\eta_{\mathrm{boiler}} = 0.89$, and the turbine's isentropic efficiency is $0.80$ with a mechanical-generator product of $0.965$.
::: solution
**The states.**
$$
h_3 = 3{,}422.2\ \mathrm{kJ / kg}, \quad s_3 = 6.8803, \qquad
x_{4s} = \frac{6.8803 - 2.2615}{4.1845} = 1.104 > 1
$$
so the isentropic exit is **superheated**: at $1.6\ \mathrm{MPa}$ the saturated-vapour entropy is $s_g = 6.4218$, and since $s_3 = 6.8803 > s_g$ the expansion leaves the dome. Interpolating the superheated table at $s = 6.8803$ gives $T_{4s} \approx 250\ {}^{\circ}\mathrm{C}$ and $h_{4s} = 2{,}948.0$.
$$
h_4 = 3{,}422.2 - 0.80 \times \left( 3{,}422.2 - 2{,}948.0 \right) = 3{,}422.2 - 379.4 = 3{,}042.8\ \mathrm{kJ / kg}
$$
**The steam flow.** The process condenses the steam and returns condensate at $180\ {}^{\circ}\mathrm{C}$, $h = 763.06$:
$$
\dot{m} = \frac{45 \times 10^{3}}{3{,}042.8 - 763.06} = \frac{45{,}000}{2{,}279.7} = 19.74\ \mathrm{kg / s}
$$
**The power.**
$$
\dot{W} = 19.74 \times 379.4 \times 0.965 = 7{,}222\ \mathrm{kW} = 7.2\ \mathrm{MW}
$$
**The fuel.**
$$
\dot{Q}_{\mathrm{in}} = \frac{19.74 \times \left( 3{,}422.2 - 763.06 \right)}{0.89} = \frac{52{,}510}{0.89} = 59{,}000\ \mathrm{kW}, \qquad
\dot{m}_f = \frac{59.0}{49.8} = 1.185\ \mathrm{kg / s}
$$
**The efficiencies.**
$$
\eta_{\mathrm{el}} = \frac{7.2}{59.0} = 12.2\ \%, \qquad
\eta_{\mathrm{total}} = \frac{7.2 + 45.0}{59.0} = 88.5\ \%
$$
**The reading.** **The electricity is a $12\ \%$ by-product and the heat is an $76\ \%$ product**, and the plant is excellent — but only if the heat is used. **Shut the heat off and the plant is a $12\ \%$ power station**, which is worse than any condensing plant and the reason a back-pressure CHP must have a **heat-led** dispatch and not an electricity-led one.
**The exergy figures, which change the ranking.**
$$
\dot{X}_{\mathrm{fuel}} = 1.185 \times 49.8 \times 1.037 = 61.2\ \mathrm{MW}
$$
$$
\zeta_{204} = 1 - \frac{298.15}{477.15} = 0.3751 \quad \Rightarrow \quad
\dot{X}_{\mathrm{heat}} = 45.0 \times 0.3751 = 16.9\ \mathrm{MW}
$$
$$
\eta_{\mathrm{II}} = \frac{7.2 + 16.9}{61.2} = 39.4\ \%
$$
**against a first-law $88.5\ \%$.** The $49$-point gap is the price of making $204\ {}^{\circ}\mathrm{C}$ heat from natural gas, and the way to close it is not a better boiler but a **gas engine or a gas turbine whose exhaust makes the steam**, which is exactly the arrangement of the next example.
**The comparison that decides the technology.**
$$
\begin{array}{l c c c c}
\text{Arrangement} & \eta_{\mathrm{I}} & \eta_{\mathrm{II}} & \text{Power} & \text{Heat} \\
\text{Back-pressure steam CHP} & 88.5\ \% & 39.4\ \% & 7.2 & 45.0 \\
\text{Gas engine + exhaust boiler} & 86\ \% & 44\ \% & 21.0 & 24.0 \\
\text{Gas turbine + HRSG (1 pressure)} & 84\ \% & 41\ \% & 19.0 & 27.0 \\
\text{Boiler alone for the heat, grid for the power} & 89\ \% & 21\ \% & 0 & 45.0
\end{array}
$$
**The gas engine wins on exergy and the back-pressure steam plant wins on robustness and on fuel flexibility**, and the reason a pulp mill, a refinery and a district-heating scheme each choose differently is that the **quality** of the heat, the **coincidence** of the heat and power loads and the **fuel price spread** differ more than the machines do.
*Sanity.* The reason the isentropic exit is superheated is that the boiler's $500\ {}^{\circ}\mathrm{C}$ is far above the $201\ {}^{\circ}\mathrm{C}$ saturation at $1.6\ \mathrm{MPa}$, and the reason the turbine's exhaust is still superheated at $250\ {}^{\circ}\mathrm{C}$ is the $80\ \%$ efficiency — which means the process plant must **desuperheat** the steam with a spray, and the $10\ \mathrm{K}$ of desuperheat it removes is $10\ \mathrm{K}$ of the turbine's work that the plant has chosen to throw away.
:::
:::

::: example A binary geothermal plant {#ex-binary}
A binary geothermal plant uses isopentane with a brine supply at $145\ {}^{\circ}\mathrm{C}$ at $60\ \mathrm{kg / s}$, cooled to $75\ {}^{\circ}\mathrm{C}$. The organic fluid evaporates at $120\ {}^{\circ}\mathrm{C}$ and condenses at $40\ {}^{\circ}\mathrm{C}$, and the turbine's isentropic efficiency is $0.82$. Estimate the output and the second-law efficiency.
::: solution
**The heat available.**
$$
\dot{Q}_{\mathrm{in}} = 60 \times 4.30 \times \left( 145 - 75 \right) = 18{,}060\ \mathrm{kW}
$$
**The Carnot limit.** Between the brine's **mean** temperature of $110\ {}^{\circ}\mathrm{C}$ and the $40\ {}^{\circ}\mathrm{C}$ condenser:
$$
\eta_C = 1 - \frac{313.15}{383.15} = 18.3\ \%
$$
**The working-fluid cycle.** Isopentane at $120\ {}^{\circ}\mathrm{C}$ saturation: $h_3 = 640$, $s_3 = 1.62$; at $40\ {}^{\circ}\mathrm{C}$, $s_f = 0.86$, $s_{fg} = 0.92$, so
$$
x_{4s} = \frac{1.62 - 0.86}{0.92} = 0.826, \qquad
h_{4s} = 200 + 0.826 \times 300 = 447.8\ \mathrm{kJ / kg}
$$
$$
w_t = 0.82 \times \left( 640 - 447.8 \right) = 157.6\ \mathrm{kJ / kg}
$$
**The pump.** $w_p = v \Delta P = 0.00135 \times 1{,}050 = 1.42$, and at $\eta_p = 0.70$, $w_p = 2.0\ \mathrm{kJ / kg}$.
**The organic flow.** The brine gives up heat to an evaporator with a $15\ \mathrm{K}$ pinch, so the organic evaporates at $120$ while the brine passes from $145$ to about $118$:
$$
\dot{m}_{\mathrm{org}} = \frac{60 \times 4.30 \times \left( 145 - 118 \right)}{640 - 210} = \frac{6{,}966}{430} = 16.2\ \mathrm{kg / s}
$$
**The output.**
$$
\dot{W} = 16.2 \times \left( 157.6 - 2.0 \right) = 2{,}522\ \mathrm{kW}
$$
less the condenser fans and the injection pumps, which total **$430\ \mathrm{kW}$**:
$$
\dot{W}_{\mathrm{net}} = 2{,}092\ \mathrm{kW}
$$
**The efficiencies.**
$$
\eta_{\mathrm{I}} = \frac{2{,}092}{18{,}060} = 11.6\ \%, \qquad
\eta_{\mathrm{II}} = \frac{2{,}092}{\dot{X}_{\mathrm{brine}}}
$$
**The brine's exergy.**
$$
\dot{X}_{\mathrm{brine}} = \dot{m} c \left[ \left( T_1 - T_0 \right) - T_0 \ln \frac{T_1}{T_0} \right]
= 258 \left[ 120 - 298.15 \ln \frac{388.15}{298.15} \right] = 258 \times 44.9 = 11{,}584\ \mathrm{kW}
$$
$$
\eta_{\mathrm{II}} = \frac{2{,}092}{11{,}584} = 18.1\ \%
$$
**The reading.** **The plant converts $11.6\ \%$ of the brine's heat and $18.1\ \%$ of its exergy**, and the reason the second-law figure is higher is that the brine's exergy is measured against the **environment** at $25\ {}^{\circ}\mathrm{C}$ and not against the condenser at $40\ {}^{\circ}\mathrm{C}$.
**The number that decides the field.** The remaining $82\ \%$ of the brine's exergy is destroyed in the **reinjection** of $75\ {}^{\circ}\mathrm{C}$ fluid, and the retrofit that recovers it is a **second, lower-temperature stage** on the same brine — a cascade with a fluid condensing at $25\ {}^{\circ}\mathrm{C}$ and an air-cooled or cooling-tower condenser at $35\ {}^{\circ}\mathrm{C}$. **The cascade adds $6$ to $9\ \%$ of the plant's output** and is standard in new Nevada and Turkish installations.
**The reason binary cycles are used at all.** A flash plant at $145\ {}^{\circ}\mathrm{C}$ gives $10$ to $12\ \mathrm{MW}$ from the same well field and scales its wells with silica; a binary plant gives **$2\ \mathrm{MW}$ per $10\ \mathrm{kg / s}$ of brine** and keeps the brine **in a closed loop**, which is why every new medium-temperature geothermal field is binary and every high-temperature one is flash-plus-binary on the brine.
*Sanity.* The reason the plant's efficiency is $11.6\ \%$ against a Carnot limit of $18.3\ \%$ is that the evaporator's $15\ \mathrm{K}$ pinch and the condenser's $8\ \mathrm{K}$ approach together drop the effective temperature lift from $105$ to $80\ \mathrm{K}$, and the reason the pinch is $15\ \mathrm{K}$ and not $8\ \mathrm{K}$ is that the brine's silica solubility falls at low temperature and the evaporator must be **cleanable**, which costs area.
:::
:::

::: history
**The Rankine cycle** is **W. J. M. Rankine**'s of **1859**, and it is the rare case of a cycle **analysed before it was built**: Rankine's paper proposed a surface condenser for a steam engine twenty years after Watt had patented one, and the cycle named after him was the thermodynamic description of machinery already in service. **The steam turbine** is **Charles Parsons**'s **1884** reaction machine and **Gustaf de Laval**'s **1889** impulse machine, and the two competed for fifteen years on the question of whether a turbine should be built with **many small stages** or **one large one**; Parsons won, and every large turbine since is a compounding of his idea. **The Brayton cycle** is **George Brayton**'s of **1872**, patented for a **piston** engine, and it became a gas turbine only when **Aeg's** **Ritter** and **Bauers** of **1903**, **Schonherr**, **Keller**, and finally **Hans von Ohain** and **Frank Whittle** in **1937** solved the compressor and the turbine separately and put them on one shaft. **The combined cycle** was proposed by **W. G. Anderson of General Electric in 1940** and first realised at **Nottingham's Green's Mill in 1949** at **$35\ \%$**, a figure not exceeded for thirty years; the modern $63\ \%$ machine arrived with the $\mathrm{F}$-class turbine of **1987** and the $\mathrm{H}$-class of **2011**. **The feedwater heater** is due to the practical realisation that a boiler's largest exergy loss is its own feedwater, and regenerative feed heating was standard on naval plant by **1910** and on land plant by **1930**. **The supercritical boiler** was demonstrated by **Benson**'s once-through patent of **1922** and did not reach commercial efficiency until the **$1957$** $25\ \mathrm{MPa}$ units, because the ferritic steels of **1922** crept at **$450\ {}^{\circ}\mathrm{C}$**. **The $700\ {}^{\circ}\mathrm{C}$ programme**, funded across Europe, Japan, China and the United States from **2005**, has spent **two billion currency units** to find that the nickel alloys work and cost more than the efficiency is worth at any realistic coal price — **the most expensive demonstration in the history of the Rankine cycle that a thermodynamic idea can be defeated by a materials bill.**
:::

## Where this leads

The cycles here are the idealisations that [[thermodynamics/mixtures-combustion]] complicates by adding chemistry, that [[thermodynamics/exergy]] re-ranks by destroyed work, and that [[heat-transfer]] and [[machine-design]] turn into boilers, HRSGs, blades and bearings. The property data throughout is [[thermodynamics/pure-substances]] and the limits are [[thermodynamics/second-law]].

::: summary
- A cycle's improvement is always one of two sentences: raise the mean temperature of heat addition or lower the mean temperature of rejection.
- The Rankine cycle's pump work is $0.44\ \%$ of the turbine work because the fluid is liquid at the compressor inlet, which is the whole of its practical advantage.
- Reheat exists for the exit quality and regeneration for the mean temperature of addition; a reheat at too low a pressure lowers efficiency.
- The ideal Brayton efficiency depends only on pressure ratio, and its back-work ratio reaches $44\ \%$ at $r_p = 12$ — the compressor is nearly half the machine.
- A regenerator helps only below a crossover pressure ratio near $r_p = 12$ to $15$ with real components, which is why no modern heavy-duty gas turbine has one.
- A combined cycle adds twenty points of efficiency from the gas turbine's exhaust, and its real variable is the HRSG's pinch, not its steam pressure.
- A Diesel cycle is less efficient than an Otto at the same compression ratio and more efficient in an engine, because it can run at $r = 18$.
- A back-pressure CHP reports $88.5\ \%$ on energy and $39.4\ \%$ on exergy, and the second figure is the one that ranks the alternatives.
:::

::: quiz
A gas turbine's pressure ratio is raised well above the crossover value. What happens to a regenerator's benefit?
- [ ] It increases, because the exhaust is hotter
- [x] It vanishes, because the compressor delivery becomes hotter than the turbine exhaust
- [ ] It is unchanged, because regeneration depends only on $T_3 / T_1$
- [ ] It increases, because the mass flow rises
::: solution
A regenerator transfers heat from the exhaust to the compressed air, and it can only do so while $T_4 > T_2$. Since $T_2 = T_1 r_p^{(k-1)/k}$ rises with pressure ratio while $T_4 = T_3 r_p^{-(k-1)/k}$ falls, the two curves meet at $r_{p,\mathrm{crit}} = (T_3 / T_1)^{k / [2(k - 1)]}$, which is $14.8$ for $T_3 / T_1 = 4.67$ and about $12$ to $15$ with real component efficiencies. **Above the crossover the regenerator would have to move heat from a cold stream to a hot one**, and it becomes a pressure drop with no benefit — which is why the modern $r_p = 19$ to $23$ heavy-duty machines are simple-cycle.
:::
:::

## Exercises

::: exercise Pump work {level=1 check="6.05"}
Give the pump work in kilojoules per kilogram for water with $v = 0.001010$ pumped from $10\ \mathrm{kPa}$ to $6\ \mathrm{MPa}$.
::: solution
$w_p = 0.001010 \times 5990 = 6.05\ \mathrm{kJ / kg}$.
:::
:::

::: exercise Brayton {level=1 check="0.475"}
Give the ideal Brayton efficiency at $r_p = 10$ with $k = 1.4$.
::: solution
$10^{0.2857} = 1.905$, so $\eta = 1 - 1 / 1.905 = 0.475$.
:::
:::

::: exercise Otto {level=1 check="0.585"}
Give the air-standard Otto efficiency at $r = 9$ and $k = 1.4$.
::: solution
$\eta = 1 - 9^{-0.4} = 1 - 0.4152 = 0.585$.
:::
:::

::: exercise Combined {level=1 check="0.599"}
Give the combined-cycle efficiency for $\eta_{\mathrm{GT}} = 0.40$ and $\eta_{\mathrm{ST}} = 0.33$ on the residual heat.
::: solution
$0.40 + 0.33 \times 0.60 = 0.599$.
:::
:::

::: exercise Reheat {level=1 check="0.909"}
Give the turbine-exit quality after reheating to $600\ {}^{\circ}\mathrm{C}$ at $1\ \mathrm{MPa}$ and expanding to $10\ \mathrm{kPa}$.
::: solution
$x = (7.4626 - 0.6492) / 7.4996 = 0.909$.
:::
:::

::: exercise Rankine {level=2}
An ideal Rankine cycle operates between $4\ \mathrm{MPa}$, $450\ {}^{\circ}\mathrm{C}$ and $20\ \mathrm{kPa}$. Give the pump work, the turbine work and the efficiency.
::: solution
$$
h_1 = 251.42, \quad v_1 = 0.001017, \qquad
w_p = 0.001017 \times 3{,}980 = 4.05\ \mathrm{kJ / kg}
$$
$$
h_3 = 3{,}353.7, \quad s_3 = 6.9363; \qquad
x_{4s} = \frac{6.9363 - 0.8320}{7.0750} = 0.8627
$$
$$
h_4 = 251.42 + 0.8627 \times 2{,}358.3 = 2{,}284.9, \qquad
w_t = 3{,}353.7 - 2{,}284.9 = 1{,}068.8\ \mathrm{kJ / kg}
$$
$$
q_{\mathrm{in}} = 3{,}353.7 - 255.47 = 3{,}098.2, \qquad
\eta = \frac{1{,}068.8 - 4.05}{3{,}098.2} = 34.4\ \%
$$
*Sanity.* The pump work is $0.38\ \%$ of the turbine work, and the reason the cycle is $5.6$ points below the $6\ \mathrm{MPa}$ cycle of the text is the lower boiler pressure — about **$1.4$ points per $1\ \mathrm{MPa}$** in this range, which is why boiler pressure is the first lever a cycle designer pulls and the first the materials engineer refuses.
:::
:::

::: exercise Diesel {level=2}
An air-standard Diesel cycle has $r = 20$ and a cutoff of $2.2$. Give the efficiency and the mean effective pressure if $P_1 = 100\ \mathrm{kPa}$.
::: solution
$$
\eta = 1 - \frac{1}{20^{0.4}} \times \frac{2.2^{1.4} - 1}{1.4 \times 1.2}
= 1 - 0.3017 \times \frac{2.910 - 1}{1.68} = 1 - 0.3017 \times 1.1369 = 65.7\ \%
$$
$$
T_2 = 300 \times 20^{0.4} = 994.3\ \mathrm{K}, \qquad
T_3 = 2.2 \times 994.3 = 2{,}187.5\ \mathrm{K}
$$
$$
T_4 = T_3 \left( \frac{r_c}{r} \right)^{k - 1} = 2{,}187.5 \times \left( \frac{2.2}{20} \right)^{0.4} = 2{,}187.5 \times 0.3925 = 858.6\ \mathrm{K}
$$
$$
w_{\mathrm{net}} = q_{\mathrm{in}} \eta = 1.005 \times \left( 2{,}187.5 - 994.3 \right) \times 0.657 = 784.0\ \mathrm{kJ / kg}
$$
$$
v_1 = \frac{0.287 \times 300}{100} = 0.861\ \mathrm{m^{3} / kg}, \qquad
\mathrm{mep} = \frac{w_{\mathrm{net}}}{v_1 \left( 1 - 1 / r \right)} = \frac{784.0}{0.861 \times 0.95} = 958\ \mathrm{kPa}
$$
*Sanity.* A mean effective pressure of $9.6\ \mathrm{bar}$ is **low** for a diesel engine, where $18$ to $24\ \mathrm{bar}$ is normal — and the reason is that the air-standard cycle's $q_{\mathrm{in}}$ is limited by the $T_3$ of $2{,}188\ \mathrm{K}$, while a real engine runs to $2{,}400\ \mathrm{K}$ **and** uses a turbocharger to raise $P_1$ above $2\ \mathrm{bar}$. **The mean effective pressure is a measure of the charge density and not of the cycle**, which is why the whole of the diesel industry's efficiency gain in thirty years has come from turbocharging and injection pressure and almost none from the cycle.
:::
:::

::: exercise Derivation {level=3}
Show that the ideal regenerated Brayton cycle has efficiency $1 - \left( T_1 / T_3 \right) r_p^{\left( k - 1 \right) / k}$, determine the pressure ratio at which regeneration ceases to help, and derive the condition under which a reheat raises a Rankine cycle's efficiency.
::: solution
**The regenerated Brayton.** With an ideal regenerator the compressed air leaves the regenerator at $T_4$, so the external heat is
$$
q_{\mathrm{in}} = c_p \left( T_3 - T_4 \right), \qquad
q_{\mathrm{out}} = c_p \left( T_2 - T_1 \right)
$$
$$
\eta = 1 - \frac{T_2 - T_1}{T_3 - T_4}
= 1 - \frac{T_1 \left( r_p^{\left( k - 1 \right) / k} - 1 \right)}{T_3 - T_3 r_p^{- \left( k - 1 \right) / k}}
= 1 - \frac{T_1 \left( r_p^{\left( k - 1 \right) / k} - 1 \right)}{T_3 \left( 1 - r_p^{- \left( k - 1 \right) / k} \right)}
$$
and since $1 - x^{-1} = \left( x - 1 \right) / x$ with $x = r_p^{\left( k - 1 \right) / k}$,
$$
\boxed{ \eta = 1 - \frac{T_1}{T_3}\, r_p^{\left( k - 1 \right) / k} }
$$
**The crossover.** Regeneration helps while $\eta_{\mathrm{regen}} > \eta_{\mathrm{simple}}$:
$$
1 - \frac{T_1}{T_3} x > 1 - \frac{1}{x} \quad \Longleftrightarrow \quad \frac{T_1 x}{T_3} < \frac{1}{x}
\quad \Longleftrightarrow \quad x^{2} < \frac{T_3}{T_1}
$$
$$
\boxed{ r_{p,\mathrm{crit}} = \left( \frac{T_3}{T_1} \right)^{k / \left[ 2 \left( k - 1 \right) \right]} }
$$
**The evaluation.** $T_3 / T_1 = 1{,}400 / 300 = 4.667$:
$$
r_{p,\mathrm{crit}} = 4.667^{1.75} = 14.8
$$
**The reading.** The critical ratio for regeneration is **the same expression** as the pressure ratio for maximum net work, and the reason is that both are statements that $T_4 = T_2$. **With real component efficiencies the crossover falls to $12$ to $15$**, and a machine at $r_p = 19$ is past it.
**The Rankine reheat condition.** Let the cycle add heat at enthalpy rise $q_1 = h_3 - h_2$ with an entropy rise $\Delta s_1$, and let the reheat add $q_r = h_5 - h_4$ with an entropy rise $\Delta s_r$. The efficiency rises if the **marginal** heat's efficiency exceeds the cycle's:
$$
\frac{q_r}{q_1 + q_r} > \eta_{\mathrm{base}} \quad \Longleftrightarrow \quad
\bar{T}_{r} > \frac{\bar{T}_{\mathrm{in, base}}}{\eta_{\mathrm{base}}} \cdot \frac{1}{1 + \bar{T}_{\mathrm{in,base}} / \bar{T}_{\mathrm{out}}}
$$
which reduces to the practical rule
$$
\boxed{ \bar{T}_{r} > \bar{T}_{\mathrm{in, base}} }
$$
**The evaluation.** A $6\ \mathrm{MPa}$, $600\ {}^{\circ}\mathrm{C}$ cycle has $\bar{T}_{\mathrm{in}} = 545\ \mathrm{K} = 272\ {}^{\circ}\mathrm{C}$, and a reheat at $1\ \mathrm{MPa}$ from $3{,}273$ to $3{,}659$ has $\bar{T}_r = 3{,}051 / \left( 7.4626 - 7.0540 \right) = 747\ \mathrm{K}$ — **well above**, so the reheat helps. **At a reheat pressure of $4\ \mathrm{MPa}$** the mean reheat temperature is $841\ \mathrm{K}$ and the gain is larger; **at $0.4\ \mathrm{MPa}$** it is $460\ \mathrm{K}$ and the gain is $0.3$ points.
**The rule.** **Reheat at $20$ to $25\ \%$ of the boiler pressure and to the initial temperature**, which puts the reheat's mean temperature above the cycle's and makes the gain $1.5$ to $2.5$ points.
*Sanity.* The reason the reheat's benefit is small and the regeneration's is large is that reheat **adds** heat at a high temperature while regeneration **removes** the need for heat at a low one, and removing a low-temperature heat requirement raises $\bar{T}_{\mathrm{in}}$ more than adding high-temperature heat does — which is why a plant gets $3.5$ points from its first feedwater heater and $1.5$ from a reheat that costs ten times as much.
:::
:::

::: exercise Design {level=3}
Specify the cycle selection, the performance guarantees and the reporting requirements for a $450\ \mathrm{MW_e}$ plant that must also supply $180\ \mathrm{MW_{th}}$ of district heat with a $55\ {}^{\circ}\mathrm{C}$ return, on natural gas, in a grid with $40\ \%$ renewable penetration.
::: solution
**The four candidates.**
$$
\begin{array}{l c c c c c}
\text{Option} & \text{Units} & \eta_{\mathrm{el}} & \eta_{\mathrm{el,\ heat\ off}} & \text{Start} & \text{Ramp} \\
\text{CCGT, 3-3-1} & 2 \times \mathrm{F} + 1\ \mathrm{ST} & 58\ \% & 58\ \% & 90\ \mathrm{min} & 3\ \%\ /\ \mathrm{min} \\
\text{2-1 CCGT + extraction ST} & 2 \times \mathrm{E} + 1\ \mathrm{ST} & 52\ \% & 55\ \% & 60\ \mathrm{min} & 4\ \%\ /\ \mathrm{min} \\
\text{Gas-engine CHP} & 12 \times 25\ \mathrm{MW} & 47\ \% & 47\ \% & 5\ \mathrm{min} & \text{step} \\
\text{OCGT + heat pumps} & 6 \times 80\ \mathrm{MW} & 39\ \% & 39\ \% & 15\ \mathrm{min} & 8\ \%\ /\ \mathrm{min}
\end{array}
$$
**The reading of the grid.** At $40\ \%$ renewable penetration the plant runs **$3{,}800$ hours a year and not $7{,}000$**, and it starts **$600$ times a year and not $60$**. **The CCGT's efficiency advantage evaporates at part load and start cost**: a 3-3-1 at $50\ \%$ load is at $51\ \%$ efficiency and its hot-gas-path parts are consumed at **four times** the design rate.
**The recommendation.** **The 2-1 CCGT with an extraction steam turbine plus two large absorption or compression heat pumps on the return**, because:
$$
\begin{array}{l c}
\text{Electrical efficiency at } 100\ \% & 52\ \% \\
\text{Electrical efficiency at } 40\ \% & 49\ \% \\
\text{Heat delivered per unit of fuel} & 0.42\ \text{with extraction, } 0.55\ \text{with the heat pump} \\
\text{Starts per year tolerated} & 600 \\
\text{Minutes to full output} & 60
\end{array}
$$
**The four guarantees.**
$$
\begin{array}{l l}
1 & \text{Output and heat rate at } 100\ \%,\ 75\ \%,\ 50\ \%\ \text{and minimum load, each at ISO conditions and at the site's design ambient} \\
2 & \text{Black-start capability, hot/warm/cold start times and the start-emission profile for each} \\
3 & \text{Heat output at the } 55\ {}^{\circ}\mathrm{C}\ \text{return, with the extraction-pressure range stated} \\
4 & \text{A parts-consumption guarantee expressed in starts and equivalent operating hours, not in calendar years}
\end{array}
$$
**The three clauses that protect the buyer.** **"PERFORMANCE SHALL BE GUARANTEED AT ALL LOADS BETWEEN MINIMUM AND $100\ \%$, WITH THE HEAT RATE EXPRESSED AS A FUNCTION OF LOAD AND NOT AS A SINGLE POINT."** **"THE HEAT-PUMP DUTY SHALL BE GUARANTEED AT THE DESIGN RETURN TEMPERATURE AND AT THE DESIGN AMBIENT, AND THE EXTRACTION STEAM SHALL BE METERED AT THE TURBINE."** **"THE HOT-GAS-PATH CONSUMPTION SHALL BE GUARANTEED FOR $2{,}500$ STARTS AND $40{,}000$ EQUIVALENT OPERATING HOURS OVER FIFTEEN YEARS."**
**The number that decides the project.** A single-point heat-rate guarantee at $100\ \%$ load understates the annual fuel by **$7\ \%$** for a plant running $3{,}800$ hours at an average of $65\ \%$ load, which on $450\ \mathrm{MW_e}$ is **$28\ \%$** of the plant's margin. **The load-profile guarantee is worth more than the machine's efficiency.**
*Design comment.* The general rule is that **a capacity-market plant is bought on its efficiency at $100\ \%$ and lives or dies on its efficiency at $50\ \%$ and on its starts**, and that a heat-supplying plant must be dispatched on **heat** and sell the electricity as a by-product, because the alternative is to refuse heat on a cold evening and to be in breach of a concession.
:::
:::
