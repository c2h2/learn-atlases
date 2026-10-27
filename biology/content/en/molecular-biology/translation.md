Translation is where the information of nucleic acids becomes the chemistry of proteins. A ribosome reads an mRNA three nucleotides at a time and joins the corresponding amino acids, about twenty per second in a bacterium, making a mistake perhaps once in ten thousand. It does this with molecules that are themselves mostly RNA. The code that relates codons to amino acids is nearly the same in every organism, a strong piece of evidence that all life on Earth shares a common ancestor.

This chapter first establishes the genetic code: how it was cracked, its structure, reading frames and how to translate a sequence by computer. It then follows the molecules: transfer RNAs and the enzymes that charge them, the ribosome, and the initiation, elongation and termination of protein synthesis, with attention to speed, accuracy and energy cost. The chemistry of the peptide bond and of aminoacyl-tRNA formation is in Chemistry Atlas ([Nucleic acids, Translation](/learn/chemistry/lesson.php?c=biochemistry&l=nucleic-acids)). Point mutations and frameshifts are introduced from the geneticist's side in [[genetics/genes-and-mutation]].

## Cracking the code

By the late 1950s it was clear that proteins are made on ribosomes, that their amino-acid sequence is specified by genes, and that some intermediary must carry amino acids to the template. Francis Crick's **adaptor hypothesis** (1955) proposed a small RNA for each amino acid, and the adaptors turned out to be transfer RNAs. How many nucleotides specify one amino acid? Two nucleotides give only $4^2 = 16$ combinations, too few for twenty amino acids, and three give $4^3 = 64$, more than enough.

The first experimental evidence for triplets came from genetics. In 1961 Francis Crick, Leslie Barnett, Sydney Brenner and Richard Watts-Tobin combined acridine-induced frameshift mutations in the *rIIB* gene of phage T4. One or two insertions destroyed function, but three nearby insertions (or three deletions) restored it ([[genetics/genes-and-mutation#ex-frameshift]]). This showed that the code is read from a fixed starting point in non-overlapping groups of three, and that most triplets encode an amino acid, which made the code **degenerate**.

The meaning of the codons came from biochemistry. In 1961 Marshall Nirenberg and Heinrich Matthaei, at the US National Institutes of Health, added synthetic RNAs to an extract of *E. coli* able to make protein. Poly(U) directed the synthesis of polyphenylalanine, so `UUU` encodes Phe. Poly(C) gave polyproline and poly(A) polylysine. Gobind Khorana's group then made RNAs of defined repeating sequence: poly(UC), read as `UCU CUC UCU…`, gave alternating Ser–Leu. In 1964 Nirenberg and Philip Leder found that a trinucleotide alone causes the corresponding aminoacyl-tRNA to bind to ribosomes, which let them assign codons one at a time. By 1966 all 64 codons were assigned. Robert Holley determined the first tRNA sequence, yeast tRNA^Ala^, in 1965. Holley, Khorana and Nirenberg shared the 1968 Nobel Prize in Physiology or Medicine.

::: proposition Properties of the standard genetic code {#prop-code}
1. **Triplet and non-overlapping**: each codon is three nucleotides, read consecutively from a start codon without gaps or overlaps.
2. **Degenerate**: of the 64 codons, 61 are **sense codons** encoding the 20 amino acids and 3 are **stop codons** (`UAA`, `UAG`, `UGA`). Leu, Ser and Arg have 6 codons each; Val, Pro, Thr, Ala and Gly 4; Ile 3; Phe, Tyr, His, Gln, Asn, Lys, Asp, Glu and Cys 2; Met and Trp 1 each. Codons for the same amino acid (**synonymous** codons) usually differ only at the third position.
3. **Start**: `AUG` (Met) is the usual initiation codon; `GUG` and `UUG` sometimes serve in bacteria.
4. **Error-minimising**: codons that differ by one base usually encode the same amino acid or one with similar chemical properties. A point mutation or a misreading is therefore often harmless. In particular, a pyrimidine at the second position goes with hydrophobic amino acids.
5. **Nearly universal**: the same code is used in bacteria, archaea and the nuclear genes of almost all eukaryotes, with a few known variants. In vertebrate mitochondria, `UGA` encodes Trp and `AGA` and `AGG` are not read as Arg. In *Mycoplasma*, `UGA` is Trp. In some ciliates, `UAA` and `UAG` encode Gln.
:::

::: warning "The genetic code is the genome"
The phrase "the genetic code" is often used loosely for an organism's DNA sequence, as in "sequencing someone's genetic code". Strictly, the genetic code is the *dictionary*, the rule relating codons to amino acids, and it is (nearly) the same for every organism. What differs between organisms and individuals is the *text* written with it: the genome sequence. Keeping the two apart avoids confusion. A mutation changes the text, not the code; a variant code, as in mitochondria, changes the dictionary.
:::

### Reading frames and open reading frames

A nucleotide sequence can be read in three **reading frames** on each strand, six in all, depending on where reading starts. Only one, if any, encodes a protein. An **open reading frame** (ORF) is a stretch beginning with a start codon and running to the next in-frame stop codon. Genes are found in genome sequences largely by looking for long ORFs ([[bioinformatics/gene-finding]]), because in random sequence stop codons appear frequently.

::: example How long is an ORF by chance? {#ex-orf}
In random sequence with equal base frequencies, (a) what is the probability that a given codon is a stop codon? (b) What is the mean length of a stretch of codons up to and including the first stop? (c) What is the probability that a random stretch of 100 codons contains no stop? (d) A sequenced bacterial genome contains an ORF of 300 codons. Is it likely to be a real gene?
::: solution
(a) $3/64 = 0.047$.

(b) The number of codons read up to and including the first stop is geometric with success probability $3/64$, with mean $64/3 = 21.3$ codons.

(c) $(61/64)^{100} = 0.0082$.

(d) The probability that a given 300-codon stretch has no stop is $(61/64)^{300} = 5.6\times10^{-7}$. A genome of a few million base pairs has about $10^7$ possible stretches across six frames, so a handful of such ORFs could arise by chance. Real bacterial genomes, however, are not random: their base composition and codon usage deviate, and most long ORFs are real genes. Evidence such as similarity to known proteins, a ribosome-binding site and codon usage typical of the genome settles the question. In high-GC genomes, where stops (A/T-rich) are rarer, long chance ORFs are more common.
:::
:::

```python
# The standard genetic code, six-frame translation and the longest open reading frame
from itertools import product

BASES = "TCAG"
AA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG"
CODE = {"".join(c): aa for c, aa in zip(product(BASES, repeat=3), AA)}   # 64 codons

def revcomp(s):
    return s[::-1].translate(str.maketrans("ACGT", "TGCA"))

def translate(s, frame=0):
    return "".join(CODE[s[i:i+3]] for i in range(frame, len(s) - 2, 3))

def longest_orf(s):
    """Longest ATG...stop on either strand: (length in codons incl. stop, strand, frame, protein)."""
    best = (0, None, None, "")
    for strand, seq in (("+", s), ("-", revcomp(s))):
        for f in range(3):
            prot = translate(seq, f)
            for i, aa in enumerate(prot):
                if aa == "M":
                    j = prot.find("*", i)
                    if j != -1 and j - i + 1 > best[0]:
                        best = (j - i + 1, strand, f, prot[i:j+1])
    return best

counts = {}
for aa in CODE.values():
    counts[aa] = counts.get(aa, 0) + 1
print("sense codons:", 64 - counts["*"], "| stops:", counts["*"])
print("codons per amino acid:", dict(sorted(counts.items(), key=lambda kv: -kv[1])))

dna = "CCATGGCTGAAACCTTCAAGTGGCTGATTGAGTAATCCTTCAGCCATTTAGCCAGG"
for strand, seq in (("+", dna), ("-", revcomp(dna))):
    for f in range(3):
        print(strand, f, translate(seq, f))
print("longest ORF:", longest_orf(dna))
```

The 64-letter string is the standard code written in the order `TTT, TTC, TTA, TTG, TCT, …, GGG`. Output, with `*` for stop:

```
sense codons: 61 | stops: 3
codons per amino acid: {'L': 6, 'S': 6, 'R': 6, 'P': 4, 'T': 4, 'V': 4, 'A': 4, 'G': 4, '*': 3, 'I': 3, 'F': 2, 'Y': 2, 'C': 2, 'H': 2, 'Q': 2, 'N': 2, 'K': 2, 'D': 2, 'E': 2, 'W': 1, 'M': 1}
+ 0 PWLKPSSG*LSNPSAI*P
+ 1 HG*NLQVAD*VILQPFSQ
+ 2 MAETFKWLIE*SFSHLAR
- 0 PG*MAEGLLNQPLEGFSH
- 1 LAKWLKDYSISHLKVSAM
- 2 WLNG*RITQSAT*RFQPW
longest ORF: (11, '+', 2, 'MAETFKWLIE*')
```

The 56 bp sequence was written to contain one short gene, `ATG GCT GAA ACC TTC AAG TGG CTG ATT GAG TAA` in frame +2, which the script finds. Notice that frame −1 has no stop at all over this short stretch, and frame −0 has an `M` with no stop after it: an ORF that runs off the end of the sequence. Short random-looking sequences often contain such fragments, which is why length and other evidence matter in gene finding.

## Transfer RNA and its charging

::: definition Transfer RNA {#def-trna}
A **transfer RNA** is an RNA of about 76 nucleotides (range 70–90). Its secondary structure is a **cloverleaf** of four base-paired stems and three loops, and it folds into an **L-shaped** tertiary structure about 7 nm long (yeast tRNA^Phe^, solved by Alexander Rich, Sung-Hou Kim and colleagues and by Aaron Klug's group in 1974). At one end of the L is the **anticodon**, three nucleotides in the anticodon loop that pair antiparallel with the codon. At the other end is the 3′-terminal sequence `CCA`, whose terminal adenosine carries the amino acid on its 2′- or 3′-OH as an **aminoacyl ester**. tRNAs contain many modified nucleosides, such as pseudouridine, dihydrouridine, inosine and methylated bases.
:::

Because each tRNA must pair with every codon it reads, and there are 61 sense codons, one might expect 61 tRNAs. Crick realised in 1966 that the third codon position, the 3′ end of the codon, pairing with the first (5′) anticodon position, need not follow the Watson–Crick rules strictly. This is the **wobble hypothesis**.

::: proposition Wobble pairing {#prop-wobble}
At the first anticodon position (paired with the third codon position), the following pairs are allowed:

| first anticodon base (5′) | third codon bases read (3′) |
|---|---|
| C | G |
| A | U (rare in nature; A is usually modified to I) |
| G | C, U |
| U | A, G (modified U's restrict or extend this) |
| I (inosine) | U, C, A |

The first two codon positions pair strictly. As a result, a single tRNA can read up to three synonymous codons, and the 61 sense codons can in principle be read by as few as 32 tRNA species (31 for the amino acids plus the initiator tRNA). Vertebrate mitochondria manage with 22, using unmodified U to read all four codons of a family.
:::

**Aminoacyl-tRNA synthetases** attach each amino acid to its tRNAs. Most organisms have twenty, one per amino acid, in two structurally unrelated classes of ten. Each catalyses a two-step reaction. First the amino acid is activated with ATP as an aminoacyl adenylate, releasing pyrophosphate. Then the aminoacyl group is transferred to the tRNA:
$$
\text{aa} + \text{ATP} + \text{tRNA} \rightarrow \text{aa-tRNA} + \text{AMP} + \text{PP}_\text{i}.
$$
The accuracy of translation depends on this step, because the ribosome checks only codon–anticodon pairing, not the amino acid. François Chapeville, Fritz Lipmann, Seymour Benzer and colleagues showed in 1962 that cysteinyl-tRNA^Cys^, chemically converted to alanyl-tRNA^Cys^, inserts alanine at cysteine codons. Once charged, the tRNA is believed. Synthetases recognise their tRNAs through the anticodon and other identity elements, such as a single G·U pair in the acceptor stem of tRNA^Ala^. Some synthetases also **edit**. Isoleucyl-tRNA synthetase, which cannot exclude the smaller valine completely from its activation site, hydrolyses misactivated valine in a second site too small for isoleucine (Alan Fersht's "double sieve"). The resulting error is about 1 in 40,000.

## The ribosome

::: definition Ribosomes {#def-ribosome}
The **ribosome** is a ribonucleoprotein machine made of two subunits. In bacteria the **70S** ribosome (2.5 MDa) consists of a **30S** subunit (16S rRNA, about 1540 nucleotides, and 21 proteins) and a **50S** subunit (23S rRNA, about 2900 nucleotides, 5S rRNA and about 33 proteins). About two-thirds of its mass is RNA. The eukaryotic **80S** ribosome (about 4 MDa in mammals) has a **40S** subunit (18S rRNA, about 33 proteins) and a **60S** subunit (28S, 5.8S and 5S rRNAs, about 47 proteins). The small subunit binds the mRNA and **decodes** it. The large subunit catalyses peptide-bond formation in the **peptidyl transferase centre** and has an **exit tunnel** through which the new chain leaves. tRNAs occupy three sites spanning both subunits: **A** (aminoacyl), **P** (peptidyl) and **E** (exit).
:::

The peptidyl transferase centre is made of RNA. Harry Noller's group (1992) found that the 50S subunit retained peptidyl transferase activity after most of its protein was removed. The decisive evidence came in 2000, when the atomic structure of the 50S subunit of the archaeon *Haloarcula marismortui* (Nenad Ban, Poul Nissen, Jeffrey Hansen, Peter Moore and Thomas Steitz) showed no protein within about 1.8 nm of the active site. The ribosome is a ribozyme. Structures of the 30S subunit (Venki Ramakrishnan's and Ada Yonath's groups, 2000) showed how decoding works. Two adenines of 16S rRNA, A1492 and A1493, flip out and inspect the minor groove of the codon–anticodon helix at the first two positions, where only Watson–Crick geometry fits. Ramakrishnan, Steitz and Yonath shared the 2009 Nobel Prize in Chemistry.

## The steps of protein synthesis

### Initiation

In bacteria, the 30S subunit binds the mRNA at the **ribosome-binding site**. A purine-rich **Shine–Dalgarno sequence** (consensus `AGGAGG`), about 5–10 nucleotides upstream of the start codon, pairs with a pyrimidine-rich sequence at the 3′ end of 16S rRNA (John Shine and Lynn Dalgarno, 1974). This positions the start codon in the P site. The initiator tRNA carries **N-formylmethionine** (fMet-tRNA^fMet^), brought by initiation factor IF2 with GTP, while IF1 and IF3 prevent premature joining of the 50S subunit and help select the start codon. When the 50S subunit joins, IF2 hydrolyses its GTP and the factors leave. Because each start codon has its own ribosome-binding site, bacterial mRNAs can be **polycistronic**, carrying several genes, each initiated independently.

In eukaryotes, initiation uses the cap. The **eIF4F** complex binds the cap: eIF4E binds the m⁷G, eIF4A is an RNA helicase, and eIF4G is a scaffold that also binds the poly(A)-binding protein. It recruits the **43S preinitiation complex**, a 40S subunit carrying eIF1, eIF1A, eIF3, eIF5 and the ternary complex of eIF2·GTP·Met-tRNA~i~. The complex **scans** 5′→3′ along the 5′ untranslated region until it finds an `AUG`, usually the first, in a good context. The optimal context in vertebrates is `GCCRCCAUGG` (Marilyn Kozak, 1986–87), with a purine at −3 and G at +4 most important. Recognition of the AUG triggers GTP hydrolysis by eIF2. eIF5B then joins the 60S subunit. Most eukaryotic mRNAs are therefore effectively monocistronic. Exceptions use **internal ribosome entry sites** (IRESs), structured RNAs, found first in picornaviruses, that recruit ribosomes without a cap. Control of initiation by phosphorylation of eIF2 and by the cap-binding protein's regulators is a major target of regulation ([[molecular-biology/eukaryotic-gene-regulation]]).

### Elongation

Each elongation cycle adds one amino acid. In bacterial terms:

1. **Decoding.** An aminoacyl-tRNA arrives at the A site in a ternary complex with **EF-Tu** and GTP (eEF1A in eukaryotes). If the anticodon pairs correctly with the codon, the decoding centre closes, EF-Tu hydrolyses its GTP and leaves, and the tRNA **accommodates**, swinging its aminoacyl end into the peptidyl transferase centre.
2. **Peptide bond formation.** The α-amino group of the A-site aminoacyl-tRNA attacks the ester carbonyl of the peptidyl-tRNA in the P site. The growing chain is transferred to the A-site tRNA, one residue longer, and the P-site tRNA is left deacylated. The rRNA catalyses this chiefly by positioning the substrates, with the 2′-OH of the P-site tRNA's terminal adenosine taking part in proton transfer.
3. **Translocation.** **EF-G** with GTP (eEF2 in eukaryotes) binds and moves the mRNA and tRNAs by one codon. The peptidyl-tRNA moves into the P site, the deacylated tRNA into the E site, from which it leaves, and the A site is opened for the next codon.

The chain grows from its N-terminus to its C-terminus, and the mRNA is read 5′→3′. These two polarities were established by Howard Dintzis in 1961 with timed labelling of haemoglobin in reticulocytes. Bacterial ribosomes add about 15–20 amino acids per second at 37 °C, and eukaryotic ribosomes a few per second (Alberts, 7th ed.). Many ribosomes translate one mRNA at once, spaced along it as a **polyribosome**, so a single mRNA can make dozens of proteins at once.

::: proposition Energy cost of a peptide bond {#prop-energy}
Each amino acid added to a protein costs four phosphoanhydride bonds:
- **two** in charging the tRNA (ATP → AMP + PP~i~, followed by hydrolysis of PP~i~);
- **one** GTP hydrolysed by EF-Tu in decoding;
- **one** GTP hydrolysed by EF-G in translocation.

Initiation and termination add a few more per protein, and rejected aminoacyl-tRNAs (proofreading) add a little. A protein of $n$ residues therefore costs about $4n$ high-energy phosphate bonds, which makes protein synthesis the largest consumer of energy in a growing bacterial cell.
:::

::: example How many ribosomes does a fast-growing cell need? {#ex-ribosomes}
A fast-growing *E. coli* cell doubles every 20 min and contains about $3\times10^6$ protein molecules with an average length of about 300 residues (order-of-magnitude values, as compiled in the BioNumbers database). (a) How many peptide bonds must the cell make per generation? (b) If each ribosome adds 20 amino acids per second and all ribosomes are active all the time, how many ribosomes are needed? (c) How many high-energy phosphate bonds does this cost per generation? (d) Measured numbers are of the order of 50,000–70,000 ribosomes per cell at this growth rate. What does the comparison suggest?
::: solution
(a) $3\times10^6\times300 = 9\times10^8$ peptide bonds.

(b) One ribosome makes $20\times1200 = 2.4\times10^4$ bonds in 1200 s, so $9\times10^8/2.4\times10^4 \approx 3.8\times10^4$ ribosomes are needed.

(c) From [[#prop-energy]], $4\times9\times10^8 = 3.6\times10^9$ phosphoanhydride bonds per cell per generation.

(d) The measured number is somewhat higher than the minimum, consistent with a fraction of ribosomes being inactive or initiating at any moment. More importantly, ribosomes are themselves mostly protein and RNA that must be made, so fast growth needs a large investment in the translation machinery. That is why ribosomal RNA operons are the most strongly transcribed genes in the cell ([[molecular-biology/transcription#ex-miller]]) and why ribosome content rises in proportion to growth rate.
:::
:::

### Accuracy and kinetic proofreading

A single codon–anticodon pairing step could not, by itself, distinguish a correct tRNA from a near-cognate one (differing at one position) more than about a hundredfold. The free-energy difference between a correct and a mismatched pair is too small. The ribosome reaches an error rate of about $10^{-4}$ per codon by checking twice, using an irreversible step between the two checks.

::: proposition Kinetic proofreading {#prop-proofreading}
Suppose a correct and an incorrect substrate bind a site with the same on-rate but dissociation rates differing by a factor $1/f$ (the incorrect one dissociates faster), where $f = e^{-\Delta\Delta G/RT} < 1$ and $\Delta\Delta G$ is the difference in binding free energy. If the product is made directly from the bound state, the error fraction is at best about $f$. If instead binding is followed by an **irreversible**, energy-consuming step (such as GTP hydrolysis) that creates a new intermediate, from which each substrate can again dissociate before the product is made, the two discrimination steps multiply and the error fraction can fall to about $f^2$. The improvement is paid for in energy, and in time, because some correct substrates are also rejected. (John Hopfield, 1974; Jacques Ninio, 1975.)
:::

In translation the two checks are initial selection of the ternary complex before GTP hydrolysis by EF-Tu, and **proofreading** afterwards, when a near-cognate tRNA that fails to accommodate is rejected. The same principle explains the accuracy of DNA replication, aminoacyl-tRNA synthetases and some signalling processes.

::: example How accurate must translation be? {#ex-accuracy}
(a) With $\Delta\Delta G = 12\ \mathrm{kJ\,mol^{-1}}$ at 37 °C, what are the best error fractions from a single discrimination step and from two steps with proofreading? (b) With an error rate of $10^{-4}$ per codon, what fraction of 300-residue proteins are made without error? Of 1000-residue proteins? Of titin, with about 34,000 residues? (c) Why is a higher error rate tolerated in translation than in replication? (The value of $\Delta\Delta G$ is illustrative.)
::: solution
(a) $f = \exp[-12\,000/(8.314\times310)] = e^{-4.66} = 9.5\times10^{-3}$: about 1 % error in one step. Two steps give $f^2 = 9\times10^{-5}$, close to the observed $10^{-4}$.

(b) $(1 - 10^{-4})^{300} = 0.97$, $(1 - 10^{-4})^{1000} = 0.90$ and $(1 - 10^{-4})^{34\,000} \approx e^{-3.4} = 0.03$. Nearly every titin molecule carries at least one wrong amino acid.

(c) Most substitutions are tolerated, especially those to similar amino acids, which the code's structure makes common. A faulty protein is one of many copies and is diluted and degraded. Errors are not inherited. A higher accuracy would slow translation and cost more energy, so the observed rate is a compromise between speed, cost and accuracy.
:::
:::

::: widget plot
f: (1 - e)^x; (1 - 0.0001)^x
x: 0, 5000
y: 0, 1
sliders: e=0.0005:0.00001:0.002:0.00001
labels: \text{error rate } \varepsilon \text{ per codon (slider)}; \varepsilon = 10^{-4}
caption: The fraction of protein molecules of length $x$ residues made without a single error, $(1 - \varepsilon)^x$, for the error rate on the slider and for the typical $\varepsilon = 10^{-4}$ of [[#ex-accuracy]]. Half of all molecules of about 6900 residues contain an error at $\varepsilon = 10^{-4}$ (beyond the right edge of this plot). Raise $\varepsilon$ to $10^{-3}$, a rate seen with error-inducing antibiotics such as streptomycin, and most proteins longer than a few hundred residues are faulty.
:::

### Termination and recycling

When a stop codon reaches the A site, no tRNA matches it. Instead a **release factor** binds: in bacteria RF1 reads `UAA` and `UAG`, and RF2 reads `UAA` and `UGA`; in eukaryotes a single eRF1 reads all three. Release factors are proteins that mimic the shape of a tRNA. A conserved Gly-Gly-Gln (GGQ) motif reaches into the peptidyl transferase centre and positions a water molecule to hydrolyse the ester bond of the peptidyl-tRNA, releasing the completed chain. The GTPase RF3 (eRF3 in eukaryotes) helps the factors cycle. The ribosome is then split into subunits by ribosome recycling factor and EF-G in bacteria, and by ABCE1 in eukaryotes, ready for another round.

::: example Translating a message {#ex-translate}
An mRNA reads `5'-GGAGGUAACAUAUGUUCCGUAGCUGGUAAGCC-3'`. (a) Find the Shine–Dalgarno sequence and the start codon. (b) Translate the ORF. (c) What is the effect of each of these changes on the protein: `UUC` → `UUU`; `UGG` → `UAG`; deletion of the first `C` of `CGU`?
::: solution
(a) `GGAGG` at the 5′ end is a Shine–Dalgarno sequence; the first `AUG` downstream is at positions 12–14 (counting from 1), with six nucleotides between the end of `GGAGG` and the A of the AUG. (It is preceded by `AUA`, which is not a start codon.)

(b) Reading from the AUG: `AUG UUC CGU AGC UGG UAA` gives Met–Phe–Arg–Ser–Trp–stop.

(c) `UUC` → `UUU` is synonymous (both Phe). `UGG` → `UAG` is nonsense: the protein ends after Ser, losing Trp. Deleting the C of `CGU` gives `AUG UUC GUA GCU GGU AAG CC...`: Met–Phe–Val–Ala–Gly–Lys–… — a frameshift that changes every codon from there on and runs past the original stop until another stop is met in the new frame.
:::
:::

## Variations on the theme

**Expanding the code.** Two further amino acids are inserted by special means. **Selenocysteine**, the "21st amino acid", is found in enzymes such as glutathione peroxidase and is encoded by `UGA`. It is read as selenocysteine only when the mRNA contains a stem-loop, the SECIS element, that recruits a dedicated tRNA and elongation factor. **Pyrrolysine** is encoded by `UAG` in some methanogenic archaea and bacteria. In the laboratory, engineered pairs of synthetase and tRNA that do not cross-react with the host's (**orthogonal** pairs) can insert unnatural amino acids at a reassigned stop codon.

**Recoding.** Some mRNAs instruct the ribosome to depart from the standard rules. In **programmed frameshifting**, a "slippery" sequence followed by a pseudoknot or stem-loop makes a fraction of ribosomes shift back by one nucleotide. Retroviruses such as HIV and coronaviruses use this to make two proteins from one mRNA in a fixed ratio, and the bacterial release factor RF2 regulates its own synthesis by a +1 frameshift.

**Cotranslational events.** As the chain emerges from the exit tunnel, chaperones help it fold, enzymes remove the initiator Met (or the formyl group in bacteria), and in eukaryotes the **signal recognition particle** binds N-terminal signal sequences and delivers ribosome and mRNA to the endoplasmic reticulum, the start of the secretory pathway ([[cell-biology/protein-sorting]]).

::: application Antibiotics that target the ribosome
Differences between bacterial and eukaryotic ribosomes allow many antibiotics to stop bacterial protein synthesis selectively. Their binding sites have been mapped in ribosome structures. **Streptomycin** and other aminoglycosides bind the 30S decoding centre and cause misreading. **Tetracyclines** block aminoacyl-tRNA binding to the A site. **Chloramphenicol** binds the peptidyl transferase centre. **Macrolides** such as erythromycin block the exit tunnel. **Puromycin** mimics the end of an aminoacyl-tRNA, is joined to the growing chain and causes premature release, in all ribosomes, so it is a laboratory tool rather than a drug. Resistance often comes from methylation or mutation of the rRNA at the binding site. Mitochondrial ribosomes, which resemble bacterial ones, are why some of these drugs have side effects. Clinical use and resistance are discussed in [[microbiology/antimicrobials]] and Medicine Atlas.
:::

::: quiz
A tRNA has the anticodon `5'-GAA-3'`. Which codons can it read, by the wobble rules?
- [x] `UUC` and `UUU` (Phe)
- [ ] `GAA` and `GAG` (Glu)
- [ ] `CUU` and `CUC` (Leu)
- [ ] `UUC` only
::: solution
Pair antiparallel: anticodon 5′-G-A-A-3′ pairs with codon 3′-C-U-U-5′, that is, codon `5'-UUC-3'` for Watson–Crick pairing. The first anticodon base, G, can also wobble-pair with U at the third codon position, so `UUU` is read too. Both encode phenylalanine. Writing the codon in the same direction as the anticodon (`GAA`) is the commonest mistake.
:::
:::

::: history
Francis Crick proposed the adaptor hypothesis in 1955 and the wobble hypothesis in 1966. Paul Zamecnik, Mahlon Hoagland and colleagues discovered tRNA and amino-acid activation in 1956–58. In 1961 Marshall Nirenberg and Heinrich Matthaei showed that poly(U) encodes polyphenylalanine, Francis Crick, Leslie Barnett, Sydney Brenner and Richard Watts-Tobin showed that the code is read in triplets, and Howard Dintzis established the N- to C-terminal direction of synthesis. Marshall Nirenberg and Philip Leder's triplet binding assay (1964) and Gobind Khorana's synthetic polymers completed the code by 1966. Robert Holley sequenced the first tRNA in 1965. John Shine and Lynn Dalgarno identified the ribosome-binding sequence in 1974, the year the three-dimensional structure of tRNA was solved, and John Hopfield proposed kinetic proofreading. Nenad Ban, Poul Nissen, Peter Moore, Thomas Steitz and colleagues showed in 2000 that the peptidyl transferase centre is RNA, and the groups of Venki Ramakrishnan and Ada Yonath solved the 30S subunit the same year.
:::

::: summary
- The genetic code is triplet, non-overlapping and degenerate: 61 sense codons for 20 amino acids and 3 stops (`UAA`, `UAG`, `UGA`), with `AUG` as start. It is error-minimising and nearly universal, with variants in mitochondria and a few organisms.
- Each sequence has six reading frames. A stop appears every 21 codons on average in random sequence, so long ORFs indicate genes.
- tRNAs (about 76 nt, cloverleaf and L-shape) carry amino acids on their 3′ `CCA`. Wobble at the third codon position lets about 32 tRNAs read 61 codons.
- Aminoacyl-tRNA synthetases (two classes) charge tRNAs with ATP. The ribosome trusts the charged amino acid, so synthetase accuracy, aided by editing, sets the error floor.
- Ribosomes (70S = 30S + 50S; 80S = 40S + 60S) are ribozymes. The small subunit decodes (A1492/A1493 check codon–anticodon geometry); the large subunit's rRNA forms peptide bonds.
- Initiation: Shine–Dalgarno pairing and fMet-tRNA in bacteria; cap binding, scanning and the Kozak context in eukaryotes. Elongation: EF-Tu delivers aminoacyl-tRNA, peptidyl transfer, EF-G translocates (A → P → E). Termination: release factors with a GGQ motif hydrolyse the peptidyl-tRNA.
- Each peptide bond costs four phosphoanhydride bonds. Accuracy (about $10^{-4}$ per codon) comes from kinetic proofreading: two discrimination steps separated by GTP hydrolysis multiply ($f \to f^2$).
- Selenocysteine and pyrrolysine extend the code by recoding stop codons; programmed frameshifting and IRESs are further departures; many antibiotics act on the bacterial ribosome.
:::

## Exercises

::: exercise Codon counting {level=1 check="61"}
How many sense codons are there in the standard genetic code?
::: solution
$64 - 3 = 61$.
:::
:::

::: exercise Reverse translation {level=1 check="216"}
How many different mRNA coding sequences (excluding the stop codon) could encode the peptide Met–Leu–Ser–Trp–Arg?
::: solution
Multiply the numbers of codons for each residue: Met 1, Leu 6, Ser 6, Trp 1, Arg 6, so $1\times6\times6\times1\times6 = 216$. Degeneracy makes designing a DNA probe from a protein sequence difficult. Probe designers prefer stretches rich in Met and Trp.
:::
:::

::: exercise Energy for a protein {level=1 check="1200"}
Ignoring initiation, termination and proofreading, how many high-energy phosphate bonds are used to make a protein of 300 amino acids?
::: solution
Four per residue: $4\times300 = 1200$. (Strictly, the first residue is not joined by a peptide bond, but its charging costs two; the small corrections are within the neglected initiation costs.)
:::
:::

::: exercise A missense, a nonsense and a frameshift {level=2}
The coding sequence `5'-ATG AAA TGG CTT TAC GGA TAA-3'` encodes a short peptide. (a) Translate it. (b) What single-base substitution in the third codon creates a stop codon, and which stops are possible? (c) Give the effect of inserting a single A after the first codon.
::: solution
(a) Met–Lys–Trp–Leu–Tyr–Gly–stop.

(b) `TGG` → `TAG` (G→A at position 2) or `TGA` (G→A at position 3): both nonsense, truncating the peptide after Lys.

(c) `ATG A AAA TGG CTT TAC GGA TAA` becomes `ATG AAA ATG GCT TTA CGG ATA A..`: Met–Lys–Met–Ala–Leu–Arg–Ile–… — a frameshift; the original stop is no longer in frame.
:::
:::

::: exercise Probability of a long ORF {level=2 check="0.10"}
In random sequence with equal base frequencies, what is the probability that 48 consecutive codons contain no stop codon (two decimal places)?
::: solution
$(61/64)^{48} = 0.100 \approx 0.10$.
:::
:::

::: exercise Minimum tRNAs for a codon family {level=2}
Using the wobble rules of [[#prop-wobble]], what is the minimum number of tRNAs needed to read the four glycine codons `GGU`, `GGC`, `GGA`, `GGG`, and which anticodons would they have? How do vertebrate mitochondria manage with one?
::: solution
Two: an anticodon `5'-GCC-3'` (G at the wobble position reads C and U, so `GGC` and `GGU`) and `5'-UCC-3'` (U reads A and G, so `GGA` and `GGG`). Alternatively `5'-ICC-3'` reads U, C and A, needing a second tRNA only for `GGG`. Vertebrate mitochondria use a single tRNA with an unmodified U at the wobble position, which in that context can pair with all four bases ("superwobble"), reading the whole family.
:::
:::

::: exercise Interpreting a toeprint {level=3}
In a **toeprinting** assay, reverse transcriptase copies an mRNA from a primer annealed downstream; a ribosome bound to the mRNA stops the enzyme about 15–16 nucleotides downstream of the first nucleotide of the codon in its P site, giving a cDNA band. For a bacterial mRNA with its start codon at positions 101–103: (a) with 30S subunits and initiator tRNA, a strong band appears at +16 from A of AUG; with 30S subunits alone, no band. Interpret. (b) A mutant with the Shine–Dalgarno sequence `AGGAGG` changed to `ACCACC` gives no band even with initiator tRNA. Interpret. (c) A compensatory mutation in the 3′ end of 16S rRNA, in a specialised ribosome, restores the band for the mutant mRNA but not the wild type. What does this show?
::: solution
(a) The band at +16 shows a 30S initiation complex with the AUG in the P site; it forms only when initiator tRNA is present to pair with the AUG, so the stable complex requires codon–anticodon pairing in the P site.

(b) Without Shine–Dalgarno pairing, the 30S subunit does not bind stably at this ribosome-binding site, so no initiation complex forms.

(c) A 16S rRNA with a complementary change in its anti-Shine–Dalgarno sequence pairs with the mutant but no longer with the wild-type sequence, restoring binding for the mutant mRNA only. This compensatory-mutation experiment (done by Anna Hui and Herman de Boer in 1987) proves that the Shine–Dalgarno interaction is base pairing between mRNA and 16S rRNA, and such "orthogonal ribosomes" are now used in synthetic biology.
:::
:::

::: exercise Reading data on misincorporation {level=3}
Mass spectrometry of a recombinant protein made in *E. coli* shows that at 0.2 % of its asparagine codons `AAU`, the residue is lysine instead; at `AAC` codons the substitution is rare. Explain using the wobble rules and the structure of the code, and suggest how the expression system could be changed to reduce the error.
::: solution
Lys is encoded by `AAA` and `AAG`; Asn by `AAU` and `AAC`. Misreading of `AAU` as Lys requires a tRNA^Lys^ (anticodon `UUU`, with a modified U at the wobble position) to pair with U at the third codon position — a G·U-like mismatch analogous to a wobble pair, which is relatively tolerated, whereas pairing with C would be a less stable mismatch. If Asn-tRNA (anticodon `GUU`, reading both codons) is limiting — as can happen when a highly expressed recombinant gene has codon usage unlike that of *E. coli* — near-cognate Lys-tRNA competes more successfully for the A site, raising the error. Remedies: use the `AAC` codon throughout the synthetic gene (recode the gene), lower the expression rate, or supplement the host with extra tRNA genes for the limiting codons.
:::
:::
