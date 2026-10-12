In 2001 Simon Wilde and colleagues reported a grain of zircon from a conglomerate in the Jack Hills of Western Australia, four hundred and forty-four million millions of years old, and the thing that made the paper was not the age. Zircons crystallise in granitic melts, and this one's oxygen isotope ratio — the ratio of $^{18}\mathrm{O}$ to $^{16}\mathrm{O}$ — was far too low for a dry, hot, mantle-derived melt. It was exactly what you get when a magma forms by melting rock that has been at the surface, interacting with liquid water at low temperature. Within $160$ million years of the accretion of the Earth, therefore, there was a crust, it was being reworked, and there was liquid water on it. The eon that Prentice and Wilson had named in 1972 for Hades — a molten, sterile, bombarded ball — had, on the evidence of one sand grain, oceans within a geological instant of forming.

The Hadean and Archaean are the Earth's longest and least-known chapters: $3.5$ billion years of the planet's $4.54$, ending at the start of the Cambrian, and containing the origin of life, the first continents, the first tectonics, the first glaciations and the whole of the atmosphere's transformation. Almost nothing is directly observable, because the rock record is a scatter of high-grade remnants, and almost everything is argued from isotope systematics, from the physics of accretion, and from the assumption that the same mantle has been making crust the whole time. This chapter is about how much can be known from so little.

## Making a planet

::: example How fast did the Earth form, and its core? {#ex-hfw}
The now-extinct isotope $^{182}\mathrm{Hf}$ decays to $^{182}\mathrm{W}$ with a half-life of $8.9\ \mathrm{Myr}$. Hafnium is lithophile and tungsten is siderophile, so when metal segregated to form the core the mantle's Hf/W ratio jumped, and the amount of radiogenic $^{182}\mathrm{W}$ the mantle kept depends on how much $^{182}\mathrm{Hf}$ was left when segregation stopped. If the ratio $^{182}\mathrm{Hf}/^{180}\mathrm{Hf}$ was $1.0\times10^{-4}$ at the formation of the calcium–aluminium inclusions and the Earth's mantle signature corresponds to a value of $1.5\times10^{-5}$ at the time of core formation, find the interval between the two events.
::: solution
$$
t = \frac{1}{\lambda}\ln\frac{(^{182}\mathrm{Hf}/^{180}\mathrm{Hf})_0}{(^{182}\mathrm{Hf}/^{180}\mathrm{Hf})_t} = \frac{8.9}{0.693}\ln\frac{1.0\times10^{-4}}{1.5\times10^{-5}} = 12.84\times\ln 6.67 = 24\ \mathrm{Myr}.
$$
The Earth's core therefore separated within about $30\ \mathrm{Myr}$ of the first solids in the Solar System — while the planet was still accreting, and because accretion was still happening. Metal–silicon segregation requires melting on a planetary scale, so the energy of accretion alone was enough to melt the whole Earth, and the "Hadean magma ocean" is not a hypothesis but a consequence of the chronometry.

The shortness of the interval is the reason the isotope system is so powerful: with a half-life of $8.9\ \mathrm{Myr}$, $^{182}\mathrm{Hf}$ is a stopwatch that runs only for the first fifty million years and then stops, and everything it records is a measurement of the earliest events.
:::
:::

::: example Could the Moon-forming impact melt the Earth? {#ex-impact}
Model the impactor ("Theia") as $0.1$ Earth masses, $M = 6\times10^{23}\ \mathrm{kg}$, striking at $10\ \mathrm{km\,s^{-1}}$. Compare its kinetic energy with the energy needed to heat the whole Earth from $300\ \mathrm{K}$ to its liquidus ($2500\ \mathrm{K}$) and melt it, taking $c_p = 1000\ \mathrm{J\,kg^{-1}\,K^{-1}}$ and a latent heat of fusion of $4\times10^{5}\ \mathrm{J\,kg^{-1}}$.
::: solution
$$
E_\text{imp} = \tfrac{1}{2}mv^2 = 0.5\times6\times10^{23}\times(10^{4})^2 = 3\times10^{31}\ \mathrm{J},
$$
$$
E_\text{melt} = M_\oplus(c_p\Delta T + L) = 6\times10^{24}\times(2.2\times10^{6} + 4\times10^{5}) = 1.6\times10^{31}\ \mathrm{J}.
$$
The impact delivered roughly twice the energy needed to melt the entire planet, and melting is not the limit: the actual outcome was a **synestia**, a doughnut of vaporised rock rotating as one body, from which the Moon condensed out of the vapour and the Earth's mantle re-accreted. The isotope evidence for the impact is that the Moon is chemically like the Earth's mantle and unlike anything else in the Solar System — oxygen, titanium, tungsten and chromium isotope ratios are identical to the present analytical precision — which requires that the Moon formed mostly from material that had mixed thoroughly with the proto-Earth's mantle, and that the impact was energetic and the pre-impact Earth already differentiated.

The angular momentum works out too: the present Earth–Moon system's orbital angular momentum is $2.9\times10^{34}\ \mathrm{kg\,m^2\,s^{-1}}$, five times the Earth's spin, and a grazing impact of this size supplies exactly that.
:::
:::

::: svg
caption: The Hadean Earth at about 4.4 Ga, as the zircon and isotope evidence now suggests it. A magma ocean hundreds of kilometres deep was crystallising downwards, its heat carried away by a steam and carbon dioxide atmosphere and by radiation; the Moon was $3\times$ closer and $3\times$ larger in the sky, raising tides of hundreds of metres in the first oceans; the surface was being struck by the last of the accreting material, with basins hundreds of kilometres across; and by $4.4\ \mathrm{Ga}$ there was liquid water, a granitic crust being eroded and re-melted, and therefore a surface at which chemistry could become biology.
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Hadean Earth with a magma ocean, steam atmosphere and a close Moon">
  <style>
    .sky { fill: var(--warm-wash); }
    .sea { fill: var(--info-wash); }
    .magma { fill: var(--bad); opacity: 0.55; }
    .crust { fill: var(--accent-wash); stroke: var(--ink-2); stroke-width: 1; }
    .moon { fill: var(--sheet); stroke: var(--ink-2); stroke-width: 1.4; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
    .ray { stroke: var(--series-2); stroke-width: 1.4; stroke-dasharray: 4 4; fill: none; }
  </style>
  <rect class="sky" x="0" y="0" width="760" height="330"/>
  <circle class="moon" cx="620" cy="80" r="46"/>
  <path class="sea" d="M0,190 Q190,178 380,190 T760,190 L760,330 L0,330 Z"/>
  <path class="magma" d="M0,250 Q190,238 380,250 T760,250 L760,330 L0,330 Z"/>
  <path class="crust" d="M120,196 q60,-26 130,-4 q40,10 90,4 l0,14 q-60,10 -110,0 q-60,-14 -110,2 z"/>
  <path class="ray" d="M60,40 L120,120 M140,30 L180,110 M240,26 L250,100"/>
  <text class="lab" x="20" y="26">steam and CO2 atmosphere</text>
  <text class="sub" x="20" y="44">greenhouse: no liquid-water limit on the dayside</text>
  <text class="lab" x="496" y="150">Moon at 1/3 of today's distance</text>
  <text class="sub" x="560" y="168">tides of hundreds of metres</text>
  <text class="lab" x="150" y="182">first granitic crust, eroded and re-melted</text>
  <text class="lab" x="20" y="278">magma ocean, crystallising downward</text>
  <text class="sub" x="20" y="296">Jack Hills zircon at 4.404 Ga: low d18O means surface water and reworking</text>
</svg>
:::

## The first continents and the first tectonics

::: definition The Archaean rock record {#def-archaean-rocks}
Continental crust older than 2.5 Ga occurs in **shields** (the Canadian, Baltic, Siberian, West Australian, Kaapvaal) and appears as **greenstone belts** — folded and metamorphosed sequences of basalt, komatiite, sediment and chert, lying between domes of **granitoid** rock. The dominant rock type of the Archaean granitoids is **TTG**: tonalite–trondhjemite–granodiorite, a sodium-rich, silica-rich rock whose chemistry says it was made by melting hydrated basalt at high pressure, in the presence of water and garnet. **Komatiites** are ultramafic lavas with up to $30\ \mathrm{wt\%}$ MgO, erupted at temperatures of $1600$–$1900\ ^\circ\mathrm{C}$, with spinifex textures of olivine crystals that grew as the lava cooled; they are abundant in the Archaean and almost absent after $1.8\ \mathrm{Ga}$, and they are the strongest evidence that the Archaean mantle was $100$–$300\ \mathrm{K}$ hotter than today's.
:::

Whether the Archaean had plate tectonics is one of the subject's live arguments, and it is worth understanding why it is not settled. The **uniformitarian** position points to evidence that is genuinely tectonic: komatiites and arc-like basalts, eclogite and high-pressure garnet in some belts, TTGs that require subducted basalt to melt, palaeomagnetic data showing plates moving at modern speeds, and even ophiolites and accretionary complexes in a few places. The **opposing** position points to systematic differences: the Archaean crust is mafic-dominated and reworked in a way that modern crust is not; the granitoids are sodic rather than potassic until $2.5\ \mathrm{Ga}$; the metamorphic gradients are systematically higher (the "hot orogen" type, with no high-pressure/low-temperature pairs before about 2.5 Ga); and the greenstone belts are folded basins rather than passive margins. The current middle ground is that the Archaean had **some form of mobile, episodic, hot lithosphere** — "squishy lid" or drip tectonics, with subduction that was intermittent and often foundered — and that the transition to the modern, cold, rigid, globally connected plate system happened somewhere between 3.2 and 2.5 Ga, recorded in the change from TTG to sanukitoid to true granite and in the appearance of low-pressure metamorphism.

::: proposition The continental crust grew early and was then chewed over {#prop-crust-growth}
The neodymium model ages of crustal rocks, and the hafnium model ages of detrital zircons, give the time since the crust was extracted from the mantle. Both spectra are dominated by peaks at about $2.7$, $2.1$, $1.8$, $1.2$ and $0.9\ \mathrm{Ga}$, and both show that most of the crust was produced in the first two-thirds of Earth history. Whether the peaks record episodes of **crust production** or episodes of **crust preservation** — the older crust being destroyed rather than never made — is the central question, and the answer depends on how fast the crust is recycled.
:::

::: widget plot
f: exp(-x/s)
x: 0, 4.5
y: 0, 1.1
sliders: s=1.0:0.2:3.0
labels: fraction surviving
caption: The probability that a piece of crust formed $x$ billion years ago survives to be sampled today, if it is destroyed by recycling at a constant rate. The slider is the mean lifetime $\tau$ in billion years. With $\tau = 1\ \mathrm{Gyr}$, crust of Palaeoproterozoic age ($2.1\ \mathrm{Ga}$) has a $12\%$ chance of survival and Archaean crust $11\%$; with $\tau = 3\ \mathrm{Gyr}$ the numbers are $50\%$ and $47\%$. The observed spectrum of zircon U–Pb ages and Nd model ages is consistent with a mean lifetime of order $1$–$3\ \mathrm{Gyr}$, and the difference between the two ends of that range is the difference between "the crust grew in pulses" and "the crust grew smoothly and was then partly destroyed in pulses". The peaks at $2.7$ and $1.9\ \mathrm{Ga}$ are almost certainly a mixture of both.
:::

::: example The faint young Sun {#ex-faint-sun}
At $3.8\ \mathrm{Ga}$ the Sun's luminosity was $75\%$ of today's. Find the effective radiating temperature and the mean surface temperature assuming today's albedo and greenhouse, and then find the $\mathrm{CO_2}$ concentration needed to restore a modern climate using
$$
\Delta F = 5.35\ln(C/C_0)\ \mathrm{W\,m^{-2}}, \qquad \lambda \approx 3.2\ \mathrm{W\,m^{-2}\,K^{-1}} .
$$
::: solution
The effective temperature scales as $T \propto S^{1/4}$, so
$$
T_e = 255\times0.75^{0.25} = 255\times0.931 = 237\ \mathrm{K},
$$
which is $18\ \mathrm{K}$ below today's. With today's $33\ \mathrm{K}$ greenhouse the surface would average $-15\ ^\circ\mathrm{C}$, and the planet should have been ice-covered — yet the geological record shows liquid water, and the zircons show it at $4.4\ \mathrm{Ga}$.

To recover $18\ \mathrm{K}$ requires a forcing of $\Delta F = 3.2\times18 = 58\ \mathrm{W\,m^{-2}}$, so
$$
\ln(C/C_0) = 58/5.35 = 10.8 \Longrightarrow C/C_0 = 5\times10^{4},
$$
which is $14\ \mathrm{bar}$ of $\mathrm{CO_2}$ — impossible, because the carbonate–silicate cycle would have drawn it down, because such an atmosphere would be limited by the ocean's capacity, and because three-dimensional climate models find that cloud feedbacks cap the warming from $\mathrm{CO_2}$ at about $7\ \mathrm{K}$ however much you add. Carbon dioxide alone cannot solve the paradox.

The remaining candidates are methane — a $10^{-3}$ mixing ratio of $\mathrm{CH_4}$, plausible under an anoxic atmosphere with methanogens and no methanotrophs, gives $15$–$25\ \mathrm{K}$, though the organic haze it produces may cool the surface more than the gas warms it — and ammonia, which is destroyed by ultraviolet light in less than a year unless it is shielded by an organic haze. The consensus is a combination: several per cent of $\mathrm{CO_2}$, a few hundred ppm of $\mathrm{CH_4}$, a lower cloud cover and a higher water vapour, plus less ice and a smaller planetary albedo. The faint young Sun is a useful object lesson in how a simple radiative calculation can be right about the physics and wrong about the planet.
:::
:::

## The anoxic atmosphere, and how we know

::: theorem Mass-independent sulfur isotopes date the rise of oxygen {#thm-s33}
In an oxygenated atmosphere, sulfur dioxide is removed by oxidation with OH radicals, and all sulfur isotope fractionations are **mass-dependent**: on a plot of $\Delta^{33}\mathrm{S}$ against $\delta^{34}\mathrm{S}$, every sample falls on the fractionation line $\Delta^{33}\mathrm{S} = 0$. In an anoxic atmosphere, ultraviolet light of wavelength below $220\ \mathrm{nm}$ reaches $\mathrm{SO_2}$ and photolyses it, and the quantum-chemical isotope effect produces **mass-independent** fractionations of several per mil in $^{33}\mathrm{S}$. Sedimentary sulphides and sulphates older than $2.45\ \mathrm{Ga}$ carry $\Delta^{33}\mathrm{S}$ values of up to $\pm5\%$; younger ones carry none.
:::

::: proof
Mass-dependent fractionation arises because the vibrational zero-point energies of molecules differing only in isotope mass scale with the mass difference, giving $\delta^{33}\mathrm{S}/\delta^{34}\mathrm{S}$ ratios that are fixed functions of the masses; on a three-isotope plot this is a line of slope $0.515$, and $\Delta^{33}\mathrm{S}$ is defined as the deviation from it. Nuclear-volume (magnetic isotope) effects in a photolysis reaction, however, depend on the nuclear spin and the symmetry of the excited state, not on the mass, and produce equal and opposite anomalies in $^{33}\mathrm{S}$ and $^{36}\mathrm{S}$ with no relation to $^{34}\mathrm{S}$. For this to survive, the reaction must occur where the ultraviolet flux exists, that is, below an ozone layer; and for it to be recorded in the sediments, the anomaly must not be averaged away, which requires that the sulfur cycle be small and local rather than globally mixed. Both conditions fail once oxygen reaches more than about $10^{-5}$ of its present level, because a thin ozone layer is enough to absorb the $220\ \mathrm{nm}$ radiation. ∎

The signal therefore switches off at $2.45\ \mathrm{Ga}$, within the precision of the stratigraphy, and its disappearance is the single best evidence for the first permanent accumulation of atmospheric oxygen. It is also, incidentally, the reason the isotope is called a "canary": $\Delta^{33}\mathrm{S}$ is measured on micrograms of sulphide, and the search for it has found anomalies in 3.9-billion-year-old rocks from Labrador and in 3.5-billion-year-old rocks from Western Australia.
:::

::: example Komatiites as a thermometer {#ex-komatiite}
Komatiitic lava with $28\ \mathrm{wt\%}$ MgO contains olivine of $Fo_{94}$ and, in its chilled margin, glassy spinifex blades. If the liquidus temperature of a komatiite melt with this composition is $1880\ ^\circ\mathrm{C}$ at one atmosphere, and the lava erupted onto the sea floor at $2\ \mathrm{km}$ depth with negligible pressure effect, estimate the mantle potential temperature, given that adiabatic decompression melting of a dry peridotite produces a melt in equilibrium with a residue at roughly $40\ \mathrm{K}$ below the liquidus of the collected melt, and that the melt rose adiabatically with negligible conductive loss.
::: solution
The potential temperature is a property of the *solid* peridotite, not of its melt: it is the temperature the rock would have if decompressed to one atmosphere adiabatically and without melting. A peridotite ascending from depth begins to melt at about $40\ \mathrm{K}$ below the liquidus of the accumulated melt composition, and the melt segregates over a range of depths, so the potential temperature is somewhat below the measured liquidus of the erupted lava. For a komatiite with $28\ \mathrm{wt\%}$ MgO the requirement is
$$
T_p pprox 1600	ext{–}1750\ ^\circ\mathrm{C},
$$
some $250$–$400\ \mathrm{K}$ hotter than the $1350\ ^\circ\mathrm{C}$ of the present-day ridge mantle.

That is the number that matters, and it is robust to the details: a mantle $300\ \mathrm{K}$ hotter is a mantle with a much thinner, more buoyant lithosphere, more melt production, a different crust, and a heat flow at the surface perhaps twice today's. It also constrains the Archaean carbon cycle and weathering, because the degassing of $\mathrm{CO_2}$ from a hotter mantle is larger, which is one of the reasons the faint young Sun paradox and the komatiite thermometer have to be solved together.
:::
:::

::: warning "The Archaean was like today, only hotter"
It was a different planet. There was no oxygen, so there was no ozone, and the surface was bathed in ultraviolet light that would sterilise it in hours — life below a few millimetres of water or rock was the norm. There was no lipid biomarker record because there were no eukaryotes. The oceans were anoxic and, from the iron formations and the rare-earth-element patterns of cherts, probably ferruginous and possibly acidic. The atmosphere had little or no nitrogen dioxide, so the nitrogen cycle ran on different chemistry. The continents were smaller, hotter, more mafic and more easily eroded, and the rivers carried dissolved iron that precipitated on reaching the sea. Continuity of process does not imply continuity of state, and the most common error in Archaean geology is to describe a rock as "a beach sand" or "a river deposit" using criteria calibrated on a planet with an oxidising atmosphere and vegetation.
:::

## The origin of life, and where the evidence stops

::: definition The evidence for the earliest life {#def-earliest-life}
Four lines of evidence, in decreasing order of strength when they agree: **morphological** — cells, filaments, sheaths and stromatolites (laminated microbial sedimentary structures) in chert and stromatolitic dolostone; **isotopic** — carbon with $\delta^{13}\mathrm{C}$ near $-25\%$, the signature of enzymatic carbon fixation, in graphite of sedimentary provenance; **chemical** — molecular fossils (steranes, hopanes) and, more tentatively, the nitrogen and sulfur isotope systematics of the organic matter; and **geological** — the occurrence of the putative biogenic structure in a rock that was deposited at or near the surface, in conditions compatible with life, and not subsequently heated above the stability of its carbon.
:::

The strongest claims are the Dresser and Strelley Pool formations at $3.48$–$3.43\ \mathrm{Ga}$, where both morphology and carbon isotopes agree, and the ca. $3.7\ \mathrm{Ga}$ Nuvvuagittuq hydrothermal-vent microstructures, which are contested on the ground that the "cells" may be artefacts of mineral growth. Life was therefore present by $3.5\ \mathrm{Ga}$ and, from the carbon isotope evidence at Isua, perhaps by $3.8\ \mathrm{Ga}$ — within a few hundred million years of the end of heavy bombardment, which many workers take to mean that the origin of life is not improbable, only unobserved.

The chemical routes to life — the RNA world, in which self-replicating ribozymes preceded DNA and proteins; metabolism-first scenarios at alkaline hydrothermal vents, where the natural proton gradient across a sulphide membrane does the work that ATP does today; the peptide–RNA world; wet–dry cycles at hot springs driving polymerisation — are not distinguishable by the rock record, and the honest summary is that the origin of life happened quickly, in water, using catalytic metals that the early ocean supplied abundantly (nickel, iron, molybdenum in its reduced forms), and that we do not know which of the routes was taken.

::: quiz
Mass-independent sulfur isotope fractionation in 3.0 Ga sedimentary sulphides requires
- [ ] a much higher volcanic $\mathrm{SO_2}$ flux than today
- [x] an atmosphere transparent to ultraviolet light, hence essentially no oxygen and no ozone
- [ ] a ferruginous ocean
- [ ] hydrothermal input of sulfur with a mantle signature
::: solution
The mass-independent effect is produced by photolysis of $\mathrm{SO_2}$ by ultraviolet light below $220\ \mathrm{nm}$, which reaches the lower atmosphere only if there is no ozone. A thin ozone layer, requiring as little as $10^{-5}$ of present atmospheric oxygen, destroys the signal. The anomaly therefore dates the *absence* of oxygen before $2.45\ \mathrm{Ga}$ and its permanent presence after, and it is one of the rare cases in which the absence of a signal is itself the signal.
:::
:::

::: history
The name "Archaean" was given in 1872 to the oldest crystalline rocks, and for eighty years their origin was the subject of an argument between the "plutonists" of the Canadian and Baltic surveys, who saw them as great igneous intrusions, and the "sedimentists", led by Charles Story and later by Norman Bowen's experiments, who argued that most of them had begun as sediments and been granitised. The dispute was settled by the mapping of greenstone terrains in the 1960s and by the recognition, from the geochemistry of the Canadian shield, that the rocks were mostly igneous and that the sediments were a thin, precious cover. The komatiite was named from the Komati river in South Africa in 1969, and the argument about what its existence implied for the Archaean mantle filled the next two decades. Prentice and Wilson proposed the "Hadean" in 1972 for the interval before the oldest rocks; W. Brian Harland and colleagues' isotope work on the Isua carbon in 1973 opened the search for the earliest life; J. William Schopf's announcement of 3.5-billion-year-old fossils in the Apex chert in 1993 began a decade-long argument about whether the structures were biological, and Martin Brasier's subsequent work on the same outcrops argued that they were not. Claire Patterson's chronology, Wilde's Jack Hills zircon and the mass-independent sulfur isotope work of James Farquhar and Mark Thiemens, published in 2000, are the three measurements on which the present account rests.
:::

## Where this leads

The isotope systematics behind every number in this chapter are in [[geochemistry/geochronology]] and [[geochemistry/radiogenic-tracers]]; the formation of the Solar System and the comparison with other planets in [[planetary-science/terrestrial-planets]] and [[planetary-science/atmospheres]]; the rise of oxygen and the Palaeoproterozoic in [[earth-history/oxygen-proterozoic]]; the mantle's cooling and the komatiite constraint in [[geophysics/heat-flow]] and [[geophysics/gravity-isostasy]]; and the use of these ages in the timescale in [[earth-history/geological-time]].

::: summary Key takeaways
- The Earth accreted within about 30 Myr and its core segregated within about the same time, from hafnium–tungsten chronometry; accretion alone melted the planet.
- The Moon formed from the debris of a giant impact at about 4.52 Ga, and the isotope identity of Earth and Moon requires a violent, well-mixed origin.
- By 4.4 Ga there was a granitic crust being eroded and re-melted under liquid water: the Hadean was cool, wet and short-lived, not a lasting hell.
- The Archaean record is greenstone belts and granitoids; TTGs require melting of hydrated basalt, and komatiites require a mantle 250–400 K hotter than today's.
- Whether the Archaean had plate tectonics is unresolved; the middle ground is hot, thin, mobile lithosphere with intermittent subduction, modernising between 3.2 and 2.5 Ga.
- Most continental crust was produced in the first two-thirds of Earth history; the peaks in the model-age spectrum are part production and part preservation.
- The faint young Sun required a greenhouse of methane as well as carbon dioxide, because CO2 alone cannot deliver more than about 7 K.
- Mass-independent sulfur isotope fractionation, which disappears at 2.45 Ga, is the definitive evidence that the Archaean atmosphere had no oxygen and no ozone.
- Life was present by 3.5 Ga and perhaps by 3.8 Ga, which suggests that its origin was chemically easy.
:::

## Exercises

::: exercise Timescales {level=1 check="0.163"}
If the oldest dated meteoritic material is $4.567\ \mathrm{Ga}$ and the oldest terrestrial minerals are $4.404\ \mathrm{Ga}$, how long after the formation of the Solar System did the oldest known Earth mineral crystallise?
::: solution
$4.567 - 4.404 = 0.163\ \mathrm{Gyr}$, about $163\ \mathrm{Myr}$. For comparison, all of complex life occupies the last $12\%$ of Earth history, and the whole Phanerozoic is $12\%$ — the Hadean and Archaean together are $78\%$ of the planet's history.
:::
:::

::: exercise The Moon's distance {level=1}
The Moon is receding at $3.8\ \mathrm{cm\,yr^{-1}}$ and is now at $384{,}400\ \mathrm{km}$. Why is it wrong to divide the distance by the rate and conclude that the Moon was at the Roche limit $1.4\ \mathrm{Gyr}$ ago?
::: solution
Because the tidal dissipation depends on the ocean's configuration and on the distance itself: the tidal torque scales roughly as the inverse sixth power of distance, and the resonance of the present-day ocean with the semidiurnal tide makes dissipation today anomalously high. Tidal models put the Moon's age at $0.9$–$1.5\ \mathrm{Gyr}$ by this method, against $4.52\ \mathrm{Gyr}$ from the isotopes, which means the recession rate has been much lower in the past — and the discrepancy is an active research problem, resolved by putting the early Moon closer and having it migrate outward in jumps as the continents reorganised.
:::
:::

::: exercise Komatiites {level=1 check="250"}
By how much must the Archaean mantle's potential temperature have exceeded today's to produce komatiitic melts with $28\ \mathrm{wt\%}$ MgO?
::: solution
By about $250\ \mathrm{K}$ (a potential temperature of $1600$–$1750\ ^\circ\mathrm{C}$ against $1350\ ^\circ\mathrm{C}$). The argument is independent of the details of the melting model in the sense that no plausible peridotite produces $30\%$ MgO melt at a modern ridge temperature.
:::
:::

::: exercise Crustal survival {level=2 check="0.067"}
Using the widget of [[#prop-crust-growth]], find the fraction of $2.7\ \mathrm{Ga}$ crust that survives today for a mean crustal lifetime of $1\ \mathrm{Gyr}$.
::: solution
$e^{-2.7/1.0} = 0.067$, i.e. $7\%$. With $\tau = 3\ \mathrm{Gyr}$ the survival is $41\%$. The point is that the observed abundance of Archaean crust constrains $\tau$ only jointly with the growth model, and that a model with rapid early growth and short lifetime is observationally similar to one with steady growth and long lifetime.
:::
:::

::: exercise Faint young Sun {level=2 check="22"}
If the Sun's luminosity were $70\%$ of present, find the fractional change in the effective temperature and the temperature change in kelvin.
::: solution
$T_e$ scales as $S^{1/4}$: $0.70^{0.25} = 0.915$, a fall of $8.5\%$, i.e. $255\times0.085 = 22\ \mathrm{K}$. Note how small the exponent makes the effect: a $30\%$ change in the Sun's output is a $9\%$ change in the radiating temperature, which is why the faint young Sun paradox is a $20\ \mathrm{K}$ problem rather than a runaway freeze, and why it has been solvable with greenhouse gases.
:::
:::

::: exercise Anoxic proxies {level=2 check="2.45"}
Name the two best geochemical proxies for the absence of oxygen in the Archaean atmosphere and their ages of disappearance.
::: solution
Mass-independent sulfur isotope fractionation ($\Delta^{33}\mathrm{S} \ne 0$), which disappears at $2.45\ \mathrm{Ga}$; and the presence of reduced-phase minerals — detrital uraninite and pyrite grains in palaeo-sandstones — which disappear from the sedimentary record at about $2.3\ \mathrm{Ga}$. A third, the cerium anomaly of marine chemical sediments, records the oxidation state of seawater rather than of the air and gives a later and more protracted signal.
:::
:::

::: exercise Deriving the Hf–W constraint {level=3}
Show that the $^{182}\mathrm{W}$ excess of the mantle relative to chondrites is
$$
\left(\frac{^{182}\mathrm{W}}{^{184}\mathrm{W}}\right)_\text{mantle} - \left(\frac{^{182}\mathrm{W}}{^{184}\mathrm{W}}\right)_\text{chondrite} = \left(\frac{^{180}\mathrm{Hf}}{^{184}\mathrm{W}}\right)_\text{mantle}\left(\frac{^{182}\mathrm{Hf}}{^{180}\mathrm{Hf}}\right)_0\left(1 - e^{-\lambda t}\right)\times(\text{normalisation})
$$
in the two-reservoir model, and explain why a *late* core formation gives a *smaller* mantle $^{182}\mathrm{W}$ anomaly. Estimate the sensitivity: by how much does the anomaly change if segregation is at $20\ \mathrm{Myr}$ rather than $40\ \mathrm{Myr}$, with $\lambda = 0.078\ \mathrm{Myr^{-1}}$?
::: solution
The mantle's radiogenic $^{182}\mathrm{W}$ accumulates only while $^{182}\mathrm{Hf}$ exists and only in the reservoir that holds the hafnium. If the metal is removed at time $t$, the mantle keeps the product of its Hf/W ratio and the integral of the remaining $^{182}\mathrm{Hf}$ from $t$ to infinity, which is proportional to $e^{-\lambda t}$; the *difference* from a chondritic reservoir that never fractionated is therefore proportional to $e^{-\lambda t}$, and decreases as $t$ increases.

The ratio of the anomalies for $t = 20$ and $40\ \mathrm{Myr}$ is
$$
\frac{e^{-0.078\times20}}{e^{-0.078\times40}} = e^{1.56} = 4.8 .
$$
A factor of five in the isotope anomaly for a factor of two in time: the system is enormously sensitive in the first $50\ \mathrm{Myr}$ and useless afterwards, which is exactly why it dates the core and nothing else.
:::
:::

::: exercise Reading a greenstone belt {level=3}
A 2.7 Ga greenstone belt contains, from the base: komatiite flows with $30\%$ MgO; tholeiitic basalt with pillow structures and pillow lavas; a banded iron formation; a turbidite sandstone with detrital zircon ages of 2.95, 2.90 and 2.72 Ga; and a sanukitoid pluton intruding all of it at 2.62 Ga. Interpret the sequence and give the age brackets for the deposition of the turbidite.
::: solution
The sequence is an oceanic plateau or large igneous province (komatiite, then tholeiite, erupted subaqueously from the pillow structures), overlain by chemical sediment (banded iron formation, hence an anoxic, iron-rich ocean and a starved clastic supply), and then by deep-marine sand shed from a landmass. The youngest detrital zircon population at $2.72\ \mathrm{Ga}$ gives a **maximum depositional age** for the turbidite, so it was deposited between $2.72$ and $2.62\ \mathrm{Ga}$, the age of the pluton that intrudes it.

The provenance is the interesting part: zircons of 2.95 and 2.90 Ga mean that older continental crust existed nearby and was being eroded, so the belt is not a pristine oceanic sequence but a marginal one next to a continent, and the appearance of the sanukitoid — a potassic granitoid made by melting metasomatised mantle — at 2.62 Ga is the kind of geochemical marker that many workers take as evidence for subduction-related metasomatism in the late Archaean. Every one of these readings is an inference from a proxy, and the belt has been re-metamorphosed twice; the argument is cumulative, not deductive.
:::
:::

::: exercise The origin of life as a rate problem {level=3}
Heavy bombardment of the inner planets is thought to have made the Earth's surface uninhabitable until about $4.4$ or $4.3\ \mathrm{Ga}$, depending on the model. Life is present by $3.5\ \mathrm{Ga}$ and possibly by $3.8\ \mathrm{Ga}$. If the origin of life is a Poisson process with rate $r$ per unit time per planet, write the probability that life arises within a window $w$, and use the two windows ($0.7$ and $1.0\ \mathrm{Gyr}$) to bound the ratio of the two interpretations' implied rates. What does the argument assume, and what would falsify it?
::: solution
For a Poisson process the probability of at least one origin in a window $w$ is $P = 1 - e^{-rw}$. If the observed outcome ("life exists") has probability near one under both windows, then $r \gg 1/w$, so $r > 3\ \mathrm{Gyr^{-1}}$ for the shorter window and $r > 2.3\ \mathrm{Gyr^{-1}}$ for the longer — the two are not very different, and the inference is insensitive to the timing.

The interesting version is the opposite: if the origin were very improbable, then $P \approx rw$ and the probability of life would be proportional to the length of the window, so establishing that life appeared as soon as the surface was habitable is evidence that the rate is high. The argument assumes that the early Earth was habitable at the time claimed, that the impact sterilisation model is right, and that the evidence for life at $3.8\ \mathrm{Ga}$ is sound — the last of which is precisely what is contested. It would be falsified by a robust demonstration that life arose after $3.5\ \mathrm{Ga}$, or by a demonstration that the early Earth remained sterilised until $3.9\ \mathrm{Ga}$.
:::
:::
