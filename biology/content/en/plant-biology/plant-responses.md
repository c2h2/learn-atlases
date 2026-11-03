A plant cannot move to find better conditions, so it must make the best of where it is. It does so by sensing its surroundings with remarkable precision and changing how it grows. A seedling buried in soil grows long and pale until it reaches light, then within hours opens its leaves and makes chlorophyll. A plant in the shade of others detects the change in light colour caused by the leaves above it and grows taller to escape. Many plants measure the length of the night to within a quarter of an hour, so that they flower in the right season; others must first experience weeks of winter cold. A plant attacked by a fungus recognises molecules on its surface and walls off the infection; a plant chewed by a caterpillar makes toxins throughout its body.

This chapter is about how plants perceive and respond to their environment. We begin with light, the most important signal: the photoreceptors that detect its quantity, colour, direction and duration, and the responses they control — phototropism, shade avoidance and the switch from dark to light growth. We then turn to time: the circadian clock, day length and the control of flowering, including the long search for the flowering signal, florigen. Gravity, temperature and stresses such as drought, cold, salt and flooding come next, and finally the plant's immune system. The hormones that carry many of these responses, especially auxin, gibberellins, ABA and ethylene, were introduced in [[plant-biology/plant-hormones]]. The quantitative threads include the photoequilibrium of phytochrome, the geometry of day length, temperature compensation of the clock and thermal time.

## Sensing light

Plants use light both as their source of energy and as a source of information. For information, they have several families of photoreceptors, each a protein with a bound light-absorbing chromophore, each covering a different part of the spectrum.

::: definition Plant photoreceptors {#def-photoreceptors}
- **Phytochromes** absorb mainly red (around 660 nm) and far-red (around 730 nm) light through a linear tetrapyrrole chromophore (phytochromobilin). *Arabidopsis* has five, phyA–phyE.
- **Cryptochromes** (cry1, cry2) absorb blue and ultraviolet-A light through a flavin (FAD) chromophore; they regulate de-etiolation, photoperiodic flowering and the clock.
- **Phototropins** (phot1, phot2) are blue-light-activated protein kinases with flavin (FMN)-binding LOV domains; they mediate phototropism, chloroplast movement and stomatal opening.
- **ZEITLUPE** family proteins (ZTL, FKF1, LKP2) are blue-light receptors with LOV domains that control the degradation of clock and flowering proteins.
- **UVR8** absorbs ultraviolet-B through tryptophan residues in the protein itself and triggers UV protection.
:::

### Phytochrome: a photoreversible switch

Phytochrome's defining property was discovered before the molecule itself. Harry Borthwick, Sterling Hendricks and colleagues at the US Department of Agriculture (1952) found that seeds of the lettuce variety Grand Rapids germinate after a brief exposure to red light but not if the red flash is followed immediately by far-red; red again after far-red restores germination, and so on through long series of alternations — only the last flash matters. They inferred a pigment that exists in two interconvertible forms. Warren Butler and colleagues detected it spectroscopically in etiolated seedlings in 1959 and named it phytochrome.

Phytochrome is synthesised in the red-absorbing form **Pr**, which is inactive. Absorbing red light converts it to the far-red-absorbing form **Pfr**, the active form, which migrates into the nucleus and interacts with transcription factors, notably the **PHYTOCHROME-INTERACTING FACTORS** (PIFs), triggering their destruction. Absorbing far-red light converts Pfr back to Pr. In darkness Pfr slowly reverts to Pr. Because the absorption spectra of the two forms overlap — Pfr absorbs a little red, Pr a little far-red — any light produces a mixture of the two, and the proportion of Pfr reports the ratio of red to far-red photons.

::: proposition Phytochrome photoequilibrium {#prop-photoeq}
Let light convert Pr to Pfr with first-order rate constant $k_1$ and Pfr to Pr with rate constant $k_2$, each proportional to the photon flux and to the absorption of the converting form, summed over the spectrum. Ignoring synthesis, degradation and dark reversion, the fraction of phytochrome in the active form approaches the **photoequilibrium**

$$
\varphi = \frac{[\mathrm{Pfr}]}{[\mathrm{Pr}] + [\mathrm{Pfr}]} = \frac{k_1}{k_1 + k_2},
$$ {#eq-photoeq}

with relaxation time $1/(k_1 + k_2)$.
:::

::: proof
$\dd[\mathrm{Pfr}]/\dd t = k_1[\mathrm{Pr}] - k_2[\mathrm{Pfr}]$ with $[\mathrm{Pr}] + [\mathrm{Pfr}] = P$ constant. Setting the derivative to zero gives $k_1(P - [\mathrm{Pfr}]) = k_2[\mathrm{Pfr}]$, so $[\mathrm{Pfr}]/P = k_1/(k_1 + k_2)$. The solution of the linear equation approaches this value exponentially with rate $k_1 + k_2$.
:::

::: example Phytochrome in sunlight and shade {#ex-photoeq}
Consider a simplified model in which light contains red (R) and far-red (FR) photons in the ratio $\zeta$ = R : FR. Per red photon, Pr is converted with relative efficiency 1 and Pfr with 0.15; per far-red photon, Pfr is converted with relative efficiency 1 and Pr with 0.025. Then $k_1 \propto \zeta + 0.025$ and $k_2 \propto 0.15\zeta + 1$. Find $\varphi$ in (a) pure red light, (b) pure far-red, (c) daylight with $\zeta = 1.2$, and (d) shade under a leaf canopy with $\zeta = 0.2$.
::: solution
By [[#eq-photoeq]], $\varphi = (\zeta + 0.025)/(1.15\zeta + 1.025)$.

(a) As $\zeta\to\infty$, $\varphi \to 1/1.15 = 0.87$. Even saturating red light leaves 13 % of phytochrome as Pr, because Pfr also absorbs red. (b) At $\zeta = 0$, $\varphi = 0.025/1.025 = 0.024$. (c) At $\zeta = 1.2$, $\varphi = 1.225/2.405 = 0.51$. (d) At $\zeta = 0.2$, $\varphi = 0.225/1.255 = 0.18$.

Leaves absorb red light strongly (chlorophyll) but transmit and reflect far-red, so the R : FR ratio, about 1.1–1.2 in daylight, falls to 0.1–0.7 under a canopy. A plant can read the proportion of active phytochrome as a measure of how much vegetation surrounds it — even before it is shaded, since far-red reflected from neighbours lowers R : FR.
:::
:::

::: widget plot
f: (x + w)/(x*(1 + s) + 1 + w)
x: 0, 4
y: 0, 1
sliders: s=0.15:0.05:0.4:0.01; w=0.025:0:0.1:0.005
points: 1.2, 0.509; 0.2, 0.179
labels: \varphi = [\mathrm{Pfr}]/[\mathrm{P_{tot}}]
caption: Fraction of phytochrome in the active Pfr form (vertical) against the red : far-red photon ratio $\zeta$ (horizontal), in the model of [[#ex-photoeq]]: slider $s$ is the relative efficiency with which red light converts Pfr back to Pr, and $w$ the efficiency with which far-red converts Pr to Pfr. The marked points are open daylight ($\zeta = 1.2$) and canopy shade ($\zeta = 0.2$). The response is steepest at low $\zeta$, the range found in and near vegetation, which makes phytochrome a sensitive detector of neighbours. Increase $s$: the ceiling in pure red light falls, because Pfr absorbs more red.
:::

### What phytochromes do

Phytochromes control nearly every stage of a plant's life: germination of small seeds (which should germinate only near the soil surface, in light), **de-etiolation** of seedlings, **shade avoidance**, and flowering. The different phytochromes have different roles. **phyB** is stable in the light and is the main sensor of R : FR: in shade, its Pfr falls, PIFs accumulate, and they activate genes for auxin synthesis and cell elongation, so stems and petioles elongate, leaves move upwards, branching is suppressed and flowering is accelerated — the **shade-avoidance syndrome**, which in a crop field means taller, thinner plants and lower yield. **phyA** is abundant in dark-grown seedlings but is degraded rapidly in light as Pfr; it is the receptor that lets seedlings respond to very dim light and to far-red-rich light deep in canopy shade.

A seedling growing in darkness is **etiolated**: it puts its resources into elongating its hypocotyl (or, in grasses, its mesocotyl) to reach the light, keeps its cotyledons closed and protected by an apical hook, and has etioplasts instead of chloroplasts ([[plant-biology/plant-cells-tissues]]). On reaching light, phytochromes and cryptochromes trigger **photomorphogenesis**: hypocotyl elongation slows, the hook opens, cotyledons expand, chlorophyll is made and chloroplasts develop, and gene expression changes on a massive scale. In darkness, an E3 ubiquitin ligase, COP1, keeps photomorphogenesis switched off by destroying the transcription factor HY5 and others; *cop1* mutants grown in the dark look like light-grown seedlings. Light inactivates COP1 and removes it from the nucleus.

### Phototropism

Phototropism — growth towards (or, in roots, away from) light — is mediated by phototropins. Unilateral blue light activates phot1 more on the lit side, which leads to the redistribution of auxin to the shaded side (the **Cholodny–Went hypothesis**, formulated independently by Nikolai Cholodny and Frits Went in the 1920s), where it promotes elongation, bending the organ towards the light ([[plant-biology/plant-hormones]]). The lateral redistribution involves PIN auxin efflux carriers, especially PIN3, whose localisation in cells of the hypocotyl's endodermis shifts towards the shaded side. Phototropins also move chloroplasts in cells — to the cell surfaces in weak light to maximise absorption, and to the side walls in strong light to avoid damage — and open stomata in blue light ([[plant-biology/water-transport]]).

## Gravity

Shoots grow up and roots grow down: **gravitropism**. The site of perception in roots is the **columella** of the root cap; in shoots, the endodermis. Both contain **statoliths**, amyloplasts dense with starch ([[plant-biology/plant-cells-tissues#def-plastids]]) that sediment to the lower side of the cell. When a root is laid on its side, the statoliths settle onto the new lower wall within minutes, and this is detected — the mechanism of detection is not fully settled, but it involves the LAZY proteins, which move with the amyloplasts to the lower side of the plasma membrane and recruit regulators of PIN polarity. PIN3 and PIN7 in the columella relocalise to the lower side, auxin is directed to the lower flank of the root, and there, at concentrations that inhibit root elongation (roots are highly sensitive), it slows growth: the upper side grows faster, and the root bends downward. In shoots, auxin accumulating on the lower side promotes growth, and the shoot bends upward. Removing the root cap abolishes gravitropism without stopping growth, and starchless mutants of *Arabidopsis* are less sensitive to gravity, confirming the statolith hypothesis.

::: quiz
A horizontal root bends downward because:
- [ ] auxin is destroyed on the lower side, so the lower side grows faster
- [x] auxin accumulates on the lower side, where, at that concentration, it inhibits the elongation of root cells, so the upper side grows faster
- [ ] the lower side grows faster because it has more water
- [ ] gravity pulls the root tip down, like a weight on a string
::: solution
Auxin is redirected to the lower flank by the relocalisation of PIN proteins in response to statolith sedimentation. Root cells are so sensitive to auxin that the extra auxin inhibits their elongation; the upper flank, with less auxin, grows faster, and the root curves down. In shoots the same redistribution promotes growth of the lower side, which bends the shoot upwards. A root's mass is far too small, and its tissues too stiff, for gravity to bend it mechanically.
:::
:::

## Time: the circadian clock

In 1729 the French astronomer Jean-Jacques d'Ortous de Mairan observed that the leaves of a *Mimosa* plant kept in constant darkness still opened and closed with a daily rhythm. This was the first demonstration of an endogenous, **circadian** clock. Plants use their clock to anticipate dawn and dusk — preparing photosynthetic machinery before sunrise, timing scent emission to the hours when pollinators fly, rationing starch through the night ([[plant-biology/photosynthesis]]) — and, as we shall see, to measure day length.

::: definition Circadian rhythm {#def-circadian}
A **circadian rhythm** is a biological oscillation that (1) persists under constant conditions with a **free-running period** of about 24 h (typically 22–28 h); (2) can be **entrained** (reset) by environmental time cues such as light–dark and warm–cool cycles; and (3) is **temperature-compensated**: its period changes little with temperature over the physiological range, in contrast to most biochemical rates.
:::

The core of the *Arabidopsis* clock is a set of interlocking transcriptional feedback loops. Two related morning-expressed MYB transcription factors, **CCA1** and **LHY**, repress the evening-expressed gene **TOC1** (TIMING OF CAB EXPRESSION 1) and other evening genes; TOC1 and its relatives the PSEUDO-RESPONSE REGULATORS (PRR9, PRR7, PRR5) in turn repress *CCA1* and *LHY* at different times of day; an "evening complex" of three proteins represses PRR9 and others at night. Light resets the clock through phytochromes and cryptochromes, and ZTL, a blue-light receptor, controls the degradation of TOC1. The key method was introduced by Andrew Millar, Steve Kay and colleagues (1995), who fused the promoter of a clock-controlled gene to the firefly luciferase gene in *Arabidopsis* and filmed the rhythmic glow of seedlings to screen for mutants with altered periods — among them *toc1*, which runs fast.

::: proposition Temperature coefficient {#prop-q10}
The sensitivity of a rate $k$ to temperature is expressed by the **temperature coefficient**

$$
Q_{10} = \left(\frac{k_2}{k_1}\right)^{10/(T_2 - T_1)},
$$ {#eq-q10}

the factor by which the rate increases for a 10 °C rise. Most enzymatic and metabolic rates have $Q_{10}$ between 2 and 3. For a rhythm, the "rate" is the frequency, $1/\tau$, where $\tau$ is the period.
:::

::: example How well compensated is the clock? {#ex-q10}
An *Arabidopsis* leaf-movement rhythm has a free-running period of 24.4 h at 12 °C and 23.9 h at 22 °C. Find the $Q_{10}$ of the clock frequency, and compare it with an enzyme with $Q_{10} = 2.5$.
::: solution
The frequency ratio is $(1/23.9)/(1/24.4) = 24.4/23.9 = 1.021$; with $T_2 - T_1 = 10$ °C, $Q_{10} = 1.02$. An enzyme with $Q_{10} = 2.5$ runs 2.5 times faster at 22 °C than at 12 °C; if the clock were built from such reactions without compensation, its period would shrink from 24.4 h to about 10 h. Compensation is achieved by balancing reactions whose rates rise with temperature against others that also rise but have opposite effects on the period — a design property of the network, not of any single component.
:::
:::

Does having a clock matter? Antony Dodd, Alex Webb and colleagues (2005) grew *Arabidopsis* mutants with long (28 h) or short (20 h) free-running periods in artificial days of 20, 24 or 28 hours. Plants whose internal period matched the external cycle fixed more carbon, grew more and survived better — "circadian resonance".

## Day length and flowering

### Photoperiodism

In 1920 Wightman Garner and Harry Allard at the US Department of Agriculture reported that a new mutant variety of tobacco, Maryland Mammoth, grew enormous in the summer fields but would flower only when grown in a greenhouse in winter; and that soybeans of one variety, sown at intervals through spring, all flowered around the same date in late summer. By shortening the days artificially with light-tight huts, they showed that both plants flowered when the day length fell below a critical value. They called the phenomenon **photoperiodism**.

::: definition Photoperiodic response types {#def-photoperiod}
- **Short-day plants** (SDPs) flower when the night is longer than a critical length (and so the day shorter than a critical length): chrysanthemum, poinsettia, rice, soybean, Maryland Mammoth tobacco, cocklebur (*Xanthium*).
- **Long-day plants** (LDPs) flower when the night is shorter than a critical length: *Arabidopsis*, wheat, barley, spinach, radish.
- **Day-neutral plants** flower independently of day length: many cultivars of tomato, cucumber and maize.

In **obligate** (qualitative) responders, flowering does not occur at all under the wrong photoperiod; in **facultative** (quantitative) responders it is merely delayed.
:::

::: warning Short-day plants measure the night
The names "short-day" and "long-day" are historical and misleading. Karl Hamner and James Bonner (1938) showed with cocklebur that what the plant measures is the length of the **night**: a short-day plant given a long night interrupted in the middle by a few minutes of light does not flower, although its total day is short — a **night break**. Interrupting a long day with a period of darkness has no comparable effect. The night break is most effective with red light and is reversed by far-red, implicating phytochrome. Growers exploit night breaks: chrysanthemums are kept vegetative in autumn by lighting greenhouses for an hour in the middle of the night, then flowered on schedule by switching the lights off.
:::

Because flowering depends on day length, and day length on latitude and date, plants adapted to one latitude may flower at the wrong time at another. Day length can be calculated from simple astronomy.

::: proposition Day length {#prop-daylength}
At latitude $\phi_\ell$ on a day when the Sun's declination is $\delta$, the Sun is above the geometric horizon for

$$
D = \frac{2}{15^\circ}\arccos\!\left(-\tan\phi_\ell\,\tan\delta\right) \ \text{hours},
$$ {#eq-daylength}

where $\arccos$ is in degrees (the Earth turns 15° per hour). The declination varies through the year approximately as $\delta \approx 23.44^\circ\sin\!\bigl(360^\circ(n - 80)/365\bigr)$ for day number $n$ (with $n = 80$ near the March equinox). Where $|\tan\phi_\ell\tan\delta| > 1$ (inside the polar circles near the solstices) the Sun does not set or does not rise. Atmospheric refraction and the size of the Sun's disc lengthen the observed day by several minutes.
:::

::: proof
At the hour angle $\omega$ from solar noon, the Sun's altitude $\alpha$ satisfies $\sin\alpha = \sin\phi_\ell\sin\delta + \cos\phi_\ell\cos\delta\cos\omega$ (spherical trigonometry of the celestial sphere). Sunrise and sunset are at $\alpha = 0$, so $\cos\omega_0 = -\tan\phi_\ell\tan\delta$. The Sun is up for hour angles from $-\omega_0$ to $+\omega_0$, a total of $2\omega_0$ degrees, which at 15° per hour is $2\omega_0/15$ hours.
:::

::: example When do short-day plants start to flower? {#ex-daylength}
(a) Find the day length at the summer and winter solstices at 51.5° N (London). (b) A short-day soybean variety flowers once days fall below 13 h. At 40° N, after what date is this condition met in summer?
::: solution
(a) At the June solstice $\delta = 23.44^\circ$: $-\tan 51.5^\circ\tan 23.44^\circ = -1.257\times0.4335 = -0.545$; $\arccos(-0.545) = 123.0^\circ$; $D = 2\times123.0/15 = 16.4$ h. At the December solstice, $\arccos(0.545) = 57.0^\circ$ and $D = 7.6$ h. (With refraction, published values for London are about 16.6 and 7.8 h.)

(b) For $D = 13$ h, $\omega_0 = 97.5^\circ$, so $-\tan 40^\circ\tan\delta = \cos 97.5^\circ = -0.1305$, giving $\tan\delta = 0.1305/0.8391 = 0.1556$ and $\delta = 8.84^\circ$. Then $\sin\bigl(360^\circ(n - 80)/365\bigr) = 8.84/23.44 = 0.377$. The declination passes $8.84^\circ$ going down after the June solstice when $360^\circ(n-80)/365 = 180^\circ - 22.2^\circ$, i.e. $n - 80 = 160$, $n = 240$: about **28 August**. Soybean varieties are classified into maturity groups by their photoperiod requirement, and each is grown in a narrow band of latitude; a variety bred for 40° N planted at 30° N, where days in summer are shorter, flowers too early and yields poorly.
:::
:::

::: widget plot
f: (24/pi)*acos(clamp(-tan(L*pi/180)*tan(23.44*pi/180*sin(2*pi*(x - 80)/365)), -1, 1)); (24/pi)*acos(clamp(-tan(10*pi/180)*tan(23.44*pi/180*sin(2*pi*(x - 80)/365)), -1, 1))
x: 0, 365
y: 0, 24
sliders: L=51.5:0:80:0.5
hlines: 12; 13
points: 240, 13
labels: \text{latitude } L; \text{latitude } 10^\circ
caption: Day length (hours, vertical) through the year (day number, horizontal, from 1 January) from [[#eq-daylength]], for the latitude $L$ (° N) set by the slider and, for comparison, at 10° N. The horizontal lines mark 12 and 13 h; the point marks 28 August, when days at 40° N fall below 13 h ([[#ex-daylength]] — set $L = 40$ to see the curve pass through it). Near the equator day length hardly changes, and photoperiodic control of flowering is weak or uses small differences; at high latitudes it swings widely, and above about 66.6° the curve hits 0 and 24 h around the solstices.
:::

### The external coincidence model and florigen

How does a plant measure day length? Erwin Bünning proposed in 1936 that photoperiodism is based on the circadian clock: the clock divides the day into a light-requiring and a dark-requiring phase, and the plant flowers (or not) depending on whether light falls in a particular phase. This **external coincidence** model is now understood molecularly in *Arabidopsis*, a long-day plant. The clock drives expression of the gene *CONSTANS* (*CO*) so that its mRNA peaks about 12–16 hours after dawn. CO protein is degraded in darkness but stabilised by light acting through phyA, the cryptochromes and FKF1. Only in long days does the peak of *CO* expression coincide with light, so that CO protein accumulates in the late afternoon. CO, a transcriptional activator, then switches on ***FLOWERING LOCUS T*** (*FT*) in the phloem companion cells of leaves. In rice, a short-day plant, the same genes are wired with an inverted response, so that the rice FT orthologue *Hd3a* is expressed in short days.

That leaves perceive day length but the shoot apex flowers had long implied a mobile signal. Mikhail Chailakhyan named it **florigen** in 1936, after showing in chrysanthemum that the leaves, not the apex, need to experience inductive days, and grafting experiments showed that an induced leaf grafted onto an uninduced plant can make it flower, even across species and between short-day and long-day plants. Florigen resisted identification for seventy years. In 2007, Laurent Corbesier, George Coupland and colleagues showed that FT protein fused to GFP, made only in the phloem companion cells of *Arabidopsis* leaves, moves to the shoot apex; Shojiro Tamaki, Ko Shimamoto and colleagues obtained similar results for Hd3a in rice. FT protein, a small (about 20 kDa) protein, travels in the phloem to the shoot apex, where it binds the transcription factor FD and, with 14-3-3 proteins, activates floral meristem identity genes such as *APETALA1*, converting the shoot apical meristem into an inflorescence meristem ([[plant-biology/plant-reproduction]]). Florigen is a protein.

### Vernalisation

Many plants of temperate climates — winter wheat, winter barley, biennials such as beet and cabbage, and winter-annual accessions of *Arabidopsis* — flower only after a prolonged exposure to cold, typically several weeks near 0–10 °C, followed by long days in spring. This **vernalisation** requirement ensures that they flower in spring after winter rather than in autumn. In *Arabidopsis* the requirement is set by **FLOWERING LOCUS C** (*FLC*), a MADS-box repressor of *FT* and other flowering genes, activated by *FRIGIDA*. Natural accessions that flower rapidly, such as the common laboratory strains, carry loss-of-function alleles of *FRIGIDA* or weak alleles of *FLC* (Scott Michaels and Richard Amasino, 1999). Prolonged cold silences *FLC* epigenetically: Polycomb-group complexes deposit the repressive histone mark H3K27me3 on the *FLC* locus, beginning at a nucleation site and spreading, and the silenced state is maintained through cell divisions after the plant returns to warmth — a cellular **memory of winter**. Experiments by Caroline Dean, Martin Howard and colleagues showed that each copy of *FLC* switches off in an all-or-nothing way, with the probability of switching increasing with the duration of cold; the gradual response of the plant to longer winters is the sum of many digital decisions in individual cells. The memory is erased in each generation during reproduction, so that seeds start afresh.

## Temperature and thermal time

Plant development is driven by temperature as well as day length. Because development rates increase roughly linearly with temperature above a base temperature, agronomists measure developmental age in **thermal time**.

::: definition Thermal time {#def-thermal}
The **thermal time** accumulated over a period is the sum of daily mean temperatures above a base temperature $T_b$,

$$
\Theta = \sum_{\text{days}} \max\!\left(0,\ \bar T_\text{day} - T_b\right),
$$ {#eq-thermal}

in **degree-days** (°C d). A developmental stage (emergence, flowering, maturity) is reached when $\Theta$ reaches a value characteristic of the variety. The model is empirical: it assumes a linear response of development rate to temperature between the base and an optimum, and fails above the optimum, where development slows.
:::

::: example Degree-days to flowering {#ex-thermal}
A maize variety ($T_b = 10$ °C) needs 700 °C d from sowing to silking. During the first nine days after sowing, the daily mean temperatures were 14, 18, 22, 25, 27, 24, 20, 12 and 9 °C. (a) How much thermal time has accumulated? (b) If the rest of the season averages 23 °C, how many more days to silking?
::: solution
(a) Contributions: $4 + 8 + 12 + 15 + 17 + 14 + 10 + 2 + 0 = 82$ °C d. (The day at 9 °C contributes nothing.)

(b) $700 - 82 = 618$ °C d remain; at $23 - 10 = 13$ °C d per day, that is $618/13 = 47.5$, about 48 more days. A season 2 °C warmer (25 °C average, 15 °C d per day) would shorten this to 41 days — one reason why warming shortens the growing period of crops and reduces the time available for grain filling.
:::
:::

Plants also sense temperature directly. A striking discovery was that phyB itself is a thermosensor: warmth accelerates the dark reversion of Pfr to Pr, so that at higher temperatures less phyB is active, PIF4 accumulates, and stems elongate — the "thermomorphogenesis" of *Arabidopsis* seedlings (Jae-Hoon Jung, Philip Wigge and colleagues; Martina Legris, Jorge Casal and colleagues; both 2016). The same molecule reports light and temperature.

## Stress

Plants are continually exposed to conditions that reduce growth or threaten survival: drought, salinity, flooding, cold, freezing, heat and excess light. Their responses share common elements — reactive oxygen species as signals, calcium transients, hormone changes — but each stress has its specific sensors and pathways.

- **Drought.** As soil dries, ABA accumulates in leaves and closes stomata within minutes ([[plant-biology/plant-hormones]]); over hours to days, ABA-regulated transcription factors induce genes for compatible solutes (proline, glycine betaine, sugars) that lower osmotic potential without harming enzymes (**osmotic adjustment**), for dehydrins and other protective proteins, and for changes in root growth, which is maintained longer than shoot growth so that roots continue to explore for water.
- **Cold and freezing.** Temperate plants become more freezing-tolerant after a period of cool, non-freezing temperatures (**cold acclimation**). In *Arabidopsis*, the CBF/DREB1 transcription factors, induced within hours of cooling, activate a regulon of more than a hundred genes (Michael Thomashow and colleagues, from 1997–1998); their products stabilise membranes and proteins against the dehydration caused by ice forming in the cell walls, which draws water out of cells.
- **Salinity.** Sodium is toxic in the cytoplasm. Plants limit its entry, extrude it from root cells through the Na⁺/H⁺ antiporter SOS1 (activated by a calcium-sensing kinase pathway, the "salt overly sensitive" pathway worked out by Jian-Kang Zhu and colleagues), sequester it in vacuoles, and restrict its transport to the shoot.
- **Flooding.** Submerged tissues run short of oxygen. Ethylene, trapped in waterlogged tissue because it diffuses 10,000 times more slowly in water than in air, triggers the formation of air channels (aerenchyma) and, in deepwater rice, rapid internode elongation to keep leaves above the water. Lowland rice varieties carrying the *SUB1A* gene take the opposite strategy, suppressing growth during submergence to save energy and recovering after the flood recedes (Kenong Xu, David Mackill, Pamela Ronald, Julia Bailey-Serres and colleagues, 2006).

::: application Breeding for a variable climate
Several of the mechanisms in this chapter are being used directly in agriculture. *SUB1A*, introduced by marker-assisted backcrossing into popular rice varieties, lets them survive two weeks of complete submergence; Sub1 varieties released from 2009 onwards are grown by millions of farmers in flood-prone areas of South and South-East Asia. Insensitivity to photoperiod, conferred in wheat by alleles of the gene *Ppd-D1*, let semi-dwarf wheats of the Green Revolution be grown across a wide range of latitudes. Day-neutral alleles of genes in the FT pathway made it possible to grow tomato, maize and soybean far outside their original latitudes. Understanding vernalisation and thermal time helps breeders match varieties to the shorter winters and warmer summers predicted by climate models. And because shade avoidance diverts resources to stems, breeders of maize and other crops grown at high density have unknowingly selected for plants that respond less to neighbours.
:::

## Defence against pathogens

Plants have no circulating immune cells and no antibodies, yet most plants are resistant to most pathogens. Their immune system is cell-autonomous: every cell can recognise attackers and respond. Recognition happens at two levels (Jonathan Jones and Jeffery Dangl, 2006, summarised this as the "zigzag model").

::: definition Pattern-triggered and effector-triggered immunity {#def-immunity}
**Pattern-triggered immunity** (PTI) is activated when cell-surface **pattern-recognition receptors** (receptor kinases and receptor-like proteins) recognise conserved **microbe-associated molecular patterns** such as bacterial flagellin (whose 22-amino-acid epitope flg22 is recognised by the receptor FLS2) or fungal chitin. **Effector-triggered immunity** (ETI) is activated when intracellular **NLR** receptors (nucleotide-binding, leucine-rich-repeat proteins) recognise **effectors**, proteins that pathogens inject into plant cells to suppress PTI — either directly, or indirectly by detecting the changes effectors cause in host proteins ("guarding" them). ETI is usually stronger and often culminates in the **hypersensitive response**, a rapid, localised death of infected cells that deprives biotrophic pathogens of living tissue.
:::

The genetics of ETI was discovered long before its molecules. Harold Flor, working on flax and the flax rust fungus in the 1940s and 1950s, found that for each resistance gene in the plant there is a matching avirulence gene in the pathogen, and resistance occurs only when the plant carries a dominant resistance allele and the pathogen a matching dominant avirulence allele — the **gene-for-gene** relationship. We now know that the resistance genes typically encode NLRs and the avirulence genes effectors. Pathogens evade ETI by losing or changing the recognised effectors; plants evolve new NLRs; the result is an evolutionary arms race that maintains great diversity in NLR genes, of which a plant genome typically contains tens to hundreds.

Infection also triggers responses beyond the infected cell. **Systemic acquired resistance**, mediated by salicylic acid and its receptor-regulators (the NPR proteins), primes distant leaves against a broad range of pathogens for weeks. Wounding by chewing insects activates the jasmonate pathway, inducing proteinase inhibitors and toxic secondary metabolites throughout the plant and the release of volatile compounds that attract the insects' predators and parasitoids. Biotrophic pathogens, which feed on living cells, are mainly resisted through salicylic acid; necrotrophs, which kill cells and feed on the remains, and herbivores mainly through jasmonate and ethylene, and the two arms tend to antagonise each other.

::: history
De Mairan's *Mimosa* (1729) revealed the circadian clock. Darwin and Darwin (1880) studied phototropism and circumnutation, and the Cholodny–Went hypothesis (1926–1928) related tropisms to auxin redistribution. Garner and Allard (1920) discovered photoperiodism; Chailakhyan (1936) proposed florigen and Bünning (1936) the clock-based theory of photoperiodism; Hamner and Bonner (1938) showed the importance of the night. Borthwick, Hendricks and colleagues (1952) discovered red/far-red reversibility, and Butler and colleagues (1959) phytochrome itself. Flor's gene-for-gene concept dates from the 1940s and 1950s. The molecular era brought the first cloned phytochrome (1985), *CONSTANS* (1995), the luciferase clock screens (1995), FLS2 (2000), FT as florigen (2007) and phyB as thermosensor (2016).
:::

## Summary

::: summary
- **Photoreceptors**: phytochromes (red/far-red), cryptochromes, phototropins and ZTL family (blue), UVR8 (UV-B).
- Phytochrome switches between inactive Pr and active Pfr; its photoequilibrium $\varphi = k_1/(k_1 + k_2)$ (about 0.87 in red, 0.02 in far-red) reports the R : FR ratio, which canopies lower. phyB drives shade avoidance via PIFs and auxin; phyA mediates very-low-fluence and far-red responses; light inactivates COP1 to allow photomorphogenesis.
- Phototropism (phototropins) and gravitropism (statoliths in columella and endodermis) work by PIN-mediated redistribution of auxin; roots and shoots respond oppositely because of their different auxin sensitivities.
- The **circadian clock** (CCA1/LHY–TOC1/PRR loops) free-runs with a period near 24 h, is entrained by light and temperature, and is temperature-compensated ($Q_{10} \approx 1$). Matching the internal and external period improves growth.
- **Photoperiodism**: short-day plants measure night length (night breaks prevent flowering). Day length follows $D = (2/15)\arccos(-\tan\phi_\ell\tan\delta)$. In *Arabidopsis*, external coincidence of clock-driven CO with light induces **FT** in leaves; FT protein moves in the phloem to the apex (florigen).
- **Vernalisation** silences FLC epigenetically by Polycomb marks, a cell-autonomous, digital memory of cold.
- Development follows thermal time $\sum\max(0, \bar T - T_b)$; phyB also senses temperature.
- Stress responses: ABA and osmotic adjustment (drought), CBF regulon (cold), SOS pathway (salt), ethylene and SUB1A (flooding).
- **Immunity**: PTI via surface receptors for microbial patterns; ETI via NLRs recognising effectors (gene-for-gene), with the hypersensitive response; systemic acquired resistance (salicylic acid) and jasmonate-mediated defence against herbivores.
:::

The last step of the life cycle — flowers, pollination, fertilisation and seeds — is the subject of [[plant-biology/plant-reproduction]].

## Exercises

::: exercise The equator {level=1 check="12"}
Using [[#eq-daylength]], what is the day length at the equator on any date?
::: solution
At $\phi_\ell = 0$, $\tan\phi_\ell = 0$, so $\arccos 0 = 90^\circ$ and $D = 2\times90/15 = 12$ h, all year.
:::
:::

::: exercise Midsummer at 60° N {level=1 check="18.5"}
Find the day length at the June solstice ($\delta = 23.44^\circ$) at 60° N, to one decimal place in hours.
::: solution
$-\tan 60^\circ\tan23.44^\circ = -1.732\times0.4335 = -0.751$; $\arccos(-0.751) = 138.7^\circ$; $D = 2\times138.7/15 = 18.5$ h.
:::
:::

::: exercise A clock's Q10 {level=1 check="1.05"}
A rhythm has a period of 25.0 h at 15 °C and 23.8 h at 25 °C. Find the $Q_{10}$ of its frequency to two decimal places.
::: solution
$Q_{10} = 25.0/23.8 = 1.05$.
:::
:::

::: exercise Degree-days {level=1 check="54"}
A wheat crop ($T_b = 0$ °C) experiences daily mean temperatures of 5, 7, 9, 11, 10 and 12 °C over six days. How many degree-days accumulate?
::: solution
$5 + 7 + 9 + 11 + 10 + 12 = 54$ °C d.
:::
:::

::: exercise Under a canopy {level=2 check="0.33"}
In the model of [[#ex-photoeq]], what is the phytochrome photoequilibrium at $\zeta = 0.5$? Give two decimal places.
::: solution
$\varphi = (0.5 + 0.025)/(1.15\times0.5 + 1.025) = 0.525/1.600 = 0.33$.
:::
:::

::: exercise Lettuce seeds {level=2}
Batches of Grand Rapids lettuce seeds, imbibed in darkness, receive the following sequences of brief light treatments (R = red, FR = far-red) and are returned to darkness. Predict which batches germinate, and explain: (a) R; (b) R, FR; (c) R, FR, R; (d) R, FR, R, FR; (e) FR alone; (f) R, followed by 2 hours of darkness, then FR.
::: solution
(a) Germinate: R converts most phytochrome to Pfr. (b) No: FR returns it to Pr. (c) Germinate. (d) No: the last flash determines the outcome. (e) No. (f) Usually germinate: once Pfr has acted for a period (here two hours), the downstream changes are committed and FR can no longer reverse them — the "escape from photoreversibility", which shows that Pfr triggers a sequence of events with a characteristic time.
:::
:::

::: exercise Night breaks and grafts {level=2}
(a) A short-day plant with a critical night length of 10 h is given 14 h of darkness with a 10-minute red light break after 7 h. Predict whether it flowers and explain. (b) The same with a red break followed immediately by far-red. (c) A single leaf of an induced cocklebur plant is grafted onto a plant kept in long days, which then flowers. What does this show? (d) How did the experiments with FT–GFP fusions answer the question raised by (c)?
::: solution
(a) No: the light break divides the night into two periods of 7 h, each shorter than the critical 10 h, so the plant behaves as if in short nights.
(b) It flowers: far-red reverses the red-light conversion of phytochrome, so the break is cancelled.
(c) The induced leaf produces a transmissible flowering signal (florigen) that crosses a graft union and can act on an uninduced plant: perception (in leaves) and response (at the apex) are separated, and the signal moves.
(d) FT protein expressed only in leaf phloem companion cells (from a companion-cell-specific promoter) was detected at the shoot apex and was sufficient to induce flowering; FT made at the apex is not needed. So the mobile signal includes the FT protein itself, travelling in the phloem.
:::
:::

::: exercise Winter memory {level=2}
A winter-annual *Arabidopsis* accession is given 0, 2, 4, 6 or 8 weeks of cold at 5 °C, then moved to warm long days. Flowering time (number of leaves at flowering) falls progressively with longer cold, from 60 leaves (no cold) to 12 leaves (8 weeks). (a) Explain this result in terms of *FLC*. (b) Single-cell imaging shows that after 4 weeks, *FLC* is fully off in about half the cells and fully on in the rest. How can a graded whole-plant response arise from all-or-nothing switching in single cells? (c) Why is the silenced state passed on through mitosis but reset in the seeds?
::: solution
(a) Cold progressively silences *FLC*, which represses *FT* and other floral promoters; less *FLC* after longer cold means earlier flowering in the subsequent long days.
(b) Each *FLC* copy switches off stochastically, with a probability per unit time in the cold; the fraction of switched cells rises with the duration of cold, and the plant's response reflects the average *FLC* expression across cells. A digital switch with graded probability yields an analogue population response.
(c) Polycomb-mediated histone methylation (H3K27me3) is copied to daughter chromatin at replication, maintaining the off state; during reproduction (in gametogenesis and embryogenesis) *FLC* is reactivated, so that each generation requires its own winter — necessary because the seed will grow up in a new season.
:::
:::

::: exercise Gene for gene {level=3}
In flax, the resistance gene *L6* (dominant allele *L6*, recessive *l6*) recognises the rust effector AvrL567 (dominant *AvrL567*, recessive *avrL567*, a variant not recognised). (a) Complete the table of outcomes (resistant or susceptible) for plants *L6*/– or *l6 l6* infected with rust isolates carrying *AvrL567* or *avrL567*. (b) Explain why a new variety carrying a single NLR gene is often overcome by the pathogen within a few years, and suggest two breeding strategies to make resistance more durable. (c) Why does PTI not give the plant lasting protection on its own?
::: solution
(a) Resistance only when the plant has *L6* and the rust has *AvrL567*: *L6*/– with *AvrL567* → resistant; *L6*/– with *avrL567* → susceptible; *l6 l6* with either → susceptible.
(b) Selection on the pathogen favours variants that lose or alter the recognised effector, as long as the effector is not essential; in large pathogen populations these variants arise and spread quickly. Strategies: stack several NLRs recognising different effectors in one variety (the pathogen must change all simultaneously); target effectors that the pathogen needs for virulence; deploy different resistance genes in different fields or years; and combine NLRs with quantitative, broad-spectrum resistance.
(c) Successful pathogens have evolved effectors that suppress PTI; PTI blocks most potential pathogens (non-adapted microbes) but adapted pathogens overcome it, and ETI is the plant's counter to that suppression.
:::
:::

::: exercise Clock resonance {level=3}
In the experiment of Dodd and colleagues, plants with a 20 h period (*toc1*-type) and a 28 h period (*ztl*-type) and wild type (24 h) were grown in light–dark cycles of 20 h, 24 h and 28 h (half light, half dark). Each genotype fixed the most carbon in the cycle matching its own period. (a) Suggest why a mismatched clock could reduce carbon fixation, considering anticipation of dawn and starch use at night. (b) Why was it important to test all three genotypes in all three cycles, rather than just comparing mutants with wild type in 24 h days? (c) What would you predict for plants with a disabled clock (arrhythmic) in all three cycles?
::: solution
(a) The clock prepares photosynthetic genes before dawn and sets the rate of starch degradation at night to last until the expected dawn. With a mismatched period, the photosynthetic apparatus is prepared at the wrong time, stomata open at the wrong time, and starch runs out before dawn (wasting growth time in starvation) or is left unused.
(b) Comparing mutants with wild type only in 24 h days confounds the mutation's effect on the period with any other effect of the mutation (pleiotropy); in a full crossed design, a "resonance" interaction — each genotype best in its matching cycle — can be distinguished from a general defect of the mutants.
(c) An arrhythmic plant cannot anticipate dawn or time starch degradation to any period, so it should perform poorly in all three cycles, without a preferred cycle — which is what arrhythmic lines show.
:::
:::
