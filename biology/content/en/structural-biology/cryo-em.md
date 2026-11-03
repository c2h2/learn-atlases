For most of the history of structural biology, the electron microscope was the instrument that showed shapes but not atoms. Electron micrographs of viruses, ribosomes and muscle filaments in the 1960s–2000s were invaluable, but at resolutions of 10–30 Å, where α-helices are cylinders and β-sheets are slabs. Then, between about 2012 and 2015, a combination of new detectors and new software turned single-particle cryo-electron microscopy (cryo-EM) into a method that routinely gives atomic structures — without crystals, from a fraction of a milligram of protein, and for complexes too large, too flexible or too heterogeneous for crystallography. The change was so abrupt that it was called the **resolution revolution** (W. Kühlbrandt, 2014), and by the mid-2020s cryo-EM had become the main method for determining structures of large complexes and membrane proteins.

This chapter explains how a cryo-EM structure is made, from the frozen specimen to the three-dimensional map, and how to judge one. It builds on the Fourier ideas of [[structural-biology/x-ray-crystallography]]: a micrograph is not a diffraction pattern but a real image, yet the analysis of its information, its resolution and its noise is done in Fourier space. The physics of electron optics and wave–particle duality are in the Physics Atlas ([Diffraction](/learn/physics/lesson.php?c=optics&l=diffraction)).

## Electrons as a probe

Electrons accelerated through a potential difference $V$ have a de Broglie wavelength $\lambda = h/p$, which at the voltages of electron microscopes must be calculated relativistically:

$$
\lambda = \frac{h}{\sqrt{2m_0eV\left(1 + \dfrac{eV}{2m_0c^2}\right)}},
$$ {#eq-electron-wavelength}

where $m_0$ is the rest mass of the electron, $e$ its charge and $c$ the speed of light.

::: example The wavelength of a 300 keV electron {#ex-wavelength}
Calculate the wavelength of electrons accelerated through 300 kV, the voltage of most high-resolution cryo-microscopes.
::: solution
$eV = 1.602\times10^{-19}\times3.00\times10^5 = 4.807\times10^{-14}$ J, and $m_0c^2 = 8.187\times10^{-14}$ J, so the relativistic factor is $1 + 4.807/(2\times8.187) = 1.294$. Then $2m_0eV\times1.294 = 2\times9.109\times10^{-31}\times4.807\times10^{-14}\times1.294 = 1.133\times10^{-43}$ kg² m² s⁻², whose square root is $3.366\times10^{-22}$ kg m s⁻¹. So $\lambda = 6.626\times10^{-34}/3.366\times10^{-22} = 1.97\times10^{-12}$ m $= 1.97$ pm, or 0.0197 Å — about fifty times smaller than the X-ray wavelengths of crystallography. The wavelength is not what limits resolution in electron microscopy; lens aberrations, specimen motion, radiation damage and noise are.
:::
:::

Electrons interact with matter far more strongly than X-rays, because they are charged and are scattered by the electrostatic potential of atoms (nuclei and electrons together). This is both the opportunity and the problem. A single molecule a few tens of ångströms across scatters enough electrons to be seen, so no crystal is needed; but the specimen must be thin (ideally less than about 50–100 nm), must be in a vacuum, and is rapidly destroyed. Electrons also have one decisive advantage: per useful elastic scattering event, they deposit much less energy in the specimen than X-rays do (R. Henderson, 1995), which is why imaging single molecules is possible at all.

### Vitrification

Biological specimens are mostly water, which evaporates in a vacuum and, if frozen slowly, forms ice crystals that disrupt the specimen and diffract strongly. The solution, developed by Jacques Dubochet and colleagues at the European Molecular Biology Laboratory in the early 1980s (M. Adrian, J. Dubochet, J. Lepault and A. W. McDowall, 1984), is **vitrification**: a thin film of solution on a grid is plunged into liquid ethane cooled by liquid nitrogen, freezing it so fast (about $10^5$–$10^6$ K s⁻¹) that the water solidifies as an amorphous glass. The molecules are trapped in their native, hydrated state, in random orientations, and stay there while the grid is kept below about −170 °C in the microscope.

::: warning A cryo-EM specimen is not a free solution
Vitrification is meant to capture molecules as they were in solution, but the thin film has two air–water interfaces only 20–100 nm apart, and many proteins diffuse to them within milliseconds before freezing. Molecules adsorbed at an interface may partly unfold, dissociate, or adopt a few **preferred orientations**, which leave views missing from the data. Detergents, support films of graphene or graphene oxide, faster plunging and tilting the specimen in the microscope are used to reduce these artefacts; their effects should be considered when interpreting a structure.
:::

## Forming an image

Biological molecules in ice are almost transparent to electrons: they change the *phase* of the electron wave slightly but absorb or deflect very few electrons out of the beam. Such **weak-phase objects** give almost no contrast in a perfectly focused image. Contrast is created by imaging slightly out of focus, so that the phase shifts are converted into intensity variations by interference — exactly as in phase-contrast light microscopy, but with the lens's defocus and spherical aberration playing the part of the phase plate.

::: definition The contrast transfer function {#def-ctf}
The **contrast transfer function** (CTF) describes how strongly a micrograph records each spatial frequency $k$ (in Å⁻¹, the reciprocal of a spacing) of the specimen. For a weak-phase object, ignoring the small amplitude-contrast term,

$$
\mathrm{CTF}(k) = -\sin\chi(k), \qquad \chi(k) = \pi\lambda\,\Delta f\,k^2 - \frac{\pi}{2}C_\mathrm s\lambda^3k^4 ,
$$ {#eq-ctf}

where $\Delta f$ is the defocus (positive for underfocus in this convention) and $C_\mathrm s$ the spherical-aberration coefficient of the objective lens (typically 2.7 mm). The CTF oscillates between positive and negative values; at its zeros, information at that spatial frequency is lost, and between successive zeros contrast is reversed. The oscillations are damped at high frequency by **envelope functions** arising from beam incoherence, specimen motion and radiation damage.
:::

The CTF is visible directly: the Fourier transform (power spectrum) of a micrograph of thin ice shows concentric rings, **Thon rings**, whose spacing gives the defocus. Every image is recorded at a different defocus, typically 0.5–2.5 μm, so that the zeros fall in different places, and software measures the CTF of each image and corrects for it, flipping the sign of reversed bands and weighting each frequency by how well it was recorded.

::: example Where is the first zero? {#ex-ctf-zero}
For 300 kV electrons ($\lambda = 0.0197$ Å), $C_\mathrm s = 2.7$ mm and an underfocus of 1.5 μm, find the spatial frequency and spacing of the first zero of the CTF.
::: solution
With lengths in Å, $\pi\lambda\Delta f = \pi\times0.0197\times1.5\times10^4 = 927.7$ Å and $\tfrac{\pi}{2}C_\mathrm s\lambda^3 = \tfrac{\pi}{2}\times2.7\times10^7\times(0.0197)^3 = 323.6$ Å³. The first zero after the origin is where $\chi = \pi$. At low frequency the $k^4$ term is small, so approximately $927.7k^2 = \pi$, $k = 0.0582$ Å⁻¹; including the $k^4$ term changes $k$ only in the fourth decimal place. The first zero is at a spacing of $1/k = 17.2$ Å. Information near 17 Å is missing from this image and must come from images at other defoci. At higher defocus the first zero moves to lower frequency and the rings crowd together, while low-resolution contrast — which helps in finding particles — increases.
:::
:::

::: widget plot
f: -sin(618.5*D*x^2 - 323.6*x^4)*exp(-B*x^2/4)
x: 0, 0.4
y: -1, 1
sliders: D=1.5:0.3:4:0.1; B=50:0:300:10
labels: \mathrm{CTF}(k)
hlines: 0
caption: The contrast transfer function [[#eq-ctf]] for 300 kV electrons and $C_\mathrm s = 2.7$ mm, against spatial frequency $k$ (Å⁻¹; a frequency of 0.25 Å⁻¹ corresponds to 4 Å detail), with defocus $D$ (μm) and an envelope $\exp(-Bk^2/4)$ with B-factor $B$ (Å²). At the default 1.5 μm the first zero is at 0.058 Å⁻¹ (17 Å), as in [[#ex-ctf-zero]]. Increase $D$ and watch the oscillations crowd towards low frequency; increase $B$ and see the high-frequency information fade, which is what motion and damage do to an image.
:::

### Dose, noise and the detector

Radiation damage limits the electron dose a specimen can receive to roughly 20–60 electrons per Å² in total. At such doses, an image is dominated by **shot noise**: a pixel of 0.83 × 0.83 Å receives on average only about 28 electrons from a 40 e⁻ Å⁻² exposure, with a Poisson standard deviation of $\sqrt{28} \approx 5.3$, while the contrast of a protein in ice is a few per cent of the background. The signal-to-noise ratio of a single-particle image at high resolution is far below 1: individual molecules are barely visible, and their atomic details are buried in noise. The structure emerges only by averaging tens of thousands to millions of images.

Until about 2012 images were recorded on photographic film or on scintillator-coupled CCD cameras, which blurred and added noise. **Direct electron detectors**, CMOS sensors that register each electron directly and can count individual electrons at hundreds or thousands of frames per second, transformed the signal-to-noise ratio. Just as important, they record each exposure as a movie of many frames. The beam itself makes the ice and specimen move by several ångströms during exposure; aligning the frames and summing them (**motion correction**; A. F. Brilot, N. Grigorieff and colleagues, 2012; X. Li, Y. Cheng and colleagues, 2013) removes most of the blurring, and the earliest frames, least damaged, can be weighted more heavily for high-resolution information.

## Single-particle analysis

::: algorithm Single-particle reconstruction {#alg-spa}
1. **Collect** thousands of movies, each containing tens to hundreds of particles in random orientations; correct beam-induced motion and estimate the CTF of each.
2. **Pick** particles — by template matching, by difference-of-Gaussian detection or by neural networks — and extract each in a small box.
3. **Classify in 2D**: align and average similar particle images into class averages, which reveal the views present and allow junk (ice contamination, aggregates, broken particles) to be discarded.
4. **Build an initial 3D model** from the class averages or *ab initio* from the particles.
5. **Classify in 3D** to separate particles in different conformations or compositions, and **refine**: determine the orientation (three angles) and position (two shifts) of every particle relative to the current map, reconstruct the map from all particles with their CTF corrections, and repeat until convergence.
6. **Validate and interpret**: estimate resolution by the Fourier shell correlation, sharpen the map, build and refine an atomic model.
:::

The mathematical basis is the **projection–slice theorem**: the two-dimensional Fourier transform of a projection of an object is a central slice through the object's three-dimensional Fourier transform, perpendicular to the viewing direction. Images of many particles, each a projection from a different direction, fill Fourier space with slices; once their orientations are known, the slices can be interpolated into a three-dimensional transform and transformed back into a map. D. J. DeRosier and A. Klug used this principle for the first three-dimensional reconstruction from electron micrographs, of the helical tail of bacteriophage T4, in 1968.

The orientations are unknown and must be found from noisy images, which is a hard statistical problem. Modern programs treat it in a Bayesian framework: rather than assigning each particle one "best" orientation, they compute the probability of every orientation given the current model and weight each particle's contribution accordingly, with a prior that favours smooth maps (S. H. W. Scheres, RELION, 2012). Fast stochastic and GPU-based algorithms (A. Punjani, J. L. Rubinstein, D. J. Fleet and M. A. Brubaker, cryoSPARC, 2017) cut processing times from weeks to hours.

::: intuition Averaging away the noise
Imagine a thousand photographs of the same face taken in near darkness, each at a random angle. Any one of them shows almost nothing. If you could rotate each to the same orientation and add them, the noise — random from photograph to photograph — would average towards zero while the face, the same in all of them, would add up: the signal-to-noise ratio grows as the square root of the number of images. Single-particle cryo-EM does exactly this, with the extra difficulty that the orientations must be found from the noisy images themselves, by comparing each with a gradually improving model.
:::

### Heterogeneity as information

A crystal selects one conformation, or averages several. A cryo-EM data set contains every particle that was on the grid, and 3D classification can sort them into several discrete structures — different conformations of a machine, complexes with and without a ligand, assembly intermediates. Continuous motions can be described by principal components of variability or by neural-network methods that learn a continuous space of structures from the particles (E. D. Zhong, T. Bepler, B. Berger and J. H. Davis, cryoDRGN, 2021). Structures of the ribosome in successive states of translation, of the spliceosome through its catalytic cycle and of transporters in alternating states ([[structural-biology/molecular-machines]]) have been obtained in this way, sometimes from a single data set.

### Resolution

::: definition Fourier shell correlation {#def-fsc}
The particles are split into two halves, and two maps are reconstructed independently. The **Fourier shell correlation** at spatial frequency $k$ is the correlation coefficient between the Fourier coefficients $F_1$ and $F_2$ of the two half-maps over a thin shell of radius $k$:

$$
\mathrm{FSC}(k) = \frac{\sum_{\text{shell}} F_1 F_2^*}{\sqrt{\sum_{\text{shell}}\lvert F_1\rvert^2\,\sum_{\text{shell}}\lvert F_2\rvert^2}} .
$$ {#eq-fsc}

The FSC falls from 1 at low frequency towards 0 where the half-maps contain only independent noise. The resolution is conventionally quoted as the spacing at which the FSC between independent half-maps falls to **0.143**, a threshold derived by P. B. Rosenthal and R. Henderson (2003) to correspond to the criterion used in crystallography for the full map.
:::

A single number hides much: the resolution of a map usually varies from its rigid core (best) to flexible peripheral parts (worse), and **local-resolution** maps show this. Maps are also routinely **sharpened** by multiplying the Fourier coefficients by $\exp(+B k^2/4)$ to compensate for the envelope fall-off, which brings out high-resolution features but amplifies noise if overdone.

::: proposition How many particles? (empirical) {#prop-rosenthal-henderson}
If the signal of each particle image is attenuated by an overall B-factor $B$ (from motion, damage, imperfect alignment and the detector), the number of particles $N$ needed to reach resolution $d$ satisfies approximately

$$
\ln N \approx \frac{B}{2d^2} + \text{constant},
$$ {#eq-particles}

so that a plot of $\ln N$ against $1/d^2$ — the **Rosenthal–Henderson plot** — is a straight line of slope $B/2$ (P. B. Rosenthal and R. Henderson, 2003). The relation is an empirical description valid over a limited range; it captures why each improvement in resolution is far more expensive than the last.
:::

::: example The cost of the last ångström {#ex-particles}
A data set with an overall B-factor of 100 Å² gives a 4.0 Å map from 50,000 particles. Roughly how many particles would be needed for 3.0 Å? What if better grids and detectors lowered the B-factor to 50 Å²?
::: solution
From [[#eq-particles]], $N_2/N_1 = \exp\bigl[\tfrac{B}{2}\bigl(1/d_2^2 - 1/d_1^2\bigr)\bigr] = \exp[50\times(1/9 - 1/16)] = \exp(50\times0.0486) = e^{2.43} = 11.4$. So about 570,000 particles. With $B = 50$ Å², the factor is $e^{1.215} = 3.4$, about 170,000 particles. Halving the B-factor helps more than collecting several times more data, which is why so much effort goes into sample preparation, stage stability and detector quality.
:::
:::

::: widget plot
f: B/2*(1/x^2 - 1/16)/ln(10) + ln(50000)/ln(10)
x: 2, 6
y: 3, 8
sliders: B=100:30:200:5
labels: \log_{10}N
vlines: 3; 4
caption: The number of particles $N$ (plotted as $\log_{10}N$) needed to reach resolution $d$ (Å, horizontal axis) from [[#eq-particles]], scaled so that 50,000 particles give 4 Å, for overall B-factor $B$ (Å²). At the default 100 Å² the step from 4 Å to 3 Å costs about one order of magnitude, as in [[#ex-particles]]. Lower $B$ and the curve flattens: better samples, not just more data, are the route to high resolution. (Illustrative; real data sets also depend on particle size and symmetry.)
:::

### Size, records and limits

Large, rigid, symmetric particles are the easiest. Apoferritin, a 24-subunit (octahedral) iron-storage shell of about 500 kDa, is the standard test specimen; in 2020 two groups reported maps of it at about 1.2 Å in which individual atoms, and some hydrogen atoms, are resolved (T. Nakane, S. H. W. Scheres and colleagues; K. M. Yip, H. Stark and colleagues). As of 2026 resolutions near this record are reached only for exceptionally well-behaved specimens; most new single-particle maps of biological complexes fall between about 2.5 and 4 Å.

Small particles are hard because there is too little signal in each image to determine its orientation. Henderson estimated in 1995 that particles of about 40 kDa should be the lower limit in principle. In practice, proteins of 50–100 kDa can now be solved alone, and smaller ones are often bound to a larger, rigid partner — an antibody fragment, a designed scaffold — that serves as a fiducial. Membrane proteins are studied in detergent micelles or in **nanodiscs**, small patches of lipid bilayer encircled by an engineered scaffold protein.

::: warning Einstein from noise
Because particles are aligned to a reference, a reference can create its own image. In a famous demonstration, images containing only noise, aligned to a photograph of Albert Einstein and averaged, produced a recognisable Einstein (M. Shatsky and colleagues, 2009; R. Henderson, 2013). The same model bias can make a cryo-EM map resemble the initial model even when the data do not support it. Safeguards include *ab initio* initial models, low-pass filtering of references, independent refinement of half-maps (the "gold standard"), and checking that features beyond the reference's resolution appear in the data and that 2D class averages show recognisable views.
:::

## Electron tomography: structures in cells

Single-particle analysis requires many copies of an identical particle, purified. To see molecules in their cellular context — in membranes, among filaments, in organelles — the specimen is instead tilted in the microscope and imaged from many directions, typically from −60° to +60° in steps of 2–3°, and a three-dimensional **tomogram** is reconstructed by back-projection, again via the projection–slice theorem.

::: definition Cryo-electron tomography {#def-cryo-et}
**Cryo-electron tomography** (cryo-ET) reconstructs a three-dimensional volume of a vitrified specimen from a tilt series of images of the same area. Because the specimen cannot be tilted beyond about ±60–70°, part of Fourier space is never sampled — the **missing wedge** — which elongates features along the beam direction. In **subtomogram averaging**, many copies of the same complex are located in tomograms, extracted, aligned and averaged, recovering higher resolution and filling the missing wedge (each copy is in a different orientation).
:::

::: example How sharp is a tomogram? {#ex-crowther}
R. A. Crowther, D. J. DeRosier and A. Klug showed in 1970 that reconstructing an object of diameter (or thickness) $D$ to resolution $d$ from equally spaced projections about a single axis requires about $m = \pi D/d$ projections spread over 180°. A lamella 150 nm thick is imaged every 3° from −60° to +60°. Estimate the resolution of the tomogram, ignoring the missing wedge, and compare it with the size of a ribosome (about 25 nm).
::: solution
A 3° step would give $m = 180/3 = 60$ projections over a full 180°, so $d \approx \pi D/m = \pi\times1500\ \text{Å}/60 = 79$ Å, about 8 nm (the missing wedge makes it worse along the beam direction). A ribosome is visible as a blob of the right size and shape, but no secondary structure can be seen. Taking more images does not help much, because the total dose must be shared among them; this is why high-resolution information from tomograms comes from **subtomogram averaging** of many copies, not from the tomogram itself.
:::
:::

Cells are usually too thick for electrons (more than about 0.5 μm), so thin **lamellae**, 100–200 nm thick, are cut from vitrified cells with a focused ion beam (FIB milling). Cryo-ET of such lamellae has shown ribosomes translating on membranes, the architecture of the nuclear pore complex in intact nuclei, the arrangement of proteasomes around protein aggregates in neurons, and the structures of bacterial flagellar motors and chemoreceptor arrays *in situ*. Subtomogram averages reached better than 4 Å for abundant complexes by the early 2020s, and combining tomography with fluorescence microscopy (correlative light and electron microscopy) helps locate rare events.

::: quiz
Which property of cryo-EM is most directly responsible for its ability to determine several conformations of a molecular machine from one sample?
- [ ] The short wavelength of 300 keV electrons
- [ ] The use of vitreous rather than crystalline ice
- [x] Every particle is imaged individually, so particles can be sorted computationally into classes before averaging
- [ ] The CTF can be corrected
::: solution
Because each molecule contributes its own image, the data can be partitioned: particles in different states are separated by 3D classification and each class is averaged into its own map. In crystallography, all molecules in a crystal are averaged together by the diffraction itself, and different conformations usually need different crystals. The wavelength, vitrification and CTF correction are necessary for high resolution but do not themselves separate states.
:::
:::

::: application Structures for vaccines and drugs
In early 2020, within weeks of the publication of the SARS-CoV-2 genome, cryo-EM structures of its spike glycoprotein in a stabilised prefusion form were determined (D. Wrapp, J. S. McLellan and colleagues, 2020). The stabilisation — two proline substitutions designed from structures of related coronavirus spikes — was used in several of the vaccines that followed, an example of structure-based antigen design. Cryo-EM is now also used in drug discovery for targets such as G-protein-coupled receptors in complex with their G proteins, ion channels and transporters, which rarely crystallise in physiologically relevant states.
:::

::: history
Ernst Ruska and Max Knoll built the first electron microscope in 1931 (Ruska, Nobel Prize in Physics 1986). David DeRosier and Aaron Klug reconstructed the T4 tail from micrographs in 1968 (Klug, Nobel Prize in Chemistry 1982), and Richard Henderson and Nigel Unwin obtained a 7 Å structure of bacteriorhodopsin from two-dimensional crystals in 1975; in 1990 Henderson's group built an atomic model of it. Joachim Frank developed, from the 1970s onwards, the computational methods for averaging and reconstructing randomly oriented single particles, and Jacques Dubochet's vitrification made it possible to image them in their native state. Their work was recognised by the Nobel Prize in Chemistry in 2017. The resolution revolution followed the introduction of direct detectors around 2012: the TRPV1 ion channel at 3.4 Å (M. Liao, E. Cao, D. Julius and Y. Cheng, 2013) and a series of near-atomic structures of membrane proteins and complexes over the next two years announced that cryo-EM had arrived.
:::

## Where this leads

The large complexes that cryo-EM has opened up are the subject of [[structural-biology/molecular-machines]]. Cryo-EM maps of moderate resolution are increasingly interpreted with the help of predicted models ([[structural-biology/structure-prediction]]), and the conformational ensembles it reveals connect to the dynamics of [[structural-biology/dynamics-and-design]].

::: summary
- 300 keV electrons have $\lambda \approx 0.02$ Å; resolution is limited by aberrations, motion, damage and noise, not wavelength. Vitrification preserves specimens in amorphous ice.
- Weak-phase objects are imaged with defocus; the CTF $-\sin\chi(k)$ oscillates with zeros and contrast reversals and must be corrected.
- Doses of 20–60 e⁻ Å⁻² give images with very low signal-to-noise; direct detectors and motion correction made high resolution routine from about 2012–13.
- Single-particle analysis picks, classifies, orients and averages particles (projection–slice theorem, Bayesian refinement) and can separate conformations.
- Resolution is the FSC = 0.143 point between independent half-maps; particle numbers grow as $\exp(B/2d^2)$; the best maps (apoferritin, 2020) reach about 1.2 Å.
- Cryo-ET with FIB-milled lamellae and subtomogram averaging shows complexes inside cells, limited by the missing wedge.
:::

## Exercises

::: exercise Wavelength at 200 kV {level=1 check="2.51"}
Use [[#eq-electron-wavelength]] to calculate the electron wavelength (pm, three significant figures) at 200 kV.
::: solution
$eV = 3.204\times10^{-14}$ J; relativistic factor $1 + 3.204/(2\times8.187) = 1.1957$; $p = \sqrt{2\times9.109\times10^{-31}\times3.204\times10^{-14}\times1.1957} = 2.642\times10^{-22}$ kg m s⁻¹; $\lambda = 6.626\times10^{-34}/2.642\times10^{-22} = 2.51\times10^{-12}$ m $= 2.51$ pm.
:::
:::

::: exercise Nyquist limit {level=1 check="1.66"}
Micrographs are recorded with a pixel size of 0.83 Å at the specimen. What is the best resolution (Å) that can be represented in the images?
::: solution
The Nyquist limit is twice the pixel size: 1.66 Å. In practice maps rarely approach Nyquist, because the detector's response falls off near it.
:::
:::

::: exercise Electrons per pixel {level=1 check="28"}
How many electrons on average fall on a 0.83 × 0.83 Å pixel in a 40 e⁻ Å⁻² exposure (nearest whole number)? What is the relative shot noise?
::: solution
$40\times0.83^2 = 27.6$, about 28 electrons. The Poisson standard deviation is $\sqrt{27.6} = 5.3$, a relative noise of 19 %, much larger than the few per cent contrast of a protein in ice.
:::
:::

::: exercise The missing wedge {level=2 check="1/3"}
A single-axis tilt series covers −60° to +60°. What fraction of the Fourier space (in the plane perpendicular to the tilt axis) is not sampled? Give an exact fraction.
::: solution
Each image samples a central plane at its tilt angle; the planes sample orientations over 120° of the 180° possible. The unsampled region is a wedge of 60° out of 180°, a fraction of 1/3. Dual-axis tomography reduces it to a "missing pyramid", and subtomogram averaging of molecules in different orientations fills it.
:::
:::

::: exercise CTF zeros at higher defocus {level=2}
Repeat [[#ex-ctf-zero]] for a defocus of 3.0 μm. How does the spacing of the first zero change, and why might a microscopist still choose such a large defocus?
::: solution
$\pi\lambda\Delta f = 1855$ Å, so $k \approx \sqrt{\pi/1855} = 0.0412$ Å⁻¹, a spacing of 24 Å; doubling the defocus moves the first zero by a factor $\sqrt2$ to lower frequency, and the later rings are correspondingly more crowded. Larger defocus increases contrast at low spatial frequency, making small particles easier to see and pick and their orientations easier to determine; the cost is more rapid oscillation at high frequency, which is harder to correct accurately and more sensitive to envelope damping.
:::
:::

::: exercise A Rosenthal–Henderson estimate {level=2 check="2.7"}
A data set with $B = 80$ Å² gives 3.5 Å from 200,000 particles. What resolution (Å, two significant figures) would 2,000,000 particles give, according to [[#eq-particles]]?
::: solution
$\ln(N_2/N_1) = \ln10 = 2.303 = \tfrac{B}{2}(1/d_2^2 - 1/d_1^2) = 40(1/d_2^2 - 0.0816)$, since $1/3.5^2 = 0.0816$ Å⁻². So $1/d_2^2 = 0.0816 + 2.303/40 = 0.0816 + 0.0576 = 0.1392$ Å⁻² and $d_2 = 2.68$ Å, about 2.7 Å. Ten times the data buys less than one ångström.
:::
:::

::: exercise Judging a deposited map {level=2}
A cryo-EM structure of a 120 kDa membrane transporter in detergent is reported at a "global resolution of 3.1 Å (FSC = 0.143)". The local-resolution map shows 2.8 Å in the transmembrane core, 4–5 Å in a cytoplasmic domain and 6–8 Å in the detergent micelle. The model includes all side chains of the cytoplasmic domain and a bound lipid in the micelle region. What would you check before trusting (a) the side chains of the cytoplasmic domain and (b) the lipid?
::: solution
(a) At 4–5 Å, side chains are generally not resolved; their positions are largely inferred from sequence, prior models or prediction. Check the map–model fit (real-space correlation, Q-scores) residue by residue, whether the side chains are supported by density at a sensible contour level, and whether the domain is flexible (3D variability, classification); treat the side-chain conformations as hypotheses. (b) The micelle region is poorly resolved and contains disordered detergent and lipid; a "bound lipid" there needs clear, elongated density inconsistent with detergent, contacts with protein residues that are conserved or functionally important, and ideally support from biochemical data or a higher-resolution map. The global 3.1 Å figure says nothing about these regions.
:::
:::

::: exercise Choosing a method {level=3}
For each project, would you start with X-ray crystallography, NMR or cryo-EM, and why? (a) A 900 kDa multisubunit complex that exists in at least three conformations. (b) A 12 kDa domain whose function is thought to depend on millisecond motions of a loop. (c) A 30 kDa enzyme for which you need to see the protonation state of an active-site histidine and to screen 500 small-molecule fragments. (d) The arrangement of a membrane complex in the native membrane of a bacterium.
::: solution
(a) Cryo-EM: the size is ideal, no crystals are needed, and 3D classification can separate the conformations. (b) NMR: the domain is small enough for full assignment, and relaxation dispersion can characterise millisecond loop dynamics, which neither crystallography nor cryo-EM measures directly. (c) X-ray crystallography: a 30 kDa enzyme is small for cryo-EM, while crystallography gives high resolution and allows fragment soaking at high throughput; protonation states would need atomic resolution or neutron crystallography (NMR of the histidine's ring nitrogens is an alternative). (d) Cryo-electron tomography of the bacterium (thin cells, or FIB-milled lamellae) with subtomogram averaging, which shows the complex in its native membrane.
:::
:::

::: exercise Interpreting a 2D classification {level=3}
In a data set of a 400 kDa complex, the 2D class averages show sharp, detailed side views and top views, but no tilted views; the 3D reconstruction has a "global" resolution of 3.5 Å but is visibly stretched along one direction. (a) What is the problem and its likely cause? (b) Why does the FSC overestimate the quality of the map? (c) Suggest two experimental remedies.
::: solution
(a) Preferred orientation: the particles adopt only a few orientations in the ice, probably because they adsorb to the air–water interface with particular faces, so some directions in Fourier space are poorly sampled and the map is anisotropic (stretched along the under-sampled direction). (b) The FSC averages over each shell; well-sampled directions dominate, so the global number reflects the best directions. A directional (3D) FSC would reveal the anisotropy. (c) Collect data with the specimen tilted (e.g. by 30–40°) so that the same particles are seen from additional directions; change the grid surface (graphene oxide or other support films) or add a small amount of detergent to keep particles away from the interface; or alter the protein surface (for example by binding an antibody fragment) to change how it adsorbs.
:::
:::
