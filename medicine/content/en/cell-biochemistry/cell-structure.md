Every disease is a disorder of cells. When a person develops a fever, swells an ankle or loses power in a limb, the events that explain those signs are happening inside, or on the surface of, individual cells — and the abnormality is usually traceable to a particular compartment: a membrane that cannot hold its ions, a receptor that will not fold, a lysosome that cannot digest, a mitochondrion that cannot make ATP. Learning the structure of the cell is therefore not descriptive biology to be memorised and forgotten; it is the map on which later clinical reasoning is drawn.

A human body contains of the order of $4 \times 10^{13}$ cells, of some two hundred distinguishable types, all descended from one fertilised oocyte and all carrying the same genome. What distinguishes a hepatocyte from a neuron is which genes are being read and which organelles are abundant. This lesson walks through the compartments of a typical animal cell, the molecular machines that maintain them, and the diseases that appear when one of them fails.

## The cell as a set of compartments

Eukaryotic cells differ from bacteria in one structural respect above all others: they are divided into membrane-bounded compartments, each with its own chemistry. The mitochondrion keeps a proton gradient across its inner membrane; the lysosome keeps its hydrolases at pH 5; the nucleus keeps the genome apart from the mechanical and enzymatic traffic of the cytoplasm. Separation is what makes regulation possible.

::: definition Eukaryotic cell {#def-eukaryote}
A **eukaryotic cell** is a cell whose cytoplasm is partitioned by internal membranes into organelles, including a nucleus bounded by a double membrane and containing linear chromosomes. Animal, plant and fungal cells and the cells of protists are eukaryotic; bacteria and archaea are not.
:::

| Compartment | Principal jobs | Representative disease when it fails |
|---|---|---|
| Nucleus | Genome storage, transcription, ribosome subunit assembly | Hutchinson–Gilford progeria (lamins) |
| Rough endoplasmic reticulum | Secretory and membrane protein synthesis, folding, N-glycosylation | α₁-antitrypsin deficiency (misfolding and retention) |
| Golgi apparatus | Glycan trimming and sorting, mannose-6-phosphate tagging | I-cell disease (mislabeled lysosomal enzymes) |
| Mitochondrion | Oxidative phosphorylation, apoptosis signalling, haem synthesis | MELAS, Leigh syndrome |
| Lysosome | Degradation of endocytosed and autophagic material | Tay–Sachs, Gaucher and other storage diseases |
| Peroxisome | Very-long-chain fatty acid oxidation, detoxification of H₂O₂ | Zellweger spectrum |
| Proteasome | Ubiquitin-tagged protein degradation | Target of bortezomib in myeloma |
| Cytoskeleton | Shape, motility, division, intracellular transport | Primary ciliary dyskinesia, epidermolysis bullosa |
| Plasma membrane | Barrier, receptors, ion gradients | Long QT syndromes (ion channels) |

::: theorem The organelle principle {#thm-organelle}
A heritable defect in a single protein can produce a tissue-selective disease even when that protein is expressed in every cell, if the tissue depends most heavily on the function that is lost.
:::

::: proof
Consider a defective subunit of mitochondrial complex I. Every cell inherits the mutation, but cells that rely on continuous ATP supply — neurons, skeletal and cardiac muscle, cochlear hair cells — are the ones that fail, because their workload leaves them the smallest margin between ATP demand and the reduced output. Cells that can switch to glycolysis, or that divide slowly, tolerate the same defect. The same logic explains why a defect in fibrillin-1 (Marfan syndrome) shows mainly in the aorta, lens and skeleton: those tissues experience the highest mechanical load per unit of the protein. So the phenotype is a product of *where the function is most needed*, not of *where the gene is expressed*.
:::

## The nucleus

The nucleus holds 2 m of DNA in a sphere about 6 µm across, packaged as chromatin. It is bounded by two lipid bilayers, the **outer nuclear membrane** (studded with ribosomes and continuous with the endoplasmic reticulum) and the **inner nuclear membrane**, lined by a meshwork of intermediate filament proteins, the **lamins**. Between the two is the perinuclear space.

The envelope is perforated by **nuclear pores**, enormous protein complexes that allow free diffusion of small molecules but require signal-directed transport for anything larger than roughly 40–60 kDa. Proteins destined for the nucleus carry a **nuclear localisation sequence**, usually a short run of basic amino acids, which is read by importins; cargo moving out carries a nuclear export sequence and travels with exportins, the whole process driven by a Ran-GTP gradient.

Inside the nucleus, DNA is wrapped around histone octamers to form nucleosomes, folded into chromatin and, in dividing cells, into chromosomes. Transcriptionally active regions (euchromatin) are loosely packed and accessible; silent regions (heterochromatin) are condensed, and the extreme example, the transcriptionally silent second X chromosome, is visible as a **Barr body** in female interphase cells. The **nucleolus** is not membrane-bound at all: it is the site of ribosomal RNA transcription and ribosome subunit assembly, and it is prominent in cells that make lots of protein.

::: warning A Barr body is not the same as "having one X"
A normal male cell has no Barr body; a normal female cell has one; a person with Klinefelter syndrome (47,XXY) has one and a person with Turner syndrome (45,X) has none. The number of Barr bodies is the number of X chromosomes *minus the one that stays active* — so counting Barr bodies can never distinguish 46,XX from 45,X/46,XX mosaicism without further testing.
:::

::: example Lamins and premature ageing {#ex-lamin}
A four-year-old child presents with failure to thrive, alopecia, loss of subcutaneous fat, prominent eyes and stiffness of the joints; imaging shows widespread atherosclerosis. A point mutation in *LMNA* creates a cryptic splice site and a shortened, permanently farnesylated lamin A ("progerin") that stays anchored in the nuclear envelope. Explain the dominant mechanism and why a structurally abnormal nuclear envelope damages the whole cell.
::: solution
Progerin is not merely inactive — it poisons the envelope, because the mutant protein still binds wild-type lamin A and the remaining farnesyl group keeps it stuck at the inner membrane. The nuclear lamina loses resilience, the genome becomes mechanically unstable, DNA repair and the normal pattern of gene silencing at the nuclear periphery both deteriorate, and stem cell pools exhaust. Cells from every tissue are affected, which is why the disease is systemic: hardening of arteries, loss of fat and bone, and death from cardiovascular disease in the teens. The example shows the value of knowing structure — the protein's job (a scaffold) predicts the tissues that fail when the scaffold is stiff and sticky.
:::
:::

## The endoplasmic reticulum and Golgi: making and shipping protein

Rough endoplasmic reticulum gets its name from the ribosomes attached to its cytoplasmic face. Those ribosomes are making one class of protein only: proteins destined for secretion, for the plasma membrane, or for another compartment of the endocytic or secretory pathway. The information is carried in the protein itself, an N-terminal **signal sequence** of hydrophobic amino acids. As the sequence emerges from the ribosome it is seized by a signal recognition particle (SRP), translation pauses, and the whole complex docks at an SRP receptor on the endoplasmic reticulum; the ribosome is transferred to a translocon and translation resumes, the growing chain being threaded across the membrane as it is made. This is **co-translational translocation**, and it is why rough endoplasmic reticulum is rough.

Inside the endoplasmic reticulum lumen the new chain is folded, assisted by chaperones including BiP and calnexin, joined by disulfide bonds (an oxidising environment, unlike the cytosol), glycosylated on asparagine residues, and — for many proteins — assembled into subunits. Misfolded chains are retained; a sufficient load of them triggers the **unfolded protein response**, which widens the capacity of the endoplasmic reticulum, slows new translation and, if the stress is not resolved, initiates apoptosis. Chronic endoplasmic reticulum stress is implicated in β-cell failure in type 2 diabetes and in several neurodegenerative diseases.

Proteins that pass quality control leave in transport vesicles and enter the **Golgi apparatus**, a stack of flattened cisternae with a distinct *cis* (entry) and *trans* (exit) face. Traversing the stack, a protein passes through enzyme compartments in a fixed order, so its carbohydrate chains are trimmed and rebuilt stepwise — an arrival-time record written in sugar. At the *trans* face proteins are sorted: lysosomal hydrolases are marked with **mannose-6-phosphate**, and the rest are sent to the plasma membrane, either continuously or in regulated secretory granules, as in insulin and neurotransmitter release.

::: example A marker that reaches the wrong room {#ex-icell}
An infant has developmental delay, coarse facial features, a protruding abdomen with hepatosplenomegaly, clouded corneas and skeletal abnormalities. Fibroblasts in culture make normal amounts of lysosomal enzymes but secrete almost all of them into the medium, and the lysosomes contain undigested inclusion bodies. Which step has failed?
::: solution
The enzymes themselves are normal, and so is their transport to the Golgi. What is missing is the address label: the first enzyme of the mannose-6-phosphate tag, N-acetylglucosamine-1-phosphotransferase, is deficient, so hydrolases are not recognised at the *trans* Golgi and default to the secretory pathway. Every cell starves slowly on its own undigested substrate, and the freed enzymes raise lysosomal enzyme activity in plasma — a diagnostic clue. The disorder is I-cell disease (inclusion-cell mucolipidosis II), and it is the classical demonstration that sorting signals, not enzyme activity, deliver proteins to lysosomes.
:::
:::

## Mitochondria

Mitochondria are the cell's power converters and, in a real sense, its ancestors: they descend from an α-proteobacterium engulfed by an ancestral cell some two billion years ago, and they still keep their own circular DNA, their own (bacterium-like) ribosomes and a double membrane, with the folded **inner membrane** — the cristae — holding the respiratory chain. The endosymbiotic origin has direct pharmacological consequences: mitochondrial ribosomes resemble bacterial ones, which is why linezolid and chloramphenicol can suppress mitochondrial protein synthesis and cause lactic acidosis or neuropathy on prolonged courses.

The inner membrane is impermeable to most ions, and it is here that the chemistry of life is paid for. Oxidation of NADH and FADH₂ drives protons out of the matrix through complexes I–IV; the resulting **proton motive force** is used by complex V (ATP synthase) to make ATP, which enters the cytosol through the adenine nucleotide translocase in exchange for phosphate. Details and the numbers are in [[cell-biochemistry/energy-metabolism]]. Two structural points matter here. First, the matrix contains its own genome of 37 genes, all of them components of the respiratory chain or of the mitochondrial translation machinery; the other 1,300-odd mitochondrial proteins are encoded in the nucleus, imported from the cytosol, and therefore behave as ordinary Mendelian traits. Second, mitochondria are the point of no return in **intrinsic apoptosis**: growth factor withdrawal, DNA damage or severe stress causes Bcl-2 family proteins to permeabilise the outer membrane, cytochrome c leaks into the cytosol, and the resulting apoptosome activates caspase 9.

Because mitochondria are transmitted almost exclusively in the oocyte, mitochondrial DNA variants show **maternal inheritance**: an affected mother can transmit the variant to all her children, but affected fathers transmit it to none. A second peculiar feature is **heteroplasmy** — a cell contains hundreds of mitochondria and thousands of mtDNA copies, so the proportion of mutant genomes varies between cells, and a tissue fails only when that proportion passes a threshold. This is why mitochondrial disease is so variable in expression, and why unaffected mothers of affected children can carry a low level of mutant mtDNA.

::: example A syndrome that skips the father {#ex-melas}
A nine-year-old of normal early development has a stroke-like episode with hemianopia and seizures, raised blood lactate, short stature and sensorineural hearing loss; his mother has diabetes and deafness, his maternal aunt died young "with a muscle disease", and his father is entirely well with a healthy family history. What inheritance is expected in the children of the affected boy's sister?
::: solution
The picture is mitochondrial: multi-system disease affecting high-energy tissues, a raised lactate, stroke-like episodes before stroke age, and transmission through the maternal line only. The commonest cause is the m.3243A>G variant in *MT-TL1*. The sister's children — and her son's children, but not her brother's — are at risk, because mitochondrial DNA comes from the oocyte. The severity in any one child depends on heteroplasmy, which shifts during oocyte development, so risk cannot be predicted from the mother's own mild symptoms. Genetic testing of blood may be misleading, since mutant mtDNA is lost from dividing leucocytes with age; urine sediment or muscle gives a better estimate.
:::
:::

## Lysosomes, proteasomes and autophagy: disposal

Roughly a quarter of a cell's protein is replaced within an hour, and the machinery of disposal is as important as the machinery of synthesis. There are two routes, and they handle different cargoes.

The **ubiquitin–proteasome pathway** handles short-lived, misfolded or regulated cytosolic and nuclear proteins. A target protein is tagged with a chain of ubiquitin molecules by an E1–E2–E3 enzyme cascade, the E3 ligase providing the specificity; the proteasome, a barrel-shaped ATP-dependent complex, threads the tagged chain through its core and cuts it into peptides. Because this route controls cyclins, tumour suppressors and IκB, proteasome inhibitors are active in proliferating cells — bortezomib is used in myeloma for exactly this reason.

**Lysosomes** handle material that arrives from outside by endocytosis, and internal organelles delivered by autophagy. They are acidic (pH ~5, maintained by a vacuolar H⁺-ATPase), contain some fifty acid hydrolases, and are sealed; if the membrane is damaged the enzymes are not fully active at neutral cytosolic pH, a partial safety margin. Lysosomal function fails in three ways: an enzyme is missing (over fifty **lysosomal storage diseases**, most of them autosomal recessive), the tagging or transport of the enzymes is wrong (I-cell disease, [[#ex-icell]]), or the substrate cannot be reached or is produced faster than it can be degraded. Accumulation of undigested material distends the cell and disturbs its normal functions; the brain, which cannot shed its stored lipid, is commonly affected.

**Autophagy** is the lysosomal digestion of the cell's own components. A double-membrane isolation membrane engulfs cytoplasm — often specifically a mitochondrion marked by PINK1 and parkin — forming an autophagosome that fuses with a lysosome. Autophagy is up-regulated by starvation and by AMPK and down-regulated by mTOR, which is why it is a target of study in ageing, infection, cancer and neurodegeneration, where aggregates of misfolded protein are cleared (or fail to be cleared) by the same route.

::: example Enzyme replacement, and why it works {#ex-gaucher}
A six-year-old with anaemia, thrombocytopenia, massive splenomegaly and raised chitotriosidase has leukocyte glucocerebrosidase activity of 8% of normal. Infusion of a phosphorylated, mannose-6-phosphate-bearing recombinant enzyme reduces liver and spleen size markedly over a year. Why does injected enzyme reach macrophage lysosomes and yet the brain is unaffected?
::: solution
The recombinant enzyme is deliberately glycosylated so that its mannose-6-phosphate (or, in newer preparations, mannose) residues are recognised by receptors on macrophages, which internalise it by receptor-mediated endocytosis and deliver it to lysosomes — the correct address is written on the molecule. Substrate accumulated in reticuloendothelial cells is then hydrolysed, and the cytopenias and organomegaly improve. The central nervous system is not helped, because the injected protein does not cross the blood–brain barrier: this explains why the neuronopathic forms of the disease respond poorly, and it is the reason that substrate reduction therapy and gene therapy are being explored for those forms.
:::
:::

::: quiz
A pathologist stains a tumour for intermediate filament proteins to establish its origin. Which pairing is correct?
- [ ] Cytokeratin — sarcoma
- [ ] Vimentin — carcinoma
- [x] GFAP — astrocytic tumour
- [ ] Desmin — melanoma
::: solution
Intermediate filaments are tissue-specific, and their pattern survives malignant transformation. Carcinomas express cytokeratins; sarcomas express vimentin; muscle tumours express desmin; glial tumours express GFAP; melanomas express vimentin and S100, and are stained with melanocytic markers such as SOX10, Melan-A or HMB-45. The panels used in practice combine several markers, because single markers are imperfect.
:::
:::

## The cytoskeleton and cell surface

Three families of filaments give the cell shape and move things inside it.

- **Microfilaments (actin)**, ~7 nm, polar, dynamic; with myosin motors they drive muscle contraction, cytokinesis, cell migration and the terminal web of epithelia. Drugs that act on them are research tools more than medicines (phalloidin binds F-actin; cytochalasins and latruncules disrupt it).
- **Intermediate filaments**, ~10 nm, tough and non-polar, named for the gap between the other two: actin and microtubules; different types in different tissues, which is the basis of the immunohistochemistry in the quiz above. Desmosomes and hemidesmosomes anchor them to the cell surface and to basement membrane; autoantibodies against desmosomal cadherins cause the blistering disease pemphigus, against hemidesmosomal collagen VII cause epidermolysis bullosa acquisita.
- **Microtubules**, ~25 nm, hollow tubes of α/β-tubulin growing from the centrosome, extremely dynamic, and used as tracks by the ATP-driven motors **kinesins** (usually towards the plus end, i.e. outward) and **cytoplasmic dynein** (inward, towards the centre). Microtubules form the mitotic spindle, and their dynamic instability is exploited by vinca alkaloids and taxanes in cancer treatment, and their assembly is inhibited by colchicine in gout.

**Cilia** deserve special mention. Motile cilia, built on the classic 9+2 arrangement of microtubule doublets with inner and outer dynein arms, beat in coordinated waves: they move mucus up the respiratory tree, sweep ova along the fallopian tube, and propel sperm. Nearly every other cell carries a single non-motile **primary cilium**, an antenna for hedgehog, WNT and PDGFR signalling and for osmosensation in the kidney tubule. Defects in ciliary structure or function produce the **ciliopathies**: primary ciliary dyskinesia (chronic wet cough, neonatal respiratory distress, laterality defects such as situs inversus in about half of cases — Kartagener syndrome — and subfertility), polycystic kidney disease, retinal dystrophy, Bardet–Biedl and Joubert syndromes.

Cell–cell and cell–matrix junctions convert a population of cells into a tissue. **Tight junctions** seal the paracellular route and hold apical from basolateral membrane proteins, so that an epithelium can be polarised; **adherens junctions** and **desmosomes** provide mechanical continuity (the former actin-linked and cadherin-based, the latter intermediate-filament-linked and the target in pemphigus); **gap junctions** are connexin channels that pass ions and small metabolites between neighbours, allowing the cardiac and smooth muscle syncytia to contract as one unit. Mutations in connexins cause some hereditary deafness and certain peripheral neuropathies.

## Why cells are small: surfaces, volumes and diffusion

Membranes are barriers, and that fact constrains cell design. A cell's demand for nutrients and its production of waste scale with volume, whereas supply and disposal scale with surface area. As a cell grows, volume rises as the cube of radius but surface area only as the square; the ratio therefore falls as $3/r$. Large cells have evolved workarounds: microvilli multiply the apical surface (the brush border of a single enterocyte exposes some 15 m² in the whole small intestine), folds invaginate the membrane (cristae, the sarcoplasmic reticulum), and in skeletal muscle a single fibre is a syncytium of hundreds of nuclei with a dense transverse tubule system.

::: definition Surface-to-volume ratio {#def-sv}
For a spherical cell of radius $r$ the ratio of surface area to volume is
$$
\frac{A}{V} = \frac{4\pi r^{2}}{\tfrac{4}{3}\pi r^{3}} = \frac{3}{r}
$$ {#eq-sv}
:::

Distance also limits what diffusion can achieve inside a cell. The mean time for a molecule to diffuse a distance $x$ is of the order of

$$
t \approx \frac{x^{2}}{2D},
$$

where $D$ is the diffusion coefficient, about $10\ \mu\text{m}^{2}\,\text{s}^{-1}$ for a small metabolite in cytoplasm and less than $1\ \mu\text{m}^{2}\,\text{s}^{-1}$ for a large protein. Diffusion is therefore superb over a micrometre and hopeless over a centimetre — which is why tissues thicker than a few hundred micrometres need a circulation, and why engineered scaffolds and avascular tumour cores fail in the middle.

::: example How far can a cell depend on diffusion? {#ex-diffusion}
Estimate the time for ATP to diffuse 5 µm (a typical cell radius) and 5 mm (a thin tissue slice) in cytoplasm, taking $D \approx 10\ \mu\text{m}^{2}\,\text{s}^{-1}$.
::: solution
With $t = x^{2}/2D$: for $x = 5\ \mu\text{m}$,
$$
t = \frac{(5)^{2}}{2 \times 10} = \frac{25}{20} \approx 1.3\ \text{s}.
$$
For $x = 5\ \text{mm} = 5000\ \mu\text{m}$,
$$
t = \frac{(5000)^{2}}{20} = 1.25 \times 10^{6}\ \text{s} \approx 14\ \text{days}.
$$
Twenty thousand times more distance costs a million times more time, because time scales with the *square* of distance. Cells are limited to micrometres by the same arithmetic that makes a capillary bed necessary — and it also explains why a patient's muscle cells contain mitochondria crowded next to the myofibrils that consume their ATP.
:::
:::

::: widget plot
f: x^2/(2*D)
x: 0.5, 100
y: 0, 600
sliders: D=10:0.5:50
labels: t(x)
caption: Mean diffusion time $t = x^2/(2D)$ across cytoplasm, in seconds, against the distance $x$ in micrometres. Drag the slider to the diffusion coefficient of a large protein ($D < 1\ \mu\text{m}^2\,\text{s}^{-1}$) and watch how unusable diffusion becomes beyond a few micrometres; at 5 mm the same formula gives about two weeks.
:::

::: warning "Energy" is not what mitochondria mainly supply to a resting cell
Mitochondria do make about 90% of the body's ATP, but they are equally important as signalling organelles: they generate heat in brown fat via uncoupling protein 1, supply carbon skeletons for haem and steroid synthesis, buffer cytosolic calcium, produce reactive oxygen species that act as signals, and release cytochrome c to trigger apoptosis. A "mitochondrial disease" may therefore present with stroke-like episodes, seizures, cardiac failure, lactic acidosis or diabetes rather than with simple fatigue — and a normal lactate at rest does not exclude one.
:::

## Cell injury reverses, then does not

Because compartments fail in a predictable order, the sequence of cell injury is also predictable — and it is the theme of [[pathology/cell-injury]]. A cell that is briefly short of oxygen stops making ATP, switches to anaerobic glycolysis, accumulates lactate, and its sodium pumps slow: sodium and water enter, the cell swells, and the endoplasmic reticulum dilates. This is **reversible** injury (hydropic change). If the insult persists, membrane damage and calcium influx activate enzymes, the mitochondria lose their membrane potential permanently, and the cell passes a point from which it cannot return; necrosis follows, with the release of contents and inflammation. Loss of membrane integrity, not ATP depletion, is the moment of no return.

Cells also have a programmed route to death. In **apoptosis** the cell shrinks, its membrane blebs but stays intact, its DNA is cut into fragments, and phosphatidylserine flips to the outer leaflet of the plasma membrane — an "eat me" signal recognised by macrophages, which remove the corpse without inflammation. This is why apoptosis does not raise C-reactive protein whereas necrosis does, and why the two look entirely different down a microscope.

::: history
Robert Hooke saw boxes in cork in 1665 and called them cells; Antonie van Leeuwenhoek saw living ones a decade later. In 1838–39 Schleiden and Schwann proposed that all plants and animals are made of cells, and in 1855 Rudolf Virchow summarised the consequence — *omnis cellula e cellula*, every cell from a cell. The chemistry followed the morphology slowly: enzymes were purified in the early twentieth century, the centrifuge made organelles a biochemical reality (Christian de Duve isolated lysosomes in 1955), and the electron microscope revealed membranes, ribosomes and the cilium. Lynn Margulis argued in the 1960s, against substantial ridicule, that mitochondria and chloroplasts are domesticated bacteria; the sequence of their DNA eventually settled the argument. The molecular era, in which a disease can be traced to a single mis-sorted protein, began with the signal hypothesis of Günter Blobel and David Dobberstein in 1975.
:::

## Where this leads

Membranes and the ion gradients across them are treated in [[cell-biochemistry/membranes-transport]]; protein folding, enzyme kinetics and inhibition in [[cell-biochemistry/proteins-enzymes]]; ATP production in [[cell-biochemistry/energy-metabolism]]. The machinery that decides which genes a cell reads is in [[cell-biochemistry/gene-expression]], and the machinery that decides whether it divides is in [[cell-biochemistry/signalling-cell-cycle]]. When disposal and volume control go wrong at the level of a whole organ, you will find it in [[pathology/cell-injury]].

::: summary
- Eukaryotic cells are defined by membrane-bounded compartments; each maintains its own pH, ion or redox environment, and this separation is what allows precise control.
- A protein's destination is encoded in itself: signal sequences, nuclear localisation sequences and mannose-6-phosphate are addresses read by machines, and diseases follow when an address or a reader is wrong.
- The endoplasmic reticulum folds and glycosylates; chronic misfolding causes endoplasmic reticulum stress and the unfolded protein response, which can be protective or lethal.
- Mitochondria convert energy, control apoptosis, have their own genome and are maternally inherited; heteroplasmy and threshold explain the variability of mitochondrial disease.
- Two disposal systems: ubiquitin–proteasome for tagged short-lived proteins, lysosomes (with autophagy) for bulk and extracellular material; their failure gives storage diseases.
- The cytoskeleton has three families; intermediate filaments identify tumour origin, microtubules drive division and transport, actin drives shape and movement, and cilia are signalling antennae whose defects give the ciliopathies.
- Surface area limits volume: $A/V = 3/r$, and diffusion time rises with the square of distance, so cells are small and thick tissues need capillaries.
:::

## Exercises

::: exercise Matching compartments {level=1}
For each process, name the compartment in which it takes place: (a) oxidative phosphorylation; (b) addition of the mannose-6-phosphate lysosomal tag; (c) ubiquitin-dependent degradation; (d) synthesis of ribosomal subunits; (e) β-oxidation of very-long-chain fatty acids.
::: solution
(a) Inner mitochondrial membrane (matrix for the dehydrogenases). (b) *Trans* Golgi network. (c) Proteasome, cytosolic and nuclear. (d) Nucleolus. (e) Peroxisome — note that β-oxidation of *most* fatty acids is mitochondrial, but very-long-chain and branched-chain fatty acids must be handled by peroxisomes, which is why peroxisomal disease gives accumulation of these lipids.
:::
:::

::: exercise Which pathway? {level=1}
State whether each protein is degraded mainly by the proteasome or by the lysosome: (a) cyclin at the end of mitosis; (b) an extracellular lipoprotein after uptake; (c) a misfolded cystic fibrosis transmembrane conductance regulator retained in the endoplasmic reticulum; (d) a whole mitochondrion after damage.
::: solution
(a) Proteasome — ubiquitination by the anaphase-promoting complex is the trigger. (b) Lysosome, after receptor-mediated endocytosis. (c) After retrotranslocation to the cytosol, the proteasome (endoplasmic-reticulum-associated degradation). (d) Lysosome, by selective autophagy (mitophagy). Note that (c) uses both compartments, and the crossing between them is what makes it inducible.
:::
:::

::: exercise Surface and supply {level=1 check="0.2"}
A spherical cell has radius $15\ \mu\text{m}$. Compute its surface-to-volume ratio in $\mu\text{m}^{-1}$ using [[#eq-sv]].
::: solution
$A/V = 3/r = 3/15 = 0.2\ \mu\text{m}^{-1}$. Doubling the radius to $30\ \mu\text{m}$ would halve it to $0.1\ \mu\text{m}^{-1}$, i.e. each unit volume would have half the membrane through which to feed itself.
:::
:::

::: exercise Importins {level=2}
Microinject into a cell a chemically pure protein of 10 kDa and, separately, a fused protein of 120 kDa containing a nuclear localisation sequence. Predict the distribution of each and explain the result.
::: solution
The 10 kDa protein equilibrates freely between cytosol and nucleoplasm by diffusion through the nuclear pore, and will be found in both. The 120 kDa fusion cannot diffuse efficiently, but its nuclear localisation sequence is bound by importin, and the complex is translocated actively using the Ran-GTP gradient; it accumulates in the nucleus above the cytoplasmic concentration. The experiment shows both that the pore is a size-selective diffusion barrier and that the barrier is bypassed by signal-directed active transport — the two are separable.
:::
:::

::: exercise Signal sequence logic {level=2}
Deletion of the N-terminal 20 hydrophobic residues of a secreted hydrolase leaves an otherwise normal protein. Predict where the truncated protein ends up in a hepatocyte, and compare the result with a deletion of the signal peptide of a cytosolic enzyme such as hexokinase.
::: solution
The hydrolase loses its entry ticket to the endoplasmic reticulum: its ribosome is never targeted to the translocon, so it is completed on free ribosomes and stays in the cytosol, where it is not glycosylated, not secreted and probably degraded. The control matters: hexokinase has no signal peptide and none is needed, because it functions in the cytosol. The comparison proves that the signal peptide is information about *destination*, not about catalytic activity — which is the core of the signal hypothesis.
:::
:::

::: exercise Heteroplasmy {level=2}
A woman is heteroplasmic for an mtDNA variant, with 30% mutant load in blood. Two of her four children have 5% and 78% respectively. Explain the spread, and say why blood may be the wrong tissue to test in an adult.
::: solution
Oocytes receive a sample of mitochondria during a stage in which mitochondrial number is reduced and then re-amplified, so the mutant fraction drifts substantially from cell to cell (a bottleneck effect); each child therefore draws an essentially independent sample, and the range of loads — and of disease — is wide. Blood is unreliable for many mtDNA variants because leukocytes that carry a high mutant load are selected against during growth, so the blood load falls with age while post-mitotic tissues (muscle, brain) retain it. Where disease is suspected, urine sediment or muscle is preferred, and a negative blood test does not exclude the variant.
:::
:::

::: exercise A ciliary syndrome {level=3}
A 14-year-old with bronchiectasis, chronic otitis media since infancy and situs inversus has normal nasal nitric oxide measured in clinic. His sister has retinal dystrophy and renal cysts but no chest disease. Give a unifying interpretation, and name the appropriate next investigation for him.
::: solution
The boy's triad — neonatal-onset wet cough with bronchiectasis, chronic ear disease and laterality defect — is nearly diagnostic of primary ciliary dyskinesia, and low nasal nitric oxide is a good screening test; a normal result does not exclude it, since some genotypes preserve nitric oxide and technique matters. His sister's combination (retinal dystrophy plus renal cystic disease) instead points to a *primary* cilium signalling defect, a ciliopathy of the Bardet–Biedl or nephronophthisis type, so the two are not the same disease and are not automatically the same gene. For the boy: high-speed video microscopy of ciliary beat pattern and, since up to a third of genetic defects show normal beat frequency, transmission electron microscopy or genetic panel testing of dynein arm genes; nasal brushing for electron microscopy or biopsy for histology is the practical route.
:::
:::

::: exercise Storage disease reasoning {level=3}
A child has progressive neurodegeneration, optic atrophy and a cherry-red spot on fundoscopy; biopsy shows neurons distended with membrane-bound material that stains with periodic acid–Schiff. Enzyme assay of the purified lysosomal fraction shows normal total protein but absent activity against one synthetic substrate. Explain why the fraction had normal protein yet absent activity, and predict whether an inhibitor of glucosylceramide synthase could help.
::: solution
The lysosomes are present in normal amount and are being delivered to their destination — the fault is in one enzyme's catalytic activity, not in targeting. Substrate that cannot be hydrolysed accumulates, water follows, and the neuron is progressively engorged, which is the mechanism of the storage diseases (the description fits a gangliosidosis such as Tay–Sachs). Because the block is at degradation, reducing *synthesis* of the substrate can rebalance the two rates: substrate reduction therapy with a glucosylceramide synthase inhibitor is an established approach in some sphingolidoses and is precisely the strategy implied by this reasoning. It cannot reverse established neuronal loss, which is why treatment is early and, for the neurodegenerative forms, largely supportive.
:::
:::

::: exercise A quantitative organelle question {level=3 check="84"}
Hepatocytes are rich in mitochondria. Assume a mitochondrion is a cylinder 1 µm in diameter and 3 µm long, and that cristae increase the inner membrane area eight-fold over the surface area of the cylinder. Estimate the inner membrane area of one mitochondrion in µm², taking $\pi = 3$.
::: solution
Cylindrical surface area (side plus two ends) is $2\pi r h + 2\pi r^{2} = 2(3)(0.5)(3) + 2(3)(0.5)^{2} = 9 + 1.5 = 10.5\ \mu\text{m}^{2}$. Eight-fold amplification by cristae gives $84\ \mu\text{m}^{2}$ of inner membrane — enough to hold the tens of thousands of respiratory complexes needed for oxidative phosphorylation in one organelle. The folding of membranes is how cells buy surface area without buying volume; the same trick appears in microvilli, alveoli and renal tubules.
:::
:::
