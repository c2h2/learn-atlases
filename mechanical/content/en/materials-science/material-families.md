There are perhaps two hundred materials an engineer is ever asked to choose from, and they sort into six families with a seventh — the composites — that is not a family but a method. Each family exists because of one thing: **steels because of iron and carbon, aluminium because of the oxide film, titanium because of the price of reducing it, superalloys because nothing else holds $\gamma^{\prime}$ above $0.7\, T_m$, polymers because of the entropy of a coiled chain, ceramics because the bond is too strong to allow a dislocation, and composites because no single material is strong in two directions.**

The single most useful number in this lesson is that **every metal has the same specific stiffness**: $E / \rho = 26 \pm 1\ \mathrm{MN\, m / kg}$ for steel, aluminium, titanium, magnesium, copper, nickel and every alloy of all of them. Stiffness is set by the curvature of the interatomic potential and density by the atomic mass, and the two rise together along the whole periodic table. **You cannot buy stiffness by weight with a metal.** You can only buy it with a fibre, a sandwich or a shape.

::: warning Five ways families get mis-specified
**Substituting for stiffness and specifying strength.** A designer who replaces a steel bracket with aluminium "to save weight" and keeps the section finds a bracket that is $2.5$ times as heavy in deflection, because $E / \rho$ is identical. The aluminium saves weight only when the design is **strength**-limited or when the section can be **thickened**, and the saving is $\left( \rho_i / \rho_s \right) \left( E_s / E_i \right)^{1 / 3} = 0.49$ for a stiff panel and $0.39$ for a strong one — not the $0.35$ a naive density ratio suggests. **Specifying a stainless steel for corrosion and getting sensitisation.** 304 in a weld leaves chromium carbide on the boundaries and corrodes there; the answer is the $\mathrm{L}$ grade or a titanium-stabilised 321, and it must be in the drawing. **Specifying a precipitation-hardening alloy and not saying when it is aged.** A $6061\text{-}\mathrm{T}6$ bracket machined from $\mathrm{T}4$ stock and not re-aged is $40\ \%$ weaker, and a $17\text{-}4\mathrm{PH}$ machined in the $\mathrm{H}900$ condition and then stress-relieved at $620\ {}^{\circ}\mathrm{C}$ is over-aged and $25\ \%$ weaker. **Specifying titanium for seawater and forgetting galling and crevice.** Titanium resists flowing seawater superbly and stagnant, creviced, painted-under seawater poorly, and its galling on a threaded steel fastener seizes a joint in one make-and-break. **Specifying a composite and not the damage.** A CFRP panel has a compressive strength after $2\ \mathrm{kJ}$ of impact energy of $60\ \%$ of its undamaged value, is not inspectable by eye, and is repaired by a bonded patch whose cure temperature the structure must survive. The composite's specification is its **inspection and repair scheme**, and a specification without one is incomplete.
:::

## Steels

::: definition The steel families {#def-steels}
$$
\begin{array}{l l c c l}
\text{Family} & \text{Example} & \sigma_y\ [\mathrm{MPa}] & \text{Cost} & \text{The reason it exists} \\
\text{Plain carbon, hot-rolled} & 1008\text{–}1025,\ \text{A36} & 220\text{–}350 & 1.0 & \text{cheap, weldable, tough, everything else is a compromise} \\
\text{Cold-drawn} & 1045\ \text{CD} & 530 & 1.3 & \text{work hardening buys } 2\times \text{ the yield for no alloy cost} \\
\text{HSLA / microalloyed} & \text{HSLA 50, S355, X70} & 350\text{–}690 & 1.1 & \text{precipitation and grain refinement, no heat treatment, weldable} \\
\text{Quenched and tempered} & 4140, 4340, 300M & 600\text{–}1{,}900 & 2\text{–}4 & \text{the strength, at a price in weldability and toughness} \\
\text{Maraging} & 18\text{Ni 250, 300, 350} & 1{,}700\text{–}2{,}500 & 15 & 18\%\ \text{Ni, no carbon: } K_{Ic} > 150 \text{ at full strength} \\
\text{Tool and die} & A2, D2, M2, H13 & 1{,}400\text{–}1{,}900 & 5 & \text{hardness and hot hardness from } \mathrm{Cr}, \mathrm{Mo}, \mathrm{W}, \mathrm{V} \\
\text{Stainless, ferritic} & 430 & 310 & 3 & 17\%\ \mathrm{Cr}, \text{no Ni, cheap, no transition but no work hardening} \\
\text{Stainless, martensitic} & 410, 420, 440C & 750\text{–}1{,}600 & 4 & 13\%\ \mathrm{Cr} + \mathrm{C}, \text{hardenable, cutlery, bearings} \\
\text{Stainless, austenitic} & 304, 316, 316L & 205\text{–}310 & 6 & 18/8: \text{formable, weldable, cryogenic-tough, work-hardens} \\
\text{Stainless, duplex} & 2205, 2507 & 450\text{–}550 & 6 & \text{austenite + ferrite: } 2\times 316\text{'s strength, chloride-resistant} \\
\text{Stainless, PH} & 17\text{-}4\mathrm{PH},\ \mathrm{A}286 & 1{,}000\text{–}1{,}350 & 10 & \text{copper or } \gamma^{\prime} \text{ precipitation in a corrosion-resistant matrix} \\
\text{Bearing} & 52100 & 2{,}000\ (\text{contact}) & 4 & 1\%\ \mathrm{C}, 1.5\%\ \mathrm{Cr}, \text{hardened to } 62\text{–}66\ \mathrm{HRC}
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
\mathrm{Al},\ \mathrm{Si},\ \mathrm{Cr},\ \mathrm{Si} & \text{oxidation resistance at temperature: the } 5\%\text{, } 9\%\text{, } 20\%\ \mathrm{Cr} \text{ heat-resisting grades}
\end{array}
$$
The **pitting-resistance equivalent** $\mathrm{PRE} = \% \mathrm{Cr} + 3.3\, \% \mathrm{Mo} + 16\, \% \mathrm{N}$ ranks the stainless grades against chloride pitting: $304$ scores $19$ and pits in seawater, $316$ scores $26$ and survives cold seawater, $2205$ scores $34$ and $6\%\ \mathrm{Mo}$ super-austenitics score $45$. A duplex $2205$ with a $\mathrm{PRE}$ of $34$ is the seawater answer at half the nickel of an alloy 625.
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

*Check.* The deflection of the $5.7\ \mathrm{mm}$ aluminium panel equals that of the $4\ \mathrm{mm}$ steel panel exactly, since $E t^{3} = 73 \times 185 = 13{,}500$ against $207 \times 64 = 13{,}250$. $\checkmark$

*Sanity.* The general rule is that **aluminium is a strength material and not a stiffness material**. Where the design is stiffness-limited and the section cannot grow — a machine bed, a shaft, a spring, a bearing housing — aluminium buys nothing and magnesium or a sandwich does. Where it is strength-limited, aluminium is the cheapest kilogram-saver there is, and where the section *can* grow, a $1.42$ thickness increase may be free and the saving is real.
:::
:::

## Cast irons

::: definition The four irons {#def-irons}
At the $3.5\ \%$ carbon eutectic a ferrous alloy cannot be forged and must be cast, and the way the carbon solidifies defines four families:
$$
\begin{array}{l l c c l}
\text{Family} & \text{Microstructure} & \sigma_{\mathrm{UTS}}\ [\mathrm{MPa}] & \text{Elong.} & \text{Why it is used} \\
\text{Grey} & \text{flake graphite, lamellar pearlite} & 150\text{–}400 & 0.5\% & 350: 12\ \text{times the damping of steel, and a self-lubricating surface} \\
\text{Compacted (vermicular)} & \text{worm graphite} & 350\text{–}500 & 1\% & \text{cylinder heads: grey's conductivity, ductile's strength} \\
\text{Ductile (SG, nodular)} & \text{spheroidal graphite, } \mathrm{Mg} \text{ treated} & 400\text{–}800 & 10\text{–}18\% & 500\text{-}7: \text{the workhorse; a crankshaft, a wind-turbine hub} \\
\text{Austempered (ADI)} & \text{ausferrite matrix} & 1{,}000\text{–}1{,}600 & 10\text{–}20\% & 1200\text{-}3: \text{a forged-steel replacement at a casting's cost} \\
\text{White / chilled} & \mathrm{Fe_3C} \text{ as-cast} & 400\ (\text{wear}) & 0 & \text{mill liners, slurry pipes: the hardest cheap material there is} \\
\text{Malleable} & \text{temper carbon, annealed white} & 380\text{–}550 & 4\text{–}10\% & \text{fittings and small gearboxes; being displaced by ductile}
\end{array}
$$
**The graphite is the design.** A flake is a crack with a rounded tip and a lubricating filling: it cuts the tensile strength to a third of the matrix's, gives a compressive strength four times the tensile, gives the damping — the flakes dissipate $12$ times the vibration energy of steel, which is why a machine tool base is cast iron and never welded steel — and gives the machinability. **Magnesium or cerium treatment at $1{,}500\ {}^{\circ}\mathrm{C}$ makes the graphite spherical**, which removes the crack and triples the tensile strength and the fatigue limit, and is the single most valuable metallurgical trick of the twentieth century. **Austempering** at $370\ {}^{\circ}\mathrm{C}$ instead of quenching gives a bainitic matrix with $1{,}200\ \mathrm{MPa}$ and $12\ \%$ elongation, which is a forged-steel property from a casting.
:::

## Aluminium, magnesium and their alloys

::: definition The wrought series {#def-alseries}
$$
\begin{array}{l l l c l}
\text{Series} & \text{Main alloying} & \text{Heat-treatable?} & \sigma_y\ [\mathrm{MPa}] & \text{Uses and cautions} \\
1\mathrm{xxx} & 99\%\ \mathrm{Al} & \text{no} & 20\text{–}60 & \text{conductors, chemical plant, foil} \\
2\mathrm{xxx} & \mathrm{Cu}\ 4\% \pm \mathrm{Mg} & \text{yes} & 300\text{–}400 & 2024\text{-}\mathrm{T}3: \text{airframe skin; } \textbf{not} \text{ weldable, } \textbf{not} \text{ corrosion-resistant} \\
3\mathrm{xxx} & \mathrm{Mn} & \text{no} & 100\text{–}200 & \text{can body, heat-exchanger fin} \\
4\mathrm{xxx} & \mathrm{Si} & \text{no} & 150\text{–}300 & \text{weld filler for 5xxx and 6xxx; 4043 and 5356} \\
5\mathrm{xxx} & \mathrm{Mg}\ 5\% & \text{no} & 125\text{–}300 & 5083\text{:} \text{marine, armour; } \textbf{sensitises above } 65\ {}^{\circ}\mathrm{C} \\
6\mathrm{xxx} & \mathrm{Mg_2 Si} & \text{yes} & 200\text{–}350 & 6061\text{-}\mathrm{T}6\text{:} \text{the general engineer's extrusion; weldable, weak in the HAZ} \\
7\mathrm{xxx} & \mathrm{MgZn_2} + \mathrm{Cu} & \text{yes} & 400\text{–}570 & 7075\text{:} \text{the strongest; SCC in T6, use T73; no weld strength} \\
8\mathrm{xxx} & \mathrm{Li},\ \mathrm{Sc} & \text{yes} & 300\text{–}500 & \text{Al-Li 2195 and 2050: } 8\% \text{ lighter, } 10\% \text{ stiffer; aerospace only}
\end{array}
$$
**The temper designation is part of the specification.** $\mathrm{O}$ annealed, $\mathrm{H}1x$ strain-hardened, $\mathrm{T}4$ solution-treated and naturally aged, $\mathrm{T}6$ artificially peak-aged, $\mathrm{T}7x$ over-aged for stress-corrosion, and $\mathrm{T}7351$ the aerospace stress-corrosion temper. A drawing that says "6061" and not "6061-T6" invites a $40\ \%$ strength error.
**The weld is the weakness.** A $6\mathrm{xxx}$ loses $40\ \%$ in the heat-affected zone and recovers half of it on natural ageing over a week; a $5\mathrm{xxx}$ welds at full strength but a $7\mathrm{xxx}$ or $2\mathrm{xxx}$ welds at $30$ to $50\ \%$ and is normally replaced by a riveted or a friction-stir joint. **Friction-stir welding** keeps the peak below the solidus and recovers $90\ \%$, which is why the Space Shuttle's external tank, the Falcon 9's and the A350's are friction-stir welded.
**Magnesium** is $35\ \%$ lighter than aluminium for the same stiffness, is the easiest metal to machine, and has three problems: a hexagonal lattice with only three slip systems at room temperature, so it is formed at $250$ to $450\ {}^{\circ}\mathrm{C}$ or not at all; a corrosion potential of $- 1.7\ \mathrm{V}$, so it must be sealed and insulated from every other metal; and **fire**, in chip and in melt form, which is why a magnesium foundry is a different building.
:::

## Titanium

::: definition Why titanium costs what it does {#def-ti}
Titanium's specific strength is unbeatable among load-bearing metals at a temperature between $150$ and $350\ {}^{\circ}\mathrm{C}$, and its price is set by the **Kroll process**: $\mathrm{TiO_2}$ is chlorinated to $\mathrm{TiCl_4}$, which is reduced by liquid magnesium in a batch reactor over $40\ \mathrm{h}$, and the resulting sponge is leached, dried, and vacuum-melted twice. The process is **batch, not continuous**, and consumes $30\ \%$ of the metal as swarf on the way to an aerospace part.
$$
\begin{array}{l l c c l}
\text{Class} & \text{Example} & \sigma_y\ [\mathrm{MPa}] & \text{Max } T & \text{Character} \\
\alpha & \mathrm{Ti\text{-}5Al\text{-}2.5Sn\ ELI} & 830 & 350\ {}^{\circ}\mathrm{C} & \text{weldable, creep-resistant, not heat-treatable} \\
\text{near-} \alpha & \mathrm{Ti\text{-}6242},\ \mathrm{Ti\text{-}1100} & 1{,}000 & 450\ {}^{\circ}\mathrm{C} & \text{creep: compressor disks and blades} \\
\alpha + \beta & \mathrm{Ti\text{-}6Al\text{-}4V} & 830\text{–}1{,}100 & 400\ {}^{\circ}\mathrm{C} & 70\% \text{ of all titanium: strong, formable, weldable with care} \\
\beta & \mathrm{Ti\text{-}10V\text{-}2Fe\text{-}3Al},\ \mathrm{Ti\text{-}15\text{-}333} & 1{,}100\text{–}1{,}500 & 300\ {}^{\circ}\mathrm{C} & \text{highest strength, best spring, cold-formable} \\
\text{Near-equi-} \alpha & \mathrm{Ti\text{-}1100},\ \mathrm{Ti\text{-}632221} & 950 & 500\ {}^{\circ}\mathrm{C} & \text{the } 600\ {}^{\circ}\mathrm{C} \text{ sheet and the TiAl replacement}
\end{array}
$$
**The four design cautions.** **Galling**: titanium seizes on steel, on itself and on most coatings in one make-and-break of a threaded fastener; the fix is a silver-, MoS- or DLC-coated fastener and a specified torque. **Crevice corrosion**: titanium needs oxygen to keep its film, so under a gasket, under a paint blister or in stagnant seawater it can pit; the fix is a design without crevices and a flow. **Hydrogen pickup**: a pickling bath or a welding atmosphere with moisture charges the metal with hydrogen and embrittles it; the fix is an inhibited pickle and a backup-gas weld purge. **Burn**: titanium swarf and titanium in a high-pressure oxygen line are a fire, and a titanium pipe next to a gasket is a known ignition source in aerospace — the "Ti-ignite" analysis is a required part of an oxygen-system safety case.
:::

## Superalloys and heat-resisting alloys

::: definition The $\gamma^{\prime}$ alloys {#def-superalloys}
A superalloy is a nickel-, cobalt- or iron-nickel-base alloy that retains $70\ \%$ of its room-temperature yield strength at $0.7\, T_m$, which no other family does. The mechanism is the **$\gamma^{\prime}$ precipitate** $\mathrm{Ni_3 ( Al, Ti )}$, coherent, ordered $\mathrm{L1_2}$, and — uniquely — **stronger the hotter it is up to $600\ {}^{\circ}\mathrm{C}$**, because an anti-phase boundary energy that falls with temperature pins the dislocation.
$$
\begin{array}{l c c l}
\text{Alloy} & \sigma_y\ [\mathrm{MPa}] & \text{Use} & \gamma^{\prime} \text{ fraction} \\
\text{310 stainless} & 220 & 1{,}100\ {}^{\circ}\mathrm{C} \text{ furnace parts} & 0 \\
\text{Inconel 600 / 601} & 240 & \text{carburising, nitric acid} & 0 \\
\text{Inconel 625} & 414 & \text{marine, sour gas, fasteners} & \text{solid solution} \\
\text{Hastelloy X} & 345 & \text{combustor liners} & \text{solid solution} \\
\text{Inconel 718} & 1{,}030 & 550\ {}^{\circ}\mathrm{C}\text{: disks, blades, fasteners} & 5\%\ ( \gamma^{\prime \prime} ) \\
\text{Waspaloy} & 860 & 750\ {}^{\circ}\mathrm{C}\text{: turbine disks} & 15\% \\
\text{René N5 (single crystal)} & 1{,}050 & 1{,}050\ {}^{\circ}\mathrm{C}\text{: blade} & 60\% \\
\text{CMSX-10, TMC-850} & 1{,}100 & 1{,}150\ {}^{\circ}\mathrm{C}\text{: blade} & 70\%
\end{array}
$$
**The three manufacturing routes** are **wrought** (isothermally forged disk, equiaxed, the toughest and cheapest per kilogram), **cast and directionally solidified** (a columnar grain structure with no transverse boundary, for blades), and **single crystal** (no grain boundary at all, which removes the creep cavity and lets the $\gamma^{\prime}$ fraction go to $70\ \%$ — a single-crystal blade costs $100$ times a machined steel one and runs $200\ {}^{\circ}\mathrm{C}$ hotter). **Powder metallurgy** makes the highest-strength disk alloys, **ME32AP** and **RENET 100-007**, with a $5\ \mu\mathrm{m}$ grain that no ingot can give.
**The failure modes are specific.** **$\gamma^{\prime}$ coarsening** (Ostwald, this lesson's [[materials-science/phase-transformations]]) sets the microstructural life. **TCP phase precipitation** — $\sigma$, $\mu$, $\chi$ — embrittles a high-refractory alloy after a few hundred hours at $900\ {}^{\circ}\mathrm{C}$ and is the reason a $6\%\ \mathrm{Re}$ alloy has a temperature ceiling. **Hot corrosion** is a molten $\mathrm{Na_2 SO_4}$ flux that destroys the $\mathrm{Al_2 O_3}$ scale. **Oxidation** is handled by a **MCrAlY bond coat** ($\mathrm{M} = \mathrm{Ni},\ \mathrm{Co},\ \mathrm{Fe}$) plus an **electron-beam physical-vapour-deposited** or suspension-plasma-sprayed **yttria-stabilised zirconia top coat** with a $7\ \%$ thermal-expansion mismatch to the metal, accommodated by the bond coat's slow growth of a $\mathrm{TGO}$ alumina layer. **The coating is a life-limited component**: at $150\ \mu\mathrm{m}$ of TGO the spallation starts, and the coating's life is the blade's life.
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
\text{Natural rubber} & - 70 & 25 & 0.001 & 100\% \text{ extension, and the Payne and Mullins effects} \\
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
with the **Weibull modulus** $m$ a measure of the scatter's size — $m = 5$ for a structural ceramic, $10$ for a fine hot-pressed one, $100$ for a metal. A component at $0.1\ \%$ survival is at $0.35$ times the median strength for $m = 5$ and at $0.7$ for $m = 100$: **the scatter, not the mean, is the design constraint.**
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
**The one way to make a ceramic tough is to spend energy in front of the crack.** **Transformation toughening** uses a stress-driven martensitic $\mathrm{t} \rightarrow \mathrm{m}$ transition in a zirconia particle, whose $4\ \%$ volume expansion closes the crack: partially-stabilised zirconia has a toughness of $10\ \mathrm{MPa\, m^{1/2}}$ against alumina's $3.5$, which is why a hip replacement's ball is zirconia. **Fibre pull-out** in a ceramic matrix composite spends $100\times$ the fracture energy at the interface. **Pre-compression** — a tempered glass surface, a shot-peened ceramic, a zirconia glaze on porcelain — is the cheapest and most used of all, and is why a glass bottle survives a thumb and a tempered pane survives a hammer.
:::

## Composites

::: definition Fibre, matrix, lay-up {#def-composites}
A composite puts a strong, stiff, brittle fibre in a weak, soft, tough matrix, and the matrix's job is **not** to carry load but to **set the fibre spacing, transfer shear, protect the fibre, and give the part a shape**. The rule of mixtures gives the fibre-direction properties and the inverse rule the transverse:
$$
E_1 = V_f E_f + \left( 1 - V_f \right) E_m , \qquad
\sigma_1 = V_f \sigma_f^{*} , \qquad
E_2 = \left[ \frac{V_f}{E_f} + \frac{1 - V_f}{E_m} \right]^{- 1} \approx 8\ E_m ,
$$
so a $60\ \%$ carbon-epoxy laminate is **$1{,}400$ times stiffer along the fibre than across it** — an anisotropy no metal or monolithic ceramic approaches.
$$
\begin{array}{l c c c l}
\text{Fibre} & E\ [\mathrm{GPa}] & \sigma\ [\mathrm{MPa}] & \text{Cost}\ [\$/\mathrm{kg}] & \text{Comment} \\
\text{E-glass} & 72 & 2{,}400 & 2 & \text{the commodity; } 90\% \text{ of all reinforcement} \\
\text{S-glass / S-2} & 85 & 4{,}600 & 25 & \text{ballistic, higher strain to failure} \\
\text{Carbon, standard-modulus} & 230 & 4{,}900 & 25 & \text{T700, the aerospace workhorse} \\
\text{Carbon, intermediate-modulus} & 324 & 5{,}500 & 60 & \text{IM7: primary structure} \\
\text{Carbon, high-modulus} & 588 & 3{,}300 & 300 & \text{as4: stiffness-limited, and it mills the tool} \\
\text{Aramid (Kevlar 49)} & 130 & 2{,}800 & 100 & \text{impact and ballistic; compresses badly, absorbs water} \\
\text{UHMWPE (Dyneema)} & 100 & 3{,}600 & 60 & \text{floats, cuts, and creeps under a sustained load} \\
\text{Boron} & 400 & 3{,}200 & 500 & \text{the original: F-14 tails, and now niche} \\
\text{SiC (Nicalon, Tyranno)} & 200 & 3{,}000 & 3{,}000 & \text{the ceramic-matrix composite fibre, } 1{,}200\ {}^{\circ}\mathrm{C}
\end{array}
$$
**The lay-up is the design.** A $\left[ 0 / 90 \right]_{\mathrm{s}}$ cross-ply has the fibre-direction properties in one direction and almost none in the other; a quasi-isotropic $\left[ 0 / 60 / - 60 \right]_{\mathrm{s}}$ has an in-plane modulus ratio of $1.0$ and a strength that is still $4\times$ direction-dependent; a $\left[ + 45 / - 45 \right]_{2\mathrm{s}}$ is a **torsion** shell, used on drive shafts and on helicopter blades. The **$10\ \%$ rule** — assume no more than $10\ \%$ of a laminate's load is carried by plies off-axis by more than $20^{\circ}$ — is the design convention, and the **first-ply-failure** and **$10\ \%$ knock-down** factors are the certification currency.
**The matrix decides the manufacturing and the service temperature.** Epoxy at $120$ to $200\ {}^{\circ}\mathrm{C}\ T_g$ and $2$ to $6\ \%$ moisture pickup; **bismaleimide** at $250\ {}^{\circ}\mathrm{C}$; **polyimide** and **PEEK** at $300$; **cyanate ester** for space dimensional stability. A moisture-saturated epoxy panel loses $30\ \%$ of its **compression** strength, because water plasticises the fibre-matrix interface and lets the fibre microbuckle — which is why a hot-wet compression allowables test is the expensive part of an airframe programme.
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
**The repair is a bonded or bolted scarf patch** whose scarf ratio is $20:1$ to $30:1$, whose adhesive must be cured at $120\ {}^{\circ}\mathrm{C}$ under vacuum bag at $85\ \mathrm{kPa}$, and whose patch must be **stiffer** than the parent to restore the compression capability. A repair that cannot be cured at temperature is a **room-temperature-cure** patch with a $50\ \%$ efficiency and a shorter inspection interval.
:::

::: widget plot
f: 207/x
x: 20, 450
labels: Young modulus E [GPa]
caption: The deflection multiplier when a steel part is replaced at the same section by a material of modulus $E$. Aluminium at 73 gives 2.8, magnesium at 45 gives 4.6, a quasi-isotropic carbon laminate at 50 gives 4.1, and a unidirectional carbon laminate loaded along the fibre at 140 gives only 1.5. Steels, titanium at 114 and a $\mathrm{B_4C}$-filled composite at 210 sit near 1.0 — no metal is stiffer than steel per unit volume, only per unit mass.
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
that is, when the permitted strain is **less than the elastic strain to yield** — which for most metals is $0.4\ \%$. A tie-rod allowed $0.2\ \%$ extension is stiffness-limited and the high-strength materials are irrelevant; one allowed $1\ \%$ is strength-limited.
**Screening.** For $E / \rho$ the ranking is carbon fibre unidirectional $89$, then **every metal at $26$**, then glass and concrete. For $\sigma_y / \rho$ the ranking is carbon fibre $2{,}700$, aramid $2{,}100$, then the maraging and Ti alloys at $200$ to $240$, then $7075$ at $179$, then steels at $70$ to $170$, then concrete at $12$.
**Choice.** A steel tie-rod at $0.2\ \%$ is as light as a titanium one and a fifth the cost — **the answer is $4140$ or a $25\mathrm{CrMo}$, and the only way to improve it is to change the shape**, by making the rod hollow and longer, or by prestressing it. A tie-rod allowed $1\ \%$ extension is strength-limited and the answer is a **titanium alloy at $47\ \%$ less mass** or a **CFRP rod at $70\ \%$ less**, at $10$ and $30$ times the cost.

*Check.* A $4140$ rod at $600\ \mathrm{MPa}$ and $0.2\ \%$ strain: the stress at the strain limit is $207 \times 0.002 = 414\ \mathrm{MPa}$, below yield, so the stiffness constraint does govern and the mass is set by $E / \rho$. $\checkmark$

*Sanity.* This is the reason a bicycle's frame can be made lighter in carbon than in steel **only** if the tubes are butted and shaped, and the reason a $300$-year-old wrought-iron chain is still strong enough: iron and steel are not weak, they are merely not stiff for their weight, and no material substitution fixes that.
:::
:::

::: example Seawater pump shaft {#ex-shaft}
Select the material for a $40\ \mathrm{mm}$ pump shaft running in seawater with a $10\ \mathrm{kN\, m}$ torque and a $2{,}000\ \mathrm{h}$-per-year duty.
::: solution
**The stress.** $\tau = 16\, T / \pi d^{3} = 16 \times 10{,}000 / \left( \pi \times 0.04^{3} \right) = 32\ \mathrm{MPa}$ — trivially low. **The design is not a strength design.**
**The candidate list and its elimination.**
$$
\begin{array}{l l}
\text{4140 steel} & \text{corrodes in hours; rejected} \\
\text{304 stainless} & \text{pits and crevice-corrodes in still seawater; } \mathrm{PRE} = 19; \text{ rejected} \\
\text{316L stainless} & \text{marginal in still seawater, good in flowing; } \mathrm{PRE} = 26 \\
\text{17-4PH} & \text{strong, but its pitting resistance is 304-like; rejected for static duty} \\
\text{Duplex 2205} & \mathrm{PRE} = 34; \text{ strong, and the modern answer} \\
\text{Ni-Al bronze} & \text{traditional, galls, and erodes at a tip speed above } 5\ \mathrm{m / s} \\
\text{Titanium Gr.2 / Gr.12} & \text{immune to flowing seawater; crevice-sensitive; } \textbf{cathodic to everything} \\
\text{Super-duplex 2507} & \mathrm{PRE} = 42; \text{ the specification answer} \\
\text{FRP with a steel core} & \text{used on mine-harvesters; the core is the weak link}
\end{array}
$$
**Choice.** **Super-duplex 2507**, solution-annealed and quenched, with a $22$ minimum $\mathrm{PRE}$ and a **ferrite number of 35 to 55** in the weld.
**The three things that actually kill the shaft.** **Galvanic corrosion at the coupling**: a duplex shaft bolted to a bronze or an aluminium housing with no insulation corrodes at the joint and nowhere else; the fix is an insulating flange kit and a coating on the housing. **Cathodic protection design**: if the shaft is on a boat with zinc anodes, an **uninsulated** titanium shaft becomes the cathode and its hydrogen evolution embrittles it — a real and repeated failure. **Fretting at the keyway or the shrink fit**: a stainless or duplex shaft frets in its coupling bore within a week; the fix is a taper-and-drawbar or a friction-locked coupling, a specified surface finish, and no key.

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
\text{304L / 316L stainless} & \text{the standard answer; FCC, tougher at } 90\ \mathrm{K}; \text{ will not burn} \\
\text{Bronze, Monel} & \text{the traditional answer for valves and bearings; non-sparking} \\
\text{Ti-6Al-4V} & \text{tough, but } \textbf{is} \text{ an ignition hazard in high-pressure } \mathrm{O_2}; \text{ rejected} \\
\text{Inconel 718} & \text{where the strength or the fatigue is needed}
\end{array}
$$
**Choice: 316L for the casing, a bronze or a silver-bearing 316 for the bearings, and no elastomer that is not a certified oxygen grade.** The design rules are the **$G$-ratio** limit on the pressure and velocity product, a non-metallic or bronze first stage, and a cleanliness specification — hydrocarbon-free, iron-free — because a fingerprint on a liquid-oxygen valve is a bomb.
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
Select the material and the process for a $2\ \mathrm{m}$-long automotive suspension control arm that must survive $10^{6}$ road-load cycles at a mass below $1.2\ \mathrm{kg}$, at a unit cost below $\$12$ in $100{,}000$-per-year volumes.
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
**Choice: a hydroformed HSLA-355 tube, laser-cut and robot-welded to forged steel eyes, zinc-nickel plated.** The hydroforming work-hardens the tube walls by $30$ to $50\ \%$ at the corners where the stress is, gives a closed section with a high torsional stiffness, and eliminates the two longitudinal welds a rolled tube would need.
**The design details that decide the outcome.** **The eye-to-arm weld** is the fatigue-critical feature, and its detail factor is $K_f = 3.0$ as a plain fillet and $1.6$ as a **full-perimeter** weld with a **dress-ground toe**; the drawing must specify the grinding. **The road-salt case** is a corrosion-fatigue life of $0.4$ times the air life, so the plating is a specification item and a **zinc-nickel with a trivalent passivate** is the current answer, not zinc. **The survival requirement** means the design stress is the **fatigue limit at $10^{6}$ cycles with a $10\ \%$ probability of failure**, not the yield, and that the **mean stress** from the corner-load case must be Goodman-corrected. **The mass** is met by putting the material in the tube wall and not in a boss, and by making the arm hollow where the moment is low.

*Design comment.* The general rule is that **at a mass target a metal family loses to a shape before it loses to another family**. The stamped-steel arm at $1.6\ \mathrm{kg}$ and the hydroformed one at $1.15\ \mathrm{kg}$ are the same alloy, the same coating and the same tooling budget; the $28\ \%$ saving is a section. The aluminium arm at $1.1\ \mathrm{kg}$ costs $40\ \%$ more and is more fatigue-sensitive, and the composite arm is a $5\times$ cost failure. In a $100{,}000$-per-year volume the process choice is the material choice.
:::
:::

::: history
**Benjamin Huntsman**'s crucible steel of 1740 at Sheffield, **Henry Bessemer**'s converter of 1856 and **Robert Mushet**'s discovery the same year that spiegeleisen put the manganese and the carbon back made steel cheap for the first time, and **Pierre and Émile Martin**'s open-hearth of 1864 made it controllable. **Robert Hadfield**'s 1882 discovery that a $12\ \%$ manganese steel work-hardens from a $200\ \mathrm{MPa}$ as-cast state to $700\ \mathrm{MPa}$ under a hammer, and **W. M. Goldschmidt**'s and **F. Weibert**'s metallography of the same decade, are the origin of alloy-steel design. **Harry Brearley**'s 1913 search for an erosion-resistant gun-barrel steel produced 18-8 stainless by the accident of noticing that a chromium steel would not rust in the citric acid used to etch it for metallography, and **Elwood Haynes** patented a cobalt-chromium and a stainless in the same year; **William and Max Mason** at Krupp added the $2\ \%$ molybdenum of 316 between 1926 and 1929. **C. F. Smith** at the Monmouth Engineering Company patented the nickel-chromium **Nimonic** series in 1932 after a failed attempt to make a chromium steel for gas-turbine blades, and **H. F. Taylor**, **G. V. Smith** and **E. A. Campbell** at the United States Bureau of Standards surveyed the whole heat-resisting alloy field in the same decade; **Levi F. Kear**'s group at General Electric cast the first single-crystal nickel blade in 1967, and the rhenium-bearing third-generation alloys of the 1990s run two hundred degrees hotter than Smith's first Nimonic. **William Justin Kroll** patented the reduction of $\mathrm{TiCl_4}$ by magnesium in 1940 and produced the first ductile titanium in Luxembourg in 1946, in a laboratory evacuated with pumps he built himself; **Kelly Johnson**'s Skunk Works made the A-12 and SR-71 out of $93\ \%$ titanium by volume and used the fuel as an airframe coolant. **Alcoa's** $\mathrm{Al\text{-}Cu\text{-}Mg}$ 24S of the 1920s and the $\mathrm{Al\text{-}Zn\text{-}Mg\text{-}Cu}$ **75S** developed jointly at Alcoa and Kaiser during the Second World War, first flown on the B-29, made aluminium the structure of an airframe; **Alcoa's** and **Kaiser's** wartime programme produced more aircraft aluminium than the whole pre-war aircraft industry had used in total. **Waloddi Weibull**'s 1939 and 1951 papers on the statistical theory of the strength of materials were written by a Swedish naval engineer and a mathematician and were ignored by the ceramics industry for thirty years. **R. C. Garvie**, **R. J. Hannink** and **R. T. Pascoe**'s 1975 *Nature* note on ceramic steel, which showed that a martensitic zirconia particle could toughen alumina, and **P. F. Becher**'s and **A. H. Heuer**'s 1980s work on the same, made structural ceramics designable; **N. F. (Nat) Thrope**'s and **J. A. (Jack) Hanus**'s boron fibre at Armour Research Foundation in 1962 and the Thornel graphite-fibre programme at Union Carbide from the same year, followed by **Toray**'s and **Toho**'s pan-based T300 of 1971, made carbon fibre an industrial material, and the **Boeing 787** of 2011 flew with half its structural mass in composite.
:::

## Where this leads

The property charts that order these families are the subject of [[materials-science/materials-selection]], the strengthening mechanisms behind them are those of [[materials-science/dislocations-strengthening]], the tempers and heat treatments are the transformations of [[materials-science/phase-transformations]], and the environmental limits that eliminate most of the list are the corrosion of [[materials-science/corrosion]].

::: summary
- Every metal has $E / \rho = 26 \pm 1\ \mathrm{MN\, m / kg}$: stiffness for weight cannot be bought with a metal, only with a fibre, a sandwich or a shape.
- Steels are ranked by cost and by what the alloying elements do; the pitting-equivalent $\mathrm{PRE} = \% \mathrm{Cr} + 3.3\, \% \mathrm{Mo} + 16\, \% \mathrm{N}$ ranks the stainless grades against chloride.
- Cast iron's graphite shape is its design: flake for damping, spheroidal for strength, ausferrite for a forged-steel replacement.
- The aluminium temper designation is part of the specification, and a weld or a missing re-age is a $40\ \%$ strength error.
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
To two significant figures, what is $E / \rho$ in $\mathrm{MN\, m / kg}$ for every structural metal?
::: solution
$26 \pm 1$ — steel, aluminium, titanium, magnesium, copper and nickel all fall within a few per cent.
:::
:::

::: exercise Stainless {level=1 check="26"}
Give the pitting-resistance equivalent of 316 stainless.
::: solution
$18 + 3.3 \times 2.1 + 0 = 25$, usually quoted as $26$.
:::
:::

::: exercise Cast iron {level=1 check="3"}
Roughly what factor does a magnesium treatment of the graphite multiply a cast iron's tensile strength by?
::: solution
About three — grey at $350$ against ductile at $1{,}000$ for the equivalent section.
:::
:::

::: exercise Superalloys {level=1 check="70"}
What $\gamma^{\prime}$ volume fraction does a modern single-crystal turbine blade contain?
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
\frac{m_{\mathrm{Mg}}}{m_{\mathrm{st}}} = \frac{1.77}{7.85} \left( \frac{207}{45} \right)^{1 / 3} = 0.225 \times 1.67 = 0.38 , \qquad
\frac{t_{\mathrm{Mg}}}{t_{\mathrm{st}}} = 1.67 .
$$
*Sanity.* A $62\ \%$ mass saving and a $67\ \%$ thickness increase — magnesium does better than aluminium because its modulus is proportionally less bad than its density. The catch is that the thicker panel has a lower **buckling** margin per unit mass, that magnesium creeps at $120\ {}^{\circ}\mathrm{C}$, and that the joint must be insulated from every other metal in the assembly.
:::
:::

::: exercise Composite {level=2}
A carbon-epoxy laminate has $V_f = 0.6$, $E_f = 230\ \mathrm{GPa}$ and $E_m = 3.5\ \mathrm{GPa}$. Give $E_1$, $E_2$ and the anisotropy ratio.
::: solution
$$
E_1 = 0.6 \times 230 + 0.4 \times 3.5 = 139\ \mathrm{GPa} , \qquad
E_2 = \left[ \frac{0.6}{230} + \frac{0.4}{3.5} \right]^{- 1} = 8.4\ \mathrm{GPa} .
$$
The ratio is $16.6$. *Sanity.* The transverse modulus is only $2.4$ times the resin's, because the transverse loading is a **series** arrangement dominated by the softest phase. This is why a laminate needs $\pm 45^{\circ}$ plies for anything but a unidirectional load, and why a composite's in-plane shear modulus of $4\ \mathrm{GPa}$ is the property that governs a stiffened panel's torsion.
:::
:::

::: exercise Tie-rod {level=2}
A $1\ \mathrm{m}$ tie-rod must carry $100\ \mathrm{kN}$ and stretch no more than $0.5\ \mathrm{mm}$. Give the minimum mass for a 4140 steel rod and for a Ti-6Al-4V rod, and say which constraint governs.
::: solution
The permitted strain is $0.05\ \%$, far below steel's $0.29\ \%$ yield strain, so **stiffness governs**.
$$
A = \frac{P L}{E \delta} = \frac{100 {,}000 \times 1}{207 \times 10^{9} \times 5 \times 10^{- 4}} = 967\ \mathrm{mm}^{2} ,
$$
giving $m = \rho A L = 7.85 \times 967 \times 10^{- 3} = 7.6\ \mathrm{kg}$ for steel. For titanium, $A = 1{,}755\ \mathrm{mm}^{2}$ and $m = 7.9\ \mathrm{kg}$ — **the titanium is heavier**, because $E / \rho$ is the same and the stiffness constraint is the only one that matters.
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
**Why the optima differ.** Evaluate both for a candidate list, in units of steel:
$$
\begin{array}{l c c c c}
\text{Material} & E^{1 / 3} / \rho & \text{rank} & \sigma_y^{1 / 2} / \rho & \text{rank} \\
\text{Mild steel} & 0.75 & 4 & 0.57 & 5 \\
\text{4140 QT} & 0.75 & 4 & 1.02 & 3 \\
\text{2024-T3} & 1.52 & 2 & 1.15 & 2 \\
\text{7075-T651} & 1.44 & 3 & 1.51 & 1 \\
\text{Ti-6Al-4V} & 1.03 & 3 & 1.02 & 3 \\
\text{Balsa (along grain)} & 14.4 & 1 & 0.78 & 4 \\
\text{CFRP quasi-iso} & 2.38 & 1 & 2.20 & 1
\end{array}
$$
**Balsa is the best stiff panel and a mediocre strong one**, because its $E^{1 / 3}$ is generous for its density while its strength is not; **7075 is the best strong panel and only third-best stiff**, because its strength is exceptional and its modulus is not. A sandwich of balsa and two steel faces beats both, which is the point of the next lesson.
*Sanity.* The exponents are the reason a **shape** is worth more than a **material**: the stiffness index has a cube root, so a $2\times$ thickness increase buys $8\times$ the stiffness at $2\times$ the mass, and a hollow or a stiffened section beats any substitution.
:::
:::

::: exercise Design {level=3}
Select the material and process for a high-pressure hydrogen cylinder at $70\ \mathrm{MPa}$ for a vehicle, with a mass target of $8\ \mathrm{kg}$ of hydrogen per $100\ \mathrm{kg}$ of cylinder, and justify the choice against the alternatives.
::: solution
**The physics of the requirement.** At $70\ \mathrm{MPa}$ the hoop stress in a thin-walled cylinder is $\sigma_\theta = p r / t$, so the mass for a given pressure and volume is minimised by $\rho / \sigma_y$ — a **strength**-limited design, and the specific-stiffness argument of the tie-rod does not apply.
**The candidates.**
$$
\begin{array}{l c c l}
\text{Option} & \text{Mass fraction of H}_2 & \text{Cost} & \text{Verdict} \\
\text{All-steel (Type I)} & 3\% & \$15\text{/}\mathrm{kWh} & \text{heavy; stationary only} \\
\text{Steel liner, glass/epoxy (Type II)} & 5\% & \$25 & \text{no weight benefit at 70 MPa} \\
\text{Al liner, carbon/epoxy (Type III)} & 8\text{–}9\% & \$80 & \text{the current production answer} \\
\text{Polymer liner, carbon/epoxy (Type IV)} & 9\text{–}10\% & \$90 & \text{the best, and the answer} \\
\text{Titanium liner, carbon/epoxy} & 8\% & \$200 & \text{hydrogen embrittlement of Ti at 70 MPa; rejected} \\
\text{Metal-organic framework at 100 bar} & 2\% & - & \text{research}
\end{array}
$$
**Choice: Type IV — a HDPE or nylon-6 liner, fully overwrapped with T700 or IM7 carbon fibre in an epoxy matrix, with an aluminium or a moulded-plastic boss.**
**The four design problems.** **Permeation**: hydrogen diffuses through polyethylene at a rate that costs a few per cent per month, and the liner is a multi-layer or a surface-fluorinated; a **fuel-cell vehicle loses 2 % of its fuel per month** and the specification must say so. **Liner collapse**: a Type IV liner is not pressure-retaining on its own and its **buckling under the composite's shrink-fit at cure** is a real failure mode. **Boss design**: the load path from the $70\ \mathrm{MPa}$ end load into the fibre is the highest-stressed feature in the part, and the **metal-to-composite** joint is where the qualification testing fails. **Fire and impact**: a composite cylinder must survive a $30\ \mathrm{min}$ bonfire test with a pressure-relief device, and a Type III or IV cylinder is required to **burst** and not fragment — the filament-wound pattern is designed to **fan out** on burst.
**The cost reality.** Carbon fibre is $60\ \%$ of the cylinder's cost, and the industry's cost-down path is a **cheaper intermediate-modulus fibre from a non-aerospace supplier** and a **faster filament-winding rate**, not a different material.

*Design comment.* The general rule is that **a pressure vessel is a strength design and a composite design, and the composite's anisotropy is exactly what the requirement wants**: a cylinder needs twice as much strength in the hoop as in the axial direction, and a filament-wound shell at a $54.7^{\circ}$ geodesic angle gives precisely that ratio. No metal can be made anisotropic, so the composite is not an improvement on the steel cylinder — it is the only material that fits the load.
:::
:::
