DNA is the only molecule in the cell that is repaired rather than replaced. A damaged protein or RNA is degraded and made again from the gene. A damaged gene has no backup except the complementary strand and, in a diploid or after replication, a second copy. DNA is also chemically fragile. In water at body temperature it loses bases, its cytosines deaminate, and it is attacked by reactive oxygen species produced by respiration, by alkylating metabolites, and by ultraviolet light and ionising radiation. Tomas Lindahl, who first estimated these rates in the 1970s, concluded that DNA would not survive long enough to carry a genome without continuous repair.

This chapter describes the main repair pathways, organised by the kind of damage they handle. It then turns to the reactions that rearrange DNA deliberately: **homologous recombination**, which repairs broken chromosomes and makes crossovers in meiosis, **site-specific recombination**, and the **transposable elements** that make up nearly half of the human genome. The genetics of mutation, including the fluctuation test and the action of mutagens, is in [[genetics/genes-and-mutation]]. Here we look at mechanism.

## How DNA is damaged

::: definition Spontaneous and induced DNA damage {#def-damage}
- **Depurination** is hydrolysis of the glycosidic bond of a purine, leaving an **abasic** (AP, apurinic/apyrimidinic) site. Depyrimidination is much slower.
- **Deamination** converts cytosine to uracil, adenine to hypoxanthine, guanine to xanthine, and 5-methylcytosine to thymine. Uracil pairs with adenine, so an unrepaired deamination causes a C·G → T·A transition.
- **Oxidation** by reactive oxygen species gives products such as 8-oxoguanine, which pairs with adenine and causes G·C → T·A transversions, as well as strand breaks.
- **Alkylation** adds methyl or ethyl groups, for example 7-methylguanine, 3-methyladenine and the miscoding O⁶-methylguanine.
- **Ultraviolet light** (UV-B and UV-C) joins adjacent pyrimidines on the same strand into **cyclobutane pyrimidine dimers** (CPDs), mostly at TT sites, and **(6-4) photoproducts**. These distort the helix and block polymerases.
- **Ionising radiation** and some chemicals break the sugar–phosphate backbone, giving single-strand breaks and **double-strand breaks** (DSBs). DSBs also arise when replication forks run into nicks.
- **Cross-links** join the two strands (interstrand) or DNA to protein.
:::

The numbers are large. Estimates of the lesions arising per day in a mammalian cell, summarised by Lindahl and Deborah Barnes (2000) and reproduced in Alberts (7th ed.), are of the order of $10^4$ depurinations, a few thousand alkylated and oxidised bases, about 100 cytosine deaminations and about 10 double-strand breaks. Exposure to sunlight adds many thousands of pyrimidine dimers per hour in an exposed skin cell. Almost all of these are repaired, and only a tiny fraction become mutations.

That fraction matters because a lesion becomes a **mutation** only when the damaged strand is replicated before it is repaired, or when it is repaired wrongly. Then the error is copied into both strands and no repair system can tell it from the original sequence. Repair is therefore a race against replication, and many repair pathways are linked to the replication fork and the cell-cycle checkpoints of [[cell-biology/cell-cycle]].

::: intuition Why DNA uses thymine
The deamination of cytosine produces uracil, a base that is not supposed to be in DNA. A uracil in DNA is therefore always an error, and **uracil-DNA glycosylase** can remove every one it finds without asking which strand was damaged. If DNA used uracil in place of thymine, as RNA does, deamination products would be indistinguishable from correct bases and could not be corrected. The methyl group of thymine is in effect a label saying "this U-like base belongs here". The exception proves the rule: deamination of 5-methylcytosine gives thymine, which the cell cannot recognise as foreign, and methylated CpG sites are mutation hotspots ([[genetics/genes-and-mutation]]).
:::

## Direct reversal

Some lesions are simply undone. **Photolyases**, found in bacteria, fungi, plants and many animals but not in placental mammals, use the energy of blue light, captured by a flavin cofactor, to split cyclobutane pyrimidine dimers back into two pyrimidines. This is **photoreactivation**, discovered by Albert Kelner and Renato Dulbecco in 1949 when UV-irradiated bacteria or phages survived better after exposure to visible light. **O⁶-methylguanine-DNA methyltransferase** (MGMT; Ada protein in *E. coli*) transfers the methyl group of O⁶-methylguanine onto one of its own cysteines. The transfer inactivates the protein, so each molecule acts only once; it is called a "suicide" enzyme for this reason.

## Excision repair

Most damage is repaired by cutting out the damaged part of one strand and resynthesising it, using the other strand as a template. The pathways differ in how much they remove and in how they find the damage.

::: definition Base excision repair (BER) {#def-ber}
A **DNA glycosylase** recognises a particular damaged or inappropriate base (uracil, 8-oxoguanine, 3-methyladenine and others), flips it out of the helix into its active site and cleaves the glycosidic bond, leaving an AP site. An **AP endonuclease** (APE1 in humans) cuts the backbone 5′ to the AP site. A polymerase (Pol β in mammals) removes the sugar–phosphate remnant and inserts one nucleotide, and **DNA ligase** seals the nick (*short-patch* BER). Sometimes 2–10 nucleotides are replaced (*long-patch* BER). Spontaneous AP sites enter the pathway at the endonuclease step.
:::

Humans have about a dozen glycosylases, each specialised for a few lesions. They find their targets by sliding along DNA and briefly flipping out bases, which works because a damaged base is usually less stably paired than a normal one. The glycosylase **MutY** (MUTYH in humans) is a special case. It removes the *adenine* mispaired with 8-oxoguanine, the error that arises when a polymerase copies 8-oxoG, giving the cell a second chance to correct the 8-oxoG itself.

::: definition Nucleotide excision repair (NER) {#def-ner}
NER removes bulky, helix-distorting lesions, such as pyrimidine dimers, (6-4) photoproducts and many chemical adducts, by cutting the damaged strand on both sides of the lesion and removing it as an oligonucleotide.
- In *E. coli*, a **UvrA₂UvrB** complex scans DNA for distortion; UvrB verifies the lesion; **UvrC** cuts the damaged strand about 8 nucleotides 5′ and 4–5 nucleotides 3′ to it, releasing an oligonucleotide of 12–13 nucleotides, which helicase II (UvrD) removes. Pol I fills the gap and ligase seals it.
- In eukaryotes, the lesion is recognised by **XPC** (global-genome NER) or by an RNA polymerase stalled at it (transcription-coupled NER). The helicases of **TFIIH** (also a transcription factor, [[molecular-biology/transcription]]) open a bubble of about 25–30 nucleotides, and the nucleases **XPG** (3′ side) and **XPF–ERCC1** (5′ side) excise an oligonucleotide of about 24–32 nucleotides.
:::

The human NER genes were identified largely through the rare recessive condition **xeroderma pigmentosum** (XP), in which sensitivity to sunlight and a greatly raised incidence of skin cancer result from defects in any of seven complementation groups (XPA to XPG). James Cleaver showed in 1968 that XP cells cannot perform the repair synthesis that follows UV irradiation. A variant form (XP-V) has normal excision but lacks the translesion polymerase η described below. The clinical features of these conditions belong to Medicine Atlas ([/learn/medicine/](/learn/medicine/)). For molecular biology they were a set of human mutants that dissected a pathway, much as auxotrophs dissected metabolism.

**Transcription-coupled repair** shows how repair is targeted where it matters most. Vilhelm Bohr, Philip Hanawalt and colleagues (1985) found that pyrimidine dimers are removed faster from an actively transcribed gene than from the genome as a whole. Isabel Mellon, Graciela Spivak and Hanawalt (1987) then showed that the faster repair is confined to the *template* strand. An RNA polymerase stalled at a lesion recruits the NER machinery (through the Mfd protein in bacteria and the CSB protein in humans), so genes that are being expressed are repaired first.

::: example Excision products tell you the pathway {#ex-excision}
Cells are irradiated with UV, and small DNA fragments released from the chromosome are labelled and run on a sequencing gel. (a) *E. coli* extracts release fragments of 12–13 nucleotides; human cell extracts release a ladder of 24–32 nucleotides. What process is being detected, and why do the sizes differ? (b) A human XPA mutant cell line releases no such fragments. What does that suggest about XPA? (c) The released oligonucleotides from human cells all contain a pyrimidine dimer. Where would you expect it to lie within them?
::: solution
(a) The fragments are the oligonucleotides excised by nucleotide excision repair. Their sizes reflect the positions of the two incisions: UvrC cuts about 8 nt 5′ and 4–5 nt 3′ of the dimer in *E. coli* (12–13 nt in total), whereas the human nucleases cut further away (about 20–24 nt 5′ and 2–8 nt 3′), with some variability, hence the ladder. Aziz Sancar's laboratory characterised both excision patterns using exactly such assays.

(b) XPA is required before or at the incision step: without it, no oligonucleotides are excised. (It is in fact a damage-verification protein needed to assemble the pre-incision complex.)

(c) The 5′ incision is much further from the lesion than the 3′ incision, so the dimer lies near the 3′ end of the excised oligonucleotide, typically 2–8 nucleotides from it.
:::
:::

The sensitivity of cells to UV depends on how much damage they can repair before it kills them. A simple model treats lesions as rare random events, which leads to exponential survival curves.

::: proposition Poisson model of damage {#prop-poisson-damage}
Suppose lesions are formed at random along DNA, at a mean density $\lambda$ per kilobase at a given dose. The number of lesions in a stretch of $L$ kb is then Poisson with mean $\lambda L$, and the probability that the stretch carries **no** lesion is
$$
P_0 = e^{-\lambda L}.
$$ {#eq-poisson-damage}
If a cell is killed by any unrepaired lesion in a "target" of size $L$ and $\lambda$ is proportional to dose $D$, survival falls exponentially with dose, $S = e^{-D/D_0}$, where $D_0$ is the dose giving on average one lethal lesion per cell. A repair-deficient mutant has a smaller $D_0$. The model assumes independent, randomly placed lesions and ignores repair saturation and the cell-to-cell variation that give real survival curves a "shoulder".
:::

::: example Will the gene be transcribed? {#ex-poisson}
A UV dose produces on average 0.05 pyrimidine dimers per kilobase on each strand. (a) What is the probability that the template strand of a 20 kb gene carries no dimer? (b) For a 2 kb gene? (c) What do these numbers imply for the expression of long genes after UV, and why is transcription-coupled repair so useful?
::: solution
(a) $\lambda L = 0.05\times20 = 1$, so $P_0 = e^{-1} = 0.37$. About 63 % of copies of the gene carry at least one dimer on the template strand and will block RNA polymerase.

(b) $\lambda L = 0.1$, $P_0 = e^{-0.1} = 0.90$.

(c) Long genes are disproportionately silenced after UV, because a single lesion anywhere in the template strand blocks a polymerase. Measurements of nascent transcription after UV indeed show recovery spreading from the 5′ ends of genes. Transcription-coupled repair removes lesions from exactly the strand whose damage blocks expression, so it restores transcription long before global repair has cleaned the whole genome.
:::
:::

::: widget plot
f: exp(-x/D1); exp(-x/D2)
x: 0, 40
y: 0, 1
sliders: D1=10:2:30:0.5; D2=2:0.5:10:0.5
labels: \text{repair-proficient}; \text{repair-deficient}
caption: Survival $S = e^{-D/D_0}$ against UV dose (horizontal axis, J m⁻², illustrative) for two strains of [[#prop-poisson-damage]], with $D_0 = D_1$ and $D_2$ set by the sliders. A repair-deficient mutant, such as a *uvrA* strain of *E. coli* or an XP cell line, has a much smaller $D_0$ and survival collapses at doses the wild type barely notices. Read off the dose giving 10 % survival ($D = 2.3\,D_0$) for each. Real survival curves often have a shoulder at low dose, which this one-hit model leaves out.
:::

## Mismatch repair

Replication errors are base mismatches in otherwise undamaged DNA. Neither base of a G·T mismatch is chemically abnormal. To correct it properly, the cell must know which strand is new, since that strand carries the error.

::: definition Strand-directed mismatch repair {#def-mmr}
In *E. coli*, **MutS** binds a mismatch or a small insertion–deletion loop, and recruits **MutL**. MutL activates **MutH**, an endonuclease that nicks the *unmethylated* strand at a nearby hemimethylated `GATC` site, which may be up to about 1 kb away on either side. Just after replication, the Dam methylase has not yet methylated adenine in `GATC` on the new strand, so methylation marks the old strand. Helicase II (UvrD) and an exonuclease remove the new strand from the nick to just past the mismatch, Pol III resynthesises it, and ligase seals it. In eukaryotes, MutS homologues (MSH2–MSH6 for mismatches, MSH2–MSH3 for larger loops) and MutL homologues (MLH1–PMS2) act similarly. They have no MutH; the new strand is identified by the nicks between Okazaki fragments, the free 3′ end of the leading strand and the orientation of PCNA, which MutLα uses to nick the new strand itself.
:::

Matthew Meselson and colleagues showed in the 1970s, by transfecting *E. coli* with heteroduplex phage λ DNA methylated on one strand only, that mismatches are corrected in favour of the methylated strand. Paul Modrich reconstituted the reaction with purified proteins in 1989. Mismatch repair also suppresses recombination between sequences that are similar but not identical (**homeologous** recombination), because MutS recognises the mismatches in the heteroduplex intermediates. Inherited defects in human *MSH2* or *MLH1* cause a predisposition to colorectal and other cancers (Lynch syndrome), discussed in Medicine Atlas. Tumours lacking mismatch repair accumulate changes in the lengths of short repeats, **microsatellite instability**, because slipped-strand loops formed in replication of repeats are no longer removed.

::: example How far is the nearest GATC? {#ex-gatc}
(a) In a random sequence with equal base frequencies, how often does the 4 bp sequence `GATC` occur? How many would you expect in the $4.64\times10^6$ bp *E. coli* genome? (b) MutH can act from a `GATC` up to about 1 kb from the mismatch. Using a Poisson model, what is the probability that a mismatch has no `GATC` within 1 kb on either side?
::: solution
(a) The probability of `GATC` starting at a given position is $(1/4)^4 = 1/256$. `GATC` is its own reverse complement, so each site is counted once for the duplex: $4.64\times10^6/256 \approx 1.8\times10^4$ sites are expected, and the sequenced genome has about this many.

(b) Within 1 kb on either side, a 2 kb window, the expected number of sites is $2000/256 = 7.8$. The probability of none is $e^{-7.8} = 4\times10^{-4}$. Almost every mismatch has a usable site nearby; the Poisson model is crude (sites are not perfectly random), but the conclusion that the strand signal is rarely limiting holds.
:::
:::

## Tolerating damage: translesion synthesis

When a replication fork meets a lesion that has not been repaired, the replicative polymerase stalls, because its tight active site cannot accommodate a distorted template. Cells have **translesion (TLS) polymerases**, mostly of the Y family, with roomier active sites that can insert nucleotides opposite damaged bases. In eukaryotes, monoubiquitination of PCNA at Lys164 at a stalled fork recruits them. They have no proofreading and low fidelity on undamaged DNA, so they are used only for a few nucleotides before handing back to the replicative polymerase. Some are accurate on their cognate lesion. **Pol η** inserts two adenines opposite a thymine–thymine dimer, copying it correctly, which is why people lacking Pol η (XP variant) are sensitive to sunlight. Others are mutagenic. This is **damage tolerance**: the lesion stays in the DNA, to be repaired later, but replication can finish.

In *E. coli*, extensive damage induces the **SOS response**. Single-stranded DNA at stalled forks activates RecA, which stimulates self-cleavage of the repressor **LexA**. More than 40 genes are de-repressed, including the excision repair genes *uvrA* and *uvrB*, the cell-division inhibitor SulA and, late in the response, the error-prone Pol V (UmuD′₂C). Most UV-induced mutagenesis in *E. coli* depends on Pol V. Mutation under stress is thus partly a regulated process. The *rate* of mutation rises, but which mutations occur is still not directed towards useful ones (compare [[genetics/genes-and-mutation]]).

## Double-strand breaks

A double-strand break is the most dangerous lesion, because no intact template strand remains at the site. Unrepaired breaks lead to the loss of chromosome arms, and wrongly joined breaks to translocations ([[genetics/chromosome-mutations]]). Cells have two main ways of mending them.

::: definition Non-homologous end joining (NHEJ) {#def-nhej}
In **non-homologous end joining** the **Ku70–Ku80** heterodimer binds the broken ends, recruits the kinase DNA-PKcs, and holds the ends together. Nucleases (such as Artemis) and polymerases trim or fill the ends until they can be joined, and the **XRCC4–DNA ligase IV** complex ligates them. No template is used, so a few base pairs are often lost or added at the junction. NHEJ works throughout the cell cycle and is the main pathway in G1 in mammalian cells.
:::

::: definition Homologous recombination (HR) repair of a double-strand break {#def-hr}
In **homologous recombination**, the break is repaired using an intact homologous sequence, usually the sister chromatid in S and G2 phases, as template.
1. **Resection**: nucleases (the MRN complex with CtIP, then Exo1 or Dna2; RecBCD in *E. coli*) degrade the 5′-ended strands, leaving long 3′ single-stranded tails.
2. **Filament formation**: RPA coats the tails and is replaced by the strand-exchange protein **Rad51** (RecA in bacteria), with the help of mediators such as BRCA2, forming a helical nucleoprotein filament.
3. **Homology search and strand invasion**: the filament searches for a matching duplex, invades it, and pairs the 3′ tail with the complementary strand, displacing the other strand as a **D-loop**.
4. **Synthesis**: a polymerase extends the invading 3′ end, copying the template.
5. **Resolution**, by one of two routes. In **synthesis-dependent strand annealing** (SDSA) the extended strand is released and anneals with the other end of the break, giving no crossover. In the **double-strand-break repair** (DSBR) model, the second end is captured, forming a **double Holliday junction**. Cutting the junctions by resolvases gives crossover or non-crossover products, and dissolution by a helicase–topoisomerase complex gives only non-crossovers.
:::

The **Holliday junction**, a four-way branched structure in which two duplexes exchange strands, was proposed by Robin Holliday in 1964 to explain gene conversion in fungi. The DSB repair model was proposed by Jack Szostak, Terry Orr-Weaver, Rodney Rothstein and Franklin Stahl in 1983, after experiments in yeast showed that a double-strand gap in a plasmid could be repaired by copying from the chromosome. In bacteria, RecBCD both resects and recognises the **Chi** sequence `5'-GCTGGTGG-3'`, which switches its activity so that it loads RecA on a 3′ tail ending near Chi. Chi occurs about once every 5 kb in the *E. coli* chromosome, far more often than chance predicts for an 8-mer (once in $4^8 = 65\,536$ bp).

HR is accurate when the template is the sister chromatid, but it can cause genomic change when it uses a different template. Using the homologous chromosome can cause **loss of heterozygosity**. Using a related sequence elsewhere, such as a repeated gene or a transposon copy, can cause deletions, duplications and translocations.

::: warning "NHEJ is error-prone, so cells use it only when they must"
NHEJ is often described as a sloppy last resort. In fact it is fast and usually accurate when the broken ends are clean and compatible, and it is the dominant pathway in G1 mammalian cells, which have no sister chromatid to copy. Most inaccuracy arises when ends are damaged and must be processed. Cells also use NHEJ deliberately: the V(D)J recombination that assembles antibody and T-cell receptor genes in vertebrate lymphocytes joins programmed breaks by NHEJ, and the junctional diversity it creates is an important part of the immune repertoire. Which pathway is used depends on the cell-cycle phase (CDK activity promotes resection and so HR) and on the chromatin at the break.
:::

### Recombination in meiosis

Meiotic crossing over, which produces the recombinant chromosomes mapped in [[genetics/linkage-mapping]], is double-strand-break repair under special rules. The topoisomerase-like protein **Spo11** makes hundreds of programmed breaks per meiosis, about 200–300 in mouse spermatocytes, at **hotspots**, positioned in humans and mice largely by the histone methyltransferase PRDM9. The breaks are repaired by HR using the *homologous chromosome* rather than the sister, and a regulated subset, about one or two per chromosome arm, are resolved as crossovers. The rest become non-crossovers. Crossovers are needed to hold homologues together until anaphase I ([[genetics/chromosomes-meiosis]]).

Recombination leaves a molecular trace. Where heteroduplex DNA spans a site at which the two parents differ, the mismatch is corrected towards one parent or the other. This produces **gene conversion**: in a fungal ascus, a locus segregating $A$ and $a$ gives 6:2 or 2:6 (or, without correction, 5:3) instead of 4:4, independently of whether flanking markers recombine.

::: example Gene conversion in tetrads {#ex-conversion}
In a cross $A\,b\,C \times a\,b'\,c$ in an ascomycete with ordered octads, 2000 asci are scored for the central locus ($b/b'$). 1970 show 4:4 segregation; 18 show 6:2 or 2:6; 12 show 5:3 or 3:5. Among the 30 aberrant asci, 14 have recombined the flanking markers ($A$ and $C$). (a) What is the frequency of gene conversion at $b$? (b) What does the 5:3 class tell you about the mechanism? (c) Why is the association with flanking crossovers close to one-half?
::: solution
(a) $30/2000 = 1.5\ \%$ of meioses show conversion at the locus.

(b) A 5:3 ascus has one spore pair whose two members differ. In an octad, the two spores of a pair arise from one chromatid by a post-meiotic mitosis, so the chromatid must have entered that mitosis as a heteroduplex: one strand carrying $b$, the other $b'$. It is direct evidence that recombination involves hybrid DNA whose mismatch can remain uncorrected.

(c) $14/30 = 0.47$. In the DSBR model each recombination intermediate can be resolved with or without crossing over the flanking markers, often with similar probabilities in fungi; so conversion events are associated with flanking crossovers about half the time, as observed. (The proportion varies between organisms and loci, and SDSA, which gives only non-crossovers, lowers it.)
:::
:::

## Site-specific recombination

Some recombination needs no extended homology. **Site-specific recombinases** recognise short specific sequences and exchange the DNA at them precisely, by breaking and rejoining strands through a covalent protein–DNA intermediate, without synthesis or loss of nucleotides. Phage λ integrates into the *E. coli* chromosome by recombination between its *attP* site and the bacterial *attB* site, catalysed by λ integrase with host IHF. This is the mechanism Allan Campbell proposed in 1962, in which the circular phage DNA inserts by a single crossover. Excision reverses the reaction and needs a second phage protein, excisionase. The **Cre** recombinase of phage P1 recombines two 34 bp ***loxP*** sites. Depending on their relative orientation, the DNA between two sites is excised or inverted. Cre–*lox* and the similar yeast Flp–*FRT* system are now standard tools for deleting genes in particular tissues of laboratory mice and flies ([[molecular-biology/molecular-tools]]).

## Transposable elements

**Transposable elements** are DNA sequences that move from one site in a genome to another. Barbara McClintock discovered them in maize in the 1940s. She showed that the *Dissociation* (*Ds*) element broke chromosomes and moved, and that its movement depended on a second element, *Activator* (*Ac*). She reported this in 1950 and received the Nobel Prize in 1983. Bacterial insertion sequences were found by their effects on gene expression in the late 1960s.

::: definition Classes of transposable element {#def-transposon}
- **DNA transposons** (class II) move as DNA. The element encodes a **transposase** that binds its **terminal inverted repeats**, excises it and inserts it at a new site (**cut-and-paste**: bacterial IS elements and Tn5, maize *Ac*, *Drosophila* P elements, *mariner*). Some bacterial elements instead copy themselves during transposition (**replicative** transposition, as with Tn3 and phage Mu).
- **Retrotransposons** (class I) move through an RNA intermediate that is reverse-transcribed into DNA (**copy-and-paste**), so the original copy stays put. **LTR retrotransposons**, flanked by long terminal repeats, resemble retroviruses without an envelope gene (yeast Ty1, *Drosophila* copia, mammalian endogenous retroviruses). **Non-LTR retrotransposons** include the autonomous **LINEs** (long interspersed elements; L1 in mammals, about 6 kb when full length), which reverse-transcribe their RNA directly into a nick at the target site (**target-primed reverse transcription**). They also include non-autonomous **SINEs** (short interspersed elements, such as the 300 bp primate **Alu**), which use the L1 machinery.
- Insertion of almost any element generates a short **target-site duplication** (TSD) of host DNA flanking it, because the transposase or endonuclease makes staggered cuts in the target and the single-stranded gaps are filled in. TSD length (typically 2–12 bp) is characteristic of the element family.
:::

```python
# Find the target-site duplication (TSD) left by a transposon insertion
def target_site_duplication(before, after):
    """before: target region without the element; after: the same region with it.
    Returns (element, tsd)."""
    i = 0                                   # length of the common prefix
    while i < len(before) and before[i] == after[i]:
        i += 1
    j = 0                                   # length of the common suffix
    while j < len(before) and before[-1 - j] == after[-1 - j]:
        j += 1
    overlap = max(0, i + j - len(before))   # target bases found on both sides
    tsd = before[i - overlap:i]
    element = after[i:len(after) - j]
    return element, tsd

before = "GGATCCAAGTTCAGCTTAGC"
after  = "GGATCCAAGTTCAGGGTTTCCCAAAACTTCAGCTTAGC"
element, tsd = target_site_duplication(before, after)
print("element:", element, f"({len(element)} bp)")
print("target-site duplication:", tsd, f"({len(tsd)} bp)")
```

On this toy example (the "element" is only 13 bp long; real ones are kilobases) the script prints:

```
element: GGTTTCCCAAAAC (13 bp)
target-site duplication: TTCAG (5 bp)
```

The 5 bp `TTCAG` present once in the empty site appears on both sides of the insertion. Comparing the empty and occupied alleles at the same locus in different individuals is how insertions are recognised in genome sequences. The choice of which copy of the duplication to call part of the element is arbitrary in a script; it is the sequence of the element's own ends that settles it.

::: example How much of the human genome is transposon-derived? {#ex-alu}
The initial analysis of the human genome sequence (International Human Genome Sequencing Consortium, 2001) found about 1.2 million Alu copies of about 300 bp, and L1 sequences making up about 17 % of the genome; in total about 45 % of the genome is recognisably derived from transposable elements. (a) What fraction of the $3.1\times10^9$ bp haploid genome is Alu? (b) L1 copies are mostly 5′-truncated, averaging roughly 1 kb. About how many L1 copies are there? (c) Why are most of these copies inactive?
::: solution
(a) $1.2\times10^6\times300 = 3.6\times10^8$ bp, which is $3.6\times10^8/3.1\times10^9 = 11.6\ \%$ (the consortium reported about 10 %).

(b) $0.17\times3.1\times10^9/1000 \approx 5\times10^5$ copies, in line with the published figure of about half a million.

(c) Reverse transcription often stops before reaching the 5′ end of the RNA, so most new L1 insertions are truncated and lack the promoter and coding sequences needed to move again. Older copies have accumulated point mutations and deletions. Only of the order of 100 full-length L1s in a human genome remain capable of retrotransposition (Brouha et al., 2003). Host defences, including DNA methylation, repressive histone marks and small RNAs ([[molecular-biology/eukaryotic-gene-regulation]]), keep even these mostly silent.
:::
:::

Transposons are mutagens as well as genome components. In *Drosophila*, about half of the spontaneous visible mutations studied in the classical era turned out to be insertions of transposable elements; in humans, a new Alu insertion occurs in roughly one in 20–40 births, new L1 insertions more rarely, and occasionally one disrupts a gene. Over evolutionary time, transposons have supplied regulatory sequences and even genes to their hosts. The RAG1 recombinase of V(D)J recombination and the telomerase reverse transcriptase are both thought to descend from transposable-element enzymes. Hybrid dysgenesis in *Drosophila*, caused by P elements, and the piRNA system that suppresses it, are discussed in [[molecular-biology/eukaryotic-gene-regulation]].

::: quiz
A new mutation in a mouse is caused by insertion of a 6 kb element flanked by 300 bp direct repeats (identical at both ends), and the element is surrounded by a 5 bp target-site duplication. An identical copy of the element remains at its original locus. What kind of element is it most likely to be?
- [ ] A cut-and-paste DNA transposon
- [x] An LTR retrotransposon
- [ ] A SINE
- [ ] A site-specific recombination product of Cre and *loxP*
::: solution
Direct (not inverted) terminal repeats of a few hundred base pairs are the long terminal repeats of an LTR retrotransposon, and retention of the original copy shows copy-and-paste transposition through RNA. Cut-and-paste DNA transposons have short inverted repeats and leave the donor site. SINEs are only a few hundred base pairs long in total and lack LTRs. Site-specific recombination does not create target-site duplications.
:::
:::

::: application Repair pathways in medicine and biotechnology
Cancer cells often lose one repair pathway and become dependent on another. Tumours with defects in *BRCA1* or *BRCA2*, which cannot repair breaks by HR, are killed by inhibitors of poly(ADP-ribose) polymerase (PARP), an enzyme of single-strand-break repair, while normal cells are spared: a **synthetic lethal** interaction, now exploited by approved drugs (see Medicine Atlas for their use). Genome editing ([[molecular-biology/molecular-tools]]) relies on the same pathways: a programmed double-strand break made by Cas9 is repaired by NHEJ, often creating small insertions or deletions that disrupt a gene, or by HR from a supplied template, which allows a precise change.
:::

::: history
Albert Kelner and Renato Dulbecco discovered photoreactivation in 1949, and Barbara McClintock reported the transposable *Ac*/*Ds* system of maize in 1950. Robin Holliday proposed his model of recombination with a four-stranded junction in 1964, the same year that Richard Setlow and William Carrier, and independently Richard Boyce and Paul Howard-Flanders, showed that *E. coli* excises pyrimidine dimers from its DNA. James Cleaver connected xeroderma pigmentosum with defective excision repair in 1968. Tomas Lindahl discovered uracil-DNA glycosylase in 1974 and with it base excision repair. Jack Szostak, Terry Orr-Weaver, Rodney Rothstein and Franklin Stahl proposed the double-strand-break repair model in 1983. Paul Modrich reconstituted mismatch repair in 1989, and Aziz Sancar worked out the mechanism of nucleotide excision repair from the 1980s. Lindahl, Modrich and Sancar shared the 2015 Nobel Prize in Chemistry. The International Human Genome Sequencing Consortium's 2001 analysis showed that about 45 % of the human genome derives from transposable elements.
:::

::: summary
- DNA suffers thousands of spontaneous lesions per cell per day (depurination, deamination, oxidation, alkylation) plus damage from UV and ionising radiation. A lesion becomes a mutation only if it is replicated or repaired wrongly.
- Direct reversal: photolyase splits pyrimidine dimers with light; MGMT removes methyl groups from O⁶-methylguanine and is consumed.
- Base excision repair removes single damaged bases via glycosylases, AP endonuclease, Pol β and ligase. Thymine in place of uracil lets deaminated cytosine be recognised.
- Nucleotide excision repair cuts out an oligonucleotide containing a bulky lesion (12–13 nt in *E. coli*, 24–32 nt in humans), globally or coupled to transcription on the template strand. XP mutants defined its human genes.
- Mismatch repair corrects replication errors on the new strand, identified by hemimethylated `GATC` in *E. coli* or by strand discontinuities and PCNA in eukaryotes.
- Translesion polymerases bypass lesions with low fidelity; the SOS response induces them in bacteria.
- Double-strand breaks are repaired by NHEJ (Ku, ligase IV; no template) or by HR (resection, Rad51/RecA filament, strand invasion, D-loop, SDSA or double Holliday junctions). Meiotic crossovers are a regulated form of HR started by Spo11; gene conversion arises from mismatch correction of heteroduplex DNA.
- Site-specific recombinases (λ integrase, Cre, Flp) exchange DNA precisely at short sites.
- Transposable elements move by cut-and-paste (DNA transposons) or copy-and-paste via RNA (LTR and non-LTR retrotransposons); insertions create target-site duplications. About 45 % of the human genome is transposon-derived, mostly inactive copies of L1 and Alu.
:::

## Exercises

::: exercise Match lesion and pathway {level=1}
Name the main repair pathway for each: (a) uracil in DNA; (b) a thymine dimer in a placental mammal; (c) a G·T mismatch left by replication; (d) a double-strand break in a G1 human cell; (e) O⁶-methylguanine.
::: solution
(a) Base excision repair, starting with uracil-DNA glycosylase. (b) Nucleotide excision repair (no photolyase in placental mammals). (c) Mismatch repair. (d) Non-homologous end joining (no sister chromatid in G1). (e) Direct reversal by MGMT.
:::
:::

::: exercise Probability of an undamaged gene {level=1 check="0.61"}
A dose of a mutagen produces on average 0.02 lesions per kilobase. What is the probability that a 25 kb gene carries no lesion (two decimal places)?
::: solution
From [[#eq-poisson-damage]], $\lambda L = 0.02\times25 = 0.5$, so $P_0 = e^{-0.5} = 0.61$.
:::
:::

::: exercise Chi frequency {level=1 check="65536"}
How often (one site per how many bp) would an 8 bp sequence such as Chi occur at random on one strand of a sequence with equal base frequencies?
::: solution
$4^8 = 65\,536$ bp. The observed spacing in *E. coli* of about one per 5 kb (on the strand that matters) shows that Chi has been strongly enriched by selection.
:::
:::

::: exercise Dose for 10 % survival {level=2 check="23"}
In the one-hit model [[#prop-poisson-damage]], a strain has $D_0 = 10\ \mathrm{J\,m^{-2}}$. What dose gives 10 % survival, to the nearest J m⁻²?
::: solution
$0.1 = e^{-D/10}$ gives $D = 10\ln10 = 23.0\ \mathrm{J\,m^{-2}}$.
:::
:::

::: exercise A double mutant {level=2}
An *E. coli* *uvrA* mutant and a *recA* mutant are each more sensitive to UV than wild type; the double mutant is far more sensitive than either. Explain, using what each gene does.
::: solution
UvrA is needed for nucleotide excision repair, which removes dimers before replication. RecA is needed for homologous recombination, which restarts collapsed forks and fills post-replication gaps left opposite unrepaired lesions, and for inducing the SOS response (including translesion synthesis). With only one pathway missing, the other copes with part of the damage; with both missing, unrepaired dimers block every replication fork and there is no way to tolerate or repair them, so even tiny doses are lethal. Such synergism in double mutants is the classical genetic signature of two pathways acting in parallel on the same damage.
:::
:::

::: exercise NHEJ scars {level=2}
A Cas9-induced double-strand break in a coding exon is repaired in a population of cells. Sequencing shows 60 % of alleles unchanged, 25 % with 1 bp insertions, 10 % with 4 bp deletions and 5 % with 9 bp deletions. (a) What fraction of alleles would you expect to cause a frameshift? (b) Why might 60 % appear unchanged even though Cas9 cut them? (c) What would you need to supply to obtain a precise substitution instead?
::: solution
(a) Indels whose length is not a multiple of three shift the frame: the 1 bp insertions (25 %) and 4 bp deletions (10 %), total 35 %. The 9 bp deletions remove three codons in frame.

(b) Precise NHEJ religation of clean Cas9 ends restores the original sequence, which Cas9 can then cut again; the "unchanged" alleles include those that were cut and accurately repaired, perhaps several times, and those never cut.

(c) A repair template — a DNA molecule homologous to the region flanking the break and carrying the desired change — so that the break can be repaired by homology-directed repair; in many cell types this works efficiently only in S and G2 phases.
:::
:::

::: exercise Sorting out the gene-conversion classes {level=3}
In a yeast cross, a marker gives 4:4 segregation in 98 % of tetrads, and the remaining 2 % are 3:1 or 1:3 (yeast tetrads are unordered and have four spores, so 5:3 octads cannot be seen). (a) Explain why yeast shows 3:1 and 1:3 but not 5:3. (b) A *pms1* mismatch-repair mutant (a MutL homologue) is crossed: now many tetrads contain sectored colonies, white and red halves for an *ADE2*-linked marker. Explain. (c) What does the result tell you about how gene conversion normally arises?
::: solution
(a) In a four-spore tetrad there is no post-meiotic mitosis before spore germination; a heteroduplex chromatid is packaged into one spore. When the spore grows into a colony, its first mitosis separates the strands, giving a colony that is half one genotype and half the other — a sectored colony, which in wild type is rare because mismatch repair has usually corrected the heteroduplex first. Corrected heteroduplexes give 3:1 or 1:3 tetrads.

(b) Without mismatch repair, heteroduplexes containing the marker mismatch are not corrected; each spore carrying one forms a colony with two sectors (red *ade2* and white *ADE2*). This is the yeast equivalent of 5:3 segregation.

(c) Gene conversion normally arises largely by mismatch repair of heteroduplex DNA formed during recombination: removing the repair system converts conversion events into post-meiotic segregation. (Some conversion also arises by gap repair, in which the DNA around the break is degraded and resynthesised from the homologue, which does not depend on mismatch repair.)
:::
:::

::: exercise Interpreting a repair time course {level=3}
Human fibroblasts are UV-irradiated and the removal of cyclobutane dimers is measured separately for the transcribed strand of an active gene, the non-transcribed strand of the same gene, and an inactive region. After 8 h, dimers remaining are: transcribed strand 20 %, non-transcribed strand 70 %, inactive region 75 %. (a) Interpret the data. (b) Predict the results for cells from a patient with Cockayne syndrome group B (lacking CSB) and for cells lacking XPC. (c) Which cells would recover transcription faster after UV, and why?
::: solution
(a) The transcribed strand of the active gene is repaired much faster than either the non-transcribed strand or inactive DNA, which are repaired similarly slowly by global-genome NER: this is transcription-coupled repair, triggered by RNA polymerase II stalled at dimers on its template.

(b) CSB-deficient cells lack transcription-coupled repair: the transcribed strand would be repaired as slowly as the rest (about 70–75 % remaining). XPC-deficient cells lack global-genome NER but retain transcription-coupled repair: the transcribed strand would still be repaired well (about 20 % remaining), while the non-transcribed strand and inactive region would be barely repaired.

(c) XPC-deficient cells recover RNA synthesis after UV almost normally, because the lesions that block transcription are removed; CSB-deficient cells do not, which is the classic cellular test for Cockayne syndrome. Recovery of RNA synthesis after UV is therefore a measure of transcription-coupled repair specifically.
:::
:::
