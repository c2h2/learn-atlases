A joint is where a structure stops being a component and starts being an assembly, and it is where the structure fails. That is not a pessimistic view, it is the content of every fatigue textbook and every inquiry report from the Liberty ships onward: **the parent plate of a welded bridge is a homogeneous, isotropic, ductile, inspectable material whose strength you can calculate to within 5 %, and the weld is an inhomogeneous, anisotropic, cast, residual-stressed, notched, defect-containing composite whose strength you can only bound by testing and inspecting.** The whole of joint design follows from that asymmetry, and the whole of joint *selection* follows from a second fact: a joint is usually the most expensive thing in the assembly, because it is the only operation that adds no function. A spar has a function; a 40 mm fillet weld along a spar-to-web seam exists only because the spar could not be made in one piece, and it costs money, hours, distortion, inspection and — if it is in a fatigue-critical place — the aircraft.

So the engineer's job with joints is a sequence of four questions, in this order. **First: does this joint have to exist?** Half the welds on a welded frame exist because the plate came off the mill 2 m wide, and half the bolts on a bracket exist because the designer could not decide. **Second: can it be made by a process that leaves no joint at all** — a casting, a forging, a rolled blank, a spun shell, a friction-stir-welded panel, a hydroformed tube? **Third: if a joint is unavoidable, put it where the stress is, in the orientation the joint is strong in, in a geometry the process can reach, and in a material the process can tolerate.** A weld in shear is twice a weld in tension; a weld at a machined, radiused, continuous detail is twice a weld at a notch; a weld you can look at is three times a weld you cannot. **Fourth: design the joint for the way it will be made and the way it will be inspected**, because a joint that cannot be inspected is a joint whose strength is whatever the welder managed on a wet Tuesday.

::: warning Nine ways joints go wrong
**Designing the weld to the parent-plate strength.** A fillet weld sized on the static strength of S355 will pass the static calculation and fail in a few hundred thousand cycles, because the weld toe is a 1 mm crack and the fatigue category of the detail does not care what grade of steel you paid for. **Ignoring residual stress.** A weld cools from 1500 °C, it is constrained by a tonne of cold steel, and it therefore ends up sitting at the yield stress in tension. You cannot reduce it by being careful, you can only move it (peening, roller levelling, stress relief) or design around it — and any calculation you then do about "adding" a service stress to a residual stress is wrong, because the residual stress is already at the yield plateau and will relax. **Putting a weld where it cannot be made.** A 40 mm deep fillet in a closed box, a torch that cannot reach the root, a position the welder can only do overhead from one side, a root that cannot be purged: all of these are drawn by people who will never hold the torch, and all of them produce 60 % lack-of-fusion. **Specify the weld from the torch's point of view, or have the shop tell you at the quotation stage that it cannot be done.** **Welding a heat-treated alloy and pretending it is still heat-treated.** A 6082-T6 frame welded end to end is a frame whose joints are T4, at half the yield strength, over a zone three times wider than the visible heat-affected zone; a 15-5PH, a 7075, a 4340 and a 17-4PH are all the same story in different colours. **Design to the welded properties or post-heat-treat after welding, and if you do the latter, say so on the drawing and allow for the distortion.** **Through-thickness loading of plate.** Steel plate is rolled, so it is strong in the plane of rolling and weak through the thickness — a lamellar tear needs 40 % of the in-plane tensile strength and starts at a sulphide inclusion. A fillet weld whose throat is loaded perpendicular to the plate surface is exactly that, and it is the most common fracture in a badly detailed tubular joint. **Assuming the filler metal is the same as the parent.** It never is: the weld metal is a casting with 40 % dilution, a columnar structure, a different composition at the fusion line, and a toughness that depends on the heat input and the interpass temperature. **Not specifying the inspection.** A weld without an acceptance standard is a decoration. State the standard (EN ISO 5817 level B, C or D; AWS D1.1 Table 6.1), the method, the extent (10 % or 100 %), and who pays for the rework. **Bolting to a bearing surface that is not machined.** A bolted joint whose faces are not flat and square to the bolt axis bends the bolt, and a bent M16 loses half its fatigue strength; a washer or a spotface costs nothing. **Bonding a joint and then loading it in peel.** Adhesives are strong in shear and weak in tension — a 25 mm lap bonded with an epoxy whose shear strength is 30 MPa carries 750 N per millimetre of width, and the same joint opened like a book at 5 MPa peels at a tenth of the load. If you cannot put the adhesive in shear, do not use an adhesive.
:::

## 1. The weld is a casting, and next to it is a heat-affected zone

::: definition Fusion welding, the thermal cycle, and the three zones {#def-fus}
Every fusion process does the same thing: it puts enough heat into a small volume to melt it, keeps the molten pool away from the air, and lets it solidify. The heat that arrives is the **net heat input**

$$
E \; = \; \eta \, { \frac { V I } { v } } \quad [ \mathrm { J / m m } ]
$$

with $V$ the arc voltage, $I$ the current, $v$ the travel speed, and $\eta$ the thermal efficiency — 0.6 for shielded metal arc, 0.7-0.8 for metal arc, 0.6 for tungsten inert gas, 0.8-1.0 for submerged arc, 0.7 for electron beam, and 0.2-0.5 for laser depending on how much of the beam the metal actually absorbs. $E$ is the single number that governs the weld's microstructure, its distortion and its mechanical properties, and the welder controls it with the last three of its four variables.

Move a heat source across a plate and any point of the metal experiences a **thermal cycle**: a rise at $1 0 { - } 1 0 0 \ \mathrm { ^ \circ C / s }$ to a peak that falls off with distance from the weld, a hold of a second or two above the solidus for the pool itself, and a cooling rate that for steel is what decides the structure. The cooling rate through the $8 0 0 { - } 5 0 0 \ \mathrm { ^ \circ C }$ window — the range in which austenite transforms — is the number metallurgists use, and it is written $t _ { 8 / 5 }$; it runs from about 1 s in a laser weld to 30-60 s in a submerged-arc weld in a thick section, and it is the reason the same steel with the same filler can be a tough acicular ferrite or a brittle upper bainite.

The metal next to the arc divides into three regions, and each fails differently:

$$
\begin{array} { l l l l }
\textbf{Zone} & \textbf{Peak temperature} & \textbf{What happens} & \textbf{What it is after cooling} \\ \hline
\text{Weld metal} & \text{above the liquidus} & \text{a casting, solidifying at } 1 { - } 1 0 \ \mathrm { K / m m } & \text{columnar dendrites, 40\% diluted, anisotropic} \\
\text{Coarse-grain HAZ} & 1 1 0 0 ^ { \circ } \mathrm { C } \text{ to solidus} & \text{grains grow for seconds at } 1 3 0 0 \ \mathrm { ^ \circ C } & \text{brittle; the toughness-limiting zone} \\
\text{Fine-grain HAZ} & A _ { c 3 } \text{ to } 1 1 0 0 \ \mathrm { ^ \circ C } & \text{full re-austenitising, fine re-nucleation} & \text{often better than the parent} \\
\text{Intercritical HAZ} & A _ { c 1 } \text{ to } A _ { c 3 } & \text{partial transformation, mixed bands} & \text{inhomogeneous, a crack path} \\
\text{Subcritical / overaged} & \text{below } A _ { c 1 } & \text{tempering, precipitate coarsening} & \text{soft in a precipitation-hardened alloy}
\end{array}
$$

**Dilution** is the fact that the weld metal is part filler and part melted parent: with a dilution $D$ (typically 0.25 for a high-deposition process, 0.6-0.8 for a shallow GTAW root pass),

$$
C _ { \text{weld } } \; = \; ( 1 - D ) \, C _ { \text{filler } } + D \, C _ { \text{parent } }
$$

and between the weld metal and the parent there is a **mixed zone** a grain or two wide in which the composition runs continuously from the parent to the nominal weld. That few-hundred-micrometre band is where a dissimilar-metal weld fails, where the hard constituent appears when welding a high-carbon steel with a low-alloy filler, and where a stainless weld on a carbon steel makes martensite hard enough to crack.

Finally, the **solidification structure**: the weld pool is one of the fastest-cooling castings in industry ($1 0 ^ { 3 } { - } 1 0 ^ { 6 } \ \mathrm { K / s }$ at the fusion line), it solidifies epitaxially off the parent grains so the whole weld is a bundle of columnar crystals growing away from the fusion line, and it therefore has a **texture and anisotropy** — a rolled plate weld is 20-40 % weaker and far less tough across the columnar grains than along them, which is why a weld is never specified as "same strength as parent" and always as "meets $X \ \mathrm { M P a }$ , $Y \ \mathrm { J }$ at $Z \ \mathrm { ^ \circ C }$ , by test".
:::

::: proof How wide is the heat-affected zone? {#proof-haz}
A heat source moving at speed $v$ leaves behind it a wake in which the temperature of a material point falls roughly exponentially with the distance $x$ it has travelled away from the arc. For a line source (a long, straight weld in a plate thick enough that the heat flows two-dimensionally) the wake is

$$
T ( x ) - T _ { 0 } \; \approx \; \left( T _ { p } - T _ { 0 } \right) \exp \left( - { \frac { v x } { 2 \alpha } } \right)
$$

where $\alpha = \lambda / \rho c$ is the thermal diffusivity (about $6 \ \mathrm { m m ^ { 2 } / s }$ for steel, $8 5 \ \mathrm { m m ^ { 2 } / s }$ for aluminium) and $T _ { p }$ is the peak temperature on the axis. The useful thing about the wake is that **the distance between any two isotherms does not depend on the peak temperature at all**: if $T _ { 1 }$ and $T _ { 2 }$ occur at $x _ { 1 }$ and $x _ { 2 }$ ,

$$
\frac { T _ { 1 } - T _ { 0 } } { T _ { 2 } - T _ { 0 } } \; = \; \exp \left( \frac { v ( x _ { 2 } - x _ { 1 } ) } { 2 \alpha } \right) \qquad \Longrightarrow \qquad \boxed { \; w _ { 1 2 } \; = \; { \frac { 2 \alpha } { v } } \, \ln \frac { T _ { 1 } - T _ { 0 } } { T _ { 2 } - T _ { 0 } } \; }
$$

For steel at $v = 5 \ \mathrm { m m / s }$ , taking the fusion line at $1 5 0 0 \ \mathrm { ^ \circ C }$ and the lower edge of the transformation HAZ at $7 5 0 \ \mathrm { ^ \circ C }$ with $T _ { 0 } = 2 5 \ \mathrm { ^ \circ C }$ ,

$$
w \; = \; { \frac { 2 \times 6 } { 5 } } \ln { \frac { 1 4 7 5 } { 7 2 5 } } \; = \; 2 . 4 \times 0 . 7 1 \; = \; 1 . 7 \ \mathrm { m m }
$$

**which is the right order of magnitude for an arc weld, and the two scalings it contains are the ones to remember.** The HAZ is **inversely proportional to travel speed** — which is why a laser weld at $2 \ \mathrm { m / m i n }$ has a heat-affected zone you need a microscope to find, and a manual oxyfuel weld has one you can read with a ruler. And it is **proportional to diffusivity** — which is why aluminium, with fourteen times the diffusivity of steel, has a *wider* heat-affected zone at the same speed even though it is far easier to weld thin. **The exponential wake also explains the one number that matters most for hardness: the cooling rate at the fusion line is $v ( T _ { p } - T ) / 2 \alpha$ , so a fast weld cools fast, and a fast weld in a hardenable steel makes martensite.**
:::

::: example Is it weldable? The carbon equivalent {#ex-ce level=3 check="0.56"}
A pressure-vessel shell is $2 2 \ \mathrm { m m }$ of a steel whose analysis is $0 . 2 2 \ \mathrm { C }$ , $1 . 2 \ \mathrm { M n }$ , $0 . 2 5 \ \mathrm { C r }$ , $0 . 1 5 \ \mathrm { M o }$ , $0 . 1 0 \ \mathrm { V }$ , $0 . 4 0 \ \mathrm { N i }$ , $0 . 2 0 \ \mathrm { C u }$ . Should it be preheated?

$$
\mathrm { C E } \; = \; \mathrm { C } + { \frac { \mathrm { M n } } { 6 } } + { \frac { \mathrm { C r } + \mathrm { M o } + \mathrm { V } } { 5 } } + { \frac { \mathrm { N i } + \mathrm { C u } } { 1 5 } } \; = \; 0 . 2 2 + 0 . 2 0 + 0 . 1 0 + 0 . 0 4 \; = \; { \bf 0 . 5 6 }
$$

**Weldability: poor.** A carbon equivalent of 0.56 is at the top of the scale, so the procedure calls for a $1 5 0 { - } 2 0 0 \ \mathrm { ^ \circ C }$ preheat with an interpass cap of $2 5 0 \ \mathrm { ^ \circ C }$ , low-hydrogen consumables dried at $3 0 0 \ \mathrm { ^ \circ C }$ , the smallest weld that will do the job, and a two-hour $2 5 0 \ \mathrm { ^ \circ C }$ post-heat if the joint is heavily restrained. **The other answer, and the one a designer should have given first, is to specify an HSLA grade at CE 0.40 that needs none of this.**
:::

## 2. The processes

::: definition The arc processes, and what each one is for {#def-arc}
An arc is a 6000 K column of ionised gas 2-4 mm long at 17-40 V and 50-1600 A. Everything that distinguishes the arc processes is **how the molten metal is kept from oxygen and nitrogen, how the filler is delivered, and how much of the arc's power the work accepts.**

$$
\begin{array} { l l l l l l }
\textbf{Process} & \textbf{Shield} & \textbf{Filler} & \textbf{Deposit} & \textbf{Typ. } E \ [ \mathrm { J / m m } ] & \textbf{For} \\ \hline
\text{SMAW (stick)} & \text{burning flux sleeve} & \text{the rod} & 1 { - } 3 \ \mathrm { k g / h } & 5 0 0 { - } 2 0 0 0 & \text{site, thick, any metal, no wind} \\
\text{GMAW (MIG/MAG)} & \text{gas (Ar/CO}_2) & \text{spooled wire} & 2 { - } 8 \ \mathrm { k g / h } & 3 0 0 { - } 1 5 0 0 & \text{production, 1-10 mm, robot} \\
\text{FCAW} & \text{gas or self-shielded} & \text{tubular wire} & 3 { - } 1 0 \ \mathrm { k g / h } & 6 0 0 { - } 2 5 0 0 & \text{shipyards, site, high rate} \\
\text{GTAW (TIG)} & \text{inert gas} & \text{hand-fed or none} & 0 . 3 { - } 1 \ \mathrm { k g / h } & 1 5 0 { - } 6 0 0 & \text{roots, thin, stainless, Ti, quality} \\
\text{SAW} & \text{a 40 mm flux blanket} & \text{bare wire, 1-4} & 5 { - } 2 0 \ \mathrm { k g / h } & 2 0 0 0 { - } 6 0 0 0 & \text{long straight seams, 10-100 mm} \\
\text{Stud} & \text{ceramic ferrule} & \text{the stud itself} & 4 0 0 / \mathrm { h } & 1 0 0 { - } 4 0 0 & \text{shear connectors, cladding}
\end{array}
$$

Four details of this table are worth more than the table. **(1) The shielding gas is a process parameter, not a consumable**: argon-18 % carbon dioxide gives a cool, penetrating, spray-transfer arc on steel; pure carbon dioxide is hotter, more oxidising, cheaper and spattery; argon-2 % oxygen wets stainless beautifully; helium raises the arc voltage and is used for thick aluminium and copper; and carbon dioxide is chemically incompatible with aluminium, magnesium and titanium, which is why those metals are welded in argon or helium only. **(2) The metal-transfer mode of GMAW is a phase transition**: below about 180 A the wire shorts against the pool twenty times a second (clean, cool, good for thin sheet, low deposition); above the critical current for the diameter the metal goes over as a fine spray at 70 m/s (smooth, deep, high rate, and unusable below 4 mm because it burns through); pulsed-spray puts one droplet on one pulse and buys spray transfer at half the heat. **(3) Submerged arc is the deposition champion and the position prisoner** — 1600 A through a bare wire under a blanket of fused slag, 99 % of the metal and the arc heat going into the joint, no light, no fume, no spatter, and a weld that must run downhill in the flat position or it falls out. **(4) Tungsten inert gas is the process you use when the answer must be right**: the arc is struck on a non-consumable electrode, the filler is dipped in by hand or pushed by a machine, and the deposition rate is a fifth of metal arc's — but it is the only arc process with no flux, no spatter and no oxygen pickup, so it does the root pass of every pipe weld and every titanium and aluminium joint in the world.

**Positions** are the other half of the cost. A weld the molten pool falls *into* (flat, PA/1G) can be run at any current with a deep, wet, cheap bead; a weld the pool falls *out of* (overhead, PE/4G) must be run cold, small and fast, at a third of the rate, by a better-qualified welder, and it is the reason a frame designed to be welded flat costs 40 % less than the same frame designed to be welded on its side. **The pipe welder's qualification test is the 6G position — a 45° fixed pipe, so the welder passes from flat through vertical to overhead without being allowed to turn the work — and a welder qualified on 6G in a given process and material is qualified for everything easier.**
:::

::: definition Resistance, solid-state, and beam welding {#def-solid}
**Resistance welding** generates the heat where you want it, by Joule heating at the one place in the circuit with a deliberately high resistance: $Q = 0 { . } 2 4 I ^ { 2 } R t$ joules, with $I$ of 4-15 kA from a water-cooled copper tip at 4-8 kN, for 100-200 ms. **Spot welding** two sheets of car-body steel makes a 5-6 mm molten nugget in a fifth of a second with no filler, no gas, no skill and no fume, at 40-60 spots a minute on a transfer line; the nugget diameter must be at least $4 { \sqrt { t } }$ to $5 t$ or it pulls out, and its strength is the nugget's shear around its own circumference,

$$
F \; \approx \; \sigma _ { \text{UTS } } \, \pi d t
$$

which for a 1.5 mm, 380 MPa sheet with a 5.5 mm nugget is about 10 kN. The defects are all about the current and the force: **expulsion** (too much current, the pool blows out and leaves a porous, spattered joint), **a cold weld** (too little current, or too much force, so the interface never melts and the "nugget" is a cold chisel's width of contact), and **electrode indentation and wear**, which is why the tip is dressed every few hundred spots and why the weld current must be monitored cycle by cycle. **Seam welding** (rolling copper wheels) makes the leak-tight lap of a fuel tank or a beverage can; **projection and emboss welding** make the twenty spots of a bracket in one 20 kVA pulse; **upset and flash butt welding** make the rail — 100 m of continuous track welded from 300 m lengths, with the flash rolled off and the joint normalised in line.

**Solid-state processes** never melt anything, so they inherit none of the casting's problems — no segregation, no porosity, no dilution, no martensite, and joints in dissimilar metals that are thermodynamically impossible to fuse. **Friction welding** spins one part against the other at 10-30 kN until the interface reaches 0.8 of the melting point and goes plastic, then upsets it at 40 kN; it joins a 60 mm axle to a 40 mm shaft in 4 s, and the joint is as strong as the weaker part. **Friction stir welding**, invented at the Welding Institute in 1991, plunges a shouldered tool of hardened steel or cubic boron nitride into the seam, spins it at 200-1000 rpm, and drags a tonne of plasticised metal around the pin: the result is a forged, fine-grained, 0.8-of-base-strength joint in 25 mm of aluminium or 12 mm of steel with no filler, no fume, no arc flash, and 5 % of the shrinkage of a fusion weld — which is why the space-shuttle tank, the A350's fuselage panels, the ship's aluminium superstructure and the heat-sink industry are all friction-stir welded. **Diffusion bonding** holds two flat parts at 0.5 of the melting point under 5-20 MPa in a vacuum for hours, and the interface disappears atom by atom; it makes sandwich structures, honeycomb-faced sheet, and titanium-to-steel joints with an interlayer, and its tolerance is a flatness of a few micrometres over the whole bond area. **Ultrasonic welding** rubs two laps together at 20 kHz and 1 kN until the oxide breaks up and the metals weld; it makes every battery tab, every wire terminal and 90 % of the world's plastic packaging (where it is really localised melting). **Roll, explode, and cold welding** are the exotic tail: the bimetal strip rolled from two ingots, the explosive cladding of 10 mm of titanium onto a 40 mm steel reactor shell, and the cold-welded aluminium terminal.

**Beam processes** trade the arc's 10 MW/m³ for a focused 10⁹-10¹² W/m². **Electron beam** welding fires 30-150 kV electrons in a vacuum; the beam is focused to 0.1 mm, the metal vapourises and blows a **keyhole** straight through the section, and the weld is 100 mm deep and 1 mm wide in one pass with 0.1 mm of heat-affected zone — for which you pay for the vacuum chamber, the joint fit-up of 0.05 mm, and the 30 % of the beam energy that becomes X-rays. **Laser welding** does the same with a 1-20 kW fibre or $\mathrm { C O } _ { 2 }$ beam, in air, at 1-6 m/min, through optics — and its real industrial form is the **laser-hybrid** head, which adds a MIG arc to the keyhole to bridge the fit-up gap the laser cannot tolerate. **The economics are simple: a beam process buys speed and a heat-affected zone a fifth of an arc's, and pays for it in capital cost, fit-up tolerance and joint-access optics; it wins when the volume is high, the section is thick, or the component is thin and distortion-critical.**
:::

::: example Heat input and what it does to the joint {#ex-heat level=3 check="600"}
A manual steel-electrode (SMAW) root pass runs at $2 5 \ \mathrm { V }$ , $2 0 0 \ \mathrm { A }$ and $5 \ \mathrm { m m / s }$ , with $\eta = 0 . 6$ . A submerged-arc seam in the same plate runs at $3 6 \ \mathrm { V }$ , $1 2 0 0 \ \mathrm { A }$ , $8 \ \mathrm { m m / s }$ , $\eta = 0 . 9$ . A 6 kW fibre-laser weld runs at $2 \ \mathrm { m / m i n }$ with an absorption of 0.35.

$$
E _ { \text{SMAW } } = { \frac { 0 . 6 \times 2 5 \times 2 0 0 } { 5 } } = { \bf 6 0 0 \ J / m m } , \qquad E _ { \text{SAW } } = { \frac { 0 . 9 \times 3 6 \times 1 2 0 0 } { 8 } } = 4 8 6 0 \ \mathrm { J / m m } , \qquad E _ { \text{laser } } = { \frac { 0 . 3 5 \times 6 0 0 0 } { 3 3 . 3 } } = 6 3 \ \mathrm { J / m m }
$$

**Eighty times the heat input between the laser and the submerged arc, and the consequences run through everything.** At 63 J/mm the laser weld cools through the $8 0 0 { - } 5 0 0 \ \mathrm { ^ \circ C }$ window in a fraction of a second, so in a hardenable steel it makes martensite and in a stainless it does not; at 4860 J/mm the submerged arc takes half a minute, the grains grow, the toughness falls, and the plate must be preheated and the filler over-alloyed. At 600 J/mm the manual weld is the compromise everybody lives with. **And the distortion scales with the same number: the transverse shrinkage of a weld is roughly proportional to its heat input per unit thickness, which is the entire reason the shipyard uses submerged arc and the aerospace house uses laser and friction stir.**
:::

## 3. Weldability: what the metal does when you melt it

::: definition Steels, stainless, aluminium, titanium, cast iron, copper {#def-weld}
**Carbon and low-alloy steels** are the majority of all welding and their story is one sentence: *the cooling rate decides whether you get martensite, and martensite plus hydrogen plus restraint gives cold cracking 24-48 hours later.* The controls are the four levers of the carbon-equivalent example — preheat (which slows the cooling and lets hydrogen diffuse out), a **low-hydrogen** electrode (an H4 basic consumable with under $4 \ \mathrm { m l / 1 0 0 \ g }$ of diffusible hydrogen, kept in a heated cabinet, never in a damp shed), a **post-heat at $2 5 0 { - } 3 0 0 \ \mathrm { ^ \circ C }$ for two hours** to bake the hydrogen out before it can collect at a notch, and a **post-weld heat treatment at $6 0 0 { - } 6 5 0 \ \mathrm { ^ \circ C }$** (one hour per $2 5 \ \mathrm { m m }$ of thickness) to temper the martensite and relieve the residual stress — the last being the only one of the four that does the stress as well as the hardness. **Hot cracking** is the other steel problem: a film of low-melting sulphide or phosphide eutectic tears open in the solidification range, and the cure is a controlled manganese-to-sulphur ratio above 20, a filler with 3-8 % manganese to sinter the last droplets together, and a bead shape wider than deep so the dendrites meet in the middle instead of forming a centreline plane of weakness.

**Austenitic stainless steels** have three problems of their own. **Sensitisation**: held between 550 and $8 0 0 \ \mathrm { ^ \circ C }$ — which the heat-affected zone of every stainless weld most certainly is, for seconds — chromium carbide precipitates on the grain boundaries and leaves them below the 12 % chromium that makes the steel stainless, so the joint is eaten intergranularly in acid. The cures are an "L" grade below $0 . 0 3 \ \ \%$ carbon, a **stabilised** grade with titanium (321) or niobium (347) to tie up the carbon instead, or a solution anneal at $1 0 5 0 \ \mathrm { ^ \circ C }$ and a water quench. **Hot cracking**: austenitic weld metal has a short freezing range and a columnar structure, so it is notch-sensitive to sulphur, and the answer is the **Schaeffler, DeLong or WRC diagrams**, which plot chromium-equivalent against nickel-equivalent and show that a fully austenitic weld cracks while the same weld with 4-12 % **delta ferrite** does not — the ferrite soaks up the sulphur and breaks up the dendrites. This is why a 308 filler on a 316 parent is deliberately over-alloyed, and why the welder's feritscope reading of 5-10 is a specification requirement and not a preference. **And heat tint**: the rainbow oxide on a stainless weld is itself chromium-depleted and must be removed by pickling in nitric-hydrofluoric gel or by electrocleaning, or the "stainless" weld will rust within a month.

**Aluminium** is welded more than any other metal after steel, and it fights back on five fronts: an **oxide** $\mathrm { A l } _ { 2 } \mathrm { O } _ { 3 }$ that melts at $2 0 5 0 \ \mathrm { ^ \circ C }$ and floats in the pool as a cold inclusion (hence the alternating-current cleaning action in TIG, and the wire brush and the chemical etch before welding); **hydrogen porosity**, because liquid aluminium dissolves twenty times as much hydrogen as solid and the pool freezes in a second (hence dry, clean, oil-free wire and no humidity); **a thermal conductivity three times steel's**, which needs a bigger machine and preheat on thick sections; **no colour change before melting**, so the welder cannot see the metal about to fall through; and above all **the loss of heat treatment**. A welded joint in a precipitation-hardened 6xxx or 2xxx alloy has a heat-affected zone that has been solution-treated by the weld and now sits at **T4**, roughly half the yield strength of the base metal, over a zone several times wider than the visible discolouration; the non-heat-treatable 5xxx alloys recover nothing and lose their work hardening in the same way. **The designer's options are: use a 5xxx alloy and design to the as-welded strength; use a 6xxx alloy and accept T4 in the HAZ; or weld it, then solution-treat and age it afterwards — which is possible, expensive, and distorts the assembly.**

**Titanium** welds beautifully in argon and catastrophically in air: above $6 0 0 \ \mathrm { ^ \circ C }$ it takes up oxygen, nitrogen and hydrogen so eagerly that the weld surface tells you the whole story in colour — **straw and silver are acceptable, light blue is marginal, dark blue and purple mean reject, and grey, white or powdery means the metal has absorbed so much gas that it is a brittle alpha case that will crumble.** Hence the trailing and purging gas, the inflatable dam inside the tube, the local copper chill block, and on critical work a sealed chamber with the oxygen monitored below 1000 ppm. **Cast iron** is welded as a repair and not as a fabrication: a nickel or nickel-iron filler at low current, a $2 0 0 { - } 4 0 0 \ \mathrm { ^ \circ C }$ preheat, short peened passes kept below $1 5 0 \ \mathrm { ^ \circ C }$ between passes, and a slow cooled under lime — because the fast cooling the graphite demands makes a white, uncuttable cementite weld, and the slow cooling the restraint demands makes martensite in the heat-affected zone, and the welder spends the whole job between those two failures. **Copper and its alloys** need three times the current of steel for the same section because they conduct the heat away, a $2 0 0 { - } 4 0 0 \ \mathrm { ^ \circ C }$ preheat, and deoxidised or oxygen-free material — and copper must never be allowed to touch steel near a weld, because liquid copper diffuses into austenite at $9 0 0 \ \mathrm { ^ \circ C }$ and cracks it along the grain boundaries: **copper disease**, which is why a welding shop forbids copper earth-clamps and copper-plated fixtures on the steel line.
:::

::: example Dilution and the ferrite number {#ex-dilution level=3 check="22.2"}
A $1 2 \ \mathrm { m m }$ plate of 316L ( $1 8 \ \mathrm { C r }$ , $1 2 \ \mathrm { N i }$ , $2 . 5 \ \mathrm { M o }$ , $0 . 0 2 \ \mathrm { C }$ , $1 . 8 \ \mathrm { M n }$ , $0 . 5 \ \mathrm { S i }$ ) is welded with a 308L filler ( $2 2 \ \mathrm { C r }$ , $1 2 \ \mathrm { N i }$ , $0 . 5 \ \mathrm { M o }$ ) at a dilution of 0.40. What is the weld metal's chromium and nickel equivalent, and is it safe?

$$
\begin{array} { l }
\mathrm { C r } _ { \text{wm } } = 0 . 6 \times 2 2 + 0 . 4 \times 1 8 = 2 0 . 4 , \qquad \mathrm { N i } _ { \text{wm } } = 0 . 6 \times 1 2 + 0 . 4 \times 1 2 = 1 2 . 0 , \qquad \mathrm { M o } _ { \text{wm } } = 0 . 4 \times 2 . 5 = 1 . 0 \\ [4pt]
\mathrm { C r } _ { \text{eq } } = \mathrm { C r } + \mathrm { M o } + 1 . 5 \mathrm { S i } = 2 0 . 4 + 1 . 0 + 0 . 8 = { \bf 2 2 . 2 } , \qquad \mathrm { N i } _ { \text{eq } } = \mathrm { Ni } + 3 0 \mathrm { C } + 0 . 5 \mathrm { M n } = 1 2 . 0 + 0 . 9 + 0 . 9 = 1 3 . 8
\end{array}
$$

**The point (22.2, 13.8) on the Schaeffler diagram sits in the austenite-plus-ferrite field at about 6-8 % delta ferrite — inside the 4-12 % window the code asks for, so the weld will not hot-crack.** **Two traps in the arithmetic.** The first is the $3 0 \mathrm { C }$ term: carbon is thirty times as effective as nickel as an austenite stabiliser, which is exactly why a low-carbon "L" filler is not merely a corrosion precaution but a metallurgical one, and why welding a stainless to a carbon steel with a 309 filler produces martensite at the dilution front. The second is that the dilution is not a constant: a shallow tungsten inert gas root pass runs at 0.2 and a hot submerged-arc fill at 0.7, so **the ferrite content varies through the thickness of a multi-pass weld, and the specification must be met by the root, which is where the cracking starts.**
:::

## 4. Designing the joint

::: definition The rules of welded design {#def-design}
Eleven rules, each of which is the memory of a failure:

1. **Put the weld in shear, never in tension across the throat.** A fillet weld's throat is $0 . 7 0 7 s$ and its allowable shear is about $0 . 6 f _ { u } / { \sqrt { 3 } }$ ; the same weld loaded perpendicular to its throat is a notch-loaded casting and its allowable falls by half.
2. **Keep the weld out of the highest-stress region and out of the machining.** A weld in the flange of a beam at mid-span is a weld at the fatigue limit; the same weld moved to the neutral axis at the support costs nothing.
3. **Make the load path continuous.** A plate that must carry 500 kN needs its weld, its gusset, its tab and its parent plate in line; a load that turns a corner through a weld turns it through a notch.
4. **Detail the weld toe.** The fatigue strength of a fillet weld is set by the angle at which the weld runs out into the plate: a 60° weld toe is better than a 120° one, a re-melted or TIG-dressed toe is worth 30-40 %, and a ground-flush toe with a radius is worth a factor of two.
5. **Symmetry about the neutral axis.** Welds shrink towards themselves, so place them symmetrically about the section's neutral axis and about the plate's mid-plane, and the part comes out straight.
6. **Allow for the process's reach.** A torch is a cone; specify a weld you can show a welder how to make, with the access angle, the stick-out, the purge gas and the backing bar drawn on the sheet.
7. **Do not clamp a joint while it shrinks.** A weld that is free to contract shrinks and yields; a weld that is rigidly clamped shrinks and cracks. Tack, release, and let it move.
8. **Avoid through-thickness loading of plate.** Plate is a laminated material; a fillet whose throat is pulled normal to the surface should be replaced by a plate that goes through, a cast node, a pre-drilled and reamed hole, or Z-quality plate with a guaranteed through-thickness reduction of area.
9. **Continuous for fatigue and leak, intermittent for static.** An intermittent fillet is a series of crack starters in a fatigue structure and a leak path in a vessel; it is legitimate only where the load is static, the joint is stiff, and the weld exists to stop buckling.
10. **Make the thickness change gradual.** A weld between plates of different thickness needs a taper of 1 in 4 or a stepped offset, or the section change is a stress raiser that dominates the weld's own.
11. **Design the inspection with the joint.** A full-penetration butt in a plate girder is 100 % ultrasonically tested; a fillet is visually tested and its size is what the drawing says, so the drawing must say it in millimetres of leg, not "weld all round".
:::

::: example Fillet weld size {#ex-fillet level=3 check="94"}
A bracket must carry a 180 kN shear into a column through a double fillet weld along a vertical plate $2 0 0 \ \mathrm { m m }$ wide. The steel is S355 and the filler is a 490 MPa basic consumable with $\gamma _ { \mathrm { M } 2 } = 1 . 2 5$ .

$$
\tau _ { \text{allow } } = { \frac { f _ { u } } { { \sqrt { 3 } } \, \gamma _ { \mathrm { M } 2 } } } = { \frac { 4 9 0 } { 1 . 7 3 2 \times 1 . 2 5 } } = 2 2 6 \ \mathrm { M P a } , \qquad F ^ { \prime } = 0 . 7 0 7 \times 6 \times 2 2 6 = 9 6 0 \ \mathrm { N / mm \ per \ weld}
$$

$$
L \; = \; { \frac { 1 8 0 { , } 0 0 0 } { 2 \times 9 6 0 } } \; = \; { \bf 9 4 \ mm \ per \ side}
$$

**Two welds of 94 mm will carry it statically — and the answer is still wrong.** The effective length of a fillet excludes an effective throat's worth at each end, the weld must run past the plate corner, and 180 kN on a bracket is almost certainly a load that cycles: at a detail category of 80 MPa at two million cycles, the same bracket in a crane or a vehicle needs a weld whose *fatigue* strength is checked, which for a 6 mm double fillet means the full 200 mm and a toe that has been TIG-dressed. **And the 6 mm leg itself is a decision: below about 5 mm a manual fillet is hard to make sound in a root gap, and above 8 mm the welder has put 25 mm² of deposited metal into a joint whose strength is now governed by the parent plate. The most common weld on a drawing is a 6 mm fillet, and the most common reason is that the drawing says "6 mm fillet all round".**
:::

::: definition Fatigue: why the steel grade does not matter {#def-fatigue}
A welded joint's fatigue strength is not a material property. It is a **geometrical property of the detail**, tabulated in every code as a **detail category** — the nominal stress range that the detail survives in $2 \times 10 ^ { 6 }$ constant-amplitude cycles, with a slope of $m = 3$ for steel on the $\log \Delta \sigma$ versus $\log N$ plot:

$$
N \; = \; 2 \times 1 0 ^ { 6 } \left( { \frac { F _ { c } } { \Delta \sigma } } \right) ^ { 3 } \qquad \Longleftrightarrow \qquad \Delta \sigma \; = \; F _ { c } \left( { \frac { 2 \times 1 0 ^ { 6 } } { N } } \right) ^ { 1 / 3 }
$$

$$
\begin{array} { l c l l c l }
\textbf{Cat.} & \textbf{Detail} & F _ { c } \ [\mathrm { M P a }] & \textbf{Cat.} & \textbf{Detail} & F _ { c } \ [\mathrm { M P a }] \\ \hline
\text{160} & \text{parent plate, flame-cut edge} & 1 6 0 & \text{71} & \text{longitudinal stiffener, } e > 2 5 \ \mathrm { m m } & 7 1 \\
\text{140} & \text{ground-flush butt, 100\% examined} & 1 4 0 & \text{63} & \text{transverse stiffener, } e > 2 5 \ \mathrm { m m } & 6 3 \\
\text{125} & \text{transverse butt weld, as-welded} & 1 2 5 & \text{50} & \text{cruciform, fillet } e \leq 2 5 \ \mathrm { m m } & 5 0 \\
\text{100} & \text{longitudinal fillet, } e \leq 2 5 \ \mathrm { m m } & 1 0 0 & \text{45} & \text{cruciform with root notch} & 4 5 \\
\text{80} & \text{transverse stiffener, } e \leq 2 5 \ \mathrm { m m } & 8 0 & \text{40} & \text{transverse butt in a hollow section} & 4 0 \\
\text{71} & \text{longitudinal fillet, } e > 2 5 \ \mathrm { m m } & 7 1 & \text{25} & \text{spot weld in shear, } t < 3 \ \mathrm { m m } & 2 5 \\
\end{array}
$$

**Three facts about this table are the whole of welded fatigue.** **First, $F _ { c }$ is the same for S235 and S690** — a higher-strength steel buys you nothing in a welded fatigue detail, which is one of the most expensive things for a designer to learn and one of the most profitable. **Second, the reason is the residual stress**: the weld sits at the yield stress in tension, so a nominally zero-to-zero load cycle is really a mean-stress cycle from $+ \sigma _ { Y }$ down and back, and fatigue under full tension is insensitive to the applied mean stress. **Third, the crack is there from the beginning**: every weld toe is a 0.1-1 mm geometric crack with a root radius of the order of the weld's own surface, so the fatigue life is almost entirely crack *propagation*, and the propagation rate depends on $\Delta K$ and not on the steel's yield strength.

The corollaries are practical. **The stress range, not the maximum stress, is what you count** (hence the Miner sum and the spectrum loading of a crane or a ship). **The category is set by the detail geometry and the examination, not by the weld size** — a bigger weld on a stiffener makes the joint stiffer, the toe sharper, and the category *worse*, which is why the code caps the effective throat at $2 5 \ \mathrm { m m }$ and why a "beef it up" repair of a fatigue crack is the worst possible repair. **And the improvement methods are all about the toe**: TIG remelting (which redraws the toe and puts it into compression), **hammer peening** and **needle scaling** (which shoot 1-3 mm of plastic compression into the surface and buy 40-80 %), **undercutting and re-welding** (a $K$-groove at the toe, then a weld with a 30-45° run-out angle, worth a factor of two), and **ultrasonic impact treatment** on a production line. **All of them work by the same mechanism: a fatigue crack will not grow out of a compressive surface, so you do not strengthen the joint, you bury the crack in compression.**
:::

::: widget plot
title: The fatigue categories: the detail, not the steel
f: 160*pow(2000000/pow(10,x),1/3); 80*pow(2000000/pow(10,x),1/3); 40*pow(2000000/pow(10,x),1/3)
x: 6,8
y: 0,220
labels: category 160 (parent plate); category 80 (transverse stiffener); category 40 (cruciform with root notch)
caption: Stress range against cycles for three welded detail categories, from $\Delta \sigma = F _ { c } ( 2 \times 1 0 ^ { 6 } / N ) ^ { 1 / 3 }$ , with the horizontal axis $\log _ { 1 0 } N$ . **The three lines are parallel, because $m = 3$ is the same for every detail and every steel; the only thing the material and the weld size change is which line you are on, and the vertical distance between them is a factor of four in life at a fixed stress.** Read the two numbers that decide most welded designs: at $2 \times 1 0 ^ { 6 }$ cycles a plain plate takes $1 6 0 \ \mathrm { M P a }$ of stress range and a transverse stiffener takes $8 0 \ \mathrm { M P a }$ — **the weld has halved the joint** — and at $2 \times 1 0 ^ { 8 }$ cycles (a bridge's design life) the same stiffener carries only $3 3 \ \mathrm { M P a }$ , which is why a bridge's fatigue details are designed once, in the model, and never "beefed up" afterwards.
:::

## 5. Distortion and residual stress: the weld does what it likes

::: definition Why every weld is at the yield stress, and what that does to the part {#def-distort}
Molten metal is 1500 °C and the plate an inch away is cold. As the weld pool freezes and cools it wants to contract by a thermal strain of $\alpha \Delta T \approx 12 \times 10 ^ { - 6 } \times 8 0 0 = 1 . 0 \ \ \%$ , and the surrounding tonne of steel will not let it. So the weld goes into tension, the plate next to it goes into compression, and **the whole thing is limited by the yield stress, because the moment the stress reaches it the metal simply stretches and stops the stress rising.** The residual stress in the direction of the weld is therefore, to a first and remarkably good approximation,

$$
\sigma _ { \text{residual } } \; = \; \min \left( E \alpha \, \Delta T , \; \sigma _ { Y } \right) \qquad \text{so that} \qquad \Delta T _ { \text{critical } } = { \frac { \sigma _ { Y } } { E \alpha } } \approx { \frac { 3 5 0 } { 2 . 4 } } \approx 1 5 0 \ \mathrm { ^ \circ C }
$$

**which means every weld in structural steel has been restrained through a temperature drop far bigger than 150 °C and is sitting at the yield stress in tension, whatever the welder did.** The plate either side must be in compression to keep the section in equilibrium, so the residual-stress profile across a butt weld is the classic shape: a tensile plateau at $\sigma _ { Y }$ over the weld and the heat-affected zone, falling through zero to a broad compression at the plate edges. **This single fact explains four things that puzzle every new engineer: why the fatigue strength of a welded joint is independent of the steel grade (the mean stress is already at yield); why a welded frame's dimensions are never what the drawing says (the plate has moved); why a weld will not "relax" in service (it is already at the plateau); and why stress relief works (heating the whole part to $6 0 0 \ \mathrm { ^ \circ C }$ lets the compressed regions creep, and the stress goes to the creep-relaxation level of the metal at that temperature, which is nearly zero).**

The **shrinkage force** a weld can exert is bounded by its own yield stress over its own area, $F \approx \sigma _ { Y } A _ { w }$ — a 6 mm fillet has $1 8 \ \mathrm { m m ^ { 2 } }$ of throat and can pull with $6 \ \mathrm { k N }$ , a 20 mm square-butt weld bead can pull with $1 0 0 \ \mathrm { k N }$ per metre of seam, and a multi-pass weld in a 40 mm plate can pull hard enough to buckle a web. The force produces three characteristic distortions, and each has a different cure:

$$
\begin{array} { l l l l }
\textbf{Distortion} & \textbf{Cause} & \textbf{Size} & \textbf{Control} \\ \hline
\text{Longitudinal shrinkage} & \text{the weld shortens along its length} & 0 . 5 { - } 2 \ \mathrm { m m } \text{ per m of butt} & \text{shrink allowance, weld from the middle out} \\
\text{Transverse shrinkage} & \text{the weld shortens across it} & 1 { - } 3 \ \mathrm { m m } \text{ per weld} & \text{fewer passes, smaller included angle} \\
\text{Angular distortion} & \text{the top of the plate shrinks more than the bottom} & 1 { - } 3 ^ { \circ } \text{ per single-V} & \text{double-V, back-stepping, preview} \\
\text{Buckling / bowing} & \text{the compression beyond the plate's stiffness} & \text{catastrophic, sudden} & \text{symmetry, strongbacks, weld then straighten} \\
\text{Weld-face collapse} & \text{the root gap closes at high current} & 1 { - } 3 \ \mathrm { m m } & \text{root gap allowance, backing, backing bars}
\end{array}
$$

**The hierarchy of controls is fixed and the shop will tell you so in this order: design the weld out (thinner, fewer, intermittent, symmetric); design it symmetric about both axes; put in a preview or a shrink allowance (a 2° preview angle cancels 2° of angular distortion, and 3 mm of length allowance cancels a metre of butt weld); weld in a sequence that walks the heat around the part rather than in one direction (back-stepping, or the "v" and "block" sequences on a plate); clamp it just enough to hold it on the datum and no more; and straighten it afterwards by press, roller, line-heating (a torch line laid beside the weld, which shrinks and pulls the part back), or local peening.** **The one control that never works is clamping harder: a rigidly restrained weld does not stay straight, it cracks.**
:::

::: widget plot
title: The residual-stress profile across a butt weld
f: 2*exp(-pow(x/8,2))-0.42; 1.1*exp(-pow(x/12,2))-0.3; 1
x: -40,40
y: -0.6,1.6
labels: as-welded; after stress relief or peening; the yield stress — the ceiling
caption: Longitudinal residual stress against distance from the weld centreline, in units of the yield stress. **The curve is drawn as the unclipped thermal-elastic answer, and the part of it above the horizontal line is exactly the part that cannot exist: the metal yields, and the real profile is the same curve with its top cut off flat at $\sigma _ { Y }$ over the weld and the heat-affected zone.** Equilibrium then requires the area above the axis to equal the area below, which is why the profile must go compressive at the plate edges — and why a stress-relieved or shot-peened weld (the second curve) is not "stress free" but *redistributed*, with a lower peak tension at the weld and a shallower, more useful compression at the surface. **For a fatigue-critical detail the second curve is worth 40-80 % more life, and it is bought with a $6 2 0 \ \mathrm { ^ \circ C }$ furnace cycle or a train of impact blows, not with a bigger weld.**
:::

::: proof How hot does a weld have to be to yield? {#proof-rescap}
Take a bar of length $L$ , constraint-free at temperature $T _ { \text{ref } }$ , cool it by $\Delta T$ while holding its ends fixed, and let it be elastic-perfectly plastic with yield stress $\sigma _ { Y }$ . The strain the constraint imposes is the strain the free contraction would have produced,

$$
\varepsilon \; = \; \alpha \, \Delta T \qquad \Longrightarrow \qquad \sigma \; = \; E \varepsilon \; = \; E \alpha \, \Delta T \quad \text{provided } \sigma \leq \sigma _ { Y }
$$

so the temperature drop at which the bar first yields is

$$
\Delta T _ { \text{crit } } \; = \; { \frac { \sigma _ { Y } } { E \alpha } } \; = \; { \frac { 6 4 0 } { 2 0 0 { , } 0 0 0 \times 1 2 \times 1 0 ^ { - 6 } } } \; = \; { \frac { 6 4 0 } { 2 . 4 } } \; = \; { \bf 2 6 7 \ \mathrm { ^ \circ C } }
$$

for a 640 MPa high-strength structural steel, and $3 5 0 / 2 . 4 = 1 4 6 \ \mathrm { ^ \circ C }$ for an S355. **A weld cools from its 1500 °C solidification temperature to ambient, and even the metal that never gets above $A _ { c 1 }$ still swings through several hundred degrees, so the criterion is exceeded by a factor of three to ten in every fusion weld ever made.** Three consequences follow immediately. **The residual stress is a material property, not a workmanship one** — you cannot weld your way out of it, only redistribute it. **It scales with $\sigma _ { Y }$ and not with the amount of welding**, so a small, careful, low-current weld in high-strength steel has the same peak residual stress as a sloppy big one, only a smaller zone. **And it is why the fatigue categories are the same for every grade of steel: the mean stress of a "zero-to-tension" cycle is $\sigma _ { Y }$ whatever grade you bought, and the crack does not care what you paid for the plate.**
:::

::: example The straightness bill {#ex-distort level=3 check="146"}
A $1 2 \ \mathrm { m m }$ plate is welded with a single-V butt along one edge of a $1 2 0 0 \ \mathrm { m m }$ panel, and the frame must come out of the jig flat to $2 \ \mathrm { m m }$ . Estimate the residual stress, and decide what to do about the distortion.

$$
\Delta T _ { \text{crit } } = { \frac { 3 5 0 } { 2 0 0 { , } 0 0 0 \times 1 2 \times 1 0 ^ { - 6 } } } = { \bf 1 4 6 \ \mathrm { ^ \circ C } } \qquad \Longrightarrow \qquad \sigma _ { \text{residual } } = \sigma _ { Y } = 3 5 0 \ \mathrm { M P a }
$$

**The weld is at yield, and the panel will bow.** The shrinkage force is $F \approx \sigma _ { Y } A _ { w } = 3 5 0 \times 6 0 = 2 1 \ \mathrm { k N }$ applied at the plate edge, and the panel's resistance to that bending is nothing like its nominal stiffness because the metal next to the weld has itself yielded. **Measured single-V butt welds in $1 2 \ \mathrm { m m }$ plate give 1-3° of angular distortion and 1-2 mm per metre of transverse shrinkage, so a $1 2 0 0 \ \mathrm { m m }$ edge weld on an unsymmetric panel will not hold $2 \ \mathrm { m m }$ by any amount of care at the torch.** The three answers, in the order a good shop offers them: **put a second weld on the opposite edge** (a symmetric pair of welds shrinks into a pure shortening and no bending, and it costs one more pass); **or weld with a 3° preview** and let the shrinkage pull it flat; **or weld, then straighten by line-heating on the concave side with a $\phi 2 0 \ \mathrm { m m }$ torch track and a water-quench behind it**, which is a skilled, cheap, and completely unspecifiable operation. **What the drawing should say is not "weld straight and true" but the distortion that is acceptable, where the datum is, and whether straightening is allowed.**
:::

## 6. Joining without melting anything

::: definition Brazing and soldering: the joint the capillary makes {#def-braze}
Brazing and soldering join two surfaces with a **filler metal that melts below the solidus of the parts**, so the parts never melt, never cast, never quench, and never lose their heat treatment — and the joint is a thin layer of a different alloy between them, held by wetting and diffusion rather than by fusion. The dividing line is conventionally $4 5 0 \ \mathrm { ^ \circ C }$ : below it is **soldering** (a tin-based filler, $1 8 0 { - } 2 2 0 \ \mathrm { ^ \circ C }$ , $3 0 { - } 5 0 \ \mathrm { M P a }$ , and an electrical connection), above it **brazing** (a copper, silver, aluminium or nickel filler at $5 5 0 { - } 1 1 0 0 \ \mathrm { ^ \circ C }$ , and $1 5 0 { - } 3 0 0 \ \mathrm { M P a }$ on steel). The filler does not "glue" the joint: it **wets** the clean metal, and wetting is a surface-energy argument — a liquid wets a solid when its surface energy is lower than the solid's, which is why molten silver on clean copper forms a contact angle of a few degrees and creeps into a gap it cannot see the far end of.

That creep is **capillary action**, and it is the whole of brazing's design rule. The pressure that pulls the filler into a gap of width $\delta$ is $\Delta p = 2 \gamma \cos \theta / \delta$ and the flow that results, against the filler's own viscosity, follows a Lucas-type law,

$$
L \; \sim \; \left( { \frac { \gamma \, \delta \, \cos \theta } { \eta } } \, t \right) ^ { 1 / 2 }
$$

so **the flow distance goes as the square root of the gap** — double the clearance and you get 1.4 times the penetration but a joint that is half as strong, because the filler takes up a coarse structure and the lap carries a lower shear. Hence the design clearance for every brazing alloy, $0 . 0 3 { - } 0 . 0 8 \ \mathrm { m m }$ , quoted as a range and achieved by **making the parts to the clearance at the brazing temperature, not at room temperature** — a steel tube on a brass fitting assembled cold will be loose when hot, and a steel tube on a steel fitting will be tight. **Brazing is a tolerancing process: the joint must be designed as a capillary, with a gap that closes as the filler flows, a land of 3-6 times the thickness, and a way for the air to get out.**

The practical families: **copper-phosphorus** ($7 3 0 \ \mathrm { ^ \circ C }$ , cheap, self-fluxing on copper, and poisonous to nickel and steel, which it embrittles with a phosphide film); **silver-copper-zinc** with 20-45 % silver ($6 2 0 { - } 7 6 0 \ \mathrm { ^ \circ C }$ , the workhorse, flowing to a bright fillet, and subject to **zinc fuming** above $8 0 0 \ \mathrm { ^ \circ C }$ which kills the joint and the welder's lungs); **silver-cadmium** for plumbing (banned); **nickler** (Ni-Cr-B) for carbide tips on steel tooling and for stainless in acid; **aluminium-silicon** (4047, $5 7 7 \ \mathrm { ^ \circ C }$ ) for aluminium, which is the process that makes **every car radiator in the world** — a 3003 core with a 4343 brazing-alloy clad on both faces, jigged in a 30-second continuous furnace at $6 0 0 \ \mathrm { ^ \circ C }$ , 10,000 joints per radiator, no flux residue because the $\mathrm { K A l F _ { 4 } { - } K A l F _ { 3 } }$ flux is left behind as a harmless glass. **Vacuum furnace brazing** with $\mathrm { A g { - } C u { - } T i }$ makes titanium-to-stainless, ceramic-to-metal, and the honeycomb-cooled blade roots, because titanium's own getter action on the active titanium in the filler is what bonds it, and that only works below $1 0 ^ { - 4 }$ mbar. **And the flux is not optional**: it is a salt that dissolves the oxide as it forms, and a brazed joint made without one is a cold lap that looks like a joint.

**Soldering** deserves one paragraph because it is the largest-volume joining process on earth. The eutectic $\mathrm { S n } { - } 3 7 \mathrm { P b }$ melts at a single $1 8 3 \ \mathrm { ^ \circ C }$ , which is why it is the reference; the lead-free replacements ($\mathrm { S n { - } 3 . 0 A g { - } 0 . 5 C u }$ , $2 1 7 { - } 2 2 0 \ \mathrm { ^ \circ C }$ ) were forced on the industry by the 2006 RoHS directive and cost the electronics industry a decade of relearning — higher process temperature, worse wetting, more **tin whiskers** (single-crystal filaments that pure tin grows at room temperature and that short out circuit boards, which is why aerospace still forbids pure tin finishes), and a joint whose **creep** at $1 2 5 \ \mathrm { ^ \circ C }$ is now the lifetime limit of a ball-grid-array on a chip. **A soldered joint is a metallurgical joint with a melting point barely above its service temperature, and every reliability engineer's life is spent on that gap.**
:::

::: example How long a braze? {#ex-braze level=3 check="14"}
A $1 5 \ \mathrm { k N }$ load must be carried by a brazed lap $1 2 \ \mathrm { m m }$ wide, using a silver filler with an allowable lap shear of $9 0 \ \mathrm { M P a }$ .

$$
L \; = \; { \frac { F } { \tau _ { \text{allow } } \, b } } \; = \; { \frac { 1 5 { , } 0 0 0 } { 9 0 \times 1 2 } } \; = \; { \bf 1 4 \ mm }
$$

**Fourteen millimetres of overlap, which is 1.4 times the bar thickness — and the design rule it demonstrates is the one every brazing handbook states as a curiosity and every designer should read as a warning: the useful overlap in a brazed or bonded lap is about $1 { - } 2$ times the adherend thickness, and beyond that the extra length carries almost nothing.** **The reason is the same shear-lag argument as for adhesives (below): the load transfers at the ends of the overlap, and once the whole bar has been loaded the middle of the joint is doing nothing.** **So a brazed joint is designed by the adherend, not by the filler: making the overlap 40 mm instead of 14 mm buys no strength, adds 26 mm of mass and distortion, and gives the flux somewhere to hide.**
:::

::: definition Adhesive bonding: the strongest joint you will ever misuse {#def-adh}
An adhesive transfers load by **being squeezed into a surface at a scale the surface can actually hold**. Three mechanisms contribute and their proportions are the subject of fifty years of argument: **mechanical interlocking** into a roughened surface (which is why abrasion, grit-blasting and a peel-ply are the workhorses of production bonding), **physical adsorption** — van der Waals attraction across a gap of a few nanometres, which is enormous per unit area but only if the adhesive is *that* close to *all* of the metal, which requires it to wet the surface — and **chemical bonding**, from a silane coupling agent or a primer that presents one end to the metal oxide and the other to the resin. **The practical consequence is the one that decides jobs: an adhesive is only as strong as the surface, and the surface is contaminated, oxidised, abraded, machined with a release agent, or handled by a gloved hand in ways that no drawing controls. Nine out of ten bonded-joint failures are surface-preparation failures.** The whole of adhesive technology is therefore a surface technology: the **critical surface energy** test (wipe the surface with inks of known surface tension; the epoxy needs 36-40 mN/m and will not wet a rolled, oiled aluminium at 25), the chromic-acid or sulfuric-acid-sodium-bisulfate etch of aerospace aluminium, the anodic oxidation (CAC and FPL) that grows a 1 μm porous oxide for the resin to key into, the plasma or flame treatment of a polypropylene bumper, and the 30-minute "primer within an hour, bond within eight" window that everybody violates.

The joint design follows from the adhesive's one weakness: **a structural epoxy film has 25-35 MPa of lap shear strength and 3-8 MPa of peel and cleavage strength.** So: **bond in shear, never in peel; make the parts stiff enough that they do not bend the joint open; keep the bondline at $0 . 0 5 { - } 0 . 2 5 \ \mathrm { m m }$ (thicker is weaker in shear because the adhesive's own shear strain is higher at the same load, and thicker also means more defects and more residual stress on cure); provide a positive stop (a metal-to-metal shoulder, a cured-in bead, or a rivet) so the adhesive never carries the assembly's weight or its handling loads; and design the failure to be in the adherend.** The load distribution in a lap is the classic result of **shear lag**: with $G _ { a }$ the adhesive's shear modulus, $t$ and $E$ the adherend's thickness and modulus and $s$ the bondline,

$$
\beta \; = \; { \sqrt { \frac { 2 G _ { a } } { E \, t \, s } } } \qquad \Longrightarrow \qquad { \frac { \tau ( x ) } { \bar { \tau } } } \; = \; { \frac { \beta L } { 2 } } \, { \frac { \cosh ( \beta L x / 2 ) } { \sinh ( \beta L / 2 ) } }
$$

and the load-transfer length is $1 / \beta$ , which for an epoxy on a $1 . 5 \ \mathrm { m m }$ aluminium lap is **2-7 mm**. **A 25 mm overlap is therefore four transfer lengths, and doubling it to 50 mm adds almost no strength while doubling the peel at the ends.** The rest of the process map is short: **film adhesives** (the FMS-310 and Hysol EA9394 class, cured at $1 2 0 { - } 1 8 0 \ \mathrm { ^ \circ C }$ under 0.4 MPa in an autoclave, and the reason an aircraft wing skin-to-stringer bond needs an autoclave the size of a hangar); **two-part pastes** (the 20-60 minute open time of a car body shop, where the adhesive is beaded along the hem flange of a bonnet and cured on the paint line at $1 7 5 \ \mathrm { ^ \circ C }$ for 20 minutes, which is why the adhesive must survive a bake that would boil water out of it); **anaerobics and cyanoacrylates** (the threadlocker and the 5-second fixture, both of which cure only in the absence of oxygen and both of which are brittle); and **the hybrid bonded-riveted joint**, which is what aircraft actually use — the adhesive carries the shear and the fatigue, the rivets arrest the crack and let the panel be removed, and the combination is worth more than twice either.
:::

::: widget plot
title: Shear lag: where a bonded lap actually carries load
f: 0.75*cosh(0.75*x)/sinh(0.75); 2.25*cosh(2.25*x)/sinh(2.25); 4.5*cosh(4.5*x)/sinh(4.5)
x: -1,1
y: 0,5
labels: overlap 10 mm; overlap 30 mm; overlap 60 mm
caption: The shear stress in the bondline, divided by its average value, plotted along the overlap from one end ($x = - 1$ ) to the other ($x = + 1$ ), for $\beta = 0 . 1 5 \ \mathrm { m m ^ { - 1 } }$ — an epoxy film on a thin aluminium lap, with a load-transfer length $1 / \beta$ of $7 \ \mathrm { m m }$ . **The short overlap is nearly uniformly stressed and its full area is working. The 60 mm overlap has its middle carrying one tenth of the average stress and its two ends carrying four and a half times it — and since an adhesive fails at its weakest and highly stressed point, the joint's strength is set by the peaks, not by the area.** **This is why the strength of a bonded lap rises very slowly with overlap beyond about $1 0 / \beta$ , why the failure of a long lap always starts at a corner, and why the correct response to a bonded joint that is "too weak" is a stiffer adherend, a steeper taper, a scarf, or a shorter overlap with better surface preparation — never a longer overlap.**
:::

::: definition Threaded fasteners and rivets: the joint you can undo {#def-thread}
A bolt is not a pin, it is a **spring that squeezes the parts together**, and every property of a bolted joint follows from the preload. Tighten it and 85-90 % of your work goes into the collar friction under the head, 40-50 % of the remainder into the thread helix, and only 10-15 % into stretching the shank — which is why the torque-preload relation is so unreliable,

$$
T \; = \; K \, D \, F _ { i }
$$

with $K$ anywhere between 0.10 (waxed, moly-disulphide) and 0.40 (rusty, or a nylon-patched lock nut), and why a joint specified by torque has a **preload scatter of $\pm 3 0 \ \ \%$ for a $\pm 1 5 \ \ \%$ torque scatter**. The preload itself is set at 60-75 % of the proof load, because below that the joint separates under a modest tension and above that the bolt is at yield and a second tightening breaks it.

$$
\begin{array} { l c c c c }
& \text{Property class} & \sigma _ { \min } \ [ \mathrm { M P a } ] & \sigma _ { 0 . 2 , \min } \ [ \mathrm { M P a } ] & A _ { s } \ [ \mathrm { m m ^ { 2 } } ] \\ \hline
\text{M8} & 8 . 8 & 8 0 0 & 6 4 0 & 3 6 . 6 \\
\text{M12} & 8 . 8 & 8 0 0 & 6 4 0 & 8 4 . 3 \\
\text{M16} & 8 . 8 / 1 0 . 9 & 8 0 0 / 1 0 0 0 & 6 4 0 / 9 4 0 & 1 5 7 \\
\text{M20} & 1 0 . 9 & 1 0 0 0 & 9 4 0 & 2 4 5 \\
\text{M24} & 1 2 . 9 & 1 2 0 0 & 1 1 0 0 & 3 5 3
\end{array}
$$

Two consequences dominate design. **Fatigue:** the bolt and the clamped parts are two springs in parallel, and the bolt only sees the fraction $\Phi = k _ { b } / ( k _ { b } + k _ { m } )$ of any external load change — typically 0.15-0.20 for a long bolt in a thick, soft joint, and 0.4-0.6 for a short bolt in a stiff one. **A bolt that carries 20 % of a 40 kN load cycle has a 16 MPa stress range and an infinite life; the same bolt in a stiff flange has a 45 MPa range and a finite one. This is why a compliant gasket helps a bolted joint's fatigue, why a long bolt is better than a short one, and why a "hard" joint with a thin washer is where the failures are.** **Slip:** a **high-strength friction-grip** (preloaded, slip-critical) connection carries its load in friction, $\mu n F _ { i }$ with $\mu = 0 . 4 { - } 0 . 5$ on a blast-cleaned surface, so the bolts never bear in the hole, there is no slop, no fretting, and the joint behaves as one piece — which is why every steel-framed building and bridge uses them, why they must be installed by **turn-of-nut** (a marked wrench turned $1 / 3$ of a turn past snug, which puts the bolt at yield and is the cheapest reliable preload method there is), by calibrated wrench, or by the **tension-control (twist-off) bolt** whose splined head snaps when the preload is reached.

**Rivets** survive for four reasons. **They cannot loosen** (a solid rivet fills its hole with an interference fit and work-hardens there). **They are fail-safe** — a crack running through a lap stops at the next rivet hole, which is why the airliner industry has never managed to abandon them. **They need no access to both sides at the moment of installation** (the blind and the lockbolt classes, the latter a preloaded collar type that is a structural bolt in disguise). **And they are insensitive to surface condition, oil, paint and the operator.** A solid rivet is cold-upset to a shop head $1 . 5$ times the shank diameter across and $1 . 5$ times high, which is a forming operation with the same metallurgy as a cold heading: the alloy must have the ductility of a 600 series or an annealed 2024, and a 7050 rivet is made, quenched, stored at $- 2 0 \ \mathrm { ^ \circ C }$ , and driven within a shift before it ages in the box. **The trade is honest: a riveted lap is heavier than a welded one, costs three times the assembly labour, and is infinitely easier to inspect, repair in the field, and certify for damage tolerance — which for an airframe with a 25-year service life and a crack-inspection interval has beaten the weight every time.**
:::

::: widget plot
title: Torque is not preload
f: 0.694*x; 0.4167*x; 0.2778*x; 36.7
x: 0,120
y: 0,60
labels: K = 0.12 (lubricated); K = 0.20 (the specified case); K = 0.30 (plated, or slightly rusted); the target preload
caption: Preload against applied torque for an M12 class 8.8 bolt from $F _ { i } = T / K D$ , with the horizontal line the 75 %-of-proof target of $3 7 \ \mathrm { k N }$ . **Read the three torques that all reach the target: 53, 88 and $1 3 2 \ \mathrm { N m }$ , a factor of 2.5, for a bolt that is identical in every way except the state of its surfaces.** **This is why a critical joint is never specified by torque alone: the alternatives are torque-and-angle (yield the bolt, and the angle tells you the stretch), the yield-point method (stop when the torque's slope breaks, which is the bolt reaching yield), hydraulic tensioning (pull the bolt directly, which is how a wind-turbine tower and a large diesel's connecting rod are done), and ultrasonic stretch measurement (measure the transit time of a 5 MHz pulse through the bolt, which gives the extension to a micron and is the only method that actually measures what you care about).**
:::

::: example Bolt it {#ex-bolt level=3 check="211"}
An M16 class 8.8 bolt ( $A _ { s } = 1 5 7 \ \mathrm { m m ^ { 2 } }$ , $\sigma _ { 0 . 2 } = 6 4 0 \ \mathrm { M P a }$ , proof stress $6 0 0 \ \mathrm { M P a }$ ) is tightened to 70 % of proof with $K = 0 . 2$ . What torque, and what does a $\pm 1 5 \ \ \%$ torque scatter do to the clamp force?

$$
F _ { i } = 0 . 7 \times 6 0 0 \times 1 5 7 = 6 5 . 9 \ \mathrm { k N } , \qquad T = 0 . 2 \times 0 . 0 1 6 \times 6 5 { , } 9 0 0 = { \bf 2 1 1 \ N m }
$$

**Two hundred newton-metres, and a $\pm 1 5 \ \ \%$ torque scatter gives $5 6 { - } 7 6 \ \mathrm { k N }$ of clamp — provided $K$ is 0.2, which it is not: a zinc-plated, lightly oiled batch can run $K = 0 . 1 4$ and reach $9 4 \ \mathrm { k N }$ , which is above the proof load, and the bolt will break at the second fitting or the first vibration.** **The fatigue check, which is the one people forget:** if the joint carries an external load cycling from 0 to $5 0 \ \mathrm { k N }$ and the bolt takes $\Phi = 0 . 2$ of it, the bolt's stress range is $0 . 2 \times 5 0 { , } 0 0 0 / 1 5 7 = 6 4 \ \mathrm { M P a }$ , which a **rolled-thread** M16 survives (its detail category is around $1 6 0 \ \mathrm { M P a }$ at $2 \times 1 0 ^ { 6 }$ cycles) and a **cut-thread** M16 in a stiff joint at $\Phi = 0 . 5$ does not, at $1 6 0 \ \mathrm { M P a }$ . **Rolled threads, a fillet radius under the head, and holes $1 \ \mathrm { m m }$ over size so the shank does not bend on assembly: three details worth more than any increase in the bolt's class.**
:::

## Exercises

::: exercise Heat input {#ex-heatinput level=2 check="4080"}
A submerged-arc weld runs at $3 4 \ \mathrm { V }$ , $9 0 0 \ \mathrm { A }$ and $6 \ \mathrm { m m / s }$ with a thermal efficiency of 0.8. Find the net heat input. (Enter J/mm.)
::: solution
$E = 0 . 8 \times 3 4 \times 9 0 0 / 6 = { \bf 4 0 8 0 \ J / m m }$ . **That is a high heat input, and on a $6 0 \ \mathrm { m m }$ pressure-vessel shell it is exactly what is wanted: the slow cooling at $4 \ \mathrm { k J / m m }$ with a $1 5 0 \ \mathrm { ^ \circ C }$ preheat and a low-hydrogen agglomerated flux is how the coarse-grain zone is kept off the toughness floor. The same current on a $6 \ \mathrm { m m }$ sheet would burn straight through, which is the other half of why heat input is a procedure and not a preference.**
:::
:::

::: exercise Heat-affected zone width {#ex-hazw level=3 check="0.8"}
A weld travels at $1 0 \ \mathrm { m m / s }$ in steel with $\alpha = 6 \ \mathrm { m m ^ { 2 } / s }$ . How far apart are the $1 5 0 0 \ \mathrm { ^ \circ C }$ and $8 0 0 \ \mathrm { ^ \circ C }$ isotherms, with the ambient at $2 5 \ \mathrm { ^ \circ C } \mathrm { ? }$ (Enter mm to one decimal place.)
::: solution
$w = ( 2 \times 6 / 1 0 ) \times \ln ( 1 4 7 5 / 7 7 5 ) = 1 . 2 \times 0 . 6 4 4 = { \bf 0 . 8 \ m m }$
:::
:::

::: exercise Carbon equivalent {#ex-ce2 level=2 check="0.45"}
Find the carbon equivalent of $0 . 1 8 \ \mathrm { C }$ , $1 . 1 \ \mathrm { M n }$ , $0 . 2 0 \ \mathrm { C r }$ , $0 . 1 0 \ \mathrm { M o }$ , $0 . 0 5 \ \mathrm { V }$ , $0 . 1 5 \ \mathrm { N i }$ , $0 . 1 0 \ \mathrm { C u }$ , and state whether a preheat is needed on a $3 0 \ \mathrm { m m }$ plate.
::: solution
$\mathrm { C E } = 0 . 1 8 + 1 . 1 / 6 + 0 . 3 5 / 5 + 0 . 2 5 / 1 5 = 0 . 1 8 + 0 . 1 8 3 + 0 . 0 7 + 0 . 0 1 7 = { \bf 0 . 4 5 }$ . **Borderline again: nothing in the analysis demands a preheat, but at $3 0 \ \mathrm { m m }$ the root cools slowly enough to make martensite and the restraint is high, so a sensible procedure calls for a $7 5 { - } 1 0 0 \ \mathrm { ^ \circ C }$ preheat and a low-hydrogen electrode on the strength of the thickness rather than the analysis. Carbon equivalent screens a steel; the joint's crackability is decided by thickness, hydrogen and restraint as well.**
:::
:::

::: exercise Fillet weld length {#ex-fillet2 level=3 check="102"}
A $1 2 0 \ \mathrm { k N }$ load is carried by a single fillet weld with a $8 \ \mathrm { m m }$ leg; the filler has $f _ { u } = 4 5 0 \ \mathrm { M P a }$ and $\gamma _ { \mathrm { M } 2 } = 1 . 2 5$ . Find the required effective length. (Enter mm.)
::: solution
$\tau _ { \text{allow } } = 4 5 0 / ( { \sqrt { 3 } } \times 1 . 2 5 ) = 2 0 8 \ \mathrm { M P a }$ , $F ^ { \prime } = 0 . 7 0 7 \times 8 \times 2 0 8 = 1 1 7 7 \ \mathrm { N / m m }$ , $L = 1 2 0 { , } 0 0 0 / 1 1 7 7 = { \bf 1 0 2 \ m m }$ , and with an effective throat's worth of ineffective length at each end, specify $1 0 2 + 2 \times 6 = 1 1 4 \ \mathrm { m m }$ , say ${ \bf 1 2 5 \ m m }$ . **Note how little the answer moves between a 6 mm and an 8 mm leg (the capacity goes up 33 % ) and how much the fatigue category moves the same weld — which is the argument of §4 in one calculation.**
:::
:::

::: exercise Spot weld strength {#ex-spot2 level=2 check="7.5"}
A resistance spot in $1 . 2 \ \mathrm { m m }$ sheet of $4 0 0 \ \mathrm { M P a }$ tensile strength has a $5 . 0 \ \mathrm { m m }$ nugget. Estimate the tensile-shear load at which the nugget pulls out. (Enter kN to one decimal place.)
::: solution
$F = \sigma _ { \text{UTS } } \pi d t = 4 0 0 \times \pi \times 5 . 0 \times 1 . 2 / 1 0 0 0 = { \bf 7 . 5 \ k N }$ . **In practice the sheet usually fails around the nugget before this, at 60-80 % of it, because the heat-affected zone of a high-strength sheet is softened; and the joint's *fatigue* strength is a tenth of its static strength, which is why a car body's side-impact structure is measured in crashes and not in pull tests.**
:::
:::

::: exercise Braze overlap {#ex-braze2 level=2 check="20"}
A brazed lap $1 0 \ \mathrm { m m }$ wide must carry $1 8 \ \mathrm { k N }$ with an allowable shear of $9 0 \ \mathrm { M P a }$ . Find the overlap, and say whether you would use it.
::: solution
$L = 1 8 { , } 0 0 0 / ( 9 0 \times 1 0 ) = { \bf 2 0 \ m m }$ . **Twenty millimetres is a lot of overlap: if the bar is $4 \ \mathrm { m m }$ thick, the useful overlap is nearer $6 { - } 8 \ \mathrm { m m }$ and the extra length is carrying nothing but peel. The right answer is a $1 0 \ \mathrm { m m }$ overlap with a machined step, or a swaged sleeve that puts the filler in compression, or a transition fit between a $2 0 \ \mathrm { m m }$ spigot and a $2 0 . 0 5 \ \mathrm { m m }$ socket.**
:::
:::

::: exercise Bolt torque {#ex-bolt2 level=2 check="118"}
An M12 class 10.9 bolt ( $A _ { s } = 8 4 . 3 \ \mathrm { m m ^ { 2 } }$ , proof stress $8 3 0 \ \mathrm { M P a }$ ) is tightened to 70 % of proof with $K = 0 . 2$ . Find the torque. (Enter Nm to the nearest newton-metre.)
::: solution
$F _ { i } = 0 . 7 \times 8 3 0 \times 8 4 . 3 = 4 9 . 0 \ \mathrm { k N }$ , $T = 0 . 2 \times 0 . 0 1 2 \times 4 9 { , } 0 0 0 = { \bf 1 1 8 \ N m }$ . **A 10.9 bolt in the same M12 envelope as an 8.8 gives 35 % more clamp for 35 % more torque — and 100 % more sensitivity to $K$ , because at that preload the bolt is nearer yield and a $K$ of 0.14 will break it in the wrench's second revolution. High-tensile bolts are a preload-control problem, not a strength problem.**
:::
:::

::: exercise Derive the residual-stress ceiling {#ex-derive-res level=4 check="175"}
For a steel with $E = 2 0 0 \ \mathrm { G P a }$ , $\alpha = 1 4 \times 1 0 ^ { - 6 } \ \mathrm { K ^ { - 1 } }$ and $\sigma _ { Y } = 4 9 0 \ \mathrm { M P a }$ , find the temperature drop at which a fully restrained weld first yields. (Enter $^ \circ \mathrm { C }$ to the nearest degree.)
::: solution
$\Delta T = \sigma _ { Y } / E \alpha = 4 9 0 / ( 2 0 0 { , } 0 0 0 \times 1 4 \times 1 0 ^ { - 6 } ) = 4 9 0 / 2 . 8 = { \bf 1 7 5 \ \mathrm { ^ \circ C } }$ . **Every fusion weld swings through at least ten times that, so the residual stress is at the yield stress and the only questions left are how wide the tensile zone is and where the balancing compression sits.**
:::
:::

::: exercise Derive the HAZ width {#ex-derive-haz level=4 check="4.3"}
Starting from $T ( x ) - T _ { 0 } = ( T _ { p } - T _ { 0 } ) \exp ( - v x / 2 \alpha )$ , derive $w _ { 1 2 } = ( 2 \alpha / v ) \ln [ ( T _ { 1 } - T _ { 0 } ) / ( T _ { 2 } - T _ { 0 } ) ]$ and evaluate it for $\alpha = 8 5 \ \mathrm { m m ^ { 2 } / s }$ (aluminium), $v = 2 0 \ \mathrm { m m / s }$ , $T _ { 1 } = 6 5 0$ , $T _ { 2 } = 4 0 0$ , $T _ { 0 } = 2 5 \ \mathrm { ^ \circ C }$ . (Enter mm to one decimal place.)
::: solution
Taking the ratio of the two isotherm equations eliminates $T _ { p }$ entirely: $( T _ { 1 } - T _ { 0 } ) / ( T _ { 2 } - T _ { 0 } ) = \exp [ v ( x _ { 2 } - x _ { 1 } ) / 2 \alpha ]$ , hence the result. Numerically, $w = ( 2 \times 8 5 / 2 0 ) \ln ( 6 2 5 / 3 7 5 ) = 8 . 5 \times 0 . 5 1 1 = { \bf 4 . 3 \ m m }$ . **Four millimetres of solution-treated heat-affected zone in aluminium at a speed four times a steel weld's — the diffusivity term wins, and it is why an aluminium welded structure has a soft zone you can measure with a ruler and a steel one has one you measure with a microhardness traverse.**
:::
:::

::: quiz A welded fatigue detail in S690 steel has been found to have insufficient life. Which change works? {#quiz-fatigue}
- [ ] Changing the steel to S960
- [ ] Increasing the fillet weld size from 6 mm to 10 mm
- [x] TIG-dressing or needle-scaling the weld toe to put it into compression
- [ ] Stress-relieving the assembly in a furnace
::: solution
**Only the second family of changes moves the detail category. The steel grade is irrelevant because the residual stress is already at yield; a larger weld makes the toe angle worse and the joint stiffer, and can lower the category; and stress relief removes the residual stress but leaves the 1 mm geometric notch at the toe, which is what is actually controlling the crack.** **TIG remelting, needle scaling, hammer peening and ultrasonic impact treatment all work by the same mechanism — burying the crack starter in 1-3 mm of compression — and are worth 40-80 %.**
:::
:::

::: quiz A titanium gusset comes out of the jig with a grey, dull, powdery weld surface. What does it mean? {#quiz-ti}
- [ ] The surface is fine; it just needs a wire brush
- [ ] The weld is over-penetrated
- [x] The weld has absorbed oxygen and nitrogen and is embrittled — reject it
- [ ] The argon was too pure
::: solution
**Titanium's colour is a gas-intake chart: silver and straw are acceptable, light blue is marginal, dark blue and purple are reject, and grey, white or powdery means an alpha case so full of interstitial oxygen and nitrogen that it is brittle and will crumble.** **The cause is always the shielding, not the welding: no trailing gas, no purge behind the root, a draught in the shop, or a torch whose diffuser is blocked. The cure is a purge box, an inflatable dam in the bore, a copper chill block behind the root, and — on critical work — monitoring the oxygen content of the purge gas.**
:::
:::

## Where this lesson leads

- **[[manufacturing/machining|Machining]]** is what a machined flange costs against a welded one, and what a weld-on-a-machined-datum does to the tolerance stack.
- **[[manufacturing/process-selection|Process selection]]** places the joining processes on the same cost-versus-quantity map as the forming ones.
- **[[manufacturing/casting|Casting]]** and **[[manufacturing/additive-manufacturing|additive manufacturing]]** are the two ways of avoiding a joint altogether by making the part in one piece, and both inherit the weld's own defects: shrinkage, porosity and residual stress.
- **[[materials-science/phase-transformations|Phase transformations]]** is the metallurgy of §1 and §3 — the continuous-cooling-transformation diagram is the reason $t _ { 8 / 5 }$ is the number that matters, and the reason a preheat works.
- **[[materials-science/failure|Failure]]** supplies the fracture mechanics of a weld defect, the fatigue crack growth law behind the detail categories, and the hydrogen and stress-corrosion mechanisms that make a welded joint fail in a way the static calculation cannot predict.
- **[[materials-science/corrosion|Corrosion]]** covers the galvanic pair a steel-to-aluminium joint makes, the crevice under a rivet head, and the sensitised stainless of §3.
- **[[solid-mechanics/fracture-mechanics|Fracture mechanics]]** turns a 6 mm surface crack in a heat-affected zone into a stress level, and a leak-before-break requirement into an inspection interval.
- **[[machine-design/fasteners-joints|Fasteners and bolted joints]]** is where the bolt of §6 becomes a full joint calculation with the gasket, the load plate, the separation criterion and the fatigue check, and **[[design-process/design-for-manufacture|Design for manufacture and assembly]]** is where the choice between a weld, a bond and a bolt becomes a part count, a fastener count and an assembly time.

::: history
**1802.** **Humphry Davy**, having isolated sodium and potassium by electrolysis, passes 100 A through carbon rods in air and describes the arc — the light is the point, and the Royal Institution audience pays to see it; the welding comes forty years later. **1877-1892.** The arc becomes a joint: De Méritens fuses lead and brass with a carbon arc (1881), **N. G. Slawson** welds a ship's hull plate in Brooklyn (1885), and **C. L. Coffin's** 1892 patent for a metal electrode that melts into the joint is the ancestor of every stick electrode made since. **1917-1918.** The first all-welded barges and the first welded boiler tubes; **Hobart and Barnard's** *Arc Welding* (1918) is the first textbook. **1904-1907.** The **covered electrode** arrives: Holstrom and Goldbaum's Swedish patent of 1904, and **Oscar Kjellberg's** coated rods of 1906-07, which found **ESAB**. A cellulose-and-mineral sleeve decomposes into a shielding gas and a slag, which makes the arc stable, keeps the oxygen out and — crucially — lets the weld be made outdoors, in a shipyard, in the rain. **Welding stops being a laboratory curiosity and becomes a construction process.** that makes aluminium, magnesium, titanium and stainless weldable in production; **the submerged arc** is patented in 1935-37 by Jones, Kennedy and Donnell and immediately taken up by the boiler and pressure-vessel trade. **1939-1945.** The **Liberty ships**: 2700 welded-hull vessels built in eighteen months, at one yard in forty-one days, and — from February 1943 — 200 of them cracking, some breaking in two in the North Atlantic. **The investigation creates the fracture-mechanics industry**: Pellini and Roberts' drop-weight test, Griffith's surface-energy argument resurrected, the brittle-to-ductile transition temperature, the crack-arrester strap, the riveted-to-welded argument settled by steel quality rather than by design. **Every fracture mechanics textbook in the world is a footnote to the Liberty ships.** **1940.** **Dearden and O'Neill's** carbon-equivalent formula, published in the *Welding Journal*, gives the shop floor a number to look up before it decides whether to light a preheat torch, and is still on the shop wall eighty years later. **1948.** **Gas metal arc welding** with a bare, reel-fed wire is developed at the Hobart Brothers Company, and the deposition rate roughly doubles; **Union Carbide's** short-circuiting "fast-cycle" arc of 1953 makes thin sheet weldable without burning through. **1950s.** **Resistance welding** and the **automobile**: a modern body is 4000-6000 spot welds made by 5000 kVA guns at 40 a minute, and the moving-spot and projection processes make the fuel tank, the seat frame and the wheel. **1953-1956.** **Chikov at the Paton Institute** patents and demonstrates **friction welding**; **1958-1962.** **Karl-Heinz Steigerwald** patents **electron beam welding** and the first production machines run in Belgium; the laser arrives in 1960 and reaches the welding shop in the 1970s. **1991, October.** **Wayne Thomas, David Williams and Peter Ashley at The Welding Institute** file for **friction stir welding**: a rotating shouldered pin, no arc, no filler, no fume, no solidification, and a joint in 25 mm aluminium that is as strong as the sheet. Within a decade the space shuttle's external tank, the A350's fuselage panels, the S-Boat's hull and the heat-sink industry have moved to it, and it is the only joining process invented in the twentieth century that became a mass-production process within ten years of its invention. **1994-2006.** The **RoHS directive** forces the electronics industry off tin-lead solder, and the resulting decade of relearning — higher reflow temperatures, better board finishes, the creep of a lead-free joint at $1 2 5 \ \mathrm { ^ \circ C }$ , and the return of underfill — is the largest unglamorous materials-engineering programme in manufacturing history. **2000s-2020s.** **Laser-hybrid welding** on ship panels and car bodies, **adhesive bonding** on every aluminium car body (the Audi A8's space frame is laser-welded, bonded and riveted in the same joint), **friction-element and stir-welding** of dissimilar automotive structures, **additive manufacturing** making the "joint" a question of metallurgical bonding rather than of geometry, and the **weld-quality sensor** — the arc-current, acoustic and thermal-imaging monitoring that finally makes a weld an inspectable process rather than an artisanal one.
:::

::: summary
**A weld is a casting and its neighbour is a heat-treated alloy.** The net heat input $E = \eta V I / v$ sets the cooling rate, the cooling rate sets the structure, and the structure sets whether the joint is tough, hard or cracked. The heat-affected zone's width scales as $2 \alpha / v$ , which is why a laser weld has one you cannot see and an oxyfuel weld has one you can.
**Weldability is a number and the number is the carbon equivalent.** $\mathrm { C E } = \mathrm { C } + \mathrm { M n } / 6 + ( \mathrm { C r } + \mathrm { M o } + \mathrm { V } ) / 5 + ( \mathrm { N i } + \mathrm { C u } ) / 1 5$ ; below 0.35 weld freely, above 0.6 preheat, dry the electrode, and post-heat. The enemy is martensite plus diffusible hydrogen plus restraint, and the crack arrives two days later.
**Stainless needs ferrite, aluminium loses its temper, titanium needs argon, cast iron needs patience, copper needs current.** 4-12 % delta ferrite against hot cracking; a 6xxx-T6 heat-affected zone is T4; the colour of a titanium weld is its gas content; nickel electrodes and a $3 0 0 \ \mathrm { ^ \circ C }$ preheat; and three times the amperage, plus no copper anywhere near the joint.
**Every weld sits at the yield stress in tension.** $\sigma _ { \text{res } } = \min ( E \alpha \Delta T , \sigma _ { Y } )$ , and $\Delta T _ { \text{crit } }$ is 150-270 °C, so it is always at the ceiling. That is why welded fatigue strength is a property of the *detail* and not of the steel, why the categories are 160, 125, 80, 63, 45 MPa whatever you bought, and why the only cures are at the toe: dress it, peen it, or bury the crack in compression.
**Distortion is not a workmanship problem either.** A weld shrinks by about 1 % of its own length, the shrinkage force is $\sigma _ { Y } A _ { w }$ , and the part moves. Control it by design (symmetry, fewer passes, smaller included angle), by preview and sequence, and by line-heating afterwards — never by clamping harder.
**Brazing is a capillary and bonding is a surface.** The brazing clearance is $0 . 0 3 { - } 0 . 0 8 \ \mathrm { m m }$ and the useful lap is 1-2 thicknesses; the adhesive needs a surface energy above 36 mN/m, a bondline of $0 . 1 5 \ \mathrm { m m }$ , shear and never peel, and a load-transfer length of a few millimetres that makes a long overlap useless.
**A bolt is a spring and a torque is not a preload.** $T = K D F$ with $K$ from 0.10 to 0.40, so a torque-specified joint has $\pm 3 0 \ \ \%$ scatter in clamp; the bolt sees only $\Phi = k _ { b } / ( k _ { b } + k _ { m } )$ of the external load, which is why a compliant, long-bolt joint has infinite fatigue life and a stiff, short one does not.
:::

## Further reading

- *Welding: Processes and Applications*, and S. Kou, *Welding Metallurgy*, 2nd ed., Wiley, 2003 — the metallurgy of §1 and §3, and the best book on why a weld does what it does.
- N. Ross, *Welding and the Design of Fabricated Structures*, and O. W. Blodgett, *Design of Welded Structures*, AWS, 1990 — the design rules of §4 with the arithmetic to back them, and the source of most of what every fabrication shop knows about distortion.
- D. Radovan, G. Pezzotti and others, *Metallic Trends in the Automotive Industries*, and the **IIW Collection of Welding Research** — the resistance, solid-state and beam processes of §2 in the words of the people who developed them.
- **IIW Recommendations for the Fatigue Improvement of Welded Joints and Structures**, IIW Doc. III-2140, 2003 — the only honest account of what peening, TIG dressing and grinding are actually worth.
- A. F. Bower, *Applied Mechanics of Solids*, and D. K. M. Shu et al., *Fracture Mechanics of Welds*, for the crack at the weld toe; T. L. Anderson, *Fracture Mechanics*, for the defect assessment.
- A. da Silva, R. D. Adams and others, *Strength and Fatigue of Adhesively-Bonded Joints*, and R. D. Adams, *Bonding and Adhesive Technology*, for §6's shear-lag theory done properly.
- *Machinery's Handbook*, and the **AWS Welding Handbook, vol. 1-9**, 9th ed. — the process data, the consumables, the codes, and the acceptance standards; and **EN ISO 5817**, **EN ISO 10025**, **EN 1993-1-9** and **AWS D1.1** for the numbers a drawing must quote.
