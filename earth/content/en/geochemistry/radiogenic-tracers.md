A radiogenic isotope ratio is a **fossil of a chemical fractionation**. When a mantle source was depleted by melt extraction, its rubidium/strontium, samarium/neodymium, lutetium/hafnium and uranium/lead ratios were changed, and since then radioactive decay has been converting that chemical signature into an isotopic one at a rate set by a physical constant. Radiogenic isotope geology is the reading of that record, and it is the only method that can tell you whether a basalt came from depleted mantle, from subducted sediment, from the continental crust or from a plume — questions that the major and trace elements, on their own, cannot answer.

## Notation and the reference reservoirs

::: definition Epsilon and delta notation {#def-epsilon}
Because the natural variations in radiogenic ratios are of order $10^{-4}$, isotope data are quoted in **epsilon units** relative to a reference reservoir:
$$
\varepsilon_{\mathrm{Nd}} = \left[\frac{(^{143}\mathrm{Nd}/^{144}\mathrm{Nd})_{\mathrm{sample}}}{(^{143}\mathrm{Nd}/^{144}\mathrm{Nd})_{\mathrm{CHUR}}} - 1\right]\times10^{4},
$$
with $\mathrm{CHUR}$ (chondritic uniform reservoir) at $^{143}\mathrm{Nd}/^{144}\mathrm{Nd} = 0.512638$, and
$$
\varepsilon_{\mathrm{Hf}} = \left[\frac{(^{176}\mathrm{Hf}/^{177}\mathrm{Hf})_{\mathrm{sample}}}{(^{176}\mathrm{Hf}/^{177}\mathrm{Hf})_{\mathrm{CHUR}}} - 1\right]\times10^{4}, \qquad
(^{176}\mathrm{Hf}/^{177}\mathrm{Hf})_{\mathrm{CHUR}} = 0.282785 .
$$
Strontium uses the same convention against $\mathrm{CHUR} = 0.7045$ or, more often, is quoted as the raw ratio. The reference values matter: a paper that quotes $\varepsilon_{\mathrm{Nd}}$ against the **Jacobsen–Wasserburg** chondrite (0.512638) is not comparable with one that uses the **Eugene** or **Bouvier–Wadwha** value, and the difference of a few epsilon units is a geological interpretation. The **mantle end-members** are
$$
\begin{array}{l|cc}
\text{reservoir} & ^{87}\mathrm{Sr}/^{86}\mathrm{Sr} & ^{143}\mathrm{Nd}/^{144}\mathrm{Nd} \\ \hline
\text{depleted mantle (MORB source)} & 0.70265 & 0.51315\ (\varepsilon_{\mathrm{Nd}} = +10)\\
\mathrm{CHUR} & 0.7045 & 0.512638\ (0)\\
\text{enriched mantle (OIB, EM1, EM2)} & 0.7035\text{–}0.710 & 0.5120\text{–}0.5126 \\
\text{lower continental crust} & 0.705\text{–}0.710 & 0.5118\ (\approx -15)\\
\text{upper continental crust}\ (3\ \mathrm{Ga}) & 0.720\ \text{or more} & 0.5119\text{–}0.5121
\end{array}
$$
and the fact that **strontium and neodymium fractionate in opposite directions** during partial melting — rubidium is incompatible and strontium mildly so, so the crust becomes radiogenic in strontium, whereas neodymium is more incompatible than samarium, so the crust becomes **less** radiogenic in neodymium — is what makes the two-dimensional strontium–neodymium diagram so powerful.
:::

::: definition Helium, argon and neon: the noble-gas tracers {#def-noble}
The noble gases are the cleanest tracers of **source and mixing** in the crust and mantle because they do not react, and their isotope compositions cannot be changed by anything except **mixing, radioactive production and escape to the atmosphere**. Three ratios carry almost all the information. **$^{3}\mathrm{He}/^{4}\mathrm{He}$**, expressed as $R/R_{\mathrm{A}}$ where $R_{\mathrm{A}} = 1.39\times10^{-6}$ is the atmospheric ratio, distinguishes a **primordial mantle** component ($8$–$12\ R_{\mathrm{A}}$ at ocean-island basalts and $>20\ R_{\mathrm{A}}$ claimed for the deepest plumes) from the **depleted mantle** ($8 \pm 1\ R_{\mathrm{A}}$ at mid-ocean ridges) and from **crustal** helium, which is dominated by radiogenic $^{4}\mathrm{He}$ from uranium and thorium and lies at $0.01$–$0.1\ R_{\mathrm{A}}$. Because helium-3 is **primordial** and is being lost from the Earth at $10^{4}$–$10^{5}$ atoms cm$^{-2}$ s$^{-1}$, the ratio is a direct measure of how much **undegassed** mantle remains, and the fact that ocean-island basalts still reach $30\ R_{\mathrm{A}}$ requires a deep, slow-convecting, partially primordial reservoir. **$^{40}\mathrm{Ar}^*/^{36}\mathrm{Ar}$** in the atmosphere (295.5 against the mantle's much higher value) shows that the atmosphere is a **partial degassing product**, and the argon isotope systematics constrain the fraction of the mantle that has degassed. **Neon** ($^{20}\mathrm{Ne}/^{22}\mathrm{Ne}$, $^{21}\mathrm{Ne}/^{22}\mathrm{Ne}$) is the most primitive of all, because neon is not produced radiogenically in significant amounts, and the **solar-neon** component in plume basalts is the strongest evidence that the deep mantle contains **nebular** gas trapped during accretion. In the **crust and groundwater**, the trio $^{3}\mathrm{He}/^{4}\mathrm{He}$, $^{40}\mathrm{Ar}^*/^{36}\mathrm{Ar}$ and the **tritium** and $^{39}\mathrm{Ar}$ contents date groundwater residence times from 12 to 1200 years and identify the **mantle degassing** that precedes eruptions and large earthquakes.
:::

::: example Epsilon arithmetic and the identification of a component {#ex-epsilon}
A granite has $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7120$ and $^{143}\mathrm{Nd}/^{144}\mathrm{Nd} = 0.51195$. Express both in epsilon units, and decide whether the source is a depleted-mantle-derived magma that assimilated 20 per cent of upper crust, or a metasediment.
::: solution
$$
\varepsilon_{\mathrm{Sr}} = \left(\frac{0.7120}{0.7045}-1\right)\times10^{4} = +106, \qquad
\varepsilon_{\mathrm{Nd}} = \left(\frac{0.51195}{0.512638}-1\right)\times10^{4} = -13.4 .
$$
Both are strongly crustal: $\varepsilon_{\mathrm{Sr}}$ of +106 and $\varepsilon_{\mathrm{Nd}}$ of $-13$ are the values of **old upper continental crust**, and neither number alone discriminates the two hypotheses, because a mantle magma with $\varepsilon_{\mathrm{Sr}} = -26$, $\varepsilon_{\mathrm{Nd}} = +10$ that assimilated 20 per cent of crust with +220 and $-15$ would give, on a **concentration-weighted** mixing basis,
$$
(^{87}\mathrm{Sr}/^{86}\mathrm{Sr})_{\mathrm{mix}} = \frac{0.2\times400\times0.7200 + 0.8\times150\times0.70265}{0.2\times400 + 0.8\times150}
   = \frac{57.6+84.3}{200} = 0.7096 \;(\varepsilon_{\mathrm{Sr}} = +72),
$$
$$
\varepsilon_{\mathrm{Nd}}^{\mathrm{mix}} = \frac{0.2\times25\times(-15) + 0.8\times30\times(+10)}{0.2\times25 + 0.8\times30} = \frac{-75+240}{29} = +5.7 ,
$$
taking 400 ppm Sr and 25 ppm Nd in the crust and 150 ppm Sr and 30 ppm Nd in the magma. The strontium comes out close but the **neodymium comes out strongly positive**, because the mantle magma carries 30 ppm of neodymium against the crust's 25 ppm and eight-tenths of it is mantle. The measured $\varepsilon_{\mathrm{Nd}}$ of $-13.4$ therefore **rules out** 20 per cent crustal assimilation by a mantle magma and requires a **crustal source** — a metasediment or a paragneiss.

This is the **hyperbolic-mixing** result in numbers: on a plot of $\varepsilon_{\mathrm{Nd}}$ against $1/\mathrm{Nd}$, or of $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ against $1/\mathrm{Sr}$, a mixing curve is dominated by the **more concentrated** component, so a small proportion of a concentrated component controls the isotope ratio while a large proportion of a dilute component controls the trace-element chemistry. The corollary, and the reason the two-element test works, is that **strontium and neodymium have different concentrations in the two end-members**, so the two systems weight the components differently and a single sample can be tested against both.

The final discriminator is the **zircon**: an S-type granite or a metasediment contains **inherited** zircons with U–Pb ages up to the age of the source and $\varepsilon_{\mathrm{Hf}}$ values that are strongly negative at the crystallisation age, whereas an I-type or mantle-derived granite has zircons whose $\varepsilon_{\mathrm{Hf}}$ at crystallisation is near-zero or positive.
:::
:::

::: widget plot
f: -26 + (220-(-26))*x
x: 0, 1
y: -30, 230
labels: \varepsilon_{\text{Sr}}
caption: The linear mixing of $\varepsilon_{\mathrm{Sr}}$ between a depleted-mantle end-member ($-26$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.70265$) and an upper-crustal end-member ($+220$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7200$) as a function of the crustal fraction $x$. Note that **$x$ is a mass fraction only if the two end-members have equal strontium concentrations**; because the crust typically carries 250–400 ppm of strontium against the mantle magma's 100–200 ppm, a measured $\varepsilon_{\mathrm{Sr}}$ of +78 corresponds to a **mass** fraction near 0.25 rather than 0.33. The curve is straight in $\varepsilon_{\mathrm{Sr}}$ and **curved in $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ against $1/\mathrm{Sr}$**, and it is the latter form that is used to test whether a suite is a mixing array at all: a linear array in $1/x$ versus $x$ is the classic signature of binary mixing, and a curved one requires either three components or open-system behaviour.
:::

## The systems

::: definition Strontium, neodymium, hafnium {#def-srnghf}
**Rubidium–strontium** ($^{87}$Rb → $^{87}$Sr, $\lambda = 1.42\times10^{-11}\ \mathrm{yr^{-1}}$) is the oldest and most widely applicable system. Rubidium is a large-ion lithophile element and is strongly concentrated in the **continental crust, in micas and in evaporites**, so strontium isotopes are the tracer of **chemical weathering and of crustal recycling**: the seawater $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ curve, from 0.7075 in the Early Cretaceous to 0.7092 today, is read as a record of the **increase in continental weathering flux** driven by Himalayan and Andean uplift, by the expansion of physical erosion and by the spread of burrowing and root-permeated soils. **Samarium–neodymium** ($^{147}$Sm → $^{143}$Nd, $\lambda = 6.54\times10^{-12}\ \mathrm{yr^{-1}}$) is the **mantle** tracer par excellence, because samarium and neodymium are both rare earths, both are immobile in aqueous fluid, and their ratio is therefore set at melting and never disturbed afterwards — so $\varepsilon_{\mathrm{Nd}}$ survives metamorphism, weathering and alteration that destroy the strontium and rubidium. **Lutetium–hafnium** ($^{176}$Lu → $^{176}$Hf, $\lambda = 1.867\times10^{-11}\ \mathrm{yr^{-1}}$) is the neodymium system's partner, and its unique value is that **zircon takes hafnium and excludes lutetium**, so a zircon's $\varepsilon_{\mathrm{Hf}}$ at its U–Pb crystallisation age records the source's lutetium/hafnium ratio at that time — the single most powerful constraint on **crustal growth**, because a zircon with $\varepsilon_{\mathrm{Hf}}(t) > +5$ at 2.7 Ga requires that its source was separated from the mantle at or before 2.7 Ga, and a zircon with $\varepsilon_{\mathrm{Hf}}(t) = +8$ requires extraction from a **depleted** mantle within the previous few hundred million years.
:::

::: definition Lead and osmium {#def-pb-os}
**Lead** is the only element whose four stable isotopes are all radiogenic (or, for $^{204}$Pb, none is), so a lead isotope composition is a **three-dimensional** record of the uranium/lead and thorium/lead history of its reservoir:
$$
\left(\frac{^{206}\mathrm{Pb}}{^{204}\mathrm{Pb}}\right)_t = \left(\frac{^{206}\mathrm{Pb}}{^{204}\mathrm{Pb}}\right)_0 + \mu\left(e^{\lambda_{238}t}-1\right), \qquad \mu = \frac{^{238}\mathrm{U}}{^{204}\mathrm{Pb}} .
$$
Because $\mu$ and $\kappa = {}^{232}\mathrm{Th}/^{238}\mathrm{U}$ are **elemental** ratios set by melting, lead isotopes record both the **timing** and the **intensity** of mantle and crustal differentiation, and the three isotope planes $(^{206}\mathrm{Pb}/^{204}\mathrm{Pb},\ ^{207}\mathrm{Pb}/^{204}\mathrm{Pb},\ ^{208}\mathrm{Pb}/^{204}\mathrm{Pb})$ define the **geochron** — the array of leads that evolved from a common reservoir with different $\mu$ — whose slope gives the age of the last large-scale uranium/lead fractionation. Lead's weakness is that it is **mobile**: in subduction zones, in ore-forming fluids and during metamorphism, so a lead isotope signature may be a **fluid** signature.

**Rhenium–osmium** ($^{187}$Re → $^{187}$Os, $\lambda = 1.666\times10^{-11}\ \mathrm{yr^{-1}}$) is the tracer of **metallic core and sulfide**, because both rhenium and osmium are highly siderophile and chalcophile. The mantle's osmium isotope composition is **near-chondritic** ($^{187}\mathrm{Os}/^{188}\mathrm{Os} \approx 0.128$), which is the "osmium isotope paradox": the mantle's rhenium/osmium ratio is chondritic even though every other moderately incompatible element is fractionated, and the reason is either that the late veneer added chondritic osmium after core formation or that rhenium and osmium were fractionated together. In **seawater**, osmium isotopes (0.12–1.05 through the Cenozoic, against a mantle value of 0.128 and a continental value of 0.2–1.5) are a direct record of the **continental weathering flux**, and the excursions recorded across the Palaeocene–Eocene thermal maximum and the mid-Eocene climatic optimum show that the osmium isotope composition of the ocean responded to rapid climate change on millennial timescales.
:::

::: example Neodymium as a water mass tracer {#ex-nd-water}
Deep-water masses in the modern ocean have $\varepsilon_{\mathrm{Nd}}$ of $-1.2$ for North Atlantic Deep Water, $-4.3$ for Antarctic Bottom Water and $-19$ for North Pacific Deep Water. A sediment core from the Pacific sector of the Southern Ocean at 3 Ma gives $\varepsilon_{\mathrm{Nd}} = -6.0$ and one at 20 Ma gives $-9.5$. Interpret, and state what the neodymium isotope composition of a sediment **does not** record.
::: solution
Neodymium in seawater is a **pseudo-nutrient** with a short residence time of 200–500 years, far shorter than the ocean's 1000-year circulation time, so each basin's deep water carries the neodymium isotope signature of the **continental margins it last touched** and of the water mass it formed from. North Atlantic Deep Water forms on the margins of the young, basaltic, volcanically active North Atlantic and inherits its low $^{143}\mathrm{Nd}/^{144}\mathrm{Nd}$; Circumpolar Deep Water and Antarctic Bottom Water form against old continental crust; and the North Pacific, being the end of the global conveyor, receives only the most radiogenic, most recycled water.

The Pacific core at 3 Ma with $\varepsilon_{\mathrm{Nd}} = -6.0$ lies between modern Antarctic Bottom Water ($-4.3$) and modern Circumpolar Deep Water, and indicates that the site was bathed by a water mass with a **larger Southern Component** than today's North Pacific Deep Water. The 20-Ma value of $-9.5$ is more radiogenic still, and records the interval **before the intensification of Northern Hemisphere glaciation and before the closure of the Central American Seaway**, when Pacific Deep Water was more like Circumpolar Deep Water and the modern north–south neodymium gradient across the Drake Passage was weaker or absent. The gradient in $\varepsilon_{\mathrm{Nd}}$ between the Atlantic and Pacific deep basins is therefore a **direct measure of the strength of the Atlantic meridional overturning circulation**, and the modern value of 18 epsilon units is the end-member against which the Palaeogene and Miocene records of 4–8 units are read as a **weaker or more diffuse overturning**.

What neodymium does **not** record is equally important. It does not record **temperature, productivity or carbonate chemistry**, because it is a trace element whose isotope composition is set by the source, not by biological or chemical fractionation in the water column. It does not record **local** conditions if the sediment contains **hydrogenous or wind-blown** neodymium of a different provenance, and the "leachable" neodymium extracted from a sediment's Fe–Mn coating is contaminated by wind-blown dust from the continent downwind, which is the largest single source of error in the Palaeogene record. And it does not record a **flux**, because the concentration of neodymium in the water is set by the balance of riverine input, boundary exchange with the sediments, and removal by authigenic phases, none of which is the same as the water mass's own flow rate. The modern practice is therefore to combine $\varepsilon_{\mathrm{Nd}}$ with **osmium** (which is also a water-mass tracer but with a different sensitivity to the riverine flux), with **protactinium–thorium** (which is a direct measure of the overturning **rate**), and with the **carbon isotope** record, and to interpret the three together.
:::
:::

::: example Osmium and the weathering flux {#ex-os}
Suppose that during a warm interval the $^{187}\mathrm{Os}/^{188}\mathrm{Os}$ of the ocean rose from a mantle-like 0.128 to 0.160. Taking continental runoff at 1.0 and hydrothermal input at 0.128, find the change in the continental osmium fraction, and explain why osmium is a better weathering tracer than strontium.
::: solution
With $f$ the continental fraction,
$$
0.160 = 1.0f + 0.128(1-f) \Rightarrow f = \frac{0.160-0.128}{1.0-0.128} = 0.037 ,
$$
and the pre-excursion value of 0.128 gives $f = 0$. The continental osmium fraction rose from essentially zero to **3.7 per cent** of the ocean's osmium budget. Because the continental flux of osmium is tiny in absolute terms — the ocean's osmium is dominated by hydrothermal input — but its isotope composition is **eight times** more radiogenic, osmium is exquisitely sensitive to the continental input even at the per-cent level.

Osmium is the better weathering tracer than strontium for three reasons. Its **two end-members are far more widely separated** in isotope composition, a factor of 8 against strontium's 0.703 versus 0.715 or a factor of 1.017, so the mixing calculation is far less sensitive to the assumed end-member compositions. Its **residence time** of 10,000–40,000 years is short compared with the ocean's circulation time, so the record has good temporal resolution and records the **global** rather than the basin-scale signal. And most importantly, **osmium is not controlled by the lithology being weathered** in the way strontium is: a shift from weathering basalt to weathering granite changes the strontium isotope ratio enormously at constant mass flux, whereas the osmium isotope ratio responds to the **mass of continental rock weathered** and to its **age**, since old crust is more radiogenic, which is a more direct measure of the weathering flux. The corollary is that osmium and strontium **together** separate flux from lithology, and this pairing is the basis of most modern palaeoweathering reconstructions.
:::
:::

::: example The geochron and the age of a fractionation {#ex-geochron}
Cogenetic leads from a mineralised district define a $^{207}\mathrm{Pb}/^{204}\mathrm{Pb}$ against $^{206}\mathrm{Pb}/^{204}\mathrm{Pb}$ array of slope 0.138. Find the "geochron age", and explain what it does and does not date.
::: solution
For leads that evolved from a common initial composition with a common $\mu$ but different present-day $^{238}\mathrm{U}/^{204}\mathrm{Pb}$, the slope of the array at time $t$ is
$$
\frac{d(^{207}\mathrm{Pb}/^{204}\mathrm{Pb})}{d(^{206}\mathrm{Pb}/^{204}\mathrm{Pb})} = \frac{1}{137.88}\cdot\frac{e^{\lambda_{235}t}-1}{e^{\lambda_{238}t}-1} .
$$
Evaluating,
$$
\begin{array}{c|ccccc}
t\ (\mathrm{Ga}) & 1.0 & 2.0 & 2.2 & 2.5 & 4.56 \\ \hline
\text{slope} & 0.073 & 0.123 & 0.138 & 0.164 & 0.622
\end{array}
$$
so a slope of 0.138 corresponds to a **geochron age of 2.2 Ga**.

What this date means is the interesting part. It is **not** the age of the ore, of the granite, or of the mantle. It is the age at which the source reservoir's uranium/lead ratio was **last homogenised** — the time since which the different parts of the source have been accumulating radiogenic lead at different rates. For a lead derived from a 2.2-Ga crust that was remobilised in a younger orogeny, the geochron age recovers the **crustal extraction age**, and the lead isotope data therefore date an event that no mineral in the sample records. For the **modern oceanic-lead array**, whose slope is about 0.143, the geochron age of 2.2–2.5 Ga has been read as the time of the last **global-scale** uranium/lead fractionation in the mantle — the formation of the **continents** in the Palaeoproterozoic — but it has equally been read as an artefact of mixing between a small number of mantle components with different $\mu$ and $\kappa$, and the ambiguity is unresolved.

The **three-dimensional** plot resolves part of it. A single-stage uranium/lead history plots on a **plane** in $(^{206}\mathrm{Pb},^{207}\mathrm{Pb},^{208}\mathrm{Pb})/^{204}\mathrm{Pb}$ space, and the plane's two slopes give the $\mu$ and $\kappa$ of the source; a data array that is **curved** in the thorium dimension requires a **two-stage** history with a change in $\kappa$, which is the classic signature of a mantle source that received recycled crustal material.
:::
:::

::: warning An isotope ratio is a mixture, a flux and a coincidence
Four traps make radiogenic isotopes the most misused data in the geosciences. **Mixing is not unique**: a strontium–neodymium point that lies on the mixing hyperbola between depleted mantle and upper crust can equally be produced by a **two-stage enriched mantle** source, and the two are distinguished only by the **trace-element concentrations** (an assimilated crustal component brings strontium and neodymium in the crust's proportions, a mantle source does not) and by the **osmium and lead** systems, which the mantle source cannot mimic. **The initial ratio is not the source ratio**: a magma that equilibrates its strontium with wall-rock while its neodymium stays put — the classic **open-system** behaviour of a hot, water-rich, low-viscosity basalt against a cold, dry rhyolite — gives a strontium isotope "age" and a neodymium "source", and the diagnostic is the **strontium isotope disequilibrium** between minerals in a single thin section, which is common and is invisible in a whole-rock powder. **A seawater curve is a flux and an isotope composition at once**: the $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ of the ocean records the **relative** contributions of riverine, hydrothermal and weathering-derived strontium, so a rise can mean more weathering, less hydrothermal input, or a change in the **lithology** being weathered from basalt to granite, and the three are separated only by pairing strontium with **osmium, neodymium and lithium isotopes**, which respond differently. **And correlation is not causation across a 100-million-year record**: the Cenozoic rise in seawater strontium and the Cenozoic cooling are both real, but the correlation is not significant once the 60-Myr lag and the non-stationary noise of both records are treated properly, and the same is true of most claims that a seawater isotope curve "records" Himalayan uplift. The discipline is to state the **end-members, the concentrations, the mixing model and the alternative** for every isotope interpretation, and to treat a single isotope system as a hypothesis rather than a conclusion.
:::

::: history
**Nier** (Nier) measured the first precise lead isotope ratios in 1937–38 and **Holmes** (Holmes) and **Boltwood** (Boltwood) saw at once that they recorded the crust's history; **Holmes** produced the first **lead–lead model age** in 1947 and **Houtermans** (Houtermans) independently in 1947, and the resulting "Holmes–Houtermans age" of about 3 Ga for the crust was the first quantitative estimate of the age of the continents. **Patterson** (Patterson) in 1956 established the age of the Earth and, in the same paper, the **three-stage lead evolution model** of the Earth, the crust and the meteorites. **Allegre** (Allegre) formalised the **two-stage model ages** and the **crustal residence age** in 1971, **DePaolo** (DePaolo) and **Jacobsen and Wasserburg** (Wasserburg) built the **depleted-mantle neodymium evolution** and the $\varepsilon_{\mathrm{Nd}}$ convention in 1979–80, and **Goldstein, O'Nions and Hamilton** (O'Nions) established the **model-age systematics** in 1984. **McCulloch and Wasserburg** (McCulloch) applied rubidium–strontium and samarium–neodymium to the mid-ocean-ridge basalts in 1978 and defined the **depleted-mantle** end-member; **White, Hofmann** (Hofmann), **Zindler, Hart and Staudigel** (Hart) built the **mantle isotope array** and the HIMU, EM1, EM2 and FOZO components in the 1980s. **Basaltic lead isotopes** as a mantle tracer are the work of **Chauvel, Blichert-Toft, Rubatto and the Paris school** (Blichert-Toft), and the **hafnium in zircon** revolution is **Griffin, Pearson, Belousova, Jackson, Vervoort and Kemp** (Griffin). **Seawater strontium isotope stratigraphy** is the work of **Burke, Denison, Hetherington, Koepnicki and Nelson** (Burke) in 1982, and **seawater osmium** that of **Ravizza, Peucker-Ehrenbrink, Goldstein, Lear and Pearce** (Ravizza). **Palaeoweathering and the lithium and calcium isotope records** are the work of **Pogge von Strandmann, Vigier, Brenan, Misra and Froehlich** (Pogge von Strandmann).
:::

## Where this leads

The decay equations and the isochron are in [[geochemistry/geochronology]], the parent–daughter partitioning that creates the fractionation is in [[geochemistry/trace-elements]] and [[mineralogy-petrology/magma-evolution]], the mantle reservoirs are in [[geophysics/seismic-structure]] and [[geochemistry/reactions]], the seawater records and their climate interpretations are in [[palaeoclimate/ocean-sediments]] and [[climate-change/observed-change]], the crustal-growth record is in [[earth-history/early-earth]] and [[earth-history/cenozoic]], the provenance applications are in [[sedimentology/stratigraphy]] and [[sedimentology/facies]], and the stable-isotope counterparts are in [[geochemistry/stable-isotopes]] and [[geochemistry/isotopes-water-carbon]].

::: quiz
A basalt has $\varepsilon_{\mathrm{Nd}} = +8$ and $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7090$. Which is the most likely explanation?
- [ ] A depleted-mantle source.
- [ ] A subducted-sediment component.
- [x] The strontium has been disturbed by alteration or crustal contamination while the neodymium has not.
- [ ] An enriched-mantle (EM2) source.
::: solution
Depleted mantle has $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ of 0.70265 and $\varepsilon_{\mathrm{Nd}}$ of $+10$; EM2 has a **radiogenic** strontium (0.705–0.710) but a **low** $\varepsilon_{\mathrm{Nd}}$ (0 to $+3$), and subducted sediment has both radiogenic strontium and negative $\varepsilon_{\mathrm{Nd}}$. A value of $+8$ neodymium with 0.7090 strontium puts the sample **off every mantle array**, and the reason is that strontium is mobile in low-temperature aqueous fluid and hydrothermal alteration while neodymium is essentially immobile. The test is the **smectite and carbonate content**, the $\delta^{18}$O, and mineral-scale strontium isotope work on separated plagioclase, which is the phase that takes up the altered strontium.
:::
:::

::: summary
- A radiogenic isotope ratio is a decay product of a chemical fractionation, and its value records when and how strongly the source was fractionated.
- Epsilon notation makes small variations readable; the reference reservoir must always be stated.
- Strontium and neodymium fractionate in opposite directions during melting, which is why the two-element diagram separates mantle from crust.
- Samarium–neodymium is robust and rubidium–strontium is mobile, so a sample that lies off the mantle array has usually been altered in strontium.
- Hafnium in zircon links a crustal protolith's age to its source, and is the basis of most modern crustal-growth curves.
- Lead is three-dimensional and geochron-datable but mobile; osmium is the tracer of core, sulfide and continental weathering flux.
:::

## Exercises

::: exercise Epsilon neodymium {level=1 check="-15"}
Find $\varepsilon_{\mathrm{Nd}}$ for $^{143}\mathrm{Nd}/^{144}\mathrm{Nd} = 0.511868$.
::: solution
$\varepsilon_{\mathrm{Nd}} = (0.511868/0.512638 - 1)\times10^4 = -15.0$. This is the value of **Archaean lower or upper continental crust**, and it is the reason that a granite with $\varepsilon_{\mathrm{Nd}}$ of $-15$ at 300 Ma cannot have come from the mantle at that time.
:::
:::

::: exercise Epsilon strontium {level=1 check="+78"}
Find $\varepsilon_{\mathrm{Sr}}$ for $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7100$.
::: solution
$\varepsilon_{\mathrm{Sr}} = (0.7100/0.7045 - 1)\times10^4 = +78$. Against the depleted mantle at $-26$, this is a swing of 104 epsilon units, which for a rock with 300 ppm of strontium requires a large crustal or evaporite component.
:::
:::

::: exercise Mantle arrays {level=1}
A basalt has $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7028$ and $^{143}\mathrm{Nd}/^{144}\mathrm{Nd} = 0.51310$. Is it on the mantle array?
::: solution
Yes. The two values are within a few epsilon units of the **depleted-mantle** end-member (0.70265, 0.51315), and the two systems agree, which is the test. A sample that is depleted in strontium but not in neodymium, or vice versa, is not on the array however close one of its values looks.
:::
:::

::: exercise A mixing calculation {level=2 check="0.135"}
Magma A has Sr 150 ppm and $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7030$; contaminant B has Sr 400 ppm and 0.7200. Find the mass fraction of B needed to give 0.7080.
::: solution
The mixed ratio is a **concentration-weighted** average:
$$
0.7080 = \frac{x\times400\times0.7200 + (1-x)\times150\times0.7030}{x\times400 + (1-x)\times150}.
$$
Solving, $0.7080(400x + 150 - 150x) = 288x + 105.45 - 105.45x$, so
$$
177.0x + 106.2 = 182.55x + 105.45, \qquad 0.75 = 5.55x, \qquad x = 0.135 .
$$
(With equal strontium concentrations the answer would be 0.25.) The contaminant's higher strontium content means that **less than one-seventh of its mass** is needed, which is why crustal contamination is so efficient at changing a strontium ratio and so inefficient at changing a major-element chemistry.
:::
:::

::: exercise Hafnium model ages {level=2 check="0.4"}
A 2700-Ma zircon has $^{176}\mathrm{Lu}/^{177}\mathrm{Hf} = 0.002$ and present $^{176}\mathrm{Hf}/^{177}\mathrm{Hf} = 0.28290$. Find its initial ratio and its $\varepsilon_{\mathrm{Hf}}(t)$.
::: solution
$$
(^{176}\mathrm{Hf}/^{177}\mathrm{Hf})_t = 0.28290 - 0.002\left(e^{1.867\times10^{-11}\times2.7\times10^{9}} - 1\right)
   = 0.28290 - 0.002\times0.0517 = 0.282797 .
$$
$$
\varepsilon_{\mathrm{Hf}}(t) = (0.282797/0.282785 - 1)\times10^{4} = +0.4 .
$$
An $\varepsilon_{\mathrm{Hf}}(t)$ of $+0.4$ at 2.7 Ga is **chondritic**, which means the source had a chondritic lutetium/hafnium ratio and therefore had been in the crust for a long time — a **crustal reworking** event rather than the addition of new mantle-derived crust. A juvenile 2.7-Ga crust would give $\varepsilon_{\mathrm{Hf}}(t)$ of $+3$ to $+8$.
:::
:::

::: exercise Seawater strontium {level=2}
Seawater $^{87}\mathrm{Sr}/^{86}\mathrm{Sr}$ rose from 0.7075 at 100 Ma to 0.7092 today. Riverine strontium has a ratio of 0.715 and hydrothermal strontium of 0.7030. Find the change in the fraction of riverine strontium, and say what else could produce the same shift.
::: solution
Writing $f$ for the riverine fraction,
$$
0.7075 = 0.715f + 0.7030(1-f) \Rightarrow f = \frac{0.7075-0.7030}{0.012} = 0.375,
$$
$$
0.7092 = \dots \Rightarrow f = \frac{0.7092-0.7030}{0.012} = 0.517 .
$$
The riverine share of the ocean's strontium has therefore risen from **38 to 52 per cent**, with a compensating fall in the hydrothermal share.

Three alternatives produce the same shift without any change in the riverine **flux**. The **lithology** being weathered may have changed — weathering a granite terrane gives 0.715–0.720, weathering basalt gives 0.703–0.705, so a shift from a basaltic to a granitic source raises the ratio at constant flux. The **hydrothermal flux** may have fallen with a slowing of seafloor spreading, which is the standard reading of the Cretaceous lowstand in the curve. And the **reverse-weathering flux** of authigenic clay on the continental shelf, which takes strontium out of solution with an isotope fractionation of about 0.001, may have changed its share of the ocean's strontium sink. The discriminators are the **osmium isotope record**, which responds to the continental flux but not to the lithology, the **neodymium isotope record**, which responds to both, and the **lithium isotope record**, which responds to the **intensity of chemical as opposed to physical weathering**.
:::
:::

::: exercise A two-stage lead model age {level=3 check="2.2"}
Cogenetic leads define a $^{207}\mathrm{Pb}/^{204}\mathrm{Pb}$ against $^{206}\mathrm{Pb}/^{204}\mathrm{Pb}$ slope of 0.138. Find the geochron age and, if the array's intercept on the $^{206}\mathrm{Pb}/^{204}\mathrm{Pb}$ axis at a slope of 0.138 corresponds to a source $\mu = {}^{238}\mathrm{U}/^{204}\mathrm{Pb}$ of 9.5, find the source's $^{206}\mathrm{Pb}/^{204}\mathrm{Pb}$ today.
::: solution
From the geochron table a slope of 0.138 corresponds to **2.2 Ga**. The present-day ratio of a reservoir with $\mu = 9.5$ that started from the 4.56-Ga initial lead of Canyon Diablo ($^{206}\mathrm{Pb}/^{204}\mathrm{Pb} = 9.31$) is
$$
\frac{^{206}\mathrm{Pb}}{^{204}\mathrm{Pb}} = 9.31 + 9.5\left(e^{1.55125\times10^{-10}\times4.557\times10^{9}} - 1\right)
   = 9.31 + 9.5\times1.028 = 19.1 .
$$
A source with $\mu = 9.5$ therefore produces a **very radiogenic** lead (19.1 against the bulk-Earth value of about 18.0 and the upper crust's 20), and the reason the geochron age is 2.2 Ga rather than 4.56 Ga is that the reservoir's $\mu$ was **set at 2.2 Ga** — before that time it had a lower $\mu$, and the array records only the second stage.

The interpretation is the point. A geochron age of 2.2 Ga in a Proterozoic terrane is read as the time of **crustal extraction from the mantle**, and it is one of the few ways to date an event that leaves no mineral. The **caveat** is that the slope is sensitive to the assumption of a **single common initial lead**; if the cogenetic leads had slightly different initial ratios — which they commonly do, because they are drawn from a heterogeneous crust — the slope is biased and the model age can be wrong by hundreds of millions of years. The test is the **$^{208}\mathrm{Pb}/^{204}\mathrm{Pb}$ dimension**: a genuine single-stage, single-initial array plots on a plane in three dimensions, and a mixed array does not.
:::
:::


::: exercise A helium isotope ratio {level=2 check="4.3"}
A thermal spring has $^{3}\mathrm{He}/^{4}\mathrm{He} = 6.0\times10^{-6}$. Express it in $R/R_{\mathrm{A}}$ units ($R_{\mathrm{A}} = 1.39\times10^{-6}$) and interpret it.
::: solution
$R/R_{\mathrm{A}} = 6.0/1.39 = 4.3$. A value above 1 and well below the crustal 0.01–0.1 requires a **mantle or magmatic** helium component, and 4.3 $R_{\mathrm{A}}$ is typical of a crustal aquifer contaminated by a few per cent of mantle-derived volatiles along a major fault. The mixing fraction with a crustal end-member of 0.02 is only about 50 per cent, because crustal helium is so much more abundant: helium isotope ratios are dominated by the **crustal** component in concentration and by the **mantle** component in ratio, which is what makes them so sensitive.
:::
:::

::: exercise A geochron slope {level=3 check="0.073"}
Find the slope of a single-stage lead geochron with a model age of 1.0 Ga in the $^{207}\mathrm{Pb}/^{204}\mathrm{Pb}$ against $^{206}\mathrm{Pb}/^{204}\mathrm{Pb}$ plane.
::: solution
$$
\text{slope} = \frac{1}{137.88}\cdot\frac{e^{\lambda_{235}t}-1}{e^{\lambda_{238}t}-1}
   = \frac{1}{137.88}\cdot\frac{e^{0.9849}-1}{e^{0.1551}-1}
   = \frac{1.676}{137.88\times0.1678} = 0.073 .
$$
The slope **increases with model age**, from 0.073 at 1 Ga to 0.138 at 2.2 Ga and 0.62 at 4.56 Ga, so a well-determined slope is a model age — but only under the assumption that all the leads shared a **common initial composition and a common $\mu$ history**. Because real crustal leads do not, geochron ages are best treated as **minimum** ages for the crustal extraction and are always checked against the U–Pb zircon age of the source.
:::
:::
