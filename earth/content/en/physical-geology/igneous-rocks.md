Every rock you have ever stood on was, at some point, a liquid that could flow. Ninety per cent of the volume of igneous rock in the crust crystallised slowly, kilometres underground, where nobody has ever seen it; the remaining tenth poured out of a vent, and most of that fell back into the sea. The rocks of the ocean floor — basalt and the layered gabbro beneath it, some $7\ \mathrm{km}$ thick and renewed along $60{,}000\ \mathrm{km}$ of ridge — are the largest single igneous body on the planet, and they are being made now, at a rate of about $20\ \mathrm{km^3\,yr^{-1}}$, in water $2{,}500\ \mathrm{m}$ deep and in complete darkness.

Igneous petrology asks two questions of any such rock. *What was the liquid, and where did it come from?* — a question of chemistry and of thermodynamics. *How fast did it cool, and where?* — a question of heat transfer, answered by the texture under your feet. This chapter takes the two in order, and along the way explains why a basalt and a gabbro can be chemically identical, why granite is the most silica-rich common rock rather than the most silica-rich possible rock, and why the same volcano can produce a gentle lava fountain on Tuesday and a column of ash $30\ \mathrm{km}$ high on Friday.

## How rocks melt

::: definition Magma, solidus, liquidus, degree of melting {#def-melting}
A **magma** is a natural silicate liquid, with any crystals it carries and any dissolved volatiles. The **solidus** is the temperature (at given pressure and volatile content) at which a rock begins to melt; the **liquidus** is the temperature at which it is completely liquid. Between them the rock is a mush of crystals and liquid, and the **degree of partial melting** $F$ is the mass fraction that has become liquid. Because most rocks are mixtures of several minerals with different melting points, a rock does not have *a* melting temperature: it has a melting *range*, often $200$–$300\ ^\circ\mathrm{C}$ wide.
:::

::: proposition There are only three ways to melt a rock {#prop-threeways}
Since melting occurs when the geotherm exceeds the solidus, and the geotherm and the solidus are both functions of pressure and temperature, a rock can be made to melt by (i) **decompression** — moving rock to lower pressure along a near-adiabat, so the solidus falls below it; (ii) **flux** — adding a component, chiefly $\mathrm{H_2O}$, that lowers the solidus; or (iii) **heat addition** — raising the temperature of the rock by injecting a hotter magma or by conduction from below. Every granite and every basalt on Earth was produced by one of these three, or by a combination.
:::

::: proof
Consider the pressure–temperature plane. A rock of fixed dry composition occupies a point $(P,T)$, and melting requires $T$ to lie above the solidus curve $T_s(P)$. If the rock's path in the plane crosses that curve, one of three things must have happened: $P$ fell at nearly constant $T$ (the path moved left); $T$ rose at nearly constant $P$ (the path moved up); or the curve itself moved down onto the rock, which happens when the composition changes — by the addition of water, or of $\mathrm{CO_2}$, or by the loss of a hydrous mineral. There is no fourth term in the inequality $T > T_s(P, X_\mathrm{H_2O})$. ∎
:::

Which mechanism operates is a matter of tectonic setting, and the three map onto the three great magma types almost perfectly.

- **Decompression melting of upwelling peridotite** makes basalt. Beneath mid-ocean ridges the mantle rises because the plate is being pulled apart; its temperature falls by only $0.4\ \mathrm{K\,km^{-1}}$ as it decompresses adiabatically, while the peridotite solidus rises with depth at roughly $4\ \mathrm{K\,km^{-1}}$, so the rising rock crosses its own solidus at $60$–$70\ \mathrm{km}$ and melts continuously until it stops rising. The integrated melting is $F \approx 0.2$–$0.25$, and the extracted liquid is a mid-ocean-ridge basalt (MORB). The same process, acting on a hotter, deeper upwelling, makes ocean-island basalts.
- **Flux melting** makes the andesites and arc basalts of subduction zones. Water carried down in the slab is expelled from hydrous minerals between $80$ and $150\ \mathrm{km}$ depth; rising into the overlying wedge it lowers the peridotite solidus by $100$–$200\ ^\circ\mathrm{C}$, and the wedge melts at a temperature the wedge already has. Water-saturated granitic systems melt $200$–$300\ ^\circ\mathrm{C}$ cooler than dry ones, which is why the deep crust beneath magmatic arcs is wet and melt-prone.
- **Heat-driven melting** makes the large silicic provinces and the crustal granites. A basaltic magma rising into the lower crust carries roughly $1\times10^{18}\ \mathrm{J}$ per $\mathrm{km^3}$ of latent heat alone, enough to melt several tenths of a cubic kilometre of country rock for every cubic kilometre it emplaces.

::: example How much energy does it take to make a cubic kilometre of magma? {#ex-heat}
Take crustal rock at $500\ ^\circ\mathrm{C}$ that must be heated to $750\ ^\circ\mathrm{C}$ and melted. Use $\rho = 2700\ \mathrm{kg\,m^{-3}}$, $c_P = 1100\ \mathrm{J\,kg^{-1}\,K^{-1}}$ and a latent heat of fusion $L = 4\times10^{5}\ \mathrm{J\,kg^{-1}}$. Find the energy per $\mathrm{km^3}$ and compare it with the heat released when $1\ \mathrm{km^3}$ of basalt crystallises (latent heat $4\times10^{5}\ \mathrm{J\,kg^{-1}}$, plus cooling from $1200$ to $800\ ^\circ\mathrm{C}$).
::: solution
Per cubic metre the requirement is
$$
\rho\left(c_P \Delta T + L\right) = 2700\times\left(1100\times250 + 4\times10^{5}\right) = 2700\times6.75\times10^{5} = 1.82\times10^{9}\ \mathrm{J\,m^{-3}},
$$
so $1.8\times10^{18}\ \mathrm{J}$ per $\mathrm{km^3}$ — about $0.3\%$ of the world's annual primary energy consumption, delivered by nature into a few cubic kilometres of crust.

One cubic kilometre of crystallising basalt supplies $2700\times10^{9}\times\left(4\times10^{5} + 1100\times400\right) = 2.1\times10^{18}\ \mathrm{J}$. The two numbers are within $15\%$ of each other, which is the whole reason heat-driven crustal melting is credible: one cubic kilometre of intruding basalt can melt roughly one cubic kilometre of crust, and the geology of layered intrusions and of the contact aureoles of batholiths shows that it happens. What it cannot do is melt *ten* cubic kilometres without a sustained supply of basalt — which is why large silicic magmas are found above long-lived hotspots and arcs, not in single events.
:::
:::

## Texture: the cooling history you can see

::: definition Igneous textures by cooling rate {#def-texture}
**Phaneritic** texture has crystals visible to the eye ($>0.5\ \mathrm{mm}$), and means slow cooling at depth. **Aphanitic** texture has a groundmass of microscopic crystals, and means rapid cooling at or near the surface. **Porphyritic** texture has large crystals (*phenocrysts*) in a finer groundmass, and means two cooling stages. **Vitric** (glassy) texture means quenching so fast that atoms stopped moving before they could order: obsidian, and the chilled margin of any flow. **Pyroclastic** texture is an aggregate of fragments blown from a vent.
:::

::: proposition Crystal size records time, not temperature {#prop-grainsize}
In the diffusion-controlled regime relevant to crustal melts, the radius a crystal can reach in time $t$ scales as
$$
R \sim \sqrt{D t},
$$
where $D \sim 10^{-18}\ \mathrm{m^2\,s^{-1}}$ is a typical diffusion coefficient for network-forming cations in a cooling melt or a wet crystal mush. Grains of a millimetre therefore require about $10^5$ years of growth, and centimetre-scale grains $10^6$–$10^7$ years.
:::

::: proof
Growth limited by diffusion of the slowest necessary species gives the parabolic law $R^2 = kDt$ with $k$ a dimensionless growth factor of order unity (a diffusion-controlled growth law of this form is the same mathematics as Fourier cooling of a hot plate, developed in the [Physics Atlas](/learn/physics/)). With $D = 10^{-18}\ \mathrm{m^2\,s^{-1}}$ and $t = 10^5\ \mathrm{yr} = 3.2\times10^{12}\ \mathrm{s}$, $R = \sqrt{3.2\times10^{-6}} = 1.8\ \mathrm{mm}$; for $10^6\ \mathrm{yr}$, $R = 5.6\ \mathrm{mm}$. To grow a $1\ \mathrm{cm}$ crystal needs about $3\times10^6\ \mathrm{yr}$.

Two consequences. First, a hand specimen with centimetre crystals is a *clock*: its host intrusion was hot for millions of years, which rules out any model in which batholiths are emplaced in decades. Second, crystal size is set by the time available, not by how hot it was: a hot rock that cooled fast is fine-grained, and a cool one that cooled slowly is coarse. Where you see both coarse crystals and glass in one outcrop — a porphyritic obsidian, a granite with megacrysts — you are seeing two timescales in one hand specimen, and the petrologist's job is to separate them. ∎
:::

::: example How long does a sill take to freeze? {#ex-cooling}
:::
Estimate the conductive cooling time of a magma body of half-thickness $L$ using $t \sim L^2/\kappa$ with thermal diffusivity $\kappa = 10^{-6}\ \mathrm{m^2\,s^{-1}}$, for $L = 1\ \mathrm{m}$, $100\ \mathrm{m}$ and $1\ \mathrm{km}$.
::: solution
$$
t \approx \frac{L^2}{\kappa} = \{3\times10^{4},\ 3\times10^{8},\ 3\times10^{9}\}\ \mathrm{s} = \{0.03,\ 300,\ 30{,}000\}\ \mathrm{yr}.
$$
A metre-wide dyke freezes in weeks, which is why dyke margins are glassy and their centres aphanitic. A $200\ \mathrm{m}$ sill takes centuries, and a $2\ \mathrm{km}$ pluton takes tens of thousands of years — consistent with the crystal sizes of [[#prop-grainsize]], and with the U–Pb crystallisation ages measured across large layered intrusions, which resolve cooling intervals of $10^5$ years or more.

The scaling is the useful part: cooling time goes as the *square* of size. A body ten times thicker takes a hundred times longer to freeze, which is why only large intrusions are coarse-grained and why the whole of the oceanic crust — whose lower $5\ \mathrm{km}$ is a gabbro that cooled over centuries to millennia near a ridge axis — is the exception that proves the rule: it is being reheated from below as fast as it loses heat above.
:::

::: svg
caption: A shallow magmatic system, drawn to a vertical scale of a few kilometres. The same liquid makes rocks of every texture depending only on where it stops: glass and fine crystals in the flow and the chilled margins of the sill, porphyritic textures where a chamber cooled in two stages, coarse gabbro and granite in the pluton where cooling took hundreds of thousands of years. Dykes cut the sequence vertically and feed the surface; the conduit is the only part that was ever a continuous open tube — most of the body is a crystal mush.
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cross-section of a shallow magma system with sill, dyke, laccolith, conduit and pluton">
  <style>
    .rock { fill: var(--deemph); stroke: var(--rule-2); stroke-width: 1; }
    .melt { fill: var(--series-2); opacity: 0.85; }
    .cool { fill: var(--series-1); opacity: 0.55; }
    .sky { fill: var(--info-wash); }
    .ln { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .lab { fill: var(--ink); font-size: 12.5px; }
    .thin { fill: var(--ink-3); font-size: 11px; }
    .stip { fill: var(--ink-3); }
  </style>
  <rect class="sky" x="0" y="0" width="760" height="70"/>
  <path class="rock" d="M0,70 L120,70 L150,58 L210,70 L330,70 L360,52 L420,70 L760,70 L760,330 L0,330 Z"/>
  <line class="ln" x1="0" y1="140" x2="760" y2="140" stroke-dasharray="5 5"/>
  <line class="ln" x1="0" y1="215" x2="760" y2="215" stroke-dasharray="5 5"/>
  <!-- lava flow and cone -->
  <path class="melt" d="M150,58 L210,70 L120,70 Z"/>
  <path class="melt" d="M330,70 L360,52 L420,70 L470,74 L300,74 Z"/>
  <!-- laccolith -->
  <path class="melt" d="M520,120 Q600,88 690,120 Q600,140 520,120 Z"/>
  <!-- sill -->
  <path class="melt" d="M60,150 L300,150 L300,168 L60,168 Z"/>
  <!-- dyke -->
  <path class="melt" d="M352,74 L368,74 L378,250 L342,250 Z"/>
  <!-- conduit and pluton -->
  <path class="melt" d="M356,250 L374,250 L378,300 L352,300 Z"/>
  <path class="melt" d="M230,330 Q250,255 380,252 Q520,255 545,330 Z"/>
  <circle class="stip" cx="300" cy="300" r="2"/><circle class="stip" cx="340" cy="285" r="2"/>
  <circle class="stip" cx="420" cy="290" r="2"/><circle class="stip" cx="470" cy="305" r="2"/>
  <circle class="stip" cx="380" cy="315" r="2"/><circle class="stip" cx="270" cy="315" r="2"/>
  <text class="lab" x="140" y="46">cone and flow</text>
  <text class="lab" x="470" y="66">laccolith</text>
  <text class="lab" x="70" y="145">sill</text>
  <text class="lab" x="392" y="180">dyke</text>
  <text class="lab" x="392" y="272">conduit</text>
  <text class="lab" x="250" y="322">pluton (gabbro/granite)</text>
  <text class="thin" x="8" y="20">glass, ash: quenched in seconds to days</text>
  <text class="thin" x="8" y="36">aphyric to porphyritic: years to centuries</text>
  <text class="thin" x="572" y="200">coarse: 10⁵–10⁶ yr</text>
</svg>
:::

## Naming the rock

Two decisions fix an igneous name: **texture**, which tells you where it cooled, and **composition**, which tells you what it was made of. The compositional axis that matters most is silica activity, because it decides whether the rock contains free quartz or, at the other extreme, feldspathoids.

::: definition Mafic to felsic {#def-composition}
Rocks are ranked by $\mathrm{SiO_2}$ content and by the magnesium–iron ratio of their ferromagnesian minerals. **Ultramafic** ($<45\%$ $\mathrm{SiO_2}$, olivine-dominated: peridotite, komatiite); **mafic** ($45$–$52\%$, plagioclase + pyroxene: basalt/gabbro); **intermediate** ($52$–$63\%$: andesite/diorite); **felsic** ($>63\%$, quartz + feldspar: rhyolite/granite). The **magnesium number** is
$$
\mathrm{Mg}\# = 100\times\frac{\mathrm{Mg}}{\mathrm{Mg}+\mathrm{Fe}} \quad \text{(molar, total Fe as FeO)},
$$
and it is the single best index of how much a basalt has evolved: mantle-derived liquids have $\mathrm{Mg}\# \approx 65$–$75$, and a basite that has crystallised olivine and pyroxene drops steadily below 50.
:::

| composition | $\mathrm{SiO_2}$ % | volcanic (fast-cooled) | plutonic (slow-cooled) | typical minerals |
|---|---|---|---|---|
| ultramafic | $<45$ | komatiite, picrite | peridotite, pyroxenite | olivine, pyroxene, little plagioclase |
| mafic | $45$–$52$ | basalt | gabbro, anorthosite | Ca-plagioclase, pyroxene, olivine |
| intermediate | $52$–$63$ | andesite | diorite | plagioclase, hornblende, magnetite |
| felsic | $>63$ | rhyolite, dacite | granite, granodiorite | quartz, alkali feldspar, Na-plagioclase, muscovite |
| silica-undersaturated | any, no quartz | nephelinite, leucitite | essexite, nepheline syenite | feldspathoids instead of feldspar/quartz |

::: example Magnesium number, and what it means {#ex-mgno}
:::
A basalt contains $8.0\%$ $\mathrm{MgO}$ and $10.0\%$ $\mathrm{FeO}$ (total iron reported as $\mathrm{FeO}$). Compute its $\mathrm{Mg}\#$ and say whether it is a primary mantle liquid.
::: solution
Moles per $100\ \mathrm{g}$: $\mathrm{Mg} = 8.0/40.30 = 0.199$; $\mathrm{Fe} = 10.0/71.85 = 0.139$. Hence
$$
\mathrm{Mg}\# = 100\times\frac{0.199}{0.199+0.139} = 59 .
$$
A liquid in equilibrium with mantle olivine ($F_{\#}\approx0.90$) has $\mathrm{Mg}\# \approx 70$, because magnesium is preferred into olivine by a factor of about five. At 59 this basalt has lost roughly a fifth of its magnesium and iron to olivine crystallisation: it is a differentiated, not a primary, liquid. The point of the exercise is that a single number, computed in thirty seconds from an analysis, tells you how far the rock is from its parent — which is why $\mathrm{Mg}\#$ appears on almost every igneous plot you will ever see.
:::

::: warning "Dark-coloured rocks are mafic, light-coloured rocks are felsic"
Colour is a useful first impression and a frequent lie. A fine-grained basalt can look grey and a coarse granite can be dark if it is biotite-rich; a completely aphanitic basalt may hide olivine phenocrysts, and a rhyolite can be black glass. Worse, the rule fails completely where it matters most: the mafic minerals that make a rock dark are exactly the ones that weather, so a weathered gabbro outcrop is ochre and earthy. Use modal mineralogy, or a chemical index such as $\mathrm{Mg}\#$, and treat colour as a hint to be tested.
:::

## Bowen's reaction series: why one magma makes many rocks

::: theorem Bowen's reaction series {#thm-bowen}
As a basaltic liquid cools, minerals crystallise in a definite sequence: olivine first, then Ca-rich plagioclase and clinopyroxene, then Fe–Ti oxides, amphibole, and finally biotite, muscovite and quartz; the residual liquid moves steadily from mafic to felsic in composition. Two series run together — a *discontinuous* series in the structures of the ferromagnesian minerals (isolated tetrahedra → chains → sheets → framework) and a *continuous* series in plagioclase, whose composition changes from anorthite $\mathrm{CaAl_2Si_2O_8}$ to albite $\mathrm{NaAlSi_3O_8}$.
:::

::: proof
This is an experimental result, established by Norman Bowen between 1914 and 1928 by heating and quenching powdered rocks and counting the phases that appeared, and it follows thermodynamically from the phase rule of [[physical-geology/minerals#thm-phaserule]] applied to a multi-component system: at each temperature the assemblage with the lowest Gibbs energy is stable, and as $T$ falls the stability fields are crossed in a fixed order at fixed pressure. The *direction* of the chemical evolution can be seen without thermodynamics. Olivine, $(\mathrm{Mg,Fe})_2\mathrm{SiO_4}$, takes up magnesium and iron but no silicon, aluminium, sodium or potassium; so does pyroxene, which takes a little more silicon. Every kilogram of these minerals that is removed from the liquid therefore leaves the liquid relatively enriched in silica and in the alkalis, and the residual melt must move towards the feldspar and quartz compositions. The reaction series is the statement of that book-keeping, mineral by mineral. ∎
:::

The consequence is **fractional crystallisation**: if crystals settle out or are mechanically separated from the liquid, the liquid's composition evolves along a *liquid line of descent*, and one parent magma yields a suite of rocks. This is the mechanism of the great layered intrusions — the Bushveld, Skaergaard, Stillwater — where the sequence of layers is the reaction series frozen in place, tens of kilometres across, and where chromitite and magnetite layers are the world's sources of chromium and platinum.

::: example Reading a liquid line of descent {#ex-liquidline}
:::
A basaltic liquid is $50\%$ $\mathrm{SiO_2}$. It crystallises olivine of composition $(\mathrm{Mg}_{0.9}\mathrm{Fe}_{0.1})_2\mathrm{SiO}_{4}$, which contains $29.6\%$ $\mathrm{SiO_2}$ by weight. If $10\%$ of the liquid crystallises as that olivine and is removed, what is the silica content of the residual liquid?
::: solution
Work per $100\ \mathrm{g}$ of liquid: $50\ \mathrm{g}$ of $\mathrm{SiO_2}$ initially. $10\ \mathrm{g}$ of olivine is removed, containing $2.96\ \mathrm{g}$ of $\mathrm{SiO_2}$. The residual $90\ \mathrm{g}$ of liquid therefore contains $47.04\ \mathrm{g}$ of $\mathrm{SiO_2}$, i.e.
$$
\mathrm{SiO_2} = \frac{47.04}{90} = 52.3\% .
$$
Ten per cent of olivine crystallisation has moved the liquid across the mafic/intermediate boundary. Remove $30\%$ of olivine and the liquid reaches $57\%$; add pyroxene, which is richer in silica still, and the liquid can reach granitic compositions only if the *whole* mafic fraction has been removed somewhere. That is the mass-balance reason for the existence of layered intrusions and for the observation that the Earth's crust is andesitic rather than basaltic: for every cubic kilometre of evolved magma there is a cubic kilometre of hidden mafic cumulate.
:::

::: widget plot
f: (50 - s*x)/(100 - x)*100
x: 0, 60
y: 45, 70
sliders: s=30:10:60:1
labels: SiO2 of the residual liquid
caption: Silica content of a residual liquid as a function of the weight per cent of crystals removed, for crystals containing $s\%$ $\mathrm{SiO_2}$ (the slider). With $s = 30$ — olivine plus a little plagioclase — the curve rises from $50\%$ to $60\%$ by $40\%$ crystallisation. Set $s = 50$, the silica content of the liquid itself: the curve goes flat, and you have just discovered why the composition of a rock does not change if the crystals have the same composition as the liquid. Fractional crystallisation is only a differentiation mechanism when the crystals are *different* from the melt.
:::

## Where magmas are made, and what they become

::: application Reading a tectonic setting from an igneous rock {#app-setting}
The chemistry of a basalt records the mantle source and the depth of melting, so an unknown volcanic suite can be assigned to a setting. Mid-ocean-ridge basalt is depleted in the large-ion lithophile elements (K, Rb, Ba, Sr) relative to the high-field-strength elements (Nb, Ta, Ti), because the mantle beneath ridges has already been drained of them; arc basalts are enriched in exactly those elements, carried up by water from the slab, and are characteristically depleted in niobium and tantalum — the "Nb–Ta trough" that is the fingerprint of subduction; ocean-island basalts are enriched in everything and come from deeper, less-depleted mantle. The practical version of this test, using a handful of trace-element ratios, is how geologists decide the setting of an ancient volcanic belt that has been deformed and metamorphosed for two billion years — and it is how the existence of plate tectonics $3\ \mathrm{Gyr}$ ago is argued about today.
:::

Three further points belong in a first course, because they are where the textbook picture has changed.

**Magma bodies are mostly mush.** Seismic tomography beneath active arcs and ridges images a few per cent of melt in the crust, not the kilometre-scale liquid-filled chambers of the classic picture. Eruptions tap zones of a few cubic kilometres in which crystals and liquid coexist at 5–50 % melt; the plutons we map are largely the residues of such systems, emplaced as crystal-rich slurries.

**Assimilation is everywhere.** A rising magma dissolves and reacts with its wall rock, and the isotopic composition of the resulting rock records both. A basalt that passes through $5\ \mathrm{km}$ of granite incorporates strontium and neodymium with the granite's radiogenic signature, which is why isotope maps of continental margins look like the geology beneath them ([[geochemistry/radiogenic-tracers]]).

**Crystals are older than their rocks.** Uranium-series and U–Pb dating of single zircon and apatite crystals now routinely shows that the crystals in a lava were growing in a mush for tens to hundreds of thousands of years before the eruption, and that the eruption itself assembles crystals of several ages. An igneous rock is less a snapshot of one cooling event than a jigsaw of a mush's history.

::: warning "Granite melts at 900 °C"
No rock melts at a single temperature, and this one depends on water by several hundred degrees. A dry granitic solidus is near $950\ ^\circ\mathrm{C}$ at a few kilobars; a water-saturated one is near $700\ ^\circ\mathrm{C}$; and if the rock is dry *and* water is absent from the system, muscovite and biotite break down before melting, so the reaction that produces the melt is a dehydration-melting reaction, not a melting point. Quote a solidus with its pressure and its water activity, or quote nothing.
:::

::: quiz
A mid-ocean ridge and a subduction zone both sit above the mantle, and both make basalt. Why is the subduction-zone basalt usually more silica-rich and always wetter in its trace-element signature?
- [ ] Because the subduction-zone mantle is hotter.
- [x] Because slab-derived water lowers the solidus of the wedge and carries slab components into the melt, and because the melt rises through and interacts with thick crust.
- [ ] Because ridge basalts are contaminated by seawater before erupting.
- [ ] Because the mantle beneath arcs is more depleted.
::: solution
Water does two jobs at once: it depresses the solidus, so melting begins deeper and proceeds at a lower temperature and often to a higher degree in the shallow wedge, and it carries away from the slab the elements that are soluble in a hydrous fluid (K, Rb, Ba, Sr, Pb), producing the arc trace-element signature with its diagnostic negative Nb and Ta anomalies. Arc magmas are additionally modified by the thick crust they traverse, and by heat-driven melting of that crust. Subduction-zone mantle is *not* hotter at depth than ridge mantle, and the ridge case is the one that is chemically depleted.
:::
:::

::: history
The problem of igneous rocks was the first great argument of geology. The Neptunists, led by Abraham Werner at Freiberg, held that all rocks including basalt and granite had precipitated from a global ocean; the Vulcanists, of whom James Hutton was the first to argue it from field evidence at Salisbury Crags in the 1780s, held that granite had been molten. Hutton's case was observational — granite intrudes the sedimentary piles, sends veins into them, and bakes them — and it won. But the mechanism had to wait for the laboratory. Norman Lloyd Bowen, working at the Geophysical Laboratory in Washington with thermocouples and furnaces that reached $1400\ ^\circ\mathrm{C}$, spent 1914 to 1928 heating powders of natural and synthetic rock, quenching them in mercury, and counting phases under the microscope; his *Reaction in Silicate Melts* (1928) is the founding text of experimental petrology and one of the very few cases in which a whole subdiscipline is the work of one person's benchcraft. Reginald Daly's *Igneous Rocks and the Depths of the Earth* (1933) then assembled the world's chemical analyses into the patterns — the abundance of andesite in arcs, the scarcity of intermediate compositions on ocean floors — that plate tectonics explained thirty-five years later.
:::

## Where this leads

Texture and composition are the vocabulary for [[physical-geology/volcanoes]], where the same variables — silica, temperature, water, crystals — are re-read as eruption style and hazard, and for [[physical-geology/plate-tectonics]], where the distribution of magma types becomes evidence. The thermodynamics returns in [[mineralogy-petrology/phase-diagrams]] and [[mineralogy-petrology/magma-evolution]]; the trace-element reasoning becomes quantitative in [[geochemistry/trace-elements]]; and the heat budget of a cooling Earth, which is what makes igneous activity possible at all, is taken up in [[geophysics/heat-flow]].

::: summary Key takeaways
- Igneous rocks are frozen liquids, and their two independent messages are composition (source and process) and texture (cooling rate and depth).
- Rocks melt by decompression, by flux with water, or by heating — and those three mechanisms map onto ridges and plumes, subduction zones, and crustal granites respectively.
- Melting is a range, not a temperature; always state pressure and water activity with a solidus.
- Crystal size is a clock: millimetre grains need about $10^5$ years, centimetre grains $10^6$, and cooling time scales as the square of the body's thickness.
- Naming a rock means naming texture and composition; $\mathrm{Mg}\#$ and $\mathrm{SiO_2}$ do most of the work, and colour does neither reliably.
- Bowen's reaction series explains how one magma yields many rocks: crystals that are chemically different from their liquid, removed from it, drive the residual liquid towards granite.
- For every cubic kilometre of evolved magma there is a hidden cubic kilometre of mafic cumulate — a mass-balance requirement, not a guess.
- Modern igneous petrology reads plutons and lavas as crystal mushes assembled over $10^4$–$10^6$ years, not as liquid-filled chambers that cooled in place.
:::

## Exercises

::: exercise Naming rocks {level=1 check="2"}
Match each description to a rock name — basalt, gabbro, rhyolite, peridotite — and state how many textural and how many compositional decisions you used: (a) coarse-grained, dark, olivine + pyroxene, no feldspar visible; (b) aphanitic, black, with olivine phenocrysts; (c) coarse-grained, pink, quartz and feldspar; (d) aphanitic, glassy groundmass, flow banding.
::: solution
(a) peridotite — ultramafic composition, phaneritic. (b) basalt — mafic, porphyritic aphanitic. (c) granite, not rhyolite: the texture is coarse, so it is the plutonic name. (d) rhyolite (or obsidian if essentially glassy) — felsic texture and glassy quench. Two decisions each time: composition and texture. Note that (c) is the trap: "granite" and "rhyolite" can have identical chemistry.
:::
:::

::: exercise Cooling time of a lava flow {level=1 check="0.4"}
A $5\ \mathrm{m}$ thick basalt flow cools from $1200\ ^\circ\mathrm{C}$; take $\kappa = 5\times10^{-7}\ \mathrm{m^2\,s^{-1}}$ and estimate the time for the flow's centre to solidify using $t \sim L^2/\kappa$ with $L$ the half-thickness. Give the answer in years.
::: solution
$t = 2.5^2/(5\times10^{-7}) = 1.25\times10^{7}\ \mathrm{s} = 0.40\ \mathrm{yr}$. In practice a flow of this thickness is solid within a year, and the observed columnar jointing of such flows records contraction on cooling through that year. Compare with [[#ex-cooling]]: the same rock at $1\ \mathrm{km}$ half-thickness needs $3\times10^{4}$ years, a factor of $10^5$ longer for a factor of $400$ in thickness.
:::
:::

::: exercise Magnesium number {level=1 check="71"}
A picrite contains $16.0\%$ $\mathrm{MgO}$ and $7.0\%$ $\mathrm{FeO}$ (total iron as $\mathrm{FeO}$). Compute its $\mathrm{Mg}\#$.
::: solution
Moles per $100\ \mathrm{g}$: $\mathrm{Mg} = 0.397$, $\mathrm{Fe} = 0.0974$. $\mathrm{Mg}\# = 100\times0.397/0.494 = 71$. This is in the range of a primary liquid in equilibrium with mantle olivine, which is consistent with the picrite's olivine-rich phenocryst cargo.
:::
:::

::: exercise Viscosity and eruption {level=2 check="4.1"}
Model the viscosity of a rhyolitic melt by an Arrhenius law with activation energy $E = 500\ \mathrm{kJ\,mol^{-1}}$. By what factor does viscosity increase when the melt cools from $1200\ ^\circ\mathrm{C}$ to $800\ ^\circ\mathrm{C}$?
::: solution
$$
\frac{\eta_2}{\eta_1} = \exp\left[\frac{E}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)\right] = \exp\left[\frac{5\times10^{5}}{8.314}\left(\frac{1}{1073} - \frac{1}{1473}\right)\right] = e^{15.2} = 4.1\times10^{6}.
$$
A drop of $400\ ^\circ\mathrm{C}$ raises the viscosity by nearly seven orders of magnitude. This is why silicic magmas, already $10^4$–$10^6$ times more viscous than basalt at liquidus temperature because of polymerisation, stall in the conduit and form domes; why obsidian, which needs a viscosity high enough to prevent crystallisation during quench, is a silicic product; and why the temperature of an eruption is the first number a volcanologist wants ([[physical-geology/volcanoes]]).
:::
:::

::: exercise Buoyancy of a melt {level=2 check="123"}
Mafic melt has $\rho = 2650\ \mathrm{kg\,m^{-3}}$ and the surrounding mantle peridotite $2900\ \mathrm{kg\,m^{-3}}$. Find the excess pressure a $50\ \mathrm{km}$ column of such melt would generate, and explain why melt nevertheless accumulates in long-lived mush zones rather than rising to the surface in a continuous stream.
::: solution
$$
\Delta P = \Delta\rho\, g\, h = 250\times9.81\times5\times10^{4} = 1.23\times10^{8}\ \mathrm{Pa} = 123\ \mathrm{MPa}.
$$
That is far more than the fracture toughness of the crust requires, so ascent by dyking is easy once a melt fraction is connected. What limits continuous ascent is *extraction*: at melt fractions below about $15$–$20\%$ the liquid is isolated at grain corners and cannot form an interconnected network, so it migrates only by slow compaction or by fracturing of the mush. Magma ascent is therefore episodic and controlled by the permeability threshold, not by the buoyancy, which is why eruptions are pulses rather than a drizzle.
:::
:::

::: exercise Fractional crystallisation, quantitatively {level=2 check="58.7"}
Using the method of [[#ex-liquidline]], find the silica content of the liquid remaining after $30\%$ of olivine ($29.6\%$ $\mathrm{SiO_2}$) has crystallised from a $50\%$ $\mathrm{SiO_2}$ basaltic liquid.
::: solution
Per $100\ \mathrm{g}$: $50\ \mathrm{g}$ of $\mathrm{SiO_2}$, minus $30\times0.296 = 8.88\ \mathrm{g}$, leaves $41.12\ \mathrm{g}$ in $70\ \mathrm{g}$ of liquid: $58.7\%$. The liquid has crossed into the andesite field, and this is exactly the composition that dominates the exposed crust of the continents — which is the strongest single argument that continental crust is not primary mantle melt but the differentiated residue of basalt.
:::
:::

::: exercise Deriving the phase-rule consequence {level=3}
For a system of $C$ components and $P$ phases, show that at fixed pressure a eutectic (three phases, two components) has no degrees of freedom, and use this to explain why the "melting temperature of granite" is not a well-posed question while the solidus of a specified rock at specified pressure and water activity is.
::: solution
$F = C - P + 2$; fixing pressure removes one degree, so $F = C - P + 1$. For $C = 2$, $P = 3$: $F = 0$, an invariant point — one temperature, one liquid composition. For a real crustal rock, $C \approx 8$–$10$ (the oxides $\mathrm{SiO_2}$, $\mathrm{Al_2O_3}$, $\mathrm{FeO}$, $\mathrm{MgO}$, $\mathrm{CaO}$, $\mathrm{Na_2O}$, $\mathrm{K_2O}$, $\mathrm{H_2O}$), and with five or six phases coexisting $F \approx 3$–$5$ even at fixed pressure: melting occurs over a range of temperature, with the liquid composition changing continuously along it.

So the question "at what temperature does granite melt?" has no answer unless the pressure, the water activity and the position along the melting interval are specified — the last because "melting" can mean the first drop of liquid or the last crystal to disappear, and those differ by $100\ ^\circ\mathrm{C}$ or more. The well-posed version is: "the temperature of the solidus of this analysed rock, at $P_\mathrm{H_2O} = 3\ \mathrm{kbar}$, water-saturated", which is a measurement that different laboratories reproduce to a few degrees.
:::
:::

::: exercise A crystal-size dataset {level=3}
The radii of olivine crystals in a suite of layered cumulates were measured, and the squares of the radii are plotted against the crystallisation ages of the layers (from U–Pb on zircon). The points define a straight line of slope $3.1\times10^{-11}\ \mathrm{m^2\,yr^{-1}}$ through the origin. Interpret the slope, and estimate $D$.
::: solution
$R^2 = kDt$ with $k$ of order unity predicts exactly a straight line through the origin in $R^2$ against $t$, so the data support diffusion-controlled growth. The slope gives $kD = 3.1\times10^{-11}\ \mathrm{m^2\,yr^{-1}} = 9.8\times10^{-19}\ \mathrm{m^2\,s^{-1}}$.

Taking $k \approx 1$ gives $D \approx 1\times10^{-18}\ \mathrm{m^2\,s^{-1}}$, the value used in [[#prop-grainsize]] — and that agreement is the puzzle, not the payoff. Diffusion of network cations through a silicate melt at magmatic temperature is $10^{-9}$–$10^{-12}\ \mathrm{m^2\,s^{-1}}$, a thousand to a million times faster, so crystal growth in a cumulate is *not* limited by transport through the liquid: it is limited by the interface reaction at the growing face, or by diffusion through the boundary layer of already-grown crystal, or the crystals are coarsening (Ostwald ripening) rather than growing freely. The transferable lesson is that the *exponent* is the robust information — $R^2 \propto t$ diagnoses a diffusion- or interface-controlled regime whatever the constant — and that an apparent diffusion coefficient measured from a texture is a statement about the slowest step in the chain, not about the melt.
:::
:::

::: exercise Heat budget of a batholith {level=3 check="11"}
A pluton of volume $5000\ \mathrm{km^3}$ crystallises and cools from $1200$ to $300\ ^\circ\mathrm{C}$. Take $\rho = 2600\ \mathrm{kg\,m^{-3}}$, $c_P = 1000\ \mathrm{J\,kg^{-1}\,K^{-1}}$ and latent heat $4\times10^{5}\ \mathrm{J\,kg^{-1}}$. Find the total heat released, in joules and in units of present world annual primary energy consumption ($6\times10^{20}\ \mathrm{J}$). If the heat is released uniformly over $10^6$ years, what mean surface heat-flow anomaly would it produce over a $50{,}000\ \mathrm{km^2}$ region? (Enter the anomaly in $\mathrm{mW\,m^{-2}}$.)
::: solution
Mass $= 2600\times5\times10^{12} = 1.3\times10^{16}\ \mathrm{kg}$. Heat $= M(c_P\Delta T + L) = 1.3\times10^{16}\times(9\times10^{5} + 4\times10^{5}) = 1.7\times10^{22}\ \mathrm{J}$, which is $28$ times the world's annual primary energy consumption — a useful reminder of the scale of geological energy fluxes.

Over $10^6\ \mathrm{yr} = 3.15\times10^{13}\ \mathrm{s}$ the mean power is $5.4\times10^{8}\ \mathrm{W}$, spread over $5\times10^{10}\ \mathrm{m^2}$:
$$
q = \frac{5.4\times10^{8}}{5\times10^{10}} = 0.011\ \mathrm{W\,m^{-2}} = 11\ \mathrm{mW\,m^{-2}} .
$$
Against a background heat flow of $60$–$70\ \mathrm{mW\,m^{-2}}$ this is a $15$–$20\%$ anomaly, which is detectable but modest — and it is smaller than reality for two reasons: the heat is released in the first few hundred thousand years, not uniformly, and much of it is carried away by hydrothermal fluids rather than conducted, which is exactly why the ore deposits of a batholith are found in its aureole ([[earth-resources/magmatic-hydrothermal]]).
:::
:::
