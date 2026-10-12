Water is a solvent of extraordinary power for reasons that reduce to one number: its dielectric constant of 78 at 25 °C, which weakens the electrostatic force between two ions in solution by a factor of seventy-eight relative to a vacuum. That single property is why the ocean is salty, why the continental crust is leached of its alkalis, why ore metals move in hydrothermal fluid and precipitate when the fluid boils or cools, and why the pH of a soil solution controls the chemistry of every solid in the soil. Aqueous geochemistry is the study of what water does to rock, and it is done with four tools: the activity formalism, speciation, the solubility product, and the redox balance.

## Ions in water

::: definition Hydration, ionic strength and activity {#def-ionic-strength}
An ion in water is not a bare charge but a **hydrated** one: a primary shell of 4–6 water molecules bound at 100–1000 kJ/mol for a small highly charged cation, and a diffuse secondary atmosphere of counter-charge. The **ionic strength**
$$
I = \tfrac12\sum_i m_i z_i^2
$$
measures the total charge density of the solution, and the **activity coefficient** of an ion follows the **Debye–Hückel limiting law**
$$
\log\gamma_i = -0.509\,z_i^2\sqrt{I} \qquad (25\ ^\circ\mathrm{C})
$$
below $I \approx 0.01$, the **Davies** or **extended Debye–Hückel** form
$$
\log\gamma_i = \frac{-0.509\,z_i^2\sqrt{I}}{1+1.5\sqrt{I}} + 0.25\,I
$$
to $I \approx 0.5$, and the **Pitzer** or **specific-ion-interaction (SIT)** formulations above it. Two consequences dominate natural water. The activity coefficient scales as $z^2$, so a **trivalent or tetravalent ion is far more non-ideal** than sodium: at seawater's $I = 0.72$, $\gamma_{\mathrm{Na}} \approx 0.68$ but $\gamma_{\mathrm{REE^{3+}}} < 0.01$. And **ion pairs** form: in seawater 40 per cent of the calcium is present as $\mathrm{CaSO_4^0}$ and $\mathrm{CaCO_3^0}$, 90 per cent of the magnesium as $\mathrm{MgSO_4^0}$, and the "free" ion concentrations used in a solubility calculation are 60–90 per cent of the analytical ones. Any saturation state computed from analytical concentrations rather than free-ion activities is wrong by a factor of two or more.
:::

::: example Speciation and charge balance in a river {#ex-charge-balance}
A river water analyses as (mmol/L): Ca 1.20, Mg 0.45, Na 0.35, K 0.08, HCO$_3^-$ 2.55, SO$_4^{2-}$ 0.45, Cl$^-$ 0.18. Find the cation and anion sums in milliequivalents, the charge-balance error, and the dominant species of dissolved inorganic carbon at the water's pH of 7.4.
::: solution
Multiplying each concentration by its charge,
$$
\begin{aligned}
\Sigma\mathrm{cations} &= 2(1.20) + 2(0.45) + 0.35 + 0.08 = 3.73\ \mathrm{meq\,L^{-1}},\\
\Sigma\mathrm{anions} &= 2.55 + 2(0.45) + 0.18 = 3.63\ \mathrm{meq\,L^{-1}},
\end{aligned}
$$
$$
\mathrm{CBE} = \frac{\Sigma\mathrm{cations} - \Sigma\mathrm{anions}}{\Sigma\mathrm{cations} + \Sigma\mathrm{anions}} = \frac{0.10}{7.36} = 1.4\ \text{per cent}.
$$
A charge-balance error below 5 per cent is the universal quality criterion for a water analysis; above 10 per cent the analysis is unusable and the usual culprits are an unmeasured silica or nitrate, an ammonium that was never analysed, a pH that drifted between sampling and alkalinity titration, or a bicarbonate titrated after the sample had degassed.

For the carbon speciation at pH 7.4, with $\mathrm{p}K_1 = 6.35$ and $\mathrm{p}K_2 = 10.33$,
$$
\frac{[\mathrm{HCO_3^-}]}{[\mathrm{CO_2^*}]} = \frac{K_1}{a_{\mathrm{H^+}}} = 10^{7.4-6.35} = 11.2, \qquad
\frac{[\mathrm{CO_3^{2-}}]}{[\mathrm{HCO_3^-}]} = \frac{K_2}{a_{\mathrm{H^+}}} = 10^{7.4-10.33} = 8.5\times10^{-3}.
$$
The water is **91 per cent bicarbonate, 8 per cent dissolved carbon dioxide and 0.8 per cent carbonate**. The carbonate fraction matters out of all proportion to its size, because it is the carbonate ion that enters the solubility product of calcite and the ion-pair $\mathrm{CaCO_3^0}$.

The general rule for the pH of a natural water follows: a water whose alkalinity is set by carbonate weathering and whose $P_{\mathrm{CO_2}}$ is near atmospheric sits at **pH 7–8.5**, a soil solution at $P_{\mathrm{CO_2}}$ of $10^{-1.5}$ atm sits at **pH 5–6.5**, and only a water with a strong acid anion excess (mine drainage, acid sulfate soil, a geothermal H$_2$S fluid) goes below pH 4.
:::
:::

## Carbonate: the reaction that runs the surface

::: definition The open-system dissolution of calcite {#def-calcite}
The dissolution of limestone in a water open to a gas of fixed $P_{\mathrm{CO_2}}$ is the reaction
$$
\mathrm{CaCO_3\,(calcite)} + \mathrm{CO_2\,(g)} + \mathrm{H_2O} = \mathrm{Ca^{2+}} + 2\,\mathrm{HCO_3^-},
\qquad \log K_{298} = -5.97,
$$
obtained by adding the calcite solubility product ($\log K_{sp} = -8.48$), the hydration of carbon dioxide and the first dissociation ($\log K = -7.82$) and subtracting the second dissociation ($\log K_2 = -10.33$). With the electroneutrality condition $2[\mathrm{Ca^{2+}}] = [\mathrm{HCO_3^-}]$ the solution is
$$
[\mathrm{Ca^{2+}}] = \left(\frac{K\,P_{\mathrm{CO_2}}}{4}\right)^{1/3},
$$
so the calcium of a limestone groundwater goes as the **cube root** of the carbon-dioxide pressure: a hundredfold rise in $P_{\mathrm{CO_2}}$ from the atmosphere to a soil raises the dissolved calcium by only $100^{1/3} = 4.6$ times. The **cube-root law** is the reason that karst groundwater is only a few millimolar despite a soil carbon-dioxide pressure a hundred times atmospheric, and the reason that the speleothem record is a **compressed** record of the soil climate.
:::

::: example Soil carbon dioxide and hard water {#ex-hardwater}
Find the pH and the calcium content of waters in equilibrium with calcite at 25 °C under (a) atmospheric $P_{\mathrm{CO_2}} = 10^{-3.5}$ atm and (b) a soil air of $P_{\mathrm{CO_2}} = 10^{-1.5}$ atm. Then find the calcium at $P_{\mathrm{CO_2}} = 10^{-2}$ atm and explain the observed chemistry of a cave drip water.
::: solution
Solving the four carbonate equilibria together with electroneutrality and the solubility product gives
$$
\begin{array}{l|ccc}
P_{\mathrm{CO_2}}\ \mathrm{(atm)} & 10^{-3.5} & 10^{-2} & 10^{-1.5} \\ \hline
\mathrm{pH} & 8.26 & 7.26 & 6.93 \\
[\mathrm{Ca^{2+}}]\ \mathrm{(mmol\,L^{-1})} & 0.44 & 1.39 & 2.04
\end{array}
$$
The cube-root law gives the same calcium values to within a few per cent: $(10^{-5.97}\times10^{-3.5}/4)^{1/3} = 4.4\times10^{-4}\ \mathrm{M}$.

A **cave drip water** is the natural experiment. Rain equilibrates with soil air at $P_{\mathrm{CO_2}}$ of $10^{-2}$ to $10^{-1.5}$ atm and dissolves calcite to 1.4–2.0 mmol of calcium on its way down through the epikarst. When it enters an air-filled cave passage, where the $P_{\mathrm{CO_2}}$ is close to atmospheric, the water is suddenly **supersaturated** with respect to calcite by a factor of
$$
\frac{2.04}{0.44} = 4.6 \quad\text{in calcium, or}\quad 4.6^2 = 21\ \text{in the ion activity product},
$$
and it degasses carbon dioxide and precipitates a flowstone, a stalactite or a stalagmite. The **kinetics of the degassing reaction**, not the thermodynamics, controls where in the cave the calcite is deposited — at the points of thinnest film and fastest flow, which is why stalagmites grow under drips and flowstone grows on sloping floors.

The same chemistry, run in reverse and at a global scale, is the **silicate–carbonate feedback** that regulates the climate: weathering consumes atmospheric carbon dioxide, the alkalinity reaches the ocean, and the carbonate organisms precipitate it back to the seafloor. The rate-limiting step is the supply of carbonic acid to fresh mineral surface, which is why the flux is set by **runoff, by bioturbation and by the depth of the soil**, and why the uplift of a range accelerates the drawdown.
:::
:::

::: widget plot
f: exp((-15.132+2.302585*x)/3)
x: -4, -0.5
y: 0, 0.005
labels: \text{calcium}
caption: The calcium content of a water in equilibrium with calcite at 25 °C as a function of $\log P_{\mathrm{CO_2}}$, from the cube-root law $[\mathrm{Ca}] = (KP_{\mathrm{CO_2}}/4)^{1/3}$. The curve spans the whole natural range: from the ocean's deep-water value at $\log P_{\mathrm{CO_2}} = -3.5$ through the soil and cave values to the extreme values reached in a $\mathrm{CO_2}$-rich magmatic or geothermal gas. The **shallowness of the curve** — a factor of 100 in gas pressure gives a factor of 4.6 in calcium — is the reason that karst waters are only mildly saline and that the weathering flux is limited more by **water delivery and by rock exposure** than by the acidity of the water.
:::

::: example Why unpolluted rain is pH 5.6 and acid rain is pH 4.4 {#ex-rain}
Find the pH of pure water in equilibrium with atmospheric carbon dioxide at $P_{\mathrm{CO_2}} = 10^{-3.5}$ atm, and then the pH of the same water containing 2, 5, 10 and 20 $\mu\mathrm{mol\,kg^{-1}}$ of sulfuric acid.
::: solution
With no strong acid, electroneutrality requires $[\mathrm{H^+}] = [\mathrm{HCO_3^-}]$, so
$$
[\mathrm{H^+}]^2 = K_1 K_H P_{\mathrm{CO_2}} = 10^{-6.35}\times10^{-1.47}\times10^{-3.5} = 10^{-11.32},
\qquad \mathrm{pH} = 5.66 .
$$
This is the **natural acidity of rain**, and it is not pollution: the "clean rain is pH 7" idea is wrong by 1.3 pH units, which is a factor of twenty in hydrogen-ion concentration.

With a strong acid of analytical concentration $C_A$ (supplying $2C_A$ equivalents), electroneutrality becomes
$$
[\mathrm{H^+}] = \frac{K_1K_KP_{\mathrm{CO_2}}}{[\mathrm{H^+}]} + \frac{K_w}{[\mathrm{H^+}]} + 2C_A ,
$$
a quadratic with the solutions
$$
\begin{array}{c|ccccc}
C_{\mathrm{H_2SO_4}}\ (\mu\mathrm{mol\,kg^{-1}}) & 0 & 2 & 5 & 10 & 20 \\ \hline
\mathrm{pH} & 5.66 & 5.30 & 4.98 & 4.69 & 4.40 \\
[\mathrm{HCO_3^-}]\ (\mu\mathrm{mol\,kg^{-1}}) & 2.19 & 0.96 & 0.46 & 0.24 & 0.12
\end{array}
$$
The **carbonate buffer holds the pH until it is used up**: the first 2 $\mu$mol of acid buys only 0.36 pH units, because the bicarbonate that the water's own carbon dioxide produced is neutralised before the hydrogen ion can accumulate. Only when the bicarbonate has fallen below about 0.5 $\mu$mol does the pH run away, and the curve from 5 to 10 $\mu$mol is nearly linear in pH because beyond that point the water has no buffer left and behaves as a pure strong acid.

Three consequences follow. **Rain at pH 4.4 contains only 20 $\mu$mol of sulfate per kilogram** — a mass concentration of 2 mg/L, which is why acid deposition is a **low-concentration, high-volume** problem and why it cannot be fixed by treating point sources of the water itself but only by cutting the emission of the precursor. **The buffering capacity of rain depends on the ammonia and the sea-salt it also contains**, and a rain with 20 $\mu$mol of sulfate and 40 $\mu$mol of ammonium is not acidic at all, because the ammonium is a base; this is why the sulphate-to-nitrate-plus-ammonium **equivalent ratio**, not the sulphate alone, predicts the pH. **And the same arithmetic explains why acid rain acidifies a granite catchment but not a limestone one**: a catchment with calcite has an infinite buffer at the scale of rainfall acidity, whereas a base-poor podzol has only its exchange complex, which is exhausted over decades.
:::
:::

## Solubility and redox

::: definition Gases, solids and the saturation state {#def-solubility}
A gas dissolves to a concentration set by **Henry's law**, $c_i = K_H P_i$, with $K_H$ for oxygen $1.3\times10^{-3}\ \mathrm{mol\,L^{-1}\,atm^{-1}}$ at 25 °C and for carbon dioxide $10^{-1.47}$ — a factor of **forty** greater, which is why carbon dioxide, not oxygen, controls a natural water's pH. Gas solubility falls with temperature with an enthalpy of solution of $-12$ to $-15\ \mathrm{kJ\,mol^{-1}}$ for oxygen, so a polar ocean holds **1.8 times** as much oxygen as a tropical one, and this physical gradient, amplified by circulation, is the reason the deep ocean and the oxygen-minimum zones are anoxic. A sparingly soluble solid dissolves to a **saturation state**
$$
\Omega = \frac{\mathrm{IAP}}{K_{sp}}, \qquad
\mathrm{SI} = \log\Omega ,
$$
with precipitation for $\Omega > 1$, dissolution for $\Omega < 1$, and — critically — a **rate** that goes as $(1-\Omega)^{2/3}$ or $(\Omega-1)^{2/3}$ near equilibrium and that is **ten to a thousand times slower for a mineral with no defects** than for one that is fine-grained, strained or biologically secreted. The **solubility–grain-size problem of silica** is the classic scandal: quartz dissolves to only $\sim 6\ \mathrm{mg\,L^{-1}}$ of $\mathrm{SiO_2}$ at 25 °C while biogenic opal-A reaches 100–400 mg/L, so no low-temperature surface water can ever be saturated with respect to quartz, and the vast Precambrian chert deposits must have precipitated from water that was **undersaturated with respect to quartz and supersaturated with respect to opal-A** — a state that is thermodynamically unstable and kinetically trapped.
:::

::: definition Redox: Eh and the water window {#def-redox}
The **pe** (or **Eh**) of a water measures its electron activity the way pH measures its proton activity. For a half-reaction $\mathrm{Ox} + ne^- = \mathrm{Red}$,
$$
Eh = E^{\circ\prime} - \frac{0.059}{n}\log\frac{a_{\mathrm{Red}}}{a_{\mathrm{Ox}}} \qquad (25\ ^\circ\mathrm{C}),
$$
and the two half-reactions that limit natural waters are the reduction and the oxidation of water itself:
$$
Eh = -0.059\,\mathrm{pH} \quad (\mathrm{H_2O/H_2}), \qquad
Eh = 1.23 - 0.059\,\mathrm{pH} \quad (\mathrm{O_2/H_2O}).
$$
At pH 7 the **water window** is therefore $-0.41$ to $+0.82\ \mathrm{V}$, and any redox couple whose formal potential falls inside it can exist in either valence state. The **sequence of natural redox processes** — the **redox ladder** — follows the order in which the half-reactions become thermodynamically favourable as oxygen is consumed: $\mathrm{O_2}$ (0.82 V at pH 7), then $\mathrm{MnO_2}$ (+0.8), then $\mathrm{Fe(OH)_3}$ (+0.2 to +0.4 depending on the mineral), then $\mathrm{SO_4^{2-}}$ ($-0.1$ to $-0.2$), then $\mathrm{CO_2}$ methanogenesis ($-0.25$). A sediment or an aquifer is therefore **zoned**, and the sequence of the zones — iron-reducing, then sulfate-reducing, then methanogenic — is a direct reading of the Eh and of the organic-matter supply.
:::

::: example Oxygen, temperature and the ocean's redox zonation {#ex-oxygen}
Find the dissolved-oxygen concentration of air-equilibrated freshwater at 25 °C and at 0 °C, taking $K_H = 1.3\times10^{-3}\ \mathrm{mol\,L^{-1}\,atm^{-1}}$ at 25 °C and an enthalpy of solution of $-15\ \mathrm{kJ\,mol^{-1}}$. Then find the Eh at pH 7 of a groundwater in which the ferric/ferrous iron ratio is $10^{-6}$, and place it on the redox ladder.
::: solution
At 25 °C,
$$
c_{\mathrm{O_2}} = 1.3\times10^{-3}\times0.209 = 2.7\times10^{-4}\ \mathrm{mol\,L^{-1}} = 8.7\ \mathrm{mg\,L^{-1}},
$$
and by the van't Hoff equation the Henry constant at 273 K is larger by
$$
\exp\!\left[-\frac{-15\,000}{8.314}\left(\frac{1}{273.15}-\frac{1}{298.15}\right)\right] = 1.74,
$$
so the solubility at 0 °C is $8.7\times1.74 = 15.1\ \mathrm{mg\,L^{-1}}$, against the measured 14.6. The **physical** pump on oceanic oxygen is therefore a factor of under two; the **observed** factor of five between surface and deep water is produced by circulation and by the respiration that consumes oxygen at depth.

For the iron couple,
$$
Eh = 0.77 - 0.059\log\frac{[\mathrm{Fe^{2+}}]}{[\mathrm{Fe^{3+}}]} = 0.77 - 0.059\times6 = +0.42\ \mathrm{V}.
$$
At pH 7 this lies **above** the Fe(III)/Fe(II) boundary of most iron-hydroxide minerals and **below** the oxygen line, so the water is **iron-reducing but not sulfate-reducing**: it should carry elevated dissolved Fe(II), essentially no sulfide, and no free oxygen. This is the classic chemistry of a **shallow anoxic aquifer**, of a waterlogged soil, and of the pore water beneath a lake's oxic surface layer, and it is why iron — and with it manganese, arsenic, and the phosphate that iron phosphate once held — is released to groundwater wherever the Eh falls below about +0.2 V.

The quantitative version of this argument is the **Eh–pH (Pourbaix) diagram**, and its practical use is the reverse of what beginners expect: one does not measure the Eh of a natural water (a platinum electrode in an oxic groundwater gives an uninterpretable mixed potential), one **infers** the Eh from an **ion ratio** — Fe(II)/Fe(III), Mn(II)/MnO₂, SO₄²⁻/HS⁻, NO₃⁻/N₂ — and then reads the stability field.
:::
:::

::: warning A water analysis describes the sample, not the water
An aqueous geochemical analysis is a **snapshot of a system that was out of equilibrium when it was sampled and has been out of equilibrium ever since**. Five corrections are always required. **The pH and the carbon dioxide have changed**: a groundwater sampled at 30 bar of $P_{\mathrm{CO_2}}$ and titrated at the surface has lost carbon dioxide, its pH has risen by one to two units, and its alkalinity titration is biased; the fix is a field alkalinity titration or a pH measurement corrected to the in-situ $P_{\mathrm{CO_2}}$. **The iron and the manganese have re-equilibrated**: dissolved Fe(II) in an anoxic aquifer oxidises and precipitates within minutes of exposure to air, so a sample that was not acidified in the field reports a total iron that is a filterable residue, not a concentration. **The species are wrong even when the totals are right**: an analysis for "dissolved sulfur" reports sulfate, sulfide, thiosulfate and polysulfides as one number, and an analysis for "dissolved iron" reports the truly dissolved, the colloidal and the filter-adsorbed together — a distinction that reverses the interpretation of a trace-metal flux. **The temperature was not 25 °C**: a hydrothermal fluid at 300 °C has a dissociation constant of water $10^3$ times larger, a carbon dioxide Henry constant that passes through a minimum, and activity coefficients that behave qualitatively differently, so a saturation index computed with 25 °C constants for a geothermal brine is meaningless. **And the water may not have been at equilibrium with anything**: a deep groundwater in a granitic aquifer may be undersaturated with respect to its feldspars and supersaturated with respect to its clays simultaneously, having been isolated for a million years. The discipline is to report the **saturation state with respect to every phase that is present and every phase that could be**, to compute the speciation with a code and a stated thermodynamic database, and to state the temperature, the $P_{\mathrm{CO_2}}$ and the filtration pore size with every concentration.
:::

::: history
The **theory of electrolyte solutions** begins with **Arrhenius**'s (Arrhenius) 1887 dissociation hypothesis, continues through **Debye and Hückel**'s (Hückel) 1923 limiting law, **Guggenheim**'s (Guggenheim) and **Scatchard**'s (Scatchard) and **Hückel's own** 1931 extension, **Guggenheim and Stokes** (Stokes) on ion size, and **Pitzer**'s (Pitzer) 1973 virial formulation, which is the basis of every modern seawater and brine model. **Henry** (Henry) gave the gas-solubility law in 1803, **Nernst** (Nernst) the electrode equation in 1889, and **Pourbaix** (Pourbaix) the potential–pH diagram in his 1966 monograph, itself built on the earlier **Latimer** (Latimer) oxidation–potential diagrams. **Stumm and Morgan**'s (Stumm) *Aquatic Chemistry* of 1970 and **Morel and Hering**'s (Morel) *Principles and Applications of Aquatic Chemistry* of 1993 taught the field to compute speciation, and **Helgeson** (Helgeson), **Pitzer**, **Marshall** (Marshall), **Potter** (Potter) and **Arnorsson** (Arnorsson) extended the thermodynamics to hydrothermal systems. The **carbonate system of seawater** was worked out by **Sverdrup, Johnson and Fleming** (Sverdrup), by **Lyman, Currie and Skirrow** (Skirrow), and by **Dickson, Millero and the Mehrbach school** (Mehrbach), whose 1973 constants and Dickson's 1990 revision are still the standard. The **ion-association model of seawater** is **Pytkowicz and Hawley**'s (Pytkowicz) 1974 paper and **Byrne and Kester**'s (Kester) measurements. The **redox ladder** is the synthesis of **Stumm and Morgan** and of **Berner**'s (Berner) 1963 *Early Diagenesis of Recent Sediments*, and the **silica solubility scandal** of the Precambrian cherts is the argument of **Williams, Turner and Crerar** (Crerar) and the modern synthesis of **Konhauser, Posth and the Precambrian chert school** (Konhauser).
:::

## Where this leads

The carbonate system of the ocean and its pH is in [[oceanography/ocean-chemistry]] and [[climate-change/sea-level-rise]], the weathering reactions these equilibria describe are in [[geochemistry/weathering-chemistry]] and [[geomorphology/weathering]], the hydrothermal fluid chemistry is in [[geochemistry/isotopes-water-carbon]] and [[earth-resources/magmatic-hydrothermal]], the redox history of the ocean and atmosphere is in [[biogeochemistry/oxygen]] and [[earth-history/oxygen-proterozoic]], the groundwater applications are in [[hydrology/groundwater-flow]] and [[hydrology/contaminant-transport]], and the activity formalism itself is in [[geochemistry/reactions]].

::: quiz
A groundwater analysis gives Na 2.0, Ca 1.0, Cl 3.0, HCO$_3^-$ 1.0 mmol/L and a charge-balance error of zero. A second analyst points out that the water is in equilibrium with atmospheric CO$_2$ at pH 6.0. What is wrong?
- [ ] The chloride is too high.
- [x] At pH 6.0 and atmospheric CO$_2$ the alkalinity cannot be 1.0 mmol/L of bicarbonate in a water with 4 meq/L of cations in equilibrium with calcite-free conditions — the pH and the alkalinity are inconsistent.
- [ ] The sodium is too high.
- [ ] Nothing is wrong.
::: solution
At pH 6.0 and $P_{\mathrm{CO_2}} = 10^{-3.5}$ atm, $[\mathrm{HCO_3^-}] = K_1[\mathrm{CO_2^*}]/a_{\mathrm{H^+}} = 10^{-6.35}\times10^{-5.03}/10^{-6} = 4.5\times10^{-6}\ \mathrm{mol\,L^{-1}}$ — three orders of magnitude below the reported 1.0 mmol/L. Either the pH was measured after the sample had degassed and its bicarbonate had been converted, or the alkalinity was titrated wrongly, or the water is not open to the atmosphere. A charge balance can be satisfied by a wrong analysis, which is why the charge balance is a **necessary but not sufficient** quality test and must be supplemented by a consistency check between pH, alkalinity and $P_{\mathrm{CO_2}}$.
:::
:::

::: summary
- Water's high dielectric constant makes it an ionic solvent; non-ideality scales as $z^2$ and as the ionic strength, and seawater requires Pitzer, not Debye–Hückel.
- Speciation, not the analytical total, is what enters an equilibrium constant; in seawater 40 per cent of calcium and 90 per cent of magnesium are ion pairs.
- The open-system dissolution of calcite gives a **cube-root law** in $P_{\mathrm{CO_2}}$, which explains hard water, speleothems and the strength of the silicate weathering feedback.
- Gas solubility follows Henry's law with a mild temperature dependence; the ocean's oxygen stratification is set by circulation and respiration, not by solubility.
- The water window at pH 7 spans $-0.41$ to $+0.82$ V, and the redox ladder orders the sequence of natural reduction processes.
- A water analysis is a snapshot of a perturbed system; report the saturation states, the speciation, and the conditions of measurement.
:::

## Exercises

::: exercise Ionic strength {level=1 check="0.015"}
Find the ionic strength of a 0.010 molal NaCl solution and of a 0.005 molal CaCl$_2$ solution.
::: solution
NaCl: $I = \tfrac12(0.010\times1 + 0.010\times1) = 0.010$. CaCl$_2$: $I = \tfrac12(0.005\times4 + 0.010\times1) = 0.015$. The divalent salt gives a higher ionic strength at a lower molality, which is why a calcium-rich water behaves as a more concentrated solution than its salinity suggests.
:::
:::

::: exercise Henry's law {level=1 check="8.7"}
Find the dissolved oxygen of air-saturated freshwater at 25 °C ($K_H = 1.3\times10^{-3}\ \mathrm{mol\,L^{-1}\,atm^{-1}}$, $P_{\mathrm{O_2}} = 0.209$ atm), in mg/L.
::: solution
$c = 1.3\times10^{-3}\times0.209 = 2.7\times10^{-4}\ \mathrm{mol\,L^{-1}}$, and $2.7\times10^{-4}\times32\,000 = 8.7\ \mathrm{mg\,L^{-1}}$. This is the standard "air-saturated" value against which every oxygen depletion in a lake, a river or an oxygen-minimum zone is measured.
:::
:::

::: exercise Carbonate fractions {level=1 check="0.91"}
Find the fraction of dissolved inorganic carbon present as bicarbonate at pH 9.0 in freshwater at 25 °C.
::: solution
With $\mathrm{p}K_1 = 6.35$ and $\mathrm{p}K_2 = 10.33$, at $a_{\mathrm{H^+}} = 10^{-9}$: $K_1/H = 10^{2.65} = 447$, $K_1K_2/H^2 = 10^{1.66} = 45.7$, and the denominator is $1 + 447 + 45.7 = 494$. So $\alpha_{\mathrm{HCO_3}} = 447/494 = 0.91$, $\alpha_{\mathrm{CO_3}} = 0.092$ and $\alpha_{\mathrm{CO_2}} = 0.002$. Bicarbonate dominates from pH 6.3 to 10.3, which is why almost every natural water's alkalinity is bicarbonate alkalinity.
:::
:::

::: exercise Cube-root law {level=2 check="0.003"}
Use the cube-root law to estimate the calcium content of a water in equilibrium with calcite at $P_{\mathrm{CO_2}} = 10^{-1.5}$ atm and 25 °C ($\log K = -5.97$).
::: solution
$$
[\mathrm{Ca}] = \left(\frac{10^{-5.97}\times10^{-1.5}}{4}\right)^{1/3} = (3.0\times10^{-8})^{1/3} = 3.1\times10^{-3}\ \mathrm{mol\,L^{-1}} .
$$
The exact numerical solution of the four equilibria together with electroneutrality gives 2.0 mmol/L, because the shortcut assumption $[\mathrm{HCO_3^-}] = 2[\mathrm{Ca}^{2+}]$ ignores the carbonate ion and the hydroxide. The cube-root law is therefore good to about 50 per cent — adequate for a first interpretation, and a two-line numerical solution is adequate for the second.
:::
:::

::: exercise Nernst and the ladder {level=2 check="0.58"}
For $\mathrm{MnO_2} + 4\mathrm{H^+} + 2e^- = \mathrm{Mn^{2+}} + 2\mathrm{H_2O}$ with $E^{\circ\prime} = +1.23\ \mathrm{V}$, find the Eh at pH 7 above which MnO$_2$ is stable, taking $[\mathrm{Mn^{2+}}] = 10^{-6}$ M.
::: solution
$$
Eh = 1.23 - \frac{0.059}{2}\log\frac{10^{-6}}{(10^{-7})^4} = 1.23 - 0.0295\times\log 10^{22} = 1.23 - 0.65 = 0.58\ \mathrm{V}.
$$
Manganese dioxide is therefore stable above about +0.6 V at pH 7, which is **below** the oxygen line of 0.82 V — so Mn(IV) can persist in a water that has lost its free oxygen, and this is why Mn-oxide coatings, and the cobalt and the rare earths they adsorb, form in the **suboxic** zone rather than in the oxic one.
:::
:::

::: exercise Saturation state {level=3 check="5.5"}
Surface ocean water has dissolved inorganic carbon 2.0 mmol kg⁻¹ and pH 8.10. Using the seawater constants pK$_1'$ = 6.00 and pK$_2'$ = 9.10, the calcium concentration 10.3 mmol kg⁻¹ and the apparent solubility product of calcite $K_{sp}^* = 3.36\times10^{-7}\ (\mathrm{mol\,kg^{-1}})^2$, find the carbonate ion concentration and the saturation state.
::: solution
With $a_{\mathrm{H^+}} = 10^{-8.10} = 7.94\times10^{-9}$,
$$
D = a_{\mathrm{H^+}}^2 + K_1'a_{\mathrm{H^+}} + K_1'K_2'
  = 6.3\times10^{-17} + 7.9\times10^{-15} + 7.9\times10^{-16} = 8.8\times10^{-15},
$$
$$
\alpha_2 = \frac{K_1'K_2'}{D} = \frac{7.9\times10^{-16}}{8.8\times10^{-15}} = 0.090, \qquad
[\mathrm{CO_3^{2-}}] = 2.0\times0.090 = 0.18\ \mathrm{mmol\,kg^{-1}},
$$
$$
\Omega = \frac{[\mathrm{Ca^{2+}}][\mathrm{CO_3^{2-}}]}{K_{sp}^*}
      = \frac{1.03\times10^{-2}\times1.8\times10^{-4}}{3.36\times10^{-7}} = 5.5 .
$$
The surface ocean is **five and a half times supersaturated** with respect to calcite, which is why shells, corals and coccoliths can be built and why the ocean holds a dissolved inorganic carbon reservoir fifty times the atmosphere's without precipitating.

The arithmetic then gives the answer to the ocean-acidification question in one line. Adding 30 per cent more dissolved inorganic carbon to the surface ocean (the business-as-usual twenty-second-century projection) raises the DIC to 2.6 mmol kg⁻¹ and, because the alkalinity is essentially unchanged, drives the pH down by about 0.3 units to 7.8. Repeating the calculation at pH 7.8 and DIC 2.6 gives $\alpha_2 = 0.045$ and
$$
\Omega = \frac{1.03\times10^{-2}\times1.17\times10^{-4}}{3.36\times10^{-7}} = 3.6 ,
$$
a **35 per cent fall** in the saturation state for a 30 per cent rise in carbon. The **carbonate ion is a dilute species whose concentration is set by the square of the hydrogen-ion activity**, so it responds to acidification with a leverage out of all proportion to its abundance — which is why a 0.3-unit pH change, small in absolute terms, is a first-order threat to calcifying organisms and why the deep ocean, already near $\Omega = 1$, crosses into undersaturation long before the surface does.
:::
:::

::: exercise A quality check {level=3}
A groundwater analysis gives (mmol/L) Na 6.2, K 0.3, Ca 0.9, Mg 0.4, HCO$_3^-$ 2.4, SO$_4^{2-}$ 3.0, Cl 4.6, and a pH of 9.2. Check the charge balance and interpret the water.
::: solution
$$
\Sigma\mathrm{cations} = 6.2 + 0.3 + 1.8 + 0.8 = 9.1\ \mathrm{meq\,L^{-1}},
$$
$$
\Sigma\mathrm{anions} = 2.4 + 6.0 + 4.6 = 13.0\ \mathrm{meq\,L^{-1}},
$$
a charge-balance error of $(9.1 - 13.0)/22.1 = -17.6$ per cent — the analysis **fails**. The anion excess is too large to be an analytical error alone, and the likely causes are an unreported nitrate or carbonate at the high pH, or a sodium that has been under-reported by a flame measurement quenched by a high calcium, or a bicarbonate titrated past its endpoint.

Once corrected, the water's character is clear from the pH of 9.2 and the sulfate- and sodium-dominance: this is a **sodic, sulfate-rich, arid-zone or evaporite-influenced groundwater**, in which the high pH indicates either **cation exchange** (sodium on a clay exchanging for calcium and magnesium, which is exactly the process that makes a water sodium-rich and alkaline without changing its salinity) or **carbonatite or trona weathering**. The diagnostic test is the **sodium-adsorption ratio** and the **chloro-alkaline index**: a water whose sodium excess over chloride is matched by a chloride excess over sodium-free sulfate has acquired its sodium by cation exchange, and this is the standard interpretation of the alkaline lakes and sodic soils of arid regions.
:::
:::

::: exercise The silica scandal {level=3 check="20"}
Quartz has a solubility of 6 mg/L of SiO$_2$ at 25 °C and biogenic opal-A about 120 mg/L. Find the ratio, and explain why the deep ocean, whose dissolved silica reaches 150 mg/L at depth, is supersaturated with respect to opal-A and undersaturated with respect to quartz.
::: solution
The solubility ratio is $120/6 = 20$. Deep ocean water with 150 mg/L of dissolved silica is therefore **above** the opal-A solubility and **25 times above** the quartz solubility — supersaturated with respect to both, and grossly so with respect to quartz.

That is not what is observed. Deep waters are **undersaturated with respect to opal-A** by 20–60 per cent and hugely undersaturated with respect to quartz, and the 150 mg/L figure is a **maximum** reached only in the deep Pacific and the Southern Ocean. The apparent paradox — that the ocean's silica is far above quartz solubility yet the ocean does not precipitate chert — resolves in three steps. Quartz precipitation at low temperature and low supersaturation is **kinetically inhibited** by an activation barrier so large that the induction time exceeds the age of the ocean. Biogenic silica, secreted by diatoms and radiolarians, dissolves 20 times more readily because it is **hydrated, disordered, fine-grained and aluminous**. And the biotic pump keeps the deep ocean below even the opal-A solubility by **stripping silica in the surface water**, so that the deep water is a solution that would dissolve, not precipitate, chert.

The implication for the Precambrian is the interesting one. Massive chert and iron-formation deposits require an ocean that was **supersaturated with respect to quartz**, which requires either a much higher silica concentration than today's (plausible for an ocean with no diatoms and a higher hydrothermal flux), or a lower temperature, or a lower dissolved-aluminium activity, or all three. The **precipitation mechanism** of Precambrian chert — direct chemical precipitation, biologically mediated, or the diagenetic replacement of an opal precursor — remains unresolved, and it is one of the clearest examples in geology of a rock whose origin cannot be read from the rock itself.
:::
:::
