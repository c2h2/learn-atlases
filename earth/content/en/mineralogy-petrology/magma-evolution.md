The Earth produces one igneous rock for every thousand it destroys, and the thousand are more varied than the one. Ocean-island basalts, andesites, dacites, rhyolites, picrites, komatiites, carbonatites, lamprophyres, and the layered cumulates of the Bushveld — all from a mantle that is overwhelmingly harzburgite and lherzolite. Igneous petrology is the study of that transformation, and it rests on four processes: which part of the source melts, which crystals leave the liquid, what the magma melts or reacts with on its way up, and what it mixes with when it meets another magma.

The word for the whole is **differentiation**, and the trap is to think of it as one thing. A single basalt ascending through 30 km of granite can lose olivine to the floor, gain silica from the wall, mix with a second pulse of hotter basalt, and degas water on the way — and each of those leaves a different, and separately readable, signature in the rock.

## Primary magmas and the liquid line of descent

::: definition Primary, primitive and derivative magma {#def-primary}
A **primary magma** is in equilibrium with the mantle assemblage from which it came — specifically, with olivine of mantle magnesian composition ($\mathrm{Fo}_{88\pm2}$) — though it need not be a *bulk* melt of the mantle. A **primitive magma** has suffered no fractional crystallisation or contamination since isolation, but may be a mixture of primary melts. A **derivative magma** has been modified. The **liquid line of descent** is the path a magma's composition follows as crystals are removed, and it is the object that most of igneous petrology is drawn to reconstruct.
:::

::: definition Bulk distribution coefficient {#def-bulk-d}
For a magma crystallising a set of phases with mass fractions $w_i$, and a trace element $i$ with Nernst partition coefficients $K_D^i$ between each phase and the liquid, the **bulk distribution coefficient** is
$$
D = \sum_i w_i K_D^i .
$$
An element with $D \ll 1$ is **incompatible** and stays in the liquid; one with $D \gg 1$ is **compatible** and is stripped out. The values that matter most in basalt systems, at 1 atm and basaltic temperatures, are roughly: Ni $K_D^{\text{ol}} \approx 10$–18, Cr $K_D^{\text{crn}} > 30$, Co and V in olivine 3–8, Sr in plagioclase 1.3–2.0, Eu in plagioclase 1.5–2.0 (which is why the europium anomaly is a plagioclase fingerprint), the rare earths in olivine and pyroxene below 0.1, and Zr, Nb, Ta, Th and the light rare earths below 0.02 in any anhydrous silicate.
:::

::: proposition Rayleigh fractional crystallisation {#prop-rayleigh}
Let $F$ be the fraction of liquid remaining and $D$ the bulk distribution coefficient, assumed constant. If crystals are removed as soon as they form and never re-equilibrate, the concentration of a trace element in the liquid is
$$
\frac{C_L}{C_0} = F^{\,(D-1)} ,
$$
where $C_0$ is the concentration in the initial liquid. Compatible elements ($D > 1$) decay away as $F^{\,D-1}$; incompatible elements ($D < 1$) rise as $F^{\,1-D}$, and do so without limit as $F \to 0$.
:::

::: proof
The liquid has mass $M$ and concentration $C_L$, so it holds $MC_L$ of the element. Crystallising a mass $-\mathrm{d}M$ of solids of composition $DC_L$ removes $-DC_L\,\mathrm{d}M$ of the element, so
$$
\mathrm{d}(MC_L) = -D C_L\,\mathrm{d}M
\quad\Longrightarrow\quad
M\,\mathrm{d}C_L + C_L\,\mathrm{d}M = -D C_L\,\mathrm{d}M
\quad\Longrightarrow\quad
\frac{\mathrm{d}C_L}{C_L} = -(D-1)\frac{\mathrm{d}M}{M}.
$$
Integrating from $M_0$ with $C_L = C_0$, and writing $F = M/M_0$, gives $\ln(C_L/C_0) = -(D-1)\ln F$, which is the result. The same derivation with the phases left in place gives the equilibrium (batch) crystallisation law $C_L/C_0 = 1/[D + F(1-D)]$, which differs from the Rayleigh law most at small $F$ and small $D$ — the same distinction, and for the same reason, as in [[mineralogy-petrology/phase-diagrams]].
:::

::: example Nickel as an olivine thermometer-barometer {#ex-ni}
A basalt contains $250\ \mathrm{ppm}$ Ni and $12\ \mathrm{wt}\%$ MgO. Olivine with $\mathrm{Fo}_{90}$ crystallises and is removed; olivine makes up 15 % of the crystallising assemblage and $K_D^{\mathrm{Ni}} = 14$. Find the Ni content when half the liquid has crystallised, and when only a fifth remains.
::: solution
The bulk distribution coefficient is $D = 0.15\times14 = 2.1$. Then $C_L/C_0 = F^{1.1}$:
$$
F = 0.50:\quad \frac{C_L}{C_0} = 0.50^{1.1} = 0.467, \qquad \mathrm{Ni} = 117\ \mathrm{ppm};
$$
$$
F = 0.20:\quad \frac{C_L}{C_0} = 0.20^{1.1} = 0.170, \qquad \mathrm{Ni} = 43\ \mathrm{ppm}.
$$
Now the useful inversion. Primary mantle melts hold roughly $350\ \mathrm{ppm}$ Ni at $13\ \mathrm{wt}\%$ MgO, and their olivines carry $2500$–$3500\ \mathrm{ppm}$ Ni. A liquid at $250\ \mathrm{ppm}$ Ni and 12 wt% MgO is therefore close to primary, whereas one at $43\ \mathrm{ppm}$ Ni has lost four-fifths of its liquid to olivine fractionation alone. This is why nickel and magnesia are always plotted together, why olivine Ni–Mg# is the standard test of primitiveness, and why a basalt's MgO on its own says almost nothing about its source.
:::
:::

::: widget plot
f: x^(2.1-1); x^(0.10-1); x^(0.5-1)
x: 0.02, 1
y: 0, 12
labels: \text{compatible } D=2.1; \text{incompatible } D=0.10; \text{weakly incompatible } D=0.5
caption: The Rayleigh crystallisation curves for a compatible, a strongly incompatible and a mildly incompatible element, as $C_L/C_0$ against the fraction of liquid remaining. The compatible element collapses early, which is why chromium and nickel vanish from evolved differentiates; the strongly incompatible element rises by an order of magnitude by $F = 0.1$; and the mildly incompatible element barely moves, which is why elements with $D$ near one are useless as differentiation indices and excellent as source tracers. Note that all three curves pass through 1 at $F = 1$: no crystallisation, no fractionation.
:::

## Major elements: mass balance, not modelling

Trace-element arithmetic is elegant, but the liquid line of descent is drawn with major elements, and major elements obey only one law — mass balance.

::: example Removing twenty per cent olivine {#ex-mass-balance}
A basalt with $50.0\ \mathrm{wt}\%$ $\mathrm{SiO_2}$ and $12.0\ \mathrm{wt}\%$ MgO loses 20 wt% of $\mathrm{Fo}_{90}$ olivine. Find the new composition of the liquid, and comment on the result.
::: solution
$\mathrm{Fo}_{90}$ olivine is $0.9\,\mathrm{Mg_2SiO_4} + 0.1\,\mathrm{Fe_2SiO_4}$, which is $51.6\ \mathrm{wt}\%$ MgO and $42.7\ \mathrm{wt}\%$ $\mathrm{SiO_2}$. Removing a fraction $X$ of a phase of composition $C_p$ from a liquid of composition $C_0$ leaves
$$
C_L = \frac{C_0 - X C_p}{1 - X}.
$$
So
$$
\mathrm{MgO} = \frac{12.0 - 0.20\times51.6}{0.80} = \frac{1.68}{0.80} = 2.1\ \mathrm{wt}\%,
\qquad
\mathrm{SiO_2} = \frac{50.0 - 0.20\times42.7}{0.80} = \frac{41.5}{0.80} = 51.8\ \mathrm{wt}\%.
$$
Twenty per cent olivine has taken the magma from a basalt to a high-silica, magnesia-poor liquid, and has raised the silica by less than two per cent. That asymmetry is the whole point: **olivine fractionation is a spectacular way to remove magnesium and a poor way to make silica**, because olivine itself contains 43 % silica. To make andesite from basalt you must remove plagioclase, pyroxene and oxides as well, and in proportions that no single liquid line of descent supplies for free. This is the reason the andesite problem — the existence of a vast, global, bimodal distribution of continental crust at $56$–$62\ \%$ $\mathrm{SiO_2}$ with a deficit at $50$–$53\ \%$ — has survived a century of petrology.
:::
:::

::: definition The thermal divide {#def-thermal-divide}
Below about $52\ \mathrm{wt}\%$ $\mathrm{SiO_2}$, basaltic liquids crystallising at 1 atm follow one of two trends. On the **tholeiitic** trend iron continues to enrich in the liquid as magnesium falls, because olivine and then pigeonitic pyroxene are removed and the oxygen fugacity is low enough that iron stays divalent; the residual liquids are iron-rich and, at the end, silica-oversaturated and felsic. On the **calc-alkalic** trend iron stays roughly constant while magnesium falls, because magnetite crystallises and strips $\mathrm{Fe^{3+}}$, and the residual liquids are silica-under- to -saturated and hydrous. The two trends diverge irreversibly at the **thermal divide**, and which one a magma follows is set early, by its water content and its oxygen fugacity, not by how far it has differentiated.
:::

::: example Which trend? {#ex-trend}
Two suites both start at $50\ \mathrm{wt}\%$ $\mathrm{SiO_2}$, $10\ \mathrm{wt}\%$ MgO and $9\ \mathrm{wt}\%$ $\mathrm{FeO^*}$. Suite A at $56\ \mathrm{wt}\%$ $\mathrm{SiO_2}$ has $4.0\ \mathrm{wt}\%$ $\mathrm{FeO^*}$; suite B has $9.5\ \mathrm{wt}\%$ $\mathrm{FeO^*}$. Classify them and say what each implies about the setting.
::: solution
Plot $\mathrm{FeO^*}/\mathrm{MgO}$ against $\mathrm{SiO_2}$ (the Irvine–Barth index). Suite A has *lost* iron while losing magnesium, so its $\mathrm{FeO^*}/\mathrm{MgO}$ stays low: **calc-alkalic**. Suite B has enriched iron as it evolved, so its ratio climbs steeply: **tholeiitic**.

The setting follows. Tholeiites come from dry, reduced, high-degree melting: mid-ocean ridges, large igneous provinces, back-arc basins. Calc-alkalic suites come from wet, oxidised, lower-degree melting in the mantle wedge above a slab, and they are the diagnostic rocks of continental margins and island arcs. The iron difference is an oxidation-state difference: at two to three log units higher oxygen fugacity, iron is carried as $\mathrm{Fe^{3+}}$ into magnetite and is stripped from the liquid instead of accumulating in it. That difference is inherited from the source and from the slab fluid, not acquired during fractionation — which is why the two trends cannot be produced from one another by any amount of crystal sorting.
:::
:::

## Assimilation: the heat is the limit

A magma that rises through cold country rock melts it, and the melt joins the magma. The process is called **assimilation**, and the combination of fractional crystallisation and assimilation is **AFC**. The constraint is not chemistry but heat, and it is brutal.

::: example How much country rock can a basalt assimilate? {#ex-heat}
A basalt at $1200^\circ\mathrm{C}$ intrudes country rock at $50^\circ\mathrm{C}$. Take $c_p = 1200\ \mathrm{J\,kg^{-1}\,K^{-1}}$ for the basalt and $1000\ \mathrm{J\,kg^{-1}\,K^{-1}}$ for the country rock, and a latent heat of crystallisation of $400\ \mathrm{kJ\,kg^{-1}}$. How many kilograms of country rock can one kilogram of basalt heat from $50$ to $1000^\circ\mathrm{C}$, if the basalt cools to $1000^\circ\mathrm{C}$ and crystallises 30 % of itself? How much more is available if the country rock is to actually melt?
::: solution
The heat released by one kilogram of basalt is the sum of sensible and latent terms:
$$
q = c_p\Delta T + X L = 1200\times200 + 0.30\times4\times10^{5} = 2.4\times10^{5} + 1.2\times10^{5} = 3.6\times10^{5}\ \mathrm{J}.
$$
Heating country rock from 50 to $1000^\circ\mathrm{C}$ costs $1000\times950 = 9.5\times10^{5}\ \mathrm{J\,kg^{-1}}$, so
$$
m = \frac{3.6\times10^{5}}{9.5\times10^{5}} = 0.38\ \mathrm{kg}
$$
of country rock per kilogram of basalt — an assimilation ratio of about 28 % of the final mixture. To actually *melt* that rock costs a further $150$–$200\ \mathrm{kJ\,kg^{-1}}$ of latent heat of fusion, cutting the ratio to $3.6\times10^{5}/1.13\times10^{6} = 0.32$.

Three consequences. First, a single, closed, cooling intrusion can assimilate only a few tens of per cent of its own mass, and the isotope evidence for larger assimilation is therefore evidence for **recharge**: the magma chamber was topped up with fresh hot magma many times. Second, the wall rock nearest the intrusion is where the heat is spent, which is why the most contaminated samples are at the margins and why a zoned intrusion shows a zoned isotope ratio. Third, the latent heat of crystallisation is comparable with the whole sensible heat budget, which is why crystallisation drives assimilation rather than merely accompanying it.
:::
:::

## Mixing: hyperbolas, not straight lines

::: proposition Binary mixing {#prop-mixing}
Mix a fraction $f$ of magma A (trace-element concentration $C_A$, isotope ratio $R_A$) with $1-f$ of magma B ($C_B$, $R_B$). Then
$$
C_m = fC_A + (1-f)C_B, \qquad
R_m = \frac{fC_AR_A + (1-f)C_BR_B}{fC_A + (1-f)C_B},
$$
and because the isotope ratio is weighted by the *element* concentration rather than by the mass fraction, a plot of $R_m$ against $1/C_m$ is a **hyperbola**, not a straight line. Straight-line mixing appears only when the two endmembers have similar concentrations.
:::

::: example Crustal contamination or mantle heterogeneity? {#ex-mixing}
Depleted-mantle basalt has $\mathrm{Sr} = 200\ \mathrm{ppm}$ and $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7035$; the granite it passes through has $\mathrm{Sr} = 800\ \mathrm{ppm}$ and $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7120$. Find the strontium content and isotope ratio of a mixture of 30 % basalt and 70 % granite, and the fraction of granite needed to shift the ratio to $0.7080$.
::: solution
For 30:70,
$$
C_m = 0.3\times200 + 0.7\times800 = 620\ \mathrm{ppm},
$$
$$
R_m = \frac{0.3\times200\times0.7035 + 0.7\times800\times0.7120}{620} = \frac{42.2 + 398.7}{620} = 0.7112 .
$$
For the second part, set $R_m = 0.7080$ with $f$ the basalt fraction:
$$
\frac{140.7f + 569.6(1-f)}{200f + 800(1-f)} = 0.7080
\quad\Longrightarrow\quad
569.6 - 428.9f = 566.4 - 424.8f
\quad\Longrightarrow\quad
f = 0.78 .
$$
So **22 % assimilation of granite moves the isotope ratio from $0.7035$ to $0.7080$** — a shift of $0.0045$, against an analytical precision of about $0.00002$ — while taking the strontium content only from 200 to $332\ \mathrm{ppm}$. That asymmetry is the reason isotope ratios are such sensitive contamination detectors and such poor mixing proportionometers: a rock can look petrologically unaltered and isotopically ruined. It is also why the correct interpretation of a mixing hyperbola requires both the ratio and the concentration, and why a straight line through isotope data is usually a sign that someone has plotted ratio against ratio.
:::
:::

::: widget plot
f: (140.7*x + 569.6*(1-x))/(200*x + 800*(1-x))
x: 0, 1
y: 0.703, 0.713
hlines: 0.708
vlines: 0.78
labels: \text{87Sr/86Sr}
caption: The mixing curve for the basalt–granite example, plotted as $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ against the basalt fraction $f$. The horizontal line marks the contaminated ratio $0.7080$ and the vertical line the corresponding $f = 0.78$: only 22 % of granite is needed. Note how the curve crowds its values near the granite end — the first few per cent of a radiogenic contaminant does most of the isotopic work, and the last few tens of per cent does almost none. This is the "isotope effect" that makes crustal contamination so easy to detect and so hard to quantify.
:::

::: warning Magma mixing is not a metaphor, and it is not proven by a scatter plot
Mixing is proven by textures and by the coexistence of phases that could not have been in equilibrium: resorbed and sieved quartz, inverted compositional zoning (a magnesian rim on an iron-rich core), xenocrystic cores with mantle-like $\mathrm{Mg\#}$ in a differentiated host, and disequilibrium between a mineral and the matrix around it. The classic case is the 1980 dacite of Mount St Helens, whose pumice contains dark, basic, high-magnesia enclaves whose glass composition lies on a straight mixing line between an andesite and a basalt — the physical mixture caught in the act. A curved trend on a Harker diagram is *consistent* with mixing and with fractional crystallisation and with source heterogeneity, and distinguishes none of them on its own.
:::

::: quiz
A basalt and its differentiated product lie on a straight line on a plot of $\mathrm{MgO}$ against $\mathrm{SiO_2}$. What does that demonstrate?
- [ ] The two rocks are cogenetic and related by fractional crystallisation.
- [ ] The two rocks are a mixture of two endmembers.
- [x] Nothing on its own; the line is consistent with several processes.
- [ ] The magma was well mixed before eruption.
::: solution
Harker-style trends are projections of a high-dimensional history onto two axes. Fractional crystallisation, assimilation, mixing, varying degrees of partial melting and source heterogeneity all produce smooth trends, and many of them produce straight ones over part of their range. The trend is a hypothesis; the test is mineral chemistry, textures, trace elements and isotopes together.
:::
:::

## Where magmas are made, and why there are so few kinds

Three facts organise the whole subject. First, the mantle melts only by decompression, flux or heating, and each gives a characteristic magma (see [[mineralogy-petrology/phase-diagrams]]). Second, most basalts are the product of 15–30 % melting, which is a large number: the incompatible elements have already been strongly fractionated, which is why mid-ocean-ridge basalt is *depleted* rather than enriched. Third, and most importantly, the great bulk of intermediate and silicic rock is not made by melting the mantle at all but by the differentiation and re-melting of something that was already basalt.

::: example Can the lower crust be remelted to make andesite? {#ex-anatexis}
Amphibolite (metabasalt) at 10 kbar begins to melt by the reaction $\mathrm{amphibole} + \mathrm{plagioclase} \to \mathrm{clinopyroxene} + \mathrm{plagioclase}_{\text{more sodic}} + \mathrm{H_2O}_{\text{(in\ melt)}}$ at about $800^\circ\mathrm{C}$, and produces tonalitic liquid. If $10\ \mathrm{km}$ of such crust is heated by basalt underplated at its base and undergoes 10 % melting, how much magma does that generate per square kilometre of the arc, and how many years of typical arc output does it represent?
::: solution
Ten kilometres of crust at 10 % melt gives a melt layer $1\ \mathrm{km}$ thick, which is $1\ \mathrm{km^3}$ of magma for every square kilometre of arc. Mature continental arcs accumulate $0.5$–$2\ \mathrm{km^3}$ of magma per kilometre of arc-strike per million years; across an arc $100\ \mathrm{km}$ wide that is $50$–$200\ \mathrm{km^3}$ per million years, or $0.5$–$2\ \mathrm{km^3}$ per square kilometre per million years, i.e. $1\ \mathrm{km^3}$ per $100$–$200$ square kilometres per million years. Expressed per unit area, one 10 %-melting event of the deep crust therefore supplies
$$
\frac{1\ \mathrm{km^3\,km^{-2}}}{0.01\ \mathrm{km^3\,km^{-2}\,Myr^{-1}}} = 100\ \mathrm{Myr}
$$
of arc magmatism. The budget is therefore comfortably closed: crustal anatexis can supply the andesite and the tonalite, and it is not necessary to derive every intermediate rock by fractional crystallisation of a basalt.

The modern view is that both are true and that they operate at different levels. Basalt is added to the base of the crust, part of it differentiates to andesite and part of it melts the crust to make more silicic liquid, and the two mix on the way up. The andesite that erupts is the sum, and the debate about proportions is carried out in strontium and neodymium isotopes and in the oxygen isotopes of zircon — where a value above $+8\ \%$ in $\delta^{18}\mathrm{O}$ means the zircon grew from melted surface material, whatever the rest of the rock says.
:::
:::

::: history
Norman L. Bowen (Bowen) established fractional crystallisation experimentally between 1913 and 1928 and, in *The Evolution of the Igneous Rocks*, argued that a single parent could yield the whole igneous suite — a view his successors narrowed until, by the 1950s, few petrologists believed anything was a derivative. The correction came from the ocean floor: Harry H. Hess's (Hess) prediction that ridge basalts are primitive liquids was confirmed by dredging and then by deep drilling of the mid-ocean ridges, and W. B. Bryan's work on the Reykjanes Ridge in the 1970s turned the ridge into a quantitative laboratory of melting and mixing. The apparatus of the field arrived in three steps: the trace-element partition laws of Victor Goldschmidt (Goldschmidt) in the 1920s, applied to igneous systems influentially by A. Poldervaart and H. H. Hess in 1951; isotope dilution and rubidium-strontium dating from the 1950s, which made contamination measurable rather than arguable; and the rare-earth modelling of Frank Frey and colleagues in the 1970s, followed by David DePaolo's 1981 formulation of combined assimilation and fractional crystallisation, which turned isotope-against-concentration plots into quantitative tools. The decisive reversal came from a furnace: when Arth and Nisbet showed in the early 1970s that high-magnesian komatiites require eruption temperatures of $1600$–$1900^\circ\mathrm{C}$, the long-held idea that they were residual liquids died within a few years, and the search for high-degree Archaean melting took its place.
:::

## Where this leads

The magmas described here are read back into their settings in [[mineralogy-petrology/igneous-settings]]; the trace-element and isotope machinery is developed in [[geochemistry/trace-elements]] and [[geochemistry/radiogenic-tracers]]; the melting equations are applied to the mantle in [[geophysics/heat-flow]]; and the ore deposits that differentiation concentrates are the subject of [[earth-resources/magmatic-hydrothermal]].

::: summary
- A primary magma is in equilibrium with mantle olivine of $\mathrm{Fo}_{88\pm2}$; most basalts are neither primary nor even primitive, and the liquid line of descent must be reconstructed before anything is said about the source.
- Trace elements follow the Rayleigh law $C_L/C_0 = F^{D-1}$ for fractional crystallisation and the batch law for equilibrium crystallisation; compatible elements vanish early and incompatible ones diverge at small $F$.
- Major elements obey mass balance only. Olivine removal destroys magnesia without making much silica, which is why making andesite is a genuine problem.
- Basalts split at the thermal divide into tholeiitic and calc-alkalic trends, controlled by water content and oxygen fugacity and not by the extent of differentiation.
- Assimilation is limited by heat: a closed basaltic intrusion can assimilate only a few tens of per cent of its own mass, so large isotopic shifts record repeated recharge.
- Mixing produces hyperbolas in isotope-ratio against inverse-concentration space; a small fraction of a radiogenic contaminant dominates the isotope signature while barely changing the chemistry.
- Most intermediate crust is made both by differentiation of basalt and by melting of earlier crust, in proportions that isotopes, not textures, must decide.
:::

## Exercises

::: exercise Bulk distribution coefficient {level=1 check="0.75"}
A magma crystallises 40 % plagioclase, 40 % clinopyroxene and 20 % olivine. If $K_D^{\mathrm{Sr}}$ is 1.8 in plagioclase and 0.05 in both pyroxene and olivine, what is $D^{\mathrm{Sr}}$?
::: solution
$D = 0.40\times1.8 + 0.40\times0.05 + 0.20\times0.05 = 0.72 + 0.02 + 0.01 = 0.75$. Strontium behaviour is controlled almost entirely by the plagioclase mode: raise it to 60 % and $D$ becomes $1.11$, turning strontium from mildly incompatible to mildly compatible. That single sensitivity is why strontium is a good tracer of plagioclase and a poor tracer of anything else.
:::
:::

::: exercise Chromium {level=1 check="0.5"}
Chromite has $K_D^{\mathrm{Cr}} \approx 100$ and makes up 2 % of the crystallising assemblage. What is $D^{\mathrm{Cr}}$, and by what factor is the chromium content of the liquid reduced when half of it has crystallised?
::: solution
$D = 0.02\times100 = 2.0$, so $C_L/C_0 = F^{\,2.0-1} = F = 0.50$: the chromium halves. Even at two per cent of the crystallising assemblage, chromite dominates chromium completely — which is why chromitite seams precipitate where a magma first saturates in oxide, why chromium is a sensitive index of vanishingly small oxide fractionation, and why a single per cent of chromite in a cumulate can carry a whole ore deposit.
:::
:::

::: exercise Europium anomaly {level=1 check="positive"}
A rock has a positive europium anomaly relative to its neighbouring rare earths. Which process does that record?
::: solution
**Plagioclase accumulation.** Europium is divalent in reduced magmas, behaves like strontium, and enters plagioclase with $K_D \approx 1.5$–2.0 while all the other rare earths stay trivalent and incompatible. A rock with excess europium is therefore rich in cumulate plagioclase; a rock with a *negative* anomaly is a residue from which plagioclase was removed — which is why the bulk continental crust has a negative europium anomaly and why it is read as evidence that plagioclase is being buried in the lower crust.
:::
:::

::: exercise Removing plagioclase {level=2 check="51.2"}
A basalt with $50.0\ \mathrm{wt}\%$ $\mathrm{SiO_2}$ and $14.0\ \mathrm{wt}\%$ $\mathrm{Al_2O_3}$ loses 15 wt% of pure anorthite, $\mathrm{CaAl_2Si_2O_8}$ ($43.2\ \mathrm{wt}\%$ $\mathrm{SiO_2}$, $36.6\ \mathrm{wt}\%$ $\mathrm{Al_2O_3}$, $20.2\ \mathrm{wt}\%$ CaO). Find the silica and alumina contents of the residual liquid, in wt%.
::: solution
Using $C_L = (C_0 - XC_p)/(1-X)$:
$$
\mathrm{SiO_2} = \frac{50.0 - 0.15\times43.2}{0.85} = \frac{43.5}{0.85} = 51.2\ \mathrm{wt}\%,
\qquad
\mathrm{Al_2O_3} = \frac{14.0 - 0.15\times36.6}{0.85} = \frac{8.51}{0.85} = 10.0\ \mathrm{wt}\% .
$$
Silica rises by only $1.2$ per cent — anorthite is close to a basalt in silica content, so removing it barely changes that component — while alumina falls by nearly a third, because anorthite is far more aluminous than the liquid. This is the arithmetic behind the standard observation that a falling alumina trend at nearly constant silica means plagioclase fractionation, and it is also the reason no single-phase removal can differentiate a basalt very far: the phases that crystallise from a basalt are all made of the same ten oxides in slightly different proportions.
:::
:::

::: exercise Rayleigh at work {level=2 check="0.09"}
An element has $D = 3.0$. By what factor is its concentration in the liquid reduced when 70 % of the liquid has crystallised? What if $D$ is 3.5?
::: solution
$F = 0.30$, so $C_L/C_0 = 0.30^{\,3.0-1} = 0.30^{2} = 0.090$, a reduction by a factor of eleven. With $D = 3.5$ it is $0.30^{2.5} = 0.047$, a factor of twenty-one. The exponential sensitivity to $D$ is the practical difficulty of the whole method: a factor-of-two error in the bulk distribution coefficient, which is entirely normal when the mode of an oxide phase is uncertain, changes the predicted depletion by an order of magnitude. This is why trace-element models are quoted as trends and not as fits, and why the ratio of two elements with similar $D$ is always more informative than either concentration alone.
:::
:::

::: exercise Assimilation ratio from isotopes {level=2 check="0.22"}
Using the endmembers of [[#ex-mixing]], what fraction of granite is required to bring the mixture to $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7080$?
::: solution
22 %, from $f_\text{basalt} = 0.78$. The same mixture has $\mathrm{Sr} = 332\ \mathrm{ppm}$, only 1.7 times the basaltic value, and a further 20 % of assimilation would move the ratio by only $0.0008$ more. Isotope ratios saturate towards the contaminant long before the chemistry does.
:::
:::

::: exercise Recharge {level=2}
A layered intrusion shows a strontium ratio that rises from 0.704 to 0.709 over its lower half, then falls back to 0.705 at the top, while its magnesium content falls steadily throughout. What does that record, and why can fractional crystallisation alone not explain it?
::: solution
The isotope ratio records **contamination and then recharge**, not differentiation. Fractional crystallisation of a closed system changes isotope ratios only if the phases being removed have a different ratio from the liquid — and for strontium in a mafic magma the difference is small, so an excursion of $0.005$ cannot be produced by crystal removal. A rise followed by a fall at constant downward-trending magnesia means that crustal strontium was added in the middle of the history and then diluted by fresh, mantle-derived magma that also kept the magnesia from collapsing. The same conclusion comes independently from the major elements: the magnesium trend is too flat for closed-system fractionation. This is the standard evidence for a **feeder-controlled, open-system** magma chamber, and it is why the great layered intrusions are read as the products of repeated injection rather than of a single filling.
:::
:::

::: exercise The andesite problem {level=3}
Continental crust has a strongly bimodal composition with maxima at 46 % and 57 % $\mathrm{SiO_2}$ and a minimum near 51 %. Fractional crystallisation of basalt produces a continuous series. State two hypotheses that resolve the paradox and the observation that discriminates them.
::: solution
**(i) The thermal divide plus water.** Hydrous, oxidised basaltic liquids cannot pass through the 51–53 % gap by low-pressure fractionation, because magnetite and hornblende crystallise and the liquid stalls at andesitic composition; the gap is a *kinetic* gap in the differentiation path. **(ii) Crustal recycling.** The intermediate peak is not a differentiation product at all but the composition to which the crust is driven by dehydration melting of metabasalt in the lower crust, whose melt composition is controlled by the residual mineral assemblage (garnet, clinopyroxene, rutile) rather than by the parent liquid.

The discriminating observations are oxygen isotopes in zircon and the water content of the magmas. A crust-derived andesite carries zircons with $\delta^{18}\mathrm{O}$ above $+8\ \%$, and often inherited cores with Archaean or Proterozoic ages; a mantle-derived one does not. And a hydrous, oxidised, high-alumina andesite with 4–6 wt% dissolved water points to the mantle wedge, whereas a hot, dry, high-silica-alumina andesite with a garnet signature points to the lower crust. Both signatures are found, in different arcs and at different times, which is why the answer is "both, in proportions that vary".
:::
:::

::: exercise Derive the batch crystallisation law {level=3}
Derive $C_L/C_0 = 1/[D + F(1-D)]$ for equilibrium (batch) crystallisation, and show that it agrees with the Rayleigh law in the limit $D \to 1$ and differs most for $D \ll 1$ at small $F$.
::: solution
With $F$ of liquid and $1-F$ of solid present and in equilibrium, $C_S = DC_L$, and mass balance on one unit of system gives
$$
C_0 = FC_L + (1-F)C_S = C_L\left[F + (1-F)D\right] = C_L\left[D + F(1-D)\right],
$$
which is the batch law.

As $D \to 1$ the batch law gives $C_L/C_0 \to 1$ for every $F$, and the Rayleigh law gives $F^0 = 1$: an element that partitions equally between crystal and liquid is unaffected by either process, as it must be. For $D \ll 1$ the batch law gives $C_L/C_0 \approx 1/(D+F)$, which saturates at $1/F$ as $D \to 0$, while the Rayleigh law gives $C_L/C_0 = F^{\,D-1} \approx 1/F$ — the same limit. The two therefore agree at both extremes and differ most in between: at $D = 0.05$ and $F = 0.5$ the batch law gives $1/0.525 = 1.90$ and the Rayleigh law $0.5^{-0.95} = 1.93$, a 2 % difference, whereas at $F = 0.05$ they give $1/0.0975 = 10.3$ and $0.05^{-0.95} = 17.4$, a factor of 1.7. That is the practical lesson: the two models are indistinguishable at moderate differentiation and sharply distinguishable at high differentiation, which is exactly where the trace-element data are most informative.
:::
:::

::: exercise A mixing test {level=3}
Two basalts, A with $\mathrm{Sr} = 300\ \mathrm{ppm}$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7030$ and B with $\mathrm{Sr} = 900\ \mathrm{ppm}$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7060$, are candidates for the two components of a hybrid with $\mathrm{Sr} = 450\ \mathrm{ppm}$. Find the mixing proportion from the strontium concentration, predict the isotope ratio, and state what a measured ratio of 0.7048 rather than the prediction would imply.
::: solution
From the concentration, $f_A = (900 - 450)/(900 - 300) = 0.75$, so the hybrid is 75 % A and 25 % B. The predicted ratio is
$$
R = \frac{0.75\times300\times0.7030 + 0.25\times900\times0.7060}{450} = \frac{158.18 + 158.85}{450} = 0.7045 .
$$
A measured value of $0.7048$ is higher by $0.0003$, which is fifteen times the analytical precision of a good mass spectrometer. Three possibilities, in order of likelihood: a third, more radiogenic component (crustal strontium at a few tens of ppm dominates the ratio even in tiny amounts); the two endmembers are themselves zoned or heterogeneous, which is normal in a magma chamber; or the hybrid has undergone assimilation after mixing. Note that the concentration and the ratio give *different* proportions whenever a third component is present, and that the discrepancy itself — not either number — is the evidence. This is why isotope work is quoted with concentrations, and why a single ratio in a paper about mixing is never enough.
:::
:::
