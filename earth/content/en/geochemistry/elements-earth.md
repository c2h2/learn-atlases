Geochemistry begins with a fact that has no analogue in any other earth science: the material of our planet is a sample of the Galaxy, and its composition can be read from a meteorite, a spectrum of the photosphere, and the nuclear physics of stellar burning. Everything else — why the mantle is depleted in potassium, why the core holds almost all the planet's nickel, why the ocean is salty and the crust is granitic, why aluminium is immobile and rubidium is not — follows from three things: how the nuclei were made, at what temperature they condensed from the solar gas, and what bonds they form once the rock is solid and water is present.

## What is abundant, and why

::: definition Cosmic and solar-system abundances {#def-abundances}
Element abundances are quoted as **number of atoms per $10^6$ atoms of silicon** (the geochemical convention, with $\log\varepsilon(\mathrm{Si}) = 7.51$) or per $10^6$ atoms of hydrogen (the spectroscopic convention, $\log\varepsilon(\mathrm{H}) = 12$). Three features dominate the pattern. **Hydrogen and helium** are $99$ per cent of the Galaxy and are excluded from the Earth almost entirely, so a geochemist's table of "abundances" is a table of the **refractory residue** of a mostly-gas universe. The **odd–Harkins rule** (Harkins) is the alternation, first noticed by Harkins in 1917 and confirmed by every mass spectrometrist since, by which **even-atomic-number elements are more abundant than their odd-numbered neighbours**, because protons and neutrons pair in the nucleus and an even number of either is more tightly bound and more easily made. And the **iron peak** at $Z = 26$ is a maximum, because $^{56}$Ni and $^{56}$Fe have the highest binding energy per nucleon of any nuclei, so stellar burning runs to them and stops. The magnitudes are enormous: calcium ($Z = 20$) is 1500 times more abundant than scandium ($Z = 21$), and iron ($Z = 26$) is 117 times more abundant than manganese ($Z = 25$) and 2000 times more abundant than copper ($Z = 29$).
:::

::: example The odd–Harkins rule {#ex-harkins}
Photonuclear abundances (Asplund and colleagues) give $\log\varepsilon$: Ca 6.34, Sc 3.15, Ti 4.95, V 3.93, Cr 5.64, Mn 5.43, Fe 7.50, Co 4.99, Ni 6.22, Cu 4.19. Compute the abundance ratios Ca/Sc, Ti/Sc, V/Sc, Fe/Mn, Fe/Co, Ni/Cu, and identify which differences are odd–even and which are not.
::: solution
$$
\frac{\mathrm{Ca}}{\mathrm{Sc}} = 10^{6.34-3.15} = 1550, \quad
\frac{\mathrm{Ti}}{\mathrm{Sc}} = 10^{1.80} = 63, \quad
\frac{\mathrm{V}}{\mathrm{Sc}} = 10^{0.78} = 6.0,
$$
$$
\frac{\mathrm{Fe}}{\mathrm{Mn}} = 10^{2.07} = 117, \quad
\frac{\mathrm{Fe}}{\mathrm{Co}} = 10^{2.51} = 324, \quad
\frac{\mathrm{Ni}}{\mathrm{Cu}} = 10^{2.03} = 107 .
$$
Every one of these pairs is an **even–odd** pair, and every one is a factor of 6 to 1500. The pattern is the odd–Harkins rule, and its magnitude is the reason that the geochemist's periodic table is a **sawtooth**: an element's chemistry may be nearly identical to its neighbour's (Sc and Y, Mn and Fe) and its abundance may differ by three orders of magnitude.

Two of the numbers are **not** purely odd–even. The Fe/Mn and Fe/Co ratios are inflated by the **iron peak** — $^{56}$Fe sits at the maximum of the binding-energy curve, so iron is anomalously abundant even against its even-numbered neighbours, and Ni ($Z = 28$) is only a factor of 1.9 below Fe rather than the factor of ten the sawtooth alone would give. And the Ca/Sc ratio of 1550 is larger than the odd–even effect alone because scandium is also a **compatible** element whose stellar production is modest.

The practical consequence is that the **trace elements are trace because of nuclear physics, not because of chemistry**. Rubidium is 30 times rarer than strontium because Rb is odd–odd; the rare-earth elements span a factor of 100 across a series in which the chemistry is essentially constant; and the entire discipline of isotope geology rests on the fact that the parent and daughter of a decay scheme usually differ by three orders of magnitude in abundance, which is what makes a measurable radiogenic ingrowth.
:::
:::

::: widget plot
f: 8.6 - 0.11*x + cos(3.14159*x)
x: 6, 22
y: 4, 10
labels: \log\varepsilon
caption: A schematic of the **odd–Harkins sawtooth** — the logarithmic atomic abundance plotted against atomic number $Z$, with $\cos(\pi Z)$ supplying the even–odd alternation. The real curve (Asplund and colleagues) is not this regular, because the iron peak at $Z = 26$ and the $\alpha$-process peaks at $Z = 8, 12, 14, 20$ sit on top of the sawtooth, but the alternation is real and its amplitude is a factor of 10 to 1000. The plot is the reason that the periodic table read down a column of even-$Z$ elements gives the major elements of the Earth (O, Mg, Si, S, Ca, Fe) and the odd-$Z$ neighbours give the trace elements (P, K, Sc, Mn, Cu, Rb).
:::

## From gas to rock

::: definition The condensation sequence {#def-condensation}
As the solar nebula cooled from about 2000 K, the elements condensed in a fixed order set by the **equilibrium condensation temperature** $T_{cond}$ at a total pressure of $10^{-4}$ atm. **Refractories** ($T_{cond} > 1650$ K: Ca, Al, Ti, Sc, Y, the rare earths, Zr, Hf, U, Th, Os, Ir, Pt) condensed first and are the residue that makes **CAIs** — calcium–aluminium-rich inclusions, the oldest solids in the solar system at 4567 Ma. **Rock-forming lithophiles** (Si, Mg, Fe as silicates and oxides, 1400–1350 K) and **metal and sulfide** (Fe–Ni alloy and troilite, 1350–1000 K) followed. **Moderately volatile elements** (Na, K, Rb, Zn, Ga, Ge, In, Tl, Pb, Bi, Sn, S, Se, Te, halogens; 1100–600 K) condensed last or were never fully condensed, and **highly volatile elements and noble gases** (H, C, N, Ne, Ar, Kr, Xe; below 400 K) were largely lost to the gas. The consequence for the Earth is a **systematic depletion of the volatile elements relative to CI chondrites that scales with $T_{cond}$**. The refractory lithophiles are essentially unfractionated: the primitive mantle's Th/U of 1.25, its CaO/Al$_2$O$_3$ and its Zr/Sm are within a few per cent of the chondritic values. The moderately volatile elements are depleted by a factor of a few — the bulk silicate Earth's K/U of about 11,800 is a factor of a few below the chondritic value. The highly volatile elements are depleted by orders of magnitude: the primitive mantle contains 0.545 ppb of lead against CI chondrite's 812 ppb, a depletion of **1500-fold**, and the noble gases and the volatile elements of life (H, C, N) are depleted by factors of $10^3$ to $10^6$. This **depletion–volatility trend** is the single most important observation about the Earth's bulk composition, and its cause — nebular volatility, core–mantle equilibration, or evaporative loss in the giant impact that formed the Moon — is still argued.
:::

::: example Volatile depletion and the Earth's ratios {#ex-depletion}
The primitive mantle contains K 240 ppm, Rb 0.605 ppm, Sr 19.9 ppm, U 20.3 ppb, Th 25.3 ppb and Pb 0.545 ppb; CI chondrite contains 812 ppb of lead. Compute Th/U, K/U and Rb/Sr for the primitive mantle and the lead depletion factor, and say what each ratio records.
::: solution
$$
\frac{\mathrm{Th}}{\mathrm{U}} = \frac{25.3}{20.3} = 1.25, \qquad
\frac{\mathrm{K}}{\mathrm{U}} = \frac{240\times10^{6}}{20.3} = 11\,800, \qquad
\frac{\mathrm{Rb}}{\mathrm{Sr}} = \frac{0.605}{19.9} = 0.030,
$$
$$
\frac{\mathrm{Pb}_{CI}}{\mathrm{Pb}_{PM}} = \frac{812}{0.545} = 1490 .
$$
Each ratio records a different process. **Th/U = 1.25** is a **refractory-to-refractory** ratio: both elements are highly incompatible and both are refractory, so their ratio was set at accretion and is **unchanged by any later melting**. It is the basis of the U–Pb isotope clocks and of the $\mu$ ($^{238}$U/$^{204}$Pb) and $\kappa$ ($^{232}$Th/$^{238}$U) parameters. **K/U = 11,800** is a **volatile-to-refractory** ratio: potassium is moderately volatile ($T_{cond} \approx 760$ K) and uranium is refractory, so the ratio records the Earth's **volatile depletion** and is changed only by a process that fractionates volatility, not by melting, since both are strongly incompatible. **Rb/Sr = 0.030** is a **compatibility** ratio: rubidium and strontium are of similar volatility but strontium is far less incompatible, so the ratio is set by **melt extraction** and not by volatility. And **lead's 1500-fold depletion** records the extreme volatility of lead ($T_{cond} \approx 540$ K) together with its partial loss to a sulfide phase.

The power of the approach is that the three ratios are **orthogonal**, and a rock's position in the space they define separates its history into accretionary, volatile and differentiation components. A basalt with K/U = 11,800 and Rb/Sr = 0.030 is derived from a **primitive, undifferentiated** source; a granulite xenolith with K/U = 11,800 and Rb/Sr = 0.35 has been through **crust-forming melting** but has not lost volatiles; and a rock with K/U = 3000 has **lost potassium** to brine, metamorphism or weathering whatever its source.

The caution is that the ratios are only as good as the assumption of closed-system behaviour. Rubidium is mobile in aqueous fluid and potassium is mobile in hydrothermal brine, so Rb/Sr and K/U are both reset by alteration, whereas Th/U and the refractory ratios are not. This is why the **isotope** ratios — Sr, Nd, Hf, Pb, Os — rather than the elemental ratios carry the source information in a metamorphic or altered terrane, and why the elemental ratios are used mainly on fresh, unaltered samples.
:::
:::

## Chemical families

::: definition The Goldschmidt classification {#def-goldschmidt}
**Victor Goldschmidt** (Goldschmidt) classified the elements by the phase they enter in a differentiated body, and the classification is still the working vocabulary of the field. **Lithophiles** ("rock-loving": O, Si, Al, Ca, Na, K, Mg, Ti, the rare earths, Th, U, Zr, Hf, Nb, Ta, Ba, Sr, Rb) bond to oxygen and concentrate in the silicate mantle and crust. **Siderophiles** ("iron-loving": Fe, Ni, Co, Ru, Rh, Pd, Os, Ir, Pt, Re, W, Mo) dissolve in metallic iron and were swept into the core. **Chalcophiles** ("sulfur-loving": Cu, Ag, Au, Zn, Cd, Hg, Pb, As, Sb, Bi, Se, Te, Mo) concentrate in sulfide melt. **Atmophiles** (H, N, O, the noble gases) are atmospheric. **Biophiles** (C, N, O, P, S) are biologically cycled. The classification is **not** arbitrary: it is a consequence of the **electronegativity** and the **first ionisation potential**, and it is quantitatively expressed by the **metal–silicate partition coefficient**
$$
D^{metal-silicate} = \frac{(\text{wt% }X\text{ in metal})}{(\text{wt% }X\text{ in silicate melt})},
$$
which depends on pressure, temperature, oxygen fugacity and the silicate melt's composition. The **high-field-strength elements** (Ti, Zr, Hf, Nb, Ta, the rare earths, Y, P) resist fluid and melt transport because they form strong bonds with oxygen; the **large-ion-lithophiles** (Rb, Ba, Sr, K, Pb, Cs) are strongly incompatible and are the elements of granites, pegmatites and subduction fluids. The **Big Lithophile Elements** — Al, Ca, Na, Ti, REE, Y — are so named because they are abundant, lithophile and, in the presence of aqueous fluid, largely immobile, which makes them the reference set for the trace-element geochemistry of both igneous and sedimentary rocks.
:::

::: example Where did the nickel go? {#ex-core-ni}
The Earth's core is 32.5 wt% of the planet and the mantle 67.5 wt%. Assume the Earth accreted with a CI-chondritic nickel content of 1.1 wt% and that the bulk silicate Earth now contains 1900 ppm Ni. Find the nickel content of the core and the fraction of the Earth's nickel that resides in the mantle.
::: solution
A mass balance on the whole planet gives
$$
C_{core} = \frac{C_{Earth} - f_{mantle}\,C_{mantle}}{f_{core}}
        = \frac{1.1 - 0.675\times0.19}{0.325} = \frac{0.972}{0.325} = 3.0\ \mathrm{wt\%}.
$$
The mantle holds
$$
\frac{0.675\times0.19}{1.1} = 0.117 = 12\ \text{per cent}
$$
of the Earth's nickel, and the core holds **88 per cent** — in a reservoir that is 32.5 per cent of the mass, so the core is enriched in nickel by a factor of 2.7 relative to the bulk Earth and by a factor of **16** relative to the mantle.

The 3.0 wt% is a **minimum** for the core's light-element content, because the core's density from free-core compression is 5–10 per cent below that of pure Fe–Ni at core pressure, and the deficit requires 5–10 wt% of light elements — of which the candidates are S, Si, O, C and H, and the nickel counted here is part of the same budget. The calculation is the simplest possible application of the siderophile classification, and it generalises: the same arithmetic applied to **iridium, osmium, platinum, rhenium and tungsten** gives core contents of 99.5 per cent or more, which is why the **mantle abundances of the highly siderophile elements** are one of the central puzzles of geochemistry — they should be essentially zero, and they are not, which requires either a **late veneer** of chondritic material added after core formation ceased, or metal–silicate equilibration at pressures and temperatures far above those of any experiment.
:::
:::

::: definition Ionic potential and aqueous behaviour {#def-ionic-potential}
Once water is present, the Goldschmidt families are replaced by a classification based on the **ionic potential** $z/r$ — the charge divided by the ionic radius in Å (Stumm and Morgan, Morgan). **$z/r < 2.6$**: the cation does not polarise its own hydration shell enough to hydrolyse, and it persists as a **free hydrated cation** in water — Na$^+$ ($1/1.02 = 0.98$), K$^+$ (0.72), Mg$^{2+}$ (2.78, marginal), Ca$^{2+}$ (2.0), Sr$^{2+}$, Ba$^{2+}$. These are the elements of **seawater**. **$2.6 < z/r < 9$**: the cation **hydrolyses**, forming insoluble hydroxides and amphoteric behaviour — Al$^{3+}$ ($3/0.535 = 5.6$), Fe$^{3+}$ (4.7), Cr$^{3+}$, REE$^{3+}$, Th$^{4+}$, Ce$^{4+}$. These elements are **removed from solution at neutral pH** and are immobile in weathering profiles. **$z/r > 9$**: the cation cannot exist uncomplexed in water and forms **oxo-anions** — Si$^{4+}$ ($4/0.26 = 15.4$), P$^{5+}$ (13.2), S$^{6+}$ (20.7), C$^{4+}$ (26.7), Cr$^{6+}$, Mo$^{6+}$, U$^{6+}$. The classification explains the composition of seawater in one line: the cations of the first group are its cations, the anions of the third group are its anions (Cl$^-$ and SO$_4^{2-}$), and the second group is absent because it precipitates.
:::

::: example Why is the ocean sodium-rich and aluminium-poor? {#ex-ocean-chem}
The ionic radii (Shannon, six-fold coordination) are Na$^+$ 1.02, K$^+$ 1.38, Mg$^{2+}$ 0.72, Ca$^{2+}$ 1.00, Al$^{3+}$ 0.535, Fe$^{3+}$ 0.645, Si$^{4+}$ 0.26, P$^{5+}$ 0.38, S$^{6+}$ 0.29 Å. Compute the ionic potentials and predict the ocean's composition. The measured concentrations are Na 10.8, Mg 5.3, S 2.9, Ca 1.0, K 0.39, Al $3\times10^{-6}$, Fe $4\times10^{-7}$ mmol/kg.
::: solution
$$
\begin{array}{l|cccccccc}
 & \mathrm{Na^+} & \mathrm{K^+} & \mathrm{Ca^{2+}} & \mathrm{Mg^{2+}} & \mathrm{Al^{3+}} & \mathrm{Fe^{3+}} & \mathrm{Si^{4+}} & \mathrm{S^{6+}} \\
\hline
z/r & 0.98 & 0.72 & 2.00 & 2.78 & 5.61 & 4.65 & 15.4 & 20.7
\end{array}
$$
The four cations with $z/r$ below about 2.8 — Na, Mg, Ca, K — are the ocean's four cations, and together they are 99.9 per cent of its positive charge. Al and Fe, with $z/r$ of 4.7 and 5.6, hydrolyse at any pH above about 4 and are **seven and eight orders of magnitude** below sodium. Silicon and sulfur, with $z/r$ above 9, occur as the **anions** silicate and sulfate.

The classification predicts the **qualitative** composition perfectly and the **quantitative** composition not at all: potassium is the third most abundant rock-forming cation in the crust but only the fourth in the ocean, because it is fixed by clay minerals, and magnesium is abundant in the ocean despite its high ionic potential because brucite and Mg-calcite precipitation is slow. The **residual** behaviour — the difference between the classification's prediction and the ocean's actual composition — is the record of **biological and mineralogical control**, and it is the reason that the ocean is a **non-equilibrium** fluid whose composition is set by the balance of river input, hydrothermal output, and the precipitation of calcite, silica, and the salts of the biological pump.
:::
:::

::: history
**Mary Morris Healy** and **Frank Wigglesworth Clarke** (Clarke) compiled the first **average composition of the Earth's crust** in 1908–1924 from thousands of analyses, and the "Clarke number" is still the word for an element's crustal abundance. **Vladimir Vernadsky** (Vernadsky) founded **geochemistry** as a discipline in his 1908 *La géochimie*, treating the elements' distribution as a historical problem. **Fritz Paneth** (Paneth) and **Victor Goldschmidt** (Goldschmidt), working in Göttingen and Oslo in the 1920s, produced the **Goldschmidt classification** of 1923 and the *Geochemische Verteilungsgesetze der Elemente* series of thirteen papers (Goldschmidt) that established the lithophile–siderophile–chalcophile families, the ionic-radius rules, and the concept of isomorphous substitution. **Harkins'** (Harkins) 1917 odd–even rule and **Burbidge, Burbidge, Fowler and Hoyle's** (Hoyle) 1957 *Reviews of Modern Physics* synthesis of nucleosynthesis supplied the nuclear explanation. **Harold Urey** (Urey) calculated the **condensation sequence** of the solar nebula in 1952 and 1955, and **Larimer and Anders** (Anders) computed the equilibrium condensation temperatures used today in 1967–70. **Hans Suess** (Suess) and **Harold Urey** identified the "cosmochemical" and "metamorphic" processes; **Goldschmidt's** student **Klemperer** and then **Mason**, **Wiik**, **Wänke** (Wänke), **Ringwood** (Ringwood) and **O'Neill** (O'Neill) developed the quantitative metal–silicate partitioning and the fugacity systematics. The **CI-chondrite normalisation** convention was fixed by **Anders** (Anders) in 1971 and revised by **Lodders** (Lodders) in 2003, and the **Asplund, Grevesse, Sauval and Scott** (Asplund) 2009 photospheric abundances are the current standard. The **ionic potential** classification is the work of **Stumm and Morgan** (Stumm) in their 1970 *Aquatic Chemistry*, and the **large-ion-lithophile / high-field-strength element** vocabulary of **Wood, Sun, Jahn, Jahn and the subduction-fluorine school** of the 1970s.
:::

::: warning Abundance tables are not data, they are models
Every "abundance of the crust", "of the mantle", "of the Earth" quoted in a textbook is a **weighted average over a model**, and the numbers move by tens of per cent as the model changes. The **crustal abundance** depends on the assumed **granite : basalt : sediment ratio** and on the **granite : granodiorite** debate — the long-running quarrel between the andesite model of Taylor and McLennan and the granodiorite model of Barth over the continental crust's silica content and its sodium and europium content changed the quoted crustal Na by 15 per cent and its Eu anomaly by a factor of two. The **upper-continental-crust** composition (UCC) and the **average-continental-crust** (ACC) composition differ by a factor of two in the incompatible elements, because the ACC includes the buried lower crust, and confusing the two is a common error in a trace-element paper. The **primitive mantle** composition is a **calculated residue** — the composition obtained by removing a specified amount of basalt and melt from a chondritic starting point — and the values of McDonough and Sun (1995), of Palme and O'Neill (2003, 2014), of Workman and Hart (2005) and of Lydell (2022) differ by 10–30 per cent in Al, Ca, the rare earths and the highly siderophile elements, which is larger than many published anomalies. The **bulk silicate Earth** is worse still, because it requires an assumption about the core's light elements and about whether the "missing" silicon, potassium and tungsten are in the core, in the lower mantle or elsewhere. The rule is that **any trace-element ratio compared with a primitive-mantle or chondrite value must state which normalisation was used**, that ratios of two elements with similar behaviour (La/Nb, Ba/Th, Sm/Nd) are robust to the choice and ratios of two with different behaviour (Rb/Sr, Lu/Hf, Th/U) are not, and that a claim of "enrichment" or "depletion" of a few per cent in an incompatible element is not a claim at all.
:::

## Where this leads

The nuclear physics behind the abundances is in [[physical-geology/earth-interior]] and [[planetary-science/formation]], the condensation and meteorite record is in [[planetary-science/meteorites]], the partition coefficients used in melting are in [[mineralogy-petrology/magma-evolution]] and [[geochemistry/trace-elements]], the aqueous chemistry is in [[geochemistry/aqueous-geochemistry]], the weathering consequences are in [[geochemistry/weathering-chemistry]] and [[geomorphology/weathering]], and the isotope systems built on the abundances are in [[geochemistry/geochronology]] and [[geochemistry/radiogenic-tracers]].

::: quiz
An element X has an ionic potential $z/r = 12$. Predict its behaviour in a laterite.
- [ ] It accumulates as a free hydrated cation in the groundwater.
- [x] It forms an oxo-anion or a soluble anionic complex, and is leached from the profile.
- [ ] It is immobile and stays in the residual soil.
- [ ] It enters the olivine structure.
::: solution
An ionic potential above about 9 means the cation cannot exist uncomplexed in water and forms an **oxo-anion** (silicate, phosphate, sulfate, chromate, molybdate, uranate). Such species are anions, so they are not held by the negatively charged clay exchange complex and they are **leached** — with the important exception of phosphate and arsenate, which are strongly adsorbed to Fe and Al oxides. The laterite profile is therefore depleted in the $z/r > 9$ elements and enriched in the $2.6 < z/r < 9$ hydrolysing cations (Al, Fe, Ti, Th, REE) that precipitate as the residual oxides.
:::
:::

::: summary
- Elemental abundances are set by nucleosynthesis, and the odd–Harkins rule makes even-$Z$ elements 10–1000 times more abundant than their odd-$Z$ neighbours.
- The condensation sequence depletes the Earth in the volatile elements by a factor that scales with the condensation temperature, spanning four orders of magnitude.
- The Goldschmidt classification — lithophile, siderophile, chalcophile, atmophile — predicts which reservoir an element enters, and the core holds 88 per cent of the Earth's nickel.
- In the presence of water the ionic potential $z/r$ takes over: low values give seawater's cations, intermediate values give immobile hydrolysates, high values give oxo-anions.
- Abundance tables are models, not data, and any normalised ratio must state its reference.
:::

## Exercises

::: exercise Odd and even {level=1 check="14"}
Using $\log\varepsilon$: Mg 7.60, Al 6.45, Si 7.51, P 6.64, S 7.12, Cl 5.50. Find the Mg/Al and Si/P ratios and identify the rule they illustrate.
::: solution
$\mathrm{Mg/Al} = 10^{1.15} = 14$ and $\mathrm{Si/P} = 10^{0.87} = 7.4$. Both are **even–odd** pairs, and both even-$Z$ elements are more abundant — the odd–Harkins rule. The effect is smaller here than for Ca/Sc because the $\alpha$-process elements Mg, Si and S are individually enhanced.
:::
:::

::: exercise Ionic potential {level=1 check="2.8"}
Find the ionic potential of Mg$^{2+}$ ($r = 0.72$ Å) and of Si$^{4+}$ ($r = 0.26$ Å) and classify each.
::: solution
Mg$^{2+}$: $2/0.72 = 2.8$, marginal — it persists largely as a free hydrated cation, which is why magnesium is the ocean's second cation. Si$^{4+}$: $4/0.26 = 15.4$, far above 9 — it forms the silicate anion and never occurs as a free cation in water.
:::
:::

::: exercise Depletion factor {level=1 check="1490"}
CI chondrite contains 812 ppb of lead and the primitive mantle contains 0.545 ppb. Find the depletion factor and, from $T_{cond} \approx 540$ K, classify lead.
::: solution
$D = 812/0.545 = 1490$. Lead is a **highly volatile chalcophile and lithophile**, and its 1500-fold depletion is the combined effect of its very low condensation temperature and its partial loss to an iron-sulfide phase. It is the largest depletion of any non-gaseous element in the silicate Earth.
:::
:::

::: exercise wt percent to atom percent {level=2 check="61"}
Convert the crustal oxide-free composition O 46.6, Si 27.7, Al 8.1, Fe 5.0, Ca 3.6, Na 2.6, Mg 2.1, K 2.4 wt% to atom per cent.
::: solution
Dividing by the atomic masses (16.0, 28.09, 26.98, 55.85, 40.08, 22.99, 24.31, 39.10) and normalising, the atom percentages are **O 61, Si 21, Al 6.3, Fe 1.9, Ca 1.9, Na 2.4, Mg 1.8, K 1.3**. Oxygen is 61 per cent of the crust's atoms and 47 per cent of its mass, and the crust is essentially a **packed oxygen lattice** with the cations in interstitial sites — which is why the crystal chemistry of the silicates is a crystal chemistry of oxygen.
:::
:::

::: exercise A core mass balance {level=2 check="4.6"}
If the bulk silicate Earth contains 900 ppm sulfur and the core contains 14 wt% S, find the sulfur content of the bulk Earth, taking the core at 32.5 and the mantle at 67.5 wt%.
::: solution
$$
C_{Earth} = 0.325\times14 + 0.675\times0.090 = 4.55 + 0.061 = 4.6\ \mathrm{wt\%}.
$$
The mantle holds only $0.061/4.6 = 1.3$ per cent of the Earth's sulfur, and the bulk Earth's 4.6 wt% sulfur — far above the CI value of 5.4 wt% but far above what a volatile-depleted Earth should have — is the "excess sulfur" problem: sulfur is too abundant to have been lost as a volatile and too siderophile to have stayed in the mantle.
:::
:::

::: exercise A sawtooth's amplitude {level=2}
The odd–Harkins amplitude is often quoted as a factor of 10 to 1000. Using the pairs Ca/Sc (1550), Ti/Sc (63), Fe/Mn (117), Ni/Cu (107), Rb/Sr (0.03) and Y/Zr (0.30), decide which pairs are clean tests of the rule and which are not.
::: solution
**Clean tests** are pairs of **adjacent** elements with similar nucleosynthetic origin: Ca/Sc (1550), Ti/Sc (63), Fe/Mn (117) and Ni/Cu (107) all show the even element enriched, and their amplitudes span the quoted range.

**Not clean** are Rb/Sr and Y/Zr. Rubidium ($Z = 37$) and strontium ($Z = 38$) are both odd–even but they are also **s-process** nuclides whose abundances are set by neutron-capture branching, not by the pairing term, and Rb is additionally a moderately volatile element depleted in the Earth. Yttrium ($Z = 39$) and zirconium ($Z = 40$) are both **refractory**, but zirconium is an $r$-process and $s$-process nuclide whose abundance is set by the neutron-magic shell at $N = 50$. The lesson is that the odd–Harkins rule is a **nuclear-structure** effect and it can only be read cleanly where the nucleosynthetic and volatility histories of the two elements are matched — which is why the rule is best seen in the light elements $6 \le Z \le 30$ and becomes a weak signal in the heavy elements.
:::
:::

::: exercise Crust, mantle and the orthogonal ratios {level=3 check="6.3"}
The primitive mantle has Rb 0.605 ppm and Sr 19.9 ppm; the upper continental crust has Rb 60 ppm and Sr 313 ppm. Find the Rb/Sr ratio of each and the fractionation factor between them, and explain why K/Rb (397 in the mantle, 418 in the crust) is essentially unfractionated.
::: solution
$$
\left(\frac{\mathrm{Rb}}{\mathrm{Sr}}\right)_{mantle} = \frac{0.605}{19.9} = 0.030, \qquad
\left(\frac{\mathrm{Rb}}{\mathrm{Sr}}\right)_{crust} = \frac{60}{313} = 0.192,
$$
so the crust is enriched in rubidium relative to strontium by a factor of
$$
\frac{0.192}{0.030} = 6.3 .
$$
This sixfold fractionation, integrated over the 4.5 Gyr of crust formation, is what makes the continental crust radiogenic in $^{87}$Sr and the depleted mantle unradiogenic, and it is the entire basis of the strontium isotope method in provenance analysis, in geochronology and in the study of seawater evolution.

The K/Rb ratio is **not** fractionated because potassium and rubidium are chemically almost identical: both are alkali cations, both are among the most incompatible elements in every mantle phase, and their partition coefficients differ by a factor of two or three rather than by the factor of ten or more that separates rubidium from strontium. A melt that takes rubidium 30 per cent more efficiently than potassium leaves the ratio of the two **invariant in the residue**, because both are essentially fully extracted. This is the general rule: **the ratio of two equally incompatible elements is a source tracer and the ratio of two unequally incompatible elements is a differentiation tracer** — which is why K/Rb, Zr/Nb, Sm/Nd, Al/Ti and $^{143}$Nd/$^{144}$Nd read the source, while Rb/Sr, Lu/Hf, Th/U and Re/Os read the melting.

The exception is that K/Rb is reset by any process that fractionates the alkalis themselves: evaporite and brine interaction, the breakdown of potassium feldspar at high grade, and the extreme fractional crystallisation of a pegmatite or a peralkaline melt, in which K/Rb falls below 100. A crustal sample with K/Rb of 400 has therefore been neither strongly altered nor strongly fractionated, and its Rb/Sr of 0.19 can be read as a primary differentiation signature.
:::
:::

::: exercise The late veneer {level=3 check="1.7"}
Iridium is so strongly siderophile that after core formation the mantle should contain essentially none of it, yet the primitive mantle contains 3.5 ppb Ir and CI chondrite contains 140 ppb. If all the mantle's iridium was added after core formation ceased, by a "late veneer" of chondritic material, find the veneer's mass as a per cent of the mantle and of the bulk Earth.
::: solution
Simple dilution gives
$$
f_{mantle} = \frac{3.5}{140} = 0.025 = 2.5\ \text{per cent of the mantle},
$$
and since the mantle is 67.5 per cent of the Earth,
$$
f_{Earth} = 0.025\times0.675 = 0.017 = 1.7\ \text{per cent of the bulk Earth}.
$$
A chondritic veneer of 1.7 per cent of the Earth's mass — $10^{23}$ kg, about the mass of a large asteroid multiplied by a hundred, delivered over a few hundred million years — would also deliver the mantle's entire budget of gold, platinum, palladium, rhodium, ruthenium, osmium and rhenium, and would supply the mantle's water, carbon and sulfur.

The published estimates are **0.5 to 1 per cent** of the bulk Earth rather than 1.7, and the difference comes from three places. The primitive-mantle iridium abundance is uncertain by a factor of two, because the HSE are extremely heterogeneous and the "primitive mantle" is a calculated composition. Not all of the veneer's iridium stays in the mantle — some is recycled into the core by the impact melts of the accretion itself, so the required veneer is larger, not smaller. And a fraction of the mantle's HSE may be **primordial**, retained because the last stages of core formation occurred at high pressure and temperature where the metal–silicate partition coefficients were far lower than at one atmosphere, in the "deep magma ocean" or "equilibration" model of Rubie, Frost, Wade, Wood, Halliday and Richeters (Halliday), in which case no veneer is needed at all.

The discriminating evidence is **isotopic**. Osmium isotope systematics distinguish a chondritic veneer from a residual primordial mantle, because the veneer would carry a chondritic $^{187}$Os/$^{188}$Os and a differentiated body would not, and the measured mantle values are chondritic to within a few per cent. The current consensus is a **late veneer of about 0.5 per cent of the Earth's mass, with a composition closer to a depleted, volatile-poor chondrite than to CI**, delivered before the end of accretion — but the debate between the veneer and the high-pressure-equilibration models is not closed, and it is one of the most active in cosmochemistry.
:::
:::