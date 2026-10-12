Sit anywhere in the middle of a continent and look at the ground: nine times out of ten you are looking at sediment or sedimentary rock. Yet sedimentary rocks are only about $5\%$ of the volume of the crust, and the other $95\%$ is igneous and metamorphic. They are a veneer a few kilometres thick at most, and they are the only part of the record that tells us about the surface — about every ancient atmosphere, ocean, ice sheet, river and living community, and about the whole history of life, which is preserved nowhere else.

That asymmetry — huge information content in a small volume, and a record that is constantly being destroyed and rebuilt — is what makes sedimentary rocks interesting. A sandstone is a physical record of a flow; a limestone is a chemical record of an ocean; a coal is a biological accident; a banded iron formation is a record of the day the atmosphere changed forever. This chapter is about how the three families of sedimentary rock are made, and how to read them back.

## From rock to sediment

Sedimentary rocks begin as igneous or metamorphic ones, attacked at the surface by water, oxygen and life. The details of chemical weathering belong to [[geomorphology/weathering]] and [[geochemistry/weathering-chemistry]]; what matters here is the *selectivity* of the process, because it is the selectivity that writes the message.

- **Mechanical** breakdown produces clasts — fragments of the parent rock and of single crystals. It enlarges cracks, thins slabs, rounds edges, and does not change chemistry.
- **Chemical** breakdown destroys the minerals that were unstable at the surface: olivine, calcium plagioclase, pyroxene, amphibole and biotite all go, in roughly Bowen's order, and clay minerals and iron oxides take their place. Quartz survives, and so do the dense accessories — zircon, tourmaline, rutile — which is why the heavy-mineral fraction of a sand is called the "resistant suite".
- **Solution** carries the truly mobile elements away in the water: $\mathrm{Na^+}$, $\mathrm{K^+}$, $\mathrm{Ca^{2+}}$, $\mathrm{Mg^{2+}}$, $\mathrm{HCO_3^-}$, $\mathrm{SO_4^{2-}}$, $\mathrm{Cl^-}$, and silica at a few tens of $\mathrm{mg\,kg^{-1}}$.

The result is a rule of thumb worth memorising: **weathering sorts elements from most to least mobile as $\mathrm{Na, Ca, Mg, K \gg Si > Fe, Al, Ti}$**, and the residue of intense weathering is a laterite — iron and aluminium oxide, the two least mobile of the common metals.

## Transport: size is the message

::: definition Competence, capacity, sorting, roundness {#def-transport}
The **competence** of a flow is the largest clast it can move; its **capacity** is the total mass it can carry. **Sorting** describes the spread of clast sizes: a sediment is well sorted if one size dominates, poorly sorted if many are present together. **Roundness** describes how sharp the edges and corners of a clast are; **sphericity** describes how close the whole grain is to a sphere. A sediment can be well sorted and angular (beach sand just after a storm), or poorly sorted and rounded (a pebble lag on a beach of cobbles).
:::

::: theorem Settling velocity {#thm-settling}
A spherical grain of diameter $d$ and density $\rho_s$ falling in a fluid of density $\rho$ and dynamic viscosity $\mu$ reaches a steady fall speed $w$ when drag balances submerged weight:
$$
\underbrace{C_D \tfrac{1}{2}\rho w^2 \tfrac{\pi d^2}{4}}_\text{drag} = \underbrace{(\rho_s - \rho)\,g\,\tfrac{\pi d^3}{6}}_\text{submerged weight},
$$
where $C_D$ is a drag coefficient depending on the Reynolds number $\mathrm{Re} = w d \rho/\mu$. In the viscous limit $\mathrm{Re} < 1$, $C_D = 24/\mathrm{Re}$ and
$$
w = \frac{(\rho_s - \rho)\,g\,d^2}{18\,\mu} \qquad \text{(Stokes' law)},
$$
while for $500 < \mathrm{Re} < 10^5$, $C_D \approx 0.44$ and
$$
w \approx 1.1\sqrt{\frac{(\rho_s-\rho)}{\rho}\,g\,d} \qquad \text{(Newton's law)} .
$$
:::

::: proof
Substituting $C_D = 24\mu/(w d\rho)$ into the balance gives $12\mu w/(\rho d)\times \rho \pi d^2/4 = (\rho_s-\rho)g\pi d^3/6$, which rearranges to Stokes' law; the fall speed then goes as $d^2$, so halving the diameter reduces it fourfold. With $C_D$ constant at $0.44$ the same balance gives $w^2 = 4(\rho_s-\rho)g d/(3\times0.44\rho) = 3.03(\rho_s-\rho)g d/\rho$, and $\sqrt{3.03} = 1.74$; writing the coefficient as $1.1$ with $g$ inside the root in the usual engineering form is the same statement. The important structural difference is the exponent: $w \propto d^2$ in still water for fine grains, $w \propto d^{1/2}$ for coarse ones. ∎
:::

::: example How fast do grains fall? {#ex-settling}
Take quartz spheres ($\rho_s = 2650\ \mathrm{kg\,m^{-3}}$) in water at $20\ ^\circ\mathrm{C}$ ($\rho = 1000\ \mathrm{kg\,m^{-3}}$, $\mu = 1.0\times10^{-3}\ \mathrm{Pa\,s}$) and find the fall speed of (a) a clay flake $d = 1\ \mu\mathrm{m}$, (b) a medium sand grain $d = 0.25\ \mathrm{mm}$, (c) a coarse pebble $d = 20\ \mathrm{mm}$.
::: solution
(a) Stokes: $w = 1650\times9.81\times(10^{-6})^2/(18\times10^{-3}) = 9\times10^{-7}\ \mathrm{m\,s^{-1}}$, about $8\ \mathrm{cm\,day^{-1}}$. A $1\ \mu\mathrm{m}$ particle takes **140 years** to fall through $4\ \mathrm{km}$ of ocean — which is why clay reaches the deep sea only if it is first flocculated into aggregates, or delivered by wind, ice or turbidity currents.

(b) Stokes would give $0.056\ \mathrm{m\,s^{-1}}$, but that implies $\mathrm{Re} = wd\rho/\mu = 14$, outside the law's range. Solving the drag balance with $C_D = 24/\mathrm{Re} + 3/\sqrt{\mathrm{Re}} + 0.34$ iteratively gives $w = 0.037\ \mathrm{m\,s^{-1}}$: Stokes over-predicts by $50\%$. A $0.25\ \mathrm{mm}$ grain falls $100\ \mathrm{m}$ in about $45$ minutes.

(c) Newton: $w = 1.1\sqrt{1.65\times9.81\times0.02} = 0.63\ \mathrm{m\,s^{-1}}$ (the exact drag solution gives $0.29\ \mathrm{m\,s^{-1}}$ for a sphere, and natural grains are slower still). The point of the three numbers is the *range*: from clay to pebble, fall speed changes by a factor of about $3\times10^{5}$. That enormous leverage is why grain size is the most informative single measurement you can make on a sediment, and why a current of $10\ \mathrm{cm\,s^{-1}}$ carries sand in suspension but leaves clay alone while a current of $1\ \mathrm{cm\,s^{-1}}$ keeps clay in suspension for ever.
:::
:::

::: widget plot
f: 545*s*x*x ; 172.5*sqrt(s*x)
x: 0, 2.5
y: 0, 400
sliders: s=1.65:0.5:4:0.05
points: 0.0625, 3.3; 0.25, 37; 0.5, 91; 1, 175; 2, 292
labels: Stokes (viscous); Newton (inertial)
caption: Fall speed of a spherical grain in water as a function of diameter: the parabola is Stokes' law, the curve is Newton's law, and the marked points are the exact drag-law solutions. The slider $s = \rho_s/\rho - 1$ is the submerged density contrast, $1.65$ for quartz; set it to $3.6$ for galena and watch the whole curve rise. Notice that the two asymptotes disagree by a factor of two or more across the whole sand range, and that the measured points lie between them: real grains are neither viscous nor inertial, and any formula you use in a calculation must be checked against the Reynolds number it assumes.
:::

## Clastic rocks: naming a mud, a sand or a gravel

::: definition The Wentworth scale {#def-wentworth}
Clasts are named by diameter: clay $<0.004\ \mathrm{mm}$, silt $0.004$–$0.0625\ \mathrm{mm}$, sand $0.0625$–$2\ \mathrm{mm}$ (very fine to very coarse), granules $2$–$4\ \mathrm{mm}$, pebbles $4$–$64\ \mathrm{mm}$, cobbles and boulders above. The corresponding rocks are mudrock (mudstone, shale if fissile), sandstone and conglomerate (breccia if the clasts are angular). Sedimentologists use $\phi = -\log_2 d(\mathrm{mm})$, so that a $1\ \mathrm{mm}$ grain is $0\ \phi$, a $0.25\ \mathrm{mm}$ grain is $2\ \phi$ and a $4\ \mathrm{mm}$ granule is $-2\ \phi$; sorting and mean size are then statistics of a $\phi$ distribution.
:::

::: svg
caption: The Wentworth scale, drawn to a logarithmic size axis, with the sediment and the rock named on each interval. The vertical bars mark the two boundaries that matter most in practice: clay/silt at $0.004\ \mathrm{mm}$, which is roughly where fall speed drops below any natural current's ability to keep grains in suspension, and silt/sand at $0.0625\ \mathrm{mm}$, which is roughly where grains stop being carried in suspension and start rolling and bouncing along the bed.
<svg viewBox="0 0 760 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wentworth grain-size scale with sediment and rock names">
  <style>
    .bar { fill: var(--accent-wash); stroke: var(--accent); stroke-width: 1.2; }
    .g1 { fill: var(--deemph); } .g2 { fill: var(--rule-2); }
    .lab { fill: var(--ink); font-size: 13px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11.5px; }
    .ax { fill: var(--ink-3); font-size: 11px; }
    .tick { stroke: var(--ink-3); stroke-width: 1; }
  </style>
  <rect class="bar" x="20"  y="60" width="118" height="46"/>
  <rect class="bar" x="138" y="60" width="118" height="46"/>
  <rect class="bar" x="256" y="60" width="118" height="46"/>
  <rect class="bar" x="374" y="60" width="118" height="46"/>
  <rect class="bar" x="492" y="60" width="118" height="46"/>
  <rect class="bar" x="610" y="60" width="130" height="46"/>
  <text class="lab" x="34"  y="88">clay</text>
  <text class="lab" x="152" y="88">silt</text>
  <text class="lab" x="270" y="88">sand</text>
  <text class="lab" x="404" y="88">granule</text>
  <text class="lab" x="516" y="88">pebble</text>
  <text class="lab" x="624" y="88">cobble–boulder</text>
  <text class="sub" x="34"  y="126">mudstone, shale</text>
  <text class="sub" x="152" y="126">siltstone</text>
  <text class="sub" x="270" y="126">sandstone</text>
  <text class="sub" x="404" y="126">granulestone</text>
  <text class="sub" x="516" y="126">conglomerate, breccia</text>
  <text class="sub" x="624" y="126">conglomerate</text>
  <text class="sub" x="34"  y="46">&lt; 0.004 mm</text>
  <text class="sub" x="152" y="46">0.004–0.0625</text>
  <text class="sub" x="270" y="46">0.0625–2</text>
  <text class="sub" x="404" y="46">2–4</text>
  <text class="sub" x="516" y="46">4–64</text>
  <text class="sub" x="624" y="46">&gt; 64 mm</text>
  <line class="tick" x1="138" y1="52" x2="138" y2="112"/>
  <line class="tick" x1="256" y1="52" x2="256" y2="112"/>
  <text class="ax" x="20" y="160">grain size, logarithmic scale →</text>
  <text class="ax" x="20" y="180">φ = −log₂ d(mm): clay &gt; 8 φ · silt 4–8 φ · sand −1 to 4 φ · gravel &lt; −1 φ</text>
</svg>
:::

Two further concepts carry most of the interpretive weight.

**Maturity** measures how far the sediment has travelled from its parent rock, and has two components: *textural* maturity (well sorted, well rounded) and *compositional* maturity (unstable minerals and rock fragments destroyed, quartz dominant). A quartz arenite is doubly mature; a feldspar-rich, mud-rich, angular greywacke is immature in both senses.

**Provenance** is the source terrain, and it is read from the composition. Quartz-rich sand means an old craton or a long transport history; feldspar-rich sand (arkose) means a nearby granitic highland eroded fast; rock-fragment-rich sand (lithic arenite) means a volcanic arc or a rising mountain belt being eaten for the first time.

::: svg
caption: The quartz–feldspar–lithic (QFL) provenance diagram of Folk, with the boundaries drawn at $\mathrm{Q} = 55\%$ and at $\mathrm{F}/(\mathrm{F}+\mathrm{L}) = 1$. Two sandstones from [[#ex-qfl]] are plotted: the lithic arenite of a forearc basin sits to the right of the F/L line and below the Q line, the arkose of a rift-fill next to a granite basement to the left. Only the framework grains are counted; if the mud matrix exceeds $15\%$, the name takes the suffix "-wacke".
<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quartz-feldspar-lithic ternary diagram with provenance fields">
  <style>
    .tri { fill: var(--sheet); stroke: var(--ink-2); stroke-width: 1.4; }
    .bd  { stroke: var(--series-2); stroke-width: 1.6; }
    .lab { fill: var(--ink); font-size: 13.5px; font-weight: 700; }
    .fld { fill: var(--ink-2); font-size: 12px; }
    .pt  { fill: var(--series-1); stroke: var(--ink); stroke-width: 1; }
    .ann { fill: var(--ink-3); font-size: 11.5px; }
  </style>
  <polygon class="tri" points="380,30 80,300 680,300"/>
  <line class="bd" x1="245" y1="151.5" x2="515" y2="151.5"/>
  <line class="bd" x1="380" y1="151.5" x2="380" y2="300"/>
  <text class="lab" x="366" y="22">Q</text>
  <text class="lab" x="66" y="320">F</text>
  <text class="lab" x="672" y="320">L</text>
  <text class="fld" x="330" y="80">quartz arenite</text>
  <text class="fld" x="150" y="235">arkose · subarkose</text>
  <text class="fld" x="470" y="235">lithic · sublithic arenite</text>
  <text class="ann" x="252" y="145">Q = 55 %</text>
  <text class="ann" x="386" y="250">F = L</text>
  <circle class="pt" cx="470" cy="192" r="6"/>
  <circle class="pt" cx="275" cy="178.5" r="6"/>
  <text class="ann" x="482" y="188">Q40 F15 L45: arc or recycled orogen</text>
  <text class="ann" x="86" y="172">Q45 F45 L10: cratonic margin</text>
  <text class="ann" x="120" y="332">framework grains only, normalised to 100 %</text>
</svg>
:::

::: example Provenance from a point count {#ex-qfl}
:::
A sandstone is point-counted over 300 framework grains: $120$ quartz, $45$ feldspar, $135$ fragments of volcanic and sedimentary rock. Classify it and interpret the source. A second sandstone gives $135$ quartz, $135$ feldspar, $30$ lithic fragments.
::: solution
Normalising to $100\%$: the first is $\mathrm{Q}_{40}\mathrm{F}_{15}\mathrm{L}_{45}$, the second $\mathrm{Q}_{45}\mathrm{F}_{45}\mathrm{L}_{10}$. Both fall below the $\mathrm{Q} = 55\%$ line, so neither is a quartz arenite. In the first, lithics outnumber feldspar, so it is a **lithic arenite** (or sublithic arenite if lithics are under $25\%$ after the feldspar is counted in): the classic signature of a volcanic arc or of a mixed mountain belt being eroded for the first time, deposited close to the source because lithics abrade away quickly. In the second, feldspar dominates: an **arkose** (subarkose at $45\%$ feldspar), which means a granitic basement being stripped rapidly, in a climate dry or cold enough that feldspar survives chemical attack, and a transport distance short enough that it is not ground away.

The interpretive discipline is that each of the three components is destroyed by a different process — lithics by abrasion, feldspar by chemical weathering, quartz by almost nothing — so a point count is really three independent clocks running at different rates, and the ratio of two of them tells you which one has been running longest.
:::

::: warning "Well-sorted sand means a beach; poorly sorted means a glacier"
Environment from sorting alone is a coin toss. Sorting is a property of the *flow*, not of the setting, and the same well-sorted sand is made by a beach, a dune, a shallow marine shelf and a river channel in equilibrium with its load. The classic "poorly sorted equals glacial" inference fails for debris flows, for turbidites, for talus and for immature feldspar-rich sands. Depositional environment is read from a *suite* of features — bedforms and sedimentary structures, palaeocurrents, fossil content, geometry of the body, and the rocks above and below — and never from one measurement. The full argument belongs to [[sedimentology/facies]].
:::

## Chemical and biogenic sediments

::: proposition Why the ocean does not precipitate salt {#prop-evaporite}
Seawater holds about $35\ \mathrm{g}$ of salt per kilogram of water, and is far from saturation with respect to halite, which requires roughly $300\ \mathrm{g\,kg^{-1}}$. Evaporite deposits therefore require not merely evaporation but **restricted circulation**: a basin that is refilled only slowly, so that salinity can rise by a factor of about ten. The order of precipitation follows decreasing solubility — carbonates, then gypsum and anhydrite, then halite, then the potassium and magnesium salts — and is preserved as a vertical sequence that repeats whenever the basin refilled.
:::

::: proof
The sequence is a consequence of the solubility products and of the concentrations in seawater. Calcite ($K_\text{sp} \sim 10^{-8.4}$, and seawater is *supersaturated* with respect to it at the surface but undersaturated at depth) is reached first; gypsum saturates at about twice seawater's salinity, halite at about ten times, and sylvite $\mathrm{KCl}$ and carnallite only in the last few per cent of the brine, which is why potash beds are thin, spectacularly pure, and found only in the largest evaporite accumulations. Because each salt precipitates over a narrow range of concentration, a vertical succession records the *history of the water level* in the basin with a resolution of a few per cent of salinity — which is why evaporites are used as palaeoclimate and palaeobathymetric archives, and why the order of the beds is never in doubt. ∎
:::

The three chemical–biogenic families that dominate the sedimentary record:

**Carbonates.** Limestone and dolostone are the largest single volume of sedimentary rock, and unlike clastics they are mostly *produced in place*, by organisms that build shells of calcite or aragonite ($\mathrm{CaCO_3}$) and by microbial and abiotic precipitation. Three-quarters of shallow-marine carbonate is made in the tropics, where warm water, plenty of light and low nutrient supply favour calcifiers; the rest is made in cold water and in lakes. Dolostone, $\mathrm{CaMg(CO_3)_2}$, forms where magnesium-rich brine or seawater reworks limestone, and the replacement commonly preserves fossils and original texture while destroying most of the isotopic record.

**Siliceous and chemical sediments of the deep sea.** Radiolarian and diatom oozes accumulate where production is high, and become chert on burial. Manganese nodules and crusts grow at centimetres per million years. Below the **carbonate compensation depth** (about $4{,}500\ \mathrm{m}$ in the modern Pacific, shallower in the Atlantic) carbonate dissolves, so the abyssal Pacific is carpeted in siliceous and clayey ooze rather than in lime mud.

**Coal and organic shales.** Coal is the residue of swamps that escaped oxidation — a condition requiring waterlogging, subsidence keeping pace with peat accumulation, and tectonic quiescence for thousands of years. Because the carbon is fixed from the atmosphere and then buried, coal and black shales are the reason the atmosphere has any oxygen at all: organic carbon burial is the only large source of $\mathrm{O_2}$ on geological timescales.

::: example Banded iron formation: a chemical sediment with a date {#ex-bif}
:::
Banded iron formations (BIFs) are alternating chert and iron-oxide layers, deposited between $3.8$ and $1.8\ \mathrm{Ga}$, with almost none after $1.8\ \mathrm{Ga}$ and a brief return in the Neoproterozoic. Explain the timing in terms of sea-water chemistry and the oxidation state of iron.
::: solution
$\mathrm{Fe^{2+}}$ is soluble in oxygen-free water at neutral pH; $\mathrm{Fe^{3+}}$, the state in hematite and magnetite, is essentially insoluble. So a deep, anoxic ocean can carry dissolved iron from hydrothermal sources to enormous concentrations, and iron precipitates only where and when it meets an oxidant. The great banded formations therefore record the onset of oxygen production by photosynthesis at the point where the ocean's reductant inventory — dissolved iron, and later sulfide — was being consumed faster than it was supplied. Once the ocean's iron reservoir was exhausted and the surface ocean permanently oxygenated, the mechanism shut off: no more BIFs. The Neoproterozoic return is read as evidence that deep waters became briefly anoxic again, possibly iron-rich, in a glaciated ocean.

The quantitative part of the argument is the mass. Take a generous order-of-magnitude estimate of the volume of Precambrian BIF — $10^{7}\ \mathrm{km^3}$ of rock at $2500\ \mathrm{kg\,m^{-3}}$ with $20\%$ iron by weight — which is $5\times10^{18}\ \mathrm{kg}$ of iron, or $9\times10^{19}\ \mathrm{mol}$. Oxidising $\mathrm{Fe^{2+}}$ to $\mathrm{Fe^{3+}}$ consumes a quarter-mole of $\mathrm{O_2}$ per mole of iron, so $2\times10^{19}\ \mathrm{mol}$ of oxygen: about $60\%$ of the $3.7\times10^{19}\ \mathrm{mol}$ held in the whole present atmosphere. The Phanerozoic has no BIFs at all. The rocks are not merely *consistent* with the great oxidation event at $2.45\ \mathrm{Ga}$; they are one of the two or three lines of evidence that established it ([[earth-history/oxygen-proterozoic]], [[geochemistry/stable-isotopes]]).
:::

## Burial: from sediment to rock, and what is lost

::: definition Diagenesis and compaction {#def-diagenesis}
**Diagenesis** is all the physical and chemical change a sediment undergoes after deposition and before metamorphism: compaction, cementation, pressure solution, replacement and bioturbation. Compaction reduces porosity roughly exponentially with depth,
$$
\phi(z) = \phi_0\, e^{-z/b},
$$
with $\phi_0 \approx 0.5$–$0.6$ for mud and $0.4$–$0.5$ for clean sand, and $b \approx 0.5$–$1\ \mathrm{km}$ for sands and several kilometres for muds, which compact more but creep more slowly.
:::

::: example Porosity, depth and reservoir quality {#ex-porosity}
Take $\phi_0 = 0.60$ and $b = 4.5\ \mathrm{km}$ for a mudstone, and $\phi_0 = 0.45$, $b = 3.5\ \mathrm{km}$ for a sandstone. Find the porosity at $2\ \mathrm{km}$ and at $4\ \mathrm{km}$ for each, and say what the numbers mean for a petroleum reservoir.
::: solution
Mudstone: $\phi(2) = 0.60\,e^{-2/4.5} = 0.385$; $\phi(4) = 0.60\,e^{-4/4.5} = 0.247$.
Sandstone: $\phi(2) = 0.45\,e^{-2/3.5} = 0.235$; $\phi(4) = 0.45\,e^{-4/3.5} = 0.123$.

Two things follow. First, a clean sand buried to $4\ \mathrm{km}$ still holds $12\%$ pore space, which is enough to hold oil and gas; a mud, even at $38\%$ porosity at $2\ \mathrm{km}$, has pores too small to let hydrocarbons move, which is why mud is a source rock or a seal and sand is a reservoir. Second, the difference between a good reservoir and a poor one is largely a matter of burial depth and of cement: quartz overgrowths and carbonate cement can destroy the primary porosity that compaction left, and the whole of economic sedimentology is the attempt to predict where cementation did and did not happen ([[earth-resources/petroleum-systems]]).
:::
:::

::: widget plot
f: 60*exp(-x/b)
x: 0, 8
y: 0, 65
sliders: b=4.5:0.5:8:0.5
labels: porosity
caption: Porosity as a function of depth for $\phi_0 = 60\%$, with the compaction constant $b$ as a slider. Set $b = 0.5\ \mathrm{km}$ (a clean, strongly compacting sand) and $b = 4.5\ \mathrm{km}$ (an overpressured mud) and read the porosity at $3\ \mathrm{km}$ in each case: $0.2\%$ against $31\%$. The two curves are the difference between a reservoir and a seal, and between a normally pressured formation and one that a drilling mud has to hold back. Then notice how badly the exponential extrapolates: real porosity flattens below $4$–$5\ \mathrm{km}$ because cementation and pressure solution take over from physical compaction, and because overpressure can arrest compaction altogether.
:::

## The rock cycle, with numbers

The three families are one cycle: igneous rock weathers to sediment, burial turns sediment into sedimentary rock, burial deeper or into a subduction zone metamorphoses it, and melting starts again. The fluxes are wildly unequal. About $1.5\times10^{16}\ \mathrm{kg\,yr^{-1}}$ of sediment is delivered to the oceans by rivers today, and about $0.4\times10^{15}\ \mathrm{kg\,yr^{-1}}$ of that is buried permanently, the rest being recycled in the shallow machine of erosion and redeposition. The crust as a whole is old and igneous; the surface as a whole is young and sedimentary. That is why the sedimentary record is both our only archive of the surface and a badly biased one: it is dominated by what was buried fast, in the places where accommodation was created, in the intervals when the land was high.

::: quiz
Two sandstones have the same grain size, sorting and roundness. One is $95\%$ quartz, the other $60\%$ quartz, $30\%$ feldspar. Which statement is best supported?
- [ ] The second was deposited in a higher-energy environment.
- [x] The second was eroded from a feldspar-rich source and/or transported less far, or weathered less, than the first.
- [ ] The first is the older rock.
- [ ] The second must be glacial.
::: solution
Grain size, sorting and roundness describe the *flow*; composition describes the *source and the weathering history*. Equal textures with different compositions therefore point to a different provenance or a different climate/transport distance, not to different energy. Age cannot be read from composition at all, and a glacial origin is neither required nor excluded.
:::
:::

::: history
The interpretation of sedimentary rocks began with a practical problem: finding coal, clay and building stone in the canal excavations of eighteenth-century England. William Smith's insight of the 1790s — that the strata of England occur in a constant vertical order, and that each bed yields its own fossils — was a sedimentological observation before it was a stratigraphical one, and it made the map of 1815 possible. The theoretical framework came from James Hutton, who recognised unconformity and deep time at Siccar Point in 1788, and from Charles Lyell, who in the *Principles* (1830–1833) argued that sedimentary facies must be interpreted by watching rivers and deltas now. The quantitative physics of grain transport had to wait for the twentieth century: G. K. Gilbert's *Study of the Rivers* (1877) set the programme, and Ralph Anthony Bagnold's experiments on sand moving in water, written up in *The Physics of Blown Sand and Desert Dunes* (1941) while he was working on desert-warfare logistics, gave the first mechanised theory of sediment transport — including the insight that grains in motion travel in saltation, bouncing, and that the fluid is dragged along by them.
:::

## Where this leads

Sedimentary rocks are read in far more detail in [[sedimentology/sediment-grains]], [[sedimentology/bedforms]] and [[sedimentology/facies]], where grain fabrics, ripples and dunes, and Walther's law turn the hand specimen into a flow reconstruction; the stratigraphic ordering of the rocks is the subject of [[sedimentology/stratigraphy]]. The chemistry of the water that made them belongs to [[geochemistry/aqueous-geochemistry]] and [[geochemistry/weathering-chemistry]], and the use of sedimentary basins as stores of energy and water to [[earth-resources/petroleum-systems]] and [[earth-resources/groundwater-resources]].

::: summary Key takeaways
- Sedimentary rocks are $5\%$ of the crust by volume and essentially $100\%$ of the surface record; they are also the only archive of past surface conditions and of life.
- Weathering is selective, and the selectivity is the message: quartz and the heavy accessories survive, mafic minerals and calcium plagioclase do not.
- Fall speed scales as $d^2$ for fine grains and $d^{1/2}$ for coarse ones, and spans five orders of magnitude from clay to pebble — which is why grain size is the most informative measurement on a sediment.
- Clastic rocks are named by size (Wentworth), described by sorting, roundness and maturity, and interpreted with a provenance diagram (QFL) whose three components are destroyed at three different rates.
- Chemical and biogenic sediments record the ocean's chemistry directly: evaporites require restricted circulation, carbonates mostly grow in place, and banded iron formations date the oxidation of the ocean.
- Diagenesis destroys porosity roughly exponentially with depth; the difference between reservoir, seal and source rock is mostly a matter of grain size, burial depth and cement.
- Sedimentary rocks are a biased archive: what is preserved is what was buried fast, and the flux from river to permanent burial is less than $3\%$ of what rivers carry.
:::

## Exercises

::: exercise Wentworth names {level=1}
Name the sediment and the rock for grains of diameter (a) $0.002\ \mathrm{mm}$, (b) $0.02\ \mathrm{mm}$, (c) $1\ \mathrm{mm}$, (d) $30\ \mathrm{mm}$, and give the $\phi$ value of (c). How many of the four size classes are represented?
::: solution
(a) clay → mudstone/shale; (b) silt → siltstone; (c) sand (medium) → sandstone, $\phi = -\log_2 1 = 0\ \phi$; (d) pebble → conglomerate. Four classes. Note that (a) is below the silt/clay boundary and that in practice the boundary is drawn where settling and flocculation behaviour change, not where a microscope stops resolving grains.
:::
:::

::: exercise Fall speed by Stokes {level=1 check="0.4"}
Using Stokes' law, find the fall speed in $\mathrm{mm\,s^{-1}}$ of a silt grain of diameter $0.02\ \mathrm{mm}$ (quartz in water, $\mu = 10^{-3}\ \mathrm{Pa\,s}$).
::: solution
$w = 1650\times9.81\times(2\times10^{-5})^2/(18\times10^{-3}) = 3.6\times10^{-4}\ \mathrm{m\,s^{-1}} = 0.36\ \mathrm{mm\,s^{-1}}$. (Enter to one decimal in $\mathrm{mm\,s^{-1}}$: $0.4$.) Check the Reynolds number: $\mathrm{Re} = wd\rho/\mu = 3.6\times10^{-4}\times2\times10^{-5}/10^{-6} = 0.007$, so Stokes is valid. The same grain in air would fall some sixty times faster, which is why dust storms can carry silt across oceans while rivers cannot keep it in suspension far from their mouths.
:::
:::

::: exercise Reynolds number check {level=1 check="175"}
A $1\ \mathrm{mm}$ quartz sphere falls at $0.175\ \mathrm{m\,s^{-1}}$ in water. Compute its Reynolds number and say which of the two laws of [[#thm-settling]] applies.
::: solution
$\mathrm{Re} = wd\rho/\mu = 0.175\times10^{-3}\times1000/10^{-3} = 175$. This is in the transitional range: neither Stokes ($\mathrm{Re}<1$) nor Newton ($\mathrm{Re}>500$) applies, and the drag coefficient must be read from the empirical curve. Stokes would predict $0.90\ \mathrm{m\,s^{-1}}$ for this grain, five times too fast — the reason the "Stokes' law" sizing tubes used in laboratories are restricted to the silt and clay fractions.
:::
:::

::: exercise Provenance {level=2}
Point counts of three sandstones give (a) $\mathrm{Q}_{88}\mathrm{F}_{8}\mathrm{L}_{4}$, (b) $\mathrm{Q}_{25}\mathrm{F}_{20}\mathrm{L}_{55}$, (c) $\mathrm{Q}_{40}\mathrm{F}_{52}\mathrm{L}_{8}$. Classify each and propose a setting.
::: solution
(a) Quartz arenite ($\mathrm{Q} > 55\%$): a stable cratonic margin, a reworked eolian–shallow-marine sequence, or a long-lived passive margin; texturally mature as well, typically. (b) Lithic arenite: a volcanic arc or a rapidly unroofed belt, deposited close to source. (c) Arkose (subarkose): a granitic basement being stripped in a rift or foreland, in an arid or cold climate, with short transport. The exercise is a reminder that the same grain size can carry three completely different tectonic messages.
:::
:::

::: exercise Evaporite concentration factor {level=2 check="8.6"}
Seawater contains $35\ \mathrm{g\,kg^{-1}}$ of dissolved solids and halite precipitates near $300\ \mathrm{g\,kg^{-1}}$. By what factor must water be evaporated to reach halite saturation? (Enter the concentration factor.) Then find the volume of seawater is needed to make $1\ \mathrm{m^3}$ of halite ($\rho = 2170\ \mathrm{kg\,m^{-3}}$)?
::: solution
The concentration factor is $300/35 = 8.6$, so about $88\%$ of the water must be lost. $1\ \mathrm{m^3}$ of halite is $2170\ \mathrm{kg}$ of $\mathrm{NaCl}$, which requires $2170/0.035 = 6.2\times10^{4}\ \mathrm{kg}$ of seawater, about $62\ \mathrm{m^3}$, or a sheet $6.2\ \mathrm{m}$ deep over each square metre. A halite bed $100\ \mathrm{m}$ thick therefore records the complete evaporation of roughly $6\ \mathrm{km}$ of seawater — which is why thick evaporites require a restricted basin with a shallow sill, not merely a hot climate, and why the Miocene Mediterranean "evaporite crisis", with beds up to $2\ \mathrm{km}$ thick, implies the basin was nearly isolated and repeatedly refilled.
:::
:::

::: exercise Compaction and overpressure {level=2 check="0.31"}
A mudstone with $\phi_0 = 0.60$ and $b = 4.5\ \mathrm{km}$ is buried to $3\ \mathrm{km}$. Find its expected porosity, and explain how a measured porosity of $50\%$ at that depth would be interpreted.
::: solution
$\phi = 0.60\,e^{-3/4.5} = 0.31$. A measured porosity of $50\%$ at $3\ \mathrm{km}$ is far above the compaction trend, which means the effective stress on the grains is much lower than the overburden implies: the pore fluid is carrying part of the load, i.e. the formation is **overpressured**. Overpressure of this kind arises when mud is buried faster than its water can be squeezed out, or beneath a seal with no drainage, and it is the condition that makes both hydrocarbon preservation possible and drilling kicks dangerous. The porosity–depth curve is therefore used as a pressure gauge in exploration.
:::
:::

::: exercise Deriving the exponent {level=3}
Show from the drag balance that $w \propto d^2$ in the Stokes regime and $w \propto d^{1/2}$ in the Newton regime, and use the two scalings to explain why turbidity currents can sort coarse sand and mud together, while rivers in flood sort them badly.
::: solution
Stokes: drag $\propto \mu w d$, weight $\propto \Delta\rho g d^3$, so $w \propto \Delta\rho g d^2/\mu$: exponent 2. Newton: drag $\propto \rho w^2 d^2$, so $w \propto (\Delta\rho g d/\rho)^{1/2}$: exponent $1/2$.

The consequence is that in the viscous regime the fall speed of a sand grain exceeds that of a clay grain by $(250)^2 \approx 10^5$, so the two cannot be held in suspension by the same flow and are separated efficiently whenever a flow slows. In the inertial regime the ratio is only $\sqrt{250} \approx 16$, and for the transitional sizes that matter in nature it is $50$–$100$. A turbidity current is thick, dense and turbulent, and it carries sand and mud together and then deposits them from a single waning flow — producing the graded bed of a turbidite, coarse at the base and muddy at the top, with no size break in between. A river's flow is shallow and its turbulence weak near the bed, so mud stays in suspension to the sea while sand is deposited in the channel: the two are separated, and the deposit is well sorted in size but poor in the mud that a turbidite preserves.
:::
:::

::: exercise A grain-size dataset {level=3}
The cumulative size distribution of a sandstone gives $d_{16} = 0.15\ \mathrm{mm}$, $d_{50} = 0.25\ \mathrm{mm}$, $d_{84} = 0.42\ \mathrm{mm}$. Estimate the inclusive graphic standard deviation $\sigma_I \approx (\phi_{84}-\phi_{16})/4$ and the skewness $\mathrm{Sk}_I = (d_{16} + d_{84} - 2d_{50})/[4\sigma_I^2]$ in $\phi$ units, and classify the sorting (well sorted if $\sigma_I < 0.35\ \phi$, moderately sorted $0.35$–$0.41$, moderately poor $0.41$–$0.50$).
::: solution
Convert to $\phi$: $d_{16} = -\log_2 0.15 = 2.74\ \phi$, $d_{50} = 2.00\ \phi$, $d_{84} = -\log_2 0.42 = 1.25\ \phi$. Then
$$
\sigma_I = \frac{2.74 - 1.25}{4} = 0.37\ \phi ,
$$
which is *moderately sorted*. Skewness: $\mathrm{Sk}_I = (2.74 + 1.25 - 4.00)/[4\times0.37^2] = -0.01/0.55 = -0.02$, essentially symmetric.

Two lessons. First, the $\phi$ transformation exists precisely to make these statistics behave: in millimetres the same distribution would look strongly positively skewed, because the scale is logarithmic. Second, a symmetric, moderately sorted sand is typical of a beach or a shallow marine bar, where wave action reworks grains into a narrow band of sizes; a strongly *fine*-skewed sand (positive skew in $\phi$) suggests removal of fines by winnowing, and a strongly coarse-skewed one suggests an added coarse population, for example a storm lag.
:::
:::

::: exercise The mass of a sedimentary veneer {level=3 check="45000"}
Sedimentary rocks cover $75\%$ of the continents and average $2.5\ \mathrm{km}$ in thickness where present. Take a continental area of $1.5\times10^{8}\ \mathrm{km^2}$ and a mean density of $2400\ \mathrm{kg\,m^{-3}}$. Find the mass of the sedimentary shell, and the time it would take to make at today's river sediment flux of $1.5\times10^{16}\ \mathrm{kg\,yr^{-1}}$ if none were destroyed? (Enter the time in years.) What does the comparison tell you about the preservation of the record?
::: solution
Volume $= 0.75\times1.5\times10^{8}\times2.5 = 2.8\times10^{8}\ \mathrm{km^3} = 2.8\times10^{17}\ \mathrm{m^3}$. Mass $= 2.8\times10^{17}\times2400 = 6.7\times10^{20}\ \mathrm{kg}$.

At $1.5\times10^{16}\ \mathrm{kg\,yr^{-1}}$ that takes $4.5\times10^{4}\ \mathrm{yr}$ — fifty thousand years, against a sedimentary record that runs for four billion. Even allowing that today's flux is elevated by agriculture and roads (perhaps three to ten times the pre-agricultural rate), and that most of the mass was metamorphosed or recycled and replaced many times over, the arithmetic says the same thing: the sedimentary record is not a sample of the average rate of sediment production, but a tiny, strongly selected residue of it. Roughly $0.4\times10^{15}\ \mathrm{kg\,yr^{-1}}$ is buried permanently, so the preservation factor is of order $1.5$–$3\%$, and the older the interval, the smaller the surviving fraction. Every statement about "the climate of the Cretaceous" is a statement about the Cretaceous *where it happened to be preserved* ([[palaeoclimate/proxies]]).
:::
:::
