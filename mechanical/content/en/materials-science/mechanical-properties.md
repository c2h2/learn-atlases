One test produces almost every number on a materials data sheet. A cylindrical bar is pulled, the load and the extension are recorded, and from the resulting curve come the modulus, the yield strength, the ultimate strength, the uniform elongation, the total elongation, the reduction of area, the resilience, the strain-hardening exponent and — with a little more work — the hardness, the formability and an estimate of the fatigue strength. That the same curve supports this much interpretation is a tribute to the test and a hazard for the reader, because each of those numbers is defined at a different point on the curve, by a different convention, and several of them are conventions rather than properties.

This lesson sorts the conventions from the properties and puts the mechanics around them: why the yield point is defined at $0.2\ \%$ offset and not at anything else, why the ultimate tensile strength is a **necking** instability rather than a fracture stress, why hardness is a strength and what it costs to say so, why two clean pieces of metal weld together on contact and why the friction force is proportional to the load, and why a material that is tough in the Charpy test can be brittle in the structure.

::: warning The tensile test measures four things and the datasheet lists forty
Every number in a metals handbook is a tensile test done at one strain rate, one temperature, one specimen geometry and one definition of yield, on a material of one particular temper, and the same alloy from the next heat differs by ten per cent. Three traps follow. **The ultimate tensile strength is not a fracture stress** — it is the stress at which the bar becomes geometrically unstable, and the true stress at that point is higher by the factor $\left( 1 + \epsilon_u \right)$; designing to the UTS of a ductile metal is conservative by that factor and the conservatism is wasted, because the metal has already necked. **Elongation and reduction of area are not material properties** — they depend on the gauge length and the specimen diameter, and a $50\ \mathrm{mm}$-gauge elongation of $25\ \%$ becomes $35\ \%$ on an $8\ \mathrm{mm}$ gauge of the same bar, which is why a specification that quotes "elongation" without the gauge length is unenforceable. And **strength and ductility trade**, so a datasheet that lists a high strength and a high elongation for the same condition has usually taken the strength from one specimen and the elongation from another. Where the trade must be quantified, the number to ask for is not either property but the product, or the **formability** — the forming-limit diagram, the $n$-value and the $r$-value — which are measured for the purpose and mean what they say.
:::

## The tensile test

::: definition Engineering and true stress and strain {#def-true}
On a specimen of instantaneous area $A$ and gauge length $l$ carrying a load $P$,
$$
\sigma_{\mathrm{eng}} = \frac{P}{A_0}, \quad \epsilon_{\mathrm{eng}} = \frac{l - l_0}{l_0},
\qquad
\sigma_{\mathrm{true}} = \frac{P}{A}, \quad \epsilon_{\mathrm{true}} = \int_{l_0}^{l} \frac{\mathrm{d} l}{l} = \ln \frac{l}{l_0} .
$$
Before necking, with constant volume,
$$
\sigma_{\mathrm{true}} = \sigma_{\mathrm{eng}} \left( 1 + \epsilon_{\mathrm{eng}} \right), \qquad
\epsilon_{\mathrm{true}} = \ln \left( 1 + \epsilon_{\mathrm{eng}} \right) ,
$$
and after necking **neither pair is valid** without a correction for the triaxial stress state in the neck — the Bridgman correction, which reduces the true stress by up to ten per cent at the point of fracture. The reduction of area
$$
\mathrm{RA} = \frac{A_0 - A_f}{A_0}
$$
is the one ductility measure that is genuinely local and genuinely independent of the specimen, and it is the number to ask for when ductility matters.
:::

::: definition Yield, and why it is defined at $0.2\ \%$ {#def-yield}
For a material without a sharp yield point, the **proof stress** $\sigma_{0.2}$ is the stress at which a load-and-unload cycle leaves $0.2\ \%$ of permanent strain. The choice of $0.2\ \%$ is a convention with no deeper justification than that it is large enough to measure reliably on an extensometer of 1920s vintage and small enough to be near the proportional limit; the aluminium industry also quotes $\sigma_{0.1}$ and $\sigma_{0.5}$, and the two differ by five to ten per cent.
Mild steel is the exception: it shows an **upper and lower yield point** because interstitial carbon and nitrogen atoms pin dislocations by forming Cottrell atmospheres, and once a dislocation breaks away it moves at a lower stress. The consequence is a load drop and a **Lüders band** that propagates along the bar at nearly constant load, giving up to $5\ \%$ of strain at constant stress — the mechanism of the stretcher strains and Lüders lines that ruin a car door panel, and the reason a skin-pass or temper-rolling pass is given to sheet steel before forming.
:::

::: definition Work hardening, strain rate and the Considère criterion {#def-hardening}
Between yield and necking most metals follow the **Hollomon** or **Ludwick** relations
$$
\sigma_{\mathrm{true}} = K \epsilon_{\mathrm{true}}^{n} \qquad \text{or} \qquad
\sigma_{\mathrm{true}} = \sigma_y + K \epsilon_{p}^{n} ,
$$
with $n$ the strain-hardening exponent, typically $0.5$ for annealed copper, $0.25$ for austenitic stainless, $0.15$ for a mild steel, $0.1$ for a high-strength aluminium sheet and $0.02$ for a fully aged precipitation-hardened alloy. The strain-rate sensitivity is
$$
m = \frac{\partial \ln \sigma}{\partial \ln \dot{\epsilon}} \Big|_{\epsilon , T} ,
$$
with $m \approx 0.005$ for a BCC metal at room temperature, $0.01$ for an FCC metal, $0.2$ for a superplastic fine-grained alloy and $0.02$ to $0.3$ for polymers above their glass transition.
**Considère's criterion** states that a tensile bar becomes unstable when
$$
\frac{\mathrm{d} \sigma_{\mathrm{true}}}{\mathrm{d} \epsilon_{\mathrm{true}}} = \sigma_{\mathrm{true}} ,
$$
which for $\sigma = K \epsilon^{n}$ gives the elegant result $\epsilon_u = n$: **the strain-hardening exponent is the uniform elongation**, and a metal with $n = 0.1$ cannot be drawn more than ten per cent no matter how good the press, the lubricant or the operator.
:::

::: proof The Considère criterion {#proof-considere}
A neck grows if the load required to continue deforming the necked region is **less** than the load the rest of the bar can still carry. The load is $P = \sigma A$ with $\sigma$ and $A$ both functions of strain, and instability is $\mathrm{d} P = 0$:
$$
\mathrm{d} P = \sigma \, \mathrm{d} A + A \, \mathrm{d} \sigma = 0
\quad\Longrightarrow\quad
\frac{\mathrm{d} \sigma}{\sigma} = - \frac{\mathrm{d} A}{A} .
$$
Constant volume gives $\mathrm{d} V = 0$, so $\mathrm{d} A / A + \mathrm{d} l / l = 0$ and $- \mathrm{d} A / A = \mathrm{d} l / l = \mathrm{d} \epsilon_{\mathrm{true}}$. Hence
$$
\boxed{ \frac{\mathrm{d} \sigma}{\mathrm{d} \epsilon} = \sigma } \quad \text{at the ultimate tensile strength} . \quad \checkmark
$$
**The consequences.** For $\sigma = K \epsilon^{n}$, $\mathrm{d} \sigma / \mathrm{d} \epsilon = n K \epsilon^{n - 1} = \sigma$ gives $\epsilon_u = n$ exactly, which is why $n$ is called the **tensile-test forming-limit exponent** and why a deep-drawing quality steel is specified by its $n$-value and its plastic-strain ratio $r$ rather than by its strength. For a material with rate sensitivity, the criterion becomes
$$
\frac{\mathrm{d} \sigma}{\mathrm{d} \epsilon} = \frac{\sigma}{1 + m} ,
$$
so a superplastic material with $m = 0.5$ necks at three times the strain-hardening rate and can be stretched by several hundred per cent — the whole of the superforming industry in one term of an equation. And for a material whose curve is **flat**, $n = 0$, the criterion is met at yield: it cannot work-harden at all, it necks immediately, and it has no useful tensile ductility.
:::

::: widget plot
f: x^0.5; x^0.15; x^0.02
x: 0.02, 1.0
y: 0, 1.05
labels: n = 0.50; n = 0.15; n = 0.02
caption: True stress against true plastic strain for three strain-hardening exponents, all normalised to the same stress at $\epsilon = 1$. The straight line from the origin to each curve's end is the construction of the Considère criterion: instability occurs where the slope equals the stress, which for a power law is at $\epsilon = n$. The copper curve is still rising at a strain of one; the aged-alloy curve with $n = 0.02$ has already peaked at a strain of two per cent and necks immediately.
:::

## Hardness, contact and friction

::: definition Hardness and what it measures {#def-hardness}
A hardness test pushes a blunt indentor into a surface and records either the area of the impression or the depth reached. Because the indentor's pressure is several times the yield strength, the deformation beneath it is **fully plastic** even at the smallest loads, and hardness is therefore a **strength** measurement in disguise:
$$
H \approx \frac{P}{A_{\text{indentor contact}}} , \qquad
\mathrm{HV} = 1.8544 \frac{P}{d^{2}} \quad \left[ P\ \text{in kgf}, d\ \text{in mm} \right] .
$$
The three scales overlap by design: Brinell with a $10\ \mathrm{mm}$ hardened-steel or tungsten-carbide ball at $3000\ \mathrm{kgf}$ for coarse-grained soft materials, Vickers with a $136^{\circ}$ diamond pyramid from $1\ \mathrm{gf}$ to $100\ \mathrm{kgf}$ for everything and for case depths, and Rockwell with a ball or conical diamond and a **depth** reading for the shop floor. For steels the conversion
$$
\sigma_{\mathrm{UTS}} \approx 3.2\ \mathrm{HV}\ \left[ \mathrm{MPa} \right]
$$
is good to ten per cent up to about $1400\ \mathrm{MPa}$ and fails above it, because a very hard steel fractures under the indentor and the hardness reads low.
**The catch is the indentation size effect.** Below a few micron of indentor diagonal the measured hardness **rises**, because the geometrically necessary dislocations required to accommodate the strain gradient cost energy that a coarse-grained specimen does not pay. A microhardness measurement of a case depth is therefore not comparable with a macrohardness measurement of the same case, and a specification that mixes the two is unenforceable.
:::

::: definition Hertzian contact {#def-hertz}
Two elastic bodies of equivalent radius $R^{*}$ and modulus $E^{*} = \left[ \left( 1 - \nu_1^{2} \right) / E_1 + \left( 1 - \nu_2^{2} \right) / E_2 \right]^{- 1}$ under a load $F$ make a circular contact of radius
$$
a = \left( \frac{3 F R^{*}}{4 E^{*}} \right)^{1 / 3}, \qquad
p_0 = \frac{3 F}{2 \pi a^{2}} = \frac{1}{\pi} \left( \frac{6 F E^{* 2}}{R^{* 2}} \right)^{1 / 3} ,
$$
with a parabolic pressure distribution and a maximum shear stress of $0.31 p_0$ at a depth of $0.48 a$ **below** the surface. That subsurface maximum is the reason a gear, a bearing race or a wheel rail fails by **pitting** from below a surface that has never seen a stress above the yield point in shear, and it is why the case-hardened layer of a gear tooth is $0.7$ to $1.0\ \mathrm{mm}$ deep and not $0.1$.
:::

::: definition Friction, and why it is proportional to the load {#def-friction}
The Amontons-Coulomb laws, $F = \mu W$ with $\mu$ independent of the apparent area, are inexplicable for elastic bodies — a larger area carries the same load at a lower pressure and the friction should fall. **Bowden and Tabor**'s explanation is that rough surfaces touch at asperities, that the asperity contacts yield until their combined area supports the load, and that the friction is the shear of the junctions so formed:
$$
A_{\mathrm{real}} = \frac{W}{H}, \qquad
F = \tau A_{\mathrm{real}} = \frac{\tau}{H} W
\quad\Longrightarrow\quad
\mu = \frac{\tau}{H} .
$$
For steel on steel $H \approx 3\ \mathrm{GPa}$ and the interfacial shear strength $\tau \approx 1\ \mathrm{MPa}$ to $300\ \mathrm{MPa}$ depending on whether the surfaces are oxidised, lubricated or clean, giving $\mu$ from $0.003$ to $0.1$ for a lubricated pair and $0.4$ to $1.0$ for clean metal, where the junctions are full-welded. A $100\ \mathrm{N}$ load on steel of $3\ \mathrm{GPa}$ hardness gives a real contact area of $33\ \mathrm{mm^{2}}$ — a third of a nominally flat $10\ \mathrm{mm}$-square face, and enough that two clean metal surfaces in vacuum **cold weld** and cannot be pulled apart, which is why every space mechanism uses a bonded-solid lubricant, a soft-metal plating or a polymer.
:::

::: example A tensile curve read completely {#ex-curve}
A $12.8\ \mathrm{mm}$-diameter, $50\ \mathrm{mm}$-gauge mild-steel specimen gives: proportional limit $210\ \mathrm{MPa}$, lower yield $250\ \mathrm{MPa}$, maximum load $53\ \mathrm{kN}$, fracture at $38\ \mathrm{kN}$ with a final gauge length of $64\ \mathrm{mm}$ and a final diameter of $7.9\ \mathrm{mm}$. Report every property and say which of them are not properties.
::: solution
**Areas.** $A_0 = \pi \times 6.4^{2} = 128.7\ \mathrm{mm^{2}}$, $A_f = \pi \times 3.95^{2} = 48.9\ \mathrm{mm^{2}}$.
**Modulus.** $E = 210 / 0.00105 = 200\ \mathrm{GPa}$ from the proportional limit at $0.105\ \%$ strain. A property.
**Yield.** $\sigma_y = 250\ \mathrm{MPa}$ at the lower yield point. A property of this heat and temper.
**Ultimate.** $\sigma_{\mathrm{UTS}} = 53{,}000 / 128.7 = 412\ \mathrm{MPa}$.
**Uniform strain.** At the ultimate, $\sigma_{\mathrm{true}} = 412 \times \left( 1 + \epsilon_u \right)$ and by Considère $\sigma_{\mathrm{true}} = K \epsilon_u^{n}$ with $\epsilon_u = n$; taking $n = 0.24$ gives $\epsilon_u = 0.24$ and $\sigma_{\mathrm{true}, u} = 511\ \mathrm{MPa}$.
**Fracture.** $\epsilon_f = \ln \left( 64 / 50 \right) = 0.241$ of true strain, so the post-necking strain is $\epsilon_f - \epsilon_u = 0$ — the specimen fractured almost immediately on necking, which is unusual and points to an inclusion population or a hydrogen effect.
**Reduction of area.** $\mathrm{RA} = \left( 128.7 - 48.9 \right) / 128.7 = 62\ \%$, which is genuinely ductile and contradicts the elongation.

*Check.* The elongation is $\left( 64 - 50 \right) / 50 = 28\ \%$; the true fracture strain from the areas is $\ln \left( 128.7 / 48.9 \right) = 0.968$, which is four times the gauge-length strain. $\checkmark$

*Sanity.* The contradiction between a $62\ \%$ reduction of area and a $28\ \%$ elongation is not a contradiction: the reduction is **local** at the fracture and the elongation is **averaged** over $50\ \mathrm{mm}$, and a specimen that necks early and hard has a large RA and a modest elongation. This is why a specification for a pressure-vessel forging quotes the reduction of area and a specification for a car body panel quotes the elongation and the $n$-value — the first cares whether the material tears, the second cares where it thins.
:::
:::

::: example Contact stress and the depth of a case {#ex-hertz}
A $10\ \mathrm{mm}$-radius steel ball presses on a flat of the same steel, $E = 207\ \mathrm{GPa}$, $\nu = 0.3$, with $100\ \mathrm{N}$. Find the contact radius, the peak pressure and the maximum shear stress, and compare it with the shear yield of a $60\ \mathrm{HRC}$ bearing steel.
::: solution
**Equivalent properties.** $R^{*} = 5\ \mathrm{mm}$ and
$$
E^{*} = \left[ \frac{2 \left( 1 - 0.09 \right)}{207} \right]^{- 1} = 114\ \mathrm{GPa} .
$$
**Contact radius.**
$$
a = \left( \frac{3 \times 100 \times 0.005}{4 \times 114 \times 10^{9}} \right)^{1 / 3} = 149\ \mu\mathrm{m} .
$$
**Peak pressure.**
$$
p_0 = \frac{3 \times 100}{2 \pi \times 149^{2} \times 10^{- 12}} = 2.16\ \mathrm{GPa} .
$$
**Maximum shear.** $\tau_{\max} = 0.31 p_0 = 0.67\ \mathrm{GPa}$ at a depth of $0.48 a = 71\ \mu\mathrm{m}$.
**Comparison.** A $60\ \mathrm{HRC}$ through-hardening bearing steel has a yield strength near $2.0\ \mathrm{GPa}$ and a shear yield of $1.15\ \mathrm{GPa}$, so at $100\ \mathrm{N}$ the contact is elastic. At $1000\ \mathrm{N}$ the pressure rises by $10^{1 / 3} = 2.15$ to $4.6\ \mathrm{GPa}$ and the shear to $1.4\ \mathrm{GPa}$ — **the subsurface yields while the surface is still elastic**, and repeated cycling works the yielded layer until a pit forms.

*Check.* The contact is elastic while $p_0 < 3.7\ \sigma_y$, the classical shakedown limit for a Hertzian contact on a ductile metal; with $\sigma_y = 2.0\ \mathrm{GPa}$ that gives $p_0 = 7.4\ \mathrm{GPa}$, well above the $4.6\ \mathrm{GPa}$ reached at $1000\ \mathrm{N}$, so the correct verdict is that this contact **shakes down** and does not yield cumulatively. $\checkmark$

*Sanity.* The shakedown limit of $3.7\ \sigma_y$ assumes an infinite half-space, no defects and no lubricant. Real bearings are limited at a third of it by inclusions, which is why bearing-steel cleanliness ratings — the number of $10\ \mu\mathrm{m}$ inclusions per kilogram — are the property that decides a bearing's $L_{10}$ life and why a vacuum-degassed, electroslag-remelted steel lasts five times as long as an air-melted one of identical composition. And the $0.7\ \mathrm{mm}$ case depth of a carburised gear exists because the Hertzian shear maximum in a gear contact of $1.5\ \mathrm{GPa}$ lies $0.3$ to $0.5\ \mathrm{mm}$ down, where a $0.1\ \mathrm{mm}$ case would leave soft core beneath and the case would collapse into it.
:::
:::

::: example Friction, real area and cold welding {#ex-friction}
Two clean steel flats of apparent area $100\ \mathrm{mm^{2}}$ carry $100\ \mathrm{N}$. Give the real contact area, the mean junction pressure and the force to slide them, in vacuum and in air.
::: solution
**Real area.** With $H = 3\ \mathrm{GPa}$, $A_{\mathrm{real}} = W / H = 100 / 3 \times 10^{9} = 33\ \mathrm{mm^{2}}$ — a third of the apparent area, because a lapped flat really is that flat.
**Junction pressure.** Every junction is at the hardness, $3\ \mathrm{GPa}$, whatever the load.
**In air.** Adsorbed oxide and hydrocarbon films are a few nanometres thick and shear at $\tau \approx 20\ \mathrm{MPa}$, so
$$
F = \tau A_{\mathrm{real}} = 20 \times 10^{6} \times 33 \times 10^{- 6} = 0.66\ \mathrm{N}, \qquad \mu = 0.007 .
$$
**In vacuum.** Bake the surfaces, and the films desorb, the junctions become metal-metal bonds with $\tau$ approaching $H / \sqrt{3} = 1.7\ \mathrm{GPa}$, and
$$
F = 1.7 \times 10^{9} \times 33 \times 10^{- 6} = 56\ \mathrm{kN},
$$
five hundred times the applied load. The joint does not slide; it is a weld.

*Check.* The measured coefficient of friction for clean steel on steel in vacuum is $3$ to $10$ rather than the $0.6$ of air, and the transition happens as the vacuum improves past $10^{- 5}\ \mathrm{mbar}$, which is the pressure at which a monolayer of gas forms in a few seconds rather than a few hours. $\checkmark$

*Sanity.* This is not a laboratory curiosity but the design rule of every space mechanism, and the reason stainless-on-stainless bearings and slip rings in vacuum seize, and the fix is a **solid lubricant** — $\mathrm{MoS_2}$, $\mathrm{WS_2}$ or diamond-like carbon, a few hundred nanometres, which shears at $\tau \approx 5\ \mathrm{MPa}$ and gives $\mu \approx 0.02$ in vacuum because, unlike a graphite grease, a lamellar solid does not need adsorbed water to work. The same physics is why a bolted flange is lubricated on its threads — not to make it easier to turn but to make the **preload** predictable, since a $\mu$ of $0.15$ against $0.25$ changes the torque-tension relation by forty per cent and an under-preloaded flange leaks.
:::
:::

::: example Property limits and the search for a light stiff panel {#ex-limits}
A stiff, light, flat panel of given thickness must deflect as little as possible in three-point bending. Rank aluminium, steel, CFRP quasi-isotropic, balsa-core sandwich and a polymer foam, and state where each fails.
::: solution
**The index.** For a panel of fixed thickness, fixed span and given stiffness, the deflection is minimised by maximising $E$; for a panel of fixed **mass**, by maximising $E^{1 / 3}$ for a fixed-thickness panel and $E^{1 / 2}$ for a fixed-width beam. The relevant ranking is therefore not $E$ but $E^{1 / 3} / \rho$:
$$
\begin{array}{l c c c}
\text{Material} & E\ \left[ \mathrm{GPa} \right] & \rho\ \left[ \mathrm{g / cm^{3}} \right] & E^{1 / 3} / \rho \\
\text{Steel} & 207 & 7.85 & 0.68 \\
\text{Aluminium} & 69 & 2.70 & 0.75 \\
\text{CFRP quasi-isotropic} & 50 & 1.55 & 1.35 \\
\text{GFRP} & 30 & 1.90 & 1.18 \\
\text{Balsa (end-grain)} & 10 & 0.15 & 14.4
\end{array}
$$
**The sandwich is not in the ranking and is the answer.** A panel's bending stiffness is $E I$ and $I$ goes as the cube of the thickness, so putting a thin, stiff skin on a thick, light core multiplies the stiffness by the square of the thickness ratio at almost no mass: two $2\ \mathrm{mm}$ skins on a $50\ \mathrm{mm}$ core are **eight hundred times** stiffer than the same mass of solid laminate, at the cost of a shear-limited core and a debonding-prone interface.
**Where each fails.** Steel yields at $350\ \mathrm{MPa}$ and is heavy. Aluminium is isotropic, cheap and fatigue-notch-sensitive. CFRP is anisotropic, so the panel is stiff in the fibre directions and soft in the transverse, and it fails by **delamination** after a tool drop, which is invisible from outside. Balsa and foam cores crush under a point load and absorb water at a cut edge.

*Sanity.* The index arithmetic is right and the ranking is right, and it is the reason an aircraft wing skin is a CFRP laminate on a spar rather than a steel plate, and the reason a wind-turbine blade is a CFRP spar cap on a balsa or PET-foam core. What the index does not capture is **damage**: a steel panel that is dented is still ninety per cent of its strength, and a CFRP panel that is dented may be thirty per cent, which is why every composite structure carries a damage-tolerance specification, a tap-test or a thermography inspection, and a maximum permissible delamination size.
:::
:::

::: example Design {#ex-design-spec}
Write the material specification for a hydraulic manifold block that must be machinable, weldable to a steel fitting, pressure-tight at $35\ \mathrm{MPa}$, dimensionally stable after machining, and cheap in $500$-piece quantities.
::: solution
**Screen on the requirements.**
- **Pressure tightness at $35\ \mathrm{MPa}$** with a typical wall of $8\ \mathrm{mm}$ and a bore of $20\ \mathrm{mm}$ puts a hoop stress of $35 \times 10 / 8 = 44\ \mathrm{MPa}$ on the wall; with a safety factor of four that is a yield of $175\ \mathrm{MPa}$, which eliminates nothing common.
- **Machinability** in $500$-piece quantities favours a free-cutting alloy: a leaded or lead-free free-cutting steel, or $356$ aluminium with its $12\ \%$ silicon, or $6061$-T6.
- **Weldability to steel** eliminates aluminium outright — there is no economical way to weld aluminium to steel, and a bimetallic transition insert is a cost item that a $500$-piece run cannot carry.
- **Dimensional stability after machining** eliminates anything with residual stress: a sand casting will move as it is stress-relieved, and a cold-drawn bar will bow as the cutting releases the surface stress.
**Choice.** A **stress-relieved, hot-rolled low-carbon plate** — S355 or $16\ \mathrm{Mo}$ — machined from a plate of the same heat, stress-relieved after rough machining and before finishing, with the finishing cut taking $0.5\ \mathrm{mm}$.
**The specification, in the order that matters.**
1. Material and heat: EN $10025$ S355J2+N, one heat lot, with the mill certificate.
2. Condition: $+ N$ normalised, and a **subsequent stress relief** at $600\ {}^{\circ}\mathrm{C}$ for two hours after rough machining.
3. Mechanical: $R_{\mathrm{el}} \ge 355\ \mathrm{MPa}$, $R_m = 470$ to $630$, $A \ge 20\ \%$, Charpy V at $- 20\ {}^{\circ}\mathrm{C} \ge 27\ \mathrm{J}$ in the transverse direction.
4. Soundness: ultrasonic examination to EN $10160$ class $\mathrm{E}/3$, because a laminar inclusion in a manifold is a leak path.
5. Flatness after stress relief, measured and recorded, because it is the property the machining depends on.
6. No plating unless it is specified **before** the dimensional check, because electroless nickel grows the part by its own thickness and a plated manifold that was finished to size before plating is oversize.

*Design comment.* The two clauses that a careless specification omits are the stress relief and the ultrasonic examination, and each omission costs more than it saves: without the first, a manifold that measured correctly on the table measures wrongly a week later, and without the second, a $35\ \mathrm{MPa}$ system leaks from a inclusion that was in the plate before anyone drew the part. The second point of substance is that **the strength requirement is not what selects the material** — every candidate has four times the required yield — and what selects it is weldability, machinability and dimensional stability, which is the general pattern in mechanical design and the reason a materials selection is nearly always a manufacturing selection wearing a mechanics disguise.
:::
:::

::: history
The tensile test is older than the science. **Thomas Tredgold** specified test bars in his 1822 *Principles of Carpentry*, and **William Fairbairn** and **Edwin Clark**'s iron-testing programme of the 1840s at Manchester produced the first systematic tables, from a machine that measured extension with a scale and dividers. **James Christie**'s 1856 paper on the elasticity of wires introduced the proportional limit as a distinct concept. The yield point's time dependence and the ageing of strained mild steel were established by **Carl Heyn and Otto Bauer**'s work of 1908 to 1912, and understood only in 1949 when **H. Cottrell and B. A. Bilby** proposed the solute-atmosphere mechanism that explains why a steel left at $100\ {}^{\circ}\mathrm{C}$ after being strained comes back harder. The $0.2\ \%$ proof stress was fixed by the **ASTM** and **ISO** bar-specimen conventions of the 1920s and has not been revised since. **Percy Bridgman**'s 1952 book *Studies in Large Plastic Flow and Fracture* measured the triaxial correction in the neck and gave the fracture strain its first honest value. **A. Considère**'s 1891 criterion was only put on a mechanical footing by **Geoffrey Taylor**'s 1915 paper on the necking of ductile metals, twenty-four years later. **Heinrich Hertz**'s 1881 contact theory grew out of his 1880 measurements of the interference fringes between a lens and a flat and of the hardness of glass. **Bowden and Tabor**'s *The Friction and Lubrication of Solids* of 1950, from the Cavendish Laboratory, established the asperity-junction picture by measuring the real area of contact electrically and by showing that two clean metal surfaces in vacuum weld. The strain-hardening exponent's identity with the uniform strain is **Considère**'s 1891 result, and the plastic-strain ratio $r$-value that governs deep drawing was introduced by **W. T. Lankford**, **S. C. Ford** and **J. H. Hollomon** in their 1950 drawing-depth studies at Armour Research Foundation.
:::

## Where this leads

The strain-hardening exponent is the dislocation storage argument of [[materials-science/dislocations-strengthening]], the hardness of a case-hardened layer is the diffusion profile of [[materials-science/defects-diffusion]], the contact shear maximum of Example 2 is the crack-nucleation site of [[materials-science/failure]], and the $n$- and $r$-values of Example 5 are the texture consequence of [[materials-science/bonding-structure]] applied to a rolling mill.

::: summary
- One tensile curve gives the modulus, the yield, the ultimate strength, the uniform strain and the local ductility, but the elongation is specimen-dependent and the ultimate strength is an instability, not a fracture stress.
- Yield is defined at a $0.2\ \%$ offset by convention; mild steel's sharp yield point is a Cottrell-atmosphere effect and produces Lüders bands.
- The Considère criterion $\mathrm{d}\sigma / \mathrm{d}\epsilon = \sigma$ puts the ultimate tensile strain at $\epsilon_u = n$, so the strain-hardening exponent is the forming limit and rate sensitivity $m$ raises it.
- Hardness is a plastic strength measured through an indentor, converts to tensile strength at a factor of about three for steels, and is not size-independent below a few microns.
- Hertzian contact puts the maximum shear below the surface, which is why gears and bearings pit from underneath and why cases are $0.7\ \mathrm{mm}$ deep.
- Friction is proportional to load because asperity junctions yield at the hardness, and removing the surface films makes the friction exceed unity and the joint cold-weld.
:::

::: quiz
A tensile test on a ductile steel gives an elongation of $12\ \%$ on a $50\ \mathrm{mm}$ gauge and a reduction of area of $70\ \%$. What does the combination indicate?
- [x] Heavy early necking: the ductility is local, and the gauge-length average understates it
- [ ] The specimen was misaligned
- [ ] The material is brittle
- [ ] The extensometer slipped
::: solution
A reduction of area of $70\ \%$ is a true local fracture strain of $\ln \left[ 1 / \left( 1 - 0.70 \right) \right] = 1.20$, four times the gauge-average value. The metal is very ductile where it broke and the elongation is low because the neck was narrow and formed early — a low $n$-value with a high fracture strain, which is the signature of a precipitation-hardened or heavily included material.
:::
:::

::: quiz
A tensile test on a ductile steel gives an elongation of $12\ \\%$ on a $50\ \\mathrm{mm}$ gauge and a reduction of area of $70\ \\%$. What does the combination indicate?
- [x] Heavy early necking: the ductility is local, and the gauge-length average understates it
- [ ] The specimen was misaligned
- [ ] The material is brittle
- [ ] The extensometer slipped
::: solution
A reduction of area of $70\ \\%$ is a true local fracture strain of $\\ln \\left[ 1 / \\left( 1 - 0.70 \\right) \\right] = 1.20$, four times the gauge-average value. The metal is very ductile where it broke and the elongation is low because the neck was narrow and formed early — a low $n$-value with a high fracture strain, which is the signature of a precipitation-hardened or heavily included material.
:::
:::

::: quiz
A tensile test on a ductile steel gives an elongation of $12\ \%$ on a $50\ \mathrm{mm}$ gauge and a reduction of area of $70\ \%$. What does the combination indicate?
- [x] Heavy early necking: the ductility is local, and the gauge-length average understates it
- [ ] The specimen was misaligned
- [ ] The material is brittle
- [ ] The extensometer slipped
::: solution
A reduction of area of $70\ \%$ is a true local fracture strain of $\ln \left[ 1 / \left( 1 - 0.70 \right) \right] = 1.20$, four times the gauge-average value. The metal is very ductile where it broke and the elongation is low because the neck was narrow and formed early — a low $n$-value with a high fracture strain, which is the signature of a precipitation-hardened or heavily included material.
:::
:::

## Exercises

::: exercise True stress {level=1 check="1.25"}
At an engineering strain of $0.25$, what is the ratio of true to engineering stress before necking?
::: solution
$1 + \epsilon = 1.25$.
:::
:::

::: exercise Uniform strain {level=1 check="0.15"}
What is the uniform elongation of a metal with a strain-hardening exponent of $0.15$?
::: solution
$0.15$ — the true strain at the ultimate equals $n$.
:::
:::

::: exercise Hardness {level=1 check="3.2"}
What multiple of the Vickers number gives the ultimate tensile strength of a steel in megapascals?
::: solution
About $3.2$.
:::
:::

::: exercise Contact {level=1 check="0.48"}
At what fraction of the contact radius does the maximum shear stress lie below a Hertzian contact?
::: solution
$0.48$.
:::
:::

::: exercise Amontons {level=1 check="2"}
By what factor does the real area of asperity contact change when the load on a rough surface is doubled?
::: solution
Two — the junctions yield at the hardness, so the area is proportional to the load.
:::
:::

::: exercise Proof stress {level=2}
A $0.2\ \%$ proof stress is measured on a specimen whose extensometer has a $5\ \mu\varepsilon$ offset error. Estimate the error in the proof stress of a $200\ \mathrm{GPa}$ metal.
::: solution
$\Delta \sigma = E \times 5 \times 10^{- 6} = 1\ \mathrm{MPa}$, negligible.
*Sanity.* The offset error is not the problem; the problem is the **curvature** of the unloading line, which for a cast iron or a composite is not $E$ at all and can shift the proof stress by ten per cent. This is why the standard requires the unloading line to be drawn parallel to the **initial tangent** and why the initial tangent of a specimen with a slack load train gives a systematically low modulus — the reason a tensile machine is checked with a reference specimen of known modulus before it is trusted.
:::
:::

::: exercise Hollomon {level=2}
Annealed copper has $K = 315\ \mathrm{MPa}$ and $n = 0.54$. Give the true stress and the engineering ultimate tensile strength at the necking point.
::: solution
$\epsilon_u = n = 0.54$, so
$$
\sigma_u = 315 \times 0.54^{0.54} = 226\ \mathrm{MPa}, \qquad
\sigma_{\mathrm{eng}} = \frac{226}{1.54} = 147\ \mathrm{MPa} .
$$
*Sanity.* The measured UTS of annealed copper is $210$ to $220\ \mathrm{MPa}$, not $147$, because commercial annealed copper is not fully recrystallised and has a residual $n$-value and a yield contribution that the pure Hollomon law omits; the Ludwick form with a $60\ \mathrm{MPa}$ yield term gives $190\ \mathrm{MPa}$, which is closer. The lesson is that a power-law fit extrapolated below its measured strain range always under-predicts.
:::
:::

::: exercise Real contact {level=2}
A $500\ \mathrm{N}$ load is carried by a brass washer on a steel plate, hardness $1.2\ \mathrm{GPa}$ and apparent area $800\ \mathrm{mm^{2}}$. Give the real contact area and the fraction of the apparent area it represents.
::: solution
$A_{\mathrm{real}} = 500 / 1.2 \times 10^{9} = 0.42\ \mathrm{mm^{2}}$, which is $0.05\ \%$ of the apparent area.
*Sanity.* Ninety-nine point nine five per cent of the interface is not touching, which is why a gasket works, why a flange needs a surface finish specified as an $R_a$ and a waviness, and why a bolted joint's contact conductance is a tenth of the bulk metal's — the heat has to cross $0.42\ \mathrm{mm^{2}}$ of metal and $799.6\ \mathrm{mm^{2}}$ of oxide and air.
:::
:::

::: exercise Derivation {level=3}
Show that the plastic-strain ratio $r = \mathrm{d} \epsilon_w / \mathrm{d} \epsilon_t$ for a sheet under uniaxial tension, with $w$, $t$ and $l$ the width, thickness and length directions, satisfies $r = \sigma_l$-related flow rule for an isotropic material, and explain why $r > 1$ is good for deep drawing.
::: solution
**The flow rule.** With plastic incompressibility $\mathrm{d} \epsilon_l + \mathrm{d} \epsilon_w + \mathrm{d} \epsilon_t = 0$ and the Levy-Mises relation for a uniaxial stress $\sigma_l$,
$$
\mathrm{d} \epsilon_l = \mathrm{d} \lambda \sigma_l , \quad
\mathrm{d} \epsilon_w = - \tfrac{1}{2} \mathrm{d} \lambda \sigma_l , \quad
\mathrm{d} \epsilon_t = - \tfrac{1}{2} \mathrm{d} \lambda \sigma_l ,
$$
so for an isotropic material $r = 1$ exactly. Any departure is **anisotropy**, and for a rolled sheet the texture makes the through-thickness direction harder or easier to deform than the in-plane ones.
**Why $r > 1$ is good.** Deep drawing requires the flange to thin **radially** and thicken slightly, but must not thin **through the thickness** at the cup wall, where the load is carried. $r = \mathrm{d}\epsilon_w / \mathrm{d}\epsilon_t > 1$ means the sheet prefers to change its width to its thickness, so the wall resists thinning and the cup draws deeper before it fractures. Drawing quality steels are specified at $\bar{r} = 1.6$ to $2.2$.
**The catch.** A strong $\gamma$-fibre texture that raises $\bar{r}$ also raises the planar anisotropy $\Delta r$, which makes the blank draw faster in some directions than others and produces the four **ears** at $45^{\circ}$ or $0^{\circ}$ around a drawn cup, which are trimmed away — twenty per cent of the purchase price of the sheet.

*Sanity.* The measurement of $r$ requires a $90\ \mathrm{mm}$ tensile specimen and a grid of $5\ \mathrm{mm}$ circles punched on the width and the surface, and the thickness strain is inferred from volume constancy, so the number is only as good as the assumption that no damage porosity opened during the test. A high-strength steel with $r = 0.6$ cannot be deep-drawn at all, which is the whole of the difficulty of putting third-generation automotive steels into body panels and the reason the industry uses hot forming of boron steel for the parts that need both strength and shape.
:::
:::

::: exercise Design {level=3}
Select the material and the section for a spring that must store the maximum energy per unit volume without yielding, is limited to $150\ {}^{\circ}\mathrm{C}$, and must not corrode in fresh water.
::: solution
**The index.** The elastic energy per unit volume is the resilience
$$
U_r = \frac{\sigma_y^{2}}{2 E} ,
$$
so the material index is $\sigma_y^{2} / E$, and unlike stiffness this one **can** be improved by processing, because $\sigma_y$ is a defect property.
$$
\begin{array}{l c c c}
\text{Material} & \sigma_y\ \left[ \mathrm{MPa} \right] & E\ \left[ \mathrm{GPa} \right] & U_r\ \left[ \mathrm{MJ / m^{3}} \right] \\
\text{Music wire, hardened and tempered} & 1900 & 205 & 8.8 \\
\text{Stainless 17-7 PH, aged} & 1650 & 200 & 6.8 \\
\text{Phosphor bronze} & 600 & 110 & 1.6 \\
\text{CFRP rod} & 1500 & 140 & 8.0 \\
\text{Natural rubber} & 5 & 0.0012 & 7.5
\end{array}
$$
**Choice.** Music wire has the highest resilience but corrodes; **17-7 PH precipitation-hardening stainless** at $6.8\ \mathrm{MJ / m^{3}}$ is the answer, since it is hardened by aging at $565\ {}^{\circ}\mathrm{C}$, is comfortable to $315\ {}^{\circ}\mathrm{C}$, and is the standard material for a corrosion-resistant high-stress spring. Where the price forbids it, a **silicon-manganese** or **chrome-silicon** spring steel with a zinc-flake or Dacromet coating is used, and the coating's hydrogen must be baked out within four hours or the spring fails in a week.
**The section.** A helical spring's mass for a given stiffness and stress is minimised by a **constant-stress** section — a tapered or conical coil, or better a leaf spring of triangular plan — because a uniform round wire uses its material at only one third of the allowable stress on average.
**The failure.** Springs fail at the **inside of the coil at the scale pit or the decarburised surface**, because the inside of a coil sees $15\ \%$ higher stress than the outside and a decarburised skin has no compressive residual stress from the shot peen. So the specification must include the peening and forbid the decarburised layer.

*Sanity.* Rubber's apparent resilience of $7.5\ \mathrm{MJ / m^{3}}$ is illusory, because the calculation assumes a linear elastic solid and rubber is neither linear nor elastic — it hystereses, and the hysteretic loss at $300\ \%$ strain is half the stored energy, which turns into heat and destroys the spring. Rubber is used where **damping** is wanted and steel where **storage** is wanted, and the two are opposite requirements.
:::
:::
