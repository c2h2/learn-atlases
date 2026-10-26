Additive manufacturing is the only family of processes in which the part's geometry, its microstructure, and its residual stress are all decided by the same thing: the thermal history of a point in the part as it passes from powder or filament to finished solid. That single fact explains everything that is good about AM and everything that is hard. It is good because a process that builds layer by layer can make geometries no tool can reach — a closed lattice inside a bracket, a cooling channel that follows a turbine blade's surface, a bracket that consolidates twenty machined parts and fourteen fasteners into one piece. It is hard because the same layer-by-layer construction means the part has a grain direction that is not the rolling direction, a surface that is a staircase, a strength that depends on which way you load it, a residual stress that is at the yield point before the part leaves the build plate, and a porosity population that depends on the argon flow rate on a Tuesday afternoon. **A machined billet is a known material in an unknown shape; an AM part is a known shape in a material you have to characterise yourself.**

The engineering question AM asks is never "can the machine print it?" — the machine can print almost anything you give it. The question is: **what are the properties of the thing that comes out, and what do I have to do to the machine, the powder, the atmosphere, the build plate, the post-processing, and the inspection to make those properties reproducible enough to put in an aircraft, a hip implant, or a pressure vessel?** The answer is a long chain of process physics, thermal mechanics, powder metallurgy, and quality control, and the whole of this lesson is about that chain.

::: warning Nine ways AM projects go wrong
**Treating AM as a process rather than a family.** "We are going to 3D-print it" is not a manufacturing decision. FDM at 0.2 mm layers, LPBF at 30 μm layers, binder jetting with 18 % sintering shrinkage, and DED at 5 mm bead width are four different processes with four different design rules, four different property sets, and four different cost structures. **Specify the process family, the machine, the parameter set, the powder lot, and the post-processing route, and then call it AM.** **Designing for the CAD model instead of the as-built part.** The CAD model is a wish. The as-built part has a staircase surface, 45° overhangs that are not 45° because of the melt-pool shape, a 0.4 mm wall that is 0.55 mm because of the laser spot, and a hole that is 0.3 mm undersize because of the partially sintered powder on its surface. **Design to the as-built envelope, not the model, and put the critical dimensions on machined features.** **Ignoring the build direction.** An LPBF tensile bar tested along Z has 60–80 % of the elongation of the same bar tested along X, because the prior-β columnar grains and the lack-of-fusion defects are aligned with the build direction. A lattice that is designed as "isotropic" is not isotropic if it is built on a 45° staircase. **Specify the load direction, then specify the build direction, then specify the post-processing, and then draw the part.** **Not budgeting for post-processing.** The part comes off the plate with supports welded to it, residual stress at yield, a surface roughness of Ra 10–20 μm, and a microstructure nobody wants. Cutting it off the plate, removing the supports, stress-relieving, HIP-ing, machining the critical faces, and inspecting it can cost more than the build itself. **For a typical aerospace LPBF bracket, post-processing and inspection together cost about as much as the build itself, and often more.** **Assuming the powder is the material.** Gas-atomised 316L powder is not 316L: it has 200–400 ppm oxygen, a nitrogen content that depends on the atomisation gas, satellite particles that create internal porosity, and a particle-size distribution that changes every time you recycle it. **Specify the powder, the lot, the recycling history, and the oxygen limit, and test the powder before you test the part.** **Skipping the qualification.** A machined 7075-T651 plate has forty years of allowables. An LPBF AlSi10Mg bracket from your machine, with your parameters, your powder, and your post-processing, has the allowables you generate from your own coupons. **If you cannot produce a statistically valid dataset from at least thirty coupons in three orientations and two heat-treat conditions, you do not have a material, you have a prototype.** **Not designing for removal.** A closed cavity with no exit hole traps powder that will never come out. A lattice with 0.2 mm struts and 0.3 mm cells cannot be cleaned. A support inside an internal channel cannot be reached. **Design the powder removal path before you design the cavity, and if you cannot remove the powder, do not make the cavity.** **Over-designing the lattice.** A lattice that replaces a solid wall saves 80 % of the mass and 20 % of the stiffness, and then the designer adds a second lattice to make up the stiffness and the part is heavier than the original. **Use a lattice where it does a job — energy absorption, thermal management, bone ingrowth, weight-critical secondary structure — and use a solid wall where it does not.** **Assuming the machine's "standard parameters" are your parameters.** The machine OEM's parameter set is a starting point, not a qualified process. The same machine, the same alloy, and the same parameter set can produce 99.9 % dense or 97 % dense depending on the powder lot, the recoater blade wear, the chamber temperature, and the oxygen level. **Qualify your own parameters on your own machine with your own powder, and monitor them.**
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
R _ { a , \text{staircase } } \; = \; { \frac { h \cos \theta } { 4 } } \qquad { \bigl [ } \theta \; = \; \text{angle from the build plate, } h \; = \; \text{layer thickness } { \bigr ] }
$$

(a sawtooth of peak-to-valley height $h \cos \theta$ measured normal to the surface; see [[#ex-derive-staircase]]). For a 30 μm layer on a 45° surface, $R _ { a } = 5 . 3 \ \mu \mathrm { m }$ ; for a 100 μm layer it is $1 8 \ \mu \mathrm { m }$ . On a near-vertical surface ($\theta \to 9 0 ^ { \circ }$) the staircase vanishes and the roughness is set by the powder or the road width instead; on shallow surfaces the model's steps become long and flat, and the roughness is dominated by the step edges. **The practical consequence is that the surface finish of an AM part depends on its orientation in the build, and the orientation that gives the best surface is usually the one that gives the worst strength, because the staircase is perpendicular to the load.**

The **build direction** (conventionally Z) creates three kinds of anisotropy:

- **Geometric anisotropy**: the staircase, the different surface roughness on horizontal versus vertical faces, and the dimensional accuracy that is typically ±0.1–0.3 mm in XY and ±0.15–0.5 mm in Z.
- **Microstructural anisotropy**: in LPBF, each melt track solidifies as columnar grains growing away from the fusion boundary, and because the tracks are stacked, the grains grow epitaxially from layer to layer into a **strongly textured columnar structure** that can span hundreds of layers. In Ti-6Al-4V the prior-β grains are 100–500 μm long along Z; in 316L the columnar grains are 50–200 μm wide and can run the full height of the part.
- **Defect anisotropy**: lack-of-fusion defects, unmelted powder, and keyhole pores are flattened in the XY plane and therefore act as **crack-like defects in Z-loaded fatigue**, which is why the Z-direction fatigue strength of LPBF Ti-6Al-4V is 30–50 % below the XY direction.

**The engineer's rule: design the part so the principal tensile stress is in the XY plane, and if you cannot, derate the Z-direction properties by 30–50 % and test coupons in the orientation you are derating.**
:::

::: definition The thermal history: a million micro-welds {#def-thermal-history}
Every point in a metal AM part experiences a thermal cycle that no other manufacturing process produces. A point at the mid-height of a 100-layer LPBF build is:

1. **Melted** at $2 0 0 0 { - } 3 0 0 0 \ \mathrm { ^ \circ C }$ and **quenched** at $1 0 ^ { 3 } { - } 1 0 ^ { 6 } \ \mathrm { K / s }$ as the laser passes.
2. **Reheated** by the layers deposited above it: the next one or two layers remelt or nearly remelt it, the next several heat it into the range where phases transform and precipitates form, and every later layer warms it a little less — and within each layer it is also heated by every neighbouring track.
3. **Held at elevated temperature** for the duration of the build (hours to days) if the chamber is preheated.
4. **Cooled** to room temperature over 4–24 hours after the build.

The cooling rate sets the microstructure: LPBF 316L has a cellular-dendritic substructure with sub-micrometre cells that gives it a yield strength of roughly 450–600 MPa — about twice that of annealed wrought 316L — because the cell walls act as dislocation barriers. The reheating cycles set the precipitate state: LPBF AlSi10Mg as-built has a supersaturated Al matrix with a fine eutectic Si network that gives a tensile strength of about 450 MPa but only a few per cent elongation; a stress relief at about $3 0 0 \ \mathrm { ^ \circ C }$ breaks the network into Si particles and roughly doubles the elongation, at the cost of strength. The thermal history also sets the residual stress: a heated build plate lets a little of it relax during the build, but most of it remains until a post-build stress relief.

**The consequence is that an AM part's properties are not a material property but a process property.** The same Ti-6Al-4V powder, the same alloy, the same machine can produce a yield strength of about 1000–1100 MPa with only a few per cent elongation (as-built, high cooling rate, fine $\alpha ^ { \prime }$ martensite) or about 850–950 MPa with 10–15 % elongation (after HIP at about $9 2 0 \ \mathrm { ^ \circ C }$ , which decomposes the martensite into a coarser lamellar $\alpha { + } \beta$ structure). **You do not specify "Ti-6Al-4V" on an AM drawing; you specify "Ti-6Al-4V ELI to ASTM F3001, LPBF, parameter set X, powder lot Y, HIP cycle Z, coupons in three orientations."**
:::

::: widget plot
title: The staircase: roughness is a function of angle and layer thickness
f: x*cos(pi/6)/4; x*cos(pi/4)/4; x*cos(pi/3)/4
x: 10,300
y: 0,70
labels: 30° surface; 45° surface; 60° surface
caption: Theoretical staircase roughness $R _ { a } = h \cos \theta / 4$ against layer thickness $h$ (in μm) for three surface angles measured from the build plate. **A 30° surface at 100 μm layers has $R _ { a } = 2 2 \ \mu \mathrm { m }$ ; a 60° surface at the same layer thickness has $R _ { a } = 1 2 . 5 \ \mu \mathrm { m }$ . The 1.7× difference between the two curves, and the much larger effect of the layer thickness, are why build orientation and layer thickness are design decisions, not shop-floor afterthoughts.** **Read the 45° curve as the rule of thumb: $R _ { a } \approx 0 . 1 8 h$ at 45°, so a 30 μm LPBF layer gives $R _ { a } \approx 5 \ \mu \mathrm { m }$ and a 100 μm FDM layer gives $R _ { a } \approx 1 8 \ \mu \mathrm { m }$ . The real surface is rougher than the staircase because of powder adhesion (metal), balling (metal), and road-edge waviness (polymer), so the as-built $R _ { a }$ is typically 1.5–3× the staircase value.**
:::

::: example Z-strength derating for an LPBF bracket {#ex-zstrength level=3 check="440"}
An LPBF Ti-6Al-4V bracket (ASTM F3001, stress-relieved and HIPed) has the following tensile properties from your own coupon programme:

| Direction | $R _ { p 0 . 2 }$ (MPa) | $R _ { m }$ (MPa) | Elongation (%) |
|-----------|----------------------|-----------------|----------------|
| X (build plate) | 920 | 1010 | 14 |
| Z (build direction) | 880 | 950 | 8 |

A critical section carries a static tensile stress of 475 MPa along Z. Using a safety factor of 2.0 on yield, what is the allowable stress along Z, and is the section adequate? (Enter the allowable stress in MPa.)

The allowable stress along Z is $8 8 0 / 2 . 0 = 4 4 0 \ \mathrm { M P a }$ , which is **below** the applied 475 MPa. The section is **inadequate** along Z, and even the X-direction allowable of $9 2 0 / 2 . 0 = 4 6 0 \ \mathrm { M P a }$ would be insufficient. **The derating from X to Z is only 4 % in yield but 43 % in elongation, and it is the elongation that matters for a statically indeterminate bracket: the Z-direction material cannot redistribute a local peak stress by yielding, so a 1.5× overload that would be harmless in X can crack in Z.**
:::

## 2. Polymer AM: FDM, SLA, and SLS

::: definition Fused filament fabrication (FFF/FDM): the road, the bond, and the anisotropy {#def-fdm}
A thermoplastic filament (1.75 or 2.85 mm diameter) is driven by a geared or direct-drive extruder into a heated nozzle, melted, and deposited as a **road** (the extruded filament cross-section) on a build plate or on the previous layer. The nozzle diameter is 0.2–0.8 mm; the road width is 1.0–1.5× the nozzle diameter because of die swell and the pressure-driven flow; the layer thickness is 50–300 μm, typically 60–80 % of the nozzle diameter.

The road is deposited at the melt temperature ($2 0 0 { - } 4 0 0 \ \mathrm { ^ \circ C }$ depending on the polymer) onto a substrate at the bed temperature ($4 0 { - } 1 5 0 \ \mathrm { ^ \circ C }$). The two roads bond by **interdiffusion** (reptation) of polymer chains across the interface, and the bond strength depends on the time the interface spends above $T _ { g }$ (for amorphous polymers) or above the crystallisation temperature $T _ { c }$ (for semi-crystalline polymers). Before the chains can interdiffuse, the two roads must first flow into contact, and Frenkel's (1945) model of viscous sintering gives the neck radius $x$ between two touching cylinders or spheres of radius $r$ as

$$
{ \frac { x } { r } } \; = \; \left( { \frac { 3 \gamma \, t } { 2 \eta \, r } } \right) ^ { 1 / 2 }
$$

where $\gamma$ is the surface tension, $\eta$ the melt viscosity, and $t$ the time the interface stays hot enough to flow. **The problem is that time: the neck grows only as $\sqrt { t }$ , the viscosity rises steeply as the road cools, and the interface spends well under a second above $T _ { g }$ , a time set by the road size, the print speed and the bed and chamber temperatures.** This is why FDM Z-strength is 30–70 % of bulk and why semi-crystalline polymers (PA12, PEEK) bond worse than amorphous ones (ABS, PC): crystallisation at the interface freezes the chains before they can reptate.

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
- **MSLA (masked SLA)**: an LCD screen (405 nm) acts as a dynamic mask. Cheap (a few hundred to a few thousand US dollars), 50 μm pixels, 25–50 μm layers. The consumer workhorse.

**Resin shrinkage** is the Achilles heel of photopolymer AM. The volumetric shrinkage on curing is 2–8 %, which generates internal stress, warpage, and delamination from the build plate. Low-shrinkage resins (epoxy-based, 1–3 %) exist but are slower and more brittle. **Every SLA part is a warpage calculation: the linear shrinkage strain is $\varepsilon _ { \text{shrink } } \approx ( \Delta V / V ) / 3$ , so a 5 % volumetric shrinkage gives a 1.7 % linear strain — 17 000 με, of the same order as the yield strain of a glassy polymer. Only the part of it that occurs after the resin has gelled is locked in as stress, which is why slow, staged curing and post-curing reduce warpage.**
:::

::: definition SLS of polymers: the sintering window and the powder bed {#def-sls-polymer}
Selective laser sintering spreads a 60–120 μm layer of polymer powder (typically PA12, PA11, TPU, or PA12-carbon-fibre composite) and fuses the surface with a $\mathrm { C O } _ { 2 }$ laser (10.6 μm) at 20–40 W. The powder bed outside the part acts as the support, so **no support structures are needed** and the part can have any geometry. The bed is held at a temperature just below the melting point ($T _ { \text{bed } } \approx T _ { m } - 2 0 { - } 4 0 \ \mathrm { ^ \circ C } $) to reduce thermal distortion.

The critical material property is the **sintering window**: the temperature range between the onset of crystallisation $T _ { c }$ and the melting point $T _ { m }$. For PA12, $T _ { m } \approx 1 7 8 \ \mathrm { ^ \circ C }$ and $T _ { c } \approx 1 5 5 \ \mathrm { ^ \circ C }$ , giving a window of 23 °C. If the window is narrower than about 20 °C, the powder crystallises before it sinters and the part is weak and inhomogeneous. This is why PA12 dominates SLS and why PLA, with its narrow sintering window, is almost never used.

The **surface finish** of SLS is 10–20 μm $R _ { a }$ — grainy, because the surface is a skin of partially fused powder particles. The interior is typically 95–99 % dense. The **mechanical properties** are quasi-isotropic (unlike FDM) because the powder is randomly oriented, but the Z-direction strength is 70–90 % of XY because the interlayer fusion is slightly less complete. **SLS and its relative multi-jet fusion are the polymer AM processes that make functional, nearly isotropic, self-supporting parts in engineering thermoplastics, which is why they lead the market for end-use polymer parts.**
:::

::: example FDM road width and build time {#ex-fdm-time level=3 check="14"}
A 50 mm × 50 mm × 20 mm ABS block is printed with a 0.4 mm nozzle, 0.2 mm layer thickness, 100 % infill, a road width of 0.45 mm, and a print speed of 60 mm/s. Estimate the build time, adding 10 % to the deposition time for travel, retraction and layer changes. (Enter the time in hours.)

Each layer has an area of $5 0 \times 5 0 = 2 5 0 0 \ \mathrm { m m ^ { 2 } }$ . The road cross-section is $0 . 4 5 \times 0 . 2 = 0 . 0 9 \ \mathrm { m m ^ { 2 } }$ , so the road length per layer is $2 5 0 0 / 0 . 0 9 = 2 7 7 7 8 \ \mathrm { m m }$ . At 60 mm/s, the scan time per layer is $2 7 7 7 8 / 6 0 = 4 6 3 \ \mathrm { s } = 7 . 7 \ \mathrm { m i n }$ . The number of layers is $2 0 / 0 . 2 = 1 0 0$ . Total deposition time: $1 0 0 \times 4 6 3 \ \mathrm { s } = 4 6 { , } 3 0 0 \ \mathrm { s } = 1 2 . 9 \ \mathrm { h }$ . Adding 10 % for travel, retraction, and layer changes: $1 . 1 \times 1 2 . 9 = 1 4 . 1 \ \mathrm { h }$ , **approximately 14 hours**.

**A real build often takes longer still, because acceleration limits keep the nozzle below its nominal speed on short roads and corners, so slicer estimates are the better guide. The point of the hand estimate is the scaling: the time goes as the deposited volume divided by the road cross-section and the speed, so halving the layer thickness doubles it.**
:::

::: example SLA cure depth and overcure {#ex-sla-cure level=3 check="230"}
An epoxy resin has $D _ { p } = 1 0 0 \ \mu \mathrm { m }$ and $E _ { c } = 1 5 \ \mathrm { m J / c m ^ { 2 } }$ . The laser delivers $I _ { 0 } = 1 5 \ \mathrm { m W / c m ^ { 2 } }$ and the exposure time is 10 s. The layer thickness is 50 μm. What is the cure depth and the overcure? (Enter the cure depth in μm.)

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
caption: Cure depth $C _ { d } = D _ { p } \ln ( E / E _ { c } )$ against exposure dose $E$ for two penetration depths, with $E _ { c } = 1 5 \ \mathrm { m J / c m ^ { 2 } }$ . **The curve is a logarithm, so the cure depth responds to the *ratio* of exposures: every doubling of the dose adds $D _ { p } \ln 2 = 6 9 \ \mu \mathrm { m }$ (for $D _ { p } = 1 0 0 \ \mu \mathrm { m }$ ), and every halving removes the same 69 μm — so the absolute sensitivity $\mathrm { d } C _ { d } / \mathrm { d } E = D _ { p } / E$ is greatest at low dose.** **Read the curve at $C _ { d } = 5 0 \ \mu \mathrm { m }$ (a typical layer thickness) and $C _ { d } = 1 0 0 \ \mu \mathrm { m }$ (cure through two layers): for $D _ { p } = 1 0 0 \ \mu \mathrm { m }$ they need $1 5 e ^ { 0 . 5 } = 2 5$ and $1 5 e ^ { 1 } = 4 1 \ \mathrm { m J / c m ^ { 2 } }$ , a factor of only 1.65 apart. That narrow band is the SLA process window, and it is why resin age, lamp intensity drift, and temperature all matter.**
:::

## 3. Metal AM: powder bed fusion, directed energy deposition, and binder jetting

::: definition Laser powder bed fusion (LPBF / PBF-LB): the melt pool and the energy density {#def-lpbf}
A 200–1000 W fibre laser (1070 nm) is scanned by galvanometers across a 20–60 μm layer of metal powder (20–60 μm particle size, gas-atomised, spherical) in an inert atmosphere (argon, or nitrogen for some steels, with the oxygen held below about 0.1 % for titanium and a few tenths of a per cent for steels). The laser melts a track 100–200 μm wide and 50–150 μm deep; the hatch spacing is 80–150 μm, so adjacent tracks overlap by roughly 20–50 %; the hatch pattern rotates by $6 7 ^ { \circ }$ between layers to avoid a preferred grain direction.

The single parameter that governs the process is the **volumetric energy density**:

$$
E _ { v } \; = \; { \frac { P } { v \, h \, t } } \quad [ \mathrm { J / m m ^ { 3 } } ]
$$

where $P$ is the laser power (W), $v$ the scan speed (mm/s), $h$ the hatch spacing (mm), and $t$ the layer thickness (mm). For Ti-6Al-4V, the "processability window" for $> 9 9 . 5 \ \%$ relative density is roughly $E _ { v } = 4 0 { - } 8 0 \ \mathrm { J / m m ^ { 3 } }$ . Below 30, the tracks do not overlap and **lack-of-fusion** porosity appears; above 100, the melt pool goes **keyhole** (the recoil pressure of the vaporising metal exceeds the surface tension and punches a cavity through the melt pool) and **keyhole porosity** appears. **The window is a factor of 2–3 wide, and it is the reason LPBF is a process to be characterised, not a machine to be bought.**

The melt pool is a small, violent, short-lived object: 100 μm wide, 100 μm deep, $2 5 0 0 \ \mathrm { ^ \circ C }$ hot, travelling at 0.5–2 m/s, with a thermal gradient of $1 0 ^ { 6 } { - } 1 0 ^ { 7 } \ \mathrm { K / m }$ and a cooling rate of $1 0 ^ { 5 } { - } 1 0 ^ { 6 } \ \mathrm { K / s }$. The **Marangoni flow** inside the pool — driven by the temperature dependence of surface tension, $\mathrm { d } \gamma / \mathrm { d } T$ — determines whether the pool is wide and shallow (outward flow from the hot centre, $\mathrm { d } \gamma / \mathrm { d } T < 0$ , as in a clean, low-sulfur, low-oxygen melt) or narrow and deep (inward flow, $\mathrm { d } \gamma / \mathrm { d } T > 0$ , when surface-active elements such as sulfur or oxygen are present at tens to hundreds of ppm). **This is the same effect that makes two heats of "the same" stainless steel weld differently, and it is one reason powder chemistry matters as much as laser power.**

The **defect taxonomy** of LPBF is:

- **Lack of fusion (LoF)**: incomplete melting between tracks or layers. Flat, irregular, crack-like, aligned with the build plane, and often with unmelted particles inside. The worst defect for fatigue, because it behaves like a pre-existing crack of its projected size.
- **Keyhole porosity**: spherical, 10–100 μm, formed when the vapour cavity collapses and traps gas. Spherical pores are less damaging than LoF but still shorten the fatigue life, especially near the surface.
- **Balling**: the melt track breaks up into droplets by the Plateau–Rayleigh instability of a long liquid cylinder, made worse by poor wetting of the layer below. Creates a rough surface and loose powder that contaminates subsequent layers.
- **Spatter**: ejected droplets (from keyhole collapse or Marangoni ejection) that land on the powder bed and create inclusions in the next layer.
- **Delamination**: the part peels off the build plate because the residual stress exceeds the plate adhesion. The most catastrophic failure mode: the part is ruined, the powder is contaminated, and the machine needs cleaning.
:::

::: definition Electron beam powder bed fusion (EB-PBF): vacuum, preheat, and oxide skimming {#def-ebpbf}
An electron beam (typically 60 kV and a few kilowatts) is deflected by electromagnetic coils across a powder bed in a vacuum ($1 0 ^ { - 4 } \ \mathrm { mbar }$). The beam is preheat-scanned across the entire bed to bring it to $6 0 0 { - } 1 1 0 0 \ \mathrm { ^ \circ C }$ (about 700 °C for Ti-6Al-4V, over 1000 °C for TiAl), then melted in the part pattern. The vacuum eliminates oxidation, so **reactive alloys (TiAl, NbSi, Ta) can be processed without embrittlement**. The high preheat temperature eliminates residual stress during the build, so **crack-sensitive alloys (TiAl, W, some tool steels) can be built without hot cracking**.

The trade-offs are:

- **Fast beam, coarse result**: the beam is deflected electromagnetically with no moving parts, can be split among several melt pools, and gives build rates comparable with or above a single-laser LPBF machine, but it uses coarser powder (45–105 μm) and thicker layers (50–100 μm).
- **Coarser surface**: the beam spot is larger than a laser's, and the lightly sintered powder around the part leaves a rough skin that must be removed by blasting or machining. $R _ { a }$ is typically 20–40 μm, against roughly 8–15 μm for LPBF.
- **"Smoke"**: the beam deposits negative charge in the powder. If the bed is not first lightly sintered by the preheat scan, the charged particles repel one another and the layer is blown into a cloud. The preheat scan on every layer exists to prevent this.
- **Powder recovery**: the powder around the part is lightly sintered into a "cake", which must be broken up by grit-blasting with the same powder and then sieved before reuse.

**EB-PBF is the process of choice for TiAl (GE's LPT blade), for crack-sensitive alloys, and for applications where the vacuum eliminates the need for an inert gas loop. It is not the process of choice for high-volume, fine-feature, or low-cost work.**
:::

::: definition Directed energy deposition (DED): wire, powder, and repair {#def-ded}
A focused energy source (laser, arc, or electron beam) melts a stream of powder or wire onto a substrate, building the part in beads of 1–5 mm width and 0.5–2 mm height. The head moves on a 5-axis machine, so the part can be built on an existing surface — **which is the killer application: repair of a worn turbine blade, a scrapped die, or a corroded shaft**.

Two feedstock variants:

- **Powder-fed DED**: a coaxial or lateral nozzle injects powder into the melt pool. The **capture efficiency** (fraction of powder that actually melts into the deposit) is 50–80 %; the rest is lost. Deposition rates: 0.5–5 kg/h for laser, 2–10 kg/h for arc. Dilution (the fraction of the deposit that came from the melted substrate) is 5–30 % and must be controlled, because it changes the composition of the deposit.
- **Wire-fed DED**: a filler wire is fed into the melt pool. The capture efficiency is 100 % (all the wire melts). Deposition rates: 1–10 kg/h for laser, 5–20 kg/h for arc (wire-arc AM, WAAM). The microstructure is cast, with coarse columnar grains, and the as-deposited surface has a waviness of the order of 0.5–1 mm from the bead ripples — **the part must be machined to final dimensions, and the machining allowance is 1–3 mm per surface.**

The **composition of the deposit** is set by the dilution $D$:

$$
C _ { \text{deposit } } \; = \; ( 1 - D ) \, C _ { \text{feedstock } } + D \, C _ { \text{substrate } }
$$

which is the same mixing rule as a weld (see [[manufacturing/joining|joining]]). For a repair, the dilution must be low enough that the deposit chemistry is within specification, and the heat input must be low enough that the substrate does not over-temper. **A laser DED repair of a nickel-superalloy turbine component therefore uses low power and modest feed — say 200 W at 5 mm/s, a line energy $P / v = 4 0 \ \mathrm { J / m m }$ — to keep the dilution and the heat-affected zone small, because overheating dissolves or coarsens the strengthening $\gamma ^ { \prime \prime }$ and $\gamma ^ { \prime }$ precipitates of the substrate and lowers its local strength.**
:::

::: definition Binder jetting: the green part, the sinter, and the shrinkage {#def-binder-jet}
A liquid binder is inkjet-printed onto a powder bed, gluing the particles together into a **green part** at 50–60 % of theoretical density. The green part is cured, depowdered, and then **sintered** in a furnace (about 1 100–1 400 °C for steels, up to about 1 500 °C for cemented carbides) to densify it to 90–99 %. If it reaches full density, the linear sintering shrinkage is:

$$
\varepsilon _ { \text{linear } } \; = \; 1 - \left( { \frac { \rho _ { \text{green } } } { \rho _ { \text{theoretical } } } } \right) ^ { 1 / 3 }
$$

For a green density of 55 %, the linear shrinkage is $1 - 0 . 5 5 ^ { 1 / 3 } = 1 - 0 . 8 1 9 = 1 8 . 1 \ \%$ . **The part shrinks by 18 % in every direction, and the shrinkage must be isotropic or the part distorts.** Isotropic shrinkage requires uniform green density, uniform powder packing, and uniform sintering — three things that are hard to achieve in a 100 mm-tall part.

The **advantages** of binder jetting are speed (no laser, no melting, no thermal stress, no supports) and cost (no laser, cheaper and finer MIM-grade powder, and many parts nested in one build box). The **disadvantages** are the sintering shrinkage (±0.5 % dimensional tolerance after sintering, compared to ±0.1 mm for LPBF), the limited material range (SS316L, H13, WC-Co, and a handful of others), and the fact that the sintered part is a powder-metallurgy product with 2–8 % residual porosity and a fatigue strength 30–50 % below wrought.

**Infiltration** is a variant: a lightly sintered steel skeleton is infiltrated with molten bronze or copper to fill the porosity and give a dense part. The infiltrated part is a composite, not a solid metal, and its properties are between the two constituents.
:::

::: example LPBF energy density and the processability window {#ex-ev-density level=3 check="71"}
An LPBF build of Ti-6Al-4V uses $P = 2 8 0 \ \mathrm { W }$ , $v = 1 2 0 0 \ \mathrm { m m / s }$ , $h = 1 1 0 \ \mu \mathrm { m }$ , $t = 3 0 \ \mu \mathrm { m }$ . Calculate the volumetric energy density and determine whether the parameters are in the processability window. (Enter $E _ { v }$ in J/mm³.)

$$
E _ { v } \; = \; { \frac { P } { v \, h \, t } } \; = \; { \frac { 2 8 0 } { 1 2 0 0 \times 0 . 1 1 0 \times 0 . 0 3 0 } } \; = \; { \frac { 2 8 0 } { 3 . 9 6 } } \; = \; { \bf 7 1 \ \mathrm { J / m m ^ { 3 } } }
$$

**71 J/mm³ is in the middle of the Ti-6Al-4V window (40–80 J/mm³), so the parameters should produce $> 9 9 . 5 \ \%$ dense material.** If the scan speed were reduced to 800 mm/s (to increase the melt pool depth for a coarse powder), $E _ { v }$ would rise to $1 0 6 \ \mathrm { J / m m ^ { 3 } }$ — **above the keyhole threshold, and the part would have spherical porosity.** If the hatch spacing were widened to 150 μm (to speed up the build), $E _ { v }$ would drop to $5 2 \ \mathrm { J / m m ^ { 3 } }$ — still in the window, but for a 200 μm-wide track the overlap between neighbouring tracks would drop from 45 % to 25 %, and lack-of-fusion porosity might appear at the track boundaries. **The energy density is a necessary but not sufficient condition: the track overlap, the hatch rotation, and the powder packing density all matter too.**
:::

::: example DED dilution and repair chemistry {#ex-ded-dilution level=3 check="4.47"}
A component of IN738 (about 0.9 % Nb) is built up by laser DED with IN718 powder (nominally 5.1 % Nb; the IN718 specification range is 4.75–5.5 % Nb + Ta). The dilution is measured as 15 %. What is the Nb content of the deposit, and is it within the IN718 range? (Enter % Nb to two decimal places.)

$$
C _ { \text{deposit } } \; = \; ( 1 - 0 . 1 5 ) \times 5 . 1 + 0 . 1 5 \times 0 . 9 \; = \; 4 . 3 4 + 0 . 1 4 \; = \; { \bf 4 . 4 7 \ \% \ Nb }
$$

**The deposit is below the IN718 range: it is neither the filler nor the substrate but a third alloy, whose properties must be qualified on their own.** Had the substrate been IN718 too, the dilution would not have changed the composition at all. A lower Nb content does have one benefit: it reduces the Nb segregation that forms brittle Laves phase between the dendrites. **The dilution calculation is the same as in welding (see [[manufacturing/joining|joining]]), and the same rule applies: the deposit is not the filler, and the first thing to check is whether the mixed composition is within specification.**
:::

::: widget plot
title: The LPBF processability window: density against energy density
f: min(99.8, 75+0.55*x) - 0.005*pow(max(x-90,0),2)
x: 20,150
y: 60,102
labels: relative density, % (illustrative alloy)
caption: Relative density against volumetric energy density $E _ { v } = P / ( v \, h \, t )$ for an illustrative alloy, drawn schematically to show the three regimes. **Below about 45 J/mm³, the tracks do not overlap fully and lack-of-fusion porosity dominates — the density rises steeply with energy because each increment of energy melts more of the gap between tracks. Between about 45 and 95 J/mm³, the density is above 99.5 % and the process window is open. Above about 100 J/mm³, the melt pool goes keyhole and the density falls as spherical gas pores are trapped.** **The window is 2–3× wide, and the only way to find it for your alloy, your powder, and your machine is to build a density matrix: 25 cubes at 5 powers × 5 speeds, sectioned and measured by Archimedes. The matrix takes a day and saves a month of failed builds.**
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

The typical LPBF pattern (Mercelis and Kruth, 2006) is the one this mechanism predicts: each new layer is stretched in tension as it cools and shrinks on top of the material below, so the top layers and the free surfaces carry large tensile stresses, balanced by compression in the interior; while the part is still on the plate these stresses can approach the yield strength. **The stress is there before the part leaves the build plate, and cutting the part off releases part of it as distortion.**
:::

::: definition Distortion and the cantilever problem {#def-distortion}
Distortion is the macroscopic consequence of residual stress: the part bends, curls, or peels off the plate. The simplest case is a **cantilever** — a horizontal overhang with no support below it. The overhang is deposited hot, cools, and contracts. The contraction is resisted by the material below it, so the overhang curls upward. The curl angle is:

$$
\theta _ { \text{curl } } \; \approx \; { \frac { \alpha \, \Delta T \, L } { t } }
$$

where $L$ is the overhang length and $t$ is the thickness of the contracting layer. For a 10 mm overhang, 30 μm layer, $\alpha = 8 . 6 \times 1 0 ^ { - 6 } \ \mathrm { K ^ { - 1 } }$ , $\Delta T = 1 0 0 0 \ \mathrm { K }$ : $\theta = 8 . 6 \times 1 0 ^ { - 6 } \times 1 0 0 0 \times 1 0 / 0 . 0 3 = 2 . 8 7 \ \mathrm { r a d } \approx 1 6 4 ^ { \circ }$ . **The small-angle formula has long since broken down, but the message is clear: an unanchored overhang cannot stay flat — it curls up and peels off.** This is why LPBF parts have supports under every overhang: the supports are not there to hold the part up (the powder does that), they are there to **anchor the overhang to the plate and prevent the curl**.

The **distortion of the whole part** is the integral of the residual stress over the cross-section. A tall, thin wall distorts more than a short, thick one, because the thermal gradient is larger and the bending stiffness is lower. The distortion scales as:

$$
\delta _ { \text{distortion } } \; \propto \; { \frac { \alpha \, \Delta T \, H ^ { 2 } } { t _ { \text{wall } } ^ { 2 } } }
$$

where $H$ is the part height and $t _ { \text{wall } }$ is the wall thickness ([[#proof-distortion]]). **Doubling the height quadruples the distortion; doubling the wall thickness quarters it. This is why LPBF parts are designed with generous fillets, thick bases, and a low centre of gravity, and why a 200 mm-tall thin-walled bracket is a distortion nightmare while a 50 mm-tall chunky bracket is trivial.**
:::

::: definition Hot tearing and process-crackability {#def-hot-tearing}
Hot tearing (solidification cracking) occurs when the metal is in the **mushy zone** — partially liquid, partially solid — and the shrinkage strain exceeds the liquid-feeding capacity. The liquid films between dendrite arms are pulled apart, and a crack forms. The susceptibility depends on the **solidification range** $\Delta T _ { \text{solid } } = T _ { \text{liquidus } } - T _ { \text{solidus } }$ :

- **Low susceptibility**: pure metals, near-eutectic alloys and alloys with a narrow freezing range — 316L (roughly 30–50 °C), Ti-6Al-4V (roughly 50–60 °C), and AlSi10Mg, whose plentiful eutectic liquid back-fills any crack that opens.
- **High susceptibility**: high-strength wrought aluminium alloys such as 7075 and 2024 (freezing range well over 100 °C), and γ′-strengthened nickel superalloys such as IN738LC and CM247LC, which crack by a combination of solidification cracking, liquation and strain-age cracking. **These alloys are very difficult to build crack-free by LPBF without special measures.**

The **hot-tearing susceptibility** can be estimated from the solidification range and the strain rate:

$$
\text{HTS } \; \propto \; \Delta T _ { \text{solid } } \times { \dot { \varepsilon }} _ { \text{shrinkage } }
$$

The strain rate in LPBF is of the order of $1 { - } 1 0 \ \mathrm { s ^ { - 1 } }$ (the cooling rate is $1 0 ^ { 5 } \ \mathrm { K / s }$ , the solidification range is 100 K, so the time in the mushy zone is 1 ms, and the strain in that time is 0.1–1 %). **The strain rate is 1000× higher than in casting, which is why alloys that weld fine by TIG crack in LPBF.**

The remedies are: **increase the preheat temperature** (reduces $\Delta T$ , reduces the strain rate, and allows creep relaxation — research machines heating the substrate to several hundred and even over a thousand degrees Celsius have reduced cracking in γ′ superalloys), **use EB-PBF** (whose hot bed has the same effect), **modify the alloy** (Martin et al., *Nature*, 2017, added zirconium-based nucleant nanoparticles to 7075 and 6061 powder, turning the columnar grains equiaxed and the cracks disappeared), or **change the process** (use DED with a lower cooling rate, or use a crack-tolerant alloy like AlSi10Mg instead of Al 7075).
:::

::: proof How distortion scales with geometry {#proof-distortion}
Consider a wall of height $H$ , thickness $t$ , and length $L$ (with $L \gg H \gg t$ ) built by LPBF. Each layer is deposited at the melt temperature $T _ { m }$ and cools to the substrate temperature $T _ { 0 }$ . The thermal strain of the layer is $\varepsilon _ { \text{th } } = \alpha \, \Delta T$ where $\Delta T = T _ { m } - T _ { 0 }$ . The layer is constrained by the material below it, so it is left in tension (if it yields, replace $\alpha \Delta T$ below by the yield strain $\sigma _ { Y } ( 1 - \nu ) / E$ , which caps the distortion). When the part is cut off the plate, the residual stress is released and the part bends.

The curvature $\kappa$ of a bimorph (a layer of thermal strain $\varepsilon _ { \text{th } }$ bonded to a substrate of zero strain) is the Stoney equation:

$$
\kappa \; = \; { \frac { 6 \, \varepsilon _ { \text{th } } \, h _ { f } } { t ^ { 2 } } } \; = \; { \frac { 6 \, \alpha \, \Delta T \, h _ { f } } { t ^ { 2 } } }
$$

where $h _ { f } \ll t$ is the thickness of the strained layer — a few layers deep, set by the process rather than by the wall. The tip deflection of a cantilever of height $H$ is:

$$
\delta \; = \; { \frac { \kappa \, H ^ { 2 } } { 2 } } \; = \; { \frac { 3 \, \alpha \, \Delta T \, h _ { f } \, H ^ { 2 } } { t ^ { 2 } } }
$$

**The three scalings are the ones to remember.** Distortion scales as $H ^ { 2 }$ : **doubling the height quadruples the distortion**, which is why tall parts are built with supports, with a lattice base, or with a pre-deformed geometry. Because $h _ { f }$ is fixed by the process, it scales as $1 / t ^ { 2 }$ : **doubling the wall thickness quarters the distortion**, which is why thin-walled parts are the hardest to build. And it scales as $\alpha \, \Delta T$ : **aluminium ($\alpha = 2 2 \times 10^ { - 6 }$ ) distorts 2.5× more than titanium ($\alpha = 8 . 6 \times 10^ { - 6 }$ ) at the same $\Delta T$**, which is why LPBF aluminium is a distortion problem and LPBF titanium is a residual-stress problem. $\blacksquare$
:::

::: example Pre-deformation compensation {#ex-predeform level=3 check="1.5"}
A 100 mm-tall, 3 mm-thick LPBF Ti-6Al-4V wall is known to bow outward by 1.5 mm at mid-height when cut from the plate. The designer wants the as-built wall to be straight. To first order, how much should the CAD model be bowed inward (pre-deformed) at mid-height? (Enter mm.)

To first order the pre-deformation is equal and opposite to the measured distortion: **1.5 mm inward at mid-height**, with the same half-sine shape. The 1.5 mm already includes everything that happened during the build and the springback on cutting, because it was measured on a part cut from the plate.

**The response is not exactly linear — a pre-bowed wall is built with slightly different stresses — so in practice the pre-deformation is obtained from a simulation (a commercial AM process simulator or a simple inherent-strain model), checked on a test build, and refined in one or two iterations. The alternative — build, measure, adjust, rebuild — costs a build cycle per iteration.**
:::

::: widget plot
title: Residual stress and the yield-stress ceiling
f: min(1, x/592); min(1, x/104)
x: 0,800
y: 0,1.2
labels: Ti-6Al-4V; AlSi10Mg
caption: Thermal stress $\sigma = E \alpha \Delta T / ( 1 - \nu )$ against temperature difference $\Delta T$ , each alloy in units of its own yield stress (room-temperature properties, for illustration). **Each curve rises elastically until it reaches the yield ceiling ($\Delta T _ { \text{crit } } = 5 9 2 \ \mathrm { K }$ for Ti-6Al-4V, 104 K for AlSi10Mg); there the metal yields and the stress stops rising. The part is at yield on every layer, and the residual stress is $\sigma _ { Y }$ regardless of how hot the melt pool was.** **The practical consequence: preheating from $8 0 \ \mathrm { ^ \circ C }$ to $2 0 0 \ \mathrm { ^ \circ C }$ reduces $\Delta T$ for Ti-6Al-4V by only 120 K, from well above $\Delta T _ { \text{crit } }$ to still well above it, so the stress is still at yield. In this simple picture preheating only helps when it brings $\Delta T$ below $\Delta T _ { \text{crit } }$ , which for Ti-6Al-4V would mean a substrate near $1 0 0 0 \ \mathrm { ^ \circ C }$ . EB-PBF's bed at about 700 °C works for a further reason the room-temperature picture leaves out: at that temperature the yield strength is low and the stress relaxes by creep during the build.**
:::

## 5. Design for AM: lattices, topology optimisation, and part consolidation

::: definition Lattice structures and Gibson-Ashby scaling {#def-lattice}
A lattice is a periodic array of struts (or plates) that fills a volume with a structure whose relative density $\bar { \rho } = \rho ^ { * } / \rho _ { s }$ is 0.05–0.5. The mechanical properties scale with the relative density by the **Gibson-Ashby relations**:

$$
{ \frac { E ^ { * } } { E _ { s } } } \; = \; C _ { 1 } \, { \bar { \rho } } ^ { \, n } \qquad { \frac { \sigma _ { \text{yield } } ^ { * } } { \sigma _ { \text{yield,} s } } } \; = \; C _ { 3 } \, { \bar { \rho } } ^ { \, m }
$$

where $n = 2$ and $m = 1 . 5$ for **bending-dominated** structures (open-cell foams, the Kelvin cell; $C _ { 1 } \approx 1$ , $C _ { 3 } \approx 0 . 3$ for foams), and $n = m = 1$ for **stretch-dominated** lattices, whose struts carry load axially. The **octet truss** (12 struts meeting at every node, formed by the edges of packed octahedra and tetrahedra) is the standard stretch-dominated lattice: Deshpande, Fleck and Ashby (2001) give $E ^ { * } / E _ { s } \approx \bar { \rho } / 9$ and $\sigma ^ { * } / \sigma _ { Y , s } \approx \bar { \rho } / 3$ .

The **relative density** of an octet truss with strut diameter $d$ and strut length $l$ (neglecting the overlap at the nodes, so valid for slender struts) is:

$$
{ \bar { \rho } } _ { \text{octet } } \; = \; { \frac { 3 { \sqrt { 2 } } \, \pi } { 2 } } \left( { \frac { d } { l } } \right) ^ { 2 } \; \approx \; 6 . 6 6 \left( { \frac { d } { l } } \right) ^ { 2 }
$$

For $d / l = 0 . 1$ (a 0.2 mm strut 2 mm long): $\bar { \rho } = 6 . 6 6 \times 0 . 0 1 = 0 . 0 6 7$ , so the lattice is 6.7 % dense and its modulus is $E ^ { * } / E _ { s } = 0 . 0 6 7 / 9 = 7 . 4 \times 1 0 ^ { - 3 }$ — **a factor of 135 below the solid**. The lattice is not a lightweight structure; it is a **functionally graded material** that provides stiffness per unit mass, energy absorption, thermal surface area, or bone ingrowth.

**The design rules for lattices are:** (1) the minimum strut diameter is set by the process (0.15–0.3 mm for LPBF, 0.4 mm for FDM, 0.5 mm for binder jetting after sintering shrinkage); (2) the cells must allow powder removal (escape openings of at least about 0.5–1 mm are a common guideline for LPBF, far larger than the particles themselves, because partly sintered powder bridges small gaps); (3) the lattice must be anchored to a solid skin (0.3–0.5 mm) to distribute loads into the struts; (4) the lattice is anisotropic unless the topology is nearly isotropic (the octet and the Kelvin cell are only mildly anisotropic; the simple cubic is stiff along its struts and very compliant in shear).
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
The most valuable application of AM is not the lattice and not the topology-optimised shape — it is **part consolidation**: replacing an assembly of machined parts and fasteners with a single printed part. The canonical example is the fuel nozzle tip of the **CFM LEAP** engine, made by GE: an assembly of about 20 brazed and welded parts replaced by a single LPBF part in cobalt-chrome alloy, which GE describes as 25 % lighter and five times as durable.

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
- **EB-PBF**: shallower overhangs than in LPBF are possible, because the lightly sintered bed supports the overhang and the hot build has little residual stress; supports are needed mainly as heat sinks.
- **FDM**: about 45° from horizontal (the "45° rule"), because each road needs part of the road below to rest on; short horizontal bridges between two supports can be spanned.
- **SLA**: 0° (the part is anchored to the plate and the resin supports the overhang), but the peel force on the FEP film limits the overhang area.

**Supports** are sacrificial structures that anchor the overhang to the plate or to the part. In LPBF, supports are typically a dense block (for anchoring) or a lattice (for easy removal), and they are removed by cutting, grinding, or chemical etching. **Every support leaves a witness mark: a 0.2–0.5 mm dimple where the support was cut off, which is a stress concentration and a surface defect. The design rule is: minimise the support area, place the supports on non-critical surfaces, and budget for support removal in the post-processing cost.**
:::

::: example Octet lattice design {#ex-octet level=3 check="15"}
An octet truss lattice in 316L ($E _ { s } = 1 9 3 \ \mathrm { G P a }$ , $\sigma _ { Y , s } = 2 0 5 \ \mathrm { M P a }$ ) has a strut length $l = 2 \ \mathrm { m m }$ and a strut diameter $d = 0 . 3 \ \mathrm { m m }$ . Calculate the relative density, the effective modulus, and the compressive yield strength. (Enter the relative density in per cent.)

$$
{ \bar { \rho } } \; = \; 6 . 6 6 \left( { \frac { 0 . 3 } { 2 } } \right) ^ { 2 } \; = \; 6 . 6 6 \times 0 . 0 2 2 5 \; = \; 0 . 1 5 0 \quad ( { \bf 1 5 \ \% } )
$$

$$
{ \frac { E ^ { * } } { E _ { s } } } \; \approx \; { \frac { \bar { \rho } } { 9 } } \; = \; 0 . 0 1 6 7 \quad \Longrightarrow \quad E ^ { * } \; \approx \; 3 . 2 \ \mathrm { G P a }
$$

$$
{ \frac { \sigma _ { Y } ^ { * } } { \sigma _ { Y , s } } } \; \approx \; { \frac { \bar { \rho } } { 3 } } \; = \; 0 . 0 5 0 \quad \Longrightarrow \quad \sigma _ { Y } ^ { * } \; \approx \; 1 0 \ \mathrm { M P a }
$$

**The lattice is 15 % dense, with 1/60th of the modulus and 1/20th of the yield strength of solid 316L.** (At $d / l = 0 . 1 5$ the struts are no longer very slender and the node overlap makes the true density a little lower; treat these as estimates.) **The design question is never only "is the lattice strong enough?" but "what is the lattice doing?" — for a heat exchanger or an energy absorber, 3 GPa and 10 MPa may be plenty; for primary load-bearing structure, a solid wall of the same mass is usually stiffer in bending.**
:::

::: widget plot
title: Gibson-Ashby scaling: modulus and strength of a lattice
f: x*x; 0.3*pow(x,1.5); x/9; x/3
x: 0,0.4
y: 0,0.15
labels: bending-dominated, modulus; bending-dominated, strength; octet (stretch), modulus; octet (stretch), strength
caption: Relative modulus and relative yield strength against relative density $\bar { \rho }$ for a bending-dominated lattice ($E ^ { * } / E _ { s } = \bar { \rho } ^ { 2 }$ , $\sigma ^ { * } / \sigma _ { Y , s } = 0 . 3 \bar { \rho } ^ { 1 . 5 }$ ) and the stretch-dominated octet truss ($\bar { \rho } / 9$ , $\bar { \rho } / 3$ ). **The stretch-dominated curves are straight lines, the bending-dominated ones curve down towards zero, so the advantage of a stretch-dominated topology grows as the density falls.** **Read the design point $\bar { \rho } = 0 . 1$ : the bending-dominated lattice has 1.0 % of the solid modulus and 0.95 % of the strength; the octet has 1.1 % and 3.3 % — similar stiffness, three and a half times the strength. At $\bar { \rho } = 0 . 0 5$ the octet is twice as stiff (0.56 % against 0.25 %) and five times as strong.**
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

**Support removal** is a manual or semi-automatic operation: cut the supports with a flush cutter, grind the witness marks, blast the surface. For internal channels, **abrasive flow machining (AFM)** pushes an abrasive-laden polymer through the channel and polishes the internal surface to $R _ { a } < 1 . 6 \ \mu \mathrm { m }$. For aluminium parts, **chemical etching** in a hot alkaline bath removes tens of micrometres in minutes and smooths the surface by preferentially dissolving the protruding particles. **For a complex internal geometry, the post-processing cost can exceed the build cost, and the post-processing lead time can exceed the build lead time.**
:::

::: definition HIP, heat treatment, and the microstructure {#def-hip}
**Hot isostatic pressing (HIP)** subjects the part to 100–200 MPa of argon at 900–1 200 °C for 2–4 hours. The hydrostatic pressure closes internal pores by creep and diffusion bonding, and the temperature homogenises the microstructure. The effects are:

- **Porosity**: HIP closes internal pores by creep and diffusion bonding, small ones fastest. It cannot close pores that are connected to the surface (the gas simply enters them), and pores filled with insoluble argon can shrink but reopen on later heat treatment. **HIP is not a fix for bad parameters; it is a polish for good ones.**
- **Fatigue life**: HIP increases the fatigue life of LPBF Ti-6Al-4V by 30–100 % at $1 0 ^ { 6 }$ cycles, because the crack-initiating pores are eliminated. The improvement is largest at high cycle count (where the crack initiation phase dominates) and smallest at low cycle count (where the crack propagation phase dominates).
- **Ductility**: HIP (at about $5 0 0 \ \mathrm { ^ \circ C }$ for aluminium) raises the elongation of LPBF AlSi10Mg several-fold, because the Si network breaks up and coarsens, at the cost of much of the as-built strength.
- **Microstructure**: HIP at about $9 2 0 \ \mathrm { ^ \circ C }$ decomposes the $\alpha ^ { \prime }$ martensite of LPBF Ti-6Al-4V into a coarser lamellar $\alpha { + } \beta$ structure, which lowers the yield strength by roughly 10–15 % and roughly doubles the elongation.

**Heat treatment** of AM parts follows the same rules as conventional heat treatment, with one addition: **the stress relief must be done before the part is cut from the plate**, because cutting releases the residual stress and the part distorts. The standard sequence for LPBF Ti-6Al-4V is: stress relieve at $7 0 0 \ \mathrm { ^ \circ C }$ for 2 hours (in the furnace, on the plate) → cut from the plate → remove supports → HIP (for example $9 2 0 \ \mathrm { ^ \circ C }$ / 100 MPa / 2 h, within the range ASTM F3001 allows) → machine the critical surfaces → inspect.
:::

::: definition Powder handling, recycling, and quality control {#def-powder}
Metal AM powder is an expensive input: indicative mid-2020s prices are a few tens of US dollars per kilogram for 316L, somewhat more for nickel alloys such as IN718, and a few hundred for Ti-6Al-4V. Most of the powder in the machine is not consumed: the unmelted powder is sieved and reused, so the powder bought per part is the part mass plus the supports, spatter and sieving losses — typically 1.2–2 times the part mass — until the recycled powder reaches its reuse limit.

**Powder degradation** occurs on every cycle: the powder is exposed to the laser, the atmosphere, and the recoater. The mechanisms are:

- **Oxygen pickup**: the powder surface oxidises, especially in Ti and Al. The oxygen content creeps up with every reuse, and Ti-6Al-4V ELI, for example, is limited to 0.13 % (1 300 ppm) oxygen in the finished part, so the powder must be retired before it gets there. **The oxygen content is the single most important powder quality metric for reactive alloys.**
- **Particle coarsening**: fines are removed by the sieve, satellites (small particles attached to large ones) are not, and the particle-size distribution shifts coarser. A coarser powder requires a thicker layer and a higher energy density.
- **Morphology change**: spherical particles become irregular after repeated thermal cycling, which reduces the flowability and the packing density.
- **Contamination**: the recoater blade, the build plate, and the previous part introduce foreign particles. A 50 μm tungsten inclusion from a broken blade in a Ti-6Al-4V part is a crack initiator.

**Quality control** of AM parts is a three-level problem:

1. **In-situ monitoring**: melt-pool cameras (photodiode, high-speed camera), acoustic sensors, layer-by-layer imaging. The goal is to detect a defect as it forms, not after the part is built. **No in-situ monitoring system is yet reliable enough to reject a layer in real time, but all of them are good enough to flag an anomaly for post-build inspection.**
2. **Post-build NDT**: X-ray CT (the gold standard, 10–50 μm resolution, expensive and slow), ultrasonic (fast, cheap, limited to simple geometries), dye penetrant (surface defects only), eddy current (surface and near-surface). **CT is the only method that finds internal LoF defects in a complex geometry, and it is one reason inspection is a large share of the cost of a certified AM part.**
3. **Coupon testing**: tensile bars, fatigue bars, fracture toughness specimens, built with the part, in the build orientation, from the same powder lot, with the same post-processing. **The coupon is the part's birth certificate, and without it the part has no allowables.**
:::

::: example Surface finish improvement {#ex-surface-am level=3 check="50"}
An LPBF 316L part has an as-built $R _ { a }$ of 12 μm. The drawing calls for $R _ { a } \leq 1 . 6 \ \mu \mathrm { m }$ on the sealing face. The attached powder particles stand up to 40 μm proud of the nominal surface, and the cut must go a further 10 μm below it to clear the valleys between them. What is the minimum post-processing route, and what is the minimum depth of material to remove? (Enter the depth in μm.)

To reach $R _ { a } = 1 . 6 \ \mu \mathrm { m }$ , you must cut below the powder particles and the valleys between them: $4 0 + 1 0 = { \bf 5 0 \ \mu m }$ at least. In practice the CAD model carries a larger machining allowance to cover distortion and positioning errors as well. The route is:

1. **Milling** the sealing face with 0.3 mm allowance (the machining allowance on the CAD model).
2. **Fine finishing**: bead blast, then polish, or grind, or lap.

**The alternative — try to polish the as-built surface — does not work, because the powder particles are not uniformly attached and polishing creates pits where the particles detach. The rule is: if the surface finish matters, machine it, and if you machine it, leave the allowance in the design.**
:::

## 7. Economics: when AM wins and when it loses

::: definition The AM cost model {#def-am-cost}
The cost of an AM part is:

$$
c _ { \text{part } } \; = \; { \frac { C _ { \text{machine } } \, t _ { \text{build } } } { N _ { \text{parts } } } } \; + \; k _ { \text{powder } } \, C _ { \text{powder } } \, m _ { \text{part } } \; + \; C _ { \text{labour } } \; + \; C _ { \text{post } } \; + \; C _ { \text{inspect } }
$$

where $C _ { \text{machine } }$ is the machine hourly rate (of the order of 100–300 US dollars per hour for metal LPBF, including depreciation, gas and power, and much less for polymer FDM), $t _ { \text{build } }$ is the build time, $N _ { \text{parts } }$ is the number of parts per build, $k _ { \text{powder } }$ is the mass of powder consumed per unit mass of part (1.2–2, for supports, spatter and sieving losses), $C _ { \text{powder } }$ is the powder cost per kg, $m _ { \text{part } }$ is the part mass, $C _ { \text{labour } }$ is the operator time (setup, removal, support removal), $C _ { \text{post } }$ is the post-processing cost (HIP, machining, blasting), and $C _ { \text{inspect } }$ is the inspection cost (CT, coupons, NDT).

**The terms that dominate are the machine time and the post-processing.** An illustrative aerospace titanium LPBF bracket, built alone (all costs in US dollars):

| Item | Cost (USD) |
|------|------|
| Machine time (20 h at 200 per hour) | 4 000 |
| Powder (2 kg part, 3 kg consumed at 300 per kg) | 900 |
| Labour (4 h at 60 per hour) | 240 |
| Post-processing (stress relief, HIP, machining, blasting) | 3 500 |
| Inspection (CT, coupons) | 2 000 |
| **Total** | **10 640** |

**The machine time is 38 % of the total, the post-processing 33 % and the inspection 19 %, because the part is not finished when it leaves the machine and is not trusted until it is scanned; the powder, despite its price per kilogram, is under 10 %.**
:::

::: example Break-even: AM vs conventional machining {#ex-breakeven level=3 check="13.3"}
(a) A titanium bracket costs 20 000 US dollars per part to machine from a forged billet (including 90 % buy-to-fly scrap) plus a 5 000-dollar fixture, or 14 000 dollars per part to print by LPBF with no fixture. (b) A simple aluminium bracket costs 500 dollars per part to machine plus a 20 000-dollar fixture, or 2 000 dollars per part by LPBF. Find the break-even volume in each case. (Enter the break-even volume for case (b) to one decimal place.)

(a) The conventional cost per part is $c _ { \text{conv } } = 2 0 \ 0 0 0 + 5 0 0 0 / N$ and the AM cost per part is $c _ { \text{AM } } = 1 4 \ 0 0 0$ (no fixture, no amortisation). Setting them equal:

$$
2 0 \ 0 0 0 + { \frac { 5 0 0 0 } { N } } \; = \; 1 4 \ 0 0 0 \quad \Longrightarrow \quad { \frac { 5 0 0 0 } { N } } \; = \; - 6 0 0 0
$$

**The equation has no positive solution: AM is cheaper at every volume, because the AM unit cost is lower than the conventional unit cost and there is no tooling to amortise.** (b) A break-even exists only when the conventional unit cost is lower than the AM unit cost:

$$
N ^ { * } \; = \; { \frac { C _ { \text{fixture } } } { c _ { \text{AM } } - c _ { \text{conv } } } } \; = \; { \frac { 2 0 \ 0 0 0 } { 2 0 0 0 - 5 0 0 } } \; = \; { \frac { 2 0 \ 0 0 0 } { 1 5 0 0 } } \; = \; { \bf 1 3 . 3 \ p a r t s }
$$

**At 13 parts AM is still marginally cheaper (machining costs $5 0 0 + 2 0 \ 0 0 0 / 1 3 = 2 0 3 8$ dollars a part); from 14 parts on, the fixture is paid for and conventional machining wins. The break-even volume is the number of parts at which the fixture cost is amortised, and for AM it is almost always below 50, because AM has no tooling.** **The real question is not "how many parts do I need?" but "is the AM unit cost competitive?" — and for complex, low-volume, high-value parts, it is.**
:::

::: widget plot
title: The cost crossover: AM wins at low volume, machining wins at high
f: 5000/x + 20000; 14000; 20000/x + 500; 2000
x: 1,60
y: 0,26000
labels: Ti bracket, machined (5k fixture + 20k per part); Ti bracket, LPBF (14k per part); Al bracket, machined (20k fixture + 500 per part); Al bracket, LPBF (2k per part)
caption: Cost per part (US dollars) against production volume for the two cases of [[#ex-breakeven]]. **The AM lines are flat (no tooling to amortise), and the conventional lines fall as the fixture is spread over more parts. For the titanium bracket the lines never cross — AM is cheaper at every volume; for the aluminium bracket they cross at 13.3 parts.** **Read the chart the way a programme manager reads it: AM wins for volumes below 10–50 parts (prototypes, spares, low-rate production), and conventional wins above 100 parts (unless the part is so complex that the conventional unit cost is higher than the AM unit cost, in which case AM wins at every volume — the GE LEAP nozzle).**
:::

## Exercises

::: exercise FDM anisotropy and design {#ex-fdm-aniso level=2 check="2"}
A PA12 (natural) FDM part has a tensile strength of 50 MPa along the roads (X) and 36 MPa along Z. A bracket carries a 36 MPa tensile stress along Z. What is the safety factor against failure, and by what factor must the load-bearing Z cross-section be increased if the safety factor must be 2.0? (Enter the factor.)

::: solution
The safety factor is $3 6 / 3 6 = 1 . 0$ — **no margin**. To achieve SF = 2.0, the stress must be halved, which means doubling the cross-sectional area in the Z-direction. The Z-thickness must be increased by a factor of **2.0**, from say 5 mm to 10 mm. **The alternative is to rotate the part 90° in the build so the load is along X, where the strength is 50 MPa and the safety factor is $5 0 / 3 6 = 1 . 3 9$ — still not 2.0, but much closer, and achievable with a 44 % larger section instead of 100 %.**
:::
:::

::: exercise SLA exposure and resolution {#ex-sla-res level=3 check="0.91"}
An acrylate resin has $D _ { p } = 8 0 \ \mu \mathrm { m }$ and $E _ { c } = 1 0 \ \mathrm { m J / c m ^ { 2 } }$ . The target layer thickness is 50 μm and the target overcure is 30 μm (so $C _ { d } = 8 0 \ \mu \mathrm { m }$ ). What exposure dose is required, and what is the exposure time at $I _ { 0 } = 3 0 \ \mathrm { m W / c m ^ { 2 } }$ ? (Enter the time in seconds.)

::: solution
$$
E \; = \; E _ { c } \, e ^ { C _ { d } / D _ { p } } \; = \; 1 0 \, e ^ { 8 0 / 8 0 } \; = \; 1 0 \, e \; = \; 2 7 . 2 \ \mathrm { m J / c m ^ { 2 } }
$$

$$
t \; = \; E / I _ { 0 } \; = \; 2 7 . 2 / 3 0 \; = \; { \bf 0 . 9 1 \ s }
$$

**The exposure is less than a second, which is why DLP and MSLA are fast. The sensitivity of the exposure to the overcure is exponential: increasing the overcure from 30 to 50 μm (a 67 % increase) increases the exposure by $e ^ { 2 0 / 8 0 } = 1 . 2 8$ , a 28 % increase: the dose needed grows exponentially with the cure depth.**
:::
:::

::: exercise LPBF process window {#ex-lpbf-window level=3 check="47.6"}
An LPBF build of 316L uses $P = 2 0 0 \ \mathrm { W }$ , $v = 1 0 0 0 \ \mathrm { m m / s }$ , $h = 1 0 0 \ \mu \mathrm { m }$ , $t = 3 0 \ \mu \mathrm { m }$ . Calculate $E _ { v }$ . If the hatch spacing is widened to 140 μm to speed up the build, what is the new $E _ { v }$ , and is it still in the 316L window (30–80 J/mm³)? (Enter the new $E _ { v }$ in J/mm³.)

::: solution
$$
E _ { v 1 } \; = \; { \frac { 2 0 0 } { 1 0 0 0 \times 0 . 1 0 0 \times 0 . 0 3 0 } } \; = \; { \frac { 2 0 0 } { 3 . 0 } } \; = \; 6 6 . 7 \ \mathrm { J / m m ^ { 3 } } \quad \checkmark
$$

$$
E _ { v 2 } \; = \; { \frac { 2 0 0 } { 1 0 0 0 \times 0 . 1 4 0 \times 0 . 0 3 0 } } \; = \; { \frac { 2 0 0 } { 4 . 2 } } \; = \; { \bf 4 7 . 6 \ \mathrm { J / m m ^ { 3 } } }
$$

**47.6 J/mm³ is still in the 316L window (30–80), but for a 200 μm-wide track the overlap between neighbouring tracks drops from 50 % to 30 %, and lack-of-fusion porosity may appear at the track boundaries even though the energy density is nominally adequate. The lesson: $E _ { v }$ is a screening parameter, not a sufficient condition.**
:::
:::

::: exercise Binder jet sintering shrinkage {#ex-bj-shrink level=2 check="18.1"}
A binder-jetted 316L part has a green density of 55 % of theoretical. What is the linear shrinkage on sintering to full density, and what are the as-sintered dimensions of a 100 mm × 50 mm × 20 mm green part? (Enter the shrinkage in per cent.)

::: solution
$$
\varepsilon _ { \text{linear } } \; = \; 1 - ( 0 . 5 5 ) ^ { 1 / 3 } \; = \; 1 - 0 . 8 1 9 \; = \; 0 . 1 8 1 \; = \; { \bf 1 8 . 1 \ \% }
$$

As-sintered dimensions: $1 0 0 \times 0 . 8 1 9 = 8 1 . 9 \ \mathrm { m m }$ , $5 0 \times 0 . 8 1 9 = 4 1 . 0 \ \mathrm { m m }$ , $2 0 \times 0 . 8 1 9 = 1 6 . 4 \ \mathrm { m m }$ . **The part shrinks by 18 % in every direction, and the dimensional tolerance after sintering is ±0.5 % of the nominal dimension — ±0.5 mm on a 100 mm part. The designer must scale the CAD model by $1 / 0 . 8 1 9 = 1 . 2 2$ and accept the tolerance, or machine the critical surfaces after sintering.**
:::
:::

::: exercise Lattice relative density and modulus {#ex-lattice-mod level=3 check="1500"}
An octet truss in Ti-6Al-4V ($E _ { s } = 1 1 4 \ \mathrm { G P a }$ ) has a strut length of 3 mm and a strut diameter of 0.4 mm. Calculate the relative density and the effective modulus. (Enter the modulus in MPa.)

::: solution
$$
{ \bar { \rho } } \; = \; 6 . 6 6 \left( { \frac { 0 . 4 } { 3 } } \right) ^ { 2 } \; = \; 6 . 6 6 \times 0 . 0 1 7 8 \; = \; 0 . 1 1 8
$$

$$
E ^ { * } \; \approx \; { \frac { \bar { \rho } } { 9 } } \, E _ { s } \; = \; { \frac { 0 . 1 1 8 } { 9 } } \times 1 1 4 \ 0 0 0 \; \approx \; { \bf 1 5 0 0 \ \mathrm { M P a } }
$$

**The lattice is 12 % dense and has a modulus of about 1.5 GPa — inside the 0.1–2 GPa range usually quoted for trabecular (spongy) bone and far below the 10–30 GPa of cortical bone. Matching the stiffness of the surrounding bone reduces stress shielding, which is one reason titanium lattices are used on orthopaedic implants; the pore size (here a few millimetres) must also suit bone ingrowth, which favours smaller cells.**
:::
:::

::: exercise AM cost model {#ex-am-cost level=3 check="1311"}
A metal LPBF machine costs 250 US dollars per hour (including depreciation, maintenance, gas, and power). A build takes 18 hours and produces 12 parts. The powder costs 400 dollars per kg, and each part consumes 0.3 kg of powder including supports and losses. Labour is 3 hours per build at 65 dollars per hour. Post-processing is 800 dollars per part. What is the cost per part? (Enter US dollars to the nearest dollar.)

::: solution
$$
c _ { \text{part } } \; = \; { \frac { 2 5 0 \times 1 8 } { 1 2 } } \; + \; 4 0 0 \times 0 . 3 \; + \; { \frac { 6 5 \times 3 } { 1 2 } } \; + \; 8 0 0
$$

$$
= \; 3 7 5 \; + \; 1 2 0 \; + \; 1 6 \; + \; 8 0 0 \; = \; { \bf 1 3 1 1 } \ \text{USD per part}
$$

**The post-processing (800 dollars) is 61 % of the total, the machine time (375) 29 %, the powder (120) 9 % and the labour (16) about 1 %. The lesson: in AM, the post-processing and the machine time dominate.**
:::
:::

::: exercise Derivation: the staircase roughness formula {#ex-derive-staircase level=4 check="5.3"}
Derive the staircase roughness formula $R _ { a } = h \cos \theta / 4$ for a surface inclined at angle $\theta$ to the build plate, built with layer thickness $h$. Evaluate for $h = 3 0 \ \mu \mathrm { m }$ and $\theta = 4 5 ^ { \circ }$ . (Enter $R _ { a }$ in μm.)

::: solution
Each step has a vertical riser of height $h$ and a horizontal tread of width $w = h / \tan \theta$ ; the mean line of the profile runs along the nominal inclined surface, through the step corners. Each step is therefore a right triangle whose hypotenuse, of length $\sqrt { h ^ { 2 } + w ^ { 2 } } = h / \sin \theta$ , lies along the mean line. Its height perpendicular to the mean line is

$$
R _ { t } \; = \; { \frac { h \, w } { \sqrt { h ^ { 2 } + w ^ { 2 } } } } \; = \; { \frac { h \cdot h / \tan \theta } { h / \sin \theta } } \; = \; h \cos \theta .
$$

Roughness is measured from a mean line that splits the profile into equal areas above and below, so the profile is a sawtooth of peak-to-valley height $h \cos \theta$ about its own mean. A sawtooth with linear flanks of peak-to-valley height $R _ { t }$ has deviations $y$ uniformly distributed between $- R _ { t } / 2$ and $+ R _ { t } / 2$ , so

$$
R _ { a } \; = \; { \frac { 1 } { L } } \int _ { 0 } ^ { L } | y ( x ) | \, \mathrm { d } x \; = \; { \frac { R _ { t } } { 4 } } \; = \; { \frac { h \cos \theta } { 4 } } .
$$

For $h = 3 0 \ \mu \mathrm { m }$ , $\theta = 4 5 ^ { \circ }$ : $R _ { a } = 3 0 \times 0 . 7 0 7 / 4 = { \bf 5 . 3 \ \mu m }$ . The limits check: a vertical wall ($\theta = 9 0 ^ { \circ }$ ) has no steps and $R _ { a } = 0$ ; as $\theta \to 0$ the treads become very long and the model's $h / 4$ is a poor description of what is really a flat surface with occasional step edges. $\blacksquare$
:::
:::

::: exercise Derivation: Jacobs' equation from Beer-Lambert {#ex-derive-jacobs level=4 check="2.3"}
Derive Jacobs' equation $C _ { d } = D _ { p } \ln ( E / E _ { c } )$ from the Beer-Lambert law and the gelation criterion, and evaluate $C _ { d } / D _ { p }$ when the surface dose is ten times the critical dose. (Enter $C _ { d } / D _ { p }$ to two significant figures.)

::: solution
The Beer-Lambert law gives the intensity at depth $z$ :

$$
I ( z ) \; = \; I _ { 0 } \, e ^ { - z / D _ { p } }
$$

The exposure dose at depth $z$ is $E ( z ) = I ( z ) \, t = I _ { 0 } \, t \, e ^ { - z / D _ { p } } = E _ { 0 } \, e ^ { - z / D _ { p } }$ where $E _ { 0 } = I _ { 0 } t$ is the surface dose. The resin gels when the local dose equals the critical dose: $E ( C _ { d } ) = E _ { c }$ . Therefore:

$$
E _ { c } \; = \; E _ { 0 } \, e ^ { - C _ { d } / D _ { p } } \quad \Longrightarrow \quad { \frac { E _ { 0 } } { E _ { c } } } \; = \; e ^ { C _ { d } / D _ { p } } \quad \Longrightarrow \quad \boxed { \; C _ { d } \; = \; D _ { p } \, \ln { \frac { E _ { 0 } } { E _ { c } } } \; } \quad \blacksquare
$$

For $E _ { 0 } = 1 0 \, E _ { c }$ : $C _ { d } / D _ { p } = \ln 1 0 = { \bf 2 . 3 }$ .

**The physical content is that the cure depth is proportional to the penetration depth (a material property of the resin) and logarithmic in the exposure (a process variable). The logarithm means that the cure depth is insensitive to large changes in exposure and very sensitive to small changes near $E _ { c }$ — the process window is at the bottom of the curve, not the top.**
:::
:::

::: exercise Distortion scaling {#ex-distort-scale level=3 check="32"}
A 100 mm-tall LPBF wall distorts by 2 mm at the top. If the height is increased to 200 mm and the wall thickness is halved, what is the new distortion? (Enter mm.)

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

::: exercise DED deposition rate and economics {#ex-ded-rate level=3 check="1.25"}
A wire-fed DED system deposits 316L at 4 kg/h. A 5 kg bracket takes how many hours to deposit, and what is the machine cost if the hourly rate is 150 US dollars? Compare with LPBF at 50 cm³/h (density 8 000 kg/m³, machine rate 250 dollars per hour). (Enter the DED deposition time in hours.)

::: solution
**DED**: $t = 5 / 4 = 1 . 2 5 \ \mathrm { h }$ , machine cost $= 1 . 2 5 \times 1 5 0 = 1 8 8$ US dollars.

**LPBF**: volume $= 5 / 8 0 0 0 = 6 2 5 \ \mathrm { c m ^ { 3 } }$ , time $= 6 2 5 / 5 0 = 1 2 . 5 \ \mathrm { h }$ , machine cost $= 1 2 . 5 \times 2 5 0 = 3 \ 1 2 5$ US dollars.

**DED is 10× faster (4 kg/h against 0.4 kg/h) and about 17× cheaper in machine time, because the hourly rate is also lower. The trade-off is resolution: DED makes 2 mm beads and LPBF makes 60 μm tracks. The DED part needs 2–3 mm of machining allowance, which removes 20–40 % of the deposited material and adds machining cost. For a 5 kg chunky bracket, DED wins; for a 0.05 kg lattice bracket, LPBF wins.**
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

::: history Additive manufacturing: from rapid prototyping to production {#history-am}
**1981** — Hideo Kodama of the Nagoya Municipal Industrial Research Institute publishes "Automatic method for fabricating a three-dimensional plastic model with photo-hardening polymer" in *Review of Scientific Instruments*, describing layer-by-layer curing of a photopolymer with UV light through masks or by a scanned fibre — one of the first published descriptions of an additive process.

**1984–1986** — Charles (Chuck) Hull, working at Ultra Violet Products, files US Patent 4 575 330, "Apparatus for production of three-dimensional objects by stereolithography" (filed 1984, granted 1986): a UV laser traces each layer on the surface of a vat of photopolymer above a platform that steps down. Hull co-founds 3D Systems in 1986, and the STL file format comes from its software.

**1986–1989** — Carl Deckard and Joseph Beaman at the University of Texas at Austin develop **selective laser sintering** (SLS), fusing a powder bed layer by layer with a laser. The university licenses it to DTM Corporation, which 3D Systems acquires in 2001.

**1989** — S. Scott Crump and Lisa Crump file the patent for **fused deposition modelling** (FDM) and found Stratasys; its first machine, the 3D Modeler, ships in 1992. When the key FDM patents expire in 2009, the open-source RepRap project helps make filament printers a consumer product.

**1989–1993** — Emanuel Sachs, Michael Cima and colleagues at MIT invent "three-dimensional printing" — **binder jetting** — patented in 1993 (US 5 204 055) and licensed to companies including Soligen, Z Corporation and ExOne.

**1995–1996** — EOS of Munich launches its EOSINT M 250 direct metal laser sintering machine (1995). In 1996 Wilhelm Meiners, Konrad Wissenbach and Andres Gasser of Fraunhofer ILT in Aachen file the German patent DE 196 49 865 on fully melting successive layers of metal powder with a laser — **selective laser melting**, the basis of today's laser powder bed fusion.

**Late 1990s** — Sandia National Laboratories develops **laser engineered net shaping** (LENS), a powder-fed directed energy deposition process, which Optomec commercialises. Arcam is founded in Mölndal, Sweden (1997), to develop **electron beam melting**; its first commercial machine, the EBM S12, ships in 2002.

**2015** — ISO and ASTM publish the joint terminology standard ISO/ASTM 52900, with the seven process categories used in this lesson (revised in 2021).

**2016** — The CFM LEAP engine enters service with GE's LPBF cobalt-chrome fuel nozzle tip, replacing an assembly of about 20 parts; GE's Auburn, Alabama, plant ships its 100 000th tip in 2021. The same year GE buys Arcam and Concept Laser to form GE Additive. **The LEAP nozzle is the case study for AM as a production process, not a prototyping one.**
:::

::: summary Additive manufacturing {#summary-am}
- **AM is seven processes, not one.** Material extrusion (FDM), vat photopolymerisation (SLA/DLP), powder bed fusion (LPBF/EB-PBF), binder jetting, material jetting, directed energy deposition, and sheet lamination have different physics, different design rules, different properties, and different costs. "3D-print it" is not a manufacturing decision.
- **The part has a build direction, and the build direction is the grain direction.** LPBF parts are anisotropic: the Z-direction elongation is 60–80 % of XY, the Z-direction fatigue strength is 30–50 % below XY, and the Z-direction fatigue life is dominated by lack-of-fusion defects that are flat in the XY plane. Design the load path in XY, derate Z, and test coupons in the orientation you are derating.
- **The thermal history is the microstructure.** Each layer is a micro-weld quenched at $1 0 ^ { 5 } { - } 1 0 ^ { 6 } \ \mathrm { K / s }$ and then reheated by the layers above it. The cooling rate sets the cell and grain size, the reheating sets the precipitate state, and the thermal history sets the residual stress. The same powder, the same alloy, and the same machine can produce very different strength and ductility depending on the parameter set and the post-processing.
- **The volumetric energy density $E _ { v } = P / ( v \, h \, t )$ is the master variable for LPBF.** Below 30–40 J/mm³, lack-of-fusion porosity; above 80–120 J/mm³, keyhole porosity. The window is 2–3× wide, and the only way to find it is a density matrix on your machine with your powder.
- **Residual stress is at the yield point before the part leaves the plate.** The yield-stress ceiling ($\sigma _ { \text{res } } = \min ( E \alpha \Delta T / ( 1 - \nu ) , \sigma _ { Y } )$) applies to every layer. Distortion scales as $H ^ { 2 } / t ^ { 2 }$ : doubling the height quadruples the distortion, doubling the wall thickness quarters it. A modest preheat barely changes the residual stress; a hot bed such as EB-PBF's works because the yield strength is low and the stress creeps away during the build.
- **Hot tearing kills crack-sensitive alloys.** Al 7075, IN738LC, and some tool steels have a solidification range wide enough that the LPBF strain rate (of the order of $1 { - } 1 0 \ \mathrm { s ^ { - 1 } }$ ) tears the liquid films apart. The remedies are high preheat, EB-PBF, alloy modification, or a different alloy.
- **Lattices are not lightweight structures; they are functional materials.** The Gibson-Ashby scaling means a 5 % dense bending-dominated lattice ($E ^ { * } / E _ { s } \approx { \bar { \rho } } ^ { 2 }$ ) has about 0.25 % of the solid modulus, and even a stretch-dominated octet ($\approx \bar { \rho } / 9$ ) only about 0.6 %. Use a lattice where it does a job (thermal, biological, energy absorption) and a solid wall where it does not.
- **Post-processing is 30–70 % of the part cost.** Support removal, stress relief, HIP, machining, blasting, and inspection are not optional. Budget for them in the design, leave the machining allowance, and put the critical dimensions on machined features.
- **The powder is the material.** Oxygen pickup, particle coarsening, satellite contamination, and recycling history change the powder on every cycle. Specify the powder, the lot, the recycling limit, and the oxygen content, and test the powder before you test the part.
- **AM wins when complexity is free, volume is low, and lead time matters.** The break-even against conventional machining is 10–50 parts for most geometries. For complex, consolidated, low-volume, high-value parts (aerospace, medical, tooling), AM wins at every volume. For simple, high-volume, low-cost parts, injection moulding and machining win.
:::

## Further reading

- **ISO/ASTM 52900:2021** — *Additive manufacturing — General principles — Fundamentals and vocabulary*. The seven-family taxonomy, the terminology, and the process definitions.
- **Gibson, I., Rosen, D., Stucker, B. and Khorasani, M. (2021)** — *Additive Manufacturing Technologies*, 3rd ed. Springer. The standard textbook on every process family, design for AM and post-processing.
- **DebRoy, T. et al. (2018)** — "Additive manufacturing of metallic components — Process, structure and properties." *Progress in Materials Science* 92, pp. 112–224. A comprehensive review of metal AM physics: melt pool, solidification, microstructure, residual stress, and defects.
- **Mercelis, P. and Kruth, J.-P. (2006)** — "Residual stresses in selective laser sintering and selective laser melting." *Rapid Prototyping Journal* 12(5), pp. 254–265. The temperature-gradient mechanism of §4 and the measured stress profiles.
- **Seifi, M., Salem, A., Beuth, J., Harrysson, O. and Lewandowski, J.J. (2016)** — "Overview of materials qualification needs for metal additive manufacturing." *JOM* 68(3), pp. 747–764. The qualification gap, the coupon problem, and the path to certification.
- **Gibson, L.J. and Ashby, M.F. (1997)** — *Cellular Solids: Structure and Properties*, 2nd ed. Cambridge University Press; and **Deshpande, V.S., Fleck, N.A. and Ashby, M.F. (2001)** — "Effective properties of the octet-truss lattice material." *Journal of the Mechanics and Physics of Solids* 49, pp. 1747–1769. The scaling laws behind lattice design.
- **Jacobs, P.F. (1992)** — *Rapid Prototyping & Manufacturing: Fundamentals of Stereolithography*. Society of Manufacturing Engineers. The origin of the cure-depth ("working curve") equation.
- **Wohlers Report** (annual) — Wohlers Associates. The industry survey: market size, installed base, materials and applications.
