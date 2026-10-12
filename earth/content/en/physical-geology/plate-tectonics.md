In 1596 Abraham Ortelius, looking at a map of the world in Antwerp, wrote that America had been torn away from Europe and Africa "by earthquakes and floods", and that anyone with a map and a little patience would see the evidence in the coastlines. Three hundred years of maps later, the shapes still looked convincing and nothing moved. The reason the idea failed was not that the observation was wrong but that the question was unanswerable: nobody knew what the Earth was made of inside, how old it was, or whether the sea floor had any history at all.

What settled it in seven years, between 1961 and 1968, was not a new map but a new instrument — the magnetometer towed behind a ship — together with two realisations: that the sea floor is young, and that it is a recording tape. This chapter is the story of the evidence, in the order it had to be found, and of the geometry and arithmetic of a surface made of moving pieces. Everything else in the course — the location of volcanoes and earthquakes, the distribution of ore deposits, the climate of the Cretaceous, the shape of the deep ocean — is a consequence.

## The evidence that could not persuade

Wegener's case, assembled between 1912 and 1922, was a case of coincidence on too large a scale to be coincidence:

- **Geometry.** The South American and African coastlines match, but the correct fit is not the modern coastline: it is the shelf break, the 200-metre isobath, because coastlines are eroded by the present sea and the continental margin is not. When Bullard, Everett and Smith did the fit that way in 1965, the gaps and overlaps fell to a few hundred kilometres across an ocean $6000\ \mathrm{km}$ wide.
- **Fossils.** The Permian flora *Glossopteris* and the freshwater reptile *Mesosaurus* occur in India, Antarctica, Australia, South Africa and South America, and nowhere else. *Mesosaurus* cannot have crossed $5000\ \mathrm{km}$ of salt water; a land bridge would leave its shallow-marine fossils on the sea floor, and the Atlantic sea floor, first sampled in the 1940s, is basalt and young sediment.
- **Ice.** Permo-Carboniferous glacial striations and tillites point *outward* from the middle of Gondwana, and the same ice sheets that scoured Brazil overlie coals in India. Only a single landmass straddling the South Pole organises that geometry.
- **Geology.** The Caledonian mountain belt runs through Norway and Scotland and then reappears, unbroken in age and structure, in New York State and Maine; the Precambrian gneiss complex of West Africa continues into Brazil.

The mechanism was the problem. Wegener proposed that continents plough through oceanic crust, and Harold Jeffreys replied, correctly, that the strength required of the sea floor is absurd: the drag on a continent moving at centimetres per year through a rigid lid would exceed anything the Earth's interior can supply. What was wrong was the picture of the interior, not the motion.

::: warning "The continents fit like a jigsaw, so they were together"
The fit is real but it is weak evidence on its own, for two reasons. First, coastlines are not the edges of continents: they are the position of a sea level that has moved $120\ \mathrm{m}$ in the last 20,000 years. Second, two surfaces torn apart do not have to fit — the Atlantic margin is a system of fault blocks, and much of the matching depends on which isobath you choose and on rotations of $10$–$20^\circ$. The fit is a *hypothesis generator*: what makes it compelling is that the fit predicted by matching the geology across the margin agrees with the fit predicted by the magnetic anomalies, and both agree with the transform-fault geometry. Four independent data sets, one geometry.
:::

## The sea floor as a recording tape

::: proposition Vine–Matthews–Morley: spreading plus reversals equals stripes {#prop-vine}
If new crust forms at a ridge and spreads symmetrically at half-rate $v$, and if the field reverses at times $t_i$, then the magnetic lineation of age $t_i$ lies at distance $x_i = v t_i$ from the ridge, on both sides. A profile across the ridge therefore reads as a symmetric pattern of anomalies whose ages are known independently from lavas on land, and whose spacing gives the spreading rate directly.
:::

::: proof
Take a particle of crust formed at the ridge at time $t$ before present. If the plate has moved away at constant speed $v$ since formation, its distance from the ridge is $x = vt$ by definition of constant velocity. Its remanent magnetisation was locked in when it cooled below the Curie temperature of its magnetite, about $580\ ^\circ\mathrm{C}$, within a few hundred metres of the eruption — so its polarity is that of the field at the time of formation. Symmetry follows because the same accretion process operates on both flanks, and because the ridge axis is a single line: any parcel on one side has a twin on the other, formed at the same instant. ∎

The prediction that made it a proof rather than a model was quantitative: the pattern of anomalies must be *identical* on the two flanks, and the same sequence must be found on ridges of different spreading rate, with distances scaled by the rate. That is what the ship-borne magnetometers found, first on the Carlsberg Ridge and the East Pacific Rise in 1961–1967, and it is why the marine magnetic anomaly reversal timescale is the backbone on which almost all Neogene geology is hung.
:::

::: example Measuring a spreading rate {#ex-rate}
On a mid-ocean ridge the youngest normally polarised chron, which began $0.78\ \mathrm{Ma}$, is found as a pair of anomalies $47\ \mathrm{km}$ apart, symmetric about the axis. On a second ridge the same pair is $9.8\ \mathrm{km}$ apart. Find the full spreading rate of each, and the time it would take to open an ocean $6000\ \mathrm{km}$ wide at the first rate.
::: solution
Each anomaly is $23.5\ \mathrm{km}$ from the axis and $0.78\ \mathrm{Myr}$ old, so the half-rate is
$$
v = \frac{2.35\times10^{4}\ \mathrm{m}}{0.78\times10^{6}\ \mathrm{yr}} = 3.0\ \mathrm{cm\,yr^{-1}},
$$
and the full rate $6\ \mathrm{cm\,yr^{-1}}$ — an intermediate-rate ridge. The second ridge gives $4.9\ \mathrm{km}/0.78\ \mathrm{Myr} = 0.63\ \mathrm{cm\,yr^{-1}}$ half-rate, $1.25\ \mathrm{cm\,yr^{-1}}$ full: a slow ridge like the Mid-Atlantic Ridge. The fastest ridge today, the Nazca–Antarctic Ridge, reaches about $15\ \mathrm{cm\,yr^{-1}}$.

At $6\ \mathrm{cm\,yr^{-1}}$ an ocean $6000\ \mathrm{km}$ wide opens in
$$
t = \frac{6\times10^{6}}{6\times10^{-2}} = 10^{8}\ \mathrm{yr},
$$
a hundred million years — a fifth of the age of the continents, and the reason the Atlantic, $6000\ \mathrm{km}$ wide and opening since $130\ \mathrm{Ma}$, is a young ocean while the Pacific, shrinking, is a remnant of a much larger one.
:::
:::

::: widget plot
f: 10*r*x
x: 0, 20
y: 0, 220
sliders: r=6:0.5:15:0.5
points: 0.78, 47; 0.78, 9.8
labels: distance to a chron of age x
caption: Distance from the ridge axis to a magnetic chron of age $x$ (in Myr) for a full spreading rate $r$ in $\mathrm{cm\,yr^{-1}}$; the two marked points are the $0.78\ \mathrm{Ma}$ chron of [[#ex-rate]] on a fast and a slow ridge. Set the slider to $6$ and read the distance to chron 5 at $9.8\ \mathrm{Ma}$: $59\ \mathrm{km}$. Then set it to $1.25$ and read the same chron: $12\ \mathrm{km}$. The two numbers are why slow ridges are so much harder to date magnetically — the whole record is compressed into a fifth of the width, and the anomalies overlap.
:::

Two further facts about the sea floor completed the argument. Its **age** never exceeds about $180\ \mathrm{Myr}$, against four billion for the continents, and its **heat flow** is high and noisy at ridges and falls off as the inverse square root of age, exactly as a cooling half-space predicts.

::: example How thick is a plate? {#ex-litho}
Oceanic lithosphere grows by conductive cooling from below, and the depth of an isotherm after time $t$ is $x = 2\sqrt{\kappa t/\pi}$. With $\kappa = 10^{-6}\ \mathrm{m^2\,s^{-1}}$, find the thickness of lithosphere $1$, $60$ and $180\ \mathrm{Myr}$ old, taking the base of the lithosphere as the $1300\ ^\circ\mathrm{C}$ isotherm.
::: solution
$$
x = 2\sqrt{\frac{10^{-6}\,t}{\pi}} = \{6,\ 49,\ 85\}\ \mathrm{km} \quad \text{for } t = \{1,\ 60,\ 180\}\ \mathrm{Myr}.
$$
The observed thickness of oceanic lithosphere, from the depth of earthquakes, from the bending rigidity of plates at trenches and from seismic tomography, is $70$–$100\ \mathrm{km}$ under old ocean and a few kilometres under a ridge: the model is right to within the uncertainty in $\kappa$ and in the definition of the base. The same $\sqrt{t}$ law predicts the depth of the sea floor, which deepens from about $2500\ \mathrm{m}$ at the ridge to $5000\ \mathrm{m}$ at $180\ \mathrm{Myr}$ because the cooling lithosphere is denser, and it predicts the age-dependence of heat flow. Three independent observations — thickness, depth, heat flow — from one conduction solution.
:::
:::

## The geometry of a broken shell

::: definition Plates, lithosphere, boundaries {#def-plates}
The **lithosphere** is the rigid outer layer — crust plus the uppermost mantle — and is broken into about fifteen **plates** that move relative to one another on the weaker asthenosphere below. Where plates meet is a **plate boundary**, and there are only three kinds: **divergent** (a ridge, where new lithosphere is made), **convergent** (a subduction zone or a collision, where lithosphere is destroyed or crumpled), and **transform** (a fault, where lithosphere is conserved and slides past). The areas of the plates are constant to first order: creation and destruction balance, which is why the Earth's radius has not changed measurably in a hundred million years.
:::

::: svg
caption: The three kinds of plate boundary, drawn at the same scale. Divergent boundaries are ridges with shallow, small earthquakes and high heat flow; convergent boundaries are trenches with a Wadati–Benioff zone of earthquakes dipping into the mantle and a volcanic arc $100$–$200\ \mathrm{km}$ behind the trench; transform boundaries conserve area and have shallow, strike-slip earthquakes. Note that only the convergent boundary destroys lithosphere, and only the divergent boundary makes it.
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The three plate boundary types in cross-section">
  <style>
    .mantle { fill: var(--warm-wash); }
    .crust { fill: var(--deemph); stroke: var(--rule-2); stroke-width: 1; }
    .ocean { fill: var(--info-wash); }
    .melt { fill: var(--series-2); }
    .q { fill: var(--series-1); }
    .arrow { stroke: var(--ink); stroke-width: 2.2; fill: none; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
    .div { stroke: var(--ink-2); stroke-width: 1.2; }
  </style>
  <rect class="mantle" x="0" y="120" width="760" height="180"/>
  <!-- panel 1: ridge -->
  <g>
    <rect class="ocean" x="10" y="96" width="230" height="30"/>
    <path class="crust" d="M10,120 L240,120 L240,140 L10,140 Z"/>
    <path class="melt" d="M118,120 L132,120 L128,175 L122,175 Z"/>
    <path class="crust" d="M10,120 L118,120 L112,132 L10,132 Z"/>
    <path class="crust" d="M132,120 L240,120 L240,132 L138,132 Z"/>
    <path class="q" d="M125,96 L131,84 L137,96 Z"/>
    <path class="arrow" d="M60,108 L28,108 M190,108 L222,108"/>
    <text class="lab" x="24" y="76">divergent: ridge</text>
    <text class="sub" x="24" y="200">shallow quakes, high heat flow,</text>
    <text class="sub" x="24" y="216">basalt and gabbro, no andesite</text>
  </g>
  <!-- panel 2: subduction -->
  <g transform="translate(260,0)">
    <rect class="ocean" x="10" y="96" width="230" height="30"/>
    <path class="crust" d="M10,120 L150,120 L150,140 L10,140 Z"/>
    <path class="crust" d="M150,126 Q200,150 250,215 L215,230 Q175,170 140,140 Z"/>
    <path class="crust" d="M150,120 L240,120 L240,175 L170,175 Z"/>
    <path class="melt" d="M196,150 Q206,140 214,152 Q206,160 196,150 Z"/>
    <path class="melt" d="M204,120 L212,120 L210,150 L206,150 Z"/>
    <path class="q" d="M200,96 L208,80 L216,96 Z"/>
    <circle class="q" cx="170" cy="160" r="2.4"/><circle class="q" cx="185" cy="180" r="2.4"/>
    <circle class="q" cx="200" cy="200" r="2.4"/><circle class="q" cx="215" cy="220" r="2.4"/>
    <path class="arrow" d="M60,108 L92,108"/>
    <text class="lab" x="24" y="76">convergent: subduction</text>
    <text class="sub" x="24" y="252">deep quakes to 660 km, arc,</text>
    <text class="sub" x="24" y="268">trench, accretionary prism</text>
  </g>
  <!-- panel 3: transform -->
  <g transform="translate(520,0)">
    <rect class="ocean" x="10" y="96" width="220" height="30"/>
    <path class="crust" d="M10,120 L230,120 L230,140 L10,140 Z"/>
    <line class="div" x1="120" y1="96" x2="120" y2="140"/>
    <path class="arrow" d="M60,112 L30,112"/>
    <path class="arrow" d="M180,112 L210,112"/>
    <circle class="q" cx="120" cy="128" r="3"/>
    <text class="lab" x="24" y="76">transform</text>
    <text class="sub" x="24" y="200">shallow strike-slip quakes,</text>
    <text class="sub" x="24" y="216">no magmatism, no volcanism</text>
  </g>
</svg>
:::

::: proposition Transform faults offset ridges in the direction of spreading, and only between the ridges {#prop-transform}
Where a ridge is offset by a fault, the fault is active only on the short segment between the two ridge segments; beyond the offsets the two sides move together and the structure is a *fracture zone*, an inactive scar. The active segment therefore tells you the spreading direction, and the offset distance times the spreading rate gives the age difference between the two ridge segments.
:::

::: proof
Let the ridge run north–south on each of two blocks, offset eastward, with spreading at speed $v$ away from each ridge segment. Consider a point on the fault between the two ridge segments: the crust on the west is moving west away from the eastern ridge, and the crust on the east is moving east away from the western ridge, so the two sides slide past one another at $2v$ — the fault is active. Now consider a point on the same line *outside* the two ridge segments: both sides are crust born at the same ridge segment, moving in the same direction at the same speed, so there is no relative motion and no fault activity. The line of the offset continues as a linear scar in the sea floor — a fracture zone — which is exactly what the sea-floor maps show, and which is how J. Tuzo Wilson identified transform faults in 1965. ∎
:::

::: svg
caption: A ridge offset by a transform fault. The arrows show the direction of spreading, away from each ridge segment. Between the two segments the crust on either side of the fault moves in opposite directions, so the fault is seismically active; beyond the segments both sides move the same way, and the structure survives only as a fracture zone, a topographic scar that records the past offset. The active length is $L$; the offset is $d$, and the age difference across the ridge axis is $d/v$.
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ridge offset by a transform fault with fracture zones">
  <style>
    .sea { fill: var(--info-wash); }
    .ridge { stroke: var(--series-2); stroke-width: 6; stroke-linecap: round; }
    .act { stroke: var(--bad); stroke-width: 3.4; }
    .fz { stroke: var(--ink-3); stroke-width: 2; stroke-dasharray: 8 5; }
    .arw { stroke: var(--ink); stroke-width: 2.2; fill: none; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11.5px; }
  </style>
  <rect class="sea" x="0" y="0" width="760" height="300"/>
  <line class="ridge" x1="300" y1="30" x2="300" y2="110"/>
  <line class="ridge" x1="460" y1="190" x2="460" y2="270"/>
  <line class="act" x1="300" y1="110" x2="460" y2="110"/>
  <line class="act" x1="300" y1="190" x2="460" y2="190"/>
  <line class="fz" x1="60" y1="110" x2="300" y2="110"/>
  <line class="fz" x1="60" y1="190" x2="300" y2="190"/>
  <line class="fz" x1="460" y1="110" x2="700" y2="110"/>
  <line class="fz" x1="460" y1="190" x2="700" y2="190"/>
  <path class="arw" d="M300,60 L250,60 M300,60 L350,60"/>
  <path class="arw" d="M460,235 L410,235 M460,235 L510,235"/>
  <path class="arw" d="M330,103 L370,103 M430,197 L390,197"/>
  <text class="lab" x="312" y="46">ridge segment</text>
  <text class="lab" x="472" y="262">ridge segment</text>
  <text class="lab" x="316" y="152" style="fill: var(--bad)">active transform</text>
  <text class="sub" x="72" y="102">fracture zone (inactive)</text>
  <text class="sub" x="512" y="206">fracture zone (inactive)</text>
  <text class="sub" x="300" y="290">offset d between the two ridge axes; active length L</text>
</svg>
:::

::: quiz
A transform fault cuts a continental margin, and a chain of volcanic seamounts lies along its extension, ages increasing away from a ridge. What is the mechanism of the volcanism?
- [ ] Subduction of the plate beneath the transform.
- [x] A hotspot: a relatively fixed plume of melting in the plate's interior, over which the plate moves, leaving an age-progressive chain.
- [ ] Extensional melting along the transform.
- [ ] The transform taps the asthenosphere directly.
::: solution
Age-progressive chains that extend away from a ridge along a plate, with no trench and no spreading centre, are the classic signature of a hotspot track — Hawaii–Emperor, the Louisville ridge, the Walvis ridge. Transforms do not make melting by themselves (they conserve area and there is no pressure release), and there is no subducting slab to flux the source. The qualification "relatively fixed" matters: some hotspot tracks bend because the plume itself moved, which is why the bend in the Hawaiian–Emperor chain at $47\ \mathrm{Ma}$ is debated rather than simply read as a change in plate motion.
:::
:::

::: example Plate circuits: adding velocities {#ex-circuit}
The Pacific plate moves $5.2\ \mathrm{cm\,yr^{-1}}$ relative to North America along the San Andreas, and North America moves $2.2\ \mathrm{cm\,yr^{-1}}$ relative to Europe at the Mid-Atlantic Ridge. If the two motions are parallel, what is the Pacific–Europe velocity? A second measurement gives the Pacific–Australia relative velocity as $6.5\ \mathrm{cm\,yr^{-1}}$; if Australia–Europe is $6.7\ \mathrm{cm\,yr^{-1}}$, are the Pacific, Australian and European motions consistent with a rigid Earth?
::: solution
Velocities add around a closed circuit, so with parallel motion the Pacific–Europe velocity is $5.2 + 2.2 = 7.4\ \mathrm{cm\,yr^{-1}}$.

For the second part, the three relative velocities of three rigid plates must close as vectors: $\mathbf{v}_{\text{Pa–Au}} + \mathbf{v}_{\text{Au–Eu}} + \mathbf{v}_{\text{Eu–Pa}} = 0$. Taking magnitudes, $|6.5 - 6.7| \le 7.4$ and $6.5 + 6.7 \ge 7.4$, so a triangle exists — but only if the directions work out, and the corresponding angle between the Pacific–Australia and Australia–Europe motions is fixed by the cosine rule. Doing that arithmetic for the whole global network, and finding that it closes to within the measurement errors, is what "plate tectonics is a rigid-plate model" means operationally. When a circuit does not close — and several do not, notably in the western Pacific before the Philippine Sea was included — the mismatch is not a measurement error but evidence for an extra, unrecognised microplate or for distributed deformation inside a "plate" ([[geophysics/palaeomagnetism]]).
:::
:::

## What drives the plates

::: proposition The forces, and their sizes {#prop-forces}
Three body and surface forces act on a plate. **Ridge push** is the horizontal gradient in gravitational potential energy of a lithosphere that is thick and cold away from the ridge; for a lithosphere of thickness $L$ with a thermal expansion coefficient $\alpha$ and a temperature difference $T$ it is of order
$$
F_\text{rp} \sim \tfrac{1}{2}\,\rho_m g\,\alpha T L^2 \approx 2\times10^{12}\ \mathrm{N\,m^{-1}} .
$$
**Slab pull** is the negative buoyancy of a cold, subducting slab, of order
$$
F_\text{sp} \sim \tfrac{1}{2}\,\Delta\rho\, g\, \ell^2 \sim 10^{13}\ \mathrm{N\,m^{-1}}
$$
for a slab of length $\ell \sim 600\ \mathrm{km}$ and density excess $\Delta\rho \sim 30$–$50\ \mathrm{kg\,m^{-3}}$. **Basal drag** from mantle flow acts either way and is of the same order as ridge push. Slab pull is the largest, which is why the plates with the longest subducting margins — the Pacific plates — move fastest.
:::

::: proof
Ridge push is the excess of the lithostatic force on the thick, cold edge of a plate over that on the thin, hot ridge. Model the lithosphere as a surface sheet whose base deepens as $\sqrt{t}$ and whose density excess is $\Delta\rho = \rho_m \alpha T$ at the base and zero at the top; integrating the horizontal stress over depth for a uniform gradient gives a force per unit length of ridge $\tfrac{1}{2}\rho_m g \alpha T L^2$, where $L$ is the lithosphere thickness. With $\rho_m = 3300\ \mathrm{kg\,m^{-3}}$, $\alpha = 3.2\times10^{-5}\ \mathrm{K^{-1}}$, $T = 1330\ \mathrm{K}$ and $L = 60\ \mathrm{km}$ this is $2.5\times10^{12}\ \mathrm{N\,m^{-1}}$.

Slab pull follows the same argument applied to a dense body: the vertical force per unit volume is $\Delta\rho g$, and integrating the horizontal component along a dipping slab of length $\ell$ gives $\tfrac{1}{2}\Delta\rho g \ell^2$; for $\Delta\rho = 50\ \mathrm{kg\,m^{-3}}$ and $\ell = 600\ \mathrm{km}$, $8.8\times10^{13}\ \mathrm{N\,m^{-1}}$. Both estimates are order-of-magnitude, and both are large compared with the strength of the crust, which is why plates move at all. ∎
:::

The consequence is a hierarchy that explains the observed velocities: the fastest plates (Pacific, Nazca, Cocos, $7$–$15\ \mathrm{cm\,yr^{-1}}$) are bounded mostly by trenches and carry old, dense, subducting lithosphere; the slowest (Atlantic plates, $1$–$2.5\ \mathrm{cm\,yr^{-1}}$) are pushed by ridges alone. The global balance is measurable: the total moment released by earthquakes, plus the moment released by stable creep, equals the moment required by the observed plate motions to within the errors — the 1960s test that turned the description into a dynamics.

::: example The moment budget of a fault {#ex-momentbudget}
The San Andreas system accommodates about $3.5\ \mathrm{cm\,yr^{-1}}$ of Pacific–North America motion across a zone $1000\ \mathrm{km}$ long and locked to $15\ \mathrm{km}$. Take $\mu = 30\ \mathrm{GPa}$. Find the tectonic moment rate, and the magnitude of a single earthquake per year that would release it.
::: solution
$$
\dot M_0 = \mu A v = 3\times10^{10}\times(10^{6}\times1.5\times10^{4})\times3.5\times10^{-2} = 1.6\times10^{19}\ \mathrm{N\,m\,yr^{-1}} .
$$
A single earthquake of moment $M_0$ has magnitude $M_\text{w} = \tfrac{2}{3}(\log_{10} M_0 - 9.1)$, so releasing the whole annual budget in one event would require $M_\text{w} = 7.3$. In fact the system produces great earthquakes only rarely — the last on the southern segment was 1857, on the northern segment 1906 — which means strain is accumulating and the "moment deficit" is growing. Roughly a third of the budget is released aseismically by creep on the central section, and the rest is the seismic hazard of two cities. This is the arithmetic behind every seismic-hazard estimate: measure the geodetic slip rate, compute the moment rate, and ask what fraction the historical catalogue accounts for ([[natural-hazards/earthquake-hazard]], [[geophysics/earthquake-sources]]).
:::
:::

## The cycle, and why it is a cycle

Lithosphere is made at ridges and destroyed at trenches, so the surface must be in steady state; but the *pattern* is not. Continents, being too buoyant to subduct, accumulate and are periodically gathered into a supercontinent and pulled apart again — the **Wilson cycle**, on a timescale of some $300$–$600\ \mathrm{Myr}$. The assembled supercontinents recognised in the rock record are Nuna (Columbia) around $1.8$–$1.5\ \mathrm{Ga}$, Rodinia around $1.1$–$0.9\ \mathrm{Ga}$ and Pangea from about $335$ to $175\ \mathrm{Ma}$.

The physics of the cycle is a competition between insulation and strength. A supercontinent insulates the mantle beneath it, so heat builds, the lithosphere weakens and domes, and a rift system begins — the East African Rift is the process starting, and the Atlantic Ocean is the process finished. Once a slab begins to sink at the new margin, slab pull takes over and the continent tears apart faster than the ridge push that started it. Continents therefore end up at the edges of the ocean that opens between them, which is why the oldest crust on Earth — the Archaean shields of Canada, Siberia, Western Australia and Africa — sits in the middle of continents that were once in the middle of Pangea.

::: history
The sequence of discoveries is worth knowing by date, because it is the best case study in the sociology of science that geology offers. Wegener presented continental drift to the Geologische Vereinigung on 6 January 1912 and published *Die Entstehung der Kontinente und Ozeane* in 1915; the 1924 American debate at the New York Academy of Sciences was a rout, decided by the absence of a mechanism. Arthur Holmes proposed mantle convection as that mechanism in 1928–1931, and it was ignored for forty years. Harry Hess, a Princeton petrologist and naval reserve officer, wrote the seafloor-spreading hypothesis in 1961–1962 as a "paper to be smiled at, laughed off and forgotten", having first noticed flat-topped seamounts (guyots) while sonar-sounding the Pacific in 1953; Robert Dietz published a similar idea independently in the same year. Ronald Mason and Drummond Matthews, and independently Lawrence Morley, found the symmetric magnetic pattern in 1961–1963; Fred Vine was a twenty-four-year-old graduate student. In 1965 Wilson defined transform faults; in 1967 W. Jason Morgan and, separately, Dan McKenzie and Robert Parker expressed plate motion as rotations on a sphere and computed the first global model; in 1968 Isacks, Oliver and Sykes put the mechanics together. Six years from a towed magnetometer to a unified theory of the solid Earth.
:::

## Where this leads

Plate geometry is used quantitatively in [[geophysics/palaeomagnetism]], where apparent polar wander and magnetic anomalies give the rotations directly, and in [[structural-geology/rifts]] and [[structural-geology/orogens]], which are the products of the two boundary types. The volcanoes and earthquakes of the previous two chapters are read as boundary phenomena in [[physical-geology/volcanoes]] and [[physical-geology/earthquakes]]; the thermal model of [[#ex-litho]] is the basis of [[geophysics/heat-flow]]; and the consequences for climate and ocean chemistry, from the closure of the Central American seaway to the monsoon, run through [[palaeoclimate/deep-time]].

::: summary Key takeaways
- Continental drift was rejected for the right reason (no mechanism) and accepted for a better one (the sea floor is young and it records the field).
- Magnetic anomalies give spreading rates directly: distance to a chron of known age is rate times age, and the symmetry of the pattern is the proof that the sea floor spreads.
- The sea floor is never older than about $180\ \mathrm{Myr}$, its depth, thickness and heat flow all follow the same $\sqrt{t}$ cooling law, and its age structure is why the oldest rocks on Earth are continental.
- There are three kinds of plate boundary and they conserve, create or destroy area; transform faults are active only between ridge segments, which is how a fault's strike records a spreading direction.
- Slab pull, of order $10^{13}\ \mathrm{N\,m^{-1}}$, exceeds ridge push, of order $10^{12}\ \mathrm{N\,m^{-1}}$; fast plates are pulled, slow plates are pushed.
- The moment budget of a fault is measurable two ways — geodesy and seismology — and the difference is the hazard.
- Supercontinents insulate, weaken and split: the Wilson cycle is a consequence of continents being too buoyant to subduct.
- Plate tectonics was settled between 1961 and 1968 by ships, magnetometers and spherical geometry, not by a new field programme.
:::

## Exercises

::: exercise Spreading rate from an anomaly {level=1 check="2.5"}
On the Mid-Atlantic Ridge at $30^\circ\mathrm{N}$ the chron 2 anomaly, of age $2.6\ \mathrm{Ma}$, lies $32\ \mathrm{km}$ from the axis. Find the full spreading rate in $\mathrm{cm\,yr^{-1}}$.
::: solution
Half-rate $= 3.2\times10^{4}/2.6\times10^{6} = 1.23\ \mathrm{cm\,yr^{-1}}$, so the full rate is $2.5\ \mathrm{cm\,yr^{-1}}$. This is a typical slow ridge; the ridge axis there is faulted into oceanic core complexes, which is one of the ways slow spreading differs from fast.
:::
:::

::: exercise Age of the Atlantic {level=1 check="190"}
The Atlantic is $4800\ \mathrm{km}$ wide at $30^\circ\mathrm{N}$ and spreading at $2.5\ \mathrm{cm\,yr^{-1}}$. How long has it been opening, and what is the age of the oldest sediment there expected to be?
::: solution
$t = 4.8\times10^{6}/2.5\times10^{-2} = 1.9\times10^{8}\ \mathrm{yr}$, about $190\ \mathrm{Myr}$. The oldest oceanic crust in the North Atlantic is in fact about $175$–$180\ \mathrm{Ma}$, Early Jurassic, and the oldest sediment on it is only slightly younger. The small discrepancy is informative: it means the average rate since rifting was slightly *higher* than today's, and the distance–age curve of the Atlantic is indeed steeper near the continent than at the ridge.
:::
:::

::: exercise Transform geometry {level=1 check="4"}
A ridge is offset by $80\ \mathrm{km}$ and spreads at a full rate of $4\ \mathrm{cm\,yr^{-1}}$. What is the age difference between the crust on the two sides of the active transform, measured at equal distance from the nearest ridge segment?
::: solution
Crust formed at the same time on both flanks of one ridge segment is offset along the transform; the crust on the far side of the offset formed at the other segment, $d/v_\text{half}$ earlier or later. With a half-rate of $2\ \mathrm{cm\,yr^{-1}}$, the age difference is $8\times10^{4}/(2\times10^{-2}) = 4\times10^{6}\ \mathrm{yr}$, i.e. $4\ \mathrm{Myr}$. (Enter in Myr.)
:::
:::

::: exercise Rotation poles {level=2 check="0.48"}
A ridge segment $3000\ \mathrm{km}$ from its rotation pole spreads at a half-rate of $2.5\ \mathrm{cm\,yr^{-1}}$. Find the angular velocity in degrees per million years, and the half-rate $1000\ \mathrm{km}$ closer to the pole.
::: solution
For rigid rotation, $v = \omega r$ with $r$ the distance to the pole along the great circle, so
$$
\omega = \frac{2.5\times10^{-2}}{3\times10^{6}} = 8.3\times10^{-9}\ \mathrm{rad\,yr^{-1}} = 0.48\ \mathrm{deg\,Myr^{-1}} .
$$
At $r = 2000\ \mathrm{km}$ the half-rate is $2.5\times(2000/3000) = 1.7\ \mathrm{cm\,yr^{-1}}$. This is why a single ridge has a systematic gradient in spreading rate from one end to the other, and why reading a rate from one place and applying it to another is a standard error.
:::
:::

::: exercise Forces on a plate {level=2 check="35"}
By what factor does slab pull exceed ridge push for a slab of length $600\ \mathrm{km}$ with $\Delta\rho = 50\ \mathrm{kg\,m^{-3}}$, against a plate with $L = 60\ \mathrm{km}$, $\alpha = 3.2\times10^{-5}\ \mathrm{K^{-1}}$, $T = 1330\ \mathrm{K}$ and $\rho_m = 3300\ \mathrm{kg\,m^{-3}}$?
::: solution
$F_\text{sp} = \tfrac{1}{2}\times50\times9.81\times(6\times10^{5})^2 = 8.8\times10^{13}$ and $F_\text{rp} = \tfrac{1}{2}\times3300\times9.81\times3.2\times10^{-5}\times1330\times(6\times10^{4})^2 = 2.5\times10^{12}\ \mathrm{N\,m^{-1}}$. The ratio is $35$.

The caveat that matters: these are upper estimates of the driving forces, and neither is what actually accelerates a plate, because both are largely balanced by basal drag. The point of the comparison is not that slabs are thirty-five times more important in some absolute sense, but that a plate's velocity is set by the *balance* of the two, and that adding a long subducting margin changes the balance far more than making the ridge hotter does.
:::
:::

::: exercise Cooling and sea-floor depth {level=2 check="3859"}
Sea-floor depth follows the half-space cooling model as $d = d_0 + c\sqrt{t}$, with $d_0 = 2600\ \mathrm{m}$ at the ridge and $c = 350\ \mathrm{m\,Myr^{-1/2}}$. Find the modelled depth at $60\ \mathrm{Myr}$ and at $180\ \mathrm{Myr}$. (Enter the $60\ \mathrm{Myr}$ depth in metres.)
::: solution
$d(60) = 2600 + 350\sqrt{60} = 3859\ \mathrm{m}$, and $d(180) = 2600 + 350\sqrt{180} = 7296\ \mathrm{m}$.

The first number is right and the second is absurd — the abyssal plains are $4000$–$5500\ \mathrm{m}$ deep, never $7300\ \mathrm{m}$ outside a trench — and the failure is instructive. The half-space model assumes a semi-infinite half-space that can cool for ever, whereas real lithosphere has a lower boundary across which heat is supplied, so cooling and subsidence slow at old age. The replacement is the *plate model*, in which the lithosphere has a fixed thickness and asymptotes to a constant depth, and the two models are joined at $60$–$80\ \mathrm{Myr}$. That is why the Pacific floor near a ridge is a steeply deepening slope of abyssal hills and the far Pacific is a plain: the $\sqrt{t}$ law is a law of young ocean.
:::
:::

::: exercise Deriving the anomaly pattern {level=3}
A ridge spreads symmetrically at a full rate $v$, and the field reverses instantaneously. Write the magnetic lineation as a function of distance $x$ from the axis and time, and show that the wavelength of a chron of duration $\Delta t$ is $v\Delta t$. A chron of duration $0.2\ \mathrm{Myr}$ is observed as a pair of anomalies $12\ \mathrm{km}$ apart on one flank and $48\ \mathrm{km}$ apart on another ridge. What are the two rates?
::: solution
Crust now at distance $x$ formed at $t = x/v_\text{half}$, so the polarity at $x$ is $s(x) = s_0(x/v_\text{half})$, where $s_0(t)$ is the polarity sequence of the field. A chron of duration $\Delta t$ occupies a distance $\Delta x = v_\text{half}\Delta t$ on each flank, so the distance between the two flanks' expressions of the same chron is $2v_\text{half}\Delta t = v\Delta t$.

With $v\Delta t = 12\ \mathrm{km}$ and $\Delta t = 0.2\ \mathrm{Myr}$: $v = 6\ \mathrm{cm\,yr^{-1}}$. With $48\ \mathrm{km}$: $v = 24\ \mathrm{cm\,yr^{-1}}$, faster than any ridge today — which is the standard way the Cretaceous Pacific spreading rates, twice today's, are measured. The exercise also shows the trap: if you do not know $\Delta t$ independently, the anomaly spacing alone gives only ratios, and the absolute timescale must come from dated lavas on land.
:::
:::

::: exercise A plate-tectonic energy budget {level=3}
The total seismic moment release of the Earth is about $5\times10^{22}\ \mathrm{N\,m\,yr^{-1}}$, and the total plate-boundary length across which plates slip is about $7\times10^{7}\ \mathrm{m}$ with a typical relative velocity of $3\ \mathrm{cm\,yr^{-1}}$. Estimate the tectonic moment rate $\dot M_\text{tec} = \mu L w v$ for a seismogenic width $w = 20\ \mathrm{km}$ and $\mu = 30\ \mathrm{GPa}$, compare with the seismic release, and interpret the ratio.
::: solution
$$
\dot M_\text{tec} = 3\times10^{10}\times7\times10^{7}\times2\times10^{4}\times3\times10^{-2} = 1.3\times10^{23}\ \mathrm{N\,m\,yr^{-1}} .
$$
The seismic catalogue accounts for about $40\%$ of it. The remainder is released by aseismic creep on faults, by subduction-interface slip that never ruptures dynamically (the slow-slip and tremor events now detected by geodesy), by distributed intraplate deformation, and by the fact that the catalogue covers a century against geological timescales of $10^5$–$10^6$ years and misses the very largest events of the cycle.

The comparison is the quantitative foundation of seismic hazard: if the two numbers agree over a few hundred thousand years, then the geodetic moment rate tells you the long-term earthquake rate, and any region where the observed seismicity is far below the geodetic rate is storing elastic strain. That is the argument used for the Himalaya, for the Cascades and for the Mediterranean, and it is a prediction of plate tectonics that can be tested with a GPS receiver ([[natural-hazards/risk]]).
:::
:::

::: exercise Reconstructing an ocean {level=3}
Two continental margins face each other across an ocean. Magnetic anomalies give ages of $120$, $90$, $60$ and $20\ \mathrm{Ma}$ at distances of $2400$, $1800$, $1200$ and $400\ \mathrm{km}$ from the axis on one flank. Plot or describe the spreading history, and say when the ocean began to open and whether the rate changed.
::: solution
Distance against age is a straight line through the origin if the rate is constant: $2400/120 = 20$, $1800/90 = 20$, $1200/60 = 20$, $400/20 = 20\ \mathrm{km\,Myr^{-1}}$, i.e. a half-rate of $2.0\ \mathrm{cm\,yr^{-1}}$ and a full rate of $4\ \mathrm{cm\,yr^{-1}}$, constant for $120\ \mathrm{Myr}$. Extrapolating to zero distance gives an opening age of about $120\ \mathrm{Ma}$, Early Cretaceous, and the oldest sediment on the oceanic crust should be only slightly older than the crust at the continent–ocean boundary.

In real data the line is never this straight: an early fast phase (a "vital window" of rapid spreading in the first $20\ \mathrm{Myr}$) is common, and a bend in the distance–age plot records a change in rate that can be matched against the conjugate margin and against the plate circuit. The extrapolated intercept, not the present rate, is the age of rifting — which is why the timing of the opening of the South Atlantic is argued from the oldest crust nearest the continent, not from the ridge today.
:::
:::
