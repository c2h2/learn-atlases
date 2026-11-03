In 1953 a 27-year-old man known for the rest of his life in the scientific literature as H.M. (Henry Molaison, whose name was published after his death in 2008) underwent an operation in Hartford, Connecticut, to relieve severe epilepsy. The surgeon, William Scoville, removed the inner parts of both temporal lobes, including most of the hippocampus on each side. The seizures became less frequent, but H.M. could no longer form lasting memories of new facts or events. He could hold a conversation, and could keep a number in mind by rehearsing it, but a few minutes after a distraction he had forgotten the conversation and the person he had been talking to. His intelligence, his language and his memories of childhood were largely intact. Brenda Milner, who studied him for decades, found that he could nevertheless learn new skills: over three days he became fluent at drawing a star while looking at his hand in a mirror, while denying each day that he had ever done the task before.

H.M. showed that memory is not one thing and that different kinds of memory depend on different brain systems. What do they share at the cellular level? The idea that has guided neuroscience for more than a century, proposed in outline by Ramón y Cajal and stated sharply by Donald Hebb, is that learning changes the strength of synapses. This chapter follows that idea from its simplest form, in the reflexes of a sea slug, to long-term potentiation in the mammalian hippocampus, the rules that relate synaptic change to the timing of activity, the learning signals carried by dopamine, and the memory systems of the brain. Synaptic transmission is from [[neuroscience/synapses]]; the behavioural study of learning, from habituation to cognition, is in [[behaviour/learning-cognition]].

## Kinds of learning and memory

::: definition Forms of learning {#def-learning}
- **Non-associative learning** changes the response to a single kind of stimulus. In **habituation** the response to a repeated, harmless stimulus declines; in **sensitisation** a strong or noxious stimulus increases the response to many subsequent stimuli.
- **Associative learning** links events. In **classical (Pavlovian) conditioning** an initially neutral **conditioned stimulus** (CS) comes to elicit a response after being paired with a biologically significant **unconditioned stimulus** (US). In **operant (instrumental) conditioning** the probability of an action changes according to its consequences.
- **Declarative** (explicit) memory is memory for facts (semantic) and events (episodic) that can be consciously recalled; in mammals it depends on the hippocampus and surrounding medial temporal lobe. **Non-declarative** (implicit) memory includes skills and habits (striatum, cerebellum), priming (cortex), simple classical conditioning (cerebellum, amygdala) and non-associative learning (reflex pathways).
- **Short-term memory** lasts seconds to minutes and does not require new protein synthesis; **long-term memory** lasts hours to a lifetime and requires gene expression and protein synthesis during a period of **consolidation** after learning.
:::

The dissociation in H.M., intact skill learning with abolished declarative learning, was published by Scoville and Milner in 1957 and by Milner in 1962 and was confirmed in other patients and in animals with lesions of the same structures. The hippocampus is needed to form new declarative memories but not, it seems, to store old ones indefinitely, since H.M. kept memories from long before his operation. Memories are thought to be transferred gradually to the neocortex, a process called **systems consolidation**.

## Hebb's postulate

In *The Organization of Behavior* (1949) the Canadian psychologist Donald Hebb proposed a rule by which experience could shape neural connections.

::: definition Hebb's postulate {#def-hebb}
"When an axon of cell A is near enough to excite a cell B and repeatedly or persistently takes part in firing it, some growth process or metabolic change takes place in one or both cells such that A's efficiency, as one of the cells firing B, is increased." In its simplest mathematical form, the change in the weight $w$ of a synapse is proportional to the product of presynaptic activity $x$ and postsynaptic activity $y$:

$$
\Delta w = \eta\,x\,y,
$$ {#eq-hebb}

where $\eta$ is a small learning rate.
:::

Hebb's rule is **local** (it uses only information available at the synapse), **associative** (it depends on coincidence of activity on both sides), and **unsupervised** (no teacher tells the synapse what is right). It can explain how correlated inputs come to drive the same neuron, as in the development of ocular dominance ([[neuroscience/neural-development]]), and how a group of neurons that are repeatedly active together could become a strongly interconnected **cell assembly** that completes a pattern from a fragment.

The pure rule has a flaw: weights can only grow, and growing weights increase postsynaptic activity, which increases growth further. Real learning rules must also weaken synapses or normalise them. One elegant solution was found by the Finnish mathematician Erkki Oja in 1982: subtract a decay term proportional to the square of the postsynaptic activity, $\Delta w_i = \eta\,y\,(x_i - y\,w_i)$. With this rule the weight vector of a linear neuron stays at unit length and turns to point along the direction of greatest variance of its inputs, the first **principal component**. A Hebbian neuron with normalisation extracts the most prominent correlation in its input, without being told what to look for.

```python
import math, random

# Oja's rule: a single linear neuron y = w . x learning from correlated inputs.
random.seed(1)
eta = 0.002                      # learning rate
w = [0.3, -0.8]                  # initial synaptic weights (arbitrary)

def sample():
    """Two inputs with correlation 0.8 and unit variance (zero mean)."""
    a, b = random.gauss(0, 1), random.gauss(0, 1)
    return [a, 0.8 * a + 0.6 * b]

for step in range(50000):
    x = sample()
    y = w[0] * x[0] + w[1] * x[1]                # postsynaptic activity
    for i in range(2):                           # Hebbian term minus decay
        w[i] += eta * y * (x[i] - y * w[i])

norm = math.hypot(w[0], w[1])
angle = math.degrees(math.atan2(w[1], w[0])) % 180     # an axis: sign does not matter
print(f"|w| = {norm:.3f}, direction = {angle:.1f} degrees")
# |w| = 1.000, direction = 45.3 degrees
# The principal axis of the input covariance [[1, 0.8], [0.8, 1]] lies at 45 degrees.
```

## Learning in a simple system: *Aplysia*

To find the cellular basis of learning, Eric Kandel turned in the 1960s to the sea hare *Aplysia californica*, a large marine mollusc with about 20,000 neurons, many of them large, pigmented and identifiable from animal to animal. A gentle touch to its siphon makes it withdraw its siphon and gill, a defensive reflex mediated in part by a monosynaptic connection from about two dozen siphon sensory neurons to six gill motor neurons, plus interneurons. The reflex shows habituation, sensitisation and classical conditioning, and each could be traced to changes at identified synapses.

**Habituation.** Repeated touches to the siphon make the withdrawal weaker. Vincent Castellucci and Kandel showed in 1974, using quantal analysis at the sensory-to-motor synapse, that the synaptic depression underlying it is presynaptic: fewer quanta are released per impulse, while the quantal size and the motor neuron's sensitivity are unchanged.

::: example Is habituation presynaptic? {#ex-habituation}
Illustrative values of the kind Castellucci and Kandel measured: before habituation, the monosynaptic EPSP from a siphon sensory neuron to a gill motor neuron has a mean amplitude of 10 mV with a coefficient of variation (CV) of 0.22 across trials, and the spontaneous miniature EPSP in the motor neuron is 0.5 mV. After 15 stimuli at 10 s intervals, the mean EPSP is 2.5 mV with a CV of 0.45, and the miniature is still 0.5 mV. (a) Estimate the quantal content before and after, from the mean and from the CV, using [[neuroscience/synapses#prop-quantal]]. (b) Is the change pre- or postsynaptic? (c) Why is the agreement of the two estimates important?
::: solution
(a) Before: from the mean, $m = 10/0.5 = 20$; from the CV, $m = 1/0.22^2 = 20.7$. After: from the mean, $m = 2.5/0.5 = 5$; from the CV, $m = 1/0.45^2 = 4.9$.

(b) The quantal size is unchanged, so the postsynaptic response to a quantum of transmitter (receptor number and sensitivity) has not changed; the number of quanta released per impulse has fallen fourfold. The depression is presynaptic.

(c) The CV method uses only the trial-to-trial fluctuations, which depend on the statistics of release and not on the quantal size; the mean method depends on the measured miniature. Two independent methods giving the same fourfold fall make it unlikely that the result is an artefact of either, for example of miniatures recorded from a different set of synapses.
:::
:::

**Sensitisation.** A shock to the tail strengthens the withdrawal reflex to a subsequent siphon touch. The tail shock excites **facilitatory interneurons** that release serotonin (5-HT) onto the terminals of the siphon sensory neurons. Serotonin acts through a G-protein-coupled receptor to raise cAMP, which activates protein kinase A (PKA). PKA phosphorylates K⁺ channels and reduces their current, which broadens the sensory neuron's action potential, allowing more Ca²⁺ to enter at each impulse; PKA and protein kinase C also act more directly on the release machinery. Each impulse then releases more transmitter: **presynaptic facilitation**.

**Long-term sensitisation.** A single tail shock produces sensitisation lasting minutes; four or five shocks spaced over an hour produce sensitisation lasting days. The long-term form requires new gene expression. With repeated stimulation, PKA moves into the nucleus of the sensory neuron and phosphorylates the transcription factor **CREB** (cAMP response element-binding protein), which switches on genes needed for the growth of new presynaptic terminals. In cultured sensory and motor neurons, five spaced applications of serotonin produce facilitation lasting more than a day, and inhibitors of protein or RNA synthesis applied during training block it while leaving short-term facilitation intact (Piergiorgio Montarolo, Kandel, Samuel Schacher and colleagues, 1986). Long-term memory was found to involve the growth of new synaptic connections, roughly doubling the number of sensory-neuron terminals in sensitised animals (Craig Bailey and Mary Chen, 1983).

**Classical conditioning.** If a weak siphon touch (CS) is paired with a tail shock (US) repeatedly, the response to the siphon touch grows more than it does with unpaired shocks. At the cellular level, facilitation of the sensory neuron is enhanced when the sensory neuron fires just before the serotonin arrives: Ca²⁺ entering during its spikes boosts the serotonin-activated adenylyl cyclase, which thus acts as a **coincidence detector** (Robert Hawkins, Kandel and colleagues; Edgar Walters and John Byrne; both 1983). Later work showed that a postsynaptic, NMDA-receptor-like mechanism contributes too.

Kandel shared the Nobel Prize in Physiology or Medicine in 2000. The *Aplysia* work established three principles that hold widely: learning changes the strength of existing synapses; short-term memory uses covalent modification of existing proteins; and long-term memory requires gene expression, new protein synthesis and structural change. The same cAMP–PKA–CREB pathway was implicated, independently, by genetic screens for learning mutants in *Drosophila*: the mutants *dunce* and *rutabaga*, isolated in Seymour Benzer's laboratory and studied by Yadin Dudai, William Quinn and others in the 1970s, are defective in a cAMP phosphodiesterase and in a Ca²⁺/calmodulin-activated adenylyl cyclase, respectively.

## Long-term potentiation

In 1973 Timothy Bliss and Terje Lømo, working in Per Andersen's laboratory in Oslo, stimulated the perforant path, the main input to the hippocampus, in anaesthetised rabbits, and recorded the response of the granule cells of the dentate gyrus. A few brief trains of high-frequency stimulation (around 100 Hz) produced a lasting increase in the size of the responses to single test stimuli, persisting for hours, and in a companion study in unanaesthetised rabbits, for days to weeks. They called it long-lasting potentiation; the name became **long-term potentiation** (LTP). Most later work used the CA3-to-CA1 (Schaffer collateral) synapses in slices of rat and mouse hippocampus, where LTP can be studied with intracellular and patch recordings.

::: definition Long-term potentiation and its properties {#def-ltp}
**Long-term potentiation** is a long-lasting increase in synaptic strength produced by brief, intense or correlated activity. At CA1 synapses it shows three properties:

- **input specificity**: only the synapses that were active during the induction are potentiated, not others on the same cell;
- **cooperativity**: induction requires that enough inputs be active together to depolarise the postsynaptic cell strongly; weak stimulation of few fibres does not induce it;
- **associativity**: a weak input that is active at the same time as a strong input to the same cell is potentiated, though it would not be on its own.

**Long-term depression** (LTD) is the converse, a lasting decrease in synaptic strength, induced at CA1 synapses by prolonged low-frequency stimulation (about 1 Hz for 15 minutes; Serena Dudek and Mark Bear, 1992).
:::

The three properties are exactly what a Hebbian synapse needs: change at active synapses (specificity), only when the postsynaptic cell is strongly activated (cooperativity), and association of coincident events (associativity). The molecular basis of all three is a single receptor.

### The NMDA receptor as coincidence detector

Glutamate at CA1 synapses acts on two kinds of ionotropic receptor. **AMPA receptors** carry most of the current during ordinary transmission. **NMDA receptors** (named after the selective agonist *N*-methyl-D-aspartate) have two distinctive properties: their channel is permeable to Ca²⁺ as well as Na⁺ and K⁺, and at resting potentials it is blocked by extracellular Mg²⁺ ions that lodge in the pore. Linda Nowak, Philippe Ascher and colleagues, and Mark Mayer, Gary Westbrook and Peter Guthrie, discovered the voltage-dependent Mg²⁺ block in 1984. Depolarisation drives Mg²⁺ out of the pore.

::: proposition Voltage dependence of the NMDA receptor's Mg²⁺ block {#prop-mg}
The fraction of NMDA receptor conductance not blocked by Mg²⁺ is well described by the empirical relation (Craig Jahr and Charles Stevens, 1990, from cultured rat hippocampal neurons)

$$
B(V) = \frac{1}{1 + \dfrac{[\mathrm{Mg^{2+}}]_\mathrm{o}}{3.57\ \mathrm{mmol\,L^{-1}}}\,\mathrm{e}^{-0.062V}},
$$ {#eq-mg}

with $V$ in mV. The NMDA current is $I_\mathrm{NMDA} = g_\mathrm{NMDA}\,B(V)\,(V - E_\mathrm{NMDA})$, with $E_\mathrm{NMDA} \approx 0$ mV. This is a fitted description, consistent with a blocking ion whose binding in the pore depends on the membrane field; the constants vary somewhat with receptor subunits and temperature.
:::

The receptor therefore passes current, and Ca²⁺, only when two conditions are met at once: glutamate is bound (the presynaptic cell has fired) and the postsynaptic membrane is depolarised (the postsynaptic cell is strongly active). That is the logic of Hebb's rule, built into a single molecule. Blocking NMDA receptors with the antagonist AP5 (2-amino-5-phosphonopentanoate) prevents the induction of LTP at CA1 synapses without affecting ordinary transmission (Graham Collingridge and colleagues, 1983).

::: widget plot
f: 1/(1 + M/3.57*exp(-0.062*x))
x: -100, 40
y: 0, 1
sliders: M=1:0:3:0.1
labels: \text{fraction unblocked } B(V)
vlines: -70
caption: The fraction of NMDA receptor conductance not blocked by Mg²⁺ (vertical axis) against membrane potential (horizontal axis, mV), from [[#eq-mg]], with the external Mg²⁺ concentration $M$ in mmol L⁻¹ set by the slider. At the resting potential (vertical line at −70 mV) and 1 mmol L⁻¹ Mg²⁺, less than 5 % of the conductance is available; depolarisation to −20 mV relieves about half the block. Set $M = 0$: the block disappears, and NMDA receptors pass current at all voltages, which is why LTP can be induced by weak stimulation in Mg²⁺-free solution.
:::

::: example Coincidence detection by the NMDA receptor {#ex-mg}
With 1 mmol L⁻¹ external Mg²⁺, (a) calculate $B(V)$ at −70 mV and at −20 mV. (b) A synapse opens 1 nS of NMDA conductance ($E_\mathrm{NMDA} = 0$ mV). What is the NMDA current at each voltage? (c) Explain why pairing presynaptic stimulation with postsynaptic depolarisation induces LTP while either alone does not.
::: solution
(a) At −70 mV: $\mathrm{e}^{4.34} = 76.7$, so $B = 1/(1 + 76.7/3.57) = 1/22.5 = 0.044$. At −20 mV: $\mathrm{e}^{1.24} = 3.46$, so $B = 1/(1 + 0.968) = 0.51$.

(b) $I = g\,B\,(V - 0)$: at −70 mV, $1\times0.044\times(-70) = -3.1$ pA; at −20 mV, $1\times0.51\times(-20) = -10.2$ pA. Even though the driving force is smaller at −20 mV, the inward current is more than three times larger, and the Ca²⁺ influx, a fixed fraction of it, rises correspondingly. The open fraction of the conductance is more than eleven times greater.

(c) Presynaptic stimulation alone releases glutamate, but at the resting potential the NMDA channels are almost entirely blocked, so little Ca²⁺ enters. Postsynaptic depolarisation alone relieves the block but there is no glutamate bound. Only when both happen together does a large Ca²⁺ signal arise in the spine, and that Ca²⁺ triggers LTP. Strong tetanic stimulation achieves the pairing because many coactive synapses depolarise the cell (cooperativity), and a weak input paired with a strong one benefits from the depolarisation the strong one causes (associativity). Input specificity arises because the Ca²⁺ signal is confined to the spines whose NMDA receptors bound glutamate.
:::
:::

### Expression: what changes?

The rise in spine Ca²⁺ activates Ca²⁺/calmodulin-dependent protein kinase II (**CaMKII**), which is abundant in the postsynaptic density. CaMKII can phosphorylate itself, and once autophosphorylated it remains active after Ca²⁺ has fallen, a property that led John Lisman to propose it as a molecular memory switch. Mice carrying a point mutation that prevents this autophosphorylation (Thr286 to alanine) show impaired LTP and spatial learning (Karl Peter Giese, Alcino Silva and colleagues, 1998). Its main effect is to increase the number and conductance of **AMPA receptors** at the synapse, by phosphorylating them and by driving the insertion of additional receptors from intracellular stores. Some synapses in young animals contain NMDA receptors but no functional AMPA receptors: at rest they are **silent**, and LTP unsilences them by adding AMPA receptors.

The early phase of LTP, lasting an hour or two, needs only these modifications of existing proteins. A late phase, induced by repeated tetani, requires transcription and new protein synthesis, involves CREB-dependent gene expression as in *Aplysia*, and is accompanied by structural change: individual dendritic spines enlarge within minutes when glutamate is released onto them by photolysis of a caged compound in a pattern that induces LTP, and the enlargement persists for hours (Masanori Matsuzaki, Haruo Kasai and colleagues, 2004). LTD, induced by smaller, more prolonged Ca²⁺ rises, involves phosphatases and the removal of AMPA receptors. The level and time course of the Ca²⁺ signal thus decides the direction of change.

::: intuition A sliding threshold
Why should a large Ca²⁺ rise strengthen a synapse and a modest one weaken it? Elie Bienenstock, Leon Cooper and Paul Munro proposed in 1982, from theoretical work on the development of visual cortex, that the change in a synapse is a function $\phi(y)$ of postsynaptic activity $y$ that is negative below a threshold $\theta$ and positive above it, and that the threshold itself rises when the neuron has been very active and falls when it has been quiet. The **BCM rule** stabilises learning: a neuron that has been too active becomes harder to potentiate and easier to depress, and vice versa. Both the bidirectional dependence on activity and the sliding threshold were later found experimentally in visual cortex and hippocampus.
:::

## Spike timing

Hebb wrote that A must take part in firing B, which implies causality: A should fire just before B. In 1997 Henry Markram, Bert Sakmann and colleagues, recording from pairs of connected pyramidal neurons in slices of rat cortex, showed that the order matters. When a presynaptic spike preceded a postsynaptic spike by about 10 ms, repeated pairings strengthened the synapse; when the order was reversed, they weakened it. Guo-qiang Bi and Mu-ming Poo (1998) mapped the dependence on timing in cultured rat hippocampal neurons and found a sharp window: potentiation for presynaptic spikes up to about 20 ms before the postsynaptic spike, depression for presynaptic spikes up to about 20 ms after it, and little change outside about ±40–50 ms.

::: definition Spike-timing-dependent plasticity {#def-stdp}
In **spike-timing-dependent plasticity** (STDP) the change in synaptic weight produced by a pair of pre- and postsynaptic spikes depends on their time difference $\Delta t = t_\mathrm{post} - t_\mathrm{pre}$. A common description is

$$
\Delta w(\Delta t) = \begin{cases} A_+\,\mathrm{e}^{-\Delta t/\tau_+}, & \Delta t > 0 \ \text{(pre before post: potentiation)},\\ -A_-\,\mathrm{e}^{\Delta t/\tau_-}, & \Delta t < 0 \ \text{(post before pre: depression)}, \end{cases}
$$ {#eq-stdp}

with time constants $\tau_\pm$ of about 10–30 ms. The amplitudes and time constants, and even the sign of the window, differ between synapse types; this exponential form is a fitted description of particular data sets.
:::

At the cellular level the timing rule follows from the NMDA receptor. A presynaptic spike that arrives just before a postsynaptic spike leaves glutamate bound to NMDA receptors at the moment the back-propagating action potential relieves the Mg²⁺ block, so a large Ca²⁺ signal results. In the reverse order the back-propagating spike arrives before glutamate, and the smaller, later Ca²⁺ rise favours depression.

::: widget plot
f: if(x > 0, Ap*exp(-x/tau), -Am*exp(x/tau))
x: -100, 100
y: -1.2, 1.2
sliders: Ap=1:0:1.2:0.05; Am=1.05:0:1.2:0.05; tau=20:5:40:1
labels: \Delta w\ \text{(relative)}
hlines: 0
vlines: 0
caption: The STDP window of [[#eq-stdp]]: change in synaptic weight (vertical axis, relative units) against spike timing $\Delta t = t_\mathrm{post} - t_\mathrm{pre}$ (horizontal axis, ms). To the right of zero, presynaptic spikes that precede postsynaptic ones potentiate; to the left, they depress. $A_+$ (Ap) and $A_-$ (Am) are the amplitudes and $\tau$ the time constant of both sides. When $A_-\tau$ slightly exceeds $A_+\tau$ (the default), uncorrelated spike pairs, which fall equally often on both sides, produce net depression, which keeps weights from growing without limit; correlated inputs that reliably lead the postsynaptic spike are strengthened.
:::

::: example Accumulating plasticity from spike pairs {#ex-stdp}
A synapse follows [[#eq-stdp]] with $A_+ = 0.010$, $A_- = 0.0105$ and $\tau_\pm = 20$ ms, the weight changes being fractions of the initial weight and adding linearly. (a) What is the change from 60 pairs with the presynaptic spike 10 ms before the postsynaptic one? (b) From 60 pairs with the order reversed? (c) An input fires at random times relative to the postsynaptic cell, so that $\Delta t$ is spread evenly between −100 and +100 ms. What is the expected change per pair?
::: solution
(a) Each pair: $0.010\,\mathrm{e}^{-10/20} = 0.010\times0.607 = 0.0061$. Sixty pairs: $0.36$, a 36 % increase.

(b) Each pair: $-0.0105\times0.607 = -0.0064$; sixty pairs: $-0.38$, a 38 % decrease.

(c) The expected change is the average of $\Delta w$ over the uniform distribution: $\frac{1}{200}\left[\int_0^{100}A_+\mathrm{e}^{-t/\tau}\dd t - \int_{-100}^0A_-\mathrm{e}^{t/\tau}\dd t\right] = \frac{\tau(1 - \mathrm{e}^{-5})}{200}(A_+ - A_-) = \frac{20\times0.993}{200}\times(-0.0005) = -5.0\times10^{-5}$ per pair. Uncorrelated input slowly weakens; only inputs whose spikes reliably precede the postsynaptic spike, and so help to cause it, are strengthened. STDP thus selects inputs by their causal contribution, a competitive version of Hebb's rule.
:::
:::

## From synapses to memory

Does LTP actually store memories? The question cannot be answered by showing that both exist. Richard Morris and colleagues trained rats in a **water maze**, a pool of opaque water with a submerged platform that the rat must find by remembering its position relative to cues around the room (Morris, 1982). In 1986 they showed that rats infused with AP5 into the brain during training failed to learn the platform's location, while their swimming and their ability to find a visible platform were unaffected; the doses that impaired learning also blocked hippocampal LTP. Mice lacking the NR1 subunit of the NMDA receptor only in CA1 pyramidal cells lacked CA1 LTP and were impaired in spatial learning (Joe Tsien, Susumu Tonegawa and colleagues, 1996).

The hippocampus contains a remarkable representation of space. John O'Keefe and Jonathan Dostrovsky found in 1971 that many neurons in the rat hippocampus fire only when the animal is in a particular part of its environment, the cell's **place field**; together, a population of these **place cells** forms a map. May-Britt Moser, Edvard Moser and colleagues found in 2005 that neurons in the neighbouring medial entorhinal cortex, **grid cells**, fire at the vertices of a regular triangular lattice covering the whole environment. O'Keefe and the Mosers shared the Nobel Prize in 2014. Place fields form within minutes in a new environment, and their long-term stability depends on NMDA receptors. During sleep and rest after exploring, sequences of place cells that fired during the exploration are **replayed** in compressed form (Matthew Wilson and Bruce McNaughton, 1994), which is thought to contribute to consolidation ([[neuroscience/neural-coding]]).

The most direct evidence that particular sets of neurons store particular memories came from optogenetics ([[neuroscience/neural-coding]]). In 2012 Xu Liu, Steve Ramirez, Tonegawa and colleagues made mice whose dentate gyrus neurons, if active during a learning episode, became tagged with channelrhodopsin. Mice were given mild foot shocks in one chamber, which tagged the neurons active then. Later, in a different, safe chamber, shining light on the tagged neurons made the mice freeze, as if recalling the fearful place. Such sets of cells are called **engram** cells, after a term introduced by Richard Semon in 1904.

::: warning "LTP is memory" and "memories are stored in single neurons or synapses"
LTP is a cellular mechanism that has many of the properties a memory store needs, and the evidence that it, or something like it, is used in hippocampus-dependent learning is strong. But the case rests on several kinds of evidence, each with caveats: blocking NMDA receptors also blocks other processes, genetic manipulations can have developmental effects, and some forms of learning survive NMDA blockade. Stephen Martin, Paul Grimwood and Richard Morris (2000) set out the criteria a mechanism must meet (detectability, mimicry, anterograde alteration and retrograde alteration), and no single experiment satisfies all of them. Equally, memories are not stored in single cells or synapses: they are distributed over many synapses of many neurons, with each neuron and synapse taking part in many memories. Engram cells are necessary parts of a network, not miniature storage boxes.
:::

## Learning from errors: prediction and dopamine

Pavlov's conditioning seems simple: pair a CS with a US and the CS acquires the power to elicit the response. But in 1968 Leon Kamin found that pairing alone is not enough. Rats first trained that a noise predicts a shock, and then trained with a compound of noise and light predicting the same shock, learned nothing about the light. The noise already predicted the shock, so the light added no information: the learning about it was **blocked**. Robert Rescorla and Allan Wagner proposed in 1972 that animals learn only when events are surprising.

::: proposition The Rescorla–Wagner rule {#prop-rw}
Let $V_i$ be the associative strength of stimulus $i$, and let $\lambda$ be the maximum strength the US can support ($\lambda = 0$ on trials without the US). On each trial on which a set of stimuli is present, the strength of each present stimulus $i$ changes by

$$
\Delta V_i = \alpha_i\beta\left(\lambda - \sum_{j\ \text{present}}V_j\right),
$$ {#eq-rw}

where $\alpha_i$ and $\beta$ are learning-rate parameters for the CS and US. The term in brackets is the **prediction error**: the difference between what happened and what was predicted. For a single stimulus starting from $V_0 = 0$ with constant $k = \alpha\beta$,

$$
V_n = \lambda\left[1 - (1 - k)^n\right].
$$ {#eq-rw-curve}

The rule is a model of behavioural data, not a derivation from neural mechanisms; it explains acquisition, extinction, blocking and overshadowing, but not, for example, why extinguished responses can return spontaneously.
:::

::: proof
For one stimulus, [[#eq-rw]] gives $V_{n+1} = V_n + k(\lambda - V_n)$, so $\lambda - V_{n+1} = (1 - k)(\lambda - V_n)$. The error shrinks by the factor $(1 - k)$ each trial, so $\lambda - V_n = (1 - k)^n(\lambda - V_0) = (1 - k)^n\lambda$, which gives [[#eq-rw-curve]].
:::

::: widget plot
f: L*(1 - (1 - k)^x); if(x < 10, L*(1 - (1 - k)^x), L*(1 - (1 - k)^10)*(1 - k)^(x - 10))
x: 0, 30
y: 0, 1.05
sliders: k=0.2:0.05:0.6:0.01; L=1:0.2:1:0.05
labels: \text{continued acquisition}; \text{acquisition, then extinction after trial 10}
vlines: 10
caption: Associative strength $V$ (vertical axis) against trial number (horizontal axis) in the Rescorla–Wagner model [[#eq-rw-curve]], with learning rate $k = \alpha\beta$ and asymptote $\lambda$ (L) set by the sliders. The first curve shows continued pairing; the second shows pairing for ten trials (vertical line) and then extinction ($\lambda = 0$), when the prediction error is negative and $V$ decays geometrically. Each trial reduces the remaining error by the same fraction, so learning is fastest at first and slows as the prediction improves.
:::

A neural counterpart of the prediction error was found in the dopamine neurons of the midbrain. Wolfram Schultz and colleagues recorded from these neurons in monkeys learning that a light predicted a drop of juice. Before learning, the neurons fired a burst when the juice arrived. After learning, they fired at the light and no longer at the juice; and if the predicted juice was withheld, their firing paused at the moment it should have arrived. Schultz, Peter Dayan and Read Montague (1997) pointed out that this is exactly the behaviour of the prediction-error signal of **temporal-difference learning**, an algorithm from machine learning that generalises the Rescorla–Wagner rule to predictions over time. Dopamine released in the striatum is thought to act as a teaching signal that strengthens recently active corticostriatal synapses when outcomes are better than expected, a "three-factor" learning rule combining presynaptic activity, postsynaptic activity and a neuromodulatory signal.

::: example Blocking in the Rescorla–Wagner model {#ex-blocking}
With $k = 0.2$ for both stimuli and $\lambda = 1$: (a) What is $V_A$ after 10 trials of A paired with the US, starting from zero? (b) A and B are then presented together with the US for 10 more trials. How much does $V_B$ gain? (c) A control group receives only the 10 compound trials, from zero. What are $V_A$ and $V_B$ at the end? (d) Relate the result to dopamine neuron responses.
::: solution
(a) $V_A = 1 - 0.8^{10} = 1 - 0.107 = 0.893$.

(b) On each compound trial both change by $0.2(1 - V_A - V_B)$. At the first, $\Delta V_B = 0.2\times0.107 = 0.021$. The remaining error $e = 1 - V_A - V_B$ evolves as $e_{n+1} = e_n - 2\times0.2\,e_n = 0.6\,e_n$, so the total change in $V_B$ over ten trials is $0.2\,e_0(1 + 0.6 + 0.6^2 + \cdots + 0.6^9) = 0.2\times0.107\times(1 - 0.6^{10})/0.4 = 0.053$. B is almost completely blocked.

(c) Starting from zero, $e_0 = 1$ and $e_n = 0.6^n$. Each stimulus gains $0.2(1 - 0.6^{10})/0.4 = 0.497$. Both stimuli end near 0.5: they share the prediction (**overshadowing**, here with equal salience).

(d) After training on A, the dopamine neurons respond to A and not to the US: the US is fully predicted, there is no prediction-error signal, and so nothing is learned about B. This is the neural version of Kamin's insight, and Waelti, Dickinson and Schultz (2001) found that dopamine neurons indeed failed to respond to a blocked stimulus in monkeys.
:::
:::

::: quiz
A dopamine neuron in a trained monkey fires at a cue that predicts juice. On one trial the cue appears but the juice is twice the usual amount. What does the neuron most likely do when the juice arrives?
- [ ] Nothing, because the juice was predicted by the cue.
- [x] Fires a burst, because the outcome is better than predicted (a positive prediction error).
- [ ] Pauses, because the outcome differs from the prediction.
- [ ] Fires at the same rate as before learning.
::: solution
The dopamine signal reports the difference between received and predicted reward. A larger-than-expected reward is a positive prediction error, signalled by a burst; a smaller-than-expected or omitted reward is a negative error, signalled by a pause; a reward exactly as predicted produces no change. Experiments varying reward size and probability have confirmed this graded behaviour.
:::
:::

::: application Memory and disease
Many neurological and psychiatric conditions involve the mechanisms of this chapter. The earliest losses in Alzheimer's disease typically affect the entorhinal cortex and hippocampus, and with them the formation of new declarative memories. Drugs of abuse act on the dopamine prediction-error system and change synapses in the striatum. Exposure-based therapies for anxiety use extinction learning. Clinical aspects are covered in [Medicine Atlas: dementia and neurodegeneration](/learn/medicine/lesson.php?c=nervous-system&l=dementia-neurodegeneration) and [Medicine Atlas: substance use](/learn/medicine/lesson.php?c=psychiatry&l=substance-use).
:::

::: history
Ramón y Cajal suggested in 1894 that learning might strengthen connections between neurons, and Hebb stated his postulate in 1949. Scoville and Milner described H.M. in 1957. Kandel and colleagues began work on *Aplysia* in the 1960s, describing the cellular basis of habituation and sensitisation in the 1970s and the molecular pathway to long-term memory in the 1980s and 1990s. Bliss and Lømo reported LTP in 1973. The Mg²⁺ block of NMDA receptors was discovered in 1984, and NMDA-receptor-dependent LTP and spatial learning were linked by Collingridge (1983) and Morris (1986). O'Keefe and Dostrovsky discovered place cells in 1971, and the Mosers grid cells in 2005. Rescorla and Wagner published their rule in 1972; Schultz, Dayan and Montague connected dopamine to prediction error in 1997. STDP was described by Markram and colleagues in 1997 and by Bi and Poo in 1998. Optogenetic reactivation of engram cells was reported in 2012.
:::

## Where this leads

Memories are carried by patterns of activity in large populations of neurons, which must be read out as well as written. [[neuroscience/neural-coding]] considers how information is represented in spike trains and populations, and how such activity is recorded. The behavioural side of learning, its evolution and its ecological uses, is in [[behaviour/learning-cognition]].

::: summary
- Learning is non-associative (habituation, sensitisation) or associative (classical, operant); memory systems include declarative (hippocampus) and non-declarative (striatum, cerebellum, amygdala, reflex pathways); H.M. showed their separation.
- Hebb's postulate, $\Delta w = \eta xy$, is local, associative and unsupervised; it needs normalisation (Oja's rule extracts the principal component) or depression to stay stable.
- In *Aplysia*, habituation is presynaptic depression; sensitisation is presynaptic facilitation through 5-HT, cAMP and PKA; long-term memory needs CREB, protein synthesis and new synapses.
- LTP (Bliss and Lømo, 1973) is input-specific, cooperative and associative because NMDA receptors require both glutamate and depolarisation to relieve their Mg²⁺ block; Ca²⁺ activates CaMKII and adds AMPA receptors; late LTP needs protein synthesis and structural growth. LTD and the BCM rule add bidirectional, stabilised plasticity.
- STDP: pre-before-post within about 20 ms potentiates, post-before-pre depresses.
- Place cells, grid cells, replay and engram cells link synaptic plasticity to spatial memory; establishing that LTP stores memory requires several kinds of evidence.
- The Rescorla–Wagner rule, $\Delta V = \alpha\beta(\lambda - \sum V)$, learns from prediction errors and explains blocking; midbrain dopamine neurons signal reward prediction errors.
:::

## Exercises

::: exercise A learning curve {level=1 check="0.672"}
In the Rescorla–Wagner model with $k = 0.2$ and $\lambda = 1$, what is $V$ after 5 conditioning trials starting from zero? Give three decimal places.
::: solution
$V_5 = 1 - 0.8^5 = 1 - 0.328 = 0.672$.
:::
:::

::: exercise Relief of the Mg²⁺ block {level=1 check="0.023"}
Using [[#eq-mg]], what fraction of the NMDA conductance is unblocked at −70 mV when external Mg²⁺ is 2 mmol L⁻¹? Give three decimal places.
::: solution
$B = 1/(1 + (2/3.57)\mathrm{e}^{4.34}) = 1/(1 + 0.560\times76.7) = 1/43.97 = 0.023$. Doubling Mg²⁺ roughly halves the small unblocked fraction at rest.
:::
:::

::: exercise Classifying learning {level=1}
Classify each as habituation, sensitisation, classical conditioning or operant conditioning: (a) a dog salivates at the sound of a can opener; (b) after an earthquake, a person jumps at every small noise; (c) a rat learns to press a lever for food; (d) a snail stops withdrawing into its shell when the tank is tapped repeatedly.
::: solution
(a) Classical conditioning (the sound has been paired with food). (b) Sensitisation (a strong stimulus increases responses to many others). (c) Operant conditioning (an action increases because of its consequence). (d) Habituation (a harmless repeated stimulus elicits a declining response).
:::
:::

::: exercise Properties of LTP {level=2}
In a hippocampal slice, two independent pathways, S1 and S2, converge on the same CA1 neurons. Predict the outcome in each case, explaining which property of LTP is involved: (a) tetanising S1 strongly; (b) stimulating S2 weakly at 100 Hz, too weakly to depolarise the cell much; (c) stimulating S2 weakly at the same time as tetanising S1; (d) case (c) in the presence of AP5.
::: solution
(a) S1 is potentiated, S2 is not: input specificity. (b) No LTP in S2: cooperativity, because few active fibres cannot depolarise the cell enough to relieve the Mg²⁺ block. (c) Both are potentiated: associativity, the depolarisation produced by S1 relieving the block at S2 synapses that are releasing glutamate at the same moment. (d) Neither is potentiated, because AP5 blocks NMDA receptors and so prevents the Ca²⁺ influx that induces LTP; baseline transmission, carried by AMPA receptors, is unaffected.
:::
:::

::: exercise Long-term and short-term facilitation {level=2}
In cultured *Aplysia* sensory and motor neurons, one application of serotonin produces facilitation lasting minutes; five spaced applications produce facilitation lasting more than 24 hours. (a) Predict the effect of a protein-synthesis inhibitor applied during the five applications, on the facilitation measured at 10 minutes and at 24 hours. (b) Predict the effect of injecting into the sensory neuron oligonucleotides that bind and sequester CREB. (c) What structural change would you look for at 24 hours?
::: solution
(a) Facilitation at 10 minutes is unaffected (it depends on covalent modification of existing proteins); facilitation at 24 hours is blocked (it requires new proteins). (b) Long-term facilitation is blocked, because CREB-mediated transcription is required; short-term facilitation is unaffected. (Dash, Hochner and Kandel did this experiment in 1990.) (c) An increase in the number of presynaptic varicosities (synaptic terminals) of the sensory neuron contacting the motor neuron, which can be imaged by filling the sensory neuron with a fluorescent dye.
:::
:::

::: exercise Interpreting a water-maze experiment {level=2}
Rats given an NMDA receptor antagonist during training in the water maze take much longer than controls to find the hidden platform and, in a probe trial with the platform removed, do not search preferentially in the correct quadrant. A critic argues that the drug might simply impair vision or swimming, or make the rats anxious. (a) What control experiments address these objections? (b) If rats are first trained in one pool without the drug and then trained in a new pool with the drug, they learn the new pool almost normally (Bannerman and colleagues, 1995). What does this suggest?
::: solution
(a) Test the drugged rats with a visible platform, which requires vision, swimming and motivation but not spatial memory: if they perform normally, sensorimotor and motivational explanations are unlikely. Measure swimming speed and path length separately, and test anxiety-related behaviour. Show that the dose blocks hippocampal LTP, and that the drug given after learning does not impair recall (to separate learning from retrieval). (b) Prior non-spatial experience of the task (how to swim, that there is an escape platform, how to search) seems to be what requires NMDA receptors in the first experiment, or alternatively the hippocampus can learn a new spatial layout by mechanisms other than NMDA-dependent plasticity once the general strategy is known. Either way, the result cautions against equating NMDA blockade with blockade of spatial memory as such.
:::
:::

::: exercise Hebbian growth and its control {level=3}
A neuron receives two inputs with activities $x_1$ and $x_2$ and responds with $y = w_1x_1 + w_2x_2$. Its weights change by the pure Hebbian rule $\Delta w_i = \eta x_iy$. (a) Show that, averaged over many presentations of zero-mean inputs with covariance matrix $\mathbf C$, the weight vector changes as $\Delta\mathbf w = \eta\,\mathbf C\mathbf w$. (b) Why does this make the weights grow without limit? (c) With $\mathbf C = \begin{pmatrix}1 & 0.8\\0.8 & 1\end{pmatrix}$, in which direction does $\mathbf w$ end up pointing, and why does Oja's rule give the same direction with a bounded length?
::: solution
(a) $\Delta w_i = \eta x_i\sum_jw_jx_j$; averaging, $\langle\Delta w_i\rangle = \eta\sum_j\langle x_ix_j\rangle w_j = \eta(\mathbf C\mathbf w)_i$.

(b) $\mathbf C$ is positive semi-definite, so $\mathbf w\T\Delta\mathbf w = \eta\,\mathbf w\T\mathbf C\mathbf w \ge 0$: the length of $\mathbf w$ never decreases on average, and the component along each eigenvector with a positive eigenvalue grows geometrically, by a factor $(1 + \eta\mu)$ per step for eigenvalue $\mu$.

(c) The eigenvalues of $\mathbf C$ are $1.8$ (eigenvector $(1, 1)/\sqrt2$, at 45°) and $0.2$ (eigenvector $(1, -1)/\sqrt2$). The component along the first grows faster, so $\mathbf w$ turns towards the 45° axis, the first principal component. Oja's rule adds $-\eta y^2w_i$, which on average subtracts $\eta(\mathbf w\T\mathbf C\mathbf w)\mathbf w$; at equilibrium $\mathbf C\mathbf w = (\mathbf w\T\mathbf C\mathbf w)\mathbf w$, which requires $\mathbf w$ to be an eigenvector with $\lVert\mathbf w\rVert = 1$, and only the principal eigenvector is stable. The program in this chapter shows the convergence numerically. See [linear algebra in Maths Atlas](/learn/maths/course.php?c=linear-algebra) for eigenvectors.
:::
:::

::: exercise Temporal-difference learning {level=3}
A monkey sees a light (time 1), then after one step a tone (time 2), then receives juice (time 3), on every trial. In temporal-difference learning the prediction error at each time is $\delta_t = r_t + V_{t+1} - V_t$, where $r_t$ is the reward received at time $t$ and $V_t$ the predicted future reward from time $t$; values are updated by $\Delta V_t = k\,\delta_t$. Take the time before the light, $t = 0$, to have a value fixed at 0 because the light comes at unpredictable times. (a) Before learning, all $V = 0$. Where is the prediction error on the first trial? (b) After extensive training, what are $V_1$, $V_2$ and $V_3$, and where is the prediction error? (c) Relate this to Schultz's recordings.
::: hint
After training, the prediction errors at times 1, 2 and 3 within a trial vanish; solve for the values that make this so, remembering that $V_4 = 0$ after the trial ends.
:::
::: solution
(a) With all values zero, the only non-zero error is at time 3, $\delta_3 = r_3 = 1$ (taking the reward as 1): the dopamine neuron fires at the juice.

(b) At equilibrium $\delta_3 = 1 + V_4 - V_3 = 0$ gives $V_3 = 1$; $\delta_2 = 0 + V_3 - V_2 = 0$ gives $V_2 = 1$; $\delta_1 = V_2 - V_1 = 0$ gives $V_1 = 1$. Within the trial the errors vanish, but at the transition from the unpredictable pre-light period, $\delta_0 = 0 + V_1 - V_0 = 1$: the error has moved to the earliest reliable predictor, the light.

(c) This is the pattern Schultz observed: before learning, dopamine neurons burst at the reward; after learning, they burst at the earliest predictive cue and not at the reward or at intermediate predicted cues. If the juice were omitted after training, $\delta_3 = 0 + 0 - 1 = -1$ at the expected time: a pause in firing, as observed.
:::
:::
