The tropics absorb about $60\ \mathrm{W\,m^{-2}}$ more radiation than they emit at the top of the atmosphere, the winter polar night belt loses nearly as much, and the difference — a continuous loss of perhaps $60$ terawatts per degree of latitude from the tropics — is the engine's fuel bill. The atmosphere and ocean between them move about $5$–$6$ million megawatts from the tropics toward the poles, more than a hundred times the power consumption of human civilisation, and without that conveyor the tropics would be tens of degrees hotter and the poles unrecognisably colder. How that transport is accomplished — by which carriers, at which latitudes, in which seasons, and how much of it the ocean does — is one of the most precisely measured and least understood parts of the climate system: we can draw the budget to within ten per cent from satellites and ships, and still cannot say how it will shift this century.

## The observed budget

::: definition The structure of the poleward energy transport {#def-transport-budget}
The zonal-mean, vertically-integrated transport of total energy (radiative plus latent plus sensible, atmosphere plus ocean) peaks near $20^{\circ}\mathrm{N}$ at about $5\ \mathrm{PW}$ in the annual mean, with a smaller southern-hemisphere maximum near $20^{\circ}\mathrm{S}$ of $3$–$4\ \mathrm{PW}$; it falls to near zero at the equator on the annual average — the two hemispheres' maxima face each other across a transport minimum — and toward the poles as the temperature contrast that drives it collapses. The atmosphere carries roughly two thirds of the total, peaking near the equinoxes and migrating with the seasonal contrast; the ocean carries the remainder, and its share is largest in the Atlantic, where the western boundary currents and the overturning together move $\sim 1.3\ \mathrm{PW}$ across $25\ ^\circ\mathrm{N}$ — half the planet's cross-equatorial energy transport in one ocean basin. The atlas of these numbers is the life's work of **Adriaan Oort** and **Jorge Peixoto**, whose hydrographic and radiosonde compilations from the 1950s to the 1990s remain the standard reference, now cross-checked by the CERES radiation budget from 2000 onward.
:::

::: widget plot
f: 5.5*exp(-(x-22)*(x-22)/1100); 3.6*exp(-(x+20)*(x+20)/1100)
x: -60, 70
y: 0, 6
labels: F\ (\text{PW}),\ NH;\ F,\ SH
caption: Schematic annual-mean poleward energy transport in each hemisphere, peaking near $20^\circ$ latitude at about $5.5$ and $3.6\ \mathrm{PW}$ — the shape, not the exact heights, is the point: the transport vanishes at the equator (the two maxima face each other across a minimum), vanishes at the poles where the temperature contrast dies, and is asymmetric between hemispheres because the hemispheres are not alike — the north has the continents, the deserts, the monsoons and the overturning. Note how far from the poles the maxima sit: the engine's cargo is delivered mostly to the subtropics and middle latitudes, not to the Arctic.
:::

::: example A diffusive estimate of the atmospheric transport {#ex-diffusive}
Parameterise the atmospheric energy transport by eddy diffusion with an effective diffusivity $D = 1\times10^{6}\ \mathrm{m^{2}\,s^{-1}}$ acting through an effective depth $H = 5\ \mathrm{km}$ ($\rho c_p = 1206\ \mathrm{J\,m^{-3}\,K^{-1}}$) on a mean meridional temperature gradient $|\mathrm{d}T/\mathrm{d}y| = 6\times10^{-6}\ \mathrm{K\,m^{-1}}$ ($6\ \mathrm{K}$ per $1000\ \mathrm{km}$). Find the transport across the latitude circle at $30^{\circ}$.
::: solution
The flux per unit area is $\rho c_p D\,|\mathrm{d}T/\mathrm{d}y| = 1206\times10^{6}\times6\times10^{-6} = 7.2\ \mathrm{W\,m^{-2}}$, and across the band of circumference $2\pi a\cos30^{\circ} = 3.5\times10^{7}\ \mathrm{m}$ and depth $H$,
$$
F = 7.2 \times (3.5\times10^{7}\times5\times10^{3}) = 1.3\times10^{15}\ \mathrm{W} = 1.3\ \mathrm{PW}.
$$
One petawatt for a plausible diffusivity — the observed $3$–$4\ \mathrm{PW}$ atmospheric peak needs $D \sim (2$–$3)\times10^{6}\ \mathrm{m^{2}\,s^{-1}}$, and that number, two orders of magnitude above molecular values, is the quantitative signature of the **eddies**: the transport is done by weather systems, not by turbulence on the molecular scale. The diffusive closure works remarkably well in mid-latitudes and fails in the tropics, where the transport is controlled by the overturning cells — the same division of labour the circulation itself shows.
:::
:::

## How the atmosphere carries heat: storms and moisture

::: definition Moist static energy and the transient eddy flux {#def-mse}
The quantity the storms transport is the **moist static energy**
$$
M = c_p T + L_v q + g z ,
$$
sensible heat, latent heat, and potential energy; a surface parcel at $300\ \mathrm{K}$ carrying $16\ \mathrm{g\,kg^{-1}}$ of vapour holds $M \approx 3.4\times10^{5}\ \mathrm{J\,kg^{-1}}$, of which the latent term is $12$ per cent and the sensible $88$ per cent — but because the tropics are disproportionately **moist**, the eddy flux of latent heat is comparable to the sensible flux in the energy budget. The poleward transport is dominated by **transient eddies**: mid-latitude cyclones and anticyclones advect warm, moist air poleward on their eastern flanks and cold, dry air equatorward on their western, and because the warm-air excursion is moister and longer-lived, the covariance $\overline{v'M}$ is positive and large. The energetic bookkeeping is Lorenz's: available potential energy generated in the tropics and lost at high latitudes is converted to eddy kinetic energy at $\sim 1.5\ \mathrm{W\,m^{-2}}$ globally, and the eddies die as friction, having delivered their cargo. In the tropics the same bookkeeping is done by the **Hadley and Walker circulations** and by **atmospheric rivers** — narrow, continent-scale filaments of water-vapour flux in which $2000\ \mathrm{kg\,m^{-1}\,s^{-1}}$ across a width of $2000\ \mathrm{km}$ moves $4\times10^{6}\ \mathrm{m^{3}\,s^{-1}}$ of water vapour, twenty times the Amazon's flow, and which deliver the bulk of the mid-latitude rainfall and the extreme floods of every coast that lies downstream of a subtropical moisture reservoir.
:::

::: example An atmospheric river's cargo {#ex-ar}
An atmospheric river of water-vapour flux $2.5\times10^{3}\ \mathrm{kg\,m^{-1}\,s^{-1}}$ and width $1500\ \mathrm{km}$ makes landfall and, with an efficiency of $12$ per cent, rains out over a catchment of $30{,}000\ \mathrm{km^{2}}$ in $24\ \mathrm{h}$. Find the basin-mean rainfall and compare it with the catchment's mean annual total of $800\ \mathrm{mm}$.
::: solution
The moisture inflow is $2.5\times10^{3}\times1.5\times10^{6} = 3.75\times10^{9}\ \mathrm{kg\,s^{-1}}$; twelve per cent condensed gives $4.5\times10^{8}\ \mathrm{kg\,s^{-1}}$, and over $24\ \mathrm{h}$ and $3\times10^{10}\ \mathrm{m^{2}}$,
$$
P = \frac{4.5\times10^{8}\times86{,}400}{3\times10^{10}\times1000} = 1.3\ \mathrm{m} .
$$
Thirteen hundred millimetres in a day — more than the annual total — is the arithmetic of an extreme-event tail: real events rain out over larger areas and longer times, but the scaling explains why California's Sierra, Chile's central valley and New Zealand's Southern Alps receive a third of their annual water in a handful of atmospheric-river days each winter, and why a storm track that shifts a few degrees of latitude with climate change can re-time an entire region's water supply.
:::
:::

## The ocean's share


::: definition Wind-driven gyres and the overturning {#def-ocean-transport}
The ocean carries its energy in two ways. The **subtropical gyres** export heat poleward in western boundary currents — the Gulf Stream, Kuroshio, Agulhas, Brazil, East Australian — whose inertial and wind-driven dynamics concentrate the transport into narrow, fast jets; the **overturning circulations** carry heat in their deep limbs, most consequentially the Atlantic meridional overturning circulation (AMOC), which takes warm, salty water north at the surface in the upper $1\ \mathrm{km}$, releases $50$–$100\ \mathrm{W\,m^{-2}}$ of heat to the North Atlantic westerlies as it flows northeast, sinks as North Atlantic Deep Water, and returns slowly south. The two are not independent: the wind-driven subtropical cell delivers the upper-limb water that the overturning then processes, and the Agulhas leakage around South Africa sets the salt supply. The ocean's transport is **cross-equatorial** where the atmosphere's is not: about $0.4\ \mathrm{PW}$ flows northward across the equator in the Atlantic and Indian Oceans combined, because the Northern Hemisphere's larger land fraction makes its mean precipitation lower and the intertropical convergence zone sits north of the equator — the energy framework's cleanest prediction, that the ITCZ lies on the side of the equator **from which** energy must be imported.
:::

::: example The Gulf Stream's heat bill {#ex-gulfstream}
The Florida Current at $27\ ^\circ\mathrm{N}$ carries $30\ \mathrm{Sv}$ ($3\times10^{7}\ \mathrm{m^{3}\,s^{-1}}$) with a mean temperature of $25\ ^\circ\mathrm{C}$; the surrounding water at the same latitude is $15\ ^\circ\mathrm{C}$. Estimate the heat flux, and the area of Europe it could keep warm at $50\ \mathrm{W\,m^{-2}}$.
::: solution
With $\rho c_p = 4\times10^{6}\ \mathrm{J\,m^{-3}\,K^{-1}}$,
$$
F = \rho c_p\, Q\, \Delta T = 4\times10^{6}\times3\times10^{7}\times10 = 1.2\times10^{15}\ \mathrm{W} = 1.2\ \mathrm{PW}.
$$
At $50\ \mathrm{W\,m^{-2}}$ — roughly the extra warmth Europe enjoys relative to its latitude — that would heat $2.4\times10^{13}\ \mathrm{m^{2}}$, an area larger than the whole continent. The old textbook claim that the Gulf Stream alone makes Europe mild is an overstatement — the prevailing westerlies and the absence of a land ice sheet matter more, and the air-sea flux downstream of the Gulf Stream is only $0.3$–$0.5\ \mathrm{PW}$ — but the arithmetic above is why the question is asked in the first place, and why an AMOC slowdown is watched as a regional-temperature risk even as the globe warms.
:::
:::

## The energy framework: why the rain belts sit where they do

::: proposition The column energy constraint and the ITCZ {#prop-itcz}
In the annual mean the atmosphere's energy budget closes: the net radiative cooling of the atmospheric column, $R_{\mathrm{TOA}} - R_{\mathrm{sfc}} - H_{\mathrm{sfc}}$, must be balanced by the convergence of the energy transport. Because the tropical atmosphere is nearly moist-adiabatic, its radiative cooling is tightly constrained, and the **energy framework** follows: the position of the ITCZ, the strength of the Hadley and Walker cells, and the cross-equatorial energy transport are set by the need to balance the atmospheric energy budget, not by the details of convection. Two predictions follow and both are observed. First, the ITCZ sits where the column radiative cooling is smallest and the transport converges most strongly — on the hemisphere **toward which** energy is not being exported. Second, the cross-equatorial energy transport scales with the interhemispheric asymmetry in net radiation, $\sim 0.6\ \mathrm{PW}$ for the present $\sim 6\ \mathrm{W\,m^{-2}}$ asymmetry, and the ocean must carry the difference between what the atmosphere transports across the equator and what the energy budget demands — which is why the Atlantic's northward ocean heat transport and the atmosphere's southward seasonal transport are out of phase by six months. The framework is the reason climate models that disagree wildly about where it rains still agree, to a degree, about how much energy must move: the energy budget is the constraint that survives model uncertainty.
:::

::: example Where does the ITCZ go when the north cools? {#ex-itcz-shift}
Suppose a perturbation (volcanic aerosol, or green-house-gas-driven sea-ice loss) changes the Northern Hemisphere's net top-of-atmosphere radiation by $-2\ \mathrm{W\,m^{-2}}$ over the hemisphere ($2.6\times10^{14}\ \mathrm{m^{2}}$). Estimate the required change in cross-equatorial energy transport, and explain which way the ITCZ moves and why the tropics' rainfall bands respond more than the energy number suggests.
::: solution
The perturbation removes $2\times2.6\times10^{14} = 5\times10^{14}\ \mathrm{W} = 0.5\ \mathrm{PW}$ from the Northern Hemisphere. The coupled system responds by reducing the northward ocean heat transport (which was feeding the now-cooler hemisphere) and by shifting the rain belts **southward**, toward the hemisphere that has become relatively warmer — the ITCZ moves toward the warmer hemisphere, because that is the hemisphere from which energy must now be exported to balance the other. The rainfall response is amplified because the tropical circulation is energy-limited: the Hadley and Walker mass fluxes scale with the radiative cooling they must offset, so a few tenths of a petawatt of energy redistribution — a few per cent of the total transport — can move the rain belts by thousands of kilometres, as the palaeoclimate record of the last millennium repeatedly shows.
:::
:::

::: warning Heat transport is not weather, the Gulf Stream is not Europe's central heating, and more transport does not mean more transport
Five errors. **"The atmosphere transports heat" is shorthand for energy**: storms carry moist static energy, and the latent part — the water, not the warmth — is half the cargo in the tropics; a forecast model that gets humidity wrong gets the energy transport wrong twice. **The Gulf Stream is not Europe's radiator**: the mild European winter is mainly the westerlies reading a warmed eastern-boundary current and the absence of continental ice; removing the AMOC in models cools Europe by several kelvin, far less than the naive $1.2\ \mathrm{PW}$ arithmetic suggests, because most of that flux is released in the mid-latitude extension, not delivered to the coast. **Transport maxima migrate seasonally by tens of degrees of latitude** and the annual-mean picture hides it; comparing models at one season can invert the hemispheres. **The ocean's "share" is not a fixed fraction**: the atmosphere and ocean partly **cancel** in their seasonal transports, and the ocean's role is largest where the atmosphere's is smallest — the two are one coupled machine, not two competing firms. **And a warming world does not simply transport more energy**: the gross radiative forcing grows, but the transport responds through the hydrological cycle's slower pace (the "fast/slow" physics of [[climate-change/responses]]), and the robust signal is a **poleward expansion** of the transport system — storm tracks and dry zones moving toward the poles — more than a strengthening.
:::

::: history
The first quantitative maps of the atmospheric energy engine came from **C.-G. Rossby**'s Chicago school in the energy-cycle and general-circulation papers of 1939–1941, and the turbulent fluxes that close the surface side were measured by **C. H. B. Priestley**'s Aspendale group from the 1950s. The observational monument of the field is **J. L. Peixoto** and **A. H. Oort**'s compilation of a hundred million radiosonde and ship reports into the atmospheric energy budget, culminating in their 1992 *Physics of Climate* — the transport atlas of this lesson. The oceanic side was closed by the **WOCE** repeat-hydrography programme of 1990–2002, which first balanced the Atlantic heat budget from boundary to boundary, and the satellite-era CERES radiation budget (2000–) checks the whole system from above. The energy framework for the ITCZ — that the rain belt sits so as to export energy toward the cooler hemisphere — was established in the modelling and theory of **S.-M. Kang**, **M. J. Held**, **D. M. W. Frierson** and **M. Lacis** in 2008 and the observational tests of **J. Fasullo** and colleagues that followed.
:::

The storms that do the transporting are the cyclones of [[meteorology/fronts-cyclones]] and their energy source is the available potential energy of [[atmospheric-dynamics/general-circulation]]; the moist static energy they carry is defined in [[atmospheric-dynamics/boundary-layer]] and its condensation in [[atmospheric-dynamics/cloud-physics]]; the ocean currents named here are in [[oceanography/wind-driven]] and [[oceanography/overturning]]; the water they deliver is quantified in [[climate-system/hydrological-cycle]]; the AMOC's past collapses are in [[palaeoclimate/abrupt-change]]; and the future shifts of the storm tracks in [[climate-change/projections]] and [[climate-change/impacts]].

::: quiz
In the annual mean, the atmosphere's poleward energy transport is dominated by
- [ ] the mean meridional cells (Hadley, Ferrel, polar).
- [x] transient eddies — the cyclones and anticyclones of the storm tracks.
- [ ] radiative diffusion of infrared photons.
- [ ] the ocean's western boundary currents.
::: solution
In the extratropics, transient eddies carry the overwhelming majority of the energy flux; the mean meridional cells dominate only in the tropics. Radiative diffusion of photons is negligible for meridional transport, and the ocean carries only about a third of the total — but the question is a reminder that "the general circulation" of the energy budget is mostly **not** the zonal-mean circulation.
:::
:::

::: summary
- The climate system moves 5–6 PW from the tropics to the poles — over a hundred times human power use — with the atmosphere carrying about two thirds and the ocean one third.
- The extratropical transport is done by transient eddies carrying moist static energy; the tropical transport by the overturning cells; the diffusive closure works in mid-latitudes and fails in the tropics.
- The ocean's transport is concentrated in western boundary currents and the overturning, is strongest in the Atlantic, and is cross-equatorial where the atmosphere's is not.
- Atmospheric rivers are the mid-latitude delivery trucks: a single one can carry twenty times the Amazon's water flow.
- The energy framework — the atmosphere's column energy budget — predicts the ITCZ's position and the cross-equatorial transports, and it is the constraint that survives model uncertainty.
- The robust climate-change signal is a poleward expansion of the transport system and a re-timing of the water delivery, more than a simple intensification.
:::

## Exercises

::: exercise Flux per unit area {level=1 check="7"}
With eddy diffusivity $D = 10^{6}\ \mathrm{m^{2}\,s^{-1}}$, $\rho c_p = 1206\ \mathrm{J\,m^{-3}\,K^{-1}}$ and a temperature gradient of $6\ \mathrm{K}$ per $1000\ \mathrm{km}$, find the diffusive energy flux in $\mathrm{W\,m^{-2}}$. (Enter to the nearest integer.)
::: solution
$F = \rho c_p D\,|\mathrm{d}T/\mathrm{d}y| = 1206\times10^{6}\times6\times10^{-6} = 7\ \mathrm{W\,m^{-2}}$. A few watts per square metre of area-averaged flux integrated over a hemisphere's band is petawatts — the bridge between the watts-per-square-metre of the radiation budget and the petawatts of the transport atlas.
:::
:::

::: exercise Moist static energy {level=1 check="342"}
Find $M = c_p T + L_v q$ in $\mathrm{kJ\,kg^{-1}}$ for air at $300\ \mathrm{K}$ with $q = 16\ \mathrm{g\,kg^{-1}}$. (Enter to the nearest unit.)
::: solution
$M = 1005\times300 + 2.5\times10^{6}\times0.016 = 301.5 + 40 = 342\ \mathrm{kJ\,kg^{-1}}$. The latent term is $12$ per cent of the total at the surface but grows in relative importance toward the poles — the reason a given eddy's moisture flux matters more in cold-air outbreaks than the temperature field alone suggests.
:::
:::

::: exercise Residence time of atmospheric water {level=1 check="9"}
Global precipitation is $505{,}000\ \mathrm{km^{3}\,yr^{-1}}$ and the atmospheric water content $12{,}900\ \mathrm{km^{3}}$. Find the residence time in days. (Enter the number.)
::: solution
$\tau = 12{,}900/505{,}000\times365 = 9\ \mathrm{days}$. The atmosphere holds nine days of rain: every forecast of a drought is a forecast of a nine-day conveyor belt stalling, and every estimate of how fast the hydrological cycle accelerates with warming is set by this turnover, not by the ocean's 4000-year one.
:::
:::

::: exercise Gulf Stream heat flux {level=2 check="1.2"}
The Kuroshio at $30\ ^\circ\mathrm{N}$ carries $45\ \mathrm{Sv}$ with a $10\ \mathrm{K}$ anomaly relative to its surroundings. Find the heat transport in PW ($\rho c_p = 4\times10^{6}\ \mathrm{J\,m^{-3}\,K^{-1}}$). (Enter to one decimal.)
::: solution
$F = 4\times10^{6}\times4.5\times10^{7}\times10 = 1.8\times10^{15}\ \mathrm{W} = 1.8\ \mathrm{PW}$. The Kuroshio and Gulf Stream are each of order a petawatt — together with the Agulhas, the bulk of the ocean's northward heat transport in the subtropics, all of it concentrated in jets a hundred kilometres wide.
:::
:::

::: exercise Cross-equatorial bookkeeping {level=2 check="0.4"}
The atmosphere transports $0.2\ \mathrm{PW}$ **southward** across the equator in the annual mean while the total cross-equatorial energy transport required by the radiation asymmetry is $0.2\ \mathrm{PW}$ **northward**. What must the ocean carry, and in which direction? (Enter the magnitude in PW.)
::: solution
The ocean must carry $0.4\ \mathrm{PW}$ northward — the required total plus the atmosphere's southward deficit. This is the observed situation in the Atlantic: the atmosphere and ocean transport energy in **opposite** directions across the equator, and the ocean's larger share is why the ITCZ's mean position is set by the coupled system's energy budget rather than by either circulation alone.
:::
:::

::: exercise Storm-track energy {level=2 check="3.1"}
A mid-latitude cyclone lives 6 days and converts available potential energy at a mean rate of $2\ \mathrm{W\,m^{-2}}$ over $3\times10^{6}\ \mathrm{km^{2}}$. Find its total energy consumption in units of $10^{18}\ \mathrm{J}$. (Enter to one decimal.)
::: solution
$E = 2\times3\times10^{12}\times6\times86{,}400 = 3.1\times10^{18}\ \mathrm{J}$ — some forty per cent of the United Kingdom's annual energy use, spent by one storm in six days. The comparison is the honest scale of the atmosphere's engine: individual weather systems run on energy flows comparable to nations' budgets, which is why forecasting them is scientifically hard but energetically trivial, and controlling them, hopeless.
:::
:::

::: exercise Deriving the diffusive closure {level=3 check="1.3"}
Starting from $F_y = -\rho c_p D\,\partial \bar T/\partial y$ for the eddy flux of a well-mixed tracer, write the total transport across a latitude circle of effective depth $H$ and show that $F = 2\pi a \cos\phi\, H\, \rho c_p D\,|\partial\bar T/\partial y|$. Evaluate at $30^{\circ}$ with $D=10^{6}\ \mathrm{m^{2}\,s^{-1}}$, $H=5\ \mathrm{km}$, gradient $6\ \mathrm{K}$ per $1000\ \mathrm{km}$, in PW. (Enter to one decimal.)
::: solution
The flux per unit area is $\rho c_p D|\partial\bar T/\partial y| = 7.2\ \mathrm{W\,m^{-2}}$; the cross-section is the band's circumference times the depth, $2\pi a\cos30^{\circ}\times H = 3.5\times10^{7}\times5\times10^{3} = 1.8\times10^{11}\ \mathrm{m^{2}}$, so
$$
F = 7.2\times1.8\times10^{11} = 1.3\times10^{15}\ \mathrm{W} = 1.3\ \mathrm{PW}.
$$
The closure's physics is that transient eddies behave like molecules at planetary scale — mixing potential temperature down its gradient — and its failure in the tropics (where the gradient is small but the transport large) is the evidence that the tropics are controlled by the overturning, not by diffusion. That single discrepancy, first quantified by Peixoto and Oort, is why the energy framework of the ITCZ exists.
:::
:::

::: exercise The energy-limited circulation {level=3 check="1.6"}
The tropical atmospheric radiative cooling is $80\ \mathrm{W\,m^{-2}}$ over a convective belt of $8\times10^{6}\ \mathrm{km^{2}}$, exported by the Hadley circulation against an upper-minus-lower moist static energy difference $\Delta M = 4\times10^{4}\ \mathrm{J\,kg^{-1}}$. Find the mass flux of the cell in units of $10^{10}\ \mathrm{kg\,s^{-1}}$. (Enter to one decimal.)
::: solution
The power to export is $80\times8\times10^{12} = 6.4\times10^{14}\ \mathrm{W}$, so the mass flux is
$$
\Psi = \frac{6.4\times10^{14}}{4\times10^{4}} = 1.6\times10^{10}\ \mathrm{kg\,s^{-1}},
$$
in good agreement with reanalysis estimates of the Hadley mass streamfunction of $1$–$2\times10^{10}\ \mathrm{kg\,s^{-1}}$. The exercise's real lesson is the energy-limited logic: the circulation's strength is set by the radiative power it must carry divided by the thermodynamic efficiency $\Delta M$ of its engine, and that is why a warming world — which raises radiative cooling only slowly while holding $\Delta M$ nearly fixed — barely changes the cell's mass flux even as it changes the cell's reach.
:::
:::
