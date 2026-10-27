In the 1960s and 70s, scientists began finding polychlorinated biphenyls (PCBs) and the insecticide DDT in places where they had never been used: in the fat of Arctic seals, in the eggs of seabirds on remote islands, in the breast milk of Inuit women living thousands of kilometres from any industry or farm. The concentrations in these top predators were millions of times higher than in the surrounding sea water. How can a substance released in one place, in tiny concentrations, end up concentrated in another? The answer lies in three physical-chemical properties — how strongly a compound prefers fat to water, how readily it moves between water and air, and how slowly it degrades — and in the way these properties steer it through the environment. This lesson develops the quantitative tools to predict that journey: partition coefficients, sorption, the fugacity concept of Donald Mackay, and the kinetics of degradation and bioaccumulation. It closes with the very different chemistry of persistent inorganic pollutants, the heavy metals, whose fate is governed by speciation ([[environmental-chemistry/natural-waters]]) rather than by partitioning.

## Persistent organic pollutants

::: definition Persistent organic pollutant {#def-pop}
A **persistent organic pollutant** (POP) is an organic substance that (1) resists degradation in the environment (**persistence**, with half-lives of months to years in water, soil or sediment), (2) accumulates in the fatty tissue of organisms (**bioaccumulation**), (3) undergoes **long-range environmental transport** through air or water to regions far from its sources, and (4) has adverse effects on human health or the environment (**toxicity**). The four criteria are those of Annex D of the Stockholm Convention on Persistent Organic Pollutants (adopted 2001, in force 2004); screening values include, for example, a half-life in water above two months or a bioconcentration factor above $5000$ (or $\log K_\mathrm{ow} > 5$). The criteria are regulatory screening rules, not sharp chemical boundaries.
:::

The Convention initially listed twelve substances or groups — eight organochlorine pesticides (aldrin, chlordane, dieldrin, endrin, heptachlor, mirex, toxaphene and DDT), the industrial chemicals PCBs and hexachlorobenzene, and the unintentional by-products polychlorinated dibenzo-*p*-dioxins and dibenzofurans. It has since been extended, among others to perfluorooctane sulfonic acid (PFOS, 2009), hexabromocyclododecane (2013), perfluorooctanoic acid (PFOA, 2019) and perfluorohexane sulfonic acid (PFHxS, 2022). Each listing restricts or eliminates production and use, subject to specific exemptions agreed by the parties; DDT, for instance, remains permitted for disease-vector control.

The chemistry behind persistence is mostly bond strength and the absence of reactive sites. Polychlorinated aromatics have strong $\mathrm{C(sp^2){-}Cl}$ bonds, no easily abstracted hydrogens and electron-poor rings that resist both oxidation by OH and attack by microbial oxygenases; perfluorinated compounds are protected by the $\mathrm{C{-}F}$ bond (about $485\ \mathrm{kJ\,mol^{-1}}$, the strongest single bond to carbon), and a fluorine sheath that blocks attack on the carbon chain. Their hazards, described by mechanism: many organochlorines are lipophilic and act on the nervous system (DDT keeps sodium channels in nerve membranes open); dioxins and dioxin-like PCBs bind the aryl hydrocarbon receptor, a transcription factor, disturbing gene expression and causing developmental, immune and carcinogenic effects; several POPs are endocrine disruptors that interfere with hormone signalling. Toxic potencies of dioxin-like compounds are expressed relative to 2,3,7,8-tetrachlorodibenzo-*p*-dioxin by WHO toxic equivalency factors.

## Partition coefficients

A molecule released into the environment distributes itself among air, water, organic matter and organisms according to equilibrium partition coefficients, modified by the rates of transfer and degradation.

::: definition Partition coefficients K_ow, K_aw and K_oa {#def-partition}
For a neutral organic compound at dilute concentrations,
- the **octanol–water partition coefficient** $K_\mathrm{ow} = C_\text{octanol}/C_\text{water}$ at equilibrium (both in $\mathrm{mol\,m^{-3}}$) is a surrogate for partitioning into lipids and natural organic matter, and is usually quoted as $\log K_\mathrm{ow}$;
- the **air–water partition coefficient** (dimensionless Henry's law constant) $K_\mathrm{aw} = C_\text{air}/C_\text{water} = H/RT$, where $H = p/C_\text{water}$ ($\mathrm{Pa\,m^3\,mol^{-1}}$) is the Henry's law constant in the form used in environmental chemistry;
- the **octanol–air partition coefficient** $K_\mathrm{oa} = K_\mathrm{ow}/K_\mathrm{aw}$ describes uptake from air into plant waxes, soil organic matter and aerosols.

The three are linked thermodynamically through the chemical potential, so any two determine the third. They depend on temperature (each with an enthalpy of phase transfer, so that van 't Hoff plots are linear) and, for ionisable compounds, on pH: only the neutral form partitions into octanol.
:::

Typical values at $25\ \mathrm{°C}$ (from the compilation of Mackay et al., *Handbook of Physical-Chemical Properties and Environmental Fate for Organic Chemicals*): benzene $\log K_\mathrm{ow} = 2.13$, $H = 557\ \mathrm{Pa\,m^3\,mol^{-1}}$ ($K_\mathrm{aw} = 0.22$); naphthalene $\log K_\mathrm{ow} = 3.37$, $H = 43\ \mathrm{Pa\,m^3\,mol^{-1}}$ ($K_\mathrm{aw} = 0.017$); higher PCBs and DDT $\log K_\mathrm{ow} \approx 6$–$7$. A rough map follows: compounds with high $K_\mathrm{aw}$ are found mainly in air; with high $K_\mathrm{ow}$, in soil, sediment and fat; with high $K_\mathrm{oa}$, in vegetation and in cold-region deposits. The physics behind $K_\mathrm{ow}$ is the hydrophobic effect: transferring a non-polar molecule from water into octanol releases the ordered water around its cavity, a gain that grows with the molecular surface area. That is why each additional chlorine on a biphenyl raises $\log K_\mathrm{ow}$ by roughly $0.5$, and why $K_\mathrm{ow}$ correlates so well with molecular size within a homologous series.

::: example Partitioning in a headspace vial {#ex-headspace}
For headspace analysis, $10.0\ \mathrm{cm^3}$ of a water sample is sealed in a $20.0\ \mathrm{cm^3}$ vial and equilibrated at $25\ \mathrm{°C}$. What fraction of the benzene ($K_\mathrm{aw} = 0.225$) and of the naphthalene ($K_\mathrm{aw} = 0.0174$) originally in the water ends up in the $10.0\ \mathrm{cm^3}$ of headspace?
::: solution
Mass balance: $n_\text{tot} = C_\mathrm{w}V_\mathrm{w} + C_\mathrm{a}V_\mathrm{a} = C_\mathrm{w}(V_\mathrm{w} + K_\mathrm{aw}V_\mathrm{a})$, so the headspace fraction is
$$
\phi_\mathrm{a} = \frac{K_\mathrm{aw}V_\mathrm{a}}{V_\mathrm{w} + K_\mathrm{aw}V_\mathrm{a}} .
$$
Benzene: $0.225\times10.0/(10.0 + 2.25) = 0.184$, i.e. $18\ \%$. Naphthalene: $0.174/(10.0 + 0.174) = 0.017$, i.e. $1.7\ \%$. Headspace sampling therefore works well for volatile compounds such as benzene, toluene and chlorinated solvents, but poorly for semi-volatiles; heating the vial (which raises $K_\mathrm{aw}$) or adding salt (salting out) improves recovery. This is the same algebra as the dissolved fraction in [[#prop-koc]] with air replacing sediment — the first hint of the general fugacity bookkeeping below.
:::
:::

## Sorption to soils and sediments

Hydrophobic organic compounds in water are attracted not so much to mineral surfaces as to the natural organic matter coating them, into which they partition much as into octanol.

::: proposition Organic-carbon normalised sorption {#prop-koc}
For a hydrophobic neutral compound, the solid–water distribution coefficient of a soil or sediment is proportional to its fraction of organic carbon $f_\mathrm{oc}$:
$$
K_\mathrm{d} = \frac{C_\text{solid}}{C_\text{water}} = f_\mathrm{oc}K_\mathrm{oc},
$$
with $C_\text{solid}$ in $\mathrm{mg\,kg^{-1}}$ and $C_\text{water}$ in $\mathrm{mg\,dm^{-3}}$, so $K_\mathrm{d}$ is in $\mathrm{dm^3\,kg^{-1}}$. The organic-carbon partition coefficient is correlated with $K_\mathrm{ow}$; an often-used empirical relation (Karickhoff, Brown and Scott, 1979) is $K_\mathrm{oc} \approx 0.41K_\mathrm{ow}$ ($\mathrm{dm^3\,kg^{-1}}$). In a system with a mass of solids $m_\mathrm{s}$ per volume of water $V_\mathrm{w}$ (solids-to-water ratio $r_\mathrm{sw} = m_\mathrm{s}/V_\mathrm{w}$), the fraction of the compound dissolved is
$$
f_\mathrm{w} = \frac{1}{1 + K_\mathrm{d}\,r_\mathrm{sw}} .
$$
Conditions: linear isotherm (low concentrations), equilibrium, $f_\mathrm{oc} \gtrsim 0.001$ (below that, mineral surfaces contribute), neutral compound. Black carbon (soot, char) can sorb planar aromatics far more strongly than predicted.
:::

::: proof Mass balance between solid and water {#proof-koc}
If organic matter behaves as a bulk partitioning phase, each kilogram of solid contains $f_\mathrm{oc}$ kg of organic carbon, which holds $K_\mathrm{oc}C_\text{water}$ per kg; hence $C_\text{solid} = f_\mathrm{oc}K_\mathrm{oc}C_\text{water}$. The total amount in the system is $V_\mathrm{w}C_\text{water} + m_\mathrm{s}C_\text{solid} = V_\mathrm{w}C_\text{water}(1 + K_\mathrm{d}r_\mathrm{sw})$, and the dissolved fraction is $V_\mathrm{w}C_\text{water}$ divided by this. The proportionality of $K_\mathrm{oc}$ to $K_\mathrm{ow}$ is the empirical observation that natural organic matter and octanol share similar solvent properties for non-polar solutes (a linear free-energy relationship); the factor $0.41$ reflects that soil organic matter is a somewhat poorer solvent than octanol.
:::

::: widget plot
f: 100/(1 + 0.41*10^x*foc*r); 100/(1 + 0.41*10^x*foc*0.0001)
x: 0, 8
y: 0, 105
sliders: foc=0.02:0.001:0.1:0.001; r=0.5:0.01:2:0.01
labels: \%\ \text{dissolved (sediment slurry, ratio } r\text{)}; \%\ \text{dissolved (river, } 0.1\ \mathrm{g\,dm^{-3}}\text{ solids)}
caption: Percentage of a hydrophobic compound in the dissolved phase against $\log K_\mathrm{ow}$, from [[#prop-koc]] with $K_\mathrm{oc} = 0.41K_\mathrm{ow}$. Sliders: organic-carbon fraction $f_\mathrm{oc}$ and solids-to-water ratio $r$ in $\mathrm{kg\,dm^{-3}}$ (sediment pore water: $0.5$–$2$). In a turbid river with only $0.1\ \mathrm{g\,dm^{-3}}$ of suspended solids, even $\log K_\mathrm{ow} = 6$ compounds are about half dissolved; in a sediment, anything above $\log K_\mathrm{ow} \approx 4$ is almost entirely sorbed. That is why sediments are the long-term sink and reservoir of PCBs and dioxins.
:::

Sorption also slows the movement of a contaminant through an aquifer relative to the water.

::: proposition Retardation in groundwater {#prop-retardation}
For a solute subject to linear, fast, reversible sorption in a porous medium of bulk dry density $\rho_\mathrm{b}$ ($\mathrm{kg\,dm^{-3}}$) and porosity $n$, the solute front moves at the groundwater velocity divided by the **retardation factor**
$$
R_\mathrm{f} = 1 + \frac{\rho_\mathrm{b}K_\mathrm{d}}{n} .
$$
:::

::: proof Mass balance in a moving column {#proof-retardation}
Per unit bulk volume, a dissolved concentration $C$ is accompanied by $nC$ in the pore water and $\rho_\mathrm{b}K_\mathrm{d}C$ on the solids; only the pore water moves, at the pore velocity $v$. Advection with sorption gives
$$
\frac{\partial}{\partial t}\left[(n + \rho_\mathrm{b}K_\mathrm{d})C\right] = -nv\frac{\partial C}{\partial x},
\quad\text{i.e.}\quad
\frac{\partial C}{\partial t} = -\frac{v}{R_\mathrm{f}}\frac{\partial C}{\partial x},
$$
an advection equation with velocity $v/R_\mathrm{f}$. Each solute molecule spends a fraction $1/R_\mathrm{f}$ of its time dissolved and moving, and the rest sorbed and stationary.
:::

::: example A naphthalene plume {#ex-retardation}
Naphthalene ($\log K_\mathrm{ow} = 3.37$) leaks into a sandy aquifer with $f_\mathrm{oc} = 0.0010$, $\rho_\mathrm{b} = 1.70\ \mathrm{kg\,dm^{-3}}$ and $n = 0.30$, where groundwater moves at $0.50\ \mathrm{m\,d^{-1}}$. How fast does the naphthalene front move? A conservative tracer (chloride) leaked at the same time has reached a well $100\ \mathrm{m}$ away; how far has the naphthalene got?
::: solution
$K_\mathrm{oc} = 0.41\times10^{3.37} = 0.41\times2344 = 961\ \mathrm{dm^3\,kg^{-1}}$, so $K_\mathrm{d} = 0.0010\times961 = 0.96\ \mathrm{dm^3\,kg^{-1}}$. Then
$$
R_\mathrm{f} = 1 + \frac{1.70\times0.96}{0.30} = 1 + 5.4 = 6.4 .
$$
The naphthalene front moves at $0.50/6.4 = 0.078\ \mathrm{m\,d^{-1}}$, and when chloride has travelled $100\ \mathrm{m}$, naphthalene has travelled about $100/6.4 = 16\ \mathrm{m}$. Retardation buys time for biodegradation (naphthalene degrades readily under aerobic conditions) and is why sorbing contaminants often form shorter plumes than their source strength would suggest. With an aquifer ten times richer in organic carbon, $R_\mathrm{f}$ would be $55$; for benzene ($\log K_\mathrm{ow} = 2.13$) in the original aquifer it is only $1.3$, so benzene, toluene and xylenes from fuel spills reach wells first.
:::
:::

## Fugacity and multimedia models

When a substance is spread among several phases, comparing concentrations is awkward — a compound may be a thousand times more concentrated in soil than in water and yet be at equilibrium. Donald Mackay introduced into environmental chemistry a variable that is equal in all phases at equilibrium: the fugacity.

::: definition Fugacity and fugacity capacity {#def-fugacity}
The **fugacity** $f$ of a substance (in Pa) is its "escaping tendency", a thermodynamic quantity related to chemical potential by $\mu = \mu^\circ + RT\ln(f/f^\circ)$; for an ideal gas it equals the partial pressure. At equilibrium the fugacity is the same in all phases. At low concentrations fugacity is proportional to concentration, $C_i = Z_if$, where $Z_i$ ($\mathrm{mol\,m^{-3}\,Pa^{-1}}$) is the **fugacity capacity** of phase $i$:
$$
Z_\text{air} = \frac{1}{RT},\qquad
Z_\text{water} = \frac{1}{H},\qquad
Z_\text{octanol} = K_\mathrm{ow}Z_\text{water},\qquad
Z_\text{solid} = K_\mathrm{d}\,\rho_\mathrm{s}\,Z_\text{water},
$$
with $K_\mathrm{d}$ in $\mathrm{m^3\,kg^{-1}}$ and $\rho_\mathrm{s}$ the density of the solid in $\mathrm{kg\,m^{-3}}$. Partition coefficients are ratios of $Z$ values: $K_\mathrm{aw} = Z_\text{air}/Z_\text{water} = H/RT$.
:::

::: proposition Equilibrium distribution in a Level I model {#prop-level1}
If an amount $M$ (mol) of a non-degrading substance is distributed at equilibrium among compartments of volume $V_i$ and fugacity capacity $Z_i$ (a **Level I** fugacity model), the common fugacity and the amount in each compartment are
$$
f = \frac{M}{\sum_i Z_iV_i}, \qquad n_i = Z_iV_if, \qquad \frac{n_i}{M} = \frac{Z_iV_i}{\sum_j Z_jV_j} .
$$
The compartment with the largest **capacity** $Z_iV_i$ holds most of the substance. Conditions: equilibrium between all compartments, linear partitioning, no degradation or advection. Level II adds steady-state emission and degradation with a common fugacity; Level III allows each compartment its own fugacity, with transfer rates between them.
:::

::: proof Mass balance with a common fugacity {#proof-level1}
Total amount $M = \sum_iC_iV_i = \sum_iZ_ifV_i$; since $f$ is common to all compartments at equilibrium, $M = f\sum_iZ_iV_i$, which gives $f$; then $n_i = C_iV_i = Z_iV_if$. The fractions follow by division. The formalism is just the multi-phase version of the two-phase result $f_\mathrm{w} = 1/(1 + K_\mathrm{d}r_\mathrm{sw})$, but fugacity makes the bookkeeping transparent: each phase is characterised by one number $Z_i$, and every partition coefficient is a ratio of two of them.
:::

::: example Where does it go? A Level I calculation {#ex-level1}
Use Mackay's "unit world": air $1\times10^{14}\ \mathrm{m^3}$, water $2\times10^{11}\ \mathrm{m^3}$, soil $9\times10^{9}\ \mathrm{m^3}$ (solids, density $2400\ \mathrm{kg\,m^{-3}}$, $f_\mathrm{oc} = 0.02$) and sediment $1\times10^{8}\ \mathrm{m^3}$ ($2400\ \mathrm{kg\,m^{-3}}$, $f_\mathrm{oc} = 0.04$), at $298\ \mathrm{K}$, with $K_\mathrm{oc} = 0.41K_\mathrm{ow}$. Find the percentage distribution of (a) benzene ($\log K_\mathrm{ow} = 2.13$, $H = 557\ \mathrm{Pa\,m^3\,mol^{-1}}$) and (b) a PCB-like compound ($\log K_\mathrm{ow} = 6.5$, $H = 20\ \mathrm{Pa\,m^3\,mol^{-1}}$).
::: solution
$Z_\text{air} = 1/(8.314\times298) = 4.04\times10^{-4}\ \mathrm{mol\,m^{-3}\,Pa^{-1}}$ for both.

(a) Benzene: $Z_\text{water} = 1/557 = 1.80\times10^{-3}$; $K_\mathrm{oc} = 0.41\times10^{2.13} = 55.3\ \mathrm{dm^3\,kg^{-1}}$, so $K_\mathrm{d}(\text{soil}) = 0.02\times55.3/1000 = 1.11\times10^{-3}\ \mathrm{m^3\,kg^{-1}}$ and $Z_\text{soil} = 1.11\times10^{-3}\times2400\times1.80\times10^{-3} = 4.77\times10^{-3}$; $Z_\text{sed} = 9.53\times10^{-3}$. Capacities $Z_iV_i$: air $4.04\times10^{10}$, water $3.59\times10^{8}$, soil $4.29\times10^{7}$, sediment $9.5\times10^{5}$. Fractions: **air $99.0\ \%$**, water $0.88\ \%$, soil $0.11\ \%$, sediment $0.002\ \%$.

(b) PCB-like: $Z_\text{water} = 1/20 = 0.050$; $K_\mathrm{oc} = 0.41\times10^{6.5} = 1.30\times10^{6}\ \mathrm{dm^3\,kg^{-1}}$, so $Z_\text{soil} = 0.02\times1296\times2400\times0.050 = 3.11\times10^{3}$ and $Z_\text{sed} = 6.22\times10^{3}$. Capacities: air $4.04\times10^{10}$, water $1.0\times10^{10}$, soil $2.80\times10^{13}$, sediment $6.2\times10^{11}$. Fractions: air $0.14\ \%$, water $0.035\ \%$, **soil $97.7\ \%$**, sediment $2.2\ \%$.

Volatile, water-soluble benzene is an air pollutant whatever compartment it is released to; the PCB ends up in soils and sediments. But note the subtlety: a PCB with a fraction $0.14\ \%$ in air is still mobile *through* the air — the air compartment is where long-range transport happens, and a small airborne fraction moving thousands of kilometres per week is how such compounds reach the Arctic.
:::
:::

### Long-range transport and cold condensation

Semi-volatile compounds with $\log K_\mathrm{oa}$ of roughly $6$–$10$ can volatilise in warm regions, travel in the air and condense at lower temperatures, where $K_\mathrm{oa}$ is larger (it rises roughly tenfold for every $10$–$15\ \mathrm{K}$ of cooling for such compounds). Repeated cycles of deposition and re-emission — the "grasshopper effect" — and the latitudinal temperature gradient produce **global fractionation**: the more volatile POPs accumulate preferentially in polar regions, while the least volatile stay near sources. Cold-region food webs, rich in lipids, then concentrate them further. This mechanism, proposed by Frank Wania and Donald Mackay (1993), explains the Arctic observations that opened this chapter.

## Degradation and persistence

A compound's persistence is the combined effect of all its degradation processes in each compartment: hydrolysis (esters, carbamates, some organophosphates, alkyl halides), direct and indirect photolysis (by sunlight, and by photochemically produced OH and singlet oxygen in surface waters), reaction with OH in air ([[environmental-chemistry/tropospheric-chemistry#def-oh-lifetime]]) and, usually most important in soils and waters, biodegradation by microbes. If several first-order processes act in parallel, their rate constants add,
$$
k_\text{tot} = \sum_i k_i, \qquad \frac{1}{t_{1/2,\text{tot}}} = \sum_i\frac{1}{t_{1/2,i}},
$$ {#eq-parallel}
so the fastest process dominates. Half-lives in the environment are conditional: biodegradation depends on temperature, oxygen, nutrients and the presence of adapted microbes, and many hydrophobic compounds degrade slowly simply because they are sorbed and unavailable to organisms. The **overall persistence** of a substance in a multimedia model is the amount in the system at steady state divided by the emission rate, i.e. its residence time ([[environmental-chemistry/earth-system-chemistry#prop-residence]]), and it depends on which compartment the substance is in — a compound that is short-lived in air but long-lived in sediment is persistent if it partitions to sediment.

## Bioconcentration and biomagnification

::: definition Bioconcentration, bioaccumulation and biomagnification {#def-bcf}
The **bioconcentration factor** $\mathrm{BCF} = C_\text{organism}/C_\text{water}$ (in $\mathrm{dm^3\,kg^{-1}}$, wet weight) at steady state describes uptake from water alone, across gills or skin. The **bioaccumulation factor** (BAF) includes uptake from food. **Biomagnification** is the increase in lipid-normalised concentration from prey to predator; the **trophic magnification factor** is the average factor per trophic level in a food web. If uptake from water is by passive partitioning into lipids, which behave like octanol, then at equilibrium
$$
\mathrm{BCF} \approx L\,K_\mathrm{ow},
$$
where $L$ is the lipid fraction of the organism. Mackay's empirical fit for fish (1982), $\mathrm{BCF} = 0.048K_\mathrm{ow}$, corresponds to $L \approx 5\ \%$. The relation fails above $\log K_\mathrm{ow} \approx 6$–$7$ (uptake too slow to reach equilibrium, low bioavailability of very hydrophobic compounds) and for compounds that the organism metabolises.
:::

::: example PCB concentration in a fish {#ex-bcf}
A lake contains $1.0\ \mathrm{ng\,dm^{-3}}$ of a PCB congener with $\log K_\mathrm{ow} = 6.5$. Estimate the concentration in a fish of $5\ \%$ lipid at equilibrium with the water, and comment on why measured values can be higher.
::: solution
$\mathrm{BCF} = 0.05\times10^{6.5} = 0.05\times3.16\times10^{6} = 1.6\times10^{5}\ \mathrm{dm^3\,kg^{-1}}$. Then $C_\text{fish} = 1.6\times10^{5}\ \mathrm{dm^3\,kg^{-1}}\times1.0\ \mathrm{ng\,dm^{-3}} = 1.6\times10^{5}\ \mathrm{ng\,kg^{-1}} = 160\ \mathrm{\mu g\,kg^{-1}}$ wet weight. Measured concentrations in predatory fish are often higher, because they eat contaminated prey: digestion removes lipids from the food faster than the PCB, raising the PCB's fugacity in the gut above that in the food, so the compound is "pumped" up the food chain. Lipid-normalised concentrations then rise by a factor of $2$–$10$ per trophic level for poorly metabolised compounds, which is biomagnification. For air-breathing animals (seabirds, seals, humans), whose elimination via exhaled air is negligible for compounds with high $K_\mathrm{oa}$, magnification can be even stronger — a reason $K_\mathrm{oa}$ now also appears in bioaccumulation screening.
:::
:::

::: widget plot
f: log(0.048*10^x)/log(10); log(0.048*10^x/(1 + 10^(x - c)))/log(10)
x: 1, 9
y: 0, 7
sliders: c=6.5:5:8:0.1
labels: \log\mathrm{BCF} = \log K_\mathrm{ow} - 1.32; \text{with a high-}K_\mathrm{ow}\text{ cut-off}
caption: Bioconcentration factor in fish against $\log K_\mathrm{ow}$: Mackay's equilibrium-partitioning line $\mathrm{BCF} = 0.048K_\mathrm{ow}$, and an illustrative curve that bends over above a cut-off $\log K_\mathrm{ow} = c$ (slider), as observed for very hydrophobic compounds that are taken up too slowly or are too strongly bound to dissolved organic matter to reach equilibrium. The regulatory threshold $\mathrm{BCF} = 5000$ ($\log\mathrm{BCF} = 3.7$) corresponds to $\log K_\mathrm{ow} \approx 5$ on the line.
:::

::: warning High log K_ow does not mean high concentrations in water {#warn-kow}
Students sometimes read a high $K_\mathrm{ow}$ as "this compound is everywhere in the water". The opposite holds: very hydrophobic compounds have tiny water solubilities and are mostly sorbed, so dissolved concentrations are low — often nanograms per litre or less. Their danger lies in where they *end up*: fat, sediments, top predators. Conversely, mobile, polar, persistent compounds (low $K_\mathrm{ow}$, slow degradation — some PFAS, many pharmaceuticals and pesticide metabolites) pass through soils and treatment plants and reach drinking water, though they bioaccumulate little. "Persistent and mobile" is now treated in EU chemicals policy as a hazard class of its own (the 2023 revision of the CLP Regulation added PMT/vPvM categories). Always ask which compartment a property sends a substance to.
:::

## Perfluoroalkyl substances

**Per- and polyfluoroalkyl substances** (PFAS) — several thousand compounds containing perfluorinated carbon chains, used for their water-, oil- and heat-resistance in coatings, textiles, food packaging and firefighting foams — break the POP template in an instructive way. The perfluoroalkyl acids (PFOA, PFOS and their homologues) are surfactants: their anionic head groups make them water-soluble and their perfluorinated tails make them partition to interfaces and to proteins (serum albumin, liver fatty-acid-binding proteins) rather than to lipids, so $K_\mathrm{ow}$ is not a meaningful predictor of their behaviour. They are practically non-degradable in the environment; many precursor compounds transform into them. Their hazards, as identified in assessments by bodies such as the European Food Safety Authority and the US EPA, include effects on the immune system (reduced vaccine response), lipid metabolism, liver and development, and PFOA is classified by IARC as carcinogenic to humans (Group 1, 2023).

Regulation as of 2026, described neutrally: the EU's recast Drinking Water Directive (EU) 2020/2184 sets parametric values of $0.1\ \mathrm{\mu g\,dm^{-3}}$ for the sum of 20 listed PFAS and $0.5\ \mathrm{\mu g\,dm^{-3}}$ for "PFAS total", applying from 12 January 2026; in the United States, the EPA's National Primary Drinking Water Regulation of April 2024 set maximum contaminant levels of $4.0\ \mathrm{ng\,dm^{-3}}$ each for PFOA and PFOS (and values for several other PFAS), and the agency announced in 2025 its intention to retain the PFOA and PFOS limits while extending the compliance deadline and reconsidering the others — readers should check the current status. A broad restriction of PFAS under the EU REACH Regulation was under evaluation by the European Chemicals Agency as of 2025–26.

## Heavy metals

Metals cannot be degraded; they can only change their speciation and their compartment. Their environmental chemistry is that of [[environmental-chemistry/natural-waters]] — complexation, redox, sorption, precipitation — and their toxicity is mostly a matter of binding to biological ligands. The hazards, by mechanism:

- **Mercury.** Emitted as elemental $\mathrm{Hg^0}$ (from coal combustion and artisanal and small-scale gold mining, the two largest anthropogenic sources according to UNEP's *Global Mercury Assessment 2018*), it has an atmospheric lifetime of months to a year and so is a global pollutant. Oxidised to $\mathrm{Hg^{2+}}$ and deposited, it is methylated by sulfate- and iron-reducing bacteria in anoxic sediments to **methylmercury**, $\mathrm{CH_3Hg^+}$, which binds strongly to thiol groups of proteins, crosses the blood–brain and placental barriers and biomagnifies in aquatic food webs. Its neurotoxicity was revealed in the poisoning of the population of Minamata Bay, Japan, by industrial discharges in the 1950s. The Minamata Convention on Mercury (2013, in force 2017) controls mercury mining, products, emissions and trade.
- **Lead.** It inhibits enzymes of haem synthesis (δ-aminolevulinic acid dehydratase) and interferes with calcium-dependent signalling in the developing nervous system; no threshold for its neurodevelopmental effects in children has been identified (WHO). The phase-out of leaded petrol, completed worldwide in 2021 according to UNEP, removed the dominant atmospheric source; lead pipes, old paint and some industrial sites remain.
- **Cadmium** accumulates in the kidney, bound to metallothionein, and competes with zinc and calcium; **arsenic** as arsenite binds thiols and as arsenate mimics phosphate. Natural arsenic in groundwater — released by the reductive dissolution of iron oxides ([[environmental-chemistry/natural-waters#ex-electron-budget]]) — affects drinking water for many millions of people, notably in the Bengal Basin; the WHO guideline value is $10\ \mathrm{\mu g\,dm^{-3}}$.

::: quiz
Which pair of properties most strongly predicts that a neutral organic chemical released to a river will end up concentrated in sediments and fish?
- [ ] High $K_\mathrm{aw}$ and short half-life.
- [x] High $K_\mathrm{ow}$ (hence high $K_\mathrm{oc}$) and slow degradation.
- [ ] High water solubility and high vapour pressure.
- [ ] Low $K_\mathrm{ow}$ and high $K_\mathrm{aw}$.
::: solution
High $K_\mathrm{ow}$ means strong partitioning into organic carbon (sediments) and lipids (fish), and slow degradation lets it accumulate. A high $K_\mathrm{aw}$ sends a compound to the air; high solubility and low $K_\mathrm{ow}$ keep it in the water and moving.
:::
:::

::: history
Rachel Carson's *Silent Spring* (1962) brought the effects of persistent pesticides on wildlife to public attention. Sören Jensen in Stockholm identified PCBs as environmental contaminants in 1966, finding them in fish and in an eagle feather while analysing for DDT by gas chromatography. Donald Mackay introduced fugacity models to environmental chemistry in a series of papers from 1979, collected in *Multimedia Environmental Models: The Fugacity Approach* (1991). Samuel Karickhoff and colleagues established the organic-carbon basis of sorption in 1979. Frank Wania and Mackay proposed global fractionation and cold condensation in 1993; the Stockholm Convention followed in 2001.
:::

## Where this leads

Sorption on soils, the treatment of contaminated water and the remediation of land contaminated by organic compounds and metals are the subject of [[environmental-chemistry/soils-remediation]]. Measuring nanogram-per-litre concentrations of POPs and PFAS requires the extraction, clean-up and mass spectrometric methods of [[environmental-chemistry/environmental-monitoring]] and [[analytical-chemistry/hyphenated-methods]]. The design of chemicals that degrade after use — "benign by design" — is one of the principles of [[green-chemistry/green-principles]].

::: summary
- POPs are persistent, bioaccumulative, mobile over long distances and toxic (Stockholm Convention, 2001; listings extended to PFOS, PFOA, PFHxS and others).
- $K_\mathrm{ow}$, $K_\mathrm{aw} = H/RT$ and $K_\mathrm{oa} = K_\mathrm{ow}/K_\mathrm{aw}$ summarise where a neutral organic compound goes: air, water, organic matter, lipids.
- Sorption to soil and sediment scales with organic carbon, $K_\mathrm{d} = f_\mathrm{oc}K_\mathrm{oc}$ with $K_\mathrm{oc} \approx 0.41K_\mathrm{ow}$; the dissolved fraction is $1/(1 + K_\mathrm{d}r_\mathrm{sw})$ and groundwater plumes are retarded by $R_\mathrm{f} = 1 + \rho_\mathrm{b}K_\mathrm{d}/n$.
- Fugacity $f$ is equal in all phases at equilibrium, $C_i = Z_if$; in a Level I model each compartment holds the fraction $Z_iV_i/\sum Z_jV_j$.
- Parallel first-order degradation rates add; overall persistence is the steady-state residence time and depends on the compartment the substance occupies.
- Bioconcentration in fish follows $\mathrm{BCF} \approx LK_\mathrm{ow}$ (about $0.05K_\mathrm{ow}$) up to $\log K_\mathrm{ow} \approx 6$; food-web transfer biomagnifies poorly metabolised compounds; semi-volatile POPs fractionate towards the poles.
- PFAS and metals do not fit the lipophilic template: PFAS bind proteins and are mobile in water; metals change speciation (e.g. Hg methylation) but never degrade.
:::

## Exercises

::: exercise The dimensionless Henry constant of benzene {level=1 check="0.225"}
Convert $H = 557\ \mathrm{Pa\,m^3\,mol^{-1}}$ for benzene to $K_\mathrm{aw}$ at $298\ \mathrm{K}$. (Enter $K_\mathrm{aw}$, to three significant figures.)
::: solution
$K_\mathrm{aw} = H/RT = 557/(8.314\times298) = 557/2478 = 0.225$. At equilibrium the concentration in air is about a quarter of that in water, per unit volume — but because the atmosphere's volume is so much larger, most benzene is in the air.
:::
:::

::: exercise K_oc from K_ow {level=1 check="4100"}
Using Karickhoff's relation, estimate $K_\mathrm{oc}$ for a compound with $\log K_\mathrm{ow} = 4.00$. (Enter $K_\mathrm{oc}$ in $\mathrm{dm^3\,kg^{-1}}$, to two significant figures.)
::: solution
$K_\mathrm{oc} = 0.41\times10^{4.00} = 4.1\times10^{3}\ \mathrm{dm^3\,kg^{-1}}$. Such relations have scatter of about $0.3$–$0.5$ log units, so treat the result as an order-of-magnitude estimate.
:::
:::

::: exercise Bioconcentration in a lean and a fat fish {level=1 check="5000"}
Estimate the BCF of a compound with $\log K_\mathrm{ow} = 5.0$ in a fish of $5.0\ \%$ lipid, assuming equilibrium partitioning into lipid with $K_\text{lipid–water} = K_\mathrm{ow}$. (Enter the BCF in $\mathrm{dm^3\,kg^{-1}}$, to two significant figures.)
::: solution
$\mathrm{BCF} = 0.050\times10^{5.0} = 5.0\times10^{3}\ \mathrm{dm^3\,kg^{-1}}$ — exactly the Stockholm screening threshold. A fatty fish with $15\ \%$ lipid would have three times the BCF, which is why monitoring programmes report lipid-normalised concentrations.
:::
:::

::: exercise Retardation of naphthalene {level=2 check="6.4"}
Repeat the calculation of [[#ex-retardation]]: $\log K_\mathrm{ow} = 3.37$, $f_\mathrm{oc} = 0.0010$, $\rho_\mathrm{b} = 1.70\ \mathrm{kg\,dm^{-3}}$, $n = 0.30$. (Enter $R_\mathrm{f}$, to two significant figures.)
::: solution
$K_\mathrm{d} = 0.0010\times0.41\times2344 = 0.961\ \mathrm{dm^3\,kg^{-1}}$; $R_\mathrm{f} = 1 + 1.70\times0.961/0.30 = 6.4$.
:::
:::

::: exercise Dissolved fraction in a sediment slurry {level=2 check="2.4"}
A sediment slurry contains $0.50\ \mathrm{kg}$ of solids per $\mathrm{dm^3}$ of water, with $f_\mathrm{oc} = 0.020$. What percentage of a compound with $\log K_\mathrm{ow} = 4.0$ is dissolved at equilibrium? (Enter the percentage, to two significant figures.)
::: solution
$K_\mathrm{d} = 0.020\times0.41\times10^{4} = 82\ \mathrm{dm^3\,kg^{-1}}$; $f_\mathrm{w} = 1/(1 + 82\times0.50) = 1/42 = 0.024$, i.e. $2.4\ \%$.
:::
:::

::: exercise Combined degradation {level=2 check="23"}
In a lake, a pesticide is hydrolysed with a half-life of $30\ \mathrm{d}$, photolysed with a half-life of $120\ \mathrm{d}$ and biodegraded with a half-life of $400\ \mathrm{d}$, all first order. What is its overall half-life? (Enter it in days, to two significant figures.)
::: solution
By [[#eq-parallel]], $1/t_{1/2} = 1/30 + 1/120 + 1/400 = 0.0333 + 0.00833 + 0.0025 = 0.0442\ \mathrm{d^{-1}}$, so $t_{1/2} = 22.6 \approx 23\ \mathrm{d}$. The fastest process, hydrolysis, dominates; doubling the slowest one would change almost nothing.
:::
:::

::: exercise A Level I model for a moderately hydrophobic chemical {level=3 check="67"}
Using the unit world of [[#ex-level1]], find the percentage of a compound with $\log K_\mathrm{ow} = 4.0$ and $H = 100\ \mathrm{Pa\,m^3\,mol^{-1}}$ that resides in air at equilibrium. Then find the dissolved concentration in water if $100\ \mathrm{t}$ of the compound (molar mass $150\ \mathrm{g\,mol^{-1}}$) is present in the unit world. (Enter the percentage in air, to two significant figures.)
::: solution
$Z_\text{air} = 4.04\times10^{-4}$, $Z_\text{water} = 0.0100$, $K_\mathrm{oc} = 4100\ \mathrm{dm^3\,kg^{-1}}$, $Z_\text{soil} = 0.02\times4.1\times2400\times0.0100 = 1.97$, $Z_\text{sed} = 3.94\ \mathrm{mol\,m^{-3}\,Pa^{-1}}$. Capacities: air $4.04\times10^{10}$, water $2.0\times10^{9}$, soil $1.77\times10^{10}$, sediment $3.9\times10^{8}$; total $6.05\times10^{10}$. Air holds $4.04/6.05 = 67\ \%$, soil $29\ \%$, water $3.3\ \%$, sediment $0.65\ \%$. With $M = 10^{8}\ \mathrm{g}/150 = 6.67\times10^{5}\ \mathrm{mol}$, $f = 6.67\times10^{5}/6.05\times10^{10} = 1.10\times10^{-5}\ \mathrm{Pa}$, and $C_\text{water} = Z_\text{water}f = 1.10\times10^{-7}\ \mathrm{mol\,m^{-3}} = 0.017\ \mathrm{\mu g\,dm^{-3}}$. Even with an air-dominated distribution, soil holds nearly a third — and in a Level III model with emission to soil and slow soil-to-air transfer, soil would hold far more.
:::
:::

::: exercise Volatilisation from a lake {level=3 check="20"}
In the two-film model, the overall mass-transfer coefficient for volatilisation from water, $K_\mathrm{OL}$, combines a water-side coefficient $k_\mathrm{w}$ and an air-side coefficient $k_\mathrm{a}$ as resistances in series: $1/K_\mathrm{OL} = 1/k_\mathrm{w} + 1/(k_\mathrm{a}K_\mathrm{aw})$. For a well-mixed lake of depth $d$, the dissolved concentration decays with rate constant $K_\mathrm{OL}/d$ (air concentration negligible). (a) Derive this decay law. (b) For benzene ($K_\mathrm{aw} = 0.225$) with $k_\mathrm{w} = 2.0\times10^{-5}\ \mathrm{m\,s^{-1}}$, $k_\mathrm{a} = 3.0\times10^{-3}\ \mathrm{m\,s^{-1}}$ and $d = 2.0\ \mathrm{m}$, find the volatilisation half-life. (c) Which resistance controls, and how would the result change for naphthalene ($K_\mathrm{aw} = 0.0174$)? (Enter the half-life for benzene in hours, to two significant figures.)
::: hint
The flux through the surface is $K_\mathrm{OL}(C_\mathrm{w} - C_\mathrm{a}/K_\mathrm{aw})$ per unit area.
:::
::: solution
(a) Per unit surface area, the lake holds $dC_\mathrm{w}$ and loses $K_\mathrm{OL}C_\mathrm{w}$ per unit time (with $C_\mathrm{a} \approx 0$), so $d\,\mathrm{d}C_\mathrm{w}/\mathrm{d}t = -K_\mathrm{OL}C_\mathrm{w}$ and $C_\mathrm{w} = C_0e^{-K_\mathrm{OL}t/d}$, with $t_{1/2} = d\ln2/K_\mathrm{OL}$. The series resistances arise because, at steady state, the flux through the water film, $k_\mathrm{w}(C_\mathrm{w} - C_\mathrm{w,i})$, equals that through the air film, $k_\mathrm{a}(C_\mathrm{a,i} - C_\mathrm{a})$, with interfacial equilibrium $C_\mathrm{a,i} = K_\mathrm{aw}C_\mathrm{w,i}$; eliminating the interfacial concentrations gives the formula. (b) $1/K_\mathrm{OL} = 1/2.0\times10^{-5} + 1/(3.0\times10^{-3}\times0.225) = 50\,000 + 1481 = 51\,481\ \mathrm{s\,m^{-1}}$, $K_\mathrm{OL} = 1.94\times10^{-5}\ \mathrm{m\,s^{-1}}$, and $t_{1/2} = 2.0\times0.693/1.94\times10^{-5} = 7.1\times10^{4}\ \mathrm{s} = 20\ \mathrm{h}$. (c) For benzene the water-side resistance ($97\ \%$ of the total) controls, as for all compounds with $K_\mathrm{aw} \gtrsim 0.1$. For naphthalene the air-side term is $1/(3.0\times10^{-3}\times0.0174) = 19\,200\ \mathrm{s\,m^{-1}}$, the total $69\,200$, $K_\mathrm{OL} = 1.45\times10^{-5}\ \mathrm{m\,s^{-1}}$ and $t_{1/2} = 27\ \mathrm{h}$: the air side now contributes over a quarter of the resistance, and for compounds with $K_\mathrm{aw} \lesssim 10^{-3}$ it dominates.
:::
:::
