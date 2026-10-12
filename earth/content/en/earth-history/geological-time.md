In April 1868 William Thomson — later Lord Kelvin — told the Royal Society of Edinburgh that the Earth was between twenty and four hundred million years old, and that eighty million was much nearer the truth than ninety-eight million. The argument was not religious and not sloppy. It was physics: the Earth is cooling, the cooling is conduction, the present heat flow out of the ground is measured, the interior's temperature cannot have been more than a few thousand degrees above the surface's without melting it, and the arithmetic of heat gives an age. It was the best quantitative estimate of the planet's age ever made, and it was accepted by physicists for forty years and by geologists never.

It failed for two reasons, and both were discoveries still to come. There is an internal heat source — radioactivity, discovered in 1896 — so the Earth is not cooling from a fixed starting stock of heat. And the Earth is not a solid conducting ball: the mantle convects, which moves heat out of the interior far more efficiently than conduction and changes the relation between the surface heat flow and the age. When Rutherford gave an after-dinner talk in 1904 and told a room including Kelvin that a radioactive mineral in his hand was older than the Kelvin age allowed, the room laughed; the physics was simply incomplete. This chapter is about the clocks that settled the argument, what each of them really measures, and how their numbers are welded to the rock record to make a timescale that eight hundred geologists have argued into its present form.

## The decay law, and what a clock measures

::: definition Radioactive decay {#def-decay}
A parent isotope $P$ decays to a daughter $D$ at a rate proportional to the number of atoms present,
$$
\frac{\mathrm{d}N}{\mathrm{d}t} = -\lambda N, \qquad N = N_0 e^{-\lambda t},
$$
with **half-life** $t_{1/2} = \ln 2/\lambda$. If no daughter was present at the start, or if the initial daughter can be counted and subtracted, the age follows from the measured ratio:
$$
t = \frac{1}{\lambda}\ln\left(1 + \frac{D^*}{P}\right).
$$
A **chronometer** is the pair of elements that fractionate from each other chemically but not nuclearly — Rb and Sr, Sm and Nd, U and Pb — so that a rock's different minerals end up with different parent/daughter ratios and the whole system can be solved as an isochron without knowing the initial daughter at all.
:::

::: proof
Integrate $\mathrm{d}N/N = -\lambda\,\mathrm{d}t$ from $N_0$ at $t=0$ to $N$ at $t$: $\ln(N/N_0) = -\lambda t$. Every daughter atom produced is one parent atom lost, so $D^* = N_0 - N = N(e^{\lambda t} - 1)$, and rearranging gives the age equation. Setting $N/N_0 = \tfrac{1}{2}$ gives $t_{1/2} = \ln 2/\lambda$.

The isochron trick removes the need to know $D_0$. Two minerals from the same rock have the same initial daughter ratio $D_0/P_0$ but different $P/D$; writing $D = D_0 + P(e^{\lambda t}-1)$ and dividing through by a stable isotope of the daughter element, $^{D}\!/^{D'}\text{now} = (^{D}\!/^{D'})_0 + (^{P}\!/^{D'})_{\text{now}}(e^{\lambda t}-1)$, a plot of the measured daughter ratio against the measured parent/daughter ratio is a straight line whose slope is $e^{\lambda t}-1$. The age comes from the slope and the initial ratio from the intercept, and neither has to be assumed. ∎
:::

::: example A K–Ar age {#ex-kar}
A sanidine separates contains $4.02\times10^{16}$ atoms of $^{40}\mathrm{K}$ and $1.66\times10^{15}$ atoms of radiogenic $^{40}\mathrm{Ar}^*$. Take $\lambda_\text{total} = 5.543\times10^{-10}\ \mathrm{yr^{-1}}$, of which $\lambda_e = 0.581\times10^{-10}\ \mathrm{yr^{-1}}$ decays to $^{40}\mathrm{Ar}$ by electron capture. Find the age.
::: solution
Only the argon-producing branch is observed, so
$$
t = \frac{1}{\lambda}\ln\left(1 + \frac{\lambda}{\lambda_e}\cdot\frac{^{40}\mathrm{Ar}^*}{^{40}\mathrm{K}}\right) = \frac{1}{5.543\times10^{-10}}\ln\left(1 + 9.541\times0.0413\right).
$$
$$
\ln(1.394) = 0.3322, \qquad t = \frac{0.3322}{5.543\times10^{-10}} = 5.99\times10^{8}\ \mathrm{yr} = 599\ \mathrm{Ma}.
$$
Two things are hidden in the arithmetic and both are checked in a real laboratory. Argon is a gas, so the mineral must have remained closed to it: a sanidine that has been heated even briefly loses argon and reads too young, which is the basis of thermochronometry. And the measured argon includes atmospheric argon trapped in the gas, which is corrected by measuring $^{36}\mathrm{Ar}$ — all of it atmospheric — and subtracting $295.5\times{}^{36}\mathrm{Ar}$. Get that correction wrong on a young sample and the age is meaningless, which is why $^{40}\mathrm{Ar}/^{39}\mathrm{Ar}$ step-heating exists.
:::
:::

::: svg
caption: A concordia diagram for the uranium–lead system. The curve is the locus of points where the $^{206}\mathrm{Pb}/^{238}\mathrm{U}$ age and the $^{207}\mathrm{Pb}/^{206}\mathrm{Pb}$ age agree; a zircon that has stayed closed plots on it. Lead loss moves an analysis down towards the origin along a chord — the **discordia** — whose upper intercept is the crystallisation age and whose lower intercept is the age of the disturbance. Here a $2.7\ \mathrm{Ga}$ zircon that lost lead at $0.5\ \mathrm{Ga}$ plots between the two, and a single analysis would give an age that is neither. The diagram is the reason U–Pb is the most trusted of the old clocks: it is self-checking.
<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Uranium-lead concordia diagram with a discordia line">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .con { stroke: var(--series-1); stroke-width: 2.6; fill: none; }
    .dis { stroke: var(--bad); stroke-width: 2; fill: none; stroke-dasharray: 7 4; }
    .pt { fill: var(--ink); }
    .pt2 { fill: var(--bad); }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
    .grid { stroke: var(--rule); stroke-width: 1; }
  </style>
  <line class="grid" x1="100" y1="300" x2="700" y2="300"/>
  <line class="grid" x1="100" y1="40" x2="100" y2="300"/>
  <line class="ax" x1="100" y1="320" x2="700" y2="320"/>
  <line class="ax" x1="100" y1="30" x2="100" y2="320"/>
  <path class="con" d="M100,320 Q160,318 200,312 Q260,300 320,278 Q400,240 470,180 Q540,110 600,40"/>
  <path class="dis" d="M360,74 L140,300"/>
  <circle class="pt" cx="360" cy="74" r="5"/>
  <circle class="pt" cx="140" cy="300" r="5"/>
  <circle class="pt2" cx="250" cy="187" r="5"/>
  <circle class="pt2" cx="300" cy="135" r="5"/>
  <text class="sub" x="372" y="70">upper intercept 2.7 Ga (crystallisation)</text>
  <text class="sub" x="150" y="304">lower intercept 0.5 Ga (lead loss)</text>
  <text class="sub" x="258" y="196">discordant analyses</text>
  <text class="sub" x="612" y="46">concordia</text>
  <text class="sub" x="104" y="338">206Pb/238U  →</text>
  <text class="sub" x="60" y="40" transform="rotate(-90 60 40)">207Pb/235U →</text>
  <text class="sub" x="104" y="356">tick spacing: 0.2 in 206Pb/238U; ages on the curve at 0.5, 1.0, 1.5, 2.0, 2.5, 3.0 Ga</text>
</svg>
:::

## The clocks, and what each is good for

| System | Half-life | Mineral or rock | Useful range | What it actually dates |
|---|---|---|---|---|
| U–Pb in zircon | 4468, 704 Myr | zircon, baddeleyite, titanite | 1 Ma – 4.5 Ga | crystallisation of the magma, or the growth of the zircon |
| U–Pb in carbonates | as above | calcite, aragonite, speleothem | 0.1 – 5 Ma | the age of the cave deposit, with no calibration needed |
| $^{40}\mathrm{K}/^{40}\mathrm{Ar}$, $^{40}\mathrm{Ar}/^{39}\mathrm{Ar}$ | 1250 Myr | sanidine, biotite, hornblende, whole rock | 0.05 – 4.5 Ga | the last cooling through the argon closure temperature |
| Rb–Sr | 48800 Myr | whole rock, mica | 50 Ma – 4.5 Ga | crystallisation, or metamorphic equilibration |
| Sm–Nd, Lu–Hf | 106000, 37000 Myr | whole rock, garnet | 100 Ma – 4.5 Ga | mantle extraction, metamorphism |
| Re–Os | 41600 Myr | molybdenite, sulphides, seawater | 5 Ma – 4.5 Ga | the ore deposit; a whole-ocean chemical clock |
| U–series ($^{234}\mathrm{U}$–$^{230}\mathrm{Th}$) | 245, 75 kyr | coral, speleothem, bone | 1 – 500 ka | the death of the coral, the age of the cave crust |
| $^{14}\mathrm{C}$ | 5730 yr | anything that exchanged carbon | 0.2 – 55 ka | the last exchange with the atmosphere or ocean |
| $^{10}\mathrm{Be}$, $^{26}\mathrm{Al}$, $^{36}\mathrm{Cl}$ | 1.4–1.5 Myr | quartz at the surface | 1 ka – 5 Ma | the time a rock has been exposed |

::: proposition A radiometric date is a cooling age {#prop-closure}
Daughter isotopes diffuse, and diffusion is thermally activated. A mineral retains its daughter only once it has cooled below a **closure temperature** $T_c$ that depends on the grain size, the cooling rate and the diffusivity of the system. Below $T_c$ the clock runs; above it the clock is reset. A "date" is therefore the time at which the rock passed through $T_c$, not the time at which it formed — and different minerals in the same rock close at different temperatures and give different dates, which is not a problem but a thermometer of the cooling path.
:::

::: example Does the grain keep its lead? {#ex-diffusion}
Take the diffusion coefficient of lead in apatite at $500\ ^\circ\mathrm{C}$ to be $D = 10^{-17}\ \mathrm{m^2\,s^{-1}}$. How far does lead diffuse in $10\ \mathrm{Myr}$, and does a $100\ \mu\mathrm{m}$-radius apatite crystal keep its lead at that temperature? Take the closure condition to be that the diffusion length exceeds the grain radius, so the crystal is open.
::: solution
The diffusion length is
$$
L = \sqrt{Dt} = \sqrt{10^{-17}\times3.16\times10^{14}} = \sqrt{3.16\times10^{-3}} = 0.056\ \mathrm{m} = 5.6\ \mathrm{cm}.
$$
That is five hundred times the grain radius, so the crystal has lost its lead completely: at $500\ ^\circ\mathrm{C}$ for ten million years an apatite is an open system, and its U–Pb date records the last time it was cooler than that.

Now cool the rock at $10\ \mathrm{K\,Myr^{-1}}$. The temperature at which $L$ over the remaining cooling time equals the grain radius is the closure temperature, and for apatite (U–Th)/He it is about $70\ ^\circ\mathrm{C}$, for fission tracks about $110\ ^\circ\mathrm{C}$, for zircon U–Pb above $900\ ^\circ\mathrm{C}$. A single granite therefore yields a zircon age for its crystallisation, a monazite age for its cooling through $500\ ^\circ\mathrm{C}$, an apatite fission-track age for its cooling through $110\ ^\circ\mathrm{C}$ and a (U–Th)/He age for its arrival near the surface — four dates, one rock, and the difference between them is the exhumation history. This is thermochronometry, and it is how the uplift of a mountain belt is measured without leaving the valley.
:::
:::

::: widget plot
f: x - 8033*ln(1-f)
x: 0, 20000
y: 0, 40000
sliders: f=0.1:0:0.5
labels: apparent 14C age
caption: The dead-carbon (reservoir) effect in radiocarbon dating. The true age is on the horizontal axis and the apparent radiocarbon age on the vertical; the slider $f$ is the fraction of carbon a sample takes from a reservoir that contains no $^{14}\mathrm{C}$. A freshwater shell that gets $20\%$ of its carbon from dissolved limestone, which is millions of years old and entirely dead, reads $-8033\ln(0.8) = 446$ years too old at every age; at $50\%$ the offset is $5567$ years. This is why a Neolithic hearth charcoal and the shell from the same layer can differ by centuries, why marine samples need a regional reservoir correction, and why the dating laboratory asks what the sample *is* before it asks how old it is.
:::

## Radiocarbon, and the need to calibrate

::: example A radiocarbon age and its calibration {#ex-radiocarbon}
A piece of charcoal has a fraction modern carbon of $F = 0.245$ after correction for isotopic fractionation. Find the radiocarbon age using the Libby mean life of $8033\ \mathrm{yr}$, and explain why the calendar age is older.
::: solution
$$
t = -8033\ln F = -8033\ln 0.245 = 8033\times1.406 = 11{,}300\ \mathrm{yr\ BP}.
$$
The calendar age is older, about $13{,}300$ calendar years, because the atmosphere contained *less* $^{14}\mathrm{C}$ at that time than it did in 1950, so a sample of that age has less $^{14}\mathrm{C}$ than the decay law alone predicts and the raw age under-estimates the truth. The correction is read from a calibration curve built by measuring $^{14}\mathrm{C}$ in things whose age is known independently: tree rings counted to 13,900 years, varved sediments, corals dated by U–Th, speleothems and foraminifera in annually layered cores. The current international calibration curves (IntCal20 and its marine and southern-hemisphere versions) extend to 55,000 years.

Three corrections are made before the decay equation is used at all. **Fractionation** is removed by measuring $\delta^{13}\mathrm{C}$ and normalising to $-25\%$; **the reservoir** is corrected for marine and freshwater samples; and the **Suess effect** — the dilution of atmospheric $^{14}\mathrm{C}$ by fossil-fuel $\mathrm{CO_2}$ since 1850 — and the **bomb pulse** — the doubling of $^{14}\mathrm{C}$ by atmospheric testing between 1955 and 1963 — are corrected for in the modern era. The bomb pulse is now the most useful of the two: it gives a date-certain curve through the last sixty years, precise to a season, which is used for forensic age-estimation of human tissue, wine, art and ivory.
:::
:::

## The age of the Earth, and the oldest things

The Earth cannot be dated directly, because no rock on its surface is primordial: plate tectonics and weathering have destroyed the first crust. The age comes from the Solar System. In 1953 Clair Patterson dated the iron meteorite Canyon Diablo by the lead–lead method, on the argument that the meteorite parent bodies formed at the same time as the Earth and have never been differentiated, metamorphosed or weathered, and obtained $4.55 \pm 0.07\ \mathrm{Ga}$. The number was attacked for a decade, partly because Patterson's own argument that industrial lead was contaminating the environment made him enemies, and it has since been refined to $4.567\ \mathrm{Ga}$ from the calcium–aluminium inclusions of carbonaceous chondrites, dated by U–Pb with an uncertainty of under a million years. The Moon's oldest anorthosites are $4.52\ \mathrm{Ga}$, the oldest lunar zircons $4.45\ \mathrm{Ga}$.

The oldest Earth materials are therefore detrital: $4{,}404 \pm 8\ \mathrm{Ma}$ zircons from the Jack Hills conglomerate in Western Australia, which contain oxygen isotopes showing that they crystallised from a melt that had interacted with liquid water — evidence that the Earth had a crust and an ocean within $160\ \mathrm{Myr}$ of forming, against the then-standard picture of a molten Hadean. The oldest intact rocks are the $3.8$–$4.0\ \mathrm{Ga}$ Acasta gneisses of Canada, the Nuvvuagittuq belt of Quebec and the Isua supracrustals of Greenland, and the oldest minerals other than zircons are of much the same age.

::: example Kelvin's age, and why it moved {#ex-kelvin}
Model the Earth's surface as a half-space cooling from an initial uniform temperature $T_0$ to the surface temperature, with thermal diffusivity $\kappa = 10^{-6}\ \mathrm{m^2\,s^{-1}}$ and conductivity $k = 4\ \mathrm{W\,m^{-1}\,K^{-1}}$. The surface heat flow at time $t$ is
$$
q = \frac{k\,T_0}{\sqrt{\pi \kappa t}} .
$$
Find the age implied by $T_0 = 3800\ \mathrm{K}$ and $q = 0.15\ \mathrm{W\,m^{-2}}$, and then by $q = 0.06\ \mathrm{W\,m^{-2}}$.
::: solution
Rearranging, $t = k^2 T_0^2/(\pi q^2 \kappa)$:
$$
t = \frac{16\times1.44\times10^{7}}{\pi\times0.0225\times10^{-6}} = 3.3\times10^{15}\ \mathrm{s} = 104\ \mathrm{Myr},
$$
and for $q = 0.06\ \mathrm{W\,m^{-2}}$ the age is $(0.15/0.06)^2 = 6.25$ times larger, $650\ \mathrm{Myr}$.

Kelvin's number came out small because his heat flow was measured too high — mine temperatures in granitic terrane, where half the heat is radiogenic and not from the interior at all — and because $t \propto q^{-2}$, so a factor of two in heat flow is a factor of four in age. But the two real errors were structural. Radioactivity supplies $20\ \mathrm{TW}$ of the $47\ \mathrm{TW}$ now leaving the surface, so the Earth need not have been hot to be losing heat; and the mantle convects, so the surface heat flow is set by the viscosity of the mantle and the temperature of the core–mantle boundary rather than by the age of a cooling ball. Kelvin's method is not wrong — it is the basis of lunar and asteroid chronometry, where convection is absent — and the reason it failed here is that the Earth is a system he did not know about.
:::
:::

::: definition The timescale and its units {#def-timescale}
**Chronostratigraphic** units are bodies of rock with a lower and an upper boundary in time: eonothem, erathem, system, series, stage. The corresponding **geochronologic** units — eon, era, period, epoch, age — are the intervals of time they were deposited in. A **GSSP** ("global boundary stratotype section and point") is the single horizon in a single section that defines the base of one stage; a **GSSA** does the same for a unit above Precambrian rank, defined by a level or an age rather than a fossil. The present scale has 154 stages, 34 epochs, 12 periods and 3 eras, and about a third of the stage boundaries have GSSPs that have been ratified and formally published since 1974.
:::

::: warning "The date is the age of the rock"
A detrital zircon in a sandstone gives the age of the granite it came from, which is a *minimum* age for the sandstone and usually a much older one; the youngest grain, or the population's youngest mode, is what dates the deposition. A metamorphic monazite gives the age of the metamorphism, not of the original granite. A biotite K–Ar age in a slowly cooled batholith gives the time it passed through $300\ ^\circ\mathrm{C}$, not its crystallisation. And a "date" from a sedimentary rock that contains no igneous mineral at all — no ash bed, no cross-cutting dyke — is not available: the Palaeozoic stages were built without a single radiometric number, and their boundaries are still defined by fossils. Ask, of every number, what it closed and when.
:::

::: quiz
A granite contains zircons giving $1850\ \mathrm{Ma}$, and a cross-cutting basalt dyke gives $265\ \mathrm{Ma}$. The sedimentary cover on top of the granite contains Permian fusulinids. What can be said about the age of the erosion surface beneath the cover?
- [ ] It is $1850\ \mathrm{Ma}$
- [x] It is younger than $265\ \mathrm{Ma}$ and older than the Permian
- [ ] It is $265\ \mathrm{Ma}$
- [ ] It cannot be bracketed at all
::: solution
The surface cuts the granite and the dyke, so it is younger than both, and it is below the Permian cover, so it is older than the Permian ($299$–$252\ \mathrm{Ma}$). Since the dyke is $265\ \mathrm{Ma}$ and the base of the Permian is $299\ \mathrm{Ma}$, the bracket is $265$–$299\ \mathrm{Ma}$ — and the contradiction with the fusulinids means one of the dates or the correlation is wrong, which is exactly the kind of puzzle that gets resolved by re-dating or by re-examining whether the dyke really is cross-cutting rather than a sill.
:::
:::

::: history
Lord Kelvin's estimate of 20–100 million years dominated physics for a generation and was defended as late as 1903; his rival George Darwin's 55 million years for the Earth–Moon system was the same kind of argument and shared the same flaw. Ernest Rutherford reported helium in a sample of uraninite in 1904 and, in the same year, told the Royal Institution that radioactivity might make the Earth very old. Bertram Boltwood produced the first lead–uranium ages in 1907, some of them over two billion years, and was largely ignored. Arthur Holmes, an undergraduate at Imperial College, made the dating of rocks his life's work, published *The Age of the Earth* in 1913 at twenty-four, and by 1947 had settled on 4.5 billion years. Willard Libby's radiocarbon method of 1947 won the 1960 Nobel Prize; Hans Suess's discovery of the de Vries effects and the calibration curves of the 1980s and 1990s, and the U–Th dating of corals that made calibration possible beyond the tree-ring record, completed the method. Clair Patterson's 4.557 Ga in 1953 came out of a clean-room he built because nothing else could keep the lead out; the same obsession with contamination led him to demonstrate that the lead in the environment came from petrol, and to a thirty-year fight that ended with the Clean Air Act. The international timescale is the work of the International Commission on Stratigraphy, founded in 1974, and of the dozens of subcommissions that argue, in public, about where to put a point in a rock.
:::

## Where this leads

The decay physics, the isochron algebra and the geochronology of zircons are developed in [[geochemistry/geochronology]]; the mass spectrometry and the common pitfalls in [[geophysics/exploration]]; the use of dates to calibrate the timescale and to measure rates in [[earth-history/geological-time]] itself, and the ages of the earliest rocks in [[earth-history/early-earth]]. The magnetic polarity timescale that does so much of the correlation work is in [[geophysics/palaeomagnetism]].

::: summary Key takeaways
- A radiometric clock is a measured parent/daughter ratio plus a decay constant; the isochron method removes the need to know the initial daughter.
- A date is the time since the system closed to the daughter isotope, which is a cooling age, not necessarily a crystallisation age. Different minerals close at different temperatures and give different, equally correct, dates.
- U–Pb in zircon is self-checking via concordia; the discordia's two intercepts give the crystallisation age and the disturbance age.
- Radiocarbon dates the last exchange with the atmosphere, must be calibrated against tree rings and corals, and is limited to about 55,000 years.
- The age of the Earth, 4.54 Ga, comes from meteorites, not from Earth rocks; the oldest Earth minerals are 4.4 Ga Jack Hills zircons.
- Kelvin's estimate failed because of radioactivity and convection, and it is a lesson in how a correct method with a missing process gives a confident wrong answer.
- The timescale is built from stages defined by golden spikes and calibrated by dates; the two systems are logically independent and both are needed.
:::

## Exercises

::: exercise Half-lives {level=1 check="150"}
A parent isotope has a half-life of $50\ \mathrm{Myr}$ and a rock now contains $1/8$ of its original parent. Find its age.
::: solution
Three half-lives: $3\times50 = 150\ \mathrm{Myr}$. Equivalently $t = (1/\lambda)\ln(N_0/N) = (50/0.693)\ln 8 = 150\ \mathrm{Myr}$.
:::
:::

::: exercise An Rb–Sr isochron {level=1 check="1.5"}
A whole-rock Rb–Sr isochron has slope $0.0214$. Take $\lambda(^{87}\mathrm{Rb}) = 1.42\times10^{-11}\ \mathrm{yr^{-1}}$. Find the age.
::: solution
$t = \ln(1 + 0.0214)/1.42\times10^{-11} = 0.02118/1.42\times10^{-11} = 1.49\times10^{9}\ \mathrm{yr}$, i.e. $1.5\ \mathrm{Ga}$.
:::
:::

::: exercise Which clock {level=1}
Choose a method for: (a) a Miocene ash bed; (b) a Palaeocene limestone; (c) a metamorphic terrane's cooling through $250\ ^\circ\mathrm{C}$; (d) a charcoal from a burial.
::: solution
(a) $^{40}\mathrm{Ar}/^{39}\mathrm{Ar}$ on sanidine from the ash, or zircon U–Pb if the zircon is magmatic and the ash is young enough for the error to matter. (b) No direct method: the limestone is usually not closed to uranium, so date the ash beds below and above, or use the stage defined by foraminifera and interpolate from the timescale; Sr isotope stratigraphy gives a correlation, not a date. (c) Apatite fission tracks (closure $\sim110\ ^\circ\mathrm{C}$) and zircon/apatite (U–Th)/He, or hornblende Ar–Ar for higher temperatures. (d) Radiocarbon, with a reservoir check and a calibration curve, and on the short-lived fraction of the charcoal to avoid old wood.
:::
:::

::: exercise Concordia {level=2 check="1.5"}
On a concordia diagram a discordia line cuts the curve at $2.7\ \mathrm{Ga}$ and at $0.5\ \mathrm{Ga}$. What do the two intercepts mean, and what apparent $^{206}\mathrm{Pb}/^{238}\mathrm{U}$ age would a single analysis give if it had lost $50\%$ of its radiogenic lead? (Enter the apparent age in Gyr.)
::: solution
The upper intercept is the crystallisation age, $2.7\ \mathrm{Ga}$; the lower is the time of the lead-loss event, $0.5\ \mathrm{Ga}$. Losing half the radiogenic lead halves the ratio: at $2.7\ \mathrm{Ga}$ the ratio $^{206}\mathrm{Pb}^*/^{238}\mathrm{U} = e^{\lambda t}-1 = 0.520$, so the disturbed analysis plots at $0.260$, and its apparent age is
$$
t = \frac{\ln(1.260)}{1.551\times10^{-10}} = 1.49\ \mathrm{Ga},
$$
an age that corresponds to no event at all. This is why single analyses of discordant zircons are reported as intercept ages from several grains, and why "concordant" is a quality control, not a formality.
:::
:::

::: exercise Reservoir age {level=2 check="847"}
A river shell obtains $10\%$ of its carbon from limestone-derived dissolved inorganic carbon. By how many years is its radiocarbon age over-estimated?
::: solution
$\Delta t = -8033\ln(1-0.10) = 8033\times0.1054 = 847\ \mathrm{yr}$, about $850$ years. Hard-water effects of this size are routine in limestone country and are one reason the radiocarbon chronologies of Neolithic Europe were revised downwards by centuries when the effect was taken seriously.
:::
:::

::: exercise The limit of radiocarbon {level=2 check="49900"}
A sample's $^{14}\mathrm{C}$ content is $0.2\%$ of modern. Find its radiocarbon age, and explain why the practical limit of the method is about $50$–$55\ \mathrm{ka}$ even though $0.2\%$ is measurable by accelerator mass spectrometry.
::: solution
$t = -8033\ln 0.002 = 8033\times6.215 = 49{,}900\ \mathrm{yr}$, about $50\ \mathrm{ka}$. The limit is not the counting statistics alone but the contamination: at $0.2\%$ modern carbon, one per cent of modern carbon introduced during sampling or in the laboratory makes the age $1600$ years too young, and one per cent of *dead* carbon makes it $8000$ years too old. Every very old radiocarbon age is therefore a statement about the cleanliness of the chemistry, which is why the oldest accepted dates come from labs that can process samples in a clean room and report the treatment of humic acids.
:::
:::

::: exercise Deriving closure temperature {level=3}
Starting from $D = D_0 e^{-E/RT}$ and the condition that the diffusion length over the remaining cooling time equals the grain radius, derive the form of Dodson's equation
$$
\frac{E}{RT_c^2} = \ln\frac{A R T_c^2 D_0}{E\,a^2\,(\mathrm{d}T/\mathrm{d}t)}
$$
and evaluate the sensitivity of $T_c$ to grain radius: by how much does $T_c$ change if the radius doubles, for $E = 260\ \mathrm{kJ\,mol^{-1}}$ and $T_c = 300\ ^\circ\mathrm{C}$?
::: solution
Write the cooling time remaining as $t = T_c/(\mathrm{d}T/\mathrm{d}t)$, set $a^2 = \pi^2 D t$ (the diffusion solution for a sphere losing its argon), substitute $D = D_0e^{-E/RT_c}$ and take logarithms; the result is Dodson's equation with $A$ a geometric constant of order 55.

Differentiating with respect to $\ln a$ at fixed cooling rate gives $\mathrm{d}T_c/T_c \approx (2RT_c^2/E)\,\mathrm{d}\ln a$, so
$$
\Delta T_c \approx \frac{2RT_c^2}{E}\ln 2 = \frac{2\times8.314\times573^2}{260{,}000}\times0.693 = 14\ \mathrm{K}.
$$
Doubling the grain size raises the closure temperature by only about $14\ ^\circ\mathrm{C}$, which is why closure temperatures are quoted as single numbers for a mineral despite a range of grain sizes — and why the much larger uncertainties in thermochronology come from the assumed cooling path rather than from the grain size.
:::
:::

::: exercise Kelvin revisited {level=3}
Repeat [[#ex-kelvin]] allowing for $20\ \mathrm{TW}$ of radiogenic heat production within the crust, so that the heat flow from the interior is $0.03\ \mathrm{W\,m^{-2}}$ rather than $0.06$. Find the new age, and comment on what the exercise shows about the logic of the original argument.
::: solution
$t \propto q^{-2}$, so the age rises by $(0.06/0.03)^2 = 4$ to $2.6\ \mathrm{Gyr}$.

The point is not that Kelvin was wrong by a factor of two but that the method's answer is unbounded below: as the interior heat flow tends to zero the age tends to infinity, so the estimate is controlled entirely by the partitioning of the measured surface heat flow between the interior and local radioactivity — a quantity that could not be measured in 1868 and can only be inferred now, from heat-production measurements in boreholes, from the geochemistry of basalts and from the geoneutrino flux. A method can be sound and its answer still be a measurement of the assumption.
:::
:::

::: exercise Dating a sedimentary basin {level=3}
A sedimentary succession contains no ash beds. At its base a sill intrudes the lowest beds and gives $100.2 \pm 0.4\ \mathrm{Ma}$ by zircon U–Pb. Near the top a palaeosol contains detrital zircons with a youngest population at $95.1 \pm 0.3\ \mathrm{Ma}$. The top is overlain by a marine shale with the index ammonite of a zone dated elsewhere at $92.0$–$93.5\ \mathrm{Ma}$. Establish the age bracket for the base and for the top, and identify which number is the weakest.
::: solution
**Base.** The sill is younger than the beds it intrudes, so the base of the succession is **older than $100.2 \pm 0.4\ \mathrm{Ma}$**. **Top.** The youngest detrital zircons in the palaeosol near the top give a maximum depositional age of $95.1\ \mathrm{Ma}$ for those beds, and the overlying marine shale is $92.0$–$93.5\ \mathrm{Ma}$, so the top of the clastic succession lies between $95.1$ and about $93\ \mathrm{Ma}$. The whole succession therefore spans at least $6$–$7\ \mathrm{Myr}$, and the erosion surface at its base is older than $100\ \mathrm{Ma}$ — a nonconformity with a hundred million years or more to think about.

**Weakest number:** the detrital-zircon maximum depositional age. A youngest grain can be recycled from an older basin, can be a lead-loss or a metamict grain, and the population's youngest mode can be biased by the sampling of hundreds of grains. The ammonite zone is a correlation and carries the uncertainty of the timescale, which for this interval is a few hundred thousand years. The sill date is the strongest single number, and the whole exercise is a demonstration that a sedimentary basin is dated by brackets and by argument, and that the reported "age of formation" in a basin model is usually the midpoint of a bracket several million years wide.
:::
:::
