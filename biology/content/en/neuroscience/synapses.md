On the night before Easter Sunday 1920, according to his own account, the pharmacologist Otto Loewi woke with the design of an experiment in his head, wrote it down, and in the morning could not read his notes. The next night the idea returned, and this time he went straight to his laboratory in Graz. He took two beating frog hearts, one with its vagus nerve attached, and kept them alive with salt solution. Stimulating the vagus slowed the first heart. When he transferred the fluid that had bathed the first heart to the second, the second heart slowed too. Something released by the nerve, which Loewi called *Vagusstoff*, carried the signal. It was later identified as acetylcholine.

Loewi's experiment, published in 1921, settled a long debate about whether nerves act on their targets electrically or chemically: at least some act chemically. This chapter is about the junctions at which neurons pass signals to other cells, the **synapses**. We look first at the simpler **electrical synapses**, then at **chemical synapses**: how an action potential arriving at a terminal causes transmitter to be released, in packets of fixed size; how transmitters act on receptors to produce postsynaptic potentials; and how a neuron adds up thousands of such potentials to decide whether to fire. The electrical tools, the chord-conductance equation and the cable, come from [[neuroscience/resting-potential]] and [[neuroscience/action-potential]].

## Electrical synapses

At an **electrical synapse** the membranes of two cells come within about 3.5 nm of each other and are linked by **gap junctions**: clusters of channels, each formed by two hemichannels, one contributed by each cell, that dock end to end across the gap. In vertebrates each hemichannel is a hexamer of **connexin** subunits (connexin 36 is the main neuronal one in mammals); in invertebrates the equivalent proteins are the unrelated **innexins**. The central pore, about 1.2–1.5 nm wide, lets ions and small molecules up to roughly 1 kDa pass directly from cytoplasm to cytoplasm.

Edwin Furshpan and David Potter discovered electrical transmission in 1959 at the giant motor synapse of the crayfish, where current passes readily from the presynaptic to the postsynaptic fibre but not the other way: the junction **rectifies**. Most electrical synapses, by contrast, conduct in both directions.

::: definition Coupling coefficient {#def-coupling}
The strength of an electrical synapse is described by the **coupling coefficient**, the ratio of the steady voltage change in the postsynaptic cell to that in the presynaptic cell when current is injected into the presynaptic cell:

$$
k = \frac{\Delta V_2}{\Delta V_1}.
$$

For two cells joined by a junctional conductance $g_\mathrm{j}$, where the second cell has input conductance $g_2$ to the outside, $k = g_\mathrm{j}/(g_\mathrm{j} + g_2)$.
:::

The formula follows from treating the junction and the second cell's membrane as a voltage divider: the current through the junction, $g_\mathrm{j}(V_1 - V_2)$, must leave through the second cell's membrane, $g_2V_2$. Coupling is strong when the junction conductance is large compared with the conductance of the postsynaptic cell, so electrical synapses work best onto small cells with high input resistance.

Electrical synapses are fast, with essentially no delay, and bidirectional. They are used where speed or synchrony matters: in escape circuits such as the crayfish giant fibres and the Mauthner cells of fishes, where club endings on the Mauthner cell are mixed electrical and chemical synapses; among the neurons of the mammalian inferior olive and the inhibitory interneurons of the cortex, which tend to fire in synchrony; and in the retina, where coupling among rod-driven neurons pools weak signals. Their limitations are as clear: they cannot amplify, cannot easily invert the sign of a signal, and have limited scope for modulation.

::: example Coupling between two neurons {#ex-coupling}
Two neurons are joined by gap junctions with a total conductance of 2 nS. The second neuron has an input resistance of 200 MΩ. (a) What is the coupling coefficient? (b) A 20 mV action potential-like depolarisation in the first cell lasts long enough to reach steady state. How large is the response of the second cell? (c) Why would the response to a real 1 ms action potential be smaller?
::: solution
(a) $g_2 = 1/200\ \mathrm{M\Omega} = 5$ nS. $k = 2/(2 + 5) = 0.29$.

(b) $\Delta V_2 = 0.29\times20 = 5.7$ mV.

(c) The second cell's membrane capacitance must be charged through the junction, with a time constant of the order of $C_2/(g_\mathrm{j} + g_2)$; a pulse much shorter than this is filtered, so a 1 ms spike produces a smaller, slower response than the steady-state coupling coefficient predicts. Electrical synapses are low-pass filters, transmitting slow signals better than fast ones.
:::
:::

## Chemical synapses

Most synapses in nervous systems are chemical. At a **chemical synapse** the presynaptic terminal and the postsynaptic membrane are separated by a cleft about 20 nm wide. The terminal contains **synaptic vesicles**, about 40 nm across, each filled with several thousand molecules of transmitter, clustered at specialised release sites, the **active zones**, directly opposite a dense matrix of receptors and scaffolding proteins in the postsynaptic membrane, the **postsynaptic density**.

::: definition Chemical synaptic transmission {#def-chemical}
Transmission at a chemical synapse proceeds in a sequence of steps:

1. an action potential depolarises the presynaptic terminal;
2. voltage-gated Ca²⁺ channels at the active zone open and Ca²⁺ enters;
3. Ca²⁺ binds a sensor protein on docked vesicles and triggers their fusion with the plasma membrane (**exocytosis**), releasing transmitter into the cleft;
4. transmitter diffuses across the cleft and binds **receptors** in the postsynaptic membrane, which open ion channels or start intracellular signalling;
5. the resulting change in postsynaptic conductance produces a **postsynaptic potential**, depolarising (excitatory, EPSP) or hyperpolarising or stabilising (inhibitory, IPSP);
6. transmitter is removed by enzymatic breakdown, by reuptake into cells, or by diffusion; vesicle membrane is retrieved by endocytosis and refilled.

The time from the arrival of the presynaptic action potential to the start of the postsynaptic current, the **synaptic delay**, is about 0.5 ms at 20–37 °C, most of it spent on Ca²⁺ channel opening and vesicle fusion.
:::

Chemical transmission is slower than electrical, but it has decisive advantages. It amplifies: one small terminal can release enough transmitter to depolarise a large muscle fibre. It can invert the sign of a signal: the same presynaptic depolarisation can excite one cell and inhibit another, depending on the receptor. And it offers many points of control, from the amount of Ca²⁺ entry to the number of receptors, which is where learning acts ([[neuroscience/plasticity-learning]]).

### The neuromuscular junction

The synapse between a motor neuron and a skeletal muscle fibre, the **neuromuscular junction** or **end-plate**, became the model chemical synapse because it is large, accessible and has a single, identifiable postsynaptic cell. Henry Dale, Wilhelm Feldberg and Marthe Vogt showed in 1936 that acetylcholine (ACh) is released when motor nerves are stimulated, and the end-plate potential (EPP) in the frog sartorius muscle became the object of a remarkable series of experiments by Bernard Katz and his colleagues in London.

The EPP is normally large, tens of millivolts, far more than needed to trigger a muscle action potential: transmission at the neuromuscular junction has a high **safety factor**. To study it, Katz and his colleagues reduced it, by lowering the external Ca²⁺ and raising Mg²⁺, which competes with Ca²⁺ entry.

## Quantal release

In 1952 Paul Fatt and Bernard Katz noticed that a resting frog end-plate produces small, spontaneous depolarisations of about 0.5 mV at random intervals, about one per second. These **miniature end-plate potentials** (mEPPs) had the same time course as the EPP, were blocked by curare (which blocks ACh receptors) and were enlarged by inhibitors of acetylcholinesterase. They were clearly caused by ACh, released in fixed amounts spontaneously.

José del Castillo and Katz then examined the EPP in low Ca²⁺, where it is small. Repeated stimulation of the nerve gave responses that fluctuated from trial to trial in steps: sometimes nothing at all (a **failure**), sometimes a response the size of one mEPP, sometimes twice that, and so on. In 1954 they proposed the **quantal hypothesis**.

::: definition The quantal hypothesis {#def-quantal}
Transmitter is released in multimolecular packets, **quanta**, of nearly constant size. Each quantum produces a postsynaptic response of amplitude $q$ (the **quantal size**, equal to the miniature potential). A nerve impulse releases a number of quanta that varies at random from trial to trial; its mean is the **quantal content** $m$, so the mean postsynaptic response is $\bar v = mq$.

Statistical model: if the terminal contains a large number $n$ of release sites, each releasing a quantum independently with a small probability $p$, the number of quanta released per impulse follows a **binomial** distribution with mean $m = np$, approximately a **Poisson** distribution when $p$ is small:

$$
P(k) = \frac{\mathrm{e}^{-m}m^k}{k!}.
$$ {#eq-poisson}
:::

The quantum was soon given a physical identity. Electron micrographs showed vesicles crowded in the terminals, and in 1973 John Heuser and Thomas Reese followed vesicle membrane through fusion and recycling at the frog neuromuscular junction; in 1979, freezing terminals within milliseconds of stimulation, they caught vesicles in the act of fusing, in numbers that matched the quantal content. One quantum is the content of one vesicle.

::: proposition Estimating the quantal content {#prop-quantal}
Under the Poisson model of [[#def-quantal]], the quantal content can be estimated in three independent ways from $N$ trials:

1. **from the mean**, $m = \bar v/q$, the mean response divided by the mean miniature;
2. **from failures**, since $P(0) = \mathrm{e}^{-m}$: if $n_0$ of the $N$ trials are failures, $m = \ln(N/n_0)$;
3. **from the variance**: for a Poisson distribution the variance equals the mean, so the coefficient of variation of the response is $\mathrm{CV} = 1/\sqrt{m}$, and $m = 1/\mathrm{CV}^2$ (neglecting the variability of $q$ itself).

Agreement between the three estimates is the test of the model. Assumptions: independent release of quanta, a constant probability over trials, a constant quantal size, and linear summation of quanta.
:::

::: example Quantal analysis at a frog end-plate {#ex-quantal}
In low Ca²⁺, 200 stimuli to a frog motor nerve give end-plate responses with the following numbers of quanta (counted by comparing each response with the mean miniature of 0.40 mV):

| quanta | 0 | 1 | 2 | 3 | 4 | 5 or more |
|---|---|---|---|---|---|---|
| trials | 37 | 63 | 51 | 31 | 13 | 5 |

The mean response amplitude is 0.68 mV. (a) Estimate $m$ from the mean and from the failures. (b) Use [[#eq-poisson]] to predict the expected number of trials in each class, and compare. (c) What would you conclude?
::: solution
(a) From the mean: $m = 0.68/0.40 = 1.70$. From failures: $m = \ln(200/37) = \ln5.41 = 1.69$. The two agree.

(b) With $m = 1.69$, $200\,\mathrm{e}^{-1.69}m^k/k!$ gives: $k = 0$: 37.0; 1: 62.4; 2: 52.7; 3: 29.6; 4: 12.5; 5 or more (by difference): 5.8. The observed counts, 37, 63, 51, 31, 13, 5, match closely.

(c) The data are consistent with Poisson release of quanta of fixed size, as del Castillo and Katz found. A χ² test (see [[biostatistics]] for the method) would confirm that the differences are well within chance. Note that the agreement of the failures estimate with the mean estimate is the more powerful check, because the two use different parts of the data.
:::
:::

::: widget distribution
dist: poisson
params: lambda=1.7
a: 0
b: 0
caption: The Poisson distribution of the number of quanta released per impulse, for a mean quantal content $\lambda = m$ (set the parameter with the slider). The shaded bar is the probability of a failure, $\mathrm{e}^{-m}$. At $m = 1.7$, about 18 % of impulses release nothing, as in [[#ex-quantal]]. Raise $m$ towards the slider's limit of 30 (a normal end-plate releases a hundred quanta or more) and the probability of failure becomes vanishingly small, which is the safety factor of neuromuscular transmission; at many central synapses $m$ is of order 1 and failures are common.
:::

At a normal frog end-plate, in physiological Ca²⁺, the quantal content is of the order of a hundred or more, and at mammalian end-plates it is comparable; failures never occur. At many synapses in the brain, by contrast, a single presynaptic action potential releases on average one vesicle or fewer from each active zone, and transmission fails a large fraction of the time. Central synapses are unreliable by design, and the reliability itself is one of the things that plasticity adjusts.

When $p$ is not small, the binomial model is needed. If the number of release sites is $n$ and each releases with probability $p$, the mean response is $npq$ and the variance $np(1-p)q^2$. Measuring the mean and variance at different release probabilities (by varying Ca²⁺) then gives estimates of $n$, $p$ and $q$ separately: this **variance–mean analysis** is widely used at central synapses.

## Calcium and the release machinery

The arrival of an action potential at the terminal is not enough by itself: in Ca²⁺-free solution there is no release. Katz and Ricardo Miledi showed in 1967 that Ca²⁺ must be present at the moment the impulse arrives, and they were able to evoke release by depolarising terminals in which Na⁺ and K⁺ channels were blocked, as long as Ca²⁺ was outside. Release follows Ca²⁺ entry, not the action potential itself.

Frederick Dodge and Rami Rahamimoff (1967) measured how the EPP at the frog end-plate depends on external Ca²⁺ concentration and found a steep relation, close to a fourth-power law at low concentration: doubling Ca²⁺ increased release about sixteenfold. They interpreted this as the cooperative binding of about four Ca²⁺ ions to a sensor before a vesicle can fuse.

::: widget plot
f: x^n/(x^n + K^n)
x: 0, 5
y: 0, 1.05
sliders: n=4:1:5:1; K=1.5:0.5:3:0.1
labels: \text{relative release}
caption: Relative transmitter release (vertical axis) against external Ca²⁺ concentration (horizontal axis, mmol L⁻¹) in a cooperative model in which $n$ Ca²⁺ ions must bind a sensor with half-saturating concentration $K$ (both set by the sliders). At low Ca²⁺, release rises as the $n$-th power of the concentration, so with $n = 4$ a doubling of Ca²⁺ increases release about sixteenfold; at high concentrations release saturates. Set $n = 1$ to see the gentle, non-cooperative curve. The steep, cooperative relation means that small changes in presynaptic Ca²⁺ entry have large effects on transmission, a lever used by many modulators.
:::

The molecular machinery of fusion was worked out in the 1990s from yeast genetics, biochemistry of membrane fusion and the study of neurotoxins.

- **SNARE proteins.** Synaptobrevin (VAMP) on the vesicle, and syntaxin and SNAP-25 on the plasma membrane, wind together into a tight four-helix bundle, the **SNARE complex**, that pulls the two membranes together and drives fusion. James Rothman's group identified them as the receptors for the general membrane-fusion machinery in 1993.
- **The Ca²⁺ sensor.** **Synaptotagmin**, a vesicle protein with two Ca²⁺-binding C2 domains, triggers fast, synchronous release; mice lacking synaptotagmin-1 lose fast release but keep slow, asynchronous release (Thomas Südhof and colleagues, 1994).
- **Priming and organisation.** Munc13 and Munc18 prepare vesicles for fusion, and active-zone scaffolds such as RIM hold Ca²⁺ channels within a few tens of nanometres of docked vesicles, so that each vesicle is exposed to a brief, very high local Ca²⁺ concentration (tens of micromolar) rather than to the much lower average in the terminal.

Rothman, Randy Schekman and Südhof shared the Nobel Prize in Physiology or Medicine in 2013 for work on vesicle traffic. The clostridial neurotoxins, tetanus and botulinum toxins, are proteases that cleave SNARE proteins and so block release; this is how they were used to identify the SNAREs' role.

After fusion, vesicle membrane is retrieved by clathrin-mediated endocytosis and faster modes, refilled with transmitter by vesicular transporters driven by a proton gradient, and returned to the pool. The cycle takes seconds to tens of seconds; a terminal holds only a few hundred vesicles, so sustained high-frequency firing depletes the pool, one source of **synaptic depression**. The opposite, **facilitation**, occurs when a second impulse arrives within tens of milliseconds of the first and finds residual Ca²⁺ still in the terminal, so that its release is enhanced. Both are forms of short-term plasticity that make synapses act as filters of spike trains.

::: example Transmitter concentration in the cleft {#ex-cleft}
A vesicle releases 4000 molecules of glutamate into a synaptic cleft. Model the cleft under the postsynaptic density as a disc of radius 150 nm and thickness 20 nm. (a) What is the concentration if the transmitter were confined to this disc? (b) Postsynaptic AMPA-type glutamate receptors have a half-maximal activation at about 0.5 mmol L⁻¹. What does that imply? (c) Why does the concentration fall within about a millisecond?
::: solution
(a) Volume $= \pi(150\times10^{-9})^2\times20\times10^{-9}\ \mathrm{m^3} = 1.41\times10^{-21}$ m³ $= 1.41\times10^{-18}$ L. Amount $= 4000/6.02\times10^{23} = 6.6\times10^{-21}$ mol. Concentration $= 6.6\times10^{-21}/1.41\times10^{-18} = 4.7\times10^{-3}$ mol L⁻¹, about 5 mmol L⁻¹.

(b) A single vesicle produces, briefly, a concentration well above that needed to activate the receptors under it, so receptors close to the release site are largely saturated. The size of a quantal response is then set by the number of receptors, not by the amount of transmitter: a way in which postsynaptic changes can alter synaptic strength.

(c) Glutamate diffuses out of the narrow cleft into the extracellular space in a time of order $x^2/D$, with $x \approx 150$ nm and $D \approx 0.3\ \mu\mathrm{m^2\,ms^{-1}}$, a fraction of a millisecond ([[neuroscience/neurons-glia#prop-diffusion]]), and it is bound and taken up by transporters on astrocytes and neurons. Measured peak concentrations of about 1 mmol L⁻¹ decay with time constants of about 1 ms.
:::
:::

## Transmitters and receptors

A substance is accepted as a **neurotransmitter** at a synapse when it is synthesised and stored in the presynaptic neuron, released by a Ca²⁺-dependent mechanism on stimulation, acts on specific receptors on the postsynaptic cell, and is removed by a specific mechanism; and when applying it mimics the effect of stimulating the presynaptic neuron. Several dozen substances meet these criteria at some synapse.

| class | examples | typical action |
|---|---|---|
| acetylcholine | ACh | neuromuscular junction, autonomic ganglia, many brain circuits; insect CNS (main excitatory transmitter) |
| amino acids | glutamate | main fast excitatory transmitter of the vertebrate CNS |
| | GABA, glycine | main fast inhibitory transmitters (glycine mainly in spinal cord and brainstem) |
| monoamines | dopamine, noradrenaline, serotonin (5-HT), histamine, octopamine (invertebrates) | modulatory, mostly through G-protein-coupled receptors |
| purines | ATP, adenosine | co-released with other transmitters; P2X and P2Y receptors |
| neuropeptides | substance P, enkephalins, oxytocin, vasopressin, neuropeptide Y, FMRFamide (invertebrates) | modulatory, from dense-core vesicles; slow and often long-range |
| gases and lipids | nitric oxide, endocannabinoids | made on demand, not stored; often retrograde (postsynaptic to presynaptic) |

The same transmitter can do very different things at different synapses, because its effect is determined by the receptor. Receptors come in two families.

::: definition Ionotropic and metabotropic receptors {#def-receptors}
An **ionotropic receptor** (ligand-gated ion channel) is itself an ion channel that opens when transmitter binds. Its effects begin within a fraction of a millisecond and last milliseconds. The main families are the pentameric **Cys-loop receptors** (nicotinic ACh, GABA_A, glycine and 5-HT₃ receptors), the tetrameric **ionotropic glutamate receptors** (AMPA, kainate and NMDA types), and the trimeric **P2X** ATP receptors.

A **metabotropic receptor** is a G-protein-coupled receptor (or, more rarely, a receptor enzyme) that acts through intracellular signalling ([[cell-biology/cell-signalling]]): G-protein subunits open or close ion channels directly, or second messengers such as cAMP, IP₃ and Ca²⁺ activate kinases. Effects begin in tens of milliseconds and can last seconds to minutes or, through gene expression, much longer. Examples are the muscarinic ACh receptors, metabotropic glutamate receptors, GABA_B receptors and the receptors for dopamine, noradrenaline, most serotonin receptors and neuropeptides.
:::

Loewi's *Vagusstoff* acts through a metabotropic receptor: ACh binds M2 muscarinic receptors on pacemaker cells of the heart, and the βγ subunits of the activated G protein open K⁺ channels (GIRK channels), slowing the heartbeat. At the neuromuscular junction the same ACh acts on nicotinic receptors, which are ionotropic and excite. One transmitter, two receptors, opposite effects on two kinds of muscle.

The nicotinic receptor was the first receptor to be purified (from the electric organs of rays such as *Torpedo*, which are modified neuromuscular junctions packed with receptors), the first ion channel whose single-channel currents were recorded (Neher and Sakmann, 1976), and one of the first whose structure was seen, by cryo-electron microscopy of *Torpedo* membranes in the laboratory of Nigel Unwin from the late 1980s onwards. Its five subunits surround a central pore lined by one helix from each.

::: quiz
At a synapse, release of a transmitter onto a cell causes, within 1 ms, a brief increase in membrane conductance that reverses at −70 mV. In another cell the same transmitter causes, after 50 ms, a slow hyperpolarisation lasting several hundred milliseconds that is blocked by inhibitors of G proteins. What is the most likely explanation?
- [ ] The transmitter is different at the two synapses.
- [x] The first cell has an ionotropic (probably Cl⁻-permeable) receptor, and the second a metabotropic receptor that opens K⁺ channels through a G protein.
- [ ] Both receptors are ionotropic, but the second is further from the release site.
- [ ] The second cell has a lower resting potential.
::: solution
The time course and the G-protein dependence identify the second response as metabotropic, for example GABA_B receptors opening GIRK channels. The first is fast, with a reversal potential near $E_\mathrm{Cl}$, typical of an ionotropic GABA_A or glycine receptor. Distance in the cleft could not add 50 ms of delay: diffusion across 20 nm takes microseconds.
:::
:::

## Postsynaptic potentials

The effect of an ionotropic receptor on the postsynaptic membrane follows directly from the chord-conductance picture of [[neuroscience/resting-potential#prop-chord]].

::: proposition Synaptic current and reversal potential {#prop-synaptic}
When transmitter opens a synaptic conductance $g_\mathrm{syn}$ with reversal potential $E_\mathrm{syn}$, the synaptic current is

$$
I_\mathrm{syn} = g_\mathrm{syn}\,(V_\mathrm{m} - E_\mathrm{syn}),
$$ {#eq-syn}

and in a compact cell with resting conductance $g_\mathrm{rest}$ and resting potential $V_\mathrm{rest}$, the steady potential during the conductance change is

$$
V = \frac{g_\mathrm{rest}V_\mathrm{rest} + g_\mathrm{syn}E_\mathrm{syn}}{g_\mathrm{rest} + g_\mathrm{syn}}.
$$ {#eq-psp}

A synapse is **excitatory** if $E_\mathrm{syn}$ lies above the threshold for an action potential, so that it pushes the membrane towards firing, and **inhibitory** if $E_\mathrm{syn}$ lies below threshold, even if above the resting potential. Assumptions: an isopotential cell and an ohmic synaptic conductance, with the potential measured once the membrane capacitance has charged.
:::

The ACh receptor channel at the end-plate is permeable to both Na⁺ and K⁺, almost equally, and so its reversal potential lies between $E_\mathrm{Na}$ and $E_\mathrm{K}$. With equal permeabilities and mammalian concentrations, the GHK equation gives $26.7\ln[(5 + 145)/(140 + 15)] \approx -1$ mV; measured values are close to 0 mV. Katz and colleagues found the end-plate current reversing near −15 to 0 mV in frog muscle, which first showed that the receptor is a channel for cations, not a sodium channel. AMPA-type glutamate receptors, also non-selective cation channels, reverse near 0 mV too. GABA_A and glycine receptors are Cl⁻ channels, reversing at $E_\mathrm{Cl}$, typically −65 to −80 mV in mature neurons.

::: example Excitation and shunting inhibition {#ex-shunt}
A neuron has a resting conductance of 10 nS and rests at −70 mV; its threshold is −55 mV. (a) An excitatory synapse opens 1 nS of conductance with $E_\mathrm{syn} = 0$ mV. What steady depolarisation does it produce? (b) At the same time, an inhibitory synapse opens 10 nS of Cl⁻ conductance with $E_\mathrm{Cl} = -70$ mV. What depolarisation does the excitatory input now produce? (c) Does the inhibitory input on its own change the membrane potential?
::: solution
(a) From [[#eq-psp]]: $V = (10\times(-70) + 1\times0)/11 = -63.6$ mV, a depolarisation of 6.4 mV.

(b) Adding the Cl⁻ conductance: $V = (10\times(-70) + 10\times(-70) + 1\times0)/21 = -66.7$ mV, a depolarisation of only 3.3 mV. The excitatory input has been halved.

(c) No: on its own it moves the potential towards $-70$ mV, which is where it already is. Its effect is not to hyperpolarise but to **shunt**: by increasing the total conductance it reduces the voltage change produced by any other current. This **shunting inhibition** is invisible as a potential change at rest, yet it is powerful, and it is the main form of GABA_A inhibition when $E_\mathrm{Cl}$ is close to the resting potential.
:::
:::

::: warning "Inhibitory synapses always hyperpolarise"
Inhibition is defined by the effect on firing, not by the sign of the voltage change. A Cl⁻ conductance with $E_\mathrm{Cl}$ below the resting potential hyperpolarises; one with $E_\mathrm{Cl}$ equal to it produces no voltage change at all but still inhibits by shunting; and one with $E_\mathrm{Cl}$ slightly above rest but below threshold produces a small depolarisation that is nevertheless inhibitory, because it clamps the membrane below threshold. Only when $E_\mathrm{Cl}$ is above threshold, as in some immature neurons ([[neuroscience/resting-potential]]), does GABA excite.
:::

### Removing the transmitter

Transmission is brief only if the transmitter is removed quickly. At cholinergic synapses **acetylcholinesterase**, anchored in the cleft, hydrolyses ACh to choline and acetate at a rate of about $10^4$ molecules per second per enzyme molecule, among the fastest enzymes known; choline is taken back up into the terminal. Amino acids and monoamines are removed by **transporters** in the presynaptic terminal and in glia, which couple uptake to Na⁺ entry. Many drugs act here: inhibitors of the serotonin transporter, for example, prolong the action of released serotonin. Their clinical use belongs to [Medicine Atlas: pharmacology](/learn/medicine/course.php?c=pharmacology) and [Medicine Atlas: synapses](/learn/medicine/lesson.php?c=physiology&l=synapses). Neuropeptides are removed more slowly, by extracellular peptidases and diffusion, which is one reason why they act over longer times and distances.

## Synaptic integration

A typical neuron in the vertebrate brain receives thousands of synapses, and a cerebellar Purkinje cell up to about two hundred thousand. A single excitatory synapse onto a cortical pyramidal cell typically produces an EPSP of well under 1 mV at the soma, while the soma must be depolarised by 10–20 mV to fire. The neuron must therefore add up many inputs, and how it does so is its computation.

::: definition Summation {#def-summation}
**Temporal summation** is the addition of postsynaptic potentials that arrive at the same synapse, or nearby, in quick succession, before the earlier ones have decayed; its window is set by the duration of the postsynaptic potential and hence partly by the membrane time constant $\tau$. **Spatial summation** is the addition of potentials arising at different synapses at the same time; its effectiveness depends on how much each potential attenuates as it spreads to the trigger zone, governed by the length constant $\lambda$ of the dendrites. Excitatory and inhibitory potentials sum algebraically, to a first approximation; but because each is a conductance change, summation is sublinear when the conductances are large, as [[#ex-shunt]] shows.
:::

The shape of a single postsynaptic potential is often approximated by an **alpha function**, $v(t) = v_\mathrm{max}(t/t_\mathrm{p})\,\mathrm{e}^{1 - t/t_\mathrm{p}}$, which rises to its peak $v_\mathrm{max}$ at time $t_\mathrm{p}$ and then decays. The figure adds two such potentials arriving at an interval you can change.

::: widget plot
f: (x/tp)*exp(1 - x/tp); heaviside(x - d)*((x - d)/tp)*exp(1 - (x - d)/tp); (x/tp)*exp(1 - x/tp) + heaviside(x - d)*((x - d)/tp)*exp(1 - (x - d)/tp)
x: 0, 60
y: 0, 2.2
sliders: d=5:0:40:1; tp=4:1:15:0.5
labels: \text{first EPSP}; \text{second EPSP}; \text{sum}
hlines: 1.5
caption: Temporal summation of two identical EPSPs (vertical axis, in units of the peak of one EPSP) against time (horizontal axis, ms). The first EPSP starts at 0 and the second after an interval $d$ (slider); both have the time to peak $t_\mathrm{p}$ (slider). The horizontal line at 1.5 stands for a threshold. With $d = 5$ ms and $t_\mathrm{p} = 4$ ms the sum crosses it; lengthen the interval and the summed peak falls below threshold. Lengthen $t_\mathrm{p}$, as a longer membrane time constant would, and the window for summation widens. The model adds the potentials linearly, which is a good approximation only for small conductance changes.
:::

Where inputs land matters as much as when. An EPSP generated on a distal dendrite is attenuated and slowed by the time it reaches the soma, while one near the soma arrives almost undiminished. Inhibitory synapses tend to cluster on the soma and the axon initial segment, where they can veto the output of the whole cell; the chandelier cells of the cortex make GABAergic synapses exclusively on the initial segments of pyramidal cells. Dendrites are not purely passive either. Many carry voltage-gated Na⁺, Ca²⁺ and NMDA-receptor conductances that can generate local **dendritic spikes**, so that clustered inputs on one branch can be amplified nonlinearly, and action potentials initiated at the axon can propagate back into the dendrites, signalling to the synapses that the cell has fired, a signal used in plasticity ([[neuroscience/plasticity-learning]]).

::: application Synapses as drug targets
Because transmission involves so many molecular steps, synapses are the targets of most drugs that act on the nervous system, and of many toxins and drugs of abuse. Curare and α-bungarotoxin block nicotinic receptors at the neuromuscular junction; anticholinesterases prolong ACh action; benzodiazepines enhance GABA_A receptors; many antidepressants block monoamine transporters; and opioids act on G-protein-coupled opioid receptors. In myasthenia gravis, autoantibodies reduce the number of ACh receptors at the end-plate and so reduce the safety factor of transmission. The clinical pharmacology of these agents is in [Medicine Atlas: pharmacology](/learn/medicine/course.php?c=pharmacology) and the disorders in [Medicine Atlas: neuromuscular disorders](/learn/medicine/lesson.php?c=nervous-system&l=neuromuscular).
:::

::: history
Emil du Bois-Reymond speculated in 1877 that nerves might excite muscles either electrically or by releasing a chemical. Thomas Elliott suggested in 1904 that sympathetic nerves release an adrenaline-like substance, and Otto Loewi demonstrated chemical transmission in the frog heart in 1921; Henry Dale, who with Wilhelm Feldberg and Marthe Vogt showed ACh release at the neuromuscular junction in 1936, shared the Nobel Prize with Loewi that year. John Eccles, a champion of electrical transmission, recorded inhibitory postsynaptic potentials intracellularly in cat spinal motor neurons in 1952 and became convinced that central transmission is chemical. Fatt and Katz described miniature end-plate potentials in 1952 and del Castillo and Katz the quantal hypothesis in 1954; Katz shared the Nobel Prize in 1970 with Ulf von Euler and Julius Axelrod, who had worked on noradrenaline release and reuptake. Furshpan and Potter described electrical transmission in 1959, Dodge and Rahamimoff the Ca²⁺ cooperativity of release in 1967, and Heuser and Reese the vesicle cycle in the 1970s. The SNAREs and synaptotagmin were identified in the 1990s by the groups of Rothman, Scheller, Jahn, Südhof and others.
:::

## Where this leads

Synapses connect neurons into circuits. In [[neuroscience/sensory-systems]] and [[neuroscience/motor-systems]] we follow signals from receptors through synapses to muscles; in [[neuroscience/plasticity-learning]] we see how synaptic strength changes with experience.

::: summary
- Electrical synapses are gap junctions of connexins (vertebrates) or innexins (invertebrates); they are fast and usually bidirectional, with strength given by the coupling coefficient $k = g_\mathrm{j}/(g_\mathrm{j} + g_2)$.
- At chemical synapses an action potential opens presynaptic Ca²⁺ channels; Ca²⁺ binds synaptotagmin and SNARE proteins drive vesicle fusion; transmitter crosses a 20 nm cleft in microseconds; the synaptic delay is about 0.5 ms.
- Release is quantal (del Castillo and Katz, 1954): one vesicle gives one quantum, and the number released per impulse is binomial or, for small $p$, Poisson; $m$ can be estimated from the mean, the failures ($m = \ln(N/n_0)$) or the variance.
- Release depends steeply on Ca²⁺ (roughly a fourth-power law at low concentration).
- Ionotropic receptors are ligand-gated channels (fast); metabotropic receptors act through G proteins and second messengers (slow, modulatory). The receptor, not the transmitter, determines the effect.
- The synaptic current is $g_\mathrm{syn}(V - E_\mathrm{syn})$; a synapse excites if $E_\mathrm{syn}$ is above threshold and inhibits if it is below, by hyperpolarisation or shunting.
- Neurons integrate inputs by temporal and spatial summation, shaped by $\tau$ and $\lambda$, dendritic location and active dendritic conductances.
:::

## Exercises

::: exercise The method of failures {level=1 check="2.3"}
At a central synapse, 100 presynaptic stimuli produce 10 failures. Assuming Poisson release, estimate the mean quantal content to one decimal place.
::: solution
$m = \ln(100/10) = \ln10 = 2.3$.
:::
:::

::: exercise Calcium cooperativity {level=1 check="81"}
If release is proportional to the fourth power of the external Ca²⁺ concentration over the range studied, by what factor does it increase when Ca²⁺ is raised from 0.5 to 1.5 mmol L⁻¹?
::: solution
$(1.5/0.5)^4 = 3^4 = 81$.
:::
:::

::: exercise A reversal potential {level=1}
A ligand-gated channel is equally permeable to Na⁺ and K⁺ and impermeable to other ions. Using the GHK equation at 37 °C with K⁺ 140 inside and 5 outside, Na⁺ 15 inside and 145 outside (mmol L⁻¹), calculate its reversal potential. Is opening it excitatory?
::: solution
$V_\mathrm{rev} = 26.7\ln[(5 + 145)/(140 + 15)] = 26.7\ln(0.968) = -0.9$ mV. Since this is far above a typical threshold of about −55 mV, the channel drives the membrane towards firing: it is excitatory.
:::
:::

::: exercise Variance–mean analysis {level=2 check="10"}
At a synapse the postsynaptic currents are recorded at two Ca²⁺ concentrations. At low Ca²⁺ the mean is 20 pA and the variance 180 pA²; at high Ca²⁺ the mean is 60 pA and the variance 300 pA². Assuming binomial release with $n$ sites, probability $p$ and quantal size $q$ (so that mean $= npq$ and variance $= np(1-p)q^2$), find $n$, $q$ and $p$ at each concentration.
::: hint
Show that the variance can be written as $qI - I^2/n$, where $I$ is the mean, and write one such equation for each concentration.
:::
::: solution
Variance $= np(1-p)q^2 = (npq)q - (npq)^2/n = qI - I^2/n$. Then $180 = 20q - 400/n$ and $300 = 60q - 3600/n$. From the first, $q = 9 + 20/n$; substituting in the second, $300 = 540 + 1200/n - 3600/n$, so $2400/n = 240$ and $n = 10$. Then $q = 11$ pA, and $p = I/(nq)$: $20/110 = 0.18$ at low Ca²⁺ and $60/110 = 0.55$ at high Ca²⁺. Raising Ca²⁺ increased the release probability, not the number of sites or the quantal size, as expected.
:::
:::

::: exercise Electrical coupling and cell size {level=2}
A gap junction of 1 nS couples a small neuron (input resistance 500 MΩ) to a large one (input resistance 20 MΩ). Calculate the coupling coefficient in each direction and explain the asymmetry, even though the junction itself is symmetrical.
::: solution
From the small cell to the large: $g_2 = 1/20\ \mathrm{M\Omega} = 50$ nS, $k = 1/(1 + 50) = 0.020$. From the large cell to the small: $g_2 = 1/500\ \mathrm{M\Omega} = 2$ nS, $k = 1/(1 + 2) = 0.33$. Junctional current flowing into the large, leaky cell escapes through its large conductance and produces little voltage change, whereas the same current flowing into the small cell produces a large one. Electrical synapses can therefore be functionally asymmetric because of the cells they connect, without any rectification in the channels.
:::
:::

::: exercise Identifying a transmitter {level=2}
A researcher suspects that a newly described neuron in a snail releases serotonin onto a muscle. Describe the experiments needed to establish that serotonin is the transmitter, using the criteria in this chapter.
::: solution
Show (1) that the neuron contains serotonin and the enzyme that makes it (tryptophan hydroxylase), for example by immunostaining or by measuring serotonin in isolated neurons; (2) that stimulating the neuron releases serotonin in a Ca²⁺-dependent way, detected for example by electrochemistry or by collecting the bathing fluid; (3) that applying serotonin to the muscle reproduces the response to stimulating the neuron, with the same time course, reversal potential and dependence on ions; (4) that blocking serotonin receptors on the muscle, or depleting serotonin from the neuron, abolishes the response to neuronal stimulation; and (5) that there is a removal mechanism, such as a serotonin transporter, whose block prolongs the response. No single criterion is sufficient; co-release of a peptide should also be considered.
:::
:::

::: exercise Interpreting quantal data {level=2}
At two synapses the mean EPSP amplitude is 1.0 mV. At synapse A the miniature EPSP is 0.2 mV and 1 % of trials fail; at synapse B the miniature is 1.0 mV and 37 % of trials fail. (a) Estimate the quantal content of each from the mean and from the failures. (b) Which synapse is more reliable, and why might a nervous system use each kind?
::: solution
(a) A: from the mean, $m = 1.0/0.2 = 5$; from failures, $m = \ln(1/0.01) = 4.6$. B: from the mean $m = 1.0$; from failures, $m = \ln(1/0.37) = 1.0$. Both are consistent with Poisson release. (b) A transmits on 99 % of trials with a graded response; B fails on 37 % of trials and otherwise releases mostly one quantum. A suits a relay that must follow every impulse; B is typical of the many small synapses in the cortex, where unreliability saves energy and transmitter, and where the release probability can be adjusted by plasticity and modulation. The same mean response can hide very different statistics.
:::
:::

::: exercise A shunt on a dendrite {level=3}
Explain, using the cable equation of [[neuroscience/action-potential#prop-cable]], why an inhibitory shunting synapse placed on the dendritic path between an excitatory synapse and the soma reduces the excitatory potential at the soma more than the same inhibitory synapse placed on a different dendrite, or beyond the excitatory synapse at the tip. What does this suggest about the computational possibilities of dendrites?
::: solution
A shunting conductance lowers the local membrane resistance, which locally shortens the effective length constant and drains current that would otherwise flow along the dendrite. Current from the excitatory synapse must pass the shunt on its way to the soma if the shunt lies on the path, so a large fraction of it leaks out there. If the shunt is on another branch, it affects the excitatory potential only through its smaller effect on the total input conductance of the soma; if it lies distal to the excitatory input, little of the excitatory current flows past it at all. This location dependence (analysed by Wilfrid Rall and by Christof Koch, Tomaso Poggio and Vincent Torre in the 1980s) means that inhibition can veto specific inputs rather than the whole cell, so that a dendritic tree can implement something like logical AND-NOT operations on its inputs, and different branches can act as partly independent computational subunits.
:::
:::

::: exercise Why quanta? {level=3}
Suppose transmitter were released continuously, as a smoothly graded amount proportional to presynaptic Ca²⁺ entry, rather than in vesicles. (a) What advantages does packaging in vesicles provide? (b) What cost does it impose? (c) Graded, non-spiking release does occur at some synapses, such as photoreceptor and bipolar-cell synapses in the retina. How do those synapses achieve graded output while still using vesicles?
::: solution
(a) Vesicles concentrate transmitter (to about 100 mmol L⁻¹ or more inside), so that a single fusion event produces a high concentration on the postsynaptic receptors, above their activation threshold, in microseconds; they allow transmitter to be stored ready for release, locked away from degradation and from leaking out; and they place release under tight temporal control by Ca²⁺. (b) The cost is noise: release is stochastic, and at synapses with few release sites a large fraction of impulses fail. Building, filling and recycling vesicles also costs energy. (c) Ribbon synapses of photoreceptors and bipolar cells release vesicles continuously at a rate that is graded with the membrane potential, from a large pool tethered to a specialised structure, the synaptic ribbon. Graded output is achieved by modulating the rate of a stream of quanta rather than the size of each, much as a rate code turns all-or-none spikes into a graded signal.
:::
:::
