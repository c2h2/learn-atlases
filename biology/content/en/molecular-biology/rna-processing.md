In bacteria, an mRNA is ready for translation as soon as its 5′ end emerges from the polymerase. Ribosomes load on it while transcription continues. A eukaryotic gene is not like that. Its primary transcript is capped at the 5′ end, has most of its length cut out and discarded, is cleaved and given a poly(A) tail at the 3′ end, is sometimes edited, and must be exported from the nucleus before a ribosome can see it. All of this happens while the RNA is still being made. Each step offers a point of control, and alternative choices at these steps let one gene produce several different proteins.

This chapter follows a pre-mRNA from capping to export. It covers splicing in the most detail: its chemistry, the spliceosome, self-splicing introns and alternative splicing. It then treats 3′-end formation, RNA editing, the quality control that destroys faulty mRNAs, and the processing of ribosomal and transfer RNAs. Transcription by RNA polymerase II, whose C-terminal domain coordinates many of these events, is in [[molecular-biology/transcription]].

## Split genes

In 1977, two groups studying the late mRNAs of adenovirus in human cells found something nobody expected. Susan Berget, Claire Moore and Phillip Sharp at MIT, and Louise Chow, Richard Gelinas, Thomas Broker and Richard Roberts at Cold Spring Harbor, hybridised mRNA to the viral DNA it came from and looked at the hybrids in the electron microscope. Instead of a continuous duplex, they saw the mRNA paired with several separate segments of DNA, with loops of unpaired DNA between them. The 5′ end of the mRNA (a "leader") was assembled from pieces encoded thousands of base pairs apart. Within months, the same was found for cellular genes, such as β-globin and ovalbumin. Walter Gilbert named the retained segments **exons** and the removed ones **introns** (1978). Sharp and Roberts shared the 1993 Nobel Prize in Physiology or Medicine.

::: definition Exons, introns and pre-mRNA {#def-intron}
A **split gene** is transcribed into a **pre-mRNA** containing **exons**, which are retained in the mature RNA, and **introns**, which are removed by **splicing**. The boundaries are the **5′ splice site** (donor), at the 5′ end of the intron, and the **3′ splice site** (acceptor), at its 3′ end. In the great majority of nuclear pre-mRNA introns the intron begins with `GU` and ends with `AG` (the **GU–AG rule**). Fuller consensus sequences in vertebrates are `AG|GURAGU` at the 5′ splice site (| marks the boundary, R a purine) and `YAG|G` at the 3′ splice site, preceded by a **polypyrimidine tract** and a **branch site** `YNYURAY` about 18–40 nucleotides upstream that contains the **branch-point adenosine** (underlined in the yeast consensus `UACUAAC`, where it is the last A).
:::

Exons and introns are not just a curiosity of vertebrates. Introns are present in all eukaryotes examined, although budding yeast has only about 280 genes with introns (out of about 6000) and most have only one. A typical human protein-coding gene has about ten exons averaging some 150 bp, separated by introns averaging several kilobases (Alberts, 7th ed., Table 4-1). Coding sequence is a small island in a sea of intron.

## The chemistry of splicing

::: proposition Splicing by two transesterifications {#prop-splicing}
Nuclear pre-mRNA introns, and group II self-splicing introns, are removed by two sequential **transesterification** reactions:
1. The 2′-OH of the branch-point adenosine attacks the phosphate at the 5′ splice site. The 5′ exon is released with a free 3′-OH, and the 5′ end of the intron becomes joined to the branch-point A by a **2′–5′ phosphodiester bond**, forming a **lariat** intermediate (the branch A then has three phosphodiester bonds: 2′, 3′ and 5′).
2. The 3′-OH of the 5′ exon attacks the phosphate at the 3′ splice site, joining the two exons by a normal 3′–5′ bond and releasing the intron as a lariat. The lariat is then debranched and degraded.

Each step exchanges one phosphodiester bond for another, so the total number of phosphodiester bonds is unchanged and no ATP is consumed in the chemistry itself. The ATP used by the spliceosome drives its conformational rearrangements, not bond formation.
:::

The lariat was identified in 1984 by several groups (Padgett, Konarska, Grabowski, Hardy and Sharp; Ruskin, Krainer, Maniatis and Green; Domdey, Abelson and colleagues in yeast), who found that intron RNA released in vitro ran anomalously on gels and was resistant to exonucleases from one end. Because the chemistry is a simple exchange of bonds, and it is reversible in principle, it can be catalysed by RNA.

### Self-splicing introns: RNA as a catalyst

In 1982, Thomas Cech's laboratory found that the intron in the large rRNA precursor of the ciliate *Tetrahymena thermophila* removed itself in vitro with no protein present, needing only Mg²⁺ and a guanosine nucleotide. The guanosine's 3′-OH, not a branch A, is the first nucleophile, so the intron is released as a linear molecule (then circularised). This was the first **ribozyme**. With Sidney Altman's discovery that the RNA subunit of ribonuclease P is the catalyst of tRNA processing (Cecilia Guerrier-Takada, Altman and colleagues, 1983), it showed that RNA can be an enzyme. Cech and Altman shared the 1989 Nobel Prize in Chemistry.

**Group I introns** use an external guanosine. **Group II introns**, found in organelle genes of fungi and plants and in some bacteria, use a branch A and form a lariat, exactly as nuclear introns do. Group II introns and the spliceosome share chemistry and parts of their catalytic structure. The spliceosomal snRNA U6 coordinates the catalytic metal ions as domain V of a group II intron does (Fica et al., 2013). The spliceosome is therefore thought to be a protein-assisted descendant of a self-splicing group II intron, perhaps one that invaded the genome of an early eukaryote from the bacterial ancestor of mitochondria.

### The spliceosome

::: definition The spliceosome {#def-spliceosome}
Nuclear pre-mRNA introns are removed by the **spliceosome**, a dynamic complex of five **small nuclear ribonucleoproteins** (snRNPs: U1, U2, U4, U5 and U6, each an snRNA with proteins) and more than a hundred other proteins. It assembles anew on each intron in an ordered pathway:
1. **U1 snRNP** base-pairs with the 5′ splice site; the protein SF1 binds the branch site and **U2AF** binds the polypyrimidine tract and the 3′-splice-site AG (complex E).
2. **U2 snRNP** replaces SF1 and base-pairs with the branch site, so that the branch A bulges out of the duplex, its 2′-OH presented as the nucleophile (complex A).
3. The **U4/U6·U5 tri-snRNP** joins (complex B). Extensive rearrangement, driven by RNA helicases using ATP, releases U1 and U4. U6 then pairs with the 5′ splice site and with U2, forming the catalytic core (complexes B^act^ and C). U5 holds the two exons.
4. The two transesterifications take place. The spliced mRNA is released, and the lariat and snRNPs are released and recycled.
:::

That RNA–RNA base pairing defines the splice sites was shown by compensatory mutations. Yan Zhuang and Alan Weiner (1986) found that a mutation in a 5′ splice site that blocked splicing could be suppressed by a matching mutation in U1 snRNA that restored base pairing. The rearrangements make the spliceosome slow, so that splicing takes tens of seconds to minutes per intron. They also give it many proofreading checkpoints, because helicases can reject an intermediate with a poor match. A **minor spliceosome**, with U11, U12, U4atac and U6atac in place of U1, U2, U4 and U6 but sharing U5, removes a rare class of introns with different consensus sequences, about 0.5 % of human introns (originally called AT–AC introns after their terminal dinucleotides). Cryo-electron microscopy, from about 2015 onwards (Yigong Shi's, Kiyoshi Nagai's and Reinhard Lührmann's groups among others), has now captured most stages of the cycle in near-atomic detail.

::: example Splicing a pre-mRNA {#ex-splice}
A toy pre-mRNA consists of exon 1 (9 nt), intron 1 (30 nt), exon 2 (60 nt), intron 2 (29 nt) and exon 3 (53 nt, containing the normal stop codon and a 3′ untranslated region). Intron 1 is `GUAAGUAUCCUUACUAACUUUUCCUUUCAG`. (a) Identify its 5′ and 3′ splice-site dinucleotides, branch site and polypyrimidine tract. (b) How long is the mature mRNA, and at which position (counting from 0 at the A of the start codon) does the exon 2–exon 3 junction lie? (c) What do you predict if the branch-point A is mutated to G? (Real human introns are rarely shorter than about 70 nt; these are shortened for clarity.)
::: solution
(a) It begins `GU` (5′ splice site, `GUAAGU`, a perfect match to the consensus `GURAGU`) and ends `AG` (3′ splice site, `CAG`). The sequence `UACUAAC` is the yeast-type branch site, with the branch-point A as its last A. It is followed by the pyrimidine-rich `UUUUCCUUUC` and then the terminal `AG`.

(b) The mature mRNA is $9 + 60 + 53 = 122$ nt. The exon 2–exon 3 junction lies after $9 + 60 = 69$ nt, at position 69.

(c) The first transesterification needs the 2′-OH of the branch A. If the A is replaced by G, U2 snRNA pairing and the first step are severely impaired. The spliceosome may use a cryptic branch point nearby, usually an A, with lower efficiency; otherwise the intron is retained and the transcript is degraded or exported unspliced. In yeast, such mutations block the first step and the pre-mRNA accumulates.
:::
:::

```python
# Splice a toy pre-mRNA and apply the 50-nucleotide rule for nonsense-mediated decay
STOPS = {"UAA", "UAG", "UGA"}

def splice(pre, introns):
    """introns: list of (start, end), 0-based, end exclusive; each must be GU...AG"""
    exons, pos = [], 0
    for s, e in sorted(introns):
        assert pre[s:s+2] == "GU" and pre[e-2:e] == "AG", "not a GU-AG intron"
        exons.append(pre[pos:s])
        pos = e
    exons.append(pre[pos:])
    return exons

def nmd_check(exons):
    mrna = "".join(exons)                     # translation starts at position 0 (AUG)
    stop = next(i for i in range(0, len(mrna) - 2, 3) if mrna[i:i+3] in STOPS)
    last_junction = sum(len(x) for x in exons[:-1])
    return stop, last_junction, last_junction - stop > 50

ex1 = "AUGGCCAAG"                                              # 9 nt
in1 = "GUAAGUAUCCUUACUAACUUUUCCUUUCAG"                         # 30 nt, branch site UACUAAC
ex2 = "GAUUCUGGAAAGCCGACCUGCGUGCUAUCUGGUACCAUCGUUUCGGAGGCAAAGAUCUGG"  # 60 nt
in2 = "GUGAGUCCUGCUAACCCUUUCUCUCCCAG"                          # 29 nt
ex3 = "GCUGGUGCAGCCCAAGGACGGCAAGUUCAGCGGCACUAAGCCACGAAUAAAGC"   # stop UAA, then 3' UTR
introns = [(9, 39), (99, 128)]

variants = [("normal", ex2), ("mutant A", ex2[:3] + "UAG" + ex2[6:]), ("mutant B", ex2[:30] + "UGA" + ex2[33:])]
for name, e2 in variants:
    pre = ex1 + in1 + e2 + in2 + ex3
    exons = splice(pre, introns)
    stop, junction, nmd = nmd_check(exons)
    print(f"{name:8s}: exons {[len(x) for x in exons]}, stop at {stop}, "
          f"last junction at {junction}, NMD predicted: {nmd}")
```

```
normal  : exons [9, 60, 53], stop at 105, last junction at 69, NMD predicted: False
mutant A: exons [9, 60, 53], stop at 12, last junction at 69, NMD predicted: True
mutant B: exons [9, 60, 53], stop at 39, last junction at 69, NMD predicted: False
```

The last two lines anticipate the rule for nonsense-mediated decay, explained below. Mutant A has a premature stop codon 57 nucleotides upstream of the last exon junction and is predicted to be degraded. Mutant B's premature stop lies only 30 nucleotides upstream, so its mRNA is predicted to escape decay and make a truncated protein.

## Alternative splicing

If every intron were removed and every exon kept, splicing would be only a chore. In fact many pre-mRNAs can be spliced in more than one way, and the choice is regulated.

::: definition Modes of alternative splicing {#def-alternative}
- A **cassette exon** is included in some mRNAs and skipped in others.
- **Mutually exclusive exons**: exactly one of two or more exons is included.
- **Alternative 5′ or 3′ splice sites** within an exon change its length.
- **Intron retention**: an intron is left in the mRNA.
- Alternative **promoters** (first exons) and alternative **polyadenylation sites** (last exons) change the ends of the mRNA. Strictly these are choices in transcription and 3′ processing, but they combine with splicing.

The **percent spliced in** (PSI, Ψ) of a cassette exon is the fraction of a gene's mRNAs that include it.
:::

::: proposition Estimating PSI from RNA-seq junction reads {#prop-psi}
Let $I$ be the number of sequencing reads spanning the two junctions that include a cassette exon (upstream exon to cassette, and cassette to downstream exon), and $E$ the number spanning the single skipping junction (upstream exon to downstream exon). If reads are sampled in proportion to the number of junctions in each isoform, and each junction yields reads equally, then
$$
\hat\Psi = \frac{I/2}{I/2 + E}.
$$ {#eq-psi}
The factor of 2 corrects for the inclusion isoform having two junctions to the skipping isoform's one. The estimate assumes equal mappability of the junctions and ignores reads lying within the exon body.
:::

Alternative splicing is extremely common in vertebrates. Two RNA-seq studies in 2008 (Qun Pan, Benjamin Blencowe and colleagues; Eric Wang, Christopher Burge and colleagues) found evidence that about 95 % of human multi-exon genes produce more than one splice form, many of them differing between tissues. How many of these isoforms make functionally distinct proteins is less clear. Many are minor, and some are probably errors tolerated by the cell. Proteomic studies detect far fewer alternative protein forms than RNA-seq detects mRNAs.

Splice-site choice is regulated by sequences in exons and introns, **exonic and intronic splicing enhancers and silencers**, bound by proteins. **SR proteins**, with domains rich in serine–arginine dipeptides, usually bind exonic enhancers and promote use of nearby sites, by helping U1 and U2AF to bind. **hnRNP** proteins usually bind silencers and repress. Tissue-specific regulators such as NOVA and RBFOX in neurons, and the relative concentrations of general factors, then set the splicing pattern of each cell type. Because splicing is co-transcriptional, the elongation rate of Pol II also matters: a slow polymerase gives a weak upstream splice site more time to be recognised before a stronger competitor downstream is transcribed (kinetic coupling).

::: example Sex determination in Drosophila {#ex-sxl}
In *Drosophila melanogaster*, sex is set by a cascade of alternative splicing (see [[developmental-biology]]). The female-specific protein Sex-lethal (Sxl) binds the pre-mRNA of *transformer* (*tra*) and blocks use of a 3′ splice site. In males, which lack Sxl, that site is used and the mRNA includes a stop codon, so no functional Tra protein is made. In females a downstream 3′ site is used, giving functional Tra. Tra, with Tra-2, binds an exonic splicing enhancer in the *doublesex* (*dsx*) pre-mRNA and activates a female-specific exon, giving the female form of Doublesex. Without Tra, the default splicing gives the male form. (a) Predict the phenotype of an XX fly homozygous for a null mutation in *tra*. (b) Predict the phenotype of an XY fly that expresses Tra protein from a transgene. (c) Which steps involve a repressor of splicing and which an activator?
::: solution
(a) XX *tra*⁻ flies make Sxl but cannot make Tra, so *dsx* is spliced in the default (male) pattern: they develop as males externally (they are sterile, since the germ line is also affected by other genes). Alfred Sturtevant described this sex-transforming mutation in 1945.

(b) Tra together with Tra-2 activates the female *dsx* exon, so XY flies with constitutive Tra develop as females somatically.

(c) Sxl acts as a repressor of splicing: it blocks a 3′ splice site in *tra* and in its own pre-mRNA, which maintains Sxl production in females through a positive feedback loop. Tra and Tra-2 act as activators: they recruit SR proteins to an enhancer in *dsx* and promote use of a weak female-specific 3′ splice site.
:::
:::

::: example The Dscam gene {#ex-dscam}
The *Drosophila* gene *Dscam* (Down syndrome cell adhesion molecule) contains four clusters of mutually exclusive exons: 12 alternatives for exon 4, 48 for exon 6, 33 for exon 9 and 2 for exon 17 (Dietmar Schmucker, Larry Zipursky and colleagues, 2000). (a) How many different mRNAs could be made? (b) How does this compare with the roughly 14,000 protein-coding genes in the fly genome? (c) What is the biological use of so many isoforms?
::: solution
(a) Choices in different clusters are independent, so the number of combinations is $12\times48\times33\times2 = 38\,016$.

(b) One gene could encode more than twice as many distinct protein isoforms as the genome has genes. (Exons 4, 6 and 9 encode parts of three immunoglobulin domains; exon 17 the transmembrane domain.)

(c) Each neuron expresses a small random set of isoforms. Dscam proteins bind only to identical isoforms on other membranes, so a neuron's branches recognise each other and repel ("self-avoidance"), while branches of different neurons, with different isoforms, can overlap. The isoform diversity gives each cell a molecular identity.
:::
:::

::: warning "Alternative splicing explains why humans are more complex than worms with the same number of genes"
Humans have about 20,000 protein-coding genes and the nematode *C. elegans* has about the same number, and alternative splicing is more extensive in vertebrates. It is tempting to conclude that splicing makes up the difference in "complexity". The evidence does not support so simple a story. Many alternative isoforms are rare or tissue-restricted, and their protein products often go undetected. Organismal complexity also depends on regulatory DNA, gene regulatory networks, protein interactions and much else. Alternative splicing certainly adds important functional diversity in particular genes, as *dsx* and *Dscam* show, but counting isoforms is not a measure of complexity.
:::

::: quiz
RNA-seq of brain tissue gives 300 reads spanning the two inclusion junctions of a cassette exon and 50 reads spanning the skipping junction. What is the estimated PSI?
- [ ] 0.86
- [x] 0.75
- [ ] 0.50
- [ ] 0.14
::: solution
From [[#eq-psi]], $\hat\Psi = (300/2)/(300/2 + 50) = 150/200 = 0.75$. Forgetting to halve the inclusion reads gives $300/350 = 0.86$, which overestimates inclusion.
:::
:::

## The 5′ cap and the 3′ end

::: definition The cap and the poly(A) tail {#def-cap-polya}
- The **5′ cap** is a 7-methylguanosine joined to the first nucleotide of the RNA through an unusual **5′–5′ triphosphate** bridge, m⁷GpppN. In vertebrates the ribose of the first (and often second) transcribed nucleotide is also 2′-O-methylated. The cap is added when the RNA is only about 20–30 nucleotides long, by enzymes recruited to the Ser5-phosphorylated CTD of Pol II: an RNA triphosphatase, a guanylyltransferase and a methyltransferase.
- The **poly(A) tail** is added after **cleavage** of the pre-mRNA. The **cleavage and polyadenylation specificity factor** (CPSF) binds the signal `AAUAAA` (or a variant such as `AUUAAA`) 10–30 nucleotides upstream of the cleavage site. The cleavage stimulation factor (CstF) binds a G/U-rich element downstream. After cleavage, **poly(A) polymerase** adds about 200–250 adenylates in mammals (shorter tails in yeast), and nuclear poly(A)-binding protein controls their number. Histone mRNAs of metazoans are an exception: they end in a stem-loop instead of a poly(A) tail.
:::

The cap protects the mRNA from 5′→3′ exonucleases, marks it for export and, in the cytoplasm, recruits the translation initiation factor eIF4E ([[molecular-biology/translation]]). The poly(A) tail, bound by cytoplasmic poly(A)-binding protein (PABP), protects the 3′ end and also promotes translation. PABP interacts with the initiation factor eIF4G bound at the cap, so the mRNA forms a closed loop. Most mRNA decay starts with shortening of the poly(A) tail (**deadenylation**), followed by removal of the cap and 5′→3′ degradation, or by 3′→5′ degradation by the exosome. Many genes have more than one polyadenylation site. **Alternative polyadenylation** changes the length of the 3′ untranslated region, and with it the binding sites for microRNAs and regulatory proteins ([[molecular-biology/eukaryotic-gene-regulation]]).

::: example Does splicing efficiency matter? {#ex-splice-accuracy}
Suppose that each intron of a gene is spliced correctly with probability $p$, independently. (a) What fraction of transcripts of a gene with 10 introns is correctly spliced at every intron if $p = 0.99$? If $p = 0.999$? (b) The human gene with the most exons, *TTN* (titin), has more than 360. What value of $p$ would be needed for half of its transcripts to be perfect? (c) Comment on how cells cope.
::: solution
(a) $0.99^{10} = 0.904$ and $0.999^{10} = 0.990$.

(b) We need $p^{360} = 0.5$, so $p = 0.5^{1/360} = 0.99808$: an error rate per intron below 0.2 %.

(c) The arithmetic shows why splicing must be highly accurate per intron, and why errors must be caught afterwards. Faulty mRNAs, especially those with premature stop codons, are degraded by nonsense-mediated decay. Exon definition (recognition of short exons by factors bridging across them) and co-transcriptional splicing, in which introns are removed in order as they are made, keep long genes manageable. Even so, a fraction of transcripts of any gene is mis-spliced.
:::
:::

::: widget plot
f: p^x; 0.999^x
x: 0, 400
y: 0, 1
sliders: p=0.99:0.95:1:0.0005
labels: \text{all introns correct, per-intron accuracy } p; \text{per-intron accuracy } 0.999
caption: The fraction of transcripts in which every one of $x$ introns is spliced correctly, if each is spliced correctly with probability $p$ independently, as in [[#ex-splice-accuracy]]. With $p = 0.99$ (slider default), fewer than half of the transcripts of a gene with 70 introns are perfect. Push $p$ to 0.998 and see how many introns can be tolerated before half are faulty. The independence assumption is only a baseline; in reality errors at neighbouring introns are correlated.
:::

## Editing, export and quality control

### RNA editing

**RNA editing** changes the sequence of an RNA after transcription, by means other than splicing. Two kinds are common in mammals.

- **C-to-U editing.** The apolipoprotein B mRNA is edited in the small intestine by the cytidine deaminase **APOBEC1**, which changes a single C to U and converts codon 2153, `CAA` (Gln), into a stop codon `UAA`. The liver makes the full-length apoB-100, 4536 amino acids long. The intestine makes apoB-48, the N-terminal 48 % of it, from the same gene (Lawrence Chan's and James Scott's groups, 1987).
- **A-to-I editing.** **ADAR** enzymes (adenosine deaminases acting on RNA) convert adenosine to inosine in double-stranded regions of RNA. Inosine is read as G by ribosomes, so editing in coding sequence can change amino acids. In mammalian brain, almost every transcript of the glutamate receptor subunit GluA2 (gene *GRIA2*) is edited at one position, changing a glutamine codon (`CAG`) to arginine (`CIG`, read as `CGG`). This "Q/R site" makes the channel impermeable to Ca²⁺ (Rolf Sprengel, Peter Seeburg and colleagues, 1991). Mice unable to edit this site die young of seizures, and the phenotype is rescued by a genomic change to an arginine codon.

The most extensive editing is found in the mitochondria of trypanosomes, where some mRNAs have hundreds of uridines inserted or deleted, guided by small **guide RNAs** that pair with the transcript (Rob Benne and colleagues discovered this in 1986).

### Export and nonsense-mediated decay

Only fully processed mRNAs leave the nucleus. Splicing deposits an **exon junction complex** (EJC) on the mRNA about 20–24 nucleotides upstream of each exon–exon junction (Hervé Le Hir, Melissa Moore and colleagues, 2000). The EJC, cap-binding proteins and the **TREX** complex recruit the export receptor NXF1–NXT1, which takes the mRNA through the nuclear pore complex ([[cell-biology/protein-sorting]]). Unspliced pre-mRNAs are retained by proteins bound at their splice sites and degraded by the nuclear exosome.

::: definition Nonsense-mediated decay (NMD) {#def-nmd}
**Nonsense-mediated decay** degrades mRNAs that contain a premature termination codon. In mammals, during the first ("pioneer") round of translation, the ribosome displaces EJCs as it moves along the mRNA. If it stops at a codon that lies **more than about 50–55 nucleotides upstream of the last exon–exon junction**, at least one EJC remains downstream. That EJC, through the protein UPF1 bound to the terminating ribosome, marks the mRNA for rapid decay. A stop codon in the last exon, or within about 50 nucleotides of the last junction, leaves no EJC behind and does not trigger NMD (Elisabeth Nagy and Lynne Maquat, 1998).
:::

NMD shapes how mutations affect phenotypes. A nonsense or frameshift mutation early in a gene usually causes loss of the mRNA, so the allele behaves as a null and is typically recessive. A premature stop in the last exon escapes NMD and makes a truncated protein, which may act as a dominant negative. NMD also regulates normal genes. Some alternative splicing events deliberately introduce a premature stop to switch a gene off, a strategy called **alternative splicing coupled to NMD**, and many splicing regulators control their own levels this way.

## Processing ribosomal and transfer RNAs

The three largest eukaryotic rRNAs are cut from one Pol I transcript, the **45S pre-rRNA** (about 13 kb in humans), in the **nucleolus**. Endonucleases and exonucleases trim it in a defined order to 18S, 5.8S and 28S rRNA, which assemble with ribosomal proteins and the separately transcribed 5S rRNA. Along the way, about a hundred nucleotides are modified, guided by **small nucleolar RNAs** (snoRNAs) that pair with the rRNA. **Box C/D snoRNAs** direct 2′-O-methylation of a ribose, and **box H/ACA snoRNAs** direct conversion of uridine to pseudouridine. Many snoRNAs are encoded within introns of other genes and are released by splicing and trimming. In bacteria, the 16S, 23S and 5S rRNAs, and often tRNAs, are cut from a single transcript of each *rrn* operon by RNase III and other nucleases.

Transfer RNAs are made as precursors with extra sequence at both ends. **RNase P**, whose RNA subunit is the catalyst, cuts the 5′ leader. The 3′ trailer is trimmed, and the 3′-terminal `CCA` to which amino acids are attached is added by the CCA-adding enzyme (in eukaryotes it is not encoded in the gene). Many bases are modified (pseudouridine, dihydrouridine, inosine at the wobble position of some anticodons; [[molecular-biology/translation]]). Some tRNA genes contain a short intron next to the anticodon, removed not by the spliceosome but by a dedicated tRNA splicing endonuclease and ligase.

::: application Splicing and therapy
About 10–15 % of mutations that cause inherited human disorders affect splicing, by destroying a splice site, creating a new one or altering an enhancer or silencer. That has made splicing a target for treatment. **Antisense oligonucleotides**, short modified nucleic acids that pair with a pre-mRNA, can block a splice site or a silencer. Nusinersen, approved in 2016 for spinal muscular atrophy, blocks a silencer in the intron after exon 7 of *SMN2*, a paralogue of the defective *SMN1*, so that exon 7 is included and functional SMN protein is made. Exon-skipping oligonucleotides for some forms of Duchenne muscular dystrophy cause a frameshifted exon to be skipped, restoring the reading frame of *DMD* and producing a shorter but partly functional dystrophin. Small molecules that alter splicing have also been approved. The clinical aspects are in Medicine Atlas ([/learn/medicine/](/learn/medicine/)). The molecular principle is the subject of this chapter.
:::

::: history
Susan Berget, Claire Moore and Phillip Sharp, and Louise Chow, Richard Gelinas, Thomas Broker and Richard Roberts, discovered split genes in adenovirus in 1977; the 5′ cap had been characterised two years earlier by Aaron Shatkin, Yasuhiro Furuichi and colleagues, among others, working with viral and cellular mRNAs. Walter Gilbert coined the words intron and exon in 1978. Joan Steitz and colleagues proposed in 1980 that U1 snRNA recognises the 5′ splice site by base pairing. Thomas Cech's group reported the self-splicing *Tetrahymena* intron in 1982, and Sidney Altman's group the catalytic RNA of RNase P in 1983. Several laboratories, including those of Sharp, Tom Maniatis and Michael Green, and John Abelson, identified the lariat in 1984. Yan Zhuang and Alan Weiner showed U1–5′ splice site pairing by compensatory mutations in 1986, the year Rob Benne's group discovered RNA editing in trypanosomes. Elisabeth Nagy and Lynne Maquat formulated the 50-nucleotide rule for NMD in 1998.
:::

::: summary
- Eukaryotic pre-mRNAs are capped (m⁷GpppN, added at about 20–30 nt), spliced and cleaved and polyadenylated (`AAUAAA`, about 200–250 A in mammals), all co-transcriptionally and coordinated by the Pol II CTD.
- Introns are removed by two transesterifications: the branch-point A's 2′-OH attacks the 5′ splice site (lariat intermediate), then the 5′ exon's 3′-OH attacks the 3′ splice site. No net change in phosphodiester bonds. Most introns are GU…AG.
- The spliceosome (U1, U2, U4/U6, U5 snRNPs plus many proteins) recognises splice sites by RNA–RNA pairing, rearranges with ATP-driven helicases and uses U6 at its catalytic core. It probably descends from group II self-splicing introns. Group I introns use guanosine. Ribozymes showed that RNA can be a catalyst.
- Alternative splicing (cassette exons, mutually exclusive exons, alternative sites, intron retention) affects most human multi-exon genes and is regulated by SR proteins, hnRNPs and tissue-specific factors binding enhancers and silencers. PSI from junction reads is $(I/2)/(I/2 + E)$.
- RNA editing changes coding information: C→U in apoB mRNA (apoB-48), A→I in GluA2 (Q/R site).
- The exon junction complex marks spliced mRNAs for export and enables nonsense-mediated decay of mRNAs with a stop codon more than about 50–55 nt upstream of the last exon junction.
- rRNAs are cut from long precursors and modified at snoRNA-guided sites; tRNAs are trimmed (RNase P), given 3′ CCA, modified and sometimes spliced by a separate enzyme system.
:::

## Exercises

::: exercise Mature mRNA length {level=1 check="1850"}
A gene has four exons of 250, 400, 300 and 900 nt separated by three introns of 2.1, 5.6 and 0.8 kb. How long is the mature mRNA, excluding the poly(A) tail?
::: solution
$250 + 400 + 300 + 900 = 1850$ nt; the introns ($8.5$ kb) are removed.
:::
:::

::: exercise Bonds in splicing {level=1}
How many phosphodiester bonds are broken and how many formed in removing one intron? Why does splicing not need energy for bond formation?
::: solution
Two are broken (at the 5′ and 3′ splice sites) and two formed (the 2′–5′ branch bond and the exon–exon bond). Each step is a transesterification exchanging one bond for another of similar free energy, so the reaction is nearly energy-neutral; ATP is used by spliceosomal helicases for assembly, rearrangement and proofreading, not for the chemistry.
:::
:::

::: exercise Counting isoforms {level=1 check="8"}
A gene has three independently regulated cassette exons. How many mRNA isoforms can it produce from these choices alone?
::: solution
Each cassette exon is either included or skipped, independently: $2^3 = 8$ isoforms.
:::
:::

::: exercise PSI from reads {level=2 check="0.6"}
For a cassette exon, RNA-seq gives 120 reads spanning the two inclusion junctions and 40 reads spanning the skipping junction. Estimate PSI.
::: solution
$\hat\Psi = (120/2)/(120/2 + 40) = 60/100 = 0.6$.
:::
:::

::: exercise ApoB-48 {level=2 check="0.474"}
ApoB-100 has 4536 amino acids, and editing converts codon 2153 to a stop codon. What fraction of the full-length protein does apoB-48 contain (three decimal places)?
::: solution
The protein ends at residue 2152: $2152/4536 = 0.474$, about 47–48 %, hence the name apoB-48.
:::
:::

::: exercise Predicting NMD {level=2}
A gene has five exons of lengths (in the mRNA) 150, 120, 90, 200 and 600 nt; the start codon begins at position 50 of exon 1, and the normal stop codon is in exon 5. Using the 50-nucleotide rule, predict whether NMD will degrade the mRNA for each of the following nonsense mutations, giving the position of the stop codon (first nucleotide) in the mRNA counting from 1: (a) in exon 2 at mRNA position 200; (b) in exon 4 at position 520; (c) in exon 4 at position 400; (d) in exon 5 at position 700.
::: solution
The last exon–exon junction (between exons 4 and 5) lies after $150 + 120 + 90 + 200 = 560$ nt. NMD is expected if the stop lies more than 50 nt upstream of position 560, that is, before about position 510. (a) 200: 360 nt upstream — NMD. (b) 520: 40 nt upstream — no NMD; a truncated protein is made. (c) 400: 160 nt upstream — NMD. (d) 700: in the last exon — no NMD. Mutation (b) might therefore have dominant effects if the truncated protein interferes with the normal one, whereas (a) and (c) would behave as null alleles.
:::
:::

::: exercise Interpreting a splice-site mutation {level=3}
A patient's fibroblasts carry a heterozygous change at the first nucleotide of intron 6 of a gene, `GU` → `AU`. RT-PCR with primers in exons 5 and 8 gives the normal 450 bp product and two others: 330 bp and 510 bp. Exon 6 is 120 nt long and intron 6 contains a sequence `GUGAGU` 60 nt into the intron. (a) Explain each product. (b) Which aberrant product would be expected to escape NMD, and why might it still be harmful? (c) Suggest an experiment to confirm the interpretation without patient material.
::: solution
(a) The mutation destroys the 5′ splice site of intron 6. The 450 bp product comes from the normal allele. The 330 bp product ($450 - 120$) lacks exon 6: the spliceosome skips the exon whose donor is lost, joining exon 5 to exon 7. The 510 bp product ($450 + 60$) results from use of a cryptic 5′ splice site (`GUGAGU`, a good consensus match) 60 nt into the intron, which extends exon 6 by 60 nt.

(b) Both aberrant products are in frame (120 and 60 are multiples of 3), so neither necessarily contains a premature stop codon; if the 60 inserted nucleotides contain no stop in frame, the 510 bp product escapes NMD and encodes a protein with 20 extra amino acids, while the 330 bp product encodes a protein lacking 40 amino acids. Either could misfold or act as a dominant negative. (If the intronic sequence did contain an in-frame stop, the 510 bp mRNA would be subject to NMD.)

(c) A **minigene** assay: clone exons 5–7 with their introns (normal and mutant versions) into a reporter plasmid, introduce them into cultured cells, and analyse the spliced products by RT-PCR. A further test is to mutate the cryptic site in the mutant minigene and see whether the 510 bp product disappears.
:::
:::

::: exercise A splicing regulator that regulates itself {level=3}
An SR protein binds an enhancer in an alternative exon of its own pre-mRNA. Including the exon introduces a premature stop codon well upstream of the last exon junction. (a) Draw the feedback loop and say whether it is positive or negative. (b) Predict what happens to the steady-state level of the protein if its gene is duplicated. (c) Why might evolution favour such loops?
::: solution
(a) More SR protein → more inclusion of the "poison" exon → more mRNA with a premature stop → more NMD → less SR protein. This is negative feedback.

(b) Doubling the gene initially doubles the pre-mRNA, but the extra protein increases poison-exon inclusion, so a larger fraction of the mRNA is destroyed; the steady-state protein level rises much less than two-fold (homeostasis). Such autoregulation has been shown for several SR proteins and hnRNPs, and the poison exons are among the most conserved sequences in vertebrate genomes.

(c) Splicing regulators act on thousands of targets, so their levels must be held within narrow limits; negative autoregulation buffers fluctuations in transcription and gene dosage, making the whole splicing network robust. (Compare negative autoregulation by transcription factors in [[systems-biology/network-motifs]].)
:::
:::
