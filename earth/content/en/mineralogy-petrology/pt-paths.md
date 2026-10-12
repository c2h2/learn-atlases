A metamorphic rock does not record the conditions at which it formed, because there were no single conditions at which it formed. It records a sequence of events, some of them frozen and some of them smeared, and the petrologist's task is to unsmear them. Two facts make this possible. The first is that minerals grow in zones, so that a single garnet crystal a millimetre across preserves, from its core to its rim, a fraction of the pressure–temperature history of the rock. The second is that diffusion is slow and stops when the rock cools, so that a chemical profile that should have been flattened has not been, and the difference between what diffusion would have done and what it did do is a clock.

The result is the **pressure–temperature–time path**, the central object of metamorphic geology: not "at what conditions did this rock form" but "what route did it take through the crust, how fast, and what drove it".

## Paths, and their shapes

::: definition Pressure–temperature path {#def-ptpath}
A **pressure–temperature path** is the curve traced by successive equilibrium conditions of a single rock, obtained by pairing a pressure estimate and a temperature estimate from the same growth zone or the same assemblage, and ordering the pairs by paragenesis. A path is **clockwise** if it shows burial and heating first, then a pressure decrease at high temperature — the signature of crustal thickening followed by extensional collapse. It is **anticlockwise** if heating precedes burial — the signature of magmatic or fluid-driven heating of a shallow crust that is later buried. A path with a pressure decrease at nearly constant temperature records **exhumation by erosion or extension**; a temperature decrease at nearly constant pressure records **thermal relaxation** after the driving process stops.
:::

::: example Reading a garnet {#ex-garnet-profile}
A porphyroblast of garnet in a pelitic gneiss shows, from core to rim, $X_{\mathrm{Mg}} = \mathrm{Mg}/(\mathrm{Mg}+\mathrm{Fe})$ rising from 0.15 to 0.30, $X_{\mathrm{Ca}}$ falling from 0.10 to 0.01, and the inclusion assemblage changing from quartz + chlorite to quartz + staurolite to quartz + sillimanite + K-feldspar. Coexisting biotite changes from $X_{\mathrm{Mg}} = 0.32$ to $X_{\mathrm{Mg}} = 0.49$. Interpret the path using the thermometer of [[mineralogy-petrology/metamorphic-reactions]].
::: solution
Read the three signals together.

**Calcium falls steeply.** Calcium enters garnet readily only at low grade; as the rock warms, the plagioclase in the matrix becomes more sodic and the garnet's calcium activity drops. A fall from 0.10 to 0.01 is the classic prograde signature and rules out any later resorption event, which would raise the rim calcium.

**Magnesium rises in both phases together.** Garnet $X_{\mathrm{Mg}}$ from 0.15 to 0.30 with biotite $X_{\mathrm{Mg}}$ from 0.32 to 0.49 means the iron–magnesium ratio of the whole rock is being redistributed in favour of the magnesian endmembers, which happens as chlorite breaks down and releases magnesium. It also means the two phases remained in equilibrium during growth, which is what licenses the use of the thermometer.

**Temperatures.** At the core, $K_D = (0.85/0.15)/(0.68/0.32) = 5.667/2.125 = 2.67$, giving $1166/T = \ln 2.67 + 0.410 = 1.391$ and $T = 838\ \mathrm{K} = 565^\circ\mathrm{C}$. At the rim, $K_D = (0.70/0.30)/(0.51/0.49) = 2.333/1.041 = 2.24$, giving $1166/T = \ln 2.24 + 0.410 = 1.217$ and $T = 958\ \mathrm{K} = 685^\circ\mathrm{C}$.

So the rock was heated through about $120\ \mathrm{K}$ while its garnet grew, from greenschist to upper-amphibolite facies. The pressure comes from the calcium and the assemblage: chlorite in the core means the garnet grew at low grade and moderate pressure, and the rim assemblage of sillimanite + K-feldspar with quartz means the peak was at a pressure low enough to cross the muscovite + quartz = K-feldspar + sillimanite + water reaction. The path is therefore **prograde heating with a modest pressure decrease** — burial followed by the beginning of exhumation, a clockwise path caught in the act.
:::
:::

::: warning A pressure–temperature path is not a unique reading of a rock
This is the deepest result in the subject, and it is rarely taught as such. England and Richardson showed in 1977 that a set of equilibrium assemblages in a single rock constrains a region of pressure–temperature space, not a curve, and that **many different paths pass through that region**. Two rocks with identical mineral assemblages can have followed completely different histories. Worse, the argument that a path is "clockwise" usually rests on pairing a pressure from one reaction with a temperature from another, in the assumption that the two reactions record the same moment — and there is no thermodynamic reason why they should, since one may be strongly pressure-dependent and weakly temperature-dependent and the other the reverse.

The consequence is not that paths are worthless but that they must be earned. A defensible path comes from **pseudosection modelling in the exact bulk composition of the rock**, from pairing pressure and temperature estimates that come from the *same* mineral composition, and from a demonstration that the assemblage is at equilibrium. A path drawn by connecting a barometric point to a thermometric point on a blank diagram is a hypothesis, and it has been known to be wrong for forty years.
:::

## Diffusion, closure and the freezing of a profile

::: proposition Diffusion length {#prop-diffusion}
The one-dimensional diffusion equation $\partial C/\partial t = D\,\partial^2 C/\partial x^2$ has, for an initial step in concentration across a plane, the solution $C = C_0 + \Delta C\,\mathrm{erf}(x/2\sqrt{Dt})$. The distance over which a profile is erased in time $t$ is therefore
$$
L \approx \sqrt{Dt},
$$
and because the diffusion coefficient of most elements in most silicates falls as $D = D_0 e^{-E/RT}$ over ten to twenty orders of magnitude between $900$ and $50\ ^\circ\mathrm{C}$, a profile that survives at all constrains the time the rock spent hot.
:::

::: theorem Closure temperature {#thm-closure}
An isotopic or chemical system in a mineral of radius $a$ cooling at a constant rate $|\mathrm{d}T/\mathrm{d}t|$ stops exchanging with its surroundings at the **closure temperature**
$$
T_c = \frac{E}{R\,\ln\!\left(\dfrac{A R T_c^{2} D_0}{E\,a^{2}\,|\mathrm{d}T/\mathrm{d}t|}\right)} ,
$$
where $E$ is the activation energy for diffusion, $D_0$ the frequency factor, and $A$ a geometric constant of order three. Differentiating with respect to the logarithm of the cooling rate gives the useful sensitivity
$$
\frac{\mathrm{d}T_c}{\mathrm{d}\ln|\mathrm{d}T/\mathrm{d}t|} = \frac{R T_c^{2}}{E},
$$
so that a tenfold increase in cooling rate raises the closure temperature by $2.3\,R T_c^{2}/E$.
:::

::: proof
Diffusion out of a cooling sphere is efficient while $D/a^2$ exceeds the cooling rate scaled by the sensitivity of $D$ to temperature, and ineffective afterwards. Setting the dimensionless "Dodson number" $\alpha = E/(RT_c)$ — the ratio of the activation energy to the thermal energy — and requiring that the total diffusive loss during cooling be of order the amount in the grain gives the transcendental equation above, which has a unique solution because the right-hand side varies as the inverse logarithm. For the sensitivity, take logarithms of the defining equation, $E/T_c = R\ln(\cdots) - 2R\ln T_c + \text{const}$, differentiate with respect to $\ln|\mathrm{d}T/\mathrm{d}t|$, and note that the term $R\ln(\cdots)$ is just $E/T_c$ again, so the leading terms cancel and leave $\mathrm{d}T_c/\mathrm{d}\ln|\mathrm{d}T/\mathrm{d}t| = RT_c^2/E$.
:::

::: example The closure temperature of hornblende {#ex-tc}
The potassium–argon system in hornblende closes at about $500^\circ\mathrm{C}$ for a cooling rate of $10\ ^\circ\mathrm{C\,Myr^{-1}}$ and a grain radius of $0.2\ \mathrm{mm}$, with an activation energy $E = 263\ \mathrm{kJ\,mol^{-1}}$. Estimate the closure temperature in a terrain cooling at $1000\ ^\circ\mathrm{C\,Myr^{-1}}$, and in one cooling at $1\ ^\circ\mathrm{C\,Myr^{-1}}$.
::: solution
The sensitivity is
$$
\frac{\mathrm{d}T_c}{\mathrm{d}\ln|\mathrm{d}T/\mathrm{d}t|} = \frac{R T_c^{2}}{E} = \frac{8.314\times773^{2}}{263\,000} = 18.9\ \mathrm{K}
$$
per $e$-fold, or $2.303\times18.9 = 43.5\ \mathrm{K}$ per decade of cooling rate. A factor of 100 in cooling rate is two decades, so
$$
1000\ ^\circ\mathrm{C\,Myr^{-1}}:\quad T_c \approx 500 + 87 = 587^\circ\mathrm{C};
\qquad
1\ ^\circ\mathrm{C\,Myr^{-1}}:\quad T_c \approx 500 - 87 = 413^\circ\mathrm{C}.
$$
Two consequences matter in practice. A hornblende age from a rapidly cooled pluton dates a slightly hotter rock than the textbook number suggests, and by up to ninety degrees in a contact aureole. And a slowly cooled orogen gives ages that are systematically too old for the cooling event that is being dated — which is why orogeny studies quote an **age gradient** rather than an age, and why the closure temperatures of a suite of systems, from zircon uranium–lead through hornblende and biotite to apatite fission track, are used together as a **thermochronometer** rather than singly.

The standard ladder of closure temperatures, for a centimetre-scale rock cooling at $10\ ^\circ\mathrm{C\,Myr^{-1}}$, is roughly: zircon uranium–lead above $900^\circ\mathrm{C}$, garnet samarium–neodymium about $600^\circ\mathrm{C}$, hornblende potassium–argon about $500^\circ\mathrm{C}$, biotite potassium–argon about $280^\circ\mathrm{C}$, zircon (uranium–thorium)/helium about $180^\circ\mathrm{C}$, apatite fission track about $110^\circ\mathrm{C}$, apatite (uranium–thorium)/helium about $70^\circ\mathrm{C}$. A rock that has passed through all of them preserves seven different ages, and the differences between them are the cooling history.
:::
:::

::: widget plot
f: 500 + 43.5*ln(x/10)/ln(10)
x: 0.1, 1000
y: 370, 560
hlines: 500
vlines: 10
labels: \text{hornblende } T_c
caption: The closure temperature of the potassium–argon system in hornblende against cooling rate in $^\circ\mathrm{C\,Myr^{-1}}$, from the linearised sensitivity of [[#thm-closure]]. The relation is logarithmic, so each factor of ten in cooling rate is worth the same $43\ \mathrm{K}$: a pluton quenched at $1000\ ^\circ\mathrm{C\,Myr^{-1}}$ records a closure temperature nearly ninety degrees above one that cooled at $1\ ^\circ\mathrm{C\,Myr^{-1}}$ over the same interval. The practical rule is that a thermochronological age is not the age of an event but the age at which the rock passed a temperature that you must estimate from the cooling rate you assume.
:::

## Cooling rates from a profile

::: example How long was the rock hot? {#ex-diffusion-clock}
A garnet porphyroblast 2 mm in radius has a manganese profile that is still steep — the concentration falls to half its core value over $0.2\ \mathrm{mm}$ at the rim. Manganese in garnet diffuses with $D = 4\times10^{-14}\ \mathrm{m^2\,yr^{-1}}$ at $550^\circ\mathrm{C}$. How long can the rock have spent at that temperature since the garnet finished growing?
::: solution
The diffusion length over which the profile would be erased is $L = \sqrt{Dt}$. Setting $L = 0.2\ \mathrm{mm} = 2\times10^{-4}\ \mathrm{m}$,
$$
t = \frac{L^{2}}{D} = \frac{4\times10^{-8}}{4\times10^{-14}} = 10^{6}\ \mathrm{yr}.
$$
The rock therefore cannot have been at $550^\circ\mathrm{C}$ for more than about a million years after garnet growth, or the profile would be twice as broad as it is. If the garnet's growth is dated at 400 Ma and the rock cooled below $550^\circ\mathrm{C}$ at 380 Ma, the profile is impossible: twenty million years at even a fraction of that temperature would have erased it. Either the temperature estimate is too high, or the profile is a growth zoning that post-dates the heating, or the garnet grew during cooling.

This is the diffusion clock, and it is one of the few direct constraints on **how fast metamorphic rocks get hot and how fast they get cold**. The classic application is to the high-temperature, low-pressure terrains of Scotland and Namibia, where andalusite–sillimanite assemblages and unmodified diffusion profiles together require that the rock reached $700^\circ\mathrm{C}$ and lost that heat within one to two million years — a heating and cooling rate of several hundred degrees per million years, far faster than conduction alone can deliver and evidence for advective heat transport by melts and fluids.
:::
:::

::: example Exhumation from an age–elevation profile {#ex-elevation}
Apatite fission-track ages from a transect up one side of a range increase linearly from $2\ \mathrm{Myr}$ at $500\ \mathrm{m}$ to $10\ \mathrm{Myr}$ at $2500\ \mathrm{m}$. The apatite fission-track closure temperature is $110^\circ\mathrm{C}$ and the present surface temperature is $15^\circ\mathrm{C}$. Find the exhumation rate and the mean palaeogeothermal gradient, and say what the result assumes.
::: solution
If the isotherms were horizontal and have been carried up by erosion, the rate at which rock was removed is the elevation difference divided by the age difference:
$$
\dot{E} = \frac{2500 - 500}{10 - 2} = \frac{2000\ \mathrm{m}}{8\ \mathrm{Myr}} = 250\ \mathrm{m\,Myr^{-1}} = 0.25\ \mathrm{mm\,yr^{-1}} .
$$
The $110^\circ\mathrm{C}$ isotherm now lies at the surface at $500\ \mathrm{m}$ and lay $2000\ \mathrm{m}$ deeper $8\ \mathrm{Myr}$ ago, so the palaeogeothermal gradient between the surface and that isotherm was
$$
\frac{110 - 15}{2.0} = 48\ ^\circ\mathrm{C\,km^{-1}} ,
$$
using the mean depth of $2.0\ \mathrm{km}$ between the two points. That is roughly twice the global continental average, and it is either a real thermal anomaly — extension, magmatism, or fluid flow — or an artefact.

The assumptions are the interesting part. The method assumes the isotherms are horizontal, which they are not in a steep range, where they are domed and the topography itself distorts the ages by kilometres. It assumes a constant exhumation rate, which the linearity of the data supports but does not prove. It assumes a closure temperature of $110^\circ\mathrm{C}$, which depends on cooling rate and on grain size as in [[#ex-tc]]. And it assumes no faulting has stacked the transect. Where the ages are not linear in elevation, or where the implied gradient exceeds $60\ ^\circ\mathrm{C\,km^{-1}}$, the correct reading is that one of these assumptions has failed — usually the first.
:::
:::

## Ultra-high-pressure rocks and the speed of subduction

::: definition Ultra-high-pressure metamorphism {#def-uhp}
A rock is **ultra-high-pressure (UHP)** if it contains diagnostic minerals or mineral reactions requiring pressures above about $2.6\ \mathrm{GPa}$, the quartz–coesite equilibrium at $500^\circ\mathrm{C}$. The evidence is never a calculation from a mineral chemistry but a **textural one**: coesite or diamond preserved as an inclusion inside garnet, omphacite with an unusually high aluminium content, or an eclogite with majorite-structured garnet. Such rocks are pieces of continental crust or lithospheric mantle carried to depths greater than 90 km and returned to the surface — returned, because they are now on land.
:::

::: example How fast must a slab come back up? {#ex-uhp-rate}
A UHP eclogite records a peak of $3.2\ \mathrm{GPa}$ and $700^\circ\mathrm{C}$ and its garnet samarium–neodymium system dates the peak at 245 Ma; a hornblende potassium–argon analysis dates passage through $500^\circ\mathrm{C}$ at 235 Ma. Estimate the exhumation rate and the return path, and explain why the number is remarkable.
::: solution
The rock travelled from about $105\ \mathrm{km}$ depth to about $18\ \mathrm{km}$ (the depth of $500^\circ\mathrm{C}$ at a normal gradient, and the pressure of the blueschist-to-amphibolite transition) in $10\ \mathrm{Myr}$:
$$
\dot{Z} = \frac{105 - 18}{10} \approx 9\ \mathrm{km\,Myr^{-1}} = 9\ \mathrm{mm\,yr^{-1}} .
$$
That is an order of magnitude faster than the exhumation of a typical orogen, and it is fast enough to be the **ascent rate of a buoyant slab fragment** rather than the rate of erosion at the surface. The path is the second remarkable thing: the rock was at $700^\circ\mathrm{C}$ at 105 km and at $500^\circ\mathrm{C}$ at 18 km, so it cooled by only $200^\circ\mathrm{C}$ while rising 90 km. Rising through 90 km without heating to the ambient gradient means the return was **rapid and cold**, driven by buoyancy — the density of a hydrated, fractionated continental slab is lower than the mantle it displaces — and not by the far slower processes of erosion and thermal relaxation.

UHP terranes are therefore the strongest evidence in the rock record that continental crust subducts, and that it can come back. They are also the reason the subject cannot be done without time: a pressure–temperature path without ages is a curve with no direction and no speed.
:::
:::

::: quiz
A terrain gives hornblende potassium–argon ages of $420\ \mathrm{Ma}$, biotite potassium–argon ages of $390\ \mathrm{Ma}$, and apatite fission-track ages of $40\ \mathrm{Ma}$. What is the best interpretation?
- [ ] Two orogenies, one at 420 Ma and one at 40 Ma, with the biotite ages disturbed.
- [x] Slow cooling through the closure temperatures of the three systems, from about $500^\circ\mathrm{C}$ at 420 Ma to about $110^\circ\mathrm{C}$ at 40 Ma.
- [ ] The rocks are all 420 Ma and the younger ages are analytical artefacts.
- [ ] Rapid cooling at 390 Ma followed by reheating at 40 Ma.
::: solution
The ages are a cooling path, not a list of events. Hornblende closes near $500^\circ\mathrm{C}$, biotite near $280^\circ\mathrm{C}$ and apatite fission track near $110^\circ\mathrm{C}$, so the three ages give the times at which the rock passed those temperatures. Cooling from 500 to $280^\circ\mathrm{C}$ took 30 Myr and from 280 to $110^\circ\mathrm{C}$ took 350 Myr, which is a decelerating cooling path — fast exhumation of the deep crust, then a long period of near-steady burial or slow erosion. The 40 Ma age records the final, Neogene removal of a few kilometres of cover, not an orogeny.
:::
:::

::: history
The idea that a metamorphic rock records a path rather than a condition came slowly. John Joly and Arthur Holmes had already argued from heat-flow measurements that a geosyncline could not be heated by a single pluton, and Cecil Tilley's facies maps of the 1930s gave the sequence of assemblages. The modern subject begins with W. R. A. Hietanen's and then M. G. K. Thompson's work on garnet zoning in the 1950s and 1960s, which first showed that a porphyroblast preserves a chemical record of its own growth, and with the recognition by Donald Turner, and by Francis (Bill) Brown in the Alpine eclogites, that the assemblage sequence in a single crystal could be read as a paragenesis. The quantitative apparatus came from three directions at once in the 1970s: the closure-temperature equation of Martin Dodson (Dodson) in 1973, which turned a cooling rate into a temperature and made thermochronology a subject rather than a collection of ages; the diffusion-domain modelling of Jena Dodson, Ian Graham and others, which made profiles into clocks; and the exchange thermometers and barometers calibrated in the furnaces of Minnesota, Cambridge and Canberra. The provocation came from Derek England and Alan Richardson in 1977, whose demonstration that pressure–temperature paths are not uniquely determined by assemblages doused a decade of over-interpretation and forced the field onto the rigorous footing of pseudosection modelling that it occupies today. The ultra-high-pressure revolution, opened by the discovery of coesite in the Western Gneiss Region in 1984 and of diamond in Kazakhstan and the Dabie Shan in 1989 and 1992, then supplied the phenomenon that the new rigour had to explain: continents that go down ninety kilometres and come back.
:::

## Where this leads

The reactions whose slopes make the paths possible are in [[mineralogy-petrology/metamorphic-reactions]]; the thermodynamics of diffusion and of solution in minerals in [[geochemistry/reactions]]; the dating itself in [[geochemistry/geochronology]]; the structures that record the same deformation in [[structural-geology/shear-zones]]; and the way a mountain belt takes up its heat and loses its mass in [[structural-geology/orogens]].

::: summary
- A rock records a path, not a point, and the path is built by pairing pressure and temperature estimates that come from the same growth zone of the same mineral.
- Garnet is a film of the path: calcium falls and magnesium rises on a prograde trajectory, and the reversal of either records a different event.
- Pressure–temperature paths are not uniquely determined by assemblages; England and Richardson's argument is the subject's most important caution.
- Diffusion erases profiles as $\sqrt{Dt}$, so a preserved profile is a constraint on the time spent hot.
- A thermochronological date is the time at which the rock passed a temperature that depends on grain size and cooling rate, not the time of an event.
- A suite of systems with different closure temperatures gives a cooling path; an age–elevation transect gives an exhumation rate.
- Ultra-high-pressure rocks require subduction to more than 90 km and return rates of centimetres per year, which only buoyancy can supply.
:::

## Exercises

::: exercise Diffusion length {level=1 check="10"}
Using $D = 4\times10^{-14}\ \mathrm{m^2\,yr^{-1}}$, how long does it take for diffusion to erase a chemical profile over $200\ \mu\mathrm{m}$? Give your answer in units of $10^5$ years.
::: solution
$t = L^2/D = (2\times10^{-4})^2/(4\times10^{-14}) = 4\times10^{-8}/4\times10^{-14} = 10^{6}$ years, that is $10$ units of $10^5$ years. The leverage of the square is enormous: at the same temperature a profile $2\ \mu\mathrm{m}$ wide is erased in a human lifetime, and one $200\ \mu\mathrm{m}$ wide survives a million years. Fine-grained rocks therefore preserve no zoning at all, and porphyroblasts preserve a great deal.
:::
:::

::: exercise Closure sensitivity {level=1 check="43.5"}
For a system with $E = 263\ \mathrm{kJ\,mol^{-1}}$ closing at $500^\circ\mathrm{C}$, how many kelvin is one decade of cooling rate worth? What would it be for the same $E$ at a closure temperature of $900^\circ\mathrm{C}$?
::: solution
$2.303\,RT_c^2/E = 2.303\times8.314\times773^2/263\,000 = 43.5\ \mathrm{K}$ per decade. At $900^\circ\mathrm{C}$ (1173 K) it is $2.303\times8.314\times1173^2/263\,000 = 96\ \mathrm{K}$. The sensitivity grows as $T_c^2$, which is why the highest-closure systems are also the most sensitive to the assumed cooling rate, and why a zircon age is the least robust thermometric statement in a paper and an apatite fission-track age the most.
:::
:::

::: exercise Which clock {level=1}
A granite gives a zircon uranium–lead age of 420 Ma and a biotite potassium–argon age of 395 Ma. What does each date?
::: solution
The zircon uranium–lead age dates **crystallisation**, because zircon closes above $900^\circ\mathrm{C}$, well above the solidus of a granite, and its uranium–lead system is not reset by later cooling at these temperatures. The biotite potassium–argon age dates **cooling through about $280^\circ\mathrm{C}$**, some 25 million years later. The difference is the time taken for the pluton and its roof to cool through 500 degrees, which for a large pluton is entirely normal and for a small one is not.
:::
:::

::: exercise Path geometry {level=2}
State whether each path is clockwise or anticlockwise and give a setting: (a) pressure rises to 10 kbar while temperature rises to $650^\circ\mathrm{C}$, then pressure falls to 4 kbar while temperature rises to $750^\circ\mathrm{C}$; (b) temperature rises to $700^\circ\mathrm{C}$ at 2 kbar, then pressure rises to 8 kbar at $650^\circ\mathrm{C}$.
::: solution
(a) **Clockwise.** Burial and heating to a pressure peak, then decompression with continued heating to a temperature peak that post-dates the pressure peak. This is the classic collisional path: crustal thickening builds the pressure, and the heat arrives late, from thickening and from magmatism, while extensional collapse unloads the rock. (b) **Anticlockwise.** Heating first at shallow depth, then burial. This is rare and diagnostic: it requires a heat source that is removed before the load, and it is found in terrains underplated by mantle-derived magmas that were later buried in an accretionary prism, and in some rifted margins.
:::
:::

::: exercise Garnet thermometry {level=2 check="645"}
Garnet with $X_{\mathrm{Mg}} = 0.22$ coexists with biotite of $X_{\mathrm{Mg}} = 0.40$. Using the calibration of [[mineralogy-petrology/metamorphic-reactions]], find the temperature in $^\circ\mathrm{C}$.
::: solution
$K_D = (0.78/0.22)/(0.60/0.40) = 3.545/1.500 = 2.364$. Then $1166/T = \ln 2.364 + 0.410 = 0.860 + 0.410 = 1.270$, so $T = 918\ \mathrm{K} = 645^\circ\mathrm{C}$. Note how little separates this from the $565^\circ\mathrm{C}$ of [[#ex-garnet-profile]]: a change of $0.07$ in the magnesium number of the garnet is worth $80\ \mathrm{K}$, which is why electron microprobe profiles, not spot analyses, are what metamorphic temperatures are built from.
:::
:::

::: exercise Non-uniqueness {level=2}
Give two different pressure–temperature paths that could produce the same observed assemblage — garnet + staurolite + kyanite + muscovite + quartz — and say what additional observation would distinguish them.
::: solution
**Path one:** prograde burial and heating through the andalusite and staurolite fields into the kyanite field, reaching 10 kbar and $600^\circ\mathrm{C}$, with no retrogression. **Path two:** burial to 11 kbar and $650^\circ\mathrm{C}$, into the kyanite field, followed by decompression to 6 kbar at $550^\circ\mathrm{C}$, during which staurolite grew at the expense of garnet on the way back through the staurolite field. Both end with the same five phases.

The distinguishing observations are textural and chemical. If staurolite **overgrows** garnet and contains inclusions of kyanite, staurolite is younger and the path is retrograde. If staurolite is **included in** garnet and its own inclusions are garnet, the order is the other way. Garnet core-to-rim composition profiles settle it independently: a prograde garnet has falling calcium and rising magnesium, whereas a garnet that grew during decompression has a rim whose composition is set by the retrograde reaction and may show a reversal in both. This is why metamorphic petrology begins with a thin section and not with a thermometer.
:::
:::

::: exercise Exhumation rate {level=2 check="2.7"}
A UHP terrane's coesite-bearing eclogite gives a peak-pressure age of 150 Ma and a hornblende argon age of 120 Ma. Taking the peak at 100 km and the hornblende closure at 18 km, find the mean exhumation rate in $\mathrm{mm\,yr^{-1}}$.
::: solution
$(100 - 18)/(150 - 120) = 82/30 = 2.7\ \mathrm{km\,Myr^{-1}} = 2.7\ \mathrm{mm\,yr^{-1}}$. This is fast by orogenic standards but five times slower than the [[#ex-uhp-rate]] example, and it is the more common number: it is compatible with exhumation by erosion and crustal-scale extension rather than requiring the buoyant return of a slab fragment.
:::
:::

::: exercise The partial retention zone {level=3}
Apatite fission-track ages are constant at $60\ \mathrm{Ma}$ below 1000 m elevation, then increase linearly to $180\ \mathrm{Ma}$ at 3000 m. Above 3000 m they are constant at $180\ \mathrm{Ma}$. Interpret, and say what the two plateaux mean.
::: solution
This is the classic signature of a **partially annealed zone** crossed by a single cooling or exhumation event. Below 1000 m the rock passed below the total-annealing temperature (about $120^\circ\mathrm{C}$) long ago and the age is a true cooling age of 60 Ma. Above 3000 m the rock never exceeded the partial-annealing threshold (about $60$–$70^\circ\mathrm{C}$) and the age dates the original cooling, 180 Ma. In between, the two isotherms were crossed during a single episode of exhumation, and the linear increase of age with elevation gives the rate:
$$
\dot{E} = \frac{3000 - 1000}{180 - 60} = 16.7\ \mathrm{m\,Myr^{-1}} = 0.017\ \mathrm{mm\,yr^{-1}} .
$$
That is extraordinarily slow — a cratonic margin, not a mountain belt — and the interpretation is a passive margin exhumed by a few kilometres in the last 120 million years. The two plateaux are the reason the method works: they bound the zone and show that the two ends of the transect have not been disturbed.
:::
:::

::: exercise Derive the closure sensitivity {level=3}
Starting from $\mathrm{d}T_c/\mathrm{d}\ln|\mathrm{d}T/\mathrm{d}t| = RT_c^2/E$, integrate to obtain $T_c$ as a function of cooling rate, and evaluate the result for $E = 263\ \mathrm{kJ\,mol^{-1}}$ between $10$ and $1000\ ^\circ\mathrm{C\,Myr^{-1}}$ starting from $T_c = 500^\circ\mathrm{C}$.
::: solution
Treating $E$ as constant and separating variables,
$$
\int_{T_1}^{T_2}\frac{\mathrm{d}T_c}{T_c^{2}} = \frac{R}{E}\int_{\dot T_1}^{\dot T_2}\mathrm{d}\ln\dot T
\quad\Longrightarrow\quad
\frac{1}{T_1} - \frac{1}{T_2} = \frac{R}{E}\ln\frac{\dot T_2}{\dot T_1}.
$$
With $T_1 = 773\ \mathrm{K}$, $\dot T_2/\dot T_1 = 100$, $E = 263\,000\ \mathrm{J\,mol^{-1}}$:
$$
\frac{1}{T_2} = \frac{1}{773} - \frac{8.314\times4.605}{263\,000} = 1.294\times10^{-3} - 1.455\times10^{-4} = 1.148\times10^{-3},
$$
so $T_2 = 871\ \mathrm{K} = 598^\circ\mathrm{C}$. The linearised estimate of [[#ex-tc]] gave $587^\circ\mathrm{C}$, an error of $11\ \mathrm{K}$ — acceptable, and the reason the linear form is used. The integrated form is better for large changes in cooling rate, and it has the useful property that $T_c$ never diverges: as the cooling rate goes to infinity, $1/T_c$ tends to $1/T_1 - (R/E)\ln(\dot T_2/\dot T_1)$, which reaches zero at a finite rate. No system can be closed at a temperature above the temperature at which it was open.
:::
:::

::: exercise The whole history {level=3}
A granulite-facies terrane gives: zircon uranium–lead ages of 1850 Ma from magmatic cores and 1820 Ma from overgrowths; garnet samarium–neodymium model ages of 1815 Ma; hornblende argon ages of 1780 Ma; biotite argon ages of 1700 Ma; and apatite fission-track ages of 350 Ma. Reconstruct the history and state the weakest link.
::: solution
**1850 Ma** — the protolith crystallises; the magmatic zircon cores are inherited from the source and date the original granite. **1820 Ma** — a metamorphic zircon overgrowth grows during the peak of granulite-facies metamorphism, and the samarium–neodymium model age in garnet at 1815 Ma confirms that the peak assemblage is the same age, which is a strong internal check because the two systems close at similar temperatures and are chemically independent. **1780 Ma** — cooling through $500^\circ\mathrm{C}$, 40 million years after the peak: fast by cratonic standards, and requiring either rapid exhumation or a large heat flux. **1700 Ma** — cooling through $280^\circ\mathrm{C}$, at an average of $30\ ^\circ\mathrm{C\,Myr^{-1}}$; the granulite has become a mid-crustal amphibolite and then a greenschist. **350 Ma** — the final removal of the last few kilometres of cover, during a Palaeozoic orogeny or the opening of an adjacent basin, which re-heated the rock just enough to anneal the apatite tracks.

The weakest link is the **1700 Ma biotite age**. Biotite is the most easily disturbed of the common potassium–argon systems: it is fine-grained, it is the phase most likely to have been retrograded by later fluids, and its argon is lost along grain boundaries during even mild deformation. A 1700 Ma biotite age in a terrane whose next youngest age is 350 Ma is a gap of 1.35 billion years, and the usual explanation is not a billion years of stillstand but a partial resetting that has not been recognised. The test is to step-heating the biotite and look for a mixed release pattern, and to date the same rock by the calcium-isotope method in garnet, which is immune to fluid.
:::
:::
