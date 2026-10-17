Materials selection is not a search for the best material. It is a search for the **cheapest material that satisfies every constraint**, and the search is mechanical: write the objective as an equation, eliminate the variables the design does not control, and rank the survivors on a **property chart**. Done properly it takes an hour and eliminates $95\ \%$ of the materials in existence before any judgement is exercised; done improperly it is a vote for the material the department has always used.

The method's whole content is one algebraic move. The **objective** (mass, cost, volume, life) is written in terms of a **free** variable the designer chooses (the section, the wall thickness) and a **fixed** requirement (the stiffness, the strength, the heat flux). The free variable is eliminated using the **constraint**, and what remains is a group of material properties called the **material index**. Maximising the index ranks the materials, and the ranking is **independent of the size of the part** — which is why a chart drawn once serves every beam, every panel and every aircraft.

::: warning Seven ways a selection goes wrong
**Ranking on the wrong index.** A designer who ranks a stiffness-limited panel on $E / \rho$ instead of $E^{1/3} / \rho$ puts titanium ahead of magnesium and aluminium, and the error grows with the square of the thickness freedom. **Always derive the index; never look it up.** **Ignoring the binding constraint.** The material with the best index is chosen and then fails the screening constraint — the maximum service temperature, the corrosion, the fire, the food-contact regulation — that was never written down. **Screen before you rank**, and write every constraint down first. **Selecting a material and not a process.** A $7075$ **forging** and a $7075$ **weldment** are different materials with a $40\ \%$ difference in fatigue; a CFRP **autoclave** part and a CFRP **resin-infusion** part differ by a factor of three in void content and a factor of two in compression after impact. The specification is "material, temper, process, and inspection class", and a selection that names only the first is not a selection. **Using the handbook value and not the design value.** A handbook quotes a mean at room temperature on a polished laboratory specimen in air. The design value is the **lower $95\ \%$ bound**, at the **service temperature**, in the **service environment**, on the **as-manufactured** detail, divided by a **quality factor** — and the chain multiplies to a factor of two to four. **Optimising mass when cost is the objective.** A $60\ \%$ mass saving at a $400\ \%$ cost increase is a good engineering result and a bad product. The index must contain the **cost** if cost is the objective, and the trade-off line must be drawn at the **exchange rate** the business actually pays. **Ignoring the exchange rate.** The whole method turns on the slope of the trade-off line, and the slope is the **value of a kilogram** — which is $\$1$ per kilogram for a concrete culvert, $\$20$ for a car, $\$500$ for an airliner and $\$3{,}000$ for a launch vehicle. The same chart gives a different answer at each slope, and a designer who has not been given the number has not been given the problem. **Not checking the second constraint.** Every real component has at least two constraints, and the optimum for one is often the worst for the other: the best creep material is a poor fracture-toughness material, the best thermal-shock material is a poor insulator, and the best material for a spring is a poor material for a bolt.
:::

## The method

::: definition Translate, screen, rank, document {#def-method}
**Translate.** Write the **function** ("carry a bending moment without yielding or deflecting"), the **constraints** ("stiffness $EI \ge 12\ \mathrm{kN\, m^{2}}$, span $2\ \mathrm{m}$, cost under $\$40$, non-flammable, usable at $80\ {}^{\circ}\mathrm{C}$"), the **objective** ("minimum mass") and the **free variables** ("the section size and the material").
**Screen.** Apply every constraint as a **filter** and eliminate. A maximum temperature of $80\ {}^{\circ}\mathrm{C}$ eliminates polymers; a fracture-toughness floor of $20\ \mathrm{MPa\, m^{1/2}}$ eliminates ceramics and glass; a cost ceiling of $\$2$ per kilogram eliminates titanium, nickel and composite. The screens are drawn as **lines with a fixed slope on a property chart** and are the reason a chart is drawn in log-log coordinates: a screening line of slope $3$ is a straight line.
**Rank.** Derive the index and draw the **trade-off line** of the same slope through the surviving materials; the ranking is the order in which the line meets them as it is pushed up the chart.
**Document.** State the material, the **temper or specification**, the **process**, the **inspection class**, the **design allowables** with their knockdown factors, and the **environmental limits**. A selection that cannot be audited is not complete.
$$
\begin{array}{l l l}
\text{Objective} & \text{Function of} & \text{Index form} \\
\text{Mass} & \rho, \text{ properties, load} & M = f(\text{property}) / \rho \\
\text{Cost of material} & c_p \rho, \text{ properties, load} & M = f(\text{property}) / (c_p \rho) \\
\text{Volume} & 1 / \rho, \text{ properties} & M = f(\text{property}) \\
\text{Embodied energy} & H_p \rho, \text{ properties} & M = f(\text{property}) / (H_p \rho) \\
\text{Thermal performance} & \text{conductivity, heat capacity} & M = f(k, \rho C_p)
\end{array}
$$
The **cost index** $c_p$ is the ratio of the cost per kilogram to that of a reference material, and it is the term that changes the answer most.
:::

::: definition The indices {#def-indices}
For a **tie-rod** of length $L$ carrying a tension $F$ with a stiffness or strength constraint:
$$
\text{stiffness: } m = \frac{F L \rho}{E \delta} \ \Rightarrow\ M = \frac{E}{\rho}; \qquad
\text{strength: } m = \frac{F \rho}{\sigma_y} \ \Rightarrow\ M = \frac{\sigma_y}{\rho} .
$$
For a **panel** of width $b$, length $L$ and thickness $t$, loaded in bending, with $t$ free:
$$
\text{stiffness: } M = \frac{E^{1 / 3}}{ \rho}; \qquad
\text{strength: } M = \frac{\sigma_y^{1 / 2}}{\rho}; \qquad
\text{buckling: } M = \frac{E^{1 / 3}}{\rho} .
$$
For a **round beam** of radius $r$, with $r$ free:
$$
\text{stiffness: } M = \frac{E^{1 / 2}}{\rho}; \qquad
\text{strength: } M = \frac{\sigma_y^{2 / 3}}{\rho}; \qquad
\text{buckling: } M = \frac{E^{1 / 2}}{\rho} .
$$
For a **cylindrical shell** of radius $r$ and thickness $t$, both free, under bending or axial compression: $M = E^{1 / 3} / \rho$.
For a **torsion bar** of radius $r$:
$$
\text{stiffness: } M = \frac{G^{1 / 2}}{\rho}; \qquad
\text{elastic energy stored: } M = \frac{\sigma_f^{2 / 3} G^{1 / 2}}{\rho}; \qquad
\text{a spring's resilience: } U_r = \frac{\sigma_f^{2}}{2 E} .
$$
For **thermal** design:
$$
\text{maximum stress for a given } \Delta T: \ M = \frac{k}{E \alpha}; \qquad
\text{maximum } \Delta T \text{ without fracture: } M = \frac{\sigma_f k}{E \alpha}; \qquad
\text{heat-sink efficiency: } M = k .
$$
For **creep**: $M = \sigma_R / \rho$ where $\sigma_R$ is the stress for the design rupture life at the design temperature. For **impact**: $M = \sigma_f$ (a strength criterion) or the **specific toughness** $K_{Ic} / \rho$.
**The exponents are the whole story.** A cube root means the modulus matters three times less than the density's opposite, so a **shape** or a **section** is worth more than a substitution; a $2/3$ power means the strength matters more than the modulus; and an index with **no** exponent on the property — the tie-rod's $E / \rho$ — is the only case where a material substitution genuinely cannot be beaten by a shape.
:::

::: widget plot
f: 5.13; 3.29; 2.38; 2.09; 2.01; 1.83; 1.62; 1.57; 1.51; 1.50; 1.47; 1.24; 1.22; 1.10; 0.75; 0.74; 0.72; 0.55
x: 1, 16
labels: spruce; CFRP unidirectional; CFRP quasi-iso; silicon nitride; magnesium AZ31; alumina; GFRP; Al-Li 2195; Al 1100; 2024-T3; 7075-T651; nylon 66; concrete; Ti-6Al-4V; mild steel; 17-4PH; 304 SS; copper
caption: The panel-stiffness index $E^{1/3} / \rho$ in $\mathrm{MPa}^{1/3}\,\mathrm{m^{2}/kg}$, ranked. Spruce at $5.1$ is the best stiff panel material on this list and is twice as good as any aluminium; every metal sits between $0.55$ and $2.0$; and the whole of the aerospace interest is in the $1.5$ to $3.3$ band occupied by the composites and the magnesium. The clustering of the metals at $0.7$ to $1.6$ is the specific-stiffness degeneracy of the last lesson made visible.
:::

## The property charts and what they say

::: definition The modulus-density chart {#def-chart-em}
On a log-log plot of $E$ against $\rho$ the **tie-line of slope $1/3$** is the panel-stiffness index and the **tie-line of slope $1/2$** is the round-beam index. Three facts fall out of the chart.
**The metals lie on a horizontal band.** Steel, nickel, titanium, aluminium, magnesium and copper all sit between $E = 45$ and $210\ \mathrm{GPa}$ while their densities span $1.7$ to $9\ \mathrm{Mg / m^{3}}$, so the $E / \rho$ line of slope 1 crosses the metal band at a **constant** specific stiffness of $26\ \mathrm{MN\, m / kg}$. **No metal substitution buys stiffness per kilogram.**
**The polymers are two decades soft and only one decade light.** Their modulus is $10^{- 2}$ to $10^{0}\ \mathrm{GPa}$ against steel's $200$, while their density is only $3$ times lower. They are therefore **never** a stiffness substitution and often a **compliance** substitution — a living hinge, a seal, a grip, a clip.
**Ceramics and carbons sit above everything.** Alumina at $E / \rho = 96$ and carbon fibre at $89$ are the only common materials that beat the metals on stiffness for weight, and they do it for opposite reasons: the ceramic because its bond is stiff and its atoms light, the fibre because its basal-plane $\mathrm{sp^{2}}$ carbon bond is the stiffest thing there is. The ceramic cannot be used because its toughness is $3\ \mathrm{MPa\, m^{1/2}}$; the fibre can be used because the matrix gives it a toughness the fibre alone does not have.
:::

::: definition The strength-toughness chart {#def-chart-sykc}
On a plot of $\sigma_y$ against $K_{Ic}$ the materials fall into a **band of negative slope**: the strong are tough-poor and the tough are weak. The band's two ends are the design decisions.
$$
\begin{array}{l c c l}
\text{Material} & \sigma_y\ [\mathrm{MPa}] & K_{Ic}\ [\mathrm{MPa\, m^{1/2}}] & \text{Position} \\
\text{Alumina} & 300\ (\text{flex}) & 3.5 & \text{strong in compression, no warning before failure} \\
\text{7075-T651} & 503 & 24 & \text{the aerospace compromise} \\
\text{Ti-6Al-4V} & 880 & 55 & \\
\text{17-4PH H900} & 1{,}310 & 120 & \\
\text{AerMet 100} & 1{,}930 & 145 & \text{the best combination in production} \\
\text{Maraging 350} & 2{,}480 & 75 & \text{the strength ceiling} \\
\text{A36 steel} & 250 & 200 & \text{the damage-tolerance champion} \\
\text{304L stainless} & 205 & 200 & \text{and it gets tougher at } 20\ \mathrm{K} \\
\text{Copper, annealed} & 70 & 120 & \\
\text{Silicone rubber} & 3 & 0.1 & \text{the far corner: weak, tough, and huge strain}
\end{array}
$$
**The chart's message is that strength and toughness are bought with the same money and the exchange rate is set.** A $1{,}900\ \mathrm{MPa}$ steel with a $145\ \mathrm{MPa\, m^{1/2}}$ toughness costs $40$ times mild steel per kilogram and still tolerates only a $1.4\ \mathrm{mm}$ crack; a $250\ \mathrm{MPa}$ steel with $200$ tolerates $162\ \mathrm{mm}$. The choice between them is not a materials question but a **damage-tolerance** question, and it is answered by the inspection regime the operator can fund.
:::

::: definition Cost, embodied energy and the exchange rate {#def-cost}
$$
\begin{array}{l c c c}
\text{Material} & \text{Cost}\ [\$/\mathrm{kg}] & \text{Embodied energy}\ [\mathrm{MJ / kg}] & \mathrm{CO_2}\ [\mathrm{kg / kg}] \\
\text{Concrete} & 0.1 & 1 & 0.13 \\
\text{Spruce (kiln-dried)} & 0.6 & 2 & -1.6 \\
\text{Mild steel} & 0.9 & 32 & 1.9 \\
\text{4140 QT} & 1.6 & 40 & 2.2 \\
\text{Nylon 66} & 4 & 130 & 6 \\
\text{Mg AZ31} & 3.5 & 370 & 21 \\
\text{304 stainless} & 5 & 110 & 6.5 \\
\text{2024-T3 sheet} & 5 & 210 & 9.5 \\
\text{7075 plate} & 6 & 215 & 9.6 \\
\text{Copper} & 9 & 100 & 4.5 \\
\text{17-4PH bar} & 12 & 140 & 7 \\
\text{Ti-6Al-4V bar} & 20 & 760 & 25 \\
\text{Al-Li 2195} & 30 & 260 & 11 \\
\text{Inconel 718} & 25 & 480 & 20 \\
\text{AerMet 100} & 40 & 180 & 9 \\
\text{CFRP prepreg} & 50 & 800 & 30 \\
\text{Carbon fibre T700} & 25 & 400 & 18 \\
\text{PEEK} & 40 & 200 & 9
\end{array}
$$
**The exchange rate — the value of a kilogram saved — is the number that decides everything.**
$$
\begin{array}{l c l}
\text{Application} & \text{Value of 1 kg saved} & \text{Basis} \\
\text{Building, bridge, culvert} & < \$1 & \text{material cost only} \\
\text{Domestic appliance} & \$2\text{–}5 & \text{material and shipping} \\
\text{Passenger car} & \$5\text{–}20\ \text{per kg over the life} & 0.01\ \mathrm{L} \text{ per 100 km per 10 kg, at 200,000 km} \\
\text{Truck} & \$30\text{–}80 & \text{fuel over 800,000 km plus payload} \\
\text{Airliner} & \$500\text{–}1{,}500 & \text{fuel plus revenue per payload-tonne-kilometre over 20 yr} \\
\text{Business jet} & \$2{,}000\text{–}5{,}000 & \\
\text{Launch vehicle to LEO} & \$3{,}000\text{–}30{,}000 & \text{and multiplied by 1.5 for the structural fraction}
\end{array}
$$
**The consequence is the single most useful result of this lesson.** A $\$44$ per kilogram material premium is recovered by a $65\ \%$ mass saving in an airliner at a $500$-to-$1$ exchange rate and is **unrecoverable** in a car at a $20$-to-$1$ one. **The same chart, the same part and the same analysis give opposite answers in two industries**, and the designer's job is to be told the exchange rate before starting.
:::

::: example A stiffness-limited panel at two exchange rates {#ex-panel-sel}
A $1{,}200 \times 600\ \mathrm{mm}$ steel panel of $3\ \mathrm{mm}$ is to be replaced at the same stiffness. Evaluate aluminium, magnesium, a quasi-isotropic CFRP and a balsa-skin sandwich, and give the answer for a car and for an airliner.
::: solution
**The requirement.** $EI$ fixed at $E_{\mathrm{st}} b t^{3} / 12 = 207 \times 10^{9} \times 0.6 \times 0.003^{3} / 12 = 840\ \mathrm{N\, m^{2}}$ per $600\ \mathrm{mm}$ width. The steel panel's mass is $7{,}850 \times 1.2 \times 0.6 \times 0.003 = 17.0\ \mathrm{kg}$.
**The thickness and mass of each substitute.** $t = \left( E_{\mathrm{st}} t_{\mathrm{st}}^{3} / E \right)^{1 / 3}$:
$$
\begin{array}{l c c c c c}
\text{Material} & E\ [\mathrm{GPa}] & t\ [\mathrm{mm}] & \rho t\ [\mathrm{kg / m^{2}}] & m\ [\mathrm{kg}] & \text{Cost}\ [\$] \\
\text{Steel} & 207 & 3.0 & 23.6 & 17.0 & 15 \\
\text{2024-T3} & 73 & 4.25 & 11.8 & 8.5 & 51 \\
\text{Mg AZ31} & 45 & 5.02 & 8.9 & 6.4 & 22 \\
\text{CFRP quasi-iso} & 50 & 4.68 & 7.3 & 5.2 & 311 \\
\text{Balsa / steel skins} & 50\ (\text{eff.}) & 22 & 4.6 & 3.3 & 90
\end{array}
$$
**The trade-off.** The mass saved and the cost of saving it:
$$
\begin{array}{l c c c}
\text{Substitute} & \Delta m\ [\mathrm{kg}] & \Delta C\ [\$] & \text{Cost of a kilogram saved} \\
\text{2024-T3} & 8.5 & + 36 & \$4.2 / \mathrm{kg} \\
\text{Mg AZ31} & 10.6 & + 7 & \$0.7 / \mathrm{kg} \\
\text{CFRP} & 11.8 & + 296 & \$25 / \mathrm{kg} \\
\text{Balsa sandwich} & 13.7 & + 75 & \$5.5 / \mathrm{kg}
\end{array}
$$
**The verdict.** In a **car** at a $\$20$ per kilogram life-cycle value, magnesium at $\$0.7$ per kilogram saved is a clear win and aluminium at $\$4.2$ is a win; CFRP at $\$25$ **loses**, and the balsa sandwich at $\$5.5$ wins on mass but must survive a stone-impact and a water-ingress specification. In an **airliner** at $\$500$ per kilogram, all four pay and CFRP is a $20$-fold return — but CFRP must then satisfy a **damage-tolerance**, a **lightning**, an **erosion** and a **repairability** specification that costs more than the material.
**The one the chart does not show.** The magnesium panel is $67\ \%$ thicker, and if the panel is a **floor** the thickness is not free: it eats the cabin volume, changes the joint, and needs a **fire** certification that magnesium in section is notorious for. The **constraint** eliminates it and the index never had anything to say about it.

*Check.* The aluminium panel's $E t^{3} = 73 \times 76.8 = 5{,}606$ against steel's $207 \times 27 = 5{,}589$ — matched to $0.3\ \%$. $\checkmark$

*Sanity.* The exchange-rate arithmetic is the reason the automotive industry went to aluminium and magnesium and **not** to carbon fibre for a volume car, and the reason the aerospace industry went to carbon fibre and **not** to magnesium. The two industries look at the same chart and make opposite choices, and both are right.
:::
:::

::: example Deriving an index for a thermal-shock-limited component {#ex-thermal}
A glass-ceramic sight glass must survive a $400\ \mathrm{K}$ quench without cracking. Derive the index, rank the candidates, and select.
::: solution
**The stress.** A constrained plate quenched by $\Delta T$ develops a surface stress
$$
\sigma_{\mathrm{surface}} = \frac{E \alpha\, \Delta T}{1 - \nu} ,
$$
the **severe-quench** limit, in which the surface is fully constrained by the still-cold interior and cannot relax. Setting $\sigma = \sigma_f$ and solving for the maximum survivable quench,
$$
\Delta T_{\max} = \frac{\sigma_f ( 1 - \nu )}{E \alpha} .
$$
**The index.** If fracture is the constraint and the shape is free, the material index is
$$
\boxed{ M = \frac{\sigma_f ( 1 - \nu )}{E \alpha} } \quad \text{(fracture)}, \qquad
M = \frac{k ( 1 - \nu )}{E \alpha} \quad \text{(yield or stress-limited)} .
$$
**The ranking.**
$$
\begin{array}{l c c c c c}
\text{Material} & \sigma_f\ [\mathrm{MPa}] & E\ [\mathrm{GPa}] & \alpha\ [10^{- 6} / \mathrm{K}] & k\ [\mathrm{W / m\, K}] & \Delta T_{\max}\ [\mathrm{K}] \\
\text{Fused silica} & 50 & 72 & 0.5 & 1.4 & 1{,}100 \\
\text{Glass-ceramic (Zerodur)} & 65 & 92 & 0.02 & 1.6 & 3{,}000 \\
\text{Alumina } 96\% & 300 & 380 & 8 & 25 & 100 \\
\text{Silicon nitride} & 700 & 300 & 3.2 & 30 & 780 \\
\text{Soda-lime glass} & 40 & 70 & 9 & 1.0 & 60 \\
\text{Borosilicate (Pyrex)} & 70 & 64 & 3.3 & 1.1 & 330 \\
\text{Aluminium} & 325 & 73 & 23 & 150 & \text{yields, does not crack} \\
\text{Stainless 316} & 205 & 193 & 16 & 15 & \text{yields}
\end{array}
$$
**Selection.** For a **transparent** sight glass the candidates are the glasses, and the ranking is dominated by $\alpha$ and not by $\sigma_f$: a **borosilicate** at $330\ \mathrm{K}$ passes a $400\ \mathrm{K}$ quench only marginally and a **fused-silica** at $1{,}100\ \mathrm{K}$ passes comfortably. A **lithium-aluminium-silicate glass-ceramic** (Ceran, Macor) at a near-zero $\alpha$ is the answer if the transparency specification allows the residual crystallite haze.
**The general result.** **A metal cannot fail by thermal shock in the same sense a ceramic can**, because it yields and the yield relieves the stress — which is why a stainless sight-glass flange survives a quench that destroys a glass one, and why the **thermal-stress index** $k / (E \alpha)$, in which copper at $0.20$ and aluminium at $0.12$ dominate, is the right index for a **metal** and the fracture index is the right one for a **ceramic**.

*Check.* The alumina's $\Delta T_{\max} = 300 \times 10^{6} \times 0.72 / \left( 380 \times 10^{9} \times 8 \times 10^{- 6} \right) = 71\ \mathrm{K}$ against the tabulated $100$ — the difference is the $1 - \nu$ factor and the fact that a real alumina's flexural strength is a Weibull median and not a design value. $\checkmark$

*Sanity.* The reason a **silicon nitride** bearing ball survives a flame and an **alumina** one does not is entirely the $k$ term: the same $\alpha$ and $E$ ratio, but a thermal conductivity four times higher, which lets the surface stay near the bulk temperature. This is why the classic thermal-shock champion is not the strongest ceramic but the **most conductive** one, and why **silicon carbide** kiln furniture outlasts alumina.
:::
:::

::: example Multi-objective: the Pareto front of a bracket {#ex-pareto}
A cast-then-machined bracket must be $50\ \%$ lighter than its $4.2\ \mathrm{kg}$ cast-steel version at the same stiffness, at no more than $1.5$ times the cost. Screen, rank and select.
::: solution
**The constraints.** Stiffness $\ge$ the cast original; mass $\le 2.1\ \mathrm{kg}$; cost $\le 1.5 \times$ the original $\$95$; a maximum section of $25\ \mathrm{mm}$; a process available in $500$-per-year volumes.
**Screen 1 — the mass.** The original is a **stiffness-limited casting** with an effective $E^{1/3} / \rho$ of $0.75$. A $50\ \%$ mass reduction requires an index of $1.50$ at the same section, or the same index with a **thicker** section. Both routes are open and must be costed separately.
**Screen 2 — the process.** A $500$-per-year volume rules out a titanium forging ($10\ \mathrm{m}$ machine, $\$4{,}000$ tooling amortised), a titanium casting (a vacuum furnace and a $12$-week lead) and an autoclave CFRP part (a $\$2\ \mathrm{m}$ press). It allows: sand or investment steel casting, aluminium gravity or HPDC casting, an extruded and welded aluminium fabrication, a sheet-metal fabrication, and a resin-infusion CFRP part at $500$ per year with a matched-metal tool.
**Screen 3 — the cost.**
$$
\begin{array}{l c c c c}
\text{Option} & m\ [\mathrm{kg}] & \text{Mass}\ \% & \text{Cost}\ [\$] & \text{Cost}\ \% \\
\text{Cast steel (baseline)} & 4.2 & 100 & 95 & 100 \\
\text{Fabricated mild steel} & 3.1 & 74 & 145 & 153 \\
\text{HPDC A380 aluminium} & 2.0 & 48 & 118 & 124 \\
\text{Cast A356-T6 aluminium} & 2.3 & 55 & 105 & 111 \\
\text{Extruded 6061 welded} & 2.4 & 57 & 165 & 174 \\
\text{Forged 7075 machined} & 1.7 & 40 & 480 & 505 \\
\text{CFRP resin infusion} & 1.3 & 31 & 340 & 358 \\
\text{Ductile iron ADI} & 3.4 & 81 & 88 & 93
\end{array}
$$
**The Pareto front.** Plotting mass against cost, the **non-dominated** set is ADI, cast A356, HPDC A380 and CFRP. The fabricated steel and the welded aluminium are **dominated** — they cost more and weigh more than a material on the front.
**Selection.** The requirement is $\le 2.1\ \mathrm{kg}$ and $\le 1.5 \times 95 = \$143$. **HPDC A380 at $2.0\ \mathrm{kg}$ and $\$118$ is the only point that satisfies both**, and the cast A356 at $2.3\ \mathrm{kg}$ misses the mass by $10\ \%$.
**The three things that could still kill it.** **Porosity**: an HPDC part is **not** heat-treatable — a T6 solution treatment blisters a part with entrapped gas — so the design must use the **as-cast F** allowables, which are $30\ \%$ lower, and the section must be grown to suit. **X-ray**: HPDC's entrapped gas makes a radiographic requirement a $20\ \%$ reject rate, and the drawing must define a **porosity class** rather than "sound casting". **Galvanic and crevice**: an aluminium bracket bolted to a steel subframe is the [[materials-science/corrosion]] example, and the insulation kit is $\$3$ of the $\$118$.

*Design comment.* The general rule is that **the Pareto front is the deliverable and the selection is the negotiation**. A designer who presents one number gets it challenged; a designer who presents the front, with the dominated options shown and the reasons for their domination, gets the constraint argued about instead of the method.
:::
:::

::: example From handbook to design value {#ex-knockdown}
Turn a handbook $7075\text{-}\mathrm{T}651$ tensile value into a design allowable for a $12\ \mathrm{mm}$ plate in a wing lower boom at $80\ {}^{\circ}\mathrm{C}$ in a humid atmosphere, inspected every $500$ flight hours.
::: solution
**The chain.**
$$
\sigma_{\mathrm{design}} = \sigma_{\mathrm{handbook}} \times K_{\mathrm{stat}} \times K_{T} \times K_{\mathrm{env}} \times K_{\mathrm{tech}} \times K_{\mathrm{thick}} \times \frac{1}{\mathrm{SF}}
$$
$$
\begin{array}{l c l}
\text{Handbook } F_{tu}\ (\text{L-T, } 12\ \mathrm{mm}) & 503\ \mathrm{MPa} & \text{mean, room temperature, air, polished} \\
K_{\mathrm{stat}} & 0.94 & \text{lower } 95\% / \text{mean for a } 7\mathrm{xxx}\text{ plate} \\
K_{T} & 0.92 & 80\ {}^{\circ}\mathrm{C} / \text{room temperature for a } 7\mathrm{xxx} \text{ (a small loss below } 100\ {}^{\circ}\mathrm{C}\text{)} \\
K_{\mathrm{env}} & 0.90 & \text{hot-wet: the corrosion-fatigue and SCC knock-down for a } \mathrm{T}6 \text{ temper} \\
K_{\mathrm{tech}} & 0.90 & \text{plate, rolled, with a specified through-thickness quality} \\
K_{\mathrm{thick}} & 0.93 & \text{the } 12\ \mathrm{mm} \text{ quench-rate knock-down from a } 25\ \mathrm{mm} \text{ test plate} \\
\mathrm{SF} & 1.5 & \text{the } 1.5 \text{ on } F_{tu} \text{ (or 2.0 on } F_{ty}\text{, whichever binds)}
\end{array}
$$
$$
\sigma_{\mathrm{design}} = 503 \times 0.94 \times 0.92 \times 0.90 \times 0.90 \times 0.93 / 1.5 = 163\ \mathrm{MPa} \ \text{on ultimate}.
$$
**The product of the knock-downs is $0.65$ before the safety factor** — a $35\ \%$ reduction from the handbook number, and the $35\ \%$ is not conservatism but the honest difference between a laboratory specimen and a structure.
**The check that binds.** The **yield** allowable is $445 \times 0.94 \times 0.92 \times 0.90 \times 0.90 \times 0.93 / 2.0 = 139\ \mathrm{MPa}$, and the **buckling** allowable of the $12\ \mathrm{mm}$ skin at the design stress is lower still — so the design is **buckling**-limited and the tensile chain above is not the binding one.
**The damage-tolerance check.** With $K_{Ic} = 24\ \mathrm{MPa\, m^{1/2}}$ in the L-T direction and $16\ \mathrm{MPa\, m^{1/2}}$ in the short-transverse, and an inspection that finds $1.5\ \mathrm{mm}$ cracks, the **safe-life** and **growth-life** calculations must both be run and the shorter of the two governs.

*Sanity.* A $35\ \%$ knock-down is why an airframe's **structural efficiency** — the ratio of the design stress to the handbook strength — is $0.2$ to $0.3$, and why a $7075$ wing that "should" weigh $400\ \mathrm{kg}$ weighs $1{,}100$. It is also why the aerospace industry's real currency is not the alloy but the **allowables database**: a new alloy with no database is worth nothing, and building one costs a decade of coupon and element tests.
:::
:::

::: example Design {#ex-design-sel}
Select the material and process for a $12\ \mathrm{kN}$-load, $600\ \mathrm{mm}$-long aircraft actuator rod that must be stiff, must not buckle in compression, must survive $10^{5}$ cycles, must run against a PTFE seal without galling, and must be bought in $2{,}000$-per-year volumes.
::: solution
**The four constraints, and which one binds.**
$$
\begin{array}{l l}
\text{Tension stiffness} & A \ge F L / (E \delta) \ \Rightarrow\ M = E / \rho \\
\text{Buckling at } 12\ \mathrm{kN} & I \ge F L^{2} / (\pi^{2} E) \ \Rightarrow\ M = E^{1 / 2} / \rho \ \text{(round section)} \\
\text{Fatigue at } 10^{5}\ \text{cycles} & \sigma_a \le \sigma_{- 1} / K_f \ \Rightarrow\ \text{fatigue notch sensitivity governs} \\
\text{Wear against a PTFE seal} & \text{a hard, non-galling surface; a } 60\ \mathrm{HRC} \text{ chrome or a ceramic}
\end{array}
$$
**The buckling check.** A pinned $600\ \mathrm{mm}$ rod at $12\ \mathrm{kN}$ with a $2$ safety factor needs
$$
I = \frac{24{,}000 \times 0.6^{2}}{\pi^{2} \times 207 \times 10^{9}} = 4.23 \times 10^{- 8}\ \mathrm{m^{4}} \ \Rightarrow\ d = 30\ \mathrm{mm} .
$$
A $30\ \mathrm{mm}$ steel rod has a mass of $3.3\ \mathrm{kg}$; a titanium one of the same stiffness-buckling margin has $d = 27\ \mathrm{mm}$ and $2.0\ \mathrm{kg}$; a CFRP one at $E = 60\ \mathrm{GPa}$ needs $d = 36\ \mathrm{mm}$ and $1.4\ \mathrm{kg}$.
**The wear constraint eliminates most of the list.** A seal runs on the rod, so the surface must be **hard, smooth and non-galling**:
$$
\begin{array}{l l}
\text{4140 induction-hardened} & \text{hard, but rusts and the case is thin at the threads} \\
\text{17-4PH H900, passivated} & \text{hard, corrosion-resistant, and the aerospace answer} \\
\text{4340 with a hard chrome plate} & \text{the traditional answer; } 62\ \mathrm{HRC}, 25\ \mu\mathrm{m}, \text{ and } \textbf{hexavalent chromium} \\
\text{Ti-6Al-4V shot-peened} & \text{galls against PTFE under a side load; needs a DLC or a nitride} \\
\text{Nitronic 60} & \text{a } 40\ \mathrm{HRC} \text{ manganese steel that resists galling by design} \\
\text{CFRP with a steel or a chrome-plated land} & \text{the rod is composite and the seal lands on a bonded metal sleeve}
\end{array}
$$
**Choice.** **A CFRP rod with a co-cured titanium or Nitronic seal land and a hard-anodised aluminium or a chrome-free VDC coating on the land**, at $1.4\ \mathrm{kg}$ against $3.3$.
**The three design problems the chart does not show.** **Bearing at the rod end**: a composite rod's end fitting is a bonded-and-pinned metal boss, and its **peel** strength is the design limit, not the rod's; the fitting is $40\ \%$ of the assembly's mass and $60\ \%$ of its cost. **Side load and impact**: a composite rod is **notched-sensitive to a dent** and a dropped rod end is a reject; the handling specification is a real cost. **The chrome ban**: the hard-chrome plating that has been the industry's answer for seventy years is being eliminated by REACH and by the U.S. EPA's MACT rule, and the replacements — **high-velocity oxy-fuel tungsten carbide**, **HVOF Cr$_3$C$_2$-NiCr**, **electroless nickel-silicon carbide**, and **plasma-nitrided Nitronic** — each have a different wear, friction and cost profile and each requires a **qualification test programme** that costs more than the material change.

*Design comment.* The general rule is that **a selection with a sliding-contact constraint is a surface-engineering problem wearing a materials-selection costume**, and that the right answer is usually a **two-material** part: the bulk chosen for stiffness and mass, the surface chosen for wear. The single-material answer is almost always dominated.
:::
:::

::: history
**Ashby's** method descends from **Julius Weisbach**'s and **S. T. Timoshenko**'s design formulas and from the 19th-century **tabulae** of material properties compiled for the railway and boiler industries; **John B. Johnson**'s 1894 *Theory and Practice of Framing Construction* and **Stephen Timoshenko**'s 1921 *Strength of Materials* put the formulas into the form the index method uses. **Michael Faraday**'s and **James Stodart**'s property measurements and the **National Physical Laboratory**'s 1902-1930 series of strength surveys of woods, metals and cements are the origin of the databases. **Michael F. Ashby**'s 1975 *Acta Metallurgica* paper on the property charts and his 1986 *Materials Selection in Mechanical Design* turned the charts into a systematic method with the index derivation, and the **Cambridge Engineering Selector** of 1999 and the **Granta CES EduPack** made the charts searchable. **S. S. Manson**'s 1954 and **W. Elger**'s 1960s work on the reliability-based design allowable, **A. M. Freudenthal**'s 1947 fracture-mechanics approach to a **safe-life** allowable, and the **Advisory Group for Aerospace Research and Development** and **FAA** rules that in 1954-1958 made the **damage-tolerance** basis mandatory are the origin of the knock-down chain. **The embodied-energy accounting** descends from **V. A. Stouch**'s and **R. U. Ayres**'s 1969 energy analysis of steel, **T. E. Cooper**'s 1970s aluminium energy studies at Alcoa, and the **International Aluminium Institute**'s and **World Steel Association**'s life-cycle inventories of 1993 and 2000; **W. R. (Bill) Cherry**'s and **M. F. Ashby**'s 1996 *Materials and the Environment* established the CO$_2$-per-kilogram accounting that now drives a car's material choice. **The exchange-rate argument** for an aircraft — the value of a kilogram saved — was formalised by **W. F. Miller** and **R. J. McCune** at Boeing in 1950s weight-and-cost studies and is the reason the 787's structure is $50\ \%$ composite and a family hatchback's is $8\ \%$.
:::

## Where this leads

Every index in this lesson rests on the mechanisms of [[materials-science/dislocations-strengthening]] and the transformations of [[materials-science/phase-transformations]], every screening constraint on the families of [[materials-science/material-families]] and the environments of [[materials-science/corrosion]], and every damage-tolerance allowable on the fracture mechanics of [[materials-science/failure]].

::: summary
- Selection is an algebra: write the objective, eliminate the free section variable with the constraint, and rank on the resulting material index.
- The index's exponent is the message: a cube root means a shape beats a substitution, and only the tie-rod's $E / \rho$ cannot.
- Every metal has $E / \rho = 26\ \mathrm{MN\, m / kg}$; only a fibre, a foam or a shape buys stiffness for weight.
- Strength and toughness lie on a band of negative slope, and the choice along it is an inspection-regime decision.
- The exchange rate — the value of a kilogram saved — ranges from $\$1$ for a culvert to $\$30{,}000$ for a launch vehicle, and the same chart gives opposite answers at each.
- Screen before you rank, and specify the material, the temper, the process and the inspection class together.
- A handbook value is not a design value: the knock-down chain multiplies to $0.3$ to $0.65$ before the safety factor.
- Multi-objective selection produces a Pareto front, and the front is the deliverable.
:::

::: quiz
A stiffness-limited panel of free thickness is to be made as light as possible. Which index ranks the candidates?
- [ ] $E / \\rho$
- [x] $E^{1/3} / \\rho$
- [ ] $E^{1/2} / \\rho$
- [ ] $E \\rho$
::: solution
The second. Eliminating the thickness between $m = \\rho b L t$ and $EI = E b t^{3} / 12 = $ const gives $m \\propto \\rho / E^{1/3}$, so the index is $E^{1/3} / \\rho$. The $E / \\rho$ index is the **tie-rod's**, where the section is fixed and only the material can change; using it for a panel overstates the value of a stiff material by the cube of the thickness freedom, which is why it puts titanium ahead of magnesium and aluminium.
:::
:::

## Exercises

::: exercise Indices {level=1 check="0.3333"}
Give the exponent on $E$ in the stiffness index for a bending panel of free thickness.
::: solution
One third — $M = E^{1/3} / \rho$.
:::
:::

::: exercise Specific stiffness {level=1 check="26"}
Give $E / \rho$ in $\mathrm{MN\, m / kg}$ for a structural metal.
::: solution
$26$, for every one of them.
:::
:::

::: exercise Exchange rate {level=1 check="500"}
To the nearest hundred dollars, what is the typical life-cycle value of a kilogram saved on an airliner?
::: solution
About $\$500$ to $1{,}500$, commonly quoted at $\$500$ to $1{,}000$.
:::
:::

::: exercise Embodied energy {level=1 check="760"}
Give the embodied energy of titanium in megajoules per kilogram.
::: solution
About $760$ — twenty times mild steel.
:::
:::

::: exercise Knock-down {level=1 check="0.65"}
A $7075$ design-value chain has five factors of $0.94$, $0.92$, $0.90$, $0.90$ and $0.93$. Give their product.
::: solution
$0.65$ — a $35\ \%$ reduction before any safety factor.
:::
:::

::: exercise Round beam {level=2}
Give the mass ratio of a stiffness-matched CFRP round beam to a steel one, taking $E = 140$ and $140\ \mathrm{GPa}$ for the composite along the fibre and $\rho = 1.58$ and $7.85$.
::: solution
$$
\frac{m_c}{m_s} = \frac{\rho_c}{\rho_s} \left( \frac{E_s}{E_c} \right)^{1 / 4}
= \frac{1.58}{7.85} \times \left( \frac{207}{140} \right)^{1 / 4} = 0.201 \times 1.10 = 0.22 .
$$
*Sanity.* A $78\ \%$ saving, better than the $77\ \%$ for a panel because the round-beam index has a **quarter** power on the modulus and the composite's modulus disadvantage therefore costs less. The general rule: **the more the section is free to grow, the more a low-modulus, low-density material wins** — and the more the joint, the bearing and the buckling dominate the design.
:::
:::

::: exercise Cost index {level=2}
For a stiffness-limited panel, rank mild steel, 2024-T3, magnesium AZ31 and CFRP quasi-iso on the **cost** index $E^{1/3} / (\rho\, c_p)$ with $c_p$ in dollars per kilogram.
::: solution
$$
\begin{array}{l c c c}
\text{Material} & E^{1 / 3} / \rho & c_p & \text{cost index} \\
\text{Mild steel} & 0.754 & 0.9 & 0.84 \\
\text{2024-T3} & 1.503 & 5 & 0.30 \\
\text{Mg AZ31} & 2.010 & 3.5 & 0.57 \\
\text{CFRP quasi-iso} & 2.377 & 50 & 0.048
\end{array}
$$
**Mild steel is the cheapest stiff panel and CFRP is seventeen times worse.** *Sanity.* This is the whole of the automotive-versus-aerospace material divide in four numbers, and it is why the correct question is never "what is the best material" but "what is a kilogram worth here".
:::
:::

::: exercise Derivation {level=3}
Derive the index for an **elastic torsion bar** of free radius that must be (a) as stiff as possible and (b) as energy-dense as possible, both at minimum mass. Evaluate (b) for the spring steels, titanium, GFRP and CFRP and select.
::: solution
**Geometry.** $J = \pi r^{4} / 2$, $\tau = T r / J = 2 T / \pi r^{3}$, $\theta = T L / G J$, mass $m = \rho \pi r^{2} L$.
**(a) Stiffness.** Substituting $J$, $\theta = 2 T L / \left( G \pi r^{4} \right)$, so $r = \left( 2 T L / G \pi \theta \right)^{1 / 4}$ and
$$
m \propto \frac{\rho}{G^{1 / 2}} \ \Rightarrow\ \boxed{ M = \frac{G^{1 / 2}}{\rho} } .
$$
**(b) Energy.** The stored energy is $U = T^{2} L / \left( 2 G J \right)$; substituting $J$ from the **strength** limit $r = \left( 2 T / \pi \tau_f \right)^{1 / 3}$,
$$
U = \frac{\pi \tau_f^{2} r^{4}}{4 G} = \frac{\pi \tau_f^{2}}{4 G} \left( \frac{2 T}{\pi \tau_f} \right)^{4 / 3}
\propto \frac{\tau_f^{\, 2 / 3}}{G}, \qquad
m \propto \rho r^{2} \propto \frac{\rho}{\tau_f^{\, 2 / 3}} ,
$$
so the energy per unit mass is $U / m \propto \tau_f^{\, 4 / 3} / (\rho G)$ and
$$
\boxed{ M = \frac{\tau_f^{\, 4 / 3}}{\rho\, G} } .
$$
**Evaluation** (using $\tau_f \approx 0.58\, \sigma_y$ and $G \approx E / 2.8$):
$$
\begin{array}{l c c c c}
\text{Material} & \tau_f\ [\mathrm{MPa}] & G\ [\mathrm{GPa}] & \rho & M \\
\text{High-carbon spring steel} & 1{,}000 & 79 & 7{,}850 & 0.0205 \\
\text{Chrome-vanadium spring} & 1{,}200 & 75 & 7{,}800 & 0.0265 \\
\text{Ti-6Al-4V} & 510 & 42 & 4{,}430 & 0.0146 \\
\text{Phosphor bronze} & 400 & 40 & 8{,}800 & 0.0060 \\
\text{CFRP, } \pm 45^{\circ} & 350 & 5 & 1{,}600 & 0.0219 \\
\text{GFRP, } \pm 45^{\circ} & 150 & 3 & 1{,}850 & 0.0075 \\
\text{Rubber} & 5 & 0.001 & 1{,}200 & 0.0105
\end{array}
$$
**Selection.** A **chrome-vanadium or a silicon-manganese spring steel** is the best elastic spring material there is, and has been for a century; the $\pm 45^{\circ}$ CFRP torsion bar of the 1980s helicopter-rotor programme scored comparably and lost on cost, creep and impact.
*Sanity.* The reason is the $\tau_f^{4/3}$: the spring steel's strength advantage over titanium is a factor of $2.4$ raised to $1.33$, which is $3.2$, and its density disadvantage is only $1.8$. **A spring is a strength design with a $4/3$ power on the strength, and no material with a lower strength can win it** — which is why a composite leaf spring is a curiosity and a composite **coil** spring does not exist.
:::
:::

::: exercise Design {level=3}
Select the material and process for a $400\ \mathrm{W}$ LED heat sink that must conduct $400\ \mathrm{W}$ from a $30\ \mathrm{mm} \times 30\ \mathrm{mm}$ source to air with a $25\ \mathrm{K}$ rise, at a mass below $300\ \mathrm{g}$, in $100{,}000$-per-year volumes, and be attachable to an aluminium housing without a galvanic problem.
::: solution
**The requirement.** The thermal resistance is $25 / 400 = 0.0625\ \mathrm{K / W}$. A finned heat sink of length $60\ \mathrm{mm}$ achieves this with a **base conductivity** and a **fin efficiency** that both scale with $k$, so the mass scales as
$$
m \propto \frac{\rho}{\sqrt{k}} \quad \text{(a finned, convection-limited heat sink)} \ \Rightarrow\ M = \frac{\sqrt{k}}{\rho} .
$$
**Screening.**
$$
\begin{array}{l c c c}
\text{Material} & k\ [\mathrm{W / m\, K}] & \rho\ [\mathrm{Mg / m^{3}}] & M = \sqrt{k} / \rho \\
\text{Copper} & 390 & 8.9 & 2.22 \\
\text{Al 1050} & 220 & 2.7 & 1.73 \\
\text{Al 6061} & 167 & 2.7 & 1.51 \\
\text{Mg AZ31} & 96 & 1.8 & 1.72 \\
\text{SiC/Al composite} & 200 & 3.0 & 1.49 \\
\text{Diamond / Cu} & 600 & 9.0 & 2.72 \\
\text{Graphite foam / Cu} & 400 & 5.0 & 4.00 \\
\text{CFRP along fibre} & 400 & 1.6 & 12.5 \\
\text{Steel} & 45 & 7.9 & 0.85
\end{array}
$$
**The ranking says carbon fibre along the fibre is the best heat-sink material in existence** — and it is, for a **spreader**, which is exactly what it is used for, in a graphite-sheet or a vapour-chamber form, at the source. For a **finned extrusion** the answer is aluminium, because the index is not the only constraint.
**The process constraint.** $100{,}000$ per year at a $\$3$ part cost means **extrusion**: a $6063\text{-}\mathrm{T}5$ or a $1050$ profile with a $2\ \mathrm{mm}$ base and $1.2\ \mathrm{mm}$ fins, pressed onto a **copper** or a **copper-tungsten** base plate for the source spread.
**Choice.** **A 1050 aluminium extrusion with an integral copper base insert**, at $280\ \mathrm{g}$, with a **thermal-interface pad** of $3\ \mathrm{W / m\, K}$ and a **black anodised** finish for the radiation.
**The four design problems.** **Galvanic**: a copper insert in an aluminium body in a humid atmosphere is a $\$0.40$ problem that becomes a $\$40$ warranty claim; the fix is a **conformal coating** over the joint and a **sealant**, or a **nickel-plated** copper insert. **The interface**: the $3\ \mathrm{W / m\, K}$ pad is $0.02\ \mathrm{K / W}$ of the $0.0625$ budget, and a **soldered** or **sintered** interface is $0.002$ — the interface is $30\ \%$ of the thermal budget and is where the cheap design fails. **Fin efficiency**: a $1.2\ \mathrm{mm}$ aluminium fin of $30\ \mathrm{mm}$ height has an efficiency of $0.85$; a $0.6\ \mathrm{mm}$ **copper** fin of the same height has $0.95$ but costs $4\times$ and cannot be extruded with the aluminium. **Dust**: a finned heat sink in a domestic environment loses $40\ \%$ of its performance in two years, and the specification must include a **dust-shedding** fin pitch of at least $6\ \mathrm{mm}$.

*Design comment.* The general rule is that **a thermal design is a contact-resistance design before it is a conductivity design**, and that the material index $\sqrt{k} / \rho$ is the right index for the **bulk** and the wrong one for the **joint**. The $40\ \%$ of the failure of LED lamps that is thermal is almost never the heat sink's material and almost always the interface, the dust and the enclosure.
:::
:::
