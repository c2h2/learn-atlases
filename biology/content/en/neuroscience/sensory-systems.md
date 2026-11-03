A rod in the retina of a dark-adapted toad responds to the absorption of a single photon with a current change of about a picoampere, clearly visible above its noise. A hair cell in the inner ear responds to a deflection of its hair bundle of less than a nanometre, smaller than the diameter of many atoms' electron clouds put end to end, and does so within microseconds. A moth can detect a few molecules of the sex pheromone of its species among billions of other molecules in the air. Sense organs are among the most sensitive detectors that exist, natural or artificial, and they all work by the same broad strategy: a specialised protein converts a physical or chemical stimulus into a change in membrane conductance, and the resulting electrical signal is passed on, through synapses, to circuits that extract what matters.

This chapter covers the general principles of sensory systems, transduction, receptor potentials, adaptation, receptive fields and the coding of intensity and quality, and then examines four senses: vision, hearing, touch and the chemical senses of smell and taste. The tools are those of the previous chapters: membrane potentials, action potentials and synapses. The coding of stimuli by trains of action potentials, and how we read such codes, is taken further in [[neuroscience/neural-coding]]; the clinical examination of the human senses belongs to [Medicine Atlas: sensory systems](/learn/medicine/lesson.php?c=nervous-system&l=sensory-systems).

## General principles

### Transduction and the receptor potential

::: definition Sensory transduction and receptor potential {#def-transduction}
**Sensory transduction** is the conversion of a stimulus (light, mechanical force, temperature, a chemical) into an electrical signal by a **sensory receptor**, a specialised neuron or epithelial cell. The stimulus acts on a **transduction protein**, either an ion channel that is gated directly (mechanically gated, temperature-gated or ligand-gated channels) or a receptor that opens or closes channels through an intracellular cascade (G-protein-coupled receptors). The resulting graded change in membrane potential is the **receptor potential**. In receptors that have axons, the receptor potential triggers action potentials at a nearby spike-initiation zone; in receptors without axons, such as vertebrate photoreceptors and hair cells, it modulates transmitter release onto a second neuron.
:::

Two transduction strategies recur across the senses. **Direct gating** is fast, because no intermediate steps intervene, and is used where timing matters: hair cells and touch receptors use mechanically gated channels, and insect olfactory receptors are themselves ion channels. **Metabotropic cascades** are slower but provide enormous amplification, because each activated receptor can activate many G proteins, each of which drives an enzyme that makes or destroys many second-messenger molecules. Vertebrate photoreceptors and olfactory neurons, which must detect a single photon or very few molecules, use cascades.

### Intensity, quality and labelled lines

A sensory system must report two things about a stimulus: what kind it is and how strong it is. **Quality** (red versus green, sweet versus bitter, the pitch of a tone) is encoded mainly by *which* receptors and nerve fibres are active. Johannes Müller's **doctrine of specific nerve energies** (1838) put it this way: the sensation produced by a nerve depends on the nerve, not on how it is stimulated. Pressing on a closed eye produces light, not pressure, because the optic nerve only ever signals light. In modern terms, each sensory fibre is a **labelled line** whose activity the brain interprets in a fixed way.

**Intensity** is encoded by the size of the receptor potential, by the firing rate of the sensory fibres (Edgar Adrian's discovery in 1926, recording from single stretch receptors of the frog), and by the number of fibres recruited. Because firing rates range from near zero to a few hundred impulses per second, while natural stimuli span many orders of magnitude, sensory systems compress intensity.

::: definition Weber's law and the Weber fraction {#def-weber}
The **just-noticeable difference** (JND) $\Delta I$ is the smallest change in a stimulus of intensity $I$ that can be reliably detected. **Weber's law** (Ernst Heinrich Weber, 1834) states that over a wide middle range of intensities the JND is a constant fraction of the intensity:

$$
\frac{\Delta I}{I} = k,
$$

where $k$ is the **Weber fraction**. It is an empirical regularity, not a law of nature; it fails at low intensities near the absolute threshold and sometimes at very high ones.
:::

Weber fractions are roughly 0.02 for lifted weights, 0.01–0.02 for the brightness of a light against a background, and about 0.1 for the loudness of sounds, though the values depend on the conditions. The physicist Gustav Fechner used Weber's law to build a scale of sensation.

::: proposition Fechner's logarithmic scale {#prop-fechner}
If Weber's law holds with fraction $k$ from an absolute threshold $I_0$ upwards, the number of just-noticeable steps between $I_0$ and an intensity $I$ is

$$
n = \frac{\ln(I/I_0)}{\ln(1 + k)} \approx \frac{1}{k}\ln\frac{I}{I_0},
$$ {#eq-fechner}

so if each JND is taken as an equal increment of sensation, sensation grows as the logarithm of intensity (Fechner, 1860). Assumptions: Weber's law over the whole range, and the hypothesis, which is not testable from discrimination data alone, that all JNDs are equal steps of sensation.
:::

::: proof
Starting from $I_0$, each step multiplies the intensity by $1 + k$, so after $n$ steps the intensity is $I_0(1 + k)^n$. Setting this equal to $I$ and taking logarithms gives $n\ln(1 + k) = \ln(I/I_0)$. For small $k$, $\ln(1 + k) \approx k$.
:::

Stanley Stevens challenged Fechner in the 1950s by asking people to assign numbers directly to the magnitude of sensations. He found that sensation $S$ grows as a **power** of intensity, $S = cI^b$ (**Stevens's power law**), with exponents that differ between senses: about 0.33 for the brightness of a light seen in the dark, about 0.67 for the loudness of a tone, about 1 for apparent length, and about 3.5 for the intensity of electric shock to the fingers. An exponent below 1 compresses, so doubling a light's intensity makes it look only about 26 % brighter ($2^{0.33} = 1.26$); an exponent above 1 expands, so doubling the current of a shock makes it feel about eleven times stronger. Both Fechner's and Stevens's laws are empirical descriptions, and which one better describes "sensation" depends on the method of measurement.

::: example Counting just-noticeable differences {#ex-jnd}
A person can distinguish lifted weights that differ by 2 %. (a) What is the smallest detectable difference from a 250 g weight? (b) Using [[#eq-fechner]], about how many distinguishable steps lie between 10 g and 10 kg? (c) Why is the answer an overestimate of the number of weights that could be told apart in practice?
::: solution
(a) $\Delta I = 0.02\times250 = 5$ g.

(b) $n = \ln(10{,}000/10)/\ln(1.02) = \ln1000/0.0198 = 6.91/0.0198 = 349$ steps.

(c) A JND is defined statistically, typically as the difference detected on 75 % of paired comparisons; it does not mean that weights one JND apart can be identified without error when presented singly. Absolute identification is far worse: people can reliably assign single stimuli on one dimension to only about five to nine categories (George Miller's "magical number seven", 1956). Weber's law also fails near the extremes of the range.
:::
:::

### Adaptation and dynamic range

Most receptors respond strongly to a change in stimulus and less to a maintained one: they **adapt**. **Slowly adapting** (tonic) receptors keep firing for as long as the stimulus lasts and signal its magnitude; **rapidly adapting** (phasic) receptors fire mainly at the onset, and sometimes the offset, and signal change. The Pacinian corpuscle, a pressure receptor in the skin and deep tissues of mammals, is the classic rapid adapter. Werner Loewenstein and Morton Mendelson showed in 1965, on corpuscles from the cat mesentery, that its rapid adaptation is largely mechanical: the layered capsule around the nerve ending transmits a sudden pressure to the ending but then redistributes a maintained one, and when the capsule was dissected away the bare ending adapted slowly.

Adaptation also shifts the range of intensities a receptor covers. The response of many receptors to intensity $I$ is well described by the saturating **Naka–Rushton** (or Hill) function

$$
R = R_\mathrm{max}\frac{I^n}{I^n + \sigma^n},
$$ {#eq-naka}

where $\sigma$ is the intensity that gives half the maximal response and $n$ is near 1 for photoreceptors. With $n = 1$ the response climbs from 10 % to 90 % of its maximum as $I$ increases from $\sigma/9$ to $9\sigma$, a factor of 81 or about 1.9 log units, but natural light intensities span about ten log units between starlight and noon sunshine. Light adaptation solves this by shifting $\sigma$ to follow the mean intensity, so that the steep part of the curve is always centred on the current conditions. The system then signals contrast, the ratio of a stimulus to its background, rather than absolute intensity, which is exactly what Weber's law implies.

::: widget plot
f: 10^(n*x)/(10^(n*x) + 10^(n*s)); 10^(n*x)/(10^(n*x) + 10^(n*(s + 3)))
x: -2, 8
y: 0, 1.05
sliders: s=1:-1:4:0.1; n=1:0.5:2:0.1
labels: \text{dark-adapted}; \text{light-adapted (σ raised 1000-fold)}
hlines: 0.1; 0.9
caption: Normalised receptor response (vertical axis) against the logarithm of stimulus intensity (horizontal axis, arbitrary units) from the Naka–Rushton function [[#eq-naka]], with half-saturation at $\log_{10}\sigma = s$ (slider) and exponent $n$ (slider). The second curve shows the same receptor after adaptation has raised $\sigma$ a thousandfold. Each curve covers only about two log units between 10 % and 90 % of maximal response (horizontal lines), but by sliding along the intensity axis the receptor can work over a much wider range. Raise $n$ and the curves become steeper and their working range narrower.
:::

### Receptive fields

The **receptive field** of a sensory neuron is the region of the sensory surface (the area of retina, skin or the range of sound frequencies) in which a stimulus changes its activity, together with the pattern of that change. The concept was introduced by Charles Sherrington for reflexes and made central to sensory physiology by H. Keffer Hartline, who recorded from single optic nerve fibres of the frog in 1938 and from the compound eye of the horseshoe crab *Limulus polyphemus*. In *Limulus*, Hartline and Floyd Ratliff showed in the 1950s that illuminating one ommatidium reduces the firing of its neighbours: **lateral inhibition**, which enhances contrast at edges.

In 1953 Stephen Kuffler, recording from retinal ganglion cells in the cat, found that their receptive fields are circular and have a **centre–surround** organisation. An **ON-centre** cell is excited by light in a small central disc and inhibited by light in a surrounding annulus; an **OFF-centre** cell has the opposite arrangement. Uniform illumination of both regions gives only a weak response. The cell signals local contrast, not absolute brightness.

A convenient model of a centre–surround receptive field is the **difference of Gaussians**: a narrow excitatory Gaussian minus a broader, weaker inhibitory one. For a spot of light of radius $r$ centred on the field, the response is proportional to

$$
R(r) = \left(1 - \mathrm{e}^{-r^2/2\sigma_\mathrm{c}^2}\right) - w\left(1 - \mathrm{e}^{-r^2/2\sigma_\mathrm{s}^2}\right),
$$ {#eq-dog}

where $\sigma_\mathrm{c}$ and $\sigma_\mathrm{s}$ are the widths of centre and surround and $w$ is the total strength of the surround relative to the centre.

::: widget plot
f: (1 - exp(-x^2/(2*sc^2))) - w*(1 - exp(-x^2/(2*ss^2)))
x: 0, 12
y: -0.2, 1
sliders: w=0.8:0:1:0.05; sc=1:0.5:3:0.1; ss=3:1.5:6:0.1
labels: \text{response to a centred spot}
hlines: 0
caption: Response of a model ON-centre ganglion cell (vertical axis, relative units) to a centred spot of light of radius $r$ (horizontal axis, in the same units as the receptive-field widths), from the difference-of-Gaussians model [[#eq-dog]]. $\sigma_\mathrm{c}$ (sc) and $\sigma_\mathrm{s}$ (ss) are the widths of centre and surround, and $w$ the relative strength of the surround. As the spot grows, the response rises while it fills the centre, peaks, and then falls as it invades the surround; a very large spot gives $1 - w$. Set $w = 0$ to remove the surround (no optimal size), or $w = 1$ for a perfectly balanced cell that ignores uniform light.
:::

::: example The best spot size {#ex-dog}
A model ganglion cell has $\sigma_\mathrm{c} = 1$, $\sigma_\mathrm{s} = 3$ (in units of 0.1° of visual angle) and $w = 0.8$. (a) Find the spot radius that maximises the response in [[#eq-dog]]. (b) Compare the response at that radius with the response to uniform illumination. (c) What does this imply about what the cell signals?
::: solution
(a) Differentiating, $\deriv{R}{r} = (r/\sigma_\mathrm{c}^2)\mathrm{e}^{-r^2/2\sigma_\mathrm{c}^2} - w(r/\sigma_\mathrm{s}^2)\mathrm{e}^{-r^2/2\sigma_\mathrm{s}^2} = 0$. Cancelling $r$ and taking logarithms:

$$
r^2\left(\frac{1}{2\sigma_\mathrm{c}^2} - \frac{1}{2\sigma_\mathrm{s}^2}\right) = \ln\frac{\sigma_\mathrm{s}^2}{w\sigma_\mathrm{c}^2}, \qquad r^2(0.5 - 0.0556) = \ln\frac{9}{0.8} = 2.42,
$$

so $r^2 = 5.45$ and $r = 2.33$, about 0.23°.

(b) $R(2.33) = (1 - \mathrm{e}^{-2.72}) - 0.8(1 - \mathrm{e}^{-0.30}) = 0.934 - 0.209 = 0.73$. For uniform illumination ($r \to \infty$), $R = 1 - 0.8 = 0.2$. The optimal spot is 3.6 times as effective as uniform light.

(c) The cell responds best to a local spot brighter than its surroundings, and weakly to overall illumination. It acts as a spatial filter that removes the shared, uninformative mean level and emphasises local contrast and edges, which also saves the limited bandwidth of the optic nerve.
:::
:::

## Vision

### Phototransduction

Vertebrate photoreceptors are of two kinds: **rods**, which are very sensitive and serve vision in dim light, and **cones**, which are less sensitive, faster, and come in several types with different spectral sensitivities, supporting colour vision in bright light. Both have an **outer segment** packed with stacks of membrane discs containing the visual pigment, an inner segment with mitochondria and the nucleus, and a synaptic terminal.

The visual pigment of rods is **rhodopsin**: the protein opsin, a G-protein-coupled receptor, bound covalently to the chromophore **11-*cis*-retinal**, a derivative of vitamin A. Absorption of a photon isomerises retinal to the all-*trans* form in about 200 femtoseconds, one of the fastest reactions in biology, and the change of shape converts rhodopsin into its active form, metarhodopsin II. George Wald worked out the chemistry of the visual pigments from the 1930s to the 1960s.

What happens next is counter-intuitive. In the dark, cation channels in the outer-segment membrane are held open by cyclic GMP (cGMP), and a steady inward **dark current**, carried mainly by Na⁺ (and some Ca²⁺), flows into the outer segment and out of the inner segment, keeping the rod depolarised at about −40 mV and releasing glutamate continuously. Light *closes* the channels.

::: definition The phototransduction cascade {#def-photo}
1. A photon isomerises retinal in rhodopsin, producing active rhodopsin (R*).
2. R* diffuses in the disc membrane and activates many molecules of the G protein **transducin**, exchanging GDP for GTP on each.
3. Each activated transducin α-subunit activates a **phosphodiesterase** (PDE6), which hydrolyses cGMP.
4. The fall in cGMP closes **cGMP-gated cation channels** (CNG channels) in the plasma membrane, reducing the dark current.
5. The rod **hyperpolarises** towards about −70 mV in bright light and releases less glutamate.
6. Recovery: R* is phosphorylated by rhodopsin kinase and capped by **arrestin**; transducin hydrolyses its GTP; and the fall in internal Ca²⁺ (which enters through the CNG channels) activates guanylyl cyclase to remake cGMP. The Ca²⁺ feedback also underlies light adaptation.
:::

Amplification occurs at the first two stages, where one R* activates many transducins and each PDE6 hydrolyses many cGMP molecules, and at the channel, whose opening depends cooperatively on cGMP. In 1979 Denis Baylor, Trevor Lamb and King-Wai Yau drew single rod outer segments of the toad *Bufo marinus* into a suction pipette and recorded the membrane current directly. Dim flashes produced responses that fluctuated in steps of about 1 pA, the response to one photon, against a dark current of some tens of picoamperes. A single photon closes a few per cent of the open channels.

::: application Seeing single photons
In 1942 Selig Hecht, Simon Shlaer and Maurice Pirenne asked human observers to report whether they had seen very dim flashes of light, and measured the **frequency of seeing** as a function of flash intensity. Because photon arrivals are random (Poisson), even a flash of fixed average intensity delivers a variable number of photons to the rods. The steepness of the frequency-of-seeing curve therefore reveals how many photons must be absorbed for a flash to be seen: the more photons needed, the steeper the curve. Their data were fitted best by a requirement of about 5–8 absorbed photons, spread over hundreds of rods, so that each rod absorbed at most one: a single rod must respond to a single photon. The figure shows the predicted curves.
:::

::: widget plot
f: 1 - sum(exp(-10^x)*(10^x)^k/fact(k), k, 0, K - 1)
x: -1, 2
y: 0, 1.05
sliders: K=6:1:12:1
labels: \text{probability of seeing}
hlines: 0.5
caption: Probability that at least $K$ photons are absorbed (vertical axis) against the logarithm of the mean number of photons absorbed per flash (horizontal axis), assuming Poisson statistics; $K$ is set by the slider. This is the Hecht–Shlaer–Pirenne prediction of a frequency-of-seeing curve. With $K = 1$ the curve is shallow; with larger $K$ it becomes steeper and moves to the right. Plotting on a logarithmic intensity axis means that the shape of the curve, not just its position, depends on $K$, which is why the steepness of human data could reveal the number of photons needed regardless of how many photons were lost in the eye before reaching the rods.
:::

### The retina as a processor

The retina is a piece of brain, and it processes the image before sending it on. Photoreceptors synapse onto **bipolar cells**, which synapse onto **ganglion cells**, whose axons form the optic nerve; **horizontal cells** and **amacrine cells** provide lateral connections. Because photoreceptors release glutamate in the dark, bipolar cells must invert or preserve the sign of the signal: **OFF bipolar cells** have ionotropic glutamate receptors and so are depolarised in the dark, like the photoreceptors; **ON bipolar cells** have a metabotropic receptor (mGluR6) that closes a cation channel, so glutamate hyperpolarises them and light, by reducing glutamate release, depolarises them. This sign inversion, at the very first synapse, creates the parallel ON and OFF pathways, and horizontal cells contribute the antagonistic surround. More than thirty types of ganglion cell in the mouse retina, each tiling the retina, extract different features: contrast, colour, motion direction, and absolute light level for setting the circadian clock.

### Visual cortex

Retinal ganglion cells project to the lateral geniculate nucleus of the thalamus, which projects to the primary visual cortex (V1, also called the striate cortex). In 1959 David Hubel and Torsten Wiesel, recording from single neurons in V1 of anaesthetised cats, found that circular spots of light were nearly useless as stimuli; the cells responded vigorously to bars or edges of a particular **orientation**. **Simple cells** have elongated receptive fields with separate ON and OFF subregions, as if built from a row of geniculate centre–surround fields; **complex cells** respond to an oriented edge anywhere within a larger field. Neurons with similar orientation preferences are grouped in columns, and inputs from the two eyes are segregated into alternating **ocular dominance** columns. The idea of a hierarchy, in which each stage builds more complex features from simpler ones, has guided visual neuroscience, and models of computer vision, ever since; Hubel and Wiesel shared the Nobel Prize in 1981. How these columns develop is taken up in [[neuroscience/neural-development]].

## Hearing

Sound is a pressure wave. The human ear responds to frequencies from about 20 Hz to 20 kHz and to pressures from about 20 µPa, the conventional threshold at 1–4 kHz, to more than a million times that, where sound becomes painful. Intensities are therefore expressed on a logarithmic scale: the **sound pressure level** in decibels is $L = 20\log_{10}(p/p_0)$, with $p_0 = 20$ µPa. A pressure of 20 Pa is 120 dB. (Hearing in young adults is often quoted as reaching about 20 kHz; the upper limit falls with age. Many mammals hear far higher frequencies: mice to about 90 kHz, and some bats and toothed whales beyond 150 kHz.)

### The hair cell

The receptor of hearing, and of the vestibular and lateral-line senses, is the **hair cell**, an epithelial cell with a bundle of stiff, actin-filled **stereocilia** on its apical surface, arranged in rows of increasing height. Deflecting the bundle towards the tallest row depolarises the cell; deflecting it the other way hyperpolarises it.

::: definition Mechanoelectrical transduction in hair cells {#def-hair}
The tip of each stereocilium is connected to the side of its taller neighbour by a fine filament, the **tip link**, made of cadherin-23 and protocadherin-15. Deflection towards the tall edge stretches the tip links, which pull open **mechanically gated cation channels** near the tips of the shorter stereocilia; deflection the other way slackens them and lets the channels close. The channels open within microseconds, too fast for any enzymatic cascade, so they must be gated directly by the mechanical force. The pore-forming subunits are thought to include TMC1 and TMC2, although the full composition of the channel complex is still under study.
:::

David Corey and A. J. Hudspeth showed in 1979, in hair cells of the bullfrog sacculus, that transduction has a latency of only tens of microseconds, and Hudspeth later located the channels near the tips of the stereocilia; James Pickles and colleagues described the tip links by electron microscopy in 1984, in the guinea pig cochlea. Deflections of a few nanometres saturate the response, and the threshold of hearing corresponds to bundle movements of well under a nanometre.

The ionic environment of the cochlear hair cell is unusual. Its apical surface faces **endolymph**, a fluid rich in K⁺ (about 150 mmol L⁻¹) and held at about +80 mV relative to other extracellular fluids by an active epithelium, the stria vascularis. The transduction current is therefore carried mainly by K⁺, driven into the cell by a large electrical gradient, and the cell does not have to spend energy pumping it back out: K⁺ leaves through the basolateral membrane, which faces ordinary K⁺-poor fluid.

### The cochlea as a frequency analyser

In the mammalian cochlea, hair cells sit on the **basilar membrane**, which runs the length of a coiled, fluid-filled tube about 35 mm long in humans. The membrane is narrow and stiff near the base of the cochlea and wide and floppy near the apex. Georg von Békésy, observing cochleas from human cadavers in the 1940s, found that a tone sets up a **travelling wave** that peaks at a place determined by frequency: high frequencies near the base, low frequencies near the apex. Each point on the membrane, and each hair cell, is thus tuned to a **characteristic frequency**, and the cochlea performs a mechanical frequency analysis. This place code, or **tonotopy**, is preserved at every level of the auditory pathway up to the cortex.

::: example Mapping frequency onto the cochlea {#ex-greenwood}
Donald Greenwood's empirical function for the human cochlea gives the characteristic frequency at fractional distance $x$ from the apex (0 at the apex, 1 at the base) as $f = 165.4\,(10^{2.1x} - 0.88)$ Hz. Taking the cochlea as 35 mm long, (a) where is the place for 1 kHz? (b) How far apart are the places for 1 and 2 kHz, 2 and 4 kHz, and 4 and 8 kHz? (c) What does this imply?
::: solution
(a) $10^{2.1x} = 1000/165.4 + 0.88 = 6.93$, so $2.1x = 0.840$ and $x = 0.400$: 40 % of the way from the apex, 14.0 mm.

(b) Repeating for 2, 4 and 8 kHz gives $x = 0.530$, $0.666$ and $0.806$; the separations are $0.130\times35 = 4.5$ mm, $0.136\times35 = 4.8$ mm and $0.140\times35 = 4.9$ mm.

(c) Above about 1 kHz each octave occupies a roughly constant length of cochlea, about 5 mm: the map is approximately logarithmic in frequency. This matches the musical and perceptual fact that octaves sound like equal steps, and it is a further instance of the logarithmic compression found throughout sensory systems. (Greenwood's function is an empirical fit to human psychophysical and anatomical data, not a derivation.)
:::
:::

Passive mechanics alone, however, cannot explain the sharpness of cochlear tuning or its sensitivity. Mammals have two kinds of cochlear hair cell. The **inner hair cells**, a single row, are the true receptors and are contacted by about 95 % of the afferent fibres of the auditory nerve. The three rows of **outer hair cells** act as amplifiers: when depolarised they shorten, and when hyperpolarised they lengthen, at acoustic frequencies (William Brownell and colleagues, 1985). This **electromotility** depends on the membrane protein **prestin** (Jing Zheng, Peter Dallos and colleagues, 2000) and feeds energy into the vibration of the basilar membrane, sharpening and amplifying it, most at low sound levels. A healthy cochlea even emits faint sounds of its own, **otoacoustic emissions**, which can be recorded in the ear canal.

### Locating sounds

Because the cochlea maps frequency rather than space, the direction of a sound must be computed in the brain, from differences between the two ears. Low-frequency sounds arrive at the nearer ear slightly earlier: the **interaural time difference** (ITD) is at most the time for sound to travel around the head. High-frequency sounds are shadowed by the head and are louder at the nearer ear: the **interaural level difference**.

::: example How small are interaural time differences? {#ex-itd}
Sound travels at 343 m s⁻¹ in air at 20 °C. (a) Estimate the maximum ITD for a human with ears 0.22 m apart, treating the path difference as equal to the distance between the ears. (b) A barn owl's maximum ITD is about 0.17 ms; owls can locate sounds to within about 1–2°. What ITD corresponds to 1° near straight ahead, for the owl? (c) Compare this with the duration of an action potential.
::: solution
(a) $0.22/343 = 6.4\times10^{-4}$ s $= 0.64$ ms. (The path around the head is somewhat longer; measured values in adults are around 0.6–0.7 ms.)

(b) Near the midline the ITD varies approximately as $\mathrm{ITD}_\mathrm{max}\sin\theta$, so for $\theta = 1° = 0.0175$ rad, $\mathrm{ITD} \approx 0.17\times0.0175 = 0.003$ ms, or about 3 µs.

(c) An action potential lasts about 0.5–1 ms, hundreds of times longer. The auditory system must compare the timing of spikes from the two ears with microsecond precision, using specialised synapses (very large terminals such as the endbulbs and calyces of Held), fast channels and phase-locked firing.
:::
:::

In 1948 Lloyd Jeffress proposed a model for ITD detection: axons from the two ears run in opposite directions along a row of **coincidence-detector** neurons, acting as **delay lines**, so that each neuron fires best when the external delay is cancelled by the difference in axonal path lengths. The array is then a place map of ITD. Catherine Carr and Masakazu Konishi found circuitry closely matching this model in the nucleus laminaris of the barn owl in 1990. In mammals the corresponding nucleus, the medial superior olive, also contains coincidence detectors, but whether a Jeffress-type map of delays exists there, or whether timed inhibition sets ITD tuning, is still debated.

## Touch, temperature and pain

The skin of mammals contains several kinds of **low-threshold mechanoreceptors**, each the ending of a sensory neuron with its cell body in a dorsal root ganglion. In the glabrous (hairless) skin of the human hand, four types have been characterised by recording from single fibres in awake volunteers (microneurography, developed in Sweden in the 1960s):

| ending | adaptation | receptive field | best stimulus |
|---|---|---|---|
| Merkel cell–neurite complex | slow | small, sharp | edges, points, texture, shape |
| Meissner corpuscle | rapid | small | slip, low-frequency vibration (flutter, about 5–50 Hz) |
| Ruffini ending | slow | large | skin stretch, finger position |
| Pacinian corpuscle | very rapid | very large | high-frequency vibration (about 40–400 Hz) |

The transduction channel of most of these endings is **Piezo2**, a large mechanically gated cation channel discovered, together with its relative Piezo1, by Bertrand Coste, Ardem Patapoutian and colleagues in 2010. Mice lacking Piezo2 in sensory neurons lose most light-touch responses and much of their sense of limb position (proprioception). Temperature is sensed by members of the **TRP** channel family: TRPV1, identified in 1997 by Michael Caterina, David Julius and colleagues as the receptor for capsaicin, the "hot" compound in chilli peppers, is activated by temperatures above about 43 °C; TRPM8, the menthol receptor, by cooling. Julius and Patapoutian shared the Nobel Prize in 2021.

**Pain** (nociception) is carried by thin, slowly conducting Aδ and C fibres whose free endings respond to intense mechanical, thermal or chemical stimuli. Because pain is strongly modulated in the spinal cord and brain, and because chronic pain is a major clinical problem, its clinical aspects are covered in [Medicine Atlas: headache and pain](/learn/medicine/lesson.php?c=nervous-system&l=headache-pain).

## The chemical senses

### Smell

In 1991 Linda Buck and Richard Axel, searching for genes that were expressed only in the olfactory epithelium of the rat and encoded G-protein-coupled receptors, found a family of several hundred **odorant receptor** (OR) genes, the largest gene family in mammalian genomes. Mice have about 1100 functional OR genes, humans about 400 functional genes and a similar number of pseudogenes, and elephants about 2000 (figures from genome annotations, which continue to be revised). Buck and Axel shared the Nobel Prize in 2004.

::: definition The logic of olfactory coding {#def-olfaction}
- Each **olfactory sensory neuron** expresses **one** odorant receptor gene, chosen from the whole repertoire, and only one allele of it.
- Odorant binding activates a G protein (G_olf), adenylyl cyclase raises cAMP, and cAMP opens CNG cation channels; the resulting Ca²⁺ entry opens Ca²⁺-activated Cl⁻ channels, and because olfactory neurons keep internal Cl⁻ high, Cl⁻ efflux amplifies the depolarisation.
- All neurons expressing the same receptor, scattered through the epithelium, send their axons to the same one or two **glomeruli** in each olfactory bulb (Peter Mombaerts, Axel and colleagues, 1996). The bulb therefore contains a map in which each glomerulus represents one receptor type.
- Each receptor binds many odorants and each odorant activates several receptors, so odours are coded **combinatorially** by the pattern of activated glomeruli (Bettina Malnic, Buck and colleagues, 1999).
:::

Insects solved the same problem with a different molecular toolkit. Their odorant receptors are not G-protein-coupled receptors but **ligand-gated ion channels**, each formed by an odorant-specific subunit together with a common co-receptor, Orco; *Drosophila* has about 60 *Or* genes. Yet the wiring logic is the same: one receptor per neuron, and convergence of all neurons expressing a given receptor onto a single glomerulus in the antennal lobe. That convergent evolution of circuit logic, with different molecules, suggests that the glomerular design is a good solution to the problem of identifying odours.

### Taste

Taste in mammals recognises five basic qualities, each detected by a distinct population of taste receptor cells in taste buds. **Sweet** is detected by a heterodimer of the G-protein-coupled receptors T1R2 and T1R3, **umami** (the taste of glutamate) by T1R1 and T1R3, and **bitter** by the T2R family, about 25 genes in humans, each cell expressing many of them, so that bitter cells signal "bitter" without discriminating between bitter compounds. Most of these receptors were identified in the laboratories of Charles Zuker and Nicholas Ryba around 2000–2003, mainly in mice. **Sour** is detected by cells expressing the proton channel OTOP1 (identified in 2018–2019), and the attractive taste of low **salt** concentrations in mice depends on the epithelial Na⁺ channel ENaC. Mice in which sweet-sensing cells were engineered to express a receptor for a normally tasteless compound were attracted to that compound, and mice whose bitter cells were made to express it avoided it: the behavioural meaning of a taste is fixed by the cell, not by the receptor, a striking confirmation of labelled lines.

::: warning "Each part of the tongue tastes a different quality"
The "tongue map", with sweet at the tip and bitter at the back, comes from a misreading of a German thesis of 1901 by David Hänig, which reported small differences in threshold across the tongue. All five qualities can be detected in all regions of the tongue that have taste buds. Quality is coded by cell type, and cells of every type are present in taste buds everywhere.
:::

::: quiz
A sensory neuron fires at a high rate when its stimulus is switched on, then within 100 ms falls almost to its resting rate although the stimulus continues. When the stimulus is switched off it fires again briefly. Which description fits best?
- [ ] A slowly adapting receptor signalling stimulus intensity.
- [x] A rapidly adapting receptor signalling changes in the stimulus.
- [ ] A receptor whose transduction channels have been permanently damaged.
- [ ] A receptor with a centre–surround receptive field.
::: solution
Responses at onset and offset with little response during the maintained stimulus are the signature of rapid adaptation, as in Pacinian corpuscles or Meissner corpuscles. Such receptors signal change, such as vibration or slip, and are blind to steady pressure; slowly adapting receptors, such as Merkel endings, signal maintained stimuli.
:::
:::

::: history
Johannes Müller stated the doctrine of specific nerve energies in 1838; Ernst Weber (1834) and Gustav Fechner (1860) founded psychophysics. Hermann von Helmholtz analysed the eye and ear in the 1850s and 1860s, proposing the resonance theory of hearing and, after Thomas Young, the three-receptor theory of colour vision. Edgar Adrian recorded from single sensory fibres in 1926 and shared the Nobel Prize with Sherrington in 1932. H. Keffer Hartline, Ragnar Granit and George Wald shared the 1967 prize for work on the retina and visual pigments; Georg von Békésy received the 1961 prize for the travelling wave in the cochlea. Kuffler (1953) and Hubel and Wiesel (1959 and 1962) defined the receptive fields of the visual system. The molecular era of the senses began with the cloning of rhodopsin (1983, bovine; Jeremy Nathans and David Hogness), the odorant receptors (Buck and Axel, 1991), TRPV1 (1997), the taste receptors (around 2000) and the Piezo channels (2010).
:::

## Where this leads

Sensory signals drive behaviour by way of motor systems, the subject of [[neuroscience/motor-systems]]. How receptive fields and maps are wired during development, and refined by experience, is in [[neuroscience/neural-development]]; how stimuli are encoded and decoded by populations of neurons is in [[neuroscience/neural-coding]]. The behavioural uses of the senses, in communication and navigation, are explored in [[behaviour/communication]] and [[behaviour/migration-navigation]].

::: summary
- Receptors transduce stimuli into receptor potentials, by directly gated channels (fast: hair cells, touch, insect olfaction) or by G-protein cascades (amplifying: vertebrate photoreceptors, olfaction, sweet, umami and bitter taste).
- Quality is coded mainly by labelled lines; intensity by receptor potential, firing rate and recruitment. Weber's law ($\Delta I/I = k$) and Fechner's logarithmic scale, or Stevens's power law, describe compressed perception of intensity.
- Adaptation shifts receptors' working range (Naka–Rushton $\sigma$ follows the background), so that sensory systems signal contrast and change.
- Receptive fields with centre–surround organisation (Kuffler) and lateral inhibition (Hartline) emphasise local contrast; V1 neurons respond to oriented edges (Hubel and Wiesel).
- Rods hyperpolarise in light: rhodopsin → transducin → PDE6 → fall in cGMP → closure of CNG channels; single photons give ~1 pA responses (Baylor, Lamb and Yau, 1979).
- Hair cells use tip-link-gated channels, opening in microseconds; the cochlea maps frequency onto place (roughly logarithmically), and outer hair cells amplify with prestin-based electromotility. Sound localisation uses microsecond interaural time differences.
- Touch uses Piezo2 in four classes of mechanoreceptor; temperature uses TRP channels.
- Olfactory neurons each express one of hundreds of receptors and converge by receptor type onto glomeruli; taste cells are tuned to one quality each, which is fixed by the cell.
:::

## Exercises

::: exercise Decibels {level=1 check="60"}
A conversation produces a sound pressure of 20 mPa. What is its level in dB SPL (re 20 µPa)?
::: solution
$L = 20\log_{10}(0.020/20\times10^{-6}) = 20\log_{10}(1000) = 60$ dB.
:::
:::

::: exercise A Weber fraction {level=1 check="0.05"}
A subject can just distinguish a light of 200 units from one of 210 units against the same background, and one of 1000 from 1050. What is the Weber fraction?
::: solution
$10/200 = 0.05$ and $50/1000 = 0.05$: Weber's law holds over this range with $k = 0.05$.
:::
:::

::: exercise Matching receptors to sensations {level=1}
For each, name the receptor or transduction molecule: (a) the vibration of a phone in your pocket; (b) the cooling of mint; (c) the bitterness of quinine; (d) the burn of chilli; (e) the position of your finger with your eyes closed.
::: solution
(a) Pacinian corpuscles (high-frequency vibration), with Piezo2 as the transduction channel. (b) TRPM8 on cold-sensing endings. (c) T2R bitter receptors on bitter taste cells. (d) TRPV1 on nociceptive and thermosensitive endings. (e) Proprioceptors, mainly muscle spindles and joint and skin stretch receptors (Ruffini endings), which also depend on Piezo2.
:::
:::

::: exercise Probability of seeing {level=2 check="0.554"}
If a flash is seen only when at least 6 photons are absorbed, and the mean number absorbed is 6, what is the probability of seeing it (three decimal places)? Use the Poisson distribution.
::: solution
$P(X \ge 6) = 1 - \sum_{k=0}^{5}\mathrm{e}^{-6}6^k/k! = 1 - 0.446 = 0.554$. Even a flash whose average delivers exactly the required number is seen only a little over half the time, because of the randomness of photon arrival.
:::
:::

::: exercise Interpreting a receptive-field map {level=2}
A neuron in the visual system responds to a small spot of light at the centre of its receptive field with an increase in firing, to an annulus of light around the centre with a decrease, to a large spot covering both with a small increase, and to a bar at any orientation through the centre with an increase. (a) Where in the visual pathway might it be? (b) Predict its response to a dark spot at the centre. (c) How would the responses differ for a simple cell of V1?
::: solution
(a) The circular, orientation-independent ON-centre/OFF-surround organisation is typical of a retinal ganglion cell or a neuron of the lateral geniculate nucleus. (b) A dark spot at the centre reduces illumination of the excitatory centre, so the cell's firing falls below its background rate. (c) A simple cell would respond strongly to a bar or edge only at its preferred orientation and position, weakly or not at all to the orthogonal orientation, and would respond poorly to small spots and to diffuse light; its subregions would be elongated rather than concentric.
:::
:::

::: exercise A rod's signal-to-noise problem {level=2}
A toad rod has a dark current of 20 pA and a single-photon response of 1 pA. Its continuous dark noise has a standard deviation of about 0.1 pA, and it occasionally produces responses identical to single-photon responses spontaneously, at a rate of roughly one every two to three minutes at room temperature (thermal isomerisation of rhodopsin; Baylor, Matthews and Yau, 1980). (a) What fraction of the dark current does one photon close? (b) Why can't the absolute threshold of vision be set by a single photon absorbed anywhere in the retina? (c) How does requiring several photons within a short time in a small region help?
::: solution
(a) $1/20 = 5$ %. (b) A human retina has about $10^8$ rods; even at one spontaneous event per rod every few minutes, the retina as a whole produces hundreds of thousands of such events per second. A system that reported every single rod event would "see" flashes constantly. (c) Requiring coincidence of several events within a short integration time (about 0.1 s) and a small area makes the chance that spontaneous events alone reach the criterion very small, while a real flash produces the required events together. This is one explanation of why Hecht and colleagues found a threshold of several photons although each rod responds to one. It is a general principle: thresholds are set by noise, not only by the sensitivity of the receptors.
:::
:::

::: exercise Octaves on the basilar membrane {level=2 check="4.2"}
Using Greenwood's function from [[#ex-greenwood]], how many millimetres separate the places for 500 Hz and 1 kHz on a 35 mm human cochlea (one decimal place)? Compare with the separation for 4 and 8 kHz.
::: solution
For 500 Hz, $10^{2.1x} = 500/165.4 + 0.88 = 3.903$, so $x = \log_{10}3.903/2.1 = 0.2816$; for 1 kHz $x = 0.4002$. The separation is $0.1186\times35 = 4.2$ mm, slightly less than the 4.9 mm between 4 and 8 kHz. At low frequencies the map departs from a pure logarithm (the $-0.88$ term), so octaves are a little compressed near the apex.
:::
:::

::: exercise Smell by combination {level=3}
A mouse has about 1100 functional odorant receptors. Suppose, simplistically, that each odour is encoded by which subset of receptors is activated above threshold, with each odour activating exactly 3 receptors. (a) How many distinct odours could be encoded? (b) If each odour activated 10 receptors? (c) Give two biological reasons why the real number of discriminable odours must be far smaller. (d) Why is a combinatorial code nonetheless advantageous?
::: solution
(a) $\binom{1100}{3} = 1100\times1099\times1098/6 = 2.2\times10^8$. (b) $\binom{1100}{10} \approx 7\times10^{23}$. (c) Receptor responses are graded and noisy, not binary, so patterns that differ in one weakly activated receptor are easily confused; receptors are not independent, because chemically similar odorants activate overlapping sets; and odours in nature are mixtures, which produce overlapping patterns that the system must segment. Downstream circuits also limit how many patterns can be learned. (d) A combinatorial code allows a modest number of receptors to represent an open-ended range of molecules, including ones never encountered in evolution, and lets new associations be learned in the cortex rather than requiring a dedicated receptor for each meaningful odour.
:::
:::

::: exercise Contrast, not light {level=3}
A sheet of white paper in dim indoor light reflects less light to the eye than a sheet of black paper in bright sunlight, yet the white paper looks white and the black looks black. (a) Using the ideas of adaptation and centre–surround receptive fields, explain why. (b) Weber's law implies that the visual system signals the ratio $\Delta I/I$. Show that the contrast of an object, defined as $(I_\mathrm{object} - I_\mathrm{background})/I_\mathrm{background}$, is unchanged when the illumination is multiplied by any factor. (c) Why is this a good design for an animal?
::: solution
(a) Light adaptation adjusts the gain of photoreceptors and retinal circuits to the mean illumination, and centre–surround fields compare each region with its surroundings. The signal sent to the brain therefore depends on how much light a surface reflects relative to its surroundings, not on the absolute amount. White paper reflects about 80–90 % of the light falling on it and black paper about 5 %, whatever the illumination. (b) If illumination is multiplied by $a$, both intensities scale: $(aI_\mathrm{o} - aI_\mathrm{b})/(aI_\mathrm{b}) = (I_\mathrm{o} - I_\mathrm{b})/I_\mathrm{b}$. (c) What matters for an animal is the properties of objects (their reflectance, which identifies food, predators and surfaces), not the illumination, which varies by many orders of magnitude between night and day and from shade to sunlight. Signalling contrast extracts the invariant property and discards the variable one.
:::
:::
