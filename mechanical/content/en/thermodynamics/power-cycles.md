A cycle is a way of spending entropy deliberately: take in heat at a high temperature, convert part of it to work, and pay the rest away as entropy at a low temperature. Every power cycle ever built is the same four moves — **add heat, expand, reject heat, compress** — arranged so that the four happen at the temperatures that make the arithmetic best.

The reason there are so many of them is that the four moves have different mechanical requirements. A vapour that condenses gives an enormous pressure ratio for a small volume change and a tiny compressor, which is why **Rankine** dominates stationary power. A gas that never condenses gives a modest pressure ratio and a huge turbine, which is why **Brayton** dominates aviation. A combustion that happens inside the cylinder avoids the compressor entirely, which is why **Otto** and **Diesel** dominate transport. The thermodynamics is one page; the engineering is the reason the page has footnotes.

::: warning Seven cycle errors that produce papers and not power
**Beating the Carnot limit with a regenerator.** A regenerator does **not** raise a cycle's efficiency above Carnot; it raises the **Brayton** cycle's approach to the Ericsson limit by recovering internal heat, and the ideal regenerated Brayton at a pressure ratio of $12$ between $300$ and $1{,}400\ \mathrm{K}$ reaches $1 - \left( T_1 / T_3 \right) r_p^{\left( k - 1 \right) / k} = 56.4\ \%$ — still well below the Carnot $1 - 300 / 1{,}400 = 78.6\ \%$ — and even that **only** if the regenerator is $100\ \%$ effective, which costs more exchanger than the cycle is worth. **Assuming a regenerator always helps.** It helps when the turbine exhaust is **hotter** than the compressor delivery, which for air with $k = 1.4$ means
$$
T_4 > T_2 \quad \Longleftrightarrow \quad \frac{T_3}{T_1} > r_p^{2 \left( k - 1 \right) / k} \quad \Longleftrightarrow \quad r_p < \left( \frac{T_3}{T_1} \right)^{k / \left[ 2 \left( k - 1 \right) \right]}
$$
At $T_3 / T_1 = 4.67$ the ideal crossover is at $r_p = 14.8$ (about $17$ with $85\ \%$ components), and above it a regenerator would heat the exhaust with the compressed air instead of the reverse — which is why regenerated gas turbines are low-pressure-ratio machines. **Confusing the Otto and Diesel efficiencies at the same compression ratio.** At $r = 16$ the Otto efficiency is $1 - 1 / 16^{0.4} = 67.0\ \%$ and the Diesel with a cutoff of $2.5$ is $1 - \dfrac{1}{16^{0.4}} \cdot \dfrac{2.5^{1.4} - 1}{1.4 \times 1.5} = 59.1\ \%$: **the Diesel is less efficient at the same compression ratio**, and it wins in practice only because it can **run** at $r = 20$ where the Otto would knock. **Forgetting the pump work is not negligible in a supercritical boiler.** At $30\ \mathrm{MPa}$ the feed-pump work is $30\ \mathrm{kJ / kg}$ against a turbine work of $1{,}400\ \mathrm{kJ / kg}$ — $2.1\ \%$, which is $0.9$ percentage points of cycle efficiency and the reason a $600\ \mathrm{MW}$ station's feed-pump set is a $15\ \mathrm{MW}$ machine. **Reading a reheat's benefit as mainly an efficiency gain.** A single reheat to the initial temperature raises an ideal Rankine cycle's efficiency by only about **two percentage points**, while it raises the turbine-exit quality by more than **$0.1$**, which is its main purpose; a reheat at too low a temperature or pressure gains little or nothing. **Applying air-standard assumptions where they do not hold.** The air-standard analysis assumes constant specific heats, no dissociation, and a fixed mass of air. At $2{,}400\ \mathrm{K}$ the last two are badly wrong: the changing composition and specific heat of the combustion gas (and, at the highest temperatures, dissociation) change the expansion work by a few per cent and raise the exhaust temperature by tens of kelvin, which is why a real gas turbine's exhaust is hotter than the air-standard prediction and its HRSG is bigger than the analysis suggests. **Optimising a cycle and forgetting the pinch.** A combined cycle's efficiency is set by the HRSG's **pinch temperature difference**, and a $10\ \mathrm{K}$ pinch against a $15\ \mathrm{K}$ pinch is worth about **$1$ percentage point** of plant efficiency and nearly **$50\ \%$** more HRSG area (see the table below). A cycle analysis that assumes zero pinch has found the Carnot efficiency of a hypothetical plant.
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
3 & 6\ \mathrm{MPa},\ 600\ {}^{\circ}\mathrm{C} & h_3 = 3{,}658.8 & s_3 = 7.1693 \\
4 & 10\ \mathrm{kPa},\ s_4 = s_3 & x_4 = 0.8694, & h_4 = 2{,}271.4
\end{array}
$$
$$
w_p = 0.001010 \times 5{,}990 = 6.05\ \mathrm{kJ / kg}, \qquad
w_t = 3{,}658.8 - 2{,}271.4 = 1{,}387.4\ \mathrm{kJ / kg}
$$
$$
q_{\mathrm{in}} = 3{,}658.8 - 197.86 = 3{,}460.9\ \mathrm{kJ / kg}, \qquad
\eta = \frac{1{,}387.4 - 6.05}{3{,}460.9} = 39.9\ \%
$$
**The pump work's share.** $6.05 / 1{,}387.4 = 0.44\ \%$, and this is the number that makes the Rankine cycle practical: **the working fluid is liquid at the compressor inlet**, so the compression work is a thousandth of the expansion work and the cycle's net output is essentially the turbine's.
**The comparison with Carnot.** $\eta_C = 1 - 319 / 873 = 63.5\ \%$ against the cycle's $39.9\ \%$, and the gap is not irreversibility — the cycle is internally reversible — but the fact that **heat is added over a range of temperatures from $319$ to $873\ \mathrm{K}$** and not all at $873\ \mathrm{K}$.
**The average temperature of heat addition, which is the whole of cycle design.**
$$
\bar{T}_{\mathrm{in}} = \frac{q_{\mathrm{in}}}{\Delta s} = \frac{3{,}460.9}{7.1693 - 0.6492} = 530.8\ \mathrm{K}, \qquad
\eta = 1 - \frac{\bar{T}_{\mathrm{out}}}{\bar{T}_{\mathrm{in}}} = 1 - \frac{319.0}{530.8} = 39.9\ \%
$$
— exactly the cycle efficiency, as it must be, because the heat is rejected at the constant condenser temperature $T_{\mathrm{sat}} \left( 10\ \mathrm{kPa} \right) = 319.0\ \mathrm{K}$. **The formula is exact when both mean temperatures are taken as $q / \Delta s$** — and the reason it is worth the trouble is that it converts every cycle improvement into one of two sentences: **raise $\bar{T}_{\mathrm{in}}$ or lower $\bar{T}_{\mathrm{out}}$**.
:::

::: definition Reheat, regeneration and the real cycle {#def-reheat}
**Why reheat exists.** A $6\ \mathrm{MPa}$, $600\ {}^{\circ}\mathrm{C}$ cycle exhausting to $10\ \mathrm{kPa}$ leaves the last turbine stage at $x = 0.869$ — **$13\ \%$ water**, which erodes the blade tips. Expanding first to $1\ \mathrm{MPa}$ ($h = 3{,}077.5$) and reheating to $600\ {}^{\circ}\mathrm{C}$:
$$
h_{a} = 3{,}698.6\ \left( 1\ \mathrm{MPa},\ 600\ {}^{\circ}\mathrm{C} \right), \qquad s_a = 8.0311
$$
$$
x_{b} = \frac{8.0311 - 0.6492}{7.4996} = 0.9843, \qquad h_b = 191.81 + 0.9843 \times 2{,}392.1 = 2{,}546.3
$$
$$
w_t = \left( 3{,}658.8 - 3{,}077.5 \right) + \left( 3{,}698.6 - 2{,}546.3 \right) = 581.3 + 1{,}152.3 = 1{,}733.6\ \mathrm{kJ / kg}
$$
**The quality has risen from $0.869$ to $0.984$** — the main reason for the extra boiler pass — while the efficiency
$$
q_{\mathrm{in}} = \left( 3{,}658.8 - 197.86 \right) + \left( 3{,}698.6 - 3{,}077.5 \right) = 3{,}460.9 + 621.1 = 4{,}082.0
$$
$$
\eta = \frac{1{,}733.6 - 6.05}{4{,}082.0} = 42.3\ \%
$$
**has risen by $2.4$ points.** Repeating the calculation for other reheat pressures gives $41.9\ \%$ at $0.4\ \mathrm{MPa}$, $41.9\ \%$ at $2\ \mathrm{MPa}$ and $40.9\ \%$ at $4\ \mathrm{MPa}$: **the rule is to reheat at roughly $15$ to $25\ \%$ of the boiler pressure and to the initial temperature**, which gives a gain of **$1.5$ to $2.5$ points** in a simple cycle.
**Why regeneration exists.** Feedwater entering the boiler at about $319\ \mathrm{K}$ is heated to saturation at $549\ \mathrm{K}$ **inside the boiler by combustion gas at well over $1{,}000\ \mathrm{K}$** — a heat transfer across many hundreds of kelvin that destroys exergy at every kilowatt. Bleeding steam to preheat the feedwater raises $\bar{T}_{\mathrm{in}}$ and removes that destruction.
**The open feedwater heater, at $0.6\ \mathrm{MPa}$.**
$$
y\, h_{\mathrm{bleed}} + \left( 1 - y \right) h_{2} = h_{f, 0.6}
\quad \Rightarrow \quad
y = \frac{h_{f, 0.6} - h_2}{h_{\mathrm{bleed}} - h_2}
$$
With $h_{f, 0.6} = 670.4$, the condensate pumped to $0.6\ \mathrm{MPa}$ at $h_2 = 192.4$ and an isentropic bleed at $h_{\mathrm{bleed}} = 2{,}950.3$:
$$
y = \frac{670.4 - 192.4}{2{,}950.3 - 192.4} = \frac{478.0}{2{,}757.9} = 0.173
$$
**$17\ \%$ of the steam is bled**, and the cycle's efficiency rises from $39.9\ \%$ to **$42.4\ \%$** — a gain of $2.4$ points for one vessel, one pump and a set of pipes.
**The number of heaters, and where it stops.**
$$
\begin{array}{l c c}
\text{Heaters} & \eta\ \% & \text{Marginal gain} \\
0 & 39.9 & - \\
1 & 42.4 & 2.4 \\
2 & 43.3 & 0.9 \\
3 & 43.8 & 0.5 \\
4 & 44.1 & 0.3 \\
6 & 44.5 & 0.4\ \text{(for two)} \\
8 & 44.7 & 0.2\ \text{(for two)}
\end{array}
$$
(Ideal cycle, open heaters at equal temperature steps between the condenser and the boiler saturation temperature.) **The optimum is six to eight heaters in a large plant and two or three in a small one**, and the criterion is that the last heater must cost less than the fuel it saves — which for a $600\ \mathrm{MW}$ station means a marginal heater is worth about **$1.8\ \mathrm{MW}$** of output and **$4\ \mathrm{million}$ currency units a year** of fuel.
**The real cycle, with efficiencies.**
$$
\eta_{\mathrm{turbine}} = 0.88, \quad \eta_{\mathrm{pump}} = 0.82, \quad \Delta P_{\mathrm{boiler}} = 8\ \%, \quad \text{mechanical and generator } 0.985 \times 0.985
$$
$$
\eta_{\mathrm{cycle}} \approx 0.399 \times 0.88 \times 0.985 \times 0.985 - \text{pump and pressure-drop penalties} = 33.4\ \%
$$
**The $39.9\ \%$ ideal becomes $33.4\ \%$ real**, and the $6.5$ points divide roughly: turbine $4.8$, mechanical and generator $1.0$, pump and pressure drops $0.7$.
:::

::: definition Supercritical, advanced and the material ceiling {#def-supercritical}
$$
\begin{array}{l c c c c}
\text{Plant} & P\ (\mathrm{MPa}) & T\ ({}^{\circ}\mathrm{C}) & \eta_{\mathrm{net, LHV}} & \text{Main-steam alloy} \\
\text{Subcritical} & 17 & 540 / 540 & 36\ \% & 2.25\ \mathrm{Cr}\text{\textendash}1\ \mathrm{Mo} \\
\text{Supercritical} & 25 & 540 / 540 & 40\ \% & \mathrm{T91} \\
\text{Ultra-supercritical} & 28 & 600 / 600 & 45\ \% & \mathrm{T92}\ \text{and}\ 9\ \%\ \mathrm{Cr} \\
\text{Advanced USC} & 31 & 600 / 620 & 47\ \% & \text{austenitic}\ \mathrm{TP347HFG} \\
\text{A-USC (design studies)} & 35 & 700 / 720 & \approx 50\ \% & \text{nickel}\ 740\mathrm{H},\ 617 \\
\text{Double reheat USC} & 32 & 600 / 620 / 620 & 48\ \% & \text{as above, plus a third boiler pass}
\end{array}
$$
**The number that sets the ceiling.** Every $10\ \mathrm{K}$ of steam temperature above about $600\ {}^{\circ}\mathrm{C}$ costs roughly **$1\ \%$** more in the boiler and **$3$ to $5\ \%$** more in the turbine, and the creep strength of the cheapest adequate alloy falls away at $620\ {}^{\circ}\mathrm{C}$; above that the material is a **nickel** alloy whose price per kilogram is **twenty times** the ferritic steel's and whose supply is a handful of mills.
**The consequence.** The best double-reheat coal plants in service reach about **$48$ to $49\ \%$ net LHV** (as of the mid-2020s), and no $700\ {}^{\circ}\mathrm{C}$ plant has yet been built commercially. **The Rankine cycle is not limited by thermodynamics** — its Carnot ceiling at $700\ {}^{\circ}\mathrm{C}$ is about $68\ \%$ — **but by the creep of a ferritic steel at about half its melting temperature in a steam environment that oxidises it.**
**The other ceiling.** The thick headers, steam chests and turbine casings of a supercritical plant limit how fast it can change load without thermal-fatigue damage. **A supercritical coal plant is a poor peaking plant**, and a plant that must cycle daily loses part of the efficiency it was built for.
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
**The compressor eats $44\ \%$ of the turbine's output.** At $r_p = 25$ it eats $54\ \%$, and at the pressure ratio for maximum net work it eats $\sqrt{T_1 / T_3} = 46\ \%$. **This is why a gas turbine's specific output collapses off design**, and why a jet engine's compressor is the largest and most expensive module.
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
r_p < \left( \frac{T_3}{T_1} \right)^{k / \left[ 2 \left( k - 1 \right) \right]} = 4.667^{1.75} = 14.8
$$
**With $85\ \%$ component efficiencies the exhaust is hotter and the crossover moves up to about $r_p = 17$**, and it rises further with turbine entry temperature. Heavy-duty gas turbines nevertheless have no regenerator, because in a combined cycle the exhaust heat is worth more raising steam than preheating combustion air, and because a gas-to-gas exchanger for several hundred kilograms per second is enormous.
**The intercooled and reheat arrangement that does exist.** The **intercooled regenerative** cycle of a marine or submarine engine: two compression stages with a $30\ \mathrm{K}$ intercool, two expansion stages with a reheat, and a regenerator at $85\ \%$ effectiveness. At $r_p = 4$ per stage:
$$
T_{2} = 300 \times 4^{0.2857} = 445.8\ \mathrm{K}\ \text{after each stage, with intercooling back to } 300\ \mathrm{K}
$$
$$
w_c = 2 \times 1.005 \times \left( 445.8 - 300 \right) = 293.1\ \mathrm{kJ / kg} \quad \text{against} \quad 1.005 \times \left( 300 \times 16^{0.2857} - 300 \right) = 364.3\ \mathrm{kJ / kg}\ \text{in one stage}
$$
**The intercooling saves $71\ \mathrm{kJ / kg}$ of compression work** but throws $146.5\ \mathrm{kJ / kg}$ into the cooling water and delivers colder air to the combustor — which is why intercooling pays in efficiency only together with a regenerator that makes up that heat from the exhaust.
**The number that ends the argument.** A regenerated, intercooled, reheat gas turbine reaches **$45\ \%$** at a specific work of **$250\ \mathrm{kJ / kg}$**; a simple-cycle machine at $r_p = 21$ and $1{,}600\ {}^{\circ}\mathrm{C}$ reaches **$40\ \%$** at **$450\ \mathrm{kJ / kg}$**. **The regenerated machine is more efficient and half as powerful per kilogram of air**, and the reason aviation and heavy-duty machines are simple-cycle is that **specific work buys the machine and efficiency buys the fuel** — and a $100\ \mathrm{MW}$ plant's balance between the two is a $30$-year fuel contract.
:::

::: definition The combined cycle {#def-cc}
**The arithmetic, which is two cycles multiplied.**
$$
\eta_{\mathrm{CC}} = \eta_{\mathrm{GT}} + \eta_{\mathrm{ST}} \left( 1 - \eta_{\mathrm{GT}} \right)
$$
**The evaluation.** $\eta_{\mathrm{GT}} = 0.40$, and the steam cycle recovers $\eta_{\mathrm{ST}} = 0.33$ of the **remaining** $0.60$:
$$
\eta_{\mathrm{CC}} = 0.40 + 0.33 \times 0.60 = 0.598 = 59.8\ \%
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
\text{CCGT, condensing} & 59.8\ \% & 0 & 59.8\ \% \\
\text{CCGT, back-pressure, } 90\ {}^{\circ}\mathrm{C}\ \text{return} & 52\ \% & 38\ \% & 90\ \% \\
\text{CCGT + condensing heat pump on the return} & 47\ \% & 55\ \% & 102\ \%\ \text{(LHV basis)} \\
\text{Open cycle gas turbine} & 40\ \% & 0 & 40\ \%
\end{array}
$$
**The $102\ \%$ is not a violation.** A heat pump takes the condenser's low-temperature heat — which a condensing plant throws away — and lifts it into the heat network, so the useful heat plus power can exceed the fuel's LHV, just as a condensing boiler can exceed $100\ \%$ on an LHV basis. **The figure is legitimate and must always be reported with its basis**, and on an exergy basis it is far below $100\ \%$.
:::

::: definition The gas power cycles: Otto, Diesel, Stirling {#def-otto}
$$
\begin{array}{l l c}
\text{Cycle} & \text{Efficiency} & \text{At the stated data} \\
\text{Otto} & \eta = 1 - r^{1 - k} & r = 9{:}\ 1,\ k = 1.4 \ \Rightarrow\ 58.5\ \% \\
\text{Diesel} & \eta = 1 - \dfrac{1}{r^{k - 1}} \cdot \dfrac{r_c^{k} - 1}{k \left( r_c - 1 \right)} & r = 18{:}\ 1,\ r_c = 2.5\ \Rightarrow\ 60.9\ \% \\
\text{Dual / mixed} & \eta = 1 - \dfrac{1}{r^{k - 1}} \cdot \dfrac{\alpha \beta^{k} - 1}{\left( \alpha - 1 \right) + \alpha k \left( \beta - 1 \right)} & r = 18,\ \alpha = 1.6,\ \beta = 1.8\ \Rightarrow\ 65.2\ \% \\
\text{Stirling / Ericsson} & \eta = 1 - T_L / T_H & 1{,}273 / 300\ \Rightarrow\ 76.4\ \%
\end{array}
$$
**The Otto evaluation.** $\eta = 1 - 9^{-0.4} = 1 - 0.4152 = 58.5\ \%$.
**The Diesel evaluation.**
$$
\eta = 1 - \frac{1}{18^{0.4}} \times \frac{2.5^{1.4} - 1}{1.4 \times 1.5}
= 1 - 0.3147 \times \frac{3.607 - 1}{2.1} = 1 - 0.3147 \times 1.2414 = 60.9\ \%
$$
**The comparison at equal compression ratio, which is the honest one.** At $r = 9$ with a cutoff ratio $r_c = 4.2$:
$$
\eta_{\mathrm{Diesel}} = 1 - \frac{1}{9^{0.4}} \times \frac{4.2^{1.4} - 1}{1.4 \times 3.2} = 1 - 0.4152 \times 1.4418 = 40.1\ \%
$$
**against the Otto's $58.5\ \%$.** The Diesel is **worse at the same compression ratio** and better in the engine because it runs at $r = 18$ where the Otto cannot.
**The number that sets the compression ratio.** A spark-ignition engine's $r$ is set by the fuel's octane and the chamber's tendency to auto-ignite end-gas; $r = 10.5$ on $95$-octane fuel is near the practical ceiling, and **$r = 13$ with Miller-cycle early intake-valve closure** is the Atkinson/Miller trick that hybrid cars use: the **geometric** ratio is $13$ and the **effective** compression ratio is $9.5$, which avoids knock while the expansion still uses the full volume.
**The number that sets the Diesel's.** A compression-ignition engine's $r$ is set by the need to reach an ignition temperature at idle — $r = 16$ gives an ideal $T_2 = 300 \times 16^{0.4} = 909\ \mathrm{K}$, well above the roughly $500\ \mathrm{K}$ auto-ignition temperature of diesel fuel — and by the mechanical and friction penalty above $r = 22$. **The Diesel's efficiency advantage is a compression ratio, and hence a compression temperature, that the Otto cannot have without knocking.**
**The Stirling and Ericsson note.** Both are **Carnot** in efficiency when ideal and regenerated, and both have failed commercially for the same reason: the regenerator must be **$98\ \%$** effective and must not leak, and the heat exchangers must survive a cyclic gas-side temperature. **The thermodynamic ideal is achievable and the mechanical one is expensive**, which is the sentence that explains every closed-cycle engine that has ever been built and then abandoned.
:::

::: widget plot
f: 1-1/pow(x,0.2857); 1-(300/1400)*pow(x,0.2857)
x: 4, 30
y: 0, 0.75
labels: ideal Brayton efficiency; regenerated Brayton at T3 over T1 = 4.67
caption: The ideal Brayton efficiency against pressure ratio, $\eta = 1 - r_p^{-0.2857}$, together with the **regenerated** ideal cycle at $T_3 / T_1 = 4.67$, $\eta = 1 - \left( T_1 / T_3 \right) r_p^{0.2857}$. The Brayton curve rises steeply to about $r_p = 12$ and then flattens — going from $12$ to $30$ buys only $11$ points of efficiency — while the regenerated curve **falls** with pressure ratio, because a higher compression makes the delivery hotter and leaves less exhaust heat to recover. **The point where the two curves cross, at $r_p = 14.8$, is the crossover this lesson's warning is about.**
:::

## Worked cases

::: example A $600\ \mathrm{MW}$ supercritical station {#ex-usc}
Evaluate the cycle of a $600\ \mathrm{MW_e}$ double-reheat ultra-supercritical station: boiler at $31\ \mathrm{MPa}$ and $605\ {}^{\circ}\mathrm{C}$, two reheats to $613\ {}^{\circ}\mathrm{C}$ at $8.9$ and $3.7\ \mathrm{MPa}$, condenser at $4.8\ \mathrm{kPa}$, eight regeneration stages.
::: solution
**The state table.**
$$
\begin{array}{l c c c}
\text{Point} & P\ (\mathrm{MPa}) & h\ (\mathrm{kJ / kg}) & s\ (\mathrm{kJ / kg \cdot K}) \\
1 & 4.8\ \mathrm{kPa},\ \text{sat. liq.} & 134.7 & 0.4663 \\
2 & 31 & 171.4\ \left( \text{pumped, } \eta_p = 0.85 \right) & - \\
3 & 31,\ 605\ {}^{\circ}\mathrm{C} & 3{,}453.2 & 6.2319 \\
4 & 8.9 & 3{,}078.7 & 6.2319 \\
5 & 8.9,\ 613\ {}^{\circ}\mathrm{C} & 3{,}666.4 & 7.0022 \\
6 & 3.7 & 3{,}352.2 & 7.0022 \\
7 & 3.7,\ 613\ {}^{\circ}\mathrm{C} & 3{,}707.0 & 7.4425 \\
8 & 4.8\ \mathrm{kPa},\ x = 0.878 & 2{,}264.5 & 7.4425
\end{array}
$$
**The turbine work.**
$$
w_t = \left( 3{,}453.2 - 3{,}078.7 \right) + \left( 3{,}666.4 - 3{,}352.2 \right) + \left( 3{,}707.0 - 2{,}264.5 \right)
= 374.5 + 314.2 + 1{,}442.5 = 2{,}131.2\ \mathrm{kJ / kg}
$$
**The pump work.**
$$
w_p = 0.001005 \times 30{,}995 = 31.2\ \mathrm{kJ / kg} \quad \Rightarrow \quad 31.2 / 0.85 = 36.7\ \mathrm{kJ / kg}
$$
**The heat input, with the reheat.**
$$
q_{\mathrm{in}} = \left( 3{,}453.2 - 171.4 \right) + \left( 3{,}666.4 - 3{,}078.7 \right) + \left( 3{,}707.0 - 3{,}352.2 \right)
= 3{,}281.8 + 587.7 + 354.8 = 4{,}224.3\ \mathrm{kJ / kg}
$$
**The cycle efficiency without regeneration** (ideal turbine, real pump).
$$
\eta = \frac{2{,}131.2 - 36.7}{4{,}224.3} = 49.6\ \%
$$
against a Carnot limit of $1 - 305.3 / 878.2 = 65.2\ \%$.
**The regeneration's effect.** Eight feedwater heaters raising the feedwater to about $300\ {}^{\circ}\mathrm{C}$ add several points to the ideal figure, as in the heater table above; with real turbine efficiencies (about $90\ \%$), boiler efficiency (about $94\ \%$) and generator losses, such a station reaches roughly $50\ \%$ gross, and the auxiliary load — about **$4$ to $5\ \%$** of the gross output, mostly feed-pump drive and fans — brings it to about **$48\ \%$ net LHV**, the order of figure declared for the best double-reheat stations.
**The exhaust's heat.** At $48\ \%$ net the station burns $600 / 0.48 = 1{,}250\ \mathrm{MW}$ of fuel; about $6\ \%$ is lost from the boiler and the gross output is about $630\ \mathrm{MW}$, so the condenser rejects roughly
$$
\dot{Q}_{\mathrm{cond}} \approx 0.94 \times 1{,}250 - 630 \approx 545\ \mathrm{MW}
$$
**$545\ \mathrm{MW}$ of heat at $32\ {}^{\circ}\mathrm{C}$**, whose exergy against a $15\ {}^{\circ}\mathrm{C}$ environment is only $545 \times \left( 1 - 288 / 305 \right) = 30\ \mathrm{MW}$. **A heat pump lifting part of that heat to $80\ {}^{\circ}\mathrm{C}$ at a COP of about $3.5$ delivers $3.5\ \mathrm{MW}$ of district heat for each megawatt of electricity**, $2.5\ \mathrm{MW}$ of it drawn from the condenser.
*Sanity.* The second reheat is worth only about $1$ point of ideal efficiency ($49.6\ \%$ against $48.5\ \%$ with one reheat), because it adds only $355\ \mathrm{kJ / kg}$ — $8\ \%$ of the heat — although at a high mean temperature of $355 / 0.440 = 806\ \mathrm{K}$. The reason it is done is the **exit quality**: with one reheat the expansion would end at $x = 0.823$ at $4.8\ \mathrm{kPa}$, which no last-stage blade can live with, and with two it ends at $0.878$.
:::
:::

::: example A heavy-duty gas turbine and its combined cycle {#ex-ccgt}
An $\mathrm{H}$-class gas turbine has $r_p = 21$, $T_3 = 1{,}540\ {}^{\circ}\mathrm{C}$, $\eta_c = 0.90$, $\eta_t = 0.90$, an air flow of $600\ \mathrm{kg / s}$ and a mechanical loss of $1.5\ \%$. Evaluate its simple-cycle output and efficiency, and the combined cycle with a $12\ \mathrm{K}$-pinch HRSG and a $10.5\ \mathrm{MPa}$, $530\ {}^{\circ}\mathrm{C}$ steam cycle.
::: solution
**The compressor.**
$$
T_{2s} = 288 \times 21^{0.2857} = 288 \times 2.387 = 687.3\ \mathrm{K}, \qquad
\Delta T_c = \frac{399.3}{0.90} = 443.7\ \mathrm{K}
$$
$$
T_2 = 731.7\ \mathrm{K}, \qquad
\dot{W}_c = 600 \times 1.005 \times 443.7 = 267.6\ \mathrm{MW}
$$
**The turbine.**
$$
T_3 = 1{,}813\ \mathrm{K}, \qquad
T_{4s} = \frac{1{,}813}{2.387} = 759.7\ \mathrm{K}, \qquad
\Delta T_t = 0.90 \times 1{,}053.4 = 948.1\ \mathrm{K}
$$
$$
T_4 = 865.1\ \mathrm{K}, \qquad
\dot{W}_t = 600 \times 1.070 \times 948.1 = 608.7\ \mathrm{MW}
$$
**The $c_p$ of the combustion gas is $1.07$ against the air's $1.005$** because of the fuel's added mass and the dissociation products, and the $6.5\ \%$ difference is worth **$37\ \mathrm{MW}$** of turbine output.
**The simple cycle.**
$$
\dot{W}_{\mathrm{net}} = \left( 608.7 - 267.6 \right) \times 0.985 = 336.0\ \mathrm{MW}
$$
**The fuel.** With a combustor exit of $1{,}813\ \mathrm{K}$ and a delivery of $731.7\ \mathrm{K}$, and a combustor loss of $2\ \%$:
$$
\dot{m}_f = \frac{600 \times 1.070 \times \left( 1{,}813 - 731.7 \right)}{0.98 \times 49{,}800} = \frac{694{,}300}{48{,}804} = 14.23\ \mathrm{kg / s}
$$
$$
\dot{Q}_{\mathrm{in}} = 14.23 \times 49.8 = 708.5\ \mathrm{MW}, \qquad
\eta_{\mathrm{simple}} = \frac{336.0}{708.5} = 47.4\ \%
$$
**The exhaust.** $865.1\ \mathrm{K} = 592\ {}^{\circ}\mathrm{C}$, and the gas flow is $614.2\ \mathrm{kg / s}$. (Real H-class machines lose several points of this to blade cooling air, which this simple model ignores.)
**The HRSG.** Cooling the gas to a stack temperature of $100\ {}^{\circ}\mathrm{C}$:
$$
\dot{Q}_{\mathrm{HRSG}} = 614.2 \times 1.075 \times \left( 865.1 - 373.2 \right) = 324.8\ \mathrm{MW}
$$
**The steam cycle.** At $\eta_{\mathrm{ST}} = 0.34$ of the recovered heat:
$$
\dot{W}_{\mathrm{ST}} = 0.34 \times 324.8 = 110.4\ \mathrm{MW}
$$
**The combined cycle.**
$$
\dot{W}_{\mathrm{CC}} = 336.0 + 110.4 = 446.4\ \mathrm{MW}, \qquad
\eta_{\mathrm{CC}} = \frac{446.4}{708.5} = 63.0\ \%
$$
**The check against the formula.** $\eta_{\mathrm{CC}} = 0.474 + 0.34 \times 0.526 = 0.653$, against the $63.0\ \%$ computed — and the **$2.3$-point** difference is the HRSG's own losses, the stack's sensible heat above the dead state and the steam-cycle auxiliaries. **The formula is right and the plant is worse**, by $2$ to $3$ points, every time.
**The number that decides the plant.** The $110\ \mathrm{MW}$ from the HRSG costs about **$120\ \mathrm{million}$ currency units** and takes **$14$ months**; the $336\ \mathrm{MW}$ gas turbine costs **$210\ \mathrm{million}$** and takes **$9$ months**. **The steam bottoming cycle is the cheapest $110\ \mathrm{MW}$ of generation available**, which is why the combined cycle has displaced other thermal technologies for new gas-fired mid-merit and base-load generation.
*Sanity.* The simple-cycle efficiency is $47.4\ \%$ although $r_p = 21$ gives an ideal of $1 - 21^{-0.2857} = 58.1\ \%$, because the component efficiencies take it back down; the exhaust is at $592\ {}^{\circ}\mathrm{C}$ and not the isentropic $487\ {}^{\circ}\mathrm{C}$ because of the turbine's $90\ \%$ efficiency, and the extra $105\ \mathrm{K}$ of exhaust is worth about $614 \times 1.075 \times 105 \times 0.34 = 24\ \mathrm{MW}$ of steam-cycle output — which recovers part of what the turbine lost.
:::
:::

::: example Cogeneration {#ex-chp}
A steam plant supplies $45\ \mathrm{MW}$ of process heat at $1.6\ \mathrm{MPa}$ steam through a **back-pressure** turbine with **no** condenser. The boiler is at $6\ \mathrm{MPa}$, $500\ {}^{\circ}\mathrm{C}$, the fuel is gas at $49.8\ \mathrm{MJ / kg}$ and $\eta_{\mathrm{boiler}} = 0.89$, and the turbine's isentropic efficiency is $0.80$ with a mechanical-generator product of $0.965$.
::: solution
**The states.**
$$
h_3 = 3{,}423.1\ \mathrm{kJ / kg}, \quad s_3 = 6.8826
$$
At $1.6\ \mathrm{MPa}$ the saturated-vapour entropy is $s_g = 6.4200$, and since $s_3 > s_g$ the isentropic exit is **superheated**. Interpolating the superheated table at $s = 6.8826$ gives $T_{4s} \approx 299\ {}^{\circ}\mathrm{C}$ and $h_{4s} = 3{,}033.3$.
$$
h_4 = 3{,}423.1 - 0.80 \times \left( 3{,}423.1 - 3{,}033.3 \right) = 3{,}423.1 - 311.8 = 3{,}111.3\ \mathrm{kJ / kg}
$$
**The steam flow.** The process condenses the steam and returns condensate at $180\ {}^{\circ}\mathrm{C}$, $h = 763.05$:
$$
\dot{m} = \frac{45 \times 10^{3}}{3{,}111.3 - 763.05} = \frac{45{,}000}{2{,}348.3} = 19.16\ \mathrm{kg / s}
$$
**The power.**
$$
\dot{W} = 19.16 \times 311.8 \times 0.965 = 5{,}767\ \mathrm{kW} = 5.8\ \mathrm{MW}
$$
**The fuel.**
$$
\dot{Q}_{\mathrm{in}} = \frac{19.16 \times \left( 3{,}423.1 - 763.05 \right)}{0.89} = \frac{50{,}980}{0.89} = 57{,}280\ \mathrm{kW}, \qquad
\dot{m}_f = \frac{57.3}{49.8} = 1.150\ \mathrm{kg / s}
$$
**The efficiencies.**
$$
\eta_{\mathrm{el}} = \frac{5.8}{57.3} = 10.1\ \%, \qquad
\eta_{\mathrm{total}} = \frac{5.8 + 45.0}{57.3} = 88.6\ \%
$$
**The reading.** **The electricity is a $10\ \%$ by-product and the heat is a $79\ \%$ product**, and the plant is excellent — but only if the heat is used. **Shut the heat off and the plant is a $10\ \%$ power station**, which is worse than any condensing plant and the reason a back-pressure CHP must have a **heat-led** dispatch and not an electricity-led one.
**The exergy figures, which change the ranking.**
$$
\dot{X}_{\mathrm{fuel}} = 57.3 \times 1.037 = 59.4\ \mathrm{MW}
$$
Taking the process heat as delivered at the $201\ {}^{\circ}\mathrm{C}$ saturation temperature of $1.6\ \mathrm{MPa}$ steam:
$$
\zeta_{201} = 1 - \frac{298.15}{474.5} = 0.3717 \quad \Rightarrow \quad
\dot{X}_{\mathrm{heat}} = 45.0 \times 0.3717 = 16.7\ \mathrm{MW}
$$
$$
\eta_{\mathrm{II}} = \frac{5.8 + 16.7}{59.4} = 37.9\ \%
$$
**against a first-law $88.6\ \%$.** The $51$-point gap is the price of making $201\ {}^{\circ}\mathrm{C}$ heat from natural gas, and the way to close it is not a better boiler but a **gas engine or a gas turbine whose exhaust makes the steam**, which is exactly the arrangement of the next example.
**The comparison that decides the technology.**
$$
\begin{array}{l c c c c}
\text{Arrangement} & \eta_{\mathrm{I}} & \eta_{\mathrm{II}} & \text{Power} & \text{Heat} \\
\text{Back-pressure steam CHP} & 88.6\ \% & 37.9\ \% & 5.8 & 45.0 \\
\text{Gas engine + exhaust boiler} & 86\ \% & 44\ \% & 21.0 & 24.0 \\
\text{Gas turbine + HRSG (1 pressure)} & 84\ \% & 41\ \% & 19.0 & 27.0 \\
\text{Boiler alone for the heat, grid for the power} & 89\ \% & 21\ \% & 0 & 45.0
\end{array}
$$
**The gas engine wins on exergy and the back-pressure steam plant wins on robustness and on fuel flexibility**, and the reason a pulp mill, a refinery and a district-heating scheme each choose differently is that the **quality** of the heat, the **coincidence** of the heat and power loads and the **fuel price spread** differ more than the machines do.
*Sanity.* The reason the isentropic exit is superheated is that the boiler's $500\ {}^{\circ}\mathrm{C}$ is far above the $201\ {}^{\circ}\mathrm{C}$ saturation at $1.6\ \mathrm{MPa}$ and the pressure ratio is small, and the actual exhaust is at about $334\ {}^{\circ}\mathrm{C}$ because of the $80\ \%$ efficiency — so the process plant must **desuperheat** the steam with a spray, and the $130\ \mathrm{K}$ of superheat it removes is enthalpy that a better turbine would have turned into work.
:::
:::

::: example A binary geothermal plant {#ex-binary}
A binary geothermal plant uses isopentane with a brine supply at $145\ {}^{\circ}\mathrm{C}$ at $60\ \mathrm{kg / s}$, cooled to $75\ {}^{\circ}\mathrm{C}$. The organic fluid evaporates at $85\ {}^{\circ}\mathrm{C}$ and condenses at $40\ {}^{\circ}\mathrm{C}$, the turbine's isentropic efficiency is $0.82$ and the pump's $0.70$. Estimate the output and the second-law efficiency.
::: solution
**The heat available.**
$$
\dot{Q}_{\mathrm{in}} = 60 \times 4.30 \times \left( 145 - 75 \right) = 18{,}060\ \mathrm{kW}
$$
**The Carnot limit.** Between the brine's **mean** temperature of $110\ {}^{\circ}\mathrm{C}$ and the $40\ {}^{\circ}\mathrm{C}$ condenser:
$$
\eta_C = 1 - \frac{313.15}{383.15} = 18.3\ \%
$$
**The working-fluid cycle** (isopentane properties from a reference equation of state, so only differences matter). Saturated vapour at $85\ {}^{\circ}\mathrm{C}$ ($515\ \mathrm{kPa}$): $h_3 = 432.3$, $s_3 = 1.2390$. At $40\ {}^{\circ}\mathrm{C}$ ($151.5\ \mathrm{kPa}$): $h_f = 28.3$, $s_g = 1.1573$. Since $s_3 > s_g$, the isentropic expansion ends **superheated** — isopentane is a "dry" fluid — at
$$
h_{4s} = 388.1\ \mathrm{kJ / kg}\ \left( \approx 54\ {}^{\circ}\mathrm{C} \right), \qquad
w_t = 0.82 \times \left( 432.3 - 388.1 \right) = 36.2\ \mathrm{kJ / kg}
$$
**The pump.** $w_p = v \Delta P = 0.001668 \times 364 = 0.61\ \mathrm{kJ / kg}$, and at $\eta_p = 0.70$, $w_p = 0.87\ \mathrm{kJ / kg}$, so $h_2 = 29.2$.
**The organic flow.** All of the brine's heat goes to the organic fluid:
$$
\dot{m}_{\mathrm{org}} = \frac{18{,}060}{432.3 - 29.2} = \frac{18{,}060}{403.1} = 44.8\ \mathrm{kg / s}
$$
**The pinch check.** At the organic's bubble point ($h = 140.5$) the brine has cooled to $145 - 44.8 \times \left( 432.3 - 140.5 \right) / 258 = 94.3\ {}^{\circ}\mathrm{C}$, which is $9.3\ \mathrm{K}$ above the $85\ {}^{\circ}\mathrm{C}$ evaporation — an acceptable pinch. (An evaporation temperature of $100\ {}^{\circ}\mathrm{C}$ or more would be impossible with this brine cooled to $75\ {}^{\circ}\mathrm{C}$.)
**The output.**
$$
\dot{W} = 44.8 \times \left( 36.2 - 0.87 \right) = 1{,}583\ \mathrm{kW}
$$
less the condenser fans and the injection pumps, which total **$430\ \mathrm{kW}$**:
$$
\dot{W}_{\mathrm{net}} = 1{,}153\ \mathrm{kW}
$$
**The efficiencies.**
$$
\eta_{\mathrm{I}} = \frac{1{,}153}{18{,}060} = 6.4\ \%, \qquad
\eta_{\mathrm{II}} = \frac{1{,}153}{\dot{X}_{\mathrm{brine}}}
$$
**The brine's exergy**, at $T_1 = 418.15\ \mathrm{K}$ against $T_0 = 298.15\ \mathrm{K}$:
$$
\dot{X}_{\mathrm{brine}} = \dot{m} c \left[ \left( T_1 - T_0 \right) - T_0 \ln \frac{T_1}{T_0} \right]
= 258 \left[ 120 - 298.15 \ln \frac{418.15}{298.15} \right] = 258 \times 19.15 = 4{,}941\ \mathrm{kW}
$$
$$
\eta_{\mathrm{II}} = \frac{1{,}153}{4{,}941} = 23.3\ \%
$$
**The reading.** **The plant converts $6.4\ \%$ of the brine's heat and $23\ \%$ of its exergy**, and the reason the second-law figure is higher is that heat at $145\ {}^{\circ}\mathrm{C}$ and below is low-grade: the brine's exergy is only $27\ \%$ of its heat above $25\ {}^{\circ}\mathrm{C}$.
**The number that decides the field.** The brine reinjected at $75\ {}^{\circ}\mathrm{C}$ still carries $258 \left[ 50 - 298.15 \ln \left( 348.15 / 298.15 \right) \right] = 974\ \mathrm{kW}$ — $20\ \%$ of the brine's exergy — and most of the rest is destroyed in the evaporator, where brine falling from $145$ to $75\ {}^{\circ}\mathrm{C}$ heats a fluid that boils at a single $85\ {}^{\circ}\mathrm{C}$, and in the auxiliaries. A **second, lower-temperature stage** on the same brine, or a supercritical or zeotropic-mixture cycle that follows the brine's cooling curve more closely, recovers part of it.
**The reason binary cycles are used at all.** At $145\ {}^{\circ}\mathrm{C}$ a flash plant would flash only a few per cent of the brine to low-pressure steam; a binary plant keeps the brine **in a closed loop** under pressure, which limits scaling and gas release, and it is the usual choice for medium-temperature resources.
*Sanity.* The plant's efficiency is $6.4\ \%$ (gross $8.8\ \%$) against a Carnot limit of $18.3\ \%$ because the fluid boils at $85\ {}^{\circ}\mathrm{C}$, $25\ \mathrm{K}$ below the brine's mean temperature, the turbine is $82\ \%$ efficient, and the auxiliaries take $27\ \%$ of the gross output — a typical figure for an air-cooled binary plant.
:::
:::

::: history
**The Rankine cycle** is named after **W. J. M. Rankine**, whose **1859** *Manual of the Steam Engine and Other Prime Movers* gave the thermodynamic analysis of the steam plant — a description of machinery, with Watt's separate condenser of **1769**, that was already in service. **The steam turbine** is **Charles Parsons**'s **1884** multistage reaction machine and **Gustaf de Laval**'s single-stage impulse machine of the **1880s**; the large turbines that followed are multistage, of the impulse or reaction type or both. **The Brayton cycle** is named after **George Brayton**, whose **1872** patent was for a **piston** engine; it became a practical gas turbine only in the twentieth century — **Aegidius Elling**'s machine of **1903** was among the first to deliver net power, **Brown Boveri** commissioned the first utility gas turbine at Neuchâtel in **1939**, and **Frank Whittle** and **Hans von Ohain** ran the first jet engines in **1937**. **Combined cycles** began with gas-turbine exhaust used for feedwater heating at the **Belle Isle** station in Oklahoma in **1949**; plants with heat-recovery boilers spread from the **1970s**, and today's $60\ \%$-plus plants came with the $\mathrm{F}$-class turbines of the late **1980s** and the $\mathrm{H}$/$\mathrm{J}$-class machines of the **2010s**. **Regenerative feed heating** became standard practice in large power stations in the **1920s**. **The supercritical once-through boiler** goes back to **Mark Benson**'s patent of **1922**, and the first commercial supercritical unit was **Philo 6** in Ohio in **1957**. **The $700\ {}^{\circ}\mathrm{C}$ programmes** — Europe's AD700 from **1998**, and later programmes in the United States, Japan, China and India — have qualified nickel alloys such as 617 and 740H, but as of the mid-2020s no commercial $700\ {}^{\circ}\mathrm{C}$ plant has been built: **a thermodynamic idea held back by a materials bill.**
:::

## Where this leads

The cycles here are the idealisations that [[thermodynamics/mixtures-combustion]] complicates by adding chemistry, that [[thermodynamics/exergy]] re-ranks by destroyed work, and that [[heat-transfer]] and [[machine-design]] turn into boilers, HRSGs, blades and bearings. The property data throughout is [[thermodynamics/pure-substances]] and the limits are [[thermodynamics/second-law]].

::: summary
- A cycle's improvement is always one of two sentences: raise the mean temperature of heat addition or lower the mean temperature of rejection.
- The Rankine cycle's pump work is $0.44\ \%$ of the turbine work because the fluid is liquid at the compressor inlet, which is the whole of its practical advantage.
- Reheat exists mainly for the exit quality and regeneration for the mean temperature of addition; each is worth about two points in a simple cycle.
- The ideal Brayton efficiency depends only on pressure ratio, and its back-work ratio reaches $44\ \%$ at $r_p = 12$ — the compressor is nearly half the machine.
- A regenerator helps only below a crossover pressure ratio ($14.8$ ideal, about $17$ with $85\ \%$ components at $T_3 / T_1 = 4.67$); heavy-duty gas turbines omit it because their exhaust raises steam in a combined cycle instead.
- A combined cycle adds twenty points of efficiency from the gas turbine's exhaust, and its real variable is the HRSG's pinch, not its steam pressure.
- A Diesel cycle is less efficient than an Otto at the same compression ratio and more efficient in an engine, because it can run at $r = 18$.
- A back-pressure CHP reports $88.6\ \%$ on energy and $37.9\ \%$ on exergy, and the second figure is the one that ranks the alternatives.
:::

::: quiz
A gas turbine's pressure ratio is raised well above the crossover value. What happens to a regenerator's benefit?
- [ ] It increases, because the exhaust is hotter
- [x] It vanishes, because the compressor delivery becomes hotter than the turbine exhaust
- [ ] It is unchanged, because regeneration depends only on $T_3 / T_1$
- [ ] It increases, because the mass flow rises
::: solution
A regenerator transfers heat from the exhaust to the compressed air, and it can only do so while $T_4 > T_2$. Since $T_2 = T_1 r_p^{(k-1)/k}$ rises with pressure ratio while $T_4 = T_3 r_p^{-(k-1)/k}$ falls, the two curves meet at $r_{p,\mathrm{crit}} = (T_3 / T_1)^{k / [2(k - 1)]}$, which is $14.8$ for $T_3 / T_1 = 4.67$ and about $17$ with $85\ \%$ component efficiencies. **Above the crossover the regenerator would have to move heat from a cold stream to a hot one**, and it becomes a pressure drop with no benefit.
:::
:::

## Exercises

::: exercise Pump work {level=1 check="6.05"}
Give the pump work in kilojoules per kilogram for water with $v = 0.001010$ pumped from $10\ \mathrm{kPa}$ to $6\ \mathrm{MPa}$.
::: solution
$w_p = 0.001010 \times 5990 = 6.05\ \mathrm{kJ / kg}$.
:::
:::

::: exercise Brayton {level=1 check="0.482"}
Give the ideal Brayton efficiency at $r_p = 10$ with $k = 1.4$.
::: solution
$10^{0.2857} = 1.931$, so $\eta = 1 - 1 / 1.931 = 0.482$.
:::
:::

::: exercise Otto {level=1 check="0.585"}
Give the air-standard Otto efficiency at $r = 9$ and $k = 1.4$.
::: solution
$\eta = 1 - 9^{-0.4} = 1 - 0.4152 = 0.585$.
:::
:::

::: exercise Combined {level=1 check="0.598"}
Give the combined-cycle efficiency for $\eta_{\mathrm{GT}} = 0.40$ and $\eta_{\mathrm{ST}} = 0.33$ on the residual heat.
::: solution
$0.40 + 0.33 \times 0.60 = 0.598$.
:::
:::

::: exercise Reheat {level=1 check="0.984"}
Give the turbine-exit quality after reheating to $600\ {}^{\circ}\mathrm{C}$ at $1\ \mathrm{MPa}$ ($s = 8.0311\ \mathrm{kJ / kg \cdot K}$) and expanding isentropically to $10\ \mathrm{kPa}$.
::: solution
$x = (8.0311 - 0.6492) / 7.4996 = 0.984$.
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
h_3 = 3{,}331.2, \quad s_3 = 6.9386; \qquad
x_{4s} = \frac{6.9386 - 0.8320}{7.0752} = 0.8631
$$
$$
h_4 = 251.42 + 0.8631 \times 2{,}357.5 = 2{,}286.2, \qquad
w_t = 3{,}331.2 - 2{,}286.2 = 1{,}045.0\ \mathrm{kJ / kg}
$$
$$
q_{\mathrm{in}} = 3{,}331.2 - 255.47 = 3{,}075.7, \qquad
\eta = \frac{1{,}045.0 - 4.05}{3{,}075.7} = 33.8\ \%
$$
*Sanity.* The pump work is $0.39\ \%$ of the turbine work, and the cycle is $6.1$ points below the $6\ \mathrm{MPa}$, $600\ {}^{\circ}\mathrm{C}$, $10\ \mathrm{kPa}$ cycle of the text because all three of its parameters are less favourable: the lower boiler pressure and temperature lower $\bar{T}_{\mathrm{in}}$, and the higher condenser pressure raises $T_{\mathrm{out}}$ from $46$ to $60\ {}^{\circ}\mathrm{C}$.
:::
:::

::: exercise Diesel {level=2}
An air-standard Diesel cycle has $r = 20$ and a cutoff of $2.2$. Give the efficiency and the mean effective pressure if $P_1 = 100\ \mathrm{kPa}$.
::: solution
$$
\eta = 1 - \frac{1}{20^{0.4}} \times \frac{2.2^{1.4} - 1}{1.4 \times 1.2}
= 1 - 0.3017 \times \frac{3.016 - 1}{1.68} = 1 - 0.3017 \times 1.2000 = 63.8\ \%
$$
$$
T_2 = 300 \times 20^{0.4} = 994.3\ \mathrm{K}, \qquad
T_3 = 2.2 \times 994.3 = 2{,}187.5\ \mathrm{K}
$$
$$
T_4 = T_3 \left( \frac{r_c}{r} \right)^{k - 1} = 2{,}187.5 \times \left( \frac{2.2}{20} \right)^{0.4} = 2{,}187.5 \times 0.4136 = 904.7\ \mathrm{K}
$$
$$
w_{\mathrm{net}} = q_{\mathrm{in}} \eta = 1.005 \times \left( 2{,}187.5 - 994.3 \right) \times 0.638 = 765.0\ \mathrm{kJ / kg}
$$
$$
v_1 = \frac{0.287 \times 300}{100} = 0.861\ \mathrm{m^{3} / kg}, \qquad
\mathrm{mep} = \frac{w_{\mathrm{net}}}{v_1 \left( 1 - 1 / r \right)} = \frac{765.0}{0.861 \times 0.95} = 935\ \mathrm{kPa}
$$
*Sanity.* The check is $q_{\mathrm{out}} = c_v \left( T_4 - T_1 \right) = 0.718 \times 604.7 = 434.2$ and $1{,}199.2 - 434.2 = 765.0\ \mathrm{kJ / kg}$. A mean effective pressure of $9.4\ \mathrm{bar}$ is **low** for a diesel engine, where $18$ to $24\ \mathrm{bar}$ is normal — and the reason is that the air-standard cycle's $q_{\mathrm{in}}$ is limited by the $T_3$ of $2{,}188\ \mathrm{K}$, while a real engine runs to $2{,}400\ \mathrm{K}$ **and** uses a turbocharger to raise $P_1$ above $2\ \mathrm{bar}$. **The mean effective pressure is a measure of the charge density and not of the cycle**, which is why the whole of the diesel industry's efficiency gain in thirty years has come from turbocharging and injection pressure and almost none from the cycle.
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
**The reading.** The critical ratio for regeneration is **the same expression** as the pressure ratio for maximum net work, and the reason is that both are statements that $T_4 = T_2$. **With $85\ \%$ component efficiencies the crossover moves to about $17$**, because the real exhaust is hotter.
**The Rankine reheat condition.** Let the cycle add heat at enthalpy rise $q_1 = h_3 - h_2$ with an entropy rise $\Delta s_1$, and let the reheat add $q_r = h_5 - h_4$ with an entropy rise $\Delta s_r$. The efficiency rises if the **marginal** heat's efficiency exceeds the cycle's:
$$
1 - \frac{\bar{T}_{\mathrm{out}}}{\bar{T}_{r}} > 1 - \frac{\bar{T}_{\mathrm{out}}}{\bar{T}_{\mathrm{in, base}}}
$$
since all the heat, base and reheat, is rejected at the same condenser temperature. This is
$$
\boxed{ \bar{T}_{r} > \bar{T}_{\mathrm{in, base}} }
$$
**The evaluation.** A $6\ \mathrm{MPa}$, $600\ {}^{\circ}\mathrm{C}$ cycle has $\bar{T}_{\mathrm{in}} = 531\ \mathrm{K} = 258\ {}^{\circ}\mathrm{C}$, and a reheat at $1\ \mathrm{MPa}$ from $3{,}077.5$ to $3{,}698.6$ has $\bar{T}_r = 621.1 / \left( 8.0311 - 7.1693 \right) = 721\ \mathrm{K}$ — **well above**, so the reheat helps, by $2.4$ points. **At a reheat pressure of $4\ \mathrm{MPa}$** the mean reheat temperature is higher, $836\ \mathrm{K}$, but the reheat heat is small and the gain only $1.0$ point; **at $0.4\ \mathrm{MPa}$** it is $655\ \mathrm{K}$ and the gain $2.0$ points. The condition says **whether** a reheat helps; how **much** depends also on how much heat it adds.
**The rule.** **Reheat at roughly $15$ to $25\ \%$ of the boiler pressure and to the initial temperature**, which puts the reheat's mean temperature well above the cycle's and makes the gain $1.5$ to $2.5$ points.
*Sanity.* Reheat **adds** heat at a high temperature while regeneration **removes** the need for heat at a low one; in this cycle the two are worth about the same — $2.4$ points for the first feedwater heater, $2.4$ for the reheat at $1\ \mathrm{MPa}$ — but the heater is a vessel and some pipes while the reheat is an extra boiler pass and turbine casing, which is why every steam plant regenerates and only large ones reheat.
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
