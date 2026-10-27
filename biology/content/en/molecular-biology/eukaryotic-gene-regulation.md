A neuron and a liver cell of the same person carry the same genome, yet one makes neurotransmitter receptors and the other albumin and the enzymes of the urea cycle. The cells differ not in which genes they have but in which genes they use. That this is so was shown by nuclear transfer. John Gurdon (1962) obtained swimming tadpoles of *Xenopus laevis* from eggs whose nucleus had been replaced by one from an intestinal cell. Ian Wilmut and colleagues cloned a sheep, Dolly, from an adult mammary-cell nucleus in 1996 (reported 1997). Kazutoshi Takahashi and Shinya Yamanaka (2006) reprogrammed mouse fibroblasts into pluripotent stem cells by expressing just four transcription factors. Differentiated cells keep their genes, and the choice of which to express can be reset.

Eukaryotes control gene expression at every step: chromatin, transcription, RNA processing, export, translation and the stability of mRNA and protein. This chapter concentrates on the steps that do most of the work. It covers transcription factors and the enhancers they bind, the way chromatin and DNA methylation make genes more or less accessible and remember that state through cell division, and the small RNAs that silence genes after transcription. The bacterial principles of [[molecular-biology/bacterial-gene-regulation]], namely repressors and activators, cooperativity and recruitment, all reappear, but with three new features. Eukaryotic regulatory DNA is often far from the gene it controls. Many factors act together at each gene. And DNA wrapped in nucleosomes is repressed by default.

## Transcription factors

::: definition Sequence-specific transcription factor {#def-tf}
A **sequence-specific transcription factor** (TF) is a protein that binds a short DNA sequence motif, typically 6–12 bp, and changes the rate of transcription of nearby genes. Most TFs are **modular**. A **DNA-binding domain** (DBD) recognises the motif, and one or more **effector domains** either activate transcription (**activation domains**, often acidic or glutamine-rich and intrinsically disordered) or repress it. Many TFs also have dimerisation domains and domains that bind regulatory ligands. Human cells have about 1600 TFs (Lambert et al., 2018), classified by the structure of their DBDs.
:::

The modularity was demonstrated by Roger Brent and Mark Ptashne in 1985. The yeast activator **Gal4** binds an upstream activating sequence (UAS~G~) and activates the galactose genes. When they fused the activation domain of Gal4 to the DNA-binding domain of the bacterial repressor LexA, the hybrid activated a yeast gene with a LexA binding site in place of the UAS. The two functions can be separated and swapped. The **yeast two-hybrid** method for detecting protein–protein interactions (Stanley Fields and Ok-Kyu Song, 1989) exploits this. A DBD fused to one protein and an activation domain fused to another reconstitute an activator only if the two proteins bind each other.

The main families of DNA-binding domain each insert an α-helix into the major groove ([[molecular-biology/dna-structure#def-bdna]]):

- **Homeodomain**: a 60-amino-acid helix-turn-helix domain, encoded by the homeobox of the *Hox* genes that pattern the animal body axis ([[developmental-biology/segmentation-hox]]).
- **C₂H₂ zinc finger**: about 30 amino acids folded round a zinc ion. Each finger reads about 3 bp, and proteins with arrays of fingers read long sites. This is the largest family in humans, with several hundred members.
- **Basic leucine zipper** (bZIP; for example AP-1, Fos–Jun) and **basic helix-loop-helix** (bHLH; for example MyoD): dimers, in which a coiled-coil or helix-loop-helix holds two basic DNA-binding helices together, so that different pairings produce factors with different specificities.
- **Nuclear receptors**, for steroid and thyroid hormones, retinoic acid and others: a zinc-containing DBD and a ligand-binding domain. Hormone binding changes the receptor's conformation and its interaction with co-activators. The glucocorticoid receptor moves from cytoplasm to nucleus when its ligand binds.

::: example Too many binding sites {#ex-sites}
A TF recognises an 8 bp motif exactly. (a) In random sequence with equal base frequencies, how many matches would you expect in the haploid human genome ($3.1\times10^9$ bp, both strands)? (b) For a 10 bp motif? (c) Genome-wide binding experiments (chromatin immunoprecipitation followed by sequencing, ChIP-seq) typically find a TF bound at a few thousand to a few tens of thousands of sites. What does the comparison imply?
::: solution
(a) $2\times3.1\times10^9/4^8 = 6.2\times10^9/65\,536 \approx 9.5\times10^4$ matches.

(b) $6.2\times10^9/4^{10} \approx 5.9\times10^3$.

(c) Even a long motif occurs thousands of times by chance, and TFs also bind imperfect matches. So most potential sites are not bound in a given cell, and many bound sites have no detectable effect. What decides occupancy and function is context: chromatin accessibility, the presence of other TFs bound nearby (clusters of sites in enhancers) and cooperative interactions. Predicting regulation from motif matches alone mostly fails. This is sometimes called the "futility theorem" (Wyeth Wasserman and Albin Sandelin, 2004).
:::
:::

## Enhancers

::: definition Enhancer {#def-enhancer}
An **enhancer** is a DNA segment, typically a few hundred base pairs, that increases transcription from a promoter. It works independently of its orientation and at variable, often large, distances (from under a kilobase to more than a megabase) upstream, downstream or within an intron of the gene it controls. An enhancer contains clustered binding sites for several TFs, and its activity in a given cell depends on which of these factors are present and active. **Silencers** are elements that repress in the same distance-independent way. **Insulators** are elements that block communication between an enhancer and a promoter when placed between them, many of them bound by CTCF.
:::

Julian Banerji, Sandro Rusconi and Walter Schaffner discovered enhancers in 1981. A 72 bp repeated sequence from the virus SV40, placed on a plasmid carrying the rabbit β-globin gene, raised β-globin transcription about 200-fold in cultured cells, and did so in either orientation and when placed thousands of base pairs from the gene. In 1983, tissue-specific enhancers were found in immunoglobulin genes, active only in antibody-producing cells (Susumu Tonegawa's group; Banerji, Olson and Schaffner). An extreme case of distance is the **ZRS** enhancer that drives *Sonic hedgehog* (*Shh*) in the posterior limb bud. It lies in an intron of another gene about a megabase from *Shh* (Laura Lettice, Robert Hill and colleagues, 2003). Single base changes in it cause extra digits (preaxial polydactyly) in humans, mice and cats.

Enhancers act over such distances by looping. Proteins bound at the enhancer contact the promoter, aided by the **Mediator** complex and by the cohesin-dependent folding of chromatin into loops and domains ([[molecular-biology/dna-structure]]). Enhancer–promoter contacts are mostly confined within the topologically associating domain that contains both, and boundaries bound by CTCF limit which promoters an enhancer can reach. Genome-wide, active enhancers are recognised by open chromatin, by histone H3 monomethylated at lysine 4 (H3K4me1) and acetylated at lysine 27 (H3K27ac), and by their transcription into short **enhancer RNAs**.

### Combinatorial control: the eve stripe 2 enhancer

Each gene in a multicellular organism must be expressed in a particular pattern. That pattern is produced by integrating many inputs at enhancers. The best-studied example is from early *Drosophila* development ([[developmental-biology/segmentation-hox]]). The pair-rule gene *even-skipped* (*eve*) is expressed in seven transverse stripes in the embryo, and each stripe, or pair of stripes, is driven by its own enhancer. The **stripe 2 enhancer**, a minimal element of about 480 bp (Stephen Small, Alexander Blair and Michael Levine, 1992), contains binding sites for two activators and two repressors:

- **Bicoid** and **Hunchback**, activators present in the anterior half of the embryo;
- **Giant**, a repressor expressed in a band just anterior to stripe 2;
- **Krüppel**, a repressor expressed in the middle of the embryo, just posterior to stripe 2.

The enhancer is active only where both activators are present and both repressors absent, which is a narrow stripe a few cells wide. Repressors bound in the enhancer act over short distances (**short-range repression**, within about 100 bp), so each stripe enhancer can be regulated independently even though all are near the same gene.

::: example Reading the stripe 2 logic {#ex-eve}
Along the anterior–posterior axis of the early embryo (0 % = anterior tip), suppose that Bicoid and Hunchback are present from 0 to 50 %, Giant from 20 to 35 % and from 75 to 90 %, and Krüppel from 42 to 60 %. (The positions are schematic.) (a) Where is the stripe 2 enhancer active? (b) Predict the effect of removing the Giant binding sites from the enhancer, and of a *Krüppel*⁻ mutant embryo. (c) Why does the embryo use several separate stripe enhancers instead of one?
::: solution
(a) The enhancer needs activators (0–50 %) and the absence of Giant (absent from 35 % to 75 %, within the activator domain) and Krüppel (absent below 42 %). The intersection is 35–42 %: a single stripe.

(b) Without Giant sites, the anterior boundary is lost and expression extends forwards over the Giant domain to the anterior limit of activation (0–42 %, perhaps limited by other repressors). Small, Blair and Levine saw exactly this kind of anterior expansion with mutated sites in a reporter gene. In a *Krüppel*⁻ embryo the posterior boundary moves backwards towards the limit of activators at 50 %, broadening the stripe posteriorly.

(c) Separate modular enhancers let each stripe be positioned by a different combination of repressor boundaries, and short-range repression keeps the repressors at one enhancer from silencing the others. Modular enhancers also allow evolution to change expression in one tissue or region without disrupting the gene elsewhere ([[developmental-biology/evo-devo]]).
:::
:::

### How activators work

Activators work largely by **recruitment**, as in bacteria ([[molecular-biology/transcription#ex-mcclure]]), though in eukaryotes the things recruited are more varied. Activation domains contact Mediator, TFIID and other components of the preinitiation complex, increasing its assembly at the promoter. They also recruit **co-activators** that modify chromatin: **histone acetyltransferases** (HATs, such as p300/CBP and the SAGA complex) and ATP-dependent **remodelling complexes** (SWI/SNF), which slide or evict nucleosomes. They may also release paused polymerase by recruiting P-TEFb ([[molecular-biology/transcription]]). Repressors act by competing with activators for sites, by masking activation domains, or by recruiting **co-repressors** such as histone deacetylases (HDACs) and Groucho/TLE proteins.

::: proposition Activation by recruitment {#prop-recruitment}
Consider a weak promoter whose basal occupancy by the transcription machinery $P$ is small, and an activator $A$ that binds a nearby site with dissociation constant $K_A$. When both are bound, an attractive interaction between them multiplies the statistical weight of the doubly bound state by a factor $\omega > 1$. Summing the statistical weights of the four states (empty, $P$ only, $A$ only, both), with promoter occupancy small, the **fold activation** (expression with activator divided by without) is
$$
\text{FC} = \frac{1 + \omega\,[A]/K_A}{1 + [A]/K_A}.
$$ {#eq-recruitment}
It rises from 1 when $[A] \ll K_A$ to a maximum of $\omega$ when the activator site is saturated. If $\omega$ corresponds to an interaction free energy $\Delta G_\text{int} < 0$, then $\omega = e^{-\Delta G_\text{int}/RT}$, so a modest contact of $-10\ \mathrm{kJ\,mol^{-1}}$ at 37 °C gives $\omega \approx 50$. The model (as in Bintu et al., 2005) assumes equilibrium binding and transcription proportional to promoter occupancy.
:::

::: proof
Let $p = [P]/K_P$ and $a = [A]/K_A$ be the statistical weights of the singly bound states, so the weights are $1$ (empty), $p$, $a$ and $\omega pa$ (both). The probability that the promoter is occupied is $(p + \omega pa)/(1 + p + a + \omega pa)$. For a weak promoter, $p \ll 1$ and $\omega p a \ll 1 + a$, so this is approximately $p(1 + \omega a)/(1 + a)$. Without activator ($a = 0$) it is $p$. Dividing gives [[#eq-recruitment]].
:::

::: example How much activation? {#ex-recruitment}
An activator interacts with the transcription machinery with $\omega = 50$. (a) Find the fold activation when $[A]/K_A$ is 0.1, 1, 10 and 100. (b) Two independent activators each give $\omega = 50$ when saturating and both contact the machinery. What fold activation do you expect when both are saturating? (c) Why does this make enhancers with several sites useful?
::: solution
(a) From [[#eq-recruitment]]: $a = 0.1$ gives $(1 + 5)/1.1 = 5.5$; $a = 1$ gives $51/2 = 25.5$; $a = 10$ gives $501/11 = 45.5$; $a = 100$ gives $5001/101 = 49.5$. Activation saturates at $\omega = 50$.

(b) If the two contacts are independent and additive in free energy, the weights multiply: $\omega_1\omega_2 = 2500$-fold. (Real activators often show this kind of synergy until the promoter approaches full occupancy, where the weak-promoter approximation fails.)

(c) Multiplying weights means that a cluster of weak interactions gives a large, all-or-none response, but only when *all* the factors are present. Several sites in an enhancer therefore act like an AND gate, as at the eve stripe 2 enhancer, and allow sharp responses to combinations of inputs.
:::
:::

## Chromatin and gene regulation

DNA in nucleosomes is much less accessible than naked DNA. In vitro, nucleosomes strongly repress transcription from most promoters, and the repression is relieved by activators. Chromatin is therefore not a passive packaging material but part of the regulatory system ([[molecular-biology/dna-structure#def-nucleosome]]).

### Histone modifications

The N-terminal tails of histones carry many covalent modifications, added by "writer" enzymes, removed by "erasers" and recognised by "reader" domains of other proteins.

::: definition Major histone marks {#def-histone-marks}
Modified residues are written as histone, residue and modification: H3K27ac is acetylated lysine 27 of histone H3; H3K4me3 is trimethylated lysine 4.
- **Acetylation** of lysines (by HATs; removed by HDACs) neutralises their positive charge and is read by **bromodomains**. It is associated with active promoters and enhancers (for example H3K27ac, H3K9ac).
- **H3K4me3** marks active (and poised) promoters; **H3K4me1** marks enhancers.
- **H3K36me3**, added by a methyltransferase that travels with elongating Pol II, marks transcribed gene bodies.
- **H3K27me3**, added by **Polycomb repressive complex 2** (PRC2), marks genes silenced by the Polycomb system, often developmental regulators in cells where they are off.
- **H3K9me3**, added by methyltransferases such as SUV39H1, is bound by the **chromodomain** of **HP1** and marks constitutive heterochromatin and silenced transposons.
:::

Vincent Allfrey and colleagues proposed in 1964 that histone acetylation is linked to transcription. The connection became mechanistic when James Brownell, David Allis and colleagues (1996) purified a histone acetyltransferase from *Tetrahymena* and found that it was the homologue of the yeast transcriptional co-activator Gcn5. Stuart Schreiber's group the same year found that a histone deacetylase was related to a yeast transcriptional repressor. Co-activators and co-repressors turned out to be enzymes that modify chromatin.

Brian Strahl and Allis proposed in 2000 that combinations of marks form a **histone code**, read by proteins to produce particular outcomes. How far marks *cause* rather than *reflect* transcriptional states is still debated. Some marks are clearly instructive. Tethering HP1 or PRC2 to a gene is enough to silence it, and silencing can persist after the tether is removed. Others, such as H3K4me3 and H3K36me3, seem to be laid down largely as a consequence of transcription, and they help to make it efficient and faithful.

Some TFs, called **pioneer factors** (FoxA and GATA factors in liver development, studied by Kenneth Zaret; the Yamanaka factors Oct4, Sox2 and Klf4), can bind their sites on nucleosomal DNA. They open closed chromatin and let other factors bind. They are needed to start new programmes of gene expression in development and reprogramming.

### Polycomb and Trithorax: memory of gene expression

In *Drosophila*, mutations in the **Polycomb group** genes cause *Hox* genes, which are switched on in the right segments early in development by transient regulators, to become active in the wrong segments later. The flies transform segments, for example by growing extra sex combs on the legs, after which *Polycomb* is named (Edward Lewis, 1978). **Trithorax group** mutations cause the opposite: *Hox* genes are not maintained where they should be on. The two groups maintain the off and on states through many divisions after the initial signals are gone. Polycomb complexes (PRC2 writing H3K27me3, PRC1 compacting chromatin) are a cellular memory of repression, and trithorax proteins (including H3K4 methyltransferases) a memory of activity. Both systems are conserved in mammals and plants. In plants, Polycomb silencing of the flowering repressor *FLC* after prolonged cold is the molecular basis of **vernalisation**, the requirement of some plants for winter before they flower ([[plant-biology/plant-responses]]).

### DNA methylation

In vertebrates and plants, cytosine can be methylated at carbon 5 to give **5-methylcytosine** (5mC). In mammals this occurs almost entirely at **CpG** dinucleotides, and about 70–80 % of CpGs in somatic cells are methylated. The exceptions are the **CpG islands** at most promoters, which are usually unmethylated. Methylation of a promoter CpG island is associated with stable silencing, as in the inactive X chromosome, imprinted genes ([[genetics/non-mendelian-inheritance]]) and transposons. Methylated DNA is bound by proteins with methyl-CpG-binding domains, which recruit HDACs and other repressive activities.

::: definition Maintenance and de novo methylation {#def-dna-methylation}
Because CpG is palindromic, a methylated CpG is methylated on both strands. After replication, the new strand is unmethylated, so the site is **hemimethylated**. **DNMT1**, recruited to replication forks by the protein UHRF1, which recognises hemimethylated CpG, methylates the new strand and so copies the pattern: **maintenance methylation**. **DNMT3A** and **DNMT3B** methylate unmethylated sites (**de novo methylation**) and establish new patterns in development (Masaki Okano, En Li and colleagues, 1999). Methylation is removed passively by replication without maintenance, or actively by **TET** enzymes, which oxidise 5mC to 5-hydroxymethylcytosine and further products that are excised by base excision repair (Mamta Tahiliani, Anjana Rao and colleagues, 2009). Arthur Riggs, and Robin Holliday and John Pugh, independently proposed the maintenance mechanism in 1975.
:::

::: example How faithful is maintenance? {#ex-maintenance}
Suppose that DNMT1 re-methylates each hemimethylated CpG after replication with probability $m$, independently, and that there is no de novo methylation. (a) What fraction of an initially fully methylated set of CpGs remains methylated on both strands after 10 divisions if $m = 0.95$? If $m = 0.99$? (b) Measured per-site maintenance fidelities in mammalian cells are about 0.95–0.99 per division. What does this imply about how stable methylation patterns are maintained? (c) Why might a promoter with many CpGs be more stable than any single CpG?
::: solution
(a) Each division a site survives with probability $m$, and once lost it is not restored: $0.95^{10} = 0.60$, and $0.99^{10} = 0.90$.

(b) Maintenance alone would erode methylation over tens of divisions. Stability in real cells relies on de novo methyltransferases and on feedback between DNA methylation and repressive histone marks, which recruit methyltransferases back to regions that are mostly methylated.

(c) The silencing of a promoter depends on the methylation density of the region, not on any one CpG. Errors at single sites are corrected by recruitment of methyltransferases to regions that are mostly methylated (and demethylases to regions that are mostly unmethylated), so the regional state is maintained as a bistable property even though individual sites flicker. Such collective models explain the stability of methylation better than per-site copying alone.
:::
:::

::: warning "Epigenetic means inherited across generations by environmental experience"
In molecular biology, **epigenetic** refers to changes in gene expression that are heritable through *cell division* without changes in DNA sequence, such as maintained DNA methylation, Polycomb silencing and X inactivation. Within an organism, this cellular memory is well established. Inheritance of acquired epigenetic states from parent to offspring through the germ line is a separate claim. It is clearly documented in plants (stable methylation variants, *epialleles*) and in *C. elegans* (small-RNA-based silencing over several generations). In mammals, most methylation is erased and reset twice, in the early embryo and in primordial germ cells, and evidence for transgenerational inheritance of environmentally induced states is limited and debated. Do not read "epigenetic" as meaning "inherited from your grandparents' experiences".
:::

## Regulation by small RNAs

In 1993 Rosalind Lee, Rhonda Feinbaum and Victor Ambros found that the *C. elegans* developmental timing gene *lin-4* encodes not a protein but a 22-nucleotide RNA, partly complementary to sequences in the 3′ untranslated region of the *lin-14* mRNA. Bruce Wightman, Ilho Ha and Gary Ruvkun showed in the same issue of *Cell* that those sites are needed for *lin-4* to repress LIN-14 protein. For seven years this looked like a worm curiosity. Then in 2000 a second worm small RNA, *let-7*, was found (Brenda Reinhart, Ruvkun and colleagues), and it was found to be conserved in sequence from flies to humans (Amy Pasquinelli and colleagues). Within a year, hundreds of such **microRNAs** (miRNAs) had been cloned from animals and plants. Ambros and Ruvkun received the Nobel Prize in Physiology or Medicine in 2024.

Meanwhile, in 1998, Andrew Fire, SiQun Xu, Mary Montgomery, Steven Kostas, Samuel Driver and Craig Mello showed that injecting **double-stranded RNA** into *C. elegans* silenced the gene of matching sequence far more potently than either single strand. A few molecules per cell were enough, and silencing spread through the animal and to its progeny. Injected dsRNA matching the muscle gene *unc-22* gave the twitching phenotype of *unc-22* mutants. This **RNA interference** (RNAi) explained earlier puzzles, such as "co-suppression" of pigment genes in transgenic petunias (Carolyn Napoli and Richard Jorgensen, 1990). Fire and Mello received the 2006 Nobel Prize. Thomas Tuschl's group showed in 2001 that synthetic 21-nucleotide duplexes, **small interfering RNAs** (siRNAs), silence genes in mammalian cells without triggering the interferon response that long dsRNA provokes.

::: definition MicroRNA biogenesis and action {#def-mirna}
In animals, a miRNA gene is transcribed by Pol II into a **pri-miRNA** containing a hairpin. The nuclear **Microprocessor** (the RNase III enzyme **Drosha** with DGCR8) cuts out a **pre-miRNA** hairpin of about 60–70 nucleotides, which is exported by Exportin-5. In the cytoplasm, **Dicer** cuts off the loop, leaving a duplex of about 22 bp. One strand, the mature miRNA, is loaded into an **Argonaute** (AGO) protein to form the **RNA-induced silencing complex** (RISC). The miRNA guides AGO to target mRNAs by base pairing, chiefly through its **seed**, nucleotides 2–8 from its 5′ end, with sites usually in the 3′ UTR. Binding recruits proteins (GW182/TNRC6) that cause deadenylation, decapping and decay of the mRNA, and repression of translation. siRNAs, by contrast, pair perfectly with their target, so that AGO2 cleaves it (**slicing**).
:::

```python
# Find microRNA seed-match sites in a 3' UTR (canonical 8mer, 7mer-m8, 7mer-A1, 6mer)
def revcomp_rna(s):
    return s[::-1].translate(str.maketrans("ACGU", "UGCA"))

def seed_sites(mirna, utr):
    m8 = revcomp_rna(mirna[1:8])          # pairs with miRNA nucleotides 2-8
    m6 = revcomp_rna(mirna[1:7])          # pairs with nucleotides 2-7
    found = []
    for i in range(len(utr) - 5):
        if utr.startswith(m8 + "A", i):
            found.append((i, "8mer"))
        elif utr.startswith(m8, i):
            found.append((i, "7mer-m8"))
        elif utr.startswith(m6 + "A", i + 1) and not utr.startswith(m8, i):
            found.append((i + 1, "7mer-A1"))
        elif utr.startswith(m6, i + 1) and not utr.startswith(m8, i):
            found.append((i + 1, "6mer"))
    return m8, found

let7a = "UGAGGUAGUAGGUUGUAUAGUU"             # human let-7a, 5'->3'
utr = ("AAGCUUCCUACCUCAUUGGAACUGGACUACCUCGAAUUUUACCUCAGGCAAUUACCUCUU"
       "GGCCAUAAACUACCUCAAUUUGCA")            # a made-up 3' UTR
m8, sites = seed_sites(let7a, utr)
print("seed (nt 2-8):", let7a[1:8], "| site (7mer-m8):", m8)
for pos, kind in sites:
    print(f"  position {pos:3d}: {kind}")
```

Output (positions from 0 in the UTR):

```
seed (nt 2-8): GAGGUAG | site (7mer-m8): CUACCUC
  position   7: 8mer
  position  26: 7mer-m8
  position  39: 7mer-A1
  position  52: 6mer
  position  69: 8mer
```

The site classes follow the conventions of David Bartel's laboratory. An **8mer** pairs with nucleotides 2–8 and has an A opposite position 1, a **7mer-m8** pairs with 2–8, a **7mer-A1** pairs with 2–7 plus the A, and a **6mer** pairs with 2–7. Their efficacy decreases in that order. The made-up UTR here has five sites. A natural target usually has one or a few, and repression by a single site is typically modest, often less than two-fold. Most of the measurable effect of miRNAs on their targets is a decrease in mRNA level (Huili Guo, Bartel and colleagues, 2010).

::: example How specific is a seed? {#ex-seed}
(a) In random sequence, what is the probability that a 7-nucleotide seed site occurs at a given position? (b) What is the probability that a random 1000-nucleotide 3′ UTR contains at least one site? (c) Roughly how many of 20,000 human mRNAs with such UTRs would have a site by chance? (d) Comparative genomics shows that more than 60 % of human protein-coding genes have sites conserved across mammals for at least one miRNA (Robin Friedman, Bartel and colleagues, 2009). Why is conservation the key evidence?
::: solution
(a) $4^{-7} = 6.1\times10^{-5}$.

(b) $1 - (1 - 4^{-7})^{1000} = 0.059$, or about 6 %. (The simple estimate $1000\times4^{-7} = 0.061$ is close because sites are rare.)

(c) $20\,000\times0.059 \approx 1200$ mRNAs for each miRNA seed, by chance alone.

(d) Chance matches are expected in thousands of genes, so a site in one genome says little. A site that is preserved in the orthologous UTRs of species that diverged tens of millions of years ago, while surrounding UTR sequence has changed, has been kept by selection, which implies that the interaction matters. Conserved targeting is therefore the main basis of target prediction, alongside experiments that measure mRNA and protein changes when a miRNA is added or removed.
:::
:::

Animals also have **piRNAs** (PIWI-interacting RNAs), 24–31 nucleotides long, made without Dicer and bound by the PIWI subfamily of Argonautes in the germ line. They silence transposons by cleaving their transcripts and by guiding repressive chromatin marks and DNA methylation to transposon copies. Hybrid dysgenesis in *Drosophila*, in which crosses between strains with and without P elements give sterile offspring, is explained by the absence of P-element piRNAs in the maternal germ line of one strain ([[molecular-biology/dna-repair-recombination]]). In plants and fission yeast, small RNAs guide the formation of heterochromatin at repeats, so RNA silencing reaches back from the cytoplasm to chromatin.

**Long non-coding RNAs** (lncRNAs), transcripts longer than 200 nucleotides with no protein-coding potential, number in the tens of thousands in human annotations. A few have well-established functions. **Xist** (about 17 kb) coats the X chromosome from which it is made and recruits silencing complexes to inactivate it. Many others are poorly expressed, and their functions, if any, are under investigation. The existence of a transcript is not evidence that it has a function.

## Translational control and mRNA stability

Many responses must be faster than new transcription allows, and cells regulate the translation and decay of existing mRNAs.

- **Iron.** When iron is scarce, **iron-regulatory proteins** (IRPs) bind **iron-responsive elements** (IREs), stem-loops in the 5′ UTR of ferritin mRNA, where they block translation, and in the 3′ UTR of transferrin receptor mRNA, where they protect it from degradation. Low iron thus decreases iron storage and increases iron uptake. When iron is plentiful, the IRPs lose their RNA-binding activity (IRP1 becomes an iron–sulfur aconitase) and the effects reverse.
- **Global control.** Stresses such as amino-acid starvation, unfolded proteins in the ER and viral infection activate kinases that phosphorylate **eIF2α**, reducing ternary-complex formation and general translation. Paradoxically, they increase translation of a few mRNAs, such as *ATF4*, which carry short upstream ORFs. Nutrient and growth signals act through the kinase mTOR, which phosphorylates and inactivates **4E-BPs**, releasing eIF4E for cap-dependent initiation ([[molecular-biology/translation]]).
- **mRNA stability.** AU-rich elements in 3′ UTRs, bound by destabilising proteins, make many mRNAs for cytokines and transcription factors short-lived, so that their protein production stops quickly when transcription stops.

::: proposition Steady state and response time of an mRNA {#prop-steady-state}
Let an mRNA be made at constant rate $k$ (molecules per unit time) and degraded with first-order rate constant $\delta = \ln2/t_{1/2}$, where $t_{1/2}$ is its half-life. Its number $m$ obeys $dm/dt = k - \delta m$, so
$$
m(t) = \frac{k}{\delta} + \left(m_0 - \frac{k}{\delta}\right)e^{-\delta t}, \qquad m^* = \frac{k}{\delta}.
$$ {#eq-steady-state}
The steady-state level is proportional to synthesis rate times half-life. After any change of $k$, $m$ moves exponentially towards the new steady state and covers half the distance in one half-life. **The response time is set by the degradation rate, not the synthesis rate.** Dilution by cell growth adds to $\delta$. The same equations apply to proteins.
:::

::: example Stable and unstable messages {#ex-half-life}
Two genes are transcribed at the same rate, 10 mRNA molecules per hour. The mRNA of gene A has a half-life of 30 min and that of gene B of 10 h. (Median mRNA half-lives in mouse fibroblasts are about 9 h, with a wide range; Björn Schwanhäusser and colleagues, 2011.) (a) Find the steady-state number of each mRNA. (b) Transcription of both stops. How long until each falls to a quarter of its steady state? (c) Which design suits a gene encoding a signalling protein that must be switched off quickly, and which a housekeeping enzyme?
::: solution
(a) For A, $\delta = \ln2/0.5\ \mathrm{h} = 1.39\ \mathrm{h^{-1}}$, so $m^* = 10/1.39 = 7.2$ molecules. For B, $\delta = 0.0693\ \mathrm{h^{-1}}$, so $m^* = 144$.

(b) A quarter means two half-lives: 1 h for A and 20 h for B.

(c) An unstable mRNA (A) gives a fast response, at the cost of a low level or a high transcription rate, so it suits signalling and regulatory proteins whose activity must track the current signal. A stable mRNA (B) gives a high level cheaply and buffers fluctuations, so it suits housekeeping proteins. Cells pay for speed with synthesis, a trade-off taken further in [[systems-biology/gene-expression-dynamics]].
:::
:::

::: widget plot
f: (10*T/ln(2))*(1 - exp(-ln(2)*x/T)); (10*T/ln(2))*exp(-ln(2)*x/T)
x: 0, 24
y: 0, 160
sliders: T=2:0.25:10:0.25
labels: \text{switched on at } t = 0; \text{switched off at } t = 0
caption: An mRNA made at 10 molecules per hour with half-life $T$ (hours, slider), from [[#eq-steady-state]]. One curve starts from zero when transcription is switched on at time 0; the other starts from the steady state $m^* = 10T/\ln2$ when transcription is switched off. Both cover half the distance to their final value in one half-life whatever the steady-state level. Shorten $T$ and watch the response speed up while the steady-state level falls in proportion. Time is in hours.
:::

::: application Small RNAs and chromatin as tools and medicines
RNAi with siRNAs or short hairpin RNAs became the standard way to reduce expression of a chosen gene in cultured cells and in model organisms such as *C. elegans* and *Drosophila*. Genome-wide RNAi screens identified genes for many cellular processes before CRISPR screens largely replaced them ([[molecular-biology/molecular-tools]]). Chemically stabilised siRNAs delivered to the liver have been approved as medicines since 2018 (patisiran, for hereditary transthyretin amyloidosis), and inhibitors of DNA methyltransferases and of histone deacetylases are used in some blood cancers. Clinical aspects belong to Medicine Atlas ([/learn/medicine/](/learn/medicine/)). In agriculture, RNAi has been used to make crops resistant to viruses and to alter traits such as the browning of apples and potatoes, under the regulations governing genetically modified organisms ([[biotechnology/agricultural-biotechnology]]).
:::

::: quiz
Which observation best shows that an enhancer, rather than the promoter, determines that a gene is expressed only in the liver?
- [ ] The gene's promoter contains a TATA box.
- [ ] The gene's mRNA is abundant in liver and absent from brain.
- [x] Moving a 400 bp element from 20 kb upstream of the gene next to a heterologous minimal promoter driving GFP gives GFP only in the liver of transgenic mice, in either orientation.
- [ ] Deleting the gene's promoter abolishes expression in all tissues.
::: solution
The reporter experiment tests sufficiency directly: the element confers liver-specific expression on an unrelated promoter, independently of orientation and from its natural distance, which is the defining behaviour of an enhancer. The mRNA distribution describes the pattern but not its cause; a promoter deletion shows that the promoter is necessary but not that it determines tissue specificity; a TATA box is a feature of the core promoter.
:::
:::

::: history
John Gurdon obtained frogs by nuclear transfer from differentiated cells in 1962, and Shinya Yamanaka's group made induced pluripotent stem cells in 2006 (the two shared the 2012 Nobel Prize). Vincent Allfrey linked histone acetylation to transcription in 1964. Arthur Riggs, and Robin Holliday and John Pugh, proposed maintenance methylation in 1975, and Edward Lewis described the Polycomb phenotype and the *bithorax* complex in 1978. Julian Banerji, Sandro Rusconi and Walter Schaffner discovered enhancers in 1981. Roger Brent and Mark Ptashne showed the modularity of transcription factors in 1985. Stephen Small, Alexander Blair and Michael Levine dissected the eve stripe 2 enhancer in 1992, and Rosalind Lee, Rhonda Feinbaum and Victor Ambros, and Bruce Wightman, Ilho Ha and Gary Ruvkun, described the first microRNA in 1993. James Brownell, David Allis and colleagues identified a histone acetyltransferase as a co-activator in 1996. Andrew Fire, Craig Mello and colleagues discovered RNA interference in 1998, and Thomas Tuschl's group introduced siRNAs into mammalian cells in 2001.
:::

::: summary
- Differentiated cells keep their genome (nuclear transfer, iPS cells); they differ in which genes they express.
- Transcription factors are modular: a DNA-binding domain (homeodomain, zinc finger, bZIP, bHLH, nuclear receptor) and effector domains. Motif matches are far more numerous than bound sites, so context decides function.
- Enhancers are clusters of TF sites that act independently of orientation and at a distance, by looping within domains bounded by insulators (CTCF). Combinations of activators and short-range repressors produce precise patterns, as at the eve stripe 2 enhancer.
- Activators recruit Mediator, the general machinery, HATs and remodellers. In a simple equilibrium model, fold activation is $(1 + \omega a)/(1 + a)$, saturating at $\omega$, and independent contacts multiply.
- Histone marks distinguish active promoters (H3K4me3), enhancers (H3K4me1, H3K27ac), gene bodies (H3K36me3), Polycomb silencing (H3K27me3) and heterochromatin (H3K9me3/HP1). Polycomb and Trithorax maintain off and on states through division.
- CpG methylation is copied by DNMT1 at hemimethylated sites, set by DNMT3A/B and removed by TET enzymes and replication. It silences promoters, transposons, imprinted genes and the inactive X.
- miRNAs (Drosha, Dicer, AGO) repress targets by seed pairing (nt 2–8), mostly through mRNA decay; siRNAs slice perfectly matched targets; piRNAs silence transposons in the germ line.
- Translation and mRNA decay are also regulated (IRE/IRP, eIF2α, mTOR–4E-BP, AU-rich elements). Steady-state mRNA is $k/\delta$, and the response time is one half-life.
:::

## Exercises

::: exercise Motif frequency {level=1 check="370"}
How many matches to a 12 bp motif would you expect by chance in a 3.1 Gb genome, counting both strands (nearest whole number)?
::: solution
$4^{12} = 16\,777\,216$, so the expected number is $6.2\times10^9/1.678\times10^7 = 369.6 \approx 370$. Even a 12 bp site, longer than most TF motifs, is expected hundreds of times by chance.
:::
:::

::: exercise Steady state {level=1 check="433"}
An mRNA is made at 50 molecules per hour and has a half-life of 6 h. What is its steady-state number (nearest whole number)?
::: solution
$\delta = \ln2/6 = 0.1155\ \mathrm{h^{-1}}$, so $m^* = 50/0.1155 = 432.8 \approx 433$.
:::
:::

::: exercise Fold activation {level=1 check="11"}
Using [[#eq-recruitment]] with $\omega = 21$ and $[A] = K_A$, what is the fold activation?
::: solution
$(1 + 21)/(1 + 1) = 11$.
:::
:::

::: exercise Maintenance methylation {level=2 check="0.82"}
If each methylated CpG is maintained with probability 0.98 per division and never restored once lost, what fraction remains methylated after 10 divisions (two decimal places)?
::: solution
$0.98^{10} = 0.817 \approx 0.82$.
:::
:::

::: exercise An enhancer-trap result {level=2}
A transposon carrying a minimal promoter fused to *lacZ* is inserted at random into the *Drosophila* genome. Different insertion lines show β-galactosidase in different tissues: one in the wing margin, another in the eye. (a) Explain why the reporter, which has no enhancer of its own, is expressed in patterns. (b) How would you identify the gene whose enhancer is being "trapped"? (c) Why are such lines also useful as tools?
::: solution
(a) The minimal promoter is activated by whatever enhancers lie near the insertion site, which act over distances and in either orientation; each line reports the activity of the enhancers at its own location, often reproducing part of the pattern of a nearby gene.

(b) Map the insertion site (by sequencing the flanking DNA), list the genes within the surrounding domain, and compare their expression (by in situ hybridisation) with the reporter pattern; mutations in the candidate gene, perhaps made by imprecise excision of the transposon, test function.

(c) Each line marks a tissue or cell type, and if the reporter is replaced by a transcriptional activator such as Gal4, the line can drive any gene cloned behind UAS~G~ in that tissue (the Gal4/UAS system of Andrea Brand and Norbert Perrimon, 1993).
:::
:::

::: exercise Iron regulation {level=2}
Predict the levels of ferritin protein and transferrin receptor protein (high or low) in cells (a) starved of iron; (b) loaded with iron; (c) expressing a mutant IRP that binds IREs regardless of iron. Explain each.
::: solution
(a) Low iron: IRPs bind IREs. Ferritin translation is blocked (5′ IRE): ferritin low. Transferrin receptor mRNA is stabilised (3′ IREs): receptor high. The cell takes up iron and stores little.

(b) High iron: IRPs release the IREs. Ferritin translated: high. Receptor mRNA degraded: low.

(c) Constitutive IRP binding: ferritin low and transferrin receptor high whatever the iron supply, so cells keep importing iron without storing it, leading to iron overload of the cytoplasm.
:::
:::

::: exercise Designing an RNAi experiment {level=3}
You inject dsRNA corresponding to exon 3 of a *C. elegans* gene and observe embryonic lethality in the progeny. (a) What controls are needed to attribute the phenotype to loss of this gene? (b) The gene has a paralogue with 85 % nucleotide identity over exon 3. How does this complicate interpretation, and what would you do? (c) Why does RNAi in worms affect progeny and spread between tissues, whereas a synthetic siRNA in a mammalian cell line acts only in that cell?
::: solution
(a) Inject an unrelated dsRNA (for example from a gene absent from the worm, such as GFP) to control for injection and dsRNA effects; use a second, non-overlapping dsRNA from another part of the gene, which should give the same phenotype; measure the target mRNA (RT-qPCR) to confirm knockdown; and compare with a genetic loss-of-function mutant if available.

(b) Long dsRNA is cut into many siRNAs, some of which will match the paralogue perfectly over 20 or more nucleotides at 85 % identity, so both genes may be silenced; the phenotype could reflect loss of either or both. Use dsRNA from a region where the two genes differ (such as the 3′ UTR), check knockdown of each separately, or use a mutant.

(c) *C. elegans* has an RNA-dependent RNA polymerase that makes secondary siRNAs from the target mRNA, amplifying the signal, and a dsRNA transporter (SID-1) that moves silencing RNAs between cells and into the germ line; silencing can then be inherited through small RNAs for several generations. Mammalian cells lack the amplification step and systemic transport, so a synthetic siRNA is diluted by cell division and acts only in the transfected cells for a few days.
:::
:::

::: exercise Interpreting a ChIP-seq and RNA-seq comparison {level=3}
In mouse embryonic stem cells, a set of 2000 developmental regulator genes have promoters marked with both H3K4me3 and H3K27me3 ("bivalent") and are expressed at low levels. When the cells differentiate into neurons, neuronal genes in the set lose H3K27me3 and become highly expressed, while non-neuronal genes in the set lose H3K4me3 and remain silent. (a) What do these observations suggest about the role of bivalent marks? (b) Why is this correlation not proof that the marks control expression? (c) Propose an experiment that tests causality.
::: solution
(a) Bivalent promoters appear to be poised: kept silent by Polycomb (H3K27me3) but held in a state, with H3K4me3, from which they can be activated quickly when the appropriate lineage is chosen, or fully silenced otherwise. Resolution of bivalency accompanies lineage commitment.

(b) The marks could follow, rather than cause, the changes in transcription: activation by lineage-specific transcription factors might remove H3K27me3 as a consequence, and silencing might lead to loss of H3K4me3. A correlation over time does not reveal direction.

(c) Manipulate the marks directly and see whether expression follows: delete or inhibit PRC2 (for example *Eed* or *Ezh2* knockout) and ask whether the bivalent genes are derepressed in stem cells; or tether a PRC2 component, or a demethylase specific for H3K27me3, to a single bivalent promoter with a catalytically dead Cas9 fused to the enzyme, and measure transcription of that gene. If expression changes when, and only when, the mark is changed at that locus, the mark is causal there.
:::
:::
