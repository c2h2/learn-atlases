Chemical thermodynamics is the part of geochemistry that tells you what **can** happen, and chemical kinetics is the part that tells you whether it will happen while you are watching. Almost every interesting geochemical statement — that diamond is metastable, that the ocean is undersaturated with respect to calcite in deep water, that a granite cannot melt at 600 °C, that a groundwater with a given iron ratio must have an Eh of 0.4 V — is a thermodynamic one, and almost every interesting geochemical **observation** — that feldspars weather at pH 5 a million times faster than at pH 7, that a metamorphic assemblage records a temperature to within 20 °C, that a rock is a million years out of equilibrium with the water in it — is a kinetic one.

## The energy of a reaction

::: definition Free energy, chemical potential and equilibrium {#def-free-energy}
For a system at constant temperature and pressure the criterion of spontaneous change is the **Gibbs free energy** $G = H - TS$, whose differential is
$$
dG = V\,dP - S\,dT + \sum_i \mu_i\,dn_i ,
$$
where $\mu_i = (\partial G/\partial n_i)_{T,P}$ is the **chemical potential**. For a reaction $\sum_i \nu_i A_i = 0$ the condition of equilibrium is $\sum_i \nu_i\mu_i = 0$, and writing $\mu_i = \mu_i^\circ + RT\ln a_i$ gives the fundamental working equation
$$
\Delta G = \Delta G^\circ + RT\ln Q, \qquad Q = \prod_i a_i^{\nu_i}, \qquad
\Delta G^\circ = -RT\ln K .
$$
At equilibrium $\Delta G = 0$ and $Q = K$. Two consequences dominate the subject. First, **$\Delta G^\circ$ is a number you can look up and $K$ is a number you can measure**, and the relation between them is the bridge between the thermochemical tables and the natural world. Second, the **temperature dependence** is given by the **van't Hoff equation**
$$
\frac{d\ln K}{dT} = \frac{\Delta H^\circ}{RT^2},
$$
so a reaction with a positive enthalpy of reaction has a $K$ that **increases** with temperature — which is why most silicate and oxide reactions become more favourable at mantle temperatures and why calcite dissolves more readily in cold water.
:::

::: definition Activity, fugacity and non-ideality {#def-activity}
The **activity** $a_i = \gamma_i X_i$ (or $\gamma_i m_i$ in solution) replaces the concentration in real systems, and the **activity coefficient** $\gamma_i$ measures the departure from ideality. In a **crystalline solid solution** the end-member activity is set by the site occupancy: for an ideal mixing phase, $a_i = X_i^{z}$ where $z$ is the number of atoms of the end member per formula unit and the mixing site. In olivine, $(\mathrm{Mg,Fe})_2\mathrm{SiO_4}$, magnesium and iron mix on one site, so
$$
a_{\mathrm{Fo}} = X_{\mathrm{Mg}}^2 , \qquad a_{\mathrm{Fa}} = X_{\mathrm{Fe}}^2 ,
$$
and a Fo$_{90}$ olivine has $a_{\mathrm{Fo}} = 0.9^2 = 0.81$, not 0.90. In **aqueous solution** the dominant source of non-ideality is electrostatic, and the **Debye–Hückel limiting law** gives
$$
\log\gamma_i = -0.509\,z_i^2\sqrt{I} \qquad (25\ ^\circ\mathrm{C}), \qquad
I = \tfrac12\sum_i m_i z_i^2 ,
$$
with $I$ the **ionic strength**. The law is valid only below $I \approx 0.01$ and the extended forms — the Davies equation, the specific-ion-interaction (SIT) model and the Pitzer formulation used in seawater and geothermal work — are needed above it. For a **gas** the activity is the **fugacity** $f$, defined by $\mu = \mu^\circ + RT\ln f$, and $f \approx P$ at the low pressures of the surface but departs from it strongly in the mantle. The **oxygen fugacity** $f_{\mathrm{O_2}}$ — usually quoted as $\log f_{\mathrm{O_2}}$ in bars — is the single most important intensive variable in igneous and metamorphic petrology after $P$ and $T$, because it fixes the valence state of Fe, Mn, Cr, Eu, Ce, S, N, C and U, and therefore the whole trace-element chemistry of a rock. It is buffered in nature by assemblages such as **iron–wüstite (IW)**, **fayalite–magnetite–quartz (QFM)**, **nickel–nickel oxide (NNO)**, **hematite–magnetite (HM)** and **rutile–ilmenite (FMQ)**, each of which fixes $\log f_{\mathrm{O_2}}$ at a value that depends only on $P$ and $T$.
:::

::: example From a free energy to an equilibrium {#ex-calcite}
For $\mathrm{CaCO_3\,(calcite)} = \mathrm{CaO\,(periclase)} + \mathrm{CO_2}$, $\Delta G^\circ_{298} = +130.8\ \mathrm{kJ\,mol^{-1}}$, $\Delta H^\circ_{298} = +178.3\ \mathrm{kJ\,mol^{-1}}$ and $\Delta S^\circ_{298} = +153\ \mathrm{J\,mol^{-1}\,K^{-1}}$. Find $K$ at 298 K, the equilibrium $P_{\mathrm{CO_2}}$ at 298 K, and the temperature at which calcite decomposes at $P_{\mathrm{CO_2}} = 1\ \mathrm{bar}$.
::: solution
$$
K_{298} = \exp\!\left(-\frac{130\,800}{8.314\times298.15}\right) = \exp(-52.8) = 1.2\times10^{-23}.
$$
Since the solids are pure phases with unit activity, $K = f_{\mathrm{CO_2}}$, so calcite is stable at any $P_{\mathrm{CO_2}}$ above $1.2\times10^{-23}$ bar — which is why it does not fall apart at the surface.

For the decomposition temperature, set $\Delta G^\circ = 0$ at $P_{\mathrm{CO_2}} = 1$ bar, so that $K = 1$ and
$$
T = \frac{\Delta H^\circ}{\Delta S^\circ} = \frac{178\,300}{153} = 1165\ \mathrm{K} = 892\ ^\circ\mathrm{C},
$$
neglecting the heat-capacity change. The measured value is 894–907 °C, so the $\Delta C_p = 0$ approximation is good to a few per cent over 900 K for this reaction — much better than for a reaction involving a gas and a melt.

The result is the reason that **limestone does not exist in a kiln** and the reason that **cement, lime mortar and the marine carbonate compensation depth all turn on the same equilibrium**. It is also the reason that the weathering of continental carbonate is a **carbon sink only in the presence of sulfuric or carbonic acid**: the reaction $\mathrm{CaCO_3 + CO_2 + H_2O} = \mathrm{Ca^{2+} + 2HCO_3^-}$ is the same equilibrium driven to the right by the atmospheric and soil $P_{\mathrm{CO_2}}$ of $10^{-3.5}$ and $10^{-1.5}$ bar respectively, and the two orders of magnitude between the two $P_{\mathrm{CO_2}}$ values, multiplied by the hundredfold greater solubility of carbon dioxide in soil water, is the whole of the terrestrial alkalinity cycle.
:::
:::

::: widget plot
f: exp(-7217*(1/(x+273.15)-1/298.15))
x: 0, 60
y: 0, 13
labels: \text{rate relative to 25}^\circ\text{C}
caption: The Arrhenius temperature dependence $k(T)/k(25^\circ\mathrm{C}) = \exp\left[-(E_a/R)(1/T - 1/298.15)\right]$ for an activation energy of $60\ \mathrm{kJ\,mol^{-1}}$, the value typical of feldspar and silicate-glass dissolution. A 20 °C rise increases the rate **5.7-fold** and a 60 °C rise 11-fold. The curve is the reason that a chemical-weathering rate measured in a tropical river cannot be applied to a subglacial or a polar catchment without correction, that the deep biosphere's metabolism is limited by temperature as well as by substrate, and that the interpretation of the "temperature dependence of chemical weathering" in the paleoclimate record is contested — because the field data give an apparent activation energy of 10–40 kJ/mol, far below the laboratory value, and the discrepancy is the signature of transport limitation, of a changing supply rate, and of the fact that a catchment is not a batch reactor.
:::

::: example The oxygen fugacity of a mantle source {#ex-fO2}
The mantle's oxygen fugacity is buffered near the **fayalite–magnetite–quartz (QFM)** buffer, and mid-ocean-ridge basalt sources lie about one log unit above it while arc magmas lie one to three log units above it. Given that the QFM buffer is the reaction
$$
3\,\mathrm{Fe_2SiO_4} + \mathrm{O_2} = 2\,\mathrm{Fe_3O_4} + 3\,\mathrm{SiO_2},
$$
explain why an assemblage of olivine + magnetite + quartz **fixes** the oxygen fugacity, why a peridotite whose olivine has Fo$_{91}$ is more oxidised than one whose olivine has Fo$_{80}$ at the same $P$ and $T$, and what happens to the Cr, Eu, Ce and sulfur systematics as the oxygen fugacity rises by three log units.
::: solution
The QFM reaction involves **four phases and one component too few for freedom at fixed $P$ and $T$**: with $P$ and $T$ fixed the assemblage fayalite + magnetite + quartz has $F = 0$ in the relevant subsystem, so the oxygen fugacity is a **dependent variable**, fixed by the equilibrium constant of the reaction. Adding olivine of a given forsterite content and orthopyroxene replaces fayalite with the equivalent statement, and the resulting **FMQ buffer** is the one actually used for mantle peridotite. The oxygen fugacity is therefore not something the mantle “has”; it is something the mineral assemblage **imposes**.

For the second question, write the buffer equilibrium constant as
$K = (a_{\mathrm{Mt}}^2 a_{Q}^3)/(a_{\mathrm{Fa}}^3 f_{\mathrm{O_2}})$ and solve for the fugacity:
$$
\log f_{\mathrm{O_2}} = \mathrm{const} - 3\log a_{\mathrm{Fa}} = \mathrm{const} - 6\log X_{\mathrm{Fe}} .
$$
An olivine with $X_{\mathrm{Fe}} = 0.09$ (Fo$_{91}$) and one with $X_{\mathrm{Fe}} = 0.20$ (Fo$_{80}$) therefore buffer oxygen fugacities differing by
$$
6\log\frac{0.20}{0.09} = 6\times0.347 = 2.1\ \text{log units},
$$
the **magnesium-rich** olivine buffering the **more oxidised** value. Oxidising a mantle residue converts Fe(II) in olivine to Fe(III) in magnetite, which is exactly what raises the forsterite content, so the two observations are the same observation. A refractory, melt-depleted, Fo$_{91}$ harzburgite is thus coexisting with a **more oxidised** fluid than a fertile Fo$_{88}$ peridotite at the same depth — a result that runs counter to the intuition that melting “reduces” the residue, and one of the reasons the mantle's oxygen fugacity is observed to **rise** with the degree of melting.

For the third question, three log units of oxidation changes the valence of four elements that matter:
**Chromium** goes from Cr(III), which is compatible in spinel and garnet, to Cr(VI) as chromate, which is incompatible and mobile; an oxidised arc magma therefore fails to fractionate chromium as strongly as a MORB.
**Europium** goes from Eu(3+) to Eu(2+), and Eu(2+) substitutes for Ca in plagioclase, so an oxidised magma develops a **positive europium anomaly** on plagioclase crystallisation and a reduced one does not — the europium anomaly is a redox barometer as much as a plagioclase barometer.
**Cerium** goes from Ce(3+) to Ce(4+), and Ce(4+) is insoluble and is left behind, so oxidised waters and oxidised magmas develop a **positive cerium anomaly** — the marine cerium anomaly being the classic record of the Proterozoic oxidation of the ocean.
**Sulfur** goes from sulfide S(2−), which is compatible in monosulfide solution and immiscible in a sulfide liquid, to sulfate S(6+), which is soluble in a hydrous melt; a magma's sulfur content and its capacity to exsolve an ore-forming sulfide liquid therefore both collapse as the oxygen fugacity rises, which is why the great Ni–Cu–PGE sulfide deposits are associated with **reduced** komatiites and tholeiites and not with arc andesites.

This is why a single intensive variable, measured from the valence of iron in a glass or from a mineral assemblage, organises the trace-element and the ore-genetic chemistry of an entire magma series.
:::
:::

## The phase rule and assemblages

::: definition The Gibbs phase rule {#def-phase-rule}
For a system of $C$ components and $P$ phases at equilibrium, the number of **degrees of freedom** — the number of intensive variables that may be changed without destroying a phase — is
$$
F = C - P + 2 .
$$
The rule is the reason a metamorphic petrologist counts minerals. In the one-component $\mathrm{Al_2SiO_5}$ system, three aluminosilicate polymorphs (andalusite, kyanite, sillimanite) can coexist at $P = 3$, giving $F = 0$: an **invariant point** at 500 MPa and 500 °C, whose location is a fixed point on the pressure–temperature grid. A rock containing **only kyanite** has $P = 1$ and $F = 2$, so its $P$ and $T$ are unconstrained; a rock with **kyanite + sillimanite + quartz + muscovite + biotite + garnet + plagioclase + liquid** in a five-component NATSH system has $F = 5 - 8 + 2 = -1$, which is impossible — and the resolution is that the system is not at equilibrium, or that the components are not independent, or that the "assemblage" includes a phase that is not in equilibrium with the rest. This is the actual daily use of the phase rule: **a rock whose mineral count exceeds $C + 2$ is a rock that is not equilibrated**, and the petrologist's job is to find which phase is the intruder.
:::

::: example Counting phases {#ex-phase-rule}
(a) How many phases may coexist in the dry $\mathrm{NaAlSi_3O_8}$–$\mathrm{CaAl_2Si_2O_8}$ binary at a fixed pressure? (b) A metapelite contains quartz, muscovite, biotite, garnet, staurolite, kyanite and plagioclase. Taking $C = 5$ ($\mathrm{Na_2O}$–$\mathrm{K_2O}$–$\mathrm{FeO}$–$\mathrm{MgO}$–$\mathrm{Al_2O_3}$, with $\mathrm{H_2O}$ in excess), find $F$ and interpret. (c) A gneiss of the same bulk composition contains the same seven phases plus a feldspar-free leucosome. Find $F$.
::: solution
(a) $C = 2$; at fixed pressure the "+2" becomes "+1", so $F = 3 - P$. Maximum $P$ at $F = 0$ is $P = 3$: **three phases** — for example plagioclase solid solution, liquid, and one more — may coexist at a fixed pressure, and this is the familiar two-phase crystallisation interval of a binary eutectic system.

(b) $P = 7$, $C = 5$, so
$$
F = 5 - 7 + 2 = 0 .
$$
The assemblage is **invariant**: its pressure and temperature are **fixed** by the assemblage itself, and the seven minerals' compositions are all fixed. Such a rock is a **geobarometer and geothermometer of the highest order**, and the standard calibration is to check that the measured garnet–biotite Fe–Mg exchange temperature, the GASP pressure and the observed isogradic position all agree. If they do not, one of the phases is relict.

(c) Adding a silicate liquid makes $P = 8$ and
$$
F = 5 - 8 + 2 = -1 .
$$
An invariant assemblage cannot be over-phase. The interpretation is that **one of the eight is not in equilibrium** — and in a migmatite the usual culprits are the staurolite and the kyanite, both of which break down at the muscovite-incongruent-melting reaction and survive as **relict porphyroblasts** in a rock whose matrix has melted. The phase rule thus tells you, without any analysis, that the thin section contains a **textural problem**, and the petrographic task is to find the reaction rims, the inclusion trails and the embayments that prove which phase is the intruder.
:::
:::

## Kinetics: how fast, and how far

::: definition Rate laws and transition-state theory {#def-kinetics}
A rate law for a dissolution or precipitation reaction has the transition-state-theory form
$$
r = k\,A\,a_{\mathrm{H}^+}^{-m}\left[1 - \left(\frac{\mathrm{IAP}}{K}\right)^{1/n}\right], \qquad
k = k^\circ \exp\!\left(-\frac{E_a}{RT}\right),
$$
where $A$ is the reactive surface area, IAP is the **ion activity product**, $K$ the thermodynamic equilibrium constant, and the bracketed term — the **affinity term** — makes the rate fall to zero at equilibrium. The rate constant follows the **Arrhenius law** with an activation energy $E_a$ of 10–80 kJ/mol for surface-controlled reactions, and the **pH dependence** of a silicate's dissolution rate is a **V-shaped curve**: fast in strong acid (proton-promoted, $r \propto a_{\mathrm{H^+}}^{-m}$ with $m \approx 0.5$–1), minimum at pH 5–8 (water-promoted, pH-independent), and fast again in strong base (hydroxyl-promoted, $r \propto a_{\mathrm{OH^-}}^{n}$ with $n \approx 0.5$–1). The minimum is typically **two to six orders of magnitude** below the maxima, which is the largest kinetic contrast in geochemistry and the reason that acid rain and lateritic weathering do the chemical work of the continents.
:::

::: example Saturation state and activity {#ex-saturation}
A river water contains $[\mathrm{Ca^{2+}}] = 2.5\times10^{-3}$ and $[\mathrm{SO_4^{2-}}] = 1.2\times10^{-3}\ \mathrm{mol\,kg^{-1}}$ at 25 °C with an ionic strength of 0.010. Find the activity coefficients, the ion activity product and the saturation index for gypsum ($\log K_{sp} = -4.62$). Then repeat for seawater, $I = 0.72$, $[\mathrm{Ca^{2+}}] = 10.3$, $[\mathrm{SO_4^{2-}}] = 28.2\ \mathrm{mmol\,kg^{-1}}$, using the extended-law value $\gamma_{\mathrm{Ca}} = 0.28$, $\gamma_{\mathrm{SO_4}} = 0.20$.
::: solution
The Debye–Hückel limiting law gives, for a divalent ion at $I = 0.010$,
$$
\log\gamma = -0.509\times4\times\sqrt{0.010} = -0.204, \qquad
\gamma_{\mathrm{Ca}} = \gamma_{\mathrm{SO_4}} = 0.63 ,
$$
so
$$
\mathrm{IAP} = (2.5\times10^{-3}\times0.63)(1.2\times10^{-3}\times0.63) = 1.2\times10^{-6},
$$
$$
\mathrm{SI} = \log\mathrm{IAP} - \log K_{sp} = -5.93 + 4.62 = -1.31 .
$$
The river is **1.3 log units undersaturated** with respect to gypsum, which is why gypsum does not precipitate in a river and why an evaporite basin requires the concentration of roughly a factor of five in each ion before the salt begins to settle.

For seawater,
$$
\mathrm{IAP} = (0.0103\times0.28)(0.0282\times0.20) = 2.88\times10^{-3}\times5.64\times10^{-3} = 1.63\times10^{-5},
$$
$$
\mathrm{SI} = \log(1.63\times10^{-5}) + 4.62 = -4.79 + 4.62 = -0.17 .
$$
Seawater is **very nearly saturated** with respect to gypsum — within 0.2 log units — which is why the precipitation of gypsum in a restricted lagoon, a sabkha or a deep-sea brine pool requires only a small increase in salinity, and why the order of evaporite deposition (carbonate, then gypsum, then halite) is so sharp and so predictable.

The comparison also exposes the **failure of the limiting law at high ionic strength**: the limiting law predicts $\gamma_{\mathrm{Ca}} = 0.019$ in seawater, whereas the measured value is 0.28 — the prediction is fifteen times too low. The reason is that the limiting law assumes a point-charge ion in a continuum solvent, and at $I = 0.72$ the ion-size parameter, the ion pairs ($\mathrm{CaSO_4^0}$, $\mathrm{MgSO_4^0}$) and the hydration-shell structure all matter. Any seawater or brine calculation done with the limiting law is wrong by an order of magnitude, and the correct tools are the **Pitzer** or **SIT** formulations.
:::
:::

::: warning Equilibrium is the exception, not the rule
Thermodynamics tells you where a system is going; it says nothing about how far it gets in the time available, and **most natural systems are nowhere near equilibrium**. Five everyday examples. **Atmospheric oxygen** is a million-billion-fold supersaturated with respect to the reduced surface, and it persists only because the oxidation of organic matter and of iron has an activation barrier; on the early Earth, oxygen was absent for 2.5 Gyr for the same reason. **Diamond** is metastable at the surface by 2.9 kJ/mol and survives because the graphitisation rate at 25 °C is immeasurably slow. **K-feldspar in a river** is supersaturated with respect to kaolinite by many orders of magnitude and is nevertheless carried in suspension, because the aluminosilicate dissolution rate at pH 7 and 10 °C is $10^{-17}\ \mathrm{mol\,m^{-2}\,s^{-1}}$. **Garnet–biotite thermometry** works because the Fe–Mg exchange closes at about 300–400 °C and the assemblage then records the closure temperature rather than the peak — a fact that is a feature for thermobarometry and a trap for the unwary. **And a groundwater sampled from a deep aquifer** may have been out of contact with the atmosphere for a million years, with a $\delta^{14}$C of zero and an Eh set by Fe(III) reduction or by methanogenesis rather than by anything at the surface. The practical discipline is to state, for every equilibrium calculation, **which assemblage is assumed to have equilibrated, over what time, and by what mechanism** — because a calculated saturation index of $-0.2$ may mean "at equilibrium within the analytical error" or "out of equilibrium by a factor of 1.6 in a million years", and the two readings have opposite implications.
:::

::: history
The **first and second laws** were formulated by Mayer, Joule, Helmholtz and Clausius (Clausius) in the 1840s and 1850s, and **Gibbs** (Gibbs) supplied the free energy, the chemical potential and the phase rule in his 1876–1878 *Transactions of the Connecticut Academy* essays — the papers in which physical chemistry was, in effect, created. **van 't Hoff** (Hoff) gave the temperature dependence of the equilibrium constant and the theory of dilute solutions in 1884–1887, and **Nernst** (Nernst) the third law and the heat theorem in 1906. **Arrhenius** (Arrhenius) gave the rate law in 1889 in a paper on the inversion of sucrose, and **Eyring** (Eyring) and **Evans and Polanyi** (Polanyi) the transition-state theory of 1935. **Debye and Hückel** (Hückel) gave the theory of ionic activity in 1923, **Guggenheim** (Guggenheim), **Scatchard** (Scatchard) and **Pitzer** (Pitzer) the extensions, and **Helgeson, Delany, Nesbitt and Bird** (Helgeson) the high-temperature SUPCRT formulations of the 1970s. **Ellingham** (Ellingham) published his oxide-formation diagram in 1944, and **Eugster** (Eugster) and **Frost** (Frost) and the **Brenan, McCammon and Wood** school established the oxygen-fugacity buffers and their application to igneous rocks between 1957 and the 1990s. **Garrels and Christ** (Garrels) in their 1965 *Solutions, Minerals and Equilibria*, **Helgeson** (Helgeson) in his 1968 series on chemical kinetics of rock weathering, **Lasaga** (Lasaga) in his 1981 and 1998 treatments, **Nagy, Lasaga and Rimstidt** (Rimstidt) in the 1990s, and **White, Blum, Bull, Chadwick, Drever, Velbel and the LTER Critical Zone Observatory** school made the field quantitative. The **transition-state-theory rate laws** for feldspars are the work of **Lasaga, Blum, Stillings, Nagy, Lasaga and Murphy** (Murphy) and of **Blum and Stillings** (Blum) in 1995.
:::

## Where this leads

The aqueous speciation that follows from the activity formalism is in [[geochemistry/aqueous-geochemistry]], the weathering rate laws are applied in [[geochemistry/weathering-chemistry]] and [[geomorphology/weathering]], the phase equilibria of melts are in [[mineralogy-petrology/phase-diagrams]] and [[mineralogy-petrology/magma-evolution]], the isotope fractionation factors are equilibrium constants of a kind and are in [[geochemistry/stable-isotopes]], the geothermobarometry is in [[mineralogy-petrology/pt-paths]], and the redox controls on the ocean and atmosphere are in [[geochemistry/isotopes-water-carbon]] and [[biogeochemistry/oxygen]].

::: quiz
A metamorphic rock contains more phases than $C + 2$. What does the phase rule tell you?
- [ ] The system is at a higher pressure than assumed.
- [x] The assemblage cannot be fully equilibrated — at least one phase is relict or a reaction has not gone to completion.
- [ ] The number of components must be reduced.
- [ ] The rock must contain water.
::: solution
$F = C - P + 2$ cannot be negative for a system at equilibrium, so an assemblage with $P > C + 2$ is **proof that the rock is not a single equilibrium assemblage**. The usual causes are a relict porphyroblast surviving a reaction, a reaction that has not gone to completion because of slow diffusion, or a mineral that grew during an earlier stage. The number of components can also be over-counted if two "components" are actually buffered by a phase present, but the first thing to look for in the thin section is the reaction rim, the inclusion trail or the embayment.
:::
:::

::: summary
- $\Delta G = \Delta G^\circ + RT\ln Q$ and $\Delta G^\circ = -RT\ln K$ connect the thermochemical tables to the natural world; the van't Hoff equation gives the temperature dependence.
- Activities, not concentrations, enter the equilibrium constant; the activity coefficient of a divalent ion in seawater is 0.28, not the 0.019 the limiting law predicts.
- The oxygen fugacity is as important a variable as pressure and temperature, because it fixes the valence of Fe, Mn, Cr, Eu, Ce, S, C and U.
- The phase rule $F = C - P + 2$ is a daily tool: an assemblage with more than $C + 2$ phases is not equilibrated.
- Rates follow Arrhenius with $E_a$ of 10–80 kJ/mol and a V-shaped pH dependence spanning six orders of magnitude.
- Most natural systems are far from equilibrium, and every equilibrium calculation must state which assemblage equilibrated, when, and how.
:::

## Exercises

::: exercise Equilibrium constant {level=1 check="23"}
For a reaction with $\Delta G^\circ_{298} = +130.8\ \mathrm{kJ\,mol^{-1}}$, find $-\log K$ at 298 K.
::: solution
$K = \exp[-130\,800/(8.314\times298.15)] = \exp(-52.8) = 1.2\times10^{-23}$. A strongly positive free energy means a vanishingly small equilibrium constant, which is why the reaction runs essentially completely to the left at 298 K.
:::
:::

::: exercise Phase rule {level=1 check="0"}
How many degrees of freedom does a rock with 5 components and 7 coexisting phases have?
::: solution
$F = 5 - 7 + 2 = 0$. The assemblage is **invariant**, so its pressure and temperature are fixed by the assemblage itself, and every phase composition is fixed.
:::
:::

::: exercise Activity coefficient {level=1 check="0.69"}
Find the Debye–Hückel limiting-law activity coefficient of Na$^+$ at $I = 0.10$ and 25 °C.
::: solution
$\log\gamma = -0.509\times1\times\sqrt{0.10} = -0.161$, so $\gamma = 0.69$. The activity is 69 per cent of the concentration — a 30 per cent error if ideality is assumed, and the error grows as $z^2$, so a trivalent ion at the same ionic strength has $\gamma = 0.036$.
:::
:::

::: exercise Olivine activity {level=1 check="0.64"}
Find the forsterite activity of a Fo$_{80}$ olivine assuming ideal mixing on the M2 and M1 sites.
::: solution
Magnesium and iron mix on **two** equivalent sites per formula unit, so $a_{\mathrm{Fo}} = X_{\mathrm{Mg}}^2 = 0.80^2 = 0.64$. The activity is 20 per cent below the mole fraction, which matters in every olivine–melt Mg–Fe exchange thermometer and in the calculation of the oxygen fugacity from an olivine–orthopyroxene assemblage.
:::
:::

::: exercise Temperature dependence {level=2 check="5.7"}
A silicate dissolution rate constant has $E_a = 60\ \mathrm{kJ\,mol^{-1}}$. By what factor does the rate increase from 5 to 25 °C?
::: solution
$$
\frac{k_{25}}{k_5} = \exp\left[-\frac{60\,000}{8.314}\left(\frac{1}{298.15}-\frac{1}{278.15}\right)\right] = \exp(1.74) = 5.7 .
$$
A 20 °C rise multiplies the rate by 5.7, and this is the origin of the "temperature factor" in weathering models. The apparent activation energy measured in catchments, 10–40 kJ/mol, is lower because supply, not surface reaction, limits many field sites.
:::
:::

::: exercise Nernst {level=2 check="0.42"}
For $\mathrm{Fe^{3+} + e^-} = \mathrm{Fe^{2+}}$ with $E^{\circ\prime} = +0.77\ \mathrm{V}$ at pH 0, find the Eh of a solution with $[\mathrm{Fe^{2+}}]/[\mathrm{Fe^{3+}}] = 10^{6}$ at 25 °C.
::: solution
$$
Eh = E^{\circ\prime} - \frac{0.059}{1}\log\frac{[\mathrm{Fe^{2+}}]}{[\mathrm{Fe^{3+}}]} = 0.77 - 0.059\times6 = 0.77 - 0.35 = 0.42\ \mathrm{V}.
$$
A strongly reduced iron population corresponds to an Eh of 0.42 V, which is at the upper end of the **iron-reducing** field and just below the nitrate-reducing field. The same arithmetic underlies every Eh–pH diagram and every groundwater redox classification.
:::
:::

::: exercise Saturation index {level=2 check="-0.17"}
Seawater has $[\mathrm{Ca^{2+}}] = 10.3$ and $[\mathrm{SO_4^{2-}}] = 28.2\ \mathrm{mmol\,kg^{-1}}$, with $\gamma_{\mathrm{Ca}} = 0.28$ and $\gamma_{\mathrm{SO_4}} = 0.20$. Find the saturation index for gypsum ($\log K_{sp} = -4.62$).
::: solution
$$
\mathrm{IAP} = (0.0103\times0.28)(0.0282\times0.20) = 2.88\times10^{-3}\times5.64\times10^{-3} = 1.63\times10^{-5},
$$
$$
\mathrm{SI} = \log(1.63\times10^{-5}) - (-4.62) = -4.79 + 4.62 = -0.17 .
$$
Seawater is within a factor of 1.5 of gypsum saturation, which is why a modest concentration in a restricted basin or a sabkha precipitates gypsum immediately, and why the carbonate–sulfate–halite evaporite sequence is so sharp.
:::
:::

::: exercise A van't Hoff calculation {level=3 check="8.7"}
The equilibrium constant for a mineral reaction is $K = 10^{-4.0}$ at 500 K and $K = 10^{-2.4}$ at 700 K. Estimate $\Delta H^\circ$ and predict $K$ at 600 K.
::: solution
The integrated van't Hoff equation,
$$
\ln\frac{K_2}{K_1} = -\frac{\Delta H^\circ}{R}\left(\frac{1}{T_2}-\frac{1}{T_1}\right),
$$
gives
$$
\ln\frac{10^{-2.4}}{10^{-4.0}} = 1.6\ln 10 = 3.684, \qquad
\frac{1}{700}-\frac{1}{500} = -5.714\times10^{-4}\ \mathrm{K^{-1}},
$$
$$
\Delta H^\circ = \frac{3.684\times8.314}{5.714\times10^{-4}}
   = 5.4\times10^{4}\ \mathrm{J\,mol^{-1}} = 54\ \mathrm{kJ\,mol^{-1}} .
$$
At 600 K,
$$
\log K = -4.0 + \frac{54\,000}{2.303\times8.314}\left(\frac{1}{500}-\frac{1}{600}\right)
       = -4.0 + 2817\times3.333\times10^{-4} = -3.06,
$$
so $K = 8.7\times10^{-4}$ — a factor of **8.7** larger than at 500 K.

The reaction is **endothermic** ($\Delta H^\circ > 0$), so $K$ rises with temperature, and the magnitude — 54 kJ/mol — is typical of a decarbonation or a dehydration reaction. The uncertainty is set by the assumption that $\Delta H^\circ$ is constant over 200 K; with a nonzero $\Delta C_p$ the true curve is convex, and the interpolated value at 600 K may be in error by 20–30 per cent. Two points are never enough for a geothermometer, which is why calibrations use many brackets.
:::
:::

::: exercise A kinetic reality check {level=3 check="3.7"}
K-feldspar dissolves at $10^{-17}\ \mathrm{mol\,m^{-2}\,s^{-1}}$ at pH 7 and 25 °C. A soil contains sand-sized feldspar grains of 250 µm diameter at a number concentration of $10^{6}$ grains per cubic metre of soil. Find the time to dissolve a grain completely, taking a feldspar density of $2600\ \mathrm{kg\,m^{-3}}$ and a molar mass of $278\ \mathrm{g\,mol^{-1}}$.
::: solution
The molar volume is $278/2600 = 0.107\ \mathrm{L\,mol^{-1}} = 1.07\times10^{-4}\ \mathrm{m^3\,mol^{-1}}$, so the dissolution **advance rate** is
$$
v = 10^{-17}\times1.07\times10^{-4} = 1.07\times10^{-21}\ \mathrm{m\,s^{-1}} = 3.4\times10^{-14}\ \mathrm{m\,yr^{-1}} .
$$
A grain radius of $125\ \mu\mathrm{m} = 1.25\times10^{-4}\ \mathrm{m}$ is therefore consumed in
$$
\frac{1.25\times10^{-4}}{3.4\times10^{-14}} = 3.7\times10^{9}\ \mathrm{yr},
$$
longer than the age of the Earth.

The result is not a paradox but the central problem of chemical weathering, and its resolution is the whole of low-temperature geochemistry. At the **far-from-equilibrium, neutral-pH, single-crystal laboratory rate**, a sand grain of feldspar is effectively **immortal**, and yet feldspars do weather to kaolinite in thousands of years. The laboratory rate is measured on a **polished, defect-free, clean** crystal surface in a **stirred** reactor, whereas a natural grain is **etched, fractured, dislocation-rich, coated with organic ligands and microbial films, and permeated by aqueous fluid along grain boundaries and defects**. The effective reactive surface area of a natural feldspar is 100–1000 times the geometric BET area, and the **surface-normalised** rate on the reactive sites is 10–100 times the geometric rate. Together these effects account for a factor of $10^3$–$10^5$, and the remaining discrepancy is closed by the fact that a soil grain is not dissolving at pH 7 but at the pH 4–5 of a soil solution with $10^{-2}$ atm of $\mathrm{CO_2}$, where the rate is 100–1000 times higher.

The honest statement is that the **laboratory-to-field rate discrepancy is a factor of $10^2$–$10^6$ and is not fully resolved**, that it is largest for the aluminosilicates and smallest for carbonates and evaporites, and that any weathering model calibrated on laboratory rate laws must be tuned to the field — which is why the modern approach is to measure the **catchment-averaged** rate from the dissolved and clastic fluxes and to use the laboratory laws as a **framework** rather than as a predictor.
:::
:::
