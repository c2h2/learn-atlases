A fibroblast crawling across a culture dish pushes out a thin sheet of cytoplasm at its front, grips the surface, and pulls its body along behind. A dividing cell builds a spindle of fibres that separates its chromosomes with remarkable precision, then pinches itself in two. A neuron sends vesicles a metre down its axon, a sperm cell swims by beating its tail, and the muscle of your arm contracts when its fibres slide past one another. All of this is the work of the **cytoskeleton**: a set of protein filaments, the proteins that make and break them, and the motor proteins that walk along them.

The name suggests a rigid scaffold, and that is misleading. The cytoskeleton is built from subunits that are continually added and removed, so a structure can be dismantled in one place and rebuilt in another in minutes. This chapter introduces the three filament systems, explains how polymerisation of a filament is controlled and how it can push, describes the motors that convert ATP into movement along filaments, and puts these parts together in cilia, muscle and crawling cells. We need only a few quantitative ideas: a critical concentration, a rate of elongation, a step size and a force. The cytoskeleton's role in division is taken up in [[cell-biology/cell-cycle]].

## Three kinds of filament

| | actin filaments (microfilaments) | microtubules | intermediate filaments |
|---|---|---|---|
| subunit | actin, 42 kDa, binds ATP | α/β-tubulin heterodimer, 2 × 50 kDa, binds GTP | many families: keratins, vimentin, neurofilament proteins, lamins |
| structure | two-stranded helix, ≈ 7 nm wide | hollow tube of 13 protofilaments, 25 nm outer diameter | rope of 8 tetramers in cross-section, ≈ 10 nm wide |
| polarity | yes: barbed (+) and pointed (−) ends | yes: plus and minus ends | no |
| motors | myosins | kinesins, dyneins | none |
| typical roles | cell cortex, protrusion, contraction, cytokinesis, microvilli | long-range transport, spindle, cilia, organising the cytoplasm | mechanical strength; nuclear lamina |

Actin is one of the most abundant proteins in eukaryotic cells — several per cent of total protein, at concentrations of the order of 100 µmol L⁻¹ in non-muscle cells — and one of the most conserved: yeast and human actin are about 90 % identical in sequence. Each subunit adds 2.75 nm to a filament, so 1 µm of filament contains about 370 subunits. A microtubule adds 8 nm per layer of 13 tubulin dimers, about 1600 dimers per micrometre.

Bacteria have homologues of both. FtsZ, a tubulin homologue, forms the ring that constricts a dividing bacterium, and MreB, an actin homologue, guides the synthesis of the cell wall in rod-shaped bacteria; another actin homologue, ParM, pushes plasmids apart. Their discovery in the 1990s and early 2000s showed that the cytoskeleton is older than the eukaryotic cell. Intermediate filaments, by contrast, are found only in animals (with distant relatives such as crescentin in the bacterium *Caulobacter*).

::: definition Polymer polarity, critical concentration and treadmilling {#def-critical-concentration}
Actin filaments and microtubules are **polar** polymers: every subunit faces the same way, so the two ends are structurally and kinetically different. At each end, subunits add at a rate $k_\mathrm{on}c$ proportional to the concentration $c$ of free subunits and leave at a rate $k_\mathrm{off}$ independent of it. The **critical concentration** of an end is $C_\mathrm{c} = k_\mathrm{off}/k_\mathrm{on}$: above it the end grows, below it the end shrinks. When the two ends have different critical concentrations, there is a range of $c$ in which one end grows while the other shrinks; at the steady state where they balance, subunits flow through the filament from one end to the other, which is called **treadmilling**.
:::

## Polymerisation dynamics

::: proposition Elongation rate of a polymer end {#prop-elongation}
For an end with association rate constant $k_\mathrm{on}$ and dissociation rate constant $k_\mathrm{off}$, the net rate of addition of subunits is

$$
\frac{dn}{dt} = k_\mathrm{on}c - k_\mathrm{off} = k_\mathrm{on}\,(c - C_\mathrm{c}),
$$ {#eq-elongation}

and the end advances at $\delta\,(k_\mathrm{on}c - k_\mathrm{off})$, where $\delta$ is the length added per subunit. Assumptions: subunits add and leave one at a time; the free-subunit concentration $c$ is constant (a large pool); and the end does not change its state, for example by hydrolysing its bound nucleotide, during the time considered.
:::

For ATP-actin, Thomas Pollard measured in 1986, by electron microscopy of filaments growing from seeds, $k_\mathrm{on} = 11.6\ \mathrm{\mu M^{-1}\,s^{-1}}$ and $k_\mathrm{off} = 1.4\ \mathrm{s^{-1}}$ at the barbed end and $k_\mathrm{on} = 1.3\ \mathrm{\mu M^{-1}\,s^{-1}}$ and $k_\mathrm{off} = 0.8\ \mathrm{s^{-1}}$ at the pointed end.

::: example How fast does an actin filament grow? {#ex-actin-growth}
Using Pollard's constants, calculate (a) the critical concentration at each end; (b) the rate at which each end grows, in subunits per second and nanometres per second, in 10 µM ATP-actin; (c) the concentration at which the filament treadmills with no change of length, and the treadmilling rate.
::: solution
(a) Barbed: $C_\mathrm{c} = 1.4/11.6 = 0.12\ \mathrm{\mu M}$. Pointed: $C_\mathrm{c} = 0.8/1.3 = 0.62\ \mathrm{\mu M}$.

(b) Barbed: $11.6\times10 - 1.4 = 115\ \mathrm{s^{-1}}$, so $115\times2.75 = 315\ \mathrm{nm\,s^{-1}}$, about 0.3 µm per second. Pointed: $1.3\times10 - 0.8 = 12\ \mathrm{s^{-1}}$, about 34 nm s⁻¹. The barbed end grows nearly ten times faster, which is why it was called the "plus" end.

(c) Total length is constant when the two ends' net rates sum to zero: $(11.6 + 1.3)c = 1.4 + 0.8$, so $c_\mathrm{ss} = 2.2/12.9 = 0.17\ \mathrm{\mu M}$, between the two critical concentrations. There the barbed end gains $11.6\times0.17 - 1.4 = 0.58$ subunits per second and the pointed end loses as many: a subunit added at the barbed end of a 1 µm filament reaches the pointed end after about $370/0.58 \approx 640\ \mathrm{s}$, some ten minutes.
:::
:::

Treadmilling in pure actin is slow; cells accelerate it enormously with accessory proteins, as we shall see in crawling cells.

::: widget plot
f: kb*x - 1.4; 1.3*x - 0.8
x: 0, 2
y: -2, 15
sliders: kb=11.6:5:15:0.1
labels: \text{barbed end (subunits s}^{-1}); \text{pointed end (subunits s}^{-1})
hlines: 0
vlines: 0.17
caption: Net elongation rate [[#eq-elongation]] of the barbed and pointed ends of an actin filament, in subunits per second, against the concentration of free ATP-actin in µM. Each line crosses zero at that end's critical concentration (0.12 and 0.62 µM with the default constants); the slider changes the barbed-end association constant. The vertical line marks the treadmilling concentration of [[#ex-actin-growth]], where the barbed end grows exactly as fast as the pointed end shrinks.
:::

::: intuition Why two ends can differ: the cost of a nucleotide
For a simple equilibrium polymer, the two ends *must* have the same critical concentration: adding a subunit to either end produces the same filament, so the free-energy change, and hence $k_\mathrm{off}/k_\mathrm{on}$, is the same. Actin and tubulin escape this because they hydrolyse their nucleotide after polymerising. A subunit adds as ATP-actin (or GTP-tubulin) but leaves, from the older parts of the filament, as ADP-actin (GDP-tubulin), which binds less tightly. The ends differ in which nucleotide state they mostly expose, and the hydrolysis pays for treadmilling and for the dynamic instability of microtubules. Measured with ADP-actin alone, the two critical concentrations are indeed equal.
:::

### Nucleation

Starting a filament is much harder than extending one: two or three actin subunits bind each other only weakly, so spontaneous nucleation is slow, which lets cells decide where filaments start. They do it with nucleators. The **Arp2/3 complex** (Laura Machesky and Thomas Pollard, 1994, from *Acanthamoeba*) binds the side of an existing filament and starts a branch at 70°, building the dendritic networks at the front of crawling cells. **Formins** sit on the barbed end of a growing unbranched filament, as in cytokinetic rings and stress fibres. Microtubules are nucleated from rings of γ-tubulin at **microtubule-organising centres** — in animal cells mostly the **centrosome**, a pair of centrioles in a cloud of pericentriolar material — so most microtubules have their minus ends near the centre of the cell and their plus ends pointing outwards.

Other proteins regulate the pool and the filaments: profilin and thymosin β4 bind free actin subunits (holding a large unpolymerised reserve), capping proteins block barbed ends, cofilin severs and depolymerises older ADP-actin, and many cross-linkers bundle filaments (in microvilli and filopodia) or join them into gels (in the cortex).

### Dynamic instability of microtubules

In 1984 Tim Mitchison and Marc Kirschner found that microtubules grown from centrosomes in vitro do not grow steadily. Individual microtubules grow slowly for a while, then suddenly switch to rapid shrinking — a **catastrophe** — and then, sometimes, switch back — a **rescue**. They called this **dynamic instability**. The cause is the GTP cap: tubulin dimers add with GTP on their β subunit and hydrolyse it soon after; as long as the end carries a cap of GTP-tubulin the lattice is stable, but if hydrolysis catches up with addition the exposed GDP-tubulin protofilaments curl outwards and the microtubule falls apart.

Dynamic instability lets a cell search space. A microtubule growing from the centrosome in a random direction explores the cytoplasm and is either stabilised when its plus end is captured — by a kinetochore on a chromosome, or a cortical site — or rapidly withdrawn and replaced by another in a new direction. Marileen Dogterom and Stanislas Leibler (1993) gave the statistics of this search a compact form.

::: proposition Mean length of a dynamically unstable microtubule {#prop-dogterom}
A microtubule end grows at speed $v_\mathrm{g}$ and shrinks at speed $v_\mathrm{s}$, switching from growth to shrinkage at rate $f_\mathrm{cat}$ and back at rate $f_\mathrm{res}$. Its average drift velocity is

$$
J = \frac{v_\mathrm{g}f_\mathrm{res} - v_\mathrm{s}f_\mathrm{cat}}{f_\mathrm{cat} + f_\mathrm{res}}.
$$ {#eq-drift}

If $J > 0$ the microtubule grows without limit (until it meets the cell edge). If $J < 0$ the length distribution is exponential with mean

$$
\bar L = \frac{v_\mathrm{g}v_\mathrm{s}}{v_\mathrm{s}f_\mathrm{cat} - v_\mathrm{g}f_\mathrm{res}}.
$$ {#eq-mean-length}

Assumptions: the switching rates and speeds are constant (independent of length and time), the microtubule is nucleated at a fixed site and is regrown immediately after complete depolymerisation, and the two states are memoryless.
:::

::: proof Drift velocity
The microtubule alternates between growth phases of mean duration $1/f_\mathrm{cat}$ and shrinkage phases of mean duration $1/f_\mathrm{res}$, so in the long run it spends a fraction $f_\mathrm{res}/(f_\mathrm{cat}+f_\mathrm{res})$ of its time growing and $f_\mathrm{cat}/(f_\mathrm{cat}+f_\mathrm{res})$ shrinking. Its mean velocity is the time-weighted average, $J = v_\mathrm{g}\cdot\frac{f_\mathrm{res}}{f_\mathrm{cat}+f_\mathrm{res}} - v_\mathrm{s}\cdot\frac{f_\mathrm{cat}}{f_\mathrm{cat}+f_\mathrm{res}}$. The length distribution follows from the steady-state solution of the two coupled advection equations for growing and shrinking microtubules (Dogterom and Leibler, 1993); we quote the result.
:::

::: example A microtubule's typical length {#ex-microtubule}
In a representative interphase cell, a microtubule plus end grows at 1.5 µm min⁻¹ and shrinks at 20 µm min⁻¹, with $f_\mathrm{cat} = 0.01\ \mathrm{s^{-1}}$ and $f_\mathrm{res} = 0.05\ \mathrm{s^{-1}}$ (illustrative values of the order measured in vivo). Is growth bounded, and what is the mean length?
::: solution
Convert speeds: $v_\mathrm{g} = 0.025\ \mathrm{\mu m\,s^{-1}}$, $v_\mathrm{s} = 0.333\ \mathrm{\mu m\,s^{-1}}$. Then

$$
J = \frac{0.025\times0.05 - 0.333\times0.01}{0.06} = \frac{0.00125 - 0.00333}{0.06} = -0.035\ \mathrm{\mu m\,s^{-1}} < 0,
$$

so growth is bounded, and

$$
\bar L = \frac{0.025\times0.333}{0.00333 - 0.00125} = \frac{0.00833}{0.00208} = 4.0\ \mathrm{\mu m}.
$$

The microtubule spends five-sixths of its time growing yet is short on average, because shrinking is so much faster. Halving $f_\mathrm{cat}$ ([[#exr-catastrophe]]) raises the mean length fivefold, to 20 µm: a small change in a switching rate makes a large change in the network. Cells use exactly this lever, through proteins that promote or suppress catastrophes, to remodel their microtubules at the start of mitosis.
:::
:::

The figure simulates one microtubule end as a two-state Markov chain with one-second steps.

::: widget markov
matrix: 0.99,0.01; 0.05,0.95
states: Growing; Shrinking
start: 0
steps: 200
caption: A microtubule end as a two-state Markov chain with time steps of one second: from growing it undergoes catastrophe with probability 0.01 per second, from shrinking it is rescued with probability 0.05 per second, as in [[#ex-microtubule]]. Step through the walk to see long growing phases broken by brief shrinking ones; the stationary distribution shows the fraction of time in each state ($5/6$ growing). Combined with the much faster shrinking speed, that gives the negative drift of [[#eq-drift]].
:::

### Polymerisation can push

A growing filament whose end presses against a membrane can still add subunits whenever thermal fluctuations open a gap of one subunit length. This **Brownian ratchet** mechanism (Charles Peskin, Garrett Odell and George Oster, 1993, building on Terrell Hill's thermodynamics) means polymerisation itself can do work. The maximum force a single filament can generate follows from thermodynamics: adding a subunit against a force $F$ costs work $F\delta$, so the filament stalls when $F\delta = k_\mathrm{B}T\ln(c/C_\mathrm{c})$:

$$
F_\text{stall} = \frac{k_\mathrm{B}T}{\delta}\ln\frac{c}{C_\mathrm{c}}.
$$ {#eq-stall}

::: example How hard can one actin filament push? {#ex-stall}
Estimate the stall force of a single actin filament growing at its barbed end in 10 µM ATP-actin at 37 °C, and compare it with the forces of motor proteins.
::: solution
With $C_\mathrm{c} = 0.12\ \mathrm{\mu M}$, $c/C_\mathrm{c} = 83$; with $\delta = 2.75\ \mathrm{nm}$ and $k_\mathrm{B}T = 4.28\ \mathrm{pN\,nm}$,

$$
F_\text{stall} = \frac{4.28}{2.75}\ln 83 = 1.56\times4.42 \approx 7\ \mathrm{pN}.
$$

That is comparable to the stall force of a single kinesin (about 6 pN, see [[#ex-kinesin]]): polymerisation is a motor in its own right. The estimate is an upper limit, since a real filament end also fluctuates and may bend; measured forces of single filaments are of the order of 1–10 pN. Branched networks of many filaments push the leading edge of a crawling cell.
:::
:::

## Motor proteins

Motor proteins hydrolyse ATP and use the energy to move along a filament, each step coupled to a conformational change. Three families exist.

::: definition Motor protein {#def-motor}
A **motor protein** is an enzyme that converts the free energy of ATP hydrolysis into directed mechanical work along a polar filament, through a cycle of binding, conformational change (the **power stroke**) and release that is coupled to the binding of ATP, its hydrolysis, and the release of ADP and phosphate. **Myosins** move on actin (most towards the barbed end); **kinesins** on microtubules (most towards the plus end); **dyneins** on microtubules towards the minus end. A motor is **processive** if a single molecule takes many steps without detaching, as two-headed kinesin-1 and myosin V do by keeping at least one head bound at all times.
:::

Kinesin was discovered in 1985 by Ronald Vale, Thomas Reese and Michael Sheetz, who watched organelles moving along filaments in cytoplasm squeezed from the giant axon of the squid *Loligo pealei* and purified the protein responsible. Single-molecule experiments in the 1990s, especially optical-trap measurements by Karel Svoboda, Steven Block and colleagues (1993–94), showed that kinesin-1 walks hand over hand in **8 nm steps** — the length of one tubulin dimer — consuming one ATP per step, moving at up to about 0.8 µm s⁻¹ and stalling against a load of about 6 pN.

::: example The efficiency of kinesin {#ex-kinesin}
(a) How many steps per second does kinesin-1 take at 0.8 µm s⁻¹? (b) How much work does it do per step against a load just below its stall force of 6 pN? (c) Compare this with the free energy of hydrolysing one ATP molecule in the cell, about 55 kJ mol⁻¹, and estimate the efficiency.
::: solution
(a) $800\ \mathrm{nm\,s^{-1}}/8\ \mathrm{nm} = 100$ steps per second, and so about 100 ATP per second.

(b) $W = F\delta = 6\ \mathrm{pN}\times8\ \mathrm{nm} = 48\ \mathrm{pN\,nm} = 4.8\times10^{-20}\ \mathrm{J}$.

(c) Per molecule, $55\times10^3/6.022\times10^{23} = 9.1\times10^{-20}\ \mathrm{J} = 91\ \mathrm{pN\,nm}$, or about $21\,k_\mathrm{B}T$. The efficiency near stall is $48/91 \approx 50\ \%$. Motor proteins are remarkably efficient machines — comparable to the best human-made engines — because they work close to thermodynamic reversibility at the molecular scale.
:::
:::

Cells use motors for many tasks. Kinesins and cytoplasmic dynein carry vesicles, mitochondria, mRNAs and viruses along microtubules — in axons, kinesin carries cargo out from the cell body and dynein brings it back, the **fast axonal transport** that solves the diffusion problem of [[cell-biology/cells-and-microscopy#ex-diffusion-times]]. Myosin V carries cargo along actin in 36 nm strides. Myosin II, which assembles into bipolar thick filaments, generates contraction by pulling antiparallel actin filaments together, in muscle and in the contractile ring of a dividing cell.

::: warning "Motor proteins pull their cargo by consuming the filament" — or "filaments are rigid rails"
Two opposite misconceptions are common. Motors do not consume or depolymerise the filament they walk on (with some specialised exceptions, such as kinesin-13, which depolymerises microtubule ends without walking at all); the energy comes from ATP. And the "rails" are not permanent: the filaments are themselves dynamic, often turning over in minutes, and polymerisation and motor activity cooperate — at the front of a crawling cell, actin polymerisation pushes while myosin II pulls the network backwards. A related error is to think the cytoskeleton is only structural: through its motors and dynamics it is the cell's main machinery for movement and organisation.
:::

## Cilia and flagella

Eukaryotic **cilia** and **flagella** (the same structure, the names reflecting number and length) are whip-like extensions of the plasma membrane built around an **axoneme**: nine doublet microtubules in a ring around a central pair — the "9 + 2" arrangement — anchored in a **basal body**, a centriole-like structure. Ian Gibbons discovered the motor that drives them, **axonemal dynein**, in cilia of the protist *Tetrahymena* in 1965 (naming it from the Greek for force). Dynein arms attached to each doublet walk along the neighbouring doublet. In 1971 Keith Summers and Gibbons showed that if the axonemes of sea-urchin sperm are briefly digested with a protease and then given ATP, the doublets slide past one another and the axoneme telescopes to several times its length. In an intact axoneme, linking proteins prevent free sliding, so sliding is converted into bending.

Eukaryotic flagella are unrelated to bacterial flagella, which are rigid helical filaments of the protein flagellin, rotated at their base by a rotary motor driven by the proton (or sodium) gradient across the bacterial membrane.

Most vertebrate cells also have a single non-motile **primary cilium**, with a "9 + 0" axoneme, which acts as a signalling antenna: in vertebrates the Hedgehog pathway ([[cell-biology/cell-signalling]]) operates in it. Defects in cilia cause a range of inherited conditions, the ciliopathies ([Medicine Atlas: genetics](/learn/medicine/course.php?c=genetics)).

## Muscle: the sliding-filament mechanism

Skeletal muscle is the most ordered actin–myosin system. Each muscle fibre is a giant multinucleate cell packed with myofibrils, chains of repeating **sarcomeres** about 2–3 µm long. Each sarcomere consists of thin actin filaments anchored at Z discs on either side, interdigitating with bipolar thick filaments of myosin II about 1.6 µm long in the middle. In 1954 two pairs of researchers — Hugh Huxley and Jean Hanson, using phase-contrast and electron microscopy of rabbit muscle, and Andrew Huxley and Rolf Niedergerke, using interference microscopy of frog fibres — showed independently that the filaments do not change length during contraction: they slide past each other, the overlap increasing as the sarcomere shortens.

Each myosin head cycles: it binds actin, releases phosphate, swings its lever arm through a power stroke of about 5–10 nm, releases ADP, binds ATP (which detaches it — hence rigor mortis when ATP runs out), and hydrolyses the ATP to recock. Contraction is switched on by Ca²⁺ released from the sarcoplasmic reticulum ([[cell-biology/organelles]]), which binds troponin on the thin filaments and moves tropomyosin away from the myosin-binding sites. The force a fibre produces depends on how many heads can reach actin, and so on filament overlap — the length–tension relation of [[#exr-length-tension]]. The physiology of muscle, in humans, is in [Medicine Atlas: muscle](/learn/medicine/lesson.php?c=physiology&l=muscle).

## Crawling cells

Many animal cells crawl over surfaces: fibroblasts healing a wound, neutrophils hunting bacteria, neurons' growth cones extending axons, cells migrating in an embryo. Crawling has four parts.

1. **Protrusion.** At the leading edge a flat **lamellipodium** is pushed out by a dendritic actin network nucleated by Arp2/3 and growing at its barbed ends against the membrane, as in [[#eq-stall]]; thin finger-like **filopodia** are pushed by bundles of parallel filaments made by formins. The network treadmills: assembled at the front, disassembled by cofilin further back, its subunits recycled.
2. **Adhesion.** Transmembrane **integrins** at the front bind the extracellular matrix and connect, through adaptor proteins such as talin and vinculin, to the actin network, forming focal adhesions that act as a clutch ([[cell-biology/tissues-and-cell-death]]).
3. **Contraction.** Myosin II in the cell body and rear contracts the actin network, pulling the cell body forwards against the adhesions.
4. **Retraction.** Adhesions at the rear are released and the tail follows.

Fish epidermal keratocytes, which glide with an almost constant fan shape at speeds of the order of 10–20 µm per minute, have been a favourite model because these steps proceed simultaneously and steadily. Signalling through small GTPases of the Rho family — Rac for lamellipodia, Cdc42 for filopodia, Rho for contraction (Alan Hall and Anne Ridley, 1992) — coordinates them and steers the cell up gradients of attractants, as neutrophils do towards bacterial peptides.

::: application Drugs that act on the cytoskeleton
Because microtubules are essential for the mitotic spindle, drugs that perturb their dynamics stop dividing cells. Colchicine, from the autumn crocus, binds tubulin dimers and prevents polymerisation; it was the tool used to identify tubulin in the 1960s (Gary Borisy and Edwin Taylor, 1967). Taxol (paclitaxel), from the bark of the Pacific yew, does the opposite: it binds microtubules and stabilises them (Peter Schiff, Jane Fant and Susan Horwitz, 1979). Either effect blocks mitosis, and taxanes and vinca alkaloids are used in cancer chemotherapy ([Medicine Atlas: pharmacology](/learn/medicine/course.php?c=pharmacology)). For actin, phalloidin (from the death-cap mushroom) stabilises filaments and, coupled to a fluorescent dye, is the standard stain for F-actin in fixed cells; cytochalasins cap barbed ends and latrunculins sequester monomers, and both are used in research to test whether a process needs actin dynamics.
:::

::: quiz
Cells are treated with a low dose of a drug that slightly reduces the rate of microtubule catastrophe but leaves growth and shrinkage speeds unchanged. According to [[#prop-dogterom]], what happens to the microtubule network?
- [ ] Nothing, because the speeds are unchanged.
- [ ] Microtubules become shorter, because there are fewer shrinkage events to rescue.
- [x] Microtubules become longer on average, and may switch from bounded to unbounded growth.
- [ ] Microtubules stop growing, because catastrophes are needed to recycle tubulin.
::: solution
In [[#eq-mean-length]] the denominator $v_\mathrm{s}f_\mathrm{cat} - v_\mathrm{g}f_\mathrm{res}$ falls as $f_\mathrm{cat}$ falls, so $\bar L$ rises sharply; when the denominator reaches zero, $J$ becomes positive and the microtubules grow until they hit the cell edge. Microtubule-stabilising drugs such as taxol act partly this way. (At high doses taxol also suppresses growth and shrinkage altogether.)
:::
:::

## Intermediate filaments

Intermediate filaments get their name from their diameter, about 10 nm, between those of actin filaments and microtubules. Their subunits are long, fibrous proteins with a central α-helical rod that coil in pairs; pairs associate antiparallel into tetramers, so the filament has no polarity, and eight tetramers side by side make the rope-like filament. Intermediate filaments do not bind nucleotides, have no motors, and are exceptionally tough and extensible, able to stretch to several times their length without breaking. They give cells and tissues mechanical strength: keratins in epithelia (humans have 54 functional keratin genes), vimentin in mesenchymal cells, desmin in muscle, neurofilaments in axons, and the nuclear **lamins**, which form the nuclear lamina in all animal cells. Keratin filaments are anchored at desmosomes and hemidesmosomes, spreading mechanical load from cell to cell across an epithelium. Elaine Fuchs's group showed in 1991 that mice expressing a mutant keratin develop skin that blisters under minor friction, as in the human disease epidermolysis bullosa simplex, demonstrating that the filaments' function is mechanical.

::: history
Actin was purified from muscle by Brunó Straub in Albert Szent-Györgyi's laboratory in Szeged in 1942; Szent-Györgyi showed that threads of actomyosin contract when ATP is added. The sliding-filament theory came from the two Huxley papers of 1954, and Andrew Huxley's cross-bridge model followed in 1957. Keith Porter and others saw microtubules in electron micrographs in the early 1960s, after glutaraldehyde fixation preserved them, and Gary Borisy and Edwin Taylor identified tubulin as the colchicine-binding protein in 1967. Ian Gibbons named dynein in 1965, Ronald Vale, Thomas Reese and Michael Sheetz discovered kinesin in 1985, and Tim Mitchison and Marc Kirschner described dynamic instability in 1984. Optical-trap measurements of single kinesin steps (Svoboda, Schmidt, Schnapp and Block, 1993) and of single myosin power strokes (Jeffrey Finer, Robert Simmons and James Spudich, 1994) turned motor proteins into quantitative machines. In 1998 Jan Löwe and Linda Amos solved the structure of FtsZ and showed it to be a tubulin homologue, and in 2001 Fusinita van den Ent, Amos and Löwe did the same for MreB and actin.
:::

::: summary
- The cytoskeleton has three filament systems: actin filaments (7 nm, polar, ATP), microtubules (25 nm hollow tubes of 13 protofilaments, polar, GTP) and intermediate filaments (10 nm, non-polar, mechanical). Bacteria have actin and tubulin homologues.
- Each filament end grows at $k_\mathrm{on}c - k_\mathrm{off}$ and has a critical concentration $C_\mathrm{c} = k_\mathrm{off}/k_\mathrm{on}$; for ATP-actin, 0.12 µM at the barbed end and 0.6 µM at the pointed end. Nucleotide hydrolysis makes the ends differ and allows treadmilling.
- Nucleators (Arp2/3, formins, γ-tubulin) and regulatory proteins decide where and when filaments form; polymerisation can push with forces of several piconewtons per filament.
- Microtubules show dynamic instability; their mean length $\bar L = v_\mathrm{g}v_\mathrm{s}/(v_\mathrm{s}f_\mathrm{cat} - v_\mathrm{g}f_\mathrm{res})$ is very sensitive to the catastrophe rate.
- Myosins (actin), kinesins (plus-end) and dyneins (minus-end) convert ATP into stepwise movement; kinesin-1 takes 8 nm steps, one ATP each, with about 50 % efficiency near its 6 pN stall force.
- Cilia and flagella bend by dynein-driven sliding of 9 + 2 microtubule doublets; muscle contracts by sliding of actin and myosin filaments, switched on by Ca²⁺.
- Crawling cells protrude by actin polymerisation, adhere through integrins, contract with myosin II and retract their rear, coordinated by Rho-family GTPases.
:::

## Exercises

::: exercise Actin subunits per micrometre {level=1 check="364"}
Each actin subunit adds 2.75 nm to a filament. How many subunits are there in 1.00 µm of filament (to three significant figures)?
::: solution
$1000/2.75 = 364$.
:::
:::

::: exercise A critical concentration {level=1 check="0.121"}
Calculate the critical concentration in µM of the barbed end of an actin filament with $k_\mathrm{on} = 11.6\ \mathrm{\mu M^{-1}\,s^{-1}}$ and $k_\mathrm{off} = 1.4\ \mathrm{s^{-1}}$, to three significant figures.
::: solution
$C_\mathrm{c} = 1.4/11.6 = 0.121\ \mathrm{\mu M}$.
:::
:::

::: exercise Tubulin in a microtubule {level=1 check="1625"}
A microtubule has 13 protofilaments, and each αβ-tubulin dimer is 8 nm long. How many dimers are in 1 µm of microtubule?
::: solution
Each 8 nm of length contains one ring of 13 dimers, so $13\times1000/8 = 1625$ dimers per micrometre.
:::
:::

::: exercise Kinesin's stepping rate {level=2 check="100"}
Kinesin-1 moves at 0.80 µm s⁻¹ with 8.0 nm steps. How many steps does it take per second?
::: solution
$800/8.0 = 100\ \mathrm{s^{-1}}$.
:::
:::

::: exercise Down a long axon {level=2 check="14.5"}
How many days would a single kinesin moving continuously at 0.80 µm s⁻¹ take to carry a vesicle 1.0 m from the cell body to the end of an axon (to three significant figures)? Compare with diffusion ([[cell-biology/cells-and-microscopy#ex-diffusion-times]]).
::: solution
$1.0\ \mathrm{m}/0.80\times10^{-6}\ \mathrm{m\,s^{-1}} = 1.25\times10^6\ \mathrm{s} = 14.5$ days. Diffusion would take more than a thousand years. Measured fast axonal transport is somewhat faster still, up to a few hundred millimetres per day, because several motors cooperate and some cargoes move at more than 1 µm s⁻¹.
:::
:::

::: exercise Which filament system? {level=2}
Cultured fibroblasts are treated with four drugs in turn. Predict, with reasons, which processes are blocked: (a) latrunculin, which sequesters actin monomers; (b) colchicine, which blocks tubulin polymerisation; (c) an inhibitor of myosin II ATPase activity (blebbistatin); (d) a drug that blocks dynein. The processes to consider are: lamellipodial protrusion, cell-body translocation, mitosis, cytokinesis, and the clustering of the Golgi apparatus near the centrosome.
::: solution
(a) Latrunculin stops actin polymerisation, so lamellipodia stop at once; translocation and cytokinesis (contractile ring) fail. Mitosis itself (chromosome separation) can proceed, but the cell cannot divide, so binucleate cells result.
(b) Colchicine depolymerises microtubules: the spindle cannot form, so cells arrest in mitosis; the Golgi ribbon, which is gathered near the centrosome by dynein moving along microtubules, fragments and disperses. Crawling continues but loses its direction (microtubules help polarise the cell).
(c) Myosin II inhibition blocks cytokinesis and the contraction that moves the cell body and retracts the tail, while protrusion continues — cells may spread wide and grow long tails.
(d) Dynein inhibition disperses the Golgi and disrupts spindle assembly and positioning, so mitosis is impaired; minus-end-directed transport of endosomes stops.
:::
:::

::: exercise Fewer catastrophes {#exr-catastrophe level=3 check="20"}
Repeat [[#ex-microtubule]] with the catastrophe frequency halved to $f_\mathrm{cat} = 0.005\ \mathrm{s^{-1}}$, other values unchanged. Is growth still bounded? What is the new mean length in µm? Then find the catastrophe frequency at which growth becomes unbounded.
::: solution
$J = (0.025\times0.05 - 0.333\times0.005)/0.055 = (0.00125 - 0.00167)/0.055 = -0.0076\ \mathrm{\mu m\,s^{-1}}$: still bounded. $\bar L = 0.00833/(0.00167 - 0.00125) = 0.00833/0.000417 = 20\ \mathrm{\mu m}$.

Growth becomes unbounded when $v_\mathrm{s}f_\mathrm{cat} = v_\mathrm{g}f_\mathrm{res}$, i.e. $f_\mathrm{cat} = 0.025\times0.05/0.333 = 0.00375\ \mathrm{s^{-1}}$. Near this transition the mean length diverges: in a 20 µm cell, a modest change in catastrophe rate converts a network of short, searching microtubules into long ones that reach the cell edge. At the onset of mitosis, cells raise $f_\mathrm{cat}$ several-fold, producing the short, dynamic microtubules of the spindle.
:::
:::

::: exercise Polymerisation force at low concentration {level=3 check="3.3"}
Use [[#eq-stall]] to calculate the stall force (pN, two significant figures) of a single actin filament at 1.0 µM free ATP-actin, with $C_\mathrm{c} = 0.12\ \mathrm{\mu M}$, $\delta = 2.75\ \mathrm{nm}$ and $k_\mathrm{B}T = 4.28\ \mathrm{pN\,nm}$. Why do cells keep a large pool of profilin–actin, and why must leading-edge networks contain many filaments?
::: solution
$F = (4.28/2.75)\ln(1.0/0.12) = 1.556\times2.12 = 3.3\ \mathrm{pN}$. The force grows only logarithmically with concentration, but it vanishes as $c$ approaches $C_\mathrm{c}$; a large pool of polymerisation-ready subunits (profilin–actin, which adds only to barbed ends) keeps $c/C_\mathrm{c}$ high where it is needed. A lamellipodium must push against membrane tension and friction with forces of the order of nanonewtons, so it needs hundreds to thousands of filaments pushing together — the dense branched networks that Arp2/3 builds.
:::
:::

::: exercise Interpreting the length–tension curve {#exr-length-tension level=3}
Gordon, Huxley and Julian (1966) measured the isometric tension of single frog muscle fibres at different sarcomere lengths. Tension was maximal and constant between about 2.0 and 2.25 µm, fell linearly to zero as the sarcomere was stretched to about 3.65 µm, and also fell when the sarcomere was shorter than 2.0 µm. Thick filaments are 1.6 µm long with a bare central zone of about 0.15–0.2 µm without myosin heads; each thin filament is about 1.0 µm long. (a) Explain why tension falls to zero at 3.65 µm. (b) Explain the plateau. (c) Suggest why tension falls at short lengths. (d) Why was this experiment strong evidence for the sliding-filament and cross-bridge theory?
::: solution
(a) At 3.65 µm the thin filaments from each Z disc (2 × 1.0 µm) plus the thick filament (1.6 µm) just fail to overlap: $2\times1.0 + 1.6 = 3.6$ µm, plus the thickness of the Z discs, gives about 3.65 µm. No myosin head can reach actin, so no force.
(b) Between 2.0 and 2.25 µm every myosin head on the thick filament overlaps a thin filament; extra overlap adds only the bare zone (which has no heads), so the number of active cross-bridges, and the tension, are constant. As the sarcomere lengthens further, the number of heads facing actin falls linearly, and so does tension.
(c) Below 2.0 µm the thin filaments from the two halves overlap each other in the middle, interfering with cross-bridge formation, and at even shorter lengths the thick filaments hit the Z discs.
(d) Tension is proportional to filament overlap, exactly as predicted if force is generated by independent cross-bridges distributed along the overlap zone, and inconsistent with theories in which the filaments themselves shorten.
:::
:::
