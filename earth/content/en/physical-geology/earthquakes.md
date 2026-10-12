On the morning of All Saints' Day, 1 November 1755, the great churches of Lisbon were full. At about 09:40 the ground shook violently for, by the best accounts, three to six minutes; walls cracked and fell; the chimneys came down into the hearths and set the timber houses alight; and those who fled to the quay, reasoning correctly that open ground was safer than a building, watched the sea withdraw a kilometre or more and then return as waves that drowned them. Three days of fire followed. The death toll in a city of perhaps 230,000–270,000 is usually put at 30,000–50,000.

The earthquake created seismology as a subject almost overnight — the Marquis of Pombal circulated a questionnaire to every parish asking how long the shaking lasted, which way the buildings fell and whether the sea moved, which is a felt-intensity survey in all but the name — and it created the problem that this chapter is about. Lisbon was nowhere near a plate boundary as we now draw them; the fault was a hundred kilometres offshore; and the city had been built as a Renaissance capital on soft river sediments. Three centuries later we can compute the magnitude of that earthquake from its tsunami and its intensities, and we can say which of those three factors killed whom. Earthquake science is the study of a source we cannot see, in rocks we cannot reach, on a timescale we cannot observe directly, and its first principle is that everything we know comes from ground motion.

## The source: a fault that sticks and slips

::: definition Hypocentre, epicentre, strike, dip, rake {#def-quake-geometry}
The **hypocentre** (focus) is the point where rupture begins; the **epicentre** is its projection on the surface; the **focal depth** is the depth of the hypocentre. A fault plane is oriented by its **strike** (the compass direction of a horizontal line in it), its **dip** (the angle it makes with the horizontal) and the **rake** of the slip (the angle of the slip vector below the strike line, measured in the fault plane). The **rupture area** $A$ is the surface that actually slipped, and the **average slip** $D$ is the displacement across it.
:::

::: proposition Elastic rebound: an earthquake is the failure of a locked fault, not the creation of a new one {#prop-rebound}
Where two blocks slide past one another on a fault that is locked by friction, strain accumulates in the surrounding rock at the geodetic rate. When the shear stress on the fault exceeds the frictional strength, the fault fails, the rock rebounds elastically, and the elastic strain energy released appears as heat, as fracture energy and, a few per cent of it, as seismic waves. The 1906 San Francisco earthquake was the demonstration: geodetic surveys made before 1906 and repeated after it showed that the blocks on either side of the San Andreas had moved several metres *towards* their pre-1906 positions and then jumped.
:::

::: proof
The elastic strain energy per unit volume in shear is $u = \tau^2/(2\mu)$, where $\tau$ is the shear stress and $\mu$ the rigidity. If a fault at depth is locked, the far field continues to deform at the plate rate and the stress on the fault rises until $\tau = \tau_\text{friction}$; failure drops the stress to a residual value, and the stress drop $\Delta\tau$ is released over the rupture area $A$ and the slip $D$.

The work done is the average of the initial and final stress times the slip times the area, so the available energy is
$$
E \approx \tfrac{1}{2}\,\Delta\tau\, D\, A .
$$
For a typical crustal earthquake $\Delta\tau \sim 1$–$10\ \mathrm{MPa}$, $D \sim 1\ \mathrm{m}$, $A \sim 10^{9}\ \mathrm{m^2}$, giving $E \sim 10^{15}\ \mathrm{J}$, of which only a few per cent leaves as seismic waves — the rest heats the fault and breaks rock. That the observed radiated energy is a small fraction of the available energy is the reason the mechanism is credible: a frictional slip converts most of its energy to frictional heat, and only a small part to the waves we record. ∎
:::

::: example The energy of a magnitude 7 earthquake {#ex-energy}
An earthquake ruptures an area $1000\ \mathrm{km^2}$ with an average slip of $2\ \mathrm{m}$ and a stress drop of $3\ \mathrm{MPa}$. Take $\mu = 30\ \mathrm{GPa}$. Find the seismic moment, the moment magnitude, the available energy, and the radiated energy if the apparent stress is $1.5\ \mathrm{MPa}$.
::: solution
$$
M_0 = \mu A D = 3\times10^{10}\times10^{9}\times2 = 6\times10^{19}\ \mathrm{N\,m},
$$
$$
M_\text{w} = \tfrac{2}{3}\left(\log_{10}M_0 - 9.1\right) = \tfrac{2}{3}(19.78-9.1) = 7.1 .
$$
Available energy $\tfrac{1}{2}\Delta\tau D A = 0.5\times3\times10^{6}\times2\times10^{9} = 3\times10^{15}\ \mathrm{J}$, about $700\ \mathrm{kt}$ of TNT. Radiated energy from the apparent stress,
$$
E_r = \frac{\sigma_a M_0}{\mu} = \frac{1.5\times10^{6}\times6\times10^{19}}{3\times10^{10}} = 3\times10^{15}\ \mathrm{J},
$$
which here equals the available energy — so an apparent stress of $1.5\ \mathrm{MPa}$ implies a stress drop of about $3\ \mathrm{MPa}$ and near-complete stress release. Real earthquakes have $E_r/M_0$ corresponding to apparent stresses of $0.5$–$3\ \mathrm{MPa}$, and the ratio is used as a proxy for how efficiently an earthquake radiates, which matters for shaking and for tsunami generation.
:::
:::

## Waves: the only thing we can measure

::: definition Body waves and surface waves {#def-waves}
**P waves** (primary, compressional) are the fastest and arrive first; they are longitudinal and travel through solids and liquids. **S waves** (secondary, shear) are slower, transverse, and cannot travel through a fluid — which is how the liquid outer core was discovered ([[physical-geology/earth-interior]]). **Love waves** are horizontally polarised shear waves guided by a surface layer and are the most damaging to foundations; **Rayleigh waves** roll the ground in an ellipse and dominate the long-period motion that sways tall buildings. In the crust typical speeds are $V_P \approx 6\ \mathrm{km\,s^{-1}}$ and $V_S \approx 3.5\ \mathrm{km\,s^{-1}}$; in the upper mantle $8.0$ and $4.5\ \mathrm{km\,s^{-1}}$.
:::

::: example Locating an epicentre from one seismogram {#ex-locate}
A station records the P–S arrival-time difference as $8\ \mathrm{s}$. Taking $V_P = 6.0$ and $V_S = 3.5\ \mathrm{km\,s^{-1}}$, find the distance. How many stations are needed to locate the epicentre, and what does a fourth add?
::: solution
For a straight ray, $\Delta t = D/V_S - D/V_P = D(1/3.5 - 1/6.0) = D/8.4$, so
$$
D = 8.4\times8 = 67\ \mathrm{km}.
$$
The rule of thumb "eight kilometres per second of S–P time" is the crustal version of this arithmetic, and it is the reason a seismologist can point at a trace and name the distance.

One station gives a circle of possible epicentres; two give two intersections; **three** give a unique point, which is the classic classroom construction. A fourth station makes the problem over-determined and, more importantly, lets the *depth* and the origin time be solved as well, because with four unknowns ($x$, $y$, $z$, $t_0$) you need four arrival times. Modern networks use hundreds of stations and a velocity model, and locate a $M_\text{w}\ 6$ earthquake in seconds — fast enough that the first automated alerts reach cities before the damaging S waves arrive.
:::
:::

::: svg
caption: Why there are shadow zones. P waves are refracted towards the slower medium at the core–mantle boundary and are therefore deflected away from the band $103^\circ$–$142^\circ$ from the epicentre, where no direct P arrives; S waves are not transmitted into the liquid outer core at all, so no direct S is recorded beyond $103^\circ$. The existence, size and sharpness of these two zones are the original evidence for a core of radius $3480\ \mathrm{km}$, part of it liquid, and they were measured from records like those of the 1906 India and 1909 Zagreb earthquakes.
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seismic shadow zones in a cross-section of the Earth">
  <style>
    .mantle { fill: var(--accent-wash); stroke: var(--ink-2); stroke-width: 1.4; }
    .oc { fill: var(--info-wash); stroke: var(--ink-2); stroke-width: 1.2; }
    .ic { fill: var(--series-2); stroke: var(--ink-2); stroke-width: 1; }
    .ray { fill: none; stroke: var(--series-1); stroke-width: 1.6; }
    .sray { fill: none; stroke: var(--series-3); stroke-width: 1.6; stroke-dasharray: 6 4; }
    .sh { fill: var(--bad); opacity: 0.18; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
    .src { fill: var(--bad); }
  </style>
  <circle class="mantle" cx="240" cy="165" r="140"/>
  <circle class="oc" cx="240" cy="165" r="76"/>
  <circle class="ic" cx="240" cy="165" r="26"/>
  <circle class="src" cx="240" cy="25" r="5"/>
  <path class="ray" d="M240,25 Q200,90 175,140 Q160,165 150,190"/>
  <path class="ray" d="M240,25 Q250,110 232,150 Q225,175 210,205"/>
  <path class="sray" d="M240,25 Q215,80 200,110"/>
  <path class="sray" d="M240,25 Q262,85 272,118"/>
  <text class="sub" x="150" y="120">P refracted</text>
  <text class="sub" x="286" y="104">S stops at the core</text>
  <!-- shadow zone wedge on the right -->
  <path class="sh" d="M240,165 L600,60 A200,200 0 0 1 600,270 Z"/>
  <text class="lab" x="560" y="150">P shadow</text>
  <text class="sub" x="548" y="166">103°–142°</text>
  <text class="sub" x="548" y="182">no direct P or S</text>
  <text class="sub" x="150" y="300">core radius 3480 km; inner core 1220 km</text>
  <text class="sub" x="150" y="316">S is not transmitted into the liquid outer core</text>
</svg>
:::

## Magnitude, intensity, and the two ways to be big

::: definition Magnitude and intensity {#def-magnitude}
**Magnitude** measures the size of the source. The moment magnitude is defined from the seismic moment,
$$
M_\text{w} = \tfrac{2}{3}\left(\log_{10} M_0 - 9.1\right), \qquad M_0 = \mu A D,
$$
and is the only magnitude scale that does not saturate at large sizes. Richter's local magnitude $M_\text{L}$ was defined in 1935 for southern California earthquakes as $\log_{10}$ of the maximum trace amplitude in micrometres at $100\ \mathrm{km}$, corrected for distance. **Intensity** measures the *effect at a site*: the Modified Mercalli (MMI) and European Macroseismic scales run from I (not felt) to XII (total destruction), and depend on magnitude, distance, depth, geology and building stock. One earthquake has one magnitude and a thousand intensities.
:::

::: warning "A magnitude 9 earthquake is twice as big as a magnitude 8"
Magnitude is logarithmic in amplitude and, through the moment, in the size of the source: one magnitude unit is a factor of about $32$ in energy and a factor of $10$ in the product of rupture area and slip. A $M_\text{w}\ 9.0$ earthquake releases about a thousand times the energy of a $M_\text{w}\ 7.0$ — the difference between the 2010 Haiti earthquake ($M_\text{w}\ 7.0$, some 100,000–160,000 deaths) and the 2011 Tōhoku earthquake ($M_\text{w}\ 9.0$, ~22,000 deaths from the tsunami it generated). And because the *intensity* pattern also depends on depth, soil and construction, the two numbers are not interchangeable: Port-au-Prince was destroyed by a moderate, shallow, close earthquake, while a $M_\text{w}\ 8.0$ at the same depth under Japan's transport infrastructure would have killed far fewer people.
:::

::: example Comparing two earthquakes {#ex-compare}
The 2004 Sumatra earthquake had $M_\text{w}\ 9.1$ and the 2010 Haiti earthquake $M_\text{w}\ 7.0$. Find the ratio of seismic moments and of radiated energies, and, if Sumatra's rupture was $1300\ \mathrm{km}$ long by $200\ \mathrm{km}$ wide, the slip needed to give its moment.
::: solution
Moment scales as $10^{1.5\Delta M}$, so the ratio is $10^{1.5\times2.1} = 10^{3.15} \approx 1400$. Radiated energy scales similarly (about $10^{3.2}$), and the rule of thumb is a factor of $32$ in energy per magnitude unit, so two magnitudes is roughly a thousand.

For the slip, take $M_0 = 10^{(1.5\times9.1+9.1)} = 10^{22.75} = 5.6\times10^{22}\ \mathrm{N\,m}$ and $A = 2.6\times10^{11}\ \mathrm{m^2}$:
$$
D = \frac{M_0}{\mu A} = \frac{5.6\times10^{22}}{3\times10^{10}\times2.6\times10^{11}} = 7.2\ \mathrm{m}.
$$
Published estimates give $10$–$15\ \mathrm{m}$ of slip in the shallowest part and an average nearer $15\ \mathrm{m}$, so the arithmetic is low by a factor of two — which is exactly the effect of using $\mu = 30\ \mathrm{GPa}$ for a shallow, hot, partially saturated megathrust, where the effective rigidity is smaller. Getting the order right and knowing which assumption is soft is the whole skill.
:::
:::

::: widget plot
f: 8.3 - b*x
x: 4, 9.5
y: -1, 6
sliders: b=1:0.6:1.4:0.05
points: 7, 1.26; 8, 0.26
labels: log10 of the number per year
caption: The Gutenberg–Richter law, $\log_{10} N = a - bM$, for global seismicity with $a = 8.3$: about $18$ earthquakes of $M_\text{w} \ge 7$ a year (the marked point), $1.8$ of $M_\text{w} \ge 8$, and one of $M_\text{w} \ge 9$ every five or six years. The slope $b$ is the slider. Set $b = 0.8$ and read the number of $M \ge 8$ events: the same number of small earthquakes now implies *more* big ones, because a flatter distribution puts relatively more of the total in large events. Real $b$ values cluster near $1.0$ for global catalogues and fall to $0.6$–$0.8$ in some swarm and fluid-injection sequences, where the deviation is a genuine physical signal.
:::

## Where earthquakes are, and why it matters

The global distribution is the map that convinced the world: shallow earthquakes trace the mid-ocean ridges and the transform faults; shallow and deep earthquakes trace the circum-Pacific ring and the Alpide belt; and the interiors of plates are nearly quiet. Two features of that map carry all the mechanics.

The **Wadati–Benioff zone** — earthquakes dipping from a trench to depths of $600$–$700\ \mathrm{km}$, at angles of $10$–$75^\circ$ — is the subducting slab, seen by its own earthquakes. Below about $700\ \mathrm{km}$ earthquakes stop, which bounds the temperature and the rheology of the descending slab: at greater depth rock becomes ductile enough to deform without fracturing.

::: svg
caption: Earthquakes of a subduction system. The interface between the two plates ruptures in the great megathrust events, and its seismogenic zone — the patch shallow enough and cool enough to stick — is usually $80$–$150\ \mathrm{km}$ wide and ends where temperature exceeds about $350$–$450\ ^\circ\mathrm{C}$. Bending of the incoming plate produces outer-rise normal faulting; the descending slab produces deep events by dehydration embrittlement and, below about $300\ \mathrm{km}$, by transformational faulting of olivine polymorphs; and the overriding plate hosts shallow crustal earthquakes that can be larger and closer to cities than the megathrust itself.
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Subduction zone with the types of earthquake it produces">
  <style>
    .mantle { fill: var(--warm-wash); }
    .slab { fill: var(--deemph); stroke: var(--ink-2); stroke-width: 1.2; }
    .over { fill: var(--rule-2); stroke: var(--ink-2); stroke-width: 1; }
    .sea { fill: var(--info-wash); }
    .q { fill: var(--series-1); }
    .q2 { fill: var(--series-2); }
    .q3 { fill: var(--series-3); }
    .lab { fill: var(--ink); font-size: 12px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
    .arc { stroke: var(--bad); stroke-width: 2.4; fill: none; }
  </style>
  <rect class="sea" x="0" y="60" width="760" height="30"/>
  <rect class="mantle" x="0" y="90" width="760" height="230"/>
  <path class="slab" d="M0,90 L300,90 Q420,120 520,220 L600,320 L520,320 Q430,215 300,120 L0,120 Z"/>
  <path class="over" d="M300,90 L760,90 L760,200 Q600,190 480,150 Q380,120 300,110 Z"/>
  <path class="arc" d="M300,96 Q400,120 470,150"/>
  <circle class="q2" cx="330" cy="105" r="6"/><circle class="q2" cx="365" cy="115" r="5"/>
  <circle class="q2" cx="400" cy="128" r="5"/>
  <circle class="q" cx="150" cy="105" r="4"/><circle class="q" cx="200" cy="112" r="4"/>
  <circle class="q3" cx="470" cy="180" r="4"/><circle class="q3" cx="510" cy="215" r="4"/>
  <circle class="q3" cx="545" cy="250" r="4"/><circle class="q3" cx="575" cy="285" r="4"/>
  <circle class="q" cx="560" cy="130" r="5"/><circle class="q" cx="640" cy="140" r="4"/>
  <path class="q3" d="M600,90 L610,66 L620,90 Z"/>
  <text class="lab" x="60" y="80">outer-rise events</text>
  <text class="lab" x="300" y="80">megathrust (interface)</text>
  <text class="lab" x="470" y="300">Wadati–Benioff zone to 700 km</text>
  <text class="lab" x="560" y="52">arc volcano</text>
  <text class="sub" x="452" y="118">crustal events, upper plate</text>
  <text class="sub" x="300" y="316">depth axis: surface at top, ~600 km at bottom</text>
</svg>
:::

Intraplate earthquakes are the ones that surprise. The 1811–1812 New Madrid sequence in the central United States produced three $M_\text{w}\ 7$-class shocks that rang church bells in Boston, reversed the Mississippi for hours, and produced liquefaction features across $10^5\ \mathrm{km^2}$ — in the middle of a plate, far from any boundary. Stable continental interiors are not strong; they are merely quiet, and their earthquakes occur on ancient zones of weakness reactivated by far-field stresses from ridge push, from topography and from glacial-isostatic adjustment. Because old cratonic rock is cold, thick and brittle to great depth, the same magnitude produces a rupture area several times larger and ground shaking over an area several times larger again than at a plate boundary: this is why central and eastern North America, and northern Europe, have moderate seismicity with high hazard.

::: example How many large earthquakes, and how often? {#ex-return}
Take the Gutenberg–Richter law with $a = 8.3$ and $b = 1.0$ for the whole Earth. Find the expected number of $M_\text{w} \ge 8$ earthquakes in a century, and the probability that at least one $M_\text{w} \ge 9$ earthquake occurs in fifty years.
::: solution
$N(M \ge 8) = 10^{8.3-8} = 2.0\ \mathrm{yr^{-1}}$, so about $20$ in a century. For $M \ge 9$, $N = 10^{-0.7} = 0.20\ \mathrm{yr^{-1}}$, a mean recurrence of $5$ years globally; the probability of at least one in fifty years, treating the occurrences as a Poisson process, is
$$
P = 1 - e^{-0.20\times50} = 1 - e^{-10} \approx 1 .
$$
So a great earthquake within fifty years is a near-certainty *somewhere* — which is the point, and also the trap. The global rate tells you nothing about a particular fault; the useful number for a city is the rate on the fault that threatens it, and that comes from the palaeoseismic record of prehistoric surface ruptures, not from the instrumental catalogue, which covers a century against recurrence intervals of centuries to a millennium.
:::
:::

## Why earthquakes kill, and what changes the number

Ground motion is not a single number. What matters for a low building is the peak ground acceleration and its frequency content; for a tall building or a bridge pier, the velocity and the duration; for a slope or a saturated sand, the number of strong cycles. Four factors multiply or divide the damage at a given magnitude:

- **Depth.** A $M_\text{w}\ 7.0$ at $10\ \mathrm{km}$ depth shakes an area a tenth the size of the same event at $100\ \mathrm{km}$, with intensities several units higher at the centre.
- **Soil.** Soft sediment amplifies and prolongs shaking, and resonates. In the 1985 $M_\text{w}\ 8.0$ Michoacán earthquake, ground motion in the old lake-bed districts of Mexico City, $350\ \mathrm{km}$ from the fault, was amplified several times over the firm-rock hill zones, and its dominant period of about $2\ \mathrm{s}$ matched the natural period of 10–15-storey buildings; more than 400 buildings collapsed and estimates of the dead run to 10,000.
- **Construction.** This is the dominant term. The 2010 $M_\text{w}\ 7.0$ Haiti earthquake, with unreinforced masonry and a densely packed capital, killed perhaps 100,000–160,000 people; the 2010 $M_\text{w}\ 7.1$ Yushu earthquake in Qinghai, of comparable magnitude and much shallower, killed about 2,200 in a sparsely populated basin; and the 2011 $M_\text{w}\ 5.8$ Virginia earthquake, felt by tens of millions of people along the American east coast, killed none directly. The differences are in building stock, enforcement of codes, population density and the time of day, not in the physics of the source.
- **Time of day.** The 1976 Tangshan earthquake ($M_\text{w}\ 7.5$, industrial city, 03:42, brick construction) is one of the deadliest of the century, with official figures of 242,000 deaths and higher estimates; the 2023 $M_\text{w}\ 7.8$ and $7.5$ earthquakes in south-central Türkiye and northern Syria, also at night, killed more than 50,000 people.

::: application Liquefaction, and the cost of a soil type {#app-liquefaction}
Saturated, loose, ice-age sand and silt lose strength when shaken: the grains rearrange, pore pressure rises until the effective stress falls to near zero, and the soil behaves like a fluid. The evidence is unmistakable — sand-and-water craters in fields, ships in a harbour tilted upright in liquefied silt, buildings that sank rather than toppled. The engineering countermeasure is to remove the soil, to compact or grout it, or to bridge the weak layer with piles, and the reason it is affordable in some countries and not in others is not geology. Liquefaction also causes lateral spreading of slopes towards a free face, which is what broke the pipelines and the waterfront at Niigata in 1964 and again in the 2018 Christchurch earthquakes.
:::

::: quiz
Two earthquakes of the same magnitude occur at the same depth, one beneath a granitic highland at $60\ \mathrm{km}$ from a city and one beneath a sedimentary basin at $60\ \mathrm{km}$ from a city of the same size and building stock. Which is likely to cause more damage, and why?
- [ ] The one under the highland, because hard rock transmits higher frequencies.
- [x] The one under the basin, because the basin sediments amplify the ground motion, prolong the shaking and can liquefy.
- [ ] They would be the same, since magnitude and distance are equal.
- [ ] Impossible to say without knowing the fault type.
::: solution
Basin amplification is one of the best-documented effects in engineering seismology: thick soft sediments can multiply ground motion by factors of two to ten and lengthen the strong shaking, and they add liquefaction and lateral spreading to the list of hazards. Fault type matters for the radiation pattern and for the ratio of P to S energy, but it is a second-order effect compared with the site. This is why seismic microzonation maps — which are maps of soil, not of faults — are the most useful product of a hazard programme for a city planner.
:::
:::

::: history
The study of earthquakes began with questionnaires and ended with superconductors. After Lisbon in 1755 the Marquis of Pombal's survey gathered parish-by-parish observations of shaking, fire and sea behaviour, and the resulting account is the first macroseismic study; Immanuel Kant published one of the first theoretical papers on the cause the same year. John Milne at the Imperial College of Engineering in Tokyo built the first practical seismographs in the 1880s and, with the network of stations he established, produced the first epicre maps; the elastic-rebound theory came from Harry Fielding Reid's analysis, published in 1911, of the geodetic surveys across the San Andreas before and after 1906. Andrija Mohorovičić used the 1909 Zagreb earthquake to find the crust–mantle boundary; Beno Gutenberg and Charles Richter wrote the *Seismicity of the Earth* in 1941 and defined the magnitude scales still in use; Hiroo Kanamori replaced amplitude with moment in 1977, giving a magnitude that does not saturate. The instrumentation revolution of the 1990s — broadband digital sensors, GPS, satellite interferometry — turned a science of single records into one of continuous fields, and made possible the early-warning systems that now give cities tens of seconds.
:::

## Where this leads

Wave propagation, source theory and the statistics of catalogues are developed with the mathematics in [[geophysics/elastic-waves]], [[geophysics/seismic-structure]] and [[geophysics/earthquake-sources]]; the fault mechanics behind elastic rebound is in [[structural-geology/fractures-faults]]; the hazard arithmetic — probabilistic maps, exceedance probabilities, the vulnerability of structures — is the subject of [[natural-hazards/earthquake-hazard]]. The deep structure that the shadow zones imply is worked out in [[physical-geology/earth-interior]], and the use of earthquakes as a probe of the interior, rather than as a hazard, in [[geophysics/seismic-structure]].

::: summary Key takeaways
- An earthquake is the frictional failure of a pre-existing fault that has been locked and loaded; the energy comes from elastic strain built up over centuries and released in seconds.
- Everything we know about a source comes from waves: P and S body waves, Love and Rayleigh surface waves, and their arrival times.
- Distance from one station is $8.4\times$(S–P time) in the crust; three stations locate an epicentre, four also give depth and origin time.
- Moment magnitude $M_\text{w} = \tfrac{2}{3}(\log_{10}M_0 - 9.1)$ with $M_0 = \mu A D$; magnitude is logarithmic, so one unit is a factor of about 32 in energy.
- Intensity is what a place experiences and depends on depth, soil and buildings; magnitude is a property of the source. Never confuse them.
- Earthquakes map the plate boundaries; the Wadati–Benioff zone is a subducting slab seen by its own seismicity, and stable continental interiors are quiet but not strong.
- Gutenberg–Richter gives the global rate — about $18$ events of $M_\text{w} \ge 7$ a year, one of $M_\text{w} \ge 9$ every few years — but hazard is a property of a specific fault.
- Deaths are set by depth, soil, construction and the time of day, in that rough order of controllability: the last two are the ones a society can change.
:::

## Exercises

::: exercise Distance from S–P {level=1 check="126"}
A station records an S–P time of $15\ \mathrm{s}$. Using the crustal velocities of [[#ex-locate]], find the epicentral distance.
::: solution
$D = 8.4\times15 = 126\ \mathrm{km}$. If the same event is recorded at $15\ \mathrm{s}$ on one station and $22\ \mathrm{s}$ on another, the epicentre lies on the intersection of circles of $126$ and $185\ \mathrm{km}$ — two points, resolved by a third station.
:::
:::

::: exercise Moment and magnitude {level=1 check="8.0"}
An earthquake ruptures $180\times60\ \mathrm{km}$ with $4\ \mathrm{m}$ of slip; take $\mu = 30\ \mathrm{GPa}$. Find $M_0$ and $M_\text{w}$.
::: solution
$M_0 = 3\times10^{10}\times1.08\times10^{10}\times4 = 1.3\times10^{21}\ \mathrm{N\,m}$, and $M_\text{w} = \tfrac{2}{3}(21.11-9.1) = 8.0$. Note how insensitive the magnitude is to the slip: halving the slip to $2\ \mathrm{m}$ gives $M_\text{w}\ 7.8$, a difference of scientific magnitude and of a factor of $5.7$ in energy.
:::
:::

::: exercise Energy ratios {level=1 check="32"}
By what factor does radiated energy increase per unit of moment magnitude?
::: solution
From $\log_{10}M_0 = 1.5M_\text{w} + 9.1$ and $E_r \propto M_0$, the factor is $10^{1.5} = 32$. Two units is $10^3$, three units $3\times10^4$.
:::
:::

::: exercise Intensity and distance {level=2 check="4.4"}
Intensity falls roughly as $I = I_0 - 3\log_{10}(R/R_0)$ with $R$ the distance in km. If a $M_\text{w}\ 6.5$ earthquake produces MMI VIII at $10\ \mathrm{km}$, what intensity should be expected at $160\ \mathrm{km}$ on similar rock? (Enter the intensity value.)
::: solution
$\Delta I = 3\log_{10}(160/10) = 3\times1.2 = 3.6$, so $I \approx 8 - 3.6 = 4.4$, i.e. MMI IV–V — felt indoors, hanging objects swinging, no damage. The exercise is a warning against the "earthquake X miles away" headline: intensity falls fast with distance, and a city $150\ \mathrm{km}$ from a moderate shock is a shaken, not a damaged, city. Soft soil can add one to two units, which is why the same formula is used only as a first estimate.
:::
:::

::: exercise Site amplification {level=2 check="3.4"}
In the 1985 Michoacán earthquake the peak ground velocity on firm rock in Mexico City was $3.5\ \mathrm{cm\,s^{-1}}$ and in the lake-bed district $12\ \mathrm{cm\,s^{-1}}$. Find the amplification factor, and explain why buildings of 10–15 storeys were the ones that failed.
::: solution
Amplification $= 12/3.5 = 3.4$. The lake bed also lengthened the strong shaking to more than a minute and put its energy near a period of $2\ \mathrm{s}$, which is the fundamental period of a 10–15-storey building ($T \approx 0.1 N$ seconds for $N$ storeys of concrete frame). Resonance, not peak amplitude alone, is what breaks a structure: the same ground motion would have done far less damage to one- or two-storey houses or to a 40-storey tower.
:::
:::

::: exercise Gutenberg–Richter for a region {level=2 check="1.2"}
A region records $120$ earthquakes of $M_\text{w} \ge 4.5$ per year with $b = 1.0$. Estimate the annual rate of $M_\text{w} \ge 6.5$ events and the mean recurrence interval.
::: solution
$\log_{10}N = a - bM$ with $a = \log_{10}120 + 4.5 = 6.58$. For $M \ge 6.5$: $N = 10^{6.58-6.5} = 10^{0.08} = 1.2\ \mathrm{yr^{-1}}$, a mean recurrence of $1/N = 0.85\ \mathrm{yr}$.

The point of the numbers is the sensitivity to $b$: with $b = 0.8$ the same small-earthquake rate gives $N = 10^{6.58-0.8\times6.5} = 10^{1.38} = 24\ \mathrm{yr^{-1}}$, twenty times more. Any hazard estimate extrapolated from small to large earthquakes inherits the uncertainty in $b$ as its dominant error, which is why good assessments use the geology of the fault as well as the catalogue.
:::
:::

::: exercise Deriving the S–P rule {level=3}
Derive the relation between epicentral distance and S–P arrival-time difference for a uniform crust, and show that the relation is linear there but curved in a real, layered Earth. Why is the rule of thumb reliable only out to a few hundred kilometres?
::: solution
For a straight ray through a layer of thickness $z$ at vertical incidence the difference is $\Delta t = z(1/V_S - 1/V_P)$; for a ray at incidence $i$, both path lengths are multiplied by $\sec i$, so $\Delta t$ still grows linearly with distance. Linearity therefore holds for a *uniform* medium at any geometry, and fails when velocity increases with depth.

In a real crust and upper mantle, $V_P$ rises from about $6$ to $8\ \mathrm{km\,s^{-1}}$ across the Moho, so rays that have travelled far have sampled faster rock and arrive earlier than a constant-velocity model predicts: the travel-time curve steepens less than linearly, and the S–P growth rate falls from $8.4\ \mathrm{km\,s^{-1}}$ near the source to about $10\ \mathrm{km\,s^{-1}}$ and then further. Beyond a few hundred kilometres the flat-earth approximation also breaks and the curvature of the sphere matters, which is why seismologists use tabulated travel-time curves from a spherical velocity model (the IASPEI or ak135 models) rather than a rule of thumb — and why the rule of thumb is still worth knowing, because it is the only way to know when the table is wrong.
:::
:::

::: exercise A seismic gap {level=3}
A megathrust $1200\ \mathrm{km}$ long and $150\ \mathrm{km}$ wide last ruptured completely in 1700. Geodetic data show convergence at $7\ \mathrm{cm\,yr^{-1}}$, of which $20\%$ is taken by aseismic creep. Estimate the accumulated slip deficit, the moment it represents, the magnitude of a single earthquake that would release it, and the assumptions you have made.
::: solution
Slip deficit $= 0.8\times7\times10^{-2}\times325 = 18.2\ \mathrm{m}$. With $A = 1.8\times10^{11}\ \mathrm{m^2}$ and $\mu = 30\ \mathrm{GPa}$,
$$
M_0 = 3\times10^{10}\times1.8\times10^{11}\times18.2 = 9.8\times10^{22}\ \mathrm{N\,m}, \qquad M_\text{w} = \tfrac{2}{3}(22.99-9.1) = 9.3 .
$$
That is larger than any earthquake since 1900 except the 1960 Chilean event, and the assumptions are doing a lot of work: that the whole width is locked (the shallowest and deepest tens of kilometres usually creep), that $\mu$ is $30\ \mathrm{GPa}$ at $10$–$40\ \mathrm{km}$ depth in overpressured sediment, that the rupture will be a single event rather than two or three partial ones, and that the 1700 date and extent are right. The honest statement is that the segment is capable of $M_\text{w}\ 9$ and is overdue on the calendar average — which is exactly how the Cascadia and Nankai forecasts are made, and why they are expressed as probabilities over decades rather than as predictions.
:::
:::

::: exercise Reading a catalogue {level=3}
A catalogue of $M_\text{w} \ge 5.0$ earthquakes in a region since 1900 contains 240 events, and the region's magnitude of completeness is $M_\text{c} = 5.0$ for 1964 onwards and $M_\text{c} = 6.0$ before that. Explain how you would estimate $b$ and $a$, and why using all 240 events with a single $M_\text{c}$ would bias the answer.
::: solution
Estimate $b$ from the frequency–magnitude distribution of the *complete* part of the catalogue only — here $M \ge 5.0$ from 1964 — by fitting $\log_{10}N = a - bM$ above $M_\text{c}$, by maximum likelihood rather than by least squares on binned counts (the standard Aki–Utsu estimator, $\hat b = [\log_{10} e]^{-1}/(\bar M - (M_\text{c}-\Delta M/2))$). Then use the whole catalogue, with the time-varying $M_\text{c}$, only for the rate $a$, by counting events above a threshold that is complete for the whole period.

Using all 240 events with $M_\text{c} = 5.0$ would treat the pre-1964 record as if it detected every $M\ 5$ event, when it missed most of them. The deficit of small events in the early part of the record makes the distribution look steeper, so $b$ is biased high — and a high $b$ extrapolates to *fewer* large earthquakes, which is the direction of bias that makes a hazard estimate look reassuring. This is the commonest technical error in seismic-hazard work, and it is why catalogues are published with completeness information rather than as a single list.
:::
:::
