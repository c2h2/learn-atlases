A slice of rock thirty micrometres thick, glued to a glass slide, is one of the most information-dense objects in science. In an hour with a polarising microscope you can name the minerals in it, tell which grew first and which replaced which, measure the temperature at which two of them last equilibrated, determine the direction and magnitude of the stress that deformed them, and read the pressure–temperature path the rock followed on its way from thirty kilometres depth to the surface. None of this requires destroying the sample, and none of it is visible in the hand specimen.

The reason is that most rock-forming minerals are **anisotropic**: their optical properties depend on direction. Light of a given colour travels through them at different speeds in different directions, and the microscope turns that difference into brightness, colour and position. Optical mineralogy is therefore applied crystal optics, and it is best learned by deriving the few relations that govern what you see and then looking at a great many thin sections.

## Light in a transparent solid

::: definition Refractive index and relief {#def-relief}
The **refractive index** $n$ of a mineral is the ratio of the speed of light in a vacuum to its speed in the mineral, $n = c/v$. When light crosses a boundary between two media it is refracted according to **Snell's law**, $n_1\sin\theta_1 = n_2\sin\theta_2$, and partly reflected; the reflected fraction rises steeply with the difference in $n$. **Relief** is the apparent height and sharpness of a grain's edge, and it increases with $|n_\text{mineral} - n_\text{medium}|$. In an ordinary thin section the mounting medium has $n \approx 1.54$, so a mineral with $n$ near 1.54 — quartz, most feldspars — looks almost invisible until you cross the polarisers, while rutile at $n = 2.6$–$2.9$ stands out in bold black outline.
:::

::: example Relief and the Becke line {#ex-relief}
Rank quartz ($n = 1.544$), plagioclase of composition An$_{20}$ ($n = 1.537$), olivine Fo$_{90}$ ($n = 1.66$), augite ($n = 1.70$) and titanite ($n = 1.90$) by relief in a standard section, and describe how to decide which of two grains has the higher index.
::: solution
The relief scales with $|n - 1.54|$: plagioclase $0.003$, quartz $0.004$, olivine $0.12$, augite $0.16$, titanite $0.36$. The first two are **very low relief** — barely visible edges, and best seen between crossed polarisers; olivine and augite are **moderate**; titanite is **high**, with thick black borders and a wide Becke band.

To decide between two grains, focus on the boundary, then raise the microscope tube (which lowers the objective towards the stage, so the focal plane moves *down* through the specimen). A bright line of light — the **Becke line** — appears and moves into the medium with the **higher** refractive index as you defocus in that direction. With a narrow aperture and subdued illumination the effect is unmistakable. For precise work, immerse the grains in a series of oils of known index and note which oil makes the relief vanish: at that point $n_\text{mineral} = n_\text{oil}$, and this is how refractive indices were tabulated for a century.
:::
:::

## Double refraction

In an isotropic material — a cubic mineral or a glass — the electric displacement $\mathbf{D}$ and the electric field $\mathbf{E}$ are parallel, and there is one refractive index. In anything of lower symmetry the polarisability is a tensor, $\mathbf{D} = \varepsilon_0\boldsymbol{\varepsilon}_r\mathbf{E}$, and $\mathbf{D}$ and $\mathbf{E}$ are no longer parallel. The consequence, discovered by Erasmus Bartholinus in calcite in 1669 and explained by Christiaan Huygens, is that a ray entering such a crystal splits into two plane-polarised rays travelling at different speeds with their vibration directions at right angles: **double refraction**, or birefringence.

::: definition The indicatrix, the optic axes and the optic sign {#def-indicatrix}
The **optic indicatrix** is the ellipsoid whose semi-axes are the three principal refractive indices $n_\alpha \le n_\beta \le n_\gamma$. A ray travelling in a given direction sees the ellipse in which a plane normal to that direction cuts the indicatrix, and splits into two rays polarised along its semi-axes.
- **Isotropic** (cubic, glass): the indicatrix is a sphere; one index, no birefringence, black between crossed polarisers at every orientation.
- **Uniaxial** (trigonal, tetragonal, hexagonal): the indicatrix is an ellipsoid of revolution with semi-axes $n_\omega, n_\omega, n_\varepsilon$. There is one **optic axis**, parallel to the unique axis. $\Delta n = |n_\varepsilon - n_\omega|$. The mineral is **uniaxial positive** if $n_\varepsilon > n_\omega$ (quartz, $\Delta n = 0.009$) and **negative** if $n_\varepsilon < n_\omega$ (calcite, $\Delta n = 0.172$).
- **Biaxial** (orthorhombic, monoclinic, triclinic): three unequal axes. There are two optic axes, and the angle between them, measured inside the crystal, is $2V$. The **optic plane** contains the two axes and the $X$ and $Z$ vibration directions; $Y$ is always the obtuse bisectrix. The mineral is **biaxial positive** if the *acute* bisectrix is $Z$ and **negative** if it is $X$.
:::

::: proposition Birefringence, thickness and the interference colour {#prop-retardation}
A grain of thickness $t$ cut at random orientation resolves the incident light into two rays with vibration directions corresponding to refractive indices $n_1'$ and $n_1''$. Between crossed polarisers the two recombine with a **retardation** (path difference)
$$
\delta = t\,\Delta n = t\,(n_1'' - n_1'),
$$
and the grain appears bright, with an interference colour determined by $\delta$ and by nothing else. Two grains of the same mineral and different thickness, or two different minerals with the same product $t\,\Delta n$, show the same colour.
:::

::: proof
The two components leave the lower surface with a phase difference $\phi = 2\pi\delta/\lambda$. The analyser projects both onto a common vibration direction, and the intensity of the recombined light is
$$
I = I_0\sin^2(2\phi_a)\sin^2\!\left(\frac{\pi\delta}{\lambda}\right),
$$
where $\phi_a$ is the angle between the first component and the polariser. The second factor is unity when $\delta = (m + \tfrac12)\lambda$ and zero when $\delta = m\lambda$, so for white light each wavelength is transmitted or extinguished according to its own condition and the grain takes on the colour of the wavelengths left uncancelled. Since $\delta$ depends on $t$ and $\Delta n$ only through their product, the colour fixes that product and not either factor alone — which is why a $30\ \mu\mathrm{m}$ section of quartz ($\delta = 270\ \mathrm{nm}$) looks the same pale grey as a $15\ \mu\mathrm{nm}$ section of a mineral with $\Delta n = 0.018$.
:::

::: definition Interference colours and the Michel–Lévy chart {#def-michel-levy}
The **Michel–Lévy chart** plots retardation $\delta$ against thickness for each colour. Reading it in the standard $30\ \mu\mathrm{m}$ section: first-order grey and white occupy $\delta \approx 100$–$350\ \mathrm{nm}$, first-order yellow $\sim 480\ \mathrm{nm}$, first-order red $\sim 560\ \mathrm{nm}$; second-order blue $\sim 680\ \mathrm{nm}$, second-order green $\sim 800\ \mathrm{nm}$, second-order red $\sim 1030\ \mathrm{nm}$; third-order colours run to about $1650\ \mathrm{nm}$ and fourth-order beyond. Because the orders repeat, a colour that looks like first-order red may be second- or third-order red, and the **quartz wedge** or a **gypsum plate** is used to decide which.
:::

::: example Retardation and interference colour in a 30 µm section {#ex-retardation}
Compute $\delta$ and name the interference colour of quartz ($\Delta n = 0.009$), plagioclase An$_{20}$ ($0.009$), augite ($0.026$), olivine Fo$_{90}$ ($0.036$), muscovite ($0.013$), hornblende ($0.020$), aragonite ($0.015$), calcite ($0.172$) and rutile ($0.106$) in a standard thin section.
::: solution
With $t = 30\ \mu\mathrm{m} = 3.0\times10^{4}\ \mathrm{nm}$, $\delta = 3\times10^{4}\Delta n$:

| mineral | $\Delta n$ | $\delta$ (nm) | colour |
|---|---|---|---|
| quartz | 0.009 | 270 | first-order grey to white |
| plagioclase | 0.009 | 270 | first-order grey, with polysynthetic twinning |
| muscovite | 0.013 | 390 | first-order white to pale yellow |
| aragonite | 0.015 | 450 | upper first order |
| hornblende | 0.020 | 600 | upper first to lower second order |
| augite | 0.026 | 780 | lower second order, often blue–green |
| olivine | 0.036 | 1080 | lower second order, bright |
| rutile | 0.106 | 3180 | fourth order and above, gaudy |
| calcite | 0.172 | 5160 | high order, pearl-grey to pale pink |

Two things to take from the table. First, the whole range of common rock-forming minerals occupies only the first two orders, which is why the standard section is $30\ \mu\mathrm{m}$: thicker sections would put everything into the confusing high orders, and thinner ones would make quartz and feldspar hard to see. Second, calcite and rutile are so birefringent that their colours are essentially uninformative — you identify them by relief, cleavage, twinning and habit, not by colour.
:::
:::

::: widget plot
f: 30000*d
x: 0, 0.06
y: 0, 2000
sliders: d=0.009:0:0.06:0.001
hlines: 270; 560; 1100; 1650
labels: \text{retardation}
caption: Retardation in a $30\ \mu\mathrm{m}$ section against birefringence, with the boundaries of the interference-colour orders marked: first-order grey (270 nm), first-order red (560 nm), the end of second order (1100 nm) and the end of third order (1650 nm). Drag the slider from quartz at $0.009$ through augite at $0.026$ to olivine at $0.036$ and watch the grain cross from grey through red into second-order colours. Note how compressed the scale is at the low end: the difference between quartz and plagioclase, the two most common minerals in many rocks, is invisible in colour and must be settled by twinning, relief and cleavage.
:::

## The microscope, and what each accessory buys you

A polarising microscope is a standard bright-field instrument with two polarisers, a rotating stage, and a slot for accessories. Each addition answers a different question.

**Lower polariser (plane-polarised light).** Colour, relief, cleavage, twinning, fracture, alteration, and pleochroism. Turn the stage: a pleochroic mineral changes colour as its absorption directions rotate into the polariser's vibration direction. Biotite is the classic — straw, olive-brown and deep reddish-brown in three directions — and tourmaline, staurolite, chloritoid, hornblende and vanadium muscovite follow.

**Upper polariser (crossed polars).** Everything about symmetry and orientation. An isotropic grain is black in all orientations. An anisotropic grain goes bright and dark four times per revolution, the **extinction positions** occurring when the vibration directions lie parallel to the polarisers. Between extinction positions the grain is bright, brightest at $45^\circ$.

**Extinction angle.** If extinction is parallel to a crystal edge or cleavage the mineral is optic-parallel; if it is inclined, measure the angle. In monoclinic minerals the extinction angle $Z \wedge c$ is diagnostic and varies systematically with composition — it is a classical way of estimating the anorthite content of plagioclase and the jadeite content of clinopyroxene, and it is the reason a mode can be more than a list.

**Gypsum and quartz wedges.** A first-order red gypsum plate ($\delta = 550\ \mathrm{nm}$) inserted into the slot adds or subtracts its retardation from the grain's, depending on whether the two fast directions are parallel or perpendicular. The grain gets brighter (**addition**) or darker (**subtraction**), and from that you know the relative orientation of the indicatrix axes — hence the optic sign, and hence, in many groups, the composition.

**Conoscope (Bertrand lens).** Focus into the back focal plane of the objective and you see the **interference figure**: for a uniaxial mineral a black cross centred on the melatope, for a biaxial mineral two curved isogyres that separate into two brushes as the stage rotates. The spacing of the brushes gives $2V$; the curvature and the response to the gypsum plate give the sign. This is the only routine way to distinguish quartz from chalcedony, or to separate the polymorphs of $\mathrm{Al_2SiO_5}$.

::: example Optic sign from an interference figure {#ex-sign}
A grain gives a uniaxial interference figure: a black cross centred on the field. A first-order red gypsum plate is then inserted, and the two quadrants lying along the plate's slow direction change from grey to blue while the other two change to yellow. Explain how this gives the optic sign, and state what you would conclude if the blue quadrants were the ones along the plate's *fast* direction.
::: solution
The plate is a known retarder with a known slow direction. In a quadrant where the mineral's own slow vibration direction is **parallel** to the plate's, the two retardations add and the colour moves up the Michel–Lévy chart, from first-order red to second-order blue; where the two are perpendicular, the retardations subtract and the colour moves down, towards yellow and grey. So the blue quadrants tell you where the mineral's slow direction lies.

In a uniaxial interference figure the two rays are polarised **radially** (the extraordinary ray, index $n_\varepsilon$) and **tangentially** (the ordinary ray, index $n_\omega$). The quadrants in which the radial direction is parallel to the plate's slow direction are therefore the ones that go blue if $n_\varepsilon$ is the slow index. In the observation above they do, so $n_\varepsilon > n_\omega$ and the mineral is **uniaxial positive** — quartz, or one of the positive trigonal and tetragonal minerals.

Had the blue quadrants been those crossed by the plate's *fast* direction, the radial ray would have been the fast one, $n_\varepsilon < n_\omega$, and the mineral would be **uniaxial negative** — calcite, apatite, tourmaline, corundum.

The same operation on a biaxial figure uses the two curved isogyres instead of the cross: with the plate inserted, the isogyres blacken and merge into a single hyperbola in the north-east and south-west quadrants for a **positive** mineral and in the north-west and south-east for a **negative** one, and the separation of the brushes in the same figure gives $2V$ against a calibrated eyepiece graticule.
:::
:::

::: quiz
A colourless mineral in a $30\ \mu\mathrm{m}$ section shows bright second-order blue interference colours and moderate relief, and it has no cleavage but a conchoidal fracture. The most likely identification is
- [ ] quartz
- [ ] muscovite
- [x] olivine
- [ ] calcite
::: solution
Second-order colours at $30\ \mu\mathrm{m}$ mean $\Delta n \approx 0.03$, far above quartz ($0.009$) and muscovite ($0.013$), and the moderate relief fits olivine at $n \approx 1.66$. Calcite is ruled out by its much higher relief, its rhombohedral cleavage and its pearl-grey high-order colours; olivine's combination of high birefringence, no cleavage, conchoidal fracture and irregular grain shapes is unmistakable.
:::
:::

::: warning Interference colour is not the same as pleochroism, and neither is the same as relief
Three things get confused constantly, and they answer three different questions. **Relief** is a boundary effect controlled by the *difference* between the mineral's and the medium's refractive indices, and it is seen in plane-polarised light. **Pleochroism** is *selective absorption*: the mineral itself changes colour between crossed or uncrossed polars as it rotates, because it absorbs light of different colours differently along different vibration directions; it occurs only in absorbing (usually coloured) minerals. **Interference colour** appears only between crossed polars, is produced by retardation rather than absorption, is never black, and follows the Michel–Lévy chart in a fixed sequence. A brown biotite that darkens to near-black as it rotates is pleochroic; the same grain between crossed polars shows first- to second-order colours with an anomalous brown tinge, and that tinge is the pleochroism showing through.
:::

## Biaxial optics, quantitatively

For a biaxial mineral the indicatrix has three unequal semi-axes and the two optic axes lie in the $X$–$Z$ plane (the **optic plane**), symmetrically about $Z$. Their half-angles follow from the condition that the central section normal to an optic axis be a circle of radius $n_eta$; the result is

$$
\tan^2 V_z = \frac{n_\alpha^{2}\left(n_\gamma^{2} - n_\beta^{2}\right)}{n_\gamma^{2}\left(n_\beta^{2} - n_\alpha^{2}\right)},
\qquad 2V_x + 2V_z \approx 180^\circ .
$$

Because $n_\alpha/n_\gamma$ differs from unity by less than two per cent for every common mineral, the sign of the mineral is decided almost entirely by whether $n_\gamma - n_\beta$ is smaller or larger than $n_\beta - n_\alpha$: if the intermediate index sits *closer to* $n_\gamma$ then $V_z < 45^\circ$, the acute bisectrix is $Z$, and the mineral is **positive**.

The measured $2V$ is a strong function of composition in several important groups: in the micas it separates muscovite ($2V \approx 35$–$45^\circ$, negative) from paragonite ($2V \approx 8$–$10^\circ$, negative); in the amphiboles it separates tremolite ($2V_z \approx 9^\circ$, positive) from anthophyllite ($2V \approx 124^\circ$, negative); in the pyroxenes it separates clinoenstatite from augite; and in the feldspars it separates sanidine ($2V_z \approx 18^\circ$, negative) from anorthite ($2V_z \approx 78^\circ$, positive) — which is how the structural state of a potassium feldspar, and hence the temperature at which it last equilibrated, is measured optically.

::: example Optic axial angle from the principal indices {#ex-2v}
Anorthite has $n_\alpha = 1.580$, $n_\beta = 1.588$, $n_\gamma = 1.593$. Compute $2V_z$ and state the optic sign.
::: solution
$$
n_\alpha^2 = 2.4964,\qquad n_\beta^2 = 2.5217,\qquad n_\gamma^2 = 2.5377,
$$
so $n_\gamma^2 - n_\beta^2 = 0.0160$ and $n_\beta^2 - n_\alpha^2 = 0.0253$. Then
$$
\tan^2 V_z = \frac{2.4964\times0.0160}{2.5377\times0.0253} = \frac{0.03994}{0.06420} = 0.622,
\qquad \tan V_z = 0.789,
$$
whence $V_z = 38.3^\circ$ and $2V_z \approx 77^\circ$, in good agreement with the tabulated $78^\circ$ for pure anorthite. Since $2V_z < 90^\circ$ the acute bisectrix is $Z$ and the mineral is **biaxial positive**.

Now perturb it: if $n_\beta$ were $1.585$ instead of $1.588$ — a difference smaller than the reproducibility of most measurements — the two differences become $0.008$ and $0.005$, $\tan^2 V_z$ becomes $1.60$, $V_z$ becomes $51^\circ$ and the mineral flips to **biaxial negative**. That sensitivity is the reason $2V$ is an excellent qualitative discriminator between minerals and a poor quantitative one, and why optic-angle data must always be quoted with the method used to obtain the indices.
:::
:::

::: widget plot
f: (1.580/1.593)*sqrt((1.593-b)/(b-1.580))
x: 1.5815, 1.5925
y: 0, 3
sliders: b=1.588:1.5815:1.5925:0.0005
hlines: 1
labels: \text{tan V_z}
caption: How $\tan V_z$ responds to the intermediate index $n_\beta$, with $n_\alpha$ and $n_\gamma$ held at the anorthite values. The vertical line at $\tan V_z = 1$ is the boundary between positive ($<1$) and negative ($>1$) minerals. Drag the slider by $0.005$ — less than most measurements can resolve — and the mineral changes sign. This is why optic-angle data must be quoted with the method used to obtain the indices, and why the immersion method, which reaches $\pm 0.001$, was worth a century of labour.
:::

## What the textures mean

Optical mineralogy is not a naming exercise. The point of identifying the assemblage is to read the **texture**, and the texture is the record:

- **Poikiloblastic** grains with inclusions grew by replacement across a pre-existing assemblage; the inclusions tell you what was replaced.
- **Myrmekite** — quartz worm-growths in plagioclase against a K-feldspar grain — records fluid-present reaction and is a strain marker.
- **Perthite** lamellae, and their width, record the cooling rate through the alkali-feldspar solvus.
- **Mica fish**, **sigma porphyroclasts** and **booked micas** in a mylonite give the sense of shear directly.
- **Pressure shadows** and **symplectites** give the reaction path and therefore the direction of the pressure–temperature path.
- **Twinning** — polysynthetic in plagioclase, twin lamellae in orthopyroxene, Dauphiné in quartz — records growth, deformation or a phase transition, and the last of these can be a paleothermometer.

Reading them requires nothing more than the microscope, and it is why, in an age of electron probes, petrologists still look at thin sections first.

::: example A grain, identified {#ex-identify}
A colourless grain in a $30\ \mu\mathrm{m}$ section has very low relief, first-order grey interference colours, perfect cleavage in one direction only, polysynthetic twinning that is symmetric about the trace of the cleavage, and an extinction angle of $6^\circ$ to the cleavage. What is it, and what is the next measurement?
::: solution
Very low relief and first-order grey put it in the quartz–feldspar range. Polysynthetic twinning rules out quartz (which is untwinned in most rocks and has no cleavage) and rules in **plagioclase**. Symmetric extinction with a small angle to the cleavage, in a grain with two cleavages at about $90^\circ$ (check the second, imperfect one), indicates a **calcic** composition: albite has extinction angles up to about $25^\circ$ on $\{010\}$, while bytownite and anorthite give $5^\circ$–$10^\circ$.

The next measurement is the extinction angle in the standard orientation, on a grain sectioned perpendicular to $(001)$, which places the composition on the standard curves and gives a rough An content — here perhaps An$_{75\pm10}$. Confirm it, if precision matters, by the U-stage or by an electron probe; and note that the optical estimate is a *compositional* estimate only if the plagioclase is unzoned, which a careful look at the core-to-rim variation in a single grain will usually show you is not the case.
:::
:::

::: history
Erasmus Bartholinus (Bartholinus) described the doubling of images through calcite in 1669. Christiaan Huygens (Huygens) explained it in his *Traité de la lumière* of 1690 with a wave front that is a sphere in one direction and a spheroid in the other — the indicatrix in all but name — and coined the terms ordinary and extraordinary ray. Étienne-Louis Malus (Malus) discovered polarisation by reflection in 1808, and François Arago, Jean-Baptiste Biot and Augustin-Jean Fresnel built the wave theory of birefringence between 1811 and 1822, with Fresnel's 1821 prediction that light is a transverse wave finally explaining why two rays and not three. Henry Clifton Sorby (Sorby) invented the petrographic microscope in the sense used here: in a series of papers beginning in 1858 he ground sections of rocks, put them under the microscope, and read the sequence of crystallisation, the replacement textures and the bubbles and fluids inside minerals, founding both chemical petrology and fluid-inclusion microthermometry. Harry Rosenbusch (Rosenbusch) systematisised the descriptive petrography of thousands of rocks in the 1870s and 1880s. The optical constants of the mineral kingdom were then measured, largely by the immersion method, in the compilations of Frederick Lewis, Ford and Sherman and in the tables of Friedrich Rinne; the standard English references for two generations were Winchell and Winchell's *Elements of Optical Mineralogy* of 1927–1931 and, later, the *An Introduction to the Rock-Forming Minerals* of William Deer, Robert Howie and Joseph Zussman. The optical methods themselves were completed by the universal stage of Friedrich Johann Karl Emil Kirschstein and the five-axis tables of Michel Moreau, which made the measurement of crystal orientation in deformed rocks routine.
:::

## Where this leads

Optical mineralogy is the entry method for everything that follows. The extinction and twinning of quartz are the strain markers of [[structural-geology/shear-zones]]; the optical properties of the micas and amphiboles are how index minerals and isograds are mapped in [[mineralogy-petrology/metamorphic-reactions]]; the crystallographic-preferred-orientation functions measured by the universal stage, and now by neutron and X-ray texture goniometry, are the input to the seismic anisotropy of [[geophysics/seismic-structure]]; and the fluid inclusions Sorby first saw in a thin section are the basis of the thermometry in [[mineralogy-petrology/pt-paths]] and of the palaeofluid chemistry in [[geochemistry/aqueous-geochemistry]].

::: summary
- Relief is a boundary effect set by $|n_\text{mineral} - n_\text{medium}|$; the Becke line moves into the higher-index medium on defocusing.
- Anisotropic minerals split light into two rays polarised at right angles; the indicatrix, with semi-axes $n_\alpha \le n_\beta \le n_\gamma$, tells you what a ray in any direction will see.
- Between crossed polars a grain's brightness and colour depend only on the product $\delta = t\,\Delta n$, read on the Michel–Lévy chart; the standard $30\ \mu\mathrm{m}$ thickness puts most rock-forming minerals in the first two orders.
- Extinction behaviour gives orientation: parallel, inclined or symmetrical extinction, and extinction angles that vary systematically with composition.
- Optic sign comes from the response to an accessory plate or from an interference figure; $2V$ is a sensitive function of the intermediate index and therefore of composition.
- Pleochroism is selective absorption, interference colour is retardation, and relief is refraction — three different phenomena answering three different questions.
- The point of the method is texture: what grew on what, what replaced what, and which way the rock sheared.
:::

## Exercises

::: exercise Retardation of olivine {level=1 check="1080"}
Olivine Fo$_{90}$ has $\Delta n = 0.036$. What is its retardation in a $30\ \mu\mathrm{m}$ section, in nanometres?
::: solution
$\delta = t\,\Delta n = 3.0\times10^{4}\times0.036 = 1080\ \mathrm{nm}$, which is lower second-order colours — bright, and the reason olivine is easy to pick out in a peridotite.
:::
:::

::: exercise Thickness of a section {level=1 check="76"}
A quartz grain ($\Delta n = 0.009$) shows second-order blue ($\delta \approx 680\ \mathrm{nm}$) instead of first-order grey. How thick is the section, in micrometres?
::: solution
$t = \delta/\Delta n = 680/0.009 = 75\,600\ \mathrm{nm} \approx 76\ \mu\mathrm{m}$. A section this thick is unusable for feldspars, which all go to high orders; the standard is $30\ \mu\mathrm{m}$, and the way to check is to look for the interference colours of quartz, which should be first-order grey. (Enter the thickness in micrometres, to the nearest micrometre.)
:::
:::

::: exercise Optic sign of calcite {level=1 check="negative"}
Calcite has $n_\omega = 1.658$ and $n_\varepsilon = 1.486$. What is its optic sign and birefringence?
::: solution
$n_\varepsilon < n_\omega$, so calcite is **uniaxial negative**, and $\Delta n = 1.658 - 1.486 = 0.172$, the largest of any common rock-forming mineral.
:::
:::

::: exercise Isotropic or just thin? {level=2}
A grain is extinct in every orientation between crossed polars. List the possibilities and say how to settle it.
::: solution
Four possibilities: (i) a cubic mineral or a glass — garnet, leucite, sodalite, obsidian; (ii) a cut perpendicular to an optic axis in a uniaxial mineral, which is also extinct but only in that one orientation; (iii) an opaque mineral, which is black in plane-polarised light too; (iv) an unusually thin grain of an isotropic-looking low-birefringence mineral. Settle it by (a) looking in plane-polarised light — opaques stay black, transparent minerals show relief; (b) rotating the stage after moving to a neighbouring part of the same grain — a true isotropic mineral stays black, an axial cut goes bright; (c) the conoscope, where an isotropic mineral gives a dark field with a centred uniaxial-looking figure only if it is strained.
:::
:::

::: exercise Birefringence from a colour {level=2 check="0.018"}
A $30\ \mu\mathrm{m}$ grain shows first-order red, taken as $\delta = 550\ \mathrm{nm}$. What is its birefringence?
::: solution
$\Delta n = \delta/t = 550/3\times10^{4} = 0.018$. Beware the ambiguity: first-order red, second-order red and third-order red all look similar, and the true birefringence could equally be $0.018 + 0.037 = 0.055$ (second order) or higher. The quartz wedge resolves it — the colour sequence as the wedge is run tells you the order.
:::
:::

::: exercise Distinguishing quartz from calcite {level=2}
Both are colourless, both can be twinned, and both occur in the same marble. Give three optical tests that separate them, and one chemical test.
::: solution
(1) **Relief**: calcite $n_\omega = 1.658$ gives moderate relief against the $1.54$ medium; quartz at $1.544$ is nearly invisible. (2) **Birefringence**: calcite shows high-order pearl-grey and pink, quartz first-order grey. (3) **Cleavage**: calcite has the perfect rhombohedral cleavage in three directions, visible as a rhombic trace pattern; quartz has no cleavage and shows conchoidal fracture. (4) **Chemical**: cold dilute hydrochloric acid effervesces vigorously with calcite and not at all with quartz — the test to do on a crushed sample or a chip, never on the section, since the acid destroys the mount.
:::
:::

::: exercise Extinction angle and composition {level=2}
Why is the extinction angle of plagioclase useful, and what must be true of the grain before the measurement means anything?
::: solution
The angle between the trace of a given crystallographic direction and the extinction position varies systematically with the anorthite content, because the indicatrix orientation rotates relative to the crystal axes as the Ca–Na ratio changes. It is therefore a quick optical estimate of composition across a zoned crystal. Three conditions: the grain must be sectioned in the orientation the calibration curves assume (perpendicular to $\{010\}$ or $\{001\}$, as appropriate); it must be chemically homogeneous over the area measured, which a zoned crystal is not; and it must be strain-free, since lattice bending smears the extinction position. In practice the method gives $\pm$An$_{10}$ at best, and is used to see trends rather than to publish compositions.
:::
:::

::: exercise Biaxial sign {level=2 check="positive"}
A mineral has $n_\alpha = 1.544$, $n_\beta = 1.550$, $n_\gamma = 1.553$ and $2V_z = 50^\circ$. What is its optic sign?
::: solution
**Positive.** The acute bisectrix is $Z$ whenever $2V_z < 90^\circ$, and here $2V_z = 50^\circ$. Equivalently, $n_\beta$ is much closer to $n_\alpha$ than to $n_\gamma$ ($0.006$ against $0.003$), which puts the acute bisectrix near $Z$. Had $2V_z$ been greater than $90^\circ$ the acute bisectrix would be $X$ and the mineral negative.
:::
:::

::: exercise A thinner section {level=3 check="125"}
A mineral shows first-order grey ($\delta = 250\ \mathrm{nm}$) in the standard $30\ \mu\mathrm{m}$ section. A second section of the same rock is accidentally ground down to $15\ \mu\mathrm{m}$. What is the retardation of the same grain orientation now, in nanometres, and what happens to the appearance of quartz and of the feldspars? (Enter $\delta$ in nm.)
::: solution
Retardation is proportional to thickness, so $\delta = 250\times15/30 = 125\ \mathrm{nm}$: first-order pale grey, close to the black end of the chart. Everything dims. Quartz and the feldspars, already at $\delta \approx 270\ \mathrm{nm}$ in a normal section, fall to $135\ \mathrm{nm}$ and become hard to see against the grey background, twinning excepted; the high-birefringence minerals — olivine, calcite, rutile — remain bright, because even halved they are still several hundred nanometres up the chart. This is why sections are made as close to $30\ \mu\mathrm{m}$ as the grinding allows, and why a section that has been over-polished is judged by the quartz, which should be a clear first-order grey and not a dirty white.
:::
:::

::: exercise Counting orders with a wedge {level=3}
A grain shows a colour that could be first-, second- or third-order red. Describe how a quartz wedge settles it, and what you would see in each case.
::: solution
Insert the wedge with its slow direction parallel to one of the grain's vibration directions and drive it in. If the grain's retardation and the wedge's **add**, the colour runs *up* the chart: first-order red becomes second-order blue, then green, then second-order red, and the grain brightens and darkens repeatedly. If they **subtract**, the colour runs *down*: first-order red passes through yellow, grey and into extinction before brightening again in the complementary sequence. The decisive observation is whether the grain first goes **dark** (subtraction, so the grain's retardation is small — first order) or first goes **bright and then through higher colours** (addition). A first-order-red grain under subtraction extinguishes almost immediately, because $\delta = 550\ \mathrm{nm}$ is only $550\ \mathrm{nm}$ from zero; a third-order-red grain at $\delta \approx 1650\ \mathrm{nm}$ must take up $1650\ \mathrm{nm}$ of wedge before it extinguishes, and you will see a dozen colour changes on the way.
:::
:::
