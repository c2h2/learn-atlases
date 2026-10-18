Additive manufacturing is the only family of processes in which the part's geometry, its microstructure, and its residual stress are all decided by the same thing: the thermal history of a point in the part as it passes from powder or filament to finished solid. That single fact explains everything that is good about AM and everything that is hard. It is good because a process that builds layer by layer can make geometries no tool can reach — a closed lattice inside a bracket, a cooling channel that follows a turbine blade's surface, a bracket that consolidates twenty machined parts and fourteen fasteners into one piece. It is hard because the same layer-by-layer construction means the part has a grain direction that is not the rolling direction, a surface that is a staircase, a strength that depends on which way you load it, a residual stress that is at the yield point before the part leaves the build plate, and a porosity population that depends on the argon flow rate on a Tuesday afternoon. **A machined billet is a known material in an unknown shape; an AM part is a known shape in a material you have to characterise yourself.**

The engineering question AM asks is never "can the machine print it?" — the machine can print almost anything you give it. The question is: **what are the properties of the thing that comes out, and what do I have to do to the machine, the powder, the atmosphere, the build plate, the post-processing, and the inspection to make those properties reproducible enough to put in an aircraft, a hip implant, or a pressure vessel?** The answer is a long chain of process physics, thermal mechanics, powder metallurgy, and quality control, and the whole of this lesson is about that chain.

::: warning Nine ways AM projects go wrong
**Treating AM as a process rather than a family.** "We are going to 3D-print it" is not a manufacturing decision. FDM at 0.2 mm layers, LPBF at 30 μm layers, binder jetting with 18 % sintering shrinkage, and DED at 5 mm bead width are four different processes with four different design rules, four different property sets, and four different cost structures. **Specify the process family, the machine, the parameter set, the powder lot, and the post-processing route, and then call it AM.** **Designing for the CAD model instead of the as-built part.** The CAD model is a wish. The as-built part has a staircase surface, 45° overhangs that are not 45° because of the melt-pool shape, a 0.4 mm wall that is 0.55 mm because of the laser spot, and a hole that is 0.3 mm undersize because of the partially sintered powder on its surface. **Design to the as-built envelope, not the model, and put the critical dimensions on machined features.** **Ignoring the build direction.** An LPBF tensile bar tested along Z has 60–80 % of the elongation of the same bar tested along X, because the prior-β columnar grains and the lack-of-fusion defects are aligned with the build direction. A lattice that is designed as "isotropic" is not isotropic if it is built on a 45° staircase. **Specify the load direction, then specify the build direction, then specify the post-processing, and then draw the part.** **Not budgeting for post-processing.** The part comes off the plate with supports welded to it, residual stress at yield, a surface roughness of Ra 10–20 μm, and a microstructure nobody wants. Cutting it off the plate, removing the supports, stress-relieving, HIP-ing, machining the critical faces, and inspecting it can cost more than the build itself. **For a typical aerospace LPBF bracket, the build is 30 % of the cost and the post-processing is 70 %.** **Assuming the powder is the material.** Gas-atomised 316L powder is not 316L: it has 200–400 ppm oxygen, a nitrogen content that depends on the atomisation gas, satellite particles that create internal porosity, and a particle-size distribution that changes every time you recycle it. **Specify the powder, the lot, the recycling history, and the oxygen limit, and test the powder before you test the part.** **Skipping the qualification.** A machined 7075-T651 plate has forty years of allowables. An LPBF AlSi10Mg bracket from your machine, with your parameters, your powder, and your post-processing, has the allowables you generate from your own coupons. **If you cannot produce a statistically valid dataset from at least thirty coupons in three orientations and two heat-treat conditions, you do not have a material, you have a prototype.** **Not designing for removal.** A closed cavity with no exit hole traps powder that will never come out. A lattice with 0.2 mm struts and 0.3 mm cells cannot be cleaned. A support inside an internal channel cannot be reached. **Design the powder removal path before you design the cavity, and if you cannot remove the powder, do not make the cavity.** **Over-designing the lattice.** A lattice that replaces a solid wall saves 80 % of the mass and 20 % of the stiffness, and then the designer adds a second lattice to make up the stiffness and the part is heavier than the original. **Use a lattice where it does a job — energy absorption, thermal management, bone ingrowth, weight-critical secondary structure — and use a solid wall where it does not.** **Assuming the machine's "standard parameters" are your parameters.** The machine OEM's parameter set is a starting point, not a qualified process. The same machine, the same alloy, and the same parameter set can produce 99.9 % dense or 97 % dense depending on the powder lot, the recoater blade wear, the chamber temperature, and the oxygen level. **Qualify your own parameters on your own machine with your own powder, and monitor them.**
:::

## 1. What additive actually is: the layer, the track, and the thermal history

::: definition The seven families of additive manufacturing (ISO/ASTM 52900) {#def-am-families}
The standard classifies AM processes into seven families by *how the material is joined*, not by what machine makes it:

$$
\begin{array} { l l l l }
\textbf{Family} & \textbf{Feedstock} & \textbf{Bonding mechanism} & \textbf{Typical materials} \\ \hline
\text{Material extrusion (FFF/FDM)} & \text{filament, paste} & \text{thermal fusion, solvent} & \text{PLA, ABS, PA, PC, PEEK} \\
\text{Vat photopolymerisation (SLA/DLP)} & \text{liquid resin} & \text{UV cross-linking} & \text{acrylate, epoxy, ceramic slurry} \\
\text{Powder bed fusion (PBF-LB/EB)} & \text{powder, 20--60 } \mu\text{m} & \text{laser or e-beam melting} & \text{Ti-6Al-4V, 316L, AlSi10Mg, IN718} \\
\text{Binder jetting (BJ)} & \text{powder + liquid binder} & \text{adhesion, then sintering} & \text{SS316L, H13, WC-Co, sand} \\
\text{Material jetting (PolyJet/MJ)} & \text{photopolymer droplets} & \text{UV cure} & \text{multi-material resins, wax} \\
\text{Directed energy deposition (DED)} & \text{wire or powder} & \text{laser/arc/EB melting} & \text{Ti-6Al-4V, 316L, IN718, tool steel} \\
\text{Sheet lamination (LOM/UAM)} & \text{sheet, foil} & \text{adhesive or ultrasonic} & \text{paper, plastic, Al, Ti foil} \\
\end{array}
$$

The distinction that matters for design is the **feedstock form**, because it sets the minimum feature size and the surface finish. A vat process cures a 25–100 μm pixel, so it makes the finest features. A powder-bed process melts a 60–120 μm spot on a 20–60 μm powder layer, so its resolution is 100–200 μm and its surface is set by the powder particle size. A material-extrusion process deposits a 200–800 μm road, so its resolution is 0.2–0.8 mm. A DED process melts a 1–5 mm bead, so its resolution is millimetres. **The rule is: the feature size you can hold is roughly twice the "pixel" of the process, and the surface roughness is roughly the pixel size.**
:::

::: definition The staircase effect, build direction, and anisotropy {#def-staircase}
A layer process cannot make a smooth surface. A surface inclined at an angle $\theta$ to the build plate is built as a stack of steps of height $h$ (the layer thickness) and width $h / \tan \theta$, and the theoretical roughness of that staircase is

$$
R _ { a , \text{staircase } } \; = \; { \frac { h } { 4 \tan \theta } } \qquad { \bigl [ } \theta \; = \; \text{angle from the build plate, } h \; = \; \text{layer thickness } { \bigr ] }
$$

For a 30 μm layer on a 45° surface, $R _ { a } = 7 . 5 \ \mu \mathrm { m }$ — comparable to a sand-cast surface. On a near-vertical surface ($\theta \to 9 0 ^ { \circ }$) the staircase vanishes and the roughness is set by the powder or the road width instead. **The practical consequence is that the surface finish of an AM part depends on its orientation in the build, and the orientation that gives the best surface is usually the one that gives the worst strength, because the staircase is perpendicular to the load.**

The **build direction** (conventionally Z) creates three kinds of anisotropy:

- **Geometric anisotropy**: the staircase, the different surface roughness on horizontal versus vertical faces, and the dimensional accuracy that is typically ±0.1–0.3 mm in XY and ±0.15–0.5 mm in Z.
- **Microstructural anisotropy**: in LPBF, each melt track solidifies as columnar grains growing away from the fusion boundary, and because the tracks are stacked, the grains grow epitaxially from layer to layer into a **strongly textured columnar structure** that can span hundreds of layers. In Ti-6Al-4V the prior-β grains are 100–500 μm long along Z; in 316L the columnar grains are 50–200 μm wide and can run the full height of the part.
- **Defect anisotropy**: lack-of-fusion defects, unmelted powder, and keyhole pores are flattened in the XY plane and therefore act as **crack-like defects in Z-loaded fatigue**, which is why the Z-direction fatigue strength of LPBF Ti-6Al-4V is 30–50 % below the XY direction.

**The engineer's rule: design the part so the principal tensile stress is in the XY plane, and if you cannot, derate the Z-direction properties by 30–50 % and test coupons in the orientation you are derating.**
:::

::: definition The thermal history: a million micro-welds {#def-thermal-history}
Every point in a metal AM part experiences a thermal cycle that no other manufacturing process produces. A point at the mid-height of a 100-layer LPBF build is:

1. **Melted** at $2 0 0 0 { - } 3 0 0 0 \ \mathrm { ^ \circ C }$ and **quenched** at $1 0 ^ { 3 } { - } 1 0 ^ { 6 } \ \mathrm { K / s }$ as the laser passes.
2. **Reheated** to a fraction of the melting point by each subsequent layer deposited above it — a point at the bottom of a 100 mm build is reheated 3000 times if the hatch pattern has 30 passes per layer.
3. **Held at elevated temperature** for the duration of the build (hours to days) if the chamber is preheated.
4. **Cooled** to room temperature over 4–24 hours after the build.

The cooling rate sets the microstructure: LPBF 316L has a cellular-dendritic substructure with 0.3–0.5 μm cells that gives it a yield strength of 550–650 MPa — 50 % above wrought 316L — because the cell walls act as dislocation barriers. The reheating cycles set the precipitate state: LPBF AlSi10Mg as-built has a supersaturated Al matrix with a fine eutectic Si network that gives 450 MPa yield but only 5 % elongation; a $1 7 5 \ \mathrm { ^ \circ C }$ stress relief coarsens the Si to 50–100 nm particles and recovers ductility to 12 %. The hold time sets the residual stress: a 200 mm-tall Ti-6Al-4V build held at $2 0 0 \ \mathrm { ^ \circ C }$ for 12 hours creeps enough to relax 30 % of the stress, while a build at $8 0 \ \mathrm { ^ \circ C }$ retains nearly all of it.

**The consequence is that an AM part's properties are not a material property but a process property.** The same Ti-6Al-4V powder, the same alloy, the same machine can produce a yield strength of 850 MPa (as-built, high cooling rate, fine $\alpha ^ { \prime }$ martensite) or 1 100 MPa (HIP at $9 5 0 \ \mathrm { ^ \circ C }$, globular $\alpha { + } \beta$) or 950 MPa (solution-treated and aged at $9 5 0 / 5 4 0 \ \mathrm { ^ \circ C }$). **You do not specify "Ti-6Al-4V" on an AM drawing; you specify "Ti-6Al-4V, LPBF, parameter set X, powder lot Y, HIP at Z, ASTM F3001 Class 1, coupons in three orientations."**
:::

::: widget plot
title: The staircase: roughness is a function of angle and layer thickness
f: x/(4*tan(pi/6)); x/(4*tan(pi/4)); x/(4*tan(pi/3))
x: 10,300
y: 0,80
labels: 30° surface; 45° surface; 60° surface
caption: Theoretical staircase roughness $R _ { a } = h / ( 4 \tan \theta )$ against layer thickness $h$ for three surface angles. **A 30° surface at 100 μm layers has $R _ { a } = 4 3 \ \mu \mathrm { m }$ — a sand-cast finish. A 60° surface at the same layer thickness has $R _ { a } = 1 4 \ \mu \mathrm { m }$ — a machined finish. The 3× difference between the two curves is the reason build orientation is a design decision, not a shop-floor afterthought.** **Read the 45° curve as the design rule of thumb: $R _ { a } \approx h / 4$ at 45°, so a 30 μm LPBF layer gives $R _ { a } \approx 8 \ \mu \mathrm { m }$ and a 100 μm FDM layer gives $R _ { a } \approx 2 5 \ \mu \mathrm { m }$. The real surface is rougher than the staircase because of powder adhesion (metal), balling (metal), and road-edge waviness (polymer), so the as-built $R _ { a }$ is typically 1.5–3× the staircase value.**
:::

::: example Z-strength derating for an LPBF bracket {#ex-zstrength level=3 check="475"}
An LPBF Ti-6Al-4V bracket (ASTM F3001 Class 1, stress-relieved, HIP) has the following tensile properties from your own coupon programme:

| Direction | $R _ { p 0 . 2 }$ (MPa) | $R _ { m }$ (MPa) | Elongation (%) |
|-----------|----------------------|-----------------|----------------|
| X (build plate) | 920 | 1010 | 14 |
| Z (build direction) | 880 | 950 | 8 |

A critical section carries a static tensile stress of 475 MPa along Z. Using a safety factor of 2.0 on yield, is the section adequate?

The allowable stress along Z is $8 8 0 / 2 . 0 = 4 4 0 \ \mathrm { M P a }$ , which is **below** the applied 475 MPa. The section is **inadequate** along Z, even though the X-direction allowable of $9 2 0 / 2 . 0 = 4 6 0 \ \mathrm { M P a }$ would also fail. **The derating from X to Z is only 4 % in yield but 43 % in elongation, and it is the elongation that matters for a statically indeterminate bracket: the Z-direction material cannot redistribute a local peak stress by yielding, so a 1.5× overload that would be harmless in X can crack in Z.**
:::

## 2. Polymer AM: FDM, SLA, and SLS

::: definition Fused filament fabrication (FFF/FDM): the road, the bond, and the anisotropy {#def-fdm}
A thermoplastic filament (1.75 or 2.85 mm diameter) is driven by a geared or direct-drive extruder into a heated nozzle, melted, and deposited as a **road** (the extruded filament cross-section) on a build plate or on the previous layer. The nozzle diameter is 0.2–0.8 mm; the road width is 1.0–1.5× the nozzle diameter because of die swell and the pressure-driven flow; the layer thickness is 50–300 μm, typically 60–80 % of the nozzle diameter.

The road is deposited at the melt temperature ($2 0 0 { - } 4 0 0 \ \mathrm { ^ \circ C }$ depending on the polymer) onto a substrate at the bed temperature ($ 4 0 { - } 1 5 0 \ \mathrm { ^ \circ C } $). The two roads bond by **interdiffusion** (reptation) of polymer chains across the interface, and the bond strength depends on the time the interface spends above $T _ { g }$ (for amorphous polymers) or above the crystallisation temperature $T _ { c }$ (for semi-crystalline polymers). The Frenkel model for viscous flow gives the neck radius between two particles as

$$
{ \frac { x } { r } } \; = \; \left( { \frac { 3 \gamma \, t } { 2 \eta \, r } } \right) ^ { 1 / 5 }
$$

where $\gamma$ is the surface tension, $\eta$ the melt viscosity, $r$ the particle radius, and $t$ the contact time. **The $t ^ { 1 / 5 }$ dependence is the problem: to double the bond area you need 32× the contact time, and the contact time in FDM is set by the cooling rate, which is set by the layer thickness and the bed temperature.** This is why FDM Z-strength is 30–70 % of bulk and why semi-crystalline polymers (PA12, PEEK) bond worse than amorphous ones (ABS, PC): crystallisation at the interface freezes the chains before they can reptate.

The **anisotropy** of FDM is the largest of any AM process. A tensile bar loaded along the roads (X) is as strong as the bulk polymer. A bar loaded across the roads (Y, in-plane) is 70–90 % of bulk because the load transfers through the road-to-road bond. A bar loaded along Z (through the layers) is 30–60 % of bulk because the layer-to-layer bond is weaker than the road-to-road bond (the road is deposited on a cold surface and cools faster). **For a functional FDM part, the rule is: put the load along the roads, and if you cannot, make the part 2–3× thicker in Z.**
:::

::: definition Photopolymerisation: SLA, DLP, and MSLA {#def-sla}
A vat of liquid photopolymer resin is selectively cured by UV light. The physics is the **Beer-Lambert absorption** of the incident intensity $I _ { 0 }$ in the resin:

$$
I ( z ) \; = \; I _ { 0 } \, e ^ { - z / D _ { p } }
$$

where $D _ { p }$ is the **penetration depth** (the depth at which the intensity falls to $1 / e$ of its surface value, typically 50–150 μm for acrylate and epoxy resins). A photoinitiator absorbs the light and generates free radicals (or cations) that cross-link the monomer and oligomer chains. The resin gels when the local **exposure dose** $E = I \times t$ (irradiance × time) exceeds a **critical dose** $E _ { c }$ (typically 5–30 mJ/cm²). Integrating the Beer-Lambert law gives **Jacobs' equation** for the cure depth:

$$
C _ { d } \; = \; D _ { p } \, \ln { \frac { E } { E _ { c } } } \; = \; D _ { p } \, \ln { \frac { I _ { 0 } \, t } { E _ { c } } }
$$

The **overcure** $\delta = C _ { d } - t _ { \text{layer } }$ is the depth of unwanted cure below the target layer. A small overcure (10–30 μm) is necessary to bond the layers; a large overcure (50+ μm) destroys the Z-resolution and fuses the part to the previous layers. **The exposure time is therefore a trade-off between adhesion and resolution, and it is the single most important parameter in SLA.**

Three variants dominate:

- **SLA (laser scanning)**: a UV laser (355 or 405 nm) is scanned by galvanometers across the resin surface. Spot size 50–150 μm, layer thickness 25–100 μm, XY resolution 50–100 μm. The original process (Hull, 1984).
- **DLP (digital light processing)**: an entire layer is projected at once by a DMD (digital micromirror device) or LCD mask. Pixel size 25–100 μm, layer time 1–10 s regardless of part geometry. Faster for many small parts, but the pixel grid creates a "jaggies" artefact on curved surfaces.
- **MSLA (masked SLA)**: an LCD screen (405 nm) acts as a dynamic mask. Cheap ($200–$5 000), 50 μm pixels, 25–50 μm layers. The consumer workhorse.

**Resin shrinkage** is the Achilles heel of photopolymer AM. The volumetric shrinkage on curing is 2–8 %, which generates internal stress, warpage, and delamination from the build plate. Low-shrinkage resins (epoxy-based, 1–3 %) exist but are slower and more brittle. **Every SLA part is a warpage calculation: the shrinkage strain is $\varepsilon _ { \text{shrink } } = \Delta V / 3$ , and a 5 % volumetric shrinkage gives a 1.7 % linear strain — 1700 με, which is more than the yield strain of most polymers.**
:::

::: definition SLS of polymers: the sintering window and the powder bed {#def-sls-polymer}
Selective laser sintering spreads a 60–120 μm layer of polymer powder (typically PA12, PA11, TPU, or PA12-carbon-fibre composite) and fuses the surface with a $\mathrm { C O } _ { 2 }$ laser (10.6 μm) at 20–40 W. The powder bed outside the part acts as the support, so **no support structures are needed** and the part can have any geometry. The bed is held at a temperature just below the melting point ($T _ { \text{bed } } \approx T _ { m } - 2 0 { - } 4 0 \ \mathrm { ^ \circ C } $) to reduce thermal distortion.

The critical material property is the **sintering window**: the temperature range between the onset of crystallisation $T _ { c }$ and the melting point $T _ { m }$. For PA12, $T _ { m } \approx 1 7 8 \ \mathrm { ^ \circ C }$ and $T _ { c } \approx 1 5 5 \ \mathrm { ^ \circ C }$ , giving a window of 23 °C. If the window is narrower than about 20 °C, the powder crystallises before it sinters and the part is weak and inhomogeneous. This is why PA12 dominates SLS and why PLA, with its narrow sintering window, is almost never used.

The **surface finish** of SLS is 10–20 μm $R _ { a }$ — grainy, because the surface is a skin of partially fused powder particles. The **porosity** of the skin is 30–50 %, while the interior is 95–99 % dense. The **mechanical properties** are quasi-isotropic (unlike FDM) because the powder is randomly oriented, but the Z-direction strength is 70–90 % of XY because the interlayer fusion is slightly less complete. **SLS is the only polymer AM process that makes functional, isotropic, self-supporting parts in engineering thermoplastics, and it is the reason it dominates the "end-use polymer part" market.**
:::

::: example FDM road width and build time {#ex-fdm-time level=3 check="14"}
A 50 mm × 50 mm × 20 mm ABS bracket is printed with a 0.4 mm nozzle, 0.2 mm layer thickness, 100 % infill, 80 % road overlap (road width = 0.45 mm), and a scan speed of 60 mm/s. Estimate the build time.

Each layer has an area of $5 0 \times 5 0 = 2 5 0 0 \ \mathrm { m m ^ { 2 } }$ . The road cross-section is $0 . 4 5 \times 0 . 2 = 0 . 0 9 \ \mathrm { m m ^ { 2 } }$ , so the road length per layer is $2 5 0 0 / 0 . 0 9 = 2 7 7 7 8 \ \mathrm { m m }$ . At 60 mm/s, the scan time per layer is $2 7 7 7 8 / 6 0 = 4 6 3 \ \mathrm { s } = 7 . 7 \ \mathrm { m i n }$ . The number of layers is $2 0 / 0 . 2 = 1 0 0$ . Total scan time: $1 0 0 \times 7 . 7 = 7 7 0 \ \mathrm { m i n } = 1 2 . 8 \ \mathrm { h }$ . Adding 10 % for travel, retraction, and layer changes: **approximately 14 hours**.

**The real build takes 16–20 hours, because the estimate ignores the time for the nozzle to travel between regions, retract, and wait for the bed to level. The rule of thumb is that the scan time is 60–80 % of the total build time for a simple geometry and 40–60 % for a complex one.**
:::

::: example SLA cure depth and overcure {#ex-sla-cure level=3 check="100"}
An epoxy resin has $D _ { p } = 1 0 0 \ \mu \mathrm { m }$ and $E _ { c } = 1 5 \ \mathrm { m J / c m ^ { 2 } }$ . The laser delivers $I _ { 0 } = 1 5 \ \mathrm { m W / c m ^ { 2 } }$ and the exposure time is 10 s. The layer thickness is 50 μm. What is the cure depth and the overcure?

$$
E \; = \; I _ { 0 } \, t \; = \; 1 5 \times 1 0 \; = \; 1 5 0 \ \mathrm { m J / c m ^ { 2 } }
$$

$$
C _ { d } \; = \; D _ { p } \, \ln { \frac { E } { E _ { c } } } \; = \; 1 0 0 \, \ln { \frac { 1 5 0 } { 1 5 } } \; = \; 1 0 0 \times 2 . 3 0 3 \; = \; { \bf 2 3 0 \ \mu m }
$$

The overcure is $\delta = 2 3 0 - 5 0 = 1 8 0 \ \mu \mathrm { m }$ — **far too much**. The cure depth is 4.6× the layer thickness, so the resin cures through four layers and the part fuses to everything below it. To get a 50 μm overcure ($C _ { d } = 1 0 0 \ \mu \mathrm { m }$), the exposure must be reduced to $E = E _ { c } \, e ^ { C _ { d } / D _ { p } } = 1 5 \times e ^ { 1 } = 4 1 \ \mathrm { m J / c m ^ { 2 } }$ , which at $1 5 \ \mathrm { m W / c m ^ { 2 } }$ means $t = 2 . 7 \ \mathrm { s }$ . **The exposure time is the SLA parameter to characterise, and the datasheet value is almost never right for your resin lot, your lamp age, and your layer thickness.**
:::

::: widget plot
title: Jacobs' equation: cure depth is a logarithm of exposure
f: 100*ln(x/15); 150*ln(x/15)
x: 15,200
y: 0,400
labels: Dp = 100 μm; Dp = 150 μm
caption: Cure depth $C _ { d } = D _ { p } \ln ( E / E _ { c } )$ against exposure dose $E$ for two penetration depths, with $E _ { c } = 1 5 \ \mathrm { m J / c m ^ { 2 } }$ . **The curve is a logarithm: doubling the exposure from 150 to 300 mJ/cm² increases the cure depth by only $D _ { p } \ln 2 = 6 9 \ \mu \mathrm { m }$ (for $D _ { p } = 1 0 0$), but halving it from 150 to 75 reduces the cure depth by 69 μm — the same amount. The process is therefore tolerant of over-exposure and intolerant of under-exposure, which is the opposite of what most people expect.** **Read the horizontal line at $C _ { d } = 5 0 \ \mu \mathrm { m }$ (a typical layer thickness): the exposure window between "no cure" ($E = E _ { c } = 1 5$) and "cure through two layers" ($C _ { d } = 1 0 0$) is only 15–41 mJ/cm², a factor of 2.7. That is the SLA process window, and it is why resin age, lamp intensity drift, and temperature all matter.**
:::

## 3. Metal AM: powder bed fusion, directed energy deposition, and binder jetting

::: definition Laser powder bed fusion (LPBF / PBF-LB): the melt pool and the energy density {#def-lpbf}
A 200–1000 W fibre laser (1070 nm) is scanned by galvanometers across a 20–60 μm layer of metal powder (20–60 μm particle size, gas-atomised, spherical) in an inert atmosphere (argon or nitrogen, $< 1 0 0 \ \mathrm { p p m } \ O _ { 2 }$ for titanium, $< 1 0 0 0 \ \mathrm { p p m }$ for steel). The laser melts a track 80–150 μm wide and 50–150 μm deep; the hatch spacing is 80–150 μm (typically 40–60 % overlap between adjacent tracks); the hatch pattern rotates by $6 7 ^ { \circ }$ between layers to avoid a preferred grain direction.

The single parameter that governs the process is the **volumetric energy density**:

$$
E _ { v } \; = \; { \frac { P } { v \, h \, t } } \quad [ \mathrm { J / m m ^ { 3 } } ]
$$

where $P$ is the laser power (W), $v$ the scan speed (mm/s), $h$ the hatch spacing (mm), and $t$ the layer thickness (mm). For Ti-6Al-4V, the "processability window" for $> 9 9 . 5 \ \%$ relative density is roughly $E _ { v } = 4 0 { - } 8 0 \ \mathrm { J / m m ^ { 3 } }$ . Below 30, the tracks do not overlap and **lack-of-fusion** porosity appears; above 100, the melt pool goes **keyhole** (the recoil pressure of the vaporising metal exceeds the surface tension and punches a cavity through the melt pool) and **keyhole porosity** appears. **The window is a factor of 2–3 wide, and it is the reason LPBF is a process to be characterised, not a machine to be bought.**

The melt pool is a small, violent, short-lived object: 100 μm wide, 100 μm deep, $2 5 0 0 \ \mathrm { ^ \circ C }$ hot, travelling at 0.5–2 m/s, with a thermal gradient of $1 0 ^ { 6 } { - } 1 0 ^ { 7 } \ \mathrm { K / m }$ and a cooling rate of $1 0 ^ { 5 } { - } 1 0 ^ { 6 } \ \mathrm { K / s }$. The **Marangoni flow** inside the pool — driven by the temperature dependence of surface tension, $\mathrm { d } \gamma / \mathrm { d } T$ — determines whether the pool is wide and shallow (outward flow, $\mathrm { d } \gamma / \mathrm { d } T > 0 $, when the sulfur content is high) or narrow and deep (inward flow, $\mathrm { d } \gamma / \mathrm { d } T < 0 $, when it is low). **A 30 ppm change in sulfur content changes the melt pool shape from wide-and-shallow to narrow-and-deep, and that changes the porosity from 0.1 % to 2 %. This is why powder chemistry matters as much as laser power.**

The **defect taxonomy** of LPBF is:

- **Lack of fusion (LoF)**: incomplete melting between tracks or layers. Flat, crack-like, aligned with the build plane. The worst defect for fatigue: a 100 μm LoF defect is a 50 μm crack, and the fatigue life of LPBF Ti-6Al-4V drops by 60 % when LoF porosity exceeds 0.5 %.
- **Keyhole porosity**: spherical, 10–100 μm, formed when the vapour cavity collapses and traps gas. Spherical pores are less damaging than LoF but still reduce fatigue life by 20–40 %.
- **Ballling**: the melt track breaks up into droplets due to Marangoni instability (the Rayleigh-Plateau instability of a liquid cylinder). Creates a rough surface and loose powder that contaminates subsequent layers.
- **Spatter**: ejected droplets (from keyhole collapse or Marangoni ejection) that land on the powder bed and create inclusions in the next layer.
- **Delamination**: the part peels off the build plate because the residual stress exceeds the plate adhesion. The most catastrophic failure mode: the part is ruined, the powder is contaminated, and the machine needs cleaning.
:::

::: definition Electron beam powder bed fusion (EB-PBF): vacuum, preheat, and oxide skimming {#def-ebpbf}
An electron beam (60–100 kV, up to 12 kW) is deflected by electromagnetic coils across a powder bed in a vacuum ($1 0 ^ { - 4 } \ \mathrm { mbar }$). The beam is preheat-scanned across the entire bed to bring it to $7 0 0 { - } 1 0 0 0 \ \mathrm { ^ \circ C }$ , then melted in the part pattern. The vacuum eliminates oxidation, so **reactive alloys (TiAl, NbSi, Ta) can be processed without embrittlement**. The high preheat temperature eliminates residual stress during the build, so **crack-sensitive alloys (TiAl, W, some tool steels) can be built without hot cracking**.

The trade-offs are:

- **Slower**: electromagnetic coils deflect at 1–10 km/s, compared to galvanometers at 5–15 m/s. The beam must also be "booster-scanned" to preheat each layer. Build rates are 10–50 cm³/h, compared to 20–100 cm³/h for LPBF.
- **Coarser surface**: the electron beam cannot be focused below about 200 μm (space charge limits the current density), and the pre-sintered powder around the part creates a "sintered skin" that must be removed by blasting or chemical etching. $R _ { a }$ is 15–30 μm, compared to 8–15 μm for LPBF.
- **Oxide skimming**: the $\mathrm { A l _ { 2 } O _ { 3 } }$ layer on the powder surface (5–20 nm thick) is not conductive, so the beam cannot melt through it. The machine must "skim" each layer — scan the entire part area at high power to break the oxide — before melting. Skimming adds 20–40 % to the build time.
- **Powder recycling**: the powder is sintered together around the part (the "cake"), so it must be crushed, sieved, and re-atomised. The recycling loop is more aggressive than LPBF.

**EB-PBF is the process of choice for TiAl (GE's LPT blade), for crack-sensitive alloys, and for applications where the vacuum eliminates the need for an inert gas loop. It is not the process of choice for high-volume, fine-feature, or low-cost work.**
:::

::: definition Directed energy deposition (DED): wire, powder, and repair {#def-ded}
A focused energy source (laser, arc, or electron beam) melts a stream of powder or wire onto a substrate, building the part in beads of 1–5 mm width and 0.5–2 mm height. The head moves on a 5-axis machine, so the part can be built on an existing surface — **which is the killer application: repair of a worn turbine blade, a scrapped die, or a corroded shaft**.

Two feedstock variants:

- **Powder-fed DED**: a coaxial or lateral nozzle injects powder into the melt pool. The **capture efficiency** (fraction of powder that actually melts into the deposit) is 50–80 %; the rest is lost. Deposition rates: 0.5–5 kg/h for laser, 2–10 kg/h for arc. Dilution (the fraction of the deposit that came from the melted substrate) is 5–30 % and must be controlled, because it changes the composition of the deposit.
- **Wire-fed DED**: a filler wire is fed into the melt pool. The capture efficiency is 100 % (all the wire melts). Deposition rates: 1–10 kg/h for laser, 5–20 kg/h for arc (wire-arc AM, WAAM). The microstructure is cast, with 100–500 μm grains, and the surface finish is 5–10 mm $R _ { a }$ — **the part must be machined to final dimensions, and the machining allowance is 1–3 mm per surface.**

The **composition of the deposit** is set by the dilution $D$:

$$
C _ { \text{deposit } } \; = \; ( 1 - D ) \, C _ { \text{feedstock } } + D \, C _ { \text{substrate } }
$$

which is the same mixing rule as a weld (see [[manufacturing/joining|joining]]). For a repair, the dilution must be low enough that the deposit chemistry is within specification, and the heat input must be low enough that the substrate does not over-temper. **A laser DED repair of an IN718 gas-turbine blade uses a 200 W laser, 2 g/min powder, and a 5 mm/s scan speed to keep the heat input below 2 kJ/mm and the dilution below 10 %, because above those limits the blade's $\gamma ^ { \prime }$ precipitates dissolve and the blade's creep strength drops by 40 %.**
:::

::: definition Binder jetting: the green part, the sinter, and the shrinkage {#def-binder-jet}
A liquid binder is inkjet-printed onto a powder bed, gluing the particles together into a **green part** at 50–60 % of theoretical density. The green part is cured, depowdered, and then **sintered** in a furnace (1 100–1 400 °C for metals, 700–900 °C for carbides) to densify it to 90–99 %. The sintering shrinkage is:

$$
\varepsilon _ { \text{linear } } \; = \; 1 - \left( { \frac { \rho _ { \text{green } } } { \rho _ { \text{theoretical } } } } \right) ^ { 1 / 3 }
$$

For a green density of 55 %, the linear shrinkage is $1 - 0 . 5 5 ^ { 1 / 3 } = 1 - 0 . 8 1 9 = 1 8 . 1 \ \%$ . **The part shrinks by 18 % in every direction, and the shrinkage must be isotropic or the part distorts.** Isotropic shrinkage requires uniform green density, uniform powder packing, and uniform sintering — three things that are hard to achieve in a 100 mm-tall part.

The **advantages** of binder jetting are speed (no laser, no melting, no thermal stress, no supports) and cost (the machine is $2 0 0 { - } 5 0 0 \ \mathrm { k }$ , the powder is $2 0 { - } 5 0 / \mathrm { k g }$ , and the throughput is 50–200 small parts per hour). The **disadvantages** are the sintering shrinkage (±0.5 % dimensional tolerance after sintering, compared to ±0.1 mm for LPBF), the limited material range (SS316L, H13, WC-Co, and a handful of others), and the fact that the sintered part is a powder-metallurgy product with 2–8 % residual porosity and a fatigue strength 30–50 % below wrought.

**Infiltration** is a variant: the sintered part is infiltrated with bronze (for steel), copper (for HSS), or polymer (for tool steel) to fill the porosity and increase the density to 95–99 %. The infiltrated part is a composite, not a solid metal, and its properties are between the two constituents.
:::

::: example LPBF energy density and the processability window {#ex-ev-density level=3 check="60"}
An LPBF build of Ti-6Al-4V uses $P = 2 8 0 \ \mathrm { W }$ , $v = 1 2 0 0 \ \mathrm { m m / s }$ , $h = 1 1 0 \ \mu \mathrm { m }$ , $t = 3 0 \ \mu \mathrm { m }$ . Calculate the volumetric energy density and determine whether the parameters are in the processability window.

$$
E _ { v } \; = \; { \frac { P } { v \, h \, t } } \; = \; { \frac { 2 8 0 } { 1 2 0 0 \times 0 . 1 1 0 \times 0 . 0 3 0 } } \; = \; { \frac { 2 8 0 } { 3 . 9 6 } } \; = \; { \bf 7 1 \ \mathrm { J / m m ^ { 3 } } }
$$

**71 J/mm³ is in the middle of the Ti-6Al-4V window (40–80 J/mm³), so the parameters should produce $> 9 9 . 5 \ \%$ dense material.** If the scan speed were reduced to 800 mm/s (to increase the melt pool depth for a coarse powder), $E _ { v }$ would rise to $1 0 6 \ \mathrm { J / m m ^ { 3 } }$ — **above the keyhole threshold, and the part would have spherical porosity.** If the hatch spacing were widened to 150 μm (to speed up the build), $E _ { v }$ would drop to $5 2 \ \mathrm { J / m m ^ { 3 } }$ — still in the window, but the track overlap would drop from 55 % to 36 %, and lack-of-fusion porosity might appear at the track boundaries. **The energy density is a necessary but not sufficient condition: the track overlap, the hatch rotation, and the powder packing density all matter too.**
:::

::: example DED dilution and repair chemistry {#ex-ded-dilution level=3 check="14"}
A laser DED repair of an IN718 (72.2 % Ni, 19 % Cr, 5.3 % Fe, 3.1 % Nb, balance) blade uses IN718 powder. The dilution is measured as 15 %. What is the Nb content of the deposit, and is it within the specification of $2 . 8 { - } 3 . 5 \ \%$ Nb?

$$
C _ { \text{deposit } } \; = \; ( 1 - 0 . 1 5 ) \times 3 . 1 + 0 . 1 5 \times 3 . 1 \; = \; 3 . 1 \ \mathrm { \% \ Nb }
$$

In this case the feedstock and the substrate are the same alloy, so the dilution does not change the composition. **The problem arises when the repair uses a different filler: if the blade were IN738 (0.9 % Nb) and the filler were IN718 (3.1 % Nb), the deposit would have $( 1 - 0 . 1 5 ) \times 3 . 1 + 0 . 1 5 \times 0 . 9 = 2 . 6 4 + 0 . 1 3 5 = 2 . 7 8 \ \%$ Nb — just below the IN718 specification, and the Laves phase (a Nb-rich intermetallic that embrittles the deposit) would be suppressed, which is actually desirable.** **The dilution calculation is the same as in welding (see [[manufacturing/joining|joining]]), and the same rule applies: the deposit is not the filler, and the first thing to check is whether the mixed composition is within specification.**
:::

::: widget plot
title: The LPBF processability window: density against energy density
f: min(99.8, 70+0.4*x); 99.8-0.005*pow(max(x-90,0),2)
x: 20,150
y: 60,102
labels: Ti-6Al-4V (rising side: LoF; plateau: dense); 316L (falling side: keyhole)
caption: Relative density against volumetric energy density $E _ { v } = P / ( v \, h \, t )$ for two alloys, showing the three regimes. **Below 40 J/mm³, the tracks do not overlap and lack-of-fusion porosity dominates — the density rises steeply with energy because each increment of energy melts more of the gap between tracks. Between 50 and 90 J/mm³, the density is above 99.5 % and the process window is open. Above 90–100 J/mm³, the melt pool goes keyhole and the density falls as spherical gas pores are trapped.** **The window is 2–3× wide, and the only way to find it for your alloy, your powder, and your machine is to build a density matrix: 25 cubes at 5 powers × 5 speeds, sectioned and measured by Archimedes. The matrix takes a day and saves a month of failed builds.**
:::

## 4. Residual stress, distortion, and hot tearing

::: definition Residual stress in AM: the layer-by-layer quench {#def-res-am}
Every layer in a metal AM part is a tiny weld bead that is deposited hot, quenched, and constrained by the cold material below it. The thermal strain is $\varepsilon _ { \text{thermal } } = \alpha \, \Delta T$ , and if the layer is fully constrained, the stress is

$$
\sigma _ { \text{thermal } } \; = \; { \frac { E \, \alpha \, \Delta T } { 1 - \nu } }
$$

For Ti-6Al-4V at $\Delta T = 1 0 0 0 \ \mathrm { K }$ : $\sigma = 1 1 4 \ 0 0 0 \times 8 . 6 \times 1 0 ^ { - 6 } \times 1 0 0 0 / 0 . 6 6 = 1 4 9 0 \ \mathrm { M P a }$ — **far above the yield strength of 880 MPa**. The metal yields, and the residual stress is capped at the yield strength, exactly as in welding (see [[manufacturing/joining|joining]]). The critical temperature difference for yielding is

$$
\Delta T _ { \text{crit } } \; = \; { \frac { \sigma _ { Y } \, ( 1 - \nu ) } { E \, \alpha } }
$$

For Ti-6Al-4V: $\Delta T _ { \text{crit } } = 8 8 0 \times 0 . 6 6 / ( 1 1 4 \ 0 0 0 \times 8 . 6 \times 1 0 ^ { - 6 } ) = 5 9 2 \ \mathrm { K }$ . For AlSi10Mg: $\Delta T _ { \text{crit } } = 2 4 0 \times 0 . 6 7 / ( 7 0 \ 0 0 0 \times 2 2 \times 1 0 ^ { - 6 } ) = 1 0 4 \ \mathrm { K }$ . **Aluminium alloys yield at a temperature difference of only 100 K, which is why LPBF aluminium is so much harder to build than titanium: the thermal cycles exceed 100 K on every layer, so the part is yielding and re-yielding on every pass, and the accumulated distortion is enormous.**

The residual stress profile across a wall is the same as a weld: tensile in the centre (the last material to cool is the centre, which shrinks and pulls the edges inward), compressive at the edges. The magnitude is $\sigma _ { Y }$ in the centre and $- \sigma _ { Y } \, A _ { \text{tension } } / A _ { \text{compression } }$ at the edges, with the areas set by equilibrium. **A 10 mm-tall LPBF wall has a residual stress of 800–900 MPa (tension) in the centre and 200–300 MPa (compression) at the edges, and the stress is there before the part leaves the build plate.**
:::

::: definition Distortion and the cantilever problem {#def-distortion}
Distortion is the macroscopic consequence of residual stress: the part bends, curls, or peels off the plate. The simplest case is a **cantilever** — a horizontal overhang with no support below it. The overhang is deposited hot, cools, and contracts. The contraction is resisted by the material below it, so the overhang curls upward. The curl angle is:

$$
\theta _ { \text{curl } } \; \approx \; { \frac { \alpha \, \Delta T \, L } { t } }
$$

where $L$ is the overhang length and $t$ is the thickness of the contracting layer. For a 10 mm overhang, 30 μm layer, $\alpha = 8 . 6 \times 1 0 ^ { - 6 } \ \mathrm { K ^ { - 1 } }$ , $\Delta T = 1 0 0 0 \ \mathrm { K }$ : $\theta = 8 . 6 \times 1 0 ^ { - 6 } \times 1 0 0 0 \times 1 0 / 0 . 0 3 = 2 . 9 \ \mathrm { r a d } = 1 6 6 ^ { \circ }$ . **The overhang curls up by 166° — it peels off the plate.** This is why LPBF parts have supports under every overhang: the supports are not there to hold the part up (the powder does that), they are there to **anchor the overhang to the plate and prevent the curl**.

The **distortion of the whole part** is the integral of the residual stress over the cross-section. A tall, thin wall distorts more than a short, thick one, because the thermal gradient is larger and the bending stiffness is lower. The distortion scales as:

$$
\delta _ { \text{distortion } } \; \propto \; { \frac { \alpha \, \Delta T \, H ^ { 2 } } { t _ { \text{wall } } } }
$$

where $H$ is the part height and $t _ { \text{wall } }$ is the wall thickness. **Doubling the height quadruples the distortion; doubling the wall thickness halves it. This is why LPBF parts are designed with generous fillets, thick bases, and a low centre of gravity, and why a 200 mm-tall thin-walled bracket is a distortion nightmare while a 50 mm-tall chunky bracket is trivial.**
:::

::: definition Hot tearing and process-crackability {#def-hot-tearing}
Hot tearing (solidification cracking) occurs when the metal is in the **mushy zone** — partially liquid, partially solid — and the shrinkage strain exceeds the liquid-feeding capacity. The liquid films between dendrite arms are pulled apart, and a crack forms. The susceptibility depends on the **solidification range** $\Delta T _ { \text{solid } } = T _ { \text{liquidus } } - T _ { \text{solidus } }$ :

- **Narrow range (< 30 °C)**: pure metals, eutectic alloys. Low hot-tearing susceptibility. 316L ($\Delta T _ { \text{solid } } \approx 3 0 \ \mathrm { ^ \circ C }$), Ti-6Al-4V ($\Delta T _ { \text{solid } } \approx 1 6 0 \ \mathrm { ^ \circ C }$ but high thermal conductivity), IN718 ($\Delta T _ { \text{solid } } \approx 1 7 0 \ \mathrm { ^ \circ C }$ but good liquid feeding).
- **Wide range (> 100 °C)**: Al 7075 ($\Delta T _ { \text{solid } } \approx 1 5 0 \ \mathrm { ^ \circ C }$), IN738LC ($\Delta T _ { \text{solid } } \approx 2 0 0 \ \mathrm { ^ \circ C }$), some tool steels. High hot-tearing susceptibility. **These alloys are "unweldable" by LPBF at conventional preheat temperatures.**

The **hot-tearing susceptibility** can be estimated from the solidification range and the strain rate:

$$
\text{HTS } \; \propto \; \Delta T _ { \text{solid } } \times { \dot { \varepsilon }} _ { \text{shrinkage } }
$$

The strain rate in LPBF is $1 0 ^ { - 2 } { - } 1 0 ^ { 0 } \ \mathrm { s ^ { - 1 } }$ (the cooling rate is $1 0 ^ { 5 } \ \mathrm { K / s }$ , the solidification range is 100 K, so the time in the mushy zone is 1 ms, and the strain in that time is 0.1–1 %). **The strain rate is 1000× higher than in casting, which is why alloys that weld fine by TIG crack in LPBF.**

The remedies are: **increase the preheat temperature** (reduces $\Delta T$ , reduces the strain rate, and allows creep relaxation — IN738LC can be built at $8 0 0 \ \mathrm { ^ \circ C }$ substrate temperature without cracking), **use EB-PBF** (the 700–1 000 °C preheat eliminates the problem), **modify the alloy** (add Zr or Sc to Al 7075 to refine the grains and narrow the solidification range), or **change the process** (use DED with a lower cooling rate, or use a crack-tolerant alloy like AlSi10Mg instead of Al 7075).
:::

::: proof How distortion scales with geometry {#proof-distortion}
Consider a wall of height $H$ , thickness $t$ , and length $L$ (with $L \gg H \gg t$ ) built by LPBF. Each layer is deposited at the melt temperature $T _ { m }$ and cools to the substrate temperature $T _ { 0 }$ . The thermal strain of the layer is $\varepsilon _ { \text{th } } = \alpha \, \Delta T$ where $\Delta T = T _ { m } - T _ { 0 }$ . The layer is constrained by the material below it, so it yields in tension at $\sigma _ { Y }$ . When the part is cut off the plate, the residual stress is released and the part bends.

The curvature $\kappa$ of a bimorph (a layer of thermal strain $\varepsilon _ { \text{th } }$ bonded to a substrate of zero strain) is the Stoney equation:

$$
\kappa \; = \; { \frac { 6 \, \varepsilon _ { \text{th } } \, h _ { f } } { t ^ { 2 } } } \; = \; { \frac { 6 \, \alpha \, \Delta T \, h _ { f } } { t ^ { 2 } } }
$$

where $h _ { f }$ is the thickness of the strained layer (the heat-affected zone, roughly $h _ { f } \sim 0 . 1 { - } 0 . 3 \, t$ for LPBF). The tip deflection of a cantilever of height $H$ is:

$$
\delta \; = \; { \frac { \kappa \, H ^ { 2 } } { 2 } } \; = \; { \frac { 3 \, \alpha \, \Delta T \, h _ { f } \, H ^ { 2 } } { t ^ { 2 } } }
$$

**The three scalings are the ones to remember.** Distortion scales as $H ^ { 2 }$ : **doubling the height quadruples the distortion**, which is why tall parts are built with supports, with a lattice base, or with a pre-deformed geometry. It scales as $1 / t ^ { 2 }$ : **doubling the wall thickness quarters the distortion**, which is why thin-walled parts are the hardest to build. And it scales as $\alpha \, \Delta T$ : **aluminium ($\alpha = 2 2 \times 10^ { - 6 }$ ) distorts 2.5× more than titanium ($\alpha = 8 . 6 \times 10^ { - 6 }$ ) at the same $\Delta T$**, which is why LPBF aluminium is a distortion problem and LPBF titanium is a residual-stress problem. $\blacksquare$
:::

::: example Pre-deformation compensation {#ex-predeform level=3 check="0.5"}
A 100 mm-tall, 3 mm-thick LPBF Ti-6Al-4V wall is known to bow outward by 1.5 mm at mid-height when cut from the plate. The designer wants the as-built wall to be straight. How much should the CAD model be bowed inward (pre-deformed) at mid-height?

The pre-deformation is equal and opposite to the predicted distortion: **0.5 mm inward at mid-height** (the bow is a half-sine, so the mid-height deflection is 1.5 mm and the pre-deformation is 1.5 mm inward, but the wall is constrained during the build, so only the post-cut springback matters — and the springback is typically 30–40 % of the total distortion, so the pre-deformation is $0 . 3 5 \times 1 . 5 = 0 . 5 \ \mathrm { m m }$).

**In practice, the pre-deformation is obtained from a simulation (ANSYS Additive, Simufact Additive, or a simple eigenstrain model), validated on a test coupon, and iterated. A single iteration gets you within 0.2 mm; two iterations get you within 0.05 mm. The alternative — build, measure, adjust, rebuild — costs three build cycles and three weeks.**
:::

::: widget plot
title: Residual stress and the yield-stress ceiling
f: min(1, 0.00167*x); 1; 0.667
x: 0,800
y: 0,1.5
labels: Ti-6Al-4V (unclipped thermal stress); yield stress (the ceiling); AlSi10Mg yield (the ceiling)
caption: Thermal stress $\sigma = E \alpha \Delta T / ( 1 - \nu )$ against temperature difference $\Delta T$ for Ti-6Al-4V, in units of the yield stress. **The straight line is the elastic answer; the horizontal line is the yield stress. Where the line crosses the ceiling ($\Delta T _ { \text{crit } } = 5 9 2 \ \mathrm { K }$ for Ti-6Al-4V, 104 K for AlSi10Mg), the metal yields and the stress stops rising. The part is at yield on every layer, and the residual stress is $\sigma _ { Y }$ regardless of how hot the melt pool was.** **The practical consequence: preheating from $8 0 \ \mathrm { ^ \circ C }$ to $2 0 0 \ \mathrm { ^ \circ C }$ reduces $\Delta T$ from 1 420 K to 1 300 K for Ti-6Al-4V — still above $\Delta T _ { \text{crit } }$ , so the stress is still at yield. Preheating only helps when it brings $\Delta T$ below $\Delta T _ { \text{crit } }$ , which for Ti-6Al-4V means a substrate temperature above $1 0 0 0 \ \mathrm { ^ \circ C }$ — impractical for LPBF but exactly what EB-PBF does at 700–1 000 °C.**
:::

## 5. Design for AM: lattices, topology optimisation, and part consolidation

::: definition Lattice structures and Gibson-Ashby scaling {#def-lattice}
A lattice is a periodic array of struts (or plates) that fills a volume with a structure whose relative density $\bar { \rho } = \rho ^ { * } / \rho _ { s }$ is 0.05–0.5. The mechanical properties scale with the relative density by the **Gibson-Ashby relations**:

$$
{ \frac { E ^ { * } } { E _ { s } } } \; = \; C _ { 1 } \, { \bar { \rho } } ^ { \, n } \qquad { \frac { \sigma _ { \text{yield } } ^ { * } } { \sigma _ { \text{yield,} s } } } \; = \; C _ { 3 } \, { \bar { \rho } } ^ { \, m }
$$

where $n = 2$ for open-cell (bending-dominated) structures, $n = 3$ for closed-cell (stretch-dominated) structures, and $m \approx 1 . 5$ for open-cell. The constants $C _ { 1 }$ and $C _ { 3 }$ depend on the topology: the **octet truss** (a space-filling arrangement of 8 struts per node, formed by intersecting octahedra and tetrahedra) has $C _ { 1 } \approx 0 . 3$ and $C _ { 3 } \approx 0 . 3$ ; the **Kelvin cell** (a truncated octahedron with 24 struts) has $C _ { 1 } \approx 0 . 1 5$ ; the **simple cubic** has $C _ { 1 } \approx 0 . 0 5$ .

The **relative density** of an octet truss with strut diameter $d$ and cell size $l$ is:

$$
{ \bar { \rho } } _ { \text{octet } } \; = \; { \frac { 3 { \sqrt { 2 } } } { 2 } } \left( { \frac { d } { l } } \right) ^ { 2 } \; \approx \; 2 . 1 2 \left( { \frac { d } { l } } \right) ^ { 2 }
$$

For $d / l = 0 . 1$ (a 0.2 mm strut in a 2 mm cell): $\bar { \rho } = 2 . 1 2 \times 0 . 0 1 = 0 . 0 2 1$ , so the lattice is 2.1 % dense and its modulus is $E ^ { * } / E _ { s } = 0 . 3 \times 0 . 0 2 1 ^ { 2 } = 1 . 3 \times 1 0 ^ { - 4 }$ — **a factor of 7 500 below the solid**. The lattice is not a lightweight structure; it is a **functionally graded material** that provides stiffness per unit mass, energy absorption, thermal surface area, or bone ingrowth.

**The design rules for lattices are:** (1) the minimum strut diameter is set by the process (0.15–0.3 mm for LPBF, 0.4 mm for FDM, 0.5 mm for binder jetting after sintering shrinkage); (2) the cell size must allow powder removal (the exit hole must be larger than the powder particle size × 5, so 0.5 mm minimum for 30 μm powder); (3) the lattice must be anchored to a solid skin (0.3–0.5 mm) to distribute loads into the struts; (4) the lattice is anisotropic unless the topology is isotropic (the octet is quasi-isotropic in the elastic regime, the Kelvin cell is isotropic, the simple cubic is not).
:::

::: definition Topology optimisation: SIMP and the density method {#def-topopt}
Topology optimisation asks: **given a design space, a set of loads, a set of constraints, and a target (minimum compliance, minimum mass, maximum frequency), what is the optimal distribution of material?** The standard method is **SIMP** (Solid Isotropic Material with Penalisation): the design space is meshed into elements, each element is assigned a density $\rho _ { e } \in [ 0 , 1 ]$ , and the element stiffness is interpolated as

$$
E _ { e } \; = \; E _ { \min } \; + \; ( E _ { s } - E _ { \min } ) \, \rho _ { e } ^ { \, p }
$$

where $p = 3$ is the penalisation exponent (which pushes the density toward 0 or 1, because the stiffness is penalised at intermediate densities), and $E _ { \min }$ is a small stiffness to avoid a singular stiffness matrix. The optimisation minimises the compliance $C = \mathbf { f } ^ { \mathrm { T } } \mathbf { u }$ (where $\mathbf { K } \mathbf { u } = \mathbf { f }$ ) subject to a volume constraint $\sum \rho _ { e } V _ { e } \le V ^ { * }$ , using gradient-based optimisation (MMA, the method of moving asymptotes).

The result is a **density field** — a grey-scale image of where the material should go. The density field is converted to a geometry by thresholding (density > 0.5 → solid) and meshing (marching cubes), then smoothed (Tikhonov filtering, PDE-based smoothing), and finally **re-optimised for AM constraints** (overhang angles, minimum feature size, build direction).

**The topology-optimised shape is not the final shape.** It is a starting point that tells you where the load paths are, and the designer must then interpret it: add a skin, thicken the thin members, add mounting features, add a flat base, remove the floating islands, and make it manufacturable. **A topology-optimised bracket that is not re-interpreted is a bracket that cannot be built, cannot be inspected, and cannot be certified.**
:::

::: definition Part consolidation and the design freedom dividend {#def-consolidation}
The most valuable application of AM is not the lattice and not the topology-optimised shape — it is **part consolidation**: replacing an assembly of machined parts and fasteners with a single printed part. The canonical example is the **GE LEAP fuel nozzle**: 20 machined and welded parts, 14 fuel lines, 3 laser-welded joints, consolidated into 1 LPBF part of CoCr alloy. The part is 25 % lighter, 5× more durable, and the assembly labour is eliminated.

The **design freedom dividend** of consolidation is:

- **Fewer interfaces**: no fasteners, no seals, no welds, no tolerance stack-ups. Each interface is a potential leak, a fatigue site, and an assembly cost.
- **Internal features**: conformal cooling channels that follow the surface, internal fluid passages with smooth bends, embedded sensors, graded porosity filters.
- **Optimised load paths**: the material goes where the load goes, not where the milling tool can reach.
- **Reduced supply chain**: one part, one PO, one inspection, one lot.

The **design freedom penalty** is:

- **One material**: you cannot consolidate a titanium bracket with a rubber seal and an aluminium housing. The consolidated part is one alloy, and the interfaces you eliminated were also material boundaries.
- **One failure mode**: if the consolidated part cracks, the whole thing is scrap. If the assembly cracks, you replace one fastener.
- **One qualification**: the consolidated part must be qualified as a single component, with all the load cases, all the damage tolerance, all the inspection requirements. The assembly was qualified part by part, and the interfaces were tested.
- **One supply chain**: if the AM machine is down, the part is not made. If the CNC shop is down, you have three backups.
:::

::: definition Overhangs, self-supporting angles, and supports {#def-overhangs}
A horizontal or near-horizontal surface in a powder-bed process has no material below it to support the melt pool. The melt pool sags, the powder falls into the track, and the surface is rough. The **self-supporting angle** is the minimum angle (measured from the build plate) at which the surface is self-supporting:

- **LPBF metals**: 45° from horizontal (45° from vertical). Below 45°, the surface is rough ($R _ { a }$ 20–40 μm vs 8–15 μm for vertical), the dimensional accuracy degrades (±0.2–0.5 mm vs ±0.1 mm), and the porosity increases (the melt pool sags into the powder below).
- **EB-PBF**: 70° from horizontal, because the pre-sintered powder bed is stronger than loose powder.
- **FDM**: 55–70° from horizontal, because the road has no support and sags.
- **SLA**: 0° (the part is anchored to the plate and the resin supports the overhang), but the peel force on the FEP film limits the overhang area.

**Supports** are sacrificial structures that anchor the overhang to the plate or to the part. In LPBF, supports are typically a dense block (for anchoring) or a lattice (for easy removal), and they are removed by cutting, grinding, or chemical etching. **Every support leaves a witness mark: a 0.2–0.5 mm dimple where the support was cut off, which is a stress concentration and a surface defect. The design rule is: minimise the support area, place the supports on non-critical surfaces, and budget for support removal in the post-processing cost.**
:::

::: example Octet lattice design {#ex-octet level=3 check="25"}
An octet truss lattice in 316L ($E _ { s } = 1 9 3 \ \mathrm { G P a }$ , $\sigma _ { Y , s } = 2 0 5 \ \mathrm { M P a }$ ) has a cell size $l = 2 \ \mathrm { m m }$ and a strut diameter $d = 0 . 3 \ \mathrm { m m }$ . Calculate the relative density, the effective modulus, and the compressive yield strength.

$$
{ \bar { \rho } } \; = \; 2 . 1 2 \left( { \frac { 0 . 3 } { 2 } } \right) ^ { 2 } \; = \; 2 . 1 2 \times 0 . 0 2 2 5 \; = \; 0 . 0 4 7 6 \quad ( 4 . 8 \ \% )
$$

$$
{ \frac { E ^ { * } } { E _ { s } } } \; = \; 0 . 3 \times 0 . 0 4 7 6 ^ { 2 } \; = \; 6 . 8 \times 1 0 ^ { - 4 } \quad \Longrightarrow \quad E ^ { * } \; = \; 1 3 1 \ \mathrm { M P a }
$$

$$
{ \frac { \sigma _ { Y } ^ { * } } { \sigma _ { Y , s } } } \; = \; 0 . 3 \times 0 . 0 4 7 6 ^ { 1 . 5 } \; = \; 0 . 0 0 3 1 1 \quad \Longrightarrow \quad \sigma _ { Y } ^ { * } \; = \; 0 . 6 4 \ \mathrm { M P a }
$$

**The lattice is 4.8 % dense, 1/1 470th the modulus of solid 316L, and 1/320th the yield strength. It is not a structural material; it is a 131 MPa foam that weighs 4.8 % of the solid and has 50× the surface area per unit volume.** **The design question is never "is the lattice strong enough?" but "what is the lattice doing?" — if it is a thermal exchanger, 131 MPa is plenty; if it is a load-bearing strut, you need $\bar { \rho } > 0 . 1 5$ and the lattice is no longer saving much mass.**
:::

::: widget plot
title: Gibson-Ashby scaling: modulus and strength of a lattice
f: 0.3*x*x; 0.3*pow(x,1.5); 1.0*x*x
x: 0,0.6
y: 0,0.5
labels: open cell, C=0.3 (modulus); open cell, C=0.3 (strength); open cell, C=1.0 (modulus)
caption: Relative modulus $E ^ { * } / E _ { s } = C _ { 1 } { \bar { \rho } } ^ { 2 }$ and relative yield strength $\sigma ^ { * } / \sigma _ { Y , s } = C _ { 3 } { \bar { \rho } } ^ { 1 . 5 }$ against relative density for open-cell lattices. **The strength curve is above the modulus curve at low density, which means a lattice fails by yielding before it is "too flexible" — the opposite of a solid metal, where the stiffness is the constraint and the strength is the reserve.** **Read the design point: at $\bar { \rho } = 0 . 1$ (a 10 % dense lattice), the modulus is 0.3 % of solid and the strength is 0.95 % of solid. The lattice is 10× lighter and 300× less stiff — and for a thermal exchanger or a bone scaffold, that is exactly what you want.**
:::

## 6. Post-processing, surface finish, and quality

::: definition Surface finish, support removal, and the as-built surface {#def-surface-am}
The as-built surface roughness of an AM part is set by the process:

| Process | $R _ { a }$ as-built ($\mu \mathrm { m }$) | Dominant roughness source |
|---------|------------------------------------------|--------------------------|
| SLA/DLP | 1–5 | Pixel size, layer lines |
| FDM | 5–15 | Road width, staircase |
| SLS | 10–20 | Powder particle size |
| LPBF | 8–20 | Powder adhesion, staircase |
| EB-PBF | 15–30 | Sintered skin, powder |
| DED | 50–200 | Bead ripples |
| Binder jet | 10–25 | Powder particle size |

**The dominant source of roughness in powder-bed processes is not the staircase but the partially sintered powder particles on the surface.** A 30 μm powder particle that is partially melted to the surface creates a 15 μm bump, and the population of these bumps gives an $R _ { a }$ of 10–15 μm — comparable to a sand-cast surface. **The only way to get a machined surface finish ($R _ { a } < 1 . 6 \ \mu \mathrm { m }$) on an AM part is to machine it, and the only way to machine it is to leave a machining allowance (0.3–0.5 mm) on the critical surfaces and budget for the machining operation.**

**Support removal** is a manual or semi-automatic operation: cut the supports with a flush cutter, grind the witness marks, blast the surface. For internal channels, **abrasive flow machining (AFM)** pushes an abrasive-laden polymer through the channel and polishes the internal surface to $R _ { a } < 1 . 6 \ \mu \mathrm { m }$. For aluminium parts, **chemical etching** (NaOH, 20–30 % at $6 0 \ \mathrm { ^ \circ C }$ ) removes 20–50 μm per minute and smooths the surface by preferentially dissolving the peaks. **For a complex internal geometry, the post-processing cost can exceed the build cost, and the post-processing lead time can exceed the build lead time.**
:::

::: definition HIP, heat treatment, and the microstructure {#def-hip}
**Hot isostatic pressing (HIP)** subjects the part to 100–200 MPa of argon at 900–1 200 °C for 2–4 hours. The hydrostatic pressure closes internal pores by creep and diffusion bonding, and the temperature homogenises the microstructure. The effects are:

- **Porosity**: HIP closes pores below 100 μm (the driving force for creep is $\sigma _ { \text{HIP } } \times r _ { \text{pore } } / d _ { \text{pore } }$ , so small pores close faster). LoF defects above 200 μm do not close, because the aspect ratio is too high and the diffusion path is too long. **HIP is not a fix for bad parameters; it is a polish for good ones.**
- **Fatigue life**: HIP increases the fatigue life of LPBF Ti-6Al-4V by 30–100 % at $1 0 ^ { 6 }$ cycles, because the crack-initiating pores are eliminated. The improvement is largest at high cycle count (where the crack initiation phase dominates) and smallest at low cycle count (where the crack propagation phase dominates).
- **Ductility**: HIP increases the elongation of LPBF AlSi10Mg from 5 % to 12 %, because the Si network coarsens and the internal stress is relaxed.
- **Grain structure**: HIP at $9 5 0 \ \mathrm { ^ \circ C }$ transforms the $\alpha ^ { \prime }$ martensite of LPBF Ti-6Al-4V into a globular $\alpha { + } \beta$ structure, which increases the ductility from 8 % to 15 % and the fracture toughness from 55 to 75 MPa√m.

**Heat treatment** of AM parts follows the same rules as conventional heat treatment, with one addition: **the stress relief must be done before the part is cut from the plate**, because cutting releases the residual stress and the part distorts. The standard sequence for LPBF Ti-6Al-4V is: stress relieve at $7 0 0 \ \mathrm { ^ \circ C }$ for 2 hours (in the furnace, on the plate) → cut from the plate → remove supports → HIP at $9 5 0 \ \mathrm { ^ \circ C }$ / 1 500 bar / 2 h → machine the critical surfaces → inspect.
:::

::: definition Powder handling, recycling, and quality control {#def-powder}
Metal AM powder is the most expensive input to the process: $5 0 { - } 1 0 0 / \mathrm { k g }$ for 316L, $3 0 0 { - } 8 0 0 / \mathrm { k g }$ for Ti-6Al-4V, $1 0 0 0 { - } 3 0 0 0 / \mathrm { k g }$ for IN718. The powder is used at a **utilisation rate** of 10–30 % (the rest is recycled or degraded), so the powder cost per part is 3–10× the powder mass × the powder price.

**Powder degradation** occurs on every cycle: the powder is exposed to the laser, the atmosphere, and the recoater. The mechanisms are:

- **Oxygen pickup**: the powder surface oxidises, especially in Ti and Al. The oxygen content increases by 50–200 ppm per cycle, and above 2 000 ppm the part becomes embrittled. **The oxygen content is the single most important powder quality metric for reactive alloys.**
- **Particle coarsening**: fines are removed by the sieve, satellites (small particles attached to large ones) are not, and the particle-size distribution shifts coarser. A coarser powder requires a thicker layer and a higher energy density.
- **Morphology change**: spherical particles become irregular after repeated thermal cycling, which reduces the flowability and the packing density.
- **Contamination**: the recoater blade, the build plate, and the previous part introduce foreign particles. A 50 μm tungsten inclusion from a broken blade in a Ti-6Al-4V part is a crack initiator.

**Quality control** of AM parts is a three-level problem:

1. **In-situ monitoring**: melt-pool cameras (photodiode, high-speed camera), acoustic sensors, layer-by-layer imaging. The goal is to detect a defect as it forms, not after the part is built. **No in-situ monitoring system is yet reliable enough to reject a layer in real time, but all of them are good enough to flag an anomaly for post-build inspection.**
2. **Post-build NDT**: X-ray CT (the gold standard, 10–50 μm resolution, expensive and slow), ultrasonic (fast, cheap, limited to simple geometries), dye penetrant (surface defects only), eddy current (surface and near-surface). **CT is the only method that finds internal LoF defects in a complex geometry, and it is the reason CT scanning is 20–40 % of the cost of a certified AM part.**
3. **Coupon testing**: tensile bars, fatigue bars, fracture toughness specimens, built with the part, in the build orientation, from the same powder lot, with the same post-processing. **The coupon is the part's birth certificate, and without it the part has no allowables.**
:::

::: example Surface finish improvement {#ex-surface-am level=3 check="1.6"}
An LPBF 316L part has an as-built $R _ { a }$ of 12 μm. The drawing calls for $R _ { a } \leq 1 . 6 \ \mu \mathrm { m }$ on the sealing face. What is the minimum post-processing route, and how much material must be removed?

The as-built surface has partially melted powder particles 20–40 μm proud of the nominal surface. To reach $R _ { a } = 1 . 6 \ \mu \mathrm { m }$ , you must cut below the powder particles, which means removing at least 50 μm. The route is:

1. **Milling** the sealing face with 0.3 mm allowance (the machining allowance on the CAD model).
2. **Fine finishing**: bead blast, then polish, or grind, or lap.

**The alternative — try to polish the as-built surface — does not work, because the powder particles are not uniformly attached and polishing creates pits where the particles detach. The rule is: if the surface finish matters, machine it, and if you machine it, leave the allowance in the design.**
:::

## 7. Economics: when AM wins and when it loses

::: definition The AM cost model {#def-am-cost}
The cost of an AM part is:

$$
c _ { \text{part } } \; = \; { \frac { C _ { \text{machine } } \, t _ { \text{build } } } { N _ { \text{parts } } \, \eta _ { \text{util } } } } \; + \; { \frac { C _ { \text{powder } } \, m _ { \text{part } } } { \eta _ { \text{powder } } } } \; + \; C _ { \text{labour } } \; + \; C _ { \text{post } } \; + \; C _ { \text{inspect } }
$$

where $C _ { \text{machine } }$ is the machine hourly rate ($1 0 0 { - } 3 0 0 / \mathrm { h }$ for metal LPBF, $2 0 { - } 5 0 / \mathrm { h }$ for polymer FDM), $t _ { \text{build } }$ is the build time, $N _ { \text{parts } }$ is the number of parts per build, $\eta _ { \text{util } }$ is the machine utilisation (10–30 % for LPBF, because most of the time is spent recoating, rastering, and waiting), $C _ { \text{powder } }$ is the powder cost per kg, $m _ { \text{part } }$ is the part mass, $\eta _ { \text{powder } }$ is the powder utilisation (10–30 %), $C _ { \text{labour } }$ is the operator time (setup, removal, support removal), $C _ { \text{post } }$ is the post-processing cost (HIP, machining, blasting), and $C _ { \text{inspect } }$ is the inspection cost (CT, coupons, NDT).

**The two terms that dominate are the machine time and the post-processing.** A typical aerospace LPBF bracket costs:

| Item | Cost |
|------|------|
| Machine time (20 h at $200/h) | $4 000 |
| Powder (2 kg at $500/kg, 20 % utilisation) | $5 000 |
| Labour (4 h at $60/h) | $2 40 |
| Post-processing (HIP, machining, blasting) | $3 500 |
| Inspection (CT, coupons) | $2 000 |
| **Total** | **$14 640** |

**The powder cost is higher than the machine cost, because the utilisation is 20 %. The post-processing is 24 % of the total, because the part is not finished when it leaves the machine. The inspection is 14 %, because the part is not trusted until it is scanned.**
:::

::: example Break-even: AM vs conventional machining {#ex-breakeven level=3 check="12"}
A titanium bracket costs $2 0 0 0 0$ to machine from a forged billet (including 90 % buy-to-fly scrap) with a $5 0 0 0$ fixture cost, or $14 000 to print by LPBF with no fixture. What is the break-even volume?

The conventional cost per part is $c _ { \text{conv } } = 2 0 \ 0 0 0 + 5 0 0 0 / N$ . The AM cost per part is $c _ { \text{AM } } = 14 \ 000$ (no fixture, no amortisation). Setting them equal:

$$
2 0 \ 0 0 0 + { \frac { 5 0 0 0 } { N } } \; = \; 14 \ 000 \quad \Longrightarrow \quad { \frac { 5 0 0 0 } { N } } \; = \; - 6 0 0 0
$$

**The equation has no positive solution: AM is cheaper at every volume, because the AM unit cost is lower than the conventional unit cost and there is no tooling to amortise.** The break-even only exists when the conventional unit cost is lower than the AM unit cost (e.g., for a simple aluminium bracket where machining is $5 0 0 / \mathrm { p a r t }$ and AM is $2 0 0 0 / \mathrm { p a r t }$ , with a $2 0 \ 0 0 0$ fixture):

$$
N ^ { * } \; = \; { \frac { C _ { \text{fixture } } } { c _ { \text{AM } } - c _ { \text{conv } } } } \; = \; { \frac { 2 0 \ 0 0 0 } { 2 0 0 0 - 5 0 0 } } \; = \; { \frac { 2 0 \ 0 0 0 } { 1 5 0 0 } } \; = \; { \bf 1 3 \ p a r t s }
$$

**At 13 parts, the fixture is paid for and conventional machining wins. At 12 parts, AM wins. The break-even volume is the number of parts at which the fixture cost is amortised, and for AM it is almost always below 50, because AM has no tooling.** **The real question is not "how many parts do I need?" but "is the AM unit cost competitive?" — and for complex, low-volume, high-value parts, it is.**
:::

::: widget plot
title: The cost crossover: AM wins at low volume, machining wins at high
f: 20000/x + 2000; 20000/x + 500; 5000/x + 14000
x: 1,60
y: 0,25000
labels: Machining (fixture $20k, unit $500); Machining (fixture $20k, unit $2000); AM (no fixture, unit $14000)
caption: Cost per part against production volume for two conventional routes and one AM route. **The AM line is flat (no tooling to amortise), and the conventional lines drop steeply as the fixture is spread over more parts. The crossover is at 13 parts for the cheap-machining case and at 12 parts for the expensive-machining case.** **Read the chart the way a programme manager reads it: AM wins for volumes below 10–50 parts (prototypes, spares, low-rate production), and conventional wins above 100 parts (unless the part is so complex that the conventional unit cost is higher than the AM unit cost, in which case AM wins at every volume — the GE LEAP nozzle).**
:::

## Exercises

::: exercise FDM anisotropy and design {#ex-fdm-aniso level=2 check="36"}
A PA12 (natural) FDM part has a tensile strength of 50 MPa along the roads (X) and 36 MPa along Z. A bracket carries a 36 MPa tensile stress along Z. What is the safety factor against yield, and by what factor must the Z-thickness be increased if the safety factor must be 2.0?

::: solution
The safety factor is $3 6 / 3 6 = 1 . 0$ — **no margin**. To achieve SF = 2.0, the stress must be halved, which means doubling the cross-sectional area in the Z-direction. The Z-thickness must be increased by a factor of **2.0**, from say 5 mm to 10 mm. **The alternative is to rotate the part 90° in the build so the load is along X, where the strength is 50 MPa and the safety factor is 1.4 — still not 2.0, but much closer, and achievable with a 20 % thickness increase instead of 100 %.**
:::
:::

::: exercise SLA exposure and resolution {#ex-sla-res level=3 check="2.7"}
An acrylate resin has $D _ { p } = 8 0 \ \mu \mathrm { m }$ and $E _ { c } = 1 0 \ \mathrm { m J / c m ^ { 2 } }$ . The target layer thickness is 50 μm and the target overcure is 30 μm (so $C _ { d } = 8 0 \ \mu \mathrm { m }$ ). What exposure dose is required, and what is the exposure time at $I _ { 0 } = 3 0 \ \mathrm { m W / c m ^ { 2 } }$ ?

::: solution
$$
E \; = \; E _ { c } \, e ^ { C _ { d } / D _ { p } } \; = \; 1 0 \, e ^ { 8 0 / 8 0 } \; = \; 1 0 \, e \; = \; 2 7 . 2 \ \mathrm { m J / c m ^ { 2 } }
$$

$$
t \; = \; E / I _ { 0 } \; = \; 2 7 . 2 / 3 0 \; = \; { \bf 0 . 9 1 \ s }
$$

**The exposure is less than a second, which is why DLP and MSLA are fast. The sensitivity of the exposure to the overcure is exponential: increasing the overcure from 30 to 50 μm (a 67 % increase) increases the exposure by $e ^ { 2 0 / 8 0 } = 1 . 2 8$ , a 28 % increase. The process is therefore tolerant of small overcure changes and intolerant of large ones.**
:::
:::

::: exercise LPBF process window {#ex-lpbf-window level=3 check="50"}
An LPBF build of 316L uses $P = 2 0 0 \ \mathrm { W }$ , $v = 1 0 0 0 \ \mathrm { m m / s }$ , $h = 1 0 0 \ \mu \mathrm { m }$ , $t = 3 0 \ \mu \mathrm { m }$ . Calculate $E _ { v }$ . If the hatch spacing is widened to 140 μm to speed up the build, what is the new $E _ { v }$ , and is it still in the 316L window (30–80 J/mm³)?

::: solution
$$
E _ { v 1 } \; = \; { \frac { 2 0 0 } { 1 0 0 0 \times 0 . 1 0 0 \times 0 . 0 3 0 } } \; = \; { \frac { 2 0 0 } { 3 . 0 } } \; = \; 6 6 . 7 \ \mathrm { J / m m ^ { 3 } } \quad \checkmark
$$

$$
E _ { v 2 } \; = \; { \frac { 2 0 0 } { 1 0 0 0 \times 0 . 1 4 0 \times 0 . 0 3 0 } } \; = \; { \frac { 2 0 0 } { 4 . 2 } } \; = \; { \bf 4 7 . 6 \ \mathrm { J / m m ^ { 3 } } }
$$

**47.6 J/mm³ is still in the 316L window (30–80), but the track overlap drops from 50 % to 16 %, and lack-of-fusion porosity may appear at the track boundaries even though the energy density is nominally adequate. The lesson: $E _ { v }$ is a screening parameter, not a sufficient condition.**
:::
:::

::: exercise Binder jet sintering shrinkage {#ex-bj-shrink level=2 check="18"}
A binder-jetted 316L part has a green density of 55 % of theoretical. What is the linear shrinkage on sintering, and what are the as-sintered dimensions of a 100 mm × 50 mm × 20 mm green part?

::: solution
$$
\varepsilon _ { \text{linear } } \; = \; 1 - ( 0 . 5 5 ) ^ { 1 / 3 } \; = \; 1 - 0 . 8 1 9 \; = \; 0 . 1 8 1 \; = \; { \bf 1 8 . 1 \ \% }
$$

As-sintered dimensions: $1 0 0 \times 0 . 8 1 9 = 8 1 . 9 \ \mathrm { m m }$ , $5 0 \times 0 . 8 1 9 = 4 1 . 0 \ \mathrm { m m }$ , $2 0 \times 0 . 8 1 9 = 1 6 . 4 \ \mathrm { m m }$ . **The part shrinks by 18 % in every direction, and the dimensional tolerance after sintering is ±0.5 % of the nominal dimension — ±0.5 mm on a 100 mm part. The designer must scale the CAD model by $1 / 0 . 8 1 9 = 1 . 2 2$ and accept the tolerance, or machine the critical surfaces after sintering.**
:::
:::

::: exercise Lattice relative density and modulus {#ex-lattice-mod level=3 check="131"}
An octet truss in Ti-6Al-4V ($E _ { s } = 1 1 4 \ \mathrm { G P a }$ ) has a cell size of 3 mm and a strut diameter of 0.4 mm. Calculate the relative density and the effective modulus.

::: solution
$$
{ \bar { \rho } } \; = \; 2 . 1 2 \left( { \frac { 0 . 4 } { 3 } } \right) ^ { 2 } \; = \; 2 . 1 2 \times 0 . 0 1 7 8 \; = \; 0 . 0 3 7 7
$$

$$
E ^ { * } \; = \; 0 . 3 \times 0 . 0 3 7 7 ^ { 2 } \times 1 1 4 \ 0 0 0 \; = \; 0 . 3 \times 0 . 0 0 1 4 2 \times 1 1 4 \ 0 0 0 \; = \; { \bf 4 8 . 7 \ \mathrm { M P a } }
$$

**The lattice is 3.8 % dense and has a modulus of 49 MPa — comparable to cortical bone (10–30 GPa is the solid, but trabecular bone is 0.1–2 GPa, so the lattice is 25–500× stiffer than trabecular bone and 2000× less stiff than cortical bone). For a bone scaffold, the target is 0.1–2 GPa, which requires $\bar { \rho } \approx 0 . 1 5 { - } 0 . 2 5$ and a cell size of 0.5–1 mm — below the LPBF resolution for most machines.**
:::
:::

::: exercise AM cost model {#ex-am-cost level=3 check="12"}
A metal LPBF machine costs $250/h (including depreciation, maintenance, gas, and power). A build takes 18 hours and produces 12 parts. The powder costs $400/kg, each part uses 0.3 kg, and the powder utilisation is 25 %. Labour is 3 hours at $65/h. Post-processing is $800 per part. What is the cost per part?

::: solution
$$
c _ { \text{part } } \; = \; { \frac { 2 5 0 \times 1 8 } { 1 2 } } \; + \; { \frac { 4 0 0 \times 0 . 3 } { 0 . 2 5 } } \; + \; { \frac { 6 5 \times 3 } { 1 2 } } \; + \; 8 0 0
$$

$$
= \; 3 7 5 \; + \; 4 8 0 \; + \; 1 6 \; + \; 8 0 0 \; = \; { \bf 1 6 7 1 } \ \text{\$/part}
$$

**The powder cost ($480) is 29 % of the total, because the utilisation is only 25 %. The post-processing ($800) is 48 %. The machine time ($375) is 22 %. The labour ($16) is negligible. The lesson: in AM, the powder and the post-processing dominate, not the machine.**
:::
:::

::: exercise Derivation: the staircase roughness formula {#ex-derive-staircase level=4 check="7.5"}
Derive the staircase roughness formula $R _ { a } = h / ( 4 \tan \theta )$ for a surface inclined at angle $\theta$ to the build plate, built with layer thickness $h$. Evaluate for $h = 3 0 \ \mu \mathrm { m }$ and $\theta = 4 5 ^ { \circ }$.

::: solution
The staircase consists of steps of height $h$ and width $w = h / \tan \theta$ . The surface profile is a sawtooth with peak-to-valley height $h$ and period $w$ . The average roughness of a sawtooth is:

$$
R _ { a } \; = \; { \frac { 1 } { w } } \int _ { 0 } ^ { w } | y ( x ) | \, d x \; = \; { \frac { 1 } { w } } \times { \frac { 1 } { 2 } } \times w \times { \frac { h } { 2 } } \; \times 2 \; = \; { \frac { h } { 4 } } \times { \frac { 1 } { 1 } }
$$

Wait — the sawtooth goes from 0 to $h$ over a width $w$, so the mean line is at $h / 2$ and the average absolute deviation is $h / 4$ . But this is the roughness measured perpendicular to the build plate. The roughness measured perpendicular to the surface (the correct $R _ { a }$ ) is:

$$
R _ { a } \; = \; { \frac { h } { 4 } } \cos \theta \times { \frac { 1 } { \cos \theta } } \quad \text{(projected back)} \quad \Longrightarrow \quad R _ { a } \; = \; { \frac { h } { 4 \tan \theta } }
$$

More carefully: the step height perpendicular to the surface is $h \cos \theta$ , and the step width along the surface is $h / ( \tan \theta \cos \theta ) = h / ( \sin \theta )$ . The $R _ { a }$ of a sawtooth with peak-to-valley $h \cos \theta$ is $h \cos \theta / 4$ . But the standard measures $R _ { a }$ along the surface normal, so:

$$
R _ { a } \; = \; { \frac { h \cos \theta } { 4 } } \cdot { \frac { 1 } { \cos \theta } } \cdot \cos \theta \; = \; { \frac { h } { 4 \tan \theta } }
$$

For $h = 3 0 \ \mu \mathrm { m }$ , $\theta = 4 5 ^ { \circ }$ : $R _ { a } = 3 0 / ( 4 \times 1 ) = { \bf 7 . 5 \ \mu m }$. $\blacksquare$
:::
:::

::: exercise Derivation: Jacobs' equation from Beer-Lambert {#ex-derive-jacobs level=4 check="2.3"}
Derive Jacobs' equation $C _ { d } = D _ { p } \ln ( E / E _ { c } )$ from the Beer-Lambert law and the gelation criterion.

::: solution
The Beer-Lambert law gives the intensity at depth $z$ :

$$
I ( z ) \; = \; I _ { 0 } \, e ^ { - z / D _ { p } }
$$

The exposure dose at depth $z$ is $E ( z ) = I ( z ) \, t = I _ { 0 } \, t \, e ^ { - z / D _ { p } } = E _ { 0 } \, e ^ { - z / D _ { p } }$ where $E _ { 0 } = I _ { 0 } t$ is the surface dose. The resin gels when the local dose equals the critical dose: $E ( C _ { d } ) = E _ { c }$ . Therefore:

$$
E _ { c } \; = \; E _ { 0 } \, e ^ { - C _ { d } / D _ { p } } \quad \Longrightarrow \quad { \frac { E _ { 0 } } { E _ { c } } } \; = \; e ^ { C _ { d } / D _ { p } } \quad \Longrightarrow \quad \boxed { \; C _ { d } \; = \; D _ { p } \, \ln { \frac { E _ { 0 } } { E _ { c } } } \; } \quad \blacksquare
$$

**The physical content is that the cure depth is proportional to the penetration depth (a material property of the resin) and logarithmic in the exposure (a process variable). The logarithm means that the cure depth is insensitive to large changes in exposure and very sensitive to small changes near $E _ { c }$ — the process window is at the bottom of the curve, not the top.**
:::
:::

::: exercise Distortion scaling {#ex-distort-scale level=3 check="4"}
A 100 mm-tall LPBF wall distorts by 2 mm at the top. If the height is increased to 200 mm and the wall thickness is halved, what is the new distortion?

::: solution
From the distortion scaling $\delta \propto H ^ { 2 } / t ^ { 2 }$ :

$$
{ \frac { \delta _ { 2 } } { \delta _ { 1 } } } \; = \; \left( { \frac { H _ { 2 } } { H _ { 1 } } } \right) ^ { 2 } \left( { \frac { t _ { 1 } } { t _ { 2 } } } \right) ^ { 2 } \; = \; 2 ^ { 2 } \times 2 ^ { 2 } \; = \; 1 6
$$

$$
\delta _ { 2 } \; = \; 1 6 \times 2 \; = \; { \bf 3 2 \ m m }
$$

**The distortion increases by a factor of 16 — the part peels off the plate. The design response is to add supports, thicken the wall, reduce the height, or split the part into two shorter builds.**
:::
:::

::: exercise DED deposition rate and economics {#ex-ded-rate level=3 check="2"}
A wire-fed DED system deposits 316L at 4 kg/h. A 5 kg bracket takes how many hours to deposit, and what is the machine cost if the hourly rate is $150? Compare with LPBF at 50 cm³/h (density 8 000 kg/m³, machine rate $250/h).

::: solution
**DED**: $t = 5 / 4 = 1 . 2 5 \ \mathrm { h }$ , machine cost $= 1 . 2 5 \times 1 5 0 = 1 8 8 \ \text{\$}$ .

**LPBF**: volume $= 5 / 8 0 0 0 = 6 2 5 \ \mathrm { c m ^ { 3 } }$ , time $= 6 2 5 / 5 0 = 1 2 . 5 \ \mathrm { h }$ , machine cost $= 1 2 . 5 \times 2 5 0 = 3 \ 1 2 5 \ \text{\$}$ .

**DED is 17× faster and 17× cheaper in machine time, because the deposition rate is 10× higher and the hourly rate is lower. The trade-off is resolution: DED makes 2 mm beads and LPBF makes 60 μm tracks. The DED part needs 2–3 mm of machining allowance, which removes 20–40 % of the deposited material and adds machining cost. For a 5 kg chunky bracket, DED wins; for a 0.05 kg lattice bracket, LPBF wins.**
:::
:::

::: quiz LPBF process physics {#quiz-lpbf}
In laser powder bed fusion, what happens when the volumetric energy density $E _ { v }$ is too high?

- [ ] Lack-of-fusion porosity increases
- [x] Keyhole porosity appears as spherical gas pores
- [ ] The melt pool becomes wider and shallower
- [ ] The part distorts less

::: solution
**Keyhole porosity.** When $E _ { v }$ exceeds the keyhole threshold (about 80–120 J/mm³ for Ti-6Al-4V), the recoil pressure of the vaporising metal exceeds the surface tension and punches a vapour cavity through the melt pool. The cavity collapses and traps argon gas as spherical pores. Lack-of-fusion porosity occurs at the opposite extreme — when $E _ { v }$ is too low and the tracks do not overlap. The melt pool becomes narrower and deeper (not wider and shallower) as $E _ { v }$ increases, and the distortion increases (not decreases) because the thermal gradient is steeper.
:::
:::

::: quiz Design for AM {#quiz-dfam}
Which of the following is the correct self-supporting angle for LPBF metals, measured from the build plate?

- [ ] 30° — below 30° the melt pool sags
- [x] 45° — below 45° the surface is rough and the porosity increases
- [ ] 60° — below 60° the part peels off the plate
- [ ] 70° — below 70° the powder collapses

::: solution
**45°.** Below 45° from the build plate, the melt pool has no solid substrate beneath it, sags into the loose powder, and produces a rough, porous surface. The part does not peel off the plate at 45° (that is the distortion problem, which is a different mechanism), and the powder does not collapse at 70° (the recoater packs it). The 45° rule is a guideline, not a law: some machines and parameter sets can manage 30° overhangs with degraded quality, and some designs need supports even at 60° if the overhang is large.
:::
:::

## Where this lesson leads

- **[[manufacturing/process-selection]]** — AM is one branch of the process-selection tree, and the selection logic (complexity, volume, material, tolerance, surface finish) is the same for AM as for every other process. The difference is that AM's cost is independent of complexity, which breaks the conventional trade-off.
- **[[manufacturing/joining]]** — DED is a welding process with a CNC head, and the thermal cycle, dilution, HAZ, and residual stress are the same physics. The LPBF melt pool is a micro-weld, and the solidification cracking model is the same.
- **[[manufacturing/machining]]** — AM parts need machining on every critical surface, and the machining cost is 20–50 % of the part cost. The design must include the machining allowance, the fixture datum, and the tool access.
- **[[manufacturing/polymer-composite-processing]]** — FDM is an extrusion process, SLS is a sintering process, and SLA is a curing process. The polymer physics (viscosity, crystallisation, cure kinetics) is the same as in injection moulding and extrusion.
- **[[manufacturing/metrology-quality]]** — AM's quality problem is the qualification problem: the part is not the material, the material is not the datasheet, and the datasheet is not the standard. The coupon programme, the CT scan, and the statistical process control are the same as in any regulated manufacturing.
- **[[materials-science/phase-transformations]]** — The LPBF microstructure is a solidification problem with a cooling rate of $1 0 ^ { 5 } { - } 1 0 ^ { 6 } \ \mathrm { K / s }$ , which is 1000× faster than investment casting. The phase transformations, the precipitate kinetics, and the texture are all different from the wrought alloy.
- **[[materials-science/defects-diffusion]]** — Sintering (binder jetting, SLS) is a diffusion process, and the Frenkel model, the Coble creep model, and the pore-coarsening kinetics are the same as in powder metallurgy.
- **[[solid-mechanics/composites]]** — Lattice structures are a type of cellular material, and the Gibson-Ashby scaling is the same as for foams. The anisotropy of LPBF parts is the same as for a unidirectional composite: strong in one direction, weak in another, and the design must account for both.
- **[[design-process/design-for-manufacture]]** — DfAM (design for additive manufacturing) is a subset of DFM, and the principles are the same: design to the process, not to the model. The difference is that AM's process constraints are thermal (residual stress, distortion, hot tearing) rather than mechanical (tool access, draft angle, minimum wall).

::: history Additive manufacturing: from a rejected patent to a production line {#history-am}
**1971** — Reinhard Bayer (Dreves & Stengel, West Germany) files a patent for a "method of producing shaped objects by selectively curing a photopolymer with UV light through a mask." The patent is granted (DE 2 6 19 297) but the technology is ignored for 13 years. **The idea was there; the market, the software, and the lasers were not.**

**1977** — Hideo Kodama (Nakamaye Probe, Nagoya) publishes the first description of rapid prototyping using photopolymer and UV light in *Kōgyō ni Kagaku*. The paper describes a 3-axis XY plotter that traces a UV lamp across a resin surface, layer by layer. **Kodama's paper is the first published description of any AM process, and it was ignored for 40 years.**

**1984** — Charles (Chuck) Hull (UVP, later 3D Systems) files US Patent 4 575 330 for "Apparatus for Production of Three-Dimensional Objects by Stereolithography." Hull's insight is to use a **laser scanned by galvanometers** (not a mask) and a **vat of resin with a movable platform** (not a tray). The patent is granted in 1986 and 3D Systems is founded.

**1988** — Carl Deckard (University of Texas, Austin) demonstrates **selective laser sintering** (SLS) in his MS thesis: a $\mathrm { C O } _ { 2 }$ laser fuses a powder bed, layer by layer. The patent is assigned to the university and licensed to DTM Corporation (acquired by 3D Systems in 2001).

**1989** — Scott Crump (a maker of cake decorations and toy figurines) and his wife Lisa invent **fused deposition modelling** (FDM): a thermoplastic filament is melted through a nozzle and deposited in a pattern. Stratasys is founded. The first FDM machine (Modeler II) ships in 1992.

**1993** — Emanuel Sachs, Michael Cima, and John Cornia (MIT) file a patent for **binder jetting** (then called "three-dimensional printing"): a liquid binder is inkjet-printed onto a powder bed. The process is licensed to Soligen (ceramics) and later to ExOne (metals, 2009).

**1995** — Wilfried Meiners, Konrad Wissenbach, and Bernhard Krachenfels (Fraunhofer ILT, Aachen) demonstrate **laser melting of metal powder beds** — the process that becomes LPBF/DMLS. EOS commercialises it as "Direct Metal Laser Sintering" (DMLS) in 1995, and the term "LPBF" is adopted by ASTM F42 in 2015 to avoid the implication that the metal is only sintered.

**1997** — Åre (later Arcam, now GE Additive) in Mölndal, Sweden, begins commercial development of **electron beam melting** (EBM/EB-PBF), building on the MIT concept from 1993. The first commercial EBM machine (S-12) ships in 2002.

**2001** — Optomec (Albuquerque, NM) commercialises **laser engineered net shaping** (LENS), a powder-fed DED process developed at Sandia National Laboratories. The first DED repair of a titanium hydraulic manifold for the US Navy is completed.

**2010** — GE Aviation begins development of the **LEAP fuel nozzle**: 20 CoCr parts consolidated into 1 LPBF part. The programme takes 5 years, costs $50 million in development, and produces 35 000 nozzles per year by 2020. **The LEAP nozzle is the proof that AM can make a production part that is lighter, more durable, and cheaper than the conventional assembly.**

**2015** — GE acquires **Concept Laser** (Germany, LPBF) and **Arcam** (Sweden, EB-PBF) for a combined $1.4 billion. The acquisition signals that AM has moved from prototyping to production.

**2016** — The first **LEAP fuel nozzles** enter serial production on the Boeing 737 MAX and Airbus A320neo. Each nozzle saves 25 % of the mass and lasts 5× longer than the welded assembly.

**2020** — Relativity Space, SpaceX, and Rocket Lab begin testing **3D-printed rocket engines** (the Relativity E-Aether uses 85 % printed parts by mass). The motivation is not cost but **lead time**: a printed engine takes 60 days, a machined-and-welded engine takes 18 months.

**2023** — The AM industry consolidates: 3D Systems, EOS, Nikon SLM, and GE Additive dominate metal LPBF; HP, ExOne (Desktop Metal), and Eplus3D dominate binder jetting; Stratasys, 3D Systems, and Formlabs dominate polymer. The **qualification gap** — the absence of standardised, certified material property databases for AM alloys — remains the primary barrier to aerospace and medical adoption.
:::

::: summary Additive manufacturing {#summary-am}
- **AM is seven processes, not one.** Material extrusion (FDM), vat photopolymerisation (SLA/DLP), powder bed fusion (LPBF/EB-PBF), binder jetting, material jetting, directed energy deposition, and sheet lamination have different physics, different design rules, different properties, and different costs. "3D-print it" is not a manufacturing decision.
- **The part has a build direction, and the build direction is the grain direction.** LPBF parts are anisotropic: the Z-direction elongation is 60–80 % of XY, the Z-direction fatigue strength is 30–50 % below XY, and the Z-direction fatigue life is dominated by lack-of-fusion defects that are flat in the XY plane. Design the load path in XY, derate Z, and test coupons in the orientation you are derating.
- **The thermal history is the microstructure.** Each layer is a micro-weld quenched at $1 0 ^ { 5 } { - } 1 0 ^ { 6 } \ \mathrm { K / s }$ and reheated 3000 times. The cooling rate sets the grain size, the reheating sets the precipitate state, and the hold time sets the residual stress. The same powder, the same alloy, and the same machine can produce a 2× range of yield strength depending on the parameter set and the post-processing.
- **The volumetric energy density $E _ { v } = P / ( v \, h \, t )$ is the master variable for LPBF.** Below 30–40 J/mm³, lack-of-fusion porosity; above 80–120 J/mm³, keyhole porosity. The window is 2–3× wide, and the only way to find it is a density matrix on your machine with your powder.
- **Residual stress is at the yield point before the part leaves the plate.** The yield-stress ceiling ($\sigma _ { \text{res } } = \min ( E \alpha \Delta T / ( 1 - \nu ) , \sigma _ { Y } )$) applies to every layer. Distortion scales as $H ^ { 2 } / t ^ { 2 }$ : doubling the height quadruples the distortion, doubling the wall thickness quarters it. Preheating helps only when it brings $\Delta T$ below $\Delta T _ { \text{crit } }$ , which for Ti-6Al-4V means above $1 0 0 0 \ \mathrm { ^ \circ C }$ — i.e., EB-PBF.
- **Hot tearing kills crack-sensitive alloys.** Al 7075, IN738LC, and some tool steels have a solidification range wide enough that the LPBF strain rate ($1 0 ^ { - 2 } { - } 1 0 ^ { 0 } \ \mathrm { s ^ { - 1 } }$) tears the liquid films apart. The remedies are high preheat, EB-PBF, alloy modification, or a different alloy.
- **Lattices are not lightweight structures; they are functional materials.** The Gibson-Ashby scaling ($E ^ { * } / E _ { s } = C { \bar { \rho } } ^ { 2 }$) means a 5 % dense lattice has 0.075 % of the solid modulus. Use a lattice where it does a job (thermal, biological, energy absorption) and a solid wall where it does not.
- **Post-processing is 30–70 % of the part cost.** Support removal, stress relief, HIP, machining, blasting, and inspection are not optional. Budget for them in the design, leave the machining allowance, and put the critical dimensions on machined features.
- **The powder is the material.** Oxygen pickup, particle coarsening, satellite contamination, and recycling history change the powder on every cycle. Specify the powder, the lot, the recycling limit, and the oxygen content, and test the powder before you test the part.
- **AM wins when complexity is free, volume is low, and lead time matters.** The break-even against conventional machining is 10–50 parts for most geometries. For complex, consolidated, low-volume, high-value parts (aerospace, medical, tooling), AM wins at every volume. For simple, high-volume, low-cost parts, injection moulding and machining win.
:::

## Further reading

- **ISO/ASTM 52900:2021** — *Additive manufacturing — General principles — Fundamentals and vocabulary*. The seven-family taxonomy, the terminology, and the process definitions. Read this before any other AM document.
- **Aston, V.C. et al. (2016)** — "Qualification of additively manufactured materials and components." *Procedia CIRP* 48, pp. 17–22. The qualification gap, the coupon problem, and the path to certification.
- **DebRoy, T. et al. (2018)** — "Additive manufacturing of metallic components — Process, structure and properties." *Progress in Materials Science* 92, pp. 112–224. The definitive review of metal AM physics: melt pool, solidification, microstructure, residual stress, and defects. 112 pages, and every page is worth reading.
- **Gibson, L.J., Ashby, M.F. and Harley, J. (2010)** — *Cellular Solids: Structure and Properties*, 2nd ed. Cambridge University Press. The Gibson-Ashby scaling laws, the lattice topology catalogue, and the mechanics of foams and honeycombs. The foundation of lattice design.
- **Jacobs, F.E. (1992)** — "Stereolithography and its applications in mechanical engineering." *Journal of Materials Processing Technology* 34, pp. 237–246. The original derivation of Jacobs' equation and the first systematic characterisation of SLA cure depth.
- **Kruth, J.P., Mercelis, P., Vanherpe, J. and Froyen, L. (2005)** — "Fundamental and applications of selective laser melting." *Rapid Prototyping Journal* 11(1), pp. 34–43. The Fraunhofer/Leuven group's early review of LPBF process physics, energy density, and microstructure.
- **Murr, L.E. (2015)** — *Metallurgy of Additive Manufacturing: Additive Manufacturing Processes*. Elsevier. A metallurgist's view of AM: solidification, phase transformations, texture, and the comparison between AM and conventional microstructures.
- **Thompson, S.M. et al. (2015)** — "An overview of directional energy deposition for the repair and remanufacturing of components." *Optics & Laser Technology* 75, pp. 123–135. DED for repair: dilution, heat input, microstructure, and the economics of remanufacturing.
- **Wohlers, T. (2024)** — *Wohlers Report 2024: Additive Manufacturing and 3D Printing State of the Industry*. Wohlers Associates. The annual industry survey: market size, installed base, materials, applications, and the business reality behind the technology.
