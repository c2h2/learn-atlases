A cubic centimetre of heavily cold-worked iron, with a dislocation density of $10^{16}\ \mathrm{m^{- 2}}$, contains $10^{16} \times 10^{- 6} = 10^{10}\ \mathrm{m}$ — ten million kilometres, some twenty-six times the distance to the Moon — of dislocation line, in a specimen you could hold between two fingers; even annealed it holds about a thousand kilometres. That absurd number is the reason metals are useful, because a dislocation is a line defect that moves at a stress a thousand times below the one needed to slide a perfect crystal, and every one of the strengthening mechanisms in this lesson is a way of making it harder to move.

The intellectual architecture is unusually compact. One equation, the balance between the applied force on a dislocation and the line tension of its own curvature, generates the Frank-Read source, the Orowan bowing stress, the grain-boundary barrier and the forest hardening law. One parameter, the dislocation density, explains the entire range of yield strengths of a single metal from $35$ to $700\ \mathrm{MPa}$. And one nearly universal number, the Stage II hardening rate of about $G / 300$ in face-centred cubic crystals, is almost independent of the metal and of the temperature.

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
An edge dislocation has an extra half-plane, a long-range **dilational** stress field, and climbs by diffusion; a screw has a pure **shear** field, no dilational field, cannot climb, and cross-slips onto any plane containing its line. The slip direction is always the close-packed direction and the slip plane the close-packed plane, because those have the widest spacing and therefore the lowest Peierls stress: $\left\langle 111\right\rangle \left\{ 110\right\}$ for BCC iron (with $\left\{ 112\right\}$ and $\left\{ 123\right\}$ planes as well, up to $48$ systems), $\left\langle 110\right\rangle \left\{ 111\right\}$ for FCC with $12$, $\left\langle 11\bar 2 0\right\rangle \left\{ 0001\right\}$ basal for HCP magnesium with $3$, which is why magnesium is hard to form at room temperature, while titanium, which slips readily on prismatic planes and also has pyramidal $\left\langle c + a\right\rangle$ systems, is considerably more formable.
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
where $a$ is the interplanar spacing — $82 / 2 \pi = 13\ \mathrm{GPa}$ for iron. The measured critical resolved shear stress of high-purity iron at room temperature is $20$ to $50\ \mathrm{MPa}$, a factor of **three hundred to six hundred** lower, and of annealed copper $0.6\ \mathrm{MPa}$, a factor of **twelve thousand** lower.
**The mechanism.** A dislocation moves by breaking bonds only along its line, one atomic spacing at a time, and the stress needed is set by the **Peierls-Nabarro** lattice-friction force,
$$
\tau_{P} = \frac{2 G}{1 - \nu} \exp \left( - \frac{2 \pi w}{b} \right),
\qquad
w = \frac{d}{1 - \nu} ,
$$
where $d$ is the spacing of the slip planes and $w$ the **width of the dislocation core** — the distance over which the displacement across the slip plane changes from zero to $b$. The exponential is everything: with $\nu = 0.3$, a core three Burgers vectors wide gives $\tau_{P} / G = 2.9 \times \mathrm{e}^{- 6 \pi} = 2 \times 10^{- 8}$, a core one Burgers vector wide gives $2.9 \times \mathrm{e}^{- 2 \pi} = 5 \times 10^{- 3}$ — a factor of over $10^{5}$, which is the difference between a metal that bends and a ceramic that shatters.
**The measured range.** Lattice friction is negligible in the close-packed FCC metals, whose wide, planar cores glide at very low stresses; it is significant in BCC metals at low temperature, where the compact screw-dislocation core makes the yield stress rise steeply on cooling; and in covalent crystals such as silicon and germanium, with narrow cores and directional bonds, it is so high that they are brittle at room temperature and deform plastically only when hot. The Peierls–Nabarro formula, which assumes a sinusoidal misfit potential, is quantitatively crude, but it explains this enormous range by one exponential. $\checkmark$
:::

::: definition Dislocation density and Taylor hardening {#def-taylor}
The **dislocation density** $\rho$ is the total line length per unit volume, measured by etch pitting, by transmission electron microscopy of a thin foil, or by the flow stress itself:
$$
\begin{array}{l c l}
\text{Perfect whisker, annealed silicon} & 10^{4} \text{ to } 10^{8}\ \mathrm{m^{- 2}} & \text{whisker strength} \approx G / 30 \\
\text{Annealed metal} & 10^{10} \text{ to } 10^{12}\ \mathrm{m^{- 2}} & \text{soft, formable} \\
\text{Lightly worked} & 10^{14}\ \mathrm{m^{- 2}} & \\
\text{Severely cold-worked} & 10^{16} \text{ to } 10^{17}\ \mathrm{m^{- 2}} & \text{the practical ceiling}
\end{array}
$$
Dislocations repel each other elastically at $G b^{2} / (2 \pi r)$, so a forest of density $\rho$ presents obstacles at a mean spacing $\lambda \approx \rho^{- 1 / 2}$ and the stress to bow a gliding dislocation between them is, by the fundamental equation,
$$
\boxed{ \sigma_{y} = \sigma_{0} + \alpha G b \sqrt{\rho} }
$$
with $\alpha$ an empirical constant; fitted to the tensile flow stress of polycrystals (it then absorbs the Taylor factor) it typically lies between about $0.3$ and $1$, and this lesson uses the conservative $\alpha = 0.3$. For iron, with $G = 82\ \mathrm{GPa}$ and $b = 0.248\ \mathrm{nm}$, $\alpha G b = 0.3 \times 82 \times 10^{9} \times 0.248 \times 10^{- 9} = 6.1\ \mathrm{N / m}$, so $\rho = 10^{12}$ adds $6\ \mathrm{MPa}$, $10^{14}$ adds $61\ \mathrm{MPa}$ and $10^{16}$ adds $610\ \mathrm{MPa}$ — and the whole range from annealed to drawn iron wire is accounted for by one parameter.
:::

::: widget plot
f: 30 + 6.1*x/1e6; 30
x: 0, 1e8
y: 20, 700
labels: iron; annealed base
caption: Yield strength of iron against the square root of the dislocation density, the Taylor relation $\sigma = 30 + 6.1 \sqrt{\rho}$. The horizontal line is the annealed base. Four orders of magnitude of density — from $10^{12}$ to $10^{16}\ \mathrm{m^{-2}}$ — raise the strength only from $36$ to $640\ \mathrm{MPa}$, because the strength goes as the square root of the density; this is why the industry adds solutes, precipitates and grain boundaries on top of work hardening.
:::

## The four mechanisms

::: definition Solid-solution strengthening {#def-solution}
A solute atom differs from the host in size and in modulus, so it interacts with a dislocation's stress field and is drawn to or repelled from it. The **size misfit** $\delta = \left( 1 / a \right) \mathrm{d} a / \mathrm{d} c$ and the **modulus misfit** $\eta = \left( 1 / G \right) \mathrm{d} G / \mathrm{d} c$ combine into a single misfit parameter $\varepsilon_L$, and Labusch's statistical theory of a dislocation moving through a random array of weak obstacles gives
$$
\Delta \tau \propto G\, \varepsilon_L^{4 / 3} c^{2 / 3} ,
$$
with the $c^{2 / 3}$ exponent from the statistics of the random array (Fleischer's earlier theory gave $c^{1 / 2}$). Substitutional solid solution in copper-nickel, aluminium-magnesium and titanium-aluminium-vanadium follows it; **interstitial** solution in iron is far stronger per atom because carbon and nitrogen distort their octahedral sites tetragonally and interact with both edge and screw dislocations: in ferrite they add of order $1\ \mathrm{GPa}$ or more per weight per cent, against a few tens of megapascals per weight per cent for substitutional manganese or silicon. But the solubility of carbon in ferrite at room temperature is only a few thousandths of a per cent, so the direct solution-strengthening effect in a real steel is tens of megapascals at most.
**The cost.** Every solid solution scatters electrons, so a copper alloy that is strong by solution is a poor conductor; and every solute diffuses, so a solid solution softens and a precipitation-hardened alloy over-ages.
:::

::: definition Precipitation and Orowan bowing {#def-precip}
A second phase blocks a dislocation absolutely, and there are two ways round it. If the particle is **shearable** — coherent, small, cuttable — the dislocation cuts it and pays the particle's internal energy, giving a strength that **rises** with the particle radius, roughly as $\left( f r \right)^{1 / 2}$ for coherency, modulus and order strengthening. If it is **unshearable**, the dislocation bows between particles and leaves an Orowan loop, giving a strength that **falls** with the inter-particle spacing as $1 / \lambda$, and since spherical particles of radius $r$ at volume fraction $f$ are spaced in a slip plane at $\lambda \approx r \sqrt{2 \pi / \left( 3 f \right)}$,
$$
\Delta \sigma_{\mathrm{Orowan}} \approx \frac{0.8\, M\, G\, b}{2 \pi \left( 1 - \nu \right)^{1 / 2}} \frac{1}{\lambda} \propto \frac{f^{1 / 2}}{r} .
$$
The two curves cross at a **critical radius** of $1$ to $5\ \mathrm{nm}$, and the peak-aged condition is exactly the aging treatment that puts the precipitate population at that radius. This is the whole of precipitation hardening: a strength peak that is a maximum in a size distribution, and an over-aged alloy is one whose precipitates have grown past it.
:::

::: definition Grain boundaries and the Hall-Petch relation {#def-hallpetch}
$$
\sigma_{y} = \sigma_{0} + \frac{k_y}{\sqrt{d}}
$$
with $k_y$ of roughly $0.04$ to $0.2\ \mathrm{MPa\, m^{1 / 2}}$ for FCC metals such as aluminium, copper and nickel and $0.6$ to $0.8\ \mathrm{MPa\, m^{1 / 2}}$ for ferritic steels. The mechanism is a **pile-up**: $n$ dislocations of one slip system press against a boundary under a stress $\tau$ and concentrate at the head a stress $n \tau$, so a slip source in the next grain fires when
$$
n \tau \approx \tau_{0} , \qquad n = \frac{\tau d}{\alpha G b}
\quad\Longrightarrow\quad
\tau = \tau_{0}^{1 / 2} \left( \frac{\alpha G b}{d} \right)^{1 / 2} ,
$$
which is the Hall-Petch form with $k_y \propto \left( \tau_{0} \alpha G b \right)^{1 / 2}$. Modern simulations put the mechanism less in pile-ups, which are short in real materials, than in the **back-stress** a boundary builds up as geometrically necessary dislocations accumulate beneath it, but the $d^{- 1 / 2}$ law survives empirically down to grain sizes of a few tens of nanometres.
**Below roughly $10$ to $20\ \mathrm{nm}$ the relation can reverse**, as deformation shifts from dislocation glide inside grains to processes at the boundaries — sliding and rotation **of** the grains — and the material softens. This **inverse Hall-Petch effect** has been reported in several nanocrystalline metals, although where exactly it begins, and how much of it is due to processing artefacts such as porosity, is still debated.
:::

::: definition Work hardening and the universal Stage II rate {#def-workhard}
A face-centred cubic single crystal oriented for single slip deforms in three stages. **Stage I**, easy glide, at a hardening rate of order $G / 10^{4}$ as dislocations on one system sweep out to the surface. **Stage II**, linear hardening, at
$$
\theta_{\mathrm{II}} = \frac{\mathrm{d} \tau}{\mathrm{d} \gamma} \approx \frac{G}{300} \quad \left( \theta_{\mathrm{II}} / G \approx 3 \times 10^{- 3} \right)
$$
in resolved shear stress and shear strain — roughly the same fraction of $G$ for copper, nickel, silver, aluminium and their solid solutions, and nearly independent of temperature. **Stage III**, parabolic recovery, in which dislocations **cross-slip** out of their planes because the stress is high enough to make the activation enthalpy small, and the density saturates.
Stage II is the forest: a dislocation on one plane must cut through the forest of dislocations on intersecting planes, creating jogs and leaving debris, and the rate at which it does so is set by the geometry of the forest, not by the metal. Stage III is the reason a metal's strength depends on the **temperature** at which it is deformed and not only on its purity, and the reason hot working at $T > 0.5\ T_m$ hardens little, the stored dislocations being removed by dynamic recovery and recrystallisation as fast as they are made.
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
**Precipitation (Orowan).** With $\lambda = r \sqrt{2 \pi / \left( 3 f \right)}$ and $\sqrt{1 - \nu} = 0.85$,
$$
\lambda = 5 \times 10^{- 9} \sqrt{\frac{2 \pi}{0.003}} = 2.29 \times 10^{- 7}\ \mathrm{m}, \qquad
\Delta \sigma_{p} = \frac{0.8 \times 3.06 \times 80 \times 10^{9} \times 0.25 \times 10^{- 9}}{2 \pi \times 0.85 \times 2.29 \times 10^{- 7}} = 40\ \mathrm{MPa} .
$$
**Solid solution.** $0.04\ \%$ V is $4.4 \times 10^{- 4}$ atomic, and vanadium strengthens ferrite at about $40\ \mathrm{MPa}$ per atomic per cent, giving $\Delta \sigma_{s} = 1.8\ \mathrm{MPa}$ — negligible, and the reason a microalloying addition is made for its precipitate and its boundary pinning rather than for its solution.
**Sum.** Adding the contributions linearly is the usual first approximation (some models add the forest and particle terms in quadrature instead):
$$
\sigma_{y} = 80 + 134 + 265 + 40 + 2 = 521\ \mathrm{MPa} .
$$
**Ranking.** Of the $441\ \mathrm{MPa}$ increment, grain refinement is $60\ \%$, dislocations $30\ \%$, precipitation $9\ \%$ and solution $0.5\ \%$.

*Check.* The result lies in the range typical of high-strength low-alloy (HSLA) structural steels, roughly $350$ to $550\ \mathrm{MPa}$, and the grain-size term alone, $265\ \mathrm{MPa}$, is the largest contribution, as it is in such steels. $\checkmark$

*Sanity.* The result is the physical metallurgy of a modern HSLA steel in outline: **grain refinement does most of the work**. In practice the grain refinement comes from controlled rolling, with niobium (and titanium) precipitates pinning the austenite grain boundaries so that the ferrite forms fine; vanadium is used mainly for precipitation strengthening, and with finer particles or a larger volume fraction than assumed here it can contribute $100\ \mathrm{MPa}$ or more. Grain refinement is also the one mechanism that lowers the ductile-to-brittle transition temperature while it raises the strength, which is why it is the first one an alloy designer reaches for.
:::
:::

::: example Peak aging {#ex-peak}
In an aged aluminium-copper alloy the precipitates reach a volume fraction $f = 0.02$ early in ageing and then coarsen at constant $f$. While they are small, dislocations cut them, and measurements on under-aged material fit $\Delta \sigma_{\mathrm{cut}} = K \sqrt{r}$ with $K = 160\ \mathrm{MPa\, nm^{- 1 / 2}}$. Treating the precipitates as spheres of radius $r$ and taking $G = 26\ \mathrm{GPa}$, $b = 0.286\ \mathrm{nm}$, $\nu = 0.33$, $M = 3.06$, find the radius at which cutting gives way to bowing and the corresponding peak strength increment.
::: solution
**Bowing.** With $\lambda = r \sqrt{2 \pi / \left( 3 f \right)} = r \sqrt{2 \pi / 0.06} = 10.2\, r$,
$$
\Delta \sigma_{\mathrm{Orowan}} = \frac{0.8 M G b}{2 \pi \left( 1 - \nu \right)^{1 / 2} \lambda}
= \frac{0.8 \times 3.06 \times 26 \times 10^{9} \times 0.286 \times 10^{- 9}}{2 \pi \times 0.819 \times 10.2\, r}
= \frac{0.346\ \mathrm{N / m}}{r} ,
$$
which with $r$ in nanometres is $\Delta \sigma_{\mathrm{Orowan}} = 346 / r\ \mathrm{MPa}$.
**The crossing.** Dislocations take whichever path needs the lower stress, so the alloy's increment is the lower of the two curves, and the peak is where they cross:
$$
160 \sqrt{r^{*}} = \frac{346}{r^{*}}
\quad\Longrightarrow\quad
r^{*} = \left( \frac{346}{160} \right)^{2 / 3} = 1.67\ \mathrm{nm}, \qquad
\Delta \sigma_{\max} = 160 \sqrt{1.67} = 207\ \mathrm{MPa} .
$$
**Over-ageing.** At $r = 3\ \mathrm{nm}$ cutting would need $160 \sqrt{3} = 277\ \mathrm{MPa}$ but bowing only $346 / 3 = 115\ \mathrm{MPa}$, so the particles are bypassed and the increment has fallen to $115\ \mathrm{MPa}$; at $r = 1\ \mathrm{nm}$ cutting needs only $160\ \mathrm{MPa}$, less than the $346\ \mathrm{MPa}$ of bowing, so the alloy is under-aged.

*Check.* At $r^{*}$ both expressions give $207\ \mathrm{MPa}$: $346 / 1.67 = 207$ $\checkmark$. A peak at a radius of one or two nanometres is consistent with the small, closely spaced precipitates found in peak-aged aluminium-copper alloys.

*Sanity.* As the precipitates form and grow, solute leaves the matrix, and since solute atoms scatter conduction electrons far more strongly than a sparse array of larger particles does, the electrical conductivity of a heat-treatable aluminium alloy rises with ageing. The aerospace industry uses this: eddy-current conductivity measurements are a standard non-destructive check on the temper of 7000-series parts, the over-aged T73 temper being markedly more conductive than T6.
:::
:::

::: example Grain refinement to the limit {#ex-nanograin}
Electrodeposited nickel is made with grain sizes down to $20\ \mathrm{nm}$ and below. With $\sigma_{0} = 60\ \mathrm{MPa}$ and $k_y = 0.16\ \mathrm{MPa\, m^{1 / 2}}$, extrapolate the Hall-Petch line from $100$ to $5\ \mathrm{nm}$ and compare with the theoretical shear strength.
::: solution
$$
\begin{array}{c c}
d\ \left[ \mathrm{nm} \right] & \sigma_{y}\ \left[ \mathrm{MPa} \right] \\
100 & 566 \\
50 & 776 \\
20 & 1191 \\
10 & 1660 \\
5 & 2323
\end{array}
$$
against a coarse-grained value of about $80\ \mathrm{MPa}$ and a theoretical shear strength of $G / 2 \pi = 76 / 2 \pi = 12\ \mathrm{GPa}$.
**The observation.** Measured strengths of nanocrystalline nickel at a few tens of nanometres are of the order of a gigapascal, broadly in line with the extrapolation, but the rise does not continue indefinitely: at the finest grain sizes the strength levels off and may fall, so the extrapolation to $5\ \mathrm{nm}$ should not be trusted.
**Why.** A Frank-Read source of length $L$ operates at $G b / L$, which for $L = 10\ \mathrm{nm}$ in nickel is $76 \times 10^{9} \times 0.25 \times 10^{- 9} / 10^{- 8} = 1.9\ \mathrm{GPa}$; grains a few tens of nanometres across cannot hold useful sources, so dislocations are nucleated at the grain boundaries and cross the grain without being stored. The material is **source-limited** rather than obstacle-limited, its strain-rate sensitivity rises by about an order of magnitude, and its work-hardening capacity largely vanishes because there is no volume in which to store a forest. At the finest sizes boundary sliding and grain rotation take over.

*Check.* $\sigma_{y} \left( 20\ \mathrm{nm} \right) = 60 + 0.16 / \sqrt{2 \times 10^{- 8}} = 60 + 1131 = 1191\ \mathrm{MPa}$, and at $100\ \mu\mathrm{m}$ the same law gives $60 + 16 = 76\ \mathrm{MPa}$, about the coarse-grained value: four decades of grain size, a factor of sixteen in strength. Even the extrapolated $2.3\ \mathrm{GPa}$ at $5\ \mathrm{nm}$ is a fifth of the theoretical shear strength, so the theoretical limit is not what stops the line. $\checkmark$

*Sanity.* The engineering lesson is that **grain refinement is the only strengthening mechanism that raises strength and toughness together**, because a fine grain both stops the dislocation and stops the crack — the cleavage fracture stress of a ferrite goes as $d^{- 1 / 2}$ for the same reason the yield does, which is why a fine-grained pressure-vessel steel has both a higher yield and a lower ductile-to-brittle transition temperature. It is also the only mechanism that is **not thermally stable**, since grain growth is diffusion-controlled and a $20\ \mathrm{nm}$ grain size means a boundary area of order $10^{8}\ \mathrm{m^{2} / m^{3}}$, which at a boundary energy of about $0.6\ \mathrm{J / m^{2}}$ is a stored energy of some $60\ \mathrm{MJ / m^{3}}$ waiting to be released.
:::
:::

::: example Design {#ex-design-strength}
Select the strengthening mechanism for a $25\ \mathrm{mm}$-diameter shaft that must yield at $700\ \mathrm{MPa}$, be weldable at both ends, survive $200\ {}^{\circ}\mathrm{C}$ continuous service, and be made from a $60\ \mathrm{mm}$-diameter forged bar.
::: solution
**Screen the mechanisms against the requirements.**
- **Cold work** is excluded: drawing $60\ \mathrm{mm}$ down to $25\ \mathrm{mm}$ is a reduction of area of $1 - \left( 25 / 60 \right)^{2} = 83\ \%$, far more than a forged bar can take in one go, and any cold work is lost at the weld and anneals out at $200\ {}^{\circ}\mathrm{C}$ over years of service.
- **Grain refinement** alone cannot reach $700\ \mathrm{MPa}$ here: with $\sigma_0 = 80\ \mathrm{MPa}$ and $k_y = 0.75\ \mathrm{MPa\, m^{1/2}}$ it needs $d = \left( 0.75 / 620 \right)^{2}\ \mathrm{m} = 1.5\ \mu\mathrm{m}$ ferrite, which cannot be produced through the section of a forged bar.
- **Solid solution** to $700\ \mathrm{MPa}$ needs so much substitutional solute that the weldability and the toughness both fail.
- **Precipitation or transformation** is what is left.
**Choice.** A **low-alloy quenched-and-tempered martensitic steel**, such as $4140$ or 34CrNiMo6, tempered at about $600\ {}^{\circ}\mathrm{C}$ to a yield strength of about $750\ \mathrm{MPa}$: the strength comes from a tempered carbide dispersion plus a sub-micron lath substructure, and the $600\ {}^{\circ}\mathrm{C}$ temper means $200\ {}^{\circ}\mathrm{C}$ service cannot over-age it.
**The section, and the trap.** Whether the centre of the section reaches the strength is a **hardenability** problem, not a strength problem: a plain-carbon $1045$ bar does not harden through even a $25\ \mathrm{mm}$ section in an oil quench, whereas Cr–Mo and Ni–Cr–Mo steels such as $4140$ and 34CrNiMo6 do, which is what their alloying is for. The specification must therefore quote the **ideal critical diameter** $D_I$ and the end-quench curve, not only the chemistry.
**The weld.** A medium-carbon quenched-and-tempered steel has a carbon equivalent of $0.6$ or more and is prone to hydrogen cold cracking; its heat-affected zone contains both a hard, crack-prone zone and an over-tempered soft zone. The specification must state a preheat, a low-hydrogen process, a post-weld temper at or slightly below the original tempering temperature — so that the whole shaft ends at the temper strength, and is specified at $700\ \mathrm{MPa}$ **after** that final heat treatment — and a hardness limit of $350\ \mathrm{HV}$ in the weld.

*Design comment.* The requirement "yield at $700\ \mathrm{MPa}$" is met by a dozen materials and the requirement "welded at both ends and still $700\ \mathrm{MPa}$ at the weld" is met by two or three, and the second is the specification. The general rule is that **a strength requirement stated without a thermal cycle is not a requirement**, and the general failure of a design review is that the strength is quoted for the mill condition and the part is used in the welded condition.
:::
:::

::: history
The dislocation was inferred long before it was seen. In 1934 **G. I. Taylor**, **Egon Orowan** and **Michael Polanyi** independently proposed the edge dislocation to explain why real crystals yield at a tiny fraction of their theoretical shear strength, and Taylor's paper of that year also gave the first theory of work hardening by dislocation interaction. **J. M. Burgers** introduced the screw dislocation and the vector that bears his name in 1939; **Rudolf Peierls** (1940) and **Frank Nabarro** (1947) calculated the lattice friction on a moving dislocation. Precipitation hardening had been discovered empirically by **Alfred Wilm**, whose aluminium-copper-magnesium alloy hardened on standing at room temperature (1906) and became Duralumin; **Paul Merica** and co-workers attributed the effect to precipitation in 1919, and in 1938 **André Guinier** and **George Preston** independently detected, by X-ray diffuse scattering, the solute-rich zones that now carry their names. **Orowan** gave the bowing mechanism of particle strengthening in 1948. **Charles Frank** and **Thornton Read** conceived the dislocation multiplication source independently and published it jointly in 1950. **E. O. Hall** (1951) and **N. J. Petch** (1953) established the inverse-square-root dependence of the yield and cleavage strengths on grain size. Dislocations were first seen directly in the 1950s, decorated by precipitates in silver halide crystals by **J. M. Hedges** and **J. W. Mitchell** (1953) and moving in thin metal foils in the electron microscope by **Peter Hirsch**, **Robert Horne** and **Michael Whelan** in 1956. **H. Mecking** and **U. F. Kocks**'s 1981 paper gave the widely used model of work hardening by dislocation storage and dynamic recovery.
:::

## Where this leads

The dislocation's climb and cross-slip are the diffusional machinery of [[materials-science/defects-diffusion]] and the mechanism of the creep of [[materials-science/failure]], the precipitate of [[#ex-peak]] is a point on the iron-carbon and aluminium-copper diagrams of [[materials-science/phase-diagrams]] and a nucleation-and-growth problem of [[materials-science/phase-transformations]], and the texture that makes a sheet's $r$-value is the crystallography of [[materials-science/bonding-structure]] acted on by a rolling mill.

::: summary
- A dislocation moves at a stress set by the balance $\tau b = T / R$, which generates the Frank-Read source, the Orowan bowing stress and the grain-boundary barrier as one equation with different lengths.
- The Peierls stress depends exponentially on the core width, which is why $\tau_{P} / G$ spans many orders of magnitude and why metals bend and ceramics shatter.
- Taylor hardening $\sigma = \sigma_{0} + \alpha G b \sqrt{\rho}$ accounts for the whole strength range of a single metal by one parameter.
- Solid solution strengthens as $c^{2 / 3}$ and costs conductivity; precipitation strengthens to a maximum at a critical radius of a few nanometres and then over-ages.
- Grain boundaries strengthen as $d^{- 1 / 2}$, are the only mechanism that improves toughness at the same time, and can reverse below roughly $10$ to $20\ \mathrm{nm}$.
- Stage II hardening at about $G / 300$ is nearly universal in FCC crystals; Stage III dynamic recovery is why hot working hardens little.
:::

::: quiz
A precipitation-hardened alloy is over-aged well past its peak. Which statement is correct?
- [x] The precipitates have grown, their spacing has increased, and dislocations now bow between them instead of cutting them
- [ ] The precipitates have dissolved back into the matrix
- [ ] The precipitates have shrunk, so they are easier to cut
- [ ] The matrix has recrystallised
::: solution
Over-aging coarsens the precipitates at roughly constant volume fraction, so the inter-particle spacing grows and the Orowan stress falls as $1 / \lambda$. The precipitates do not dissolve — the equilibrium volume fraction at the aging temperature is set by the solvus — and recrystallisation needs stored cold work as its driving force, which an aged alloy does not have.
:::
:::

## Exercises

::: exercise Character {level=1 check="90"}
What is the angle, in degrees, between the Burgers vector and the line direction of a pure edge dislocation?
::: solution
$90^{\circ}$ — the Burgers vector of an edge dislocation is perpendicular to its line (for a screw it is parallel, $0^{\circ}$).
:::
:::

::: exercise Density {level=1 check="100"}
By what factor does Taylor hardening increase when the dislocation density rises by four orders of magnitude?
::: solution
One hundred — the strength goes as the square root of the density.
:::
:::

::: exercise Stage II {level=1 check="300"}
The Stage II hardening rate $\mathrm{d} \tau / \mathrm{d} \gamma$ of an FCC single crystal is roughly $G$ divided by what number?
::: solution
About $300$.
:::
:::

::: exercise Hall-Petch {level=1 check="4"}
By what factor does the Hall-Petch increment change when the grain size is reduced by a factor of sixteen?
::: solution
Four.
:::
:::

::: exercise Mechanism {level=1 check="15"}
Below roughly what grain size has inverse Hall-Petch softening been reported in nanocrystalline metals? (Enter the grain size in nm, using the middle of the range quoted in this lesson.)
::: solution
About $15\ \mathrm{nm}$ — reports range from roughly $10$ to $20\ \mathrm{nm}$.
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
*Sanity.* That is of the order of the yield strength of pure annealed iron, consistent with source lengths of a fraction of a micrometre. It also explains why a grain smaller than the source cannot work: at a $0.1\ \mu\mathrm{m}$ grain the same expression gives $610\ \mathrm{MPa}$, and the material is then limited by nucleating dislocations rather than by moving them.
:::
:::

::: exercise Interstitials {level=2 check="6"}
A ferritic sheet steel holds $0.005\ \%$ ($50\ \mathrm{ppm}$ by weight) carbon in solid solution. Estimate the yield strength increment if the interstitial strengthening is $1.2\ \mathrm{GPa}$ per weight per cent of carbon. (Enter the increment in MPa.)
::: solution
$1200 \times 0.005 = 6\ \mathrm{MPa}$ — small, because so little carbon can stay in solution in ferrite.
*Sanity.* The same few tens of ppm matter far more once they segregate to dislocations. A **bake-hardening** steel holds a controlled amount of carbon in solution and is supplied soft for forming; in the paint-stoving bake at about $170\ {}^{\circ}\mathrm{C}$ the carbon diffuses to the dislocations introduced by pressing and pins them, raising the yield strength by some tens of megapascals. The same mechanism gives the yield-point elongation and stretcher strains of ordinary low-carbon sheet, which is why that sheet is skin-passed before forming: the pinning is welcome after forming and unwelcome before it.
:::
:::

::: exercise Overaging {level=2 check="0.5"}
A peak-aged aluminium alloy is over-aged so that its precipitate radius doubles at constant volume fraction. By what factor does the Orowan strength change? (Enter the ratio of new to old.)
::: solution
The spacing goes as $r / \sqrt{f}$, so it doubles, and the strength **halves**.
*Sanity.* Real alloys lose less than this simple estimate predicts in the early stages of over-ageing, because the size distribution broadens and part of the strength comes from other sources (solid solution, grain structure), but the direction is right. Over-ageing trades strength for **stress-corrosion resistance and toughness**: the T73 and T7351 tempers of aerospace 7075, for example, are deliberately over-aged for exactly that trade.
:::
:::

::: exercise Derivation {level=3}
Derive the Hall-Petch relation from a pile-up of $n$ dislocations against a grain boundary, and state the two assumptions that the derivation makes and that are known to fail.
::: solution
**The pile-up.** Under a resolved shear stress $\tau$, a dislocation source at the centre of a grain of diameter $d$ operates and pushes edge dislocations against the boundary, forming a pile-up of length $L = d / 2$. The equilibrium of the piled-up dislocations under the applied stress and their mutual repulsion (Eshelby, Frank and Nabarro) gives the number in a pile-up of length $L$ as
$$
n = \frac{\pi \left( 1 - \nu \right) \tau L}{G b} = \frac{\pi \left( 1 - \nu \right) \tau d}{2 G b} ,
$$
and the stress at its head is magnified to $n \tau$.
**The transmission criterion.** Slip fires in the next grain when the stress concentration at the head reaches a critical value $\tau_{0}$ needed to move a dislocation across the boundary or to operate a source there:
$$
n \tau = \tau_{0}
\quad\Longrightarrow\quad
\frac{\pi \left( 1 - \nu \right) \tau^{2} d}{2 G b} = \tau_{0}
\quad\Longrightarrow\quad
\tau = \left( \frac{2 \tau_{0} G b}{\pi \left( 1 - \nu \right)} \right)^{1 / 2} d^{- 1 / 2} .
$$
Multiplying by the Taylor factor $M$ and adding the lattice friction $\sigma_{0}$,
$$
\boxed{ \sigma_{y} = \sigma_{0} + M \left( \frac{2 \tau_{0} G b}{\pi \left( 1 - \nu \right)} \right)^{1 / 2} \frac{1}{\sqrt{d}} } ,
$$
which is the Hall-Petch form with $k_y$ containing $G$, $b$ and the boundary strength. $\checkmark$
**The two assumptions that fail.** First, that a **pile-up** forms: in a real material with a forest, long pile-ups are relieved by cross-slip and by the boundary absorbing dislocations, and electron microscopy of fine-grained material usually shows short pile-ups or none. Second, that the boundary is an **absolute barrier**: in fact a boundary can absorb a dislocation, emit one, or transmit one onto a new system at a stress that depends on the misorientation, and grain-boundary character, not grain size, controls the stress in a textured or columnar material.
*Sanity.* Despite both failures the $d^{- 1 / 2}$ law holds empirically over several decades of grain size, because the alternative mechanisms — the back-stress of a geometrically necessary dislocation zone of size $d$, and the source-size limitation of a grain that contains no Frank-Read source — give the same exponent for independent reasons. A relation that several different derivations reproduce is usually telling you something about a length scale rather than about a particular mechanism.
:::
:::

::: exercise Design {level=3}
A copper busbar must carry current with the minimum $I^{2} R$ loss while supporting its own weight against sag over a $2\ \mathrm{m}$ span at $100\ {}^{\circ}\mathrm{C}$. Select the condition of the copper and justify it against the alternatives.
::: solution
**The conflict.** The conductivity and the strength are opposed: cold work raises the yield from $60$ to $400\ \mathrm{MPa}$ and drops the conductivity by two to three per cent, because dislocations scatter electrons; solute strengthening drops it by tens of per cent, because solute atoms scatter electrons far more strongly than dislocations do.
**The requirement.** A busbar of $2\ \mathrm{m}$ span carrying its own weight sees a bending stress of only a few to a few tens of megapascals at $100\ {}^{\circ}\mathrm{C}$, depending on its section, so **the strength requirement is trivial** and the conductivity requirement is everything.
**Choice.** **Annealed high-conductivity copper** (C11000, $99.9\ \%$ O$_2$-free electronic grade C10200 where hydrogen is a hazard), at $101\ \%$ IACS and $60\ \mathrm{MPa}$, which is more than enough.
**The trap.** Over decades at $100\ {}^{\circ}\mathrm{C}$, soft annealed copper can sag by slow creep and its bolted joints lose clamping force by stress relaxation, and it is easily damaged in handling. So the usual answer is not the softest copper but a **half-hard** temper, which keeps nearly all of the conductivity (about $97\ \%$ IACS) at several times the annealed yield strength, or a **silver-bearing copper**, whose small silver addition raises the softening temperature at almost no cost in conductivity. Where real strength is needed with good conductivity, as in a contact wire, precipitation-hardened **chromium-zirconium copper** (around $80\ \%$ IACS) is used.
**The rule.** Precipitation hardening costs less conductivity than solid solution for the same strength, because the solute is tied up in particles and the matrix is nearly pure copper. This is why the copper alloys that combine the highest strength with useful conductivity — $\mathrm{Cu - Be}$, $\mathrm{Cu - Cr}$, $\mathrm{Cu - Cr - Zr}$, $\mathrm{Cu - Ni - Si}$ — are precipitation-hardened.

*Sanity.* The same trade explains why a connector spring is beryllium copper, at around $1\ \mathrm{GPa}$ and roughly $20\ \%$ IACS, where strength matters more than conductivity, and why heat-sink components in fusion devices use $\mathrm{CuCrZr}$ or oxide-dispersion-strengthened copper. Oxide dispersion strengthening is the extreme case: a fraction of a per cent of fine alumina particles (GlidCop) keeps copper strong even after exposure near $900\ {}^{\circ}\mathrm{C}$, because the stable oxide blocks recrystallisation, while the conductivity stays near $90\ \%$ IACS because the matrix is almost pure copper.
:::
:::
