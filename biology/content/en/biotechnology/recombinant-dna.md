A gene on its own is inert. To do anything with it — read it, change it, make its protein, move it into another organism — you must first put it into a molecule that a cell will copy, inside a cell that will grow, under conditions in which only the cells that took it up survive. That molecule is a **vector**, the combination is a **recombinant DNA molecule**, and the design of such molecules is the foundation on which every other technique in this course rests.

The enzymes and physical methods themselves — restriction endonucleases, ligase, polymerases, PCR, sequencing, gel electrophoresis — were introduced in [[molecular-biology/molecular-tools]], and this chapter assumes them. What it adds is the engineering layer: how a construct is designed, what each element in it does, what the alternatives are and what they cost, how much DNA you need and how many clones, and why DNA synthesis has gradually displaced the cut-and-paste methods of the 1970s. Expression itself — getting a cell to make a lot of correctly folded protein — is the subject of [[biotechnology/protein-production]]; editing a genome rather than adding to it is [[biotechnology/genome-editing]]; and the containment and oversight within which all of this is done is [[biotechnology/biosafety-ethics]].

## What a construct has to do

Suppose you want *E. coli* to carry a 1.2 kb fragment of a plant gene. Four requirements must all be met at once, and almost every feature of a vector exists to meet one of them.

1. **Replication.** The fragment must be physically joined to a **replicon**: a DNA sequence containing an origin of replication that the host's machinery recognises ([[molecular-biology/dna-replication]]). A fragment introduced on its own is diluted away or degraded within a generation or two.
2. **Selection.** Only a small minority of cells in any transformation take up DNA. A **selectable marker** on the vector — classically an antibiotic-resistance gene — makes growth conditional on carrying the vector, so the rare successes form the whole population you recover.
3. **Insertion.** The vector must have a place to put the fragment that does not destroy the origin or the marker: a **cloning site**, and ideally a cluster of unique restriction sites, the **polylinker** or multiple cloning site.
4. **Screening or expression.** Once you have colonies, you must be able to tell which carry the insert you want (and in which orientation), and if the point is to make a product, the construct must carry the signals that drive transcription and translation of the insert.

::: definition Vector, insert, construct {#def-vector}
A **vector** is a DNA molecule able to replicate in a chosen host and carrying the elements needed to select and maintain it. An **insert** is the DNA fragment joined to it. The resulting molecule is a **recombinant DNA molecule**, and a particular designed version of it is a **construct**. A vector that replicates in two unrelated hosts — say *E. coli* for construction and *Saccharomyces cerevisiae* or a plant cell for use — is a **shuttle vector**, and carries an origin and a marker for each.
:::

::: intuition The vector as a chassis
It helps to think of a vector as a chassis onto which functional modules are bolted: an origin (which determines where and at what copy number it replicates), a marker (which determines how you select it), a cloning site (which determines how you insert DNA), and optionally a promoter, a translation signal, a purification tag, a reporter, or sequences that direct integration into a chromosome. Almost all the vectors in the catalogues are recombinations of a few dozen such modules, and the first question to ask about an unfamiliar plasmid map is which module is doing which of the four jobs above.
:::

## Plasmid vectors

The workhorse vectors for constructing DNA are small circular plasmids of 2–10 kb that replicate in *E. coli*. The lineage descends from natural plasmids: pBR322 (Francisco Bolivar and Raymond Rodriguez, 1977) was built from a ColE1-family replicon with resistance genes for ampicillin and tetracycline, and the pUC series (Joachim Messing and Jeffrey Vieira, 1982) added a high-copy mutant origin, a polylinker and blue–white screening through *lacZ*α-complementation.

Three properties of the origin matter in practice.

- **Copy number.** The ColE1-type origin of pBR322 gives roughly 15–20 copies per cell; the point-mutated version in the pUC plasmids defeats the negative control exerted by the RNA I antisense regulator and gives several hundred. High copy number means more DNA per preparation and more gene product; it also means a larger metabolic **burden** and a greater chance that the construct is lost or rearranged. Low-copy vectors (F-plasmid or P1-derived origins, 1–2 copies) are used when a construct is unstable or its product is toxic to the host.
- **Host range.** An origin works only with the replication proteins that recognise it. ColE1-type origins function in *E. coli* and its close relatives and nowhere else; **broad-host-range** origins such as those of the RK2/IncP and pBBR1 families function across many Gram-negative genera, which matters as soon as the production organism is not *E. coli*.
- **Incompatibility.** Two plasmids that share a replication control system cannot be stably maintained in the same cell: because copy-number control counts both of them, random partitioning at division eventually gives each daughter only one type. Plasmids are therefore grouped into **incompatibility groups**, and a strain that must carry two plasmids needs origins from different groups and different markers.

::: example How much DNA is in a plasmid preparation? {#ex-mass}
Take a 3.0 kb plasmid, and 650 g mol⁻¹ as the mass of a base pair of double-stranded DNA. (a) How many molecules are there in 1 μg? (b) How many moles? (c) A pUC-type plasmid at 500 copies per cell: what fraction of the cell's total DNA is plasmid, if the *E. coli* chromosome is 4.6 Mb? (d) Repeat for a 5 kb plasmid at 20 copies.
::: solution
(a) The molar mass is $3000\times650 = 1.95\times10^{6}$ g mol⁻¹, so

$$
\frac{10^{-6}\ \text{g}}{1.95\times10^{6}\ \text{g mol}^{-1}}\times 6.022\times10^{23}\ \text{mol}^{-1} = 3.1\times10^{11}\ \text{molecules}.
$$

(b) $10^{-6}/1.95\times10^{6} = 5.1\times10^{-13}$ mol, that is **0.51 pmol per μg**. A useful rule: 1 μg of a 1 kb fragment is about 1.5 pmol, and the pmol per μg scales as the reciprocal of the length.

(c) $500\times3000 = 1.5\times10^{6}$ bp of plasmid against $4.6\times10^{6}$ bp of chromosome, so plasmid is $1.5/6.1 = 25$ % of the cell's DNA, or 33 % of the chromosomal amount. This is why a high-copy plasmid noticeably slows growth even before its genes are expressed.

(d) $20\times5000 = 10^{5}$ bp, about 2 % of the chromosome — a negligible replication load.
:::
:::

### Vectors of larger capacity

A plasmid will physically accept an insert of up to about 10–15 kb, beyond which transformation efficiency and stability fall away. Larger inserts need vectors built on different biology, and the choice of capacity is the main consideration when a genome is to be cloned in pieces.

| vector | basis | typical insert | notes |
|---|---|---|---|
| plasmid | ColE1-type replicon | up to ~10 kb | highest transformation efficiency, simplest |
| phage λ replacement vector | λ genome, packaged in vitro into phage particles | 9–23 kb | packaging selects for the right size range |
| cosmid | plasmid with λ *cos* packaging sites | 35–45 kb | packaged like a phage, replicates like a plasmid |
| BAC (bacterial artificial chromosome) | F-plasmid replicon, 1–2 copies | 100–300 kb | stable; the backbone of the public human genome project |
| YAC (yeast artificial chromosome) | yeast centromere, telomeres, *ARS* origin | 200 kb – 2 Mb | largest capacity, but prone to internal rearrangement |

The reason packaging-based vectors have a *lower* as well as an upper limit is instructive: a λ head will only package DNA between roughly 38 and 52 kb, so a replacement vector whose arms total 29 kb accepts inserts of 9–23 kb and nothing else. The physics of the capsid performs the size selection that would otherwise need a gel.

::: proposition Clones needed for a complete library {#prop-clarke-carbon}
Let a genome of length $G$ be cloned as random fragments of mean length $L$, so that each clone contains a fraction $f = L/G$ of the genome. If clones are independent, the probability that a particular sequence is absent from a library of $N$ clones is $(1-f)^N$, and the probability $P$ that it is present is

$$
P = 1 - (1 - f)^{N}, \qquad\text{so}\qquad N = \frac{\ln(1-P)}{\ln(1-f)} .
$$ {#eq-clarke-carbon}

This is the Clarke–Carbon formula (Louise Clarke and John Carbon, 1976). For small $f$ it simplifies to $N \approx -\ln(1-P)/f$: about $3/f$ clones for 95 % coverage and $4.6/f$ for 99 %.

The assumptions matter. Fragments must be generated without sequence bias (partial digestion or mechanical shearing, not complete digestion with one enzyme), each clone must carry exactly one fragment, and every sequence must be equally clonable. Real libraries violate the last assumption: sequences toxic to the host, or unstable in it, are systematically under-represented, and no increase in $N$ recovers them.
:::

::: example Sizing two libraries {#ex-library}
How many clones are needed for a 99 % chance of containing any given human sequence ($G = 3.1\times10^{9}$ bp), (a) in a plasmid library with 5 kb inserts, (b) in a BAC library with 150 kb inserts? (c) How many clones for 99 % coverage of the 4.6 Mb *E. coli* genome with 10 kb inserts?
::: solution
(a) $f = 5\times10^{3}/3.1\times10^{9} = 1.61\times10^{-6}$, so $N = \ln(0.01)/\ln(1 - 1.61\times10^{-6}) = 2.9\times10^{6}$ clones.

(b) $f = 1.5\times10^{5}/3.1\times10^{9} = 4.84\times10^{-5}$, giving $N = 9.5\times10^{4}$ clones — thirty times fewer, which is the whole reason BACs were built. At one 384-well plate per 384 clones, that is about 250 plates, a manageable physical archive; three million plasmid clones would not be.

(c) $f = 10^{4}/4.6\times10^{6} = 2.17\times10^{-3}$ and $N = 2116$ clones: a few plates.
:::
:::

::: widget plot
f: 1-(1-1.613e-6)^(10^x); 1-(1-1.29e-5)^(10^x); 1-(1-4.839e-5)^(10^x)
x: 3, 7
y: 0, 1.05
labels: 5\text{ kb inserts}; 40\text{ kb}; 150\text{ kb}
hlines: 0.95; 0.99
caption: Library coverage from [[#eq-clarke-carbon]]: the probability that a given human sequence is present, against the number of clones on a logarithmic scale ($x = \log_{10} N$), for three insert sizes. Hover to read values. Notice that each curve rises from almost nothing to almost one over about one decade of library size, and that the three curves are the same shape shifted sideways — multiplying the insert size by 30 divides the required number of clones by 30. The horizontal lines mark 95 % and 99 % coverage.
:::

Libraries are far less central than they were, because a known sequence is now amplified by PCR or simply synthesised. They remain the method of choice when the sequence is *not* known: a library made from an uncultured environmental sample or an unsequenced organism, screened for a catalytic activity, is still how new enzymes are found ([[genomics/metagenomics]]).

## Joining DNA: four generations of method

### Restriction and ligation

The original method cuts vector and insert with restriction enzymes and joins the compatible ends with DNA ligase. Three refinements make it controllable.

- **Directional cloning.** Cutting both vector and insert with two *different* enzymes, one at each end, gives two non-compatible ends, so the insert can only go in one way round. With a single enzyme, both orientations arise with equal frequency and must be distinguished afterwards.
- **Preventing self-ligation.** A linearised vector can simply reclose on itself, producing colonies with no insert. Removing the 5′ phosphates from the vector's ends makes a vector–vector join impossible (ligase needs a phosphate on one side of each nick), while the insert, which keeps its phosphates, can still be joined at one end on each side.
- **The molar ratio.** Ligation is a bimolecular reaction and the outcome depends on molar, not mass, concentrations. A rough optimum for a single insert is a three-fold molar excess of insert over vector; far higher ratios favour multiple inserts in tandem, and far lower ratios favour empty vector.

::: example Setting up a ligation {#ex-ratio}
You have a 3.0 kb vector and a 1.0 kb insert, and want a 3:1 molar excess of insert over 50 ng of vector. (a) What mass of insert is that? (b) If the number of inserts joining to a given vector molecule were Poisson with mean 1, what fraction of ligated products would have exactly one insert, none, or two or more?
::: solution
(a) 50 ng of a 3.0 kb vector is $50\times10^{-9}/(3000\times650) = 2.56\times10^{-14}$ mol, that is 25.6 fmol. Three times that is 76.9 fmol of insert, which at $1000\times650$ g mol⁻¹ weighs $76.9\times10^{-15}\times6.5\times10^{5} = 5.0\times10^{-8}$ g — **50 ng**. The equal masses are a coincidence of the 3:1 ratio with the 3:1 length ratio, and it is worth noticing how easily such a coincidence hides an error: always convert to moles.

(b) With $\lambda = 1$, the Poisson probabilities are $e^{-1} = 0.368$ for none, $e^{-1} = 0.368$ for one, and $1 - 2e^{-1} = 0.264$ for two or more. Even at a well-chosen ratio, a third of the products are empty vector and a quarter carry tandem inserts, which is why every candidate clone is checked by diagnostic digest or sequencing. (The Poisson assumption is an idealisation: ligation products are built up stepwise and the real distribution depends on concentrations and on time.)
:::
:::

::: widget distribution
dist: poisson
params: lambda=1
a: 1
b: 1
caption: The idealised distribution of the number of inserts joined to one vector molecule, treated as Poisson with mean $\lambda$ set by the insert-to-vector molar ratio. The shaded bar is exactly one insert. Move the $\lambda$ slider: no value gives more than about 37 % single inserts, and raising $\lambda$ to suppress empty vectors raises tandem inserts faster. Screening, not optimisation of the ratio, is what actually finds the right clone.
:::

::: warning Compatible ends are not the same as a regenerated site
Two enzymes can leave identical overhangs without producing a junction either of them can cut again: EcoRI (`G^AATTC`) and MfeI (`C^AATTG`) both leave a 5′-`AATT` overhang, but the hybrid junction reads `GAATTG`, which is neither recognition sequence. Conversely, a junction may be recut even when the insert came from elsewhere. Before relying on a diagnostic digest, write out the sequence of the junction you expect and check it; do not reason from overhang identity alone.
:::

### Type IIS assembly and overlap assembly

Two later methods removed most of the awkwardness.

**Golden Gate assembly** uses a type IIS enzyme such as BsaI, which recognises an asymmetric site but cuts a fixed distance away from it, outside the site. Because the cut is displaced, the overhang sequence is whatever the designer puts there, and the recognition site lies in the discarded fragment: the junction contains no enzyme site, so cutting and joining can proceed in one tube at the same time, with the fully assembled product the only species that cannot be re-cut. Choosing a set of four-base overhangs that do not cross-react lets a dozen fragments assemble in a defined order in a single reaction.

**Overlap-dependent assembly** — Gibson assembly (Daniel Gibson and colleagues, 2009) and its relatives — dispenses with restriction enzymes entirely. Fragments are made with 20–40 bp of identical sequence at the ends that are to be joined, usually added by PCR primers. An exonuclease chews back one strand to expose long single-stranded overhangs, these anneal because they are complementary, a polymerase fills the gaps and a ligase seals them. Any sequence can be joined to any other at any point, in any number of pieces.

The practical consequence is a change in what constrains design. Under restriction cloning, the available unique sites dictated the construct, and sites inside an insert had to be avoided or destroyed; the vector's polylinker was its most important feature. Under overlap assembly, the designer specifies junctions freely and the sequence is whatever was asked for. This is the single biggest reason that construct design became a computational rather than a manual activity.

### DNA synthesis

The last step is to stop copying natural DNA at all. **Phosphoramidite chemistry** (Marvin Caruthers, 1981) builds an oligonucleotide one base at a time on a solid support, with each cycle coupling, oxidising and deprotecting. The chemistry is extremely good but not perfect, and because the yields multiply, length is limited by the stepwise efficiency.

::: proposition Yield and fidelity of synthetic DNA {#prop-synthesis}
If each coupling step adds the correct base with probability $y$ (the **stepwise yield**), the fraction of full-length product after $n$ couplings is $y^{\,n}$. For $y = 0.995$, a 60-mer ($n = 59$) is $0.995^{59} = 74$ % full length; at $y = 0.99$ it is 55 %. Failures accumulate as truncated and deletion-containing by-products, which is why synthetic oligonucleotides are limited to roughly 150–200 nucleotides and longer sequences are assembled from them.

If an assembled synthetic gene contains errors at a rate $e$ per base, the probability that a given clone is error-free over a length $L$ is

$$
P_\mathrm{correct} = (1-e)^{L} \approx e^{-eL} .
$$ {#eq-synth-error}

At $e = 5\times10^{-4}$ (about one error per 2 kb, typical of unenriched assembly from oligonucleotides) a 1.5 kb gene is correct in only $(1-5\times10^{-4})^{1500} = 47$ % of clones, and a 3 kb gene in 22 %. Error correction by enzymatic mismatch removal, or simply sequencing several clones, brings the usable fraction up; either way, **every synthetic construct is verified by sequencing** before use.
:::

Costs have fallen by orders of magnitude: synthesis of a gene cost of the order of dollars per base in the early 2000s and, as of 2026, commercial list prices for routine sequences are of the order of cents per base, with surcharges for high or low GC content, long repeats and strong secondary structure. The practical effect is that for a construct of a few kilobases the design is now more expensive than the DNA.

Because the sequence is being written rather than copied, it can be changed at no cost:

- **Codon choice.** The genetic code is redundant, and the preferred synonymous codons differ between organisms, broadly tracking the abundance of the corresponding tRNAs. Rewriting a gene in the host's preferred codons often raises expression substantially, though the relationship is not simple: codon choice also affects mRNA secondary structure, mRNA stability and the local rate of translation, which can matter for folding.
- **Removing and adding sites.** Internal restriction sites that would interfere with later cloning are removed synonymously; desired sites are added.
- **Repeats and structure.** Direct repeats invite recombination and loss; strong hairpins near the start of a gene impede ribosome binding. Both can be designed out.

::: warning Codon optimisation is not a guarantee
"Optimised" usually means recoding every position to the single most frequent codon of the host. This maximises one quantity, not expression. It can create new hairpins, destroy regulatory signals that overlap the coding sequence, deplete particular charged tRNA pools when the gene is highly expressed, and speed translation past a point where a domain needs time to fold. Reported results range from large improvements to none to a loss of soluble protein, and the honest position is that codon choice is one variable to test among several, not a solved problem.
:::

## Getting constructs into cells

::: definition Transformation and transformation efficiency {#def-transformation}
**Transformation** is the uptake of naked DNA by a cell. Laboratory *E. coli* is not naturally competent; competence is induced either chemically (treatment with divalent cations and a heat pulse, after Morton Mandel and Akiko Higa, 1970) or by **electroporation**, in which a brief high-voltage pulse transiently permeabilises the membrane. **Transformation efficiency** is quoted as colony-forming units per microgram of DNA (cfu μg⁻¹) using a small supercoiled plasmid. Chemically competent cells reach $10^{6}$–$10^{8}$ cfu μg⁻¹; electroporation reaches $10^{9}$–$10^{10}$. Efficiency falls steeply with insert size, which is a second reason large-insert libraries use packaging or electroporation rather than chemical uptake.

Related terms: **transfection** is the equivalent for animal cells in culture, **transduction** is delivery by a virus, **conjugation** is plasmid transfer through direct contact between bacteria, and **transformation** in plant work usually means Agrobacterium-mediated or ballistic delivery ([[biotechnology/agricultural-biotechnology]]).
:::

::: example Will the experiment work? {#ex-transformation}
A ligation containing about 1 ng of correctly assembled recombinant plasmid is transformed into cells of quoted efficiency $10^{6}$ cfu μg⁻¹, and one tenth of the outgrowth is plated. (a) How many colonies do you expect? (b) The plate is empty. Which of the four requirements of §1 would you check first, and what controls distinguish them?
::: solution
(a) 1 ng is $10^{-3}$ μg, so $10^{3}$ cfu in total, of which one tenth is plated: about **100 colonies**. The calculation is worth doing in advance, because it shows at once whether the experiment has any margin: with efficiency $10^{6}$ and 1 ng, a ten-fold loss anywhere leaves ten colonies, and a hundred-fold loss leaves none.

(b) The possibilities separate cleanly with three controls. Transform a known intact plasmid to test the cells and the selection (if that plate is also empty, the competent cells or the antibiotic plate is at fault, not the construct). Plate the ligation without antibiotic to confirm the cells are alive. Plate a vector-only ligation: colonies there but none with insert point to the joining reaction, not to uptake. Only when all three behave does it make sense to suspect the construct itself — for instance that its product is toxic to the host, in which case a lower-copy origin or a tightly repressed promoter is the usual remedy.
:::
:::

### Verifying what you built

A colony that grows on selective medium has *some* plasmid, not necessarily yours. Verification proceeds from cheap to definitive: a **diagnostic digest**, whose predicted fragment sizes depend on the insert and its orientation; **colony PCR** with one primer in the vector and one in the insert, which tests orientation directly; and **sequencing** of the insert and both junctions, which is the only step that detects point mutations, small indels from PCR, and misassembly. For any construct that will be used quantitatively, sequence the whole plasmid: whole-plasmid sequencing is now cheap enough that there is no reason not to.

::: quiz
You clone a 1.0 kb fragment into a vector using a single enzyme at one site. A diagnostic digest with an enzyme that cuts once in the vector and once asymmetrically inside the insert gives, in different colonies, either 3.2 + 0.8 kb or 2.6 + 1.4 kb. What is the best interpretation?
- [ ] Two different inserts were cloned.
- [x] The same insert in the two possible orientations.
- [ ] One colony has a tandem double insert.
- [ ] One colony has an empty vector.
::: solution
Both patterns total 4.0 kb, the expected size of vector plus one insert, so neither is empty vector (3.0 kb) nor a tandem (5.0 kb). Cloning with a single enzyme gives both orientations with roughly equal frequency; flipping the insert moves the asymmetric internal site relative to the vector site, changing the two fragment sizes while their sum is unchanged. Which pattern corresponds to which orientation is fixed by calculating the distances from the map. Cutting with two different enzymes in the first place would have avoided the ambiguity.
:::
:::

## Expression elements, in outline

If the construct is to make a product rather than merely store DNA, the insert must be flanked by signals the host can use. The elements are the subject of the next chapter, but the vocabulary belongs here, because it is what a vector catalogue entry consists of:

- a **promoter**, which sets the transcription rate and whether it is constitutive or inducible ([[molecular-biology/bacterial-gene-regulation]]);
- a **ribosome binding site** — in bacteria a Shine–Dalgarno sequence positioned a few bases before the start codon, in eukaryotes the sequence context around the first AUG;
- a **terminator**, which stops transcription and in eukaryotes directs polyadenylation ([[molecular-biology/rna-processing]]);
- optionally an **affinity tag** (a short peptide or small protein fused to the product to allow purification), a **signal sequence** directing secretion, a **protease site** for removing the tag, and a **reporter** such as GFP.

A construct is therefore a sequence of modules with defined interfaces, which is exactly the observation that synthetic biology set out to formalise ([[biotechnology/synthetic-biology]]).

::: application Why *E. coli* is still the default, and when it is not
*E. coli* K-12 derivatives dominate construction work for reasons that have little to do with the final application: they double in 20–30 min on cheap medium, take up DNA at high efficiency, are genetically well characterised, come in strains engineered to remove restriction and recombination systems and to stabilise repeats, and — importantly for oversight — are disabled laboratory strains that do not survive in the environment or colonise people, so most work with them sits at the lowest containment level. Constructs are therefore almost always *built* in *E. coli* and then moved, by shuttle vector or by transfer of a verified sequence, into whatever host will actually be used: *S. cerevisiae* or *Pichia pastoris* for secreted eukaryotic proteins, *Bacillus subtilis* for secreted enzymes, CHO cells for glycosylated therapeutic proteins, *Agrobacterium* for plants, insect cells for large multi-subunit proteins. Each has its own origins, markers and promoters, which is what makes the four requirements of §1 worth stating abstractly.
:::

::: history
The route from the first recombinant molecule to a routine technique took about a decade. In 1972 David Jackson, Robert Symons and Paul Berg joined SV40 and λ DNA in vitro. In 1973 Stanley Cohen, Annie Chang, Herbert Boyer and Robert Helling cut and rejoined plasmids with EcoRI and recovered recombinants that replicated in *E. coli* and expressed the markers of both parents. The speed of this development alarmed the people doing it: Berg and others called for a voluntary moratorium in 1974, and the Asilomar conference of February 1975 agreed to resume under containment matched to assessed risk, a scheme codified in the US National Institutes of Health guidelines of 1976 and still recognisable in biosafety regulation today ([[biotechnology/biosafety-ethics]]). The engineering followed: pBR322 (Bolivar and Rodriguez, 1977) was the first purpose-built cloning vector, Clarke and Carbon had formalised library sizing in 1976, Caruthers established phosphoramidite oligonucleotide synthesis in 1981, the pUC plasmids (Messing and Vieira, 1982) added high copy number and blue–white screening, Mullis's PCR (1983) removed the need to clone in order to obtain a fragment, BACs (Hiroaki Shizuya and Melvin Simon, 1992) made the human genome project's physical maps possible, and Gibson assembly (2009) made junctions arbitrary. The first synthetic bacterial genome, 1.08 Mb assembled from synthesised fragments and transplanted into a recipient cell, was reported by Daniel Gibson and colleagues in 2010.
:::

::: summary
- A construct must satisfy four requirements at once: replication (an origin the host recognises), selection (a marker), insertion (a cloning site) and screening or expression. Nearly every vector element exists to serve one of them.
- Plasmid origins set copy number (15–20 for ColE1-type, several hundred for pUC-type, 1–2 for F-based), host range and incompatibility group. High copy number gives more DNA and more product, at the price of burden and instability.
- Capacity rises from ~10 kb (plasmid) through 35–45 kb (cosmid) and 100–300 kb (BAC) to megabases (YAC). Packaging-based vectors have a lower size limit as well as an upper one.
- A library needs $N = \ln(1-P)/\ln(1-f)$ clones for coverage probability $P$ with insert fraction $f = L/G$ ([[#eq-clarke-carbon]]); about $4.6/f$ for 99 %. Unclonable sequences are not rescued by larger $N$.
- Joining methods progressed from restriction–ligation (constrained by available sites; use two enzymes for direction, dephosphorylation against self-ligation, a ~3:1 molar excess of insert) through type IIS Golden Gate and overlap-based Gibson assembly, which make junctions arbitrary.
- Synthetic DNA: full-length fraction is $y^{\,n}$ in the stepwise yield, so oligonucleotides stop at 150–200 nt; an assembled gene is error-free in $(1-e)^L$ of clones ([[#eq-synth-error]]), so constructs are always sequence-verified. Writing rather than copying DNA allows codon changes and the removal of sites, repeats and structure — none of which is guaranteed to raise expression.
- Transformation efficiency ($10^{6}$–$10^{8}$ cfu μg⁻¹ chemically, $10^{9}$–$10^{10}$ by electroporation) determines whether an experiment has any margin; calculate the expected number of colonies before doing it, and design controls that separate the four requirements.
:::

## Exercises

::: exercise Moles from mass {level=1 check="0.31"}
How many picomoles are there in 200 ng of a 1.0 kb double-stranded DNA fragment? Take 650 g mol⁻¹ per base pair and give the answer to two decimal places.
::: solution
The molar mass is $1000\times650 = 6.5\times10^{5}$ g mol⁻¹, so $200\times10^{-9}/6.5\times10^{5} = 3.08\times10^{-13}$ mol $= 0.31$ pmol.
:::
:::

::: exercise Library size {level=1 check="92000"}
A genome of $3.0\times10^{9}$ bp is cloned as 150 kb inserts. How many clones give a 99 % chance that a given sequence is present? Use the small-$f$ approximation and give the answer to two significant figures.
::: solution
$f = 1.5\times10^{5}/3.0\times10^{9} = 5.0\times10^{-5}$, so $N \approx \ln(1/0.01)/f = 4.605/5.0\times10^{-5} = 9.2\times10^{4}$ clones. The exact formula [[#eq-clarke-carbon]] gives $9.21\times10^{4}$: at this small $f$ the approximation is accurate to better than 0.01 %.
:::
:::

::: exercise Choosing an origin {level=1}
You are expressing a protein that is mildly toxic to *E. coli*, and colonies that do appear grow slowly and lose the construct on subculture. Which of the following would you change first, and why: the origin, the marker, the polylinker, or the terminator?
::: solution
The origin. Toxicity combined with loss on subculture is the signature of a construct whose maintenance costs the cell more than losing it, and copy number multiplies both the burden of replicating the plasmid and the dose of the toxic product. Moving to a low-copy origin (and, in parallel, to a tightly repressible promoter) addresses both. The marker affects only selection, and the polylinker and terminator are irrelevant to the symptom.
:::
:::

::: exercise Directional cloning {level=2}
A polylinker contains, in order, sites for EcoRI, BamHI, SalI and PstI. Your insert is flanked by a BamHI site on the left and a SalI site on the right, but it also contains an internal SalI site 200 bp from its right end. (a) Can you clone it directionally with BamHI and SalI? (b) Give two ways to proceed. (c) What would you check in the finished construct?
::: solution
(a) Not as it stands: cutting with SalI would cleave the insert at the internal site as well, and the fragment ligated would be the piece between the BamHI site and the internal SalI site, losing the last 200 bp.

(b) Either re-amplify the insert by PCR with primers adding a BamHI site on the left and a *different* enzyme's site — PstI, which is in the polylinker downstream of SalI — on the right, and clone BamHI–PstI; or abandon restriction cloning and use overlap assembly, designing 25–30 bp homology arms matching the vector at the two junctions, which makes internal sites irrelevant. The second is now the usual answer.

(c) A diagnostic digest confirming overall size and orientation, and sequencing of both junctions and the whole insert — PCR-based approaches introduce the polymerase's errors into the very fragment you are cloning, so the insert cannot be assumed correct just because the ends are.
:::
:::

::: exercise Error-free clones {level=2 check="0.74"}
A 600 bp gene is assembled synthetically with an error rate of $5\times10^{-4}$ per base. (a) What fraction of clones is error-free (two decimal places)? (b) How many clones must be sequenced for a 95 % chance that at least one is correct?
::: solution
(a) $(1 - 5\times10^{-4})^{600} = 0.74$.

(b) The chance that all $n$ clones are wrong is $0.26^{n}$, and we need $0.26^{n} \le 0.05$, that is $n \ge \ln 0.05/\ln 0.26 = 2.2$, so **3 clones**. For the 3 kb gene of [[#prop-synthesis]], with 22 % correct, the same calculation gives $n \ge \ln 0.05/\ln 0.78 = 12$ clones — which is why enzymatic error correction becomes worth its cost as constructs get longer.
:::
:::

::: exercise Copy number and gene dosage {level=2}
A reporter gene on a 15-copy plasmid gives 2000 fluorescence units per cell. You move the identical cassette to a 500-copy plasmid and measure 12,000 units per cell, not the 67,000 that proportionality would predict. Give three distinct explanations and say how you would test one of them.
::: solution
Any three of: (i) a shared resource is saturated — RNA polymerase, ribosomes, charged tRNAs or chaperones are finite, so transcription and translation per template fall as templates multiply; (ii) the burden of carrying and replicating 500 copies slows growth, and in a slower-growing cell both the synthesis and the dilution of the reporter change, so per-cell steady-state levels do not scale with copy number; (iii) a regulator encoded on the construct or in the host is titrated differently at high template number (for example a repressor that was in excess at 15 copies is no longer in excess at 500); (iv) measured "copy number" is a population average and plasmid loss or rearrangement means many cells carry fewer copies or inactivated cassettes; (v) the reporter protein itself may be limited by folding or by maturation, saturating the signal.

To test the burden explanation, measure the specific growth rate of both strains and plot reporter per cell against growth rate; to test resource competition, add a second, unrelated highly expressed construct and see whether it depresses the first — a hallmark of shared-resource limitation ([[biotechnology/synthetic-biology]]).
:::
:::

::: exercise Reading a transformation result {level=2}
A ligation gives 240 colonies on the insert plate and 180 on the vector-only control, with equal volumes plated. Of 12 colonies from the insert plate, 3 carry the insert. (a) Is this consistent with the controls? (b) What single change to the ligation would most improve the ratio?
::: solution
(a) Yes, and the numbers are mutually consistent. The vector-only control shows 180 colonies from self-ligation or uncut vector, so of the 240 on the insert plate roughly 180 are expected to be background and about 60, a quarter, to be recombinant — close to the observed 3 in 12.

(b) Remove the 5′ phosphates from the linearised vector, which makes vector–vector joining impossible and should collapse the background. (Checking that the vector is completely cut is the other half of the same answer: uncut supercoiled vector transforms far more efficiently than any ligation product and is a common source of exactly this background.)
:::
:::

::: exercise Why packaging has a lower limit {level=2}
A λ replacement vector has arms totalling 29 kb, and the capsid packages DNA between 38 and 52 kb. (a) What range of insert sizes is clonable? (b) A library made with it contains no clone smaller than the limit even though the digest produced many small fragments. Explain. (c) Compare with a plasmid vector, and say which is preferable for a library of a 40 Mb fungal genome at 99 % coverage.
::: solution
(a) $38 - 29 = 9$ kb to $52 - 29 = 23$ kb.

(b) Molecules below 38 kb in total are not packaged into viable particles at all, so they never become plaques or colonies; the capsid performs a physical size selection on the ligation products, discarding both the empty vector (29 kb, too small) and anything with an oversized insert. This is a genuine advantage: with a plasmid, small inserts and empty vector dominate the product and must be screened out.

(c) For the fungal genome, $f = 1.5\times10^{4}/4\times10^{7} = 3.75\times10^{-4}$ for a 15 kb λ insert, needing $N = 4.605/3.75\times10^{-4} = 1.2\times10^{4}$ clones; a 5 kb plasmid insert gives $f = 1.25\times10^{-4}$ and $N = 3.7\times10^{4}$. λ needs three times fewer clones and gives much less empty-vector background, so it is preferable — though in practice a 40 Mb genome today would be shotgun sequenced rather than cloned at all ([[genomics/sequencing-genomes]]).
:::
:::

::: exercise Designing a synthetic gene {level=3}
You will synthesise a 1.8 kb gene from a thermophilic archaeon for expression in *E. coli*. List five design decisions you would make before ordering the DNA, in each case saying what you are trading off. Then state what you would do if the protein were expressed abundantly but entirely in insoluble aggregates.
::: solution
Reasonable decisions include: (i) **codon usage** — recode towards *E. coli*'s preferences to avoid rare-codon pausing, accepting that this may create new mRNA structure and may be neutral or harmful ([[#prop-synthesis]] and the warning above); (ii) **GC content and local structure** — flatten extremes of GC and remove strong hairpins, particularly in the first 50 nucleotides where they impede ribosome loading, accepting a small cost in synthesis price; (iii) **internal restriction and type IIS sites** — remove synonymously those that would interfere with later assembly, at no cost beyond design time; (iv) **repeats** — break up direct repeats longer than about 20 bp, which are both hard to synthesise and prone to recombination in vivo; (v) **flanking sequence** — add the homology arms or overhangs required by the chosen assembly method, and decide now whether to include an affinity tag and at which terminus, since a tag may affect folding and activity; (vi) **what to omit** — a signal sequence from the source organism will not function in *E. coli*.

Abundant insoluble product is the commonest outcome of over-expressing a foreign protein and is addressed in [[biotechnology/protein-production]]: lower the rate of synthesis (weaker promoter, lower inducer, lower temperature), give folding more help (co-expressed chaperones, a solubility-enhancing fusion partner), or change compartment or host. Note that the design above cannot be blamed for it without evidence: a thermophilic protein may simply fold too slowly at 37 °C.
:::
:::

::: exercise Coverage, plates and the cost of a decision {level=3}
A laboratory must build a library of a 1.2 Gb plant genome and screen it by hybridisation for a single gene. BAC clones (150 kb inserts) cost about four times as much per clone to produce and archive as plasmid clones (8 kb inserts). (a) How many clones of each are needed for 99 % coverage? (b) Which is cheaper, and by what factor? (c) Name two considerations that could reverse the decision.
::: solution
(a) BAC: $f = 1.5\times10^{5}/1.2\times10^{9} = 1.25\times10^{-4}$, $N = 4.605/1.25\times10^{-4} = 3.7\times10^{4}$ clones. Plasmid: $f = 6.67\times10^{-6}$, $N = 6.9\times10^{5}$ clones.

(b) The plasmid library needs $6.9\times10^{5}/3.7\times10^{4} = 18.7$ times more clones at one quarter the unit cost, so it costs about 4.7 times more in total. The BAC library wins, and by more than the clone counts alone suggest once the labour of handling 1800 rather than 96 microplates is included.

(c) Possible reversals: if the downstream use needs small inserts (for instance direct sequencing of each clone, or expression screening of individual genes, where a 150 kb insert is useless), the plasmid library may be the only workable one; if the genome is rich in sequences unstable in a low-copy BAC, or if the laboratory lacks the electroporation and handling capability that large-insert work demands, the nominal coverage calculation is beside the point. And for finding one gene of known sequence, neither library is the right tool — PCR, or synthesis from a published sequence, is.
:::
:::

::: exercise An incompatibility problem {level=3}
A strain must carry three constructs at once: a pathway on a medium-copy plasmid, a regulator on a low-copy plasmid, and a reporter. (a) What three properties must the three vectors differ in? (b) Why might you put the reporter into the chromosome instead, and what do you give up? (c) After twenty generations without selection, the pathway plasmid is present in only 40 % of cells. What does this tell you, and what are two ways to address it?
::: solution
(a) Replication origins from different incompatibility groups (otherwise copy-number control counts them together and random partitioning loses one); different selectable markers (otherwise one antibiotic cannot select for all three, and a shared marker also allows recombination between the plasmids); and — a point often forgotten — no long stretches of shared sequence, since homologous regions in common backbone elements recombine and scramble the constructs.

(b) A single chromosomal copy is maintained by the cell's own replication and segregation machinery, needs no antibiotic, imposes almost no burden, and gives uniform copy number across the population, so the reporter measurement is far less noisy. What you give up is the ease of changing it: a chromosomal insertion must be rebuilt rather than retransformed, and the single copy gives a weaker signal, which may matter if the reporter is near the limit of detection.

(c) Loss of 60 % of cells over twenty generations means the plasmid-free cells grow appreciably faster — the construct carries a fitness cost, and without selection the population is taken over by cells that have lost it. (Quantitatively, if the plasmid-free fraction grows by a factor $(1+s)$ per generation relative to the carriers, $0.6/0.4$ after 20 generations from a small initial fraction implies a cost of a few per cent per generation.) Remedies: keep selection on throughout; reduce the burden (lower copy number, weaker promoter, inducible rather than constitutive expression); add a plasmid partitioning system, which converts random into active segregation; or integrate the construct into the chromosome. A cleaner solution couples the construct to a function the cell needs, so that loss is lethal and selection is intrinsic.
:::
:::
