If you could weigh the dry matter of a growing bacterium, more than half of it would be protein. Proteins are the catalysts of metabolism, the pumps and channels of membranes, the fibres of the cytoskeleton and of tendon, hair and silk, the motors of muscle, the receptors and switches of signalling, the antibodies of immunity and the regulators that turn genes on and off. All of them are built in the same way: as unbranched chains of amino acids, joined end to end by peptide bonds, which fold — usually by themselves — into a precise three-dimensional shape that does the job.

This chapter treats proteins as a biologist meets them: as products of genes with an evolutionary history, made, folded, helped, damaged and destroyed inside crowded cells, and studied by a battery of methods from gels to mass spectrometers and structure prediction. The chemistry of the amino acids — their acid–base behaviour, the isoelectric point, the geometry of the peptide bond and the thermodynamics of folding — is developed in [Chemistry Atlas: amino acids and protein structure](/learn/chemistry/lesson.php?c=biochemistry&l=amino-acids-proteins), and we link to it rather than repeat it.

## Proteins in numbers

Before the details, some sizes, from the compilations of R. Milo and R. Phillips (*Cell Biology by the Numbers*, 2016) and the sources they cite.

- An *Escherichia coli* cell has a dry mass of about 0.3 pg, about 55 % of it protein, and some 4,300 protein-coding genes.
- The protein concentration in cytoplasm is about 2–4 million molecules per cubic micrometre, and the total concentration of macromolecules (protein, RNA, DNA) is 300–400 g L⁻¹ (S. B. Zimmerman and S. O. Trach, 1991): the inside of a cell is closer to a gel than to a dilute solution.
- A typical protein has 300–400 amino-acid residues; the shortest functional proteins have a few dozen, and the giant muscle protein titin has more than 34,000.
- Abundances span a huge range: in a single cell, the most abundant proteins (ribosomal proteins, glycolytic enzymes, the elongation factor EF-Tu) are present in tens of thousands to hundreds of thousands of copies, many regulators in only tens.

::: example How many protein molecules in a bacterium? {#ex-count}
Using a dry mass of 0.30 pg, a protein fraction of 55 %, an average length of 300 residues and an average residue mass of 110 Da (g mol⁻¹), estimate the number of protein molecules in an *E. coli* cell.
::: solution
The protein mass is $0.55\times0.30\times10^{-12}\ \mathrm{g} = 1.65\times10^{-13}\ \mathrm{g}$. One average protein has a molar mass of $300\times110 = 33\,000\ \mathrm{g\,mol^{-1}}$, i.e. a mass of $33\,000/6.022\times10^{23} = 5.48\times10^{-20}\ \mathrm{g}$. The number is $1.65\times10^{-13}/5.48\times10^{-20} = 3.0\times10^6$ — about three million proteins, the figure usually quoted. If the cell's volume is about 1 µm³, that is 3 million per µm³, at the middle of the range above.
:::
:::

## The twenty amino acids

::: definition α-Amino acid and residue {#def-amino-acid}
An **α-amino acid** has an amino group, a carboxyl group, a hydrogen atom and a variable **side chain** (R group) attached to one carbon, the α-carbon. In all amino acids except glycine (R = H) the α-carbon is a stereocentre, and the amino acids of proteins are all of the **L** configuration. When amino acids are joined into a chain, each loses the elements of water, and the unit that remains is called a **residue**.
:::

At physiological pH the free amino acid is a zwitterion, with $\mathrm{NH_3^+}$ and $\mathrm{COO^-}$; in a protein only the two ends of the chain carry these groups, and the charge comes mostly from side chains. The side chains are what the genetic code chooses between, and it is useful to know them in families. We use the three- and one-letter codes throughout (Leu, L).

| family | amino acids | biological role of the side chains |
|---|---|---|
| non-polar, aliphatic | Gly G, Ala A, Val V, Leu L, Ile I, Met M, Pro P | protein cores, membrane-spanning segments; Gly flexible, Pro rigid (helix breaker) |
| aromatic | Phe F, Tyr Y, Trp W | cores and binding sites; Tyr and Trp absorb at 280 nm, used to measure protein concentration |
| polar, uncharged | Ser S, Thr T, Cys C, Asn N, Gln Q | hydrogen bonding; Ser, Thr and Tyr are phosphorylated in signalling; Cys forms disulfide bonds |
| acidic | Asp D, Glu E | negative charge; metal binding; catalysis |
| basic | Lys K, Arg R, His H | positive charge; binding DNA and phosphates; His ($\mathrm{p}K_\mathrm{a}$ near 6–7) as a proton shuttle |

(Some books put Tyr, Trp or Cys in other families; the boundaries are not sharp.) The approximate $\mathrm{p}K_\mathrm{a}$ values of the ionisable side chains — Asp and Glu about 4, His about 6, Cys about 8, Tyr about 10, Lys about 10.5, Arg about 12.5 — together with [[biochemistry/water-and-bonds#eq-hh]] tell us their charge in any compartment. Inside a folded protein these values can shift by several units, and many enzymes depend on such shifted groups.

The amino acids are not used equally. In the UniProtKB/Swiss-Prot database leucine makes up about 10 % of all residues and tryptophan and cysteine only about 1 %, reflecting both the number of codons for each in the genetic code and the cost of making them.

### Essential amino acids and the evolution of biosynthesis

Plants and most bacteria and fungi make all twenty amino acids from sugars and inorganic nitrogen. Animals have lost many of the pathways, and must obtain the corresponding amino acids from food. In humans the nine **essential** (indispensable) amino acids are His, Ile, Leu, Lys, Met, Phe, Thr, Trp and Val; others are "conditionally essential" when demand outstrips synthesis. The list differs between animals: domestic cats, obligate carnivores, also cannot make enough arginine, and a single arginine-free meal can raise their blood ammonia because the urea cycle stalls (J. G. Morris and Q. R. Rogers, 1978; see [[biochemistry/metabolic-integration]]). The essential amino acids are, broadly, those whose pathways are long and energetically expensive — the branched-chain and aromatic amino acids — and losing them saves an animal the genes and enzymes when its diet supplies them reliably. The same logic explains why many insects that feed on nutrient-poor plant sap, such as aphids, depend on symbiotic bacteria (*Buchnera aphidicola*) that make essential amino acids for them.

The genetic code also has two additions. **Selenocysteine** (Sec, U), with selenium in place of the sulfur of cysteine, is inserted at certain UGA codons in bacteria, archaea and animals, including about 25 human proteins; **pyrrolysine** (Pyl, O) is inserted at UAG in some methanogenic archaea such as *Methanosarcina barkeri* (2002). They are sometimes called the 21st and 22nd amino acids ([[molecular-biology/translation]]).

## The peptide bond and primary structure

Amino acids are joined by a condensation between the carboxyl of one and the amino group of the next, forming an amide called the **peptide bond**. The C–N bond has partial double-bond character, so the six atoms around it lie in a plane and almost always take the *trans* arrangement; rotation is possible only about the two bonds to each α-carbon, described by the torsion angles φ and ψ. G. N. Ramachandran and colleagues showed in 1963 that steric clashes forbid most combinations of φ and ψ, leaving a few allowed regions — those of the α-helix and β-sheet among them. (The details are in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=amino-acids-proteins).)

::: definition The four levels of protein structure {#def-levels}
The **primary structure** of a protein is the sequence of its amino-acid residues, written from the free amino end (N-terminus) to the free carboxyl end (C-terminus), together with any covalent cross-links such as disulfide bonds. **Secondary structure** is the local, regular conformation of the backbone held by backbone hydrogen bonds — chiefly the α-helix and the β-sheet. **Tertiary structure** is the complete three-dimensional fold of one chain. **Quaternary structure** is the arrangement of several folded chains (subunits) in a complex.
:::

In 1951 Frederick Sanger and Hans Tuppy, and then Sanger and E. O. P. Thompson, determined the sequence of the two chains of bovine insulin, completing the structure with its disulfide bonds in 1955. It was the first proof that a protein has a single, definite sequence — and therefore that something, which turned out to be a gene, must specify it. Pehr Edman's method (1950) for removing residues one at a time from the N-terminus became the standard way to sequence proteins for three decades. Today almost all protein sequences are inferred from DNA sequences, and proteins themselves are identified and quantified by mass spectrometry.

::: proposition Mass and length of a polypeptide (empirical) {#prop-mass}
The molar mass of a protein of $n$ residues is approximately

$$
M \approx 110\,n\ \ \mathrm{g\,mol^{-1}},
$$ {#eq-mass}

so 1 kDa corresponds to about 9 residues. The factor 110 Da is the average residue mass weighted by the frequency of each amino acid in proteins (residue masses range from 57 Da for glycine to 186 Da for tryptophan). It is an empirical average: a protein rich in glycine and alanine is lighter, and glycoproteins can be much heavier.
:::

## Secondary structure

In 1951 Linus Pauling, Robert Corey and Herman Branson predicted, from the geometry of the planar peptide and the requirement that backbone N–H and C=O groups form hydrogen bonds, two regular structures that were then found in almost every protein.

- The **α-helix** is a right-handed coil with 3.6 residues per turn and a rise of 0.15 nm per residue (pitch 0.54 nm). Each C=O hydrogen bonds to the N–H four residues along, and the side chains point outward.
- The **β-sheet** is formed from extended strands (0.32–0.34 nm per residue) lying side by side, hydrogen bonded between strands, either parallel or antiparallel.
- Turns and loops, often rich in Gly and Pro, connect them and reverse the chain's direction.

Helices and strands are compact ways of satisfying the backbone's hydrogen bonds internally, which is essential when the chain is buried away from water — inside a protein, or inside a membrane. A helix of about 20 residues spans the 3 nm hydrocarbon core of a bilayer, and stretches of about 20 consecutive hydrophobic residues in a sequence are the signature of a membrane protein, found by **hydropathy plots** (J. Kyte and R. F. Doolittle, 1982; see [[cell-biology/membranes]]). Amphipathic helices, with hydrophobic residues every three or four positions, lie along membrane surfaces or pack against each other in coiled coils.

## Tertiary and quaternary structure: folds, domains and families

In 1958 John Kendrew and colleagues solved the first protein structure by X-ray crystallography: myoglobin from the muscle of the sperm whale, a chain of 153 residues folded into eight α-helices around a haem group. Max Perutz's structure of horse haemoglobin, four chains ($\alpha_2\beta_2$) each folded like myoglobin, followed in 1959–60 (Nobel Prize in Chemistry, 1962). The surprise of myoglobin was its irregularity, but some general rules emerged as more structures were solved: non-polar side chains are packed in the core, with almost no gaps; polar and charged ones lie on the surface; and the chain is organised into one or more compact **domains**.

::: definition Domains and homology {#def-domain}
A **domain** is a part of a polypeptide, typically 50–250 residues long, that folds into a compact structure largely independently of the rest of the chain and often has its own function (binding ATP, DNA or a phosphorylated peptide, for instance). Two proteins or domains are **homologous** if they descend from a common ancestral sequence; homologues in different species that diverged by speciation are **orthologues**, and those that arose by gene duplication within a lineage are **paralogues**. Homology is inferred from statistically significant sequence or structural similarity.
:::

Domains are the units of protein evolution. Over evolutionary time they are duplicated, diverge, and are shuffled into new combinations by recombination of the genes that encode them, so that a large signalling protein may be a string of a dozen domains each found in many other proteins. Classification databases (SCOP, CATH) group the hundreds of thousands of known domain structures into a few thousand families and far fewer distinct folds — evidence that a limited number of architectures has been reused and adapted.

Structure is conserved much more than sequence. Cyrus Chothia and Arthur Lesk showed in 1986 that proteins whose sequences have diverged to about 30 % identity still share the same fold, with the core of the structure conserved and the changes concentrated in loops at the surface. Myoglobin and the α and β chains of haemoglobin, paralogues from an ancient gene duplication in early vertebrates, are an example: they share only about 25 % identity but are folded almost identically ([[evolution/evidence-for-evolution]]).

::: intuition Why folds are conserved
A mutation at the surface of a protein usually changes little, because surface residues mainly contact water. A mutation in the core, where side chains fit together like a three-dimensional jigsaw, usually destabilises the fold and is removed by selection, unless a compensating change follows. So over millions of years surface residues drift while core residues and the overall fold persist, and sequence identity decays faster than structural similarity. This is also why structure prediction can work from multiple alignments of homologous sequences: residues that change together across homologues are likely to touch in the structure.
:::

Many proteins function as complexes. **Quaternary structure** lets a protein be built from several copies of a small gene product (which economises on genetic information and allows error control: faulty subunits are rejected during assembly), brings together catalytic and regulatory subunits, and makes cooperativity and allostery possible ([[biochemistry/enzyme-regulation]]).

### Intrinsically disordered proteins

Not every protein has a single fold. A substantial fraction of eukaryotic proteins contain long segments that are **intrinsically disordered**: they have no stable structure on their own, but fold on binding a partner, or function as flexible linkers and scaffolds. In a 2004 analysis J. J. Ward and colleagues predicted disordered segments longer than 30 residues in about a third of eukaryotic proteins but only a few per cent of bacterial and archaeal ones. Disordered regions are rich in charged and polar residues and in Pro and Gly, poor in bulky hydrophobic ones. They are common in transcription factors and signalling proteins, where they carry phosphorylation sites and short binding motifs, and some drive the formation of membraneless compartments by liquid–liquid phase separation ([[cell-biology/organelles]]).

## Folding in the test tube and in the cell

### Anfinsen's experiment

In the late 1950s Christian Anfinsen and colleagues worked with bovine ribonuclease A, a small enzyme of 124 residues with four disulfide bonds. They unfolded it completely with 8 mol L⁻¹ urea and reduced its disulfides with β-mercaptoethanol, which abolished activity. When they removed both reagents slowly by dialysis, the chain refolded, the correct four disulfides formed out of 105 possible pairings, and almost all the activity returned (Anfinsen, E. Haber, M. Sela and F. H. White, 1961). If instead they removed the reducing agent first, so that disulfides formed while the chain was still unfolded in urea, most molecules were "scrambled" and inactive; a trace of reducing agent later let them rearrange to the active form.

The conclusion — **Anfinsen's thermodynamic hypothesis** — is that the amino-acid sequence contains all the information needed to specify the native structure, which is (for a small globular protein under physiological conditions) the state of lowest free energy (Nobel Prize in Chemistry, 1972). The native state is only marginally more stable than the unfolded state, typically by 20–60 kJ mol⁻¹ — a balance of large opposing terms worked out in the chemistry lesson. Marginal stability is biologically useful: it allows proteins to flex, to be regulated and to be degraded.

::: warning "Proteins fold because the sequence is copied from a 3-D template"
Nothing in the cell copies a protein's shape. The gene specifies only the sequence; the fold arises spontaneously from the chain's interactions with itself and with water, sometimes assisted by chaperones that prevent mistakes but do not encode the structure. The only biological agents known to propagate a *conformation* are prions, in which a misfolded protein converts normally folded copies of the same sequence to its own form — the exception that shows how unusual this is.
:::

### Chaperones and the crowded cytosol

A chain emerging from the ribosome faces conditions very different from Anfinsen's dilute test tube. Macromolecules occupy 20–30 % of the cytoplasmic volume, and partly folded chains, with exposed hydrophobic surfaces, tend to stick to each other and aggregate. Cells therefore have **molecular chaperones**, a term R. A. Laskey introduced in 1978 for the nucleosome-assembly protein nucleoplasmin and R. J. Ellis generalised in 1987.

::: definition Molecular chaperone {#def-chaperone}
A **molecular chaperone** is a protein that binds to non-native (unfolded, partly folded or misfolded) forms of other proteins, preventing their aggregation and promoting their correct folding or assembly, without becoming part of the final structure. Many chaperones use cycles of ATP binding and hydrolysis to bind and release their clients. Many are **heat-shock proteins** (Hsp), induced when stress unfolds proteins.
:::

Two systems illustrate the main mechanisms. **Hsp70** (DnaK in bacteria) binds short hydrophobic stretches of extended chain, holding nascent and stress-damaged proteins in a soluble state, and releases them after ATP hydrolysis, giving them repeated chances to fold. **Chaperonins** (GroEL with its lid GroES in *E. coli*; Hsp60 in mitochondria; TRiC/CCT in the eukaryotic cytosol) are barrel-shaped complexes in which a single chain can fold in an enclosed chamber, isolated from others. In *E. coli* only about 10 % of proteins need GroEL, but some of them are essential, and the gene for GroEL cannot be deleted. Chaperones also buffer the effects of mutations: by helping destabilised variants fold, Hsp90 can hide genetic variation that is revealed when the chaperone is overloaded (S. L. Rutherford and S. Lindquist, *Drosophila*, 1998), a mechanism proposed to influence evolvability.

### Turnover: proteins are made and destroyed

Proteins are not permanent. Damaged and misfolded proteins, and regulatory proteins that must act only briefly, are degraded — in eukaryotes mostly after being tagged with chains of the small protein **ubiquitin** and fed into the **proteasome** (Aaron Ciechanover, Avram Hershko and Irwin Rose, Nobel Prize in Chemistry, 2004), and also in lysosomes by autophagy. Bacteria use ATP-dependent proteases such as Lon and ClpXP. The steady-state amount of a protein is set by a balance between synthesis and two kinds of loss.

::: proposition Degradation and dilution {#prop-turnover}
Let a protein be made at a constant rate $\sigma$ (molecules per unit time per cell volume), degraded with first-order rate constant $k_\mathrm{deg}$, and diluted by cell growth with specific growth rate $\mu = \ln 2/T_\mathrm{d}$, where $T_\mathrm{d}$ is the doubling time. Its concentration $P$ obeys

$$
\frac{dP}{dt} = \sigma - (k_\mathrm{deg} + \mu)P,
$$ {#eq-turnover}

so it approaches the steady state $P^* = \sigma/(k_\mathrm{deg}+\mu)$ with an effective half-life $t_{1/2} = \ln 2/(k_\mathrm{deg} + \mu)$. Assumptions: exponential (balanced) growth, constant synthesis, first-order degradation.
:::

The proposition explains a basic difference between fast-growing bacteria and the cells of animals. In *E. coli* dividing every 30 minutes, most proteins are hardly degraded, and their concentration changes only by dilution: a protein whose synthesis is switched off falls by half each generation. In non-dividing animal cells, $\mu \approx 0$ and degradation alone sets turnover; in mouse fibroblasts, measured by isotope labelling and mass spectrometry, the median protein half-life is about 46 hours, with a range from minutes to weeks (B. Schwanhäusser and colleagues, *Nature* 473, 337, 2011). Some proteins, such as crystallins in the lens of the eye and collagen in cartilage, are essentially never replaced during life.

::: example The response time of a protein {#ex-turnover}
A protein in cultured mammalian cells that double every 24 h has a degradation half-life of 20 h. (a) What is its effective half-life? (b) If its synthesis rate doubles, how long does it take to rise halfway to its new steady-state level?
::: solution
(a) $k_\mathrm{deg} = \ln2/20 = 0.0347\ \mathrm{h^{-1}}$ and $\mu = \ln2/24 = 0.0289\ \mathrm{h^{-1}}$; their sum is $0.0636\ \mathrm{h^{-1}}$, so the effective half-life is $0.693/0.0636 = 10.9$ h.
(b) [[#eq-turnover]] is a linear equation whose solution relaxes exponentially to the new steady state with rate constant $k_\mathrm{deg} + \mu$, so the protein reaches halfway to its doubled level in one effective half-life, 10.9 h. The moral, central to systems biology ([[systems-biology/gene-expression-dynamics]]): the response time of a protein's concentration is set by how fast it is removed, not how fast it is made. Proteins that must change quickly, such as cyclins and many transcription factors, are therefore unstable.
:::
:::

The figure shows [[#eq-turnover]] after synthesis is switched on at time zero.

::: widget plot
f: (1 - exp(-(k + ln(2)/T)*x))/(k + ln(2)/T); (1 - exp(-(ln(2)/T)*x))/(ln(2)/T)
x: 0, 96
y: 0, 40
sliders: k=0.035:0:0.3:0.005; T=24:1:72:1
labels: \text{degraded and diluted }(k_\mathrm{deg}+\mu); \text{diluted only }(\mu)
caption: Protein concentration (arbitrary units, synthesis rate 1 per hour) against time in hours after synthesis begins, from [[#eq-turnover]]. The slider $k$ is the degradation rate constant $k_\mathrm{deg}$ in h⁻¹ and $T$ the doubling time in hours. The second curve is a completely stable protein, removed only by dilution. Notice that raising $k$ lowers the steady-state level but makes it reached sooner; lengthening $T$ (slower growth) raises the stable protein's level and slows its approach.
:::

### Proteins at the extremes

Proteins from organisms adapted to extreme temperatures show how a fold's stability is tuned by evolution. In 1969 Thomas Brock and Hudson Freeze isolated *Thermus aquaticus* from a hot spring in Yellowstone National Park; its DNA polymerase, stable near 95 °C, made the polymerase chain reaction practical. Archaea such as *Pyrococcus furiosus* grow optimally near 100 °C, and *Methanopyrus kandleri* strain 116 grew at 122 °C in laboratory culture (K. Takai and colleagues, 2008). Their proteins share the folds of their mesophilic homologues but tend to have more ion pairs on the surface, shorter loops, more tightly packed cores and more proline in loops. Enzymes of cold-adapted (psychrophilic) organisms show the reverse: more flexible structures, which keep catalysis fast at low temperature at the cost of stability, so that many are denatured by moderate warming. A trade-off between stability and activity runs through enzyme evolution ([[biochemistry/enzymes]]).

## Methods: how proteins are studied

Almost everything in this chapter was learned by a small number of methods, each of which a biologist should be able to interpret.

**Purification.** Proteins are separated by size (gel filtration), charge (ion exchange), hydrophobicity and specific binding (affinity chromatography — today often by a genetically added tag such as six histidines, which binds nickel). Purity and yield are followed by measuring activity at each step.

**Gel electrophoresis.** In SDS–polyacrylamide gel electrophoresis (SDS-PAGE; K. Weber and M. Osborn, 1969; U. K. Laemmli, 1970), proteins are denatured and coated with the detergent sodium dodecyl sulfate, which gives them a nearly uniform negative charge per unit mass; in a gel they then migrate according to size, smaller ones faster.

::: proposition Calibration of SDS-PAGE (empirical) {#prop-sds}
Over a working range set by the gel's acrylamide concentration, the relative mobility $R_\mathrm{f}$ (distance migrated divided by that of the dye front) of SDS-denatured polypeptides is approximately linear in the logarithm of molar mass:

$$
\log_{10} M = a - b\,R_\mathrm{f}.
$$ {#eq-sds}

$a$ and $b$ are found by running standards of known mass on the same gel. The relation is empirical and fails for proteins that bind SDS anomalously: very basic or acidic proteins, membrane proteins and heavily glycosylated ones often run at the "wrong" size.
:::

::: example Sizing a protein on a gel {#ex-sds}
Standards of 116, 97.4, 66.2, 45, 31, 21.5 and 14.4 kDa have relative mobilities 0.14, 0.21, 0.33, 0.46, 0.58, 0.71 and 0.84. An unknown band has $R_\mathrm{f} = 0.52$. Estimate its mass. (Drag the points in the figure below to see how sensitive the estimate is to one misplaced standard.)
::: solution
Taking $\log_{10}$ of the masses gives 2.064, 1.989, 1.821, 1.653, 1.491, 1.332 and 1.158. A least-squares line through $(R_\mathrm{f}, \log_{10}M)$ is $\log_{10}M = 2.252 - 1.302\,R_\mathrm{f}$ with $R^2 = 0.9997$. At $R_\mathrm{f} = 0.52$: $\log_{10}M = 2.252 - 0.677 = 1.575$, so $M \approx 37.6$ kDa. Because the scale is logarithmic, an error of 0.01 in $R_\mathrm{f}$ changes the estimate by about 3 %; SDS-PAGE sizes are good to perhaps 5–10 %, enough to recognise a protein, not to identify it.
:::
:::

::: widget regression
points: 0.14,2.064; 0.21,1.989; 0.33,1.821; 0.46,1.653; 0.58,1.491; 0.71,1.332; 0.84,1.158
degree: 1
x: 0, 1
y: 1, 2.3
caption: SDS-PAGE calibration of [[#ex-sds]]: $\log_{10}$ of molar mass (kDa) of seven standards against relative mobility $R_\mathrm{f}$, with the least-squares line, its equation and $R^2$. Drag a standard up or down to see how one mismeasured band shifts the line and the estimate for an unknown at $R_\mathrm{f} = 0.52$; the residuals show which point is out of line.
:::

**Western blotting** transfers the separated proteins to a membrane and detects one of them with an antibody, so that the amount of a particular protein in a cell extract can be compared between conditions.

**Mass spectrometry** now dominates protein identification. The protein is ionised — by electrospray ionisation (ESI; John Fenn, 1989) or matrix-assisted laser desorption (MALDI; Koichi Tanaka, 1988, and Franz Hillenkamp and Michael Karas; Nobel Prize in Chemistry 2002 for Fenn and Tanaka) — and the mass-to-charge ratio $m/z$ of each ion is measured. In **proteomics**, proteins are digested with trypsin, the peptides are separated by chromatography and fragmented in the instrument, and the fragment masses are matched against those predicted from genome sequences, identifying thousands of proteins in one run.

::: example Mass from an electrospray spectrum {#ex-esi}
Electrospray gives a protein many protons, producing a series of peaks of charge $z$ at $m/z = (M + z\,m_\mathrm{H})/z$, where $m_\mathrm{H} = 1.007$ Da is the mass of a proton. Two adjacent peaks in the spectrum of horse apomyoglobin are at $m/z$ 1131.11 and 1060.48. Find the charge of each and the mass $M$.
::: solution
If the peak at $p_1 = 1131.11$ has charge $z$ and the one at $p_2 = 1060.48$ has charge $z+1$, then $zp_1 = M + zm_\mathrm{H}$ and $(z+1)p_2 = M + (z+1)m_\mathrm{H}$. Subtracting, $z(p_1 - p_2) = p_2 - m_\mathrm{H}$, so

$$
z = \frac{p_2 - m_\mathrm{H}}{p_1 - p_2} = \frac{1059.47}{70.63} = 15.0.
$$

So the peaks are $z = 15$ and 16, and $M = 15\times(1131.11 - 1.007) = 16\,951.5$ Da — the mass of the 153-residue chain of horse myoglobin without its haem. From a single spectrum, the mass is determined to about one part in $10^4$–$10^5$, enough to detect a single phosphorylation (+80 Da) or a point mutation.
:::
:::

**Structure determination.** X-ray crystallography, nuclear magnetic resonance and, since about 2013, cryo-electron microscopy have produced more than 200,000 experimental structures in the Protein Data Bank (as of 2024). In 2020–21 the AlphaFold2 network (J. Jumper and colleagues, *Nature* 596, 583, 2021) predicted structures of single domains from sequence with accuracy often close to experiment, and its database now holds more than 200 million predicted structures covering most known protein sequences (Nobel Prize in Chemistry 2024, shared by Demis Hassabis and John Jumper with David Baker for protein design). These methods are the subject of [[structural-biology]].

::: example What does a protein cost to make? {#ex-cost}
Making one peptide bond on the ribosome costs about 4 high-energy phosphate bonds: two to attach the amino acid to its tRNA (ATP → AMP + PPᵢ) and two GTP during delivery and translocation. Estimate the energy cost of making the three million proteins of an *E. coli* cell ([[#ex-count]]), and compare it with the cell's total ATP budget, about $1.5\times10^{10}$ ATP per division for growth on glucose (illustrative, in the range estimated by Stouthamer, 1973).
::: solution
Three million proteins of 300 residues contain $9\times10^8$ peptide bonds, costing $4\times9\times10^8 = 3.6\times10^9$ ATP equivalents — before the cost of making the amino acids themselves, proofreading and degrading mistakes. That is about a quarter of the illustrative total budget, and with the extra costs, protein synthesis is the largest single use of energy in a growing bacterium. Bacteria accordingly regulate ribosome production tightly to growth rate, and in starvation shut it down first.
:::
:::

::: quiz
A protein is purified from a thermophilic bacterium and from its mesophilic relative. Which observation would be most surprising?
- [ ] The thermophile's protein has more surface salt bridges.
- [ ] The two proteins have about 50 % sequence identity but superimposable folds.
- [x] The two proteins have about 50 % sequence identity but completely different folds.
- [ ] The thermophile's enzyme is less active than the mesophile's at 25 °C.
::: solution
Homologues at 50 % identity are expected to share the same fold (Chothia and Lesk, 1986); structure is conserved more than sequence. Extra salt bridges and lower activity at low temperature are typical of thermostable proteins, reflecting the stability–activity trade-off.
:::
:::

::: application Proteins as targets and tools
Because each protein has a precise binding surface, most drugs act by binding to proteins — enzymes, receptors, channels and transporters — and most of the products of biotechnology are proteins: insulin, antibodies, enzymes in detergents and food processing, and the polymerases and nucleases of molecular biology. Misfolding and aggregation of proteins underlie a group of human disorders, including amyloid diseases and prion diseases, whose pathology belongs to [Medicine Atlas: pathology](/learn/medicine/course.php?c=pathology). In agriculture, protein quality — the content of essential amino acids such as lysine, which is low in cereal proteins — shapes animal and human diets and has been the target of plant breeding, for instance in quality-protein maize.
:::

::: history
The word *protein* was coined in 1838 by Jöns Jacob Berzelius and used by Gerardus Mulder. Emil Fischer showed around 1902–07 that proteins are chains of amino acids linked by amide bonds and named the peptide bond; Franz Hofmeister proposed the same idea independently. James Sumner crystallised the enzyme urease from jack beans in 1926, showing that an enzyme is a protein. Pehr Edman's degradation (1950), Sanger's insulin sequence (1951–55) and Pauling and Corey's α-helix and β-sheet (1951) followed. Christian Anfinsen's refolding of ribonuclease (1961) established that sequence determines structure. Kendrew's myoglobin (1958) and Perutz's haemoglobin (1960) were the first protein structures. Laemmli's gel system (1970), electrospray and MALDI mass spectrometry (1988–89) and AlphaFold2 (2021) transformed how proteins are studied.
:::

## Where this leads

The binding surfaces built by folding become the active sites of [[biochemistry/enzymes]], and the quaternary structures of this chapter become the allosteric machines of [[biochemistry/enzyme-regulation]]. How proteins are sorted to compartments after synthesis is in [[cell-biology/protein-sorting]]; how they are synthesised, in [[molecular-biology/translation]].

::: summary
- Proteins are more than half the dry mass of a cell; an *E. coli* cell holds about $3\times10^6$ protein molecules, at 300–400 g L⁻¹ total macromolecules.
- Twenty L-amino acids (plus selenocysteine and pyrrolysine) differ in their side chains; humans must obtain nine essential ones, those with the longest biosynthetic pathways.
- Primary structure (sequence, $M \approx 110n$ Da), secondary (α-helix, 0.15 nm per residue; β-sheet), tertiary and quaternary structure; domains are the units of protein evolution, and folds are conserved far longer than sequences.
- Anfinsen showed that sequence determines structure; in the crowded cell chaperones (Hsp70, chaperonins) prevent aggregation but do not encode the fold. Many eukaryotic proteins have intrinsically disordered regions.
- Protein levels are set by synthesis, degradation and dilution: effective half-life $\ln2/(k_\mathrm{deg}+\mu)$ sets the response time.
- Methods: chromatography, SDS-PAGE ($\log M$ linear in mobility, empirical), Western blots, ESI and MALDI mass spectrometry, X-ray, NMR, cryo-EM and AlphaFold.
:::

## Exercises

::: exercise Residues from mass {level=1 check="455"}
A protein has a molar mass of 50 kDa. Estimate its number of residues from [[#eq-mass]] (nearest whole number).
::: solution
$n \approx 50\,000/110 = 455$ residues.
:::
:::

::: exercise A helix and a strand {level=1 check="3.0"}
How long, in nm, is a 20-residue segment as an α-helix? Compare it with the same segment as a fully extended β-strand (0.34 nm per residue).
::: solution
As a helix, $20\times0.15 = 3.0$ nm — enough to span the hydrocarbon core of a bilayer. As a strand, $20\times0.34 = 6.8$ nm, more than twice as long; a strand cannot span a membrane alone because its backbone hydrogen bonds would be unsatisfied, which is why membrane β-proteins form barrels of many strands.
:::
:::

::: exercise Charge of a side chain {level=1}
Using approximate $\mathrm{p}K_\mathrm{a}$ values (Asp 3.9, His 6.0, Lys 10.5), state the predominant charge of each side chain in the cytosol (pH 7.2) and in a lysosome (pH 4.7).
::: solution
Cytosol: Asp −1 (deprotonated), His mostly neutral (about 6 % protonated), Lys +1. Lysosome: Asp still mostly −1 (about 86 % deprotonated, since $1/(1+10^{3.9-4.7}) = 0.86$), His now mostly +1 (95 % protonated), Lys +1. Histidine is the residue whose charge changes between these compartments, which is why pH-sensing proteins often use it.
:::
:::

::: exercise Effective half-life in a fast-growing bacterium {level=2 check="27.3"}
In *E. coli* doubling every 30 min, a protein is degraded with a half-life of 5 h. What is its effective half-life in minutes (three significant figures)? Is degradation or dilution more important?
::: solution
$k_\mathrm{deg} = \ln2/300\ \mathrm{min} = 0.00231\ \mathrm{min^{-1}}$; $\mu = \ln2/30 = 0.0231\ \mathrm{min^{-1}}$. The effective half-life is $0.693/0.02541 = 27.3$ min. Dilution is ten times more important than degradation: in fast-growing bacteria, only proteins with half-lives of minutes are affected noticeably by degradation.
:::
:::

::: exercise Reading an electrospray spectrum {level=2 check="8565"}
Two adjacent peaks in the ESI spectrum of bovine ubiquitin are at $m/z$ 857.49 and 779.63. Find the charges and the protein's mass to the nearest dalton ($m_\mathrm{H} = 1.007$ Da).
::: solution
$z = (779.63 - 1.007)/(857.49 - 779.63) = 778.62/77.86 = 10.0$, so the peaks are $z = 10$ and 11. $M = 10\times(857.49 - 1.007) = 8565$ Da (the known average mass is 8564.8 Da).
:::
:::

::: exercise Sizing a second band {level=2 check="53.9"}
Using the calibration line of [[#ex-sds]], estimate the mass in kDa of a band at $R_\mathrm{f} = 0.40$ (three significant figures). The same protein elutes from a gel-filtration column at the position of a 108 kDa standard. What do you conclude?
::: solution
$\log_{10}M = 2.252 - 1.302\times0.40 = 1.732$, so $M = 53.9$ kDa. Gel filtration separates native proteins by size, so a native mass about twice the subunit mass suggests the protein is a dimer of identical 54 kDa subunits (gel filtration assumes a globular shape, so an elongated monomer could also run large; analytical ultracentrifugation or mass spectrometry of the native complex would distinguish them).
:::
:::

::: exercise Anfinsen's controls {level=2}
In Anfinsen's experiments, (a) why was it essential that both urea and β-mercaptoethanol be present to inactivate ribonuclease completely? (b) Why did removing the β-mercaptoethanol first give an inactive, "scrambled" product, and why did adding a trace of β-mercaptoethanol rescue it? (c) What is the probability that four disulfides form correctly by chance among eight cysteines?
::: solution
(a) Urea alone unfolds the chain but the four disulfides hold parts of it together; mercaptoethanol alone cannot reach all disulfides in the folded protein. Both together give a fully unfolded, reduced chain. (b) With urea still present, the chain is unfolded when the disulfides form, so they form between random pairs of cysteines; the scrambled protein is trapped because covalent bonds do not rearrange spontaneously. A little reducing agent catalyses disulfide exchange, letting the chain explore pairings until it reaches the most stable — the native — structure: evidence that the native state is a thermodynamic minimum. (c) The number of ways to pair eight cysteines is $7\times5\times3\times1 = 105$, so random pairing gives the correct set with probability $1/105 \approx 1$ %; the observed recovery of about 1 % activity in scrambled ribonuclease agreed with this.
:::
:::

::: exercise Interpreting a heat-shock experiment {level=3}
Yeast cells are shifted from 25 °C to 37 °C. Within minutes the synthesis of a few proteins, including Hsp70 and Hsp104, rises 10–50-fold while most protein synthesis falls; cells pre-treated this way survive a later exposure to 50 °C far better than untreated cells. A mutant lacking Hsp104 grows normally at 25 °C and 37 °C but does not acquire tolerance to 50 °C. (a) Explain the heat-shock response in terms of protein folding. (b) What does the phenotype of the mutant tell you about Hsp104's role? (c) Why might a cell not keep these chaperones at high levels all the time?
::: solution
(a) Heat destabilises marginally stable proteins, exposing hydrophobic surfaces that aggregate. The accumulation of unfolded proteins activates a transcription factor (Hsf1 in yeast) that induces chaperone genes; the chaperones bind the unfolded proteins, prevent aggregation and refold them or target them for degradation. (b) Hsp104 is not needed for growth at moderate temperature but is needed to survive severe stress — consistent with its known function of disaggregating proteins that have already clumped, rescuing them after the stress (Y. Sanchez and S. Lindquist, 1990). (c) Chaperones are among the most abundant proteins when induced; making them costs ATP and ribosome capacity that could be used for growth (see [[#ex-cost]]), and excess chaperone activity can interfere with normal folding, signalling and degradation. Inducing them only when needed is cheaper.
:::
:::

::: exercise Why make an oligomer? {level=3}
Many enzymes are homo-oligomers (two to twelve identical subunits) even though a single subunit contains a complete active site. Using ideas from this chapter and [[biochemistry/water-and-bonds]], give three reasons why selection might favour oligomers, and one way of testing whether oligomerisation matters for a given enzyme.
::: solution
(1) Genetic economy and error control: a large structure is encoded by one short gene, and defective subunits are excluded during assembly. (2) Stability: subunit interfaces bury non-polar surface (hydrophobic effect), which can stabilise each fold and reduce turnover. (3) Regulation: interacting subunits allow cooperativity and allostery ([[biochemistry/enzyme-regulation]]), and active sites can be built at interfaces. (4) Avoiding aggregation or forming useful geometries, such as rings and filaments. A test: introduce point mutations at the interface (identified from the structure) that prevent oligomerisation without touching the active site, confirm by gel filtration or native mass spectrometry that the protein is monomeric, and compare activity, stability, regulation and the growth of cells expressing the mutant. (Some oligomers may simply be neutral — evolutionary studies suggest interfaces can become entrenched by neutral mutations, so not every oligomer is an adaptation.)
:::
:::
