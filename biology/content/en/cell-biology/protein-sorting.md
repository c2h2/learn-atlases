A human cell makes some ten thousand different kinds of protein, and almost all of them begin life in the same place: on ribosomes in the cytosol. Yet each must end up in the right one of a dozen or so destinations — the cytosol itself, the nucleus, the matrix or one of the membranes of a mitochondrion, a peroxisome, the ER, the Golgi, a lysosome, the plasma membrane or the outside of the cell. A digestive enzyme delivered to the cytosol instead of a lysosome would be useless and possibly harmful; a receptor that never reaches the cell surface cannot receive its signal. How does each protein find its way?

The answer, worked out between the 1960s and the 1990s, has a pleasing logic. Each protein carries its own address, usually a short stretch of amino-acid sequence called a **sorting signal**. Receptors in the cytosol or on organelle membranes read the address, and dedicated machinery either threads the protein across a membrane or packages it into a vesicle that travels between compartments. This chapter follows proteins along the three main routes: gated transport into the nucleus, translocation across membranes into the ER, mitochondria, chloroplasts and peroxisomes, and vesicular traffic through the secretory and endocytic pathways. The compartments themselves were introduced in [[cell-biology/organelles]].

## Sorting signals and the three modes of transport

::: definition Sorting signal {#def-sorting-signal}
A **sorting signal** is a feature of a protein that directs it to a particular location. Most are **signal sequences**: continuous stretches of typically 3–80 amino acids, often (but not always) at the N terminus, which may be removed by a **signal peptidase** after they have acted. Others are **signal patches**, formed by residues far apart in sequence that come together when the protein folds, or covalent modifications such as the mannose-6-phosphate tag of lysosomal enzymes. A protein with no sorting signal stays in the cytosol.
:::

The table lists the best-known signals; the sequences are typical examples, written in the one-letter amino-acid code. "Positive" means rich in lysine (K) and arginine (R).

| destination | signal | example |
|---|---|---|
| ER | N-terminal signal peptide: positive residues, then a core of 6–15 hydrophobic residues, then a cleavage site | many secretory proteins |
| retention in ER lumen | C-terminal KDEL | BiP and other ER chaperones |
| nucleus | short basic nuclear localisation signal (NLS) | `PKKKRKV` (SV40 large T antigen) |
| export from nucleus | leucine-rich nuclear export signal | — |
| mitochondrial matrix | N-terminal amphipathic helix with positive charges on one face | most matrix proteins |
| peroxisome | C-terminal tripeptide (PTS1) | `SKL` |
| lysosome | mannose-6-phosphate added in the Golgi to a signal patch | lysosomal hydrolases |

Proteins move between compartments in three fundamentally different ways:

1. **Gated transport** through the nuclear pore complexes, which connect two topologically equivalent spaces, the cytosol and the nucleoplasm; folded proteins and even whole ribosomal subunits pass.
2. **Transmembrane transport** by protein translocators that thread an unfolded chain across a membrane into a topologically distinct space: the ER lumen, the mitochondrion, the chloroplast. (Peroxisomes are unusual in importing folded proteins.)
3. **Vesicular transport** between topologically equivalent compartments of the endomembrane system — ER, Golgi, endosomes, lysosomes, plasma membrane — in which membrane-bounded carriers bud from one compartment and fuse with the next, carrying both lumenal cargo and membrane proteins.

## Into and out of the nucleus

In 1984 Daniel Kalderon, Alan Smith and colleagues showed that a single amino-acid change in the large T antigen of the monkey virus SV40 left the protein in the cytoplasm instead of the nucleus, and that the seven-residue sequence `PKKKRKV` could carry an unrelated cytoplasmic protein into the nucleus when attached to it. This **nuclear localisation signal** is recognised by importin-α, which binds importin-β; importin-β interacts with the FG repeats lining the nuclear pore and carries the complex through.

Direction comes from the small GTPase **Ran**. A guanine-nucleotide exchange factor for Ran (RCC1) is bound to chromatin, so Ran in the nucleus is loaded with GTP; a GTPase-activating protein (RanGAP) is in the cytoplasm, so Ran there is converted to Ran-GDP. Ran-GTP binds importins in the nucleus and makes them release their cargo; it binds exportins together with their cargo and releases both in the cytoplasm when its GTP is hydrolysed. Each transport receptor thus loads on one side and unloads on the other, and the energy for moving cargo uphill — nuclear proteins accumulate far above their cytosolic concentration — comes ultimately from GTP hydrolysis that maintains the Ran-GTP gradient.

::: intuition Ran as a compass
The receptors themselves do not know which side they are on. Ran-GTP does: there is lots of it in the nucleus and very little in the cytoplasm. Importins are built to drop their cargo when they meet Ran-GTP, exportins to pick theirs up. A gradient of one small protein turns undirected diffusion through the pore into directed traffic, in the same way that a concentration gradient of a sugar can drive a symporter in [[cell-biology/membrane-transport]].
:::

## Into the endoplasmic reticulum: the signal hypothesis

Proteins bound for the secretory pathway enter the ER while they are still being made. The idea that they carry an address for this was proposed by Günter Blobel and David Sabatini in 1971, and tested by Blobel and Bernhard Dobberstein in 1975: when mRNA for an immunoglobulin light chain from mouse myeloma cells was translated in a cell-free system, the product was about 20 residues longer than the secreted protein; when ER-derived microsomes were present during translation, the extension was removed and the protein ended up inside the vesicles, protected from added protease. Blobel received the 1999 Nobel Prize in Physiology or Medicine.

::: definition The signal hypothesis and co-translational translocation {#def-signal-hypothesis}
A protein destined for the secretory pathway carries an N-terminal **signal peptide**. As it emerges from the ribosome, the **signal-recognition particle** (SRP, a complex of six proteins and a 7S RNA) binds it and the ribosome, pausing elongation. SRP delivers the complex to the **SRP receptor** on the ER membrane and hands the ribosome to the **Sec61 translocon**, a protein-conducting channel. The chain is then threaded through the translocon into the ER lumen as it is synthesised, the signal peptide is cleaved by signal peptidase, and SRP is recycled by GTP hydrolysis. This route is called **co-translational translocation**.
:::

Peter Walter and Blobel purified SRP in 1980–81; Tom Rapoport's laboratory identified Sec61 and in 2004 solved the structure of its archaeal homologue, an hourglass-shaped channel with a lateral gate that can open sideways into the lipid bilayer.

::: example A race against the ribosome {#ex-translation-time}
A mammalian ribosome adds about 5.6 amino acids per second (measured in mouse embryonic stem cells by ribosome profiling: Nicholas Ingolia, Liana Lareau and Jonathan Weissman, 2011). (a) How long does it take to make a 500-residue protein? (b) The ribosome's exit tunnel holds about 30–40 residues, so a signal peptide at residues 1–25 is fully exposed when about 60–70 residues have been polymerised. How long after initiation is that, and why does it matter that SRP pauses elongation?
::: solution
(a) $500/5.6 \approx 89\ \mathrm{s}$, about a minute and a half.

(b) $70/5.6 \approx 12.5\ \mathrm{s}$. If translation simply continued, much of the protein could be made and begin to fold in the cytosol before the ribosome found a translocon; a folded domain cannot pass through Sec61. The elongation pause buys time to reach the ER membrane while the chain is still short. (In bacteria, which translate at 15–20 residues per second, many secreted proteins are instead held unfolded by chaperones and exported after translation.)
:::
:::

### Membrane proteins and topology

The translocon also inserts membrane proteins, and their orientation is decided as they pass through it. A hydrophobic segment long enough to span the bilayer — about 20 residues, as in [[cell-biology/membranes#ex-tm-helix]] — slips out of the lateral gate of Sec61 into the lipid.

- A cleaved N-terminal signal peptide followed later by a hydrophobic **stop-transfer** segment gives a single-pass protein with its N terminus in the lumen and its C terminus in the cytosol (type I; the LDL receptor is an example).
- An uncleaved internal hydrophobic **signal-anchor** sequence can insert either way round; the flanking charges decide. The side with more positive residues stays in the cytosol — von Heijne's positive-inside rule.
- Multipass proteins insert successive hydrophobic segments alternately as start-transfer and stop-transfer sequences, stitching the chain back and forth.

Because lumenal domains of ER proteins end up on the outside of the plasma membrane after vesicle traffic (the topological equivalence of [[cell-biology/organelles#def-organelle]]), the decisions made at the translocon fix the orientation of every cell-surface receptor.

Proteins with a single hydrophobic segment at their extreme C terminus — **tail-anchored proteins** — cannot use SRP, because the segment emerges only after translation is finished. They are captured after release from the ribosome and inserted by a separate system (the GET pathway in yeast, TRC in mammals).

### Folding and quality control in the ER

The ER lumen is a protein-folding compartment. Its chaperone BiP (a member of the Hsp70 family) binds emerging chains; protein disulfide isomerase forms and rearranges disulfide bonds, which the oxidising lumen favours; and the oligosaccharyltransferase, sitting next to the translocon, adds a preassembled 14-sugar oligosaccharide (Glc₃Man₉GlcNAc₂) to asparagine residues in the sequence **Asn-X-Ser/Thr**, where X is any amino acid except proline. This **N-linked glycosylation** both helps folding and serves as a quality-control tag: glucose residues are trimmed one by one, and a protein that has not folded correctly is re-glucosylated by an enzyme that recognises exposed hydrophobic surfaces, binding again to the lectin chaperones calnexin and calreticulin for another attempt.

Proteins that never fold are retrotranslocated to the cytosol, ubiquitylated and degraded by the proteasome — **ER-associated degradation** (ERAD). When unfolded proteins accumulate faster than they can be dealt with, three ER-membrane sensors (IRE1, PERK and ATF6) trigger the **unfolded protein response**, which slows translation, increases the production of chaperones and ERAD components, and, if the stress is not relieved, triggers apoptosis. The UPR was worked out largely in yeast, by Peter Walter and Kazutoshi Mori in the 1990s.

::: example Finding glycosylation sites {#ex-sequon}
Which asparagines in the lumenal segment `MNGTLSNPSADNKTVWNASQ` are potential N-glycosylation sites?
::: solution
Look for N followed by any residue except P, then S or T. Numbering from M = 1: N2–G–T fits; N7–P–S does not (proline at X); N12–K–T fits; N17–A–S fits. So three sequons: Asn2, Asn12 and Asn17. Not every sequon is used — sites very close to the C terminus, or buried as the chain folds, may be skipped — but the absence of a sequon rules N-glycosylation out.
:::
:::

## Into mitochondria, chloroplasts and peroxisomes

These organelles import fully synthesised proteins from the cytosol, after translation. Most mitochondrial matrix proteins have an N-terminal **presequence** of 15–50 or more residues that folds into an amphipathic α-helix with positive charges on one face and hydrophobic ones on the other. Receptors of the **TOM** complex (translocase of the outer membrane) recognise it, and the chain is threaded in unfolded form through TOM and then the **TIM23** complex of the inner membrane. The membrane potential across the inner membrane (matrix negative) pulls the positive presequence through electrophoretically, and the matrix Hsp70, driven by ATP, ratchets the rest of the chain in; the matrix processing peptidase then removes the presequence. Other routes, using TIM22, the SAM complex and the MIA disulfide relay, insert carrier proteins into the inner membrane, β-barrels into the outer membrane and small proteins into the intermembrane space. Chloroplasts use analogous **TOC** and **TIC** complexes and N-terminal transit peptides; thylakoid proteins then cross a further membrane by pathways inherited from the cyanobacterial ancestor.

Peroxisomes import their matrix proteins *folded*, and even as oligomers, using the receptor PEX5, which recognises the C-terminal `SKL` signal (PTS1; Stephen Gould, Suresh Subramani and colleagues, 1987–89), and a translocation mechanism that is still incompletely understood.

::: warning "Signal sequences are cut off, so they are not part of the protein"
Some are cleaved and some are not, and the distinction matters. ER signal peptides and mitochondrial presequences are usually removed; nuclear localisation signals are not, because a protein must be able to return to the nucleus after every mitosis, when the nuclear envelope breaks down and its contents mix with the cytoplasm. The KDEL ER-retention signal and peroxisomal SKL also remain. A second mistake is to think that a signal sufficient for targeting is always necessary: many proteins have redundant signals, and deleting one may have little effect.
:::

## The secretory pathway

Once a protein is in the ER, it moves onwards in vesicles. The route was traced by George Palade and James Jamieson in the 1960s in pancreatic acinar cells of the guinea pig, which secrete large amounts of digestive enzymes. They gave tissue slices a short pulse of a radioactive amino acid ($^3$H-leucine), then a "chase" of unlabelled amino acid, and followed the newly made protein by autoradiography under the electron microscope. A few minutes after the pulse the label was over the rough ER; within tens of minutes it reached the Golgi region and the condensing vacuoles at its *trans* side; and after about two hours it was in zymogen granules, ready for secretion. Palade shared the 1974 Nobel Prize in Physiology or Medicine with Albert Claude and Christian de Duve.

The pulse–chase experiment has a simple mathematical description, the basis of all later kinetic studies of membrane traffic.

::: proposition Two compartments in series {#prop-compartments}
Suppose labelled protein leaves compartment A (the ER) by a first-order process with rate constant $k_1$, enters compartment B (the Golgi), and leaves B for C (granules or the cell surface) with rate constant $k_2 \neq k_1$. Starting with all label in A, the fractions in each compartment at time $t$ are

$$
A(t) = e^{-k_1 t}, \qquad B(t) = \frac{k_1}{k_2 - k_1}\left(e^{-k_1 t} - e^{-k_2 t}\right), \qquad C(t) = 1 - A(t) - B(t).
$$ {#eq-compartments}

$B$ peaks at $t^* = \ln(k_2/k_1)/(k_2 - k_1)$. Assumptions: each compartment is well mixed (every molecule in it has the same probability per unit time of leaving), the rate constants are independent of time and of the amount of protein, and nothing is degraded.
:::

::: proof
$dA/dt = -k_1A$ with $A(0) = 1$ gives $A = e^{-k_1t}$. Then $dB/dt = k_1A - k_2B = k_1e^{-k_1t} - k_2B$. Multiplying by the integrating factor $e^{k_2t}$, $\frac{d}{dt}(Be^{k_2t}) = k_1e^{(k_2-k_1)t}$; integrating with $B(0) = 0$ gives $Be^{k_2t} = \frac{k_1}{k_2-k_1}(e^{(k_2-k_1)t} - 1)$, which is [[#eq-compartments]]. Setting $dB/dt = 0$ gives $k_1e^{-k_1t^*} = k_2e^{-k_2t^*}$, so $t^* = \ln(k_2/k_1)/(k_2-k_1)$. For solving linear ODEs like these see [Maths Atlas: first-order equations](/learn/maths/course.php?c=ode).
:::

::: example Reading a pulse–chase {#ex-pulse-chase}
A membrane glycoprotein leaves the ER with a half-time of 20 min and passes through the Golgi with a half-time of 10 min. When does the amount in the Golgi peak, and what fraction of the pulse is there at that moment?
::: solution
$k_1 = \ln2/20 = 0.0347\ \mathrm{min^{-1}}$, $k_2 = \ln2/10 = 0.0693\ \mathrm{min^{-1}}$. Then $t^* = \ln 2/(0.0693 - 0.0347) = 0.693/0.0347 = 20\ \mathrm{min}$. At that moment $A = e^{-0.693} = 0.5$ and $B = \frac{0.0347}{0.0347}(0.5 - 0.25) = 0.25$. A quarter of the labelled protein is in the Golgi at its peak; half is still in the ER and a quarter has already left.

In practice the compartments are distinguished biochemically: the sugar chains of glycoproteins become resistant to the enzyme endoglycosidase H only after modification in the *medial* Golgi, so the fraction of a protein that is "Endo H resistant" measures how much has passed that point.
:::
:::

::: widget plot
f: exp(-a*x); a/(b - a)*(exp(-a*x) - exp(-b*x)); 1 - exp(-a*x) - a/(b - a)*(exp(-a*x) - exp(-b*x))
x: 0, 120
y: 0, 1
sliders: a=0.035:0.005:0.2:0.001; b=0.069:0.006:0.3:0.001
labels: \text{ER (A)}; \text{Golgi (B)}; \text{beyond (C)}
caption: The fraction of a pulse of labelled protein in each compartment of [[#prop-compartments]] against time in minutes. Sliders set the rate constants $k_1$ ($a$, ER exit) and $k_2$ ($b$, Golgi exit) in min⁻¹; the defaults are half-times of 20 and 10 min. Notice that a slow second step makes the Golgi curve tall and late, and a fast one makes it low and early: the shape of the intermediate curve reveals the rate of the step after it. (Avoid setting the two rates exactly equal, where the formula is replaced by its limit $k t e^{-kt}$.)
:::

### Vesicles: coats, Rabs and SNAREs

Each step of vesicular traffic involves budding, targeting and fusion.

**Budding** is driven by **coat proteins** that assemble on the cytosolic face of the donor membrane, bend it into a bud and select cargo. **COPII** coats form vesicles that carry cargo from the ER to the Golgi; **COPI** coats carry material back from the Golgi to the ER and between Golgi cisternae; **clathrin**, with adaptor proteins (AP1 at the trans-Golgi network, AP2 at the plasma membrane), forms the polyhedral baskets that carry cargo from the Golgi to endosomes and from the plasma membrane inward. Small GTPases — Sar1 for COPII, Arf1 for COPI and AP1 — switch coat assembly on in their GTP-bound form. Clathrin-coated buds are pinched off by **dynamin**, a GTPase that assembles as a collar around the bud neck.

ER residents that escape are returned: soluble lumenal proteins carrying the C-terminal **KDEL** sequence are bound by a KDEL receptor in the Golgi and carried back in COPI vesicles (Sean Munro and Hugh Pelham, 1987).

**Targeting** uses **Rab** GTPases — more than 60 in humans, each characteristic of a compartment — and the tethering proteins they recruit, which capture vesicles at the right destination.

**Fusion** is driven by **SNARE proteins**. A v-SNARE on the vesicle and t-SNAREs on the target membrane zipper together into a four-helix bundle that pulls the two bilayers together until they fuse. The ATPase NSF and its adaptor SNAP then pry the complex apart for reuse. The SNARE hypothesis came from James Rothman's biochemistry (Thomas Söllner and colleagues, 1993); Randy Schekman had earlier identified genes for the pathway by isolating temperature-sensitive *sec* (secretion-defective) mutants of the yeast *Saccharomyces cerevisiae* (Peter Novick, Charles Field and Schekman, 1980); and Thomas Südhof showed how the Ca²⁺ sensor synaptotagmin triggers rapid fusion of synaptic vesicles. The three shared the 2013 Nobel Prize in Physiology or Medicine.

::: intuition Two models of the Golgi
How does cargo move through the Golgi stack? In the **vesicular transport** model the cisternae are stable, each with its own enzymes, and cargo hops forwards in COPI vesicles. In the **cisternal maturation** model new cisternae form at the *cis* face and themselves move through the stack, changing their identity as COPI vesicles carry resident enzymes *backwards*. Large cargoes such as procollagen rods (300 nm long), which do not fit in 60–80 nm vesicles, are hard to explain by the first model; live imaging of yeast Golgi cisternae changing colour as they mature (Benjamin Glick's and Akihiko Nakano's laboratories, 2006) strongly supports the second for yeast. Both processes may operate in animal cells.
:::

### Sorting at the trans-Golgi network

At the end of the Golgi, proteins are sorted into three main streams: to the plasma membrane by **constitutive secretion**, which operates in all cells continuously; into **secretory granules** for **regulated secretion**, in which cargo is stored in concentrated form until a signal — usually a rise in cytosolic Ca²⁺ — triggers fusion (hormones, digestive enzymes, neurotransmitters); and to **endosomes and lysosomes**.

Lysosomal hydrolases are tagged in the *cis* Golgi by an enzyme that recognises a signal patch on their folded surface and adds GlcNAc-phosphate to mannose residues; a second enzyme removes the GlcNAc, exposing **mannose-6-phosphate** (M6P). In the trans-Golgi network M6P receptors bind them and carry them, in clathrin-coated vesicles, to endosomes, where the acid pH releases the enzymes and the receptors return to the Golgi. In polarised epithelial cells a further sorting step separates proteins for the apical and basolateral surfaces.

::: application When sorting fails: I-cell disease
In the inherited lysosomal storage disease mucolipidosis II, or **I-cell disease**, the GlcNAc phosphotransferase that makes the M6P tag is defective. Elizabeth Neufeld and colleagues found in the late 1960s and early 1970s that fibroblasts from affected individuals secrete their lysosomal hydrolases into the culture medium instead of keeping them, and that lysosomes in these cells fill with undigested material ("inclusion cells"). Healthy cells can take up the secreted enzymes from the medium through M6P receptors at the cell surface — a finding that later underpinned enzyme-replacement approaches for several lysosomal storage diseases. A single defective sorting enzyme thus mis-sends dozens of different hydrolases. The clinical aspects belong to [Medicine Atlas: genetics](/learn/medicine/course.php?c=genetics).
:::

## Endocytosis

Cells take material in by **endocytosis**: the plasma membrane invaginates and pinches off a vesicle containing extracellular fluid and molecules bound to the surface. Large particles — bacteria, dead cells — are engulfed by **phagocytosis**, driven by actin, mainly in specialised cells such as macrophages and neutrophils. Fluid is taken up by **pinocytosis**, both in large, irregular **macropinosomes** and in small vesicles. The best-understood route is **receptor-mediated endocytosis** through clathrin-coated pits.

Michael Brown and Joseph Goldstein discovered it in the 1970s while studying how human cells take up cholesterol carried in low-density lipoprotein (LDL). Cultured fibroblasts from people with the inherited disease familial hypercholesterolaemia could not bind LDL or could bind it but not internalise it; the second class had receptors that failed to gather in coated pits, because of a mutation in the receptor's cytosolic tail, which carries the internalisation signal NPxY recognised by adaptors. Brown and Goldstein shared the 1985 Nobel Prize in Physiology or Medicine. (Clinical aspects: [Medicine Atlas](/learn/medicine/course.php?c=cell-biochemistry).)

Once inside, endocytic vesicles fuse with **early endosomes**, mildly acidic (pH about 6.0–6.5) sorting stations. Many receptors release their ligands there and are returned to the surface through recycling endosomes; the LDL receptor makes a round trip every 10–20 minutes or so. Material that is not recycled stays as the endosome matures — acquiring different Rabs and phosphoinositides, becoming more acidic, and accumulating internal vesicles — into a **late endosome** that fuses with lysosomes. The transferrin receptor shows how acid can be put to work: transferrin carrying two Fe³⁺ ions binds the receptor at neutral pH; in the endosome the acid releases the iron, but the iron-free transferrin stays bound to its receptor and both return to the surface, where at neutral pH the apotransferrin is released.

The figure models a receptor's cycle as a Markov chain with time steps of one minute.

::: widget markov
matrix: 0.7,0.3,0,0; 0.05,0.25,0.7,0; 0.1,0,0.5,0.4; 0.15,0,0,0.85
states: Surface; Coated pit; Early endosome; Recycling endosome
start: 0
steps: 30
caption: An illustrative model of the transferrin-receptor cycle, with the probability per minute of each receptor moving between states (transition probabilities chosen for illustration, not measured). Start a receptor at the surface and step through the walk; then look at the stationary distribution, which gives the long-run fraction of receptors in each state — here only about 29 % at the surface, the rest inside. In real cells, too, a large share of recycling receptors is intracellular at any moment.
:::

::: example How much membrane does endocytosis move? {#ex-endocytosis}
Macrophages take up fluid equivalent to about 25 % of their volume each hour, which requires them to internalise about 3 % of their plasma membrane per minute (Alberts, 7th ed., citing measurements by Ralph Steinman and colleagues, 1976). For a cell with 1000 µm² of plasma membrane, how many vesicles of diameter 100 nm is that per second?
::: solution
Membrane internalised: $0.03\times1000 = 30\ \mathrm{\mu m^2\,min^{-1}}$. One spherical vesicle of diameter 0.1 µm has area $\pi d^2 = 4\pi(0.05)^2 = 0.0314\ \mathrm{\mu m^2}$. So

$$
\frac{30}{0.0314} \approx 950\ \text{vesicles per minute} \approx 16\ \text{per second}.
$$

The whole surface is internalised in about half an hour, yet the cell does not shrink: membrane returns to the surface by exocytosis at the same rate. Endocytosis and exocytosis are balanced cycles, not one-way traffic.
:::
:::

::: quiz
A lysosomal enzyme is fused, at its N terminus, to a mutant ER signal peptide that cannot be recognised by SRP. Where does the protein most probably end up?
- [ ] In lysosomes, because it still has its mannose-6-phosphate signal patch.
- [ ] Secreted, because it lacks the M6P tag.
- [x] In the cytosol, because it never enters the ER and so is never tagged or sorted.
- [ ] In the nucleus, because proteins without a signal go there by default.
::: solution
Sorting is hierarchical. The M6P tag is added in the Golgi, which the protein can reach only through the ER; without a functional ER signal it is made and stays in the cytosol, the default destination. The nucleus requires an NLS (small proteins can diffuse in, but are not accumulated there). This logic — each signal acts only if the earlier steps have happened — is how mutant phenotypes are used to order steps in a pathway.
:::
:::

::: history
Keith Porter, Albert Claude and Ernest Fullam saw the "endoplasmic reticulum" in 1945, and George Palade described ribosomes ("Palade granules") in 1955; Palade's pulse–chase work with James Jamieson was published in 1966–67. Günter Blobel and David Sabatini proposed the signal hypothesis in 1971, and Blobel and Bernhard Dobberstein tested it in 1975. The secretion-defective *sec* mutants of yeast were described by Peter Novick, Charles Field and Randy Schekman in 1980. Elizabeth Neufeld's discoveries with I-cell fibroblasts and Stuart Kornfeld's biochemistry led to the mannose-6-phosphate pathway (1970s–early 1980s). Brown and Goldstein's papers on the LDL receptor appeared from 1974, and the coated-pit pathway was imaged in their work with Richard Anderson in 1976–77. Kalderon, Smith and colleagues identified the SV40 NLS in 1984; James Rothman's cell-free assays for Golgi transport in the 1980s led to NSF and SNAP and, in 1993, to the SNARE hypothesis.
:::

::: summary
- Proteins carry sorting signals — signal sequences, signal patches or modifications — read by receptors that direct them to the nucleus, ER, mitochondria, chloroplasts, peroxisomes or the vesicular pathways; proteins without signals stay in the cytosol.
- Nuclear import and export pass folded proteins through pores using importins and exportins; the Ran-GTP gradient gives direction.
- Secretory and membrane proteins enter the ER co-translationally: SRP binds the signal peptide and the ribosome, delivers them to Sec61, and the signal is cleaved. Hydrophobic stop-transfer and signal-anchor sequences, read with the positive-inside rule, set membrane-protein topology.
- The ER folds proteins (BiP, PDI, N-glycosylation at Asn-X-Ser/Thr, calnexin cycle), destroys misfolded ones by ERAD and signals stress through the UPR.
- Mitochondria and chloroplasts import unfolded proteins after translation through TOM/TIM and TOC/TIC; peroxisomes import folded proteins with PTS1 (SKL).
- Vesicles bud with COPII, COPI or clathrin coats, are targeted by Rabs and tethers and fuse via SNAREs. Pulse–chase kinetics are described by first-order compartments in series.
- At the trans-Golgi network proteins are sorted for constitutive or regulated secretion, or (by mannose-6-phosphate) to lysosomes; endocytosis returns membrane and receptors through endosomes, recycling most of them.
:::

## Exercises

::: exercise Time to translate {level=1 check="50"}
At 6.0 amino acids per second, how many seconds does a ribosome take to make a 300-residue protein?
::: solution
$300/6.0 = 50\ \mathrm{s}$.
:::
:::

::: exercise Matching addresses {level=1}
To which compartment would you expect each protein to go? (a) A protein with an N-terminal stretch of 18 residues, including a core of 10 hydrophobic ones, and a C-terminal KDEL. (b) A protein with the internal sequence `PKKKRKV` and no other signal. (c) A protein with an N-terminal amphipathic helix rich in arginine. (d) A protein ending in `SKL`. (e) A protein with an N-terminal signal peptide and no other signals.
::: solution
(a) The ER lumen: the signal peptide brings it in, and KDEL retrieves it from the Golgi if it escapes. (b) The nucleus. (c) The mitochondrial matrix. (d) The peroxisomal matrix. (e) Secreted by the constitutive pathway: the default for a soluble protein in the secretory pathway with no retention or sorting signal is to leave the cell.
:::
:::

::: exercise ER exit {level=1 check="0.125"}
If a protein leaves the ER by a first-order process with a half-time of 20 min, what fraction of a pulse remains in the ER after 60 min?
::: solution
$A(60) = e^{-k_1\cdot60}$ with $k_1 = \ln2/20$, i.e. $(1/2)^{60/20} = 0.125$.
:::
:::

::: exercise When does the Golgi peak? {level=2 check="13.9"}
For the model of [[#prop-compartments]] with $k_1 = 0.05\ \mathrm{min^{-1}}$ and $k_2 = 0.10\ \mathrm{min^{-1}}$, at what time (in minutes, to three significant figures) does the amount of label in compartment B peak?
::: solution
$t^* = \ln(k_2/k_1)/(k_2 - k_1) = \ln 2/0.05 = 13.9\ \mathrm{min}$.
:::
:::

::: exercise Vesicle budding rate {level=2 check="22.1"}
A cell with 2000 µm² of plasma membrane internalises 3 % of it per minute in vesicles of diameter 120 nm. How many vesicles bud per second (to three significant figures)?
::: solution
Membrane per minute: $60\ \mathrm{\mu m^2}$. Vesicle area: $\pi(0.12)^2 = 0.04524\ \mathrm{\mu m^2}$. Vesicles per minute: $60/0.04524 = 1326$; per second $22.1$.
:::
:::

::: exercise Ordering the pathway with sec mutants {level=2}
Temperature-sensitive *sec* mutants of yeast secrete normally at 25 °C but at 37 °C stop secreting and accumulate membranes. Class A mutants (for example *sec12*) accumulate ER; class B mutants (for example *sec7*) accumulate Golgi cisternae; class C mutants (for example *sec1*) accumulate secretory vesicles. (a) What step does each class block? (b) A *sec12 sec7* double mutant at 37 °C accumulates ER, not Golgi. What does that tell you about the order of the steps? (c) Why were temperature-sensitive alleles necessary?
::: solution
(a) Class A blocks ER-to-Golgi transport (Sec12 activates Sar1 for COPII budding); class B blocks exit from the Golgi; class C blocks fusion of secretory vesicles with the plasma membrane (Sec1 belongs to the SM protein family that works with SNAREs).
(b) The double mutant shows the phenotype of the earlier block. If cargo cannot leave the ER, it never reaches the Golgi, so Golgi accumulation (which requires prior ER exit) cannot appear. This is **epistasis** analysis: the earlier step's phenotype masks the later one, and the order ER → Golgi → vesicles → plasma membrane follows. Novick, Field and Schekman used exactly this logic in 1980–81.
(c) Secretion is essential for growth (the cell must add membrane and wall), so null mutants would die and could not be studied. Temperature-sensitive alleles let cells grow at 25 °C and reveal the defect at 37 °C.
:::
:::

::: exercise Deducing a membrane protein's topology {level=3}
A newly discovered human protein of 420 residues has a cleaved N-terminal signal peptide (residues 1–22), N-glycosylation sequons at Asn85 and Asn390, and one hydrophobic segment of 21 residues (residues 300–320) followed by the sequence `RRKLK`. (a) Predict its topology: where are the N and C termini, and which sequon(s) can be glycosylated? (b) Design an experiment with microsomes and a protease to test your prediction. (c) If both sequons turned out to be glycosylated, what would you conclude?
::: solution
(a) The signal peptide sends the N terminus into the ER lumen; the hydrophobic segment acts as a stop-transfer anchor, and the positive cluster after it stays in the cytosol, so the C terminus is cytosolic. This is a type I protein with residues 23–299 in the lumen (and ultimately outside the cell) and 321–420 in the cytosol. Only Asn85 is lumenal and can be glycosylated; Asn390 is cytosolic, where the oligosaccharyltransferase does not act.
(b) Translate the protein in a cell-free system with microsomes, then add a protease (with and without detergent). If the prediction is right, the protease removes the cytosolic C-terminal 100 residues but the lumenal domain is protected unless detergent opens the vesicles; an antibody to the C terminus would lose its signal, one to the N-terminal domain would not. Glycosidase treatment would show one glycan.
(c) The C-terminal region must also be lumenal: perhaps the hydrophobic segment does not stop transfer (it might be too short or too polar to stay in the membrane), making the protein soluble in the lumen, or a second, unnoticed hydrophobic segment re-inserts the chain. The prediction methods would need revising.
:::
:::

::: exercise Interpreting a cross-correction experiment {level=3}
Fibroblasts from two people with different lysosomal storage disorders each accumulate undigested material. When the two cell lines are grown together in the same dish, both become normal. When the medium of normal cells is added to either line, it also corrects them — but not if the medium has been treated with an enzyme that removes phosphate from mannose-6-phosphate, or if free M6P is added at high concentration. (a) Explain the co-culture result. (b) What do the last two observations show about the corrective factors? (c) Fibroblasts from a patient with I-cell disease cannot be corrected by medium from a second patient with I-cell disease, but their medium contains abundant lysosomal enzymes. Explain.
::: solution
(a) Each line lacks a different lysosomal enzyme. Cells normally secrete a small fraction of their newly made lysosomal enzymes, and neighbouring cells take them up and deliver them to lysosomes. In co-culture each line supplies the enzyme the other lacks.
(b) Uptake depends on the M6P tag on the enzyme (removing the phosphate abolishes it) and on M6P receptors on the cell surface (free M6P competes for them). The corrective factors are M6P-tagged lysosomal enzymes.
(c) In I-cell disease the phosphotransferase that makes the tag is missing, so the cells secrete their hydrolases *untagged*. Those enzymes are active but cannot bind M6P receptors, so they cannot be taken up by another cell — including another I-cell fibroblast. Medium from normal cells, carrying tagged enzymes, would correct them. (This was the logic of Neufeld's experiments.)
:::
:::
