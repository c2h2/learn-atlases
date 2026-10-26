Corrosion is not an accident. It is the metal returning towards the oxide or salt it was smelted from, and the direction is fixed by thermodynamics before any design is drawn. Corrosion engineering therefore cannot stop the reaction; it controls the rate, and it has four levers: **change the material, change the environment, change the electrode potential, or change the design** — and the last is cheapest when it is done on the drawing board.

The one number to carry away is the **Faraday conversion**: a corrosion current density of $1\ \mu\mathrm{A / cm^{2}}$ ($10^{-2}\ \mathrm{A / m^{2}}$) on iron removes **$11.6\ \mu\mathrm{m}$ per year**. A passive stainless steel in neutral water passes of the order of $0.01\ \mu\mathrm{A / cm^{2}}$ and loses about $0.1\ \mu\mathrm{m}$ a year; an active pit can pass $1\ \mathrm{mA / cm^{2}}$ locally and penetrates about $12\ \mathrm{mm}$ a year. **The damage is a current divided by an area**, and a square millimetre of anode coupled to a square metre of cathode concentrates the current a millionfold.

::: warning Six design errors behind many corrosion failures
**A large cathode and a small anode.** An aluminium rivet in a steel plate corrodes quickly; a steel rivet in an aluminium plate does little harm. The **area ratio** $A_c / A_a$ sets the current density on the anode, and a galvanic series does not show it. **A crevice.** Under a gasket, a bolt head, a deposit or in a lap joint the oxygen is consumed and not replaced, the trapped solution becomes acidic and rich in chloride, and a 316 stainless steel that resists the open surface can suffer crevice attack in warm seawater. **The wrong flow velocity.** Seawater systems suffer deposits, fouling and under-deposit pitting when the flow is slow or stagnant, and **erosion-corrosion** when it is too fast; every material has a velocity window and the design must sit in it. **A dead leg, a sump or a pocket** where liquid collects and never moves — a common source of leaks, and free to design out. **A weld in a sensitisable stainless steel.** The heat-affected zone of a standard-carbon 304 can spend long enough between about $425$ and $815\ {}^{\circ}\mathrm{C}$ to precipitate chromium carbides on its grain boundaries, leaving a band near the weld open to intergranular attack ("weld decay"). **Over-protection.** Cathodic protection driven too negative generates hydrogen at the steel surface; it **disbonds** coatings and can embrittle high-strength steel, so the part the engineer thought was protected fails by hydrogen cracking.
:::

## Thermodynamics: what can happen

::: definition The electrode potential and the Pourbaix diagram {#def-nernst}
A metal in contact with its ions reaches an equilibrium potential given by the **Nernst** equation,
$$
E = E^{\circ} + \frac{R T}{n F} \ln a_{\mathrm{M}^{n+}}
= E^{\circ} + \frac{0.05916}{n} \log a_{\mathrm{M}^{n+}} \quad \text{at } 25\ {}^{\circ}\mathrm{C} ,
$$
with $E^{\circ}$ the **standard electrode potential** in volts against the standard hydrogen electrode (SHE):
$$
\begin{array}{l c l c}
\mathrm{Mg^{2 +} / Mg} & - 2.37 & \mathrm{Ni^{2 +} / Ni} & - 0.25 \\
\mathrm{Al^{3 +} / Al} & - 1.66 & \mathrm{Cr^{3 +} / Cr} & - 0.74 \\
\mathrm{Ti^{2 +} / Ti} & - 1.63 & \mathrm{Fe^{2 +} / Fe} & - 0.44 \\
\mathrm{Zn^{2 +} / Zn} & - 0.76 & \mathrm{Cu^{2 +} / Cu} & + 0.34 \\
\mathrm{2 H^{+} / H_2} & 0.00 & \mathrm{Ag^{+} / Ag} & + 0.80 \\
\mathrm{Fe^{3 +} / Fe^{2 +}} & + 0.77 & \mathrm{Au^{3 +} / Au} & + 1.50
\end{array}
$$
A **Pourbaix** diagram plots $E$ against pH for a metal-water system at $25\ {}^{\circ}\mathrm{C}$, conventionally with $10^{- 6}\ \mathrm{mol/kg}$ of dissolved metal as the boundary of "corrosion", and divides the plane into **immunity**, **corrosion** and **passivity** fields. Two lines bound the stability of water itself:
$$
\mathrm{O_2} + 4 \mathrm{H}^{+} + 4 e \rightarrow 2 \mathrm{H_2 O}, \quad E = 1.23 - 0.059\, \mathrm{pH} ; \qquad
2 \mathrm{H}^{+} + 2 e \rightarrow \mathrm{H_2}, \quad E = - 0.059\, \mathrm{pH} ,
$$
(in volts vs SHE, at $1\ \mathrm{atm}$ of gas), parallel and $1.23\ \mathrm{V}$ apart; oxygen reduction is the cathodic reaction of most corrosion in aerated water, and hydrogen evolution that of corrosion in acids.
**Reading the diagram.** For iron with $10^{-6}$ of dissolved $\mathrm{Fe^{2+}}$ the immunity boundary is $E = -0.44 + 0.0296 \log 10^{-6} = -0.62\ \mathrm{V}$; below it iron cannot corrode, which is what cathodic protection aims for. Iron corroding freely in aerated neutral water sits near $-0.4\ \mathrm{V}$ (SHE), in the corrosion field, and rusts. Aluminium between about pH 4 and 8.5 is **passive**, which is why an aluminium window frame survives rain; outside that range its oxide dissolves, which is why a drinks can needs an internal lacquer and why caustic cleaners etch aluminium. **The diagram says what is possible, never how fast**: it gives no rate and says nothing about pitting, which is a local breakdown of a thermodynamically stable film.
:::

::: definition Passivity and the Pilling-Bedworth ratio {#def-passivity}
A metal is **passive** when it is covered by a thin, adherent, poorly soluble oxide through which ions move so slowly that the metal is effectively insulated from the environment.
**The Pilling-Bedworth ratio** (1923) is the volume of oxide formed per volume of metal consumed:
$$
R_{\mathrm{PB}} = \frac{V_{\mathrm{oxide}}}{V_{\mathrm{metal}}} = \frac{M_{\mathrm{oxide}}\, \rho_{\mathrm{metal}}}{k\, M_{\mathrm{metal}}\, \rho_{\mathrm{oxide}}} ,
$$
where $k$ is the number of metal atoms per formula unit of oxide. Values computed from handbook densities:
$$
\begin{array}{l c l}
\mathrm{K_2 O} / \mathrm{K} & 0.44 & \text{film in tension, porous} \\
\mathrm{Na_2 O} / \mathrm{Na} & 0.57 & \text{film in tension, porous} \\
\mathrm{MgO} / \mathrm{Mg} & 0.80 & \text{slightly porous; only partly protective} \\
\mathrm{Al_2 O_3} / \mathrm{Al} & 1.29 & \text{coherent and adherent} \\
\mathrm{TiO_2} / \mathrm{Ti} & 1.78 & \text{protective at ambient temperature} \\
\mathrm{FeO} / \mathrm{Fe} & 1.76 & \text{highly defective; grows fast at high temperature} \\
\mathrm{SiO_2} / \mathrm{Si} & 1.88 & \text{protective} \\
\mathrm{Cr_2 O_3} / \mathrm{Cr} & 2.01 & \text{protective} \\
\mathrm{Fe_3 O_4} / \mathrm{Fe} & 2.10 & \text{mill scale; protective only while intact} \\
\mathrm{Fe_2 O_3} / \mathrm{Fe} & 2.15 & \text{cracks and spalls} \\
\mathrm{WO_3} / \mathrm{W} & 3.39 & \text{spalls, and volatile at high temperature}
\end{array}
$$
A ratio below 1 leaves the film in tension and porous; a ratio well above 2 builds compressive stresses that buckle and spall it. The ratio is only a first guide — $\mathrm{FeO}$ lies in the favourable range but is non-protective because ions diffuse through it quickly — but the oxides that make engineering alloys corrosion-resistant, $\mathrm{Cr_2 O_3}$, $\mathrm{Al_2 O_3}$, $\mathrm{SiO_2}$ and $\mathrm{TiO_2}$, all have ratios between about 1.3 and 2, low ionic conductivity and low solubility in neutral water.
**The passivation curve.** An anodic polarisation sweep on a passive alloy shows an **active** region, a **critical current density** $i_{\mathrm{crit}}$, an abrupt drop to a **passive current density** $i_p$, and at a high enough potential a rise called the **transpassive** region, where the film dissolves as an oxy-anion or water is oxidised to oxygen. Typical passive current densities are $10^{- 5}$ to $10^{- 3}\ \mathrm{A / m^{2}}$, which by the Faraday conversion is
$$
i_p \sim 10^{- 5} \text{ to } 10^{-3}\ \mathrm{A / m^{2}} \ \Rightarrow\ \text{about } 0.01 \text{ to } 1\ \mu\mathrm{m / yr} .
$$

::: widget plot
title: Anodic polarisation curve of a passive alloy (schematic)
f: log10(360*exp(-60*max(0,x+0.1)+6*min(0,x+0.1))+0.02+0.02*exp(8*(x-0.6)))
x: -0.5, 1.2
y: -2, 3
caption: $\log_{10} i$, with $i$ in $\mathrm{mA / m^2}$, against applied potential in volts for a schematic passive alloy. Follow the curve from left to right: the current rises to a critical value of $360\ \mathrm{mA / m^2}$ at $- 0.1\ \mathrm{V}$, falls by more than four decades to a passive plateau of about $0.02\ \mathrm{mA / m^2}$, and turns up again in the transpassive region beyond about $+ 0.6\ \mathrm{V}$. The **critical current density** is what the cathodic reaction must supply for the alloy to passivate (or re-passivate a scratch); the **passive current density** sets the corrosion rate in service; and the **transpassive potential** is the upper limit of useful passivity.
:::

**The two engineering consequences.** A passive alloy must **re-passivate** after a scratch, and it can do so only if oxygen or another oxidant supplies enough cathodic current to exceed $i_{\mathrm{crit}}$ — which is why a crevice, where the oxygen is used up, is the weak point of a passive alloy. And the transpassive potential is a ceiling: in strongly oxidising media such as hot nitric acid containing dissolved chromium(VI), stainless steel can be driven into the transpassive range and suffer rapid intergranular attack.
:::

## Kinetics: how fast

::: definition Mixed potential, Tafel and the corrosion rate {#def-mixed}
A corroding metal is a short-circuited cell in which an anodic and a cathodic reaction proceed at the same total rate, and it settles at the **corrosion potential** $E_{\mathrm{corr}}$ where the two currents are equal (Wagner and Traud's mixed-potential theory). Far enough from equilibrium each reaction obeys a **Tafel** law,
$$
\eta = a + b \log i , \qquad b = \frac{2.303\, R T}{\alpha n F} = 118\ \mathrm{mV} \ \text{per decade at } 25\ {}^{\circ}\mathrm{C} \quad \left( \alpha = 0.5,\ n = 1 \right),
$$
and the intersection of the anodic and cathodic Tafel lines gives $i_{\mathrm{corr}}$. The **Stern-Geary** relation converts the easily measured **polarisation resistance** near $E_{\mathrm{corr}}$ to the corrosion rate:
$$
R_p = \left( \frac{\mathrm{d} E}{\mathrm{d} i} \right)_{E_{\mathrm{corr}}} = \frac{b_a \left| b_c \right|}{2.303\, i_{\mathrm{corr}} \left( b_a + \left| b_c \right| \right)} = \frac{B}{i_{\mathrm{corr}}}, \qquad B = 26\ \mathrm{mV}\ \text{for } b_a = \left| b_c \right| = 118\ \mathrm{mV} .
$$
**The Faraday conversion** turns an electrochemical measurement into a penetration rate:
$$
\dot{x} = \frac{i_{\mathrm{corr}}\, M}{n\, F\, \rho}
\quad \Rightarrow \quad
\boxed{ 1\ \mu\mathrm{A / cm^{2}} \equiv 11.6\ \mu\mathrm{m / yr}\ \text{on iron} } ,
$$
and $15.0\ \mu\mathrm{m / yr}$ on zinc, $11.6\ \mu\mathrm{m / yr}$ on copper ($n = 2$) and $10.9\ \mu\mathrm{m / yr}$ on aluminium. For iron:
$$
\begin{array}{l c l}
i_{\mathrm{corr}} & \text{Rate} & \text{Verdict} \\
10^{- 5}\ \mathrm{A / m^{2}} & 0.012\ \mu\mathrm{m / yr} & \text{passive; negligible} \\
10^{- 4}\ \mathrm{A / m^{2}} & 0.12\ \mu\mathrm{m / yr} & \text{excellent} \\
10^{- 3}\ \mathrm{A / m^{2}} & 1.2\ \mu\mathrm{m / yr} & \text{good} \\
10^{- 2}\ \mathrm{A / m^{2}} & 11.6\ \mu\mathrm{m / yr} & \text{acceptable with a corrosion allowance} \\
10^{- 1}\ \mathrm{A / m^{2}} & 116\ \mu\mathrm{m / yr} & \text{bare steel in aerated seawater, order of magnitude} \\
10\ \mathrm{A / m^{2}} & 11.6\ \mathrm{mm / yr} & \text{an active pit; months to perforation}
\end{array}
$$
:::

::: definition Concentration, aeration and the area rule {#def-aeration}
Much aqueous corrosion in neutral water is **cathodically controlled** — the anodic reaction could go faster than oxygen can diffuse to the cathode — so the rate is set by the oxygen **supply**. Two consequences matter most in practice.
**Differential aeration.** A crevice, a deposit or a droplet becomes oxygen-depleted and therefore **anodic** to the aerated surroundings. The cell is
$$
\text{aerated (cathode)}: \mathrm{O_2} + 2 \mathrm{H_2 O} + 4 e \rightarrow 4\, \mathrm{OH}^{-}, \qquad
\text{depleted (anode)}: \mathrm{Fe} \rightarrow \mathrm{Fe}^{2 +} + 2 e .
$$
The metal ions produced in the occluded region hydrolyse and acidify the solution, chloride migrates in to balance the charge, and the local chemistry becomes an acidic metal-chloride solution — autocatalytic, because the acid prevents the film from re-forming. **This is the mechanism of pitting and crevice attack**, and it is why a stainless steel that is perfect on a flat panel can fail under a washer.
**The area rule.** The galvanic current is set by what the cathode can supply and is **concentrated onto the anode's area**:
$$
i_{\mathrm{anode}} = \frac{i_{\mathrm{cathode}} A_c}{A_a} , \qquad
\dot{x}_{\mathrm{anode}} = \frac{i_{\mathrm{cathode}} M}{n F \rho} \times \frac{A_c}{A_a} .
$$
An aluminium rivet in a steel sheet ($A_c / A_a \approx 100$) sees a hundred times the cathode's current density and is consumed quickly; a steel rivet in an aluminium sheet ($A_c / A_a \approx 1/100$) spreads the same attack over a hundred times the area and does little harm. **The galvanic series tells you which metal is the anode; the area ratio tells you whether it matters.**
:::

## The forms of corrosion

::: definition Galvanic corrosion and the seawater series {#def-galvanic}
The **galvanic series** ranks metals by their corrosion potential in a particular environment. Approximate ranges in flowing seawater at ambient temperature, from the widely reproduced data of F. L. LaQue and co-workers:
$$
\begin{array}{l c l}
\text{Material} & E_{\mathrm{corr}}\ [\mathrm{V\ vs\ SCE}] & \text{Note} \\
\text{Magnesium} & - 1.60\ \text{to}\ - 1.63 & \text{sacrificial anode for soil and fresh water} \\
\text{Zinc} & - 0.98\ \text{to}\ - 1.03 & \text{the classic sacrificial anode} \\
\text{Aluminium alloys} & - 0.76\ \text{to}\ - 1.00 & \text{copper-bearing alloys (2xxx) at the noble end} \\
\text{Cadmium} & - 0.70\ \text{to}\ - 0.73 & \text{the traditional fastener coating on steel} \\
\text{Mild steel, cast iron} & - 0.60\ \text{to}\ - 0.72 & \\
\text{Stainless 316, active (in a crevice)} & - 0.43\ \text{to}\ - 0.54 & \\
\text{Copper} & - 0.30\ \text{to}\ - 0.36 & \\
\text{Copper-nickel 90/10} & - 0.21\ \text{to}\ - 0.28 & \\
\text{Copper-nickel 70/30} & - 0.18\ \text{to}\ - 0.23 & \\
\text{Stainless 316, passive} & 0.00\ \text{to}\ - 0.10 & \text{a cathode to steel and aluminium} \\
\text{Titanium} & - 0.05\ \text{to}\ + 0.06 & \\
\text{Platinum} & + 0.19\ \text{to}\ + 0.25 & \\
\text{Graphite} & + 0.20\ \text{to}\ + 0.30 & \text{including graphite gaskets and carbon-fibre composites}
\end{array}
$$
(The saturated calomel electrode and the silver/silver-chloride electrode in seawater differ by only a few millivolts.)
**The four rules.** **The further apart, the larger the driving force** — but the damage also depends on how readily the cathode reduces oxygen, and passive cathodes such as titanium and stainless steel are often poorer cathodes than copper. **The area ratio** decides the penetration rate. **The conductivity** of the electrolyte decides the reach: in seawater a couple acts over large distances, in fresh water over short ones, and in humid air only close to the joint. **Polarity can reverse**: a metal that is active in one environment can be passive in another, and zinc, anodic to steel at room temperature, can become cathodic to it in some hot waters.
:::

::: definition Localised attack: pitting, crevice, intergranular and dealloying {#def-localised}
**Pitting** is the growth of an autocatalytic occluded cell. For stainless steels and nickel alloys the usual composition index is the **pitting resistance equivalent number**
$$
\mathrm{PREN} = \% \mathrm{Cr} + 3.3\, \% \mathrm{Mo} + 16\, \% \mathrm{N} ,
$$
evaluated here for typical compositions:
$$
\begin{array}{l l c}
\text{Alloy} & \text{Typical composition (wt\%)} & \mathrm{PREN} \\
\text{304} & 18\,\mathrm{Cr} & 18 \\
\text{316L} & 16.5\,\mathrm{Cr},\ 2.1\,\mathrm{Mo} & 23 \\
\text{2205 duplex} & 22\,\mathrm{Cr},\ 3.1\,\mathrm{Mo},\ 0.17\,\mathrm{N} & 35 \\
\text{2507 super-duplex} & 25\,\mathrm{Cr},\ 4\,\mathrm{Mo},\ 0.27\,\mathrm{N} & 43 \\
\text{6Mo super-austenitic (254 SMO)} & 20\,\mathrm{Cr},\ 6.1\,\mathrm{Mo},\ 0.2\,\mathrm{N} & 43 \\
\text{Alloy 625} & 21.5\,\mathrm{Cr},\ 9\,\mathrm{Mo} & 51 \\
\text{Alloy C-276} & 15.5\,\mathrm{Cr},\ 16\,\mathrm{Mo} & 68
\end{array}
$$
The ranking is borne out by the **critical pitting temperature** measured in standard tests such as ASTM G48, and seawater service commonly calls for a PREN of at least 40 (for example the 25Cr super-duplex and 6Mo grades).
**Crevice corrosion** is the same chemistry under a gap. It starts at lower potentials and lower temperatures than pitting on the open surface, so the **critical crevice temperature** of an alloy is below its critical pitting temperature. **Gaskets, threads, lap joints, washers, deposits and paint holidays are crevices.**
**Intergranular attack** follows grain-boundary precipitation and the depletion of an alloying element beside the boundary. The classic case is **sensitisation** of an austenitic stainless steel: between about $425$ and $815\ {}^{\circ}\mathrm{C}$ chromium carbide precipitates on the grain boundaries and leaves a narrow chromium-depleted zone, below about $12\ \%$ chromium, that is no longer stainless. The remedies are a **low-carbon L grade** (at most $0.03\ \%$ C), a **titanium- or niobium-stabilised** grade (321 or 347), or a **solution anneal** at about $1{,}050\ {}^{\circ}\mathrm{C}$ followed by rapid cooling. Analogous attack occurs in some aluminium alloys (grain-boundary $\beta$ phase in over-sensitised 5xxx alloys) and nickel alloys.
**Dealloying** is the selective leaching of one element. **Dezincification** of brasses with more than about $15\ \%$ zinc leaves a porous, weak copper residue that keeps the component's shape; the fixes are a **dezincification-resistant (DZR) brass** inhibited with a few hundredths of a per cent of arsenic, or a gunmetal or silicon-bronze fitting. **Graphitic corrosion** of grey cast iron leaves the graphite network and corrosion products in place, so a pipe looks sound but has little strength.
:::

::: definition Stress and environment: SCC, hydrogen and corrosion fatigue {#def-scc}
**Stress-corrosion cracking** needs three things at once — a susceptible material, a specific environment and a tensile stress — and removing any one prevents it. Classic pairings:
$$
\begin{array}{l l}
\text{Austenitic stainless} & \text{chloride, usually above about } 60\ {}^{\circ}\mathrm{C} \\
\text{Carbon and low-alloy steel} & \text{hot caustic (``caustic embrittlement'' of riveted boilers), nitrate,} \\
 & \text{carbonate-bicarbonate (high-pH pipeline SCC), anhydrous ammonia} \\
\text{Brass} & \text{ammonia — the ``season cracking'' of cold-drawn cartridge cases} \\
\text{High-strength aluminium alloys} & \text{chloride; 7xxx alloys are worst in the short-transverse direction} \\
\text{Titanium alloys} & \text{methanol containing halides; red fuming nitric acid} \\
\text{Nickel alloys (e.g. 600)} & \text{hot caustic; high-temperature water in nuclear plant}
\end{array}
$$
**The stress is often not the applied stress.** A cold-worked, welded or cold-bent component can carry residual stresses approaching its yield strength, so stress relief is a standard remedy, and **shot peening**, which puts the surface in compression, strongly suppresses crack initiation.
**Hydrogen damage** takes several distinct forms. **Hydrogen embrittlement** is the loss of ductility and toughness of a high-strength steel charged with atomic hydrogen (from pickling, electroplating, cathodic protection or corrosion); susceptibility rises steeply with strength and is serious above roughly $1{,}000$ to $1{,}200\ \mathrm{MPa}$ tensile strength, and in sour ($\mathrm{H_2 S}$) service carbon steels are limited to $22\ \mathrm{HRC}$ by NACE MR0175/ISO 15156. **Hydrogen blistering** occurs when atomic hydrogen diffuses to an inclusion or lamination in a plate and recombines to $\mathrm{H_2}$ gas at high pressure. **High-temperature hydrogen attack** is the reaction of hydrogen with carbides to form methane inside the steel, which decarburises and fissures it irreversibly; the **Nelson curves** (API 941) set the temperature and hydrogen partial pressure limits, and are why hydrogen-service reactors are built from Cr-Mo steels such as $2\tfrac{1}{4}\mathrm{Cr}\text{-}1\mathrm{Mo}$. **Hydride formation** embrittles titanium and zirconium, which is why titanium must not be pickled in acids that charge it with hydrogen.
**Corrosion fatigue** shortens fatigue life in a corrosive environment and — critically — **removes the endurance limit** of steels: the fatigue strength at $10^{8}$ cycles in seawater can be a small fraction of the endurance limit in air, so the design must be a finite-life design using S-N data measured in the environment.
:::

::: definition Mechanical-chemical and microbiological forms {#def-mechchem}
**Erosion-corrosion** is the removal of a protective film by a flowing fluid, and the design number is a **velocity limit**. Indicative maximum velocities in seawater piping:
$$
\begin{array}{l c}
\text{Material (seawater)} & \text{Indicative maximum velocity} \\
\text{Copper} & \approx 1\ \mathrm{m / s} \\
\text{Aluminium brass} & \approx 2.5\ \mathrm{m / s} \\
\text{Copper-nickel 90/10} & \approx 3.5\ \mathrm{m / s}\ \text{(larger pipes; less in small ones)} \\
\text{Copper-nickel 70/30} & \approx 4.5\ \mathrm{m / s} \\
\text{Super-duplex, 6Mo stainless, titanium} & \text{no practical limit in normal service}
\end{array}
$$
**Impingement attack** is its severe form at a disturbance — a condenser tube inlet, a bend, a valve seat — and is reduced by inlet inserts, smooth inlet profiles and avoiding weld protrusions inside the bore. **Cavitation** is damage by collapsing vapour bubbles, whose micro-jets and shock waves produce local pressures of hundreds of megapascals; it is reduced by harder, tougher surfaces and by keeping the available net positive suction head comfortably above the pump's requirement. **Fretting** is the wear and oxidation of tightly fitting surfaces under micrometre-scale oscillation, producing the red-brown oxide debris seen at keyed shafts and riveted laps; it is reduced by increasing the clamping or interference to stop the slip, by dry-film lubricants and by shot peening.
**Microbiologically influenced corrosion** (MIC) is corrosion initiated or accelerated by microorganisms. **Sulphate-reducing bacteria** under deposits and in soil convert $\mathrm{SO_4^{2 -}}$ to sulphide, and the sulphide and the iron sulphide film produce rapid local pitting of carbon steel in water that would otherwise be mild. A tell-tale is a **black iron-sulphide deposit** over a shiny pit; diagnosis needs analysis of the deposit itself (microbiological and chemical), not only of the bulk water.
:::

## Concrete, coatings and cathodic protection

::: definition Reinforced concrete {#def-concrete}
Concrete's pore solution is a calcium (and alkali) hydroxide solution at **pH 12.5 to 13.5**, in which the reinforcing steel is passive. Two processes destroy the passivity.
**Carbonation** is the diffusion of $\mathrm{CO_2}$ into the concrete and the reaction $\mathrm{Ca(OH)_2} + \mathrm{CO_2} \rightarrow \mathrm{CaCO_3} + \mathrm{H_2 O}$, which lowers the pore-solution pH to about 9 and depassivates the steel **once the carbonation front reaches it**. Because it is diffusion-controlled the front advances as $x = k \sqrt{t}$, with $k$ of a few $\mathrm{mm / yr^{1/2}}$ for good-quality concrete and more for porous concrete; the cover thickness therefore buys time in proportion to its square.
**Chloride ingress** — from seawater, de-icing salt or contaminated mix ingredients — depassivates the steel even at high pH once the chloride at the bar exceeds a threshold, often taken as a chloride-to-hydroxide ratio of about $0.6$ or roughly $0.4\ \%$ chloride by mass of cement. Chloride is not consumed by the corrosion, so once it is present it keeps acting.
**The damage is mechanical as well as chemical.** The corrosion products occupy two to six times the volume of the steel they replace, and the expansion cracks and spalls the cover. The design responses are **adequate cover** (typically $40$ to $75\ \mathrm{mm}$ depending on exposure), a **low water-to-cement ratio** (about 0.40 to 0.45 for chloride exposure), **blended cements** with slag, fly ash or silica fume that slow chloride diffusion, **corrosion-inhibiting admixtures** such as calcium nitrite, **epoxy-coated, galvanised or stainless** reinforcement in the most exposed members, and **cathodic protection** for structures already corroding.
:::

::: definition Coatings {#def-coatings}
A coating protects in up to four ways and a specification should say which: **barrier** (keep the electrolyte out), **sacrificial** (corrode instead of the steel), **inhibitive** (release an inhibitor), and **passivating** (hold the metal in its passive range).
$$
\begin{array}{l c l l}
\text{Coating} & \text{Typical thickness} & \text{Job} & \text{Remark} \\
\text{Hot-dip zinc} & 55\text{–}85\ \mu\mathrm{m} & \text{barrier + sacrificial} & \text{life} \approx \text{thickness / zinc rate for the site} \\
\text{Zinc-rich epoxy primer} & 50\text{–}100\ \mu\mathrm{m} & \text{sacrificial} & \text{needs a high zinc loading and a blast-cleaned surface} \\
\text{Zinc-flake} & 8\text{–}15\ \mu\mathrm{m} & \text{barrier + sacrificial} & \text{no hydrogen charging: used on high-strength fasteners} \\
\text{Epoxy} & 150\text{–}300\ \mu\mathrm{m} & \text{barrier} & \text{chalks in sunlight; needs a topcoat outdoors} \\
\text{Polyurethane} & 50\text{–}80\ \mu\mathrm{m} & \text{topcoat, gloss and colour} & \text{not a barrier on its own} \\
\text{Glass-flake epoxy} & 500\text{–}1{,}500\ \mu\mathrm{m} & \text{chemical and splash-zone lining} & \text{the flakes lengthen the diffusion path} \\
\text{Anodic oxide on Al} & 10\text{–}25\ \mu\mathrm{m} & \text{barrier + wear} & \text{sealed by hydrothermal hydration} \\
\text{Chromate conversion} & < 1\ \mu\mathrm{m} & \text{inhibitive + paint adhesion} & \text{contains Cr(VI); restricted under REACH} \\
\text{Trivalent chromium conversion} & < 1\ \mu\mathrm{m} & \text{paint adhesion, mild inhibition} & \text{the Cr(VI)-free replacement}
\end{array}
$$
**The three rules.** **Surface preparation is the largest single factor in coating life**: the specification must state the cleanliness grade (for example $\mathrm{Sa}\ 2\tfrac{1}{2}$ to ISO 8501-1) and the **surface profile**, typically $50$ to $75\ \mu\mathrm{m}$ for thick coatings, as well as the paint system. **A coating is an imperfect barrier**: water and oxygen permeate it, and electrochemical impedance measurements show its low-frequency impedance falling as it absorbs water, often long before it looks damaged. **A holiday is a defect through which the steel is bare**, which is why linings and pipeline coatings are **holiday-tested** — with a low-voltage wet sponge for thin films and a high-voltage spark tester (several kilovolts for pipeline coatings) for thick ones.
:::

::: definition Cathodic protection {#def-cp}
Cathodic protection supplies electrons to the structure so that its potential falls to where the corrosion rate is negligible. The common criteria for steel are:
$$
E \le - 0.85\ \mathrm{V\ vs\ Cu / CuSO_4}\ \left( - 0.80\ \mathrm{V\ vs\ Ag / AgCl\ in\ seawater} \right) \text{, polarised and IR-free;} \qquad
\Delta E \ge 100\ \mathrm{mV}\ \text{of polarisation shift;}
$$
with a more negative criterion, $- 0.95\ \mathrm{V}$ vs $\mathrm{Cu / CuSO_4}$, where **sulphate-reducing bacteria** are active, and a **negative limit** — typically about $-1.1$ to $-1.2\ \mathrm{V}$ vs $\mathrm{Cu / CuSO_4}$ polarised, and less negative for high-strength steels — beyond which hydrogen evolution disbonds coatings and risks hydrogen embrittlement.
**The current demand** is the design number, and it is dominated by the coating. Indicative values for steel in seawater:
$$
\begin{array}{l c}
\text{Condition (seawater)} & \text{Current density} \\
\text{Bare steel, initial polarisation} & 0.15\text{–}0.25\ \mathrm{A / m^{2}} \\
\text{Bare steel, mean over the design life} & 0.07\text{–}0.12\ \mathrm{A / m^{2}} \\
\text{Coated, } 1\ \%\ \text{of the area bare} & \approx 0.001\ \mathrm{A / m^{2}}
\end{array}
$$
**A $99\ \%$-coated structure needs about a hundredth of the current**, which is why a cathodic-protection design is also a coating specification.
**The anode materials**, with typical practical capacities (the annual consumption is $8{,}760\ \mathrm{h}$ divided by the capacity):
$$
\begin{array}{l c c l}
\text{Anode} & \text{Practical capacity} & \text{Consumption} & \text{Use} \\
\text{Zinc} & \approx 780\ \mathrm{Ah / kg} & 11.2\ \mathrm{kg / (A \cdot yr)} & \text{seawater; not above about } 50\ {}^{\circ}\mathrm{C} \\
\text{Aluminium-zinc-indium} & \approx 2{,}500\ \mathrm{Ah / kg} & 3.5\ \mathrm{kg / (A \cdot yr)} & \text{offshore structures} \\
\text{Magnesium} & \approx 1{,}100\ \mathrm{Ah / kg} & 8.0\ \mathrm{kg / (A \cdot yr)} & \text{soil and fresh water (high driving voltage)} \\
\text{Mixed metal oxide on titanium} & \text{nearly inert} & \text{very small} & \text{impressed current} \\
\text{High-silicon cast iron} & \text{slowly consumed} & \approx 0.1\text{–}0.5\ \mathrm{kg / (A \cdot yr)} & \text{impressed current in soil}
\end{array}
$$
**The two failure modes of a protection system.** **Under-protection** leaves parts of the structure corroding, often unnoticed because a reading of $- 0.75\ \mathrm{V}$ looks nearly right or because the measurement includes an IR drop. **Over-protection** generates hydrogen at the steel-coating interface, which **disbonds the coating**, and on high-strength steel it charges the metal with hydrogen.
:::

::: example The Faraday conversion in practice {#ex-faraday}
A steel plate is coated with $85\ \mu\mathrm{m}$ of hot-dip zinc. Estimate the coating life in a rural (ISO 9223 category C2) and in an industrial (C4) atmosphere, and the zinc corrosion current density that would consume the coating in five years.
::: solution
**The consumption rates.** Take zinc corrosion rates of $0.7\ \mu\mathrm{m / yr}$ (the upper end of C2) and $3\ \mu\mathrm{m / yr}$ (within the C4 band of $2.1$ to $4.2$), so
$$
t_{\mathrm{rural}} = \frac{85}{0.7} = 121\ \mathrm{yr}, \qquad
t_{\mathrm{ind}} = \frac{85}{3} = 28\ \mathrm{yr} .
$$
**The equivalent current.** For zinc $1\ \mu\mathrm{A / cm^{2}}$ is $15.0\ \mu\mathrm{m / yr}$, so a $3\ \mu\mathrm{m / yr}$ loss is
$$
i = 1\ \mu\mathrm{A / cm^{2}} \times \frac{3}{15.0} = 0.20\ \mu\mathrm{A / cm^{2}} = 2\ \mathrm{mA / m^{2}} .
$$
**Five years' life** would require $85 / 5 = 17\ \mu\mathrm{m / yr}$, or $17 / 15.0 = 1.1\ \mu\mathrm{A / cm^{2}}$ ($11\ \mathrm{mA / m^{2}}$) — a rate reached in a marine splash zone or where the zinc is coupled to a large area of bare steel.
**The galvanic protection of a scratch.** A scratch exposing $1\ \mathrm{mm}^{2}$ of steel is protected by the surrounding zinc. If the steel needs a cathodic current density of $1\ \mu\mathrm{A / cm^{2}}$ and the current is drawn from $1\ \mathrm{cm}^{2}$ ($100\ \mathrm{mm^{2}}$) of surrounding zinc, the zinc current density is $1 / 100 = 0.01\ \mu\mathrm{A / cm^{2}}$, an extra zinc loss of $0.01 \times 15.0 = 0.15\ \mu\mathrm{m / yr}$ — small beside the atmospheric rate, so the scratch costs the coating almost nothing.

*Check.* The ratio of the zinc and iron conversions is the ratio of $M / (n \rho)$: zinc $65.4 / (2 \times 7.14) = 4.58$ against iron $55.85 / (2 \times 7.87) = 3.55$, a factor of $1.29$, and $15.0 / 11.6 = 1.29$. $\checkmark$

*Sanity.* This is why a scratched galvanised bucket does not rust at the scratch, while scratched tin plate exposed to the weather rusts there: in air and water **tin is noble to steel**, so the exposed steel becomes the anode and the large tin-coated area the cathode. Zinc and zinc-alloy platings on fasteners protect sacrificially for the same reason.
:::
:::

::: example Galvanic couple: aluminium stringer to steel bracket {#ex-galv}
An aluminium 2024 stringer is bolted to a carbon-steel bracket with a steel bolt in a humid marine atmosphere. Give the driving force, the expected damage, and the design fix.
::: solution
**The driving force.** In a chloride-contaminated electrolyte aluminium alloys sit at about $-0.76$ to $-1.00\ \mathrm{V}$ and steel at about $-0.60$ to $-0.72\ \mathrm{V}$ (vs SCE), so the couple has a driving force of the order of $0.1$ to $0.3\ \mathrm{V}$ and the **aluminium is the anode**.
**The damage, and why the area ratio decides it.** Suppose the wetted steel is $100\ \mathrm{cm^{2}}$ and the aluminium exposed at the joint — a scratched or bare patch — is $1\ \mathrm{cm^{2}}$. If oxygen reduction on the steel supplies $0.1\ \mu\mathrm{A / cm^{2}}$, the current density on the aluminium is $100 \times 0.1 = 10\ \mu\mathrm{A / cm^{2}}$, and with $10.9\ \mu\mathrm{m / yr}$ per $\mu\mathrm{A / cm^{2}}$ for aluminium
$$
\dot{x} = 10.9\ \mu\mathrm{m / yr} \times 10 = 109\ \mu\mathrm{m / yr} ,
$$
so a $3\ \mathrm{mm}$ stringer wall would be penetrated in about $3{,}000 / 109 = 28$ years — and much sooner where the joint stays wet or the cathodic current density is higher.
**The design fix, in order of preference.**
1. **Insulate.** Non-conducting washers and a full-length sleeve at the bolt (a head washer alone leaves the shank as a short circuit), a sealant around the joint, and primer on both faying surfaces.
2. **Keep the anode large and the cathode small.** A small steel fastener in a large aluminium member is tolerable; a small aluminium part on a large steel member is not.
3. **Coat the cathode, not only the anode.** A coating on the steel reduces the cathode area and therefore the current; a coated anode against a bare cathode concentrates all the current at the first holiday in the anode's coating — the **worst** configuration.
4. **Change one material.** A stainless bolt is no improvement, since it is still more noble than aluminium; a **zinc-, cadmium- or zinc-nickel-plated** steel bolt is closer in potential and its plating is sacrificial.
5. **Drain.** A joint that holds water corrodes; weep holes and slopes cost nothing.

*Check.* Units: $(\mu\mathrm{A / cm^{2}}) \times (\mu\mathrm{m / yr}$ per $\mu\mathrm{A / cm^{2}}) = \mu\mathrm{m / yr}$, and $3\ \mathrm{mm} / 0.109\ \mathrm{mm / yr} = 28\ \mathrm{yr}$. The couple settles at a mixed potential between the two metals; when oxygen reduction is diffusion-limited the cathode polarises strongly and the mixed potential lies close to the aluminium's. $\checkmark$

*Sanity.* The rule that follows is the one airframe and marine design manuals state: **never coat the anode and leave the cathode bare**. Aluminium boat hulls are painted and fitted with sacrificial anodes (zinc or aluminium alloy) for the same reason: the anodes, not the hull, become the anodic area.
:::
:::

::: example Cathodic protection of a pipeline {#ex-cp}
A $50\ \mathrm{km}$ length of $900\ \mathrm{mm}$ diameter buried steel pipeline (wall $12\ \mathrm{mm}$), coated with fusion-bonded epoxy and designed for $1\ \%$ of its surface bare, is to be protected by impressed current. Estimate the current, the number of rectifier stations, and choose the anodes.
::: solution
**The area and the current.** The surface is $\pi \times 0.9 \times 50{,}000 = 1.41 \times 10^{5}\ \mathrm{m^{2}}$. Taking a protective current density of $10\ \mathrm{mA / m^{2}}$ for bare steel in aerated soil, applied to the $1\ \%$ bare area,
$$
I = 1.41 \times 10^{5} \times 0.01 \times 0.010\ \mathrm{A} = 14\ \mathrm{A} ,
$$
an average of $0.1\ \mathrm{mA / m^{2}}$ over the whole surface.
**The rectifier stations.** The protection decays with distance from a drain point because current flows along the pipe wall (resistance per unit length $r$) and leaks out through the coating (conductance per unit length $g$). The attenuation length is
$$
\lambda = \frac{1}{\sqrt{r g}} , \qquad r = \frac{\rho_{\mathrm{steel}}}{\pi D w}, \quad g = \frac{\pi D}{R_{\mathrm{c}}} ,
$$
where $w$ is the wall thickness and $R_c$ the specific coating resistance. An average current density of $0.1\ \mathrm{mA / m^{2}}$ at a polarisation of about $0.3\ \mathrm{V}$ corresponds to $R_c = 0.3 / 10^{-4} = 3{,}000\ \Omega\,\mathrm{m^{2}}$. With $\rho_{\mathrm{steel}} = 2 \times 10^{-7}\ \Omega\,\mathrm{m}$:
$$
r = \frac{2 \times 10^{-7}}{\pi \times 0.9 \times 0.012} = 5.9 \times 10^{-6}\ \Omega / \mathrm{m}, \qquad
g = \frac{\pi \times 0.9}{3{,}000} = 9.4 \times 10^{-4}\ \mathrm{S / m}, \qquad
\lambda = 13\ \mathrm{km} .
$$
A station can therefore protect roughly one attenuation length on each side, so **two stations**, at about $12.5$ and $37.5\ \mathrm{km}$, each supplying about $7\ \mathrm{A}$, are a reasonable first layout; a design would add margin for coating deterioration over the life.
**The anodes.** Impressed-current anodes of **mixed metal oxide on titanium** or **high-silicon cast iron** in a carbonaceous (coke-breeze) backfill, in a groundbed at each station sized for the station current with margin, a low resistance to earth and the design life.
**The three design traps.** **Stray-current interference**: current from a nearby DC railway or another protected structure can be picked up by the pipeline and discharged elsewhere, where it corrodes the steel rapidly; the remedies are interference surveys and drainage bonds. **Shielding**: rock, concrete weight coatings, disbonded tape or casings at road crossings shield the steel from the protective current, so the test post can read well while the steel beneath the shield corrodes; close-interval potential surveys (CIPS) and direct-current voltage gradient (DCVG) surveys find such places. **Over-protection near the drain point**: the potential close to the groundbed is the most negative on the line and can disbond the coating; potentials are judged by **IR-free** ("instant-off") measurements with the rectifiers interrupted.

*Check.* $14\ \mathrm{A}$ over $1.41 \times 10^{5}\ \mathrm{m^{2}}$ is $0.1\ \mathrm{mA / m^{2}}$, which is $1\ \%$ of $10\ \mathrm{mA / m^{2}}$ — consistent. Units of $\lambda$: $(\Omega\,\mathrm{m^{-1}} \cdot \mathrm{S\, m^{-1}})^{-1/2} = \mathrm{m}$. $\checkmark$

*Sanity.* The $1\ \%$ bare allowance is the whole design: an uncoated line would need $1.41 \times 10^{5} \times 0.010 = 1.4\ \mathrm{kA}$, a hundred times more. That is why pipeline coatings are holiday-tested and repaired during construction, and why the corrosion budget of a pipeline is mostly a coating budget.
:::
:::

::: example Design: a seawater cooling system {#ex-design-cor}
Select materials and corrosion control for a seawater-cooled heat exchanger and its $200\ \mathrm{m}$ of pipework, at about $3\ \mathrm{m / s}$ design velocity and a twenty-year life with no chemical treatment.
::: solution
**The environment.** Filtered seawater at up to $25\ {}^{\circ}\mathrm{C}$, about $3.5\ \%$ dissolved salts, aerated, flowing at $3\ \mathrm{m / s}$ in normal service and stagnant during shutdowns, with metal temperatures in the exchanger above the water temperature.
**The material selection, item by item.**
$$
\begin{array}{l l l}
\text{Item} & \text{Material} & \text{Why} \\
\text{Seawater pipework} & \text{CuNi 90/10, or super-duplex} & 3\ \mathrm{m / s} \text{ is within the CuNi window for large pipes; super-duplex has margin} \\
\text{Tube plate and shell} & \text{CuNi or super-duplex, or lined carbon steel} & \text{the largest wetted area; cost drives the choice} \\
\text{Tubes} & \text{CuNi 90/10, or titanium at higher velocity} & \text{fouling resistance and erosion tolerance} \\
\text{Water box} & \text{rubber-lined carbon steel or super-duplex} & \text{impingement at the inlet} \\
\text{Bolts} & \text{super-duplex or alloy 625} & \text{316 suffers crevice attack under washers} \\
\text{Gaskets} & \text{non-graphite (e.g. PTFE-based)} & \text{a graphite gasket is a large cathode} \\
\text{Pump casing and impeller} & \text{duplex (e.g. CD4MCuN) or super-duplex} & \text{cavitation, erosion and chloride} \\
\text{Valve trim} & \text{hard-faced (Stellite 6) on a duplex body} & \text{galling and erosion at the seat}
\end{array}
$$
**The five design rules that decide the outcome.**
1. **Velocity.** Keep CuNi within its window; check the velocity when tubes are plugged or blocked, because the flow redistributes and the remaining tubes run faster.
2. **No crevices.** Tube-to-tubesheet joints, gaskets and threads are crevices; choose crevice-resistant alloys there and avoid O-rings where seawater can stagnate.
3. **No unmanaged galvanic pairs.** A copper-nickel tube bundle in a carbon-steel tube plate makes the tube plate the anode of a large cathode; use a compatible tube plate, insulate, or protect the water box cathodically.
4. **No stagnation.** A shutdown with a full, static, warm pipe is the most damaging condition the plant sees; provide drains at every low point and drain and flush with fresh water for longer shutdowns.
5. **Cathodic protection of the water boxes.** Sacrificial anodes (iron, zinc or aluminium alloy) in each water box protect the tube plate and the box; the copper-nickel tubes should not be strongly protected, because the copper ions released by free corrosion are what keep the tubes fouling-resistant.
**The monitoring.** Coupon racks, electrical-resistance and linear-polarisation probes, and periodic tube pulls with metallographic examination of the tube-to-tubesheet region.

*Design comment.* Seawater systems usually fail not because of a wrong alloy but because of a **design detail** — a dead leg, a crevice, a graphite gasket, a blocked tube, a stagnant shutdown, a galvanic pair. Velocity and stagnation deserve as much attention as alloy selection.
:::
:::

::: example Design: a carbon capture solvent loop {#ex-design-co2}
Select the materials for an amine-based $\mathrm{CO_2}$ capture plant's absorber, regenerator and the interconnecting loop at up to $120\ {}^{\circ}\mathrm{C}$.
::: solution
**The environment, and why it is worse than it looks.** An aqueous monoethanolamine solution (about $30\ \%$ by mass) at about $40\ {}^{\circ}\mathrm{C}$ in the absorber and up to about $120\ {}^{\circ}\mathrm{C}$ in the regenerator and reboiler, loaded with $\mathrm{CO_2}$, and accumulating **heat-stable salts** — formate, acetate, oxalate, thiosulphate and others — from oxidative and thermal degradation of the amine, plus **oxygen** from the flue gas and **chloride** and **sulphate** from make-up water and flue-gas carry-over. The degradation products drive much of the corrosion, so solvent management is as important as material selection.
**The material selection.**
$$
\begin{array}{l l l}
\text{Item} & \text{Material} & \text{Comment} \\
\text{Absorber shell} & \text{carbon steel with allowance, or stainless} & \text{lean, cool solvent; mild conditions} \\
\text{Rich-solvent lines, rich/lean exchanger} & \text{stainless (304L/316L)} & \text{hot, CO}_2\text{-rich solvent attacks carbon steel} \\
\text{Regenerator and reboiler} & \text{316L, or duplex where chloride is high} & \text{hottest, most aggressive zone} \\
\text{Reclaimer} & \text{high-alloy (e.g. alloy C-276) or lined} & \text{concentrated degradation products} \\
\text{Bolting} & \text{stainless (e.g. B8M)} & \text{resists external and leak corrosion}
\end{array}
$$
**The three failure modes.** **Erosion-corrosion** at bends, valves, pumps and flashing points in rich-solvent lines, controlled by velocity limits and stainless steel. **Chloride stress-corrosion cracking** of austenitic stainless where the temperature exceeds about $60\ {}^{\circ}\mathrm{C}$ and chloride concentrates; controlled by limiting chloride in the solvent and by duplex steels in the worst places. **Amine stress-corrosion cracking** of carbon steel welds, controlled by post-weld heat treatment as in API 945 practice.
**The corrosion control.** A **reclaimer** that removes heat-stable salts and keeps them below a set limit, filtration, a **chloride limit** on make-up water, **velocity limits**, and corrosion monitoring (coupons and probes, plus regular solvent analysis for heat-stable salts, dissolved iron and chloride — a rising iron content is an early sign of active corrosion).

*Design comment.* In a closed solvent loop the corrosion specification must include **solvent-quality and water-quality limits**, not only materials: the same plant that runs well with its reclaimer in service can corrode quickly when degradation products are allowed to accumulate.
:::
:::

::: history
**Humphry Davy** in 1824 proposed protecting the copper sheathing of Royal Navy ships by attaching zinc or iron — the first deliberate cathodic protection — but the protected copper fouled, because the copper ions that poison marine growth were no longer released, and the method was abandoned. **Christian Friedrich Schönbein** and **Michael Faraday** studied the **passivity** of iron in concentrated nitric acid in the 1830s. **Julius Tafel** published the logarithmic relation between overpotential and current in 1905, and **N. B. Pilling** and **R. E. Bedworth** their oxide-volume ratio in 1923. **Ulick R. Evans** at Cambridge demonstrated the electrochemical nature of aqueous corrosion and differential aeration with drop experiments in the 1920s. **Robert J. Kuhn** proposed the $-0.85\ \mathrm{V}$ (vs $\mathrm{Cu/CuSO_4}$) protection criterion in 1933 from his work on cast-iron water mains in New Orleans. **Carl Wagner** and **W. Traud** formulated the mixed-potential theory in 1938, and **Milton Stern** and **A. L. Geary** the polarisation-resistance method in 1957. **Marcel Pourbaix** developed potential-pH diagrams and collected them in his *Atlas of Electrochemical Equilibria in Aqueous Solutions* (French 1963, English 1966). **Frank L. LaQue** of International Nickel set up long-term marine test sites at Kure Beach and Wrightsville Beach, North Carolina, whose seawater data underpin galvanic series and marine materials selection, and summarised them in *Marine Corrosion: Causes and Prevention* (1975). **Mars G. Fontana** and **Norbert D. Greene**'s *Corrosion Engineering* (1967) organised the subject into the forms of corrosion used in this lesson.
:::

## Where this leads

The passivity that saves a stainless steel is the oxide chemistry of [[materials-science/bonding-structure]] and the alloying of [[materials-science/material-families]], the stress-corrosion and hydrogen thresholds are the fracture mechanics of [[materials-science/failure]], the sensitisation of a weld is the precipitation of [[materials-science/phase-transformations]], and the corrosion allowance and the coating life are the economics of [[materials-science/materials-selection]].

::: summary
- Corrosion is thermodynamically favoured; the Pourbaix diagram says what is possible, never how fast.
- Passivity requires a thin, adherent, poorly soluble, poorly conducting oxide; $\mathrm{Cr_2 O_3}$, $\mathrm{Al_2 O_3}$, $\mathrm{SiO_2}$ and $\mathrm{TiO_2}$ are the films that make alloys corrosion-resistant, and the Pilling-Bedworth ratio is only a first guide.
- The rate is a Faraday conversion: $1\ \mu\mathrm{A / cm^{2}}$ is $11.6\ \mu\mathrm{m / yr}$ on iron, and passive alloys pass about $10^{-5}$ to $10^{-3}\ \mathrm{A / m^{2}}$.
- Much aqueous corrosion is cathodically controlled, so the area ratio and the oxygen supply set the damage, not the potential difference alone.
- Localised attack — pit, crevice, grain boundary, dealloying — is where the failures are, and a crevice is always worse than the open surface.
- Stress-corrosion cracking needs material, environment and stress together, and the stress is often residual.
- A coating's life is set by its surface preparation and its holidays.
- Cathodic protection is also a coating specification: a $99\ \%$-coated structure needs about a hundredth of the current.
- Many corrosion failures are design failures — a crevice, a dead leg, a graphite gasket, a coated anode — and are cheapest to design out.
:::

::: quiz
A stainless steel pipe is found perforated under a bolted clamp, the rest of the surface untouched. What is the mechanism?
- [x] Crevice corrosion: oxygen depletion under the clamp made the gap anodic and acid
- [ ] General thinning from chloride attack
- [ ] Erosion-corrosion at the clamp
- [ ] Microbiologically-influenced corrosion
::: solution
The first option. Under the clamp the dissolved oxygen is consumed and cannot diffuse back in, so the gap becomes the anode of a differential-aeration cell; the metal ions formed there hydrolyse and acidify the solution, chloride migrates in, and the acidic chloride solution keeps the gap active while the large, still-passive external surface carries the cathodic reaction. General thinning would have attacked the whole surface; the untouched surface outside the clamp is the diagnostic.
:::
:::

## Exercises

::: exercise Faraday {level=1 check="11.6"}
A corrosion current density of $1\ \mu\mathrm{A / cm^{2}}$ on iron corresponds to what penetration rate? (Enter the rate in $\mu\mathrm{m / yr}$ to one decimal place.)
::: solution
$\dot x = iM / (nF\rho) = 10^{-2} \times 0.05585 / (2 \times 96{,}485 \times 7{,}870) = 3.68 \times 10^{-13}\ \mathrm{m/s} = 11.6\ \mu\mathrm{m / yr}$.
:::
:::

::: exercise Passivity {level=1 check="1.29"}
Compute the Pilling-Bedworth ratio of $\mathrm{Al_2 O_3}$ on aluminium, taking $M = 101.96\ \mathrm{g/mol}$ and $\rho = 3.95\ \mathrm{g/cm^3}$ for the oxide and $M = 26.98\ \mathrm{g/mol}$ and $\rho = 2.70\ \mathrm{g/cm^3}$ for the metal. (Enter the ratio to two decimal places.)
::: solution
$$
R_{\mathrm{PB}} = \frac{101.96 / 3.95}{2 \times 26.98 / 2.70} = \frac{25.81}{19.99} = 1.29 ,
$$
slightly expansive — a coherent, adherent film.
:::
:::

::: exercise Tafel {level=1 check="118"}
Give the Tafel slope $2.303 RT / (\alpha n F)$ for a one-electron reaction with a transfer coefficient of $0.5$ at $25\ {}^{\circ}\mathrm{C}$. (Enter the slope in mV per decade, to the nearest whole number.)
::: solution
$2.303 \times 8.314 \times 298.15 / (0.5 \times 96{,}485) = 0.118\ \mathrm{V}$, i.e. $118\ \mathrm{mV}$ per decade.
:::
:::

::: exercise Stainless {level=1 check="60"}
Above roughly what temperature does chloride stress-corrosion cracking of austenitic stainless steel become a design concern? (Enter the temperature in °C.)
::: solution
About $60\ {}^{\circ}\mathrm{C}$ — a widely used rule of thumb; cracking below it is possible where chloride concentrates and stresses are high.
:::
:::

::: exercise Anodes {level=1 check="140"}
An aluminium-zinc-indium anode with a practical capacity of $2{,}500\ \mathrm{Ah / kg}$ must deliver a mean current of $2\ \mathrm{A}$ for $20$ years. What mass of anode material is consumed? (Enter the mass in kg, to the nearest whole number.)
::: solution
Charge $= 2 \times 20 \times 8{,}760 = 350{,}400\ \mathrm{Ah}$, so $m = 350{,}400 / 2{,}500 = 140\ \mathrm{kg}$. A zinc anode at $780\ \mathrm{Ah / kg}$ would need $449\ \mathrm{kg}$, about $3.2$ times as much — the reason offshore structures use aluminium anodes. A real design adds a utilisation factor, because an anode cannot be consumed completely.
:::
:::

::: exercise Coating life {level=2 check="12"}
A zinc coating survives 120 years in a rural atmosphere where zinc corrodes at $0.7\ \mu\mathrm{m / yr}$. What is its thickness, and what is its life in a very aggressive (C5) atmosphere where zinc corrodes at $7\ \mu\mathrm{m / yr}$? (Enter the C5 life in years.)
::: solution
Thickness $= 0.7 \times 120 = 84\ \mu\mathrm{m}$, a typical hot-dip thickness. In C5 the life is $84 / 7 = 12\ \mathrm{yr}$.
*Sanity.* The life is inversely proportional to the site's zinc corrosion rate, which depends mainly on sulphur dioxide and chloride deposition and on time of wetness. That is why ISO 9223 corrosivity categories classify the **site**, and why the same galvanised structure can last a century inland and need maintenance within a decade or two on an industrial coast.
:::
:::

::: exercise Galvanic {level=2}
A $2\ \mathrm{cm^{2}}$ patch of bare steel is riveted to a $2\ \mathrm{m^{2}}$ aluminium-alloy panel in marine service. With a galvanic current density on the aluminium of $0.05\ \mu\mathrm{A / cm^{2}}$, give the penetration rate of the aluminium. Then estimate the current density on the aluminium if the areas were reversed, taking an oxygen-limited cathodic current density of $10\ \mu\mathrm{A / cm^{2}}$ on the steel.
::: solution
Here the steel is the **cathode** ($A_c = 2\ \mathrm{cm^{2}}$) and the aluminium panel the **anode** ($A_a = 20{,}000\ \mathrm{cm^{2}}$), so $A_c / A_a = 10^{-4}$: the small cathode's current is spread over a huge anode.
$$
i_{\mathrm{Al}} = 0.05\ \mu\mathrm{A / cm^{2}} \ \Rightarrow\ \dot{x} = 10.9 \times 0.05 = 0.54\ \mu\mathrm{m / yr} .
$$
**Reversed** — a $2\ \mathrm{m^{2}}$ steel plate with a $2\ \mathrm{cm^{2}}$ aluminium patch — the total cathodic current is $10 \times 20{,}000 = 2 \times 10^{5}\ \mu\mathrm{A} = 0.2\ \mathrm{A}$, and concentrated on $2\ \mathrm{cm^{2}}$ it gives
$$
i_{\mathrm{Al}} = \frac{2 \times 10^{5}}{2} = 10^{5}\ \mu\mathrm{A / cm^{2}} \ \Rightarrow\ \dot{x} \approx 10.9 \times 10^{5}\ \mu\mathrm{m / yr} \approx 1\ \mathrm{m / yr} .
$$
In practice the patch polarises and the cathode does not reach its limit everywhere, so the real current is lower, but the patch is still consumed within weeks to months.
*Sanity.* The **large-anode, small-cathode** arrangement is safe and gives about half a micrometre a year; the reverse concentrates the whole cathode's current onto a tiny anode. The example is the area rule in two lines.
:::
:::

::: exercise Concrete {level=2 check="160"}
Carbonation has reached a depth of $10\ \mathrm{mm}$ after $10$ years in a structure with $40\ \mathrm{mm}$ cover. Assuming $x = k \sqrt{t}$, when will the front reach the reinforcement? (Enter the age in years.)
::: solution
$k = 10 / \sqrt{10} = 3.16\ \mathrm{mm / yr^{1/2}}$, and the $40\ \mathrm{mm}$ cover is reached at $t = \left( 40 / 3.16 \right)^{2} = 160\ \mathrm{yr}$.
*Sanity.* Quadrupling the cover multiplies the time sixteen-fold, so cover is the cheapest durability measure against carbonation. Yet bridge decks treated with de-icing salt can corrode within a few decades, because **chloride**, not carbonation, depassivates the steel there; the carbonation calculation checks one mechanism, and the chloride-ingress calculation is usually the one that governs exposed structures.
:::
:::

::: exercise Derivation {level=3}
Derive the Faraday penetration-rate conversion from first principles and evaluate it for iron, zinc and aluminium. Then derive the area-ratio rule for a galvanic couple and state when it holds.
::: solution
**The conversion.** A current $i$ (A/m²) over an area $A$ dissolves metal at
$$
\frac{\mathrm{d} N}{\mathrm{d} t} = \frac{i A}{n F}\ \mathrm{mol/s} \quad \Rightarrow \quad \frac{\mathrm{d} m}{\mathrm{d} t} = \frac{i A M}{n F} .
$$
The penetration rate is the volume lost per unit area per unit time:
$$
\dot{x} = \frac{1}{\rho A} \frac{\mathrm{d} m}{\mathrm{d} t} = \frac{i M}{n F \rho} \quad \left[ \mathrm{m / s} \right] \text{ for } i \text{ in } \mathrm{A / m^{2}} .
$$
For iron with $i = 10^{- 2}\ \mathrm{A / m^{2}}$ ($1\ \mu\mathrm{A / cm^{2}}$), $M = 0.05585\ \mathrm{kg / mol}$, $n = 2$, $\rho = 7{,}870\ \mathrm{kg / m^{3}}$:
$$
\dot{x} = \frac{10^{- 2} \times 0.05585}{2 \times 96{,}485 \times 7{,}870} = 3.68 \times 10^{- 13}\ \mathrm{m / s}
= 11.6\ \mu\mathrm{m / yr} . \quad \checkmark
$$
For zinc, $M / (n \rho) = 0.06538 / (2 \times 7{,}140) = 4.58 \times 10^{- 6}\ \mathrm{m^{3}/mol}$ against iron's $3.55 \times 10^{- 6}$, giving $15.0\ \mu\mathrm{m / yr}$; for aluminium, $0.02698 / (3 \times 2{,}700) = 3.33 \times 10^{- 6}$, giving $10.9\ \mu\mathrm{m / yr}$.
**The area rule.** A galvanic couple carries one current $I$ through two areas. If the cathodic reaction is oxygen reduction at its diffusion limit, $I \approx j_{\mathrm{O_2}} A_c$, where $j_{\mathrm{O_2}}$ is the limiting current density — of the order of $0.1\ \mathrm{A / m^{2}}$ ($10\ \mu\mathrm{A / cm^{2}}$) in still, aerated seawater. If the anode carries all of it, the anode's penetration rate is
$$
\boxed{ \dot{x}_a = \frac{j_{\mathrm{O_2}} M}{n F \rho} \times \frac{A_c}{A_a} } .
$$
**When it holds.** The result does not contain the potential difference: provided the couple is driven hard enough for the cathode to reach its diffusion limit, the damage is set by the oxygen supply and the area ratio. It fails when the cathode reduces oxygen sluggishly — passive titanium and stainless steel are poorer cathodes than copper — or when the potential difference is too small to polarise the cathode to its limit; then the potential difference and the electrode kinetics matter, and the rule gives an upper bound.
*Sanity.* With $j_{\mathrm{O_2}} = 10\ \mu\mathrm{A / cm^{2}}$ and $A_c / A_a = 1$, iron would corrode at $116\ \mu\mathrm{m / yr}$ — the order of magnitude observed for bare steel in seawater, which is a check that the limiting-current picture is right.
:::
:::

::: exercise Design {level=3}
Select the materials and the corrosion control for a lithium-ion battery pack's coolant plate and its loop, and justify against the alternatives.
::: solution
**The environment, and the requirements that conflict.** A water-glycol coolant (typically about $50\ \%$ ethylene glycol) at roughly $- 30$ to $60\ {}^{\circ}\mathrm{C}$ with an organic-acid (OAT) inhibitor package, in contact with the aluminium of the cooling plates; the loop must last the vehicle's life with little maintenance, and because the coolant is electrically conductive and runs close to a high-voltage battery, its conductivity and any leakage path matter for electrical safety.
**The candidates and their elimination.**
$$
\begin{array}{l l}
\text{Copper or brass plate} & \text{good thermally, but dissolved copper plates out on aluminium elsewhere in the loop and pits it} \\
\text{Carbon steel} & \text{relies wholly on the inhibitor; heavy; rejected} \\
\text{Stainless steel} & \text{resistant, but heavy, and a cathode to the aluminium parts it touches} \\
\text{Brazed aluminium (3xxx core, Al-Si clad)} & \text{light, cheap, mass-produced; compatible with modern coolants} \\
\text{Polymer (e.g. glass-filled PA or PPS)} & \text{no corrosion, but poor thermal conductivity; used for manifolds and under development for plates} \\
\text{Titanium} & \text{immune, but many times the cost}
\end{array}
$$
**Choice: a brazed aluminium plate** — a 3xxx-series core with Al-Si braze cladding, with a sacrificial zinc-enriched layer or core design on the coolant side so that any pitting spreads laterally instead of perforating — with an aluminium-compatible OAT coolant and **no copper or brass anywhere in the loop**.
**The four design problems.** **Galvanic contact**: keep dissimilar metals out of the wetted loop, and isolate aluminium plates from steel or copper components with thermally conductive, electrically insulating interfaces. **Erosion-corrosion and cavitation**: limit velocities at inlets and manifolds, round inlet edges, and give the pump adequate suction pressure. **Inhibitor depletion**: OAT inhibitors protect aluminium by adsorbing on it and are slowly consumed; specify the coolant and its service-life checks. **Electrical safety**: specify a coolant of controlled, low conductivity and verify insulation resistance between the high-voltage system and the cooling circuit in production.

*Design comment.* A corrosion specification written for a chemical plant is the wrong one for a battery: the constraints are a long, maintenance-free life, compatibility of every wetted metal with aluminium, and electrical isolation, so the answer is chosen as a system — plate alloy, braze, coolant chemistry and loop materials together — rather than as a single alloy.
:::
:::
