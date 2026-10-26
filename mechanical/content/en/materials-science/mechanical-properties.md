One test produces almost every number on a materials data sheet. A cylindrical bar is pulled, the load and the extension are recorded, and from the resulting curve come the modulus, the yield strength, the ultimate strength, the uniform elongation, the total elongation, the reduction of area, the resilience, the strain-hardening exponent and — with a little more work — the hardness, the formability and an estimate of the fatigue strength. That the same curve supports this much interpretation is a tribute to the test and a hazard for the reader, because each of those numbers is defined at a different point on the curve, by a different convention, and several of them are conventions rather than properties.

This lesson sorts the conventions from the properties and puts the mechanics around them: why the yield point is defined at $0.2\ \%$ offset and not at anything else, why the ultimate tensile strength is a **necking** instability rather than a fracture stress, why hardness is a strength and what it costs to say so, why two clean pieces of metal weld together on contact and why the friction force is proportional to the load, and why a material that is tough in the Charpy test can be brittle in the structure.

::: warning The tensile test measures four things and the datasheet lists forty
Every number in a metals handbook is a tensile test done at one strain rate, one temperature, one specimen geometry and one definition of yield, on a material of one particular temper, and the same alloy from the next heat differs by ten per cent. Three traps follow. **The ultimate tensile strength is not a fracture stress** — it is the stress at which the bar becomes geometrically unstable, and the true stress at that point is higher by the factor $\left( 1 + e_u \right)$, $e_u$ being the engineering uniform elongation, and the true stress at fracture is higher still. **Elongation and reduction of area are not material properties** — they depend on the gauge length and the specimen diameter, and because the neck contributes a fixed extension, the same bar shows a larger elongation on a short gauge than on a long one, which is why a specification that quotes "elongation" without the gauge length is unenforceable. And **strength and ductility trade**, so a high strength and a high elongation quoted for the same alloy should be checked to refer to the same temper and the same specimen. Where the trade must be quantified, the number to ask for is not either property but the product, or the **formability** — the forming-limit diagram, the $n$-value and the $r$-value — which are measured for the purpose and mean what they say.
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
and after necking **neither pair is valid** without a correction for the triaxial stress state in the neck — the Bridgman correction, which reduces the true stress at fracture by ten per cent or more. The reduction of area
$$
\mathrm{RA} = \frac{A_0 - A_f}{A_0}
$$
is the one ductility measure that is genuinely local and genuinely independent of the specimen, and it is the number to ask for when ductility matters.
:::

::: definition Yield, and why it is defined at $0.2\ \%$ {#def-yield}
For a material without a sharp yield point, the **proof stress** $\sigma_{0.2}$ is the stress at which a load-and-unload cycle leaves $0.2\ \%$ of permanent strain. The choice of $0.2\ \%$ is a convention: large enough to measure reliably with a clip-on extensometer and small enough to be near the onset of plastic flow. Other offsets ($\sigma_{0.1}$, $\sigma_{0.5}$, or a total-strain definition) are also used, and for a strongly work-hardening alloy they can differ by several per cent.
Mild steel is the exception: it shows an **upper and lower yield point** because interstitial carbon and nitrogen atoms pin dislocations by forming Cottrell atmospheres, and once a dislocation breaks away it moves at a lower stress. The consequence is a load drop and a **Lüders band** that propagates along the bar at nearly constant load, giving up to $5\ \%$ of strain at constant stress — the mechanism of the stretcher strains and Lüders lines that ruin a car door panel, and the reason a skin-pass or temper-rolling pass is given to sheet steel before forming.
:::

::: definition Work hardening, strain rate and the Considère criterion {#def-hardening}
Between yield and necking most metals follow the **Hollomon** or **Ludwick** relations
$$
\sigma_{\mathrm{true}} = K \epsilon_{\mathrm{true}}^{n} \qquad \text{or} \qquad
\sigma_{\mathrm{true}} = \sigma_y + K \epsilon_{p}^{n} ,
$$
with $n$ the strain-hardening exponent, typically about $0.5$ for annealed copper, $0.45$ for annealed austenitic stainless steel, $0.2$ for an annealed low-carbon steel, $0.1$ for a high-strength aluminium alloy in the peak-aged temper, and only a few hundredths for a heavily cold-worked metal. The strain-rate sensitivity is
$$
m = \frac{\partial \ln \sigma}{\partial \ln \dot{\epsilon}} \Big|_{\epsilon , T} ,
$$
with $m \approx 0.005$ for an FCC metal at room temperature, $0.01$ to $0.02$ for a BCC metal, $0.3$ to $0.8$ for a superplastic fine-grained alloy at its forming temperature and $0.02$ to $0.3$ for polymers above their glass transition.
**Considère's criterion** states that a tensile bar becomes unstable when
$$
\frac{\mathrm{d} \sigma_{\mathrm{true}}}{\mathrm{d} \epsilon_{\mathrm{true}}} = \sigma_{\mathrm{true}} ,
$$
which for $\sigma = K \epsilon^{n}$ gives the elegant result $\epsilon_u = n$: **the strain-hardening exponent is the uniform elongation**, and a metal with $n = 0.1$ cannot be stretched uniformly in uniaxial tension beyond a true strain of $0.1$, however carefully the test is run.
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
**The consequences.** For $\sigma = K \epsilon^{n}$, $\mathrm{d} \sigma / \mathrm{d} \epsilon = n K \epsilon^{n - 1} = \sigma$ gives $\epsilon_u = n$ exactly, which is why sheet for stretch forming is specified by its $n$-value and sheet for deep drawing by its plastic-strain ratio $r$ as well as its strength. For a material with rate sensitivity, Hart's analysis gives the onset of unstable necking as
$$
\frac{1}{\sigma} \frac{\mathrm{d} \sigma}{\mathrm{d} \epsilon} + m = 1 ,
$$
so a positive $m$ delays the instability, and above all a high $m$ makes a neck grow only slowly once it has formed, because the faster-straining neck becomes stronger. A superplastic alloy with $m \approx 0.5$ can be stretched by several hundred per cent — the basis of superplastic forming. And for a material whose curve is **flat**, $n = 0$, the criterion is met at yield: it cannot work-harden at all, it necks immediately, and it has no useful tensile ductility.
:::

::: widget plot
f: x^0.5; x^0.15; x^0.02
x: 0.02, 1.0
y: 0, 1.05
labels: n = 0.50; n = 0.15; n = 0.02
caption: True stress against true plastic strain for three strain-hardening exponents, all normalised to the same stress at $\epsilon = 1$. By the Considère criterion a power-law material becomes unstable where the slope of its curve falls to the stress, which is at $\epsilon = n$: the $n = 0.5$ curve (annealed copper) keeps hardening steeply and necks only at a true strain of $0.5$, while the nearly flat $n = 0.02$ curve necks at two per cent.
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
is good to about ten per cent for ductile steels and becomes unreliable for very hard steels, whose tensile strength is limited by brittle fracture rather than by plastic flow.
**The catch is the indentation size effect.** For indents a few micrometres across or smaller the measured hardness **rises**, because the steep strain gradient beneath a small indent requires extra geometrically necessary dislocations, which harden the material locally. A microhardness measurement of a case depth is therefore not comparable with a macrohardness measurement of the same case, and a specification that mixes the two is unenforceable.
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
For steel on steel $H \approx 3\ \mathrm{GPa}$ and the interfacial shear strength $\tau \approx 1\ \mathrm{MPa}$ to $300\ \mathrm{MPa}$ depending on whether the surfaces are oxidised, lubricated or clean, giving $\mu = \tau / H$ from below $0.001$ to $0.1$. The simple model underestimates $\mu$ for unlubricated metal (typically $0.4$ to $0.8$ in air) because the junctions grow when a tangential force is added to the normal one; in vacuum, with the surface films removed, this junction growth is unchecked and clean metals **cold weld**. A $100\ \mathrm{N}$ load on steel of $3\ \mathrm{GPa}$ hardness gives a real contact area of only $100 / 3 \times 10^{9}\ \mathrm{m^{2}} = 0.033\ \mathrm{mm^{2}}$ — a three-thousandth of a nominally flat $10\ \mathrm{mm}$-square face. Because clean junctions weld, space mechanisms use solid lubricants, soft-metal platings or polymers.
:::

::: example A tensile curve read completely {#ex-curve}
A $12.8\ \mathrm{mm}$-diameter, $50\ \mathrm{mm}$-gauge mild-steel specimen gives: proportional limit $210\ \mathrm{MPa}$ at a strain of $0.105\ \%$, lower yield $250\ \mathrm{MPa}$, maximum load $53\ \mathrm{kN}$, fracture at $38\ \mathrm{kN}$ with a final gauge length of $64\ \mathrm{mm}$ and a final diameter of $7.9\ \mathrm{mm}$. Report every property and say which of them are not properties.
::: solution
**Areas.** $A_0 = \pi \times 6.4^{2} = 128.7\ \mathrm{mm^{2}}$, $A_f = \pi \times 3.95^{2} = 49.0\ \mathrm{mm^{2}}$.
**Modulus.** $E = 210 / 0.00105 = 200\ \mathrm{GPa}$ from the proportional limit at $0.105\ \%$ strain. A property.
**Yield.** $\sigma_y = 250\ \mathrm{MPa}$ at the lower yield point. A property of this heat and temper.
**Ultimate.** $\sigma_{\mathrm{UTS}} = 53{,}000 / 128.7 = 412\ \mathrm{MPa}$.
**Uniform strain.** By Considère the true uniform strain equals $n$; taking $n = 0.20$, typical of an annealed mild steel, gives $\epsilon_u = 0.20$, an engineering uniform elongation $e_u = \mathrm{e}^{0.20} - 1 = 22\ \%$, and a true stress at maximum load $\sigma_{\mathrm{true}, u} = 412 \times 1.221 = 503\ \mathrm{MPa}$. Not measured here, so an estimate.
**Elongation.** $\left( 64 - 50 \right) / 50 = 28\ \%$ on a $50\ \mathrm{mm}$ gauge, a gauge-average true strain of $\ln \left( 64 / 50 \right) = 0.247$. Of the $14\ \mathrm{mm}$ extension, about $11\ \mathrm{mm}$ ($22\ \%$) is uniform and the rest is the neck. **Not a property**: it depends on the gauge length.
**Reduction of area.** $\mathrm{RA} = \left( 128.7 - 49.0 \right) / 128.7 = 62\ \%$, a local true fracture strain of $\ln \left( 128.7 / 49.0 \right) = 0.97$.
**Fracture stresses.** Engineering $38{,}000 / 128.7 = 295\ \mathrm{MPa}$, which is not a property of anything; true $38{,}000 / 49.0 = 776\ \mathrm{MPa}$ before the Bridgman correction.

*Check.* The local fracture strain $0.97$ is $3.9$ times the gauge-average $0.247$ — the neck, not the gauge, is where the ductility is. $\checkmark$

*Sanity.* The contradiction between a $62\ \%$ reduction of area and a $28\ \%$ elongation is not a contradiction: the reduction is **local** at the fracture and the elongation is **averaged** over $50\ \mathrm{mm}$, and a specimen that necks early and hard has a large RA and a modest elongation. This is why a specification for a pressure-vessel forging quotes the reduction of area and a specification for a car body panel quotes the elongation and the $n$-value — the first cares whether the material tears, the second cares where it thins.
:::
:::

::: example Contact stress and the depth of a case {#ex-hertz}
A $10\ \mathrm{mm}$-radius steel ball presses on a flat of the same steel, $E = 207\ \mathrm{GPa}$, $\nu = 0.3$, with $100\ \mathrm{N}$. Find the contact radius, the peak pressure and the maximum shear stress, and compare it with the shear yield of a $60\ \mathrm{HRC}$ bearing steel.
::: solution
**Equivalent properties.** For a ball on a flat $1 / R^{*} = 1 / R + 1 / \infty$, so $R^{*} = 10\ \mathrm{mm}$, and
$$
E^{*} = \left[ \frac{2 \left( 1 - 0.09 \right)}{207} \right]^{- 1} = 114\ \mathrm{GPa} .
$$
**Contact radius.**
$$
a = \left( \frac{3 \times 100 \times 0.010}{4 \times 114 \times 10^{9}} \right)^{1 / 3} = 188\ \mu\mathrm{m} .
$$
**Peak pressure.**
$$
p_0 = \frac{3 \times 100}{2 \pi \times 188^{2} \times 10^{- 12}} = 1.36\ \mathrm{GPa} .
$$
**Maximum shear.** $\tau_{\max} = 0.31 p_0 = 0.42\ \mathrm{GPa}$ at a depth of $0.48 a = 90\ \mu\mathrm{m}$.
**Comparison.** A $60\ \mathrm{HRC}$ through-hardening bearing steel has a yield strength near $2.0\ \mathrm{GPa}$ and a shear yield of about $1.15\ \mathrm{GPa}$, so at $100\ \mathrm{N}$ the contact is comfortably elastic. Because $p_0 \propto F^{1 / 3}$, at $1000\ \mathrm{N}$ the pressure rises by $10^{1 / 3} = 2.15$ to $2.93\ \mathrm{GPa}$ and the maximum shear to $0.91\ \mathrm{GPa}$ — still elastic. For a sphere with $\nu = 0.3$ first yield occurs, **below the surface**, when $p_0 = 1.60\ \sigma_y = 3.2\ \mathrm{GPa}$, that is at $F = 100 \times \left( 3.2 / 1.36 \right)^{3} \approx 1300\ \mathrm{N}$; above that load **the subsurface yields while the surface is still elastic**.

*Check.* Yielding on the first pass is not yet failure. For repeated rolling of a point contact on an elastic-perfectly-plastic material the shakedown limit is about $p_0 = 4.7 k = 4.7 \sigma_y / \sqrt{3} = 2.7\ \sigma_y = 5.4\ \mathrm{GPa}$, reached at $F = 100 \times \left( 5.4 / 1.36 \right)^{3} \approx 6300\ \mathrm{N}$. Between about $1300$ and $6300\ \mathrm{N}$ the first passes yield the subsurface, but the residual stresses they leave make later passes elastic: the contact **shakes down**. Above $6300\ \mathrm{N}$ every pass adds plastic strain and the subsurface ratchets towards a pit. $\checkmark$

*Sanity.* These limits assume a smooth, defect-free half-space. Real rolling bearings run at much lower contact pressures in service, and their fatigue life is governed by subsurface cracks starting at non-metallic inclusions, which is why bearing-steel cleanliness ratings matter so much and why vacuum-degassed or remelted bearing steels last considerably longer than air-melted ones of the same composition. And the $0.7\ \mathrm{mm}$ case depth of a carburised gear exists because the Hertzian shear maximum in a gear contact of $1.5\ \mathrm{GPa}$ lies $0.3$ to $0.5\ \mathrm{mm}$ down, where a $0.1\ \mathrm{mm}$ case would leave soft core beneath and the case would collapse into it.
:::
:::

::: example Friction, real area and cold welding {#ex-friction}
Two clean steel flats of apparent area $100\ \mathrm{mm^{2}}$ carry $100\ \mathrm{N}$. Give the real contact area, the mean junction pressure and the force to slide them, in vacuum and in air.
::: solution
**Real area.** With $H = 3\ \mathrm{GPa}$, $A_{\mathrm{real}} = W / H = 100 / \left( 3 \times 10^{9} \right) = 3.3 \times 10^{- 8}\ \mathrm{m^{2}} = 0.033\ \mathrm{mm^{2}}$ — about $0.03\ \%$ of the apparent area, even for flats that look perfectly smooth.
**Junction pressure.** Every junction is at the hardness, $3\ \mathrm{GPa}$, whatever the load; more load makes more junctions, not more pressure.
**In air.** The simplest Bowden–Tabor estimate takes the junctions to shear at the shear yield strength of the steel. With $H \approx 3 \sigma_y$, $\sigma_y \approx 1\ \mathrm{GPa}$ and $\tau = \sigma_y / \sqrt{3} = 0.58\ \mathrm{GPa}$,
$$
F = \tau A_{\mathrm{real}} = 0.58 \times 10^{9} \times 3.3 \times 10^{- 8} = 19\ \mathrm{N}, \qquad \mu = \frac{\tau}{H} = \frac{1}{3 \sqrt{3}} = 0.19 .
$$
Measured values for unlubricated steel in air are higher, about $0.5$ to $0.8$, because the junctions grow under the combined normal and tangential load until the oxide film at the interface gives way in shear.
**In vacuum.** Clean the surfaces in ultra-high vacuum and the films are gone: the junctions are metal-to-metal bonds, junction growth is no longer limited by a weak interface film, and $\mu$ rises well above $1$. The surfaces seize; the contact is a cold weld.

*Check.* A surface only stays clean in a good vacuum: at $10^{- 6}\ \mathrm{mbar}$ a monolayer of gas re-adsorbs in about a second, and only near $10^{- 10}\ \mathrm{mbar}$ does it take hours. $\checkmark$

*Sanity.* This is not a laboratory curiosity but the design rule of every space mechanism, and the reason stainless-on-stainless bearings and slip rings in vacuum seize, and the fix is a **solid lubricant** — $\mathrm{MoS_2}$, $\mathrm{WS_2}$ or diamond-like carbon, a few hundred nanometres, which gives $\mu$ of a few hundredths in vacuum. Molybdenum disulphide works best in vacuum and dry gas, whereas graphite needs adsorbed water vapour to lubricate and fails in vacuum. The same physics is why a bolted flange is lubricated on its threads — not to make it easier to turn but to make the **preload** predictable, since most of the tightening torque is spent on thread and under-head friction, so a $\mu$ of $0.25$ instead of $0.15$ gives a much lower preload for the same torque, and an under-preloaded flange leaks.
:::
:::

::: example Property limits and the search for a light stiff panel {#ex-limits}
A flat panel of given span and width, loaded in three-point bending, must reach a specified bending stiffness at minimum mass; its thickness is free. Rank steel, aluminium, quasi-isotropic CFRP, GFRP, balsa and a polymer foam, consider a sandwich, and state where each fails.
::: solution
**The index.** The bending stiffness of the panel is proportional to $E t^{3}$ and its mass to $\rho t$. Fixing the stiffness gives $t \propto E^{- 1 / 3}$, so the mass is proportional to $\rho / E^{1 / 3}$, and the material to choose maximises $E^{1 / 3} / \rho$ (units $\mathrm{GPa^{1/3}\, cm^{3} / g}$):
$$
\begin{array}{l c c c}
\text{Material} & E\ \left[ \mathrm{GPa} \right] & \rho\ \left[ \mathrm{g / cm^{3}} \right] & E^{1 / 3} / \rho \\
\text{Steel} & 207 & 7.85 & 0.75 \\
\text{Aluminium} & 69 & 2.70 & 1.52 \\
\text{CFRP quasi-isotropic} & 50 & 1.55 & 2.38 \\
\text{GFRP} & 30 & 1.90 & 1.64 \\
\text{Balsa (along grain)} & 4 & 0.15 & 10.6 \\
\text{PVC foam} & 0.1 & 0.10 & 4.6
\end{array}
$$
**The sandwich is not in the ranking and is the answer.** A panel's bending stiffness is $E I$ and $I$ goes as the cube of the thickness, so putting thin, stiff skins on a thick, light core raises the stiffness enormously for little extra mass: per unit width, two $2\ \mathrm{mm}$ skins on a $50\ \mathrm{mm}$ core have $I = 2 \left( 2^{3} / 12 + 2 \times 26^{2} \right) = 2707\ \mathrm{mm^{4} / mm}$ against $4^{3} / 12 = 5.3\ \mathrm{mm^{4} / mm}$ for the same skins laid together as a $4\ \mathrm{mm}$ solid laminate — about **five hundred times** stiffer, before the core's own (small) mass is counted, at the cost of a shear-limited core and a debonding-prone interface. Balsa and foam rank highest on the index precisely because they are low-density, and their place is as the core.
**Where each fails.** Steel yields at $350\ \mathrm{MPa}$ and is heavy. Aluminium is isotropic, cheap and fatigue-notch-sensitive. CFRP is anisotropic, so the panel is stiff in the fibre directions and soft in the transverse, and it fails by **delamination** after a tool drop, which is invisible from outside. Balsa and foam cores crush under a point load and absorb water at a cut edge.

*Sanity.* The index arithmetic is right and the ranking is right, and it is the reason an aircraft wing skin is a CFRP laminate on a spar rather than a steel plate, and the reason a wind-turbine blade is a CFRP spar cap on a balsa or PET-foam core. What the index does not capture is **damage**: a dented steel panel keeps most of its strength, while an impact on a CFRP panel can leave barely visible internal delamination that removes a large part of its compressive strength, which is why every composite structure carries a damage-tolerance specification, a tap-test or a thermography inspection, and a maximum permissible delamination size.
:::
:::

::: example Design {#ex-design-spec}
Write the material specification for a hydraulic manifold block that must be machinable, weldable to a steel fitting, pressure-tight at $35\ \mathrm{MPa}$, dimensionally stable after machining, and cheap in $500$-piece quantities.
::: solution
**Screen on the requirements.**
- **Pressure tightness at $35\ \mathrm{MPa}$** with a typical wall of $8\ \mathrm{mm}$ and a bore of $20\ \mathrm{mm}$ puts a hoop stress of $35 \times 10 / 8 = 44\ \mathrm{MPa}$ on the wall; with a safety factor of four that is a yield of $175\ \mathrm{MPa}$, which eliminates nothing common.
- **Machinability** in $500$-piece quantities favours a free-cutting alloy: a leaded or lead-free free-cutting steel, or $356$ aluminium with its $7\ \%$ silicon, or $6061$-T6.
- **Weldability to steel** eliminates aluminium outright — there is no economical way to weld aluminium to steel, and a bimetallic transition insert is a cost item that a $500$-piece run cannot carry.
- **Dimensional stability after machining** eliminates anything with residual stress: a sand casting will move as it is stress-relieved, and a cold-drawn bar will bow as the cutting releases the surface stress.
**Choice.** A **stress-relieved, hot-rolled low-carbon plate** — S355 or $16\ \mathrm{Mo}$ — machined from a plate of the same heat, stress-relieved after rough machining and before finishing, with the finishing cut taking $0.5\ \mathrm{mm}$.
**The specification, in the order that matters.**
1. Material and heat: EN $10025$ S355J2+N, one heat lot, with the mill certificate.
2. Condition: $+ N$ normalised, and a **subsequent stress relief** at $600\ {}^{\circ}\mathrm{C}$ for two hours after rough machining.
3. Mechanical: $R_{\mathrm{eH}} \ge 355\ \mathrm{MPa}$ (thinner sections; the minimum falls with thickness), $R_m = 470$ to $630$, $A \ge 20\ \%$, Charpy V at $- 20\ {}^{\circ}\mathrm{C} \ge 27\ \mathrm{J}$ in the transverse direction.
4. Soundness: ultrasonic examination to EN $10160$ at an agreed acceptance class, because a laminar inclusion in a manifold is a leak path.
5. Flatness after stress relief, measured and recorded, because it is the property the machining depends on.
6. No plating unless it is specified **before** the dimensional check, because electroless nickel grows the part by its own thickness and a plated manifold that was finished to size before plating is oversize.

*Design comment.* The two clauses that a careless specification omits are the stress relief and the ultrasonic examination, and each omission costs more than it saves: without the first, a manifold that measured correctly on the table measures wrongly a week later, and without the second, a $35\ \mathrm{MPa}$ system leaks from an inclusion that was in the plate before anyone drew the part. The second point of substance is that **the strength requirement is not what selects the material** — every candidate has at least twice the required yield — and what selects it is weldability, machinability and dimensional stability, which is the general pattern in mechanical design and the reason a materials selection is nearly always a manufacturing selection wearing a mechanics disguise.
:::
:::

::: history
Systematic strength testing grew up with the railways and iron bridges of nineteenth-century Britain: **William Fairbairn** and **Eaton Hodgkinson**'s tests of the mid-1840s on wrought-iron tubes and plates fed the design of the Britannia Bridge, and **David Kirkaldy** opened his commercial testing works in London in 1866 around a large hydraulic testing machine. **Armand Considère** analysed the instability of the tension test in 1885, in a memoir on the use of iron and steel in construction. **Heinrich Hertz**'s theory of elastic contact (1881) arose from his study of the interference fringes between two glass lenses pressed together, and in 1882 he proposed a definition of hardness based on it. **Johan August Brinell** introduced his ball-indentation test in 1900, **Hugh** and **Stanley Rockwell** patented the depth-reading Rockwell tester in 1919, and **Robert Smith** and **George Sandland** introduced the diamond-pyramid test, made by Vickers, in the early 1920s. **John Hollomon**'s paper of 1945 gave the power-law hardening relation that carries his name. **Alan Cottrell** and **Bruce Bilby** explained the sharp yield point and strain ageing of mild steel in 1949 by the locking of dislocations by carbon and nitrogen atmospheres. **Frank Philip Bowden** and **David Tabor**'s *The Friction and Lubrication of Solids* (1950), from their laboratory at Cambridge, established the asperity-junction picture of friction, with real contact areas measured by electrical conductance. In the same year **W. T. Lankford**, **S. C. Snyder** and **J. A. Bauscher** introduced the plastic-strain ratio as a predictor of deep-drawing performance, and **Percy Bridgman**'s *Studies in Large Plastic Flow and Fracture* (1952) gave the correction for the triaxial stress in the neck.
:::

## Where this leads

The strain-hardening exponent is the dislocation storage argument of [[materials-science/dislocations-strengthening]], the hardness of a case-hardened layer is the diffusion profile of [[materials-science/defects-diffusion]], the contact shear maximum of [[#ex-hertz]] is the crack-nucleation site of [[materials-science/failure]], and the $r$-value of Exercise 9 is the texture consequence of [[materials-science/bonding-structure]] applied to a rolling mill.

::: summary
- One tensile curve gives the modulus, the yield, the ultimate strength, the uniform strain and the local ductility, but the elongation is specimen-dependent and the ultimate strength is an instability, not a fracture stress.
- Yield is defined at a $0.2\ \%$ offset by convention; mild steel's sharp yield point is a Cottrell-atmosphere effect and produces Lüders bands.
- The Considère criterion $\mathrm{d}\sigma / \mathrm{d}\epsilon = \sigma$ puts the ultimate tensile strain at $\epsilon_u = n$, so the strain-hardening exponent is the forming limit and rate sensitivity $m$ raises it.
- Hardness is a plastic strength measured through an indentor, converts to tensile strength at a factor of about three for steels, and is not size-independent below a few microns.
- Hertzian contact puts the maximum shear below the surface, which is why gears and bearings pit from underneath and why carburised cases are typically $0.5$ to $1\ \mathrm{mm}$ deep.
- Friction is proportional to load because asperity junctions yield at the hardness, and removing the surface films makes the friction exceed unity and the joint cold-weld.
:::

::: quiz
A tensile test on a ductile steel gives an elongation of $12\ \%$ on a $50\ \mathrm{mm}$ gauge and a reduction of area of $70\ \%$. What does the combination indicate?
- [x] Heavy early necking: the ductility is local, and the gauge-length average understates it
- [ ] The specimen was misaligned
- [ ] The material is brittle
- [ ] The extensometer slipped
::: solution
A reduction of area of $70\ \%$ is a true local fracture strain of $\ln \left[ 1 / \left( 1 - 0.70 \right) \right] = 1.20$, about ten times the gauge-average true strain of $\ln 1.12 = 0.11$. The metal is very ductile where it broke and the elongation is low because it necked early — a low $n$-value with a high fracture strain, typical of a cold-worked or quenched-and-tempered steel.
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
What is the uniform elongation, as a true strain, of a metal obeying $\sigma = K \epsilon^{n}$ with $n = 0.15$? (Enter the true strain.)
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
\sigma_{\mathrm{eng}} = \frac{\sigma_u}{1 + e_u} = \frac{226}{\mathrm{e}^{0.54}} = \frac{226}{1.716} = 132\ \mathrm{MPa} .
$$
Note that the engineering strain is $\mathrm{e}^{0.54} - 1 = 0.716$, not $0.54$: dividing by $1.54$ would mix true and engineering strain.
*Sanity.* Handbook UTS values for annealed copper are about $210$ to $220\ \mathrm{MPa}$, well above $132$. A Hollomon fit is only as good as the strain range it was fitted over, and extrapolating it to the necking strain can be badly wrong; the measured curve is the authority.
:::
:::

::: exercise Real contact {level=2}
A $500\ \mathrm{N}$ load is carried by a brass washer on a steel plate, hardness $1.2\ \mathrm{GPa}$ and apparent area $800\ \mathrm{mm^{2}}$. Give the real contact area and the fraction of the apparent area it represents.
::: solution
$A_{\mathrm{real}} = 500 / 1.2 \times 10^{9} = 0.42\ \mathrm{mm^{2}}$, which is $0.05\ \%$ of the apparent area.
*Sanity.* Ninety-nine point nine five per cent of the interface is not touching, which is why a gasket works, why a flange needs a surface finish specified as an $R_a$ and a waviness, and why a bolted joint conducts heat far worse than solid metal — the heat has to cross $0.42\ \mathrm{mm^{2}}$ of metal contact and $799.6\ \mathrm{mm^{2}}$ of air gap.
:::
:::

::: exercise Derivation {level=3}
Show that the plastic-strain ratio $r = \mathrm{d} \epsilon_w / \mathrm{d} \epsilon_t$ for a sheet under uniaxial tension, with $w$, $t$ and $l$ the width, thickness and length directions, equals $1$ for an isotropic material obeying the Lévy–Mises flow rule, and explain why $r > 1$ is good for deep drawing.
::: solution
**The flow rule.** With plastic incompressibility $\mathrm{d} \epsilon_l + \mathrm{d} \epsilon_w + \mathrm{d} \epsilon_t = 0$ and the Levy-Mises relation for a uniaxial stress $\sigma_l$,
$$
\mathrm{d} \epsilon_l = \mathrm{d} \lambda \sigma_l , \quad
\mathrm{d} \epsilon_w = - \tfrac{1}{2} \mathrm{d} \lambda \sigma_l , \quad
\mathrm{d} \epsilon_t = - \tfrac{1}{2} \mathrm{d} \lambda \sigma_l ,
$$
so for an isotropic material $r = 1$ exactly. Any departure is **anisotropy**, and for a rolled sheet the texture makes the through-thickness direction harder or easier to deform than the in-plane ones.
**Why $r > 1$ is good.** In deep drawing the flange is pulled in under circumferential compression while the cup wall carries the punch load in tension and must not thin **through the thickness**. $r = \mathrm{d}\epsilon_w / \mathrm{d}\epsilon_t > 1$ means the sheet deforms more readily in its plane than through its thickness, so the flange draws in easily while the wall resists thinning, and a deeper cup can be drawn before the wall fails. Drawing quality steels are specified at $\bar{r} = 1.6$ to $2.2$.
**The catch.** A strong $\gamma$-fibre texture that raises $\bar{r}$ also raises the planar anisotropy $\Delta r$, which makes the blank draw in faster in some directions than others and produces **ears** — usually four, at $0^{\circ}$ and $90^{\circ}$ or at $\pm 45^{\circ}$ to the rolling direction — around the rim of a drawn cup, which must be trimmed away as scrap.

*Sanity.* In practice $r$ is measured (ISO 10113) from the width and length strains of a tensile specimen at a specified elongation, the thickness strain being inferred from volume constancy, because the thickness change of a thin sheet is too small to measure accurately. A steel with $r$ well below $1$ draws poorly, which is the whole of the difficulty of putting third-generation automotive steels into body panels and the reason the industry uses hot forming of boron steel for the parts that need both strength and shape.
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
\text{Natural rubber} & 5 & 0.0012 & 10.4
\end{array}
$$
**Choice.** Music wire has the highest resilience but corrodes; **17-7 PH precipitation-hardening stainless** at $6.8\ \mathrm{MJ / m^{3}}$ is the answer, since it is hardened by aging at $565\ {}^{\circ}\mathrm{C}$, is comfortable to $315\ {}^{\circ}\mathrm{C}$, and is the standard material for a corrosion-resistant high-stress spring. Where the price forbids it, a **silicon-manganese** or **chrome-silicon** spring steel with a zinc-flake coating is used; zinc-flake coatings are applied without electrolysis and introduce no hydrogen, whereas an electroplated high-strength spring must be baked promptly after plating to drive out hydrogen or it may fail by hydrogen embrittlement.
**The section.** Energy per unit volume is greatest when all the material works at the allowable stress. A helical spring loads its wire in torsion, where the stress rises linearly from zero at the centre, so a round wire stores on average half of $\tau_{\max}^{2} / 2 G$ per unit volume; a uniform rectangular leaf under a central load stores only one ninth of $\sigma_{\max}^{2} / 2 E$, and a leaf of triangular plan, at constant maximum stress along its length, one third — which is why leaf springs are tapered.
**The failure.** Springs fail at the **inside of the coil at the scale pit or the decarburised surface**, because curvature raises the stress at the inside of the coil, by about $15$ to $25\ \%$ for common spring indices (the Wahl factor), and a decarburised skin has no compressive residual stress from the shot peen. So the specification must include the peening and forbid the decarburised layer.

*Sanity.* Rubber's apparent resilience of $10\ \mathrm{MJ / m^{3}}$ is misleading, because the calculation assumes a linear elastic solid: rubber is strongly non-linear at large strain and hysteretic, so a substantial fraction of the energy put in each cycle is lost as heat, which warms and eventually degrades the part. Rubber is used where **damping** is wanted and steel where **storage** is wanted, and the two are opposite requirements.
:::
:::
