A joint is where a structure stops being a component and starts being an assembly, and it is very often where the structure fails. The parent plate of a welded bridge is a fairly homogeneous, ductile, inspectable material whose strength can be calculated closely; the weld next to it is a small casting with a heat-affected zone, residual stresses, a geometric notch at its toe and possibly defects, and its strength — above all its fatigue strength — is known only through codes built on tests. Joint design follows from that asymmetry. Joint *selection* follows from a second fact: a joint adds cost, distortion and inspection but no function of its own. It exists because the part could not be made in one piece.

So the engineer's questions about a joint come in a definite order. **First: does this joint have to exist?** Could the part be cast, forged, extruded, bent from one blank or hydroformed instead? **Second: if it must exist, which family suits it** — a fusion weld, a solid-state weld, a braze or solder, an adhesive bond, or a mechanical fastener that can be undone? **Third: where should it go?** Away from the highest stress range, in a geometry the process can reach, in a material the process can tolerate. **Fourth: how will it be made and inspected?** A joint whose quality cannot be checked has whatever strength the process happened to deliver.

::: warning Nine ways joints go wrong
**Designing a welded joint for fatigue as if it were parent plate.** A fillet weld sized on static strength can fail in a few hundred thousand cycles, because the fatigue strength of a welded detail is set by its geometry (the detail category), not by the grade of steel. **Ignoring residual stress.** A fusion weld cools under restraint and ends up with tensile residual stress of the order of the yield stress; it can be redistributed (peening, post-weld heat treatment) but not avoided by care at the torch. **Drawing a weld that cannot be made.** A fillet inside a closed box, a root the torch cannot reach, a position that can only be welded overhead: the result is lack of fusion. Ask the fabricator at the design stage. **Welding a heat-treated alloy and assuming it keeps its temper.** A 6082-T6 aluminium frame has heat-affected zones with roughly half the parent yield strength; design to the welded properties or heat-treat after welding (and allow for the distortion). **Loading rolled plate through its thickness.** Plate with elongated inclusions is weak through the thickness and can suffer **lamellar tearing** under a weld that pulls normal to the plate surface; specify through-thickness ("Z-quality") plate or change the detail. **Assuming the weld metal equals the parent metal.** Weld metal is a mixture of filler and melted parent (dilution), with a cast structure and a toughness that depends on heat input and interpass temperature. **Not specifying inspection.** A weld without an acceptance standard (for example EN ISO 5817 quality level B, C or D, or AWS D1.1) and a stated method and extent of testing is unspecified. **Bolting onto faces that are not flat and square.** The bolt is bent, and its fatigue life falls sharply; a spotface or hardened washer is cheap. **Loading an adhesive joint in peel.** Structural adhesives are strong in shear and weak in peel and cleavage; if the adhesive cannot be put in shear, choose another joint.
:::

## 1. The weld is a casting, and next to it is a heat-affected zone

::: definition Fusion welding, the thermal cycle, and the three zones {#def-fus}
Every fusion process does the same thing: it puts enough heat into a small volume to melt it, protects the molten pool from the air, and lets it solidify. The heat delivered to the work per unit length of weld is the **net heat input**

$$
E \;=\; \eta\,\frac{V I}{v} \quad [\mathrm{J/mm}]
$$

with $V$ the arc voltage, $I$ the current, $v$ the travel speed and $\eta$ the **thermal efficiency**. EN 1011-1 uses $\eta = 1.0$ for submerged arc, $0.8$ for manual metal arc (stick) and gas metal arc, and $0.6$ for gas tungsten arc; for beam processes the fraction of beam power absorbed depends strongly on the mode (much higher when a keyhole forms than in conduction welding). $E$ is the main procedure variable controlling the weld's cooling rate, microstructure and distortion.

As a heat source passes, each point of the metal goes through a **thermal cycle**: rapid heating to a peak temperature that falls with distance from the weld, then cooling. For steel the important part is the cooling through the range in which austenite transforms, measured by the **cooling time from 800 to 500 °C**, $t_{8/5}$. It ranges from below a second in laser welds of thin sheet to tens of seconds in high-heat-input submerged-arc welds, and it decides whether the weld and heat-affected zone (HAZ) of a given steel form tough ferrite–bainite structures or hard martensite.

The metal near the weld divides into zones, each with its own behaviour:

$$
\begin{array}{l l l l}
\textbf{Zone} & \textbf{Peak temperature} & \textbf{What happens} & \textbf{Result after cooling} \\ \hline
\text{Weld metal} & \text{above the liquidus} & \text{melts and solidifies} & \text{columnar cast structure, diluted filler} \\
\text{Coarse-grain HAZ} & \approx 1100\ ^\circ\mathrm{C} \text{ to solidus} & \text{austenite grains grow} & \text{often the lowest toughness} \\
\text{Fine-grain HAZ} & A_{c3} \text{ to } \approx 1100\ ^\circ\mathrm{C} & \text{re-austenitised, fine grains} & \text{usually good properties} \\
\text{Intercritical HAZ} & A_{c1} \text{ to } A_{c3} & \text{partial transformation} & \text{mixed structure, can be brittle} \\
\text{Subcritical HAZ} & \text{below } A_{c1} & \text{tempering; overageing in alloys} & \text{softened in age-hardened alloys}
\end{array}
$$

**Dilution** describes the fact that the weld metal is part filler and part melted parent. With dilution $D$ (the fraction of the weld metal that came from the parent — low for a cladding layer, higher for an autogenous or deep-penetration pass), a rule of mixtures gives the weld composition:

$$
C_{\text{weld}} \;=\; (1 - D)\, C_{\text{filler}} + D\, C_{\text{parent}}
$$

Close to the fusion line there is a narrow band in which the composition changes from parent to weld metal; this is where dissimilar-metal welds often have problems, for example martensite when stainless filler is diluted by carbon steel.

The weld metal **solidifies epitaxially** from the partly melted grains at the fusion boundary and grows as columnar grains towards the centre of the pool. Its properties are therefore anisotropic and differ from the parent's, which is why welding procedures are qualified by testing — tensile, bend and Charpy tests at a stated temperature — rather than assumed equal to the base metal.
:::

::: proof How fast does a weld cool? {#proof-haz}
Rosenthal's solution (1940s) treats the arc as a point heat source moving at constant speed $v$ over a thick plate, with constant properties (conductivity $\lambda$, volumetric heat capacity $\rho c$, diffusivity $\alpha = \lambda/\rho c$), no melting and no heat loss from the surface. In steady state, relative to the moving source, the temperature at distance $R$ from the source is

$$
T - T_0 \;=\; \frac{q}{2\pi\lambda R}\,\exp\!\left[-\frac{v\,(R + \xi)}{2\alpha}\right]
$$

where $q = \eta V I$ is the net power and $\xi$ the coordinate along the travel direction measured from the source (negative behind it). **On the weld centreline behind the source**, $\xi = -R$, the exponential equals 1. A point there passed under the source a time $t = R/v$ ago, so

$$
T - T_0 \;=\; \frac{q}{2\pi\lambda\, v\, t} \;=\; \frac{E}{2\pi\lambda\, t} \qquad (E = q/v)
$$

Solving for the time to reach a temperature $T$ and subtracting the times for 800 °C and 500 °C gives the thick-plate cooling time

$$
\boxed{\; t_{8/5} \;=\; \frac{E}{2\pi\lambda}\left(\frac{1}{500 - T_0} - \frac{1}{800 - T_0}\right) \;}\qquad\text{(thick plate, 3-D heat flow)}
$$

For a thin plate of thickness $d$ with heat flowing only in the plane (a line source through the thickness) the same steps give

$$
t_{8/5} \;=\; \frac{(E/d)^2}{4\pi\lambda\,\rho c}\left[\frac{1}{(500 - T_0)^2} - \frac{1}{(800 - T_0)^2}\right]\qquad\text{(thin plate, 2-D heat flow)}
$$

**Example.** With effective values for steel $\lambda = 25\ \mathrm{W/(m\,K)} = 0.025\ \mathrm{W/(mm\,K)}$ and $\rho c = 4.5\ \mathrm{J/(cm^3\,K)}$, $E = 1000\ \mathrm{J/mm}$ and $T_0 = 20\ ^\circ\mathrm{C}$:

$$
t_{8/5} \;=\; \frac{1000}{2\pi \times 0.025}\left(\frac{1}{480} - \frac{1}{780}\right) \;=\; 6366 \times 8.01\times 10^{-4} \;=\; 5.1\ \mathrm{s}
$$

close to the 5.3 s given by the empirical thick-plate formula of EN 1011-2. **Three conclusions follow.** In thick plate $t_{8/5}$ is **proportional to the heat input**; in thin plate it goes as **$(E/d)^2$**, so thin sections cool much more slowly for the same heat input. **Preheat** raises $T_0$ and lengthens $t_{8/5}$ strongly, because it reduces both denominators — this is how preheat avoids martensite. And the same model gives the **peak temperature** at a distance $r$ from the weld line in thick plate, $T_p - T_0 = \dfrac{2}{\pi e}\,\dfrac{E}{\rho c\, r^2}$, so the width of the HAZ grows as $\sqrt{E}$. The model ignores melting, temperature-dependent properties and the finite size of the arc, so it is good to perhaps 20–30 % away from the fusion line and qualitative close to it.
:::

::: example Is it weldable? The carbon equivalent {#ex-ce level=3 check="0.56"}
A pressure-vessel shell is $22\ \mathrm{mm}$ of a steel with $0.22\ \%\ \mathrm{C}$, $1.2\ \mathrm{Mn}$, $0.25\ \mathrm{Cr}$, $0.15\ \mathrm{Mo}$, $0.10\ \mathrm{V}$, $0.40\ \mathrm{Ni}$, $0.20\ \mathrm{Cu}$ (mass %). Find the IIW carbon equivalent (enter it to two decimal places) and say whether preheat is likely to be needed.

$$
\mathrm{CE} \;=\; \mathrm{C} + \frac{\mathrm{Mn}}{6} + \frac{\mathrm{Cr} + \mathrm{Mo} + \mathrm{V}}{5} + \frac{\mathrm{Ni} + \mathrm{Cu}}{15} \;=\; 0.22 + 0.20 + 0.10 + 0.04 \;=\; \mathbf{0.56}
$$

The IIW formula (derived from the work of Dearden and O'Neill) measures how readily the steel forms hard martensite: values up to about 0.35–0.40 are generally easy to weld, and above about 0.50 weldability is poor. **At 0.56 and 22 mm thick, preheat is needed**, together with low-hydrogen consumables stored and baked as the manufacturer specifies and, for a highly restrained joint, a hydrogen-release post-heat. The actual preheat temperature is taken from a procedure such as EN 1011-2, which combines the carbon equivalent with the combined thickness, the hydrogen level and the heat input. **Check:** the carbon term alone is 0.22, already well above the 0.15–0.18 typical of modern structural steels, so a high CE is unsurprising; a lower-carbon microalloyed grade would avoid most of this.
:::

## 2. The processes

::: definition The arc processes, and what each one is for {#def-arc}
An arc is a column of ionised gas at temperatures of several thousand to over $10{,}000\ \mathrm{K}$, carrying tens to hundreds of amperes (over a thousand in submerged arc) at about 10–40 V. The arc processes differ in **how the pool is protected from oxygen and nitrogen, how filler metal is supplied, and how fast metal is deposited**.

$$
\begin{array}{l l l l l}
\textbf{Process} & \textbf{Shielding} & \textbf{Filler} & \textbf{Typical use} & \textbf{Notes} \\ \hline
\text{SMAW (stick, MMA)} & \text{flux coating} & \text{the coated electrode} & \text{site work, repair} & \text{simple, portable, slow} \\
\text{GMAW (MIG/MAG)} & \text{gas (Ar, Ar–CO}_2\text{, CO}_2) & \text{continuous wire} & \text{production, robots} & \text{high productivity} \\
\text{FCAW} & \text{flux core, with or without gas} & \text{tubular wire} & \text{shipyards, structures} & \text{high deposition} \\
\text{GTAW (TIG)} & \text{inert gas} & \text{separate rod, or none} & \text{thin sheet, root passes, Ti, Al} & \text{clean, slow, high quality} \\
\text{SAW} & \text{granular flux} & \text{bare wire} & \text{long seams, thick plate} & \text{very high deposition; flat/horizontal only} \\
\text{Stud welding} & \text{ceramic ferrule or gas} & \text{the stud} & \text{shear connectors, studs} & \text{one weld per second-scale cycle}
\end{array}
$$

Four points matter more than the table. **(1) The shielding gas is a process parameter.** Argon–carbon dioxide mixtures are standard for steel; pure carbon dioxide is cheaper but gives more spatter; small oxygen or CO₂ additions help wetting on stainless steel; helium raises the arc voltage and heat for thick aluminium and copper; and reactive metals — aluminium, magnesium, titanium — are welded under inert gas only. **(2) The metal-transfer mode of GMAW changes with current.** At low current the wire touches the pool and short-circuits roughly a hundred times a second (short-circuit or "short-arc" transfer: low heat, good for thin sheet and positional work); above a transition current that depends on wire diameter and gas, metal crosses as a fine spray (deep, fast, but too hot for thin sheet and out of position); pulsed transfer gives spray-like detachment at a lower mean current. **(3) Submerged arc** runs at high currents under a blanket of granular flux, with no visible arc and little fume, giving very high deposition rates — but only in the flat and horizontal positions, because the flux and pool must stay in place. **(4) Gas tungsten arc** uses a non-consumable tungsten electrode, so heat input and filler addition are controlled separately; it is slow, but clean and precise, and is used for root passes in pipe, thin sheet and reactive metals.

**Positions** affect cost and qualification. In the flat position (ISO PA, AWS 1G for plate) gravity holds the pool and high currents can be used; vertical and overhead welds must be made with smaller pools and lower deposition. The pipe qualification position 6G (ISO H-L045) — a fixed pipe inclined at $45^\circ$ — requires the welder to pass through flat, vertical and overhead positions, and qualifies the welder for the easier positions within the range set by the standard.

**Safety.** Arc welding exposes the operator and bystanders to **ultraviolet and intense visible radiation** (eye and skin burns — screens and filter lenses are mandatory), **fume** containing metal oxides (including hexavalent chromium from stainless steels — extraction and respiratory protection), **electric shock**, **fire** from spatter and hot metal, and the hazards of **compressed gas cylinders**. Welding is done only by trained people, with the proper equipment and supervision, following the relevant safety regulations.
:::

::: definition Resistance, solid-state, and beam welding {#def-solid}
**Resistance welding** generates heat by Joule heating where the resistance is concentrated, at the interface between the sheets: $Q = I^2 R\, t$ joules (with $I$ in amperes, $R$ in ohms and $t$ in seconds; the older form $0.24 I^2 R t$ gives calories). Currents are typically several to about 15 kA, applied through water-cooled copper-alloy electrodes with forces of a few kilonewtons, for a few hundred milliseconds. **Spot welding** of car-body steel makes a molten **nugget** of a few millimetres diameter with no filler or shielding gas; a car body contains several thousand spot welds, most made by robots. A common minimum nugget diameter is $4\sqrt{t}$ to $5\sqrt{t}$ (with $t$ in mm). When the nugget is large enough the joint fails by **pull-out** — the nugget tears out of one sheet around its circumference — and a simple estimate of the tensile-shear load is

$$
F \;\approx\; \sigma_{\text{UTS}}\, \pi d\, t
$$

which for $1.5\ \mathrm{mm}$ sheet of 380 MPa with a $5.5\ \mathrm{mm}$ nugget gives about $9.8\ \mathrm{kN}$. The defects relate to current, time and force: **expulsion** (too much heat; molten metal is ejected), **undersized or cold welds** (too little heat, or excessive force), and **electrode wear** (the tip face grows, current density falls), which is why electrode tips are dressed regularly and weld controllers monitor each weld. **Seam welding** with rotating wheel electrodes makes leak-tight laps on fuel tanks and three-piece food cans; **projection welding** concentrates current at embossed projections or on nuts and studs; **flash butt welding** joins rails and chain links end to end.

**Solid-state processes** do not melt the parent metal, so there is no cast weld metal, no solidification cracking and little or no dilution, and some dissimilar combinations that cannot be fusion-welded can be joined. **Rotary friction welding** rotates one part against the other under axial force until the interface is hot and plastic, then stops the rotation and applies a forging force; it is used for axles, valves and bimetallic transition pieces. **Friction stir welding** (FSW), developed at The Welding Institute (TWI) in Cambridge from 1991, plunges a rotating tool with a shoulder and a profiled pin into the joint line and traverses it; the material is plasticised and stirred, not melted. Aluminium alloys are welded with tools of hot-work tool steel; steel and titanium need tools of more advanced materials such as polycrystalline cubic boron nitride or tungsten alloys. FSW gives fine-grained joints with low distortion and no fume or arc light, and has been used for launch-vehicle propellant tanks, railway carriage panels, ship decks and aircraft floor and fuselage panels. **Diffusion bonding** holds clean, flat surfaces together at high temperature (roughly half the melting temperature or more) under modest pressure, often in vacuum, so that atoms diffuse across the interface. **Ultrasonic welding** vibrates one part against the other at about 20–40 kHz under pressure, breaking surface oxides; it is used for battery tabs, wire splices and, by local melting, thermoplastics. **Explosive welding** and **roll bonding** make clad plate and bimetallic strip.

**Beam processes** deliver power densities several orders of magnitude higher than an arc. **Electron-beam welding** (developed by Karl-Heinz Steigerwald in Germany, with production machines from the late 1950s) uses a focused beam of high-energy electrons, normally in a vacuum chamber; the beam vaporises a **keyhole** through the section, giving deep, narrow welds — single-pass depths of 100 mm or more in some materials — with a narrow HAZ. The price is the vacuum chamber, tight fit-up and shielding against the X-rays the beam generates. **Laser welding** with fibre, disc or CO₂ lasers of a few to tens of kilowatts works in air at speeds of metres per minute and, in keyhole mode, absorbs a large fraction of the beam; **laser-hybrid** welding adds an arc to bridge gaps the laser alone cannot. **Beam processes buy speed, low heat input and low distortion with capital cost, fit-up accuracy and (for lasers) strict eye-safety enclosures.**
:::

::: example Heat input and what it does to the joint {#ex-heat level=3 check="800"}
A manual metal arc (SMAW) pass runs at $25\ \mathrm{V}$, $200\ \mathrm{A}$ and $5\ \mathrm{mm/s}$, $\eta = 0.8$. A submerged-arc seam in the same thick plate runs at $36\ \mathrm{V}$, $1200\ \mathrm{A}$, $8\ \mathrm{mm/s}$, $\eta = 1.0$. A 6 kW fibre-laser weld runs at $2\ \mathrm{m/min}$ ($33.3\ \mathrm{mm/s}$) with 80 % of the beam absorbed. Find the heat inputs (enter the SMAW value in J/mm) and the thick-plate $t_{8/5}$ of each at $T_0 = 20\ ^\circ\mathrm{C}$.

$$
E_{\text{SMAW}} = \frac{0.8 \times 25 \times 200}{5} = \mathbf{800\ J/mm}, \qquad E_{\text{SAW}} = \frac{1.0 \times 36 \times 1200}{8} = 5400\ \mathrm{J/mm}, \qquad E_{\text{laser}} = \frac{0.8 \times 6000}{33.3} = 144\ \mathrm{J/mm}
$$

With the thick-plate formula ($6366\ \mathrm{s\,mm/J} \times 8.01\times10^{-4} = 5.10 \times 10^{-3}\ \mathrm{s}$ per J/mm), $t_{8/5} \approx 4.1\ \mathrm{s}$, $27.5\ \mathrm{s}$ and $0.73\ \mathrm{s}$. **A factor of 37.5 in heat input between laser and submerged arc, and the consequences run through everything.** The laser weld cools through 800–500 °C in under a second, so in a hardenable steel it forms martensite in the weld and HAZ; the submerged-arc weld takes nearly half a minute, so its coarse-grain HAZ grows large grains and can lose toughness, which is why high-heat-input procedures must be qualified with Charpy tests. The manual weld lies between. Distortion and HAZ width also grow with heat input. **Check:** $t_{8/5}$ is proportional to $E$ in the thick-plate model, and $27.5/0.73 \approx 37.5$, as it should be.
:::

## 3. Weldability: what the metal does when you melt it

::: definition Steels, stainless, aluminium, titanium, cast iron, copper {#def-weld}
**Carbon and low-alloy steels** account for most welding, and their main problem fits in one sentence: *fast cooling forms hard martensite, and martensite plus diffusible hydrogen plus restraint stress gives hydrogen-induced (cold) cracking, which can appear hours or days after welding.* The controls are **preheat** (which slows cooling and helps hydrogen escape), **low-hydrogen consumables** (for example a hydrogen scale H4, below $4\ \mathrm{ml}$ of diffusible hydrogen per 100 g of weld metal, with electrodes stored and baked as specified), **hydrogen-release post-heating** on restrained joints, and **post-weld heat treatment** (for carbon steels typically around $600$–$650\ ^\circ\mathrm{C}$, often one hour per 25 mm of thickness), which tempers hard zones and relaxes residual stress. **Solidification (hot) cracking** is the other steel problem: low-melting films rich in sulphur and phosphorus open up at the end of solidification along the weld centreline. It is controlled by low S and P, a sufficient Mn:S ratio, and a bead shape that is not too deep and narrow, so that the columnar grains do not meet in a single centreline plane.

**Austenitic stainless steels** have three problems of their own. **Sensitisation**: in the HAZ, metal held in roughly the 500–850 °C range precipitates chromium carbides on grain boundaries, depleting the adjacent metal of chromium so that it can corrode intergranularly. The cures are low-carbon "L" grades ($\le 0.03\ \%$ C), stabilised grades with titanium (321) or niobium (347), or solution annealing. **Solidification cracking**: fully austenitic weld metal is prone to it, whereas weld metal that solidifies first as ferrite and retains a few per cent of **delta ferrite** resists it. Constitution diagrams (Schaeffler, DeLong, WRC-1992) predict the ferrite from chromium and nickel equivalents, and fillers such as 308L for 304L, or 316L for 316L, are formulated to give a few per cent ferrite after dilution. **Heat tint**: the coloured oxide on and beside a stainless weld, and the chromium-depleted layer under it, reduce corrosion resistance and are removed by pickling or mechanical cleaning on critical work.

**Aluminium** has its own list. Its tenacious oxide $\mathrm{Al_2O_3}$ melts at about $2050\ ^\circ\mathrm{C}$, far above the metal, so it must be removed before welding and broken up during it (the cleaning action of alternating current in GTAW). **Hydrogen porosity** arises because liquid aluminium dissolves roughly twenty times as much hydrogen as solid aluminium at the melting point; clean, dry filler and parent and dry shielding gas are essential. Its thermal conductivity is about four times that of carbon steel, so more heat is needed and thick sections may be preheated. And above all, welding **destroys the temper of strengthened alloys**: in age-hardened 6xxx and 7xxx alloys the HAZ is partly dissolved and partly overaged, with roughly half the parent yield strength in 6082-T6; in work-hardened 5xxx alloys (H tempers) the HAZ anneals to near the O-temper strength. **The designer's options are to design to the welded (HAZ) strength, as aluminium design codes such as EN 1999 require; to place welds at low-stress locations; or to heat-treat after welding, which is costly and distorts the assembly.**

**Titanium** welds well in inert gas and badly in air: above roughly $400$–$500\ ^\circ\mathrm{C}$ it absorbs oxygen and nitrogen, which embrittle it. The weld colour is the practical check: **bright silver and light straw are generally acceptable, darker straw to blue may require investigation or removal depending on the specification, and blue-violet, grey, white or powdery surfaces indicate serious contamination and rejection.** Hence trailing shields, back purging, and sealed chambers filled with argon for critical work. **Cast iron** is usually welded only for repair, often with nickel or nickel-iron fillers, preheat and short, peened runs, because the high carbon content makes both brittle white iron in the fusion zone and martensite in the HAZ likely. **Copper** needs high heat input or preheat because of its very high conductivity, and deoxidised grades to avoid porosity; and molten copper in contact with hot steel can penetrate its grain boundaries (**copper contamination cracking**, a form of liquid-metal embrittlement), so copper must not be melted onto steel near a weld.
:::

::: example Dilution and solidification mode of a stainless weld {#ex-dilution level=3 check="1.79"}
A $12\ \mathrm{mm}$ plate of 304L (18.3 Cr, 9.0 Ni, 0.3 Mo, 0.02 C, 1.5 Mn, 0.5 Si, 0.06 N, mass %) is welded with 308L filler (20.0 Cr, 10.0 Ni, 0.2 Mo, 0.02 C, 1.8 Mn, 0.4 Si, 0.05 N) at a dilution of 0.40. Using the Hammar–Svensson equivalents $\mathrm{Cr_{eq}} = \mathrm{Cr} + 1.37\mathrm{Mo} + 1.5\mathrm{Si}$ and $\mathrm{Ni_{eq}} = \mathrm{Ni} + 0.31\mathrm{Mn} + 22\mathrm{C} + 14.2\mathrm{N}$, find $\mathrm{Cr_{eq}}/\mathrm{Ni_{eq}}$ for the weld metal (enter it to two decimal places) and judge the risk of solidification cracking, taking a ratio above about 1.5 as indicating primary ferrite solidification.

Weld metal by the rule of mixtures, $0.6 \times$ filler $+ 0.4 \times$ parent:

$$
\mathrm{Cr} = 19.32,\ \ \mathrm{Ni} = 9.60,\ \ \mathrm{Mo} = 0.24,\ \ \mathrm{C} = 0.020,\ \ \mathrm{Mn} = 1.68,\ \ \mathrm{Si} = 0.44,\ \ \mathrm{N} = 0.054
$$
$$
\mathrm{Cr_{eq}} = 19.32 + 1.37 \times 0.24 + 1.5 \times 0.44 = 20.31, \qquad \mathrm{Ni_{eq}} = 9.60 + 0.31 \times 1.68 + 22 \times 0.020 + 14.2 \times 0.054 = 11.33
$$
$$
\frac{\mathrm{Cr_{eq}}}{\mathrm{Ni_{eq}}} \;=\; \frac{20.31}{11.33} \;=\; \mathbf{1.79}
$$

**Above 1.5: the weld metal solidifies first as ferrite and retains some delta ferrite, so the risk of solidification cracking is low.** Two points about the arithmetic. Carbon and nitrogen are very strong austenite stabilisers (coefficients 22 and 14.2 against 1 for nickel), so pickup of nitrogen from poor shielding pushes the weld towards fully austenitic solidification. And dilution varies from pass to pass — higher in a root pass or an autogenous pass — so the ratio must be acceptable for the most diluted pass, not just the average. **Check:** the parent alone has $\mathrm{Cr_{eq}}/\mathrm{Ni_{eq}} = 19.46/10.76 = 1.81$ and the filler $20.87/11.71 = 1.78$, so any mixture must lie close to these values, as found.
:::

## 4. Designing the joint

::: definition The rules of welded design {#def-design}
Eleven rules, each learned from failures:

1. **Size fillet welds on their throat.** The design throat of an equal-leg fillet is $a = 0.7s$ (leg $s$). In the simplified method of EN 1993-1-8 the design shear resistance per unit length is $F_{w,Rd} = f_{vw,d}\, a$ with $f_{vw,d} = f_u/(\sqrt3\, \beta_w\, \gamma_{M2})$, where $f_u$ is the ultimate strength of the weaker connected part, $\beta_w$ a correlation factor (0.8 for S235, 0.85 for S275, 0.9 for S355) and $\gamma_{M2} = 1.25$. The method applies regardless of load direction; the more detailed directional method shows that transversely loaded fillets are in fact somewhat stronger statically than longitudinal ones.
2. **Keep welds out of the regions of highest stress range.** A transverse attachment welded to the tension flange at mid-span is a fatigue-critical detail; the same attachment near a support or the neutral axis may not be.
3. **Make the load path direct.** Forces should flow through plates in line with each other; a force forced to turn a corner through a fillet weld root is a recipe for cracking.
4. **Detail the weld toe.** Fatigue cracks start at the weld toe or root. A smooth toe transition — by weld profile, toe grinding, TIG dressing or peening — raises fatigue strength appreciably.
5. **Balance welds about the neutral axis.** Welds shrink, so place them symmetrically about the section's neutral axis and the plate's mid-plane to limit bowing and angular distortion.
6. **Allow access.** Specify welds that the torch, the electrode or the robot can reach at the right angle, with backing or purge where needed.
7. **Do not over-restrain joints during welding.** Restraint raises residual stress and the risk of cracking; tack, sequence and allow controlled movement.
8. **Avoid through-thickness tension in plate,** or specify plate with guaranteed through-thickness properties (EN 10164 Z-grades) to resist lamellar tearing.
9. **Use continuous welds for fatigue and leak-tightness.** Intermittent fillets introduce many weld ends, each a crack starter, and leak paths; they are suitable only for statically loaded, non-sealing joints.
10. **Make thickness changes gradual.** A butt weld between plates of different thickness needs a taper (typically 1 in 4) to avoid a severe stress concentration.
11. **Design the inspection with the joint.** State the weld size in millimetres (throat or leg), the quality level, and the method and extent of non-destructive testing.
:::

::: example Fillet weld size {#ex-fillet level=3 check="89"}
A bracket carries a static shear of $180\ \mathrm{kN}$ (design value) into a column through two vertical fillet welds, each with a $6\ \mathrm{mm}$ leg (throat $a = 4.2\ \mathrm{mm}$). The steel is S355 ($f_u = 470\ \mathrm{MPa}$, $\beta_w = 0.9$, $\gamma_{M2} = 1.25$). Find the required length of each weld by the EN 1993-1-8 simplified method. (Enter mm, rounded up to the next whole millimetre.)

$$
f_{vw,d} = \frac{f_u}{\sqrt3\, \beta_w\, \gamma_{M2}} = \frac{470}{1.732 \times 0.9 \times 1.25} = 241\ \mathrm{MPa}, \qquad F_{w,Rd} = 241 \times 4.2 = 1013\ \mathrm{N/mm}\ \text{per weld}
$$
$$
L \;=\; \frac{180{,}000}{2 \times 1013} \;=\; 88.8 \;\Rightarrow\; \mathbf{89\ mm}\ \text{per weld}
$$

The weld must be full size over this length — craters at the ends do not count, so the welds are usually returned round the corner or simply run over the full available plate length (here up to 200 mm). If the load cycles, a **fatigue** check governs instead: the detail category of the connection, not the static strength of the weld, will then decide the size and geometry. **Check:** $2 \times 89 \times 4.2 \times 241 = 180\ \mathrm{kN}$, and the average shear on the throat, $180{,}000/(2 \times 89 \times 4.2) = 241\ \mathrm{MPa}$, equals the design strength, as it should.
:::

::: definition Fatigue: why the steel grade does not matter {#def-fatigue}
A welded joint's fatigue strength is not a material property. It is a **property of the detail**, tabulated in codes such as EN 1993-1-9 and the IIW recommendations as a **detail category** or **FAT class**: the nominal stress range $\Delta\sigma_C$ that the detail survives for $2 \times 10^6$ constant-amplitude cycles, with an S–N slope $m = 3$ for welded steel details:

$$
N \;=\; 2 \times 10^{6}\left(\frac{\Delta\sigma_C}{\Delta\sigma}\right)^{3} \qquad \Longleftrightarrow \qquad \Delta\sigma \;=\; \Delta\sigma_C\left(\frac{2 \times 10^{6}}{N}\right)^{1/3}
$$

(EN 1993-1-9 changes the slope to $m = 5$ below the constant-amplitude fatigue limit at $5 \times 10^6$ cycles and has a cut-off at $10^8$; the simple $m = 3$ line is used here for illustration.) Typical values, approximately as in the IIW recommendations and EN 1993-1-9 — consult the code for the exact conditions of each detail:

$$
\begin{array}{l c}
\textbf{Detail} & \Delta\sigma_C \ [\mathrm{MPa}] \\ \hline
\text{Continuous longitudinal fillet welds, automatic, no stop–starts} & 125 \\
\text{Transverse butt weld, ground flush, fully inspected} & 112 \\
\text{Transverse butt weld, as welded, good quality} & 90 \\
\text{Transverse non-load-carrying attachment (stiffener), toe failure} & 80 \\
\text{Load-carrying cruciform fillet weld, toe failure} & 63 \\
\text{Longitudinal attachment, length over } 100\ \mathrm{mm} & 56 \\
\text{Load-carrying fillet weld, root failure (stress on the throat)} & 36
\end{array}
$$

**Three facts explain the table.** **First, the category is the same for S235 and S690** — a higher-strength steel buys almost nothing in an as-welded fatigue detail. **Second, the residual stress is part of the reason**: near the weld it is of the order of the yield stress in tension, so even a nominally compressive or zero-to-tension load cycle operates at a high local mean stress, and the codes therefore count stress *range*, not maximum stress. **Third, a welded toe or root behaves almost like a pre-existing crack**: small intrusions and the sharp geometric notch mean that most of the life is crack propagation, whose rate depends on the stress-intensity range, not on the yield strength.

The corollaries are practical. **Count stress ranges** (with a damage sum such as Miner's rule for variable amplitude). **The category is set by geometry and inspection, not weld size** — a larger fillet on an attachment does not improve the toe and can make the joint stiffer, so "beefing up" a cracked detail rarely helps. **Improvement methods all act at the toe**: burr grinding and TIG dressing (which improve the toe profile and remove intrusions), and hammer, needle or high-frequency mechanical impact peening (which also introduce compressive residual stress). Applied correctly they can raise the fatigue strength of a detail by of the order of 30–50 % — several times the life — and the IIW gives rules for how much credit to take.
:::

::: widget plot
title: Fatigue categories: the detail, not the steel
f: 112*pow(2000000/pow(10,x),1/3); 80*pow(2000000/pow(10,x),1/3); 36*pow(2000000/pow(10,x),1/3)
x: 5,8
y: 0,320
labels: category 112 (ground-flush butt weld); category 80 (transverse stiffener); category 36 (fillet weld, root failure)
caption: Stress range (MPa) against $\log_{10} N$ for three welded details, from $\Delta\sigma = \Delta\sigma_C (2 \times 10^6/N)^{1/3}$, without the slope change and cut-off of EN 1993-1-9. The lines are parallel because $m = 3$ for all welded steel details; the material does not move them, the detail does. At $2 \times 10^6$ cycles a transverse stiffener allows $80\ \mathrm{MPa}$ of stress range; at $2 \times 10^8$ cycles the same line gives $17\ \mathrm{MPa}$ (the code's cut-off would apply before that). A factor of 1.4 in category (112 against 80) is a factor of $1.4^3 \approx 2.7$ in life at a given stress range.
:::

## 5. Distortion and residual stress: the weld does what it likes

::: definition Why welds carry yield-level residual stress, and what that does to the part {#def-distort}
As weld metal and the hot HAZ cool, they try to contract by a thermal strain $\alpha\,\Delta T$ — about $12 \times 10^{-6} \times 800 \approx 1\ \%$ over 800 K for steel — and the surrounding cold metal resists. The weld region goes into tension and the surrounding plate into compression. **The tension is limited by yielding**: once the stress reaches the yield stress, further contraction is taken up plastically. To a first approximation the longitudinal residual stress in the weld region is

$$
\sigma_{\text{residual}} \;\approx\; \min\left(E\alpha\, \Delta T,\; \sigma_Y\right), \qquad \Delta T_{\text{crit}} = \frac{\sigma_Y}{E\alpha} \approx \frac{350\ \mathrm{MPa}}{2.4\ \mathrm{MPa/K}} \approx 150\ \mathrm{K}\ \ \text{for S355}
$$

**Since a weld cools through many hundreds of kelvin, the weld region of a structural steel ends up with tensile residual stress of the order of the yield stress.** Across a butt weld the longitudinal residual stress is therefore a tensile peak over the weld and HAZ, balanced by compression further out (the cross-section carries no net force). This explains several observations: welded fatigue strength is largely independent of steel grade; welded frames move from their drawn dimensions; and **post-weld heat treatment** works by heating the whole part (around 600 °C for carbon steel) so that the yield strength falls and creep relaxes the stress to a fraction of its as-welded value.

A weld's **shrinkage force** is bounded by roughly its yield stress times the area of the contracting zone, $F \approx \sigma_Y A_w$ — for a 6 mm fillet (cross-section $s^2/2 = 18\ \mathrm{mm^2}$) about $350 \times 18 = 6.3\ \mathrm{kN}$ in S355 if only the weld metal is counted, and more when the hot HAZ is included. This force produces the characteristic distortions:

$$
\begin{array}{l l l l}
\textbf{Distortion} & \textbf{Cause} & \textbf{Typical size} & \textbf{Control} \\ \hline
\text{Longitudinal shrinkage} & \text{weld shortens along its length} & \text{fraction of a mm per m} & \text{allowances, sequence} \\
\text{Transverse shrinkage} & \text{weld shortens across the joint} & \text{about } 1\text{–}3\ \mathrm{mm} \text{ per butt weld} & \text{fewer passes, smaller groove} \\
\text{Angular distortion} & \text{more shrinkage at the top of a single-V} & \text{a few degrees} & \text{double-V, presetting} \\
\text{Bowing / buckling} & \text{longitudinal force off the neutral axis, or compression in thin plate} & \text{can be large} & \text{symmetry, stiffeners, low heat input}
\end{array}
$$

**The usual hierarchy of control is: design the weld out or make it smaller; place welds symmetrically; preset or pre-bend the parts so that shrinkage pulls them true; use a welding sequence that balances heat (back-stepping, alternating sides); restrain the parts only as much as needed; and finally straighten by pressing or by flame (line) heating.** Heavy clamping reduces distortion but raises residual stress and the risk of cracking.
:::

::: widget plot
title: Residual-stress profile across a butt weld
f: min(1,2*exp(-pow(x/8,2)))-0.25; 0.3*(min(1,2*exp(-pow(x/8,2)))-0.25); 1
x: -40,40
y: -0.5,1.3
labels: as welded; after post-weld heat treatment; the yield stress
caption: Schematic longitudinal residual stress, in units of the yield stress, against distance from the weld centreline (mm) in an 80 mm wide strip. The as-welded profile is capped at $\sigma_Y$ over the weld and HAZ and is balanced by compression further out so that the net force across the section is zero (the offset is chosen to make the areas above and below the axis equal). Post-weld heat treatment does not remove the pattern but scales it down, here to 30 % of the as-welded values. The shape is illustrative; measured profiles depend on plate width, heat input and restraint.
:::

::: proof How much cooling does it take to yield a restrained weld? {#proof-rescap}
Take a bar fixed at both ends, stress-free at a reference temperature, and cool it by $\Delta T$. Assume an elastic–perfectly plastic material with yield stress $\sigma_Y$ and temperature-independent $E$ and $\alpha$. The ends prevent the free contraction $\alpha\,\Delta T$, so the bar must carry an elastic strain of that size:

$$
\varepsilon \;=\; \alpha\, \Delta T \qquad \Longrightarrow \qquad \sigma \;=\; E\alpha\, \Delta T \quad \text{provided } \sigma \le \sigma_Y
$$

The bar first yields when

$$
\Delta T_{\text{crit}} \;=\; \frac{\sigma_Y}{E\alpha} \;=\; \frac{640}{200{,}000 \times 12 \times 10^{-6}} \;=\; \frac{640}{2.4} \;=\; 267\ \mathrm{K}
$$

for a steel with 640 MPa yield strength, and $350/2.4 = 146\ \mathrm{K}$ for S355. Further cooling produces plastic strain, not more stress. **Weld metal cools from above 1400 °C and even the HAZ below $A_{c1}$ cools through hundreds of kelvin, so the criterion is exceeded several times over.** Three consequences follow. **The peak residual stress depends on the yield stress, not on workmanship**: care can change its distribution, not its level. **It scales with $\sigma_Y$, not with the size of the weld**: a small weld in high-strength steel has as high a peak, over a smaller zone. **And it is one reason the fatigue categories do not depend on steel grade.** (In reality $\sigma_Y$ and $E$ fall at high temperature, and phase transformations in some steels change the result, but the conclusion for ordinary structural steels stands.)
:::

::: example The straightness bill {#ex-distort level=3 check="146"}
A $12\ \mathrm{mm}$ S355 plate ($\sigma_Y = 350\ \mathrm{MPa}$, $E = 200\ \mathrm{GPa}$, $\alpha = 12 \times 10^{-6}\ \mathrm{K^{-1}}$) is joined by a single-V butt weld with a $60^\circ$ included angle along one edge of a $1200\ \mathrm{mm}$ panel, which must stay flat within $2\ \mathrm{mm}$. Find the cooling at which a fully restrained weld first yields (enter it in K, to the nearest kelvin), estimate the shrinkage force, and decide what to do about distortion.

$$
\Delta T_{\text{crit}} \;=\; \frac{350}{200{,}000 \times 12 \times 10^{-6}} \;=\; \mathbf{146\ K} \qquad \Longrightarrow \qquad \sigma_{\text{residual}} \approx \sigma_Y = 350\ \mathrm{MPa}
$$

The weld cross-section is roughly $t^2 \tan 30^\circ = 144 \times 0.577 = 83\ \mathrm{mm^2}$, so the shrinkage force is at least $350 \times 83 \approx 29\ \mathrm{kN}$, acting along the edge of the panel and therefore off its neutral axis: **the panel will bow, and the single-V will also close up by a few degrees of angular distortion.** Typical single-V butt welds in plate of this thickness show a few degrees of angular distortion and 1–3 mm of transverse shrinkage, so a 2 mm flatness tolerance will not be met by care at the torch alone. The options, in the order a good shop would offer them: **use a double-V preparation** welded alternately from both sides, which balances angular distortion; **preset** the plates at an angle so that shrinkage pulls them flat; **balance the longitudinal force** with a weld or stiffener placed symmetrically about the neutral axis; or **straighten afterwards** by pressing or controlled flame heating. The drawing should state the acceptable distortion, the datum, and whether straightening is permitted. **Check:** $E\alpha = 2.4\ \mathrm{MPa/K}$, so cooling of only 146 K already reaches yield — far less than the 1000 K or more the weld actually cools through.
:::

## 6. Joining without melting the parts

::: definition Brazing and soldering: the joint the capillary makes {#def-braze}
Brazing and soldering join parts with a **filler metal that melts below the solidus of the parts**, so the parts do not melt, and a heat-treated part can often keep much of its properties if the brazing temperature is low enough. The conventional dividing line is $450\ ^\circ\mathrm{C}$: below it is **soldering** (tin-based fillers, typically melting at about $180$–$230\ ^\circ\mathrm{C}$, used mainly for electrical connections), above it **brazing** (copper, silver, aluminium–silicon and nickel-based fillers, roughly $580$–$1150\ ^\circ\mathrm{C}$). The filler **wets** the clean surface — it spreads with a small contact angle $\theta$ — and is drawn into the joint gap by capillary action.

For a gap of width $\delta$ between parallel plates the capillary pressure is $\Delta p = 2\gamma\cos\theta/\delta$, and balancing it against viscous resistance gives a Lucas–Washburn-type penetration law

$$
L \;=\; \left(\frac{\gamma\, \delta\, \cos\theta}{3\eta}\, t\right)^{1/2}
$$

so the penetration grows as the square root of time and of the gap. Too small a gap restricts flow and traps flux; too large a gap loses the capillary drive and gives a weaker joint. Typical design clearances for silver brazing are about $0.025$–$0.13\ \mathrm{mm}$ — and they must hold **at the brazing temperature**: a steel tube in a brass fitting becomes looser on heating (brass expands more), while a brass tube in a steel fitting tightens. **A brazed joint is designed as a capillary: a controlled gap, a lap length chosen for the load (a common rule of thumb is about three times the thickness of the thinner member), and a path for flux and air to escape.**

The main filler families: **copper–phosphorus** (self-fluxing on copper; not used on steel or nickel alloys because brittle phosphides form); **silver–copper–zinc** alloys (the general-purpose group, flowing at roughly $620$–$800\ ^\circ\mathrm{C}$; overheating fumes off zinc); cadmium-bearing silver alloys, now largely withdrawn because cadmium fume is highly toxic; **nickel-based** fillers for stainless steels and high-temperature service, usually in vacuum furnaces; and **aluminium–silicon** fillers (Al–12Si melts at $577\ ^\circ\mathrm{C}$) for aluminium. Most automotive aluminium heat exchangers are made from sheet clad with an Al–Si brazing alloy, assembled and furnace-brazed at about $600\ ^\circ\mathrm{C}$ in nitrogen with a non-corrosive potassium fluoroaluminate flux. **Active-metal brazing** with Ag–Cu–Ti fillers in vacuum joins ceramics to metals, because the titanium reacts with the ceramic surface. **Flux or a protective atmosphere is essential**: flux dissolves oxides and protects the surfaces, while vacuum and controlled-atmosphere furnaces achieve the same without flux.

**Soldering** is by number of joints the largest joining process, through electronics. Eutectic $\mathrm{Sn{-}37Pb}$ melts at $183\ ^\circ\mathrm{C}$; the EU RoHS directive (adopted 2003, applied from 2006) moved most electronics to lead-free alloys such as $\mathrm{Sn{-}3.0Ag{-}0.5Cu}$ (melting range about $217$–$220\ ^\circ\mathrm{C}$), with higher process temperatures, different wetting and attention to **tin whiskers** — fine filaments that can grow from pure-tin finishes and short circuits. Because solder operates at a large fraction of its melting temperature, **creep and thermal-cycling fatigue** are the usual life limits of solder joints.
:::

::: example How long a braze? {#ex-braze level=3 check="14"}
A tensile load of $15\ \mathrm{kN}$ must be carried in shear by a brazed lap joint $12\ \mathrm{mm}$ wide, using a silver filler with an allowable lap shear stress of $90\ \mathrm{MPa}$. Find the overlap length. (Enter mm, rounded up to the next whole millimetre.)

$$
L \;=\; \frac{F}{\tau_{\text{allow}}\, b} \;=\; \frac{15{,}000}{90 \times 12} \;=\; 13.9 \;\Rightarrow\; \mathbf{14\ mm}
$$

The simple calculation assumes a uniform shear stress along the overlap. In reality — as for adhesives below — the shear is concentrated at the ends of the lap, so very long overlaps add little strength; this is why lap lengths of the order of three times the thinner member's thickness are recommended. If the bar is $5\ \mathrm{mm}$ thick, a 14–15 mm lap fits that rule. **Check:** the bar itself must carry 15 kN: with a cross-section of $12 \times 5 = 60\ \mathrm{mm^2}$ its stress is $250\ \mathrm{MPa}$, so the bar material needs a strength comfortably above that, or the bar rather than the braze becomes the weak link.
:::

::: definition Adhesive bonding: the strongest joint you will ever misuse {#def-adh}
An adhesive transfers load through intimate contact with the surface. Several mechanisms contribute: **mechanical interlocking** in a roughened or porous surface (hence abrasion, grit-blasting and anodising), **adsorption** — van der Waals and acid–base interactions, effective only if the liquid adhesive wets the surface completely — and **chemical bonding** through primers and coupling agents such as silanes. **The practical consequence: a bond is only as good as the surface preparation.** Contamination by oil, release agents or handling is the commonest cause of bond failure. Hence the importance of degreasing, abrasion, and for aerospace aluminium the chemical etches (such as the FPL sulfuric–dichromate etch) and phosphoric- or chromic-acid anodising that create a stable, porous oxide; the flame, corona or plasma treatment of low-energy plastics such as polypropylene; and tests of wettability (water-break tests or dyne inks), since a surface wets only if its surface energy exceeds the adhesive's surface tension.

Joint design follows from the adhesive's weakness: **structural epoxies have lap-shear strengths of the order of 20–40 MPa but much lower resistance to peel and cleavage**, where the load is concentrated on a line at the edge of the bond. So: **load the adhesive in shear, not peel; make the adherends stiff enough not to bend the joint open; keep the bondline thin and controlled (typically about $0.1$–$0.3\ \mathrm{mm}$); and arrange for failure, if it occurs, to be cohesive or in the adherend.** The shear distribution along a lap is described by Volkersen's **shear-lag** analysis. For two identical adherends of modulus $E$ and thickness $t$, an adhesive layer of shear modulus $G_a$ and thickness $s$, and an overlap $L$ with $x$ measured from the centre and normalised so that the ends are at $x = \pm 1$,

$$
\beta \;=\; \sqrt{\frac{2 G_a}{E\, t\, s}} \qquad \Longrightarrow \qquad \frac{\tau(x)}{\bar\tau} \;=\; \frac{\beta L}{2}\,\frac{\cosh(\beta L x/2)}{\sinh(\beta L/2)}
$$

and the load-transfer length is $1/\beta$. For an epoxy ($G_a \approx 1\ \mathrm{GPa}$, $s = 0.2\ \mathrm{mm}$) on $1.5\ \mathrm{mm}$ aluminium ($E = 70\ \mathrm{GPa}$), $\beta = \sqrt{2 \times 1000/(70{,}000 \times 1.5 \times 0.2)} = 0.31\ \mathrm{mm^{-1}}$ and $1/\beta \approx 3\ \mathrm{mm}$: **almost all the load is transferred within a few millimetres of each end of the overlap.** The joint's strength in this model is proportional to $\tanh(\beta L/2)$, which approaches its limit once $\beta L/2$ exceeds about 2–3, so lengthening an already long overlap gains little. (Volkersen's analysis ignores the bending of the adherends; the Goland–Reissner analysis adds it and shows the peel stresses at the ends.)

The common classes: **film adhesives** (epoxy films such as FM 73 or FM 300, cured at about $120$–$180\ ^\circ\mathrm{C}$ under pressure, often in an autoclave, for aircraft structures); **two-part and one-part pastes** (used in car body shops along hem flanges and cured in the paint ovens); **anaerobic adhesives** (thread-lockers and retaining compounds, which cure in the absence of oxygen in contact with metal) and **cyanoacrylates** (which cure rapidly with surface moisture); and **hybrid joints** combining adhesive with rivets, clinches or spot welds, in which the fasteners hold the parts during cure and resist peel and crack growth.
:::

::: widget plot
title: Shear lag: where a bonded lap carries its load
f: 0.75*cosh(0.75*x)/sinh(0.75); 2.25*cosh(2.25*x)/sinh(2.25); 4.5*cosh(4.5*x)/sinh(4.5)
x: -1,1
y: 0,5
labels: overlap 10 mm; overlap 30 mm; overlap 60 mm
caption: Adhesive shear stress divided by its average, along the overlap from one end ($x = -1$) to the other ($x = +1$), from Volkersen's analysis with $\beta = 0.15\ \mathrm{mm^{-1}}$ (load-transfer length about $7\ \mathrm{mm}$). The 10 mm overlap is almost uniformly stressed (peak 1.18 times the average). In the 60 mm overlap the middle carries one tenth of the average stress and the ends 4.5 times it. Since joint strength in this model is proportional to $\tanh(\beta L/2)$, the 60 mm lap carries only about 1.6 times the load of the 10 mm one ($\tanh 4.5 = 1.00$ against $\tanh 0.75 = 0.64$) for six times the area. Stiffer or tapered adherends and better surface preparation help more than extra overlap.
:::

::: definition Threaded fasteners and rivets: the joint you can undo {#def-thread}
A bolt in a well-designed joint is a **spring that clamps the parts together**, and most properties of a bolted joint follow from the **preload**. Of the torque applied when tightening, typically about half is spent overcoming friction under the nut or head, around 40 % in thread friction and only about 10 % in stretching the bolt — so the torque–preload relation

$$
T \;=\; K\, D\, F_i
$$

($D$ the nominal diameter) has a **nut factor** $K$ that varies widely with lubrication and finish, from about 0.1 for well-lubricated threads to 0.3 or more for dry or rough ones, with 0.2 a common default. Preload achieved by torque control therefore scatters by perhaps $\pm 25$–$30\ \%$. A typical target preload is 70–90 % of the **proof load** (proof stress times tensile stress area $A_s$).

$$
\begin{array}{l c c c c c}
\textbf{Size} & \textbf{Class} & R_m\ [\mathrm{MPa}] & R_{p0.2}\ [\mathrm{MPa}] & \text{Proof stress } [\mathrm{MPa}] & A_s\ [\mathrm{mm^2}] \\ \hline
\text{M8} & 8.8 & 800 & 640 & 580 & 36.6 \\
\text{M12} & 8.8 & 800 & 640 & 580 & 84.3 \\
\text{M12} & 10.9 & 1040 & 940 & 830 & 84.3 \\
\text{M16} & 8.8 & 800 & 640 & 580 & 157 \\
\text{M20} & 10.9 & 1040 & 940 & 830 & 245 \\
\text{M24} & 12.9 & 1220 & 1100 & 970 & 353
\end{array}
$$

(Values from ISO 898-1; for class 8.8 above M16 the strengths are slightly higher.) Two consequences dominate design. **Fatigue:** the bolt and the clamped parts act as springs, and the bolt sees only the fraction $\Phi = k_b/(k_b + k_m)$ of an external load change, where $k_b$ and $k_m$ are the bolt and member stiffnesses. $\Phi$ is small (often 0.1–0.3) for a slender bolt clamping stiff, thick members, and larger for short bolts or soft gaskets. **A high preload and a small $\Phi$ protect the bolt from most of the load fluctuation**, which is why long, slender bolts (or reduced shanks) are used in fatigue-loaded joints and why a joint must not lose its preload by settling or self-loosening. **Slip:** in a **preloaded slip-resistant connection** the load is carried by friction, with design resistance proportional to $\mu\, n\, F_i$ ($\mu$ about 0.5 on blast-cleaned surfaces, $n$ the number of friction interfaces), so the bolts do not bear on the holes and the joint does not slip under service loads. Such bolts are tightened by the **turn-of-nut** method (a specified rotation beyond snug-tight, for example one third of a turn for short bolts in the RCSC specification), by calibrated torque, or by **tension-control bolts** whose spline end shears off at the required preload.

**Rivets** remain in use for good reasons. A solid rivet driven into its hole **expands to fill it** and does not self-loosen. **A crack in a riveted lap tends to stop at the next rivet hole or the next separate sheet** — riveted structures are inherently multi-load-path, which matters for damage tolerance in airframes. **Blind rivets** need access from one side only. And riveting is tolerant of surface condition. A solid aircraft rivet is upset to form a driven head typically about 1.5 times the shank diameter across and 0.5 times high, a cold-forming operation, so rivet alloys must be ductile at the time of driving: 2117-T4 rivets can be driven as received, whereas 2017 and 2024 rivets are solution-treated and then driven within a short time or kept refrigerated (the "ice-box rivet") to delay natural ageing. **A riveted joint is heavier and more labour-intensive than a welded or bonded one, but easy to inspect and repair, which is why riveting and fastening still dominate aluminium airframe assembly.**
:::

::: widget plot
title: Torque is not preload
f: 0.694*x; 0.4167*x; 0.2778*x; 36.7
x: 0,120
y: 0,60
labels: K = 0.12 (well lubricated); K = 0.20 (typical default); K = 0.30 (dry or rough); target preload
caption: Preload (kN) against tightening torque (N·m) for an M12 class 8.8 bolt from $F_i = T/(KD)$, with the horizontal line at 75 % of the proof load, $0.75 \times 580 \times 84.3 = 36.7\ \mathrm{kN}$. The target is reached at about 53, 88 and $132\ \mathrm{N\,m}$ for the three nut factors — a factor of 2.5 for bolts that differ only in their surface condition. That is why critical joints are not specified by torque alone: alternatives include torque-plus-angle tightening, yield-controlled tightening (stopping when the torque–angle curve departs from linear), hydraulic tensioning (stretching the bolt directly, common for large flanges and wind-turbine towers), and ultrasonic measurement of bolt elongation.
:::

::: example Bolt it {#ex-bolt level=3 check="204"}
An M16 class 8.8 bolt ($A_s = 157\ \mathrm{mm^2}$, proof stress $580\ \mathrm{MPa}$) is tightened to 70 % of its proof load with $K = 0.2$. Find the tightening torque (enter N·m to the nearest whole number), the clamp-force range for a $\pm 15\ \%$ scatter in effective preload, and the bolt stress range if an external load cycles between 0 and $50\ \mathrm{kN}$ with $\Phi = 0.2$.

$$
F_i = 0.7 \times 580 \times 157 = 63.7\ \mathrm{kN}, \qquad T = K D F_i = 0.2 \times 0.016 \times 63{,}700 = \mathbf{204\ N\,m}
$$

A $\pm 15\ \%$ scatter gives $54$–$73\ \mathrm{kN}$ of clamp. **And that assumes $K = 0.2$**: if a lubricated batch has $K = 0.14$, the same torque gives $204/(0.14 \times 0.016) = 91\ \mathrm{kN}$, equal to the proof load $580 \times 157 = 91\ \mathrm{kN}$ — on the edge of permanent stretch, and beyond it once the torsional stress from tightening is added. **Fatigue:** the bolt's share of the external load range is $0.2 \times 50 = 10\ \mathrm{kN}$, a stress range of $10{,}000/157 = 64\ \mathrm{MPa}$ (amplitude 32 MPa). Shigley's endurance strength for rolled-thread class 8.8 bolts is about $129\ \mathrm{MPa}$ in amplitude, so the bolt is safe provided the preload is maintained — and a Goodman check including the high mean stress from preload is the proper method. Had the joint been stiffer in the bolt ($\Phi = 0.5$), the amplitude would be 80 MPa, much closer to the limit. **Rolled threads, a generous fillet under the head, flat and square seating faces, and controlled preload matter more than an increase in property class.** **Check:** $T/(K D) = 204/(0.2 \times 0.016) = 63.7\ \mathrm{kN}$, recovering the target preload.
:::

## Exercises

::: exercise Heat input {#ex-heatinput level=2 check="5100"}
A submerged-arc weld runs at $34\ \mathrm{V}$, $900\ \mathrm{A}$ and $6\ \mathrm{mm/s}$ with a thermal efficiency of 1.0. Find the net heat input. (Enter J/mm.)
::: solution
$E = 1.0 \times 34 \times 900/6 = \mathbf{5100\ J/mm}$. With a preheat of $150\ ^\circ\mathrm{C}$ on thick plate, the thick-plate model gives $t_{8/5} = 5100/(2\pi \times 0.025) \times (1/350 - 1/650) = 32{,}468 \times 1.32 \times 10^{-3} \approx 43\ \mathrm{s}$ — slow enough to avoid martensite in most structural steels, but long enough to coarsen the HAZ and lower its toughness, which is why high-heat-input procedures are qualified by Charpy testing and many codes limit heat input for fine-grained and quenched-and-tempered steels.
:::
:::

::: exercise Heat-affected zone width {#ex-hazw level=3 check="2.2"}
For a thick steel plate welded with a net heat input of $1000\ \mathrm{J/mm}$ at $T_0 = 20\ ^\circ\mathrm{C}$, with $\rho c = 4.5 \times 10^{-3}\ \mathrm{J/(mm^3\,K)}$, use the thick-plate peak-temperature relation $T_p - T_0 = \dfrac{2}{\pi e}\dfrac{E}{\rho c\, r^2}$ to find the distance between the $1500\ ^\circ\mathrm{C}$ and $800\ ^\circ\mathrm{C}$ peak-temperature positions. (Enter mm to one decimal place.)
::: solution
Solving for $r$: $r = \sqrt{2E/(\pi e\, \rho c\, (T_p - T_0))}$.

$$
r_{1500} = \sqrt{\frac{2000}{\pi \times 2.718 \times 0.0045 \times 1480}} = 5.93\ \mathrm{mm}, \qquad r_{800} = \sqrt{\frac{2000}{\pi \times 2.718 \times 0.0045 \times 780}} = 8.17\ \mathrm{mm}
$$

so the band is $8.17 - 5.93 = \mathbf{2.2\ mm}$ wide. Since $r \propto \sqrt{E}$, doubling the heat input widens it by a factor $\sqrt2$ (to about 3.2 mm). The point-source model is rough close to the fusion line, but the scaling is reliable.
:::
:::

::: exercise Carbon equivalent {#ex-ce2 level=2 check="0.45"}
Find the IIW carbon equivalent of a steel with $0.18\ \mathrm{C}$, $1.1\ \mathrm{Mn}$, $0.20\ \mathrm{Cr}$, $0.10\ \mathrm{Mo}$, $0.05\ \mathrm{V}$, $0.15\ \mathrm{Ni}$, $0.10\ \mathrm{Cu}$ (mass %), and say whether preheat should be considered on a $30\ \mathrm{mm}$ plate. (Enter CE to two decimal places.)
::: solution
$\mathrm{CE} = 0.18 + 1.1/6 + 0.35/5 + 0.25/15 = 0.18 + 0.183 + 0.070 + 0.017 = \mathbf{0.45}$. This is in the "good to fair" range, but at 30 mm the joint cools quickly and is highly restrained, so a procedure such as EN 1011-2 will typically call for a modest preheat with ordinary consumables, or allow welding without preheat only with low-hydrogen consumables and adequate heat input. The carbon equivalent screens the steel; thickness, hydrogen and heat input decide the procedure.
:::
:::

::: exercise Fillet weld length {#ex-fillet2 level=3 check="92"}
A static design load of $120\ \mathrm{kN}$ is carried by a single fillet weld with an $8\ \mathrm{mm}$ leg (throat $a = 5.6\ \mathrm{mm}$) joining S275 plates ($f_u = 430\ \mathrm{MPa}$, $\beta_w = 0.85$, $\gamma_{M2} = 1.25$). Find the required effective length by the EN 1993-1-8 simplified method. (Enter mm, rounded up to the next whole millimetre.)
::: solution
$f_{vw,d} = 430/(\sqrt3 \times 0.85 \times 1.25) = 233.7\ \mathrm{MPa}$, $F_{w,Rd} = 233.7 \times 5.6 = 1309\ \mathrm{N/mm}$, $L = 120{,}000/1309 = 91.7 \Rightarrow \mathbf{92\ mm}$ of full-size weld. With a 6 mm leg ($a = 4.2\ \mathrm{mm}$) the length would be $122\ \mathrm{mm}$; the static capacity is proportional to throat times length, whereas the fatigue category of the detail does not improve with weld size.
:::
:::

::: exercise Spot weld strength {#ex-spot2 level=2 check="7.5"}
A resistance spot weld in $1.2\ \mathrm{mm}$ sheet of $400\ \mathrm{MPa}$ tensile strength has a $5.0\ \mathrm{mm}$ nugget. Estimate the tensile-shear load at which the nugget pulls out, using $F \approx \sigma_{\text{UTS}}\pi d t$. (Enter kN to one decimal place.)
::: solution
$F = 400 \times \pi \times 5.0 \times 1.2/1000 = \mathbf{7.5\ kN}$. This is an estimate: measured strengths depend on the HAZ properties (softened in some high-strength steels), on the failure mode (pull-out or interfacial fracture) and on the test. The minimum nugget rule $4\sqrt{t} = 4.4\ \mathrm{mm}$ is met. Spot welds are also checked for fatigue, which for spot-welded joints is much lower than the static strength suggests because the sheet edge at the nugget is a sharp notch.
:::
:::

::: exercise Braze overlap {#ex-braze2 level=2 check="20"}
A brazed lap $10\ \mathrm{mm}$ wide must carry $18\ \mathrm{kN}$ with an allowable shear stress of $90\ \mathrm{MPa}$. Find the overlap (enter mm), and comment on it if the bars are $6\ \mathrm{mm}$ thick.
::: solution
$L = 18{,}000/(90 \times 10) = \mathbf{20\ mm}$, about 3.3 times the bar thickness — in line with the rule of thumb of about three times the thinner member, so it is reasonable. The bar itself carries $18{,}000/(10 \times 6) = 300\ \mathrm{MPa}$, so its material must be strong enough; if it were thinner, for example 4 mm, the bar stress would be 450 MPa and the bar, not the braze, would govern.
:::
:::

::: exercise Bolt torque {#ex-bolt2 level=2 check="118"}
An M12 class 10.9 bolt ($A_s = 84.3\ \mathrm{mm^2}$, proof stress $830\ \mathrm{MPa}$) is tightened to 70 % of proof with $K = 0.2$. Find the torque. (Enter N·m to the nearest whole number.)
::: solution
$F_i = 0.7 \times 830 \times 84.3 = 49.0\ \mathrm{kN}$, $T = 0.2 \times 0.012 \times 49{,}000 = \mathbf{118\ N\,m}$. Compared with a class 8.8 bolt of the same size (proof 580 MPa), the 10.9 bolt gives $830/580 = 1.43$ times the clamp for 1.43 times the torque. The higher preload makes accurate preload control more important, since the bolt operates closer to its yield strength.
:::
:::

::: exercise Derive the residual-stress ceiling {#ex-derive-res level=4 check="175"}
Show that a fully restrained, elastic–perfectly plastic bar cooled by $\Delta T$ first yields when $\Delta T = \sigma_Y/(E\alpha)$, and evaluate it for $E = 200\ \mathrm{GPa}$, $\alpha = 14 \times 10^{-6}\ \mathrm{K^{-1}}$, $\sigma_Y = 490\ \mathrm{MPa}$. (Enter the temperature drop in K to the nearest kelvin.)
::: solution
The restraint prevents the free thermal strain $\alpha\Delta T$, so the bar carries a mechanical strain of equal magnitude and stress $E\alpha\Delta T$ while elastic; setting this equal to $\sigma_Y$ gives $\Delta T = \sigma_Y/(E\alpha) = 490/(200{,}000 \times 14 \times 10^{-6}) = 490/2.8 = \mathbf{175\ K}$. A weld cools through many times this, so its peak residual stress is set by the yield stress; what remains to be found is the width of the tensile zone and where the balancing compression lies.
:::
:::

::: exercise Derive the thick-plate cooling time {#ex-derive-haz level=4 check="10.2"}
Starting from the centreline temperature behind a moving point source on thick plate, $T - T_0 = E/(2\pi\lambda t)$, derive $t_{8/5} = \dfrac{E}{2\pi\lambda}\left(\dfrac{1}{500 - T_0} - \dfrac{1}{800 - T_0}\right)$ and evaluate it for $E = 1500\ \mathrm{J/mm}$, $\lambda = 0.025\ \mathrm{W/(mm\,K)}$ and a preheat $T_0 = 100\ ^\circ\mathrm{C}$. (Enter seconds to one decimal place.)
::: solution
Inverting, the time after the source has passed at which the centreline reaches temperature $T$ is $t(T) = E/[2\pi\lambda (T - T_0)]$. Then $t_{8/5} = t(500) - t(800)$, which is the stated result. Numerically,

$$
t_{8/5} = \frac{1500}{2\pi \times 0.025}\left(\frac{1}{400} - \frac{1}{700}\right) = 9549 \times 1.071 \times 10^{-3} = \mathbf{10.2\ s}
$$

Without preheat ($T_0 = 20\ ^\circ\mathrm{C}$) it would be $9549 \times 8.01 \times 10^{-4} = 7.6\ \mathrm{s}$: the preheat lengthens the cooling time by a third, which is how preheat reduces the hardness of the HAZ.
:::
:::

::: quiz A welded fatigue detail in S690 steel has been found to have insufficient life. Which change works? {#quiz-fatigue}
- [ ] Changing the steel to S960
- [ ] Increasing the fillet weld size from 6 mm to 10 mm
- [x] Improving the weld toe by grinding, TIG dressing or peening
- [ ] Specifying a higher-strength filler metal
::: solution
**Only toe improvement changes what controls the life.** The fatigue category of an as-welded detail does not depend on steel grade or filler strength, because the crack grows from the sharp toe through metal carrying high tensile residual stress. A larger weld leaves the toe geometry essentially unchanged and can stiffen the detail. Burr grinding and TIG dressing improve the toe profile and remove small defects; hammer, needle and high-frequency impact peening also introduce compressive residual stress. Applied and inspected properly, these can raise fatigue strength by of the order of 30–50 %.
:::
:::

::: quiz A titanium bracket comes out of the welding jig with a grey, dull, powdery weld surface. What does it mean? {#quiz-ti}
- [ ] The surface is fine; it just needs a wire brush
- [ ] The weld is over-penetrated
- [x] The weld has absorbed oxygen and nitrogen and is embrittled — reject it
- [ ] The argon was too pure
::: solution
**The colour of a titanium weld indicates how much it has reacted with air while hot: bright silver and light straw are generally acceptable; darker colours call for investigation under the governing specification; grey, white or powdery surfaces mean heavy contamination and brittle metal, and the weld is rejected.** The cause is inadequate shielding — no trailing shield, poor back purge, draughts, or a faulty torch gas lens. The remedy is better gas coverage (trailing shields, purge dams, or welding in an inert-gas chamber), clean preparation, and procedure qualification.
:::
:::

## Where this lesson leads

- **[[manufacturing/machining|Machining]]** is the alternative to many joints (machining from solid) and the finishing step for many welded parts.
- **[[manufacturing/process-selection|Process selection]]** places the joining processes on the same cost-versus-quantity map as the forming processes.
- **[[manufacturing/casting|Casting]]** and **[[manufacturing/additive-manufacturing|additive manufacturing]]** avoid joints by making the part in one piece, and share the weld's issues of solidification, porosity and residual stress.
- **[[materials-science/phase-transformations|Phase transformations]]** gives the metallurgy of sections 1 and 3: continuous-cooling-transformation diagrams explain why $t_{8/5}$ matters and why preheat works.
- **[[materials-science/failure|Failure]]** supplies the fracture and fatigue background behind weld defects, detail categories and hydrogen cracking.
- **[[materials-science/corrosion|Corrosion]]** covers galvanic couples in mixed-metal joints, crevices under fasteners and the sensitised stainless steel of section 3.
- **[[solid-mechanics/fracture-mechanics|Fracture mechanics]]** turns a weld defect into an acceptable stress level or an inspection interval.
- **[[machine-design/fasteners-joints|Fasteners and bolted joints]]** develops the bolted joint of section 6 into a full calculation, and **[[design-process/design-for-manufacture|Design for manufacture and assembly]]** turns the choice between weld, bond and fastener into part count and assembly time.

::: history
**1800–1802.** **Humphry Davy** produces short electric arcs between carbon electrodes, and **Vasily Petrov** in Russia describes a continuous arc. **1881–1888.** **Auguste de Méritens** patents carbon-arc welding (1881), used for lead in battery manufacture; **Nikolay Benardos**, who showed carbon-arc welding of metals at the 1881 Paris electricity exhibition, patents it with **Stanisław Olszewski** in 1887; **Nikolay Slavyanov** (1888) and, in the United States, **C. L. Coffin** introduce metal electrodes. **1904–1907.** **Oscar Kjellberg** founds ESAB in Gothenburg (1904) and patents the coated electrode (Swedish patent, 1907), whose coating stabilises the arc and protects the weld. **1935.** The first patent for **submerged arc welding** (Jones, Kennedy and Rothermund). **1941.** At Northrop Aircraft, **Russell Meredith**, with Vladimir Pavlecka and Tom Piper, develops the tungsten-arc process with helium shielding ("Heliarc") for magnesium; Meredith patents the torch in 1941. **1941–1945.** 2,710 **Liberty ships** are built in US yards with largely welded hulls. Some 1,500 significant brittle fractures occur in wartime merchant ships, and twelve ships break in two, three of them Liberty ships. **Constance Tipper** at Cambridge shows that the fractures are governed by the steel's ductile-to-brittle transition at low temperature, with cracks often starting at stress concentrations such as square hatch corners; tougher steels and better details follow. **1948.** **Gas metal arc welding** is developed at the Battelle Memorial Institute; carbon dioxide shielding for steel follows in 1953 and short-circuit transfer for thin sheet in 1958–59. **1956.** **A. I. Chudikov** in the Soviet Union proposes rotary **friction welding** as an industrial process. **1958.** **Karl-Heinz Steigerwald**'s first practical electron-beam welding machine goes into operation in Germany. **1967.** The IIW adopts the carbon-equivalent formula based on the work of **Dearden and O'Neill**. **1991.** **Wayne Thomas** and colleagues at **The Welding Institute** in Cambridge develop and patent **friction stir welding**, which is soon applied to aluminium ship panels, railway vehicles, launch-vehicle tanks and aircraft structures. **2003–2006.** The EU **RoHS directive** is adopted (2003) and applies from 2006, moving most electronics to lead-free solders.
:::

::: summary
**A weld is a small casting with a heat-affected zone beside it.** The net heat input $E = \eta V I/v$ sets the cooling time $t_{8/5}$ — proportional to $E$ in thick plate, to $(E/d)^2$ in thin plate — and the cooling time sets the microstructure and the risk of hard, crack-prone zones.
**The carbon equivalent screens weldability.** $\mathrm{CE} = \mathrm{C} + \mathrm{Mn}/6 + (\mathrm{Cr} + \mathrm{Mo} + \mathrm{V})/5 + (\mathrm{Ni} + \mathrm{Cu})/15$; up to about 0.40 is easy, above about 0.50 needs preheat and low-hydrogen practice. Hydrogen cracking needs martensite, hydrogen and stress together.
**Each alloy family has its own problem.** Stainless steels: sensitisation and the need for some delta ferrite; aluminium: oxide, hydrogen porosity and HAZ softening; titanium: contamination by air, judged by colour; cast iron: hard zones; copper: high conductivity, and copper contamination cracking of steel.
**Every fusion weld carries yield-level residual stress.** $\Delta T_{\text{crit}} = \sigma_Y/(E\alpha)$ is only 150–270 K, so the welded region is at yield. Fatigue strength of a welded detail is a property of its geometry (categories such as 112, 80, 63, 36 MPa at $2 \times 10^6$ cycles, slope 3), not of the steel; improvement comes from treating the toe.
**Distortion follows from shrinkage.** Control it by design (symmetry, smaller welds, double-V), presetting and sequence, and straighten afterwards if needed; heavy restraint trades distortion for residual stress and cracking risk.
**Brazing is a capillary and bonding is a surface.** Braze clearances are a few hundredths to about a tenth of a millimetre at temperature; adhesives need clean, wettable surfaces, shear loading and thin bondlines, and shear lag concentrates the load within a few millimetres of each end of a lap.
**A bolt is a spring, and torque is not preload.** $T = K D F_i$ with $K$ from about 0.1 to 0.3, so torque control scatters the preload; the bolt sees only the fraction $\Phi = k_b/(k_b + k_m)$ of external load changes, so high preload and a compliant bolt give good fatigue life.
:::

## Further reading

- S. Kou, *Welding Metallurgy*, 2nd ed., Wiley, 2003 — heat flow, solidification, the HAZ, and the metallurgy of welding steels, stainless steels and aluminium.
- J. F. Lancaster, *Metallurgy of Welding*, 6th ed., Abington Publishing, 1999 — a classic treatment of welding metallurgy, including carbon equivalents and cracking.
- O. W. Blodgett, *Design of Welded Structures*, James F. Lincoln Arc Welding Foundation, 1966 — practical design of welded joints and control of distortion.
- A. Hobbacher, *Recommendations for Fatigue Design of Welded Joints and Components*, 2nd ed., IIW/Springer, 2016 — FAT classes, assessment methods and improvement techniques.
- R. D. Adams (ed.), *Adhesive Bonding: Science, Technology and Applications*, Woodhead, 2005 — surface preparation, joint analysis (Volkersen, Goland–Reissner) and design.
- R. G. Budynas and J. K. Nisbett, *Shigley's Mechanical Engineering Design*, 11th ed., McGraw-Hill, 2020 — bolted joint stiffness, preload and fatigue of fasteners.
- Standards to quote on drawings: EN ISO 5817 (quality levels for imperfections in welds), EN 1993-1-8 and EN 1993-1-9 (design of joints and fatigue), EN 1011 (recommendations for welding of metallic materials), AWS D1.1 (structural welding code — steel), ISO 898-1 (mechanical properties of bolts).
