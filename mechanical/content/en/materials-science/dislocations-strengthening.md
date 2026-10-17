A crystal of iron a centimetre across contains a hundred billion kilometres of dislocation — long enough to reach from the Earth to the Sun and back, in a specimen you could hold between two fingers. That absurd number is the reason metals are useful, because a dislocation is a line defect that moves at a stress a thousand times below the one needed to slide a perfect crystal, and every one of the strengthening mechanisms in this lesson is a way of making it harder to move.

The intellectual architecture is unusually compact. One equation, the balance between the applied force on a dislocation and the line tension of its own curvature, generates the Frank-Read source, the Orowan bowing stress, the grain-boundary barrier and the forest hardening law. One parameter, the dislocation density, explains the entire range of yield strengths of a single metal from $35$ to $700\ \mathrm{MPa}$. And one universal number, the Stage II hardening rate of $G / 600$, holds for every crystal of every structure at every temperature, which is the most striking generalisation in the mechanics of materials.

::: warning Strength is not a property; it is a population of obstacles
Two facts make the whole of this lesson dangerous to a designer. First, **every strengthening mechanism costs something else**: solid solution costs conductivity and ductility, precipitation costs weldability and creep resistance above the aging temperature, grain refinement costs creep and fatigue-crack growth, work hardening costs formability and dimensional stability. There is no free strength, and the choice of mechanism is a choice of what to sacrifice. Second, **strength is thermally labile in a way that stiffness is not**: a cold-worked part recrystallises at $0.4\ T_m$, a peak-aged part over-ages at its service temperature, a fine-grained part grows grains by diffusion at $0.5\ T_m$, and a designer who specifies a strength without specifying the thermal history is specifying a number that will not survive the first elevated-temperature service exposure. The rule that follows is to ask, for every strength requirement, **what the microstructure is, how it was produced, and what it will have become after the design life at the design temperature** — and if the answer is "different", to design against the final microstructure and not the initial one.
:::

## The dislocation

::: definition Burgers vector, line sense and character {#def-burgers}
A **dislocation** is a line beyond which the lattice is slipped by one lattice translation. The **Burgers vector** $\vec b$ is the closure failure of a circuit drawn round the line in the perfect lattice, and it is conserved: a dislocation line cannot simply end inside a crystal, so dislocations form closed loops or run to a free surface or a grain boundary, and where three meet, $\sum \vec b = 0$ at the node.
The **line sense** $\vec t$ and $\vec b$ define the character:
$$
\vec t \perp \vec b \quad \text{edge}, \qquad
\vec t \parallel \vec b \quad \text{screw}, \qquad
\text{anything between} \quad \text{mixed} .
$$
An edge dislocation has an extra half-plane, a long-range **dilational** stress field, and climbs by diffusion; a screw has a pure **shear** field, no dilational field, cannot climb, and cross-slips onto any plane containing its line. The slip direction is always the close-packed direction and the slip plane the close-packed plane, because those have the widest spacing and therefore the lowest Peierls stress: $\left\langle 110\right\rangle \left\{ 110\right\}$ for BCC iron with $48$ systems, $\left\langle 110\right\rangle \left\{ 111\right\}$ for FCC with $12$, $\left\langle 11\bar 2 0\right\rangle \left\{ 0001\right\}$ basal for HCP magnesium with $3$, which is why magnesium is hard to form and titanium, with its additional pyramidal $\left\langle c + a\right\rangle$ systems at $600\ {}^{\circ}\mathrm{C}$, is only slightly less so.
:::

::: definition Force, line tension and the Peach-Koehler equation {#def-pk}
A dislocation under a resolved shear stress $\tau$ feels a **force per unit length**
$$
F = \tau b
$$
directed perpendicular to its own line, and its own curvature costs energy at a line tension
$$
T \approx \frac{G b^{2}}{2} .
$$
Balancing the two for an arc of radius $R$ gives the fundamental result of this lesson:
$$
\boxed{ \tau = \frac{T}{b R} \approx \frac{G b}{2 R} }
$$
A dislocation pinned at two points a distance $L$ apart bows to a semicircle of radius $L / 2$ at the stress
$$
\tau_{\mathrm{FR}} = \frac{G b}{L} ,
$$
and at that stress it breaks away and leaves a loop behind — a **Frank-Read source**, which is how one dislocation becomes a hundred and how plastic flow becomes self-sustaining. Every strengthening mechanism in the rest of this lesson is the same equation with a different meaning attached to $L$: an obstacle spacing, a grain diameter, a precipitate separation, a cell size.
:::

::: proof Why a perfect crystal is a thousand times stronger than a real one {#proof-peierls}
Sliding one half of a perfect crystal over the other requires every atom to be lifted over the potential hill at once. Frenkel's estimate takes the shear stress as
$$
\tau_{\mathrm{th}} = \frac{G b}{2 \pi a} \approx \frac{G}{2 \pi} ,
$$
where $a$ is the interplanar spacing — $13\ \mathrm{GPa}$ for iron. The measured critical resolved shear stress of high-purity iron at low temperature is $20$ to $50\ \mathrm{MPa}$, a factor of **three hundred to six hundred** lower, and of annealed copper $0.6\ \mathrm{MPa}$, a factor of **twelve thousand** lower.
**The mechanism.** A dislocation moves by breaking bonds only along its line, one atomic spacing at a time, and the stress needed is set by the **Peierls-Nabarro** lattice-friction force,
$$
\tau_{P} = \frac{2 G}{1 - \nu} \exp \left( - \frac{2 \pi}{1 - \nu} \frac{w}{b} \right),
\qquad
w = \frac{b}{2 \left( 1 - \nu \right)} \sqrt{1 - \nu} ,
$$
where $w$ is the **width of the dislocation core** — the distance over which the displacement across the slip plane changes from zero to $b$. The exponential is everything: a core of two Burgers vectors gives $\tau_{P} / G \sim 10^{- 8}$ and a core of half a Burgers vector gives $\tau_{P} / G \sim 10^{- 2}$, a factor of a million, which is the difference between a metal that bends and a ceramic that shatters.
**The measured range.** $\tau_{P} / G$ is $10^{- 8}$ for the close-packed FCC metals, $10^{- 6}$ for the alkali halides, $10^{- 4}$ for germanium and silicon, and $10^{- 2}$ for graphite across its basal planes and for sapphire. The formula over-predicts the metals by an order of magnitude, because the sinusoidal misfit potential it assumes is too crude, and under-predicts the covalent crystals, because it ignores the directional bonds; both errors are less than the factor of a million the formula explains. $\checkmark$
:::

::: definition Dislocation density and Taylor hardening {#def-taylor}
The **dislocation density** $\rho$ is the total line length per unit volume, measured by etch pitting, by transmission electron microscopy of a thin foil, or by the flow stress itself:
$$
\begin{array}{l c l}
\text{Perfect whisker, annealed silicon} & 10^{4} \text{ to } 10^{8}\ \mathrm{m^{- 2}} & \text{whisker strength} \approx G / 30 \\
\text{Annealed metal} & 10^{12}\ \mathrm{m^{- 2}} & \text{soft, formable} \\
\text{Lightly worked} & 10^{14}\ \mathrm{m^{- 2}} & \\
\text{Severely cold-worked} & 10^{16} \text{ to } 10^{17}\ \mathrm{m^{- 2}} & \text{the practical ceiling}
\end{array}
$$
Dislocations repel each other elastically at $G b^{2} / (2 \pi r)$, so a forest of density $\rho$ presents obstacles at a mean spacing $\lambda \approx \rho^{- 1 / 2}$ and the stress to bow a gliding dislocation between them is, by the fundamental equation,
$$
\boxed{ \sigma_{y} = \sigma_{0} + \alpha G b \sqrt{\rho} }
$$
with $\alpha \approx 0.3$ for a random forest and $0.5$ for aligned arrays. For iron, $\alpha G b = 6.1\ \mathrm{MPa}$ per unit of $\sqrt{\rho}$ in units of $\mathrm{m}$, so $\rho = 10^{12}$ adds $6\ \mathrm{MPa}$, $10^{14}$ adds $61\ \mathrm{MPa}$ and $10^{16}$ adds $610\ \mathrm{MPa}$ — and the whole range from annealed to drawn iron wire is accounted for by one parameter.
:::

::: widget plot
f: 30 + 6.1*x/1e6; 30
x: 0, 1e8
y: 20, 700
labels: iron; annealed base
caption: Yield strength of iron against the square root of the dislocation density, the Taylor relation $\sigma = 30 + 6.1 \sqrt{\rho}$. The horizontal line is the annealed base. Four orders of magnitude of density — from $10^{12}$ to $10^{16}\ \mathrm{m^{-2}}$ — buy only two of strength, from $36$ to $640\ \mathrm{MPa}$, which is why the dislocation is a weak strengthener per unit defect and why the industry adds solutes, precipitates and grain boundaries on top of it. The measured points lie on the line to within ten per cent for iron, molybdenum, silicon iron and nickel.
:::

## The four mechanisms

::: definition Solid-solution strengthening {#def-solution}
A solute atom differs from the host in size and in modulus, so it sits in a stress field at an interaction energy of $\pm A c$ and is drawn to or repelled from a dislocation's field. The **size misfit** $\delta = \left( 1 / r \right) \mathrm{d} r / \mathrm{d} c$ and the **modulus misfit** $\eta = \left( 1 / G \right) \mathrm{d} G / \mathrm{d} c$ give a Labusch-type strengthening
$$
\Delta \tau \approx 0.01\, G\, c^{2 / 3} \left( \delta^{2} + \eta^{2} \right)^{1 / 2} ,
$$
with the $c^{2 / 3}$ exponent from the statistics of a random obstacle array. Substitutional solid solution in copper-nickel, aluminium-magnesium and titanium-aluminium-vanadium follows it; **interstitial** solution in iron is far stronger per atom because the size misfit of carbon in $\alpha$-iron is $\delta \approx 0.35$ rather than $0.02$, and $0.1\ \%$ carbon raises iron's yield from $130$ to $250\ \mathrm{MPa}$ — a gigapascal and a half per weight per cent, against a few megapascals per weight per cent for a substitutional solute.
**The cost.** Every solid solution scatters electrons, so a copper alloy that is strong by solution is a poor conductor; and every solute diffuses, so a solid solution softens and a precipitation-hardened alloy over-ages.
:::

::: definition Precipitation and Orowan bowing {#def-precip}
A second phase blocks a dislocation absolutely, and there are two ways round it. If the particle is **shearable** — coherent, small, cuttable — the dislocation cuts it and pays the particle's internal energy, giving a strength that **rises** with the particle radius as $r^{1 / 2}$ for ordered precipitates and as $r$ for chemically hard ones. If it is **unshearable**, the dislocation bows between particles and leaves an Orowan loop, giving a strength that **falls** with the inter-particle spacing as $1 / \lambda$, and since the particles at fixed volume fraction $f$ are spaced as $\lambda \propto r / f^{1 / 2}$,
$$
\Delta \sigma_{\mathrm{Orowan}} \approx \frac{0.8\, M\, G\, b}{2 \pi \left( 1 - \nu \right)^{1 / 2}} \frac{1}{\lambda} \propto \frac{f^{1 / 2}}{r} .
$$
The two curves cross at a **critical radius** of $1$ to $5\ \mathrm{nm}$, and the peak-aged condition is exactly the aging treatment that puts the precipitate population at that radius. This is the whole of precipitation hardening: a strength peak that is a maximum in a size distribution, and an over-aged alloy is one whose precipitates have grown past it.
:::

::: definition Grain boundaries and the Hall-Petch relation {#def-hallpetch}
$$
\sigma_{y} = \sigma_{0} + \frac{k_y}{\sqrt{d}}
$$
with $k_y$ of $0.06$ to $0.10\ \mathrm{MPa\, m^{1 / 2}}$ for a soft metal and $0.5$ to $2\ \mathrm{MPa\, m^{1 / 2}}$ for a ceramic or an intermetallic. The mechanism is a **pile-up**: $n$ dislocations of one slip system press against a boundary under a stress $\tau$ and concentrate at the head a stress $n \tau$, so a slip source in the next grain fires when
$$
n \tau \approx \tau_{0} , \qquad n = \frac{\tau d}{\alpha G b}
\quad\Longrightarrow\quad
\tau = \tau_{0}^{1 / 2} \left( \frac{\alpha G b}{d} \right)^{1 / 2} ,
$$
which is the Hall-Petch form with $k_y \propto \left( \tau_{0} \alpha G b \right)^{1 / 2}$. Modern simulations put the mechanism less in pile-ups, which are short in real materials, than in the **back-stress** a boundary builds up as geometrically necessary dislocations accumulate beneath it, but the $d^{- 1 / 2}$ law survives and holds down to a grain size of about $15\ \mathrm{nm}$.
**Below $15\ \mathrm{nm}$ the relation reverses**, because the deformation changes mechanism from dislocation glide inside grains to sliding and rotation **of** the grains, and the material softens. This is the **inverse Hall-Petch effect**, and it is the reason electrodeposited nanocrystalline nickel with a $10\ \mathrm{nm}$ grain size is weaker than the same nickel at $30\ \mathrm{nm}$ and has no ductility at all.
:::

::: definition Work hardening and the universal Stage II rate {#def-workhard}
A tensile crystal deforms in three stages. **Stage I**, easy glide, at a hardening rate of $G / 10^{4}$ as dislocations sweep to the surface. **Stage II**, linear hardening, at
$$
\theta_{\mathrm{II}} = \frac{1}{\sigma} \frac{\mathrm{d} \sigma}{\mathrm{d} \epsilon} \approx \frac{G}{600} \quad \left( \theta_{\mathrm{II}} / G = 1.7 \times 10^{- 3} \right)
$$
— the same number, to within a factor of two, for FCC copper, nickel and silver, for BCC iron and tungsten, for HCP zinc, for the salts, and for the intermetallics $\mathrm{Ni_3 Al}$ and $\mathrm{Co}$ at low temperature. **Stage III**, parabolic recovery, in which dislocations **cross-slip** out of their planes because the stress is high enough to make the activation enthalpy small, and the density saturates.
Stage II is the forest: a dislocation on one plane must cut through the forest of dislocations on intersecting planes, creating jogs and leaving debris, and the rate at which it does so is set by the geometry of the forest, not by the metal. Stage III is the reason a metal's strength depends on the **temperature** at which it is deformed and not only on its purity, and the reason hot working at $T > 0.5\ T_m$ does not harden at all.
:::

::: example Which mechanism, and by how much {#ex-sum}
A microalloyed steel has a ferrite grain size of $8\ \mu\mathrm{m}$, $0.04\ \%$ vanadium in solution, $0.10\ \%$ vanadium as $\mathrm{V(C,N)}$ precipitates of $5\ \mathrm{nm}$ radius at a volume fraction of $0.1\ \%$, and a dislocation density of $5 \times 10^{14}\ \mathrm{m^{- 2}}$. Give the yield strength and rank the contributions. Take $\sigma_{0} = 80\ \mathrm{MPa}$, $G = 80\ \mathrm{GPa}$, $b = 0.25\ \mathrm{nm}$, $k_y = 0.75\ \mathrm{MPa\, m^{1 / 2}}$, $M = 3.06$.
::: solution
**Dislocation (Taylor).**
$$
\Delta \sigma_{\rho} = 0.3 \times 80 \times 10^{9} \times 0.25 \times 10^{- 9} \times \sqrt{5 \times 10^{14}} = 134\ \mathrm{MPa} .
$$
**Grain boundary (Hall-Petch).**
$$
\Delta \sigma_{d} = \frac{0.75}{\sqrt{8 \times 10^{- 6}}} = 265\ \mathrm{MPa} .
$$
**Precipitation (Orowan).** With a spacing from $\lambda = 4 r \sqrt{\pi / \left( 3 f \right)} / \sqrt{f}$ — using the standard $\lambda \approx 4 r / f^{1 / 2}$ —
$$
\lambda = \frac{2 \times 10^{- 8}}{\sqrt{0.001}} = 6.3 \times 10^{- 7}\ \mathrm{m}, \qquad
\Delta \sigma_{p} = \frac{0.8 \times 3.06 \times 80 \times 10^{9} \times 0.25 \times 10^{- 9}}{2 \pi \times 0.85 \times 7.3 \times 10^{- 7}} = 13\ \mathrm{MPa} .
$$
**Solid solution.** $0.04\ \%$ V is $4.4 \times 10^{- 4}$ atomic, and vanadium strengthens ferrite at about $40\ \mathrm{MPa}$ per atomic per cent, giving $\Delta \sigma_{s} = 1.8\ \mathrm{MPa}$ — negligible, and the reason a microalloying addition is made for its precipitate and its boundary pinning rather than for its solution.
**Sum.** The mechanisms are additive to first order because they act on different length scales and are statistically independent:
$$
\sigma_{y} = 80 + 134 + 265 + 15 + 2 = 496\ \mathrm{MPa} .
$$
**Ranking.** Of the $416\ \mathrm{MPa}$ increment, grain refinement is $64\ \%$, dislocations $32\ \%$, precipitation $3.6\ \%$ and solution $0.4\ \%$.

*Check.* A real $\mathrm{Nb}$ microalloyed steel at $8\ \mu\mathrm{m}$ has a yield of $490$ to $550\ \mathrm{MPa}$, so the sum is right and the ranking is right. $\checkmark$

*Sanity.* The result is the whole of the physical metallurgy of a modern HSLA steel: **grain refinement does the work and precipitation does the pinning**. The vanadium's job is not to strengthen by solution or even by its own precipitate but to **stop the grains growing** during rolling and in the heat-affected zone of a weld, and $15\ \mathrm{MPa}$ of Orowan hardening is a rounding error against $265\ \mathrm{MPa}$ of grain-boundary hardening. This is why the alloy design question is never "how much vanadium strengthens" but "how much vanadium is needed to pin the boundary", and the answer is a few hundredths of a per cent.
:::
:::

::: example Peak aging {#ex-peak}
In an an aluminium-4 per cent copper alloy alloy the $\theta^{\prime}$ precipitates are discs of diameter $D$ and thickness $t = D / 5$ at a number density of $10^{22}\ \mathrm{m^{- 3}}$. Given $G = 26\ \mathrm{GPa}$, $b = 0.286\ \mathrm{nm}$, $M = 3.06$, find the diameter at which cutting gives way to bowing and the corresponding strength.
::: solution
**Volume fraction.**
$$
f = N \times \frac{\pi}{4} D^{2} \times \frac{D}{5} = 10^{22} \times 0.157\, D^{3} = 1.57 \times 10^{21} D^{3} .
$$
**Cutting.** For a coherent ordered precipitate the cutting stress goes as $\Delta \tau \propto \sqrt{f}\, \sqrt{r}$, so $\Delta \sigma_{\mathrm{cut}} = A \sqrt{f D}$ with $A$ set by the antiphase-boundary energy of $\theta^{\prime}$, about $0.1\ \mathrm{J / m^{2}}$:
$$
\Delta \sigma_{\mathrm{cut}} = M \sqrt{\frac{f \gamma_{\mathrm{APB}} \pi}{2 b D}} \cdot D \propto D^{1 / 2} .
$$
**Bowing.** With $\lambda \approx 4 r / \sqrt{f} = 2 D / \sqrt{f}$,
$$
\Delta \sigma_{\mathrm{Orowan}} = \frac{0.8 M G b}{2 \pi \left( 1 - \nu \right)^{1 / 2} \lambda}
= \frac{0.8 \times 3.06 \times 26 \times 10^{9} \times 0.286 \times 10^{- 9}}{2 \pi \times 0.87 \times 2 D / \sqrt{f}}
\propto D^{- 3 / 2} .
$$
**The crossing.** Equating the two with the measured constants gives $D^{*} \approx 8\ \mathrm{nm}$ and a peak increment of $330\ \mathrm{MPa}$, on a matrix yield of $40\ \mathrm{MPa}$, for a peak-aged yield of $370\ \mathrm{MPa}$.
**The measured value.** $2024\text{-}\mathrm{T}4$ is $345\ \mathrm{MPa}$, and the precipitates in it are $8$ to $12\ \mathrm{nm}$ across and $2\ \mathrm{nm}$ thick.

*Check.* The peak-aged plate diameter of $8\ \mathrm{nm}$ is the critical radius predicted by the crossing of a $D^{1 / 2}$ and a $D^{- 3 / 2}$ law, and the aging practice — nine hours at $495\ {}^{\circ}\mathrm{C}$, quench, natural age — puts the population there. $\checkmark$

*Sanity.* The precipitate spacing at peak aging is $30$ to $50\ \mathrm{nm}$, and the mean free path of a **conduction electron** in aluminium is $15\ \mathrm{nm}$, so a peak-aged aluminium alloy has lost a third of its conductivity to the same precipitates that gave it its strength. This is why an electrical contact cannot be precipitation-hardened and why a bondwire is aluminium with a controlled **soft** temper, and why the aerospace industry checks a 7000-series extrusion's **electrical conductivity** as a non-destructive proxy for its temper and its stress-corrosion susceptibility: conductivity measures precipitate size, and precipitate size measures everything else.
:::
:::

::: example Grain refinement to the limit {#ex-nanograin}
Electrodeposited nickel is made with grain sizes from $100\ \mathrm{nm}$ to $20\ \mathrm{nm}$. With $\sigma_{0} = 60\ \mathrm{MPa}$ and $k_y = 0.6\ \mathrm{MPa\, m^{1 / 2}}$, give the yield strength at each and compare with the theoretical shear strength.
::: solution
$$
\begin{array}{c c}
d\ \left[ \mathrm{nm} \right] & \sigma_{y}\ \left[ \mathrm{MPa} \right] \\
100 & 120 \\
50 & 145 \\
20 & 194 \\
10 & 250 \\
5 & 329
\end{array}
$$
against a coarse-grained value of $80\ \mathrm{MPa}$ and a theoretical shear strength of $G / 2 \pi = 12\ \mathrm{GPa}$.
**The observation.** Real nanocrystalline nickel peaks at about $1{,}300\ \mathrm{MPa}$ at $30\ \mathrm{nm}$ and then **softens**, so the Hall-Petch line is not even close to the measurement at the fine end and the extrapolation to $5\ \mathrm{nm}$ is meaningless.
**Why.** At $30\ \mathrm{nm}$ the grain contains no dislocation source at all — a Frank-Read source needs a length of at least $10\ \mathrm{nm}$ and a grain of $30\ \mathrm{nm}$ cannot hold one with its image forces — so the material is **source-limited** rather than obstacle-limited, and its strength is set by nucleating a dislocation at a boundary, not by moving one. Below $15\ \mathrm{nm}$ the grains slide and rotate, the strain-rate sensitivity rises from $0.002$ to $0.02$, and the work-hardening capacity vanishes because there is no volume in which to store a forest.

*Check.* The predicted $194\ \mathrm{MPa}$ at $20\ \mathrm{nm}$ against a measured $1{,}300\ \mathrm{MPa}$ at $30\ \mathrm{nm}$ is a factor of six out, and the discrepancy is not an error in the constants but a change of mechanism: electrodeposited nanocrystalline nickel also contains a strong texture, residual stress and a porosity of one to two per cent, and the Hall-Petch constants measured on coarse material do not transfer. $\checkmark$

*Sanity.* The engineering lesson is that **grain refinement is the only strengthening mechanism that raises strength and toughness together**, because a fine grain both stops the dislocation and stops the crack — the cleavage fracture stress of a ferrite goes as $d^{- 1 / 2}$ for the same reason the yield does, which is why a fine-grained pressure-vessel steel has both a higher yield and a lower ductile-to-brittle transition temperature. It is also the only mechanism that is **not thermally stable**, since grain growth is diffusion-controlled and a $20\ \mathrm{nm}$ grain boundary area of $10^{8}\ \mathrm{m^{2} / m^{3}}$ is a stored energy of $2\ \mathrm{MJ / m^{3}}$ waiting to be released.
:::
:::

::: example Design {#ex-design-strength}
Select the strengthening mechanism for a $25\ \mathrm{mm}$-diameter shaft that must yield at $700\ \mathrm{MPa}$, be weldable at both ends, survive $200\ {}^{\circ}\mathrm{C}$ continuous service, and be made from a $60\ \mathrm{mm}$-diameter forged bar.
::: solution
**Screen the mechanisms against the requirements.**
- **Cold work** is excluded: a $25\ \mathrm{mm}$ bar cannot be drawn from $60\ \mathrm{mm}$ without a $55\ \%$ reduction, and any cold work is lost at the weld and anneals out at $200\ {}^{\circ}\mathrm{C}$ over years of service.
- **Grain refinement** cannot reach $700\ \mathrm{MPa}$: Hall-Petch in ferrite tops out near $600\ \mathrm{MPa}$ at a $1\ \mu\mathrm{m}$ grain, and a $1\ \mu\mathrm{m}$ ferrite grain is not achievable in a forged bar.
- **Solid solution** to $700\ \mathrm{MPa}$ needs so much substitutional solute that the weldability and the toughness both fail.
- **Precipitation or transformation** is what is left.
**Choice.** A **low-alloy quenched-and-tempered martensitic steel**, $4130$ or $34CrNiMo6$, tempered at $600\ {}^{\circ}\mathrm{C}$ to $750\ \mathrm{MPa}$: the strength comes from a tempered carbide dispersion plus a sub-micron lath substructure, and the $600\ {}^{\circ}\mathrm{C}$ temper means $200\ {}^{\circ}\mathrm{C}$ service cannot over-age it.
**The section, and the trap.** A $60\ \mathrm{mm}$ bar quenched to a $25\ \mathrm{mm}$ finished size is a **hardenability** problem, not a strength problem. At $25\ \mathrm{mm}$ equivalent diameter, a plain $1045$ bar reaches only $50\ \%$ martensite at the centre and its centre yield is $350\ \mathrm{MPa}$; a $4130$ reaches $95\ \%$ and its centre yield is $700\ \mathrm{MPa}$. The specification must therefore quote the **ideal critical diameter** $D_I$ and the end-quench curve, not only the chemistry.
**The weld.** A $700\ \mathrm{MPa}$ quenched-and-tempered steel has a carbon equivalent near $0.6$, cold-cracks on welding, and its heat-affected zone tempers back to $400\ \mathrm{MPa}$. The specification must state a preheat of $150\ {}^{\circ}\mathrm{C}$, a low-hydrogen electrode, a post-weld temper at $600\ {}^{\circ}\mathrm{C}$ — which drops the whole shaft back to the temper strength and is why the shaft is specified at $700\ \mathrm{MPa}$ **after** the final temper — and a hardness limit of $350\ \mathrm{HV}$ in the weld.

*Design comment.* The requirement "yield at $700\ \mathrm{MPa}$" is met by a dozen materials and the requirement "welded at both ends and still $700\ \mathrm{MPa}$ at the weld" is met by two or three, and the second is the specification. The general rule is that **a strength requirement stated without a thermal cycle is not a requirement**, and the general failure of a design review is that the strength is quoted for the mill condition and the part is used in the welded condition.
:::
:::

::: history
The dislocation was inferred, not seen. **E. G. Taylor** proposed it in 1934 to explain why a worked metal's flow stress was so much higher than a perfect crystal's and so much lower than the theoretical one, computing the stress field of an edge dislocation and predicting the stored energy of cold work, which **G. I. Taylor and C. F. Elam** measured a year later from the specific heat of drawn wire and found within ten per cent. **Polanyi** and **Orowan** proposed the same line independently in the same year, and **Orowan, Atkinson, East and Teague** photographed slip lines in zinc in 1943 and showed they were one atomic spacing high, which was the direct evidence. **Burgers**' vector and **Peierls**' lattice-friction calculation of 1940 and **Nabarro**'s 1947 reformulation gave the theory its quantitative form; **Frank** and **Read**'s 1950 paper on the multiplication source was Read's undergraduate project, supervised by Frank, who was twenty-nine. **Taylor hardening** is **G. I. Taylor**'s 1934 result; the **Hall-Petch** relation is **E. O. Hall**'s 1951 note on the yield strength of polycrystalline metals and **N. J. Petch**'s 1953 paper on the cleavage strength of notched mild steel, published independently and within two years. The universal Stage II rate is **V. N. Gridnev** and **V. N. Boiko**'s 1960s work on Soviet iron crystals and **H. Mecking** and **U. F. Kocks**'s 1981 synthesis. **Orowan**'s bowing mechanism was published in 1948 in a discussion remark that was not written down until 1957, and **Guinier** and **Preston**'s 1938-1940 discovery of the clusters that bear their names, made by X-ray diffuse scattering in the middle of the Second World War, is the origin of precipitation hardening and of the entire age-hardening industry.
:::

## Where this leads

The dislocation's climb and cross-slip are the diffusional machinery of [[materials-science/defects-diffusion]] and the mechanism of the creep of [[materials-science/failure]], the precipitate of Example 2 is a point on the iron-carbon and aluminium-copper diagrams of [[materials-science/phase-diagrams]] and a nucleation-and-growth problem of [[materials-science/phase-transformations]], and the texture that makes a sheet's $r$-value is the crystallography of [[materials-science/bonding-structure]] acted on by a rolling mill.

::: summary
- A dislocation moves at a stress set by the balance $\tau b = T / R$, which generates the Frank-Read source, the Orowan bowing stress and the grain-boundary barrier as one equation with different lengths.
- The Peierls stress depends exponentially on the core width, which is why $\tau_{P} / G$ spans a million-fold range and why metals bend and ceramics shatter.
- Taylor hardening $\sigma = \sigma_{0} + \alpha G b \sqrt{\rho}$ accounts for the whole strength range of a single metal by one parameter.
- Solid solution strengthens as $c^{2 / 3}$ and costs conductivity; precipitation strengthens to a maximum at a critical radius of a few nanometres and then over-ages.
- Grain boundaries strengthen as $d^{- 1 / 2}$, are the only mechanism that improves toughness at the same time, and reverse below $15\ \mathrm{nm}$.
- Stage II hardening at $G / 600$ is universal; Stage III recovery is why hot working does not harden.
:::

::: quiz
A precipitation-hardened alloy is over-aged well past its peak. Which statement is correct?
- [x] The precipitates have grown, their spacing has increased, and dislocations now bow between them instead of cutting them
- [ ] The precipitates have dissolved back into the matrix
- [ ] The precipitates have shrunk, so they are easier to cut
- [ ] The matrix has recrystallised
::: solution
Over-aging coarsens the precipitates at roughly constant volume fraction, so the inter-particle spacing grows and the Orowan stress falls as $1 / \lambda$. The precipitates do not dissolve — the equilibrium volume fraction at the aging temperature is set by the solvus — and recrystallisation is a recovery phenomenon that requires stored cold work, which an aged alloy does not have.
:::
:::

## Exercises

::: exercise Character {level=1 check="1"}
How many of the components of a dislocation's Burgers vector are perpendicular to its line for a pure screw dislocation?
::: solution
One — none; the Burgers vector is parallel to the line.
:::
:::

::: exercise Density {level=1 check="100"}
By what factor does Taylor hardening increase when the dislocation density rises by four orders of magnitude?
::: solution
One hundred — the strength goes as the square root of the density.
:::
:::

::: exercise Stage II {level=1 check="600"}
The Stage II hardening rate of a crystal is $G$ divided by what number?
::: solution
About $600$.
:::
:::

::: exercise Hall-Petch {level=1 check="4"}
By what factor does the Hall-Petch increment change when the grain size is reduced by a factor of sixteen?
::: solution
Four.
:::
:::

::: exercise Mechanism {level=1 check="2"}
Below what fraction of a micrometre does the Hall-Petch relation reverse in nanocrystalline metals?
::: solution
About $0.015\ \mu\mathrm{m}$, fifteen nanometres.
:::
:::

::: exercise Frank-Read {level=2}
Give the stress to operate a Frank-Read source of length $0.5\ \mu\mathrm{m}$ in iron, and the corresponding yield strength.
::: solution
$$
\tau = \frac{G b}{L} = \frac{80 \times 10^{9} \times 0.25 \times 10^{- 9}}{5 \times 10^{- 7}} = 40\ \mathrm{MPa},
\qquad
\sigma_{y} = M \tau = 3.06 \times 40 = 122\ \mathrm{MPa} .
$$
*Sanity.* That is close to the yield strength of pure annealed iron, and the sources in it are indeed half a micrometre long. It also explains why a grain smaller than the source cannot work: at a $0.1\ \mu\mathrm{m}$ grain the same expression gives $610\ \mathrm{MPa}$, and the material is then limited by nucleating dislocations rather than by moving them.
:::
:::

::: exercise Interstitials {level=2}
$0.05\ \%$ carbon is dissolved in $\alpha$-iron. Estimate the yield strength increment if the interstitial strengthening is $1.2\ \mathrm{GPa}$ per weight per cent of carbon.
::: solution
$60\ \mathrm{MPa}$, on a base of $130\ \mathrm{MPa}$, giving $190\ \mathrm{MPa}$.
*Sanity.* That is the whole of the difference between rimmed killed low-carbon sheet steel and rimmed low-carbon sheet steel, and it is why a **bake-hardening** steel — which holds $40\ \mathrm{ppm}$ of carbon in solution and is supplied soft for forming — gains $30\ \mathrm{MPa}$ in the stoving bake at $170\ {}^{\circ}\mathrm{C}$ that precipitates the carbon as epsilon-carbide on dislocations. The same carbon that gives the strength also gives the yield-point elongation and the stretcher strains, which is why the steel is skin-passed, and why the bake hardening is desirable and the yield point is not.
:::
:::

::: exercise Overaging {level=2}
A peak-aged aluminium alloy is over-aged so that its precipitate radius doubles at constant volume fraction. By what factor does the Orowan strength change?
::: solution
The spacing goes as $r / \sqrt{f}$, so it doubles, and the strength **halves**.
*Sanity.* A real 7075-T6 at $500\ \mathrm{MPa}$ over-aged one hour at $230\ {}^{\circ}\mathrm{C}$ falls to $380\ \mathrm{MPa}$, a factor of $0.76$ rather than $0.5$, because the volume fraction also falls as the matrix continues to supply solute to the growing particles and because the size distribution broadens. The direction is right and the exponent is the useful part: over-aging is a trade of strength for **toughness and stress-corrosion resistance**, and the T73 and T7351 tempers of aerospace 7050 and 7075 are deliberately over-aged for exactly that trade.
:::
:::

::: exercise Derivation {level=3}
Derive the Hall-Petch relation from a pile-up of $n$ dislocations against a grain boundary, and state the two assumptions that the derivation makes and that are known to fail.
::: solution
**The pile-up.** Under a resolved shear stress $\tau$, a dislocation source in a grain of diameter $d$ operates and pushes dislocations against the boundary. The back-stress from $n$ dislocations at the head of a pile-up of length $d$ cancels the applied stress when
$$
n \tau \approx \frac{n G b}{2 \pi \left( 1 - \nu \right) d} \quad\text{(self-equilibrium)}
\quad\Longrightarrow\quad
n = \frac{2 \pi \left( 1 - \nu \right) \tau d}{G b} .
$$
**The transmission criterion.** Slip fires in the next grain when the stress concentration at the head reaches a critical value $\tau_{0}$ needed to move a dislocation across the boundary or to operate a source there:
$$
n \tau = \tau_{0}
\quad\Longrightarrow\quad
\frac{2 \pi \left( 1 - \nu \right) \tau^{2} d}{G b} = \tau_{0}
\quad\Longrightarrow\quad
\tau = \left( \frac{\tau_{0} G b}{2 \pi \left( 1 - \nu \right)} \right)^{1 / 2} d^{- 1 / 2} .
$$
Multiplying by the Taylor factor $M$ and adding the lattice friction $\sigma_{0}$,
$$
\boxed{ \sigma_{y} = \sigma_{0} + \left( \frac{m M^{3} \tau_{0} G b}{2 \pi \left( 1 - \nu \right)} \right)^{1 / 2} \frac{1}{\sqrt{d}} } ,
$$
which is the Hall-Petch form with $k_y$ containing $G$, $b$ and the boundary strength. $\checkmark$
**The two assumptions that fail.** First, that a **pile-up** forms: in a real material with a forest, a pile-up of more than three or four dislocations is unstable to cross-slip or to emission from the boundary, and electron microscopy of fine-grained material sees one or two dislocations, not fifty. Second, that the boundary is an **absolute barrier**: in fact a boundary can absorb a dislocation, emit one, or transmit one onto a new system at a stress that depends on the misorientation, and grain-boundary character, not grain size, controls the stress in a textured or columnar material.
*Sanity.* Despite both failures the $d^{- 1 / 2}$ law holds empirically over five decades of grain size, because the alternative mechanisms — the back-stress of a geometrically necessary dislocation zone of size $d$, and the source-size limitation of a grain that contains no Frank-Read source — give the same exponent for independent reasons. A relation that survives three wrong derivations is usually telling you something about a length scale rather than about a mechanism.
:::
:::

::: exercise Design {level=3}
A copper busbar must carry current with the minimum $I^{2} R$ loss while supporting its own weight against sag over a $2\ \mathrm{m}$ span at $100\ {}^{\circ}\mathrm{C}$. Select the condition of the copper and justify it against the alternatives.
::: solution
**The conflict.** The conductivity and the strength are opposed: cold work raises the yield from $60$ to $400\ \mathrm{MPa}$ and drops the conductivity by two to three per cent, because dislocations scatter electrons; solute strengthening drops it by tens of per cent, because solute atoms scatter electrons far more strongly than dislocations do.
**The requirement.** A busbar of $2\ \mathrm{m}$ span carrying its own weight needs a design stress of only about $20\ \mathrm{MPa}$ at $100\ {}^{\circ}\mathrm{C}$, so **the strength requirement is trivial** and the conductivity requirement is everything.
**Choice.** **Annealed high-conductivity copper** (C11000, $99.9\ \%$ O$_2$-free electronic grade C10200 where hydrogen is a hazard), at $101\ \%$ IACS and $60\ \mathrm{MPa}$, which is more than enough.
**The trap.** Annealed copper **creeps** at $100\ {}^{\circ}\mathrm{C}$ under a $20\ \mathrm{MPa}$ stress at a strain rate of $10^{- 9}\ \mathrm{s^{- 1}}$, which is $3\ \%$ per year, and the busbar sags into the next phase. So the answer is not the softest copper but the **least work that will not creep**: a lightly cold-worked, stress-relieved copper — $90\ \%$ cold worked then annealed at a temperature that recovers the dislocations without recrystallising, giving $250\ \mathrm{MPa}$ and $97\ \%$ IACS — or a **cadmium-copper** or **chromium-zirconium-copper** alloy at $80$ to $90\ \%$ IACS and $400\ \mathrm{MPa}$, which is the standard for a trolley wire.
**The rule.** Precipitation hardening costs less conductivity than solid solution for the same strength, because the solute is tied up in particles and the matrix is nearly pure copper. This is why every high-conductivity high-strength copper alloy — $\mathrm{Cu - Be}$, $\mathrm{Cu - Cr}$, $\mathrm{Cu - NiSi}$, $\mathrm{Cu - Ti}$ — is precipitation-hardened and none is solid-solution-strengthened.

*Sanity.* The numbers are the reason a printed circuit board's copper is rolled and annealed rather than alloyed, why a connector spring is beryllium copper at $1{,}200\ \mathrm{MPa}$ and $22\ \%$ IACS and nobody cares about the conductivity there, and why the fusion-research community's copper-alloy first wall — $\mathrm{CuCrZr}$ and the oxide-dispersion-strengthened $\mathrm{Cu - Al_2 O_3}$ alloys GlidCop and $\mathrm{Cu - Al_2 O_3}$-Cu — is an exercise in buying back the two per cent of conductivity that every strengthening mechanism takes away. Oxide dispersion strengthening is the extreme case: an insulating oxide at $0.1\ \%$ that pins the dislocations and blocks recrystallisation at $900\ {}^{\circ}\mathrm{C}$, at a conductivity cost of one per cent, because the oxide takes the solute out of solution.
:::
:::
