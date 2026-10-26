Materials selection is not a search for the best material. It is a search for the **material that best meets the objective while satisfying every constraint**, and much of the search is mechanical: write the objective as an equation, eliminate the variables the design does not control, and rank the survivors on a **property chart**. Done properly it eliminates most of the materials in existence before any judgement is exercised; done improperly it is a vote for the material the department has always used.

The method's central step is one algebraic move. The **objective** (mass, cost, volume, embodied energy) is written in terms of a **free** variable the designer chooses (the section, the wall thickness) and a **fixed** requirement (the stiffness, the strength, the heat flux). The free variable is eliminated using the **constraint**, and what remains is a group of material properties called the **material index**. Maximising the index ranks the materials, and the ranking is **independent of the size of the part** — which is why a chart drawn once serves every beam and every panel of the same type.

::: warning Seven ways a selection goes wrong
**Ranking on the wrong index.** Ranking a stiffness-limited panel on $E / \rho$ instead of $E^{1/3} / \rho$ makes steel, titanium, aluminium and magnesium look equal (all about $26\ \mathrm{MN\, m / kg}$), when on the correct index magnesium beats aluminium, which beats titanium and steel by a wide margin. **Derive the index for the loading and the free variable; do not look it up blindly.** **Ignoring a screening constraint.** The material with the best index is chosen and then fails a constraint — maximum service temperature, corrosion, fire, a food-contact regulation — that was never written down. **Screen before you rank**, and write every constraint down first. **Selecting a material and not a process.** A 6061-T6 extrusion and the same extrusion after welding are different materials, because the weld's heat-affected zone loses much of the T6 strength; an autoclave-cured CFRP part and a resin-infused one differ in void content and compression strength. The specification is "material, temper, process and inspection class". **Using the handbook value and not the design value.** A handbook quotes a typical value at room temperature on a laboratory specimen. The design value is a **statistically based** minimum, at the **service temperature**, in the **service environment**, on the **as-manufactured** detail. **Optimising mass when cost is the objective.** A $60\ \%$ mass saving at a $400\ \%$ cost increase can be a good engineering result and a bad product; if cost matters, it must be in the objective. **Ignoring the exchange rate.** Trading mass against cost needs the **value of a kilogram saved**, which differs by orders of magnitude between a building, a car, an airliner and a launch vehicle; a designer who has not been given that number has not been given the problem. **Not checking the second constraint.** Real components have several constraints, and the optimum for one is often poor on another: a high-strength steel chosen for strength may fail the toughness requirement, and a good thermal insulator is usually a poor choice where thermal shock matters.
:::

## The method

::: definition Translate, screen, rank, document {#def-method}
**Translate.** Write the **function** ("carry a bending moment without yielding or deflecting too much"), the **constraints** ("stiffness $EI \ge 12\ \mathrm{kN\, m^{2}}$, span $2\ \mathrm{m}$, cost under $\$40$, non-flammable, usable at $80\ {}^{\circ}\mathrm{C}$"), the **objective** ("minimum mass") and the **free variables** ("the section size and the material").
**Screen.** Apply every constraint as a **filter** and eliminate. A service temperature of $80\ {}^{\circ}\mathrm{C}$ eliminates the low-temperature commodity polymers (polyethylene, PVC, polystyrene); a fracture-toughness floor of $20\ \mathrm{MPa\, m^{1/2}}$ eliminates ceramics, glasses and unreinforced polymers; a cost ceiling of $\$2$ per kilogram eliminates titanium, nickel alloys and carbon-fibre composites. On a property chart a screen is a horizontal or vertical line — a limit on one property.
**Rank.** Derive the index and draw lines of constant index on the chart. Because the charts are logarithmic, every index of the form $E^{a} / \rho$ plots as a straight line of slope $1/a$ on a chart of $E$ against $\rho$; the ranking is the order in which a line of that slope, moved across the chart, meets the surviving materials.
**Document.** State the material, the **temper or specification**, the **process**, the **inspection class**, the **design allowables** with their basis, and the **environmental limits**. A selection that cannot be audited is not complete.
$$
\begin{array}{l l l}
\text{Objective} & \text{Depends on} & \text{Index form} \\
\text{Mass} & \rho \text{ and the constraining property} & M = f(\text{property}) / \rho \\
\text{Material cost} & C_m \rho \text{ and the property} & M = f(\text{property}) / (C_m \rho) \\
\text{Volume} & \text{the property only} & M = f(\text{property}) \\
\text{Embodied energy} & H_m \rho \text{ and the property} & M = f(\text{property}) / (H_m \rho)
\end{array}
$$
Here $C_m$ is the material cost per kilogram and $H_m$ the embodied energy per kilogram; $C_m$ is often the term that changes the answer most.
:::

::: definition The indices {#def-indices}
For a **tie-rod** of length $L$ carrying a tension $F$ with free cross-sectional area $A$:
$$
\text{stiffness (extension } \delta\text{): } m = \frac{F L^{2} \rho}{E \delta} \ \Rightarrow\ M = \frac{E}{\rho}; \qquad
\text{strength: } m = \frac{F L \rho}{\sigma_y} \ \Rightarrow\ M = \frac{\sigma_y}{\rho} .
$$
For a **panel** of width $b$ and length $L$ loaded in bending, with the thickness $t$ free:
$$
\text{stiffness: } M = \frac{E^{1 / 3}}{ \rho}; \qquad
\text{strength: } M = \frac{\sigma_y^{1 / 2}}{\rho}; \qquad
\text{buckling: } M = \frac{E^{1 / 3}}{\rho} .
$$
For a **beam or column of solid round (or any fixed-shape) section**, with the size free:
$$
\text{stiffness: } M = \frac{E^{1 / 2}}{\rho}; \qquad
\text{strength: } M = \frac{\sigma_y^{2 / 3}}{\rho}; \qquad
\text{buckling: } M = \frac{E^{1 / 2}}{\rho} .
$$
For a **torsion bar** of free radius, torsional stiffness at minimum mass gives $M = G^{1/2}/\rho$, and maximum stored elastic energy per unit mass gives $M = \tau_f^{2} / (G \rho)$; the energy stored per unit volume of a spring material in uniform tension is $U_r = \sigma_f^{2} / (2 E)$.
For **thermal** design:
$$
\text{largest sudden quench without fracture: } M = \frac{\sigma_f}{E \alpha}; \qquad
\text{largest steady heat flux without fracture: } M = \frac{k \sigma_f}{E \alpha}; \qquad
\text{lightest optimum-fin heat sink: } M = \frac{k}{\rho} .
$$
For **creep**: $M = \sigma_R / \rho$, where $\sigma_R$ is the stress for the design rupture life at the design temperature. For **damage tolerance**: $K_{Ic}$, or $K_{Ic} / \sigma_y$ when the critical crack size matters.
**The exponents carry the message.** The smaller the exponent on the property, the more the density dominates and the more a light material wins: on $E^{1/3} / \rho$ a material four times lighter can be $64$ times less stiff and still break even. For a tie, the shape of the cross-section does not matter — only its area — whereas for beams and panels the **shape** (tubes, I-sections, sandwiches) multiplies the efficiency of any material.
:::

::: widget plot
f: 5.13; 3.29; 2.38; 2.09; 2.01; 1.83; 1.62; 1.57; 1.51; 1.50; 1.47; 1.24; 1.22; 1.10; 0.75; 0.74; 0.72; 0.55
x: 1, 16
labels: spruce; CFRP unidirectional; CFRP quasi-iso; silicon nitride; magnesium AZ31; alumina; GFRP; Al-Li 2195; Al 1100; 2024-T3; 7075-T651; nylon 66; concrete; Ti-6Al-4V; mild steel; 17-4PH; 304 SS; copper
caption: The panel-stiffness index $E^{1/3} / \rho$, with $E$ in GPa and $\rho$ in $\mathrm{Mg / m^{3}}$, drawn as one horizontal line per material. Notice that spruce (loaded along the grain) at $5.1$ is more than three times as good as any aluminium alloy, that every metal lies between $0.55$ (copper) and $2.0$ (magnesium), and that steel, stainless and titanium cluster near $0.7$ to $1.1$. The composites and magnesium occupy the $2$ to $3.3$ band that makes them attractive for light, stiff panels.
:::

## The property charts and what they say

::: definition The modulus-density chart {#def-chart-em}
On a log-log chart of $E$ against $\rho$ a line of constant $E / \rho$ has slope 1, a line of constant $E^{1/2} / \rho$ (beams) slope 2, and a line of constant $E^{1/3} / \rho$ (panels) slope 3. Three facts fall out of the chart.
**The common structural metals lie close to one line of slope 1.** Steel ($207 / 7.85$), aluminium ($73 / 2.78$), titanium ($114 / 4.43$) and magnesium ($45 / 1.77$) all have $E / \rho \approx 25$ to $26\ \mathrm{MN\, m / kg}$ (copper, at $13$, is an exception). **No substitution among these metals buys tensile stiffness per kilogram**; only a beam or panel index, or a better shape, separates them.
**Polymers are far softer but only moderately lighter.** Their moduli are $0.01$ to about $3\ \mathrm{GPa}$, two to four decades below steel's, while their densities are only about six times lower. They are rarely a stiffness substitution and are often chosen for **compliance** — a living hinge, a seal, a clip.
**Technical ceramics and carbon fibre composites lie above the metals.** Alumina ($E / \rho \approx 97$) and unidirectional CFRP ($\approx 89$, along the fibres) beat the metals on stiffness for weight, for different reasons: the ceramic because its bonds are stiff and its atoms light, the fibre because the in-plane $\mathrm{sp^{2}}$ bonds of graphitic carbon are among the stiffest known. The ceramic is limited by its toughness of about $3$ to $4\ \mathrm{MPa\, m^{1/2}}$; the fibre is usable because the matrix and the fibre-matrix interface give the composite a toughness the fibre alone does not have.
:::

::: definition The strength-toughness chart {#def-chart-sykc}
Across all materials, strength and toughness both rise from polymers to metals; but **within a family**, notably the high-strength steels and aluminium alloys, the alloys and tempers fall on a **band of negative slope**: raising the strength by alloying or heat treatment lowers the toughness. Indicative values:
$$
\begin{array}{l c c l}
\text{Material} & \sigma_y\ [\mathrm{MPa}] & K_{Ic}\ [\mathrm{MPa\, m^{1/2}}] & \text{Remark} \\
\text{Alumina} & \approx 300\ (\text{flexural}) & 3\text{–}4 & \text{strong, brittle} \\
\text{7075-T651} & \approx 500 & \approx 25\text{–}29 & \text{the aerospace compromise} \\
\text{Ti-6Al-4V} & \approx 880 & \approx 55\text{–}75 & \\
\text{17-4PH H900} & \approx 1{,}200 & \approx 50 & \text{strong, modest toughness} \\
\text{AerMet 100} & \approx 1{,}720 & \approx 125 & \text{an exceptional combination} \\
\text{Maraging 350} & \approx 2{,}400 & \approx 35\text{–}50 & \text{near the strength ceiling} \\
\text{Mild steel (upper shelf)} & \approx 250 & > 100 & \text{tough, but ductile-brittle transition} \\
\text{Austenitic stainless} & \approx 200\text{–}300 & > 100 & \text{remains tough at cryogenic temperature} \\
\text{Elastomers} & \text{a few} & \approx 0.1\text{–}0.5 & \text{low } K_{Ic} \text{ but high } G_c = K_{Ic}^{2}/E
\end{array}
$$
**The chart's message is that the choice along the band is a damage-tolerance decision.** The critical edge-crack depth at the yield stress, $a_c \approx \frac{1}{\pi} \left( \frac{K_{Ic}}{1.12\, \sigma_y} \right)^{2}$, is $1.3\ \mathrm{mm}$ for a $1{,}720\ \mathrm{MPa}$ steel with $K_{Ic} = 125$ and $160\ \mathrm{mm}$ for a $250\ \mathrm{MPa}$ steel with $K_{Ic} = 200$. Whether the stronger material can be used depends on whether the inspection regime can find cracks of the smaller size.
:::

::: definition Cost, embodied energy and the exchange rate {#def-cost}
Indicative values — orders of magnitude only: prices move with markets, and embodied energy and $\mathrm{CO_2}$ (for primary production) depend on the production route and the database used:
$$
\begin{array}{l c c c}
\text{Material} & \text{Cost}\ [\$/\mathrm{kg}] & \text{Embodied energy}\ [\mathrm{MJ / kg}] & \mathrm{CO_2}\ [\mathrm{kg / kg}] \\
\text{Concrete} & \approx 0.1 & \approx 1 & \approx 0.1 \\
\text{Mild steel} & \approx 0.9 & \approx 30 & \approx 2 \\
\text{Low-alloy steel (4140)} & \approx 1.5 & \approx 35 & \approx 2.2 \\
\text{Nylon 66} & \approx 4 & \approx 120 & \approx 6 \\
\text{Magnesium AZ31} & \approx 3.5 & \approx 350 & \approx 20\text{–}40 \\
\text{304 stainless} & \approx 5 & \approx 80 & \approx 5 \\
\text{Aluminium alloys (primary)} & \approx 3\text{–}6 & \approx 200 & \approx 12 \\
\text{Copper} & \approx 9 & \approx 60 & \approx 4 \\
\text{Ti-6Al-4V} & \approx 20 & \approx 700 & \approx 40 \\
\text{Nickel superalloys} & \approx 25 & \approx 250 & \approx 15 \\
\text{CFRP} & \approx 50 & \approx 300\text{–}800 & \approx 20\text{–}50
\end{array}
$$
**The exchange rate — the value of a kilogram saved — decides mass-cost trades.** Its basis differs by application:
$$
\begin{array}{l c l}
\text{Application} & \text{Value of 1 kg saved} & \text{Basis} \\
\text{Building, bridge} & \text{less than the material cost} & \text{material only} \\
\text{Passenger car} & \approx \$5\text{–}10 & \approx 0.35\ \mathrm{L} / 100\ \mathrm{km} \text{ per } 100\ \mathrm{kg} \text{ over } 200{,}000\ \mathrm{km} \\
\text{Truck} & \text{tens of dollars} & \text{fuel plus payload over the life} \\
\text{Airliner} & \text{hundreds to about } \$1{,}000 & \text{fuel and payload over a } 20\text{–}25 \text{ year life} \\
\text{Launch vehicle, payload to orbit} & \text{thousands to tens of thousands} & \text{launch price per kg (as of 2026)}
\end{array}
$$
**The consequence is the most useful result of this lesson.** A material premium of tens of dollars per kilogram saved is recovered many times over in an airliner and not at all in a car. **The same chart, the same part and the same analysis give opposite answers in two industries**, and the designer's job is to know the exchange rate before starting.
:::

::: example A stiffness-limited panel at two exchange rates {#ex-panel-sel}
A $1{,}200 \times 600\ \mathrm{mm}$ steel panel $3\ \mathrm{mm}$ thick is to be replaced by one of the same bending stiffness. Evaluate 2024-T3 aluminium, magnesium AZ31 and a quasi-isotropic CFRP, using material costs of $\$0.9$, $\$5$, $\$3.5$ and $\$50$ per kilogram, and give the answer for a car and for an airliner.
::: solution
**The requirement.** The bending stiffness across the $0.6\ \mathrm{m}$ width is $E I = E_{\mathrm{st}} b t^{3} / 12 = 207 \times 10^{9} \times 0.6 \times 0.003^{3} / 12 = 279\ \mathrm{N\, m^{2}}$, and must be matched. The steel panel's mass is $7{,}850 \times 1.2 \times 0.6 \times 0.003 = 17.0\ \mathrm{kg}$.
**The thickness and mass of each substitute.** Equal $E t^{3}$ gives $t = t_{\mathrm{st}} \left( E_{\mathrm{st}} / E \right)^{1 / 3}$, and $m = \rho t \times 0.72\ \mathrm{m^{2}}$:
$$
\begin{array}{l c c c c c c}
\text{Material} & E\ [\mathrm{GPa}] & \rho\ [\mathrm{kg/m^3}] & t\ [\mathrm{mm}] & \rho t\ [\mathrm{kg / m^{2}}] & m\ [\mathrm{kg}] & \text{Cost}\ [\$] \\
\text{Steel} & 207 & 7{,}850 & 3.00 & 23.6 & 17.0 & 15.3 \\
\text{2024-T3} & 73 & 2{,}780 & 4.25 & 11.8 & 8.5 & 42.5 \\
\text{Mg AZ31} & 45 & 1{,}770 & 4.99 & 8.8 & 6.4 & 22.3 \\
\text{CFRP quasi-iso} & 50 & 1{,}550 & 4.82 & 7.5 & 5.4 & 269
\end{array}
$$
**The trade-off.** The mass saved and the material cost of saving it:
$$
\begin{array}{l c c c}
\text{Substitute} & \Delta m\ [\mathrm{kg}] & \Delta C\ [\$] & \text{Cost of a kilogram saved} \\
\text{2024-T3} & 8.5 & + 27 & \$3.2 / \mathrm{kg} \\
\text{Mg AZ31} & 10.6 & + 7 & \$0.66 / \mathrm{kg} \\
\text{CFRP} & 11.6 & + 254 & \$22 / \mathrm{kg}
\end{array}
$$
**The verdict.** In a **car**, at roughly $\$5$ to $\$10$ per kilogram saved, magnesium at $\$0.66$ is a clear win and aluminium at $\$3.2$ a modest one; CFRP at $\$22$ **loses**. In an **airliner**, at hundreds of dollars per kilogram, all three pay — but CFRP must then also meet damage-tolerance, lightning-strike and repairability requirements that cost more than the material. (Processing costs, ignored here, narrow the margins further.)
**The one the index does not show.** The magnesium panel is $66\ \%$ thicker. If the thickness is not truly free — a floor that eats cabin volume, a joint that must change — or if magnesium's fire behaviour and corrosion are constraints, a screen eliminates it, and the index never had anything to say about that.

*Check.* The aluminium panel's $E t^{3} = 73 \times 4.25^{3} = 5{,}604$ against steel's $207 \times 27 = 5{,}589$ — matched to $0.3\ \%$ (the residue is rounding of $t$). $\checkmark$

*Sanity.* Shape can beat substitution. A sandwich of two $0.3\ \mathrm{mm}$ steel skins on a balsa core ($150\ \mathrm{kg/m^3}$) matches the stiffness when the skin centres are $3.9\ \mathrm{mm}$ apart ($E_f t_f d^{2} / 2 = E t^{3}/12$ per unit width), at a mass of $(2 \times 0.3 \times 10^{-3} \times 7{,}850 + 150 \times 3.6 \times 10^{-3}) \times 0.72 = 3.8\ \mathrm{kg}$ — lighter than any of the monolithic substitutes, before its joints and edge closures are designed.
:::
:::

::: example Deriving an index for a thermal-shock-limited component {#ex-thermal}
A sight glass must survive a sudden $400\ \mathrm{K}$ quench without cracking. Derive the index, rank the candidates, and select.
::: solution
**The stress.** When the surface of a plate is suddenly cooled by $\Delta T$ while the interior stays hot, the surface layer is restrained from contracting in both in-plane directions and develops a tensile stress
$$
\sigma_{\mathrm{surface}} = \frac{E \alpha\, \Delta T}{1 - \nu} ,
$$
the **severe-quench** limit (very high surface heat-transfer coefficient). Setting $\sigma = \sigma_f$ and solving for the largest survivable quench,
$$
\Delta T_{\max} = \frac{\sigma_f ( 1 - \nu )}{E \alpha} .
$$
**The index.** With fracture as the failure mode and the size irrelevant,
$$
\boxed{ M = \frac{\sigma_f}{E \alpha} } \quad \text{(sudden quench)}, \qquad
M = \frac{k \sigma_f}{E \alpha} \quad \text{(steady heat flux, or a mild quench at small Biot number)} .
$$
**The ranking.**
$$
\begin{array}{l c c c c c}
\text{Material} & \sigma_f\ [\mathrm{MPa}] & E\ [\mathrm{GPa}] & \alpha\ [10^{- 6} / \mathrm{K}] & \nu & \Delta T_{\max}\ [\mathrm{K}] \\
\text{Fused silica} & 50 & 72 & 0.5 & 0.17 & 1{,}150 \\
\text{LAS glass-ceramic} & 65 & 92 & \approx 0.05 & 0.24 & > 5{,}000 \\
\text{Alumina } 96\% & 300 & 380 & 8 & 0.22 & 77 \\
\text{Silicon nitride} & 700 & 300 & 3.2 & 0.27 & 530 \\
\text{Soda-lime glass} & 40 & 70 & 9 & 0.22 & 50 \\
\text{Borosilicate glass} & 70 & 64 & 3.3 & 0.20 & 265
\end{array}
$$
**Selection.** For a **transparent** sight glass the candidates are the glasses and transparent glass-ceramics, and the ranking is dominated by $\alpha$ rather than by $\sigma_f$: **borosilicate**, at $265\ \mathrm{K}$, fails a $400\ \mathrm{K}$ quench; **fused silica**, at $1{,}150\ \mathrm{K}$, passes with a large margin. A transparent **lithium-aluminosilicate glass-ceramic**, with a near-zero $\alpha$, is effectively immune to the quench and is the alternative if its optical quality is acceptable.
**Metals.** A metal does not shatter in a single quench: it yields locally and relieves the stress, so the relevant failure is **thermal fatigue** over many cycles, and the index of interest is the thermal-stress index $k / (E \alpha)$, which is high for copper ($390 / (117 \times 17) = 0.20$) and aluminium ($150 / (73 \times 23) = 0.09$) in the units of the table.

*Check.* Alumina: $\Delta T_{\max} = 300 \times 10^{6} \times 0.78 / \left( 380 \times 10^{9} \times 8 \times 10^{- 6} \right) = 77\ \mathrm{K}$, as tabulated. Units: $\mathrm{Pa} / (\mathrm{Pa\, K^{-1}}) = \mathrm{K}$. Real ceramics have a Weibull distribution of strength, so a design value would be lower. $\checkmark$

*Sanity.* Silicon nitride survives a quench seven times larger than alumina mainly because its expansion coefficient is lower and its strength higher; its higher thermal conductivity helps further in less severe quenches, where the $k \sigma_f / (E \alpha)$ index applies. That is why silicon nitride is used for hot-gas and molten-metal handling parts, and why silicon carbide, with high $k$ and low $\alpha$, is used for kiln furniture.
:::
:::

::: example Multi-objective: the Pareto front of a bracket {#ex-pareto}
A bracket must be at least $50\ \%$ lighter than its $4.2\ \mathrm{kg}$ cast-steel version at the same stiffness, at no more than $1.5$ times the cost, in volumes of $20{,}000$ per year. Screen, rank and select, using the cost estimates below.
::: solution
**The constraints.** Stiffness $\ge$ the cast original; mass $\le 2.1\ \mathrm{kg}$; cost $\le 1.5 \times$ the original $\$95$, i.e. $\le \$142.5$; a process suited to $20{,}000$ parts per year.
**Screen 1 — the mass.** If the bracket behaves like a stiffness-limited plate, the original's index is $E^{1/3} / \rho \approx 0.75$, and halving the mass at the same stiffness needs an index of about $1.5$ — aluminium alloys qualify — or a better shape at the same index.
**Screen 2 — the process.** At $20{,}000$ per year, processes with long cycle times or very high capital cost per part (titanium forging, autoclave-cured CFRP) are poor fits; sand and investment casting, high-pressure die casting (HPDC), extrusion and fabrication, and resin-infused CFRP remain.
**Screen 3 — mass and cost.**
$$
\begin{array}{l c c c c}
\text{Option} & m\ [\mathrm{kg}] & \text{Mass}\ \% & \text{Cost}\ [\$] & \text{Cost}\ \% \\
\text{Cast steel (baseline)} & 4.2 & 100 & 95 & 100 \\
\text{Fabricated mild steel} & 3.1 & 74 & 145 & 153 \\
\text{HPDC A380 aluminium} & 2.0 & 48 & 118 & 124 \\
\text{Cast A356-T6 aluminium} & 2.3 & 55 & 105 & 111 \\
\text{Extruded and welded 6061} & 2.4 & 57 & 165 & 174 \\
\text{Forged and machined 7075} & 1.7 & 40 & 480 & 505 \\
\text{CFRP, resin infusion} & 1.3 & 31 & 340 & 358 \\
\text{Austempered ductile iron (ADI)} & 3.4 & 81 & 88 & 93
\end{array}
$$
**The Pareto front.** Plotting mass against cost, the **non-dominated** set is ADI, cast A356, HPDC A380 and CFRP. The cast-steel baseline is dominated by ADI; the fabricated steel and the welded 6061 are dominated by cast A356; and the forged 7075 is dominated by the CFRP, which is both lighter and cheaper.
**Selection.** Only **HPDC A380, at $2.0\ \mathrm{kg}$ and $\$118$, satisfies both limits**; cast A356 at $2.3\ \mathrm{kg}$ misses the mass target by $10\ \%$, and CFRP misses the cost limit.
**The three things that could still kill it.** **Porosity**: conventional HPDC parts contain entrapped gas and are not normally solution-treated (the gas blisters the part), so the design must use as-cast properties, which are lower than T6 properties, and the section must be sized accordingly. **Inspection**: the drawing must define an acceptable porosity level for the critical regions rather than "sound casting". **Galvanic and crevice corrosion**: an aluminium bracket bolted to a steel subframe needs the isolation measures of [[materials-science/corrosion]].

*Design comment.* **The Pareto front is the deliverable, and the selection is a negotiation about the constraints.** Presenting the whole front, with the dominated options and the reasons for their domination, moves the discussion from the method to the requirements, where it belongs.
:::
:::

::: example From handbook to design value {#ex-knockdown}
Turn a typical 7075-T651 plate tensile strength into an allowable limit-load stress for a lower wing panel operating at up to $80\ {}^{\circ}\mathrm{C}$, using a statistical-basis factor, a temperature factor and the airworthiness factor of safety of $1.5$.
::: solution
**The chain.** In aircraft practice the static strength requirement is that the structure carries the **ultimate load**, $1.5$ times the limit load, using statistically based allowables (A-basis: $99\ \%$ of the population exceeds the value with $95\ \%$ confidence), corrected for temperature and environment; and that it carries limit load without detrimental permanent deformation.
$$
\begin{array}{l c l}
\text{Typical } F_{tu} \text{ (L direction)} & 572\ \mathrm{MPa} & \text{typical value, room temperature} \\
\text{A-basis / typical} & 0.94 & \text{statistical basis (indicative)} \\
\text{Temperature factor at } 80\ {}^{\circ}\mathrm{C} & 0.95 & \text{indicative, after exposure} \\
\text{Factor of safety} & 1.5 & \text{ultimate load / limit load}
\end{array}
$$
$$
\sigma_{\mathrm{limit}} \le \frac{572 \times 0.94 \times 0.95}{1.5} = \frac{511}{1.5} = 341\ \mathrm{MPa} .
$$
**The yield check.** With a typical yield strength of $503\ \mathrm{MPa}$ and an A-basis yield of about $483\ \mathrm{MPa}$, the temperature-corrected yield is $483 \times 0.95 = 459\ \mathrm{MPa}$, above the $341\ \mathrm{MPa}$ limit stress, so the ultimate condition governs the static check.
**What usually governs instead.** For a lower wing skin, **fatigue and damage tolerance** usually set the design stress well below the static allowable: with $K_{Ic}$ of only about $25$ to $29\ \mathrm{MPa\, m^{1/2}}$ (L-T) and lower in the short-transverse direction, the crack-growth life between inspections, not the static strength, sizes the panel. Upper wing skins in compression are usually sized by buckling.

*Check.* The factors multiply to $0.94 \times 0.95 / 1.5 = 0.60$, so the allowable limit stress is $60\ \%$ of the typical tensile strength. $\checkmark$

*Sanity.* This is why the aerospace industry's real currency is not the alloy but the **allowables database** (MMPDS for metals): a new alloy without statistically based design values cannot be used in primary structure, and building those values takes years of coupon and element tests. The values above are illustrative; real designs use the published allowables and the applicable airworthiness regulations.
:::
:::

::: example Design {#ex-design-sel}
Select the material and process for a $600\ \mathrm{mm}$ aircraft actuator rod carrying $12\ \mathrm{kN}$ in tension and compression that must not buckle (factor $2$ on the buckling load), must survive $10^{5}$ load cycles, must run against a PTFE-based seal without wear, and is bought in $2{,}000$-per-year volumes.
::: solution
**The constraints, and which one binds.**
$$
\begin{array}{l l}
\text{Tension stiffness} & A \ge F L / (E \delta) \ \Rightarrow\ M = E / \rho \\
\text{Buckling at } 2 \times 12\ \mathrm{kN} & I \ge F_{cr} L^{2} / (\pi^{2} E) \ \Rightarrow\ M = E^{1 / 2} / \rho \ \text{(round section)} \\
\text{Fatigue at } 10^{5}\ \text{cycles} & \sigma_a \le \sigma_{\mathrm{fat}} / K_f \ \Rightarrow\ \text{notches and surface finish govern} \\
\text{Wear against the seal} & \text{a hard, smooth, non-galling surface}
\end{array}
$$
**The buckling check.** A pin-ended $600\ \mathrm{mm}$ steel rod with a buckling load of $24\ \mathrm{kN}$ needs
$$
I = \frac{24{,}000 \times 0.6^{2}}{\pi^{2} \times 207 \times 10^{9}} = 4.23 \times 10^{- 9}\ \mathrm{m^{4}} \ \Rightarrow\ d = \left( \frac{64 I}{\pi} \right)^{1/4} = 17.1\ \mathrm{mm} ,
$$
a solid steel rod of $1.09\ \mathrm{kg}$ (the stress at $12\ \mathrm{kN}$ is only $52\ \mathrm{MPa}$, so buckling, not strength, sizes it). Since $d \propto E^{-1/4}$, titanium ($E = 114\ \mathrm{GPa}$) needs $d = 19.9\ \mathrm{mm}$ and $0.83\ \mathrm{kg}$, and a CFRP rod with $E = 60\ \mathrm{GPa}$ along its axis needs $d = 23.3\ \mathrm{mm}$ and $0.40\ \mathrm{kg}$. (A tube would be lighter still in every material.)
**The wear constraint eliminates most of the list.** A seal runs on the rod, so the surface must be **hard, smooth and corrosion-resistant**:
$$
\begin{array}{l l}
\text{4340 with hard chrome plate} & \text{the traditional answer, but plating uses hexavalent chromium} \\
\text{High-strength steel with HVOF WC-Co coating} & \text{hard, wear-resistant; the established chrome replacement} \\
\text{17-4PH or 15-5PH} & \text{corrosion-resistant; needs a hard coating for long seal life} \\
\text{Ti-6Al-4V} & \text{poor wear and galling resistance; needs a hard coating} \\
\text{Nitronic 60} & \text{a galling-resistant austenitic stainless steel, but lower strength} \\
\text{CFRP with a bonded metal sleeve} & \text{lightest, but the sleeve, its bond and the end fittings dominate}
\end{array}
$$
**Choice.** A **high-strength steel rod (for example 4340 or 15-5PH) with an HVOF tungsten-carbide-cobalt coating** on the seal land, at about $1.1\ \mathrm{kg}$ solid or less as a tube. A CFRP rod saves about $0.7\ \mathrm{kg}$ but is justified only if the value of mass on this aircraft pays for its end fittings, seal sleeve and qualification.
**The three design problems the index does not show.** **End fittings**: the load enters the rod through threaded or bonded fittings whose fatigue strength, not the rod's, usually limits the life. **Impact and handling**: a composite rod is sensitive to dents and impact damage. **The chrome replacement**: hard chrome is being phased out under REACH and environmental regulations elsewhere, and each replacement — HVOF carbides, electroless nickel composites, nitriding — has its own wear, friction, fatigue and cost profile and needs a qualification programme.

*Design comment.* A selection with a sliding-contact constraint is largely a **surface-engineering** problem, and the right answer is usually a **two-material** part: the bulk chosen for stiffness, strength and mass, the surface chosen for wear and corrosion.
:::
:::

::: history
**James Stodart** and **Michael Faraday** made some of the first systematic experiments on alloy steels around 1820. Through the nineteenth century, railway, bridge and boiler engineering produced tables of strength and stiffness, and the design formulas of elasticity and strength of materials (later collected in texts such as **Stephen Timoshenko**'s) gave the relations from which material indices are derived. In aircraft engineering, the United States Army-Navy-Commerce committee issued the **ANC-5** bulletin of metal strength values in **1937**; it became **MIL-HDBK-5** in 1956 and, from 2003, the **MMPDS** handbook of statistically based design allowables. The de Havilland **Comet** accidents of **1954** led to fail-safe design, and damage-tolerance requirements followed — for the US Air Force in **MIL-A-83444** (1974) and for transport aircraft in the FAA's revision of **14 CFR 25.571** (amendment 25-45, 1978). **Michael F. Ashby** at Cambridge published his materials property charts in *Acta Metallurgica* in **1989** ("On the engineering properties of materials") and the systematic index method in *Materials Selection in Mechanical Design* (**1992**); the charts became searchable software with the Cambridge Engineering Selector developed by Granta Design. Ashby's *Materials and the Environment* (**2009**) extended the method to embodied energy and carbon. The **Boeing 787**, which first flew in 2009, has a structure that is about half composite by weight — the exchange-rate argument of this lesson at full scale.
:::

## Where this leads

Every index in this lesson rests on the mechanisms of [[materials-science/dislocations-strengthening]] and the transformations of [[materials-science/phase-transformations]], every screening constraint on the families of [[materials-science/material-families]] and the environments of [[materials-science/corrosion]], and every damage-tolerance allowable on the fracture mechanics of [[materials-science/failure]].

::: summary
- Selection is an algebra: write the objective, eliminate the free section variable with the constraint, and rank on the resulting material index.
- The exponent on the property is the message: the smaller it is, the more a light material wins, and for beams and panels shape multiplies the efficiency of any material.
- Steel, aluminium, titanium and magnesium all have $E / \rho \approx 26\ \mathrm{MN\, m / kg}$; only a bending index, a fibre composite or a better shape separates them.
- Within a family, strength and toughness trade along a band of negative slope, and the choice along it is an inspection-regime decision.
- The exchange rate — the value of a kilogram saved — ranges from less than the material cost for a building to thousands of dollars for a launch vehicle, and the same chart gives different answers at each.
- Screen before you rank, and specify the material, the temper, the process and the inspection class together.
- A handbook value is not a design value: statistical basis, temperature and the factor of safety together cut a typical strength to well under two thirds.
- Multi-objective selection produces a Pareto front, and the front is the deliverable.
:::

::: quiz
A stiffness-limited panel of free thickness is to be made as light as possible. Which index ranks the candidates?
- [ ] $E / \rho$
- [x] $E^{1/3} / \rho$
- [ ] $E^{1/2} / \rho$
- [ ] $E \rho$
::: solution
The second. Eliminating the thickness between $m = \rho b L t$ and $E I = E b t^{3} / 12 = $ const gives $m \propto \rho / E^{1/3}$, so the index is $E^{1/3} / \rho$. The $E / \rho$ index is the **tie-rod's**; used for a panel, it makes the common metals look equal (all about $26\ \mathrm{MN\, m / kg}$) and hides the large advantage of the lighter ones.
:::
:::

## Exercises

::: exercise Indices {level=1 check="1/3"}
Give the exponent on $E$ in the stiffness index for a bending panel of free thickness. (Enter the exponent as a fraction or decimal.)
::: solution
One third — $M = E^{1/3} / \rho$.
:::
:::

::: exercise Specific stiffness {level=1 check="26"}
Compute $E / \rho$ for steel with $E = 207\ \mathrm{GPa}$ and $\rho = 7{,}850\ \mathrm{kg / m^{3}}$. (Enter the value in $\mathrm{MN\, m / kg}$, to the nearest whole number.)
::: solution
$207 \times 10^{9} / 7{,}850 = 2.64 \times 10^{7}\ \mathrm{N\, m / kg} = 26\ \mathrm{MN\, m / kg}$ — the same as aluminium ($73 / 2.78$), titanium ($114 / 4.43$) and magnesium ($45 / 1.77$) to within a few per cent.
:::
:::

::: exercise Exchange rate {level=1 check="10.5"}
Saving $100\ \mathrm{kg}$ reduces a car's fuel consumption by $0.35\ \mathrm{L}$ per $100\ \mathrm{km}$. Over a life of $200{,}000\ \mathrm{km}$ at $\$1.50$ per litre (no discounting), what is a kilogram saved worth? (Enter the value in dollars per kilogram.)
::: solution
Per kilogram, $0.0035\ \mathrm{L} / 100\ \mathrm{km}$; over $2{,}000$ hundreds of kilometres that is $7\ \mathrm{L}$, worth $7 \times 1.50 = \$10.5$. Discounting future fuel savings lowers the figure.
:::
:::

::: exercise Embodied energy {level=1 check="1400"}
A $2\ \mathrm{kg}$ titanium part replaces a $3.5\ \mathrm{kg}$ steel one. Taking embodied energies of $700\ \mathrm{MJ / kg}$ for titanium and $30\ \mathrm{MJ / kg}$ for steel, what is the embodied energy of the titanium part? (Enter the value in MJ.)
::: solution
$2 \times 700 = 1{,}400\ \mathrm{MJ}$, against $3.5 \times 30 = 105\ \mathrm{MJ}$ for the steel part — thirteen times more. The titanium part saves energy over its life only if the $1.5\ \mathrm{kg}$ saved avoids more than about $1{,}300\ \mathrm{MJ}$ of fuel energy, which is plausible in an aircraft and unlikely in most ground applications.
:::
:::

::: exercise Knock-down {level=1 check="341"}
A 7075-T651 plate has a typical tensile strength of $572\ \mathrm{MPa}$. With an A-basis factor of $0.94$, a temperature factor of $0.95$ and a factor of safety of $1.5$, what is the allowable limit-load stress? (Enter the stress in MPa, to the nearest whole number.)
::: solution
$572 \times 0.94 \times 0.95 / 1.5 = 340.5 \approx 341\ \mathrm{MPa}$ — $60\ \%$ of the typical strength.
:::
:::

::: exercise Round beam {level=2 check="0.25"}
Find the mass ratio of a stiffness-matched solid round CFRP beam to a steel one, taking $E = 140\ \mathrm{GPa}$ (along the fibres) and $\rho = 1{,}580\ \mathrm{kg/m^3}$ for the composite and $E = 207\ \mathrm{GPa}$ and $\rho = 7{,}850\ \mathrm{kg/m^3}$ for the steel. (Enter $m_c / m_s$ to two decimal places.)
::: solution
For a round beam of free size the index is $E^{1/2} / \rho$, so
$$
\frac{m_c}{m_s} = \frac{\rho_c}{\rho_s} \left( \frac{E_s}{E_c} \right)^{1 / 2}
= \frac{1.58}{7.85} \times \left( \frac{207}{140} \right)^{1 / 2} = 0.201 \times 1.216 = 0.245 \approx 0.25 .
$$
*Sanity.* A $75\ \%$ saving. For a panel, with the exponent $1/3$, the ratio is $0.201 \times (207/140)^{1/3} = 0.229$ — a slightly larger saving, because the smaller the exponent on $E$, the less the composite's lower modulus costs it.
:::
:::

::: exercise Cost index {level=2}
For a stiffness-limited panel, rank mild steel, 2024-T3, magnesium AZ31 and quasi-isotropic CFRP on the **cost** index $E^{1/3} / (\rho\, C_m)$, with $E$ in GPa, $\rho$ in $\mathrm{Mg / m^{3}}$ and $C_m$ in dollars per kilogram ($0.9$, $5$, $3.5$ and $50$).
::: solution
$$
\begin{array}{l c c c}
\text{Material} & E^{1 / 3} / \rho & C_m & \text{cost index} \\
\text{Mild steel} & 0.754 & 0.9 & 0.84 \\
\text{2024-T3} & 1.503 & 5 & 0.30 \\
\text{Mg AZ31} & 2.010 & 3.5 & 0.57 \\
\text{CFRP quasi-iso} & 2.377 & 50 & 0.048
\end{array}
$$
**Mild steel gives the cheapest stiff panel, and CFRP is about seventeen times worse** ($0.84 / 0.048$). *Sanity.* This, set against the mass index, is the automotive-versus-aerospace divide in four numbers, and it is why the right question is not "what is the best material" but "what is a kilogram worth here".
:::
:::

::: exercise Derivation {level=3}
Derive the index for an **elastic torsion bar** of free radius that must be (a) as stiff as possible and (b) store as much elastic energy as possible, both at minimum mass. Evaluate (b) for a range of spring materials and select.
::: solution
**Geometry.** For a solid bar of radius $r$ and length $L$: $J = \pi r^{4} / 2$, maximum shear stress $\tau = T r / J$, twist $\theta = T L / (G J)$, mass $m = \rho \pi r^{2} L$.
**(a) Stiffness.** For a required stiffness $T / \theta = G J / L$, $r^{4} = 2 L (T/\theta) / (\pi G)$, so $r^{2} \propto G^{-1/2}$ and
$$
m \propto \frac{\rho}{G^{1 / 2}} \ \Rightarrow\ \boxed{ M = \frac{G^{1 / 2}}{\rho} } .
$$
**(b) Stored energy.** The strain-energy density is $\tau^{2} / (2G)$, and the shear stress rises linearly from zero at the axis to $\tau_f$ at the surface, $\tau = \tau_f\, \rho' / r$ at radius $\rho'$. Integrating over the bar,
$$
U = \int_0^{r} \frac{\tau_f^{2} \rho'^{2}}{2 G r^{2}}\, 2 \pi \rho' L\, \mathrm{d}\rho' = \frac{\tau_f^{2}}{4 G}\, \pi r^{2} L ,
$$
so the energy per unit mass, $U / m = \tau_f^{2} / (4 G \rho)$, is independent of the size, and
$$
\boxed{ M = \frac{\tau_f^{2}}{G\, \rho} } .
$$
**Evaluation** (indicative properties; $U / m = M / 4$):
$$
\begin{array}{l c c c c}
\text{Material} & \tau_f\ [\mathrm{MPa}] & G\ [\mathrm{GPa}] & \rho\ [\mathrm{kg/m^3}] & U / m\ [\mathrm{J / kg}] \\
\text{High-carbon spring steel} & 1{,}000 & 79 & 7{,}850 & 400 \\
\text{Chrome-vanadium spring steel} & 1{,}200 & 79 & 7{,}850 & 580 \\
\text{Ti-6Al-4V} & 520 & 44 & 4{,}430 & 350 \\
\text{Phosphor bronze} & 400 & 40 & 8{,}800 & 110 \\
\text{CFRP, } \pm 45^{\circ} & 300 & 30 & 1{,}550 & 480 \\
\text{GFRP, } \pm 45^{\circ} & 200 & 9 & 1{,}900 & 580 \\
\text{Rubber} & 5 & 0.001 & 1{,}200 & 5{,}200
\end{array}
$$
**Selection.** Per unit mass, **rubber** stores by far the most energy, but its hysteresis, creep and low stiffness rule it out for precision springs. Among the stiff materials, high-strength **spring steels** and the **fibre composites** store similar energy per kilogram; steel stores several times more per unit **volume** ($580 \times 7{,}850 \approx 4.6\ \mathrm{MJ / m^{3}}$ against $580 \times 1{,}900 \approx 1.1\ \mathrm{MJ/m^{3}}$ for GFRP), is cheap, and has well-characterised fatigue behaviour — which is why most springs are steel, while composite leaf and coil springs are used where mass matters most.
*Sanity.* Doubling $\tau_f$ quadruples the stored energy, so a spring is a strength-limited design: the best spring materials are those with the highest $\tau_f^{2} / G$, which is why spring steels are heat-treated to the highest strength that fatigue and toughness allow.
:::
:::

::: exercise Design {level=3}
Select the material and process for a heat sink that must conduct $400\ \mathrm{W}$ from a $30\ \mathrm{mm} \times 30\ \mathrm{mm}$ LED source to forced air with a $25\ \mathrm{K}$ rise, at a mass below $300\ \mathrm{g}$, in volumes of $100{,}000$ per year, attached to an aluminium housing without a galvanic problem.
::: solution
**The requirement.** The total thermal resistance allowed is $25 / 400 = 0.0625\ \mathrm{K / W}$. For fins of optimum proportions, the fin volume needed to dissipate a given heat flow at a given temperature excess varies inversely with the conductivity ($V \propto q^{3} / (k h^{2} \theta^{3})$ per unit fin width), so the fin mass varies as $\rho / k$ and
$$
M = \frac{k}{\rho} \quad \text{(lightest optimum-fin heat sink)} .
$$
**Screening.**
$$
\begin{array}{l c c c}
\text{Material} & k\ [\mathrm{W / m\, K}] & \rho\ [\mathrm{Mg / m^{3}}] & M = k / \rho \\
\text{CFRP along the fibres (pitch fibre)} & 400 & 1.6 & 250 \\
\text{Al 1050} & 220 & 2.7 & 81 \\
\text{Graphite foam / Cu} & 400 & 5.0 & 80 \\
\text{SiC/Al composite} & 200 & 3.0 & 67 \\
\text{Diamond / Cu} & 600 & 9.0 & 67 \\
\text{Al 6061} & 167 & 2.7 & 62 \\
\text{Mg AZ31} & 96 & 1.77 & 54 \\
\text{Copper} & 390 & 8.9 & 44 \\
\text{Steel} & 45 & 7.9 & 5.7
\end{array}
$$
**The ranking puts carbon fibre first** — but only along the fibres; across them its conductivity is a few $\mathrm{W / m\, K}$, so it is used as a **spreader** in sheet form rather than as fins. Among isotropic, cheaply formed materials **aluminium** leads.
**The process constraint.** $100{,}000$ parts per year at a low part cost means **extrusion** (or die casting) of aluminium: a 6063 or 1050-type profile, with a **copper** insert at the source to spread the heat before it enters the fins.
**Choice.** **An extruded aluminium heat sink with a copper base insert**, black anodised, with a thin, well-specified thermal interface.
**The four design problems.** **The interface**: a $0.1\ \mathrm{mm}$ thermal pad with $k = 3\ \mathrm{W / m\, K}$ over $9 \times 10^{-4}\ \mathrm{m^{2}}$ has $R = 10^{-4} / (3 \times 9 \times 10^{-4}) = 0.037\ \mathrm{K / W}$ — $59\ \%$ of the whole budget — while a $50\ \mu\mathrm{m}$ solder joint ($k \approx 50$) has $0.0011\ \mathrm{K / W}$; the interface, not the fin material, is where a cheap design fails. **Fin efficiency**: with $h = 50\ \mathrm{W / m^{2} K}$, a $1.2\ \mathrm{mm}$ aluminium fin $30\ \mathrm{mm}$ high has $mL = \sqrt{2h / (k t)}\, L = 0.58$ and an efficiency $\tanh(mL)/(mL) = 0.90$; a $0.6\ \mathrm{mm}$ copper fin of the same height has $0.89$, so copper fins buy nothing here and cost more. **Galvanic contact**: a copper insert in an aluminium body must be sealed or nickel-plated against humidity. **Fouling**: dust in the fin gaps degrades performance over time, so the fin pitch and any filtering are part of the specification.

*Design comment.* A thermal design is often a **contact-resistance** design before it is a conductivity design: the index $k / \rho$ ranks the bulk material, but the interface, the fin geometry and the air side decide whether the $0.0625\ \mathrm{K / W}$ budget is met.
:::
:::
