Chemical weathering is the only geological process that is simultaneously a first-order control on the climate, the source of nearly every dissolved ion in the ocean, the maker of every soil, the reason the atmosphere is oxygen-rich, and one of the fastest-moving topics in modern geochemistry. It is also, in its chemistry, a short subject: five reactions, one rate law, and a mass balance. Everything else is the surface area of the rock, the supply of water, and the time.

## What weathering is

::: definition The five reactions {#def-reactions}
**Dissolution of carbonates** by carbonic acid,
$$
\mathrm{CaCO_3} + \mathrm{CO_2} + \mathrm{H_2O} = \mathrm{Ca^{2+}} + 2\,\mathrm{HCO_3^-},
$$
is fast (complete in hours to days), reaches equilibrium in most rivers, and consumes one mole of carbon dioxide per mole of calcite. **Hydrolysis of silicates**,
$$
2\,\mathrm{KAlSi_3O_8} + 2\,\mathrm{H_2CO_3} + 9\,\mathrm{H_2O} = \mathrm{Al_2Si_2O_5(OH)_4} + 2\,\mathrm{K^+} + 2\,\mathrm{HCO_3^-} + 4\,\mathrm{H_4SiO_4},
$$
is slow (thousands of years), is far from equilibrium in every natural setting, and consumes one mole of carbon dioxide per mole of charge removed. **Oxidation of sulfides**, principally pyrite,
$$
\mathrm{FeS_2} + 3.75\,\mathrm{O_2} + 3.75\,\mathrm{H_2O} = \mathrm{Fe(OH)_3} + 2\,\mathrm{SO_4^{2-}} + 4\,\mathrm{H^+},
$$
generates **four equivalents of strong acid per mole of pyrite** and, where it oxidises limestone, releases carbon dioxide to the atmosphere rather than consuming it. **Hydration and dehydration** convert anhydrous to hydrous phases. And **ion exchange** on the clay and organic-matter complex, in which Ca and Mg in solution are exchanged for Na and K on the surface, transfers base cations from rock to water without any net reaction — a process that dominates the chemistry of a base-poor soil and can make a sodium-rich alkaline water out of a calcium-bicarbonate one without changing the salinity.
:::

::: definition Kinetics: the pH–rate curve and the driving force {#def-kinetics}
A silicate's dissolution rate $r$ plotted against pH is a **V-curve** spanning six or more orders of magnitude: a **acid branch** at pH below 4 where the rate goes as $a_{\mathrm{H^+}}^{-m}$ with $m \approx 0.5$–1.0, a **pH-independent plateau** at pH 5–8 where the rate is set by the attack of water on the surface, and a **base branch** above pH 9 where the rate goes as $a_{\mathrm{OH^-}}^{n}$ with $n \approx 0.5$–1.0. Superimposed on the V is the **approach to equilibrium**:
$$
r = k_{\mathrm{H}}a_{\mathrm{H^+}}^{-m} + k_{\mathrm{w}} + k_{\mathrm{OH}}a_{\mathrm{OH^-}}^{n}
    \times\left[1 - \left(\frac{\mathrm{IAP}}{K}\right)^{1/3}\right],
$$
and the bracket makes the rate fall to zero as the solution saturates. Two further controls dominate the field case. **Aluminium inhibition**: dissolved Al$^{3+}$ and Al–organic complexes adsorb to the surface and slow the rate by one to three orders of magnitude, which is why a soil solution rich in organic acids weathers more slowly per unit surface than its low pH predicts. And **the far-from-equilibrium condition**: a natural soil solution is typically **10$^{-3}$ to 10$^{-6}$ times** saturated with respect to its feldspars, so the affinity term is essentially unity and the weathering rate is set by the **rate constant, the reactive surface area and the water flux**, not by thermodynamics.
:::

::: example Acid mine drainage {#ex-pyrite}
A waste-rock pile contains 8 wt% pyrite. Find the acidity generated per tonne of rock, expressed as kilograms of calcium carbonate equivalent, and the mass of limestone required to neutralise it. Then find the pH of 100 L of rain per tonne of rock if the acidity is not buffered.
::: solution
One mole of pyrite (119.7 g) generates four equivalents of acidity, and one equivalent is 49.0 g of CaCO$_3$ equivalent, so
$$
\frac{4\times49.0}{119.7} = 1.64\ \mathrm{kg\ CaCO_3\ equivalent\ per\ kg\ pyrite}.
$$
A tonne of 8-per-cent pyritic rock therefore generates
$$
1000\times0.08\times1.64 = 131\ \mathrm{kg}
$$
of acidity, requiring **131 kg of pure limestone per tonne of waste rock** as the theoretical minimum, and appreciably more in practice because the limestone is only partly dissolved before it is flushed from the pile.

The unbuffered pH follows from the concentration: 131 kg of acidity per tonne of rock, if flushed by 100 L of water per tonne, gives
$$
\frac{131\,000\ \mathrm{g\ CaCO_3}}{49\ \mathrm{g\,eq^{-1}}\times100\ \mathrm{L}} = 26.7\ \mathrm{eq\,L^{-1}},
$$
which is a **pH of about $-1.4$** — a sulfuric acid stronger than battery acid. The number is absurd precisely because it is unbuffered: in the real world the acidity is consumed by carbonate, by aluminosilicate clay dissolution and by the precipitation of Fe(III), and the observed pH of mine drainage spans 2 to 4 in a pyritic shale and below 1 only in a hot, oxidising, carbonate-free gob pile.

The **environmental arithmetic** is the point. A waste-rock pile with even 1 per cent pyrite generates 16 kg of acidity per tonne, and the acidity is generated over centuries because the oxidation is limited by oxygen diffusion into the pile rather than by the reaction rate. The **cost of neutralisation** — 16 kg of limestone per tonne of waste — is why the rehandling of a legacy tailings dam can cost more than the mine that made it, and why the **predictive** geochemistry of a proposed waste rock (the **acid-base account**, the ratio of the moles of carbonate to the moles of pyrite, with a value below 1 predicting acid generation) is a legal requirement in most jurisdictions.
:::
:::

::: widget plot
f: -13.5 + 1.0*abs(x-7)
x: 1, 13
y: -14, -7
labels: \log(\text{rate})
caption: The idealised **pH–rate V-curve** of a feldspar, plotted as $\log r = -13.5 + |\mathrm{pH} - 7|$, showing the acid branch, the water-promoted plateau and the hydroxyl branch. The **six-order-of-magnitude contrast** between the plateau at pH 6 and the branches at pH 2 and pH 12 is the largest kinetic contrast in low-temperature geochemistry, and it is the reason that a lateritic soil at pH 4.5, a podzol at pH 3.5 and a soda lake at pH 10 weather their bedrock at rates that differ by four or five orders of magnitude at the same temperature and the same rainfall. The curve is measured in a flow-through reactor on a powder for 100 hours; the field rate on a natural grain at the same pH is commonly 100–1000 times lower, and reconciling the two is the central unsolved problem of the field.
:::

::: example Sulfate, sea salt and the pyrite in a shale catchment {#ex-sulfate}
A stream draining a carbonaceous shale catchment has chloride 6.0, calcium 0.55 and sulfate 3.0 mg/L. The drainage flux, found from the chloride mass balance, is 500 mm/yr. Using the seawater ratios Cl 19,000, Ca 412 and SO$_4$ 2701 mg/L, find the non-sea-salt sulfate, decide whether it came from gypsum or from pyrite, and find the acidity and the pyrite oxidation rate per hectare.
::: solution
The fraction of the stream's water that is sea salt is set by the chloride,
$$
f = \frac{6.0}{19\,000} = 3.2\times10^{-4},
$$
so the sea-salt contributions are $\mathrm{Ca} = 412f = 0.13$ and $\mathrm{SO_4} = 2701f = 0.85\ \mathrm{mg\,L^{-1}}$, and the **excess** (rock-derived) amounts are
$$
\mathrm{Ca^*} = 0.55 - 0.13 = 0.42\ \mathrm{mg\,L^{-1}} = 0.0105\ \mathrm{mmol\,L^{-1}},
$$
$$
\mathrm{SO_4^*} = 3.00 - 0.85 = 2.15\ \mathrm{mg\,L^{-1}} = 0.0224\ \mathrm{mmol\,L^{-1}} .
$$
The **cation-to-sulfate ratio** discriminates the source. Gypsum dissolves to give $\mathrm{Ca/SO_4} = 1$; here the ratio is
$$
\frac{0.0105}{0.0224} = 0.47 \ll 1 ,
$$
so the sulfate is **nearly twice** what the accompanying calcium can carry. The excess sulfate must be balanced not by a base cation but by **hydrogen ion** — the signature of sulfide oxidation, in which each mole of pyrite yields two moles of sulfate and four of acid.

Splitting the sulfate between a gypsum component of 0.0105 mmol/L and a pyrite component of 0.0119 mmol/L,
$$
\mathrm{H^+} = 2\times0.0119 = 0.024\ \mathrm{mmol\,L^{-1}}, \qquad
\text{pyrite} = \tfrac12\times0.0119\times120 = 0.71\ \mathrm{mg\,L^{-1}} .
$$
At a drainage of 500 m³ ha⁻¹ yr⁻¹ this is an acidity production of
$$
0.024\ \mathrm{mol\,m^{-3}}\times500\ \mathrm{m^3\,ha^{-1}\,yr^{-1}} = 12\ \mathrm{mol\,H^+\,ha^{-1}\,yr^{-1}} = 0.6\ \mathrm{kg\,CaCO_3\,equivalent\,ha^{-1}\,yr^{-1}},
$$
and a pyrite oxidation rate of **360 g ha⁻¹ yr⁻¹**.

Three readings follow. The catchment is **acid-generating**, and its alkalinity of 2.4 mmol/L — supplied by the shale's carbonate — is being consumed at 0.6 kg/ha/yr, so the acid will appear in the stream when the carbonate runs out, which is the mechanism behind the **delayed acidification** of a mined or ditch-cut shale landscape decades after the disturbance. The **sea-salt correction is not cosmetic**: without it the excess sulfate would be 3.00 rather than 2.15 mg/L and the excess calcium 0.55 rather than 0.42, and the Ca/SO$_4$ ratio would be 0.71 instead of 0.47 — the conclusion survives here, but in a coastal catchment with a chloride of 40 mg/L the sea-salt sulfate alone rises to 5.7 mg/L, exceeds the total, and the uncorrected calculation reverses the sign. And the **sulfate is not from the atmosphere**: a rural stream's non-sea-salt sulfate of 2.2 mg/L is well above the 1–2 mg/L of regional sulphate deposition, so the source is the rock, and the test that proves it is the **sulphur isotope composition**, which distinguishes a sedimentary sulfide ($\delta^{34}$S of $-20$ to $+20$ per cent) from a marine evaporite (+15 to +22 per cent) from an anthropogenic coal or oil sulphate ($-5$ to $+5$ per cent).
:::
:::

## Weathering profiles and mass transfer

::: definition Isocon and tau element mass transfer {#def-tau}
To measure weathering one must compare a soil or a regolith to its parent rock across a system in which **mass has moved**. The method of the **isocon** (Dietrich) uses an **immobile reference element** — zirconium, titanium, niobium, hafnium, the rare earths, or a heavy-mineral fraction — whose concentration changes only because the total mass has changed. The **mass transfer coefficient** of an element $j$ is
$$
\tau_j = \frac{C_{j,\text{weathered}} / C_{j,\text{parent}}}{C_{\text{ref},\text{weathered}} / C_{\text{ref},\text{parent}}} - 1 ,
$$
where $C$ is a concentration in mass per mass. $\tau_j = 0$ means the element was conserved, $\tau_j = -1$ means it was completely lost, and $\tau_j > 0$ means it was added. The **volumetric strain** $\varepsilon$ — the fractional change in volume — follows from the bulk density and the reference-element ratio, and the whole weathering profile can be described by a single number: the **mass depletion factor** $\tau_{w,\text{ref}}$. The method's power is that it converts a qualitative weathering profile into a **quantitative element budget**, and its weakness is entirely in the word "immobile": titanium is mobile in alkaline and in lateritic solutions, zirconium is mobile in organic-rich acid groundwaters, and the rare earths are mobile in a fluoride-bearing fluid, so the reference must be chosen from the element whose concentration profile is genuinely flat.
:::

::: example A tau-element budget {#ex-tau}
A granite has Zr 180 ppm and CaO 4.2 wt%; a soil developed on it has Zr 270 ppm and CaO 0.14 wt%. Find the mass transfer coefficient of the reference element, the mass remaining, and the tau value of calcium.
::: solution
The reference-element ratio is
$$
\frac{C_{\mathrm{Zr,soil}}}{C_{\mathrm{Zr,granite}}} = \frac{270}{180} = 1.50,
$$
which means the soil has **lost mass while retaining its zirconium**, and the fraction of the original mass remaining is
$$
\frac{1}{1.50} = 0.67 .
$$
The soil is therefore **33 per cent depleted in mass** — $\tau_{w,\mathrm{Zr}} = -0.33$ in the mass-transfer formulation. For calcium,
$$
\tau_{\mathrm{Ca}} = \frac{0.14/4.20}{270/180} - 1 = \frac{0.0333}{1.50} - 1 = 0.022 - 1 = -0.98 .
$$
Calcium is **98 per cent removed**, against 33 per cent for the bulk mass — the difference is the whole of the chemical weathering, since the remaining 67 per cent of the mass is quartz, kaolinite and iron oxide.

The budget closes with the other elements. A typical granitic saprolite gives $\tau_{\mathrm{Na}} \approx -0.95$, $\tau_{\mathrm{Mg}} \approx -0.98$, $\tau_{\mathrm{K}} \approx -0.85$, $\tau_{\mathrm{Si}} \approx -0.55$, $\tau_{\mathrm{Al}} \approx -0.05$, $\tau_{\mathrm{Fe}} \approx +0.10$ and $\tau_{\mathrm{Ti}} \approx +0.05$: the alkalis and alkaline earths leave almost completely, half the silicon leaves, and the aluminium, iron and titanium are left behind and **enriched by concentration**. This residual concentration of Fe and Al is the **laterite** and, taken to its extreme with the removal of the silicon, the **bauxite** — and the reason that the world's aluminium, and much of its iron, is mined from weathering crusts rather than from igneous rocks.
:::
:::

## Weathering rates and the global cycle

::: definition Measuring a weathering rate {#def-rates}
Four independent methods, on four timescales, and they disagree. The **solute flux** method measures the river's chemistry and its discharge and divides by the basin area, giving the **present-day net** weathering rate, $10^{-3}$–$10^{-1}\ \mathrm{mm\,yr^{-1}}$ for a granitic or cratonic terrain and up to $1\ \mathrm{mm\,yr^{-1}}$ for a young basaltic or carbonate terrain. The **chloride mass balance** uses the sea-salt chloride deposited with rainfall as a conservative tracer of the water balance, so that the ratio of the chloride in rain to the chloride in the stream gives the **evapotranspiration fraction** and hence the **drainage flux** that carries the solutes — the correction without which the solute-flux method is wrong by a factor of two to five in a water-limited catchment. The **cosmogenic nuclide** method ($^{10}$Be, $^{26}$Al in the soil, or the **in-situ-produced** nuclides in the residual quartz) gives the **denudation** rate averaged over $10^3$–$10^5$ yr, which is the sum of chemical and mechanical removal. And the **terrestrial in-situ-produced $^{3}$He** and the **U-series ($^{234}$U/$^{238}$U, $^{230}$Th/$^{234}$U)** methods give weathering rates and **weathering-product residence times** on $10^4$–$10^6$ yr. The comparison of the four is the field's central diagnostic: where the solute flux exceeds the cosmogenic denudation, the catchment is **exporting a Pleistocene sediment store**; where the cosmogenic rate exceeds the solute flux, most of the denudation is **mechanical** and the chemical work is small.
:::

::: example A catchment weathering budget from the chloride mass balance {#ex-cl-mb}
A granitic catchment receives 1200 mm of rainfall a year with 2.5 mg/L of sea-salt chloride and 0.15 mg/L of calcium. The stream carries 6.0 mg/L of chloride, 30 mg/L of dissolved silica (as SiO$_2$) and 0.55 mg/L of calcium. Find the drainage flux and the evapotranspiration fraction, the silicate-derived calcium and silica fluxes, the mass of feldspar weathered per hectare per year, and the equivalent lowering rate of the rock.
::: solution
Chloride is conservative, so the drainage flux is set by the ratio of the concentrations:
$$
q = 1200\times\frac{2.5}{6.0} = 500\ \mathrm{mm\,yr^{-1}}, \qquad
\mathrm{ET} = 700\ \mathrm{mm\,yr^{-1}} = 58\ \text{per cent of the rainfall}.
$$
The **net** solute fluxes are the stream concentration minus the rainfall input, multiplied by the **drainage** flux (5000 m³ ha⁻¹ yr⁻¹):
$$
\mathrm{Ca}: \ (0.55 - 0.15)\times5000 = 2000\ \mathrm{g\,ha^{-1}\,yr^{-1}} = 2.0\ \mathrm{kg\,ha^{-1}\,yr^{-1}},
$$
$$
\mathrm{SiO_2}: \ 30\times5000 = 1.5\times10^{5}\ \mathrm{g\,ha^{-1}\,yr^{-1}} = 150\ \mathrm{kg\,ha^{-1}\,yr^{-1}} .
$$
Potassium feldspar contains 180 g of SiO$_2$ per 278 g of feldspar, so the feldspar weathered is
$$
150\times\frac{278}{180} = 232\ \mathrm{kg\,ha^{-1}\,yr^{-1}} .
$$
Spread over a hectare this is $0.0232\ \mathrm{kg\,m^{-2}\,yr^{-1}}$, and since a millimetre of rock of density $2700\ \mathrm{kg\,m^{-3}}$ weighs 2.7 kg per square metre,
$$
\text{feldspar lowered} = \frac{0.0232}{2.7} = 0.0086\ \mathrm{mm\,yr^{-1}}, \qquad
\text{whole rock at 50 per cent feldspar} = 0.017\ \mathrm{mm\,yr^{-1}} .
$$
A granitic catchment is therefore lowered chemically by about **20 micrometres a year**, and a 30-m deep regolith represents something like two million years of it.

The **calcium check** is instructive. The measured net calcium flux of 2.0 kg/ha/yr is tiny beside the calcium held in the living biomass and litter of a forest (typically 100–500 kg/ha) and in the soil's exchange complex (often 1000 kg/ha or more). The calcium that the rock released has mostly been **taken up by the forest, recycled through the litter, and re-held on the clay exchange complex**, so a forested catchment's calcium flux records **biotic cycling** rather than weathering. The **silica** flux, which biology largely ignores except for the diatoms and which no soil phase holds tightly, is the better weathering tracer — which is why the whole catchment-weathering literature is built on dissolved silica and on the chloride-corrected cation deficit rather than on calcium alone.
:::
:::

::: history
The study of weathering begins with **Saussure** (Saussure), whose *Generale Helvetica* of 1779 described the deep granite weathering crusts of the Alps, and with **Lawes and Gilbert**'s (Lawes) experiments at **Rothamsted** from 1843, which first quantified the loss of bases from a soil. **Darwin**'s (Darwin) 1837 paper on the **geological powers of earth-worms** and his last book of 1881 established that soil is a biotic product. **Fersman** (Fersman) and **Korzhinsky** (Korzhinsky) created the **metasomatism** and **open-system** framework in the 1920s and 1930s, and **Nikiforoff** (Nikiforoff) the soil-microbiology and solution-precipitation theory of the 1940s. **Garrels and Christ**'s (Garrels) *Solutions, Minerals and Equilibria* of 1965 and **Garrels and Mackenzie**'s (Mackenzie) 1971 *Evolution of Sedimentary Rocks* put the ocean's chemistry and the weathering flux into a mass-balance frame. **Paces** (Paces) established the **granite weathering profile** as a chemical sequence in 1986, **Brimhall and Dietrich** (Dietrich) invented the **isocon** and the **mass-transfer coefficient** in 1987, **Nahon** (Nahon) and **Pedro** (Pedro) worked out the chemistry of the tropical weathering crusts, and **Velbel** (Velbel) and **White** (White) the kinetics. The **chloride mass balance** is the work of **Marinelli** (Marinelli) and of the isotope-hydrology school, and it is the standard tool of water-limited catchment hydrology. The **laboratory-to-field rate discrepancy** was made a central problem by **Stumm and Morgan** (Stumm), by **Lasaga** (Lasaga), and by **Blum and Stillings** (Blum), and the **biotic enhancement** of silicate dissolution by **Chorover, Banfield, Barker, Welch and the Berkeley and Colorado school** (Banfield). The **global riverine solute flux** synthesis is **Holland**'s (Holland) 1978 *The Chemistry of the Atmosphere and Hydrosphere*, **Probst and Suchet** (Probst), **Gaillardet, Dupré, Louvat and the LEGOS school** (Dupré), and **Derry, Chadwick, Brantley and the Critical Zone Observatory** (Chadwick). The **uplift–weathering** and **palaeo-weathering** debate is the work of **Ridgwell, Kennedy, Beerling and the Earth-system modelling school** and of **Hoke, Ginot and von Hagke**.
:::

::: warning Weathering rates measured today are not the rates that built the regolith
A weathering rate derived from a river's solute flux is a **steady-state, present-day, net** rate, and four assumptions hide inside it. **Steady state**: a catchment whose regolith is 30 m thick and whose present lowering is 0.02 mm/yr has a regolith that is 1.5 Myr old, which is older than any interglacial, so the present rate cannot be the rate that made it — the regolith is a **relict** of a more deeply weathering climate, being slowly stripped rather than actively grown. **Netness**: the solute flux is the **residual** after secondary-mineral formation, biotic uptake, and ion exchange, all of which can be larger than the primary flux, so a river's calcium is not the calcium that the rock lost and a river's silica is not the silica that the feldspar released. **Spatial representativeness**: a river integrates a basin whose lithologies weather at rates differing by an order of magnitude, and the flux is dominated by the **smallest, fastest-weathering fraction** — usually the mafic or carbonate component — so a whole-basin rate is not a granite rate. **And the "reactive surface area" is unknowable**: the geometric area of a soil grain is 10–1000 times smaller than the BET area, which is 10–100 times smaller than the area actually reacting, and the three are not proportional. The consequence is that a weathering rate should be reported with its **method, its timescale, its reference element, its water-balance correction and its lithology**, and that a claim that a mechanism "explains" a weathering rate derived by a different method on a different timescale is a claim about the discrepancy between the methods, not about the mechanism.
:::

## Where this leads

The solution chemistry that sets the rates is in [[geochemistry/aqueous-geochemistry]] and [[geochemistry/reactions]], the soils these profiles become are in [[geomorphology/soils]] and [[biogeochemistry/soils-wetlands]], the hillslope and landscape consequences are in [[geomorphology/weathering]] and [[geomorphology/hillslopes]], the carbon dioxide feedback is in [[climate-change/tipping-points]] and [[earth-history/oxygen-proterozoic]], the nutrient cycles are in [[biogeochemistry/nitrogen]] and [[biogeochemistry/phosphorus-sulfur]], the acid-sulfate and mine-drainage applications are in [[earth-resources/extraction-impacts]], and the isotope tracers are in [[geochemistry/radiogenic-tracers]] and [[geochemistry/isotopes-water-carbon]].

::: quiz
A soil developed on a basalt has lost 60 per cent of its mass and contains 2.5 times the parent rock's zirconium concentration. Is the profile consistent?
- [ ] Yes, the two numbers agree.
- [x] No — a 2.5-fold zirconium enrichment implies a 60 per cent mass loss only if zirconium is truly immobile; the numbers agree, but the agreement is circular because the mass loss was calculated from the zirconium.
- [ ] No — zirconium should be depleted.
- [ ] The zirconium must have been added.
::: solution
A 2.5-fold concentration of a truly immobile element means exactly $1 - 1/2.5 = 0.60$, or 60 per cent, of the mass has gone — so the two statements are the same statement, and the "consistency" tests nothing. The independent checks are a **second immobile element** (Ti, Nb, Hf, the heavy rare earths) whose ratio must agree, a **textural or petrographic** continuity with the parent, and a **mass-balance closure** on the major elements. If titanium gives a different enrichment, one of the two is mobile and the whole tau budget must be rebuilt.
:::
:::

::: summary
- Weathering is five reactions: carbonate dissolution, silicate hydrolysis, sulfide oxidation, hydration, and ion exchange.
- Silicate rates follow a six-order-of-magnitude pH–rate V-curve and are far from equilibrium in nature, so they are set by kinetics, surface area and water flux, not by thermodynamics.
- One mole of pyrite makes four equivalents of acid, and one tonne of 8-per-cent pyritic rock needs 131 kg of limestone to neutralise.
- The tau-element mass-transfer method turns a weathering profile into an element budget, and its whole strength and weakness is the immobile reference.
- The chloride mass balance corrects the solute flux for evapotranspiration; without it a water-limited catchment's weathering rate is over-estimated by a factor of two to five.
- Present-day weathering rates are net, steady-state, catchment-integrated numbers that commonly do not describe the regolith they are measured on.
:::

## Exercises

::: exercise Feldspar and carbon dioxide {level=1 check="0.16"}
How many grams of carbon dioxide are consumed per gram of K-feldspar hydrolysed to kaolinite?
::: solution
The reaction $2\mathrm{KAlSi_3O_8} + 2\mathrm{H_2CO_3} + 9\mathrm{H_2O} = \mathrm{Al_2Si_2O_5(OH)_4} + 2\mathrm{K^+} + 2\mathrm{HCO_3^-} + 4\mathrm{H_4SiO_4}$ consumes 2 mol of CO$_2$ (88 g) per 2 mol of feldspar (556 g), giving $88/556 = 0.16\ \mathrm{g}$ of carbon dioxide per gram of feldspar.
:::
:::

::: exercise Pyrite acidity {level=1 check="16"}
Find the acidity, in kg of CaCO$_3$ equivalent, generated by a tonne of waste rock containing 1 wt% pyrite.
::: solution
$1000\times0.01\times1.64 = 16\ \mathrm{kg}$ of calcium carbonate equivalent. The **acid-base account** compares the moles of carbonate in the rock with the moles of pyrite; a rock with 1 per cent pyrite needs 1.6 per cent carbonate to neutralise it, and anything less will generate acid drainage.
:::
:::

::: exercise Tau element {level=1 check="-0.5"}
A soil has twice the parent rock's zirconium content. Find the mass transfer coefficient of the bulk mass and the fraction of mass remaining.
::: solution
The mass remaining is $1/2 = 0.50$ and $\tau_{w,\mathrm{Zr}} = 0.50 - 1 = -0.5$. Half the original rock has been lost, and every element that was not mobile is now twice as concentrated.
:::
:::

::: exercise The pH–rate curve {level=2 check="1000"}
A feldspar's dissolution rate at pH 3 is $10^{-12}$ and at pH 7 is $10^{-15}\ \mathrm{mol\,m^{-2}\,s^{-1}}$. By what factor does the rate change, and what does it imply for a podzol against a brown earth?
::: solution
The factor is $10^{3} = 1000$. A podzol at pH 3.5 weathers its parent roughly **a thousand times faster per unit surface area** than a brown earth at pH 6.5, which is the chemical reason that coniferous, base-poor, high-rainfall landscapes develop deep bleached podzols while base-rich grassland landscapes develop thin soils on the same rock and climate.
:::
:::

::: exercise Chloride mass balance {level=2 check="450"}
A catchment receives 900 mm of rain with 4.0 mg/L of chloride, and its stream has 8.0 mg/L. Find the drainage flux and the evapotranspiration fraction.
::: solution
$q = 900\times4.0/8.0 = 450\ \mathrm{mm\,yr^{-1}}$, so the evapotranspiration is 450 mm and the fraction is 50 per cent. A solute-flux weathering rate computed with the 900 mm of rainfall rather than the 450 mm of drainage would be **twice too large**.
:::
:::

::: exercise Carbonate against silicate {level=2}
A river's dissolved load is 70 per cent alkalinity from carbonate weathering and 30 per cent from silicate weathering. What fraction of the atmospheric carbon dioxide it consumes is permanently sequestered, and why?
::: solution
**All of the silicate fraction and none of the carbonate fraction**, in the long run. Carbonate weathering, $\mathrm{CaCO_3} + \mathrm{CO_2} + \mathrm{H_2O} = \mathrm{Ca^{2+}} + 2\mathrm{HCO_3^-}$, consumes one mole of carbon dioxide, but when the alkalinity reaches the ocean the reaction runs backwards — $\mathrm{Ca^{2+}} + 2\mathrm{HCO_3^-} = \mathrm{CaCO_3} + \mathrm{CO_2} + \mathrm{H_2O}$ — and returns the carbon dioxide to the atmosphere. Silicate weathering, by contrast, ends in the precipitation of **authigenic clay and the burial of biogenic silica and carbonate**, and its carbon dioxide is stored for $10^7$–$10^8$ yr.

The subtlety is that the **stoichiometry differs**. Silicate weathering of a **calcium-silicate** rock (wollastonite, anorthite) releases one mole of alkalinity per mole of CO$_2$ consumed and its net sink is real; silicate weathering of a **magnesium-silicate** (olivine, enstatite) is twice as efficient per mole of rock. And **sulfide oxidation coupled to carbonate weathering** — $\mathrm{CaCO_3} + \mathrm{FeS_2} + \mathrm{O_2}$ — releases alkalinity without consuming any atmospheric carbon dioxide at all, so a river whose alkalinity is partly sulfide-derived **over-counts** the weathering carbon sink. In the world's large rivers the sulfide contribution is 10–30 per cent of the alkalinity, and in the mountain basins of the Himalaya and the Andes it reaches 50 per cent, which is one of the largest uncorrected terms in the global carbon budget.
:::
:::

::: exercise A weathering rate from silica {level=3 check="0.06"}
A basaltic catchment with 2000 mm of rainfall, a rainfall chloride of 1.5 mg/L and a stream chloride of 3.0 mg/L carries 45 mg/L of dissolved silica as SiO$_2$. Find the drainage flux, the silica flux per hectare, and the chemical lowering rate of the rock, taking the basalt as 50 per cent silicate minerals by mass and a density of $2900\ \mathrm{kg\,m^{-3}}$.
::: solution
$$
q = 2000\times\frac{1.5}{3.0} = 1000\ \mathrm{mm\,yr^{-1}} = 10\,000\ \mathrm{m^3\,ha^{-1}\,yr^{-1}},
$$
$$
\mathrm{SiO_2}\ \text{flux} = 45\times10\,000 = 4.5\times10^{5}\ \mathrm{g\,ha^{-1}\,yr^{-1}} = 450\ \mathrm{kg\,ha^{-1}\,yr^{-1}} .
$$
A basaltic silicate assemblage (pyroxene, plagioclase, olivine) contains on average about 50 g of SiO$_2$ per 100 g of silicate mineral, so the silicate mass weathered is $450\times2 = 900\ \mathrm{kg\,ha^{-1}\,yr^{-1}}$, and the whole rock, at 50 per cent silicate, is $1800\ \mathrm{kg\,ha^{-1}\,yr^{-1}}$. Per square metre this is $0.18\ \mathrm{kg\,m^{-2}\,yr^{-1}}$, and a millimetre of rock at $2900\ \mathrm{kg\,m^{-3}}$ weighs 2.9 kg per square metre, so
$$
\text{lowering} = \frac{0.18}{2.9} = 0.062\ \mathrm{mm\,yr^{-1}} .
$$
A basaltic catchment therefore weathers chemically at **0.02–0.06 mm/yr** across the plausible range of silicate contents and silica yields, three to ten times a granitic one, which is why the Deccan, the Columbia, the Ethiopian traps and the Icelandic ridges are the continents' most important carbon sinks per unit area and why enhanced **enhanced rock weathering** — the deliberate spreading of crushed basalt on farmland — is proposed as a negative-emissions technology.
:::
:::

::: exercise The global budget {level=3}
The global riverine alkalinity flux is 13 Tmol yr⁻¹, of which 40 per cent is derived from silicate weathering. Find the carbon dioxide consumption in Gt C yr⁻¹, compare it with the volcanic and metamorphic source of 0.1 Gt C yr⁻¹ and with the organic-carbon burial flux of 0.1 Gt C yr⁻¹, and say whether the modern weathering flux is in balance with the crustal sources.
::: solution
Each mole of alkalinity is one mole of carbon dioxide consumed, so
$$
13\times10^{12}\times12\times10^{-15} = 0.16\ \mathrm{Gt\ C\,yr^{-1}}
$$
in total, of which the silicate share is $0.4\times0.16 = 0.06\ \mathrm{Gt\ C\,yr^{-1}}$.

Against the sources: the **metamorphic and volcanic** carbon dioxide flux is 0.1–0.3 Gt C yr⁻¹, of which the mid-ocean-ridge and arc contributions dominate, and the **organic-carbon and carbonate burial** fluxes are each about 0.1 Gt C yr⁻¹. The modern silicate weathering sink of 0.06 Gt C yr⁻¹ is therefore **of the same order as, but somewhat below, the crustal source**, and the difference is made up by the **carbonate burial** term, which is itself a product of weathering-derived alkalinity.

The system is close to balance, and that is the point: the **silicate–carbonate (Urey) feedback**
$$
\mathrm{CaSiO_3} + 2\mathrm{CO_2} + \mathrm{H_2O} = \mathrm{Ca^{2+}} + 2\mathrm{HCO_3^-} + \mathrm{SiO_2}
$$
is a **thermostat** whose rate rises with temperature and with rainfall, so a warm climate weathering faster draws carbon dioxide down and cools itself, and a cold one does the reverse. The feedback's **gain** is set by the temperature sensitivity of the weathering rate — the field data give an apparent activation energy of 10–40 kJ/mol, corresponding to a 1.5–3-fold rate increase per 10 °C — and its **timescale** is 300,000 to 500,000 years, set by the ocean's carbonate chemistry and by mixing. This is why the anthropogenic carbon dioxide, of which the ocean and biosphere have taken up about half, will not be removed on a human timescale: the weathering thermostat works, but at a rate of 0.06 Gt C yr⁻¹ against an input of 10 Gt C yr⁻¹, so it requires **two hundred thousand years** to finish the job.
:::
:::
