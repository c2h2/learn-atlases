The crust is $46\%$ oxygen, $28\%$ silicon, and eight other elements for the remaining quarter, and the reason the earth sciences are not a catalogue is that these few atoms have sizes. Mendeleev's table, read as a list of ionic radii rather than of weights, explains why the mantle is olivine and not something else, why potassium is in the granite and not in the peridotite, why the ocean's magnesium is exchanged for the clay's calcium, why a diamond is hard and graphite is a lubricant, and why the garnet in your hand specimen is red. In 1923 and again in 1926, V. M. Goldschmidt, working in Göttingen with the first reliable X-ray radii, published a set of "geochemical distribution laws" that amounted to saying that the elements sort themselves by size and charge, and that the whole of petrology follows. He was right to within the accuracy of the radii, which is to say rather well.

::: definition Ionic radii and coordination {#def-radii}
An ion in a crystal is not a sphere of fixed size: its radius depends on its **coordination number**, because an ion surrounded by more neighbours is held less tightly and expands. The Shannon radii, in angstroms, are quoted by coordination and are the working numbers of the subject:

| cation | IV | VI | VIII | XII |
|---|---|---|---|---|
| $\mathrm{Si}^{4+}$ | $0.26$ | $0.40$ | — | — |
| $\mathrm{Al}^{3+}$ | $0.39$ | $0.535$ | — | — |
| $\mathrm{Mg}^{2+}$ | $0.39$ | $0.72$ | $0.96$ | — |
| $\mathrm{Fe}^{2+}$ | — | $0.78$ | — | — |
| $\mathrm{Fe}^{3+}$ | $0.49$ | $0.545$ | — | — |
| $\mathrm{Ca}^{2+}$ | — | $1.00$ | $1.12$ | $1.30$ |
| $\mathrm{Na}^{+}$ | — | $1.02$ | $1.18$ | $1.42$ |
| $\mathrm{K}^{+}$ | — | $1.38$ | $1.51$ | $1.64$ |

The anion radius of $\mathrm{O}^{2-}$ is taken as $1.38\ \text{angstroms}$ in six-fold coordination. The **coordination polyhedra** are the triangle (3), tetrahedron (4), octahedron (6), dodecahedron (8) and cuboctahedron (12), and the geometry of close packing fixes the range of cation-to-anion radius ratio over which each is stable.
:::

::: proposition The radius-ratio rule {#prop-radius-ratio}
A cation fits a hole of $n$ anions that just touch one another when its radius is large enough to hold them apart. For the three geometries the limits are pure geometry:
$$
\left(\frac{r_c}{r_a}\right)_\text{triangular} = 0.155, \quad
\left(\frac{r_c}{r_a}\right)_\text{tetrahedral} = \sqrt{\tfrac32}-1 = 0.225, \quad
\left(\frac{r_c}{r_a}\right)_\text{octahedral} = \sqrt{2}-1 = 0.414, \quad
\left(\frac{r_c}{r_a}\right)_\text{cubic} = \sqrt{3}-1 = 0.732 .
$$
Below a limit the cation "rattles" in its hole, the anions come into contact with one another and repel, and the structure adopts the lower coordination; above it the coordination increases until the cation is too large for the polyhedron. The rule predicts the coordination of most common cations correctly: $\mathrm{Si}^{4+}$ at $0.26/1.38 = 0.19$ in four-fold (and only in four-fold at the earth's surface), $\mathrm{Mg}^{2+}$ at $0.52$ in six-fold, $\mathrm{K}^{+}$ at $1.0$ in eight- to twelve-fold.
:::

::: proof
For the octahedron, six anions lie at the corners of a square of edge $2r_a$ with the cation at the centre; the anions touch along the edge and the cation-anion contact lies along the half-diagonal, so
$$
2(r_a+r_c) = 2r_a\sqrt2 \Longrightarrow r_c/r_a = \sqrt2-1 = 0.414 .
$$
For the cube, the eight anions at the corners of a cube of edge $2r_a$ touch along the edge and the cation sits at the end of the body diagonal:
$$
2(r_a+r_c) = 2r_a\sqrt3 \Longrightarrow r_c/r_a = \sqrt3-1 = 0.732 .
$$
For the tetrahedron, place the anions at four alternating corners of a cube of edge $a$; the anions touch along the face diagonal so $2r_a = a\sqrt2$, and the cation-to-anion distance is half the body diagonal, $r_a+r_c = a\sqrt3/2$. Eliminating $a$ gives $r_c/r_a = \sqrt{3/2}-1 = 0.225$. ∎

The rule is a first approximation and its failures are instructive. $\mathrm{Si}^{4+}$ at $0.19$ should be three-fold on the strict reading and is four-fold, because the silicon-oxygen bond is half covalent and the directional bonding wins; $\mathrm{Al}^{3+}$ at $0.39$ sits comfortably in both four- and six-fold sites, which is the single most important fact in the chemistry of the crust, since it means aluminium can substitute for silicon in the framework and for magnesium in the octahedral sheet, and therefore that the whole of the feldspar, mica, amphibole and clay chemistry exists. Above about $100\ \mathrm{kbar}$ silicon itself goes six-fold, in stishovite and in the majorite garnet of the transition zone, and the coordination change of silicon is the reason the mantle's seismic discontinuities at $410$ and $520\ \mathrm{km}$ are what they are.
:::

::: example Ionic character and hardness {#ex-ionic}
Pauling's electronegativities are $\chi(\mathrm{Si}) = 1.90$, $\chi(\mathrm{O}) = 3.44$, $\chi(\mathrm{Na}) = 0.93$, $\chi(\mathrm{Cs}) = 0.79$, $\chi(\mathrm{F}) = 3.98$. Find the ionic character of the $\mathrm{Si}-\mathrm{O}$, $\mathrm{Na}-\mathrm{Cl}$ ($\chi_{\mathrm{Cl}} = 3.16$) and $\mathrm{Cs}-\mathrm{F}$ bonds, and relate the result to the hardness and the melting point of silica, halite and fluorite.
::: solution
The fraction of ionic character is $1-\exp[-0.25(\Delta\chi)^2]$:
$$
\mathrm{Si}-\mathrm{O}: \Delta\chi = 1.54, \quad 1-e^{-0.593} = 45\%; \qquad
\mathrm{Na}-\mathrm{Cl}: \Delta\chi = 2.23, \quad 1-e^{-1.24} = 71\%; \qquad
\mathrm{Cs}-\mathrm{F}: \Delta\chi = 3.19, \quad 1-e^{-2.54} = 92\%.
$$
Silica is therefore a **covalent network**: its bonds are directional, strong, and satisfied in three dimensions, so it has no cleavage, a hardness of $7$, a melting point of $1713\ ^\circ\mathrm{C}$, and an acid-resistant, glassy, conchoidally fracturing character. Halite is $71\%$ ionic: its bonds are non-directional, its structure is a close packing of equal ions, and it therefore has perfect cubic cleavage, a hardness of $2.5$, a melting point of $801\ ^\circ\mathrm{C}$, a low density for a chloride, and solubility in water, whose high dielectric constant screens the ionic attraction. Fluorite, $\mathrm{CaF_2}$, is more ionic still and has octahedral cleavage and a hardness of $4$; the difference from halite is the radius ratio and the structure, not the bonding.

The generalisation is worth having in mind at the hand lens: **the more covalent the bonding, the harder the mineral, the higher its melting point, the poorer its cleavage, the greater its refractive index anomaly, and the less it dissolves**. Quartz, corundum, spinel and diamond are the covalent-to-intermediate end and the abrasives of industry; the halides, the sulphates and the carbonates are the ionic end, soft, cleavable and soluble.
:::
:::

::: svg
caption: The four coordination polyhedra and the geometry that fixes their limits. In each panel the anions (large circles) touch one another and the cation (small circle) sits in the hole; the critical radius ratio is the value at which the cation just touches its neighbours, and below it the polyhedron collapses to a lower coordination. The tetrahedron is drawn inside the cube whose alternating corners it occupies, which is the construction used in the proof. The common cations are placed against their ratios: boron and beryllium three- and four-fold, silicon and aluminium four-fold, the divalent and trivalent transition metals six-fold, calcium and sodium six- to eight-fold, and potassium eight- to twelve-fold, which is why potassium is excluded from the mantle's minerals and concentrated in the crust's.
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordination polyhedra and radius ratio">
  <style>
    .poly { stroke: var(--ink-2); stroke-width: 1.3; fill: none; }
    .an { fill: var(--info-wash); stroke: var(--series-3); stroke-width: 1.2; }
    .cat { fill: var(--series-1); }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 10.5px; }
  </style>
  <polygon class="poly" points="100,70 135,130 65,130"/>
  <circle class="an" cx="100" cy="70" r="17"/><circle class="an" cx="135" cy="130" r="17"/><circle class="an" cx="65" cy="130" r="17"/>
  <circle class="cat" cx="100" cy="110" r="6"/>
  <text class="lab" x="62" y="176">3: triangle</text><text class="sub" x="62" y="190">0.155</text>
  <polygon class="poly" points="270,62 314,118 270,158 226,118"/>
  <line class="poly" x1="270" y1="62" x2="270" y2="158"/>
  <circle class="an" cx="270" cy="62" r="17"/><circle class="an" cx="314" cy="118" r="17"/><circle class="an" cx="270" cy="158" r="17"/><circle class="an" cx="226" cy="118" r="17"/>
  <circle class="cat" cx="270" cy="110" r="10"/>
  <text class="lab" x="222" y="184">4: tetrahedron</text><text class="sub" x="222" y="198">0.225</text>
  <polygon class="poly" points="440,60 486,94 486,134 440,168 394,134 394,94"/>
  <circle class="an" cx="440" cy="60" r="18"/><circle class="an" cx="486" cy="94" r="18"/><circle class="an" cx="486" cy="134" r="18"/><circle class="an" cx="440" cy="168" r="18"/><circle class="an" cx="394" cy="94" r="18"/><circle class="an" cx="394" cy="134" r="18"/>
  <circle class="cat" cx="440" cy="114" r="15"/>
  <text class="lab" x="396" y="190">6: octahedron</text><text class="sub" x="396" y="204">0.414</text>
  <path class="poly" d="M572,80 L632,80 L652,60 L592,60 Z M572,80 L572,140 L632,140 L632,80 Z M632,140 L652,120 L652,60 Z M572,140 L592,120 L652,120 L632,140 Z M592,120 L592,60"/>
  <circle class="cat" cx="612" cy="100" r="19"/>
  <text class="lab" x="572" y="176">8: cube</text><text class="sub" x="572" y="190">0.732</text>
  <text class="sub" x="40" y="240">boron 0.16 · silicon 0.19 · aluminium 0.28 to 0.39 · magnesium 0.52 · iron 0.56 · calcium 0.72 · potassium 1.00</text>
  <text class="sub" x="40" y="258">ratios of the cation radius to that of O2-, from the Shannon table</text>
</svg>
:::

## Substitution: how minerals mix

::: proposition Solid solution and the substitution mechanisms {#prop-solid-solution}
Two ions substitute for one another freely if they have the **same charge** and radii differing by less than about $15\%$; they substitute partially if the radii differ by $15$–$40\%$, usually with a solvus; and if their charges differ, substitution requires a **coupled mechanism** that preserves electrical neutrality. The crust's most important mechanisms are:
$$
\begin{aligned}
&\text{plagioclase:} && \mathrm{Ca^{2+} + Si^{4+}} = \mathrm{Na^{+} + Al^{3+}} && (\text{anorthite} \rightleftharpoons \text{albite})\\
&\text{clinopyroxene:} && \mathrm{Ca^{2+} + Si^{4+}} = \mathrm{Na^{+} + Al^{3+}} && (\text{diopside} \rightleftharpoons \text{jadeite})\\
&\text{amphibole, mica:} && \mathrm{Al^{3+} + Al^{3+}} = \mathrm{Mg^{2+} + Si^{4+}} && (\text{tschermak substitution})\\
&\text{magnetite:} && \mathrm{Fe^{3+} + Fe^{3+}} = \mathrm{Mg^{2+} + Si^{4+}} && (\text{ulvöspinel, solid-solution in the olivine})\\
&\text{cordierite, feldspar:} && \mathrm{Al^{3+}} = \mathrm{Si^{4+}} + \mathrm{vacancy} + \mathrm{H^{+}} && (\text{water in the structure})
\end{aligned}
$$
and the last of them is why the micas, amphiboles and tourmaline carry water into the subduction zone, and why the "anhydrous" mantle contains tens to hundreds of parts per million of hydrogen in its olivine.
:::

::: example Which way do the elements go? {#ex-partition}
Predict, from the radius-ratio rule and the charge, whether nickel, strontium, rubidium and uranium are compatible or incompatible in the mantle's minerals, and whether each concentrates in the melt or the residue. Take $r(\mathrm{Ni}^{2+},\text{VI}) = 0.69$, $r(\mathrm{Mg}^{2+},\text{VI}) = 0.72$, $r(\mathrm{Sr}^{2+},\text{XII}) = 1.44$, $r(\mathrm{Rb}^{+},\text{XII}) = 1.72$, $r(\mathrm{K}^{+},\text{XII}) = 1.64$.
::: solution
Nickel and magnesium have the same charge and radii within $4\%$: nickel is **compatible**, and partitions into the olivine and spinel of the mantle with a distribution coefficient of $5$–$15$, which is why the nickel deposits of Norilsk and Kambalda are in the earliest, most magnesian magmas and why the element is a proxy for the melt fraction of a komatiite.

Strontium in twelve-fold coordination is larger than the calcium it replaces by $14\%$ and has the same charge, so it substitutes for calcium in plagioclase and clinopyroxene but not for magnesium or iron in olivine; in a basaltic melt it is mildly incompatible, and in a granulite it is retained by the garnet-free residue. Rubidium is monovalent and, at $1.72$, larger than potassium by $5\%$: it follows potassium into the micas, the alkali feldspar and the melts, and is the most incompatible of the common elements, which is why the Rb/Sr ratio rises so steeply up the crystallisation sequence and why the continental crust's Rb/Sr of $0.4$ against the mantle's $0.03$ is the basis of the whole strontium isotope stratigraphy of the crust.

Uranium is hexavalent and very large in its uranyl ion, and is incompatible in every common silicate; it enters zircon as $\mathrm{U^{4+}}$ only after oxidation-state change, and its concentration in the crust relative to the mantle is the reason the crust produces about half of the planet's radiogenic heat despite holding a tenth of its uranium. The Goldschmidt classification — the compatible nickel, chromium, magnesium, cobalt; the incompatible potassium, rubidium, caesium, barium, strontium and the light rare earths; the highly charged, highly incompatible high-field-strength elements niobium, tantalum, zirconium, hafnium and the heavy rare earths — is nothing but the radius-ratio rule and the requirement of charge balance, applied to the whole periodic table.
:::
:::

::: example Calcite and aragonite {#ex-polymorph}
Calcite is trigonal with $a = 4.989$, $c = 17.062\ \text{angstroms}$ (hexagonal setting) and $Z = 6$; aragonite is orthorhombic with $a = 4.960$, $b = 7.970$, $c = 5.741\ \text{angstroms}$ and $Z = 4$. Both are $\mathrm{CaCO_3}$, of molar mass $100.09\ \mathrm{g\,mol^{-1}}$. Find their densities and explain which is stable where.
::: solution
For the hexagonal cell the volume is $V = \tfrac{\sqrt3}{2}a^2c = 0.866\times24.89\times17.062 = 368.4\ \text{angstroms}^3$, and for the orthorhombic $V = 4.960\times7.970\times5.741 = 226.9\ \text{angstroms}^3$. Then
$$
\rho_\text{calcite} = \frac{6\times100.09}{6.022\times10^{23}\times3.684\times10^{-22}} = 2.71\ \mathrm{g\,cm^{-3}}, \qquad
\rho_\text{aragonite} = \frac{4\times100.09}{6.022\times10^{23}\times2.269\times10^{-22}} = 2.93\ \mathrm{g\,cm^{-3}}.
$$
Aragonite is $8\%$ denser, because its calcium is in nine-fold rather than six-fold coordination and the carbonate groups are packed closer; it is therefore the high-pressure polymorph, stable above about $10\ \mathrm{kbar}$ at $25\ ^\circ\mathrm{C}$ and above $5\ \mathrm{kbar}$ at $400\ ^\circ\mathrm{C}$, which is why aragonite is the mineral of subducted carbonate and of the deep crust and calcite is the mineral of limestone.

The biological twist is that the ocean decides which one you get. The magnesium-to-calcium ratio of seawater controls whether the corals and the calcifying algae precipitate aragonite or high-magnesium calcite, and the geological record shows the seas alternating between "aragonite seas" and "calcite seas" on a cycle of some tens of millions of years, driven by the rate of seafloor spreading and the flux of magnesium from hydrothermal alteration of the new crust. In an aragonite sea the skeletons of the reefs dissolve more readily in the deep ocean, the carbonate compensation depth shallows, and the sedimentary record of the carbonate factory changes in kind. That a ratio of two ions in solution, decided by the chemistry of mid-ocean ridges, should control the mineralogy of a reef is the crystal-chemistry rule applied at the scale of the planet.
:::
:::

::: widget plot
f: 100*(1-exp(-c*x^2))
x: 0, 3.4
y: 0, 100
sliders: c=0.25:0.05:0.6
labels: ionic character (%)
caption: Pauling's estimate of the ionic character of a bond against the difference in electronegativity, with the coefficient of the exponential set by the slider. The curve is steep at small differences and flattens toward the ionic limit, so the sequence of the earth's bonds is compressed at the top: $\mathrm{Cs}-\mathrm{F}$ at $\Delta\chi = 3.19$ is $92\%$ ionic, $\mathrm{Na}-\mathrm{Cl}$ at $2.23$ is $71\%$, $\mathrm{Ca}-\mathrm{O}$ at $2.44$ is $77\%$, $\mathrm{Si}-\mathrm{O}$ at $1.54$ is $45\%$, $\mathrm{C}-\mathrm{O}$ at $1.00$ is $22\%$, and $\mathrm{Si}-\mathrm{Si}$ is zero. The whole of the difference between a salt and a silicate — between cleavage and fracture, between solubility and permanence, between a melting point of $800$ and one of $1700$ — is the horizontal distance between two points on this curve.
:::

::: example Order and disorder in the feldspars {#ex-ordering}
In sanidine the aluminium and silicon are distributed at random over the four tetrahedral sites of the monoclinic potassium feldspar; in microcline they are ordered, with aluminium occupying specific sites, and the structure is triclinic. The transition takes place between $450$ and $550\ ^\circ\mathrm{C}$ depending on the water content. Explain why ordering lowers the symmetry, and how the transition is used.
::: solution
Ordering is a lowering of symmetry because the ordered arrangement is distinguishable by translation: the sites that were equivalent when aluminium and silicon were randomly distributed become inequivalent when one of them holds aluminium most of the time, so the cell must be enlarged or re-oriented and the symmetry reduced. The thermodynamics are the usual ones — the ordered state has a lower enthalpy and a lower entropy, so it is stable at low temperature, and the disordered state wins at high temperature by the $-T\Delta S$ term, with the transition temperature at $\Delta H/\Delta S$.

The use is as a thermometer and a clock. A potassium feldspar that crystallised at $800\ ^\circ\mathrm{C}$ in a granite retains its sanidine disorder on rapid cooling, and if it is later buried to $400\ ^\circ\mathrm{C}$ it orders to microcline over a time scale set by the diffusion of aluminium, which is slow: the ordering temperature is therefore a lower bound on the peak temperature and an upper bound on the time at temperature. The same principle, applied to the magnesium-iron order between the two octahedral sites of orthopyroxene, gives a geothermometer with a precision of $30\ ^\circ\mathrm{C}$ that works in rocks that cooled too slowly for the exchange thermometers to be useful, and the lead content of the alkali feldspar gives a barometer. Order-disorder transitions are the slow clocks of the crust, and they are the reason a metamorphic rock remembers its maximum temperature even when the minerals that equilibrated at it have been consumed.
:::
:::

::: warning The ionic radius is not a constant, and a formula is not a molecule
Both of these errors are made by every generation of students, and both come from treating a model as an object. **The radius depends on the coordination, the spin state and the pressure**: $\mathrm{Fe}^{2+}$ is $0.78\ \text{angstroms}$ in six-fold coordination and high spin, $0.61$ in six-fold and low spin, and $0.77$ in four-fold; the radius of $\mathrm{Si}^{4+}$ increases by $0.14$ when it goes from four- to six-fold under the pressures of the transition zone, and the whole of the $520\ \mathrm{km}$ seismic discontinuity is that number. **And a mineral's formula is not a molecule**: there is no $\mathrm{Mg_2SiO_4}$ molecule floating in forsterite, only a structure whose ratio of atoms is $2:1:4$, and the formula is a statement about stoichiometry and sites. This is why the formula of a real mineral is written with the sites made explicit, $(\mathrm{Mg,Fe})_2\mathrm{SiO_4}$, and why the electron-probe analysis of a single grain is reported as cations on the basis of a fixed number of oxygens — a convention that hides the fact that the water content, the ferric fraction and the vacancy concentration are all assumptions.
:::

::: quiz
$\mathrm{Al}^{3+}$ is unusually important in the chemistry of the crust because:
- [ ] It is the most abundant metal after iron
- [x] Its radius allows it to enter both four-fold and six-fold coordination, so it substitutes for both silicon and magnesium
- [ ] It is always trivalent and therefore chemically inert
- [ ] It forms the strongest bond with oxygen
::: solution
At $0.39\ \text{angstroms}$ in four-fold and $0.535$ in six-fold, aluminium sits at the boundary between the tetrahedral and octahedral fields and can occupy either. This single fact makes possible the coupled substitution $\mathrm{Al^{3+} + Si^{4+}}$ for $\mathrm{Mg^{2+} + Al^{3+}}$, the feldspars, the micas, the amphiboles, the clay minerals, the whole of the aluminosilicate chemistry of the crust, and the existence of a continental crust with a composition unlike the mantle's.
:::
:::

::: history
The first mineral chemistry was arithmetic: in 1783 Abraham Werner classified minerals by their physical characters, and within twenty years the analysis of the zeolites had produced the puzzle of "zeolitic water", which could be driven off at a low temperature and taken up again, unlike the water of a hydrate. Thomas Graham's distinction of 1833 between the water of constitution and the water of composition is the first recognition that a mineral formula does not mean what it says. Eilhard Mitscherlich, in 1819, found that potassium dihydrogen phosphate and potassium dihydrogen arsenate crystallise identically and inferred that chemical similarity and crystal form are related — the law of isomorphism, which led directly to the correction of beryllium's valence and to the atomic weights themselves. The ionic radius as a physical quantity waited for X-ray diffraction: W. L. Bragg's structures of 1913–14 gave the first interatomic distances, and V. M. Goldschmidt, in the nine volumes of *Geochemische Verteilsgesetze der Elemente* published between 1923 and 1938 from Göttingen and then from an exile in Oslo, tabulated the radii and stated the distribution laws that carry his name. Linus Pauling's 1929 paper on the ionic radii and the structures of ionic crystals gave the rules and the electronegativities, and Robert Shannon's 1976 revision, which made the radii consistent with a single scale and quoted them by coordination, is the table still in use. The colour centres and the crystal field came from the physics of the 1930s and were applied to minerals by John Burnham, Robert Burns and Michael Nicolson in the 1960s and 1970s, with the result that the absorption spectrum of a garnet can now be read as a record of its iron content and its site geometry.
:::

## Where this leads

The structures built from these polyhedra are in [[mineralogy-petrology/silicates]]; the way the microscope reads them is in [[mineralogy-petrology/optical-mineralogy]]; the partition coefficients used here qualitatively are quantified in [[geochemistry/trace-elements]] and applied to melting in [[mineralogy-petrology/magma-evolution]]; the coordination changes with pressure are the subject of [[physical-geology/earth-interior]]; and the hydrogen in nominally anhydrous minerals is treated in [[geochemistry/isotopes-water-carbon]].

::: summary Key takeaways
- Ions are spheres of size-dependent radius: the radius depends on the coordination, the charge and the spin, and the Shannon table is quoted by coordination.
- The radius-ratio rule follows from geometry: 0.225 for four-fold, 0.414 for six-fold, 0.732 for eight-fold, and it predicts the coordination of most common cations.
- Bonding is a continuum: silica is 45 per cent ionic and therefore hard, refractory and insoluble; halite is 71 per cent and the opposite.
- Solid solution requires similar charge and radius; where the charges differ, coupled substitutions such as Ca+Si = Na+Al make the feldspars, the jadeite and the micas possible.
- Compatibility is crystal chemistry: nickel follows magnesium, rubidium follows potassium, and the high-field-strength elements follow nowhere.
- Order-disorder transitions record the crust's thermal history on a clock of diffusion, and coordination changes with pressure make the mantle's seismic discontinuities.
:::

## Exercises

::: exercise Radius ratio {level=1 check="0.52"}
Find the radius ratio of $\mathrm{Mg}^{2+}$ ($0.72$) to $\mathrm{O}^{2-}$ ($1.38$) and the predicted coordination.
::: solution
$0.72/1.38 = 0.52$, between $0.414$ and $0.732$: six-fold, octahedral. Magnesium is the octahedral cation of the earth's mantle, and this is why the mantle is a structure of magnesium-oxygen octahedra with silicon in the holes.
:::
:::

::: exercise Ionic character {level=1 check="22"}
Find the ionic character, in per cent, of the carbon-oxygen bond with $\Delta\chi = 1.00$.
::: solution
$1-e^{-0.25\times1} = 22\%$. Carbon dioxide is a molecular gas and silicon dioxide a three-dimensional network, and the difference of $23$ percentage points of ionic character is the reason.
:::
:::

::: exercise Coupled substitution {level=1 check="1"}
In the jadeite substitution $\mathrm{Ca^{2+} + Si^{4+}} = \mathrm{Na^{+} + Al^{3+}}$, what is the ratio of the number of cations before to the number after?
::: solution
The number of cations is unchanged, two for two, so the ratio is $1.0$; what changes is the charge distribution and the size. The substitution is possible precisely because it preserves both the number of sites and the total charge, which is why it can run to completion in a high-pressure eclogite.
:::
:::

::: exercise Coordination change {level=1 check="0.54"}
The radius of $\mathrm{Si}^{4+}$ is $0.26$ in four-fold and $0.40$ in six-fold coordination. Find the fractional increase.
::: solution
$(0.40-0.26)/0.26 = 0.54$: a $54\%$ increase in the cation radius, and a corresponding decrease in the molar volume of the mineral, which is why the olivine-to-spinel transformation at $410\ \mathrm{km}$ increases the density by $8\%$ and gives a seismic discontinuity.
:::
:::

::: exercise Pauling's rules {level=2 check="2"}
In quartz, each oxygen is shared between two $\mathrm{SiO_4}$ tetrahedra. Use Pauling's second rule to find the electrostatic bond strength reaching the oxygen.
::: solution
Each Si-O bond has strength $4/4 = 1$, and with two tetrahedra sharing the oxygen the total is $2$, exactly the oxygen's charge. The same rule shows why an $\mathrm{SiO_4}$ tetrahedron cannot share an edge or a face with another: the Si-Si repulsion across a shared edge or face is unscreened, which is Pauling's third rule and the reason no silica mineral has polymerised tetrahedra in rings of fewer than three.
:::
:::

::: exercise Goldschmidt's rule {level=2 check="15"}
Two ions of the same charge have radii $0.72$ and $0.83\ \text{angstroms}$. Find the percentage difference and state whether extensive solid solution is expected.
::: solution
$(0.83-0.72)/0.72 = 15\%$, at the boundary of the rule: partial solid solution with a solvus at low temperature. This is the case of $\mathrm{Fe}^{2+}$ and $\mathrm{Mn}^{2+}$, and of $\mathrm{Mg}^{2+}$ and $\mathrm{Fe}^{2+}$ at the more extreme end, and it is why exsolution lamellae are so common in the rock-forming silicates.
:::
:::

::: exercise Deriving the tetrahedral limit {level=3}
Derive the critical radius ratio for four-fold coordination from the cube construction, and then show that the tetrahedral hole in a close-packed array of anions has a radius ratio of $0.225$ while the octahedral hole has $0.414$. Why does $\mathrm{Si}^{4+}$, at $0.19$, nevertheless take the tetrahedron?
::: solution
Place the anions at the corners $(0,0,0)$, $(a,0,0)$, $(0,a,0)$, $(0,0,a)$ of a cube — four alternating corners of a larger cube of edge $a$ — so that the anion-anion distance is $a\sqrt2$ and $2r_a = a\sqrt2$. The centre of the tetrahedron is at $(a/2,a/2,a/2)$ at a distance $a\sqrt3/2$ from each corner, so
$$
r_a + r_c = \frac{a\sqrt3}{2} = r_a\frac{\sqrt3}{\sqrt2} \Longrightarrow \frac{r_c}{r_a} = \sqrt{1.5}-1 = 0.225 .
$$
The octahedral limit follows from the square as in the text.

Silicon at $0.19$ is below the limit and by the strict rule should be three-fold, as boron is in the borates. It is four-fold because the bond is $45\%$ covalent and the covalent bonding is directional and prefers four equivalent $sp^3$ orbitals; the electrostatic argument alone would predict $\mathrm{SiO_3}$ groups, which do not exist except at the pressures of the lower mantle. This is the standard caution about the radius-ratio rule: it is an electrostatic model of an object that is part electrostatic and part covalent, and it fails where the covalent term is large — for silicon, for beryllium, and for every bond involving the light elements.
:::
:::

::: exercise Crystal field and colour {level=2 check="1.24"}
The $\mathrm{Fe}^{2+}$ ion in an octahedral site has a broad absorption band centred at $1.0\ \mu\mathrm{m}$, corresponding to the splitting $\Delta_o$ of the $d$ orbitals. Find this transition energy in electronvolts, taking $E = hc/\lambda$ with $hc = 1.24\ \mu\mathrm{m\cdot eV}$. (Enter the energy in electronvolts.)
::: solution
$E = 1.24/1.0 = 1.24\ \mathrm{eV}$, in the near infrared. The transmitted light is therefore depleted in the red and the infrared, which is why ferrous iron in octahedral coordination makes a mineral green or brown rather than any colour we have a name for. The same ion in tetrahedral coordination has a smaller splitting, absorbs at longer wavelength still, and gives the yellow of citrine and the rose of morganite, where the colour is due to an entirely different mechanism.
:::
:::

::: exercise The formula from the analysis {level=3}
An electron-probe analysis of an olivine gives (wt%): $\mathrm{SiO_2}\ 39.5$, $\mathrm{MgO}\ 51.0$, $\mathrm{FeO}\ 9.6$. Calculate the cation proportions on the basis of four oxygens and the forsterite content $\mathrm{Mg}/(\mathrm{Mg}+\mathrm{Fe})$.
::: solution
Dividing by the molecular weights — $60.08$, $40.30$, $71.85$ — gives the mole proportions $0.657$, $1.266$, $0.134$. Normalising to two cations (the olivine structure has two octahedral and one tetrahedral cation per four oxygens, so three cations in all, and the usual basis is three cations): the total is $2.057$, and the factors give $\mathrm{Si}_{0.958}\mathrm{Mg}_{1.847}\mathrm{Fe}_{0.195}$, which after normalising the silicon to $1.000$ becomes $\mathrm{Mg}_{1.928}\mathrm{Fe}_{0.204}\mathrm{SiO_4}$. The forsterite content is
$$
100\times\frac{1.928}{1.928+0.204} = 90.4\% .
$$
The analysis is therefore an Fo 90 olivine, a normal mantle or high-magnesium basalt composition. Note what the calculation has assumed: that all the iron is ferrous, that there is no nickel, manganese or water, and that the analysis is complete — three assumptions that between them can shift the result by a forsterite unit or two, which is more than the thermometers are precise.
:::
:::
