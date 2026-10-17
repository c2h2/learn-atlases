Corrosion is not an accident. It is the metal returning to the mineral it was smelted from, and the direction is fixed by thermodynamics before any design is drawn. The whole of corrosion engineering is therefore a contest with the second law, and it is won by four levers and no others: **change the material, change the environment, change the potential, or change the design** — and the fourth is free.

The one number to carry away is the **Faraday conversion**: a corrosion current of $1\ \mu\mathrm{A / cm^{2}}$ on iron is **$11.6\ \mu\mathrm{m}$ per year**. A passive film passes $10^{- 8}\ \mathrm{A / m^{2}}$ and grows $0.01\ \mu\mathrm{m}$ a year; a pitting pit passes $10^{- 2}\ \mathrm{A / cm^{2}}$ locally and eats $12\ \mathrm{mm}$ a year. **Corrosion is not a rate, it is a rate multiplied by an area ratio**, and a square millimetre of anode against a square metre of cathode is a thousand-fold multiplication of the current density and therefore of the penetration rate.

::: warning Six design errors that cause most corrosion failures
**A large cathode and a small anode.** A steel rivet in an aluminium plate corrodes in a month; an aluminium rivet in a steel plate corrodes in a decade. The **area ratio** $A_c / A_a$ sets the current density on the anode, and every galvanic table in the world omits it. **A crevice.** Under a gasket, a bolt head, a deposit, a paint blister or a lap joint the oxygen is consumed and not replaced, the pH falls to 2 and the chloride concentrates ten-fold, and 316 stainless — immune on the open surface — pits through in a year. **Stagnation.** Seawater in a pipe at $0.1\ \mathrm{m / s}$ loses its protective film and the pipe wall goes in a season; at $2\ \mathrm{m / s}$ it lasts forty years, and at $8\ \mathrm{m / s}$ it fails by erosion-corrosion. Every material has a velocity window and the design must sit in it. **A dead leg, a sump or a downward-facing flange** where a liquid collects and never moves — the single most common cause of a plant shutdown, and free to design out. **A weld and no post-weld treatment.** A 304 weld cools through $650\ {}^{\circ}\mathrm{C}$ at $10\ {}^{\circ}\mathrm{C}$ per minute and precipitates chromium carbide on the boundaries in seconds; the sensitised zone is $2\ \mathrm{mm}$ wide, invisible, and $100$ times more corrosion-prone than the parent. **A cathodic-protection system designed for the bare metal and left running on the coated one.** Overprotection disbands the coating and generates hydrogen at a high-strength steel's surface, and the failure is a hydrogen embrittlement fracture of a part the corrosion engineer thought was protected.
:::

## Thermodynamics: what can happen

::: definition The electrode potential and the Pourbaix diagram {#def-nernst}
A metal in contact with its ions reaches an equilibrium potential given by **Nernst**,
$$
E = E^{\circ} + \frac{R T}{n F} \ln a_{\mathrm{M}^{n+}}
= E^{\circ} + \frac{0.05916}{n} \log a_{\mathrm{M}^{n+}} \quad \text{at } 25\ {}^{\circ}\mathrm{C} ,
$$
with $E^{\circ}$ the **standard electrode potential** against the standard hydrogen electrode:
$$
\begin{array}{l c l c l}
\mathrm{Mg^{2 +} / Mg} & - 2.37 & \mathrm{Ni^{2 +} / Ni} & - 0.25 \\
\mathrm{Al^{3 +} / Al} & - 1.66 & \mathrm{Cr^{3 +} / Cr} & - 0.74 \\
\mathrm{Ti^{2 +} / Ti} & - 1.63 & \mathrm{Fe^{2 +} / Fe} & - 0.44 \\
\mathrm{Zn^{2 +} / Zn} & - 0.76 & \mathrm{Cu^{2 +} / Cu} & + 0.34 \\
\mathrm{Cr^{3 +} / Cr} & - 0.74 & \mathrm{Ag^{+} / Ag} & + 0.80 \\
\mathrm{Fe^{3 +} / Fe^{2 +}} & + 0.77 & \mathrm{Au^{3 +} / Au} & + 1.50
\end{array}
$$
A **Pourbaix** diagram plots $E$ against pH for a metal-water system at $25\ {}^{\circ}\mathrm{C}$ and $10^{- 6}\ \mathrm{molal}$ dissolved metal, and divides the plane into **immunity**, **corrosion** and **passivity** fields. The three lines to remember are:
$$
\mathrm{O_2} + 2 \mathrm{H_2 O} + 4 e \rightarrow 4\, \mathrm{OH}^{-}, \quad E = 1.23 - 0.082\, \mathrm{pH} ; \qquad
2 \mathrm{H}^{+} + 2 e \rightarrow \mathrm{H_2}, \quad E = - 0.059\, \mathrm{pH} ;
$$
and the metal's own line. **The two lines bracket the thermodynamic stability of water**, $1.23\ \mathrm{V}$ apart, and everything in between is a metastable aqueous world.
**The three readings of a Pourbaix diagram.** Iron at pH 7 and $- 0.4\ \mathrm{V}$ is in the immunity field and will not corrode — which is what a cathodic protection system aims for. Iron at pH 7 and open-circuit in aerated water sits at $- 0.2\ \mathrm{V}$, in the corrosion field, and rusts. Aluminium at pH 7 is **passive**, which is why an aluminium can holds a soft drink, and aluminium at pH 13 is soluble, which is why caustic cleaner destroys it. **The diagram says what is possible, never what happens**: it gives no rate, no kinetics, and no information about pitting, which is a kinetic breakdown of a thermodynamically stable film.
:::

::: definition Passivity and the Pilling-Bedworth ratio {#def-passivity}
A metal is **passive** when it is covered by a coherent, adherent, insoluble oxide that grows so slowly that the metal is effectively insulated from the environment. Two things decide whether the oxide does the job.
**The Pilling-Bedworth ratio** is the volume of oxide formed per volume of metal consumed:
$$
R_{\mathrm{PB}} = \frac{V_{\mathrm{oxide}}}{V_{\mathrm{metal}}} .
$$
$$
\begin{array}{l c l}
\mathrm{Na},\ \mathrm{K} & 0.33 & \text{the film is porous and the metal powders} \\
\mathrm{MgO} / \mathrm{Mg} & 0.81 & \text{slightly porous; a partial film} \\
\mathrm{Al_2 O_3} / \mathrm{Al} & 1.28 & \text{coherent and adherent — the reason aluminium exists as an engineering material} \\
\mathrm{Cr_2 O_3} / \mathrm{Cr} & 2.01 & \text{protective despite the mismatch, because it creeps} \\
\mathrm{FeO} / \mathrm{Fe} & 1.77 & \text{porous and non-protective} \\
\mathrm{Fe_3 O_4} / \mathrm{Fe} & 2.10 & \text{the mill scale, protective while intact and hot} \\
\mathrm{Fe_2 O_3} / \mathrm{Fe} & 2.14 & \text{cracked; rust is } 6\times \text{ the metal's volume and falls off} \\
\mathrm{NiO} / \mathrm{Ni} & 1.65 & \text{protective to } 800\ {}^{\circ}\mathrm{C} \\
\mathrm{WO_3} / \mathrm{W} & 3.40 & \text{cracks and spalls; the reason a tungsten filament fails in air}
\end{array}
$$
A ratio below 1 leaves the film in tension and porous; a ratio above 2 puts it in compression and cracks it. **The window is 1 to 2, and only four oxides sit in it and are insoluble: $\mathrm{Al_2 O_3}$, $\mathrm{Cr_2 O_3}$, $\mathrm{SiO_2}$ and $\mathrm{TiO_2}$** — which is why chromium, aluminium, silicon and titanium are the four elements that make a metal corrosion-resistant.
**The passivation curve.** An anodic polarisation sweep on a passive alloy shows an **active** region, a **critical current density** $i_{\mathrm{crit}}$, an abrupt drop to a **passive current** $i_p$ of $10^{- 2}$ to $10^{0}\ \mathrm{mA / m^{2}}$, and at a high enough potential a rise called the **transpassive** region where the film dissolves as an oxy-anion or the water breaks down to oxygen:
$$
i_p \sim 10^{- 8}\ \mathrm{A / m^{2}} \ \Rightarrow\ 0.01\ \mu\mathrm{m / yr} \quad \text{for 316 in nitric acid}.
$$
**The two engineering consequences.** A passive alloy must be **re-passivated** after a scratch, and it can only do so if oxygen or a cathodic reaction is present — which is why a crevice, where the oxygen is gone, is the death of a passive alloy. And a passive alloy's transpassive potential is the ceiling of its usefulness: 316 in hot concentrated sulfuric acid goes passive and then transpassive and corrodes faster than carbon steel.
:::

## Kinetics: how fast

::: definition Mixed potential, Tafel and the corrosion rate {#def-mixed}
A corroding metal is a short-circuited cell in which an anodic and a cathodic reaction proceed at the same total rate, and the potential it settles at is the **corrosion potential** $E_{\mathrm{corr}}$ where the two currents are equal. Each reaction obeys a **Tafel** law,
$$
\eta = a + b \log i , \qquad b_a = \frac{2.303\, R T}{\alpha_a n F} \approx 118\ \mathrm{mV} \ \text{per decade at } 25\ {}^{\circ}\mathrm{C} \quad \left( \alpha = 0.5,\ n = 1 \right),
$$
and the intersection of the two Tafel lines gives $i_{\mathrm{corr}}$. The **Stern-Geary** relation converts the easily-measured **polarisation resistance** to the rate:
$$
R_p = \left( \frac{\mathrm{d} E}{\mathrm{d} i} \right)_{E_{\mathrm{corr}}} = \frac{b_a \left| b_c \right|}{2.303\, i_{\mathrm{corr}} \left( b_a + \left| b_c \right| \right)} = \frac{B}{i_{\mathrm{corr}}}, \qquad B \approx 26\ \mathrm{mV} .
$$
**The Faraday conversion**, the number that turns an electrochemical measurement into an engineering one:
$$
\dot{x} = \frac{i_{\mathrm{corr}}\, M}{n\, F\, \rho}
\quad \Rightarrow \quad
\boxed{ 1\ \mu\mathrm{A / cm^{2}} \equiv 11.6\ \mu\mathrm{m / yr}\ \text{on iron} } ,
$$
and $15\ \mu\mathrm{m / yr}$ on zinc, $11\ \mu\mathrm{m / yr}$ on copper and $11\ \mu\mathrm{m / yr}$ on aluminium.
$$
\begin{array}{l c l}
i_{\mathrm{corr}} & \text{Rate} & \text{Verdict} \\
10^{- 8}\ \mathrm{A / m^{2}} & 0.01\ \mu\mathrm{m / yr} & \text{passive; a hundred-year component} \\
10^{- 4}\ \mathrm{A / m^{2}} & 0.12\ \mu\mathrm{m / yr} & \text{excellent; a coated structure} \\
10^{- 2}\ \mathrm{A / m^{2}} & 1.2\ \mu\mathrm{m / yr} & \text{acceptable; a well-coated hull} \\
1\ \mathrm{A / m^{2}} & 120\ \mu\mathrm{m / yr} & \text{unacceptable; bare steel in acid} \\
10^{2}\ \mathrm{A / m^{2}} & 12\ \mathrm{mm / yr} & \text{a localised pit; weeks to failure}
\end{array}
$$
:::

::: definition Concentration, aeration and the area rule {#def-aeration}
Most aqueous corrosion is **cathodically controlled** — the anodic reaction can go faster than the oxygen can arrive — so the rate is set by oxygen **supply**, and the two consequences are the most important in the practice.
**Differential aeration.** A crevice, a deposit or a droplet becomes oxygen-depleted and therefore **anodic** to the aerated surroundings. The cell is
$$
\text{aerated (cathode)}: \mathrm{O_2} + 2 \mathrm{H_2 O} + 4 e \rightarrow 4\, \mathrm{OH}^{-}, \qquad
\text{depleted (anode)}: \mathrm{Fe} \rightarrow \mathrm{Fe}^{2 +} + 2 e .
$$
The anode's $\mathrm{Fe^{2 +}}$ hydrolyses and makes the solution **acid**, which attracts chloride as the counter-ion, and the local chemistry becomes $\mathrm{FeCl_2}$ at pH 2 — autocatalytic, because the acid dissolves the film and exposes fresh metal. **This is the mechanism of every pit and every crevice attack**, and it is why a stainless steel that is perfect on a flat panel fails under a washer.
**The area rule.** The corrosion current is set by the cathode's oxygen-supply capacity and is **concentrated onto the anode's area**:
$$
i_{\mathrm{anode}} = \frac{i_{\mathrm{cathode}} A_c}{A_a} , \qquad
\dot{x}_{\mathrm{anode}} = 11.6\ \mu\mathrm{m / yr} \times \frac{i_{\mathrm{cathode}}}{1\ \mu\mathrm{A / cm^{2}}} \times \frac{A_c}{A_a} .
$$
A steel rivet in an aluminium sheet has an area ratio of $1 : 100$ and corrodes at $1\ \mathrm{mm}$ a year; an aluminium rivet in a steel sheet has a ratio of $100 : 1$ and is barely attacked. **The galvanic series tells you which metal is the anode; only the area ratio tells you whether it matters.**
:::

## The forms of corrosion

::: definition Galvanic corrosion and the seawater series {#def-galvanic}
$$
\begin{array}{l c l}
\text{Material (still seawater, } 25\ {}^{\circ}\mathrm{C}\text{)} & E_{\mathrm{corr}}\ [\mathrm{V\ vs\ Ag / AgCl}] & \text{Note} \\
\text{Magnesium} & - 1.50 & \text{the sacrificial anode of choice in fresh water} \\
\text{Zinc} & - 1.03 & \text{the classic anode} \\
\text{Al 5052-H32} & - 0.95 & \\
\text{Al 1100} & - 0.91 & \\
\text{Al 2024-T3} & - 0.87 & \text{the most anodic of the common aluminium alloys} \\
\text{Al 7075-T6} & - 0.79 & \text{and the most cathodic — a 2024 rivet in a 7075 plate is the wrong way round} \\
\text{Cadmium} & - 0.70 & \text{the traditional fastener coating on steel} \\
\text{Mild steel} & - 0.61 & \\
\text{Tin (passive)} & - 0.45 & \\
\text{Stainless 316, active} & - 0.40 & \text{before it passivates} \\
\text{Lead} & - 0.40 & \\
\text{Naval brass} & - 0.30 & \\
\text{Copper-nickel 90/10} & - 0.28 & \\
\text{Nickel, active} & - 0.25 & \\
\text{Copper} & - 0.22 & \\
\text{Copper-nickel 70/30} & - 0.20 & \\
\text{Titanium, active} & - 0.80 & \text{but passive and noble in practice} \\
\text{Stainless 316, passive} & + 0.10 & \text{the design problem: it is a cathode} \\
\text{Titanium, passive} & + 0.25 & \\
\text{Silver} & + 0.45 & \\
\text{Graphite} & + 0.40 & \text{in a gasket: a cathode the size of a dinner plate} \\
\text{Platinum} & + 0.75 &
\end{array}
$$
**The four rules.** **The further apart, the worse** — but only if the anode is not passive, so a titanium-to-steel pair is worse than the $1.4\ \mathrm{V}$ separation suggests and a graphite-to-steel pair is worse than the $1.0\ \mathrm{V}$ one. **The area ratio** decides the damage. **The conductivity** of the electrolyte decides the reach: in seawater a galvanic couple acts over metres, in fresh water over centimetres, and in humid air only at the joint. **A passivating alloy can reverse the polarity**: carbon steel coupled to stainless is anodic in cold aerated water and becomes **cathodic** if the stainless is in hot nitric acid and the couple is driven hard.
:::

::: definition Localised attack: pitting, crevice, intergranular and dealloying {#def-localised}
**Pitting** is the growth of an autocatalytic occluded cell. The design numbers are the **critical pitting temperature** (CPT) at a fixed chloride and the **pitting resistance equivalent number**
$$
\mathrm{PREN} = \% \mathrm{Cr} + 3.3\, \% \mathrm{Mo} + 16\, \% \mathrm{N} ,
$$
$$
\begin{array}{l c c}
\text{Alloy} & \mathrm{PREN} & \text{CPT in } 6\%\ \mathrm{FeCl_3} \\
\text{304} & 19 & \text{pits in seawater at any temperature} \\
\text{316L} & 26 & 22\ {}^{\circ}\mathrm{C} \\
\text{2205 duplex} & 34 & 32\ {}^{\circ}\mathrm{C} \\
\text{2507 super-duplex} & 42 & 45\ {}^{\circ}\mathrm{C} \\
\text{6Mo (254 SMO)} & 44 & 50\ {}^{\circ}\mathrm{C} \\
\text{Alloy 625} & 46 & 60\ {}^{\circ}\mathrm{C} \\
\text{Alloy C-276} & 62 & > 85\ {}^{\circ}\mathrm{C}
\end{array}
$$
**Crevice corrosion** is the same chemistry under a gap, and it happens at a potential $200$ to $400\ \mathrm{mV}$ **below** the pitting potential — so a crevice is always worse than the open surface, and the **crevice corrosion temperature** of a 316 in seawater is $10\ {}^{\circ}\mathrm{C}$ where its pitting temperature is $22\ {}^{\circ}\mathrm{C}$. **A gasket, a thread, a lap joint, a bolt washer, a product deposit and a paint holiday are crevices.**
**Intergranular attack** is the precipitation of a second phase on a grain boundary and the depletion of an alloying element in the zone beside it. The classic is **sensitisation** of an austenitic stainless: at $500$ to $800\ {}^{\circ}\mathrm{C}$, peaking at $650\ {}^{\circ}\mathrm{C}$, chromium carbide precipitates on the boundaries and leaves a $100\ \mathrm{nm}$ band below $12\ \%$ chromium that is no longer stainless. A 304 weld's heat-affected zone spends twenty minutes in the sensitising range and is sensitised; the fixes are a **low-carbon L grade** at under $0.03\ \%\ \mathrm{C}$, a **titanium- or niobium-stabilised** 321 or 347, or a **solution anneal at $1{,}050\ {}^{\circ}\mathrm{C}$ with a water quench**. The equivalent in aluminium is the grain-boundary precipitate of $7\mathrm{xxx}$, and in nickel alloys it is the weld decay of alloy 600.
**Dealloying** is the selective leaching of one element from an alloy. **Dezincification** of a brass with more than $15\ \%$ zinc leaves a porous copper skeleton that looks like brass and has the strength of wet blotting paper; the fix is an **arsenic or antimony inhibitor** of $0.02$ to $0.05\ \%$ (the red-tube CW07R grade) or a **gunmetal or a silicon-bronze** fitting. **Graphitic corrosion** of a cast-iron pipe leaves the graphite flake network intact and the pipe looking sound and feeling like charcoal.
:::

::: definition Stress and environment: SCC, hydrogen and corrosion fatigue {#def-scc}
**Stress-corrosion cracking** needs three things at once — a susceptible material, a specific environment and a tensile stress — and none of the three alone will do it. The pairings are almost chemical:
$$
\begin{array}{l l}
\text{Austenitic stainless} & \text{chloride above } 60\ {}^{\circ}\mathrm{C}; \text{ the "60}^{\circ}\mathrm{C} \text{ rule"} \\
\text{Carbon and low-alloy steel} & \text{nitrate, hot caustic, carbonate-bicarbonate at pH 9-11} \\
\text{Copper, brass, bronze} & \text{ammonia or amine — "season cracking" of cartridge cases} \\
\text{Aluminium alloys} & \text{chloride, and the 7xxx in the short-transverse orientation} \\
\text{Titanium} & \text{methanol with a halide, and red fuming nitric acid} \\
\text{Nickel alloys} & \text{hot concentrated caustic, and molten salts} \\
\text{Cast iron in steam condensate} & \text{the "steam-hammer" cracking of old boiler stays}
\end{array}
$$
**The stress is almost never the applied stress.** A cold-worked, welded or cold-bent component carries $0.5$ to $1.0$ times its yield as **residual** stress, and the standard test for whether a stress-corrosion problem is a residual-stress problem is to **stress-relieve** the part and re-test. A $20\ \%$ cold-work of a sensitised 304 raises its susceptibility by two orders of magnitude, and a shot-peened surface — with $- 400\ \mathrm{MPa}$ at the surface — suppresses a surface crack entirely.
**Hydrogen damage** has four distinct forms and they are not the same problem. **Hydrogen embrittlement** is the loss of ductility of a high-strength steel charged with atomic hydrogen, with the reduction in area collapsing and the fracture going intergranular; the threshold is a **hydrogen partial pressure** and a **strength**, and the strength above which it becomes serious is $1{,}200\ \mathrm{MPa}$ tensile. **Hydrogen blistering** is the aggregation of hydrogen at an inclusion into a pressurised methane bubble and a visible blister in a pipeline plate. **Hydrogen attack** is the high-temperature reaction $\mathrm{H_2} + \mathrm{C} \rightarrow \mathrm{CH_4}$ that decarburises a steel and cracks it irreversibly, and it is the reason a hydrogenation reactor shell is a $2\tfrac{1}{4}\mathrm{Cr}\text{-}1\mathrm{Mo}$ steel and not a carbon steel above the **Nelson curve**. **Hydride formation** is the room-temperature embrittlement of titanium, zirconium and niobium, and it is why a titanium part must not be pickled in an acid that generates hydrogen.
**Corrosion fatigue** is the ordinary fatigue life multiplied by a factor of $2$ to $10$ in a wet environment, and — critically — **it has no endurance limit**. A steel with a $500\ \mathrm{MPa}$ fatigue limit in air has a $150\ \mathrm{MPa}$ fatigue **strength** at $10^{8}$ cycles in seawater, and the design must therefore be a finite-life design with an S-N curve measured in the environment.
:::

::: definition Mechanical-chemical and microbiological forms {#def-mechchem}
**Erosion-corrosion** is the removal of a protective film by a flowing fluid, and the design number is the **velocity limit**:
$$
\begin{array}{l c}
\text{Material (seawater)} & \text{Maximum velocity} \\
\text{Carbon steel} & 1\ \mathrm{m / s} \\
\text{Copper} & 1.5\ \mathrm{m / s} \\
\text{Copper-nickel 90/10} & 3\ \mathrm{m / s} \\
\text{Duplex 2205} & 6\ \mathrm{m / s} \\
\text{Titanium} & 25\ \mathrm{m / s} \\
\text{Cast iron with a protective film} & 2\ \mathrm{m / s}
\end{array}
$$
**Impingement attack** is its severe form at a turbulence promoter — the U-bend of a condenser tube, the inlet of a heat-exchanger tube plate, a valve seat — and it is defeated by a **velocity-inhibiting ferrule**, a **hydrodynamic inlet profile** and by not putting a weld root on the inside of a bend. **Cavitation** is the same mechanism driven by a collapsing bubble, whose micro-jet reaches $500\ \mathrm{MPa}$; it is defeated by a harder surface, a lower suction head and by not designing a pump with a net positive suction head margin below $3\ \mathrm{m}$. **Fretting** is the oxidation of the surfaces of a tight-fitting joint under a micrometre-scale oscillatory motion, and its product is the red $\mathrm{Fe_2 O_3}$ powder of a keyed shaft or a riveted lap joint; the fix is a **sufficient interference**, a **dry-film lubricant** or a **shot-peened** surface, and never a lubricant that washes out.
**Microbiologically-influenced corrosion** is corrosion whose initiation or acceleration is caused by microorganisms, and it is now recognised as the **dominant cause of carbon-steel pitting under deposits and in soil**. **Sulphate-reducing bacteria** convert $\mathrm{SO_4^{2 -}}$ to $\mathrm{H_2 S}$ under a deposit, and the $\mathrm{H_2 S}$ and the iron sulphide film it builds make a local cell that pits carbon steel at $0.5\ \mathrm{mm}$ a year under a $2\ \mathrm{mm}$ biofilm in water that would otherwise be benign. The tell-tale is a **black ferrous-sulphide deposit** with a rust ring, and the diagnosis is a **culture or a DNA test** of the deposit, not a water analysis.
:::

## Concrete, coatings and cathodic protection

::: definition Reinforced concrete {#def-concrete}
Concrete's pore solution is saturated calcium hydroxide at **pH 13**, at which the rebar is passive and stable. Two things destroy the passivity.
**Carbonation** is the diffusion of $\mathrm{CO_2}$ in and the reaction $\mathrm{Ca(OH)_2} + \mathrm{CO_2} \rightarrow \mathrm{CaCO_3} + \mathrm{H_2 O}$, which drops the pH to 9 and depassivates the steel **only where the carbonation front has passed**. The front advances as $\sqrt{t}$, at $2$ to $5\ \mathrm{mm}$ per decade in a sheltered exposure, and the design cover of $40\ \mathrm{mm}$ is a **forty-year** allowance.
**Chloride ingress** — from seawater, de-icing salt or a contaminated mix — depassivates at any pH once the **chloride-to-hydroxide ratio at the steel exceeds 0.6 by weight**, and the threshold is commonly taken as **$0.4\ \mathrm{kg}$ of acid-soluble chloride per cubic metre of concrete**. Chloride is a catalyst and not consumed, so a single ingress event corrodes for the life of the structure.
**The damage is mechanical, not chemical.** The corrosion product occupies **six times** the volume of the steel, and the resulting radial pressure cracks the cover along the bar and spalls it. **A $7\ \%$ loss of bar area is a structural limit**, and it can occur with no visible sign until the spall. The design responses are a **cover of 50 to $75\ \mathrm{mm}$**, a **low water-to-cement ratio below 0.45**, a **calcium-aluminate or a blended slag cement**, a **corrosion-inhibiting admixture** (calcium nitrite, at $2\ \%$ by mass of cement), **epoxy-coated** or **galvanised** or **manganese-based** rebar, **stainless** rebar at the bridge deck, and **cathodic protection** on anything already in trouble.
:::

::: definition Coatings {#def-coatings}
A coating does four jobs and a specification must say which: **barrier** (keep the electrolyte out), **sacrificial** (corrode instead of the steel), **inhibitive** (leak an inhibitor), and **passivating** (hold the metal in the passive field).
$$
\begin{array}{l c l l}
\text{Coating} & \text{Dry film thickness} & \text{Job} & \text{Failure mode} \\
\text{Hot-dip zinc} & 55\text{–}85\ \mu\mathrm{m} & \text{barrier + sacrificial} & \text{the first rust at 28 yr in C3, 120 yr rural} \\
\text{Zinc-rich epoxy} & 75\text{–}125\ \mu\mathrm{m} & \text{sacrificial, } 92\text{–}96\%\ \text{zinc in the dry film} & \text{needs a Sa 2.5 blast profile or it is just paint} \\
\text{Zinc-flake (Geomet)} & 8\text{–}15\ \mu\mathrm{m} & \text{barrier, no hydrogen} & \text{the fastener answer} \\
\text{Epoxy} & 150\text{–}300\ \mu\mathrm{m} & \text{barrier} & \text{chalking in UV; always a topcoat} \\
\text{Coal-tar epoxy} & 300\text{–}500\ \mu\mathrm{m} & \text{barrier, buried} & \text{brittle; banned in some waters} \\
\text{Polyurethane} & 50\text{–}80\ \mu\mathrm{m} & \text{topcoat, gloss and colour} & \text{not a barrier on its own} \\
\text{Flake-glass epoxy} & 500\text{–}1{,}500\ \mu\mathrm{m} & \text{chemical lining} & \text{the flake makes a tortuous path} \\
\text{Anodic oxide on Al} & 10\text{–}25\ \mu\mathrm{m} & \text{barrier + wear} & \text{sealed by hydrothermal hydration} \\
\text{Chromate conversion} & 0.1\text{–}1\ \mu\mathrm{m} & \text{inhibitive + paint primer} & \text{Cr(VI) — REACH-restricted} \\
\text{Trivalent conversion} & 0.1\text{–}0.5\ \mu\mathrm{m} & \text{primer} & \text{10\% worse salt-spray, and legal}
\end{array}
$$
**The three rules.** **Surface preparation is $80\ \%$ of the life**: a zinc-rich primer on a $Sa\ 2\tfrac{1}{2}$ blast profile lasts ten times as long as the same primer on a hand-cleaned surface, and the specification must state the **profile depth** of $50$ to $75\ \mu\mathrm{m}$ as well as the standard. **A coating is not a barrier but a resistor**, and its life is proportional to its **low-frequency impedance** and to the **$30^{\circ}$-per-decade** slope of its Bode plot; a coating that has taken up water still looks perfect and protects nothing. **A holiday is a pinhole and a pinhole is a failure**, which is why a lining is **holiday-tested** at $100\ \mathrm{V}$ per $100\ \mu\mathrm{m}$ and a buried pipeline is tested at $5\ \mathrm{kV}$.
:::

::: definition Cathodic protection {#def-cp}
Cathodic protection drives the structure's potential into the immunity field, and the criteria are:
$$
E \le - 0.85\ \mathrm{V\ vs\ Cu / CuSO_4}\ (\text{or } \mathrm{Ag / AgCl}) \text{, polarised and IR-free;} \qquad
\Delta E \ge 100\ \mathrm{mV}\ \text{of polarisation shift;}
$$
with $- 0.80\ \mathrm{V}$ for a **sulfate-reducing-bacteria** soil and $- 1.05\ \mathrm{V}$ for a **high-strength steel** where hydrogen embrittlement is the risk, and a **lower limit of $- 1.10\ \mathrm{V}$** beyond which the coating disbands and the steel is cathodically damaged.
**The current demand** is the design number, and it is dominated by the coating:
$$
\begin{array}{l c}
\text{Condition (seawater)} & \text{Current density} \\
\text{Bare steel} & 100\text{–}150\ \mathrm{A / m^{2}} \\
\text{Bare, cathodically protected from installation} & 30\text{–}50\ \mathrm{A / m^{2}} \\
\text{Coated, 1\% disbonded} & 1\text{–}2\ \mathrm{A / m^{2}} \\
\text{Coated, new} & 0.01\text{–}0.05\ \mathrm{A / m^{2}}
\end{array}
$$
**A $99\ \%$-coated structure needs a hundredth of the anode**, which is why a cathodic-protection design is a coating specification.
**The anode materials**, with their practical capacities:
$$
\begin{array}{l c c l}
\text{Anode} & \text{Capacity} & \text{Consumption} & \text{Use} \\
\text{Zinc} & 738\ \mathrm{Ah / kg} & 11.9\ \mathrm{kg / A \cdot yr} & \text{the classic; not above } 25\ {}^{\circ}\mathrm{C} \text{ (it becomes passive)} \\
\text{Aluminium In-Sn} & 2{,}680\ \mathrm{Ah / kg} & 3.3\ \mathrm{kg / A \cdot yr} & \text{the offshore answer; } 3.6\times \text{ zinc per kilogram} \\
\text{Magnesium high-potential} & 1{,}100\ \mathrm{Ah / kg} & 7.9\ \mathrm{kg / A \cdot yr} & \text{soil and fresh water (high driving voltage)} \\
\text{Mixed metal oxide} & \text{insoluble} & \text{net shape loss} & \text{impressed current; } 20\text{–}30\ \mathrm{A / kg} \text{ duty} \\
\text{Cast iron (high Si)} & \text{insoluble} & 0.5\ \mathrm{kg / A \cdot yr} & \text{impressed current in soil}
\end{array}
$$
**The two failure modes of a protection system.** **Under-protection** leaves the structure in the pitting field, and it is invisible because the potential reads $- 0.75\ \mathrm{V}$ and looks nearly right. **Over-protection** on a coated structure generates hydrogen at the steel-coating interface, which **disbands the coating** by osmotic and blister mechanics, and on a high-strength steel it charges the metal with hydrogen and causes a cathodic-disbondment hydrogen fracture. The $- 1.10\ \mathrm{V}$ ceiling is a fracture-mechanics limit and not a coating one.
:::

::: example The Faraday conversion in practice {#ex-faraday}
A steel plate is coated with $85\ \mu\mathrm{m}$ of hot-dip zinc. Give the life in a rural and in an industrial atmosphere, and the current density that would consume the coating in five years.
::: solution
**The consumption rates.** Zinc corrodes at $0.7\ \mu\mathrm{m / yr}$ in a C2 rural atmosphere and $3\ \mu\mathrm{m / yr}$ in a C3 industrial one, so
$$
t_{\mathrm{rural}} = \frac{85}{0.7} = 120\ \mathrm{yr}, \qquad
t_{\mathrm{ind}} = \frac{85}{3} = 28\ \mathrm{yr} .
$$
**The equivalent current.** A $3\ \mu\mathrm{m / yr}$ zinc loss is
$$
i = 1\ \mu\mathrm{A / cm^{2}} \times \frac{3}{15} = 0.20\ \mu\mathrm{A / cm^{2}} = 2\ \mathrm{mA / m^{2}} .
$$
**Five years' life** would require $60\ \mu\mathrm{m}$ consumed in five years, $12\ \mu\mathrm{m / yr}$, or $0.8\ \mu\mathrm{A / cm^{2}}$ — a rate reached only where the coating is coupled to a large cathode or is in a splash zone.
**The galvanic protection of a scratch.** A $1\ \mathrm{mm}$ scratch in a zinc-coated steel sheet exposes steel to an electrolyte; the zinc around it becomes the anode and protects the $1\ \mathrm{mm}^{2}$ of steel. The zinc consumed is
$$
m = \frac{i\, t\, M}{n F} ,
$$
and with the whole $1\ \mathrm{cm}^{2}$ of surrounding zinc supplying the $1\ \mathrm{mm}^{2}$ of steel at $11.6\ \mu\mathrm{m / yr}$, the zinc loss is $0.116\ \mu\mathrm{m}$ per year of steel loss — the coating will protect the scratch for **seven hundred years** of its own life.

*Check.* The ratio of the two penetration rates is the ratio of $M / (n \rho)$: zinc $65.4 / (2 \times 7.14) = 4.58$ against iron $55.85 / (2 \times 7.87) = 3.55$, a factor of $1.29$, and $15.0 / 11.6 = 1.29$. $\checkmark$

*Sanity.* This is why a galvanised bucket survives a scratch and a tin-plated can, once scratched, rusts through at the scratch: **tin is noble to steel, so the scratch becomes the anode and the concentration factor is the whole $100 : 1$ area ratio**. The same arithmetic is why a **nickel-chromium** coating on a plastic bumper works only as a barrier and why a **zinc-nickel** plating on a fastener works as a sacrificial one.
:::
:::

::: example Galvanic couple: aluminium stringer to steel bracket {#ex-galv}
An aluminium 2024 stringer is bolted to a carbon-steel bracket with a steel bolt in a humid-marine atmosphere. Give the driving force, the expected damage, and the design fix.
::: solution
**The driving force.** In a chloride-contaminated electrolyte the 2024 sits at $- 0.87\ \mathrm{V}$ and the steel at $- 0.61\ \mathrm{V}$ against $\mathrm{Ag / AgCl}$, so the couple potential is $260\ \mathrm{mV}$ and the **aluminium is the anode**.
**The damage, and why the area ratio decides it.** If the steel bracket is $100\ \mathrm{cm^{2}}$ and the aluminium's exposed area at the joint is $1\ \mathrm{cm^{2}}$ — a bare, scratched or anodised-but-scratched patch — the current density on the aluminium is $100$ times the couple's average. At a modest average of $0.1\ \mu\mathrm{A / cm^{2}}$ the local rate is $10\ \mu\mathrm{A / cm^{2}}$, which is
$$
\dot{x} = 10.9\ \mu\mathrm{m / yr} \times 10 = 109\ \mu\mathrm{m / yr} ,
$$
and a $3\ \mathrm{mm}$ stringer wall is gone in **twenty-eight years** — or in **three years** at a splash-zone current density.
**The design fix, in order of preference.**
1. **Insulate.** A **glass-fibre reinforced nylon washer and sleeve** at the bolt, a **non-hygroscopic** sealant bead of polysulphide or polyurethane around the joint, and a **primer** on both faying surfaces. The sleeve must be **full-length**, not a head washer, or the shank is a short-circuit.
2. **Reverse the area ratio.** Make the aluminium the big member and the steel the small one — a steel rivet in an aluminium plate is a design; an aluminium rivet in a steel plate is a design; a steel bolt in a big aluminium plate is a **problem**.
3. **Coat the cathode, not the anode.** A coating on the steel bracket reduces the cathode's area and therefore the current; a coating on the aluminium is fine until it has a holiday, and a holiday on a coated anode against a bare cathode is the **worst** configuration in corrosion engineering.
4. **Change one material.** A stainless bolt is worse than a steel one in this couple, because it is more noble; a **zinc**, **cadmium** or **zinc-nickel plated** steel bolt is better, because it becomes the anode and sacrifices itself.
5. **Drain.** A joint that holds water is a joint that corrodes; a weep hole and a slope are free.

*Check.* The measured open-circuit potential of the couple, with the two metals bonded in a wet salt fog, settles near $- 0.75\ \mathrm{V}$ — between the two, and closer to the aluminium because the aluminium's exchange current is low. $\checkmark$

*Sanity.* The rule that follows from this example is the one every airframe and marine design manual states: **never coat the anode and leave the cathode bare**. It is the reason an aluminium boat hull is painted and a **sacrificial zinc anode** is bolted to it, and the reason a **tin-plated** steel food can is lacquered inside and out and cannot be allowed a scratch.
:::
:::

::: example Cathodic protection of a pipeline {#ex-cp}
A $50\ \mathrm{km}$ of $900\ \mathrm{mm}$ diameter buried pipeline, coated with a $300\ \mu\mathrm{m}$ fusion-bonded epoxy with a $1\ \%$ holiday allowance, must be protected by impressed current. Give the current, the number of rectifier stations, and the anode.
::: solution
**The area and the current.** The surface is $\pi \times 0.9 \times 50{,}000 = 1.41 \times 10^{5}\ \mathrm{m^{2}}$. At a $1\ \%$ holiday and a bare-steel demand of $0.1\ \mathrm{mA / m^{2}}$ in aerated soil — a conservative figure for a **coated** line, where the design current is $1$ to $2\ \mathrm{mA / m^{2}}$ of **holiday** area —
$$
I = 1.41 \times 10^{5} \times 0.01 \times 1.5\ \mathrm{mA} = 2.1\ \mathrm{A} .
$$
**The rectifier stations.** A single station can protect $10$ to $20\ \mathrm{km}$ of a coated line before the **coating's resistance** attenuates the potential; the attenuation length is
$$
\lambda = \sqrt{\frac{r}{g}} , \qquad r = \frac{\rho_{\mathrm{soil}}}{\pi D}, \quad g = \frac{2 \pi}{\rho_{\mathrm{coating}}} \frac{1}{D} ,
$$
which for a $100\ \Omega\,\mathrm{m}$ soil and a $10^{6}\ \Omega\,\mathrm{m^{2}}$ coating gives $\lambda \approx 4\ \mathrm{km}$, so **six to eight stations** at $0.4\ \mathrm{A}$ each.
**The anodes.** **Mixed-metal-oxide on niobium or titanium** ribbon or sticks, backfilled with a high-coke-butt **cokeleze** filler, driven in pairs at each station, each rated $15\ \mathrm{A}$ at $50\ \mathrm{V}$ with a $20$-year design life at a $60\ \%$ duty.
**The three design traps.** **Stray-current interference**: a nearby railway or cathodically-protected structure's current collects on the pipeline at a **discharge** point and eats it in months; the fix is a **drainage cable** and an **interference survey** before construction. **Shielding**: a rock pad, a concrete weight coating, a disbonded tape or a **sleeve** at a road crossing shields the steel from the current and the potential reads $- 0.9\ \mathrm{V}$ at the test post while the metal under the shield is at $- 0.4\ \mathrm{V}$ and corroding; the fix is an **off-potential-gradient survey** and an **A-frame** or **CIPS** survey. **Overprotection at the rectifier**: the potential $200\ \mathrm{m}$ from the station is $- 2.0\ \mathrm{V}$ and the coating is disbanding; the fix is an **IR-free** measurement and a **current-on/current-off** switch at $0.1\ \mathrm{s}$.

*Check.* The total current of $2.1\ \mathrm{A}$ over $1.41 \times 10^{5}\ \mathrm{m^{2}}$ is $0.015\ \mathrm{mA / m^{2}}$ of total surface, which is the $1\ \%$ holiday times $1.5\ \mathrm{mA / m^{2}}$ — consistent. $\checkmark$

*Sanity.* The $1\ \%$ holiday allowance is the whole design: an uncoated line would need $14\ \mathrm{kA}$ and a small power station. It is also why a pipeline's **coating** is inspected and repaired by the same crew that installs it, why the **holiday detector** is a mandatory item on the spread, and why the industry's corrosion budget is a **coating** budget and not a **current** budget.
:::
:::

::: example Design: a seawater cooling system {#ex-design-cor}
Design the materials and the corrosion control for a $5\ \mathrm{MW}$ seawater-cooled heat exchanger and its $200\ \mathrm{m}$ of pipework, at $3\ \mathrm{m / s}$ design velocity and a twenty-year life with no chemical treatment.
::: solution
**The environment.** Filtered seawater at $25\ {}^{\circ}\mathrm{C}$, $3.5\ \%$ chloride, $3\ \mathrm{m / s}$, intermittently stagnant at a shutdown, oxygenated at $7\ \mathrm{mg / l}$, and at a metal temperature that rises $10\ {}^{\circ}\mathrm{C}$ above the water in the exchanger.
**The material selection, member by member.**
$$
\begin{array}{l l l}
\text{Item} & \text{Material} & \text{Why} \\
\text{Seawater pipework} & \text{CuNi 90/10 with a 25-year allowance, or duplex 2205} & 3\ \mathrm{m / s} \text{ is the CuNi limit; duplex has margin} \\
\text{Tube plate and shell} & \text{duplex 2205, or carbon steel with a lining} & \text{the cheapest section is the biggest} \\
\text{Tubes} & \text{CuNi 90/10 (or Ti Gr.2 if } > 3.5\ \mathrm{m / s}\text{)} & \text{fouling-resistant and erosion-tolerant} \\
\text{Water box} & \text{duplex, or carbon steel with a rubber lining} & \text{impingement at the inlet} \\
\text{Bolts} & \text{super-duplex or UNS N06625} & \text{316 pits under a washer at a crevice} \\
\text{Gaskets} & \text{PTFE-encapsulated or spiral-wound 316/graphite} & \textbf{no graphite: a graphite gasket is a cathode} \\
\text{Pump impeller} & \text{duplex or CD4MCuN} & \text{cavitation + erosion + chloride} \\
\text{Valve trim} & \text{Alloy 6 or Stellite on a duplex body} & \text{galling and erosion at the seat}
\end{array}
$$
**The five design rules that decide the outcome.**
1. **Velocity.** $3\ \mathrm{m / s}$ is the CuNi limit and the duplex limit is $6\ \mathrm{m / s}$; the design must **not** exceed the limit at a **blocked-tube** condition, when the flow redistributes and the remaining tubes run at twice the velocity.
2. **No crevice.** A tube-to-tubesheet joint is a crevice; the fix is a **roll-plus-weld** joint and no O-ring where a chloride can sit.
3. **No galvanic pair.** A copper-nickel tube in a steel tube plate is a $400\ \mathrm{mV}$ couple with a huge cathode-to-anode ratio; the fix is an **insulating sleeve** at the tube, or a **duplex** tube plate, or a **zinc** anode in the water box.
4. **No stagnation.** A shutdown with a full, static, warm, oxygenated pipe is the worst condition of the plant's life and the pitting starts there; the fix is a **drain at every low point**, a **downward slope**, and a **nitrite or amine inhibitor** charged at shutdown.
5. **Cathodic protection of the water box.** A **zinc** or **aluminium** anode in each water box, replaced annually, protects the tube-plate and the shell and — critically — **does not** protect the copper-nickel tubes, which must not be over-protected or they lose their protective oxide and start to foul.
**The monitoring.** A **coupons rack** at the return, an **electrical-resistance probe** at the exchanger outlet, a **linear-polarisation probe** in the water box, and a **tube pull** at five years with a metallographic examination of the crevice at the tubesheet.

*Design comment.* The general rule is that **a seawater system is designed by its velocity and its stagnation, not by its alloy**. Every material on the list above is a good material in the wrong place; the failures of seawater systems are almost never a wrong alloy and almost always a **design** — a dead leg, a crevice, a graphite gasket, a blocked tube, a shutdown with no inhibitor, and a copper-nickel tube in a steel plate.
:::
:::

::: example Design: a carbon capture solvent loop {#ex-design-co2}
Select the materials for an amine-based $\mathrm{CO_2}$ capture plant's absorber, regenerator and the interconnecting loop at $120\ {}^{\circ}\mathrm{C}$.
::: solution
**The environment, and why it is worse than it looks.** A $30\ \%$ monoethanolamine solution at $40\ {}^{\circ}\mathrm{C}$ in the absorber and $120\ {}^{\circ}\mathrm{C}$ in the regenerator, loaded with $\mathrm{CO_2}$, containing **heat-stable salts** — acetate, formate, oxalate, glycolate, thiocyanate and **thiosulphate** — from the amine's oxidative and thermal degradation, plus **oxygen** carried in from the flue gas and **chloride** and **sulphate** from the make-up water. The degradation products are the corrosion driver, and a plant that runs well for two years and then corrodes has a **reclaimer** problem and not a materials problem.
**The material selection.**
$$
\begin{array}{l l l}
\text{Item} & \text{Material} & \text{Comment} \\
\text{Absorber shell} & \text{carbon steel} & \text{mild corrosion, a 3 mm allowance is standard} \\
\text{Absorber internals, high-duty zone} & \text{316L or duplex 2205} & \text{the rich-solvent entry is the hottest and fastest-corroding point} \\
\text{Regenerator shell and head} & \text{316L clad, or 2205} & 120\ {}^{\circ}\mathrm{C}\text{, low } \mathrm{CO_2} \text{ partial pressure at the top, and this is the SCC risk} \\
\text{Reboiler tubes} & \text{316L or Alloy 20 for a high-chloride feed} & \text{under-deposit and crevice at the tubesheet} \\
\text{Pump and pipework} & \text{carbon steel with a 3 mm allowance} & \text{velocity below 2 m/s; erosion-corrosion above it} \\
\text{Reclaimer} & \text{Alloy 20, Hastelloy C-276 or a lining} & \text{the concentrated, hot, acid, oxidising worst case} \\
\text{Gaskets} & \text{spiral-wound 316 / PTFE-face} & \text{no graphite with an amine} \\
\text{Bolts} & \text{B8M or N06625} & \text{carbon steel bolts in a hot amine corrode and seize}
\end{array}
$$
**The three failure modes.** **Erosion-corrosion** at a **$2\ \mathrm{m / s}$** velocity limit, at an elbow, a valve trim or a pump impeller, and it is the dominant loss of wall in a rich-solvent line. **Chloride stress-corrosion cracking** of the 316L at the regenerator where the temperature exceeds $60\ {}^{\circ}\mathrm{C}$ and the chloride concentrates by evaporation at a weld or a deposit; the fix is a **duplex** or an **Alloy 825** in that section and a **chloride limit of $50\ \mathrm{ppm}$** in the make-up water. **Under-deposit corrosion** at the reboiler tubesheet and at the absorber's liquid distributor.
**The corrosion control.** A **reclaimer** that removes the heat-stable salts and keeps them below $6\ \%$ by mass of amine; a **carbon filter and a coalescer** to remove the degradation oils and the iron; a **chloride limit** on the make-up; a **velocity limit**; a **corrosion-inhibiting amine package** (a nitrite-free, molybdate-based or a proprietary inhibitor); and **coupon racks** at six locations with a quarterly reading.
**The monitoring that actually works.** A **hydrogen-flush probe** on the reboiler, **electrochemical-noise** sensors at the welds, and a **quarterly solvent analysis** for the heat-stable salts, iron and chloride. A plant that measures its solvent measures its corrosion.

*Design comment.* The general rule is that **a closed-loop chemical plant is designed on its degradation products and not on its process chemistry**, and that the corrosion specification must include a **water quality** and a **solvent management** clause. The materials on the list above are the industry standard and are adequate; the plants that fail have a reclaimer that was never commissioned and a make-up water with $200\ \mathrm{ppm}$ of chloride.
:::
:::

::: history
**Humphry Davy**'s 1824 invention of sacrificial protection — the zinc and iron strips he bolted to the copper sheathing of the Admiralty's ships, after **Joseph Banks**'s 1796 report on the fast decay of the copper of HMS *Salamander* — is the first corrosion engineering, and it was rejected by the Royal Navy for sixty years because it was thought to increase friction. **Michael Faraday**'s 1836-37 Bakerian lectures on the chemical condition of iron in contact with water, which established the **passivity** of iron in concentrated nitric acid and the role of oxygen, are the foundation of the science. **Ulick Richardson Evans**'s 1914 *Proceedings of the Royal Society* paper on the rusting of iron, written while he was a student and rejected twice, established the **electrochemical** mechanism with a ferricylide-phenolphthalein gel and a visible anode-cathode pattern, and his 1929 monograph *The Corrosion and Rusting of Metals* was the standard text for thirty years; **Evans** also invented the **Evans balance** for high-temperature oxidation. **Marcel Pourbaix**'s 1945 atlas of electrochemical equilibria, produced at the Institut de Corrosion in Brussels, turned Faraday's chemistry into a design chart and is still the first thing a corrosion engineer opens. **Herbert H. Uhlig**'s 1953 *Journal of the Electrochemical Society* paper on the critical pitting potential and **John Kruger**'s and **Morris J. Cohen**'s 1960s passivity work gave localised attack its quantitative form; **H. H. Uhlig** and **D. N. Triadja**'s 1972 book and **M. G. Fontana**'s 1967 *Corrosion Engineering* trained two generations. **M. H. Peters** and the **NACE** group that established the **$- 0.85\ \mathrm{V}$** criterion, **R. C. Nelson**'s curves of 1949 for high-temperature hydrogen attack; **C. E. (Cy) Johnson**'s 1930s discovery of the **season cracking** of brass cartridge cases in ammonia fumes and **A. T. Fry**'s 1940s work on the same; and **F. L. (Fred) LaQue**'s 1950 *Marine Corrosion* and the **LaQue Center for Marine Corrosion** at Key West, which measured the galvanic series in flowing seawater by mooring instrumented panels to a dock for sixty years, are the empirical foundation of every marine design manual in use.
:::

## Where this leads

The passivity that saves a stainless is the oxide of [[materials-science/bonding-structure]] and the alloying of [[materials-science/material-families]], the stress-corrosion and hydrogen thresholds are the fracture mechanics of [[materials-science/failure]], the sensitisation of a weld is the precipitation of [[materials-science/phase-transformations]], and the corrosion allowance and the coating life are the economics of [[materials-science/materials-selection]].

::: summary
- Corrosion is thermodynamically inevitable; the Pourbaix diagram says what is possible and never what happens, and gives no rate.
- Passivity requires an oxide with a Pilling-Bedworth ratio of 1 to 2 that is insoluble, and only $\mathrm{Al_2 O_3}$, $\mathrm{Cr_2 O_3}$, $\mathrm{SiO_2}$ and $\mathrm{TiO_2}$ qualify.
- The rate is a Faraday conversion: $1\ \mu\mathrm{A / cm^{2}}$ is $11.6\ \mu\mathrm{m / yr}$ on iron, and a passive film passes $10^{- 8}\ \mathrm{A / m^{2}}$.
- Most aqueous corrosion is cathodically controlled, so the area ratio and the oxygen supply set the damage, not the potential difference.
- Localised attack — pit, crevice, grain boundary, dealloying — is where the failures are, and a crevice is always worse than the open surface.
- Stress-corrosion cracking needs material, environment and stress together, and the stress is usually residual.
- A coating's life is set by its surface preparation and its holidays, and a holiday is a failure.
- Cathodic protection is a coating specification: a $99\ \%$-coated structure needs a hundredth of the current.
- Most corrosion failures are design failures — a crevice, a dead leg, a graphite gasket, a coated anode — and are free to design out.
:::

::: quiz
A stainless steel pipe is found perforated under a bolted clamp, the rest of the surface untouched. What is the mechanism?
- [x] Crevice corrosion: oxygen depletion under the clamp made the gap anodic and acid
- [ ] General thinning from chloride attack
- [ ] Erosion-corrosion at the clamp
- [ ] Microbiologically-influenced corrosion
::: solution
The first option. Under the clamp the dissolved oxygen is consumed by the cathodic reaction and cannot diffuse back in, so the gap becomes the anode of a differential-aeration cell; the ferrous ions that form hydrolyse to give a local pH near 2 and the chloride migrates in as the counter-ion, giving an autocatalytic ferrous-chloride solution that eats metal while the large external surface, at a potential $300\ \mathrm{mV}$ more noble, carries the cathodic reaction. General thinning would have attacked the whole surface; the untouched surface outside the clamp is the diagnostic.
:::
:::

## Exercises

::: exercise Faraday {level=1 check="11.6"}
A corrosion current of $1\ \mu\mathrm{A / cm^{2}}$ on iron corresponds to what penetration rate in micrometres per year?
::: solution
$11.6\ \mu\mathrm{m / yr}$.
:::
:::

::: exercise Passivity {level=1 check="1.28"}
Give the Pilling-Bedworth ratio of alumina on aluminium.
::: solution
$1.28$ — slightly expansive, coherent, adherent and insoluble.
:::
:::

::: exercise Tafel {level=1 check="118"}
Give the Tafel slope in millivolts per decade for a one-electron reaction with a transfer coefficient of $0.5$ at $25\ {}^{\circ}\mathrm{C}$.
::: solution
$118\ \mathrm{mV}$ per decade.
:::
:::

::: exercise Stainless {level=1 check="60"}
Above what temperature in degrees Celsius does the chloride stress-corrosion of austenitic stainless become a design concern?
::: solution
About $60\ {}^{\circ}\mathrm{C}$ — the "60 degree rule".
:::
:::

::: exercise Anodes {level=1 check="3.6"}
By what factor does an aluminium sacrificial anode beat a zinc anode per kilogram?
::: solution
About $3.6$ — $2{,}680$ against $738\ \mathrm{Ah / kg}$.
:::
:::

::: exercise Coating life {level=2}
A zinc coating survives 120 years in a C2 rural atmosphere. Give its thickness if the rural zinc corrosion rate is $0.7\ \mu\mathrm{m / yr}$, and its life in a C4 industrial atmosphere at $7\ \mu\mathrm{m / yr}$.
::: solution
$t = 0.7 \times 120 = 84\ \mu\mathrm{m}$, a typical hot-dip thickness. In C4, $t / 7 = 12\ \mathrm{yr}$.
*Sanity.* A hundred-fold change in atmosphere gives a ten-fold change in life, because the atmospheric corrosion rate is roughly linear in the $\mathrm{SO_2}$ and chloride deposition. It is why a galvanised transmission tower in a rural setting is a fifty-year design and the same tower in a coastal industrial setting is repainted at fifteen, and why the ISO 9223 category is a **site** classification and not a material one.
:::
:::

::: exercise Galvanic {level=2}
A $2\ \mathrm{cm^{2}}$ patch of bare steel is riveted to a $2\ \mathrm{m^{2}}$ aluminium-alloy panel in marine service. With a couple current density on the aluminium of $0.05\ \mu\mathrm{A / cm^{2}}$, give the penetration rate of the aluminium around the patch.
::: solution
The area ratio is $A_c / A_a = 20{,}000 / 2 = 10{,}000$, so the current density on the **steel** — which is the **cathode** here — is not the problem; the aluminium panel is the anode and its area is the large one.
$$
i_{\mathrm{Al}} = 0.05\ \mu\mathrm{A / cm^{2}} \ \Rightarrow\ \dot{x} = 10.9 \times 0.05 = 0.55\ \mu\mathrm{m / yr} .
$$
*Sanity.* The **large-anode-small-cathode** arrangement is the safe one and gives half a micrometre a year. Reverse it — a $2\ \mathrm{m^{2}}$ steel plate with a $2\ \mathrm{cm^{2}}$ aluminium patch — and the same total current is concentrated a thousand-fold into the aluminium at $0.55\ \mathrm{mm / yr}$. The example is the whole of the area rule in two lines.
:::
:::

::: exercise Concrete {level=2}
A carbonation front advances at $3\ \mathrm{mm}$ per decade in a $40\ \mathrm{mm}$-cover structure. Give the time to depassivation of the rebar and the time to a visible spall, and comment.
::: solution
The front advances as $x = k \sqrt t$, so $k = 3 / \sqrt{10} = 0.95\ \mathrm{mm / yr^{0.5}}$ and the $40\ \mathrm{mm}$ cover is reached at $t = \left( 40 / 0.95 \right)^{2} = 1{,}800\ \mathrm{yr}$.
*Sanity.* A $40\ \mathrm{mm}$ cover is therefore a **millennium** design against carbonation in a sheltered exposure — and yet a bridge deck spalls in twenty-five years. The reason is that **chloride**, not carbonation, is the mechanism, and that chloride reaches the $0.4\ \mathrm{kg / m^{3}}$ threshold in a splash-zone deck in ten to twenty years at a $40\ \mathrm{mm}$ cover. The carbonation calculation is a useful check that the cover is not the problem; the chloride calculation is the design.
:::
:::

::: exercise Derivation {level=3}
Derive the Faraday penetration-rate conversion from first principles and evaluate it for iron, zinc and aluminium. Then derive the area-ratio rule for a galvanic couple.
::: solution
**The conversion.** A current $i$ over an area $A$ dissolves metal at
$$
\frac{\mathrm{d} n}{\mathrm{d} t} = \frac{i A}{n F} \quad \Rightarrow \quad \frac{\mathrm{d} m}{\mathrm{d} t} = \frac{i A M}{n F} .
$$
The penetration rate is the mass rate divided by the area, the density and the time:
$$
\dot{x} = \frac{1}{\rho} \frac{\mathrm{d} m / \mathrm{d} t}{A} \frac{1}{1} = \frac{i M}{n F \rho} \quad \left[ \mathrm{m / s} \right] \text{ for } i \text{ in } \mathrm{A / m^{2}} .
$$
For iron with $i = 10^{- 2}\ \mathrm{A / m^{2}}$ ($1\ \mu\mathrm{A / cm^{2}}$), $M = 0.05585\ \mathrm{kg / mol}$, $n = 2$, $\rho = 7{,}870\ \mathrm{kg / m^{3}}$:
$$
\dot{x} = \frac{10^{- 2} \times 0.05585}{2 \times 96{,}485 \times 7{,}870} = 3.67 \times 10^{- 13}\ \mathrm{m / s}
= 11.6\ \mu\mathrm{m / yr} . \quad \checkmark
$$
For zinc, $M / (n \rho) = 0.06538 / (2 \times 7{,}140) = 4.58 \times 10^{- 6}$ against iron's $3.55 \times 10^{- 6}$, giving $15.0\ \mu\mathrm{m / yr}$; for aluminium, $0.02698 / (3 \times 2{,}700) = 3.33 \times 10^{- 6}$, giving $10.9\ \mathrm{\mu m / yr}$.
**The area rule.** A galvanic couple has one current $I$ and two areas. The cathode's rate is limited by oxygen supply, so $I \approx j_{\mathrm{O_2}} A_c$ where $j_{\mathrm{O_2}}$ is the oxygen-supply-limited current density of about $10$ to $100\ \mu\mathrm{A / m^{2}}$ in still seawater. The anode's penetration rate is therefore
$$
\boxed{ \dot{x}_a = \frac{j_{\mathrm{O_2}} M}{n F \rho} \times \frac{A_c}{A_a} } ,
$$
independent of the potential difference and of the exchange current density. **The driving force sets whether the couple acts; the area ratio sets how fast it eats.**
*Sanity.* The independence from the potential is the fact that surprises every new practitioner and is the reason a **titanium-to-steel** couple and a **copper-to-steel** couple do the same damage at the same area ratio, and why a **copper-nickel** tube in a **steel** tube plate is a design problem however noble the alloy's potential is claimed to be.
:::
:::

::: exercise Design {level=3}
Select the materials and the corrosion control for a lithium-ion battery pack's coolant plate and its loop, and justify against the alternatives.
::: solution
**The environment, and the two requirements that conflict.** A $50\ \%$ ethylene-glycol-water mixture at $- 20$ to $60\ {}^{\circ}\mathrm{C}$ with a carboxylate- or OAT-type inhibitor, electrically **conductive**, in permanent contact with **aluminium** cells and their **aluminium** casing, and required to have **zero** metal-ion contamination because a copper or iron ion plated onto a cell's anode causes an internal short.
**The candidates and their elimination.**
$$
\begin{array}{l l}
\text{Copper or brass} & \text{copper ions migrate and plate on the cell anode; } \textbf{forbidden by the cell chemistry} \\
\text{Carbon steel} & \text{corrodes in glycol without an inhibitor and the inhibitor depletes; rejected} \\
\text{304 stainless} & \text{chloride pitting from a single bad coolant fill; and it is a cathode to aluminium} \\
\text{Aluminium 3003 braze with a sacrificial core} & \text{the automotive answer; a } \mathrm{Zn} \text{ layer and a } \mathrm{Mn} \text{ dispersoid} \\
\text{PA66-GF or a PPS plastic plate} & \text{no corrosion at all, and the emerging answer} \\
\text{Titanium} & \text{immune, and 20 times the cost of the aluminium it replaces}
\end{array}
$$
**Choice: an aluminium braze — a 3003-1 core with an $\mathrm{Al\text{-}Si}$ braze cladding and a **zinc-rich** wash-coat — with an OAT coolant containing no silicate, no borate, no nitrite and no amine, and a **plastic** expansion tank.**
**The four design problems.** **Galvanic between the plate and the cell housing**: both aluminium, but different alloys and different tempers, and a $100\ \mathrm{mV}$ couple in a hot glycol is enough to pit a braze seam; the fix is a **conductive but insulating** thermal pad and a **fastener** that does not pierce the cladding. **Erosion-corrosion at the inlet of a cast manifold**: the glycol at $2\ \mathrm{m / s}$ with a $5\ \%$ air entrainment strips a braze surface; the fix is a **radiused inlet** and a **velocity of $1\ \mathrm{m / s}$** at the manifold. **Cavitation at the pump**: a small centrifugal pump at a low NPSH cavitates and eats the impeller and the plate; the fix is a **magnetic-drive** or a **regenerative** pump and a **pressurised** suction. **Inhibitor depletion**: an OAT inhibitor protects by forming a carboxylate film on the aluminium, and the film is consumed by the copper of the radiator's solder and by the brass of a heater core; the fix is **no copper and no brass anywhere in the loop**, and a **coolant test strip** in the service schedule.
**The galvanic isolation of the high-voltage system.** A coolant that is electrically conductive bridging a $400\ \mathrm{V}$ cell stack to an aluminium housing is a shock and an arc hazard, so the loop is designed with a **resistive** path — a long narrow tube, a plastic section, or a **coolant with a specified conductivity of $< 1{,}500\ \mu\mathrm{S / cm}$** — and a **insulation-resistance** test is a production check.

*Design comment.* The general rule is that **a corrosion specification written for a chemical plant is the wrong specification for a battery**, because the constraint is not the metal's life but the **ion's purity**, and because the design life is fifteen years with no maintenance. The answer is not a better alloy but a **plastic** coolant plate, and the industry is moving there for exactly this reason: the corrosion problem is designed out rather than managed.
:::
:::
