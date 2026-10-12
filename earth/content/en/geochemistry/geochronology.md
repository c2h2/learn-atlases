Geochronology is the only branch of the earth sciences that produces numbers with units of time, and it does so from a single physical fact: an unstable nucleus decays at a rate that no chemical, thermal or mechanical process on Earth can alter. Every other dating method — stratigraphy, palaeontology, magnetostratigraphy, tree rings, ice cores, orbital cycles — is relative, and all of them are calibrated against radiometric ages. The subject rests on one differential equation, one algebraic trick, and one hard-won appreciation of what the resulting number actually means.

## The decay equation and the isochron

::: definition Radioactive decay {#def-decay}
For a parent $N$ decaying to a daughter $D$ with decay constant $\lambda$,
$$
\frac{dN}{dt} = -\lambda N, \qquad N = N_0 e^{-\lambda t}, \qquad
D^* = N\left(e^{\lambda t} - 1\right),
$$
where $D^*$ is the **radiogenic** daughter accumulated since $t = 0$. The **half-life** is $t_{1/2} = \ln 2/\lambda$ and the **mean life** is $1/\lambda$. The constants that matter are
$$
\begin{array}{l|c|c}
\text{system} & \lambda\ (\mathrm{yr^{-1}}) & t_{1/2} \\ \hline
^{238}\mathrm{U}\to\,^{206}\mathrm{Pb} & 1.55125\times10^{-10} & 4468\ \mathrm{Myr}\\
^{235}\mathrm{U}\to\,^{207}\mathrm{Pb} & 9.8485\times10^{-10} & 704\ \mathrm{Myr}\\
^{232}\mathrm{Th}\to\,^{208}\mathrm{Pb} & 4.9475\times10^{-11} & 14\,010\ \mathrm{Myr}\\
^{87}\mathrm{Rb}\to\,^{87}\mathrm{Sr} & 1.42\times10^{-11} & 48\,800\ \mathrm{Myr}\\
^{40}\mathrm{K}\to\,^{40}\mathrm{Ar} & 5.554\times10^{-10} & 1248\ \mathrm{Myr}\\
^{176}\mathrm{Lu}\to\,^{176}\mathrm{Hf} & 1.867\times10^{-11} & 37\,100\ \mathrm{Myr}\\
^{187}\mathrm{Re}\to\,^{187}\mathrm{Os} & 1.666\times10^{-11} & 41\,600\ \mathrm{Myr}\\
^{14}\mathrm{C}\to\,^{14}\mathrm{N} & 1.210\times10^{-4} & 5730\ \mathrm{yr}
\end{array}
$$
The **choice of system is a choice of timescale and of mineral**: a system with a long half-life and a high closure temperature (U–Pb in zircon) dates the crystallisation of a rock; one with a short half-life and a low closure temperature (apatite uranium–thorium helium) dates its cooling through 70 °C, which in an eroding mountain belt is a measurement of the **exhumation rate** rather than of any event.
:::

::: definition The isochron {#def-isochron}
A rock inherits an unknown amount of **non-radiogenic** daughter, and unless that initial component is known the age cannot be calculated. The **isochron** removes it by measuring several cogenetic samples or mineral separates with different parent-to-daughter ratios. Writing the measured daughter-isotope ratio as a sum of initial and radiogenic parts and normalising to a stable, non-radiogenic isotope of the same element,
$$
\left(\frac{D}{N'}\right)_{\!meas} = \left(\frac{D}{N'}\right)_{\!initial} + \left(\frac{P}{N'}\right)\left(e^{\lambda t}-1\right),
$$
which is the equation of a **straight line** of slope $m = e^{\lambda t}-1$ and intercept the initial ratio. The age is
$$
t = \frac{1}{\lambda}\ln(1+m),
$$
and the intercept is itself a datum of first importance — it is the **initial isotope ratio of the reservoir**, and it is the number that makes strontium, neodymium, hafnium and osmium isotope geology a tracer of sources rather than merely a clock. The isochron's assumptions are that the samples were **cogenetic**, that they remained **closed** to parent, daughter and the normalising element, and that they **shared the same initial ratio** at $t = 0$.
:::

::: example A two-point rubidium–strontium isochron {#ex-isochron}
Two cogenetic micas from a pegmatite give $^{87}\mathrm{Rb}/^{86}\mathrm{Sr} = 10$ with $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.720$, and $^{87}\mathrm{Rb}/^{86}\mathrm{Sr} = 50$ with $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 1.292$. Find the age and the initial ratio, and state what would have to be true for the two points to define an age at all.
::: solution
The slope is
$$
m = \frac{1.292 - 0.720}{50 - 10} = \frac{0.572}{40} = 0.01430,
$$
and the age is
$$
t = \frac{\ln(1 + 0.01430)}{1.42\times10^{-11}} = \frac{0.01420}{1.42\times10^{-11}} = 1.00\times10^{9}\ \mathrm{yr}.
$$
The initial ratio follows from either point:
$$
\left(\frac{^{87}\mathrm{Sr}}{^{86}\mathrm{Sr}}\right)_0 = 0.720 - 10\times0.01430 = 0.577 .
$$
An initial ratio of 0.577 is **grossly unradiogenic** — the depleted mantle at 1.0 Ga was about 0.709 and even the most depleted mantle reservoir known is above 0.700 — so the "age" is almost certainly a **mixing line** between two components rather than an isochron, and the two micas did not share a common initial strontium ratio.

This is the most instructive feature of the example. **A straight line in isotope space is not automatically an isochron**, and the test is the intercept: an isochron's initial ratio must be geologically plausible for the reservoir, and its slope must be **confirmed by a third and fourth point** and by a **second system**. Two points always define a line; only three or more test whether the line means anything. The second test is the **replicate on a different mineral with a different closure temperature and a different parent/daughter ratio** — a whole-rock Rb–Sr "age" that disagrees with the zircon U–Pb age of the same pegmatite records either open-system strontium mobility or an inherited initial ratio, and the two are distinguished by the mineral-scale data.
:::
:::

::: widget plot
f: exp(0.155125*x)-1
x: 0, 4.5
y: 0, 1.1
labels: \text{Pb} / \text{U}
caption: The radiogenic ingrowth curve $^{206}\mathrm{Pb}^*/^{238}\mathrm{U} = e^{\lambda t}-1$ for the $^{238}$U decay, plotted against the age in **billion years**. The curve is **convex and accelerating**, so the **precision of a uranium–lead age is worst for the youngest rocks**: at 100 Ma the ratio is 0.0156 and a 1 per cent analytical error in the ratio is a 64 per cent error in the age, whereas at 1000 Ma the ratio is 0.168 and the same analytical error gives a 6 per cent age error. This is why the Precambrian was dated decades before the Mesozoic, why the Neogene needed argon and then high-precision ion microprobe uranium–lead, and why the **$^{206}$Pb/$^{238}$U age of a young zircon is now measured by isotope dilution with a $^{205}$Pb–$^{235}$U spike** rather than by the ratio alone. The same convexity is why the $^{207}$Pb/$^{206}$Pb age, which uses **no** parent measurement at all, is the preferred age for rocks older than about a billion years.
:::

::: example Radiocarbon, reservoirs and calibration {#ex-c14}
A marine shell gives a fraction-modern carbon-14 fraction of 0.5000 with a $\delta^{13}$C of 0 per cent (relative to the $-25$ per cent normalisation standard), and the regional marine reservoir age is 420 years. Find the conventional radiocarbon age and the calendar age, and explain why the two differ by more than the reservoir correction.
::: solution
The **fraction modern** must first be corrected for isotopic fractionation, because a $\delta^{13}$C of 0 per cent means the carbon was fractionated relative to the standard and the $^{14}$C has been fractionated twice as strongly:
$$
A_{SN} = A\left[\frac{0.975}{1+\delta^{13}\mathrm{C}/1000}\right]^2 = 0.5000\times0.975^2 = 0.4754 .
$$
The **Libby radiocarbon age** is then
$$
t = -8033\ln(0.4754) = 8033\times0.7436 = 5973\ ^{14}\mathrm{C}\ \mathrm{yr\ BP}.
$$
Subtracting the 420-year **marine reservoir age** gives 5553 radiocarbon years for the atmosphere at the time of growth, and the calibration curve converts that to a **calendar age of about 6400 years before present** — a difference of 850 years from the radiocarbon age, of which 420 is the reservoir and 430 is the calibration.

The calibration offset exists because **atmospheric $^{14}$C production has never been constant**. Cosmogenic $^{14}$C production varies with the geomagnetic dipole moment (a weaker field shields the atmosphere less and produces more), with the solar modulation potential, and above all with the **carbon-cycle reorganisation** that exchanges carbon between the atmosphere, the biosphere and the deep ocean. During the last deglaciation the deep ocean was more isolated and more $^{14}$C-dead, so atmospheric $^{14}$C fell and radiocarbon ages were **too young** by 600–1000 years; during a grand solar minimum such as the Spörer or Maunder minimum the production rose and radiocarbon ages became too young. The **IntCal20, Marine20 and SHCal20** curves, built from annually laminated lake sediments, corals dated by uranium–thorium, and the dendrochronological record to 13,900 years, correct for all of this, and the **calibrated probability distribution** is typically **multi-modal** — a single radiocarbon age of 8000 ± 30 yr BP may correspond to three separate calendar ranges.

The practical rules follow. **Never quote a radiocarbon age without the $\delta^{13}$C, the fractionation correction, the reservoir correction where relevant, and the calibration curve and version used.** **Never average radiocarbon ages before calibrating them**, because the calibration is nonlinear and averaging commensurate radiocarbon ages can produce a calibrated mode that no sample supports. And **treat the calibrated range as a probability distribution, not a date** — which is why the modern practice in archaeology and Quaternary geology is **Bayesian age-modelling** with the stratigraphy as a prior, and why the "date" of a single sample is a range with 95 per cent probability, not a year.
:::
:::

## Concordia, discordia and the closure temperature

::: definition The concordia diagram {#def-concordia}
A single mineral containing uranium and no initial lead carries **two independent clocks**, $^{238}$U–$^{206}$Pb and $^{235}$U–$^{207}$Pb, and because the two decay constants are known and the present $^{235}$U/$^{238}$U ratio of 1/137.88 is a constant of the solar system, the two ratios cannot be assigned independently: they must fall on the **concordia curve** in the $(^{206}\mathrm{Pb}/^{238}\mathrm{U},\ ^{207}\mathrm{Pb}/^{235}\mathrm{U})$ plane. A grain that gives the same age from both is **concordant**. A grain that has **lost lead** plots below the curve, and — because proportional lead loss leaves the ratio of two radiogenic daughters unchanged — its $^{207}$Pb/$^{206}$Pb age is **unaffected**. A population of grains that have lost different amounts of lead plots on a **discordia**, a straight line whose **upper intercept** with the concordia is the age of the rock and whose **lower intercept** is the age of the lead-loss event. The diagram is therefore not a way of averaging two ages but a **test of the closed-system assumption** and, when it fails, a two-age solution from a single grain population.
:::

::: definition Closure temperature {#def-Tc}
A radiometric clock does not start when the rock crystallises but when it cools below the temperature at which the daughter isotope diffuses slowly enough to be retained. **Dodson** (Dodson) showed that for volume diffusion with an activation energy $E$, a frequency factor $D_0$, a grain radius $a$ and a cooling rate $dT/dt$, the **closure temperature** is
$$
T_c = \frac{E}{R\,\ln\!\left(\dfrac{A\,R\,T_c^2\,D_0}{E\,a^2\,(dT/dt)}\right)},
$$
with $A = 55$ for a sphere. The equation is implicit in $T_c$ and is solved by iteration. The tabulated values, for a cooling rate of 10 °C per million years and a millimetre grain, are among the most used numbers in the earth sciences:
$$
\begin{array}{l|c|l|c}
\text{system} & T_c\ (^\circ\mathrm{C}) & \text{system} & T_c\ (^\circ\mathrm{C})\\ \hline
\text{U--Pb, zircon} & 900\pm50 & \text{Ar--Ar, biotite} & 280\pm40\\
\text{U--Pb, monazite} & 730\pm50 & \text{Ar--Ar, K-feldspar} & 150\text{--}250\\
\text{U--Pb, titanite} & 620\pm40 & \text{fission track, zircon} & 240\pm40\\
\text{Ar--Ar, hornblende} & 500\pm50 & \text{fission track, apatite} & 110\pm30\\
\text{Ar--Ar, muscovite} & 400\pm50 & \text{(U--Th)/He, apatite} & 75\pm20
\end{array}
$$
A rock is therefore not **one** age but a **stack of ages**, each recording the time at which the rock passed through a different isotherm, and the difference between two of them divided by the difference in their closure temperatures is an **apparent cooling rate**.
:::

::: example A cooling path from four clocks {#ex-cooling}
A mylonite from an exhumed orogen gives a zircon U–Pb (rim) age of 100 Ma, a hornblende $^{40}$Ar/$^{39}$Ar age of 85 Ma, a muscovite $^{40}$Ar/$^{39}$Ar age of 70 Ma and an apatite fission-track age of 40 Ma. Find the apparent cooling rates, and, taking a palaeogeotherm of 30 °C km⁻¹, the exhumation rates for each interval.
::: solution
Using the tabulated closure temperatures of 900, 500, 400 and 110 °C:
$$
\begin{array}{l|ccc}
\text{interval} & 900\to500 & 500\to400 & 400\to110 \\ \hline
\Delta t\ (\mathrm{Myr}) & 15 & 15 & 30 \\
\text{cooling rate}\ (^\circ\mathrm{C\,Myr^{-1}}) & 27 & 6.7 & 9.7 \\
\Delta z\ (\mathrm{km}) & 13.3 & 3.3 & 9.7 \\
\text{exhumation rate}\ (\mathrm{km\,Myr^{-1}}) & 0.89 & 0.22 & 0.32
\end{array}
$$
The path is one of **rapid initial cooling and exhumation at nearly a kilometre per million years, followed by a three- to fourfold slowdown** — the classic signature of an orogen that was thrust-thickened and eroded quickly during collision and then relaxed during the post-collisional period.

Four cautions keep the interpretation honest. **The closure temperatures are uncertain by ±50 °C**, which for the 500→400 interval is 25 per cent of the temperature difference and makes that cooling rate good to a factor of two at best. **The palaeogeotherm is assumed**, and a crust whose geotherm was 45 rather than 30 °C km⁻¹ halves every exhumation rate. **The systems have different closure mechanisms** — argon in hornblende is retained by volume diffusion, but in muscovite partly by structural damage, and fission tracks are destroyed by annealing rather than by diffusion, so the "isotherms" are not strictly comparable. **And the ages may be mixed**: a hornblende $^{40}$Ar/$^{39}$Ar age is a **plateau** age only if the step-heating spectrum is flat, and a partially reset fission-track age is a **confounded** age that must be deconvolved from the track-length distribution. The right statement is that the rock cooled through 500 °C at 85 Ma and through 110 °C at 40 Ma, and that everything between is a model.
:::
:::

::: example Discordant zircon {#ex-discordia}
A zircon population from a gneiss gives a $^{206}$Pb/$^{238}$U age of 1260 Ma and a $^{207}$Pb/$^{206}$Pb age of 1800 Ma. Find the discordance, the fraction of radiogenic lead lost, and explain why the older of the two ages is the more reliable.
::: solution
The **discordance** is
$$
\frac{1800 - 1260}{1800} = 0.30 = 30\ \text{per cent}.
$$
For a true age of 1800 Ma the undisturbed ratios are
$$
\frac{^{206}\mathrm{Pb}^*}{^{238}\mathrm{U}} = e^{\lambda_{238}t}-1 = 0.322, \qquad
\frac{^{207}\mathrm{Pb}^*}{^{235}\mathrm{U}} = 4.89, \qquad
\frac{^{207}\mathrm{Pb}^*}{^{206}\mathrm{Pb}^*} = \frac{4.89}{0.322\times137.88} = 0.110 .
$$
The measured $^{206}$Pb/$^{238}$U ratio implied by a 1260 Ma apparent age is $e^{\lambda_{238}\times1.26\times10^9}-1 = 0.216$, so the fraction of lead retained is
$$
\frac{0.216}{0.322} = 0.67 ,
$$
and **33 per cent of the radiogenic lead has been lost**.

The $^{207}$Pb/$^{206}$Pb age is the more reliable **because it contains no parent**. Both numerator and denominator are radiogenic lead, so a process that removes lead **proportionally from both** — which is what volume diffusion of lead from a homogeneous grain does — leaves the ratio, and therefore the age, **exactly unchanged**. The $^{206}$Pb/$^{238}$U and $^{207}$Pb/$^{235}$U ages, which each divide a lost daughter by a retained parent, both fall, and they fall by different amounts because the two parents have different decay constants.

The corollary is the standard practice of high-precision zircon geochronology. For rocks **older than about 1000 Ma** the $^{207}$Pb/$^{206}$Pb age is reported, because it is robust to lead loss and because the $^{207}$Pb/$^{235}$U ratio is large and well measured. For rocks **younger than about 1000 Ma** the $^{206}$Pb/$^{238}$U age must be used, because the $^{207}$Pb produced in a young rock is too small to measure precisely — at 100 Ma the $^{207}$Pb/$^{235}$U ratio is only 0.010, and a 1 per cent error in it is a 100 per cent error in the age. And for a **discordant** population the answer is not either age but the **discordia**: the upper intercept is the crystallisation age and the lower intercept is the metamorphic or disturbance age, and a well-spread population of twenty grains can give both from a single sample.
:::
:::

::: warning A radiometric date is an age, not necessarily the age of the thing you dated
Every radiometric age is the answer to a specific question, and the question is rarely the one asked. **Inheritance**: a granite's zircon U–Pb age can be 200 Myr older than the granite if the zircons survived the melting of their source, and the test is a **cathodoluminescence image** showing a core and rim, with the rim dated. **Metamorphic overprint**: a whole-rock Rb–Sr or K–Ar age dates the last time the rock cooled through 300 or 200 °C, not the time it formed, and in an orogen the two may differ by hundreds of millions of years. **Detrital ages are source ages**: a detrital zircon U–Pb spectrum gives the ages of the rocks that were eroded, and the youngest population's maximum depositional age is a **maximum** — the true depositional age may be tens of millions of years younger. **Reservoir offsets in carbon-14**: a shell, a hard-water lake fish or a coastal human eats carbon that has been out of contact with the atmosphere for centuries to millennia, so a "radiocarbon age" must be corrected by a **regional reservoir age** of 400 years for the ocean, 400–1500 years for hard-water lakes and up to 800 years for the marine carbonates of upwelling coasts, and the calibration curve then converts the corrected age to calendar years. **Open systems**: a whole-rock isochron through a metamorphic terrain that has been flushed by fluid gives a **disturbance age** with the appearance of a primary one, and the only test is mineral-scale work. **And the uncertainty is not the error bar**: a reported "540.2 ± 3.1 Ma" carries an analytical uncertainty of 3.1 Myr and a **systematic** uncertainty from the decay constants, the spike calibration and the common-lead correction that is commonly 2–5 times larger, which is why the Cambrian base has been revised by 15 Myr twice in twenty years. The discipline is to state **which mineral, which isotopic system, which closure temperature, which sample preparation and which correction** produced the number, and to treat any age whose supporting data are not published as provisional.
:::

::: history
**Rutherford** (Rutherford) proposed radioactivity as a heat source and an absolute clock in 1904 and **Boltwood** (Boltwood) produced the first lead–uranium ages of 400–2200 Ma in 1907 — ages so large that they were dismissed for a generation. **Nier** (Nier) invented the mass spectrometer and measured the lead isotopes in 1937–1938, **Holmes** (Holmes) produced his first geological time scale in 1911 and his *Principles of Physical Geology* with the "Holmes time scale" in 1944, and **Patterson** (Patterson) established the age of the Earth at 4550 Ma in 1956 by the lead–lead method on meteorites and, crucially, by inventing the **clean laboratory** to beat the ubiquitous contamination that had made the measurement impossible. **Brown** (Brown) and **Holmes** proposed argon dating in the 1940s and **Aldrich and Nier** (Aldrich) gave the first potassium–argon ages in 1938–1939. **Tilton** (Tilton), **Wetherill** (Wetherill) and **Catanzaro** (Catanzaro) built the modern uranium–lead method in the 1950s, **Tera and Wasserburg** (Wasserburg) published the two-ratio concordia in 1972, and **Steiger and Jäger** (Jäger) fixed the convention on the decay constants in 1977. **Dodson** (Dodson) derived the closure-temperature equation in 1973, **Harrison and the Sheffield and Arizona argon school** (Harrison) calibrated the argon systems in 1999, and **Farley** (Farley) and **Flowers, Shuster and the (U–Th)/He school** (Shuster) established the helium and annealing systematics. **Libby** (Libby) invented radiocarbon dating in 1946–1949 and received the 1960 Nobel Prize; the **dendrochronological calibration** is the work of **Suess** (Suess), **de Vries** (Vries), and the **IntCal** and **MarineCal** working groups (Reimer). **Allegre** (Allegre) introduced the isochron-least-squares treatment, **York** (York) the regression of correlated errors in 1966, and **Ludwig** (Ludwig) the Isoplot and IsoplotR statistical framework. The **CA-ID-TIMS** (chemical-abrasion isotope-dilution thermal-ionisation mass-spectrometry) precision of 0.1 per cent is the work of **Condon, Bowring, Schmitz, Mundil and the Berkeley, Canberra and Adelaide laboratories** (Bowring).
:::

## Where this leads

The isotope systems used as tracers rather than as clocks are in [[geochemistry/radiogenic-tracers]] and [[geochemistry/stable-isotopes]], the carbon-14 and uranium-series methods used in the Quaternary are in [[palaeoclimate/dating]] and [[palaeoclimate/last-two-millennia]], the thermochronological interpretation of exhumation is in [[geomorphology/landscape-evolution]] and [[structural-geology/orogens]], the geological time scale built on all of this is in [[earth-history/geological-time]] and [[earth-history/relative-dating]], the age of the Earth and the solar system is in [[planetary-science/formation]] and [[planetary-science/meteorites]], and the low-temperature applications to weathering rates are in [[geochemistry/weathering-chemistry]].

::: quiz
A biotite gives a Rb–Sr age of 250 Ma and a K–Ar age of 180 Ma from the same outcrop. What is the most defensible reading?
- [ ] The K–Ar system was disturbed by alteration and the Rb–Sr age is correct.
- [ ] The rock crystallised at 250 Ma and cooled to 180 Ma.
- [x] The rock passed through the biotite Rb–Sr closure temperature near 250 Ma and through the biotite argon closure temperature near 180 Ma — which is inconsistent with a simple cooling path and needs explaining.
- [ ] Both ages are wrong.
::: solution
Biotite Rb–Sr closes at roughly 220–300 °C and biotite K–Ar at 280 ± 40 °C — essentially the **same** isotherm. Two systems with the same closure temperature that give ages 70 Myr apart cannot both record cooling, so either the argon system has been partially reset (by fluids, by deformation, or by a later low-grade thermal event that did not move strontium), or the Rb–Sr system was disturbed. The correct first move is not to choose between the ages but to look at the step-heating spectrum and the mineral chemistry, and to add a third system with a different closure temperature.
:::
:::

::: summary
- A decay constant is a physical constant; the choice of system sets the timescale and, through the closure temperature, the geological meaning.
- The isochron removes the unknown initial daughter, and its intercept is a reservoir tracer — but a straight line is only an isochron if the intercept is plausible and a third point confirms it.
- Uranium–lead in zircon gives two clocks in one grain; discordance is diagnostic, and the 207Pb/206Pb age is immune to proportional lead loss.
- The closure temperature converts a cooling history into a stack of ages, and the difference between two of them is a cooling rate.
- Radiocarbon needs a reservoir correction and a calibration curve; young systems have poor precision because the ingrowth curve is convex.
- Every published age answers a specific question about a specific mineral, and the question must be stated before the answer is used.
:::

## Exercises

::: exercise Half-life {level=1 check="5730"}
A radioactive nuclide's mean life is $1/\lambda = 8267$ yr. Find its half-life.
::: solution
$t_{1/2} = \ln 2/\lambda = 0.6931\times8267 = 5730\ \mathrm{yr}$ — the Libby–Cambridge radiocarbon half-life. The mean life is 1.44 times the half-life, a conversion that is worth remembering because the radiocarbon "age equation" is usually written with the mean life 8033 (Libby) or 8267 (Cambridge), and the two differ by 3 per cent.
:::
:::

::: exercise Ingrowth {level=1 check="0.168"}
Find $^{206}\mathrm{Pb}^*/^{238}\mathrm{U}$ for a zircon of age 1000 Ma.
::: solution
$e^{\lambda t}-1 = e^{1.55125\times10^{-10}\times10^9}-1 = e^{0.1551}-1 = 0.168$. A 1 per cent analytical error in this ratio is a 6 per cent error in the age, because $dt/t = dR/(\lambda R)$ and $\lambda R$ is small for young rocks.
:::
:::

::: exercise Isochron slope {level=1 check="1.0"}
An Rb–Sr isochron has a slope of 0.0143. Find the age.
::: solution
$t = \ln(1.0143)/1.42\times10^{-11} = 0.01420/1.42\times10^{-11} = 1.0\times10^{9}\ \mathrm{yr}$. For small slopes the approximations $\ln(1+m)\approx m$ and $m \approx \lambda t$ are good to 1 per cent, which is why young Rb–Sr isochrons are so imprecise: the slope is barely distinguishable from zero.
:::
:::

::: exercise Concordance {level=2 check="0.30"}
A zircon gives a $^{206}$Pb/$^{238}$U age of 1260 Ma and a $^{207}$Pb/$^{206}$Pb age of 1800 Ma. Find the discordance.
::: solution
$(1800 - 1260)/1800 = 0.30$, or 30 per cent. The grain has lost about a third of its radiogenic lead, and its $^{207}$Pb/$^{206}$Pb age is the better estimate of the crystallisation age.
:::
:::

::: exercise Carbon-14 {level=2 check="11140"}
A charcoal has 25 per cent of the modern $^{14}$C activity. Find its radiocarbon age using the Libby mean life of 8033 yr.
::: solution
$t = -8033\ln 0.25 = 8033\times1.386 = 11\,140\ ^{14}\mathrm{C}$ yr BP. Two corrections are then required: the **reservoir and isotopic-fractionation correction** ($\delta^{13}$C normalisation to $-25$ per cent), and the **calibration** against the tree-ring and speleothem record, which at 11,100 radiocarbon years adds roughly 1000 calendar years because of the Younger Dryas wobble in atmospheric $^{14}$C production.
:::
:::

::: exercise Uranium-series {level=2 check="55700"}
A coral has $(^{230}\mathrm{Th}/^{238}\mathrm{U}) = 0.400$ and $(^{234}\mathrm{U}/^{238}\mathrm{U}) = 1.000$, with an initial thorium-230 of zero. Find its age ($\lambda_{230} = 9.1705\times10^{-6}\ \mathrm{yr^{-1}}$).
::: solution
With a secular-equilibrium starting point, $(^{230}\mathrm{Th}/^{238}\mathrm{U}) = 1 - e^{-\lambda_{230}t}$, so
$$
t = \frac{-\ln(1-0.400)}{9.1705\times10^{-6}} = \frac{0.5108}{9.1705\times10^{-6}} = 55\,700\ \mathrm{yr}.
$$
This is close to the **useful limit** of the method: at five half-lives the $^{230}$Th/$^{238}$U ratio is 0.97 and its derivative with respect to time is small, so the age uncertainty blows up. The uranium–thorium method is precise to about 400–500 kyr and is the backbone of late-Quaternary sea-level and coral-reef chronology.
:::
:::

::: exercise A cooling rate {level=3 check="0.43"}
A rock gives a hornblende $^{40}$Ar/$^{39}$Ar age of 60 Ma and an apatite (U–Th)/He age of 20 Ma. Taking closure temperatures of 500 and 70 °C, find the mean cooling rate, and, for a geotherm of 25 °C km⁻¹, the mean exhumation rate.
::: solution
$$
\frac{dT}{dt} = \frac{500 - 70}{60 - 20} = \frac{430}{40} = 10.8\ ^\circ\mathrm{C\,Myr^{-1}},
$$
$$
\frac{dz}{dt} = \frac{430/25}{40} = \frac{17.2\ \mathrm{km}}{40\ \mathrm{Myr}} = 0.43\ \mathrm{km\,Myr^{-1}} .
$$
A rate of 0.43 km/Myr sustained for 40 Myr removes **17 km of rock section**, which is a great deal — it implies an orogen with active thrusting and erosion, not a passive margin, and the number should be checked against the independent evidence of the stratigraphy and the basin-fill thickness.

The systematic weakness is the **closure-temperature difference**: 430 °C spans nearly the whole range of crustal temperatures, so the "mean cooling rate" is an average over a path that was almost certainly non-linear, and the isotherms at 500 and 70 °C were crossed at depths of about 17 and 2 km below a surface whose elevation is itself unknown. The modern remedy is a **time–temperature path** from several systems plus a **thermal model** of the crust, and the strongest constraint comes from the **fission-track length distribution**, which records the cooling rate between 110 and 60 °C independently of the closure-temperature concept.
:::
:::

::: exercise The precision of a young age {level=3 check="64"}
A zircon of 100 Ma gives $^{206}$Pb/$^{238}$U = 0.0156. If the ratio is measured with a 1 per cent relative uncertainty, find the resulting age uncertainty in per cent and in Myr, and explain why the same analytical precision gives a much better age for a 2000-Ma zircon.
::: solution
From $R = e^{\lambda t}-1$ we have $t = \ln(1+R)/\lambda$, so
$$
\frac{dt}{t} = \frac{dR}{R}\cdot\frac{1}{\lambda t(1+R)} .
$$
With $\lambda t = 0.01551$ and $1+R = 1.0156$, the factor is $1/(0.01551\times1.0156) = 63.5$, so a 1 per cent ratio error gives a **64 per cent** age error — 64 Myr on a 100-Ma rock.

For a 2000-Ma zircon, $\lambda t = 0.3103$ and $R = 0.3651$, so the factor is $1/(0.3103\times1.3651) = 2.36$ and the same 1 per cent ratio error gives a **2.4 per cent** age error — 47 Myr on a 2000-Ma rock, a factor of twenty-seven better in relative terms.

This is the whole reason the geology of the last 100 Myr was the last to be dated numerically, and why young zircons are dated by **isotope dilution** — spiking the sample with a $^{205}$Pb–$^{235}$U tracer so that the **absolute** amounts of lead and uranium are measured rather than their ratio — and by **secondary-ionisation mass spectrometry** with matrix-matched standards, or by the **$^{207}$Pb/$^{206}$Pb** method on huge single grains. It is also why the Cenozoic time scale is calibrated on argon and on orbital cyclostratigraphy rather than on uranium–lead, and why the boundaries of the Quaternary were formally defined by **stratotype and isotope chemostratigraphy** rather than by a radiometric age.
:::
:::
