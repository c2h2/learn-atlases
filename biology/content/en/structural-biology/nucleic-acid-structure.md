The double helix is the most famous structure in biology, and also one of the most misleading. Its iconic image — a smooth, regular spiral staircase — suggests a molecule that is the same everywhere and does nothing but store information. Real DNA is a flexible polymer whose local shape depends on its sequence, which bends, unwinds and kinks when proteins bind it, and which forms other helices and four-stranded structures under the right conditions. RNA goes much further: a single strand folds back on itself into hairpins, junctions and pseudoknots, and the resulting three-dimensional shapes catalyse reactions, sense metabolites and form the core of the ribosome.

This chapter is about the architecture of nucleic acids and the way proteins read it. It builds on [[molecular-biology/dna-structure]], which introduced B-DNA, its major and minor grooves, the A and Z forms, supercoiling and chromatin, and on the chemistry of nucleotides, base pairing and duplex stability in Chemistry Atlas ([Nucleic acids](/learn/chemistry/lesson.php?c=biochemistry&l=nucleic-acids)). We go more deeply into the geometry of the nucleotide and the base pair, the polymorphism of DNA, the principles of RNA folding and catalysis, and the structural rules — and the absence of a simple code — by which proteins recognise particular sequences of DNA and RNA.

## The nucleotide as a building block

A nucleotide has more conformational freedom than an amino-acid residue. Along the sugar–phosphate backbone, from one phosphorus to the next, there are six torsion angles, conventionally labelled α, β, γ, δ, ε and ζ (P–O5′–C5′–C4′–C3′–O3′–P), plus the angle χ about the glycosidic bond joining the base to the sugar. Two of these choices matter most, because they are coupled to the overall helix type.

::: definition Sugar pucker and glycosidic conformation {#def-pucker}
The five-membered ribose or deoxyribose ring is not flat: one atom lies out of the plane of the other four. In **C2′-endo** pucker, C2′ is displaced to the same side as C5′; in **C3′-endo** pucker, C3′ is. The pucker changes the distance between adjacent phosphates along a strand, from about 7.0 Å (C2′-endo) to about 5.9 Å (C3′-endo). The base can be **anti** (χ ≈ −120° to −160°; the bulk of the base points away from the sugar, the usual conformation) or **syn** (χ ≈ +60°; the base lies over the sugar), which is common only for guanine.
:::

B-DNA has C2′-endo sugars; A-DNA and double-stranded RNA have C3′-endo sugars. RNA almost always adopts C3′-endo because its 2′-hydroxyl group clashes with the neighbouring phosphate and base in the C2′-endo form. This one atom is why RNA duplexes are A-form, and therefore why proteins read double-stranded RNA so differently from DNA, as we shall see.

### The base pair and its parameters

In a Watson–Crick pair the two glycosidic bonds are on the same side of the pair, and the distance between the C1′ atoms of the two sugars is about 10.5 Å for both A·T and G·C. This **isomorphism** is what allows any sequence to fit into the same regular helix. The asymmetry of the glycosidic bonds also creates the two grooves of the helix: the side of the pair facing away from the sugars forms the floor of the major groove, the side near them the floor of the minor groove.

Base pairs are not perfectly flat or stacked straight on top of each other, and their deviations are described by a set of standardised parameters (the Cambridge convention of 1989 and its later revisions). For a single pair, the most important is **propeller twist**, the rotation of the two bases in opposite directions about the long axis of the pair, typically −10° to −15° in B-DNA, which improves stacking with neighbours. For a step between two successive pairs, the main parameters are **rise** (the distance between them along the helix axis), **twist** (the rotation about it) and **roll** (the opening of the angle between the two pairs, towards one groove or the other). A positive roll opens the step towards the minor groove and bends the helix towards the major groove.

::: definition Helix families of DNA {#def-helix-forms}
The three main double-helical forms of DNA have the following typical parameters (fibre and crystal averages):

| form | handedness | bp per turn | twist per bp | rise per bp | sugar pucker | grooves |
|---|---|---|---|---|---|---|
| A | right | ≈ 11 | ≈ 33° | 2.6 Å | C3′-endo | major groove deep and narrow, minor groove shallow and wide |
| B | right | ≈ 10.5 (solution) | ≈ 34° | 3.4 Å | C2′-endo | wide major, narrow minor groove of similar depth |
| Z | left | 12 (6 dinucleotides) | ≈ −30° average | 3.7 Å | alternating C2′-endo (C, anti) and C3′-endo (G, syn) | very shallow major groove, deep narrow minor groove |

In A-DNA the base pairs are displaced about 4.5 Å off the helix axis and inclined about 20° to it, leaving a hollow core; in B-DNA they sit nearly on the axis and nearly perpendicular to it. The repeating unit of Z-DNA is a dinucleotide, which gives its backbone a zigzag.
:::

::: example How long is a duplex? {#ex-duplex-length}
A 12-base-pair duplex is crystallised in three forms. Estimate its length along the helix axis as A-DNA, B-DNA and Z-DNA, and the number of turns it makes in each.
::: solution
B-DNA: $12\times3.38\ \text{Å} = 40.6$ Å, and $12/10.5 = 1.14$ turns. A-DNA: $12\times2.56\ \text{Å} = 30.7$ Å, $12/11 = 1.09$ turns: a quarter shorter and fatter. Z-DNA: $12\times3.7 = 44$ Å, exactly one (left-handed) turn of 12 bp. The B→A transition shortens a duplex substantially, which is why it can be followed in fibres and why proteins that locally convert DNA towards A-form, such as TATA-binding protein and some polymerases, change its length and shape.
:::
:::

The B form is the one DNA adopts in water at physiological salt, but crystal structures of short duplexes, beginning with the "Dickerson dodecamer" `CGCGAATTCGCG` (R. Wing, H. Drew, R. E. Dickerson and colleagues, 1980), showed that real B-DNA is irregular: twist, roll and groove width vary from step to step in a sequence-dependent way. Runs of four or more A·T pairs without a TpA step (**A-tracts**) are straight and stiff, with a narrow minor groove and high propeller twist; several A-tracts in phase with the helical repeat bend DNA, an effect discovered from the anomalous gel mobility of kinetoplast DNA of trypanosomes (J. C. Marini, P. T. Englund and colleagues, 1982). Pyrimidine–purine steps such as TpA and CpA are the most flexible, and are often the sites where proteins kink DNA.

::: warning DNA sequence is not only information
It is tempting to think that the only thing a DNA sequence specifies is the order of bases that a polymerase will copy. But the same sequence also specifies a local shape — groove widths, bendability, the ease of unwinding — and a protein that cannot form a hydrogen bond with any base can still prefer one sequence over another by preferring its shape. Promoter strength, nucleosome positioning and the binding of many transcription factors depend partly on these physical properties, not only on the "letters".
:::

### Beyond the double helix

Bases can pair in other ways. In a **Hoogsteen** pair (K. Hoogsteen, 1959, from crystals of methylated adenine and thymine), the purine is flipped to the *syn* conformation and uses a different edge, the one facing the major groove in a Watson–Crick pair. Hoogsteen pairing allows a third strand to lie in the major groove of a duplex, forming a **triplex**, and it occurs transiently even in ordinary B-DNA, as NMR relaxation experiments have shown (E. N. Nikolova, H. M. Al-Hashimi and colleagues, 2011).

Guanine-rich sequences can form **G-quadruplexes**: four guanines from one or more strands pair through their Hoogsteen edges into a square planar **G-tetrad**, and tetrads stack with a monovalent cation, preferably K⁺, sitting between them on the central axis. Guanylic acid gels had shown four-stranded structures in 1962 (M. Gellert, M. N. Lipsett and D. R. Davies), and telomeric repeats such as human `TTAGGG` form quadruplexes in vitro. Whether, where and how often quadruplexes form in cells is an active question; antibodies and small-molecule probes suggest that they do, in telomeres and in promoters, but in a dynamic and regulated way.

## RNA structure

RNA is usually single-stranded, so its structure is set by how one chain pairs with itself. The rules are those of DNA with additions: the **G·U wobble pair**, as stable as an A·U pair, is common; non-Watson–Crick pairs between any two edges of two bases are frequent in loops; and the 2′-hydroxyl adds hydrogen-bonding possibilities that DNA lacks.

::: definition RNA secondary and tertiary structure {#def-rna-structure}
The **secondary structure** of an RNA is the list of its base pairs that form regular, nested double-helical **stems** (helices), together with the unpaired regions they enclose: **hairpin loops** at the ends of stems, **bulges** (unpaired nucleotides on one side of a stem), **internal loops** (on both sides) and **multibranch loops** or junctions where three or more stems meet. **Tertiary structure** is the three-dimensional arrangement of these elements and the contacts between them, including base pairs between loops that are not nested within the secondary structure (**pseudoknots**), coaxial stacking of stems, and specific tertiary motifs.
:::

Unlike protein folding, RNA folding is strongly hierarchical. Secondary structure is very stable — each base-pair stack in a stem contributes several kJ mol⁻¹, and stacking rather than hydrogen bonding provides most of it — and forms first, in microseconds to milliseconds; tertiary structure forms later, often requiring Mg²⁺ ions to neutralise the close approach of phosphates. Because secondary structure is so dominant, it can be predicted from sequence with reasonable success by finding the arrangement of stems and loops with the lowest free energy, using **nearest-neighbour** parameters for each stack and loop derived from melting experiments on model duplexes (M. Zuker and P. Stiegler, 1981; D. H. Turner and colleagues). For long RNAs the accuracy of such predictions is modest, and comparative sequence analysis — finding pairs of positions that co-vary across homologues so as to preserve pairing — remains the gold standard; it was how the secondary structures of ribosomal RNAs were established in the 1980s, long before their crystal structures.

::: intuition Covariation as evidence of a base pair
Suppose that in an alignment of 500 homologous RNAs, position 12 is G wherever position 47 is C, A wherever 47 is U, and C wherever 47 is G. Individually both positions vary, but the pair is always complementary. The simplest explanation is that the two nucleotides pair in the structure, and that selection eliminates any change that breaks the pair unless a compensating change follows. Covariation detects structure without any physical measurement — the same logic that, applied to residue contacts in proteins, became a key ingredient of structure prediction ([[structural-biology/structure-prediction]]).
:::

### Recurrent RNA motifs

A modest number of motifs build most RNA tertiary structures:

- **Tetraloops**: hairpin loops of four nucleotides, especially the GNRA family (N any nucleotide, R a purine) and UUCG, are exceptionally stable and common. UUCG closed by a C·G pair is stabilised by a *syn* guanine and a U·G pair (C. Cheong, G. Varani and I. Tinoco, 1990).
- **Tetraloop–receptor** interactions: a GNRA loop docks into the minor groove of a specific internal loop elsewhere in the molecule, one of the ways distant elements are held together.
- The **A-minor motif**: unpaired adenines insert into the minor groove of a neighbouring helix, using their 2′-OH and minor-groove edge to read Watson–Crick pairs. It is the most abundant tertiary interaction in the ribosome (P. Nissen and colleagues, 2001).
- **Pseudoknots**: a loop pairs with a segment outside its stem. They are found in telomerase RNA and in the frameshift-stimulating elements of many viruses.
- **Kissing loops**: two hairpin loops pair with each other, as in the dimerisation signal of retroviral genomes and in plasmid copy-number control.

Transfer RNA was the first RNA whose three-dimensional structure was solved, by crystallography of yeast tRNA^Phe (S. H. Kim, A. Rich and colleagues; and J. D. Robertus, A. Klug and colleagues; both 1974). Its cloverleaf of four stems folds into an **L shape**, about 70 Å along each arm, by coaxial stacking of stems into two continuous helices and by tertiary pairs between the D and T loops at the corner. The anticodon is at one end of the L and the amino-acid attachment site 75 Å away at the other — a separation that spans the distance between the decoding centre and the peptidyl transferase centre of the ribosome ([[structural-biology/molecular-machines]]).

### Ribozymes and riboswitches

In 1982 Thomas Cech and colleagues found that the intron of the large ribosomal RNA precursor of the ciliate *Tetrahymena thermophila* spliced itself out without any protein (K. Kruger and colleagues), and in 1983 Sidney Altman's group showed that the RNA subunit of bacterial ribonuclease P cleaves precursor tRNAs by itself (C. Guerrier-Takada and colleagues). These **ribozymes** earned Cech and Altman the Nobel Prize in Chemistry in 1989.

::: definition Ribozyme and riboswitch {#def-ribozyme}
A **ribozyme** is an RNA molecule that catalyses a chemical reaction. Natural ribozymes catalyse phosphoryl transfer — cleavage or ligation of RNA (the self-cleaving hammerhead, hairpin, HDV and other small ribozymes; group I and group II introns; RNase P) — and peptidyl transfer (the ribosome). A **riboswitch** is a structured region of an mRNA, usually in its 5′ untranslated region, that binds a specific small molecule and, by changing its structure, controls transcription termination, translation initiation or splicing of that mRNA.
:::

Ribozymes catalyse reactions with the same strategies as protein enzymes ([[biochemistry/enzymes]]), positioning the substrate, using bases whose $\mathrm{p}K_\mathrm{a}$ is shifted by the folded environment as general acids and bases, and using bound Mg²⁺ ions to stabilise developing negative charge. Crystal structures of the P4–P6 domain of the *Tetrahymena* intron (J. H. Cate, J. A. Doudna and colleagues, 1996) and of the hammerhead ribozyme (H. W. Pley, K. M. Flaherty and D. B. McKay, 1994; W. G. Scott, J. T. Finch and A. Klug, 1995) showed how RNA builds packed cores and active sites much as proteins do, but with a smaller chemical alphabet. That RNA can be both genetic material and catalyst is the central argument for an "RNA world" early in the history of life ([[diversity-of-life/origin-of-life]]).

Riboswitches were established as a widespread mechanism in 2002 (W. Winkler, A. Nahvi and R. R. Breaker, for the thiamine pyrophosphate riboswitch; and A. S. Mironov, E. Nudler and colleagues). They recognise their ligands — vitamins, amino acids, nucleobases, metal ions — with a selectivity that rivals proteins: the guanine riboswitch of *Bacillus subtilis* binds guanine with nanomolar affinity but adenine only very weakly, by forming a Watson–Crick pair between the ligand and a pyrimidine of the binding pocket.

## How proteins read nucleic acids

A transcription factor must find a site of perhaps 10–20 base pairs among millions of others, bind it tightly enough to be there when needed, and bind all the other sites weakly enough not to be sequestered. Structural studies since the late 1980s have shown how this is achieved.

::: definition Direct and indirect readout {#def-readout}
In **direct readout**, a protein recognises a sequence through contacts with the base edges — hydrogen bonds to donors and acceptors, and van der Waals contacts to the methyl group of thymine — mostly in the major groove, where the four base-pair orientations present distinct patterns. In **indirect readout** (or **shape readout**), the protein recognises sequence-dependent features of the DNA backbone and grooves — local width of the minor groove, bendability, intrinsic curvature, electrostatic potential — without contacting the bases themselves.
:::

In the major groove a G·C pair presents, from one side to the other, a hydrogen-bond acceptor (N7 of G), another acceptor (O6 of G) and a donor (N4 of C); an A·T pair presents an acceptor (N7 of A), a donor (N6 of A), an acceptor (O4 of T) and the methyl group of T. The patterns differ in order and type, so all four orientations — A·T, T·A, G·C and C·G — can be distinguished (N. C. Seeman, J. M. Rosenberg and A. Rich, 1976). A common recognition is the bidentate pair of hydrogen bonds from an arginine side chain to N7 and O6 of guanine. In the minor groove, A·T and T·A, and G·C and C·G, look almost alike, but the minor groove narrows over A·T-rich sequences, concentrating negative electrostatic potential that arginine side chains can sense (R. Rohs, R. S. Mann, B. Honig and colleagues, 2009).

::: warning There is no simple recognition code
It was hoped in the 1970s and 1980s that a table would emerge pairing each amino acid with the base it recognises, so that binding sites could be read off a protein sequence. Structures showed that this is not so: the same base is recognised by different residues in different proteins, the same residue reads different bases depending on its position, and water molecules, backbone contacts and DNA shape all contribute (B. W. Matthews, "No code for recognition", 1988). Only within particular families with a fixed geometry — Cys₂His₂ zinc fingers, TALE repeats, PUF repeats — do approximate codes work, and even those are context-dependent.
:::

### DNA-binding motifs

A few protein scaffolds recur among sequence-specific DNA-binding proteins, each positioning a recognition element in a groove ([[structural-biology/protein-architecture]]).

- **Helix–turn–helix** (HTH). In bacterial repressors such as λ repressor, Cro and the repressor of phage 434, the second helix of the HTH lies in the major groove and makes most base contacts; the proteins bind as dimers to palindromic operators, each monomer reading one half-site, one helical turn (about 34 Å) apart (crystal structures of 434 repressor–operator by J. E. Anderson, M. Ptashne and S. C. Harrison, 1987, and λ repressor–operator by S. R. Jordan and C. O. Pabo, 1988).
- **Homeodomain**: a 60-residue domain of three helices, found in the developmental regulators of animals ([[developmental-biology]]); helix 3 lies in the major groove and the N-terminal arm in the adjacent minor groove.
- **Cys₂His₂ zinc fingers**: each finger places its helix in the major groove and contacts about three base pairs, so a protein with several fingers wraps around the DNA following the groove (N. P. Pavletich and C. O. Pabo, the three-finger protein Zif268, 1991). This modularity made zinc fingers the first programmable DNA-binding domains for genome engineering.
- **Basic leucine zipper** (bZIP) and **basic helix–loop–helix**: two long helices, held together by a coiled coil or helix–loop–helix dimerisation domain, grip the major groove from opposite sides like a pair of forceps.
- **β-sheet readers**: the *E. coli* methionine repressor MetJ inserts a two-stranded antiparallel β-sheet into the major groove; the TATA-binding protein (TBP) uses the concave underside of a ten-stranded saddle-shaped sheet to bind the minor groove, inserting two pairs of phenylalanine side chains between base pairs and bending the DNA by about 80° (J. L. Kim, D. B. Nikolov and S. K. Burley; Y. Kim, J. H. Geiger, S. Hahn and P. B. Sigler; both 1993).

::: example The energy of bending DNA {#ex-bend}
The elastic energy to bend a DNA segment of length $L$ smoothly through an angle $\theta$ (radians) is approximately $E = k_\mathrm BT\,P\theta^2/(2L)$, where $P \approx 50$ nm is the persistence length ([[molecular-biology/dna-structure]]). Estimate the energy needed to bend 8 bp of DNA through 80°, as TBP does, and compare it with the binding free energy of a typical specific complex (about 50 kJ mol⁻¹).
::: solution
$L = 8\times0.34 = 2.72$ nm and $\theta = 80° = 1.396$ rad, so $E = k_\mathrm BT\times50\times1.949/(2\times2.72) = 17.9\,k_\mathrm BT$. At 25 °C, $RT = 2.48$ kJ mol⁻¹, so the cost is about 44 kJ mol⁻¹ — nearly the whole binding energy. Smooth bending of so short a segment would be prohibitive; TBP instead concentrates the deformation in two sharp kinks at the ends of the TATA box, where the intercalated phenylalanines unstack the bases, and it prefers TATA sequences partly because TA steps are the easiest to kink. The estimate is rough (the elastic model is not valid for such sharp bends), but it explains why DNA shape and flexibility matter so much for TBP.
:::
:::

### Specificity and the search for a site

Specific binding must be measured against the competition of all the non-specific DNA in the cell.

::: proposition Specific occupancy against a genome {#prop-specificity}
Consider a single protein molecule in a cell with one specific site, bound with dissociation constant $K_\mathrm s$, and $N$ non-specific sites, each bound with $K_\mathrm{ns}$. If essentially all the protein is bound to DNA (true when the non-specific site concentration is much greater than $K_\mathrm{ns}$), the probability that it is on its specific site is

$$
p_\mathrm s = \frac{1/K_\mathrm s}{1/K_\mathrm s + N/K_\mathrm{ns}} = \frac{1}{1 + N K_\mathrm s/K_\mathrm{ns}} .
$$ {#eq-specificity}

So the specificity ratio $K_\mathrm{ns}/K_\mathrm s$ must be comparable with or larger than the number of competing sites $N$ for the specific site to be occupied most of the time. Assumptions: equilibrium, independent sites, a single protein copy, and no other proteins competing for the DNA.
:::

::: example A repressor in *E. coli* {#ex-repressor}
A repressor binds its operator with $K_\mathrm s = 10^{-11}$ mol L⁻¹ and any other site in the 4.6 Mbp *E. coli* genome with $K_\mathrm{ns} = 10^{-5}$ mol L⁻¹ (illustrative values). (a) What is the concentration of non-specific sites in a cell of volume 1 fL? (b) What is the probability that a single repressor molecule occupies the operator? (c) How much tighter would specific binding need to be for 95 % occupancy, and what is that in free energy?
::: solution
(a) About $4.6\times10^6$ sites (one at every base pair, on either strand counted once) in $10^{-15}$ L: $4.6\times10^6/(6.022\times10^{23}\times10^{-15}) = 7.6\times10^{-3}$ mol L⁻¹, nearly a thousand times $K_\mathrm{ns}$, so the protein is almost always on some DNA. (b) $NK_\mathrm s/K_\mathrm{ns} = 4.6\times10^6\times10^{-6} = 4.6$, so $p_\mathrm s = 1/5.6 = 0.18$. (c) For $p_\mathrm s = 0.95$ we need $NK_\mathrm s/K_\mathrm{ns} = 0.053$, i.e. $K_\mathrm{ns}/K_\mathrm s = 8.7\times10^7$, 87 times tighter specific binding, or $K_\mathrm s = 1.1\times10^{-13}$ mol L⁻¹. The extra free energy is $RT\ln87 = 2.48\times4.47 = 11$ kJ mol⁻¹ at 25 °C. Real cells solve the problem partly by making several copies of the repressor (*E. coli* has about ten lac repressor tetramers) and by DNA looping between multiple operators ([[molecular-biology/bacterial-gene-regulation]]).
:::
:::

The figure shows how a ratio of affinities becomes a difference in occupancy.

::: widget plot
f: 1/(1 + 10^(s - x)); 1/(1 + 10^(n - x))
x: -14, -2
y: 0, 1
sliders: s=-11:-14:-6:0.1; n=-5:-8:-2:0.1
labels: \text{specific site}; \text{non-specific site}
caption: Fractional occupancy of a site against $\log_{10}$ of the free protein concentration (mol L⁻¹), for a specific site with $\log_{10}K_\mathrm s = s$ and a non-specific site with $\log_{10}K_\mathrm{ns} = n$ (illustrative values from [[#ex-repressor]]). Each curve rises from 10 % to 90 % occupancy over a hundredfold range of concentration (two log units), centred on its $K_\mathrm d$. A specificity ratio of $10^6$ is six log units of separation; but because there are millions of non-specific sites, even a small occupancy of each adds up — which is what [[#eq-specificity]] accounts for.
:::

Finding the site is a kinetic problem as well. The lac repressor finds its operator faster than three-dimensional diffusion alone allows, because it binds non-specific DNA and slides along it, hops and transfers between nearby segments — **facilitated diffusion** (O. G. Berg, R. B. Winter and P. H. von Hippel, 1981). Single-molecule imaging in living *E. coli* showed that each repressor spends most of its search time sliding on DNA in short bouts (P. Hammar, J. Elf and colleagues, 2012).

::: example How unique is a site? {#ex-site-length}
How many times would a particular 9-bp sequence occur by chance in a random sequence the size of the haploid human genome ($3.1\times10^9$ bp), counting both strands? How long must a site be to be expected less than once?
::: solution
The probability that a given position and strand matches a 9-bp sequence is $4^{-9} = 3.8\times10^{-6}$, and there are about $2\times3.1\times10^9$ positions on the two strands, so the expected number is $6.2\times10^9/262\,144 \approx 24\,000$. A site is expected less than once when $4^{\ell} > 6.2\times10^9$, i.e. $\ell > \log_4(6.2\times10^9) = 16.3$, so 17 bp or more. A three-finger zinc-finger protein (9 bp) therefore has thousands of potential sites in a mammalian genome; designed six-finger proteins (18 bp), and the 20-nucleotide guide of Cas9, can in principle target a unique site (real genomes are not random, and partial matches complicate the picture).
:::
:::

::: widget plot
f: (ln(2*G) + 9*ln(10) - x*ln(4))/ln(10)
x: 4, 24
y: -6, 8
sliders: G=3.1:0.001:10:0.001
labels: \log_{10}(\text{expected chance matches})
hlines: 0
caption: The expected number of chance occurrences of a particular site of length $x$ bp in a random genome of $G\times10^9$ bp, counting both strands, plotted as $\log_{10}$ (so 0 means one expected match). The default is the human genome of [[#ex-site-length]]; set $G$ to 0.0046 for *E. coli* and see the line drop by nearly three units, so that about 12 bp already suffice for uniqueness. Each extra base pair divides the expected number by four (0.6 log units).
:::

### Recognising RNA

Double-stranded RNA is A-form, with a major groove too deep and narrow for a protein helix to enter, so proteins rarely read the bases of an RNA duplex. The **double-stranded RNA-binding domain** (dsRBD) recognises the A-form shape — the spacing of minor grooves and phosphates — and is largely sequence-independent. Sequence-specific RNA recognition happens where the bases are exposed: in single strands, loops and bulges.

- The **RNA recognition motif** (RRM), the most common RNA-binding domain in eukaryotes (about 90 residues, β1α1β2β3α2β4), binds two to eight single-stranded nucleotides across the surface of its four-stranded β-sheet, stacking bases on conserved aromatic side chains.
- **PUF repeats** each bind one nucleotide, so that a Pumilio protein with eight repeats reads an eight-nucleotide sequence in a modular way (X. Wang, P. D. Zamore, T. M. Tanaka Hall and colleagues, human Pumilio1, 2002); changing two or three side chains in a repeat changes the base it prefers.
- **RNA-guided** recognition, in Argonaute proteins ([[molecular-biology/eukaryotic-gene-regulation]]) and CRISPR effectors such as Cas9, uses base pairing between a bound guide RNA and the target, with the protein holding the guide in a pre-organised A-form-like conformation. The crystal structure of *Streptococcus pyogenes* Cas9 with its guide and a target DNA (H. Nishimasu, O. Nureki and colleagues, 2014) showed the guide–target heteroduplex held in a positively charged groove between two lobes ([[biotechnology]]).

::: quiz
A protein binds double-stranded RNA tightly but shows no preference among sequences, while a second protein binds a specific five-nucleotide sequence only when it is in a single-stranded loop. Which domains are they most likely to contain?
- [ ] A helix–turn–helix and a zinc finger
- [x] A dsRBD and an RRM
- [ ] Two RRMs
- [ ] A homeodomain and a dsRBD
::: solution
The A-form RNA duplex has a deep, narrow major groove that protein helices cannot read, so duplex-binding proteins such as the dsRBD recognise its shape and backbone, independent of sequence. Sequence-specific RNA recognition needs exposed bases, which the β-sheet surface of an RRM reads in single-stranded regions. Helix–turn–helix, zinc-finger and homeodomain proteins mostly bind DNA in the major groove of B-form.
:::
:::

::: application Drugs that bind nucleic acids
Many antibiotics and anticancer drugs act by binding nucleic acid structures, and their mechanisms were worked out from structures. Intercalators such as the anthracyclines slide between base pairs, lengthening and unwinding the helix. The minor-groove binders netropsin and distamycin fit the narrow minor groove of A·T-rich DNA, a preference explained by the 1985 crystal structure of netropsin bound to the Dickerson dodecamer (M. L. Kopka, R. E. Dickerson and colleagues). Aminoglycosides, tetracyclines and macrolides bind specific sites in ribosomal RNA ([[structural-biology/molecular-machines]]), and the selectivity of some of them for bacterial over human ribosomes can be traced to single nucleotides that differ in the binding pocket.
:::

::: history
Rosalind Franklin and Raymond Gosling's X-ray photographs of DNA fibres (1952) distinguished the A and B forms, and Watson and Crick's B-DNA model (1953) explained the B pattern. For two decades all knowledge of nucleic acid structure came from fibres; the first single crystals of nucleic acids, of yeast tRNA^Phe in 1974, showed RNA folding into a compact tertiary structure. Alexander Rich's group crystallised the hexamer `d(CGCGCG)` in 1979 (A. H.-J. Wang and colleagues) and found, to general surprise, a left-handed helix — Z-DNA. The Dickerson dodecamer of 1980 gave the first full turn of B-DNA at near-atomic resolution and revealed its sequence-dependent irregularities. Protein–DNA complexes followed from 1986 onwards (the EcoRI endonuclease in 1986, the repressor of phage 434 in 1987 and that of phage λ in 1988), and the ribosome structures of 2000 revealed the largest RNA structures then known, with the A-minor motif and other recurring tertiary interactions.
:::

## Where this leads

The ribosome, the largest ribonucleoprotein machine, is described in [[structural-biology/molecular-machines]]. How nucleic acid structures are determined is covered in [[structural-biology/x-ray-crystallography]], [[structural-biology/nmr-spectroscopy]] (well suited to RNA motifs and their dynamics) and [[structural-biology/cryo-em]]. The prediction of nucleic acid and protein–nucleic acid structures is discussed in [[structural-biology/structure-prediction]], and the thermodynamics of binding in [[structural-biology/dynamics-and-design]].

::: summary
- Nucleotide conformation is dominated by sugar pucker (C2′-endo in B-DNA, C3′-endo in A-DNA and RNA, enforced by the 2′-OH) and by the anti/syn glycosidic angle.
- The A (11 bp/turn, 2.6 Å rise), B (10.5 bp/turn, 3.4 Å) and Z (left-handed, 12 bp/turn) forms differ in groove geometry; real B-DNA shape varies with sequence (A-tracts, flexible pyrimidine–purine steps).
- Non-canonical structures include Hoogsteen pairs, triplexes and K⁺-stabilised G-quadruplexes.
- RNA folds hierarchically: stable secondary structure (predicted by nearest-neighbour energies and covariation), then tertiary motifs (tetraloops, A-minor, pseudoknots) usually needing Mg²⁺. Ribozymes and riboswitches show RNA can catalyse and sense.
- Proteins read DNA by direct readout of base edges in the major groove and by indirect (shape) readout; motifs include HTH, homeodomain, zinc finger, bZIP and β-sheet readers. There is no general recognition code.
- Specific occupancy requires $K_\mathrm{ns}/K_\mathrm s$ comparable with the number of competing sites ([[#eq-specificity]]); RNA is read in single-stranded regions (RRM, PUF) or by guide RNAs.
:::

## Exercises

::: exercise Base pairs per turn {level=1 check="34.3"}
What is the average twist per base pair, in degrees (three significant figures), for B-DNA with 10.5 bp per turn?
::: solution
$360°/10.5 = 34.3°$.
:::
:::

::: exercise Shortening on the B→A transition {level=1 check="24"}
By what percentage (to two significant figures) does a duplex shorten when it changes from B-form (3.38 Å per bp) to A-form (2.56 Å per bp)?
::: solution
$(3.38 - 2.56)/3.38 = 0.243$, about 24 %.
:::
:::

::: exercise Reading a covariation table {level=1}
In an alignment of homologous bacterial RNAs, the following nucleotide pairs are seen at positions 23 and 61: G–C in 210 sequences, A–U in 95, G–U in 40, C–G in 52, and U–A in 18; no other combinations occur. What do you conclude?
::: solution
Every observed combination can form a Watson–Crick or G·U wobble pair, although both positions vary individually. This covariation is strong evidence that positions 23 and 61 are base paired in the functional structure, with selection maintaining pairing rather than identity.
:::
:::

::: exercise Specificity needed in a eukaryote {level=2 check="1.2e9"}
A transcription factor in a yeast nucleus faces about $1.2\times10^7$ non-specific sites. Using [[#eq-specificity]], what ratio $K_\mathrm{ns}/K_\mathrm s$ is needed for a single protein molecule to occupy its specific site 99 % of the time? Give two significant figures.
::: solution
$p_\mathrm s = 0.99$ requires $NK_\mathrm s/K_\mathrm{ns} = 1/0.99 - 1 = 0.0101$, so $K_\mathrm{ns}/K_\mathrm s = N/0.0101 = 1.2\times10^7\times99 = 1.2\times10^9$. In practice nucleosomes occlude much of the genome, factors are present in many copies, and they bind cooperatively, all of which change this simple estimate.
:::
:::

::: exercise A free energy of specificity {level=2 check="34.2"}
A restriction enzyme binds its 6-bp recognition site with $K_\mathrm d = 10^{-12}$ mol L⁻¹ and a site differing by one base pair with $K_\mathrm d = 10^{-6}$ mol L⁻¹. What is the difference in binding free energy at 25 °C, in kJ mol⁻¹ (three significant figures)?
::: solution
$\Delta\Delta G = RT\ln(10^{-6}/10^{-12}) = 2.479\times13.82 = 34.2$ kJ mol⁻¹ — a large penalty for one base pair, typical of restriction enzymes, which must never cut the host's DNA at near-cognate sites. Part of this discrimination comes from the distortion of DNA in the specific complex: at a wrong site the enzyme cannot pay for the distortion and binds in a different, inactive way.
:::
:::

::: exercise Groove widths and recognition {level=2}
Explain, using the geometry of the A and B forms, why (a) most sequence-specific DNA-binding proteins insert an α-helix into the major groove of B-DNA, (b) RNA duplexes are rarely recognised by their base sequence, and (c) TBP, which binds the minor groove, distorts the DNA towards A-like geometry locally.
::: solution
(a) The major groove of B-DNA is wide (about 12 Å between backbones) and moderately deep, enough to accommodate an α-helix (about 10 Å wide including side chains), and it displays distinct hydrogen-bonding patterns for all four base-pair orientations. (b) In A-form RNA the major groove is narrow (only a few ångströms between backbones) and deep, so a protein helix cannot reach the base edges; the minor groove is wide and shallow but its edges distinguish pairs poorly. Specific recognition therefore uses loops, bulges and single strands. (c) To make extensive contact with the minor groove, TBP widens it, which requires unwinding, positive roll at the kinks and a C3′-endo-like geometry — features of the A form. The widened minor groove then fits the saddle-shaped β-sheet.
:::
:::

::: exercise Interpreting a footprint {level=2}
A footprinting experiment on a 200-bp promoter fragment shows that protein X protects 20 bp centred on a palindromic sequence, with two regions of enhanced cleavage by DNase I located 5 bp on either side of the centre. Protein Y protects 9 bp and its binding is unchanged when every G·C pair in its site is replaced by an inosine·C pair (inosine lacks the 2-amino group of guanine, which lies in the minor groove). (a) What can you infer about the stoichiometry and DNA distortion in the X complex? (b) Is Y reading the major or the minor groove?
::: solution
(a) A protected region centred on a palindrome suggests a symmetric dimer binding two half-sites. Enhanced DNase I cleavage within a protected region usually indicates distortion that widens the minor groove at those points, such as a bend towards the major groove; X probably bends the DNA. (b) Replacing G by inosine removes only a minor-groove group (the 2-amino group); if Y's affinity is unchanged, it does not depend on minor-groove contacts at those positions, and it most likely reads the major groove, where G and I present identical N7 and O6. (A minor-groove binder such as TBP would typically be sensitive to such substitutions.)
:::
:::

::: exercise Designing a modular binder {level=3}
You want a protein that binds a unique site in a 3.1 Gbp genome. (a) Using [[#ex-site-length]], how many Cys₂His₂ zinc fingers would you need, assuming each reads 3 bp perfectly? (b) In practice zinc-finger arrays with this many fingers often bind fewer sites than predicted but also bind many partial matches. Give two structural reasons. (c) Why is the guide RNA of Cas9, which reads 20 nucleotides by base pairing, easier to reprogram than a zinc-finger array?
::: solution
(a) A unique site needs about 17 bp, so six fingers (18 bp). (b) Fingers are not independent: each contacts bases also read by its neighbour, so the specificity of a finger depends on the next one (context dependence), and the linkers and the DNA must remain in register over almost two helical turns; in addition, binding energy does not scale linearly with length, so a long array can bind tightly even with several mismatches, giving off-target sites. (c) Base pairing follows a simple, essentially context-independent code (A–U, G–C), so the guide is reprogrammed by changing its sequence, whereas a zinc finger's specificity depends on several side chains in a structural context, which must be selected or engineered for each target.
:::
:::

::: exercise Interpreting a riboswitch experiment {level=3}
An mRNA leader of 120 nucleotides contains two mutually exclusive structures: hairpin A, which sequesters the ribosome-binding site, and hairpin B, which leaves it accessible. In-line probing shows that adding the metabolite lysine reduces spontaneous cleavage in a 30-nucleotide region that pairs in A, and translation of a reporter falls 20-fold. A single mutation that disrupts a G·C pair in hairpin A abolishes the effect of lysine; a second mutation restoring a C·G pair at that position restores it. (a) Explain how the switch works. (b) What does the double-mutant experiment show? (c) Why might a cell regulate this gene with RNA rather than a protein repressor?
::: solution
(a) Lysine binds the aptamer of the leader and stabilises a conformation compatible with hairpin A (in-line probing shows reduced flexibility, i.e. structure formation, in the region), which sequesters the ribosome-binding site and represses translation. Without lysine, hairpin B forms and translation proceeds. This is an "off" switch responding to the end product of a pathway — feedback inhibition at the level of the mRNA. (b) The single mutation shows that pairing at that position matters; restoring pairing with the opposite pair (C·G for G·C) restores function, so it is the base pair, not the identity of the nucleotides, that is required — the experimental counterpart of covariation. (c) A riboswitch acts in *cis* without any extra protein, responds directly to the metabolite and requires no additional gene, which is cheap and fast; riboswitches are thought to be ancient and are widespread in bacteria. Transcriptional riboswitches also act co-transcriptionally, on a timescale of seconds.
:::
:::
