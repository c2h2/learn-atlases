Reach for a cup of coffee. Before your hand moves, your brain has located the cup from what you see, chosen which arm to use, planned a path, and set the posture of your trunk and legs so that the reach will not topple you. As your arm moves, some fifty muscles contract and relax in a precise sequence, each driven by hundreds of motor neurons firing at rates that change every few milliseconds. Your fingers open to the width of the handle before they arrive, and close with just enough force to lift a cup whose weight you guessed in advance. If the cup is unexpectedly full, the grip tightens within a tenth of a second, before you are aware of the surprise. All of this is ordinary; robots still find it hard.

Behaviour is movement, and every nervous system exists, ultimately, to move a body. This chapter looks at how nervous systems produce and control movement, from the bottom up. We start with the final common path, the motor neurons and the muscle fibres they drive; then the reflexes organised in the spinal cord; then the **central pattern generators** that produce rhythmic movements such as walking, swimming and breathing without needing sensory input; and finally the descending systems in the brain (motor cortex, cerebellum and basal ganglia) that select, plan and refine movements. The mechanics of muscle contraction, excitation–contraction coupling and the force–velocity relation are in [[animal-physiology/muscle-movement]], and synaptic transmission at the neuromuscular junction in [[neuroscience/synapses]]. Clinical disorders of movement belong to [Medicine Atlas: motor systems](/learn/medicine/lesson.php?c=nervous-system&l=motor-systems).

## Motor units and the grading of force

Every skeletal muscle fibre in a vertebrate is innervated by one motor neuron, and every action potential in that motor neuron produces an action potential, and hence a twitch, in each of its muscle fibres. The neuromuscular junction has such a large safety factor that it works as a one-to-one relay. Charles Sherrington called the motor neuron the **final common path**: whatever the brain or spinal cord decides, its only way to act on a muscle is through the motor neurons.

::: definition Motor unit and motor pool {#def-motor-unit}
A **motor unit** is a single motor neuron together with all the muscle fibres it innervates. The **innervation ratio** is the number of muscle fibres per motor unit: from about ten in the extraocular muscles of the eye, which need fine control, to more than a thousand in large leg muscles of mammals. The **motor pool** (motor neuron pool) of a muscle is the set of all the motor neurons that innervate it, clustered in a column in the ventral horn of the spinal cord or in a brainstem nucleus.
:::

The fibres of one motor unit are of the same type and are scattered through the muscle, intermingled with fibres of other units. Mammalian motor units fall into three broad classes, first distinguished physiologically by Robert Burke and colleagues in the cat in the early 1970s:

| type | twitch | force | fatigue | motor neuron |
|---|---|---|---|---|
| S (slow) | slow, long | small | very resistant | small, low threshold |
| FR (fast, fatigue-resistant) | fast | intermediate | resistant | intermediate |
| FF (fast, fatigable) | fast, brief | large | fatigues in minutes | large, high threshold |

The nervous system grades the force of a muscle in two ways: by **recruitment**, activating more motor units, and by **rate coding**, making each active unit fire faster.

### Rate coding and tetanus

A single action potential produces a twitch lasting tens of milliseconds, far longer than the action potential itself. If a second action potential arrives before the first twitch has relaxed, the two summate and the force rises higher. At high enough rates the twitches fuse into a smooth, sustained contraction, a **tetanus**, typically three to ten times the force of a single twitch. Part of the extra force comes from simple overlap of twitches and part from the fact that a single action potential does not release enough Ca²⁺, for long enough, to activate the contractile proteins fully ([[animal-physiology/muscle-movement]]).

::: widget plot
f: sum(heaviside(x - k*1000/r)*((x - k*1000/r)/T)*exp(1 - (x - k*1000/r)/T), k, 0, 40)
x: 0, 500
y: 0, 10
sliders: r=10:2:80:1; T=40:15:100:1
labels: \text{force (multiples of one twitch)}
caption: Force of a motor unit (vertical axis, in multiples of the peak of a single twitch) against time (horizontal axis, ms) when its motor neuron fires a regular train at rate $r$ impulses per second (slider). Each twitch is modelled as an alpha function with time to peak $T$ ms (slider), and twitches are simply added. At low rates the twitches are separate; as $r$ rises they overlap into an unfused, rippling tetanus, and then into a nearly smooth fused tetanus. Lower $T$, as for a fast-twitch unit, and a higher rate is needed for fusion. The linear addition is illustrative only: real muscle force saturates, so the plateau of a fused tetanus does not keep rising in proportion to the rate.
:::

### Recruitment and the size principle

In 1957 Elwood Henneman, recording from the ventral roots of decerebrate cats while stretching a muscle to excite its motor pool reflexively, found that motor neurons were always recruited in the same order: those with small action potentials (and hence thin axons and small cell bodies) first, those with large action potentials later. Derecruitment ran in reverse. This orderly recruitment by size is the **size principle**, and it has been confirmed in many muscles and species, including humans.

::: proposition Why small motor neurons are recruited first {#prop-size}
Suppose every motor neuron of a pool receives the same total synaptic current $I$, and that all have the same specific membrane resistance $R_\mathrm{m}$ and the same threshold depolarisation $\Delta V_\mathrm{th}$. A motor neuron of membrane area $A$ has input resistance $R_\mathrm{in} = R_\mathrm{m}/A$, so its steady depolarisation is

$$
\Delta V = IR_\mathrm{in} = \frac{IR_\mathrm{m}}{A},
$$

and it reaches threshold when $I \ge \Delta V_\mathrm{th}A/R_\mathrm{m}$. The current needed for recruitment is proportional to the area of the neuron, so smaller neurons are recruited first.

Assumptions: equal synaptic current to all neurons, equal specific membrane properties and threshold. In reality larger motor neurons receive more synapses, and their specific membrane resistance is also lower, which strengthens the effect; the size principle is an observed regularity of which input resistance is the main, but not the only, explanation.
:::

::: example Recruitment thresholds in a motor pool {#ex-recruit}
In a cat, a slow-type motor neuron has an input resistance of 2.5 MΩ and a fast-fatigable one an input resistance of 0.5 MΩ. Both must be depolarised by 12 mV to fire. (a) What steady current must each receive to reach threshold? (b) A muscle receives a synaptic drive that rises slowly from 0 to 10 nA. Which motor units fire? (c) Why is this order sensible for the animal?
::: solution
(a) $I = \Delta V/R_\mathrm{in}$: slow, $12\ \mathrm{mV}/2.5\ \mathrm{M\Omega} = 4.8$ nA; fast-fatigable, $12/0.5 = 24$ nA.

(b) Only the slow unit (and other units with thresholds below 10 nA) fires; the fast-fatigable unit stays silent until the drive exceeds 24 nA.

(c) The units used most often, for posture and gentle movements, are the slow, small, fatigue-resistant ones, which produce small, finely graded increments of force. Large, powerful but fatigable units are reserved for brief, strong efforts such as jumping. Each added unit also contributes a force roughly proportional to the force already present, so that the relative precision of force control stays roughly constant as force increases: a Weber-like property ([[neuroscience/sensory-systems#def-weber]]). And the brain does not have to choose which motor units to use: the biophysics of the pool does it automatically.
:::
:::

## Spinal reflexes

A **reflex** is a rapid, stereotyped response to a sensory stimulus, organised by a fixed circuit. Sherrington, working mainly on cats and dogs with the brain disconnected from the spinal cord, made the study of spinal reflexes the foundation of integrative neurophysiology in the first decades of the twentieth century. Reflexes reveal the basic building blocks of motor circuits.

### Muscle spindles and the stretch reflex

Embedded in most skeletal muscles, in parallel with the ordinary (extrafusal) fibres, are **muscle spindles**: capsules a few millimetres long containing a few small, specialised **intrafusal** muscle fibres wrapped by sensory endings. When the muscle is stretched, the spindle is stretched, and its sensory endings fire. **Group Ia** afferents, from primary endings, signal both muscle length and its rate of change; **group II** afferents, from secondary endings, signal mainly length. The intrafusal fibres receive their own motor supply from small **γ motor neurons**, distinct from the large **α motor neurons** that drive the extrafusal muscle.

::: definition The stretch reflex {#def-stretch}
The **stretch reflex** (myotatic reflex) is the contraction of a muscle in response to its own stretch. Its core is a **monosynaptic** circuit: Ia afferents from the spindles of a muscle make excitatory synapses directly onto the α motor neurons of the same muscle (and of its synergists). In parallel, Ia afferents excite **Ia inhibitory interneurons** that inhibit the motor neurons of the antagonist muscle, so that the antagonist relaxes as the stretched muscle contracts: **reciprocal inhibition**.
:::

Edward Liddell and Sherrington described the stretch reflex in decerebrate cats in 1924, and David Lloyd showed in 1943, by measuring the central delay of reflex discharges in the cat spinal cord, that the fastest component passes through only one synapse. The tendon tap that a physician uses to test the knee-jerk is a brief, synchronous stretch of the quadriceps spindles. In everyday function, the stretch reflex resists unexpected changes in muscle length: if a load is suddenly added to your hand, your elbow flexors are stretched, their spindles fire, and the reflex increases their force within a few tens of milliseconds.

A second receptor, the **Golgi tendon organ**, lies in series with the muscle at its junction with the tendon and signals **force** rather than length. Its **group Ib** afferents act through interneurons to inhibit the motor neurons of the same muscle (autogenic inhibition), although during locomotion, as discussed below, the same afferents can switch to exciting extensor motor neurons.

Why does the spindle have its own motor supply? If the α motor neurons alone made a muscle shorten, the spindles would go slack and stop signalling just when information about length was most needed. The γ motor neurons contract the ends of the intrafusal fibres, taking up the slack and keeping the spindle sensitive over the full range of muscle lengths. In voluntary movements in humans, recordings from single spindle afferents by Åke Vallbo and colleagues in the 1970s showed that α and γ motor neurons are activated together (**α–γ coactivation**), so that spindles keep reporting throughout a contraction.

::: example Measuring the central delay {#ex-delay}
In a classic experiment of Lloyd's type, a dorsal (sensory) root of a cat's spinal cord is stimulated electrically and the reflex discharge is recorded from the ventral (motor) root of the same segment. The total latency from stimulus to ventral-root discharge is 1.6 ms. The afferent and efferent fibres each run 15 mm between the electrodes and the spinal grey matter, at conduction velocities of 100 m s⁻¹ (Ia afferent) and 80 m s⁻¹ (α motor axon). (a) Estimate the central delay. (b) Given that a synaptic delay is about 0.5 ms and conduction within the grey matter takes about 0.2–0.3 ms, how many synapses are in the path? (c) A slower reflex component has a latency of 2.6 ms. What might it represent?
::: solution
(a) Conduction outside the cord: afferent $15\ \mathrm{mm}/100\ \mathrm{m\,s^{-1}} = 0.15$ ms; efferent $15/80 = 0.19$ ms; total 0.34 ms. Central delay $= 1.6 - 0.34 = 1.26$ ms. This includes conduction in the grey matter and the time for the motor neuron to reach threshold and fire, in addition to synaptic delay.

(b) Subtracting intraspinal conduction (about 0.25 ms) and the time for the motor neuron's EPSP to reach threshold (a few tenths of a millisecond) leaves roughly 0.5–0.7 ms, room for one synaptic delay but not two. The path is monosynaptic, which is what Lloyd concluded from delays of about 1 ms or less.

(c) An extra millisecond allows about one or two more synapses: a **polysynaptic** reflex pathway through spinal interneurons, such as those activated by cutaneous or group II afferents.
:::
:::

### Withdrawal and crossed extension

Painful stimulation of a foot produces the **flexion withdrawal reflex**: flexor muscles throughout the limb contract and extensors relax, pulling the foot away. Because the leg can no longer bear weight, the opposite leg extends at the same time, the **crossed extension reflex**. These reflexes are polysynaptic: the nociceptive afferents excite chains of interneurons that branch to many segments and to both sides of the spinal cord. The withdrawal reflex is graded and adapted to the site of stimulation: the pattern of muscles activated depends on which part of the skin is stimulated, so that the stimulated region is pulled away from the stimulus.

::: warning "Reflexes are fixed and automatic"
Reflexes are stereotyped, but not rigid. Their gain is adjusted continuously by descending pathways and by the state of the spinal circuits. A light touch on the top of the foot of a walking cat produces flexion if it arrives during the swing phase (lifting the foot over an obstacle) but extension if it arrives during stance, when flexing would make the animal fall (Hans Forssberg and colleagues, 1975): a **phase-dependent reflex reversal**. Stretch reflexes are strengthened when a task demands stiffness and weakened when it demands compliance, and in humans their gain can be changed by training. Spinal reflexes are better thought of as adjustable components of movements than as fixed responses.
:::

::: quiz
A cat's knee-extensor muscle is stretched suddenly. Which of the following do you expect within a few tens of milliseconds?
- [ ] Inhibition of the extensor motor neurons by Ia afferents.
- [x] Excitation of the extensor motor neurons and inhibition of the knee-flexor motor neurons.
- [ ] Excitation of both extensor and flexor motor neurons.
- [ ] No change, because the stretch reflex needs the brain.
::: solution
Ia afferents from the stretched extensor's spindles excite its α motor neurons monosynaptically and, through Ia inhibitory interneurons, inhibit the antagonist flexors (reciprocal inhibition). The reflex is organised in the spinal cord and survives disconnection from the brain, as in Sherrington's decerebrate preparations.
:::
:::

## Central pattern generators

Walking, swimming, flying, chewing, breathing and the scratching of an itch are rhythmic. Are they chains of reflexes, each movement producing sensory feedback that triggers the next? Sherrington thought so. His student Thomas Graham Brown thought otherwise. In 1911 he showed that a cat whose spinal cord had been cut and whose dorsal roots had been severed, so that no sensory feedback could reach the cord from the legs, still produced rhythmic alternating contractions of flexors and extensors for a short time after the operation. He proposed that the rhythm is generated within the spinal cord by two **half-centres**, one driving flexors and one extensors, that inhibit each other and alternate because each half-centre's activity fatigues.

::: definition Central pattern generator {#def-cpg}
A **central pattern generator** (CPG) is a neural circuit that can produce a rhythmic, patterned motor output in the absence of rhythmic sensory input or rhythmic descending commands. The output recorded from motor nerves of an isolated or deafferented nervous system that has been induced to generate the rhythm (by drugs or by tonic stimulation) is called **fictive** locomotion, swimming or breathing. Sensory feedback and descending signals are not needed to generate the rhythm, but they normally adjust its timing and amplitude.
:::

The decisive experiments came from invertebrates and simple vertebrates in the 1960s and 1970s. Donald Wilson showed in 1961 that the locust's flight motor pattern persists, at a lower frequency, when sensory feedback from the wings is removed. The isolated spinal cord of the lamprey, a jawless fish, produces fictive swimming when bathed in glutamate agonists, and Sten Grillner and colleagues identified much of its circuitry. In the marine mollusc *Tritonia*, Peter Getting traced the escape-swimming CPG to a handful of identified interneurons. The best-understood CPG of all is in the **stomatogastric ganglion** of crabs and lobsters, about 30 neurons that drive the rhythmic movements of the stomach. Its pyloric rhythm, about one cycle per second, is generated by a pacemaker group of neurons and shaped by inhibitory synapses, and every connection between its neurons has been mapped.

Several mechanisms generate rhythms, often combined in one circuit.

- **Pacemaker neurons** oscillate on their own because of their intrinsic conductances, typically a slowly activating inward current (such as a persistent Na⁺ or a Ca²⁺ current) and a slowly activating outward current that terminates each burst.
- **Half-centre oscillators** consist of two neurons or groups that inhibit each other; neither oscillates alone, but the pair alternates because the active side's firing declines (through adaptation or synaptic depression) or because the inhibited side escapes from inhibition, for example through a hyperpolarisation-activated current.
- **Network oscillators** arise from rings of inhibition or recurrent excitation among several cell types.

All of them share a mathematical core: a fast positive-feedback process that switches the system on and a slower negative-feedback process that switches it off, which together produce a **limit cycle**, the same structure we met in the FitzHugh–Nagumo model of the action potential ([[neuroscience/action-potential]]).

::: widget phaseplane
f: y
g: mu*(1 - x^2)*y - x
x: -3, 3
y: -6, 6
sliders: mu=1.5:0.1:5:0.1
points: 0.1, 0; 2.5, 4
caption: An abstract rhythm generator, the van der Pol oscillator: the horizontal axis $x$ stands for the activity of a half-centre (positive for one side, negative for the other) and the vertical axis for its rate of change. Two trajectories start from very different states, one near rest and one far out, and both converge onto the same closed orbit, the limit cycle. This is what makes a CPG robust: whatever the starting conditions, and after a perturbation, the rhythm returns to the same amplitude and period. Raise $\mu$ (the strength of the nonlinearity) and the oscillation becomes a relaxation oscillation, with slow build-up and abrupt switching between the two sides, like the alternation of flexor and extensor bursts.
:::

Eve Marder and colleagues used the stomatogastric ganglion to ask a question that applies to every circuit: how precisely must its parameters be set? Astrid Prinz, Dirk Bucher and Marder (2004) simulated millions of versions of a three-cell model of the pyloric circuit with different combinations of conductances and synaptic strengths, and found that very different combinations produce nearly indistinguishable rhythms. Measurements in real animals showed that the conductances of identified neurons vary severalfold between individuals, while the rhythm is the same. Good function does not require a unique set of parameters; it requires a set within a large region of acceptable solutions, and neurons appear to regulate their conductances homeostatically to stay within it.

### Locomotion in vertebrates

In mammals, the spinal cord also contains locomotor CPGs. Cats whose spinal cord has been transected can, with training and support, step on a moving treadmill with their hind legs, the treadmill providing the sensory signals that adjust the rhythm to the belt speed. Genetic dissection in mice since the early 2000s has identified classes of spinal interneurons that control different aspects of the pattern: for example, ablating a class of commissural interneurons (V0 neurons) whose axons cross the midline converts the normal left–right alternation of walking into synchronous hopping (Adolfo Talpalar, Ole Kiehn and colleagues, 2013). The rhythm is started, stopped and set in speed by command signals from the brainstem, notably from the mesencephalic locomotor region, whose graded stimulation in decerebrate cats increases the speed of walking and then switches the gait from walk to trot to gallop.

Sensory feedback matters too. Signals from load receptors (Golgi tendon organs) prolong the stance phase while a leg is bearing weight, and signals from hip-flexor stretch trigger the transition to swing when the leg is extended far enough behind the body. CPGs and reflexes are partners, not alternatives.

## Descending control

Above the spinal cord, three systems shape movement: the **motor cortex** and the descending tracts from cortex and brainstem, which initiate and direct voluntary movements; the **cerebellum**, which coordinates and calibrates them; and the **basal ganglia**, which help select which movements to make.

### Motor cortex

In 1870 Gustav Fritsch and Eduard Hitzig, stimulating the exposed cerebral cortex of dogs with weak electric currents, evoked movements of the opposite limbs from a strip in front of the main sensory areas. The region, the **primary motor cortex** (M1), is organised somatotopically: in primates, neighbouring regions control neighbouring parts of the body, with disproportionately large areas for the hand and face. Wilder Penfield and Edwin Boldrey mapped it in human patients undergoing surgery for epilepsy in the 1930s and drew it as the motor **homunculus**. The map is coarser and more overlapping than the cartoon suggests: a single cortical site influences several muscles, and each muscle is influenced from many sites.

M1 projects to the spinal cord through the **corticospinal tract**. In most mammals its axons end on interneurons, but in primates, and especially in great apes and humans, many end directly on motor neurons, especially those of the hand muscles. These **cortico-motoneuronal** connections are associated with the capacity for independent finger movements.

What does a motor cortex neuron encode? Apostolos Georgopoulos and colleagues trained rhesus monkeys to move a handle from a central position towards targets arranged in a circle (1982). Most neurons in M1 fired most for movements in one **preferred direction**, and their firing fell off smoothly with the angle between the movement and that direction, approximately as a cosine:

$$
r(\theta) = b + k\cos(\theta - \theta_\mathrm{p}),
$$ {#eq-cosine}

where $r$ is the firing rate, $\theta$ the movement direction, $\theta_\mathrm{p}$ the cell's preferred direction, $b$ a baseline rate and $k$ the modulation depth. Each neuron is broadly tuned, active for a wide range of directions, so it cannot by itself specify a direction precisely. A population can.

::: definition Population vector {#def-population-vector}
For a population of neurons with preferred directions $\theta_{\mathrm{p},i}$ (unit vectors $\mathbf u_i$) and rates $r_i$, the **population vector** is the sum of the preferred-direction vectors weighted by each neuron's change in rate from its baseline:

$$
\mathbf P = \sum_i (r_i - b_i)\,\mathbf u_i.
$$

When preferred directions are distributed uniformly and tuning is cosine, $\mathbf P$ points in the direction of the movement.
:::

::: example Decoding direction from four neurons {#ex-popvector}
Four M1 neurons have preferred directions of 0°, 90°, 180° and 270°, each with baseline $b = 30$ impulses s⁻¹ and modulation $k = 20$ impulses s⁻¹ in [[#eq-cosine]]. A monkey moves its arm towards 60°. (a) Calculate each neuron's firing rate. (b) Compute the population vector and its direction. (c) Why would the estimate be noisy in practice, and how is that overcome?
::: solution
(a) $r = 30 + 20\cos(60° - \theta_\mathrm{p})$: at 0°, $30 + 20(0.5) = 40$; at 90°, $30 + 20\cos(-30°) = 47.3$; at 180°, $30 + 20\cos(-120°) = 20$; at 270°, $30 + 20\cos(-210°) = 12.7$ impulses s⁻¹.

(b) Weights $r - b$: $10$, $17.3$, $-10$, $-17.3$. The $x$ component is $10\cos0° + 17.3\cos90° - 10\cos180° - 17.3\cos270° = 10 + 0 + 10 + 0 = 20$. The $y$ component is $0 + 17.3 + 0 + 17.3 = 34.6$. The direction is $\arctan(34.6/20) = 60°$, exactly the movement direction.

(c) Real firing rates fluctuate from trial to trial (roughly Poisson, [[neuroscience/neural-coding]]), tuning curves are not perfect cosines, and preferred directions are not uniformly spaced. With four neurons, these errors would give large errors in direction. Averaging over hundreds of neurons reduces the noise (roughly as the square root of the number), which is how Georgopoulos's population vectors, built from a few hundred cells recorded one at a time, predicted movement direction within a few degrees.
:::
:::

::: widget plot
f: b + k*cos((x - 0)*pi/180); b + k*cos((x - 90)*pi/180); b + k*cos((x - 180)*pi/180); b + k*cos((x - 270)*pi/180)
x: 0, 360
y: 0, 60
sliders: b=30:0:40:1; k=20:5:30:1
labels: \theta_\mathrm{p} = 0°; \theta_\mathrm{p} = 90°; \theta_\mathrm{p} = 180°; \theta_\mathrm{p} = 270°
vlines: 60
caption: Cosine tuning curves of four motor-cortex neurons (vertical axis, impulses per second) against movement direction (horizontal axis, degrees), from [[#eq-cosine]] with baseline $b$ and modulation depth $k$ (sliders). The vertical line marks a movement towards 60°, the case of [[#ex-popvector]]: read off where it crosses each curve to get the four firing rates. Each neuron is broadly tuned, so a single cell's rate is ambiguous (most rates occur at two directions), but the pattern across the four cells is unique to each direction.
:::

Population coding of movement became practical in the 2000s, when arrays of microelectrodes implanted in motor cortex allowed hundreds of neurons to be recorded simultaneously. Decoders based on population activity let monkeys, and later people with paralysis enrolled in clinical studies, control computer cursors and robotic arms directly from cortical activity. Later work has also shown that M1 is not simply a map of movement directions: its population activity during reaching evolves as a dynamical system, with rotational patterns that are better understood as generating the muscle commands than as representing parameters of the movement (Mark Churchland, Krishna Shenoy and colleagues, 2012).

### The cerebellum

The cerebellum contains more than half the neurons of the human brain, almost all of them granule cells, and has a strikingly regular circuit. Mossy fibres from the spinal cord, brainstem and cortex excite granule cells, whose axons, the parallel fibres, run along the cerebellar folia and contact the fan-shaped dendrites of many Purkinje cells, each Purkinje cell receiving up to about 200,000 such synapses. Each Purkinje cell also receives a single **climbing fibre** from the inferior olive in the brainstem, which wraps its dendrites and makes hundreds of synapses; one climbing-fibre impulse produces a large, all-or-none "complex spike". Purkinje cells, the only output of the cerebellar cortex, are inhibitory (GABAergic) and act on the deep cerebellar nuclei.

Damage to the cerebellum does not paralyse; it makes movements clumsy, poorly timed and poorly scaled, and it impairs motor learning. In 1969 David Marr, and in 1971 James Albus, proposed that the cerebellum learns: the climbing fibre carries an error signal that modifies the parallel-fibre synapses active at the same time. Masao Ito and colleagues showed in 1982 that pairing parallel-fibre and climbing-fibre stimulation produces **long-term depression** of the parallel-fibre synapses in the rabbit cerebellum. The cerebellum has been compared to a machine that learns to predict the sensory consequences of motor commands, a **forward model**, and to correct commands before errors occur.

::: example Adapting the vestibulo-ocular reflex {#ex-vor}
When your head turns, the **vestibulo-ocular reflex** (VOR) rotates your eyes in the opposite direction at the same speed, keeping the image of the world stable on the retina. Its **gain** is the ratio of eye velocity to head velocity. (a) What gain is needed for a stable image with normal vision? (b) A person puts on spectacles that magnify the image by a factor of 2. What gain is now needed, and what happens to the image during head turns at first? (c) Over several days of wearing the spectacles, the gain changes. Which part of the brain is required, and what is the error signal?
::: solution
(a) A gain of 1 (eye velocity equal and opposite to head velocity).

(b) Through a magnifying lens the image moves across the retina twice as fast as the head turns, so the eyes must counter-rotate twice as fast: a gain of 2. At first the VOR still has a gain of 1, the image slips across the retina in the direction of head motion, and the world appears to swim.

(c) The cerebellum (the flocculus and adjacent regions, together with brainstem vestibular nuclei). The error signal is **retinal slip**, carried to the cerebellum by climbing fibres from the inferior olive. Experiments with magnifying and reversing prisms in humans, monkeys, cats and rabbits show that the gain adapts over hours to days, and that lesions of the flocculus prevent the adaptation. The learned change is thought to be stored partly in the cerebellar cortex and partly in the brainstem.
:::
:::

### The basal ganglia

The basal ganglia are a set of interconnected nuclei beneath the cortex: the **striatum** (caudate nucleus and putamen), the **globus pallidus**, the **subthalamic nucleus** and the **substantia nigra**. Their output nuclei, the internal segment of the globus pallidus and the substantia nigra pars reticulata, are inhibitory and tonically active, holding their targets in the thalamus and brainstem under constant inhibition. In the classic model:

- the **direct pathway**, from striatal neurons carrying D1 dopamine receptors directly to the output nuclei, inhibits the output nuclei, releasing the thalamus from inhibition and facilitating a movement (a disinhibition);
- the **indirect pathway**, from striatal neurons carrying D2 receptors through the external globus pallidus and the subthalamic nucleus, increases the output nuclei's inhibition and suppresses movement;
- **dopamine** from the substantia nigra pars compacta excites the direct pathway and inhibits the indirect one, so that dopamine favours movement.

The circuit is thought to select among competing actions, releasing the chosen one and suppressing the others, and dopamine signals also teach the striatum which actions lead to reward ([[neuroscience/plasticity-learning]]). The classic model is a simplification: the two pathways interact, are co-active during movement, and include feedback loops. Loss of dopamine neurons, the hallmark of Parkinson's disease, produces difficulty initiating movements; that and other clinical disorders of the basal ganglia are covered in [Medicine Atlas: movement disorders](/learn/medicine/lesson.php?c=nervous-system&l=movement-disorders).

## Efference copy

When you move your eyes, the image on your retina sweeps across it, yet the world appears stationary. When you press gently on the side of your eye through the eyelid, the world appears to jump. The difference is that in the first case the brain knows that the eye was commanded to move.

In 1950 Erich von Holst and Horst Mittelstaedt, studying the hoverfly *Eristalis*, and Roger Sperry, studying fish whose eyes had been surgically rotated by 180°, independently proposed that when the nervous system issues a motor command it also sends a copy of that command to sensory centres, so that they can subtract the expected sensory consequences of the animal's own movement. Von Holst and Mittelstaedt called it the **efference copy**; Sperry, the **corollary discharge**. In von Holst and Mittelstaedt's experiment, a fly whose head had been rotated by 180° so that its left and right eyes were swapped circled endlessly: every self-generated turn produced visual motion that was misinterpreted as an external perturbation demanding a further turn in the same direction.

Corollary discharges are found in many animals. A singing male cricket produces sounds loud enough to deafen its own ears; a corollary-discharge interneuron inhibits its auditory pathway in time with each chirp, keeping it sensitive to other crickets between chirps (James Poulet and Berthold Hedwig, 2006). Weakly electric fishes cancel the electrical signal of their own discharge using a learned negative image of it in a cerebellum-like structure. The principle generalises the idea of a forward model: to act well, nervous systems predict the consequences of their actions.

::: application Restoring movement
Understanding motor circuits has practical uses. Epidural electrical stimulation of the lumbar spinal cord, timed to the phases of walking, activates the spinal locomotor circuits and, in combination with training, has enabled some people with chronic spinal cord injuries to stand and take steps in clinical studies. Brain–computer interfaces decode intended movements from population activity in motor cortex. Both are research applications under clinical evaluation as of 2026; the clinical management of spinal injury and neurological disease belongs to [Medicine Atlas: nervous system](/learn/medicine/course.php?c=nervous-system).
:::

::: history
Charles Bell and François Magendie established in the 1810s and 1820s that the ventral roots of the spinal cord are motor and the dorsal roots sensory. Sherrington's *The Integrative Action of the Nervous System* (1906) analysed reflexes, reciprocal innervation and the final common path; he shared the Nobel Prize with Edgar Adrian in 1932. Graham Brown proposed the half-centre model in 1911 and 1914. Fritsch and Hitzig located the motor cortex in 1870. Liddell and Sherrington described the stretch reflex in 1924 and Lloyd proved its monosynaptic pathway in 1943. Henneman stated the size principle in 1957. Von Holst and Mittelstaedt, and Sperry, introduced efference copy in 1950. Wilson's study of locust flight (1961), Grillner's of the lamprey and Marder's of the stomatogastric ganglion established the CPG concept in the following decades. Marr (1969) and Albus (1971) proposed cerebellar learning theories, and Georgopoulos and colleagues described directional tuning (1982) and the population vector (1986) in monkey motor cortex.
:::

## Where this leads

How these circuits are built during development, with motor neurons finding their muscles and reflex connections forming with the right specificity, is part of [[neuroscience/neural-development]]. How motor skills are learned, in the cerebellum and basal ganglia, is in [[neuroscience/plasticity-learning]]. How behaviour as a whole is organised is the subject of [[behaviour/mechanisms-of-behaviour]].

::: summary
- The motor unit (one motor neuron and its muscle fibres) is the unit of force; innervation ratios range from about ten to more than a thousand fibres per neuron.
- Force is graded by rate coding (twitches summate into an unfused and then a fused tetanus) and by recruitment, which follows the size principle (Henneman): small, slow, fatigue-resistant units first, because small motor neurons have a high input resistance.
- Muscle spindles (Ia, II afferents; γ motor neurons) signal length and its rate of change; Golgi tendon organs (Ib) signal force. The stretch reflex is monosynaptic, with reciprocal inhibition of antagonists; withdrawal and crossed-extension reflexes are polysynaptic. Reflex gain is modulated by task and phase.
- Central pattern generators produce rhythmic output without rhythmic input, by pacemaker neurons, half-centre oscillators or networks; they behave as limit cycles. Many parameter sets give the same rhythm.
- Motor cortex neurons are broadly tuned to movement direction; population activity (the population vector, and modern dynamical models) specifies movement.
- The cerebellum calibrates movements and learns from climbing-fibre error signals; the basal ganglia select actions by disinhibition, with dopamine favouring the direct pathway.
- Efference copies (corollary discharges) let sensory systems cancel the consequences of self-generated movement.
:::

## Exercises

::: exercise Innervation ratio {level=1 check="1600"}
A muscle contains 960,000 muscle fibres and is innervated by 600 motor neurons. What is the average innervation ratio?
::: solution
$960{,}000/600 = 1600$ fibres per motor unit, typical of a large limb muscle.
:::
:::

::: exercise Threshold current {level=1 check="8"}
A motor neuron with an input resistance of 1.5 MΩ must be depolarised by 12 mV to fire. What steady current (in nA) does it need?
::: solution
$12\ \mathrm{mV}/1.5\ \mathrm{M\Omega} = 8$ nA.
:::
:::

::: exercise Which reflex? {level=1}
Identify the reflex or receptor: (a) your knee jerks when the patellar tendon is tapped; (b) you pull your hand from a hot surface and shift your weight; (c) a weightlifter's muscle suddenly relaxes under an excessive load; (d) your grip tightens on a slipping glass.
::: solution
(a) The monosynaptic stretch reflex, from quadriceps spindles (Ia afferents) to quadriceps α motor neurons. (b) The flexion withdrawal reflex with crossed extension (polysynaptic, nociceptive afferents). (c) Autogenic inhibition from Golgi tendon organs (Ib afferents), traditionally invoked as a protective reflex; its real role is more in regulating force than in protection. (d) A rapid grip response triggered by cutaneous mechanoreceptors (especially rapidly adapting Meissner endings detecting slip), which is faster than voluntary reaction time and involves spinal and cortical pathways.
:::
:::

::: exercise Population vector with unequal neurons {level=2}
Two neurons have preferred directions of 0° and 90°, baselines of 20 impulses s⁻¹, and modulation depths of 10 and 30 impulses s⁻¹. A movement is made towards 45°. (a) Compute their rates and the population vector direction. (b) Explain the error and suggest how to correct it.
::: solution
(a) Rates: $20 + 10\cos45° = 27.1$ and $20 + 30\cos45° = 41.2$. Weights $7.1$ and $21.2$; the vector is $(7.1, 21.2)$, direction $\arctan(21.2/7.1) = 71.5°$, not 45°. (b) The population vector assumes equal modulation depths; the more strongly modulated neuron pulls the estimate towards its preferred direction. Normalising each weight by the neuron's modulation depth, $(r - b)/k$, gives $(0.707, 0.707)$ and the correct 45°. Better still, decoders such as the optimal linear estimator or maximum-likelihood methods take each neuron's tuning and variability into account ([[neuroscience/neural-coding]]).
:::
:::

::: exercise Interpreting a deafferentation experiment {level=2}
In an isolated nervous system of a leech, bathed in serotonin, motor nerves show bursts that alternate between dorsal and ventral muscle motor neurons with a period of about 1 s, and the phase delay between segments is such that a wave would travel from head to tail. (a) What does this show? (b) In the intact animal, the swimming cycle period is shorter and adapts to water resistance. What does this show? (c) What experiment would test whether a particular interneuron is part of the CPG?
::: solution
(a) The swimming rhythm and its intersegmental coordination are generated centrally: fictive swimming occurs without sensory feedback and without movement. (b) Sensory feedback from the body wall (stretch receptors) and possibly descending inputs adjust the rhythm in the intact animal; the CPG is not the whole story. (c) Record the neuron during fictive swimming to see whether it fires rhythmically in a consistent phase; then perturb it, by injecting brief current pulses during the cycle. If depolarising or hyperpolarising it resets the phase of the rhythm (shifts subsequent bursts) rather than just changing one cycle, it is part of the rhythm-generating circuit. Deleting it (photoablation or hyperpolarisation) and observing loss or alteration of the rhythm provides further evidence.
:::
:::

::: exercise Gains and losses of the stretch reflex {level=2}
The stretch reflex acts as a negative-feedback loop on muscle length. Using the proportional-control model of [[animal-physiology/homeostasis]], explain (a) why a stretch reflex alone cannot hold a limb exactly at a set position against a load, (b) why a very high reflex gain might be harmful given conduction delays of 20–40 ms around the loop, and (c) how the nervous system copes.
::: solution
(a) A proportional controller leaves a steady-state error $D/(1 + G)$; a load (the disturbance) therefore always stretches the muscle a little, with the reflex reducing but not eliminating the displacement. (b) In a loop with delay, a high gain causes overshoot and oscillation, because the correction is based on stale information; in the limb, high stretch-reflex gain can produce tremor (an oscillation at a frequency related to the loop delay). (c) Reflex gain is kept moderate and adjusted to the task; the brain uses feedforward control, predicting loads and setting muscle forces in advance (the anticipatory tightening of grip when lifting); co-contraction of antagonists stiffens joints mechanically, with no delay; and longer-latency transcortical reflexes, slower but more flexible, add task-specific corrections.
:::
:::

::: exercise A circuit with many solutions {level=3}
In the stomatogastric ganglion, a particular neuron's maximal conductances for two K⁺ currents vary threefold between animals, yet its firing pattern is very similar. (a) Explain how this is possible. (b) What does it imply about attempts to infer circuit function from a single animal's measured parameters, or from an "average" animal? (c) Suggest a mechanism that could maintain the right output despite variable parameters.
::: solution
(a) Several conductances can compensate for one another: a firing pattern depends on combinations (for example, the balance of inward and outward currents at certain voltages), not on each conductance separately, so many parameter combinations lie on a "solution manifold" of equivalent output. Experiments show that the variable conductances are often correlated across animals, consistent with compensation. (b) A model built with average parameters can fail, because the average of several good solutions need not itself be a good solution if the solution region is curved. Each animal must be understood as one point in a space of acceptable configurations. (c) Homeostatic regulation of channel expression by activity: a neuron might sense its own average Ca²⁺ entry, a proxy for firing, and adjust the transcription of its channel genes until it reaches a target activity level. Models of this kind (Marder, LeMasson and Abbott) produce exactly the compensatory, correlated variability observed.
:::
:::

::: exercise Recruitment and precision {level=3}
A muscle has 100 motor units whose twitch forces increase geometrically, unit $i$ producing force $F_0\,c^{\,i-1}$ with $c$ chosen so that the largest unit is 100 times the smallest. (a) Find $c$. (b) Units are recruited in order. When unit $i$ is recruited, the increment in total force is the force of that unit. Show that the increment, as a fraction of the total force already present, is roughly constant for large $i$, and estimate it. (c) Relate the result to Weber's law and to the size principle.
::: hint
The total force of the first $i - 1$ units is a geometric series.
:::
::: solution
(a) $c^{99} = 100$, so $c = 100^{1/99} = \mathrm{e}^{\ln100/99} = \mathrm{e}^{0.0465} = 1.048$.

(b) The force of the first $i - 1$ units is $F_0(c^{i-1} - 1)/(c - 1)$. The next unit adds $F_0c^{i-1}$. The ratio is $c^{i-1}(c - 1)/(c^{i-1} - 1)$, which for large $i$ (when $c^{i-1} \gg 1$) tends to $c - 1 = 0.048$, about 5 %. For example, at $i = 80$, $c^{79} = 39.4$ and the ratio is $39.4\times0.048/38.4 = 0.049$.

(c) Each recruitment step increases force by a nearly constant fraction of the force present: the absolute step grows with force, but the relative step stays constant, a Weber-like scaling of motor resolution. Because the size principle recruits units in increasing order of size, small forces are graded by small units and large forces by large ones, so the relative precision of force control is similar at low and high forces. Rate coding fills in between recruitment steps. Measured motor-unit force distributions in many muscles are indeed skewed, with many small and few large units.
:::
:::
