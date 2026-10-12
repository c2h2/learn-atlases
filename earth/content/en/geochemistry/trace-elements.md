A trace element is one present at less than about 0.1–0.3 per cent, which means it is too dilute to form its own minerals and must therefore live in the crystal structures of others. That single constraint makes trace elements the most informative constituents of a rock: because they enter other people's lattices, they record the identity of those lattices, and because they are dilute they are not buffered by their own phases and so respond to every melt, every fluid and every metamorphic reaction the rock has been through. Almost everything petrologists know about mantle sources, crustal contamination, magma chambers and the chemistry of the early Earth comes from a handful of parts per million of thirty or so elements.

## Partitioning

::: definition The distribution coefficient {#def-partition}
For a trace element $X$ substituting at low concentration for a major element $M$ in a crystal, the **Nernst distribution law** takes the **Henry's-law** form
$$
D^{X}_{\mathrm{mineral/melt}} = \frac{C^{X}_{\mathrm{melt}}}{C^{X}_{\mathrm{mineral}}}\bigg|_{\text{dilute}} ,
$$
and $D$ is then **constant**, independent of the trace element's own concentration. The physical basis is the **Goldschmidt** (Goldschmidt) substitution rule: an ion enters a site to an extent set by the mismatch of its ionic radius and its charge, and at low concentration the strain energy of one ion does not interact with that of its neighbours. Two consequences are the whole of quantitative trace-element petrology. First, **$D$ is a function of pressure, temperature, melt composition and mineral composition**, not of the trace element's abundance — so a partition coefficient measured at one atmosphere on a dry melt may be wrong by an order of magnitude in the mantle. Second, **an element whose ionic radius and charge match a major site is compatible** ($D > 1$: Ni and Mg, Cr and Al in spinel and garnet, Sr in plagioclase), and an element whose radius is too large or whose charge is wrong is **incompatible** ($D \ll 1$: Rb, Ba, Th, U, K, the light rare earths, Nb, Ta). The **bulk distribution coefficient** of a rock is the modal average,
$$
D_{\mathrm{bulk}} = \sum_i X_i\,D_i ,
$$
summed over the phases $i$ with modal proportions $X_i$, and it is $D_{\mathrm{bulk}}$, not any mineral's $D_i$, that controls the melt chemistry.
:::

::: definition The two limiting melting and crystallisation models {#def-rayleigh}
**Rayleigh (Rayleigh) fractional crystallisation or melting** — equilibrium between the melt and the solids, followed by complete removal of the melt — gives
$$
\frac{C_L}{C_0} = F^{\,(D-1)},
$$
where $F$ is the fraction of liquid remaining and $C_0$ the starting concentration. **Batch (equilibrium) melting** — melting to completion with the melt kept in contact with the residue — gives
$$
\frac{C_L}{C_0} = \frac{1}{D + F(1-D)} .
$$
The two are **indistinguishable at $F$ near 1** and diverge dramatically at small $F$: for an element with $D = 0.1$, a melt fraction of 0.05 gives an enrichment of **14.8 times** by Rayleigh and only **6.9 times** by batch, and for a compatible element with $D = 2$ the Rayleigh melt is **twenty times more depleted** than the batch melt. The distinction is the single most powerful constraint on the **process** recorded by a rock: a strongly fractionated light-rear-earth pattern with a huge light-heavy fractionation requires **near-fractional** behaviour, whereas a modest one is consistent with equilibrium. Real systems lie between the limits, and the intermediate case — **non-modal batch melting**, in which a phase is consumed as melting proceeds — is the one that fits most mantle data.
:::

::: example Rayleigh against batch {#ex-rayleigh}
A mantle source has strontium at 12 ppm and a bulk $D_{\mathrm{Sr}}$ of 0.15, and nickel at 1900 ppm with $D_{\mathrm{Ni}} = 12$. Find the melt concentration of both for a melt fraction $F = 0.05$ under (a) batch and (b) Rayleigh melting, and interpret the result for a mid-ocean-ridge basalt against a komatiite.
::: solution
**Strontium** ($D = 0.15$, incompatible):
$$
\text{batch:}\quad \frac{C_L}{C_0} = \frac{1}{0.15 + 0.05\times0.85} = \frac{1}{0.1925} = 5.2, \qquad C_L = 62\ \mathrm{ppm};
$$
$$
\text{Rayleigh:}\quad \frac{C_L}{C_0} = 0.05^{-0.85} = 12.8, \qquad C_L = 153\ \mathrm{ppm}.
$$
**Nickel** ($D = 12$, strongly compatible):
$$
\text{batch:}\quad \frac{C_L}{C_0} = \frac{1}{12 + 0.05\times(-11)} = \frac{1}{11.45} = 0.087, \qquad C_L = 166\ \mathrm{ppm};
$$
$$
\text{Rayleigh:}\quad \frac{C_L}{C_0} = 0.05^{11} = 4.9\times10^{-15}, \qquad C_L \approx 0 .
$$
The incompatible element behaves **similarly** in the two models — a factor of 2.5 — because at $F \ll 1$ the batch equation approaches $1/D$ and the Rayleigh approaches $F^{D-1}$, and both are large. The compatible element behaves **completely differently**: batch melting preserves 9 per cent of the source's nickel and Rayleigh melting destroys it.

This is the reason the **komatiite problem** exists. Komatiites carry 1000–3000 ppm of magnesium and hundreds of ppm of nickel, which requires a melt in equilibrium with, or segregated from, a residue whose olivine had a very high $D_{\mathrm{Ni}}$. A **high-degree batch melt** of a hot Archaean mantle gives 500–2000 ppm Ni and is the standard explanation. A **low-degree fractional melt** gives essentially none. The corollary is that a **modern mid-ocean-ridge basalt**, with 10–15 per cent MgO and 80–120 ppm Ni, is a **low-degree batch melt** of a depleted mantle that has been **subsequently olivine-fractionated at shallow depth** — the high nickel of the primary melt has been partly removed by the olivine that crystallised on the way up, and the difference between the two numbers is the amount of olivine that accumulated in the lower crust.

The general lesson is that **compatible elements are process indicators and incompatible elements are source indicators**. Nickel, chromium, cobalt, scandium and the platinum-group elements record how much olivine, spinel, garnet or sulfide the melt saw after it formed; rubidium, strontium, the rare earths, hafnium, neodymium, thorium and uranium record the source's depletion history, because their $D$ is so small that a few per cent of melting barely touches them.
:::
:::

::: widget plot
f: exp(-0.85*ln(x))
x: 0.05, 1
y: 0, 15
labels: \text{Rayleigh}
caption: The Rayleigh enrichment $C_L/C_0 = F^{\,(D-1)}$ of an element with $D = 0.15$ plotted against the melt fraction $F$. The curve is **vertical at small $F$**: the first 5 per cent of melting concentrates the incompatible elements twelvefold, and going from 5 to 50 per cent of melting adds only another factor of 1.7. This is why a **small-degree melt** — a carbonatite, a kimberlite, a boninite, a low-degree alkali basalt — carries extreme enrichments and extreme isotope signatures, and why the most primitive and most informative magmas are also the ones most easily explained by an exotic source when an exotic **melt fraction** would do as well. The corollary is that any claim about a source must first establish the melt fraction, and the elements that establish it are the **heavy rare earths and the compatible elements**, whose $D$ is large enough to have been changed.
:::

## The rare earths

::: definition The lanthanide pattern {#def-ree}
The rare-earth elements (La–Lu, plus Y inserted between Dy and Ho) are chemically almost identical, differing only in the steady contraction of the ionic radius from La³⁺ (1.36 Å) to Lu³⁺ (1.03 Å) in eight-fold coordination. Because their partition coefficients vary **smoothly and systematically** with radius, a rock's rare-earth pattern is a **magnifying glass on the mineralogy of its origin**, and it is read after normalising to **chondrite** (to display the fractionation) or to the **primitive mantle** (to display the absolute enrichment). The diagnostic features are: the **light-REE enrichment** $(\mathrm{La/Yb})_N$, which is high when garnet or a fluid was involved and low in a depleted-mantle melt; the **heavy-REE slope** $(\mathrm{Dy/Yb})_N$, which is **flat to light-depleted when garnet was in the residue** (garnet holds the heavy rare earths, with $D_{\mathrm{Yb}}$ of 5–10 at 3 GPa) and **flat or light-enriched when only spinel and clinopyroxene were**; the **europium anomaly** $\mathrm{Eu/Eu^*} = \mathrm{Eu_N}/\sqrt{\mathrm{Sm_N\,Gd_N}}$, which is positive when plagioclase accumulated or fractionated (Eu²⁺ substitutes for Ca) and negative when plagioclase was left in a source or removed from a melt; and the **cerium anomaly** $\mathrm{Ce/Ce^*} = \mathrm{Ce_N}/\sqrt{\mathrm{La_N\,Pr_N}}$, which is a **redox** feature (Ce⁴⁺ is insoluble and is removed from oxidised water) and is the only rare-earth anomaly not produced by magmatic mineralogy. The **holmium–dysprosium ratio** is the control test: Ho and Dy have identical chemistry and no valence change, so a measured $\mathrm{Ho/Dy}$ anomaly in a sediment or a chemical sediment proves **analytical or diagenetic** rather than process-related behaviour.
:::

::: example Reading a rare-earth pattern {#ex-ree}
Two basalts have the following chondrite-normalised ratios: basalt A, $(\mathrm{La/Sm})_N = 0.26$, $(\mathrm{Dy/Yb})_N = 1.30$, $\mathrm{Eu/Eu^*} = 1.00$; basalt B, $(\mathrm{La/Sm})_N = 2.4$, $(\mathrm{Dy/Yb})_N = 0.75$, $\mathrm{Eu/Eu^*} = 1.00$. Both have $\mathrm{Nb/Nb^*} = 1.0$ and $\mathrm{Th/La} = 0.3$. Interpret the sources and the melting.
::: solution
**Basalt A** has a **light-rare-earth-depleted, heavy-rare-earth-enriched** pattern: $(\mathrm{La/Sm})_N = 0.26$ is a strongly fractionated depletion and $(\mathrm{Dy/Yb})_N = 1.30$ says the **heavy rare earths are held down relative to the middle**, which is the diagnostic signature of **garnet in the residue**. The flat europium and the absence of a niobium or thorium anomaly say **no plagioclase accumulation, no crustal contamination and no subduction component**. This is a normal **mid-ocean-ridge basalt** from a **garnet-depleted spinel-garnet transition** source, and the light-rare-earth depletion measures the **degree of prior melt extraction** from the source, not the melting that made this basalt.

**Basalt B** has the opposite slope in the heavy rare earths: $(\mathrm{Dy/Yb})_N = 0.75$ means the **heavy rare earths are enriched relative to the middle rare earths**, which is the signature of a residue that contained **no garnet** — garnet is the only common phase whose partition coefficients rise steeply across the heavy rare earths, so its absence leaves the heavy end of the pattern unfractionated or inverted. Combined with $(\mathrm{La/Sm})_N = 2.4$ — a moderately enriched light-rare-earth pattern — and the absence of a subduction signature, this is a **within-plate or continental intraplate basalt** from a **moderately enriched spinel-lherzolite source at shallow depth and low melt fraction**, the classic chemistry of a European Tertiary volcanic-field basalt or of an ocean-island series' shallow, enriched component.

The **quantitative** reading comes from the heavy rare earths. Ytterbium has $D_{\mathrm{Yb}} \approx 8$ in garnet and $\approx 0.2$ in clinopyroxene, so a source containing 10 per cent garnet has $D_{\mathrm{bulk,Yb}} \approx 0.9$ and its melt can be no more than about **1.1 times** enriched in ytterbium over the source, whatever the melt fraction. Basalt B's ytterbium enrichment over primitive mantle therefore **measures the source enrichment directly**, and its light-rare-earth enrichment over that ytterbium value measures the **melt fraction** — the classic separation of source from process.

The **absence of a europium anomaly in both** is itself informative: it rules out any plagioclase control, which in turn rules out a **low-pressure** origin for basalt B and rules out a **plagioclase-rich cumulate** affinity for both. A negative europium anomaly in a sediment, by contrast, is the classic evidence for a **granitic upper-crustal provenance**, because the whole continental crust has $\mathrm{Eu/Eu^*} \approx 0.6$ from the plagioclase fractionation that made it.
:::
:::

::: example Sulfide saturation against a refractory source {#ex-sulfide}
A picrite contains 1800 ppm of Ni, 8 ppm of sulfur and 2 ppb of palladium, whereas a primitive-mantle-normalised picture gives Ni at 1.2 times, sulfur at 0.05 times and palladium at 0.02 times the primitive mantle. A colleague argues that the source is a **refractory, high-degree-melt residue**. Test the argument.
::: solution
A **refractory residue** is depleted in everything compatible — olivine, pyroxene, spinel and, above all, **sulfide**, which was expelled from the residue during the earlier melting event. Such a source would give a melt that is **low in nickel, low in sulfur and low in the platinum-group elements simultaneously**, and the depletions would be **correlated with each element's compatibility in the residue phases**.

That is not what the data say. The melt is **enriched** in nickel (1.2 times primitive mantle) but **depleted** in sulfur (0.05 times) and in palladium (0.02 times). Nickel behaves **incompatibly** here and the chalcophile elements behave **compatibly**, and the only process that does that is **sulfide saturation**: an immiscible monosulfide liquid, which forms as soon as the melt exceeds its sulfur solubility of about 800–1200 ppm at olivine-abundance, partitions palladium with a sulfide/silicate partition coefficient of $10^3$–$10^4$ and removes 98 per cent of it in a single event, while leaving the nickel largely in the silicate because nickel is only moderately chalcophile.

The **quantitative test** is the sulfur content. A primitive melt saturated with olivine, orthopyroxene and spinel at 1 GPa holds about 1000 ppm of sulfur; this rock holds 8 ppm, a factor of 125 below saturation, which means the sulfur was **lost** — and sulfur cannot be lost except by exsolving a sulfide liquid or a sulfide vapor. The **Ni–S–Pd triangle** therefore diagnoses the process uniquely:
$$
\text{high Ni} + \text{low S} + \text{low Pd} \Rightarrow \text{sulfide saturation}; \qquad
\text{low Ni} + \text{low S} + \text{low Pd} \Rightarrow \text{refractory source}.
$$
The distinction is not academic. If the palladium depletion is a **source** feature, the magma has no ore potential; if it is the product of an **immiscible sulfide liquid that segregated somewhere below the sampled level**, then that sulfide is sitting at the base of the conduit or in a magma chamber, and it may carry the economic nickel, copper and platinum-group-element deposit. This is the reasoning behind the **R factor** (the ratio of the mass of silicate magma to the mass of sulfide liquid that equilibrated with it) of Barnes and Naldrett (Barnes) and Lightfoot and (Lightfoot), and it is the single most valuable number in magmatic sulfide exploration. For a melt carrying 2 ppb of palladium and a sulfide/melt partition coefficient of $10^4$, an R factor of 100 gives a sulfide with $10^4\times2/(1+100) = 200$ ppb of palladium and an R factor of 10,000 gives one with $10^4\times2/(1+1) = 10^4$ ppb — **fifty times richer**, because a small amount of sulfide equilibrated with a large amount of magma scavenges the metal far more efficiently. High-R sulfides are the ore-grade ones, and the R factor is therefore read from the metal tenor of the sulfide itself.
:::
:::

## Mixing, contamination and the cumulate problem

::: definition Two-component mixing and hyperbolic mixing {#def-mixing}
Mixing two magmas conserves each element's **mass**, so a mixed concentration is the **linear** combination
$$
C_m = \alpha C_A + (1-\alpha)C_B ,
$$
with $\alpha$ the fraction of component A. A plot of one element against another is therefore a **straight line**, and the mixing proportion is read directly. A plot of a **ratio against a ratio**, however, is a **hyperbola**, because
$$
\frac{C^1}{C^2} = \frac{\alpha C_A^1 + (1-\alpha)C_B^1}{\alpha C_A^2 + (1-\alpha)C_B^2}
$$
is a fractional function of $\alpha$. The consequence is the most-used diagram in igneous geochemistry: on a plot of $\mathrm{Sr/Nd}$ against $\mathrm{Ba/Nd}$, or of $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ against $1/\mathrm{Sr}$, a **linear array of samples is a mixing array only if the denominators are matched**, and a curved array is still a mixing array. The corollary is that a **curved** trace-element trend cannot be attributed to fractional crystallisation without testing the alternative, and that a **straight** $1/x$ versus $x$ array is the classic test for **assimilation–fractional crystallisation**.
:::

::: example Assimilation and the crustal contaminant {#ex-mixing}
A depleted-mantle magma with La 1.2 ppm, Sr 80 ppm and $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.5131$ assimilates continental crust with La 32 ppm, Sr 380 ppm and $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7180$. A contaminated sample has La 6.0 ppm and Sr 145 ppm. Find the mass fraction of crust assimilated from each element, and explain why the two disagree.
::: solution
From the **lanthanum** mass balance,
$$
\alpha = \frac{6.0 - 1.2}{32 - 1.2} = \frac{4.8}{30.8} = 0.156 ;
$$
from the **strontium** mass balance,
$$
\alpha = \frac{145 - 80}{380 - 80} = \frac{65}{300} = 0.217 .
$$
The two disagree by 40 per cent, and the reason is that **lanthanum and strontium are not equally compatible**: during the assimilation the magma is also crystallising olivine, plagioclase and clinopyroxene, which removes strontium (a compatible element in plagioclase, $D \approx 1.5$) far faster than lanthanum ($D \approx 0.05$). A **two-component mixing model applied to elements with different partition coefficients gives inconsistent mixing fractions**, and the standard remedy is to use **incompatible-element pairs with matched partition coefficients** (La and Ce, Th and U, Nb and Ta, Sm and Nd) or to model assimilation and crystallisation **simultaneously** — the **energy-constrained** assimilation–fractional-crystallisation model of Devey (Devey) and of Spera and Bohrson (Bohrson), in which the heat released by crystallisation limits the mass of rock that can be melted, so a magma that has assimilated 20 per cent crust must have crystallised a comparable mass.

The isotope check closes the argument. The predicted strontium isotope ratio for $\alpha = 0.156$ is
$$
\frac{0.156\times380\times0.7180 + 0.844\times80\times0.5131}{0.156\times380 + 0.844\times80} = \frac{42.6+34.6}{59.3+67.5} = 0.609 ,
$$
and for $\alpha = 0.217$ it is 0.630. A measured $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ of 0.61 therefore supports the **lanthanum** mixing fraction and shows that the strontium concentration has been disturbed by plagioclase — a conclusion that could not be reached without both the trace elements and the isotope.
:::
:::

::: warning A rock's trace-element pattern is not its magma's
Three processes rewrite a trace-element pattern after the melt forms, and each can mimic a source signature. **Crystal accumulation**: a cumulate with 50 per cent olivine has the compatible-element content of the olivine plus the **trapped intercumulus liquid**, and a cumulate with only 10 per cent trapped liquid has a light-rare-earth pattern that is 90 per cent controlled by the liquid and 10 per cent by the crystals — so a "primitive" sample with low rare earths may be a **cumulate** rather than a primitive melt, and the test is the **ratio of two elements that both partition only into the liquid** (La/Sm, Th/La, Nb/La), which is unchanged by crystal accumulation but whose **absolute values** are. **Sulfide saturation**: an immiscible sulfide liquid strips 99 per cent of the Os, Ir, Ru, Rh, Pt, Pd, Re, Se, Te and As from a silicate melt in a single event, and the resulting depletion of the platinum-group elements is **indistinguishable from a high-degree melt of a refractory source** unless the sulfur content and the sulfide textures are measured — the classic error in Archaean komatiite and boninite geochemistry. **And fluid alteration**: subduction fluids carry Rb, Ba, Sr, Pb and U and leave Nb, Ta, Ti and the heavy rare earths behind, so a "crustal" signature in a arc basalt may be a **fluid** signature from a few per cent of altered oceanic crust rather than a few tens of per cent of sediment, and the discriminators are the **ratios of highly fluid-mobile to fluid-immobile elements** (Rb/Nb, Ba/Nb, Th/Nb, U/Nb, and the Cs/Rb ratio, which distinguishes a slab-dehydration fluid from a slab melt). The discipline is to state, for every trace-element interpretation, **which of the four processes — melting, fractionation, accumulation, alteration — has been excluded and by which observation**, and to remember that the elements most used to identify a source (Rb, Ba, Th, U, Pb, K) are precisely the ones most mobile in a fluid.
:::

::: history
The story begins with **Victor Goldschmidt** (Goldschmidt), whose 1923 classification of the elements and whose thirteen *Geochemische Verteilungsgesetze der Elemente* papers (Goldschmidt) established the rules of isomorphous substitution and the concept of the trace element as a **structural probe**. **Doerner and Hoskins** (Hoskins) gave the first experimental strontium partition data in 1925 and **Interrante** (Interrante) the theory of dilute substitution. **Rayleigh**'s (Rayleigh) 1872 paper on fractionating crystallisation solutions — a paper on salt, not on magma — supplied the equation. **Hanson** (Hanson) and **Tatsumoto** (Tatsumoto) made the rare earths routine in the late 1960s, and **Gast** (Gast) and **Hutchison** (Hutchison) first modelled them as melting tracers. The **partition-coefficient revolution** is the work of **Green and Green** (Green), **Kay** (Kay), **Fujii** (Fujii), **Nielsen** (Nielsen), **Dunning** (Dunning), **Shimizu** and the Lamont secondary-ion-mass-spectrometry school (Shimizu), and above all of **Frey** (Frey), whose papers of 1968 and 1978 defined the trace-element vocabulary of petrology, and of **Price** (Price) and **Sun** (Sun), whose experimental compilations of the 1970s are still the reference set. The **rare-earth pattern as a garnet monitor** is the work of **Graham and Frey** (Graham) and of **Helz** (Helz); the **rare-earth tetrad effect** is the work of **Bau** (Bau) and **Möller and Bau** (Möller). **Assimilation–fractional-crystallisation** modelling is the work of **Arth** (Arth), **De Waal** (Waal), **O'Hara** (O'Hara) and **Powell** (Powell), and its **energy-constrained** version is **Devey** (Devey) 1980 and **Spera and Bohrson** (Bohrson) 2001. The **subduction fluid** tracers are those of **Tatsumoto, Hamilton and Nesbitt** (Nesbitt), **Ryan and Langmuir** (Langmuir), **Stolz and Stern** (Stolz) and **Elliott** (Elliott).
:::

## Where this leads

The partition coefficients themselves are measured in the experiments behind [[mineralogy-petrology/magma-evolution]] and [[mineralogy-petrology/phase-diagrams]], the isotope systems built on the parent–daughter pairs are in [[geochemistry/radiogenic-tracers]] and [[geochemistry/geochronology]], the sedimentary provenance applications are in [[sedimentology/stratigraphy]] and [[sedimentology/facies]], the ore deposits are in [[earth-resources/magmatic-hydrothermal]] and [[earth-resources/critical-minerals]], the marine authigenic and palaeoceanographic applications are in [[oceanography/ocean-chemistry]] and [[palaeoclimate/proxies]], and the thermodynamic basis of the distribution law is in [[geochemistry/reactions]].

::: quiz
A basalt has $(\mathrm{La/Yb})_N = 4.0$ and $(\mathrm{Dy/Yb})_N = 0.7$. What does the heavy-rare-earth slope tell you that the light-rare-earth enrichment does not?
- [ ] The degree of partial melting.
- [x] That garnet was present in the source or residue, because garnet retains the heavy rare earths and flattens or inverts the heavy-rare-earth slope.
- [ ] The temperature of melting.
- [ ] The extent of crustal contamination.
::: solution
The light-rare-earth enrichment $(\mathrm{La/Yb})_N$ can be produced by a small melt fraction, an enriched source, or crustal contamination — it is ambiguous. The **heavy-rare-earth slope** $(\mathrm{Dy/Yb})_N$ is controlled almost entirely by **garnet**, whose partition coefficients rise steeply across the heavy rare earths, so a value below 1 is a **mineralogical** statement about the residue rather than a process statement. Garnet is the only common mantle phase with this property, and this is why the depth of melting of a basalt is read from the heavy-rare-earth slope while its source enrichment is read from the light-rare-earth enrichment.
:::
:::

::: summary
- A trace element is dilute enough to obey Henry's law, so its mineral/melt distribution coefficient is constant and set by ionic radius, charge, pressure, temperature and composition.
- Compatible elements record what the melt saw after it formed; incompatible elements record the source.
- Rayleigh and batch behaviour agree at large melt fraction and diverge by an order of magnitude at small melt fraction, especially for compatible elements.
- The rare-earth pattern separates source (light rare earths) from residue mineralogy (heavy-rare-earth slope, garnet) from plagioclase (europium) from redox (cerium).
- Mixing is linear in concentrations and hyperbolic in ratios, and a mixing model applied to elements with different partition coefficients gives inconsistent answers.
- Cumulate addition, sulfide saturation and fluid alteration can each mimic a source signature, and each must be excluded by a specific observation.
:::

## Exercises

::: exercise Bulk distribution {level=1 check="0.018"}
A mantle peridotite contains 60 per cent olivine ($D_{\mathrm{Sr}} = 0.001$), 25 per cent orthopyroxene ($D_{\mathrm{Sr}} = 0.01$), 10 per cent clinopyroxene ($D_{\mathrm{Sr}} = 0.15$) and 5 per cent spinel ($D_{\mathrm{Sr}} = 0.005$). Find the bulk $D_{\mathrm{Sr}}$.
::: solution
$D_{\mathrm{bulk}} = 0.60(0.001) + 0.25(0.01) + 0.10(0.15) + 0.05(0.005) = 0.0006 + 0.0025 + 0.015 + 0.00025 = 0.018$.
Ten per cent of one phase dominates the whole budget, which is why a modal determination to within a few per cent matters more than a trace-element analysis to within a few per cent.
:::
:::

::: exercise Rayleigh {level=1 check="4.3"}
An element with $D = 0.1$ is fractionated to a liquid fraction $F = 0.2$. Find $C_L/C_0$.
::: solution
$C_L/C_0 = F^{D-1} = 0.2^{-0.9} = 4.3$. The element has been concentrated more than fourfold by the removal of 80 per cent of the liquid as crystals.
:::
:::

::: exercise Anomalies {level=1}
A rock has $\mathrm{Sm_N} = 20$, $\mathrm{Gd_N} = 21$ and $\mathrm{Eu_N} = 9$. Find the europium anomaly.
::: solution
$\mathrm{Eu/Eu^*} = 9/\sqrt{20\times21} = 9/20.5 = 0.44$. A strongly **negative** europium anomaly, characteristic of a rock that has lost plagioclase — the upper continental crust, a granitic gneiss, or a sediment derived from them.
:::
:::

::: exercise Batch against Rayleigh {level=2 check="0.51"}
For $D = 2$ and $F = 0.05$, find $C_L/C_0$ for batch melting, for Rayleigh melting, and the ratio of the two.
::: solution
Batch: $C_L/C_0 = 1/[2 + 0.05(1-2)] = 1/1.95 = 0.51$. Rayleigh: $C_L/C_0 = F^{D-1} = 0.05^{1} = 0.05$. The ratio is $0.51/0.05 = 10$.
:::
:::

::: exercise Mixing {level=2 check="0.21"}
Magma A has Th 12 ppm and magma B has Th 0.8 ppm. A mixture has Th 3.2 ppm. Find the fraction of A.
::: solution
$\alpha = (3.2 - 0.8)/(12 - 0.8) = 2.4/11.2 = 0.21$. Twenty-one per cent of A. If the same mixture is analysed for an element with a different partition coefficient and gives a different $\alpha$, the two-component mixing model is wrong and fractional crystallisation must be included.
:::
:::

::: exercise Nickel and olivine {level=2 check="3600"}
A komatiitic melt contains 300 ppm Ni. Taking the olivine/melt partition coefficient $D_{\mathrm{Ni}} = 12$, find the nickel content of the first olivine to crystallise.
::: solution
$C_{\mathrm{Ol}} = D\times C_{\mathrm{melt}} = 12\times300 = 3600\ \mathrm{ppm}$. This is the range measured in Archaean komatiitic olivines (2000–4000 ppm), and it is the classic evidence that komatiites are **liquid**, not the metamorphosed product of a magnesium-rich rock — a metamorphic origin cannot concentrate nickel in olivine to 0.4 per cent.
:::
:::

::: exercise A cumulate's rare earths {level=3 check="6.0"}
A cumulate contains 85 per cent accumulated olivine and 15 per cent trapped intercumulus liquid. The intercumulus liquid has La 40 ppm and the olivine has La 0.05 ppm. Find the rock's La content and the fraction of the rock's lanthanum that came from the liquid.
::: solution
$$
C_{\mathrm{rock}} = 0.85\times0.05 + 0.15\times40 = 0.043 + 6.0 = 6.0\ \mathrm{ppm},
$$
and the liquid supplies $6.0/6.04 = 99$ per cent of it. A rock that is **85 per cent crystals** by mode is **99 per cent liquid** by rare-earth budget, so its light-rare-earth pattern, its light-rare-earth isotope systematics and its elemental ratios are those of a **melt**, not of a crystal cumulate — and its low absolute rare-earth content (6 ppm against the liquid's 40) is the only clue that it is a cumulate at all.

This is the **cumulate trap**, and it is why the standard test is the **ratio of two equally incompatible elements** (La/Sm, Th/La, Nb/La, Ce/Pr), which is **unchanged** by the addition of lanthanum-free olivine, plotted against the **absolute** concentration, which is not. A cumulate plots on the same **trend** as its parent liquid on a ratio–ratio diagram and at a different **distance along** it, and any interpretation that reads the trend as a source signature without checking the concentration is unsafe.
:::
:::

::: exercise The garnet monitor {level=3 check="1.5"}
A source contains 8 per cent garnet, with $D_{\mathrm{Yb}} = 8$ in garnet, 0.2 in clinopyroxene, 0.01 in olivine and 0.02 in orthopyroxene; the modes are 8, 10, 62 and 20 per cent. Find the bulk $D_{\mathrm{Yb}}$ and the maximum enrichment of ytterbium in a batch melt, and explain why the heavy rare earths measure the source rather than the melt fraction.
::: solution
$$
D_{\mathrm{bulk}} = 0.08\times8 + 0.10\times0.2 + 0.62\times0.01 + 0.20\times0.02 = 0.64+0.02+0.006+0.004 = 0.67 ,
$$
and the batch-melt enrichment at any melt fraction is bounded by
$$
\frac{C_L}{C_0} = \frac{1}{D + F(1-D)} \le \frac{1}{D} = 1.5 .
$$
At $F = 1$ the enrichment is 1.0 and at $F = 0.05$ it is $1/(0.67+0.05\times0.33) = 1.4$.

The point is the **narrowness of the range**: for an element with $D$ near unity, the batch-melt enrichment varies by only 50 per cent over the whole range of melt fractions, whereas for a light rare earth with $D = 0.01$ it varies by a factor of 100. **The heavy rare earths are therefore almost immune to the melt fraction and respond only to the source concentration and to the presence of garnet** — which is why $(\mathrm{Yb})_N$ or $(\mathrm{Lu})_N$ is used as the source-enrichment normaliser for $(\mathrm{La/Sm})_N$, why the samarium–neodymium isotope system is so robust, and why a claim of an "enriched source" based on a light-rare-earth enrichment **normalised to chondrite rather than to the heavy rare earths** is worthless.
:::
:::
