There are perhaps two hundred materials an engineer is ever asked to choose from, and they sort into six families with a seventh — the composites — that is not a family but a method. Each family exists because of one thing: **steels because of iron and carbon, aluminium because of the oxide film, titanium because of the price of reducing it, superalloys because nothing else holds $\gamma^{\prime}$ above $0.7\, T_m$, polymers because of the entropy of a coiled chain, ceramics because the bond is too strong to allow a dislocation, and composites because no single material is strong in two directions.**

The single most useful number in this lesson is that **the four structural metals have the same specific stiffness**: $E / \rho = 26 \pm 1\ \mathrm{MN\, m / kg}$ for steel, aluminium, titanium, magnesium and practically every alloy of them. Stiffness is set by the curvature of the interatomic potential and density by the atomic mass, and across these metals the two rise together; the heavier metals do no better — nickel is at $23$, tungsten at $21$ and copper at $14$. **You cannot buy stiffness by weight with a metal.** You can only buy it with a fibre, a sandwich or a shape.

::: warning Five ways families get mis-specified
**Substituting for stiffness and specifying strength.** A designer who replaces a steel bracket with aluminium "to save weight" and keeps the section finds a bracket that deflects $2.8$ times as much, because $E$ is a third of steel's while $E / \rho$ is identical. The aluminium saves weight only when the design is **strength**-limited or when the section can be **thickened**, and the mass ratio is then $\left( \rho_i / \rho_s \right) \left( E_s / E_i \right)^{1 / 3} = 0.50$ for a stiff panel and $\left( \rho_i / \rho_s \right) \left( \sigma_s / \sigma_i \right)^{1 / 2} = 0.31$ for a strong one in $2024\text{-}\mathrm{T}3$ — not the $0.35$ a naive density ratio suggests. **Specifying a stainless steel for corrosion and getting sensitisation.** 304 in a weld leaves chromium carbide on the boundaries and corrodes there; the answer is the $\mathrm{L}$ grade or a titanium-stabilised 321, and it must be in the drawing. **Specifying a precipitation-hardening alloy and not saying when it is aged.** A $6061\text{-}\mathrm{T}6$ bracket machined from $\mathrm{T}4$ stock and not re-aged has about half the yield strength ($145$ against $276\ \mathrm{MPa}$), and a $17\text{-}4\mathrm{PH}$ machined in the $\mathrm{H}900$ condition and then stress-relieved at $620\ {}^{\circ}\mathrm{C}$ is over-aged to roughly the $\mathrm{H}1150$ condition and nearly $40\ \%$ weaker. **Specifying titanium for seawater and forgetting galling and crevice.** Titanium resists flowing seawater superbly and stagnant, creviced, painted-under seawater poorly, and its galling on a threaded steel fastener seizes a joint in one make-and-break. **Specifying a composite and not the damage.** A CFRP panel has a compressive strength after a $27\ \mathrm{J}$ barely-visible impact of about $60\ \%$ of its undamaged value, is not inspectable by eye, and is repaired by a bonded patch whose cure temperature the structure must survive. The composite's specification is its **inspection and repair scheme**, and a specification without one is incomplete.
:::

## Steels

::: definition The steel families {#def-steels}
$$
\begin{array}{l l c c l}
\text{Family} & \text{Example} & \sigma_y\ [\mathrm{MPa}] & \text{Cost} & \text{The reason it exists} \\
\text{Plain carbon, hot-rolled} & 1008\text{–}1025,\ \text{A36} & 220\text{–}350 & 1.0 & \text{cheap, weldable, tough, everything else is a compromise} \\
\text{Cold-drawn} & 1045\ \text{CD} & 530 & 1.3 & \text{work hardening buys } 1.7\times \text{ the yield for no alloy cost} \\
\text{HSLA / microalloyed} & \text{HSLA 50, S355, X70} & 350\text{–}690 & 1.1 & \text{precipitation and grain refinement, no heat treatment, weldable} \\
\text{Quenched and tempered} & 4140, 4340, 300M & 600\text{–}1{,}900 & 2\text{–}4 & \text{the strength, at a price in weldability and toughness} \\
\text{Maraging} & 18\text{Ni 250, 300, 350} & 1{,}700\text{–}2{,}500 & 15 & 18\%\ \text{Ni, no carbon: } K_{Ic} > 150 \text{ at full strength} \\
\text{Tool and die} & A2, D2, M2, H13 & 1{,}400\text{–}1{,}900 & 5 & \text{hardness and hot hardness from } \mathrm{Cr}, \mathrm{Mo}, \mathrm{W}, \mathrm{V} \\
\text{Stainless, ferritic} & 430 & 310 & 3 & 17\%\ \mathrm{Cr}, \text{no Ni, cheap; BCC, so it has a ductile-brittle transition} \\
\text{Stainless, martensitic} & 410, 420, 440C & 750\text{–}1{,}600 & 4 & 13\%\ \mathrm{Cr} + \mathrm{C}, \text{hardenable, cutlery, bearings} \\
\text{Stainless, austenitic} & 304, 316, 316L & 205\text{–}310 & 6 & 18/8: \text{formable, weldable, cryogenic-tough, work-hardens} \\
\text{Stainless, duplex} & 2205, 2507 & 450\text{–}550 & 6 & \text{austenite + ferrite: } 2\times 316\text{'s strength, chloride-resistant} \\
\text{Stainless, PH} & 17\text{-}4\mathrm{PH},\ \mathrm{A}286 & 1{,}000\text{–}1{,}350 & 10 & \text{copper or } \gamma^{\prime} \text{ precipitation in a corrosion-resistant matrix} \\
\text{Bearing} & 52100 & 2{,}000\ (\text{contact}) & 4 & 1\%\ \mathrm{C}, 1.5\%\ \mathrm{Cr}, \text{hardened to } 58\text{–}64\ \mathrm{HRC}
\end{array}
$$
The **cost index** is relative to hot-rolled mild steel at $1$ per kilogram. Note that the stainless and the nickel alloys cost $6$ to $30$ times as much per kilogram **and** are harder to machine, so the finished-part multiple is $10$ to $50$.
:::

::: definition What each steel element does {#def-elements}
$$
\begin{array}{l l}
\mathrm{C} & \text{the strength, up to } 0.6\%; \text{above it, carbides and weldability collapse} \\
\mathrm{Mn} & 1.5\times \mathrm{C}: \text{ties up sulfur as MnS and provides the manganese in every steel} \\
\mathrm{Si} & \text{deoxidiser; } 2\%\ \text{in electrical steel, where it raises } \rho \text{ and lowers the hysteresis loss} \\
\mathrm{Cr} & 10.5\%: \text{the passive film, and therefore stainless; } 1\%\text{–}1.5\%: \text{temper resistance} \\
\mathrm{Ni} & \text{toughness at low temperature; } 3.5\%\text{–}9\%: \text{the cryogenic grades; } 18\%: \text{austenite} \\
\mathrm{Mo} & \text{kills temper embrittlement; } 2\%\text{–}3\%: \text{pitting resistance (316);} \ 1\%: \text{secondary hardening} \\
\mathrm{V},\ \mathrm{Nb},\ \mathrm{Ti} & \text{microalloying: } \mathrm{VC},\ \mathrm{NbC},\ \mathrm{TiC} \text{ pin the boundaries and precipitate interpass} \\
\mathrm{W},\ \mathrm{Co} & \text{high-speed steel: red hardness, hot hardness, and the } \mathrm{M} \text{ and } \mathrm{T} \text{ series} \\
\mathrm{S},\ \mathrm{Pb},\ \mathrm{Ca} & \text{machinability, at a cost in fatigue and in transverse toughness} \\
\mathrm{N} & \text{austenite stabiliser and strengthener; the duplex grades' pitting-resistance weapon} \\
\mathrm{Al},\ \mathrm{Si},\ \mathrm{Cr} & \text{oxidation resistance at temperature: the } 5\%\text{, } 9\%\text{, } 20\%\ \mathrm{Cr} \text{ heat-resisting grades}
\end{array}
$$
The **pitting-resistance equivalent** $\mathrm{PRE} = \% \mathrm{Cr} + 3.3\, \% \mathrm{Mo} + 16\, \% \mathrm{N}$ ranks the stainless grades against chloride pitting: $304$ scores $19$ and pits in seawater, $316$ scores $24$ to $26$ and survives cold flowing seawater, $2205$ scores $35$ and $6\%\ \mathrm{Mo}$ super-austenitics score $43$. A duplex $2205$ with a $\mathrm{PRE}$ of $35$ is a seawater answer at a tenth of the nickel of an alloy 625.
:::

::: example Steel for aluminium, or the specific-stiffness trap {#ex-panel}
A $4\ \mathrm{mm}$ mild-steel panel must be replaced in $2024\text{-}\mathrm{T}3$ aluminium. Give the mass for a **stiffness-matched** panel, for a **strength-matched** panel, and the cost of each.
::: solution
**Stiffness-matched bending panel.** The stiffness per unit width is $EI$ and $I \propto t^{3}$, so $t \propto E^{- 1 / 3}$ and the mass ratio is
$$
\frac{m_{\mathrm{Al}}}{m_{\mathrm{st}}} = \frac{\rho_{\mathrm{Al}}}{\rho_{\mathrm{st}}} \left( \frac{E_{\mathrm{st}}}{E_{\mathrm{Al}}} \right)^{1 / 3}
= \frac{2.78}{7.85} \times \left( \frac{207}{73} \right)^{1 / 3} = 0.354 \times 1.417 = 0.50 .
$$
**A $50\ \%$ saving, not the $65\ \%$ the density ratio promises** — the aluminium must be $1.42$ times as thick, $t = 5.7\ \mathrm{mm}$.
**Strength-matched.** $t \propto \sigma_y^{- 1 / 2}$, so
$$
\frac{m_{\mathrm{Al}}}{m_{\mathrm{st}}} = \frac{2.78}{7.85} \left( \frac{250}{325} \right)^{1 / 2} = 0.354 \times 0.877 = 0.31 .
$$
**A $69\ \%$ saving.** The stronger the alloy relative to the steel, the better aluminium does.
**Cost.** Per kilogram the aluminium is $7$ against $1$, so the stiffness-matched panel costs $0.50 \times 7 = 3.5$ times as much in material, and the strength-matched one $2.2$ times. **But** the aluminium part is machined or formed faster, needs no paint system, and can be friction-stir welded, so the finished-part cost is often comparable — and in a vehicle where a kilogram of mass is worth a kilogram of fuel over the life, the aluminium wins on a total-cost basis at $3.5$ times the material cost.

*Check.* The deflection of the $5.66\ \mathrm{mm}$ aluminium panel equals that of the $4\ \mathrm{mm}$ steel panel, since $E t^{3} = 73 \times 181.4 = 13{,}250$ against $207 \times 64 = 13{,}250$. $\checkmark$

*Sanity.* The general rule is that **aluminium is a strength material and not a stiffness material**. Where the design is stiffness-limited and the section cannot grow — a machine bed, a shaft, a spring, a bearing housing — aluminium buys nothing and magnesium or a sandwich does. Where it is strength-limited, aluminium is the cheapest kilogram-saver there is, and where the section *can* grow, a $1.42$ thickness increase may be free and the saving is real.
:::
:::

## Cast irons

::: definition The four irons {#def-irons}
With $2$ to $4\ \%$ carbon, close to the $4.3\ \%$ eutectic, a ferrous alloy cannot be forged and must be cast, and the way the carbon solidifies defines four families:
$$
\begin{array}{l l c c l}
\text{Family} & \text{Microstructure} & \sigma_{\mathrm{UTS}}\ [\mathrm{MPa}] & \text{Elong.} & \text{Why it is used} \\
\text{Grey} & \text{flake graphite, lamellar pearlite} & 150\text{–}400 & 0.5\% & 350: 12\ \text{times the damping of steel, and a self-lubricating surface} \\
\text{Compacted (vermicular)} & \text{worm graphite} & 350\text{–}500 & 1\% & \text{cylinder heads: grey's conductivity, ductile's strength} \\
\text{Ductile (SG, nodular)} & \text{spheroidal graphite, } \mathrm{Mg} \text{ treated} & 400\text{–}800 & 2\text{–}18\% & 500\text{-}7: \text{the workhorse; a crankshaft, a wind-turbine hub} \\
\text{Austempered (ADI)} & \text{ausferrite matrix} & 750\text{–}1{,}600 & 1\text{–}11\% & 1050\text{-}7: \text{a forged-steel replacement at a casting's cost} \\
\text{White / chilled} & \mathrm{Fe_3C} \text{ as-cast} & 400\ (\text{wear}) & 0 & \text{mill liners, slurry pipes: the hardest cheap material there is} \\
\text{Malleable} & \text{temper carbon, annealed white} & 380\text{–}550 & 4\text{–}10\% & \text{fittings and small gearboxes; being displaced by ductile}
\end{array}
$$
**The graphite is the design.** A flake is a crack with a rounded tip and a lubricating filling: it cuts the tensile strength to a third of the matrix's, gives a compressive strength four times the tensile, gives the damping — the flakes dissipate $12$ times the vibration energy of steel, which is why a machine tool base is cast iron and never welded steel — and gives the machinability. **Magnesium or cerium treatment at $1{,}500\ {}^{\circ}\mathrm{C}$ makes the graphite spherical**, which removes the crack and roughly doubles to triples the tensile strength and the fatigue limit, and is one of the most valuable metallurgical tricks of the twentieth century. **Austempering** at $250$ to $400\ {}^{\circ}\mathrm{C}$ instead of quenching gives an ausferrite matrix — acicular ferrite in carbon-enriched austenite — and a grade such as $1050\text{-}7$ has $1{,}050\ \mathrm{MPa}$ with $7\ \%$ elongation, which is a forged-steel property from a casting.
:::

## Aluminium, magnesium and their alloys

::: definition The wrought series {#def-alseries}
$$
\begin{array}{l l l c l}
\text{Series} & \text{Main alloying} & \text{Heat-treatable?} & \sigma_y\ [\mathrm{MPa}] & \text{Uses and cautions} \\
1\mathrm{xxx} & 99\%\ \mathrm{Al} & \text{no} & 20\text{–}60 & \text{conductors, chemical plant, foil} \\
2\mathrm{xxx} & \mathrm{Cu}\ 4\% \pm \mathrm{Mg} & \text{yes} & 300\text{–}400 & 2024\text{-}\mathrm{T}3: \text{airframe skin; } \textbf{not} \text{ weldable, } \textbf{not} \text{ corrosion-resistant} \\
3\mathrm{xxx} & \mathrm{Mn} & \text{no} & 100\text{–}200 & \text{can body, heat-exchanger fin} \\
4\mathrm{xxx} & \mathrm{Si} & \text{no} & 150\text{–}300 & \text{weld filler (4043, 4047) and brazing sheet} \\
5\mathrm{xxx} & \mathrm{Mg}\ 5\% & \text{no} & 125\text{–}300 & 5083\text{:} \text{marine, armour; } \textbf{sensitises above } 65\ {}^{\circ}\mathrm{C} \\
6\mathrm{xxx} & \mathrm{Mg_2 Si} & \text{yes} & 200\text{–}350 & 6061\text{-}\mathrm{T}6\text{:} \text{the general engineer's extrusion; weldable, weak in the HAZ} \\
7\mathrm{xxx} & \mathrm{MgZn_2} + \mathrm{Cu} & \text{yes} & 400\text{–}570 & 7075\text{:} \text{the strongest; SCC in T6, use T73; no weld strength} \\
8\mathrm{xxx} & \mathrm{Li} \text{ and others} & \text{some} & 300\text{–}500 & \text{Al-Li 8090: } 8\% \text{ lighter, } 10\% \text{ stiffer (newer Al-Li alloys such as 2195 are 2xxx)}
\end{array}
$$
**The temper designation is part of the specification.** $\mathrm{O}$ annealed, $\mathrm{H}1x$ strain-hardened, $\mathrm{T}4$ solution-treated and naturally aged, $\mathrm{T}6$ artificially peak-aged, $\mathrm{T}7x$ over-aged for stress-corrosion, and $\mathrm{T}7351$ the aerospace stress-corrosion temper. A drawing that says "6061" and not "6061-T6" invites a strength error of up to a factor of five, from $55\ \mathrm{MPa}$ annealed to $276\ \mathrm{MPa}$ peak-aged.
**The weld is the weakness.** A $6\mathrm{xxx}$ loses $40\ \%$ in the heat-affected zone and recovers half of it on natural ageing over a week; a $5\mathrm{xxx}$ welds at full strength but a $7\mathrm{xxx}$ or $2\mathrm{xxx}$ welds at $30$ to $50\ \%$ and is normally replaced by a riveted or a friction-stir joint. **Friction-stir welding** keeps the peak below the solidus and recovers $90\ \%$, which is why the Space Shuttle's super-lightweight external tank and the Falcon 9's propellant tanks are friction-stir welded.
**Magnesium** is $35\ \%$ less dense than aluminium and about $25\ \%$ lighter as a stiffness-matched panel, is the easiest metal to machine, and has three problems: a hexagonal lattice with only three slip systems at room temperature, so it is formed at $250$ to $450\ {}^{\circ}\mathrm{C}$ or not at all; a corrosion potential of $- 1.7\ \mathrm{V}$, so it must be sealed and insulated from every other metal; and **fire**, in chip and in melt form, which is why a magnesium foundry is a different building.
:::

## Titanium

::: definition Why titanium costs what it does {#def-ti}
Titanium's specific strength is unbeatable among load-bearing metals at a temperature between $150$ and $350\ {}^{\circ}\mathrm{C}$, and its price is set by the **Kroll process**: $\mathrm{TiO_2}$ is chlorinated to $\mathrm{TiCl_4}$, which is reduced by liquid magnesium in a batch reactor over $40\ \mathrm{h}$, and the resulting sponge is leached, dried, and vacuum-melted twice. The process is **batch, not continuous**, and the machining that follows turns most of an aerospace forging into swarf: buy-to-fly ratios of ten to one are common.
$$
\begin{array}{l l c c l}
\text{Class} & \text{Example} & \sigma_y\ [\mathrm{MPa}] & \text{Max } T & \text{Character} \\
\alpha & \mathrm{Ti\text{-}5Al\text{-}2.5Sn\ ELI} & 830 & 350\ {}^{\circ}\mathrm{C} & \text{weldable, creep-resistant, not heat-treatable} \\
\text{near-} \alpha & \mathrm{Ti\text{-}6242},\ \mathrm{Ti\text{-}1100} & 1{,}000 & 540\ {}^{\circ}\mathrm{C} & \text{creep: compressor disks and blades} \\
\alpha + \beta & \mathrm{Ti\text{-}6Al\text{-}4V} & 830\text{–}1{,}100 & 400\ {}^{\circ}\mathrm{C} & 70\% \text{ of all titanium: strong, formable, weldable with care} \\
\beta & \mathrm{Ti\text{-}10V\text{-}2Fe\text{-}3Al},\ \mathrm{Ti\text{-}15\text{-}3\text{-}3\text{-}3} & 1{,}100\text{–}1{,}500 & 300\ {}^{\circ}\mathrm{C} & \text{highest strength, best spring, cold-formable}
\end{array}
$$
**The four design cautions.** **Galling**: titanium seizes on steel, on itself and on most coatings in one make-and-break of a threaded fastener; the fix is a silver-, $\mathrm{MoS_2}$- or DLC-coated fastener and a specified torque. **Crevice corrosion**: titanium needs oxygen to keep its film, so under a gasket, under a paint blister or in stagnant seawater it can pit; the fix is a design without crevices and a flow. **Hydrogen pickup**: a pickling bath or a welding atmosphere with moisture charges the metal with hydrogen and embrittles it; the fix is an inhibited pickle and a backup-gas weld purge. **Burn**: titanium swarf and titanium in a high-pressure oxygen line are a fire, so titanium is kept out of oxygen-wetted service and an ignition analysis is part of every oxygen-system safety case.
:::

## Superalloys and heat-resisting alloys

::: definition The $\gamma^{\prime}$ alloys {#def-superalloys}
A superalloy is a nickel-, cobalt- or iron-nickel-base alloy that retains $70\ \%$ of its room-temperature yield strength at $0.7\, T_m$, which no other family does. The mechanism is the **$\gamma^{\prime}$ precipitate** $\mathrm{Ni_3 ( Al, Ti )}$, coherent, ordered $\mathrm{L1_2}$, and — unusually — **stronger the hotter it is up to about $700$ to $800\ {}^{\circ}\mathrm{C}$**, because screw dislocations in the ordered lattice cross-slip from the octahedral onto the cube planes, where the anti-phase-boundary energy is lower, and become locked.
$$
\begin{array}{l c c l}
\text{Alloy} & \sigma_y\ [\mathrm{MPa}] & \text{Use} & \gamma^{\prime} \text{ fraction} \\
\text{310 stainless} & 220 & 1{,}100\ {}^{\circ}\mathrm{C} \text{ furnace parts} & 0 \\
\text{Inconel 600 / 601} & 240 & \text{carburising, nitric acid} & 0 \\
\text{Inconel 625} & 414 & \text{marine, sour gas, fasteners} & \text{solid solution} \\
\text{Hastelloy X} & 345 & \text{combustor liners} & \text{solid solution} \\
\text{Inconel 718} & 1{,}030 & 650\ {}^{\circ}\mathrm{C}\text{: disks, shafts, fasteners} & 15\text{–}20\%\ ( \text{mainly } \gamma^{\prime \prime} ) \\
\text{Waspaloy} & 860 & 750\ {}^{\circ}\mathrm{C}\text{: turbine disks} & 25\% \\
\text{René N5 (single crystal)} & 1{,}050 & 1{,}050\ {}^{\circ}\mathrm{C}\text{: blade} & 60\% \\
\text{CMSX-10 (single crystal)} & 1{,}100 & 1{,}150\ {}^{\circ}\mathrm{C}\text{: blade} & 70\%
\end{array}
$$
**The three manufacturing routes** are **wrought** (isothermally forged disk, equiaxed, the toughest and cheapest per kilogram), **cast and directionally solidified** (a columnar grain structure with no transverse boundary, for blades), and **single crystal** (no grain boundary at all, which removes the creep cavity and lets the $\gamma^{\prime}$ fraction go to $70\ \%$ — a single-crystal blade costs $100$ times a machined steel one and runs $200\ {}^{\circ}\mathrm{C}$ hotter). **Powder metallurgy** makes the highest-strength disk alloys, such as **René 88DT**, **ME3** and **RR1000**, with a fine, segregation-free grain structure that no ingot can give.
**The failure modes are specific.** **$\gamma^{\prime}$ coarsening** (Ostwald, this lesson's [[materials-science/phase-transformations]]) sets the microstructural life. **TCP phase precipitation** — $\sigma$, $\mu$, $\chi$ — embrittles a high-refractory alloy after a few hundred hours at $900\ {}^{\circ}\mathrm{C}$ and is the reason a $6\%\ \mathrm{Re}$ alloy has a temperature ceiling. **Hot corrosion** is a molten $\mathrm{Na_2 SO_4}$ flux that destroys the $\mathrm{Al_2 O_3}$ scale. **Oxidation** is handled by a **MCrAlY bond coat** ($\mathrm{M} = \mathrm{Ni},\ \mathrm{Co},\ \mathrm{Fe}$) plus an **electron-beam physical-vapour-deposited** or suspension-plasma-sprayed **yttria-stabilised zirconia top coat** ($7$–$8\ \%$ yttria by mass) whose thermal expansion is only about two thirds of the metal's; between them the bond coat slowly grows a thermally grown oxide (**TGO**) of alumina. **The coating is a life-limited component**: once the TGO has thickened to a few micrometres the strain energy stored in it starts the spallation, and the coating's life is the blade's life.
:::

## Polymers, elastomers and adhesives

::: definition Thermoplastics, thermosets, elastomers {#def-polymers}
A polymer's properties are set by three things the metals do not have: the **glass-transition temperature** $T_g$, above which the amorphous chains go from glassy to rubbery; **crystallinity**, which a linear chain can reach to $60$ to $90\ \%$; and **cross-linking**, which turns a viscous liquid into a network.
$$
\begin{array}{l l c c l}
\text{Material} & T_g\ [{}^{\circ}\mathrm{C}] & \sigma_y\ [\mathrm{MPa}] & E\ [\mathrm{GPa}] & \text{Character} \\
\text{PP (polypropylene)} & - 10 & 35 & 1.4 & \text{cheapest structural plastic, hinges, car bumpers} \\
\text{HDPE} & - 120 & 26 & 1.0 & \text{tanks, pipes; } T_g \text{ far below room, so tough} \\
\text{Nylon 6,6} & 50 & 80 & 2.8 & \text{gears, bearings; } 8\% \text{ water by weight, and it swells} \\
\text{Acetal (POM)} & - 50 & 70 & 3.0 & \text{the dimensional nylon substitute, no water pickup} \\
\text{PC (polycarbonate)} & 147 & 65 & 2.4 & \text{transparent, tough, notch-sensitive, UV} \\
\text{PMMA} & 105 & 70 & 3.0 & \text{the aircraft canopy; brittle in a notch} \\
\text{PEEK} & 143 & 100 & 4.1 & 250\ {}^{\circ}\mathrm{C}\text{: the top engineering thermoplastic, fusion-weldable} \\
\text{PTFE} & 115\ (T_m 327) & 23 & 0.5 & \mu = 0.04, \text{creeps under a constant load — always spring-loaded} \\
\text{Epoxy casting} & 120 & 75 & 3.2 & \text{brittle, filled grades creep less} \\
\text{Natural rubber} & - 70 & 25 & 0.001 & 500\% \text{ extension, and the Payne and Mullins effects} \\
\text{NBR, FKM (Viton)} & - 40,\ - 20 & 10\text{–}15 & 0.01 & \text{oil and fuel seals; FKM to } 230\ {}^{\circ}\mathrm{C}
\end{array}
$$
**The four design rules that surprise metal engineers.** **Creep is the design limit, not the yield stress**: a PTFE gasket relaxes by half its stress in an hour at room temperature, and a nylon clip loaded for a year at $40\ \mathrm{MPa}$ fails while the same load for a minute does nothing. **Viscoelasticity means the modulus is a function of time and temperature**: quote the **creep modulus at the design life** — a nylon's $2.8\ \mathrm{GPa}$ at ten seconds is $0.9\ \mathrm{GPa}$ at $10{,}000\ \mathrm{h}$ — and use the **time-temperature superposition** to read a $100$-year modulus from a $100$-second test. **Water is a plasticiser**: nylon takes up $8\ \%$ by weight, which drops $T_g$ from $70$ to $50\ {}^{\circ}\mathrm{C}$ and the modulus by a factor of three, so a dry-as-moulded nylon gear is not the gear in service. **Notch sensitivity is severe**: a polycarbonate part with a scratch loses $60\ \%$ of its impact strength, and a PMMA canopy must be inspected for crazing.
:::

## Ceramics and glasses

::: definition Why ceramics are strong in compression and weak in tension {#def-ceramics}
A ceramic has no mobile dislocation at any temperature below $0.7\, T_m$ — the covalent-ionic bond gives a Peierls stress of $E / 10$ — so it cannot yield, cannot redistribute a stress concentration, and fails at the largest surface flaw at a stress $\sigma_f \propto a^{- 1 / 2}$. The result is a material with a compressive strength of $2{,}000\ \mathrm{MPa}$ and a tensile strength of $200$, and a **Weibull** rather than a Gaussian strength distribution:
$$
P_s ( V, \sigma ) = \exp \left[ - \frac{V}{V_0} \left( \frac{\sigma}{\sigma_0} \right)^{m} \right],
$$
with the **Weibull modulus** $m$ a measure of the scatter's size — $m = 5$ for a structural ceramic, $10$ for a fine hot-pressed one, $100$ for a metal. A component designed for a $0.1\ \%$ failure probability ($99.9\ \%$ survival) can be loaded to only $0.27$ times the median strength for $m = 5$, $0.52$ for $m = 10$ and $0.94$ for $m = 100$: **the scatter, not the mean, is the design constraint.**
$$
\begin{array}{l c c l}
\text{Material} & \sigma_{\mathrm{comp}}\ [\mathrm{MPa}] & \sigma_{\mathrm{flex}}\ [\mathrm{MPa}] & \text{Use} \\
\text{Concrete (in compression)} & 30\text{–}100 & 3 & \text{the world's most-used structural material, and never in tension} \\
\text{Soda-lime glass} & 1{,}000 & 40 & \text{weakened } 25\times \text{ by a surface crack} \\
\text{Fused silica} & 1{,}000 & 60 & \alpha = 0.5 \times 10^{- 6}, \text{the telescope mirror and the thermal-shock champion} \\
\text{Alumina } 96\% & 3{,}000 & 300 & \text{insulators, bearings, armour, biomedical} \\
\text{Silicon nitride} & 3{,}000 & 700 & \text{the best combination: bearings, engine parts, cutting tools} \\
\text{Silicon carbide} & 3{,}900 & 450 & 1{,}600\ {}^{\circ}\mathrm{C}\text{: kiln furniture, ballistic, semiconductor} \\
\text{ZTA, zirconia-toughened alumina} & 2{,}500 & 900 & \text{transformation-toughened: } 2\times \text{ alumina's toughness} \\
\text{C/C composite} & 200 & 300 & 2{,}200\ {}^{\circ}\mathrm{C}\text{: brake discs, re-entry nose caps}
\end{array}
$$
**The one way to make a ceramic tough is to spend energy in front of the crack.** **Transformation toughening** uses a stress-driven martensitic $\mathrm{t} \rightarrow \mathrm{m}$ transition in a zirconia particle, whose $4\ \%$ volume expansion closes the crack: partially-stabilised zirconia has a toughness of $10\ \mathrm{MPa\, m^{1/2}}$ against alumina's $3.5$, which is why hip-replacement balls were made of zirconia and are now made of zirconia-toughened alumina. **Fibre pull-out** in a ceramic matrix composite spends $100\times$ the fracture energy at the interface. **Pre-compression** — a tempered glass surface, a shot-peened ceramic, a compressive glaze on porcelain — is the cheapest and most used of all, and is why a glass bottle survives a thumb and a tempered pane survives a hammer.
:::

## Composites

::: definition Fibre, matrix, lay-up {#def-composites}
A composite puts a strong, stiff, brittle fibre in a weak, soft, tough matrix, and the matrix's job is **not** to carry load but to **set the fibre spacing, transfer shear, protect the fibre, and give the part a shape**. The rule of mixtures gives the fibre-direction properties and the inverse rule the transverse:
$$
E_1 = V_f E_f + \left( 1 - V_f \right) E_m , \qquad
\sigma_1 = V_f \sigma_f^{*} , \qquad
E_2 = \left[ \frac{V_f}{E_f} + \frac{1 - V_f}{E_m} \right]^{- 1} ,
$$
so a $60\ \%$ carbon-epoxy ply ($E_1 = 139$, $E_2 = 8.6\ \mathrm{GPa}$) is **sixteen times stiffer along the fibre than across it** — an anisotropy no metal or monolithic ceramic approaches.
$$
\begin{array}{l c c c l}
\text{Fibre} & E\ [\mathrm{GPa}] & \sigma\ [\mathrm{MPa}] & \text{Cost}\ [\$/\mathrm{kg}] & \text{Comment} \\
\text{E-glass} & 72 & 2{,}400 & 2 & \text{the commodity; } 90\% \text{ of all reinforcement} \\
\text{S-glass / S-2} & 85 & 4{,}600 & 25 & \text{ballistic, higher strain to failure} \\
\text{Carbon, standard-modulus} & 230 & 4{,}900 & 25 & \text{T700, the aerospace workhorse} \\
\text{Carbon, intermediate-modulus} & 276 & 5{,}600 & 60 & \text{IM7: primary structure} \\
\text{Carbon, high-modulus} & 588 & 3{,}800 & 300 & \text{M60J: stiffness-limited, and it mills the tool} \\
\text{Aramid (Kevlar 49)} & 130 & 2{,}800 & 100 & \text{impact and ballistic; compresses badly, absorbs water} \\
\text{UHMWPE (Dyneema)} & 100 & 3{,}600 & 60 & \text{floats, cuts, and creeps under a sustained load} \\
\text{Boron} & 400 & 3{,}200 & 500 & \text{the original: F-14 tails, and now niche} \\
\text{SiC (Nicalon, Tyranno)} & 200 & 3{,}000 & 3{,}000 & \text{the ceramic-matrix composite fibre, } 1{,}200\ {}^{\circ}\mathrm{C}
\end{array}
$$
**The lay-up is the design.** A $\left[ 0 / 90 \right]_{\mathrm{s}}$ cross-ply has the fibre-direction properties in one direction and almost none in the other; a quasi-isotropic $\left[ 0 / 60 / - 60 \right]_{\mathrm{s}}$ has the same in-plane modulus in every direction; a $\left[ + 45 / - 45 \right]_{2\mathrm{s}}$ is a **torsion** shell, used on drive shafts and on helicopter blades. Hart-Smith's **ten-per-cent rule** — each $\pm 45^{\circ}$ or $90^{\circ}$ ply contributes about a tenth of the stiffness and strength of a $0^{\circ}$ ply in the load direction — is the quick design estimate, and **first-ply failure** is the usual check on a laminate's strength.
**The matrix decides the manufacturing and the service temperature.** Epoxy at $120$ to $200\ {}^{\circ}\mathrm{C}\ T_g$ and $1$ to $2\ \%$ moisture pickup; **bismaleimide** at $250\ {}^{\circ}\mathrm{C}$; **PEEK** at $250$ and **polyimide** at $300$; **cyanate ester** for space dimensional stability. A moisture-saturated epoxy panel loses $30\ \%$ of its **compression** strength, because water plasticises the matrix, which then supports the fibre less and lets it microbuckle — which is why a hot-wet compression allowables test is the expensive part of an airframe programme.
:::

::: definition Damage, inspection and repair {#def-barely}
A composite's design strain is not its ultimate strain but its **barely-visible impact damage** strain: the strain at which a damage size that **cannot be found by the mandated inspection** reduces the compression strength to the required value.
$$
\begin{array}{l c c}
\text{Damage} & \text{Size} & \text{Compression strength retained} \\
\text{Undamaged} & - & 100\% \\
\text{Barely visible impact damage} & 6.4\ \mathrm{mm}\ \text{dia, } 27\ \mathrm{J} & 60\% \\
\text{Visible damage} & 13\ \mathrm{mm} & 40\% \\
\text{Delaminated, disbonded} & \text{any} & \text{local buckling governs}
\end{array}
$$
The impact that matters **barely dents the surface and destroys the inside**: a dropped wrench, a runway stone, a hailstone, a tool left in a wing skin during closure. The damage is a **sub-surface delamination** with a diameter three to five times the visible dent, and it is found by **tap test**, **ultrasonic through-transmission**, **thermography** or **laser-shearography** — none of which is a visual inspection.
**The repair is a bonded scarf patch or a bolted doubler.** A scarf has a taper of $20:1$ to $30:1$, its adhesive is cured at $120\ {}^{\circ}\mathrm{C}$ under a vacuum bag at about $85\ \mathrm{kPa}$, and its plies **match the parent's stiffness and lay-up** ply for ply, so that the patch neither sheds load nor attracts it. A repair that cannot be cured at temperature is a **room-temperature-cure** patch with a $50\ \%$ efficiency and a shorter inspection interval.
:::

::: widget plot
f: 207/x
x: 20, 450
labels: \text{deflection multiplier } 207/E
caption: The deflection multiplier when a steel part is replaced at the same section by a material of modulus $E$ (in GPa, horizontal axis). Aluminium at 73 gives 2.8, magnesium at 45 gives 4.6, a quasi-isotropic carbon laminate at 50 gives 4.1, titanium at 114 gives 1.8, and a unidirectional carbon laminate loaded along the fibre at 140 gives 1.5. Only materials stiffer than steel — beryllium, alumina, tungsten carbide — fall below 1.0; none of the common structural metals is stiffer than steel per unit volume.
:::

::: example The material-selection chart for a tie-rod {#ex-tie}
Select the material for a tie-rod of length $L$ that must carry a tension $P$ without yielding and without stretching more than $\delta$, at minimum mass. Give the index, screen the families, and pick.
::: solution
**The two constraints.** Mass $m = \rho A L$. Yield gives $A \ge P / \sigma_y$; stiffness gives $A \ge P L / \left( E \delta \right)$.
**The two indices.**
$$
\text{strength-limited: } m = \frac{\rho P L}{\sigma_y} \ \Rightarrow\ M = \frac{\sigma_y}{\rho} ; \qquad
\text{stiffness-limited: } m = \frac{\rho P L^{2}}{E \delta} \ \Rightarrow\ M = \frac{E}{\rho} .
$$
**The crossover.** Equating the two areas, the stiffness constraint governs when
$$
\frac{\delta}{L} < \frac{\sigma_y}{E} ,
$$
that is, when the permitted strain is **less than the elastic strain to yield** — which for engineering metals is $0.1$ to $0.8\ \%$, and $0.29\ \%$ for a $4140$ at $600\ \mathrm{MPa}$. A tie-rod allowed $0.2\ \%$ extension is stiffness-limited and the high-strength materials are irrelevant; one allowed $1\ \%$ is strength-limited.
**Screening.** For $E / \rho$ (in $\mathrm{MN\, m / kg}$) the ranking is unidirectional CFRP $90$, then **every structural metal at $26$**, then glass and concrete. For $\sigma_y / \rho$ (in $\mathrm{kN\, m / kg}$) the ranking is carbon fibre $2{,}700$ and aramid $1{,}900$ (as bare fibres; a unidirectional CFRP rod at $2{,}000\ \mathrm{MPa}$ gives $1{,}300$), then the maraging and Ti alloys at $200$ to $250$, then $7075$ at $179$, then steels at $70$ to $170$; concrete, with almost no tensile strength, is not a candidate.
**Choice.** A steel tie-rod at $0.2\ \%$ is as light as a titanium one and a fifth the cost — **the answer is $4140$ or a $25\mathrm{CrMo}$, and the only way to improve it is to change the shape**, by making the rod hollow and longer, or by prestressing it. A tie-rod allowed $1\ \%$ extension is strength-limited, and against the same $4140$ at $600\ \mathrm{MPa}$ the answer is a **Ti-6Al-4V rod at $880\ \mathrm{MPa}$ with $62\ \%$ less mass** or a **unidirectional CFRP rod at $2{,}000\ \mathrm{MPa}$ with about $94\ \%$ less**, at many times the cost.

*Check.* A $4140$ rod at $600\ \mathrm{MPa}$ and $0.2\ \%$ strain: the stress at the strain limit is $207 \times 0.002 = 414\ \mathrm{MPa}$, below yield, so the stiffness constraint does govern and the mass is set by $E / \rho$. $\checkmark$

*Sanity.* This is the reason a bicycle's frame can be made lighter in carbon than in steel **only** if the tubes are butted and shaped, and the reason a $300$-year-old wrought-iron chain is still strong enough: iron and steel are not weak, they are merely not stiff for their weight, and no material substitution fixes that.
:::
:::

::: example Seawater pump shaft {#ex-shaft}
Select the material for a $40\ \mathrm{mm}$ pump shaft running in seawater with a $400\ \mathrm{N\, m}$ torque and a $2{,}000\ \mathrm{h}$-per-year duty.
::: solution
**The stress.** $\tau = 16\, T / \pi d^{3} = 16 \times 400 / \left( \pi \times 0.04^{3} \right) = 32\ \mathrm{MPa}$ — trivially low. **The design is not a strength design.**
**The candidate list and its elimination.**
$$
\begin{array}{l l}
\text{4140 steel} & \text{corrodes in hours; rejected} \\
\text{304 stainless} & \text{pits and crevice-corrodes in still seawater; } \mathrm{PRE} = 19; \text{ rejected} \\
\text{316L stainless} & \text{marginal in still seawater, good in flowing; } \mathrm{PRE} = 24\text{–}26 \\
\text{17-4PH} & \text{strong, but its pitting resistance is 304-like; rejected for static duty} \\
\text{Duplex 2205} & \mathrm{PRE} = 35; \text{ strong, and the modern answer} \\
\text{Ni-Al bronze} & \text{traditional, erosion-resistant, but weaker and prone to galling} \\
\text{Titanium Gr.2 / Gr.12} & \text{immune to flowing seawater; crevice-sensitive; } \textbf{cathodic to everything} \\
\text{Super-duplex 2507} & \mathrm{PRE} = 43; \text{ the specification answer} \\
\text{FRP with a steel core} & \text{light, but the core and its bond are the weak link}
\end{array}
$$
**Choice.** **Super-duplex 2507**, solution-annealed and quenched, with a minimum $\mathrm{PRE}$ of $40$ and a **controlled ferrite–austenite balance** in the weld.
**The three things that actually kill the shaft.** **Galvanic corrosion at the coupling**: a duplex shaft bolted to a bronze or an aluminium housing with no insulation corrodes at the joint and nowhere else; the fix is an insulating flange kit and a coating on the housing. **Cathodic protection design**: if the shaft is on a boat with zinc anodes, an **uninsulated** titanium shaft becomes a cathode and the hydrogen evolved on it can form brittle hydrides — a known failure mode. **Fretting at the keyway or the shrink fit**: a stainless or duplex shaft frets in its coupling bore within a week; the fix is a taper-and-drawbar or a friction-locked coupling, a specified surface finish, and no key.

*Design comment.* The general rule is that **most "material" failures in seawater are not the material's corrosion but the design's**: galvanic pairs, crevices, stagnation, differential aeration under a deposit, and fretting. A super-duplex shaft in a design with an insulated flange, no crevice, a flow and no key will outlast the pump. The same shaft in the same alloy with a carbon-steel bolt through it will fail in a season.
:::
:::

::: example Cryogenic and hot {#ex-temp}
Select the material for (a) a liquid-oxygen pump casing at $-183\ {}^{\circ}\mathrm{C}$ and (b) an exhaust manifold at $900\ {}^{\circ}\mathrm{C}$ continuous.
::: solution
**(a) Liquid oxygen.** The requirements are a ductile-to-brittle transition far below $-183\ {}^{\circ}\mathrm{C}$, an **ignition** resistance in oxygen, and no adiabatic-compression ignition of a lubricant.
$$
\begin{array}{l l}
\text{Carbon steel, 4140} & \text{below or near the transition; and it burns in oxygen; rejected} \\
\text{Aluminium} & \text{tough, but } \textbf{flammable in liquid-oxygen-wetted service}; \text{ rejected} \\
\text{Magnesium} & \text{rejected without discussion} \\
\text{304L / 316L stainless} & \text{the standard answer; FCC, tough at } 90\ \mathrm{K}; \text{ hard to ignite at moderate pressure} \\
\text{Bronze, Monel} & \text{the traditional answer for valves and bearings; non-sparking} \\
\text{Ti-6Al-4V} & \text{tough, but } \textbf{is} \text{ an ignition hazard in high-pressure } \mathrm{O_2}; \text{ rejected} \\
\text{Inconel 718} & \text{where the strength or the fatigue is needed}
\end{array}
$$
**Choice: 316L for the casing, a bronze for the bearings and wear rings, and no elastomer that is not a certified oxygen grade.** The design rules are limits on the flow velocity in the oxygen-wetted passages, bronze or Monel wherever parts can rub, and a cleanliness specification — hydrocarbon-free, iron-free — because a fingerprint on a liquid-oxygen valve is a bomb.
**(b) $900\ {}^{\circ}\mathrm{C}$ exhaust manifold.**
$$
\begin{array}{l c l}
\text{Material} & \text{Limit} & \text{Comment} \\
\text{Cast iron SiMo (4\% Si)} & 700\ {}^{\circ}\mathrm{C} & \text{cheap, grows } 1\% \text{ and stops working} \\
\text{409 / 430 ferritic stainless} & 800\ {}^{\circ}\mathrm{C} & \text{the car-manifold answer, and it is cyclic, not continuous} \\
\text{321 / 347 austenitic} & 870\ {}^{\circ}\mathrm{C} & \text{Ti- or Nb-stabilised against sensitisation} \\
\text{310S (25Cr-20Ni)} & 1{,}100\ {}^{\circ}\mathrm{C} & \text{the continuous-duty answer at a moderate stress} \\
\text{Hastelloy X, Inconel 617} & 1{,}150\ {}^{\circ}\mathrm{C} & \text{where the stress is high} \\
\text{SiC/SiC CMC} & 1{,}300\ {}^{\circ}\mathrm{C} & \text{the next generation, and expensive}
\end{array}
$$
**Choice: 310S for a $900\ {}^{\circ}\mathrm{C}$ continuous duty at a stress below $40\ \mathrm{MPa}$**, with **321** if the duty is cyclic and the stress low, and **Hastelloy X** if the stress is above $80\ \mathrm{MPa}$. The design must be **compression- or bending-loaded where possible, thin-walled to shed thermal gradient, and free of constraint** — a $900\ {}^{\circ}\mathrm{C}$ manifold that is rigidly bolted at both ends fails by thermal fatigue in a week regardless of the alloy.

*Design comment.* The general rule is that **a temperature specification is two specifications**: a strength limit and an environmental limit, and the environment usually binds first. A $900\ {}^{\circ}\mathrm{C}$ manifold is not limited by the alloy's creep strength, which is ample, but by its **scale spallation on cycling** — which is why a ferritic grade fails where an austenitic one survives and why a $310\mathrm{S}$ part that runs continuously for a year fails in a week of stop-start.
:::
:::

::: example Design {#ex-design-fam}
Select the material and the process for a $0.4\ \mathrm{m}$-long automotive suspension control arm that must survive $10^{6}$ road-load cycles at a mass below $1.2\ \mathrm{kg}$, at a unit cost below $\$12$ in $100{,}000$-per-year volumes.
::: solution
**The load case.** A control arm is a **bending-and-torsion fatigue** part with a **survival** requirement — no crack, ever — and a **corrosion** requirement against road salt. It is not stiffness-critical, because the bushings and the spring dominate the compliance.
**The candidates.**
$$
\begin{array}{l c c c l}
\text{Option} & \text{Mass} & \text{Cost} & \text{Fatigue} & \text{Verdict} \\
\text{Stamped steel, welded} & 1.6\ \mathrm{kg} & \$6 & \text{good, weld-sensitive} & \text{too heavy} \\
\text{Cast aluminium A356-T6} & 1.1\ \mathrm{kg} & \$14 & \text{porosity-limited, } 90\ \mathrm{MPa} & \text{too costly, fatigue marginal} \\
\text{Forged 6061} & 0.9\ \mathrm{kg} & \$22 & \text{excellent} & \text{too costly} \\
\text{Tube-hydroformed HSLA} & 1.15\ \mathrm{kg} & \$10 & \text{excellent, no welds in the high-stress zone} & \text{meets all three} \\
\text{Ductile iron ADI} & 1.4\ \mathrm{kg} & \$7 & \text{good} & \text{too heavy} \\
\text{CFRP overmoulded} & 0.7\ \mathrm{kg} & \$60 & \text{excellent} & \text{fails the cost test by } 5\times
\end{array}
$$
**Choice: a hydroformed HSLA-355 tube, laser-cut and robot-welded to forged steel eyes, zinc-nickel plated.** The hydroforming work-hardens the tube walls by $30$ to $50\ \%$ at the corners where the stress is, gives a closed section with a high torsional stiffness, and eliminates the two longitudinal welds of a stamped clamshell.
**The design details that decide the outcome.** **The eye-to-arm weld** is the fatigue-critical feature, and its detail factor is $K_f = 3.0$ as a plain fillet and $1.6$ as a **full-perimeter** weld with a **dress-ground toe**; the drawing must specify the grinding. **The road-salt case** is a corrosion-fatigue life of $0.4$ times the air life, so the plating is a specification item and a **zinc-nickel with a trivalent passivate** is the current answer, not zinc. **The survival requirement** means the design stress is the **fatigue limit at $10^{6}$ cycles with a $10\ \%$ probability of failure**, not the yield, and that the **mean stress** from the corner-load case must be Goodman-corrected. **The mass** is met by putting the material in the tube wall and not in a boss, and by making the arm hollow where the moment is low.

*Design comment.* The general rule is that **at a mass target a metal family loses to a shape before it loses to another family**. The stamped-steel arm at $1.6\ \mathrm{kg}$ and the hydroformed one at $1.15\ \mathrm{kg}$ are the same alloy, the same coating and the same tooling budget; the $28\ \%$ saving is a section. The aluminium arm at $1.1\ \mathrm{kg}$ costs $40\ \%$ more and is more fatigue-sensitive, and the composite arm is a $5\times$ cost failure. In a $100{,}000$-per-year volume the process choice is the material choice.
:::
:::

::: history
**Benjamin Huntsman**'s crucible steel, made near Sheffield from about 1740, gave the first homogeneous cast steel; **Henry Bessemer**'s converter of 1856, with **Robert Mushet**'s addition of spiegeleisen in the same year to put back the manganese and the carbon, made steel cheap; and **Pierre-Émile Martin**'s open hearth of 1864–65, built on **William Siemens**'s regenerative furnace, made it controllable. **Robert Hadfield**'s manganese steel of 1882, with about $12\ \%$ manganese, which work-hardens under impact, began alloy-steel design. Stainless steel came from two directions within a year: **Benno Strauss** and **Eduard Maurer** at Krupp patented the austenitic chromium-nickel steels in 1912, and **Harry Brearley** in Sheffield, looking for an erosion-resistant gun-barrel steel in 1913, noticed that his $13\ \%$ chromium martensitic steel resisted the etching reagents used for metallography. **Alfred Wilm** discovered the age hardening of an aluminium-copper-magnesium alloy in 1906, and the **Dürener Metallwerke** produced it as Duralumin from 1909; **Alcoa** introduced 24S (2024) in 1931 and the zinc-bearing 75S (7075) in 1943, first used on the B-29. **William Justin Kroll** developed the reduction of $\mathrm{TiCl_4}$ by magnesium in his laboratory in Luxembourg in the 1930s and described it in 1940, and the US Bureau of Mines scaled the process up in the 1940s; **Kelly Johnson**'s Skunk Works built the A-12 and SR-71 largely of titanium. The **Mond Nickel Company**'s Nimonic 80 of 1941, developed in Birmingham under **Leonard Pfeil** for the turbine blades of Whittle's jet engines, was the first of the British nickel superalloys; **Frank VerSnyder**'s group at Pratt & Whitney developed directionally solidified blades in the 1960s and then single-crystal blades, which were in production engines within about ten years. **Waloddi Weibull**, a Swedish engineer, published his statistical theory of the strength of materials in 1939 and the distribution that bears his name in general form in 1951. **R. C. Garvie**, **R. H. Hannink** and **R. T. Pascoe**'s 1975 *Nature* paper "Ceramic steel?" showed that the martensitic transformation of zirconia could toughen a ceramic. High-strength carbon fibre from polyacrylonitrile was developed by **Akio Shindo** in Japan around 1961 and by **William Watt**, **Leslie Phillips** and **William Johnson** at the Royal Aircraft Establishment, Farnborough, in 1963–64; **Toray**'s T300 of 1971 made it an industrial material, and the **Boeing 787**, in service from 2011, is about half composite by structural weight.
:::

## Where this leads

The property charts that order these families are the subject of [[materials-science/materials-selection]], the strengthening mechanisms behind them are those of [[materials-science/dislocations-strengthening]], the tempers and heat treatments are the transformations of [[materials-science/phase-transformations]], and the environmental limits that eliminate most of the list are the corrosion of [[materials-science/corrosion]].

::: summary
- Steel, aluminium, titanium and magnesium all have $E / \rho = 26 \pm 1\ \mathrm{MN\, m / kg}$: stiffness for weight cannot be bought with a metal, only with a fibre, a sandwich or a shape.
- Steels are ranked by cost and by what the alloying elements do; the pitting-equivalent $\mathrm{PRE} = \% \mathrm{Cr} + 3.3\, \% \mathrm{Mo} + 16\, \% \mathrm{N}$ ranks the stainless grades against chloride.
- Cast iron's graphite shape is its design: flake for damping, spheroidal for strength, ausferrite for a forged-steel replacement.
- The aluminium temper designation is part of the specification, and a weld or a missing re-age costs $40$ to $50\ \%$ of the strength.
- Titanium's price is the batch Kroll process and its cautions are galling, crevice corrosion, hydrogen and ignition in oxygen.
- Superalloys hold $\gamma^{\prime}$ at $0.7\, T_m$; the single crystal removes the creep cavity and the coating is the life-limited part.
- Polymers are designed on the creep modulus at the design life, not the ten-second modulus, and water is a plasticiser.
- Ceramics are designed on the Weibull scatter and made tough by spending energy ahead of the crack.
- A composite is designed on barely-visible impact damage, and its specification is its inspection and repair scheme.
:::

::: quiz
A designer replaces a steel leaf spring with an aluminium one of the same section to save weight. What happens?
- [x] The spring is too soft and deflects 2.8 times as much
- [ ] The spring is stiffer because aluminium is stronger per kilogram
- [ ] The spring behaves the same but weighs a third less
- [ ] The spring fails immediately by fatigue
::: solution
The deflection is inversely proportional to $E$, and $E_{\mathrm{Al}} / E_{\mathrm{st}} = 73 / 207 = 0.35$, so the aluminium spring is $2.8$ times as soft. A spring is a **stress**-limited design whose deflection is **stiffness**-limited, and the two requirements pull in opposite directions: the aluminium can be made to give the same load-deflection by a longer or thicker leaf, and then it stores less energy per unit mass because $U_r = \sigma_y^{2} / 2 E$ is not much better than steel's. The real spring materials are the high-carbon and chrome-vanadium steels, and the real weight saving comes from a **torsion bar** or a **coil** in a $55\mathrm{Si}7$ or a $60\mathrm{CrV}4$ at a $1{,}700\ \mathrm{MPa}$ design stress.
:::
:::

## Exercises

::: exercise Specific stiffness {level=1 check="26"}
To two significant figures, what is $E / \rho$ in $\mathrm{MN\, m / kg}$ for steel, aluminium, titanium and magnesium?
::: solution
$26 \pm 1$ — steel $207 / 7.85 = 26.4$, aluminium $70 / 2.70 = 25.9$, titanium $114 / 4.43 = 25.7$, magnesium $45 / 1.74 = 25.9$.
:::
:::

::: exercise Stainless {level=1 check="26"}
Give the pitting-resistance equivalent of a 316 stainless with $17\ \%$ Cr, $2.5\ \%$ Mo and $0.05\ \%$ N.
::: solution
$17 + 3.3 \times 2.5 + 16 \times 0.05 = 26.05 \approx 26$.
:::
:::

::: exercise Cast iron {level=1 check="3"}
Roughly what factor does a magnesium treatment of the graphite multiply a cast iron's tensile strength by?
::: solution
About three — a typical grey iron at about $250\ \mathrm{MPa}$ against a ductile iron at $700$.
:::
:::

::: exercise Superalloys {level=1 check="70"}
What $\gamma^{\prime}$ volume fraction does a modern single-crystal turbine blade contain? (Enter the percentage.)
::: solution
About $70\ \%$ — and the single crystal is what lets the fraction go that high.
:::
:::

::: exercise Weibull {level=1 check="5"}
What is the typical Weibull modulus of a structural ceramic?
::: solution
About $5$ — against $100$ for a metal.
:::
:::

::: exercise Panel replacement {level=2}
A steel panel is to be replaced by a **stiffness-matched** magnesium panel. Give the mass ratio and the thickness ratio.
::: solution
$$
\frac{m_{\mathrm{Mg}}}{m_{\mathrm{st}}} = \frac{1.77}{7.85} \left( \frac{207}{45} \right)^{1 / 3} = 0.225 \times 1.66 = 0.375 , \qquad
\frac{t_{\mathrm{Mg}}}{t_{\mathrm{st}}} = 1.66 .
$$
*Sanity.* A $62.5\ \%$ mass saving and a $66\ \%$ thickness increase — magnesium does better than aluminium because its modulus is proportionally less bad than its density. The catch is that the thicker panel has a lower **buckling** margin per unit mass, that magnesium creeps at $120\ {}^{\circ}\mathrm{C}$, and that the joint must be insulated from every other metal in the assembly.
:::
:::

::: exercise Composite {level=2 check="16.3"}
A unidirectional carbon-epoxy ply has $V_f = 0.6$, $E_f = 230\ \mathrm{GPa}$ and $E_m = 3.5\ \mathrm{GPa}$. Give $E_1$, $E_2$ and the anisotropy ratio. (Enter $E_1 / E_2$.)
::: solution
$$
E_1 = 0.6 \times 230 + 0.4 \times 3.5 = 139.4\ \mathrm{GPa} , \qquad
E_2 = \left[ \frac{0.6}{230} + \frac{0.4}{3.5} \right]^{- 1} = 8.55\ \mathrm{GPa} .
$$
The ratio is $139.4 / 8.55 = 16.3$. *Sanity.* The transverse modulus is only $2.4$ times the resin's, because the transverse loading is a **series** arrangement dominated by the softest phase. This is why a laminate needs $\pm 45^{\circ}$ plies for anything but a unidirectional load, and why a composite's in-plane shear modulus of $4\ \mathrm{GPa}$ is the property that governs a stiffened panel's torsion.
:::
:::

::: exercise Tie-rod {level=2 check="7.6"}
A $1\ \mathrm{m}$ tie-rod must carry $100\ \mathrm{kN}$ and stretch no more than $0.5\ \mathrm{mm}$. Give the minimum mass for a 4140 steel rod ($600\ \mathrm{MPa}$ yield) and for a Ti-6Al-4V rod, and say which constraint governs. (Enter the steel rod's mass in kg.)
::: solution
The permitted strain is $0.05\ \%$, far below steel's $0.29\ \%$ yield strain, so **stiffness governs**.
$$
A = \frac{P L}{E \delta} = \frac{100 {,}000 \times 1}{207 \times 10^{9} \times 5 \times 10^{- 4}} = 966\ \mathrm{mm}^{2} ,
$$
giving $m = \rho A L = 7.85 \times 966 \times 10^{- 3} = 7.6\ \mathrm{kg}$ for steel. For titanium, $A = 1{,}754\ \mathrm{mm}^{2}$ and $m = 7.8\ \mathrm{kg}$ — **the titanium is heavier**, because $E / \rho$ is the same and the stiffness constraint is the only one that matters.
*Sanity.* The steel rod's stress is $103\ \mathrm{MPa}$, a sixth of yield, so there is no strength argument at all. The only ways to improve the design are to make the rod shorter, to allow more extension, or to change the structure so the member is not a tie-rod.
:::
:::

::: exercise Derivation {level=3}
Derive the stiffness- and strength-limited mass indices for a **bending** panel of prescribed stiffness and strength, and show why the optimum material for a stiff panel is not the optimum for a strong one.
::: solution
**Stiffness.** $EI = E b t^{3} / 12$ is prescribed, so $t \propto \left( 12\, EI / E b \right)^{1 / 3}$ and
$$
m = \rho b L t \propto \frac{\rho}{E^{1 / 3}} \ \Rightarrow\ \boxed{ M = \frac{E^{1 / 3}}{ \rho} } .
$$
**Strength.** The bending stress is $\sigma = 6 M_x / b t^{2}$, so $t \propto \left( 6 M_x / \sigma_y b \right)^{1 / 2}$ and
$$
m \propto \frac{\rho}{\sigma_y^{1 / 2}} \ \Rightarrow\ \boxed{ M = \frac{\sigma_y^{1 / 2}}{\rho} } .
$$
**Why the optima differ.** Evaluate both for a candidate list ($E$ in GPa, $\sigma_y$ in MPa, $\rho$ in $\mathrm{Mg / m^{3}}$), each index divided by its value for mild steel:
$$
\begin{array}{l c c c c c c c}
\text{Material} & E & \sigma_y & \rho & E^{1 / 3} / \rho & \text{rank} & \sigma_y^{1 / 2} / \rho & \text{rank} \\
\text{Mild steel} & 207 & 250 & 7.85 & 1.00 & 5 & 1.00 & 6 \\
\text{4140 QT} & 207 & 655 & 7.85 & 1.00 & 5 & 1.62 & 5 \\
\text{2024-T3} & 73 & 325 & 2.78 & 1.99 & 2 & 3.22 & 4 \\
\text{7075-T651} & 72 & 503 & 2.81 & 1.96 & 3 & 3.96 & 2 \\
\text{Ti-6Al-4V} & 114 & 880 & 4.43 & 1.45 & 4 & 3.32 & 3 \\
\text{CFRP quasi-iso} & 50 & 600 & 1.55 & 3.15 & 1 & 7.85 & 1
\end{array}
$$
**The two rankings are not the same.** Among the metals, **2024 is (narrowly) the best stiff panel and 7075 the best strong one**; **Ti-6Al-4V is third for strength but fourth for stiffness**, because its strength is exceptional and its modulus only moderate; and **4140 is no better than mild steel for stiffness** although it is $1.6$ times better for strength. CFRP leads both lists, and a sandwich — a light core between two stiff faces — beats every one of them.
*Sanity.* The exponents are the reason a **shape** is worth more than a **material**: the stiffness index has a cube root, so a $2\times$ thickness increase buys $8\times$ the stiffness at $2\times$ the mass, and a hollow or a stiffened section beats any substitution.
:::
:::

::: exercise Design {level=3}
Select the material and process for a high-pressure hydrogen cylinder at $70\ \mathrm{MPa}$ for a vehicle, with a mass target of $5\ \mathrm{kg}$ of hydrogen per $100\ \mathrm{kg}$ of cylinder, and justify the choice against the alternatives.
::: solution
**The physics of the requirement.** At $70\ \mathrm{MPa}$ the hoop stress in a thin-walled cylinder is $\sigma_\theta = p r / t$, so the mass for a given pressure and volume is minimised by $\rho / \sigma_y$ — a **strength**-limited design, and the specific-stiffness argument of the tie-rod does not apply.
**The candidates.**
$$
\begin{array}{l c c l}
\text{Option} & \text{Mass fraction of H}_2 & \text{Cost} & \text{Verdict} \\
\text{All-steel (Type I)} & \approx 1\% & \text{lowest} & \text{heavy; stationary only} \\
\text{Steel liner, glass/epoxy (Type II)} & \approx 2\% & \text{low} & \text{no real weight benefit at 70 MPa} \\
\text{Al liner, carbon/epoxy (Type III)} & 4\text{–}5\% & \text{high} & \text{marginal; liner fatigue limits the life} \\
\text{Polymer liner, carbon/epoxy (Type IV)} & 5\text{–}6\% & \text{high} & \text{the best, and the answer} \\
\text{Titanium liner, carbon/epoxy} & - & \text{highest} & \text{hydrogen embrittlement of Ti; rejected} \\
\text{Metal-organic framework at 100 bar} & \approx 2\% & - & \text{research}
\end{array}
$$
**Choice: Type IV — a HDPE or nylon-6 liner, fully overwrapped with T700 or IM7 carbon fibre in an epoxy matrix, with an aluminium or stainless-steel boss.** The production fuel-cell cars of the 2010s and 2020s store about $5$ to $6$ kg of hydrogen per $100$ kg of tank in exactly this construction.
**The four design problems.** **Permeation**: hydrogen diffuses through polyethylene, so the liner material and thickness are chosen to meet the **maximum permeation rate** that the vehicle regulations set, and the specification must say so. **Liner collapse**: a Type IV liner is not pressure-retaining on its own and its **buckling under the composite's shrink-fit at cure** is a real failure mode. **Boss design**: the load path from the $70\ \mathrm{MPa}$ end load into the fibre is the highest-stressed feature in the part, and the **metal-to-composite** joint is where the qualification testing fails. **Fire and impact**: a composite cylinder must pass a bonfire test in which its thermally activated **pressure-relief device** vents the hydrogen before the heated laminate can rupture, and drop and penetration tests that show it does not fragment.
**The cost reality.** Carbon fibre is $60\ \%$ of the cylinder's cost, and the industry's cost-down path is a **cheaper intermediate-modulus fibre from a non-aerospace supplier** and a **faster filament-winding rate**, not a different material.

*Design comment.* The general rule is that **a pressure vessel is a strength design and a composite design, and the composite's anisotropy is exactly what the requirement wants**: a cylinder needs twice as much strength in the hoop as in the axial direction, and a filament-wound shell at a $54.7^{\circ}$ geodesic angle gives precisely that ratio. A metal shell is essentially isotropic and carries the axial direction at twice the strength it needs, so the composite is not merely an improvement on the steel cylinder — it is the material that fits the load.
:::
:::
