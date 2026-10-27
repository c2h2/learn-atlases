A liver cell has no eyes or ears, yet it knows within seconds that its owner has been frightened: adrenaline reaching it through the blood makes it break down glycogen and release glucose. A bacterium swims towards a sugar it can sense at micromolar concentrations. A cell in an embryo decides whether to become nerve or skin according to how much of a signalling protein it receives from its neighbours. Each of these is an act of **cell signalling**: a cell detects a signal, converts it into a change inside, and responds — by altering metabolism, gene expression, shape or movement, or by deciding to divide or die.

Signalling pathways can look like an endless list of acronyms. This chapter tries to show the logic underneath. A handful of receptor types convert an external signal into an internal one; a handful of second messengers and protein modifications carry and amplify it; and a few recurring circuit designs — switches, amplifiers, adaptation and feedback — shape the response. We also put numbers on signalling: how strongly a receptor binds, how many molecules are involved, how fast a signal turns on and off, and how a gradual change in input can produce an all-or-none decision. The ion channels of [[cell-biology/membrane-transport]] and the trafficking of [[cell-biology/protein-sorting]] reappear here as parts of signalling systems.

## Signals, receptors and responses

::: definition Modes of intercellular signalling {#def-signal-modes}
- **Endocrine** signals (hormones) are carried by the blood to distant target cells.
- **Paracrine** signals act on nearby cells, over distances of tens to hundreds of micrometres.
- **Autocrine** signals act on the cell that released them.
- **Contact-dependent** (juxtacrine) signals act through molecules displayed on the surface of the signalling cell, so only cells in direct contact respond.
- **Synaptic** signals are neurotransmitters released at specialised junctions onto a single target cell, over a gap of about 20 nm.
:::

Whatever the mode, the target cell responds only if it has a **receptor** for the signal. Most signal molecules are hydrophilic — proteins, peptides, amino-acid derivatives — and cannot cross the membrane, so their receptors are cell-surface proteins. Small hydrophobic signals such as steroid hormones, thyroid hormone and retinoids cross the membrane and bind **intracellular receptors**, which in animals are mostly **nuclear receptors**: transcription factors that, with their ligand bound, regulate genes directly. The dissolved gas nitric oxide diffuses across membranes and activates a soluble enzyme, guanylyl cyclase, within seconds; with a half-life of seconds, it acts only locally (Robert Furchgott, Louis Ignarro and Ferid Murad, Nobel Prize in Physiology or Medicine 1998).

Cell-surface receptors fall into three main classes.

::: definition Classes of cell-surface receptor {#def-receptor-classes}
1. **Ion-channel-coupled receptors** (ligand-gated channels) open a pore when they bind their ligand, changing the membrane potential within a millisecond; the nicotinic acetylcholine receptor of nerve–muscle synapses is the classic example.
2. **G-protein-coupled receptors** (GPCRs) are single polypeptides that cross the membrane seven times. Ligand binding changes their shape so that they activate a trimeric **G protein** on the cytosolic face, which in turn regulates enzymes or channels.
3. **Enzyme-coupled receptors** either are enzymes or associate with them. The largest group, **receptor tyrosine kinases** (RTKs), have a cytosolic kinase domain that is activated when ligand brings two receptors together.
:::

GPCRs are the largest family of membrane receptors: the human genome encodes about 800, nearly half of them olfactory receptors, and they respond to light, odours, tastes, hormones, neurotransmitters and lipids. About a third of approved drugs act on GPCRs. Robert Lefkowitz and Brian Kobilka shared the 2012 Nobel Prize in Chemistry for their work on them; Kobilka's laboratory solved the structure of the β₂-adrenergic receptor in 2007 and of its complex with an activated G protein in 2011.

## Binding: how much signal is enough?

The first step is binding of ligand L to receptor R to form a complex LR. The analysis is the same as for an enzyme binding a substrate or a protein binding oxygen ([Chemistry Atlas: protein function](/learn/chemistry/lesson.php?c=biochemistry&l=protein-function)).

::: proposition Fractional receptor occupancy {#prop-occupancy}
For a receptor with a single binding site in equilibrium with free ligand at concentration $[\mathrm{L}]$, the fraction of receptors occupied is

$$
\theta = \frac{[\mathrm{LR}]}{[\mathrm{R}] + [\mathrm{LR}]} = \frac{[\mathrm{L}]}{K_\mathrm{d} + [\mathrm{L}]},
$$ {#eq-occupancy}

where $K_\mathrm{d} = [\mathrm{L}][\mathrm{R}]/[\mathrm{LR}] = k_\mathrm{off}/k_\mathrm{on}$ is the **dissociation constant**, the ligand concentration at which half the receptors are occupied. Assumptions: binding has reached equilibrium; there is one independent site per receptor; and ligand is in large excess, so binding does not deplete it.
:::

::: proof
Write $R_\mathrm{T} = [\mathrm{R}] + [\mathrm{LR}]$ for the total receptor. From the definition of $K_\mathrm{d}$, $[\mathrm{R}] = K_\mathrm{d}[\mathrm{LR}]/[\mathrm{L}]$, so $R_\mathrm{T} = [\mathrm{LR}](K_\mathrm{d} + [\mathrm{L}])/[\mathrm{L}]$ and $\theta = [\mathrm{LR}]/R_\mathrm{T} = [\mathrm{L}]/(K_\mathrm{d}+[\mathrm{L}])$.
:::

Signalling receptors bind their ligands tightly: $K_\mathrm{d}$ values are typically $10^{-11}$–$10^{-8}$ mol L⁻¹ (picomolar to nanomolar), compared with micromolar to millimolar for enzymes and their substrates. Hormone concentrations in blood are correspondingly low. Note the scale: by [[cell-biology/cells-and-microscopy#ex-nanomolar]], 1 nM in the 1 pL of fluid around a single animal cell is only about 600 molecules.

::: example Occupancy and spare receptors {#ex-occupancy}
A growth-factor receptor has $K_\mathrm{d} = 1\ \mathrm{nM}$. (a) What fraction is occupied at 0.1, 1 and 10 nM ligand? (b) In many tissues the maximal response is reached when only a small fraction of receptors is occupied. Suppose the response is half-maximal when 5 % of the receptors are occupied. At what ligand concentration is that?
::: solution
(a) By [[#eq-occupancy]], $\theta = 0.1/1.1 = 0.091$; $1/2 = 0.50$; $10/11 = 0.91$. Going from 10 % to 90 % occupancy needs an 81-fold increase in ligand: $\theta/(1-\theta) = [\mathrm{L}]/K_\mathrm{d}$, so $[\mathrm{L}]_{90}/[\mathrm{L}]_{10} = 9/(1/9) = 81$.

(b) Solving $\theta = 0.05$ for $[\mathrm{L}]$: $[\mathrm{L}] = K_\mathrm{d}\,\theta/(1-\theta) = 1\times0.05/0.95 = 0.053\ \mathrm{nM}$. The response is half-maximal at a concentration twenty times lower than $K_\mathrm{d}$. Such cells are said to have **spare receptors**: the downstream machinery saturates long before the receptors do, which makes the cell more sensitive than the binding affinity alone would suggest. Pharmacologists first inferred spare receptors in the 1950s and 1960s from experiments in which most receptors were irreversibly blocked yet the maximal response could still be reached ([[#exr-spare]]).
:::
:::

## G-protein-coupled receptors and second messengers

### The G-protein switch

A trimeric G protein consists of α, β and γ subunits. In the resting state Gα binds GDP and the three subunits are together. An activated receptor acts as a **guanine-nucleotide exchange factor**: it makes Gα release GDP, GTP (more abundant in the cytosol) binds in its place, and Gα·GTP separates from Gβγ. Both parts can then regulate targets. Gα hydrolyses its GTP after seconds to minutes — faster when helped by RGS proteins — and reassociates with Gβγ, ending the signal.

::: intuition GTPases as timers
The trimeric G proteins, the small GTPases (Ras, Rab, Ran, Arf, Rho) and the translation factors share a mechanism: ON when GTP is bound, OFF when GDP is bound, switched on by an exchange factor and off by their own slow GTPase activity, often accelerated by a GTPase-activating protein. Because the switch turns itself off, it acts as a timer: each activated molecule stays on for a characteristic time, and the signal lasts only as long as the receptor keeps switching new molecules on. A mutant that cannot hydrolyse GTP is a timer that never rings — the defect of oncogenic Ras.
:::

Different Gα families have different targets. **Gs** stimulates adenylyl cyclase, which makes **cyclic AMP** (cAMP) from ATP; **Gi** inhibits it; **Gq** activates phospholipase C-β; **Gt** (transducin), in the retina, activates a cGMP phosphodiesterase. Martin Rodbell showed in 1971 that GTP is needed for hormone action on adenylyl cyclase in rat liver membranes, and Alfred Gilman's group purified Gs in 1980, using a mouse lymphoma mutant (*cyc⁻*) that lacked it as a test system; they shared the 1994 Nobel Prize in Physiology or Medicine.

::: definition Second messenger {#def-second-messenger}
A **second messenger** is a small intracellular molecule or ion whose concentration changes rapidly in response to receptor activation and which relays the signal to target proteins. The main second messengers are cyclic AMP, cyclic GMP, Ca²⁺, inositol 1,4,5-trisphosphate (IP₃) and diacylglycerol (DAG). They diffuse quickly, can be made in large numbers by a single enzyme molecule, and are rapidly removed, so they amplify signals and spread them through the cell.
:::

### Cyclic AMP

Earl Sutherland and Theodore Rall found cAMP in 1957–58 while studying how adrenaline and glucagon make the liver break down glycogen: the hormones acted on liver membranes to produce a heat-stable factor that activated glycogen phosphorylase even in a cell-free extract. It was the first second messenger (Sutherland, Nobel Prize in Physiology or Medicine, 1971). cAMP acts mainly through **protein kinase A** (PKA): two cAMP molecules bind each regulatory subunit and release the catalytic subunits, which phosphorylate serine and threonine residues on target proteins. In the liver, PKA phosphorylates and activates phosphorylase kinase, which phosphorylates and activates glycogen phosphorylase — the cascade by which Edwin Krebs and Edmond Fischer discovered regulatory protein phosphorylation in the 1950s (Nobel Prize in Physiology or Medicine, 1992). PKA also enters the nucleus and phosphorylates the transcription factor CREB, so the same signal changes both metabolism (in seconds) and gene expression (in tens of minutes). Phosphodiesterases degrade cAMP and phosphatases reverse the phosphorylations, ending the response.

::: example Amplification in a cascade {#ex-amplification}
A single activated receptor activates, at an illustrative rate, 10 Gs molecules during its active lifetime; each Gαs·GTP keeps an adenylyl cyclase active long enough to make 100 cAMP molecules; and each PKA catalytic subunit released phosphorylates 100 molecules of its target before the signal is terminated. Two cAMP molecules release one catalytic subunit (four bind the R₂C₂ holoenzyme to release two). How many target molecules are phosphorylated per receptor activated?
::: solution
Receptor → 10 G proteins → $10\times100 = 1000$ cAMP → $1000/2 = 500$ catalytic subunits → $500\times100 = 5\times10^4$ phosphorylated targets. If each phosphorylated target were an enzyme (as phosphorylase kinase and phosphorylase are), the amplification would continue. Real gains are smaller than such multiplications suggest, because each step is opposed by inactivation and because molecules must find each other; but amplification is why a few hundred hormone molecules can change the metabolism of a whole cell. (The numbers here are illustrative, not measured.)
:::
:::

### Calcium, IP₃ and DAG

**Gq** activates phospholipase C-β, which cleaves the membrane lipid PI(4,5)P₂ ([[cell-biology/membranes]]) into two second messengers: soluble **IP₃**, which diffuses to the ER and opens IP₃-receptor Ca²⁺ channels, and **DAG**, which stays in the membrane and, with Ca²⁺, activates **protein kinase C** (Yasutomi Nishizuka's group, 1977–79). Hans Streb, Robin Irvine, Michael Berridge and Irene Schulz showed in 1983 that IP₃ releases Ca²⁺ from intracellular stores in rat pancreatic acinar cells.

**Calcium** is the most widespread intracellular messenger. Cytosolic free Ca²⁺ is kept at about 100 nmol L⁻¹ by pumps in the plasma membrane and ER, against some 1–2 mmol L⁻¹ outside and hundreds of micromolar in the ER lumen ([[cell-biology/membrane-transport#ex-nernst]]). Opening Ca²⁺ channels in either membrane raises it about tenfold within milliseconds. Its many effects are mediated largely by Ca²⁺-binding proteins, above all **calmodulin**, which with four Ca²⁺ bound activates kinases such as CaM-kinase II, phosphatases such as calcineurin, and many other enzymes. Ca²⁺ triggers muscle contraction, exocytosis of synaptic vesicles and hormones, fertilisation and the activation of lymphocytes. Signals are often encoded as oscillations or waves of Ca²⁺ concentration, whose frequency carries information.

::: example How many calcium ions make a calcium signal? {#ex-calcium}
A cell has a cytosolic volume of 2 pL. (a) How many free Ca²⁺ ions are in its cytosol at 100 nM? (b) To raise the free concentration to 1 µM, how many ions must enter the cytosol if, for every free Ca²⁺ ion, about 100 are bound to buffering proteins (a representative buffering ratio)?
::: solution
(a) $n = (10^{-7})(2\times10^{-12})(6.022\times10^{23}) = 1.2\times10^5$ ions.

(b) The free concentration must rise by 0.9 µM, but each extra free ion is accompanied by 100 bound ones, so the total increase is $0.9\times101 = 91\ \mathrm{\mu M}$, or $(9.1\times10^{-5})(2\times10^{-12})(6.022\times10^{23}) = 1.1\times10^8$ ions. Buffering makes Ca²⁺ signals local and short: an ion entering through a channel is captured within a fraction of a micrometre, so Ca²⁺ forms "microdomains" near open channels — which is why synaptic vesicles that must fuse within a millisecond are docked right beside calcium channels.
:::
:::

## Receptor tyrosine kinases and the Ras–MAP kinase pathway

Growth factors such as epidermal growth factor (EGF, discovered by Stanley Cohen in 1962 as a factor from mouse salivary glands that made newborn mice open their eyes early) and nerve growth factor (Rita Levi-Montalcini; both shared the 1986 Nobel Prize in Physiology or Medicine) act through receptor tyrosine kinases. Ligand binding brings two receptors together; each kinase domain phosphorylates tyrosines on its partner. The phosphotyrosines are docking sites for proteins with **SH2 domains** (Tony Pawson's discovery), which assemble a signalling complex on the activated receptor.

One adaptor, Grb2, brings the exchange factor Sos to the membrane, where it activates the small GTPase **Ras**. Ras·GTP starts a three-kinase relay, the **MAP-kinase cascade**: Raf (a MAP-kinase kinase kinase) phosphorylates and activates MEK (a MAP-kinase kinase), which phosphorylates and activates ERK (a MAP kinase) on a threonine and a tyrosine. ERK phosphorylates many cytoplasmic proteins and, in the nucleus, transcription factors that switch on genes needed for cell proliferation. The pathway was pieced together in the late 1980s and early 1990s from three directions at once: oncogene research in mammalian cells, genetic screens for eye development in *Drosophila* (the *sevenless* receptor and *Son of sevenless*), and genetic screens for vulval development in *C. elegans* (*let-23*, *sem-5*, *let-60*) — a striking demonstration of conserved signalling.

Mutations that lock Ras in its GTP-bound state, such as the glycine-to-valine change at codon 12 found in 1982 in the first human oncogene isolated from a bladder carcinoma cell line, keep the pathway on without any growth factor. Mutant *RAS* genes are among the commonest drivers of human cancers ([[cell-biology/cell-cycle]]; [Medicine Atlas: cancer biology](/learn/medicine/lesson.php?c=pathology&l=cancer-biology)).

Other enzyme-coupled receptors work similarly but use different relays: cytokine receptors activate associated **JAK** kinases, which phosphorylate **STAT** transcription factors that move directly into the nucleus; receptors for TGF-β are serine/threonine kinases that phosphorylate **Smad** proteins; and **PI 3-kinase**, recruited by many RTKs, makes PI(3,4,5)P₃ in the membrane, which activates the kinase Akt to promote cell survival and growth.

## Switches and decisions

Many cellular responses are not graded but switch-like: a frog oocyte either matures into an egg or does not; a cell either commits to dividing or does not. How can a smoothly varying input give an all-or-none output?

::: proposition The Hill function (an empirical description of cooperativity) {#prop-hill}
A response $R$ that rises sigmoidally with input $x$ is often described by

$$
R = \frac{x^{n}}{K^{n} + x^{n}},
$$ {#eq-hill}

where $K$ is the input at half-maximal response and $n$ the **Hill coefficient**. For $n = 1$ this is [[#eq-occupancy]]. The ratio of inputs giving 90 % and 10 % of the maximal response is $x_{90}/x_{10} = 81^{1/n}$: 81 for $n = 1$, 3 for $n = 4$. A response with $n > 1$ is called **ultrasensitive**. The Hill function is a description, not a mechanism: an apparent $n$ can arise from cooperative binding, multisite phosphorylation, enzymes working near saturation (zero-order ultrasensitivity, Albert Goldbeter and Daniel Koshland, 1981), cascades, or positive feedback, and $n$ need not be an integer.
:::

::: proof The 90 %–10 % ratio
From [[#eq-hill]], $R/(1-R) = (x/K)^n$, so $x = K\,(R/(1-R))^{1/n}$. Then $x_{90}/x_{10} = (9/(1/9))^{1/n} = 81^{1/n}$.
:::

Chi-Ying Huang and James Ferrell measured the response of the MAP-kinase cascade in extracts of *Xenopus* oocytes in 1996: stimulated with increasing amounts of the top kinase (the MAP-kinase kinase kinase Mos), MEK responded with an apparent Hill coefficient of about 1.7 and ERK (MAPK) with about 4.9, while a single enzyme acting on a single site would give about 1. Each tier of the cascade, by requiring two phosphorylations of its target, sharpens the response. In intact oocytes, Ferrell and Eric Machleder (1998) showed that the population response to the hormone progesterone looked graded, but each individual oocyte was either fully on or fully off — the graded average concealed switch-like individuals, thanks to positive feedback that made the decision **bistable** and irreversible.

::: widget plot
f: x^n/(K^n + x^n); x/(K + x)
x: 0, 5
y: 0, 1.05
sliders: n=4.9:1:8:0.1; K=1:0.2:3:0.1
labels: \text{ultrasensitive (Hill } n); \text{hyperbolic } (n = 1)
hlines: 0.1; 0.9
caption: Response [[#eq-hill]] against input (arbitrary units) for a Hill coefficient $n$ (slider; default 4.9, about the value Huang and Ferrell measured for MAP kinase) compared with a simple hyperbolic response ($n = 1$) with the same half-maximal input $K$. The horizontal lines mark 10 % and 90 % of maximal response. Notice how much narrower the range of input between them becomes as $n$ increases: $81^{1/n}$, from 81-fold at $n = 1$ to about 2.5-fold at $n = 4.9$.
:::

::: example How sharp is a switch? {#ex-switch}
Calculate the input ratio $x_{90}/x_{10}$ for Hill coefficients of 1, 1.7 and 4.9.
::: solution
$81^{1/1} = 81$; $81^{1/1.7} = 13.3$; $81^{1/4.9} = 2.45$. A hyperbolic response needs an 81-fold change in input to go from 10 % to 90 % on; MAP kinase in Huang and Ferrell's extracts needed only about a 2.5-fold change. Stacking ultrasensitive steps converts a gradual rise in a growth factor or hormone into something close to a binary decision.
:::
:::

### Turning signals off: time scales and adaptation

A signal is only useful if it can end. The concentration $x$ of an active signalling molecule produced at rate $s$ and removed by a first-order process with rate constant $k$ obeys $dx/dt = s - kx$.

::: proposition Response time of a signalling molecule {#prop-response-time}
If production switches on at constant rate $s$ at $t = 0$, starting from $x = 0$,

$$
x(t) = \frac{s}{k}\left(1 - e^{-kt}\right),
$$ {#eq-response}

approaching the steady state $s/k$ with time constant $1/k$; it reaches half the steady state at $t_{1/2} = \ln 2/k$, the half-life of the molecule, and 90 % at $\ln 10/k \approx 3.3\,t_{1/2}$. If production stops, $x$ decays as $e^{-kt}$. Assumptions: constant production, first-order removal, and no feedback.
:::

::: widget plot
f: (1 - exp(-ln(2)*x/T))*H(30 - x) + (1 - exp(-ln(2)*30/T))*exp(-ln(2)*(x - 30)/T)*H(x - 30)
x: 0, 90
y: 0, 1.05
sliders: T=5:1:30:0.5
vlines: 30
caption: A signalling molecule made at a constant rate from $t = 0$ to $t = 30$ min (vertical line) and then not at all, with first-order removal; the slider sets its half-life $t_{1/2}$ in minutes. The vertical axis is the concentration as a fraction of the steady state $s/k$. With a short half-life the molecule rises quickly to its plateau and vanishes quickly after the signal stops; with a long one it never reaches steady state in 30 min and lingers long afterwards. Changing the production rate would only rescale the curve.
:::

The surprising consequence is that the speed of a signal is set by how fast it is *removed*, not how fast it is made: a molecule with a long half-life responds slowly both on and off, whatever its rate of synthesis. Signalling systems therefore destroy their messengers quickly — phosphodiesterases hydrolyse cAMP within seconds, acetylcholinesterase destroys acetylcholine at the synapse in about a millisecond, and many transcription factors and signalling proteins turn over in minutes. Many systems also **adapt**: a sustained stimulus produces a response that fades even though the stimulus remains, so the cell responds to *changes* in the signal. GPCRs are desensitised by phosphorylation (by GPCR kinases) and binding of **arrestins**, which uncouple them from G proteins and drive their endocytosis; chemotactic bacteria adapt by methylating their receptors, which lets them compare present with recent concentrations over a range of five orders of magnitude.

::: warning "One signal, one response"
The same signal often produces different responses in different cells, and the same cell often uses one pathway for many signals. Acetylcholine makes skeletal muscle contract (through an ion-channel receptor), slows the heart (through a Gi-coupled receptor that opens K⁺ channels) and makes salivary glands secrete (through a Gq-coupled receptor). What a cell does depends on which receptors, relay proteins and target genes it has — on its history and identity — not on the signal alone. Equally, pathways are not isolated linear chains: they share components and regulate one another ("cross-talk"), and drawing them as separate arrows on a diagram is a simplification.
:::

## Developmental signalling pathways

A small set of pathways, conserved throughout animals, controls cell fate in development and tissue maintenance: **Wnt**, **Hedgehog**, **Notch**, **TGF-β/BMP**, nuclear receptors and the RTK pathways. They were discovered largely through *Drosophila* genetics — the names *wingless* and *hedgehog* describe mutant larvae — and they are used again and again in different tissues. **Notch** is a contact-dependent receptor: binding of the transmembrane ligand Delta on a neighbouring cell triggers proteolytic cleavage of Notch, and its released intracellular domain enters the nucleus to regulate genes. Because Notch signalling in one cell suppresses Delta production in that cell, neighbouring cells are driven into opposite fates, a mechanism called **lateral inhibition** that produces the salt-and-pepper patterns of neural precursors in insects and vertebrates. Paracrine signals that spread from a source and specify different fates at different concentrations are **morphogens**; their range is set by the balance of diffusion and removal.

::: example How far does a paracrine signal reach? {#ex-gradient}
A secreted protein diffuses away from a line of source cells with an effective diffusion coefficient $D = 20\ \mathrm{\mu m^2\,s^{-1}}$ and is removed (by receptor uptake and degradation) with first-order rate constant $k = 1/600\ \mathrm{s^{-1}}$. At steady state, $D\,d^2c/dx^2 = kc$, whose decaying solution is $c(x) = c_0e^{-x/\lambda}$ with $\lambda = \sqrt{D/k}$. Calculate $\lambda$. Over what distance does the concentration fall a hundredfold?
::: solution
$\lambda = \sqrt{20\times600}\ \mathrm{\mu m} = \sqrt{12\,000} = 110\ \mathrm{\mu m}$. A hundredfold fall needs $x = \lambda\ln100 = 110\times4.6 = 500\ \mathrm{\mu m}$, a few dozen cell diameters. Doubling the lifetime of the signal extends its range only by $\sqrt2$. Measured morphogen gradients — for example of the Bicoid transcription factor in the early *Drosophila* embryo, or of the Dpp protein in its wing disc — have decay lengths of tens to about a hundred micrometres, consistent with this simple picture, although how such gradients form in tissues is still studied actively ([[developmental-biology]]).
:::
:::

::: quiz
A cell line has a GPCR coupled to Gs. You add a non-hydrolysable analogue of GTP (GTPγS) to permeabilised cells. What happens to cAMP production, with and without hormone?
- [ ] Nothing: G proteins need hormone to be active.
- [x] cAMP production rises and stays high, slowly even without hormone and much faster with it, because Gαs that binds GTPγS cannot switch itself off.
- [ ] cAMP falls, because GTPγS inhibits adenylyl cyclase directly.
- [ ] cAMP rises briefly and then returns to baseline, because receptors desensitise.
::: solution
GTPγS binds Gα in place of GTP but cannot be hydrolysed, so every Gαs that loads it stays active indefinitely. Without hormone, slow spontaneous nucleotide exchange gradually activates Gαs; hormone-bound receptor catalyses exchange and speeds the process greatly. This kind of experiment, by Rodbell, Gilman and others, showed that the G protein's own GTP hydrolysis terminates the signal. Receptor desensitisation does not matter here, because the G proteins never switch off.
:::
:::

::: history
Ernest Starling and William Bayliss coined the word "hormone" after discovering secretin in 1902, and John Newport Langley proposed a "receptive substance" on muscle cells in 1905. Earl Sutherland's discovery of cAMP (1957–58) introduced the second messenger; Edwin Krebs and Edmond Fischer's work on glycogen phosphorylase (1955–59) showed that phosphorylation regulates enzymes; Martin Rodbell (1971) and Alfred Gilman (1980) uncovered the G proteins. Stanley Cohen isolated EGF in 1962 and, with Graham Carpenter and others, showed in 1978–80 that its receptor is a protein kinase that phosphorylates tyrosine (Tony Hunter and Bartholomew Sefton had discovered tyrosine phosphorylation in 1979–80, in a viral oncoprotein). The first human oncogene, a mutant *HRAS*, was isolated in 1982 by the groups of Robert Weinberg, Mariano Barbacid and Michael Wigler. Michael Berridge and colleagues identified IP₃ as a Ca²⁺-releasing messenger in 1983. Ronald Evans and Pierre Chambon cloned the first steroid-hormone receptors in 1985–86, revealing the nuclear-receptor family, and Kobilka's crystal structures of the β₂-adrenergic receptor (2007, 2011) showed how a GPCR activates its G protein.
:::

::: summary
- Signals act by endocrine, paracrine, autocrine, contact-dependent or synaptic routes; a cell responds only if it has the receptor. Hydrophobic signals bind intracellular (nuclear) receptors; hydrophilic ones bind cell-surface receptors.
- Surface receptors are ion-channel-coupled, G-protein-coupled (about 800 in humans) or enzyme-coupled (notably receptor tyrosine kinases).
- Occupancy is $\theta = [\mathrm{L}]/(K_\mathrm{d}+[\mathrm{L}])$; signalling $K_\mathrm{d}$ values are pM–nM. Spare receptors make responses more sensitive than binding.
- G proteins and small GTPases are self-terminating switches. Gs/Gi regulate cAMP and PKA; Gq activates phospholipase C, producing IP₃ (Ca²⁺ release) and DAG (PKC). Cytosolic Ca²⁺ rises from about 100 nM to about 1 µM, heavily buffered and acting largely through calmodulin.
- RTKs recruit SH2-domain proteins; Ras activates the Raf–MEK–ERK cascade; constitutively active Ras is a common cancer driver.
- Ultrasensitive responses (Hill coefficient $n > 1$; $x_{90}/x_{10} = 81^{1/n}$) and positive feedback convert graded inputs into switch-like decisions, as in the MAP-kinase cascade of *Xenopus* oocytes.
- The speed of a signal is set by its removal: $x(t) = (s/k)(1-e^{-kt})$; adaptation and desensitisation let cells respond to change. Paracrine and morphogen signals reach a distance $\lambda = \sqrt{D/k}$.
:::

## Exercises

::: exercise Occupancy {level=1 check="0.75"}
What fraction of receptors with $K_\mathrm{d} = 1\ \mathrm{nM}$ is occupied at 3 nM free ligand?
::: solution
$\theta = 3/(1 + 3) = 0.75$.
:::
:::

::: exercise A Hill response {level=1 check="0.941"}
A response follows [[#eq-hill]] with $n = 4$. What fraction of the maximal response is produced at an input twice $K$ (three significant figures)?
::: solution
$R = 2^4/(1 + 2^4) = 16/17 = 0.941$.
:::
:::

::: exercise Range of a hyperbolic response {level=1 check="81"}
For a simple binding curve ($n = 1$), by what factor must the ligand concentration increase to raise occupancy from 10 % to 90 %?
::: solution
$81^{1/1} = 81$ (see [[#ex-occupancy]]).
:::
:::

::: exercise Waiting for a steady state {level=2 check="33.2"}
A transcription factor is induced by a signal and degraded with a half-life of 10 min. How many minutes after its synthesis starts does it reach 90 % of its new steady-state level (three significant figures)?
::: solution
By [[#prop-response-time]], $t_{90} = \ln 10/k = t_{1/2}\ln10/\ln2 = 10\times3.32 = 33.2\ \mathrm{min}$. To make the response faster, the cell would have to degrade the protein faster (and make it faster, to keep the same steady state).
:::
:::

::: exercise Calcium ions in a small cell {level=2 check="6.02"}
How many free Ca²⁺ ions are there in 1.0 pL of cytosol at 1.0 µM? Give the answer in units of $10^5$, to three significant figures.
::: solution
$10^{-6}\times10^{-12}\times6.022\times10^{23} = 6.02\times10^5$.
:::
:::

::: exercise Range of a short-lived signal {level=2 check="93.0"}
A paracrine signal has $D = 10\ \mathrm{\mu m^2\,s^{-1}}$ and a half-life of 10 min (600 s) in the tissue. Calculate its decay length $\lambda = \sqrt{D/k}$ in micrometres (three significant figures).
::: solution
$k = \ln2/600 = 1.155\times10^{-3}\ \mathrm{s^{-1}}$, so $\lambda = \sqrt{10/1.155\times10^{-3}} = \sqrt{8656} = 93.0\ \mathrm{\mu m}$.
:::
:::

::: exercise Reading a dose–response experiment {#exr-spare level=2}
The contraction of an isolated smooth-muscle strip in response to an agonist is measured before and after treatment with an irreversible antagonist that permanently inactivates a fraction of the receptors. Before treatment the response is half-maximal at 2 nM agonist. After treatment the maximal response is unchanged, but the curve is shifted to the right, half-maximal at 20 nM. After a stronger treatment the curve shifts further and the maximum falls to 60 %. (a) Explain why the first treatment does not lower the maximum. (b) What does this tell you about the relationship between occupancy and response? (c) Could you estimate $K_\mathrm{d}$ from the half-maximal concentration of the untreated tissue? Explain.
::: solution
(a) The tissue has spare receptors: the maximal response requires only a fraction of the receptors to be occupied. Removing some of them means a higher agonist concentration is needed to occupy enough of the remainder, but the maximum can still be reached. Only when so many are removed that full occupancy of the rest is not enough does the maximum fall.
(b) The response is a saturating function of occupancy — the downstream machinery saturates before the receptors do — so response and occupancy are not proportional.
(c) No. With spare receptors the half-maximal concentration (2 nM) is lower than $K_\mathrm{d}$; it measures the sensitivity of the whole system, not the binding affinity. Comparing the curves before and after partial receptor inactivation (the method of Robert Furchgott) does allow $K_\mathrm{d}$ to be estimated, by finding concentrations giving equal responses and fitting them to the occupancy equation.
:::
:::

::: exercise A switch from a cascade {level=3}
Two kinases act in series. The activity of the first, $y$, is a hyperbolic function of input, $y = x/(1 + x)$. The activity of the second, $z$, is an ultrasensitive function of $y$: $z = y^2/(0.25 + y^2)$ (that is, $n = 2$ and half-maximal at $y = 0.5$). (a) At what input $x$ is the second kinase half-maximally active? (b) Calculate $z$ at $x = 0.5$ and $x = 2$ and comment. (c) Explain why making each tier ultrasensitive, rather than only the last, produces a sharper overall response.
::: solution
(a) $z = 1/2$ when $y = 0.5$, i.e. $x/(1+x) = 0.5$, so $x = 1$.
(b) At $x = 0.5$: $y = 0.333$, $y^2 = 0.111$, $z = 0.111/0.361 = 0.31$. At $x = 2$: $y = 0.667$, $y^2 = 0.444$, $z = 0.444/0.694 = 0.64$. A fourfold change in input moves $z$ from 31 % to 64 %, compared with $y$ going from 33 % to 67 % — not much sharper, because the first stage's hyperbolic response compresses the range over which the second stage operates.
(c) The overall sensitivity of a cascade is roughly the product of the local sensitivities (logarithmic gains) of its tiers. If every tier has a Hill-like response with $n > 1$ in the relevant range, their effects multiply, as in Huang and Ferrell's measurements, where the apparent $n$ rose from about 1.7 at MEK to about 4.9 at MAPK down the cascade. A single ultrasensitive step fed by a hyperbolic one gains less.
:::
:::

::: exercise Graded or all-or-none? {level=3}
Frog oocytes are treated with different concentrations of progesterone, and after some hours the fraction of oocytes showing ERK activation is measured by pooling 20 oocytes at each concentration: it rises smoothly from 0 to 100 % over a tenfold range of concentration. (a) Propose two different explanations for this smooth curve at the level of single oocytes. (b) What experiment would distinguish them? (c) If the switch is bistable, what would you expect if the progesterone were washed out after the oocytes had responded?
::: solution
(a) Either every oocyte responds in a graded way (each has intermediate ERK activity at intermediate doses), or each oocyte responds all-or-none at its own threshold, and the thresholds vary from oocyte to oocyte, so the pooled average rises smoothly.
(b) Measure ERK activation in individual oocytes. Ferrell and Machleder (1998) did this and found that at intermediate doses each oocyte was either fully activated or not at all — a bimodal distribution — so the second explanation was right.
(c) A bistable switch has memory: once on, positive feedback keeps it on even after the stimulus is removed, so the oocytes would stay activated (as maturation is irreversible). A merely ultrasensitive (but not bistable) system would switch off again.
:::
:::
