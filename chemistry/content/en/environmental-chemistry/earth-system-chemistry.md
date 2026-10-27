Why does the air you are breathing contain $21\ \%$ oxygen, $78\ \%$ nitrogen and only about $0.04\ \%$ carbon dioxide, when Venus and Mars — built from much the same rock — have atmospheres that are almost entirely $\mathrm{CO_2}$? Why does a molecule of methane released today survive about a decade, a molecule of water vapour about nine days, and an excess of carbon dioxide — in a sense we shall have to be careful about — for centuries? And why is the nitrogen of the atmosphere still there at all, when thermodynamics says that most of it "ought" to have dissolved in the sea as nitrate? These are questions of **environmental chemistry**: the chemistry of the air, waters, soils and living things of the Earth, treated as one coupled system in which elements move between reservoirs, change their oxidation states and are processed by sunlight, microbes, rocks and people.

This first lesson builds the two tools that the rest of the course uses constantly. The first is quantitative: the **box model**, in which the Earth is split into a handful of well-mixed reservoirs connected by fluxes, and in which a single number — the **residence time** — tells you how fast a reservoir responds to a disturbance. The second is chemical: the recognition that the Earth's surface is a **redox system far from equilibrium**, held there by photosynthesis and kept there by slow kinetics, so that equilibrium thermodynamics (which you met in [[general-chemistry-2/chemical-equilibrium]]) tells you which way things *could* go, while kinetics ([[kinetics]]) tells you how fast they *do*. We apply both to the three great biogeochemical cycles of carbon, nitrogen and sulfur.

## Reservoirs, fluxes and residence times

The Earth system is far too complicated to model molecule by molecule, so environmental chemists do what chemical engineers do with a plant: they draw boxes. Each box is a reservoir that is assumed to be internally well mixed — the troposphere, the stratosphere, the surface ocean, the deep ocean, the land biosphere, soils, sediments — and arrows between the boxes carry fluxes. The art is in choosing boxes whose internal mixing is fast compared with the exchange between them; then the contents of each box can be described by a single number.

::: definition Reservoir, burden, flux and steady state {#def-reservoir}
A **reservoir** (or **box**) is a part of the Earth system treated as homogeneous. Its **burden** (or inventory) $M$ is the amount of a chosen substance it contains, usually as a mass ($\mathrm{Tg} = 10^{12}\ \mathrm{g}$, $\mathrm{Pg} = 10^{15}\ \mathrm{g}$, often counted as the mass of the element, e.g. $\mathrm{Pg\,C}$ or $\mathrm{Tg\,N}$) or as an amount in moles. A **flux** $F$ is the rate of transfer into or out of the reservoir ($\mathrm{Tg\,yr^{-1}}$, $\mathrm{Pg\,C\,yr^{-1}}$). Mass balance for one reservoir is
$$
\frac{\mathrm{d}M}{\mathrm{d}t} = F_\text{in} - F_\text{out},
$$
where $F_\text{in}$ collects all **sources** (emission, transport in, chemical production) and $F_\text{out}$ all **sinks** (deposition, transport out, chemical loss). The reservoir is in **steady state** when $\mathrm{d}M/\mathrm{d}t = 0$, i.e. $F_\text{in} = F_\text{out}$. Steady state is not equilibrium: the fluxes need not be zero, and in the environment they almost never are.
:::

The steady-state distinction matters. A lake fed by a river and drained by another is in steady state if its level is constant, but water flows through it continuously; at chemical *equilibrium*, by contrast, every process is balanced by its own reverse (the principle of detailed balance). The atmosphere's oxygen content is in steady state — production by photosynthesis balanced by respiration, decay and the weathering of reduced rocks — but it is very far from equilibrium with the organic matter, sulfides and ferrous iron of the crust, all of which would consume it if they could reach it quickly.

::: proposition Residence time at steady state {#prop-residence}
For a reservoir in steady state with burden $M$ and total outflow $F_\text{out}$ (equal to the total inflow $F_\text{in}$), the **residence time**
$$
\tau = \frac{M}{F_\text{out}} = \frac{M}{F_\text{in}}
$$
is the mean time a molecule spends in the reservoir between entering and leaving it. If the loss is first order, $F_\text{out} = kM$, then $\tau = 1/k$ is also the **lifetime** of the substance in the reservoir: after the sources are switched off, the burden decays as $M(t) = M_0\,e^{-t/\tau}$.
:::

::: proof Residence time as a mean age {#proof-residence}
Suppose molecules leave the reservoir independently, at a rate that does not depend on how long they have been inside — which is what "well mixed" means. Then the probability per unit time that a given molecule leaves is a constant $k = F_\text{out}/M$, and the probability that a molecule which entered at $t = 0$ is still present at time $t$ obeys $\mathrm{d}P/\mathrm{d}t = -kP$, so $P(t) = e^{-kt}$. The probability density of leaving at time $t$ is $-\mathrm{d}P/\mathrm{d}t = k e^{-kt}$, and the mean transit time is
$$
\langle t \rangle = \int_0^\infty t\,k e^{-kt}\,\mathrm{d}t = \frac{1}{k} = \frac{M}{F_\text{out}} .
$$
The same answer follows from counting: in steady state, $F_\text{in}$ molecules enter per unit time and each stays on average $\langle t\rangle$, so the number present is $M = F_\text{in}\langle t\rangle$ (Little's law of queueing theory). The counting argument does not need well-mixing, which is why $\tau = M/F$ is useful even for reservoirs with a spread of transit times; but only for first-order loss does $\tau$ also equal the $e$-folding time of a decaying perturbation.
:::

Residence times range over more than fifteen orders of magnitude, and they organise the whole subject. Species with residence times shorter than the time to mix a hemisphere (about a month to two) are distributed very unevenly and are "local" or "regional" pollutants — the hydroxyl radical (about a second), nitrogen dioxide (about a day), sulfur dioxide and fine particles (days to a week). Species that live longer than the interhemispheric exchange time (about a year) are nearly uniform and are "global" — methane, nitrous oxide, the chlorofluorocarbons. An empirical rule due to Christian Junge (1974) captures this: the relative spatial variability of a trace gas, measured as the standard deviation of its mixing ratio divided by the mean, is roughly inversely proportional to its residence time. It is a rule of thumb, not a law, but it is why one well-calibrated station on a mountain in Hawaiʻi can represent the global $\mathrm{CO_2}$ record, while ozone or $\mathrm{NO_2}$ must be measured in every city.

::: example The residence time of water vapour {#ex-water-residence}
The atmosphere holds about $12.7\times10^{3}\ \mathrm{km^3}$ of water (as liquid equivalent), and global precipitation is about $486\times10^{3}\ \mathrm{km^3\,yr^{-1}}$ (Trenberth et al., 2007, *Journal of Hydrometeorology*). Estimate the residence time of water in the atmosphere, and say what it implies.
::: solution
The atmospheric water reservoir is close to steady state (evaporation balances precipitation in the global mean), so by [[#prop-residence]]
$$
\tau = \frac{M}{F} = \frac{12.7\times10^{3}\ \mathrm{km^3}}{486\times10^{3}\ \mathrm{km^3\,yr^{-1}}} = 0.0261\ \mathrm{yr} = 0.0261\times365\ \mathrm{d} = 9.5\ \mathrm{d}.
$$
Two significant figures are all the data justify: about **nine to ten days**. Two consequences follow. First, water vapour is spatially very variable — from a few per cent of the air in the humid tropics to a few parts per million in the stratosphere — exactly as Junge's rule predicts for a short-lived species. Second, the amount of water vapour cannot be set by human emissions: any excess rains out within days, and the burden is controlled instead by temperature through the Clausius–Clapeyron equation ([[thermodynamics/phase-equilibria]]). That is why water vapour acts in climate as a *feedback* on warming rather than a *forcing* (see [[environmental-chemistry/greenhouse-gases]]).
:::
:::

## Box models and the response to a disturbance

Residence time becomes a dynamical quantity as soon as something changes. The simplest case is a single box with a constant source $S$ and a first-order sink $kM = M/\tau$.

::: proposition One-box relaxation {#prop-onebox}
For a well-mixed reservoir with source $S(t)$ and first-order loss of lifetime $\tau$,
$$
\frac{\mathrm{d}M}{\mathrm{d}t} = S - \frac{M}{\tau} .
$$
If $S$ is constant the steady-state burden is $M_\text{ss} = S\tau$, and from any initial burden $M_0$
$$
M(t) = M_\text{ss} + (M_0 - M_\text{ss})\,e^{-t/\tau} .
$$
The reservoir approaches its new steady state exponentially, closing $63\ \%$ of the gap in one lifetime, $90\ \%$ in $\tau\ln 10 = 2.30\,\tau$ and $99\ \%$ in $4.6\,\tau$. Doubling the source doubles the steady burden; halving the lifetime halves it.
:::

::: proof Solving the one-box equation {#proof-onebox}
Write $\Delta = M - S\tau$. Since $S$ and $\tau$ are constant, $\mathrm{d}\Delta/\mathrm{d}t = \mathrm{d}M/\mathrm{d}t = S - M/\tau = -\Delta/\tau$. This is first-order decay, so $\Delta(t) = \Delta(0)\,e^{-t/\tau}$, i.e. $M(t) - S\tau = (M_0 - S\tau)e^{-t/\tau}$, which is the result with $M_\text{ss} = S\tau$. The fraction of the initial gap closed at time $t$ is $1 - e^{-t/\tau}$; setting this to $0.90$ gives $t = \tau\ln 10$. The equation is the same linear first-order ODE as a first-order chemical reaction with constant feed, solved in [[kinetics/rate-laws]] and on Maths Atlas at [first-order linear equations](/learn/maths/); the environmental content is only in the interpretation of $S$ and $\tau$.
:::

The time constant that governs the approach is the *lifetime*, not the time it took to build the disturbance. A pollutant with a ten-day lifetime responds to emission controls within a month; one with a century lifetime will keep its present burden for generations, whatever is decided this year. This asymmetry is one reason the control of acid rain precursors (lifetimes of days) produced visible improvements within a decade, while the control of chlorofluorocarbons (lifetimes of decades to a century) is expected to take most of this century to repair the ozone layer ([[environmental-chemistry/stratospheric-ozone]]).

::: widget plot
f: S*tau + (M0 - S*tau)*exp(-x/tau); S*tau
x: 0, 60
y: 0, 25
sliders: S=1:0.2:2:0.1; tau=10:1:30:1; M0=2:0:25:1
labels: M(t); M_\mathrm{ss} = S\tau
caption: A one-box reservoir with constant source $S$ (units per year) and first-order lifetime $\tau$ (years), starting from burden $M_0$. Change $S$ and watch the steady state $S\tau$ move; change $\tau$ and watch both the level *and* the speed of approach change. Whatever the starting point, the gap to steady state shrinks by a factor $e$ every lifetime — so a long-lived species is slow to build up and equally slow to clear.
:::

::: example Methane: burden, lifetime and units {#ex-methane-lifetime}
The global mean mole fraction of methane was about $1900\ \mathrm{ppb}$ in the early 2020s (NOAA GML global network). The total mass of dry air is $5.135\times10^{18}\ \mathrm{kg}$ with a mean molar mass of $28.97\ \mathrm{g\,mol^{-1}}$. The total methane sink (mainly oxidation by $\mathrm{OH}$, with smaller losses to soils and the stratosphere) is about $550\ \mathrm{Tg\,yr^{-1}}$ (Saunois et al., 2020, *Earth System Science Data*). Find the burden and the steady-state lifetime.
::: solution
Amount of dry air:
$$
n_\text{air} = \frac{5.135\times10^{21}\ \mathrm{g}}{28.97\ \mathrm{g\,mol^{-1}}} = 1.773\times10^{20}\ \mathrm{mol}.
$$
One ppb of methane is therefore $1.773\times10^{11}\ \mathrm{mol}$, i.e. $1.773\times10^{11}\times16.04\ \mathrm{g} = 2.84\ \mathrm{Tg}$. The burden is
$$
M = 1900 \times 2.84\ \mathrm{Tg} = 5.40\times10^{3}\ \mathrm{Tg}.
$$
Treating the atmosphere as near steady state (methane is in fact rising slowly, by about $0.5\ \%$ per year, so sources slightly exceed sinks):
$$
\tau = \frac{5.40\times10^{3}\ \mathrm{Tg}}{550\ \mathrm{Tg\,yr^{-1}}} = 9.8\ \mathrm{yr}.
$$
This **total atmospheric lifetime** of about a decade is the number quoted by IPCC AR6 (about $9$ years). The *perturbation* lifetime — how fast an added pulse decays — is somewhat longer (AR6: $11.8$ years), because extra methane consumes $\mathrm{OH}$ and so slows its own removal; we meet that feedback in [[environmental-chemistry/tropospheric-chemistry]]. Note the conversion factor: some sources quote $2.75$–$2.78\ \mathrm{Tg\,ppb^{-1}}$, a few per cent less than our $2.84$, because they correct for the lower methane mixing ratio in the stratosphere.
:::
:::

::: warning Residence time, lifetime and adjustment time are different numbers for CO₂ {#warn-co2-lifetime}
It is often said that "a $\mathrm{CO_2}$ molecule stays in the air about five years". That is true and almost irrelevant. About $870\ \mathrm{Pg\,C}$ of $\mathrm{CO_2}$ exchanges with the land biosphere and ocean at gross rates of roughly $120$ and $80\ \mathrm{Pg\,C\,yr^{-1}}$, so an individual molecule's residence time is $870/200 \approx 4$ years. But those gross fluxes are two-way: photosynthesis takes up carbon that respiration returns, and the ocean surface breathes in and out. What matters for an *excess* of $\mathrm{CO_2}$ is the *net* removal, which requires carbon to be mixed into the deep ocean (centuries), neutralised by carbonate sediments (millennia) and finally removed by silicate weathering (hundreds of millennia). The **adjustment time** of a $\mathrm{CO_2}$ perturbation is therefore not one number: a pulse decays in several stages, and roughly a fifth of it is still airborne after a thousand years. The same distinction — individual residence time versus perturbation decay — applies to any species whose sinks are exchanges with other reservoirs rather than destruction.
:::

The multi-stage decay is usually written, following the carbon-cycle model intercomparison of Joos et al. (2013, *Atmospheric Chemistry and Physics*) used in IPCC AR5, as a sum of exponentials
$$
f(t) = a_0 + \sum_{i=1}^{3} a_i\,e^{-t/\tau_i},
$$ {#eq-bern}
with $a_0 = 0.217$, $a_1 = 0.224$ ($\tau_1 = 394\ \mathrm{yr}$), $a_2 = 0.282$ ($\tau_2 = 36.5\ \mathrm{yr}$) and $a_3 = 0.276$ ($\tau_3 = 4.3\ \mathrm{yr}$). The constant term $a_0$ represents the part that, on the timescale of the fit (up to about a millennium), is not removed at all. This is a fit to model output for a particular background state, not a law of nature, but it summarises the physics: fast uptake by the surface ocean and land, slower uptake by the ocean interior, and a long tail.

::: widget plot
f: 0.2173 + 0.2240*exp(-x/394.4) + 0.2824*exp(-x/36.54) + 0.2763*exp(-x/4.304); exp(-x/tau)
x: 0, 500
y: 0, 1.05
sliders: tau=10:2:200:1
labels: \text{CO}_2\text{ pulse airborne (Joos et al. 2013)}; e^{-t/\tau}\text{ single box}
caption: The fraction of a pulse of $\mathrm{CO_2}$ still in the atmosphere $t$ years after emission, from the multi-exponential fit [[#eq-bern]], against a single exponential whose lifetime you set with the slider. No single $\tau$ fits: a short one empties the atmosphere far too fast, a long one misses the rapid early uptake. After $100$ years about $41\ \%$ remains, after $500$ years about $28\ \%$ — the reason $\mathrm{CO_2}$ is treated as a cumulative pollutant.
:::

## Mixing ratios, number densities and the structure of the atmosphere

Before we can talk about atmospheric chemistry we need its units. Chemists in the laboratory use concentrations in $\mathrm{mol\,dm^{-3}}$; atmospheric chemists use two other measures, each suited to a different job.

::: definition Mixing ratio and number density {#def-mixing-ratio}
The **mixing ratio** (mole fraction) $x_i$ of a gas is the amount of $i$ divided by the total amount of air, $x_i = n_i/n_\text{air}$; for an ideal gas it equals the volume fraction and the partial-pressure fraction $p_i/p$. Trace gases are quoted in parts per million ($\mathrm{ppm} = 10^{-6}$, $\mathrm{\mu mol\,mol^{-1}}$), per billion ($\mathrm{ppb} = 10^{-9}$, $\mathrm{nmol\,mol^{-1}}$) or per trillion ($\mathrm{ppt} = 10^{-12}$). Greenhouse gases are reported as **dry-air** mole fractions, to remove the variable dilution by water vapour. The mixing ratio is conserved when an air parcel expands or is compressed, so it is the natural variable for transport. The **number density** $n_i$ (molecules per unit volume, usually $\mathrm{cm^{-3}}$) is what enters rate laws:
$$
n_i = x_i\,\frac{p}{k_\mathrm{B}T},
$$
with $k_\mathrm{B} = 1.380\,649\times10^{-23}\ \mathrm{J\,K^{-1}}$. At $p = 1\ \mathrm{atm}$ and $T = 298\ \mathrm{K}$ the total number density of air is $2.46\times10^{19}\ \mathrm{cm^{-3}}$. Mass concentrations ($\mathrm{\mu g\,m^{-3}}$) are used for particles and in air-quality regulation.
:::

::: example Ozone in parts per billion and molecules per cubic centimetre {#ex-ozone-units}
On a summer afternoon a monitoring station at sea level reports $40\ \mathrm{ppb}$ of ozone at $25\ \mathrm{°C}$ and $1.000\ \mathrm{atm}$. Express this as a number density and as a mass concentration.
::: solution
Total number density:
$$
n_\text{air} = \frac{p}{k_\mathrm{B}T} = \frac{101\,325\ \mathrm{Pa}}{1.3806\times10^{-23}\ \mathrm{J\,K^{-1}} \times 298\ \mathrm{K}} = 2.463\times10^{25}\ \mathrm{m^{-3}} = 2.463\times10^{19}\ \mathrm{cm^{-3}}.
$$
Ozone:
$$
n_{\mathrm{O_3}} = 40\times10^{-9}\times2.463\times10^{19}\ \mathrm{cm^{-3}} = 9.9\times10^{11}\ \mathrm{cm^{-3}}.
$$
Mass concentration: $9.85\times10^{17}\ \mathrm{m^{-3}}$ molecules is $9.85\times10^{17}/6.022\times10^{23} = 1.64\times10^{-6}\ \mathrm{mol\,m^{-3}}$, times $48.00\ \mathrm{g\,mol^{-1}}$, giving $7.8\times10^{-5}\ \mathrm{g\,m^{-3}} = 79\ \mathrm{\mu g\,m^{-3}}$. The rule of thumb at $25\ \mathrm{°C}$ is $1\ \mathrm{ppb} = M/24.45\ \mathrm{\mu g\,m^{-3}}$ (with $M$ in $\mathrm{g\,mol^{-1}}$), so $40\times48.00/24.45 = 79\ \mathrm{\mu g\,m^{-3}}$. Air-quality guidelines are written in mass units, so this conversion — which depends on temperature and pressure — must always be stated.
:::
:::

The atmosphere is not a box of uniform density: it thins with height because each layer supports the weight of the air above.

::: proposition The barometric law and the scale height {#prop-barometric}
For an atmosphere in hydrostatic equilibrium, behaving as an ideal gas of mean molar mass $M$ at uniform temperature $T$ (an isothermal approximation), pressure falls exponentially with altitude $z$:
$$
p(z) = p_0\,e^{-z/H}, \qquad H = \frac{RT}{Mg},
$$
where $H$ is the **scale height**. For air ($M = 0.02897\ \mathrm{kg\,mol^{-1}}$, $g = 9.81\ \mathrm{m\,s^{-2}}$) $H = 7.3\ \mathrm{km}$ at $250\ \mathrm{K}$ and $8.4\ \mathrm{km}$ at $288\ \mathrm{K}$. Number density falls the same way. Since the real atmosphere is not isothermal, $H$ varies with height, but the law is good to a few per cent locally with the local $T$.
:::

::: proof Hydrostatic balance {#proof-barometric}
Consider a thin horizontal slab of air of area $A$ and thickness $\mathrm{d}z$. Its weight $\rho g A\,\mathrm{d}z$ is supported by the pressure difference across it: $p(z)A - p(z + \mathrm{d}z)A = \rho g A\,\mathrm{d}z$, so $\mathrm{d}p/\mathrm{d}z = -\rho g$. The ideal-gas law gives $\rho = pM/(RT)$, hence
$$
\frac{\mathrm{d}p}{\mathrm{d}z} = -\frac{Mg}{RT}\,p = -\frac{p}{H}.
$$
With $T$ (and hence $H$) constant, separation of variables gives $\ln(p/p_0) = -z/H$, i.e. $p = p_0 e^{-z/H}$. Numerically, $H = 8.314 \times 250/(0.02897\times9.81) = 7.31\times10^{3}\ \mathrm{m}$. Half of the atmosphere's mass lies below $H\ln 2 \approx 5\ \mathrm{km}$, and $90\ \%$ below about $17\ \mathrm{km}$ — roughly the tropical tropopause.
:::

The vertical temperature structure divides the atmosphere into layers that matter chemically. In the **troposphere** (surface to $8$–$17\ \mathrm{km}$, higher in the tropics) temperature falls with height at about $6.5\ \mathrm{K\,km^{-1}}$ on average, because the air is heated from the ground; warm air below cold air is unstable, so the troposphere overturns vertically in days to weeks and contains almost all of the water and weather. Above the **tropopause** lies the **stratosphere** (to about $50\ \mathrm{km}$), where temperature *rises* with height because ozone absorbs solar ultraviolet ([[environmental-chemistry/stratospheric-ozone]]); warm air over cold is stable, vertical mixing is slow, and air entering the stratosphere stays there for a few years. That stability is why long-lived pollutants injected into the stratosphere — by volcanoes, or as chlorofluorocarbons that survive the troposphere — linger. Horizontal mixing is faster: a few weeks around a latitude circle, a month or two from pole to equator within a hemisphere, and about a year between hemispheres, whose air is partly separated by the tropical convergence zone.

## The redox state of the Earth's surface

The second organising idea is chemical. Photosynthesis is a reduction driven by light,
$$
\mathrm{CO_2(g)} + \mathrm{H_2O(l)} \xrightarrow{h\nu} \mathrm{CH_2O} + \mathrm{O_2(g)}, \qquad \Delta_\mathrm{r}G^\circ \approx +480\ \mathrm{kJ\,mol^{-1}},
$$
where $\mathrm{CH_2O}$ stands for a unit of carbohydrate. Every molecule of $\mathrm{O_2}$ in the air is matched, somewhere, by a reduced carbon atom (or, via its reaction products, a reduced sulfur or iron atom). Almost all of that reduced material is respired back within years to centuries, but a small fraction is buried in sediments; over geological time this burial has built up the oxygen of the atmosphere, while the buried carbon (mostly dispersed kerogen, with a tiny fraction as coal, oil and gas) and sulfides hold the matching reducing power. The Earth's surface is thus a giant charged battery: an oxidised atmosphere and ocean in contact with a reduced biosphere and crust, separated by kinetic barriers. Life and fire discharge it locally; photosynthesis recharges it.

It is useful to arrange the important species of each element on an **oxidation-state ladder**:

| element | most reduced | intermediate | most oxidised |
|---|---|---|---|
| carbon | $\mathrm{CH_4}$ ($-4$) | $\mathrm{CH_2O}$, organic matter ($0$), $\mathrm{CO}$ ($+2$) | $\mathrm{CO_2}$, $\mathrm{HCO_3^-}$, $\mathrm{CO_3^{2-}}$ ($+4$) |
| nitrogen | $\mathrm{NH_3}$, $\mathrm{NH_4^+}$, organic N ($-3$) | $\mathrm{N_2}$ ($0$), $\mathrm{N_2O}$ ($+1$), $\mathrm{NO}$ ($+2$), $\mathrm{NO_2^-}$ ($+3$), $\mathrm{NO_2}$ ($+4$) | $\mathrm{HNO_3}$, $\mathrm{NO_3^-}$ ($+5$) |
| sulfur | $\mathrm{H_2S}$, $\mathrm{FeS_2}$ ($-2$, $-1$), $(\mathrm{CH_3})_2\mathrm{S}$ ($-2$) | $\mathrm{S}$ ($0$), $\mathrm{SO_2}$, $\mathrm{HSO_3^-}$ ($+4$) | $\mathrm{H_2SO_4}$, $\mathrm{SO_4^{2-}}$ ($+6$) |

In an atmosphere containing $21\ \%$ $\mathrm{O_2}$, the thermodynamically stable forms are the top-right entries: $\mathrm{CO_2}$, nitrate, sulfate. Reduced species emitted into the air — methane, ammonia, hydrogen sulfide, dimethyl sulfide, sulfur dioxide, carbon monoxide — are all oxidised, and their lifetimes are set not by thermodynamics (which is overwhelmingly favourable) but by the kinetics of reaction with the hydroxyl radical, the atmosphere's principal oxidant ([[environmental-chemistry/tropospheric-chemistry]]). In waters and soils cut off from the air, microbes exploit the same ladder in reverse, using nitrate, manganese(IV), iron(III), sulfate and finally $\mathrm{CO_2}$ itself as oxidants once oxygen is used up — the redox sequence of [[environmental-chemistry/natural-waters]].

::: example Why is there still nitrogen in the air? {#ex-sillen}
The Swedish chemist Lars Gunnar Sillén asked in the 1960s what the ocean–atmosphere system would look like at equilibrium. Consider
$$
\mathrm{N_2(g)} + \tfrac{5}{2}\,\mathrm{O_2(g)} + \mathrm{H_2O(l)} \rightleftharpoons 2\,\mathrm{H^+(aq)} + 2\,\mathrm{NO_3^-(aq)} .
$$
Using $\Delta_\mathrm{f}G^\circ(\mathrm{NO_3^-,aq}) = -111.3\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{f}G^\circ(\mathrm{H_2O,l}) = -237.13\ \mathrm{kJ\,mol^{-1}}$ (NBS tables, 298.15 K), find $\Delta_\mathrm{r}G^\circ$ and then $\Delta_\mathrm{r}G$ for air ($p_{\mathrm{N_2}} = 0.78$, $p_{\mathrm{O_2}} = 0.21$ bar) over sea water at $\mathrm{pH}\ 8$ containing $1\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ nitrate. Interpret.
::: solution
Standard reaction Gibbs energy (elements in their standard states, $\mathrm{H^+}$ zero by convention):
$$
\Delta_\mathrm{r}G^\circ = 2(-111.3) - (-237.13) = +14.5\ \mathrm{kJ\,mol^{-1}} .
$$
Under standard conditions (1 M acid!) the reaction is slightly unfavourable. But the reaction quotient for real conditions is
$$
Q = \frac{[\mathrm{H^+}]^2[\mathrm{NO_3^-}]^2}{p_{\mathrm{N_2}}\,p_{\mathrm{O_2}}^{5/2}}, \qquad
\ln Q = 2\ln(10^{-8}) + 2\ln(10^{-5}) - \ln 0.78 - \tfrac{5}{2}\ln 0.21 = -55.7 ,
$$
(water as pure liquid, activity $1$; activity coefficients ignored), so
$$
\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q = 14.5 + (8.314\times10^{-3})(298.15)(-55.7) = -124\ \mathrm{kJ\,mol^{-1}} .
$$
Strongly negative: the reaction would run forward until nitrate accumulated and the sea became much more acidic, consuming a large share of the atmospheric oxygen. That it has not done so is purely kinetic. The $\mathrm{N{\equiv}N}$ triple bond ($945\ \mathrm{kJ\,mol^{-1}}$) makes $\mathrm{N_2}$ extraordinarily inert; it is broken only by lightning, combustion at high temperature, the nitrogenase enzyme of nitrogen-fixing microbes and the Haber–Bosch process — and the nitrate that is formed is returned to $\mathrm{N_2}$ by denitrifying bacteria. The atmosphere's composition is a **kinetic steady state**, not an equilibrium, and that is the general lesson: in environmental chemistry, thermodynamics tells you the direction, and rates tell you the state.
:::
:::

## The carbon cycle

Carbon is the element whose cycle we know best, because it is both the currency of life and the main driver of anthropogenic climate change. The carbon cycle is conventionally split into a **fast** cycle — atmosphere, ocean, land biosphere and soils, exchanging on timescales of years to millennia — and a **slow** geological cycle of rock weathering, sedimentation, subduction and volcanism on timescales of $10^{5}$–$10^{8}$ years.

The main reservoirs, from the assessment in IPCC AR6 Working Group I, Chapter 5 (2021), with rounded values:

| reservoir | carbon / $\mathrm{Pg\,C}$ |
|---|---|
| atmosphere (pre-industrial, about $278\ \mathrm{ppm}$) | $\approx 590$ |
| atmosphere (2019, about $410\ \mathrm{ppm}$) | $\approx 870$ |
| vegetation | $450$–$650$ |
| soils (excluding permafrost) | $\approx 1500$–$2400$ |
| permafrost | $\approx 1400$ |
| surface ocean dissolved inorganic carbon | $\approx 900$ |
| intermediate and deep ocean dissolved inorganic carbon | $\approx 37\,000$ |
| fossil fuel reserves | $\approx 900$–$1600$ |
| sedimentary carbonate rocks and kerogen | $\sim 10^{8}$ |

The ocean dominates the fast cycle: it holds about fifty times as much carbon as the atmosphere, nearly all of it as bicarbonate ion. That is why the ocean is ultimately where most fossil carbon will go — and why it acidifies in the process ([[environmental-chemistry/greenhouse-gases]] and [[environmental-chemistry/natural-waters]]).

The gross fluxes are large. Terrestrial gross primary production (photosynthesis) is about $120$–$140\ \mathrm{Pg\,C\,yr^{-1}}$, very nearly balanced by plant respiration, soil respiration and fire; the gross air–sea exchange is about $80$–$90\ \mathrm{Pg\,C\,yr^{-1}}$ in each direction. Against these, the anthropogenic perturbation is small in flux but persistent in sign.

::: example The global carbon budget of the 2010s {#ex-carbon-budget}
IPCC AR6 (WG1, Chapter 5, 2021) gives the following mean fluxes for 2010–2019, in $\mathrm{Pg\,C\,yr^{-1}}$: fossil-fuel and cement emissions $9.6 \pm 0.5$; net land-use-change emissions $1.6 \pm 0.7$; atmospheric increase $5.1 \pm 0.02$; ocean sink $2.5 \pm 0.6$; land sink $3.4 \pm 0.9$. (a) Check the budget closes. (b) What is the airborne fraction? (c) Convert the atmospheric increase into a rate of rise of the $\mathrm{CO_2}$ mole fraction.
::: solution
(a) Sources: $9.6 + 1.6 = 11.2$. Sinks plus growth: $5.1 + 2.5 + 3.4 = 11.0$. The imbalance of $0.2\ \mathrm{Pg\,C\,yr^{-1}}$ is well inside the combined uncertainty (adding the standard uncertainties in quadrature, about $\pm1.4$); it is reported as a "budget imbalance" and not forced to zero.

(b) The **airborne fraction** is the atmospheric increase divided by total emissions:
$$
\frac{5.1}{11.2} = 0.46 .
$$
Slightly less than half of what was emitted stayed in the air; the rest was taken up roughly equally by the ocean and the land. This fraction has been remarkably stable since 1960 despite emissions roughly quadrupling.

(c) From [[#ex-methane-lifetime]], one ppm of any gas is $1.773\times10^{14}\ \mathrm{mol}$; for carbon that is $1.773\times10^{14}\times12.011\ \mathrm{g} = 2.13\ \mathrm{Pg\,C}$. So
$$
\frac{5.1\ \mathrm{Pg\,C\,yr^{-1}}}{2.13\ \mathrm{Pg\,C\,ppm^{-1}}} = 2.4\ \mathrm{ppm\,yr^{-1}},
$$
in agreement with the decadal mean growth rate at NOAA's Mauna Loa Observatory. (The conventional factor is $2.124\ \mathrm{Pg\,C\,ppm^{-1}}$.)
:::
:::

As of 2026, the most recent complete annual mean of $\mathrm{CO_2}$ at Mauna Loa that we can date with confidence is that for 2024, about $424.6\ \mathrm{ppm}$ (NOAA Global Monitoring Laboratory, with Scripps Institution of Oceanography), about $52\ \%$ above the pre-industrial value of about $278\ \mathrm{ppm}$; the 2023–2024 increase of about $3.7\ \mathrm{ppm}$ was the largest in the record, boosted by an El Niño year that weakened the land sink. The Global Carbon Project's *Global Carbon Budget 2024* estimated fossil $\mathrm{CO_2}$ emissions for 2024 at about $37.4\ \mathrm{Gt\,CO_2}$, i.e. about $10.2\ \mathrm{Pg\,C}$. Always check the current values in the source before quoting them: the record is updated monthly.

## The nitrogen cycle

Nitrogen is the most abundant element in the atmosphere and, paradoxically, often the one that limits plant growth, because almost all of it is locked up as unreactive $\mathrm{N_2}$ ([[#ex-sillen]]). Environmental chemists therefore distinguish $\mathrm{N_2}$ from **reactive nitrogen** ($\mathrm{N_r}$): every other nitrogen compound — ammonia and ammonium, nitrate and nitrite, the nitrogen oxides $\mathrm{NO_x} = \mathrm{NO} + \mathrm{NO_2}$, nitrous oxide, and organic nitrogen.

The cycle consists of a few microbial and chemical transformations:

- **Fixation** converts $\mathrm{N_2}$ into $\mathrm{N_r}$: biological fixation by nitrogenase in bacteria (some free-living, some in the root nodules of legumes), a small contribution from lightning ($\mathrm{N_2 + O_2 \rightarrow 2\,NO}$ in the hot channel), and — since the early twentieth century — industrial fixation by the Haber–Bosch process and incidental fixation in high-temperature combustion, which makes $\mathrm{NO}$ from the air.
- **Ammonification** (mineralisation) releases ammonium from decaying organic matter.
- **Nitrification**: aerobic bacteria and archaea oxidise ammonium to nitrite and then nitrate, $\mathrm{NH_4^+ + 2\,O_2 \rightarrow NO_3^- + 2\,H^+ + H_2O}$ — an acidifying reaction, which is one reason ammonium fertilisers acidify soils.
- **Denitrification**: in the absence of oxygen, heterotrophic bacteria use nitrate as the electron acceptor, reducing it stepwise through $\mathrm{NO_2^-}$, $\mathrm{NO}$ and $\mathrm{N_2O}$ to $\mathrm{N_2}$; **anammox** bacteria couple ammonium and nitrite directly to $\mathrm{N_2}$. These close the cycle.

Both nitrification and denitrification leak nitrous oxide, $\mathrm{N_2O}$, a long-lived greenhouse gas (lifetime about $110$ years) and, since the phase-out of chlorofluorocarbons, the largest emission of an ozone-depleting substance by weight. The human perturbation of the nitrogen cycle is proportionally much larger than that of the carbon cycle: industrial and agricultural fixation now rivals or exceeds natural terrestrial biological fixation, and the excess reactive nitrogen cascades through the environment — as $\mathrm{NO_x}$ and ozone in the air, as ammonium nitrate particles, as nitric acid in rain, as nitrate in groundwater and as the nutrient that drives coastal eutrophication.

The **Redfield ratio** connects the nitrogen and carbon cycles in the ocean. Alfred Redfield (1934) noticed that marine plankton and the dissolved nutrients of the deep sea share nearly the same atomic ratio $\mathrm{C:N:P} = 106:16:1$. The remineralisation of such organic matter is commonly written
$$
(\mathrm{CH_2O})_{106}(\mathrm{NH_3})_{16}\mathrm{H_3PO_4} + 138\,\mathrm{O_2} \rightarrow 106\,\mathrm{CO_2} + 16\,\mathrm{HNO_3} + \mathrm{H_3PO_4} + 122\,\mathrm{H_2O},
$$
an idealised stoichiometry (real plankton vary) which explains why oxygen falls as nitrate and phosphate rise in deep water, and which lets oceanographers use one nutrient to infer the others.

## The sulfur cycle

Sulfur spans oxidation states from $-2$ to $+6$ and moves between the atmosphere, the ocean, sediments and the crust. Its natural sources to the atmosphere are dominated by **dimethyl sulfide** (DMS, $(\mathrm{CH_3})_2\mathrm{S}$) produced by marine phytoplankton, by volcanic $\mathrm{SO_2}$ and $\mathrm{H_2S}$, and by sea spray (as sulfate, which is already fully oxidised). Its anthropogenic source is overwhelmingly $\mathrm{SO_2}$ from burning sulfur-containing coal and oil and from smelting sulfide ores; at its peak in the second half of the twentieth century this exceeded the natural flux to the atmosphere.

In the atmosphere, every reduced or intermediate sulfur species is oxidised to sulfate within days, by $\mathrm{OH}$ in the gas phase and by hydrogen peroxide and ozone in cloud droplets. Sulfate forms fine particles that scatter sunlight and seed clouds, and it is removed by rain as sulfuric acid — the subject of [[environmental-chemistry/particulates-acid-deposition]]. In the ocean, sulfate is the second most abundant anion after chloride (about $28\ \mathrm{mmol\,kg^{-1}}$), with a residence time of millions of years. In anoxic sediments, sulfate-reducing bacteria use it to oxidise organic matter, producing sulfide that precipitates as iron sulfides (pyrite, $\mathrm{FeS_2}$); burial of pyrite is, after organic carbon, the second great long-term source of atmospheric oxygen.

Because anthropogenic sulfur is short-lived, its burden responds quickly to policy. Under the Convention on Long-Range Transboundary Air Pollution (1979) and its protocols, the US Clean Air Act Amendments of 1990, and later Chinese emission controls on power stations, global anthropogenic $\mathrm{SO_2}$ emissions have fallen substantially from their peak, with European and North American emissions falling by well over $80\ \%$ since 1980 (European Environment Agency and US EPA emission inventories). As we shall see, the cleaner air has itself a climatic side effect, because sulfate aerosol had been masking part of the greenhouse warming.

::: quiz
A gas has a mean tropospheric lifetime of $3$ days. Which statement best describes how it will be distributed?
- [ ] Nearly uniform over the globe, because the troposphere is turbulent.
- [x] Highly variable, concentrated near its sources, because it is removed before it can mix over even one hemisphere.
- [ ] Uniform within each hemisphere but different between them.
- [ ] Concentrated in the stratosphere, where it accumulates.
::: solution
Mixing round a latitude band takes a few weeks and between hemispheres about a year, so a $3$-day species is destroyed long before it is mixed: by Junge's rule its spatial variability is large. Uniform within each hemisphere is the signature of lifetimes of months to a year; global uniformity needs lifetimes of several years or more. Nothing with a three-day tropospheric lifetime reaches the stratosphere in quantity, since exchange across the tropopause takes months.
:::
:::

::: history
The idea that the elements circulate through life and the Earth goes back to the nineteenth century — Jean-Baptiste Boussingault's field studies of nitrogen in agriculture in the 1830s, and Svante Arrhenius's estimate in 1896 of the warming that a doubling of atmospheric $\mathrm{CO_2}$ would cause — but the modern framework was set by the Russian mineralogist Vladimir Vernadsky, whose *The Biosphere* (1926) treated living matter as a geological force that moves and transforms the elements. Alfred Redfield's 1934 paper on the composition of plankton and sea water gave the ocean its stoichiometry. Fritz Haber's ammonia synthesis (1909), industrialised by Carl Bosch at BASF in 1913, began the human takeover of the nitrogen cycle. In 1958 Charles David Keeling began continuous $\mathrm{CO_2}$ measurements at Mauna Loa, Hawaiʻi; within a few years the record showed both the seasonal "breathing" of the northern biosphere and the steady rise from fossil fuels, and it remains the longest direct record of a global greenhouse gas.
:::

## Where this leads

The two tools of this lesson recur in every chapter. Residence times and box models set the stage for the photochemistry of [[environmental-chemistry/stratospheric-ozone]] (why chlorofluorocarbons reach the stratosphere) and [[environmental-chemistry/tropospheric-chemistry]] (why the hydroxyl radical controls the lifetimes of almost everything); for the distinction between local and global pollution in [[environmental-chemistry/particulates-acid-deposition]]; and for the carbon cycle and radiative forcing in [[environmental-chemistry/greenhouse-gases]]. The redox ladder and the dominance of carbonate in sea water are taken up quantitatively in [[environmental-chemistry/natural-waters]], and multi-compartment boxes reappear as fugacity models in [[environmental-chemistry/pollutants-fate]]. The mathematics — linear first-order differential equations and systems of them — is treated on [Maths Atlas](/learn/maths/).

::: summary
- The Earth system is modelled as well-mixed **reservoirs** linked by **fluxes**; mass balance $\mathrm{d}M/\mathrm{d}t = F_\text{in} - F_\text{out}$. Steady state ($\mathrm{d}M/\mathrm{d}t = 0$) is not equilibrium.
- **Residence time** $\tau = M/F$ is the mean transit time in steady state; for first-order loss it is also the lifetime, and a box relaxes to its new steady state $S\tau$ as $e^{-t/\tau}$.
- Lifetime fixes the spatial scale of a pollutant: short-lived species are local and variable, species living longer than about a year are globally mixed (Junge's empirical rule).
- Mixing ratios (ppm, ppb) are conserved in transport; number densities $n = xp/(k_\mathrm{B}T)$ enter rate laws; mass concentrations are used in regulation. One ppm of a gas is $1.77\times10^{14}\ \mathrm{mol}$, i.e. $2.13\ \mathrm{Pg\,C}$ for $\mathrm{CO_2}$.
- Pressure falls with altitude as $e^{-z/H}$ with scale height $H = RT/(Mg) \approx 7$–$8\ \mathrm{km}$; the stable stratosphere is slow to exchange with the overturning troposphere.
- The surface is an oxidised atmosphere over a reduced biosphere and crust, held far from equilibrium by photosynthesis and slow kinetics; $\mathrm{N_2}$ survives in air only because it is kinetically inert.
- In 2010–2019 fossil and land-use emissions were about $11.2\ \mathrm{Pg\,C\,yr^{-1}}$, of which about $46\ \%$ stayed airborne (IPCC AR6); a $\mathrm{CO_2}$ pulse decays in stages, with about a fifth remaining after a millennium.
- Reactive nitrogen and sulfur cycles have been strongly perturbed by fertiliser production and combustion; their short-lived species respond within years to emission controls.
:::

## Exercises

::: exercise The lifetime of carbon monoxide {level=1 check="50"}
The global burden of carbon monoxide is about $340\ \mathrm{Tg}$ and its total source about $2500\ \mathrm{Tg\,yr^{-1}}$. Assuming steady state, estimate its lifetime. (Enter the lifetime in days, to two significant figures.)
::: solution
$\tau = M/F = 340/2500\ \mathrm{yr} = 0.136\ \mathrm{yr} = 0.136\times365 = 49.6\ \mathrm{d} \approx 50\ \mathrm{d}$. Two months is comparable with the time to mix a hemisphere but shorter than interhemispheric exchange, so CO is noticeably more abundant in the northern hemisphere, where most combustion occurs. Its main sink is reaction with $\mathrm{OH}$.
:::
:::

::: exercise From ppm to petagrams {level=1 check="894"}
Using $n_\text{air} = 1.773\times10^{20}\ \mathrm{mol}$ for the dry atmosphere, convert a global mean $\mathrm{CO_2}$ mole fraction of $420\ \mathrm{ppm}$ into an atmospheric carbon burden. (Enter the burden in $\mathrm{Pg\,C}$, to three significant figures.)
::: solution
One ppm is $1.773\times10^{14}\ \mathrm{mol}$; for carbon, $1.773\times10^{14}\times12.011\ \mathrm{g} = 2.129\times10^{15}\ \mathrm{g} = 2.129\ \mathrm{Pg\,C}$. Then $420\times2.129 = 894\ \mathrm{Pg\,C}$. (With the conventional $2.124$ factor, $892$.) Note the unit: petagrams of carbon, not of $\mathrm{CO_2}$; multiply by $44.01/12.011 = 3.664$ to get $\mathrm{CO_2}$ mass.
:::
:::

::: exercise Number density of CO₂ {level=1 check="10.7"}
Find the number density of $\mathrm{CO_2}$ molecules in air at $420\ \mathrm{ppm}$, $288\ \mathrm{K}$ and $1.000\ \mathrm{atm}$. (Enter it in units of $10^{15}\ \mathrm{cm^{-3}}$, to three significant figures.)
::: solution
$n_\text{air} = p/(k_\mathrm{B}T) = 101\,325/(1.3806\times10^{-23}\times288) = 2.548\times10^{25}\ \mathrm{m^{-3}} = 2.548\times10^{19}\ \mathrm{cm^{-3}}$. Then $n_{\mathrm{CO_2}} = 420\times10^{-6}\times2.548\times10^{19} = 1.07\times10^{16}\ \mathrm{cm^{-3}} = 10.7\times10^{15}\ \mathrm{cm^{-3}}$.
:::
:::

::: exercise Clearing a pollutant {level=2 check="8.2"}
A trace gas has a first-order atmospheric lifetime of $12$ years. If its emissions stopped completely, what percentage of the present burden would remain after $30$ years? (Enter the percentage, to two significant figures.)
::: solution
With $S = 0$, [[#prop-onebox]] gives $M(t) = M_0 e^{-t/\tau}$, so $M/M_0 = e^{-30/12} = e^{-2.5} = 0.082$, i.e. $8.2\ \%$. The same arithmetic applies to the ozone-depleting gases whose emissions have largely ceased: decades are needed even when sources are zero.
:::
:::

::: exercise Approaching a new steady state {level=2 check="21"}
Methane's perturbation lifetime is taken as $9.1$ years in a simple model. If its source increased abruptly by $10\ \%$ and then stayed constant, how long would the burden take to complete $90\ \%$ of its rise to the new steady state? (Enter the time in years, to two significant figures.)
::: solution
From [[#prop-onebox]] the gap closes as $e^{-t/\tau}$, so $90\ \%$ is reached when $e^{-t/\tau} = 0.10$: $t = \tau\ln10 = 9.1\times2.303 = 21\ \mathrm{yr}$. The size of the step ($10\ \%$) does not matter: the time constant is set by the lifetime alone (in a linear model; the real perturbation lifetime itself increases slightly with methane because of the $\mathrm{OH}$ feedback).
:::
:::

::: exercise Oxygen demand of Redfield organic matter {level=2 check="138"}
Balance the complete oxidation of Redfield organic matter, $(\mathrm{CH_2O})_{106}(\mathrm{NH_3})_{16}\mathrm{H_3PO_4}$, to $\mathrm{CO_2}$, $\mathrm{HNO_3}$, $\mathrm{H_3PO_4}$ and $\mathrm{H_2O}$. How many $\mathrm{O_2}$ molecules are consumed per formula unit? (Enter the number.)
::: hint
Count electrons: carbon goes from $0$ to $+4$, nitrogen from $-3$ to $+5$, phosphorus stays $+5$; each $\mathrm{O_2}$ accepts four electrons.
:::
::: solution
Electrons released: carbon $106\times4 = 424$; nitrogen $16\times8 = 128$; total $552$. Each $\mathrm{O_2}$ accepts $4$, so $552/4 = 138\ \mathrm{O_2}$. Check by atoms: $\mathrm{H}$ on the left $= 212 + 48 + 3 = 263$; on the right $16 + 3 + 2\times122 = 263$ ✓. $\mathrm{O}$ on the left $= 106 + 4 + 276 = 386$; on the right $212 + 48 + 4 + 122 = 386$ ✓. So $138\ \mathrm{O_2}$, of which $106$ oxidise carbon and $32$ oxidise ammonia to nitrate — which is why the ratio of oxygen consumed to nitrate released in deep water ($138/16 \approx 8.6$) is a classic oceanographic constraint.
:::
:::

::: exercise Apparent lifetime of a growing species {level=3 check="8.33"}
A species has first-order lifetime $\tau$ and a source growing exponentially, $S(t) = S_0 e^{rt}$. (a) Show that after transients have died away $M(t) = S(t)\,\tau/(1 + r\tau)$. (b) An observer who assumes steady state computes an "apparent lifetime" $M/S$. For $\tau = 10\ \mathrm{yr}$ and $r = 0.020\ \mathrm{yr^{-1}}$, what does she obtain? (Enter the apparent lifetime in years, to three significant figures.)
::: hint
Try a particular solution of the form $M = A e^{rt}$.
:::
::: solution
(a) Substitute $M = Ae^{rt}$ into $\mathrm{d}M/\mathrm{d}t = S_0e^{rt} - M/\tau$: $rA = S_0 - A/\tau$, so $A = S_0\tau/(1 + r\tau)$. The general solution adds $Ce^{-t/\tau}$, which dies away; hence $M(t) \to S(t)\tau/(1 + r\tau)$. (b) $M/S = \tau/(1 + r\tau) = 10/1.20 = 8.33\ \mathrm{yr}$. A species whose source is growing is always *below* its steady-state burden for the current source, because the burden lags the source by about one lifetime; inferring lifetimes from $M/S$ without correcting for the trend underestimates them. For methane the correction is small (growth of $\sim0.5\ \%$ per year gives $r\tau \approx 0.05$); for a fast-growing industrial gas it can be large.
:::
:::

::: exercise The nitrate paradox at sea {level=3 check="-119"}
Repeat [[#ex-sillen]] for present-day conditions: $p_{\mathrm{N_2}} = 0.7808$, $p_{\mathrm{O_2}} = 0.2095$, $\mathrm{pH} = 8.1$ and $[\mathrm{NO_3^-}] = 30\ \mathrm{\mu mol\,dm^{-3}}$ (typical of deep water), at $298.15\ \mathrm{K}$, ignoring activity coefficients. Then estimate the equilibrium constant $K$ of the reaction and comment on its size relative to $Q$. (Enter $\Delta_\mathrm{r}G$ in $\mathrm{kJ\,mol^{-1}}$, to three significant figures.)
::: solution
$\ln Q = 2\ln(10^{-8.1}) + 2\ln(3.0\times10^{-5}) - \ln0.7808 - 2.5\ln0.2095 = -37.30 - 20.83 + 0.247 + 3.906 = -53.98$. Then $\Delta_\mathrm{r}G = 14.53 + 2.479\times(-53.98) = 14.53 - 133.8 = -119\ \mathrm{kJ\,mol^{-1}}$. The equilibrium constant is $K = e^{-\Delta_\mathrm{r}G^\circ/RT} = e^{-14530/2479} = 2.8\times10^{-3}$, while $Q = e^{-54.0} \approx 3.6\times10^{-24}$; $Q/K \sim 10^{-21}$, an enormous departure from equilibrium. Raising nitrate twenty-one orders of magnitude is impossible, of course: long before that the pH would fall and the oxygen would run out, and a proper equilibrium calculation must let all concentrations adjust together (Sillén found that such an "equilibrium ocean" would be acidic and that most of the oxygen would be consumed). The point stands: only the inertness of $\mathrm{N_2}$ and the return flux by denitrification keep the atmosphere as it is.
:::
:::

::: exercise Pressure at the top of Everest {level=2 check="30"}
Using the isothermal barometric law with $H = 7.3\ \mathrm{km}$, estimate the pressure at the summit of Mount Everest ($8.85\ \mathrm{km}$) given $101.3\ \mathrm{kPa}$ at sea level. (Enter the pressure in kPa, to two significant figures.)
::: solution
$p = 101.3\,e^{-8.85/7.3} = 101.3\times0.298 = 30\ \mathrm{kPa}$. The measured value is about $33\ \mathrm{kPa}$; the isothermal approximation with a cold-atmosphere $H$ underestimates it, because the lower troposphere is warmer than $250\ \mathrm{K}$ and has a larger scale height. The partial pressure of oxygen scales the same way, since its mole fraction is constant with height.
:::
:::
