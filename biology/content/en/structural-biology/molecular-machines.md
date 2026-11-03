A cell is full of machines. Ribosomes read messenger RNA and link amino acids at about twenty per second; ATP synthase spins at more than a hundred revolutions per second, turning a flow of protons into ATP; kinesin walks along microtubules carrying vesicles, taking a step of 8 nanometres for each ATP it hydrolyses; transporters pump sugars, ions and drugs across membranes against gradients of a thousandfold or more. These are not metaphors. Each is a protein or ribonucleoprotein assembly that couples a source of free energy — a chemical reaction or an electrochemical gradient — to mechanical motion, chemical synthesis or the movement of a solute, through a cycle of conformational changes.

Structures explain such machines in a particular way. A single structure is a snapshot; a mechanism needs a series of snapshots, one for each state of the cycle, together with measurements of the rates and forces that connect them. This chapter takes four classic machines — the ribosome, ATP synthase, motor proteins on the cytoskeleton and membrane transporters — and shows how structures from [[structural-biology/x-ray-crystallography]] and [[structural-biology/cryo-em]], combined with single-molecule experiments, turned each from a black box into a mechanism. The biochemistry of translation is in [[molecular-biology/translation]], of oxidative phosphorylation in [[biochemistry/oxidative-phosphorylation]], and of membrane transport in [[cell-biology/membrane-transport]].

## Principles: free energy, cycles and coupling

A machine converts free energy into work. Its fuel is usually ATP or GTP hydrolysis, for which the free energy change under cellular conditions is about −50 to −60 kJ mol⁻¹, or the movement of ions down an electrochemical gradient ([[biochemistry/bioenergetics]]). At the molecular scale the natural units are the piconewton (pN) and the nanometre: $k_\mathrm BT$ at 25 °C is 4.1 pN nm, and the hydrolysis of one ATP molecule releases about $55/(6.022\times10^{23})$ kJ $= 9\times10^{-20}$ J $\approx 90$ pN nm, roughly $20\,k_\mathrm BT$.

::: definition Mechanochemical cycle and tight coupling {#def-coupling}
A **mechanochemical cycle** is a closed sequence of states of a machine — differing in bound ligands and conformation — in which each turn of the cycle consumes a fixed amount of fuel and produces a fixed output (a step, a rotation, a transported solute). A machine is **tightly coupled** if fuel consumption and output occur strictly together, so that one turn gives one unit of each; leaky machines hydrolyse fuel without output (slip) or produce output without fuel. The **thermodynamic efficiency** is the work done per cycle divided by the free energy released by the fuel consumed.
:::

Two physical pictures describe how chemistry is converted into motion. In a **power stroke**, a chemical step (binding, hydrolysis, product release) drives a conformational change that does work directly, like a lever. In a **Brownian ratchet**, thermal fluctuations move the machine back and forth, and chemical steps rectify them, trapping forward movements and preventing backward ones. Real machines combine both, and structures help decide which step does what. Because molecules are small and the medium viscous, inertia is negligible: a motor that stops consuming fuel stops at once, and every step is made against a background of thermal motion of comparable energy.

A cycle can be described as a Markov chain of states, each step taken with some probability per unit time ([Maths Atlas: Markov chains](/learn/maths/lesson.php?c=probability&l=markov-chains)). The figure shows an illustrative four-state cycle for a motor such as kinesin, with transitions per 1 ms time step.

::: widget markov
matrix: 0.7,0.3,0,0; 0.05,0.45,0.5,0; 0,0,0.4,0.6; 0.8,0,0,0.2
states: waiting for ATP; ATP bound; hydrolysed, stepped; releasing products
start: 0
steps: 30
caption: An illustrative mechanochemical cycle as a Markov chain, with one time step of 1 ms: ATP binds (0.3 per step, reversibly), is hydrolysed and the motor steps (0.5), and products are released (0.6, 0.8) to restart the cycle. Run the walk and watch the machine go round the cycle in one direction; the stationary distribution shows where it spends its time (here mostly waiting for ATP). The number of completed cycles per step, $\pi_4\times0.8 \approx 0.12$, is about 120 cycles per second — roughly the stepping rate of kinesin at saturating ATP. At a lower ATP concentration the binding probability (the entry 0.3) would be smaller, and the waiting state would dominate even more.
:::

## The ribosome

The ribosome is the largest and most conserved machine in the cell. The bacterial 70S ribosome, about 2.5 MDa, consists of a small (30S) subunit, with 16S rRNA of about 1,540 nucleotides and some 21 proteins, and a large (50S) subunit, with 23S and 5S rRNAs (about 2,900 and 120 nucleotides) and some 33 proteins; eukaryotic 80S ribosomes are larger, with extra RNA segments and proteins added to the conserved core. The small subunit decodes the mRNA; the large subunit catalyses peptide-bond formation; tRNAs move through three sites, A (aminoacyl), P (peptidyl) and E (exit), spanning both subunits.

### The ribosome is a ribozyme

In 2000 the crystal structure of the large subunit of the archaeon *Haloarcula marismortui* at 2.4 Å (N. Ban, P. Nissen, J. Hansen, P. B. Moore and T. A. Steitz) and, soon after, its complex with a transition-state analogue showed that no protein lies within about 18 Å of the site where the peptide bond forms (P. Nissen and colleagues, 2000): the **peptidyl transferase centre** is made entirely of RNA. The ribosome is a ribozyme ([[structural-biology/nucleic-acid-structure]]). Its catalytic strategy is mainly positional and entropic: it holds the α-amino group of the aminoacyl-tRNA in the A site next to the ester carbonyl of the peptidyl-tRNA in the P site, in a pre-organised, partly desolvated environment, and the 2′-hydroxyl of the P-site tRNA's terminal adenosine participates in proton shuttling. The nascent chain leaves through the exit tunnel, about 100 Å long ([[structural-biology/protein-folding]]).

### Decoding: geometry as a check

The small-subunit structures of *Thermus thermophilus* (B. T. Wimberly, V. Ramakrishnan and colleagues; F. Schluenzen, A. Yonath and colleagues; both 2000) explained how the ribosome checks codon–anticodon pairing. When a cognate tRNA binds in the A site, three universally conserved nucleotides of 16S rRNA — A1492, A1493 and G530 — flip into the minor groove of the codon–anticodon minihelix and interact with the 2′-hydroxyls and minor-groove edges of the first two base pairs (J. M. Ogle, V. Ramakrishnan and colleagues, 2001). These A-minor-type interactions are formed only by Watson–Crick geometry, so the ribosome "reads" the shape of a correct pair rather than its chemical identity; the third (wobble) position is monitored less strictly, as the genetic code requires. Recognition of the correct shape triggers a closing of the small subunit that accelerates GTP hydrolysis by the elongation factor EF-Tu, committing the tRNA.

### Proofreading

The free-energy difference between a correct and a near-correct codon–anticodon pair is only a few $k_\mathrm BT$, yet translation makes only about one error in $10^3$–$10^4$ codons. J. J. Hopfield (1974) and J. Ninio (1975) explained how this is possible: by using an irreversible, energy-consuming step to allow the same discrimination to be applied twice.

::: proposition Kinetic proofreading {#prop-proofreading}
Suppose a correct and an incorrect substrate differ in binding free energy by $\Delta\Delta G$, so that at equilibrium the incorrect one is accepted with relative probability $f = e^{-\Delta\Delta G/RT}$. If after binding the complex passes through an irreversible step (such as GTP hydrolysis) into an intermediate from which the substrate can again dissociate, with the same discrimination, before the product is formed, then the overall error frequency is approximately

$$
\varepsilon \approx f^2 = e^{-2\Delta\Delta G/RT}.
$$ {#eq-proofreading}

Each additional proofreading stage multiplies the error by another factor $f$, at the cost of discarding some correct substrates and consuming the energy of the irreversible step on each attempt. Assumptions: the discrimination arises from different dissociation rates in each stage, the irreversible step is non-selective, and product formation is slow compared with dissociation of incorrect substrate.
:::

::: example How much does proofreading buy? {#ex-proofreading}
A near-cognate tRNA binds 10 kJ mol⁻¹ less tightly than the cognate tRNA at 37 °C. What error frequency would a single selection step give, and what with one proofreading stage?
::: solution
$RT = 2.58$ kJ mol⁻¹ at 310 K, so $f = e^{-10/2.58} = e^{-3.88} = 0.021$: one error in about 48 codons for this tRNA. With one proofreading stage, $\varepsilon \approx f^2 = 4.3\times10^{-4}$, about one in 2,300 — within the range observed for translation. In the real ribosome, the discrimination of each stage is enhanced by induced fit (the closing of the subunit that favours correct pairs), and the energy for proofreading comes from the GTP hydrolysed by EF-Tu. DNA polymerases, aminoacyl-tRNA synthetases and many other enzymes that must select among similar substrates use related mechanisms.
:::
:::

### Translocation

After peptide-bond formation, the tRNAs and mRNA must move by exactly one codon. Cryo-EM showed that the subunits rotate relative to each other by several degrees in a **ratchet-like** motion (J. Frank and R. K. Agrawal, 2000), with tRNAs moving into hybrid A/P and P/E states on the large subunit; the GTPase EF-G then binds, and its domain IV, mimicking the shape of a tRNA, enters the decoding site and unlocks and drives movement on the small subunit. Hundreds of cryo-EM structures of ribosomes in intermediate states, from purified systems and increasingly inside cells by cryo-ET, now describe this cycle in remarkable detail. Many antibiotics act by binding to these functional sites — aminoglycosides near A1492/A1493, causing misreading; macrolides in the exit tunnel; chloramphenicol in the peptidyl transferase centre — and the ribosome structures explained how ([[microbiology]]).

## ATP synthase: a rotary motor

ATP synthase, the F₁F₀-ATPase of mitochondria, chloroplasts and bacteria, makes most of the ATP of aerobic organisms ([[biochemistry/oxidative-phosphorylation]]). It is two rotary motors on a common shaft. F₀, in the membrane, is driven by protons flowing down the electrochemical gradient; F₁, in the matrix or cytoplasm, synthesises ATP. When the gradient is weak and ATP plentiful, the machine runs backwards, hydrolysing ATP to pump protons.

### The binding-change mechanism

Paul Boyer proposed in the 1970s, from isotope-exchange kinetics, that the energy of the gradient is used not to form the bond between ADP and phosphate — which occurs readily at the catalytic site — but to release the tightly bound ATP, and that the three catalytic sites of F₁ pass through the same three states in turn, driven by rotation. The crystal structure of bovine F₁ (J. P. Abrahams, A. G. W. Leslie, R. Lutter and J. E. Walker, 1994) showed exactly this: three αβ pairs arranged around a central, asymmetric γ subunit, with the three β subunits in different conformations — one with an ATP analogue bound, one with ADP, one empty — according to which face of γ each was touching. Boyer and Walker shared the Nobel Prize in Chemistry in 1997.

In 1997 H. Noji, R. Yasuda, M. Yoshida and K. Kinosita attached a fluorescent actin filament to the γ subunit of an F₁ fixed to a glass surface and watched it rotate under the microscope as ATP was hydrolysed — anticlockwise when viewed from the membrane side, in steps of 120°, one per ATP, later resolved into substeps of about 80° and 40° associated with ATP binding and product release. From the speed of rotation of the filament against viscous drag the torque was estimated at about 40 pN nm.

::: example How efficient is F₁? {#ex-f1}
F₁ rotates in 120° steps, one per ATP, with a torque of about 40 pN nm. What work does it do per step, and how does it compare with the free energy of ATP hydrolysis (about 50 kJ mol⁻¹ under the conditions of the experiment)?
::: solution
Work = torque × angle $= 40\ \mathrm{pN\,nm}\times(2\pi/3) = 83.8$ pN nm $= 8.38\times10^{-20}$ J per ATP. Multiplying by Avogadro's number gives $5.04\times10^4$ J mol⁻¹, about 50 kJ mol⁻¹. The work done per step is close to the whole free energy of hydrolysis: the motor is nearly 100 % efficient. This is possible because it is tightly coupled and operates close to equilibrium; a macroscopic motor dissipates most of its energy as heat.
:::
:::

### The F₀ ring and the cost of an ATP

In F₀, protons enter from one side through a half-channel in the stator subunit *a*, bind to a conserved carboxylate (Glu or Asp) on one of the *c* subunits of a ring in the membrane, are carried round almost a full turn as the ring rotates, and leave through a second half-channel to the other side. Each proton thus advances the ring by one *c* subunit, and the ring turns the γ shaft inside F₁ (the peripheral stalk holds the α₃β₃ hexamer still). Cryo-EM structures of whole ATP synthases in several rotational states (A. Zhou, J. L. Rubinstein and colleagues, 2015, and others) showed the two half-channels and the long horizontal helices of subunit *a* that line them.

::: proposition Protons per ATP {#prop-hplus-atp}
If each proton translocated advances the c-ring by one subunit, and one full rotation produces three ATP molecules at the three catalytic sites of F₁, then the number of protons per ATP synthesised is

$$
n_{\mathrm H^+}/\mathrm{ATP} = \frac{c}{3},
$$ {#eq-hplus-atp}

where $c$ is the number of subunits in the ring. Ring sizes measured in structures range from 8 (bovine and other animal mitochondria; I. N. Watt, J. E. Walker and colleagues, 2010) through 10 (yeast mitochondria, *E. coli*) and 14 (spinach chloroplasts) to 15 (the cyanobacterium *Arthrospira*/*Spirulina*), so the ratio is not fixed but depends on the organism. Assumptions: tight coupling, no slip; the protons used to import phosphate and export ATP from mitochondria add about one more per ATP.
:::

::: example The energy budget of an ATP {#ex-atp-budget}
The proton-motive force across the inner mitochondrial membrane is about 190 mV. How much free energy does each proton supply? Compare the free energy available per ATP for c-rings of 8 and 10 subunits with the roughly 50 kJ mol⁻¹ needed to make ATP in the mitochondrial matrix.
::: solution
Each mole of protons moving down a proton-motive force $\Delta p$ releases $F\Delta p = 96\,485\times0.190 = 18.3$ kJ mol⁻¹. With $c = 8$, $8/3 = 2.67$ protons per ATP supply $2.67\times18.3 = 48.9$ kJ mol⁻¹, just enough; with $c = 10$, $3.33\times18.3 = 61$ kJ mol⁻¹. A smaller ring is more economical (more ATP per proton) but requires a higher proton-motive force to run forwards; a larger ring works with a weaker gradient. Organisms appear to have tuned their c-ring size to the gradients they generate — chloroplasts, with their large ΔpH, nevertheless use $c = 14$, a puzzle that shows the trade-offs are not fully understood.
:::
:::

## Motor proteins on the cytoskeleton

Three families of motor proteins move cargo along cytoskeletal tracks ([[cell-biology/cytoskeleton]]): **myosins** on actin filaments, and **kinesins** and **dyneins** on microtubules. Myosins and kinesins share a common core with the G proteins, with which they are thought to share an ancestor; dyneins are members of the AAA+ family of ring-shaped ATPases.

### Myosin and the swinging lever

The crystal structure of the head (subfragment-1) of chicken skeletal muscle myosin II (I. Rayment, H. M. Holden and colleagues, 1993) revealed a catalytic domain that binds actin and ATP, and a long α-helical "neck" stabilised by two light chains — a lever arm. Comparing structures with different nucleotide analogues showed that small movements in the nucleotide pocket, associated with the release of phosphate, are amplified by a converter domain into a swing of the lever by about 70°, moving its end by several nanometres: the **power stroke** of muscle contraction, which drives the sliding of filaments discovered in 1954 (H. E. Huxley and J. Hanson; A. F. Huxley and R. Niedergerke). Myosin V, which carries organelles, has a lever three times longer and takes steps of about 37 nm, walking **hand over hand** with its two heads alternately leading, as shown by tracking a single fluorophore on one head with nanometre precision (A. Yildiz, P. R. Selvin and colleagues, 2003).

### Kinesin: a processive walker

Conventional kinesin (kinesin-1) is a dimer of two heads, each with a microtubule- and ATP-binding motor domain, joined to a coiled-coil stalk by a short **neck linker**. Optical-trap experiments (K. Svoboda, C. F. Schmidt, B. J. Schnapp and S. M. Block, 1993) showed that it moves in 8 nm steps, the length of one αβ-tubulin dimer, and that one ATP is hydrolysed per step (M. J. Schnitzer and S. M. Block, 1997). It is highly **processive**: a single molecule takes about a hundred steps before detaching, because at every moment at least one head is bound. Structures showed that ATP binding to the leading head causes its neck linker to "zip" onto the motor domain, throwing the trailing head forward towards the next binding site (S. Rice, R. D. Vale and colleagues, 1999).

::: proposition Work against a load {#prop-motor-work}
A motor taking steps of length $\delta$ against an opposing force $F$ does work $F\delta$ per step. It stalls — forward and backward steps become equally frequent — at a force $F_\mathrm s$, and if it is tightly coupled the free energy per cycle sets an upper bound:

$$
F_\mathrm s\,\delta \le -\Delta G_\mathrm{ATP}.
$$ {#eq-stall}

The ratio of the two is the thermodynamic efficiency at stall. (A consequence of the second law for a tightly coupled machine; at loads below stall, part of the free energy is dissipated by the steps themselves.)
:::

::: example Kinesin's efficiency {#ex-kinesin}
Kinesin-1 stalls at about 6 pN and takes 8 nm steps, one per ATP. Taking $\Delta G_\mathrm{ATP} = -55$ kJ mol⁻¹ in the cell, estimate its efficiency at stall. Its maximal speed is about 800 nm s⁻¹ at saturating ATP; how many ATP molecules does it hydrolyse per second?
::: solution
Work per step $= 6\ \mathrm{pN}\times8\ \mathrm{nm} = 48$ pN nm $= 4.8\times10^{-20}$ J, or $4.8\times10^{-20}\times6.022\times10^{23} = 28.9$ kJ mol⁻¹. The efficiency is $28.9/55 \approx 0.5$, about 50 %. At 800 nm s⁻¹ with 8 nm per ATP, it hydrolyses 100 ATP per second (per dimer). These numbers come from optical-trap measurements on single molecules (stall forces of roughly 6–7 pN are reported); kinesin is less efficient than F₁, but it must walk against a load in a fluctuating environment where a strong bias against backward steps is worth some dissipated energy.
:::
:::

The speed of a motor depends on ATP concentration in a Michaelis–Menten fashion, $v = v_\mathrm{max}[\mathrm{ATP}]/(K_\mathrm M + [\mathrm{ATP}])$ ([[biochemistry/enzymes]]), and on load, falling to zero at stall.

::: widget plot
f: v*x/(K + x)*(1 - (F/Fs)^2)
x: 0, 1000
y: 0, 900
sliders: v=800:200:1200:10; K=60:10:200:5; F=0:0:6:0.1; Fs=6:4:8:0.1
labels: \text{speed (nm s}^{-1}\text{)}
vlines: 60
caption: Illustrative speed of a kinesin-like motor (nm s⁻¹) against ATP concentration (μmol L⁻¹), as Michaelis–Menten kinetics with maximal speed $v$ and $K_\mathrm M = K$, multiplied by an empirical load factor $1 - (F/F_\mathrm s)^2$ for an opposing force $F$ (pN) and stall force $F_\mathrm s$. Raise the load towards stall and the speed falls to zero at every ATP concentration. Real force–velocity curves have shapes that depend on which step of the cycle the load slows, a question answered by measuring them at different ATP concentrations; this simple factor is only a placeholder for such data.
:::

Dyneins, the largest motors (about 1.5 MDa for a cytoplasmic dynein dimer with its partners), work differently: a ring of six AAA+ domains hydrolyses ATP, and changes in the ring are transmitted through a 15 nm coiled-coil stalk to a small microtubule-binding domain at its tip, and through a "linker" across the face of the ring that swings like a lever (A. P. Carter, R. D. Vale and colleagues, 2011; and others). Cryo-EM of dynein with its activating partner dynactin and adaptor proteins showed how the motor is switched on only when attached to its cargo.

## Membrane transporters

Channels and transporters both move solutes across membranes, but in different ways. A **channel** opens a continuous pore, through which ions flow down their electrochemical gradient at rates of $10^6$–$10^8$ per second. The potassium channel KcsA of *Streptomyces lividans* (D. A. Doyle, R. MacKinnon and colleagues, 1998) showed how selectivity is possible at such speed: the selectivity filter, lined by the backbone carbonyls of the sequence TVGYG, mimics the hydration shell of a K⁺ ion exactly, so K⁺ sheds its water at almost no cost while the smaller Na⁺ cannot be coordinated as well (MacKinnon, Nobel Prize in Chemistry 2003). A **transporter** never opens a continuous pore; it moves only one or a few solutes per cycle, at $1$–$10^3$ per second, and it can couple their movement to another source of energy.

::: definition Alternating access {#def-alternating-access}
In the **alternating-access** mechanism (O. Jardetzky, 1966), a transporter has a binding site that is exposed to one side of the membrane or the other but never to both at once. A cycle consists of binding the substrate (and any coupled ions) on one side, a conformational change that closes the site to that side and opens it to the other, release, and return. Because the two gates are never open together, a transporter can move a solute against its gradient if the cycle is coupled to the downhill movement of another solute (**secondary active transport**: symport or antiport) or to ATP hydrolysis (**primary active transport**).
:::

Structures of transporters in several states have revealed three main ways of implementing alternating access:

- **Rocker switch**: two halves of the protein rock about a central binding site, as in the lactose permease LacY of *E. coli*, a proton–sugar symporter of the major facilitator superfamily (J. Abramson, H. R. Kaback, S. Iwata and colleagues, 2003).
- **Rocking bundle**: a bundle of helices moves against a more static scaffold, as in the bacterial homologue LeuT of the neurotransmitter–sodium symporters, from *Aquifex aeolicus* (A. Yamashita, E. Gouaux and colleagues, 2005), whose structure became the template for understanding the human serotonin and dopamine transporters targeted by antidepressants and stimulants.
- **Elevator**: a transport domain carrying the substrate slides some 15–18 Å through the membrane against a fixed scaffold, as in the glutamate-transporter homologue GltPh of *Pyrococcus horikoshii* (D. Yernool, O. Boudker, E. Gouaux and colleagues, 2004; N. Reyes, C. Ginter and O. Boudker, 2009).

Primary active transporters couple the cycle to ATP. **ABC transporters**, such as Sav1866 of *Staphylococcus aureus* (R. J. Dawson and K. P. Locher, 2006), use two nucleotide-binding domains that close around two ATP molecules and so switch the transmembrane domains between inward- and outward-facing states. **P-type ATPases**, such as the sarcoplasmic reticulum Ca²⁺ pump SERCA (C. Toyoshima and colleagues, from rabbit muscle, 2000 onwards) and the Na⁺/K⁺-ATPase, phosphorylate a conserved aspartate during each cycle; structures of SERCA in a dozen states have made its cycle one of the best-understood of any machine.

::: example How far can a symporter concentrate its substrate? {#ex-lacy}
LacY transports one proton with each lactose molecule. If the proton-motive force across the *E. coli* inner membrane is 180 mV (inside negative and alkaline), what is the maximum ratio of internal to external lactose concentration at 37 °C, assuming tight coupling?
::: solution
At equilibrium of the coupled reaction, the free energy gained by the proton moving in equals that needed to move lactose up its gradient: $RT\ln([\mathrm{lac}]_\mathrm{in}/[\mathrm{lac}]_\mathrm{out}) = F\Delta p$. So the maximal ratio is $\exp(F\Delta p/RT) = \exp(96\,485\times0.180/(8.314\times310.15)) = \exp(6.74) = 840$. A cell can accumulate lactose roughly a thousandfold; coupling two protons per substrate would square this factor. Real accumulation ratios are lower because of leaks and because transport runs away from equilibrium.
:::
:::

::: warning A structure is not a mechanism
It is tempting to line up structures of a transporter or motor in "outward-open", "occluded" and "inward-open" states and read off the mechanism as a film. But each structure may have been obtained with different ligands, mutations, antibodies, detergents or crystal contacts that favour one state, and the order of states, their populations in the membrane and the rates between them are not in the pictures. Mechanisms are established by combining structures with measurements of function — transport or stepping rates, single-molecule FRET between states ([[structural-biology/nmr-spectroscopy]]), the effects of mutations that lock or destabilise each state — and ideally by seeing all states in one sample, as cryo-EM classification increasingly allows.
:::

::: quiz
Which observation most directly shows that F₁-ATPase is a rotary motor?
- [ ] The three β subunits in the crystal structure have different conformations.
- [ ] ATP synthesis requires a proton gradient.
- [x] A fluorescent actin filament attached to the γ subunit of surface-bound F₁ rotates in 120° steps when ATP is added.
- [ ] The c-ring has 8–15 subunits.
::: solution
The crystal structure's asymmetry is consistent with rotation and inspired the experiment, but it shows static states; the proton gradient and the ring are features of F₀. Only the single-molecule experiment of Noji and colleagues (1997) showed the γ subunit actually turning relative to α₃β₃, in steps of 120° coupled to ATP hydrolysis.
:::
:::

::: application Machines as drug targets
The structures of machines have guided many drugs: ribosome-targeting antibiotics, whose binding sites and resistance mutations were mapped in crystal and cryo-EM structures; the antituberculosis drug bedaquiline, which binds the c-ring of mycobacterial ATP synthase and stalls it (cryo-EM structures of the complex were reported in 2020–21); inhibitors of the serotonin transporter (selective serotonin reuptake inhibitors) whose binding modes were defined first in LeuT and then in the human transporter (J. A. Coleman, E. Gouaux and colleagues, 2016); and inhibitors of ABC transporters that cause multidrug resistance in tumours. Clinical aspects are covered in the [Medicine Atlas](/learn/medicine/).
:::

::: history
The idea that enzymes might be machines with moving parts goes back to the sliding-filament theory of muscle (1954) and to Peter Mitchell's chemiosmotic hypothesis (1961), which proposed that a proton gradient drives ATP synthesis. Paul Boyer's binding-change mechanism (1973–1979) and John Walker's F₁ structure (1994) were confirmed by Kinosita and Yoshida's movie of a rotating actin filament (1997). Optical traps, developed by Arthur Ashkin (Nobel Prize in Physics 2018), allowed Steven Block and others from 1990 onwards to measure the steps and forces of single motor proteins. The ribosome structures of 2000 (Nobel Prize in Chemistry 2009 to Venki Ramakrishnan, Thomas Steitz and Ada Yonath) and the cryo-EM work of Joachim Frank on its ratcheting revealed the mechanism of the oldest machine of all, and Roderick MacKinnon's potassium channel (1998) and the transporter structures of the 2000s did the same for membranes.
:::

## Where this leads

Machines work by changing shape, and how proteins change shape, bind ligands and are simulated computationally is the subject of [[structural-biology/dynamics-and-design]], which also describes the design of new proteins — including, so far in simple forms, new machines. The energetics of the gradients that drive ATP synthase and transporters are in [[biochemistry/oxidative-phosphorylation]] and [[cell-biology/membrane-transport]].

::: summary
- Machines couple a free-energy source (ATP: about 90 pN nm ≈ 20 $k_\mathrm BT$ per molecule; ion gradients) to work through a mechanochemical cycle of conformational states; tight coupling links fuel and output one to one.
- The ribosome's peptidyl transferase centre is RNA; decoding checks the geometry of codon–anticodon pairs (A1492, A1493, G530); kinetic proofreading squares the error frequency ([[#eq-proofreading]]); EF-G and subunit ratcheting drive translocation.
- ATP synthase: F₁ rotates in 120° steps (binding change), with torque about 40 pN nm and near-100 % efficiency; protons per ATP $= c/3$, with c-rings of 8–15 subunits.
- Myosin swings a lever; kinesin walks hand over hand in 8 nm steps, one ATP per step, stalling at about 6–7 pN (efficiency about 50 %); dynein uses an AAA+ ring.
- Channels open pores ($10^6$–$10^8$ ions s⁻¹); transporters use alternating access (rocker switch, rocking bundle, elevator), coupled to ion gradients or ATP; maximal accumulation by a symporter is $\exp(nF\Delta p/RT)$.
- Snapshots must be combined with kinetics and single-molecule measurements to give a mechanism.
:::

## Exercises

::: exercise Protons per ATP {level=1 check="14/3"}
How many protons are translocated per ATP synthesised by a chloroplast ATP synthase with a c₁₄ ring (exact fraction)?
::: solution
$14/3 \approx 4.67$.
:::
:::

::: exercise ATP in thermal units {level=1 check="22"}
Express a free energy of 55 kJ mol⁻¹ in units of $k_\mathrm BT$ at 25 °C (two significant figures).
::: solution
$55/(RT) = 55/2.479 = 22$ $k_\mathrm BT$.
:::
:::

::: exercise Myosin V steps {level=1 check="74"}
Myosin V's centre of mass advances 37 nm per step, walking hand over hand. How far (nm) does each individual head move when it steps?
::: solution
In hand-over-hand walking the trailing head moves past the leading one to become the new leading head, travelling twice the step of the centre of mass: 74 nm. Yildiz and colleagues saw exactly this pattern (alternating 74 nm and 0 nm movements of a labelled head), ruling out an "inchworm" model, in which each head would move 37 nm.
:::
:::

::: exercise Proofreading by an aminoacyl-tRNA synthetase {level=2}
Isoleucyl-tRNA synthetase must distinguish isoleucine from valine, which lacks one methylene group and binds about 200-fold less well. (a) What error rate would a single selection step give? (b) The observed error rate is much lower, of the order of 1 in $10^4$ (estimates vary with the method). How does the enzyme achieve this? (c) What does the improvement cost?
::: solution
(a) About 1 in 200 (more precisely, the ratio depends also on the cellular concentrations of the two amino acids, which are similar). (b) The enzyme has a second, editing site that hydrolyses valyl-adenylate or Val-tRNA^Ile but excludes the larger isoleucine — a "double sieve" (A. R. Fersht). Combining two steps of discrimination can give up to roughly $200\times200 = 40\,000$, as in kinetic proofreading. (c) Every valine that is activated and then hydrolysed wastes one ATP (two high-energy bonds), and a small fraction of correct isoleucine is also lost; the cell pays energy for accuracy.
:::
:::

::: exercise Kinesin speed and ATP {level=2 check="133"}
Kinesin moves at $v = v_\mathrm{max}[\mathrm{ATP}]/(K_\mathrm M + [\mathrm{ATP}])$ with $v_\mathrm{max} = 800$ nm s⁻¹ and $K_\mathrm M = 50$ μmol L⁻¹ (unloaded, illustrative). What is its speed (nm s⁻¹, three significant figures) at 10 μmol L⁻¹ ATP, and how many steps per second is that?
::: solution
$v = 800\times10/60 = 133$ nm s⁻¹, or $133/8 = 16.7$ steps (and ATP molecules) per second.
:::
:::

::: exercise Is a transporter tightly coupled? {level=2}
A Na⁺–glucose symporter is said to transport two Na⁺ ions per glucose. With a Na⁺ concentration ratio of 10 (outside/inside) and a membrane potential of −70 mV (inside negative), what maximal glucose accumulation ratio would tight coupling allow at 37 °C? What would you conclude if cells accumulated glucose 30,000-fold?
::: solution
Free energy per Na⁺ entering: $RT\ln10 + F\times0.070 = 2.58\times2.303 + 6.75 = 5.94 + 6.75 = 12.7$ kJ mol⁻¹. Two ions give 25.4 kJ mol⁻¹, so the maximal ratio is $\exp(25.4/2.58) = e^{9.85} \approx 1.9\times10^4$. An observed 30,000-fold accumulation would exceed this, implying either a higher coupling stoichiometry, a larger driving force than assumed (a more negative potential, a larger Na⁺ gradient), or an additional energy input such as metabolic trapping of glucose (for example by phosphorylation, which would mean free glucose is not the species accumulated).
:::
:::

::: exercise Reading a series of transporter structures {level=2}
Cryo-EM of a transporter in nanodiscs gives three classes: outward-open with substrate bound (20 % of particles), occluded with substrate (10 %), and inward-open without substrate (70 %). Without substrate, only the inward-open class is seen. (a) Propose an order of states in the cycle. (b) What do the populations tell you, and what do they not? (c) Suggest an experiment to test whether the transitions occur in the order you propose.
::: solution
(a) Inward-open apo → (return, presumably via an occluded apo state) outward-open → substrate binds outside → occluded with substrate → inward-open → substrate released inside → back. The absence of substrate-bound inward-open suggests release is fast. (b) The populations reflect the relative free energies of the states under the conditions of freezing (and possible biases from the nanodisc and grid); they suggest the inward-open state is most stable, and that the step leaving it (to outward-open) may be rate-limiting, but they say nothing directly about rates or order. (c) Single-molecule FRET with dyes placed to distinguish outward, occluded and inward states, recording individual molecules with and without substrate: the sequence of transitions and the dwell times give the order and rates. Mutations that trap a state (e.g. cross-links) and transport assays would test which transitions are needed for function.
:::
:::

::: exercise Gearing ATP synthase {level=3}
Suppose an organism's membrane maintains a proton-motive force of only 130 mV. (a) Using $F\Delta p$ per proton and a requirement of 50 kJ mol⁻¹ per ATP, what is the smallest c-ring that would allow ATP synthesis? (b) What is the cost of a larger ring when the proton-motive force is high? (c) Alkaliphilic bacteria of the genus *Bacillus*, which grow at external pH above 10, have c₁₃ rings; why might they need a large ring?
::: solution
(a) $F\Delta p = 96\,485\times0.130 = 12.5$ kJ mol⁻¹ per proton, so at least $50/12.5 = 4.0$ protons per ATP are needed, i.e. $c/3 \ge 4.0$, $c \ge 12$. (b) With a larger ring more protons are used per ATP, so each proton yields less ATP: at a high Δp, energy is wasted (it is dissipated rather than conserved), and growth yield per unit of respiration falls. (c) At very high external pH, the proton concentration outside is lower than inside, so the ΔpH component opposes ATP synthesis, and Δp across the membrane is small; a large ring allows ATP synthesis with a weak driving force, at the cost of more protons per ATP.
:::
:::

::: exercise Interpreting an optical-trap record {level=3}
An optical trap holding a bead attached to a single kinesin records the following at 1 mmol L⁻¹ ATP: forward steps of 8.0 nm, occasional backward steps of 8.0 nm; at 2 pN load the ratio of forward to backward steps is about 200, at 4 pN about 30, at 6 pN about 2. (a) Estimate the stall force. (b) If the ratio follows $n_+/n_- = \exp\bigl((F_\mathrm s - F)\,\delta^\ast/k_\mathrm BT\bigr)$ with an effective distance $\delta^\ast$, estimate $\delta^\ast$. (c) Why is $\delta^\ast$ less than the step size?
::: solution
(a) Stall is where the ratio equals 1; the ratio is falling by a factor of about 6.7–15 per 2 pN, so it reaches 1 near 6.5–7 pN. (b) $\ln(200/30) = 1.90$ over 2 pN gives $\delta^\ast/k_\mathrm BT = 0.95$ pN⁻¹, so $\delta^\ast = 0.95\times4.1 = 3.9$ nm; between 4 and 6 pN, $\ln(30/2)/2 = 1.35$ pN⁻¹, $\delta^\ast = 5.6$ nm. A value of about 4–5 nm, and from $n_+/n_- = 1$: $F_\mathrm s \approx 6 + \ln2/1.35 \approx 6.5$ pN. (c) The load acts only on the part of the cycle in which the motor moves along the force; if the 8 nm step is split between a load-dependent transition (such as neck-linker docking) and load-independent chemical steps, the effective distance is smaller than the full step. The ratio of forward to backward steps reflects the distance moved in the load-dependent transitions.
:::
:::
